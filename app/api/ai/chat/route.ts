import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

type ChatMessage = { role: "user" | "assistant"; content: string };

interface ChatRequestBody {
  bookTitle: string;
  authorName?: string;
  year?: string;
  genre?: string;
  language?: string;
  aiSummary?: string;
  themes?: string[];
  messages: ChatMessage[];
}

function buildSystemPrompt(body: ChatRequestBody): string {
  const author = body.authorName?.trim() || "an unknown author";
  const year = body.year?.trim();
  const attribution = year ? `${author} (${year})` : author;

  const sentences: string[] = [
    `You are a knowledgeable guide helping a reader understand and engage with '${body.bookTitle}' by ${attribution}.`,
  ];

  if (body.genre?.trim() || body.language?.trim()) {
    const genre = body.genre?.trim() || "literary";
    const language = body.language?.trim();
    sentences.push(
      language
        ? `The book is a ${genre} work originally written in ${language}.`
        : `The book is a ${genre} work.`
    );
  }

  if (body.aiSummary?.trim()) {
    sentences.push(`Summary: ${body.aiSummary.trim()}.`);
  }

  if (body.themes && body.themes.length > 0) {
    sentences.push(`Key themes: ${body.themes.join(", ")}.`);
  }

  sentences.push(
    "Help the reader explore the book — answer questions, explain passages, discuss themes, provide historical context, and spark deeper thinking. Do not spoil plot points unless explicitly asked."
  );

  return sentences.join(" ");
}

export async function POST(request: NextRequest) {
  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.bookTitle || !Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json(
      { error: "bookTitle and a non-empty messages array are required" },
      { status: 400 }
    );
  }

  const system = buildSystemPrompt(body);
  const messages = body.messages.map((m) => ({ role: m.role, content: m.content }));

  try {
    const { anthropic } = await import("@/lib/ai/claude");

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system,
      messages,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
      cancel() {
        stream.abort();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "AI service unavailable — check ANTHROPIC_API_KEY" },
      { status: 503 }
    );
  }
}

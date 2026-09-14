import { NextRequest, NextResponse } from "next/server";
import {
  exceedsSizeLimit,
  getClientIp,
  rateLimit,
  sanitizeText,
} from "@/lib/security";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BODY_BYTES = 256 * 1024;
const MAX_MESSAGES = 50;
const MAX_MESSAGE_CHARS = 8000;
const MAX_THEMES = 20;

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

/**
 * The system prompt interpolates caller-supplied metadata, so it is a
 * prompt-injection surface: strip control/zero-width characters and cap
 * every field before it reaches the model.
 */
function clean(value: unknown, max: number): string {
  return typeof value === "string" ? sanitizeText(value, max) : "";
}

function buildSystemPrompt(body: ChatRequestBody): string {
  const author = clean(body.authorName, 120) || "an unknown author";
  const year = clean(body.year, 20);
  const attribution = year ? `${author} (${year})` : author;
  const title = clean(body.bookTitle, 200);

  const sentences: string[] = [
    `You are a knowledgeable guide helping a reader understand and engage with '${title}' by ${attribution}.`,
  ];

  const genreRaw = clean(body.genre, 80);
  const language = clean(body.language, 80);
  if (genreRaw || language) {
    const genre = genreRaw || "literary";
    sentences.push(
      language
        ? `The book is a ${genre} work originally written in ${language}.`
        : `The book is a ${genre} work.`
    );
  }

  const summary = clean(body.aiSummary, 4000);
  if (summary) {
    sentences.push(`Summary: ${summary}.`);
  }

  if (Array.isArray(body.themes) && body.themes.length > 0) {
    const themes = body.themes
      .slice(0, MAX_THEMES)
      .map((t) => clean(t, 80))
      .filter(Boolean);
    if (themes.length > 0) {
      sentences.push(`Key themes: ${themes.join(", ")}.`);
    }
  }

  sentences.push(
    "Help the reader explore the book — answer questions, explain passages, discuss themes, provide historical context, and spark deeper thinking. Do not spoil plot points unless explicitly asked."
  );

  return sentences.join(" ");
}

export async function POST(request: NextRequest) {
  // This route calls a paid LLM, so it gets the strictest per-IP budget.
  const limited = rateLimit(`ai-chat:${getClientIp(request)}`, {
    limit: 10,
    windowMs: 60_000,
  });
  if (!limited.allowed) {
    const retryAfter = Math.max(1, Math.ceil((limited.resetAt - Date.now()) / 1000));
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  if (exceedsSizeLimit(request, MAX_BODY_BYTES)) {
    return NextResponse.json({ error: "Request body too large." }, { status: 413 });
  }

  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.bookTitle || !Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json(
      { error: "bookTitle and a non-empty messages array are required" },
      { status: 400 }
    );
  }

  if (body.messages.length > MAX_MESSAGES) {
    return NextResponse.json(
      { error: `messages array must contain at most ${MAX_MESSAGES} messages` },
      { status: 400 }
    );
  }

  const messages = body.messages
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        typeof m.content === "string" &&
        (m.role === "user" || m.role === "assistant")
    )
    .map((m) => ({
      role: m.role,
      content: sanitizeText(m.content, MAX_MESSAGE_CHARS),
    }))
    .filter((m) => m.content.length > 0);

  if (messages.length === 0) {
    return NextResponse.json(
      { error: "bookTitle and a non-empty messages array are required" },
      { status: 400 }
    );
  }

  const system = buildSystemPrompt(body);

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

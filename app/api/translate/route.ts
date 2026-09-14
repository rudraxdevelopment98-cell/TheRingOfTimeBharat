import { NextRequest, NextResponse } from "next/server";
import { LOCALE_META, isLocale, type Locale } from "@/lib/i18n/config";

export const runtime = "nodejs";

const MAX_TOTAL_CHARS = 8000;
const MAX_ITEMS = 20;

// TODO: consolidate with lib/security.ts rateLimit
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    // Opportunistic cleanup so the Map cannot grow without bound.
    if (rateBuckets.size > 5000) {
      for (const [key, value] of rateBuckets) {
        if (now > value.resetAt) rateBuckets.delete(key);
      }
    }
    return true;
  }

  if (bucket.count >= RATE_LIMIT_MAX) return false;
  bucket.count += 1;
  return true;
}

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function systemPrompt(target: Locale, source?: string): string {
  const targetName = LOCALE_META[target].name;
  const sourceHint =
    source && source !== target ? ` The source text is written in ${source}.` : "";

  return `You are an expert literary translator. Translate the user's text faithfully into ${targetName} (${LOCALE_META[target].nativeName}).${sourceHint}

Rules:
- Preserve the meaning, register and tone of the original. Literary prose must stay literary.
- Do NOT translate proper nouns. Book titles, author names, character names, place names and publication names must be left exactly as they appear, in their original script.
- Do not add explanations, notes, romanisation, or quotation marks that were not in the original.
- Preserve paragraph breaks.
- Return ONLY the translation. No preamble, no commentary, no labels.`;
}

function extractText(message: { content: Array<{ type: string; text?: string }> }): string {
  return message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text ?? "")
    .join("")
    .trim();
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { text, targetLocale, sourceLocale } = (body ?? {}) as {
    text?: unknown;
    targetLocale?: unknown;
    sourceLocale?: unknown;
  };

  if (!isLocale(targetLocale)) {
    return NextResponse.json({ error: "Unsupported target locale" }, { status: 400 });
  }
  if (sourceLocale !== undefined && typeof sourceLocale !== "string") {
    return NextResponse.json({ error: "Invalid source locale" }, { status: 400 });
  }

  const isArrayInput = Array.isArray(text);
  const items: string[] = isArrayInput ? (text as unknown[]).filter((v): v is string => typeof v === "string") : typeof text === "string" ? [text] : [];

  if (items.length === 0 || items.every((s) => s.trim().length === 0)) {
    return NextResponse.json({ error: "Missing text to translate" }, { status: 400 });
  }
  if (isArrayInput && (text as unknown[]).length > MAX_ITEMS) {
    return NextResponse.json(
      { error: `At most ${MAX_ITEMS} strings per request` },
      { status: 400 }
    );
  }
  const totalChars = items.reduce((sum, s) => sum + s.length, 0);
  if (totalChars > MAX_TOTAL_CHARS) {
    return NextResponse.json(
      { error: `Input exceeds ${MAX_TOTAL_CHARS} characters` },
      { status: 400 }
    );
  }

  if (!rateLimit(clientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const { anthropic } = await import("@/lib/ai/claude");

    const userContent = isArrayInput
      ? `Translate each string in this JSON array. Return ONLY a JSON array of ${items.length} translated strings, in the same order, with no code fences.\n\n${JSON.stringify(items)}`
      : items[0];

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: systemPrompt(targetLocale, typeof sourceLocale === "string" ? sourceLocale : undefined),
      messages: [{ role: "user", content: userContent }],
    });

    const raw = extractText(message as { content: Array<{ type: string; text?: string }> });

    let translations: string[];
    if (isArrayInput) {
      translations = items;
      try {
        const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
        const parsed: unknown = JSON.parse(cleaned);
        if (Array.isArray(parsed) && parsed.length === items.length) {
          translations = parsed.map((value, i) =>
            typeof value === "string" ? value : items[i]
          );
        }
      } catch {
        // Model did not return parseable JSON — fall back to the originals.
        translations = items;
      }
    } else {
      translations = [raw.length > 0 ? raw : items[0]];
    }

    return NextResponse.json({ translations, targetLocale });
  } catch {
    return NextResponse.json({ error: "Translation service unavailable" }, { status: 503 });
  }
}

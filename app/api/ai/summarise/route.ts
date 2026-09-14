import { NextRequest, NextResponse } from "next/server";
import {
  exceedsSizeLimit,
  getClientIp,
  rateLimit,
  sanitizeText,
} from "@/lib/security";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 32 * 1024;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? sanitizeText(value, max) : "";
}

export async function POST(request: NextRequest) {
  // Paid LLM call — keep the per-IP budget tight.
  const limited = rateLimit(`ai-summarise:${getClientIp(request)}`, {
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

  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const bookId = clean(body.bookId, 100);
  const bookTitle = clean(body.bookTitle, 200);
  const authorName = clean(body.authorName, 120);
  const year = clean(body.year, 20);
  const genre = clean(body.genre, 80);
  const language = clean(body.language, 80);
  const DEPTHS = ["flash", "short", "standard", "deep", "academic"] as const;
  type Depth = (typeof DEPTHS)[number];
  const depthRaw = clean(body.depth, 40);
  const depth: Depth = (DEPTHS as readonly string[]).includes(depthRaw)
    ? (depthRaw as Depth)
    : "standard";

  if (!bookTitle || !authorName) {
    return NextResponse.json({ error: "bookTitle and authorName are required" }, { status: 400 });
  }

  try {
    const { generateBookSummary } = await import("@/lib/ai/claude");
    const summary = await generateBookSummary(
      bookTitle,
      authorName,
      year || "Unknown",
      genre || "Fiction",
      language || "English",
      depth
    );
    return NextResponse.json({ summary, depth, bookId: body.bookId });
  } catch {
    return NextResponse.json({ error: "AI service unavailable — check ANTHROPIC_API_KEY" }, { status: 503 });
  }
}

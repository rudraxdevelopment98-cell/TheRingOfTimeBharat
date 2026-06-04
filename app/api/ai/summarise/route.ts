import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { bookId, bookTitle, authorName, year, genre, language, depth = "standard" } = body;

  if (!bookTitle || !authorName) {
    return NextResponse.json({ error: "bookTitle and authorName are required" }, { status: 400 });
  }

  try {
    const { generateBookSummary } = await import("@/lib/ai/claude");
    const summary = await generateBookSummary(bookTitle, authorName, year ?? "Unknown", genre ?? "Fiction", language ?? "English", depth);
    return NextResponse.json({ summary, depth, bookId });
  } catch {
    return NextResponse.json({ error: "AI service unavailable — check ANTHROPIC_API_KEY" }, { status: 503 });
  }
}

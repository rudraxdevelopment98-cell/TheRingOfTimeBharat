import { NextRequest, NextResponse } from "next/server";
import { getClientIp, rateLimit, sanitizeText } from "@/lib/security";

const MAX_QUERY_CHARS = 200;

export async function GET(request: NextRequest) {
  const limited = rateLimit(`search:${getClientIp(request)}`, {
    limit: 30,
    windowMs: 60_000,
  });
  if (!limited.allowed) {
    const retryAfter = Math.max(1, Math.ceil((limited.resetAt - Date.now()) / 1000));
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const { searchParams } = new URL(request.url);
  const rawQ = searchParams.get("q");

  if (!rawQ) return NextResponse.json({ error: "q is required" }, { status: 400 });

  // Prisma parameterises queries, so the risk here is cost, not SQL injection:
  // cap the length so nobody can force an expensive scan with a huge term.
  const q = sanitizeText(rawQ, MAX_QUERY_CHARS);
  if (!q) return NextResponse.json({ error: "q is required" }, { status: 400 });

  try {
    const { prisma } = await import("@/lib/prisma");
    const [books, authors, quotes] = await Promise.all([
      prisma.book.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
            { aiSummaryMedium: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 10,
        select: { id: true, title: true, slug: true, aiSummaryShort: true, originalLanguage: true, yearPublished: true, coverImageUrl: true },
      }),
      prisma.person.findMany({
        where: { name: { contains: q, mode: "insensitive" } },
        take: 5,
        select: { id: true, name: true, slug: true, nationality: true, photoUrl: true },
      }),
      prisma.quote.findMany({
        where: { text: { contains: q, mode: "insensitive" } },
        take: 5,
        include: { person: { select: { name: true } }, book: { select: { title: true, slug: true } } },
      }),
    ]);
    return NextResponse.json({ books, authors, quotes, query: q });
  } catch {
    return NextResponse.json({ books: [], authors: [], quotes: [], query: q });
  }
}

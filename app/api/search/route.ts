import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

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

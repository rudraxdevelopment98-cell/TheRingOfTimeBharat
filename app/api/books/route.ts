import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const era = searchParams.get("era");
  const language = searchParams.get("language");

  try {
    const { prisma } = await import("@/lib/prisma");
    const where = {
      ...(era ? { era: era as never } : {}),
      ...(language ? { originalLanguage: language } : {}),
    };

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { viewsCount: "desc" },
        include: { authors: { include: { person: true } } },
      }),
      prisma.book.count({ where }),
    ]);

    return NextResponse.json({ books, total, page, totalPages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }
}

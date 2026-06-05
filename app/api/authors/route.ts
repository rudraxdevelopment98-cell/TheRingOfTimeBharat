import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const nationality = searchParams.get("nationality");

  try {
    const { prisma } = await import("@/lib/prisma");
    const where = {
      books: { some: { role: "AUTHOR" as const } },
      ...(nationality ? { nationality } : {}),
    };
    const [authors, total] = await Promise.all([
      prisma.person.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { totalWorks: "desc" },
        select: { id: true, name: true, slug: true, nationality: true, birthYear: true, deathYear: true, photoUrl: true, totalWorks: true, averageRating: true },
      }),
      prisma.person.count({ where }),
    ]);
    return NextResponse.json({ authors, total, page, totalPages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }
}

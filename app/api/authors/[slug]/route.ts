import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const person = await prisma.person.findUnique({
      where: { slug: params.slug },
      include: {
        books: {
          include: { book: true },
          where: { role: "AUTHOR" },
          orderBy: { book: { yearPublished: "asc" } },
        },
        quotes: { take: 10, include: { book: true } },
      },
    });
    if (!person) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(person);
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const collection = await prisma.collection.findUnique({
      where: { id: params.id },
      include: {
        books: {
          orderBy: { position: "asc" },
          include: { book: { include: { authors: { include: { person: true } } } } },
        },
      },
    });
    if (!collection) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(collection);
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const { name, description, isPublic, tags } = body;

  try {
    const { prisma } = await import("@/lib/prisma");
    const existing = await prisma.collection.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const updated = await prisma.collection.update({
      where: { id: params.id },
      data: { ...(name && { name }), ...(description !== undefined && { description }), ...(isPublic !== undefined && { isPublic }), ...(tags && { tags }) },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }
}

import { NextRequest, NextResponse } from "next/server";

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const featured = searchParams.get("featured");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  try {
    const { prisma } = await import("@/lib/prisma");
    const where = {
      ...(type ? { type: type as never } : {}),
      ...(featured === "true" ? { isFeatured: true } : {}),
    };
    const [collections, total] = await Promise.all([
      prisma.collection.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { isFeatured: "desc" },
        include: {
          books: {
            take: 4,
            include: { book: { select: { coverImageUrl: true } } },
          },
        },
      }),
      prisma.collection.count({ where }),
    ]);
    return NextResponse.json({ collections, total, page, totalPages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, description, type, isPublic, tags, theme } = body;

  if (!name) return NextResponse.json({ error: "name is required" }, { status: 400 });

  try {
    const { prisma } = await import("@/lib/prisma");
    const collection = await prisma.collection.create({
      data: {
        name,
        slug: slugify(name),
        description,
        type: type ?? "USER",
        isPublic: isPublic ?? true,
        tags: tags ?? [],
        theme,
      },
    });
    return NextResponse.json(collection, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }
}

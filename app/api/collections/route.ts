import { NextRequest, NextResponse } from "next/server";
import {
  exceedsSizeLimit,
  getClientIp,
  rateLimit,
  sanitizeText,
} from "@/lib/security";

const MAX_BODY_BYTES = 32 * 1024;
const MAX_TAGS = 25;
const MAX_TAG_CHARS = 50;

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
  const limited = rateLimit(`collections:${getClientIp(request)}`, {
    limit: 20,
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

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const body = raw as Record<string, unknown>;
  const { type, isPublic } = body;

  const name = typeof body.name === "string" ? sanitizeText(body.name, 150) : "";
  const description =
    typeof body.description === "string" ? sanitizeText(body.description, 2000) : undefined;
  const theme = typeof body.theme === "string" ? sanitizeText(body.theme, 80) : undefined;
  const tags = Array.isArray(body.tags)
    ? body.tags
        .slice(0, MAX_TAGS)
        .map((t) => (typeof t === "string" ? sanitizeText(t, MAX_TAG_CHARS) : ""))
        .filter((t): t is string => t.length > 0)
    : [];

  if (!name) return NextResponse.json({ error: "name is required" }, { status: 400 });

  try {
    const { prisma } = await import("@/lib/prisma");
    const collection = await prisma.collection.create({
      data: {
        name,
        slug: slugify(name),
        description,
        type: (type ?? "USER") as never,
        isPublic: typeof isPublic === "boolean" ? isPublic : true,
        tags,
        theme,
      },
    });
    return NextResponse.json(collection, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }
}

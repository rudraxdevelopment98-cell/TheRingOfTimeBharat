import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getBookPrice } from "@/lib/pricing";
import { getPurchaseDelegate, PRISMA_GENERATE_HINT } from "@/lib/purchase-client";

/* ------------------------------------------------------------------ *
 * Tiny in-memory rate limiter: 10 requests / 60s / IP.
 * Single-instance only — swap for Redis (ioredis is already a dep) if
 * the app is deployed across multiple nodes.
 * ------------------------------------------------------------------ */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude bound on memory growth
  return recent.length > MAX_REQUESTS;
}

function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  let bookId: string | undefined;
  try {
    const body = (await request.json()) as { bookId?: string };
    bookId = body.bookId;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!bookId || typeof bookId !== "string") {
    return NextResponse.json({ error: "bookId is required" }, { status: 400 });
  }

  try {
    const { prisma } = await import("@/lib/prisma");

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { id: true, title: true, priceCents: true, isDownloadable: true },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    if (!book.isDownloadable) {
      return NextResponse.json(
        { error: "This title is not available for download" },
        { status: 400 }
      );
    }

    const amountCents = getBookPrice(book);
    const currency = "USD";

    // `prisma.purchase` only exists after `npx prisma generate` has been run
    // against the updated schema. Fail loudly but gracefully until then.
    const purchaseModel = getPurchaseDelegate(prisma);
    if (!purchaseModel) {
      return NextResponse.json({ error: PRISMA_GENERATE_HINT }, { status: 503 });
    }

    const purchase = await purchaseModel.upsert({
      where: { userId_bookId: { userId, bookId } },
      update: { amountCents, currency },
      create: { userId, bookId, amountCents, currency, status: "PENDING", provider: "stripe" },
    });

    /* ================================================================
     * INTEGRATION POINT — payment provider checkout
     * ================================================================
     * Stripe is deliberately NOT installed yet. When it is
     * (`npm i stripe`), replace the `checkoutUrl: null` below with a
     * real Checkout Session:
     *
     *   import Stripe from "stripe";
     *   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
     *
     *   const checkout = await stripe.checkout.sessions.create({
     *     mode: "payment",
     *     line_items: [{
     *       quantity: 1,
     *       price_data: {
     *         currency,
     *         unit_amount: amountCents,
     *         product_data: { name: `${book.title} — summary download` },
     *       },
     *     }],
     *     success_url: `${process.env.NEXTAUTH_URL}/purchases?success=1`,
     *     cancel_url:  `${process.env.NEXTAUTH_URL}/book/${book.id}?cancelled=1`,
     *     client_reference_id: purchase.id,
     *     metadata: { purchaseId: purchase.id, userId, bookId },
     *   });
     *
     *   await purchaseModel.update({
     *     where: { id: purchase.id },
     *     data: { providerRef: checkout.id },
     *   });
     *
     *   return NextResponse.json({ ..., checkoutUrl: checkout.url });
     *
     * The session is then confirmed asynchronously by
     * `app/api/purchase/webhook/route.ts`.
     * ================================================================ */

    return NextResponse.json({
      purchaseId: purchase.id,
      amountCents,
      currency,
      checkoutUrl: null,
    });
  } catch {
    return NextResponse.json(
      { error: "Database not connected" },
      { status: 503 }
    );
  }
}

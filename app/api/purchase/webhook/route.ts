import { NextRequest, NextResponse } from "next/server";
import { getPurchaseDelegate, PRISMA_GENERATE_HINT } from "@/lib/purchase-client";

/**
 * Payment-provider webhook (Stripe-shaped).
 *
 * IMPORTANT — signature verification needs the RAW, unparsed request body.
 * In the App Router you get it with `await request.text()`; do NOT call
 * `request.json()` first, and do not re-serialise the parsed object (key order
 * and whitespace changes break the HMAC). There is no `bodyParser: false`
 * config to set here — App Router route handlers never pre-parse the body.
 *
 * Always run this route on the Node.js runtime: the Stripe SDK needs `crypto`.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  /* ================================================================
   * INTEGRATION POINT — verify the webhook signature
   * ================================================================
   * Once `stripe` is installed:
   *
   *   import Stripe from "stripe";
   *   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
   *
   *   let event: Stripe.Event;
   *   try {
   *     event = stripe.webhooks.constructEvent(
   *       rawBody,
   *       signature!,
   *       process.env.STRIPE_WEBHOOK_SECRET!
   *     );
   *   } catch {
   *     return NextResponse.json({ error: "Bad signature" }, { status: 400 });
   *   }
   *
   * Then branch on `event.type`:
   *   checkout.session.completed        -> status COMPLETED, completedAt now()
   *   checkout.session.async_payment_failed / payment_intent.payment_failed
   *                                     -> status FAILED
   *   charge.refunded                   -> status REFUNDED
   *
   * Match the Purchase row by `providerRef` (the Checkout Session id we stored
   * in app/api/purchase/route.ts) or by `metadata.purchaseId`.
   * ================================================================ */

  if (!signature) {
    return NextResponse.json({ error: "Missing signature header" }, { status: 400 });
  }

  // --- Placeholder event extraction (replace with the verified event above) ---
  let providerRef: string | null = null;
  let nextStatus: "COMPLETED" | "FAILED" | "REFUNDED" | null = null;
  try {
    const parsed = JSON.parse(rawBody) as {
      type?: string;
      data?: { object?: { id?: string; metadata?: { purchaseId?: string } } };
    };
    providerRef = parsed.data?.object?.id ?? null;
    if (parsed.type === "checkout.session.completed") nextStatus = "COMPLETED";
    else if (parsed.type === "charge.refunded") nextStatus = "REFUNDED";
    else if (parsed.type?.includes("payment_failed")) nextStatus = "FAILED";
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Unhandled event types are acknowledged so the provider stops retrying.
  if (!nextStatus || !providerRef) {
    return NextResponse.json({ received: true, handled: false });
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const purchaseModel = getPurchaseDelegate(prisma);
    if (!purchaseModel) {
      return NextResponse.json({ error: PRISMA_GENERATE_HINT }, { status: 503 });
    }

    await purchaseModel.updateMany({
      where: { providerRef },
      data: {
        status: nextStatus,
        ...(nextStatus === "COMPLETED" ? { completedAt: new Date() } : {}),
      },
    });
  } catch {
    // Return 200 anyway would hide real failures; 503 makes the provider retry.
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  }

  return NextResponse.json({ received: true, handled: true });
}

/**
 * Pricing helpers for paid summary downloads.
 *
 * Amounts are always stored and passed around as integer minor units (cents)
 * to avoid floating-point drift — the same convention Stripe uses.
 */

export const DEFAULT_PRICE_CENTS = 299;

export function formatPrice(cents: number, currency = "USD"): string {
  const safe = Number.isFinite(cents) ? cents : 0;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(safe / 100);
  } catch {
    // Unknown currency code — fall back to a plain rendering.
    return `${(safe / 100).toFixed(2)} ${currency}`;
  }
}

export function getBookPrice(book: { priceCents?: number | null }): number {
  const price = book?.priceCents;
  return typeof price === "number" && price > 0 ? price : DEFAULT_PRICE_CENTS;
}

/**
 * Defensive accessor for the `Purchase` Prisma delegate.
 *
 * `prisma.purchase` only exists once `npx prisma generate` has been run against
 * the schema that introduced the model. Until then the property is `undefined`
 * at runtime, so every call site goes through `getPurchaseDelegate()` and
 * returns a clear 503 when it is missing — that keeps `next build` and the
 * type-checker green on a machine with no database.
 */

export interface PurchaseRow {
  id: string;
  userId: string;
  bookId: string;
  amountCents: number;
  currency: string;
  status: string;
  provider: string;
  providerRef: string | null;
  downloadCount: number;
  createdAt: Date;
  completedAt: Date | null;
  book?: { id: string; title: string; slug: string; coverImageUrl: string | null } | null;
}

export interface PurchaseDelegate {
  findFirst(args: unknown): Promise<PurchaseRow | null>;
  findUnique(args: unknown): Promise<PurchaseRow | null>;
  findMany(args: unknown): Promise<PurchaseRow[]>;
  create(args: unknown): Promise<PurchaseRow>;
  upsert(args: unknown): Promise<PurchaseRow>;
  update(args: unknown): Promise<PurchaseRow>;
  updateMany(args: unknown): Promise<{ count: number }>;
}

export const PRISMA_GENERATE_HINT =
  "Purchase model unavailable — run `npx prisma generate` (and `npx prisma db push`) after the schema update.";

export function getPurchaseDelegate(client: unknown): PurchaseDelegate | null {
  const delegate = (client as { purchase?: PurchaseDelegate } | null)?.purchase;
  return delegate && typeof delegate.findMany === "function" ? delegate : null;
}

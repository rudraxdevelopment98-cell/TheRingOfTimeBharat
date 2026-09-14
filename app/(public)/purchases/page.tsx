import Link from "next/link";
import type { Metadata } from "next";
import { Receipt, BookOpen, Lock } from "lucide-react";
import { auth } from "@/lib/auth";
import { formatPrice } from "@/lib/pricing";
import { getPurchaseDelegate, type PurchaseRow } from "@/lib/purchase-client";
import RedownloadButton from "@/components/purchases/RedownloadButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Purchases · Bibliosphere",
  description: "Every summary download you own, ready to re-download at any time.",
};

function Header({ subtitle }: { subtitle: string }) {
  return (
    <div
      className="border-b py-12"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center gap-3">
          <Receipt className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
          <p
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--accent-gold-text, var(--accent-gold))" }}
          >
            Your Account
          </p>
        </div>
        <h1
          className="mb-4 text-4xl md:text-5xl font-light"
          style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
        >
          My purchases
        </h1>
        <p
          className="text-base"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  body,
  cta,
}: {
  icon: typeof BookOpen;
  title: string;
  body: string;
  cta: { href: string; label: string };
}) {
  return (
    <div
      className="rounded-2xl px-6 py-16 text-center"
      style={{ border: "1px dashed var(--border)", backgroundColor: "var(--bg-surface)" }}
    >
      <Icon className="mx-auto mb-5 h-10 w-10" style={{ color: "var(--text-faint)" }} />
      <p
        className="mb-2 text-2xl font-light"
        style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
      >
        {title}
      </p>
      <p
        className="mx-auto mb-7 max-w-md text-sm leading-relaxed"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
      >
        {body}
      </p>
      <Link
        href={cta.href}
        className="inline-block rounded-xl px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90"
        style={{
          backgroundColor: "var(--accent-primary)",
          color: "var(--on-accent-primary, #ffffff)",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        {cta.label}
      </Link>
    </div>
  );
}

export default async function PurchasesPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
        <Header subtitle="Sign in to see the downloads you own." />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          <EmptyState
            icon={Lock}
            title="You're signed out"
            body="Your purchases are tied to your account. Sign in to see and re-download everything you own — reading summaries stays free either way."
            cta={{ href: "/auth/signin", label: "Sign in" }}
          />
        </div>
      </div>
    );
  }

  let purchases: PurchaseRow[] = [];
  let dbError: string | null = null;

  try {
    const { prisma } = await import("@/lib/prisma");
    const purchaseModel = getPurchaseDelegate(prisma);
    if (!purchaseModel) {
      dbError = "Purchase records aren't available yet — run `npx prisma generate`.";
    } else {
      purchases = await purchaseModel.findMany({
        where: { userId, status: "COMPLETED" },
        orderBy: { completedAt: "desc" },
        include: { book: { select: { id: true, title: true, slug: true, coverImageUrl: true } } },
      });
    }
  } catch {
    dbError = "We couldn't reach the database. Please try again shortly.";
  }

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <Header
        subtitle={
          purchases.length > 0
            ? `${purchases.length} download${purchases.length === 1 ? "" : "s"} in your library — yours for good.`
            : "Every download you buy lives here, forever."
        }
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {dbError && (
          <div
            className="mb-8 rounded-xl border p-4 text-sm"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
          >
            {dbError}
          </div>
        )}

        {!dbError && purchases.length === 0 && (
          <EmptyState
            icon={BookOpen}
            title="No purchases yet"
            body="You haven't bought any downloadable editions. Browse the library — reading every summary is free, and you only pay when you want to keep a copy."
            cta={{ href: "/explore", label: "Explore books" }}
          />
        )}

        {purchases.length > 0 && (
          <div className="space-y-4">
            {purchases.map((p) => (
              <div
                key={p.id}
                className="flex flex-col gap-5 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <div className="min-w-0">
                  <Link
                    href={p.book?.slug ? `/book/${p.book.slug}` : "/explore"}
                    className="text-xl font-light hover:underline underline-offset-4"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                  >
                    {p.book?.title ?? "Untitled"}
                  </Link>
                  <div
                    className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs"
                    style={{ color: "var(--text-faint)" }}
                  >
                    <span style={{ fontFamily: "var(--font-fira-code)" }}>
                      {formatPrice(p.amountCents, p.currency)}
                    </span>
                    <span>
                      Purchased{" "}
                      {new Date(p.completedAt ?? p.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span>
                      {p.downloadCount} download{p.downloadCount === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>

                <RedownloadButton bookId={p.bookId} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import AuthProvider from "@/components/providers/AuthProvider";
import OAuthButtons from "@/components/auth/OAuthButtons";

export const metadata: Metadata = {
  title: "Sign in · Bibliosphere",
  description: "Sign in to save your library, keep notes, and buy summary downloads.",
};

export default function SignInPage({
  searchParams,
}: {
  searchParams?: { callbackUrl?: string };
}) {
  const callbackUrl = searchParams?.callbackUrl ?? "/";

  return (
    <div
      className="flex min-h-[80vh] items-center justify-center px-4 py-16"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="w-full max-w-md">
        {/* Logo mark */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div
            className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl shadow-md"
            style={{ backgroundColor: "var(--accent-primary)" }}
          >
            <BookOpen className="h-6 w-6" style={{ color: "var(--on-accent-primary, #ffffff)" }} />
          </div>
          <p
            className="mb-3 text-xs uppercase tracking-widest"
            style={{ color: "var(--accent-gold-text, var(--accent-gold))", fontFamily: "var(--font-dm-sans)" }}
          >
            Bibliosphere
          </p>
          <h1
            className="mb-2 text-4xl font-light"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Welcome back
          </h1>
          <p
            className="text-base"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
          >
            Pick up where you left off — your shelves, notes, and purchases are waiting.
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border p-7 shadow-sm"
          style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
        >
          <AuthProvider>
            <OAuthButtons callbackUrl={callbackUrl} />
          </AuthProvider>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
            <span
              className="text-[11px] uppercase tracking-widest"
              style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
            >
              One account, everywhere
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
          </div>

          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
          >
            Reading summaries is always free and never needs an account. You only sign in to keep a
            personal library, save highlights, and purchase downloadable editions.
          </p>

          <p className="mt-5 text-xs leading-relaxed" style={{ color: "var(--text-faint)" }}>
            By continuing you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-2" style={{ color: "var(--text-muted)" }}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-2" style={{ color: "var(--text-muted)" }}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--text-faint)" }}>
          Just here to read?{" "}
          <Link href="/explore" className="underline underline-offset-4" style={{ color: "var(--accent-primary)" }}>
            Browse summaries free
          </Link>
        </p>
      </div>
    </div>
  );
}

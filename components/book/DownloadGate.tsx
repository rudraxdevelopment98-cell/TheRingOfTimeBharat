"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Lock,
  Download,
  Loader2,
  Check,
  AlertCircle,
  FileText,
  Infinity as InfinityIcon,
  WifiOff,
} from "lucide-react";
import AuthProvider from "@/components/providers/AuthProvider";
import { formatPrice } from "@/lib/pricing";

export interface DownloadGateProps {
  bookId: string;
  bookTitle: string;
  priceCents: number;
  isDownloadable: boolean;
}

const INCLUDED = [
  { icon: FileText, text: "PDF + EPUB, formatted for reading" },
  { icon: InfinityIcon, text: "Lifetime access — re-download anytime" },
  { icon: WifiOff, text: "Offline reading on any device" },
];

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-6 rounded-2xl border p-5"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--accent-gold, var(--border))",
      }}
    >
      {children}
    </div>
  );
}

function FreeNote() {
  return (
    <p
      className="mt-4 text-xs leading-relaxed"
      style={{ color: "var(--text-faint)", fontFamily: "var(--font-source-serif)" }}
    >
      Reading the summary is always free. Payment is only for the downloadable edition.
    </p>
  );
}

function GateInner({ bookId, bookTitle, priceCents, isDownloadable }: DownloadGateProps) {
  const { data: session, status } = useSession();
  const [purchased, setPurchased] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const signedIn = status === "authenticated" && Boolean(session?.user);

  // Probe the download route: 200 means an entitlement exists, 403 means not.
  useEffect(() => {
    if (!signedIn || !isDownloadable) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/books/${bookId}/download`, { method: "GET" });
        if (!cancelled && res.ok) setPurchased(true);
      } catch {
        /* offline — leave the purchase card showing */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [bookId, signedIn, isDownloadable]);

  const buy = useCallback(async () => {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });
      const data = (await res.json()) as {
        checkoutUrl?: string | null;
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Could not start the purchase. Please try again.");
        return;
      }
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setMessage(
        "Your order is reserved. Checkout is not connected yet — the payment provider is being set up."
      );
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }, [bookId]);

  const download = useCallback(async () => {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`/api/books/${bookId}/download`);
      const data = (await res.json()) as { downloadUrl?: string | null; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Download unavailable.");
        return;
      }
      if (data.downloadUrl) {
        window.location.href = data.downloadUrl;
      } else {
        setMessage("File storage is not configured yet — your purchase is still recorded.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }, [bookId]);

  if (!isDownloadable) return null;

  const heading = (
    <div className="mb-4 flex items-center gap-2.5">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg"
        style={{ backgroundColor: "var(--accent-gold)" }}
      >
        {purchased ? (
          <Download className="h-4 w-4" style={{ color: "var(--on-accent-gold, #1a1a1a)" }} />
        ) : (
          <Lock className="h-4 w-4" style={{ color: "var(--on-accent-gold, #1a1a1a)" }} />
        )}
      </span>
      <div>
        <p
          className="text-[11px] uppercase tracking-widest"
          style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
        >
          {purchased ? "Your library" : "Downloadable edition"}
        </p>
        <p
          className="text-lg font-light leading-tight"
          style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
        >
          {purchased ? "Ready to download" : formatPrice(priceCents)}
        </p>
      </div>
    </div>
  );

  const feedback = (
    <>
      {error && (
        <p
          className="mt-3 flex items-start gap-2 text-xs leading-relaxed"
          style={{ color: "var(--accent-secondary, var(--text-muted))" }}
        >
          <AlertCircle className="mt-px h-3.5 w-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
      {message && (
        <p
          className="mt-3 flex items-start gap-2 text-xs leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          <Check className="mt-px h-3.5 w-3.5 flex-shrink-0" />
          {message}
        </p>
      )}
    </>
  );

  if (status === "loading") {
    return (
      <Shell>
        <div className="flex items-center gap-2 py-2" style={{ color: "var(--text-faint)" }}>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Checking your library…</span>
        </div>
      </Shell>
    );
  }

  if (!signedIn) {
    return (
      <Shell>
        {heading}
        <p
          className="mb-4 text-sm leading-relaxed"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
        >
          Get <span className="italic">{bookTitle}</span> as a formatted PDF and EPUB you can keep.
        </p>
        <Link
          href="/auth/signin"
          className="block w-full rounded-xl px-4 py-3 text-center text-sm font-medium transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "var(--accent-primary)",
            color: "var(--on-accent-primary, #ffffff)",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          Sign in to purchase
        </Link>
        <FreeNote />
      </Shell>
    );
  }

  if (purchased) {
    return (
      <Shell>
        {heading}
        <button
          type="button"
          onClick={() => void download()}
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            backgroundColor: "var(--accent-gold)",
            color: "var(--on-accent-gold, #1a1a1a)",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Download
        </button>
        {feedback}
        <p className="mt-4 text-xs" style={{ color: "var(--text-faint)" }}>
          Also available anytime from{" "}
          <Link href="/purchases" className="underline underline-offset-2">
            My purchases
          </Link>
          .
        </p>
      </Shell>
    );
  }

  return (
    <Shell>
      {heading}
      <ul className="mb-5 space-y-2">
        {INCLUDED.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2.5 text-xs" style={{ color: "var(--text-muted)" }}>
            <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-gold)" }} />
            {text}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => void buy()}
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          backgroundColor: "var(--accent-gold)",
          color: "var(--on-accent-gold, #1a1a1a)",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        Buy &amp; Download · {formatPrice(priceCents)}
      </button>
      {feedback}
      <FreeNote />
    </Shell>
  );
}

export default function DownloadGate(props: DownloadGateProps) {
  // AuthProvider is mounted locally until it can be hoisted into app/layout.tsx.
  return (
    <AuthProvider>
      <GateInner {...props} />
    </AuthProvider>
  );
}

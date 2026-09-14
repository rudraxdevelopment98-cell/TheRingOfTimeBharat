"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

export default function RedownloadButton({ bookId }: { bookId: string }) {
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    setNote(null);
    try {
      const res = await fetch(`/api/books/${bookId}/download`);
      const data = (await res.json()) as { downloadUrl?: string | null; error?: string };
      if (!res.ok) {
        setNote(data.error ?? "Download unavailable.");
      } else if (data.downloadUrl) {
        window.location.href = data.downloadUrl;
      } else {
        setNote("File storage is not configured yet.");
      }
    } catch {
      setNote("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="text-right">
      <button
        type="button"
        onClick={() => void run()}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{
          backgroundColor: "var(--accent-gold)",
          color: "var(--on-accent-gold, #1a1a1a)",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        Download
      </button>
      {note && (
        <p className="mt-1.5 max-w-[16rem] text-xs" style={{ color: "var(--text-faint)" }}>
          {note}
        </p>
      )}
    </div>
  );
}

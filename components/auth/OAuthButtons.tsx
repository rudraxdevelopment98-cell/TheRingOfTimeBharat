"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

function GoogleMark() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 48 48" aria-hidden focusable="false">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18A13.2 13.2 0 0 1 11 24c0-1.45.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7C13.42 14.62 18.27 10.75 24 10.75z"
      />
    </svg>
  );
}

function GitHubMark() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.1c-3.2.7-3.88-1.37-3.88-1.37-.53-1.35-1.29-1.71-1.29-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

export default function OAuthButtons({ callbackUrl = "/" }: { callbackUrl?: string }) {
  const [pending, setPending] = useState<string | null>(null);

  function go(provider: "google" | "github") {
    setPending(provider);
    void signIn(provider, { callbackUrl });
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => go("google")}
        disabled={pending !== null}
        className="flex w-full items-center justify-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          backgroundColor: "var(--bg-elevated)",
          borderColor: "var(--border)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        {pending === "google" ? <Loader2 className="h-[18px] w-[18px] animate-spin" /> : <GoogleMark />}
        Continue with Google
      </button>

      <button
        type="button"
        onClick={() => go("github")}
        disabled={pending !== null}
        className="flex w-full items-center justify-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          backgroundColor: "#18181b",
          borderColor: "#18181b",
          color: "#ffffff",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        {pending === "github" ? <Loader2 className="h-[18px] w-[18px] animate-spin" /> : <GitHubMark />}
        Continue with GitHub
      </button>
    </div>
  );
}

import Link from "next/link";
import { ChevronLeft, Sparkles } from "lucide-react";
import { AIChatWindow } from "@/components/ai/AIChatWindow";

export default function BookChatPage({ params }: { params: { slug: string } }) {
  const title = params.slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href={`/book/${params.slug}`}
          className="mb-8 inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-80"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to {title}
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p
            className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest"
            style={{ color: "var(--accent-gold)" }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Reading Assistant
          </p>
          <h1
            className="text-4xl font-light md:text-5xl"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "var(--text-primary)",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Chat container */}
        <div
          className="h-[70vh] overflow-hidden rounded-2xl border shadow-2xl"
          style={{
            backgroundColor: "var(--bg-base)",
            borderColor: "var(--border)",
          }}
        >
          <AIChatWindow
            bookTitle={title}
            authorName="Unknown"
            genre="Literature"
            language="English"
          />
        </div>

        {/* Disclaimer */}
        <p
          className="mt-4 text-center text-xs"
          style={{
            color: "var(--text-faint)",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          AI responses may contain inaccuracies. Always verify against the source
          text.
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Quote, Heart, Link2, Share2, BookOpen, ArrowLeft } from "lucide-react";

interface QuoteRecord {
  text: string;
  author: string;
  book: string;
  year: string;
  language: string;
  likesCount: number;
}

const QUOTES: Record<string, QuoteRecord> = {
  default: {
    text: "Beauty will save the world.",
    author: "Fyodor Dostoevsky",
    book: "The Idiot",
    year: "1869",
    language: "Russian",
    likesCount: 2640,
  },
};

const RELATED = [
  {
    id: "21",
    text: "To love someone means to see them as God intended them.",
    note: "from the same novel",
  },
  {
    id: "22",
    text: "Compassion is the chief law of human existence.",
    note: "from the same novel",
  },
  {
    id: "23",
    text: "It is better to be unhappy and know the worst than to be happy in a fool's paradise.",
    note: "from the same novel",
  },
];

export default function QuotePage({ params }: { params: { id: string } }) {
  const quote = QUOTES[params.id] ?? QUOTES.default;

  return (
    <div style={{ backgroundColor: "var(--bg-base)" }}>
      {/* Back link */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/quotes"
          className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to quotes
        </Link>
      </div>

      {/* Hero quote */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Quote
          className="mx-auto mb-8 h-12 w-12"
          style={{ color: "var(--accent-gold)" }}
          aria-hidden
        />
        <blockquote
          className="mx-auto max-w-3xl text-3xl md:text-4xl font-light italic leading-snug"
          style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
        >
          &ldquo;{quote.text}&rdquo;
        </blockquote>

        <div className="mt-10">
          <p
            className="text-lg font-medium"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)" }}
          >
            {quote.author}
          </p>
          <p className="mt-1 text-base" style={{ color: "var(--text-muted)" }}>
            <span className="italic" style={{ fontFamily: "var(--font-source-serif)" }}>
              {quote.book}
            </span>{" "}
            · {quote.year}
          </p>
        </div>

        {/* Meta row */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <span
            className="inline-flex items-center gap-1.5 text-sm"
            style={{ color: "var(--text-faint)" }}
          >
            <Heart className="h-4 w-4" style={{ color: "var(--accent-primary)" }} />
            <span style={{ fontFamily: "var(--font-fira-code)" }}>
              {quote.likesCount.toLocaleString()}
            </span>
          </span>
          <span
            className="rounded-full px-3 py-1 text-xs"
            style={{
              backgroundColor: "var(--bg-elevated)",
              color: "var(--text-faint)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {quote.language}
          </span>
        </div>

        {/* Share buttons */}
        <div className="mt-9 flex items-center justify-center gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            <Link2 className="h-4 w-4" style={{ color: "var(--accent-secondary)" }} />
            Copy link
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--accent-primary)", fontFamily: "var(--font-dm-sans)" }}
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </section>

      {/* More from this book */}
      <section
        className="border-t py-16"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex items-center gap-3">
            <BookOpen className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
            <h2
              className="text-2xl font-light"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
            >
              More from {quote.book}
            </h2>
          </div>

          <div className="space-y-4">
            {RELATED.map((r) => (
              <Link
                key={r.id}
                href={`/quote/${r.id}`}
                className="group block rounded-2xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ backgroundColor: "var(--bg-base)", borderColor: "var(--border)" }}
              >
                <p
                  className="text-lg italic leading-relaxed transition-opacity group-hover:opacity-90"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                >
                  &ldquo;{r.text}&rdquo;
                </p>
                <p
                  className="mt-3 text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
                >
                  {r.note} · {quote.author}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

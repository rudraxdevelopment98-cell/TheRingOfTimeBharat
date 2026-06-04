import Link from "next/link";
import { Quote, Heart, Filter, BookOpen } from "lucide-react";

interface QuoteItem {
  text: string;
  author: string;
  book: string;
  year: string;
  language: string;
  likesCount: number;
}

const FILTERS = ["All", "By Theme", "By Author", "By Language"];

const QUOTES: QuoteItem[] = [
  {
    text: "The only way out of the labyrinth of suffering is to forgive.",
    author: "John Green",
    book: "Looking for Alaska",
    year: "2005",
    language: "English",
    likesCount: 3120,
  },
  {
    text: "We are all in the gutter, but some of us are looking at the stars.",
    author: "Oscar Wilde",
    book: "Lady Windermere's Fan",
    year: "1892",
    language: "English",
    likesCount: 4870,
  },
  {
    text: "Beauty will save the world.",
    author: "Fyodor Dostoevsky",
    book: "The Idiot",
    year: "1869",
    language: "Russian",
    likesCount: 2640,
  },
  {
    text: "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
    author: "Antoine de Saint-Exupéry",
    book: "The Little Prince",
    year: "1943",
    language: "French",
    likesCount: 6210,
  },
  {
    text: "You never really understand a person until you consider things from his point of view.",
    author: "Harper Lee",
    book: "To Kill a Mockingbird",
    year: "1960",
    language: "English",
    likesCount: 5390,
  },
  {
    text: "Time is the longest distance between two places.",
    author: "Tennessee Williams",
    book: "The Glass Menagerie",
    year: "1944",
    language: "English",
    likesCount: 1980,
  },
  {
    text: "The world breaks everyone, and afterward many are strong at the broken places.",
    author: "Ernest Hemingway",
    book: "A Farewell to Arms",
    year: "1929",
    language: "English",
    likesCount: 4120,
  },
  {
    text: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche",
    book: "Twilight of the Idols",
    year: "1889",
    language: "German",
    likesCount: 3780,
  },
  {
    text: "There is no greater sorrow than to recall happiness in times of misery.",
    author: "Dante Alighieri",
    book: "Inferno",
    year: "1320",
    language: "Italian",
    likesCount: 2210,
  },
  {
    text: "We accept the love we think we deserve.",
    author: "Stephen Chbosky",
    book: "The Perks of Being a Wallflower",
    year: "1999",
    language: "English",
    likesCount: 7430,
  },
  {
    text: "And, when you want something, all the universe conspires in helping you to achieve it.",
    author: "Paulo Coelho",
    book: "The Alchemist",
    year: "1988",
    language: "Portuguese",
    likesCount: 8910,
  },
  {
    text: "Memory is the diary that we all carry about with us.",
    author: "Oscar Wilde",
    book: "The Importance of Being Earnest",
    year: "1895",
    language: "English",
    likesCount: 2050,
  },
];

export default function QuotesPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)" }}>
      {/* Header band */}
      <div
        className="border-b py-12"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 flex items-center gap-3">
            <Quote className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
            <p
              className="text-xs uppercase tracking-widest font-medium"
              style={{ color: "var(--accent-gold)" }}
            >
              The Commonplace Book
            </p>
          </div>
          <h1
            className="mb-4 text-4xl md:text-5xl font-light"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Quotes worth remembering
          </h1>
          <p
            className="text-base"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
          >
            Lines that lodged themselves in a reader&apos;s memory and refused to leave. Gathered, copied
            out, and kept close.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter pills */}
        <div className="mb-10 flex flex-wrap items-center gap-2.5">
          <span
            className="mr-1 inline-flex items-center gap-1.5 text-xs"
            style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
          >
            <Filter className="h-3.5 w-3.5" />
            Filter
          </span>
          {FILTERS.map((f, i) => (
            <button
              key={f}
              className="rounded-full border px-4 py-1.5 text-xs font-medium transition-all hover:-translate-y-0.5"
              style={
                i === 0
                  ? {
                      backgroundColor: "var(--accent-primary)",
                      borderColor: "var(--accent-primary)",
                      color: "#fff",
                      fontFamily: "var(--font-dm-sans)",
                    }
                  : {
                      backgroundColor: "var(--bg-surface)",
                      borderColor: "var(--border)",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-dm-sans)",
                    }
              }
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {QUOTES.map((q, i) => (
            <Link
              key={i}
              href={`/quote/${i + 1}`}
              className="group mb-5 block break-inside-avoid rounded-2xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <span
                className="block text-5xl leading-none"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--accent-gold)" }}
                aria-hidden
              >
                &ldquo;
              </span>
              <p
                className="-mt-3 text-lg italic leading-relaxed transition-opacity group-hover:opacity-90"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
              >
                {q.text}
              </p>

              <div className="my-5 h-px w-full" style={{ backgroundColor: "var(--border)" }} />

              <div className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--text-faint)" }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)" }}
                >
                  {q.author}
                </span>
              </div>
              <p className="mt-0.5 text-sm" style={{ color: "var(--text-muted)" }}>
                <span className="italic" style={{ fontFamily: "var(--font-source-serif)" }}>
                  {q.book}
                </span>{" "}
                · {q.year}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-1.5 text-xs"
                  style={{ color: "var(--text-faint)" }}
                >
                  <Heart className="h-3.5 w-3.5" style={{ color: "var(--accent-primary)" }} />
                  <span style={{ fontFamily: "var(--font-fira-code)" }}>
                    {q.likesCount.toLocaleString()}
                  </span>
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    color: "var(--text-faint)",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {q.language}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

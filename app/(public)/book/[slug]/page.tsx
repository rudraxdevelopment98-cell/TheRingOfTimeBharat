import Link from "next/link";
import { BookOpen, Star, Globe, Calendar, Clock, Users, Quote } from "lucide-react";

interface PlaceholderBook {
  title: string;
  yearPublished: number | null;
  yearWritten: number | null;
  originalLanguage: string | null;
  averageRating: number;
  ratingsCount: number;
  aiSummaryMedium: string | null;
  aiSummaryShort: string | null;
  authors: { person: { name: string } }[];
  editions: {
    id: string;
    language: string;
    publisher: string | null;
    publishYear: number | null;
    pageCount: number | null;
    format: string;
    isPublicDomain: boolean;
  }[];
  reviews: {
    id: string;
    body: string;
    rating: number;
    createdAt: Date;
  }[];
  quotes: {
    id: string;
    text: string;
    context: string | null;
    person: { name: string };
  }[];
}

const PLACEHOLDER_BOOK: PlaceholderBook = {
  title: "",
  yearPublished: null,
  yearWritten: null,
  originalLanguage: null,
  averageRating: 0,
  ratingsCount: 0,
  aiSummaryMedium: null,
  aiSummaryShort: null,
  authors: [],
  editions: [],
  reviews: [],
  quotes: [],
};

export default async function BookPage({ params }: { params: { slug: string } }) {
  const titleFromSlug = params.slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  let bookData: PlaceholderBook | null = null;
  let notFound = false;

  try {
    const { prisma } = await import("@/lib/prisma");
    const result = await prisma.book.findUnique({
      where: { slug: params.slug },
      include: {
        authors: { include: { person: true } },
        editions: { orderBy: { isOriginal: "desc" } },
        reviews: { take: 5, orderBy: { createdAt: "desc" } },
        quotes: { take: 3, include: { person: true } },
      },
    });

    if (result === null) {
      notFound = true;
    } else {
      bookData = result;
    }
  } catch {
    // DB not available — use placeholder
    bookData = { ...PLACEHOLDER_BOOK, title: titleFromSlug };
  }

  if (notFound) {
    return (
      <div
        style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}
        className="flex items-center justify-center"
      >
        <div className="text-center">
          <p
            className="text-3xl font-light mb-4"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Book not found
          </p>
          <Link
            href="/explore"
            className="text-sm underline underline-offset-4"
            style={{ color: "var(--accent-primary)" }}
          >
            ← Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const book = bookData ?? { ...PLACEHOLDER_BOOK, title: titleFromSlug };
  const displayTitle = book.title || titleFromSlug;
  const year = book.yearPublished ?? book.yearWritten;
  const primaryAuthor = book.authors[0]?.person?.name ?? null;
  const summary = book.aiSummaryMedium ?? book.aiSummaryShort ?? null;

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left column */}
          <div className="lg:col-span-1">
            <div
              className="aspect-[2/3] rounded-xl flex items-center justify-center mb-6 shadow-2xl"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="text-center p-8">
                <BookOpen className="h-16 w-16 mx-auto mb-4" style={{ color: "var(--text-faint)" }} />
                <p
                  className="text-2xl font-light"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)" }}
                >
                  {displayTitle}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                className="w-full rounded-xl py-3 px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--accent-primary)" }}
              >
                Add to Library
              </button>
              <button
                className="w-full rounded-xl py-3 px-4 text-sm font-medium border transition-opacity hover:opacity-80"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                Want to Read
              </button>
            </div>

            <div
              className="mt-6 rounded-xl border p-4 space-y-3"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              {[
                {
                  icon: Star,
                  label: "Rating",
                  value:
                    book.ratingsCount > 0
                      ? `${book.averageRating.toFixed(1)} / 5 (${book.ratingsCount.toLocaleString()} reviews)`
                      : "No ratings yet",
                },
                {
                  icon: Globe,
                  label: "Language",
                  value: book.originalLanguage ?? "—",
                },
                {
                  icon: Calendar,
                  label: "Published",
                  value: year != null ? String(year) : "—",
                },
                {
                  icon: Clock,
                  label: "Editions",
                  value: book.editions.length > 0 ? `${book.editions.length} edition(s)` : "—",
                },
                {
                  icon: Users,
                  label: "Author",
                  value: primaryAuthor ?? "Unknown",
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <Icon className="h-4 w-4 flex-shrink-0" style={{ color: "var(--text-faint)" }} />
                  <span style={{ color: "var(--text-faint)" }}>{label}:</span>
                  <span style={{ color: "var(--text-muted)" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "var(--accent-gold)" }}
              >
                Book
              </p>
              <h1
                className="text-4xl md:text-5xl font-light mb-3"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
              >
                {displayTitle}
              </h1>
              {primaryAuthor && (
                <p className="text-lg" style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}>
                  by {primaryAuthor}
                </p>
              )}
            </div>

            {/* Summary section */}
            {summary && (
              <div
                className="rounded-2xl border p-6 mb-6"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <h2
                  className="text-xl font-light mb-3"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                >
                  Summary
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
                >
                  {summary}
                </p>
              </div>
            )}

            {/* Tabs panel */}
            <div
              className="rounded-2xl border p-8"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <div className="flex gap-4 mb-6 flex-wrap">
                {["Editions", "Reviews", "AI Chat", "Knowledge Graph"].map((tab) => (
                  <button
                    key={tab}
                    className="px-4 py-2 rounded-full text-sm border transition-all"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Editions */}
              {book.editions.length > 0 ? (
                <div className="space-y-3 mb-8">
                  <h3
                    className="text-lg font-light mb-3"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                  >
                    Editions
                  </h3>
                  {book.editions.map((ed) => (
                    <div
                      key={ed.id}
                      className="flex items-center justify-between rounded-xl border p-4"
                      style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border)" }}
                    >
                      <div>
                        <span
                          className="text-sm font-medium"
                          style={{ color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)" }}
                        >
                          {ed.language}
                        </span>
                        {ed.publisher && (
                          <span className="text-xs ml-2" style={{ color: "var(--text-faint)" }}>
                            {ed.publisher}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-faint)" }}>
                        {ed.publishYear && <span>{ed.publishYear}</span>}
                        {ed.pageCount && <span>{ed.pageCount} pp</span>}
                        <span
                          className="rounded-full px-2 py-0.5"
                          style={{ backgroundColor: "var(--bg-surface)" }}
                        >
                          {ed.format}
                        </span>
                        {ed.isPublicDomain && (
                          <span
                            className="rounded-full px-2 py-0.5"
                            style={{ backgroundColor: "var(--accent-primary)", color: "#fff" }}
                          >
                            Public Domain
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="rounded-xl p-6 mb-8"
                  style={{ backgroundColor: "var(--bg-elevated)", border: "1px dashed var(--border)" }}
                >
                  <p
                    className="text-center italic"
                    style={{ color: "var(--text-faint)", fontFamily: "var(--font-source-serif)" }}
                  >
                    No editions recorded yet.
                  </p>
                </div>
              )}

              {/* Reviews */}
              {book.reviews.length > 0 && (
                <div className="mb-8">
                  <h3
                    className="text-lg font-light mb-3"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                  >
                    Recent Reviews
                  </h3>
                  <div className="space-y-3">
                    {book.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="rounded-xl border p-4"
                        style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border)" }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-3.5 w-3.5"
                              style={{ color: i < rev.rating ? "var(--accent-gold)" : "var(--text-faint)" }}
                            />
                          ))}
                          <span className="text-xs ml-1" style={{ color: "var(--text-faint)" }}>
                            {new Date(rev.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
                        >
                          {rev.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quotes section */}
            {book.quotes.length > 0 && (
              <div className="mt-6">
                <h2
                  className="text-2xl font-light mb-4"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                >
                  Notable Quotes
                </h2>
                <div className="space-y-4">
                  {book.quotes.map((q) => (
                    <figure
                      key={q.id}
                      className="rounded-2xl border-l-2 pl-6 pr-4 py-4"
                      style={{ borderColor: "var(--accent-primary)" }}
                    >
                      <Quote
                        className="h-4 w-4 mb-2"
                        style={{ color: "var(--accent-gold)" }}
                      />
                      <blockquote
                        className="text-lg italic leading-relaxed"
                        style={{ color: "var(--text-primary)", fontFamily: "var(--font-source-serif)" }}
                      >
                        &ldquo;{q.text}&rdquo;
                      </blockquote>
                      <figcaption
                        className="mt-2 text-xs uppercase tracking-widest"
                        style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
                      >
                        — {q.person.name}
                        {q.context && (
                          <span className="normal-case ml-2" style={{ color: "var(--text-faint)" }}>
                            · {q.context}
                          </span>
                        )}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { Search, BookOpen, User, Quote, Layers, Loader2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

type SearchResult = {
  books: { id: string; title: string; slug: string; aiSummaryShort: string | null; originalLanguage: string | null; yearPublished: number | null }[];
  authors: { id: string; name: string; slug: string; nationality: string | null }[];
  quotes: { id: string; text: string; person: { name: string } | null; book: { title: string; slug: string } | null }[];
  query: string;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setResults(null); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults({ books: [], authors: [], quotes: [], query: q });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQ) doSearch(initialQ);
  }, [initialQ, doSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
    doSearch(query);
  };

  const hasResults = results && (results.books.length > 0 || results.authors.length > 0 || results.quotes.length > 0);

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Search bar */}
      <div className="border-b py-8" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 rounded-2xl border px-5 py-3.5" style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border)" }}>
              {loading
                ? <Loader2 className="h-5 w-5 flex-shrink-0 animate-spin" style={{ color: "var(--text-faint)" }} />
                : <Search className="h-5 w-5 flex-shrink-0" style={{ color: "var(--text-faint)" }} />
              }
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books, authors, quotes, collections…"
                className="flex-1 bg-transparent text-base outline-none"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)" }}
                autoFocus
              />
              {query && (
                <button type="submit" className="rounded-lg px-3 py-1 text-sm font-medium text-white" style={{ backgroundColor: "var(--accent-primary)" }}>
                  Search
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        {/* No query */}
        {!query && (
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-2xl font-light mb-4" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)" }}>
              Search all of human literary history
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              {[
                { icon: BookOpen, label: "Books", count: "2.5M+" },
                { icon: User, label: "Authors", count: "50K+" },
                { icon: Quote, label: "Quotes", count: "200K+" },
                { icon: Layers, label: "Collections", count: "5K+" },
              ].map(({ icon: Icon, label, count }) => (
                <div key={label} className="rounded-xl border p-4 text-center" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}>
                  <Icon className="h-6 w-6 mx-auto mb-2" style={{ color: "var(--accent-primary)" }} />
                  <div className="text-xl font-medium" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>{count}</div>
                  <div className="text-xs" style={{ color: "var(--text-faint)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <Loader2 className="h-8 w-8 mx-auto animate-spin mb-3" style={{ color: "var(--accent-primary)" }} />
            <p className="text-sm" style={{ color: "var(--text-faint)" }}>Searching the archive…</p>
          </div>
        )}

        {/* No results */}
        {!loading && results && !hasResults && (
          <div className="text-center py-16">
            <Search className="h-10 w-10 mx-auto mb-4" style={{ color: "var(--text-faint)" }} />
            <p className="text-xl font-light mb-2" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)" }}>
              No results for &ldquo;{results.query}&rdquo;
            </p>
            <p className="text-sm" style={{ color: "var(--text-faint)" }}>Try a different spelling or a broader term.</p>
          </div>
        )}

        {/* Results */}
        {!loading && hasResults && results && (
          <div className="space-y-10">
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Results for <strong style={{ color: "var(--text-primary)" }}>&ldquo;{results.query}&rdquo;</strong>
            </p>

            {/* Books */}
            {results.books.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-4 w-4" style={{ color: "var(--accent-primary)" }} />
                  <h2 className="text-lg font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>Books</h2>
                  <span className="text-xs ml-auto" style={{ color: "var(--text-faint)" }}>{results.books.length} results</span>
                </div>
                <div className="space-y-2">
                  {results.books.map((book) => (
                    <Link key={book.id} href={`/book/${book.slug}`} className="flex items-start gap-4 rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5 block" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}>
                      <div className="flex h-12 w-9 flex-shrink-0 items-center justify-center rounded text-xl" style={{ backgroundColor: "var(--bg-elevated)" }}>📖</div>
                      <div className="min-w-0">
                        <p className="font-medium" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontSize: "1.05rem" }}>{book.title}</p>
                        <div className="flex gap-3 mt-0.5">
                          {book.yearPublished && <span className="text-xs" style={{ color: "var(--text-faint)" }}>{book.yearPublished < 0 ? `${Math.abs(book.yearPublished)} BC` : book.yearPublished}</span>}
                          {book.originalLanguage && <span className="text-xs" style={{ color: "var(--text-faint)" }}>{book.originalLanguage.toUpperCase()}</span>}
                        </div>
                        {book.aiSummaryShort && <p className="text-sm mt-1 line-clamp-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}>{book.aiSummaryShort}</p>}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Authors */}
            {results.authors.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-4 w-4" style={{ color: "var(--accent-primary)" }} />
                  <h2 className="text-lg font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>Authors</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {results.authors.map((author) => (
                    <Link key={author.id} href={`/author/${author.slug}`} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all hover:shadow-sm" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: "var(--accent-primary)" }}>
                        <User className="h-3 w-3 text-white" />
                      </div>
                      <span style={{ fontFamily: "var(--font-cormorant)" }}>{author.name}</span>
                      {author.nationality && <span style={{ color: "var(--text-faint)", fontSize: "0.75rem" }}>{author.nationality}</span>}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Quotes */}
            {results.quotes.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Quote className="h-4 w-4" style={{ color: "var(--accent-primary)" }} />
                  <h2 className="text-lg font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>Quotes</h2>
                </div>
                <div className="space-y-3">
                  {results.quotes.map((quote) => (
                    <div key={quote.id} className="rounded-xl border p-4" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}>
                      <p className="italic mb-2" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontSize: "1.05rem" }}>
                        &ldquo;{quote.text}&rdquo;
                      </p>
                      <p className="text-xs" style={{ color: "var(--text-faint)" }}>
                        — {quote.person?.name ?? "Unknown"}
                        {quote.book && <>, <Link href={`/book/${quote.book.slug}`} className="underline">{quote.book.title}</Link></>}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

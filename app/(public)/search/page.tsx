import { Search, BookOpen, User, Quote, Layers } from "lucide-react";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q ?? "";

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div
        className="border-b py-8"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center gap-3 rounded-2xl border px-5 py-3.5"
            style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border)" }}
          >
            <Search className="h-5 w-5 flex-shrink-0" style={{ color: "var(--text-faint)" }} />
            <input
              type="text"
              defaultValue={query}
              placeholder="Search books, authors, quotes, collections…"
              className="flex-1 bg-transparent text-base outline-none"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)" }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {query ? (
          <div>
            <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
              Showing results for{" "}
              <strong style={{ color: "var(--text-primary)" }}>&ldquo;{query}&rdquo;</strong>
            </p>
            <div
              className="rounded-2xl border p-12 text-center"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <Search className="h-12 w-12 mx-auto mb-4" style={{ color: "var(--text-faint)" }} />
              <p
                className="text-xl font-light mb-2"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)" }}
              >
                Search results will appear here
              </p>
              <p className="text-sm" style={{ color: "var(--text-faint)" }}>
                Connect Meilisearch to power instant full-text search
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center">
            <p
              className="text-2xl font-light mb-4"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)" }}
            >
              Search all of human literary history
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              {[
                { icon: BookOpen, label: "Books", count: "2.5M+" },
                { icon: User, label: "Authors", count: "50K+" },
                { icon: Quote, label: "Quotes", count: "200K+" },
                { icon: Layers, label: "Collections", count: "5K+" },
              ].map(({ icon: Icon, label, count }) => (
                <div
                  key={label}
                  className="rounded-xl border p-4 text-center"
                  style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
                >
                  <Icon className="h-6 w-6 mx-auto mb-2" style={{ color: "var(--accent-primary)" }} />
                  <div
                    className="text-xl font-medium"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                  >
                    {count}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-faint)" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

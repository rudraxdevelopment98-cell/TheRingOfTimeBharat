import Link from "next/link";
import { Library, BookOpen, Heart, Check, Plus, ArrowLeft } from "lucide-react";

const SHELVES = [
  { name: "Currently Reading", icon: BookOpen, count: 3, color: "var(--accent-primary)", books: ["📖", "📘", "📙"] },
  { name: "Want to Read", icon: Plus, count: 24, color: "var(--accent-secondary)", books: ["📗", "📕", "📜"] },
  { name: "Completed", icon: Check, count: 89, color: "var(--accent-gold)", books: ["📖", "📘", "📙"] },
  { name: "Favourites", icon: Heart, count: 12, color: "#b5338a", books: ["📗", "📕", "📜"] },
];

const CUSTOM_LISTS = [
  { name: "Philosophy Starter Pack", count: 10, description: "The 10 books I'd give anyone new to philosophy", books: ["📖", "📘", "📙"] },
  { name: "Great Novels of Exile", count: 8, description: "Writers who created their best work far from home", books: ["📗", "📕", "📜"] },
  { name: "Books That Changed My Mind", count: 6, description: "Ideas that rewired how I see the world", books: ["📖", "📘", "📙"] },
];

export default function ShelvesPage({ params }: { params: { username: string } }) {
  const { username } = params;
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div
        className="border-b py-10"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/u/${username}`}
            className="inline-flex items-center gap-1.5 text-sm mb-4"
            style={{ color: "var(--text-faint)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {username}
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Library className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
            <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--accent-gold)" }}>
              My Library
            </p>
          </div>
          <h1
            className="text-4xl font-light"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Shelves &amp; Reading Lists
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Default shelves */}
        <section>
          <h2 className="text-lg font-medium mb-4" style={{ color: "var(--text-muted)" }}>Shelves</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SHELVES.map(({ name, icon: Icon, count, color, books }) => (
              <div
                key={name}
                className="rounded-xl border p-5"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" style={{ color }} />
                    <h3
                      className="font-medium"
                      style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontSize: "1.05rem" }}
                    >
                      {name}
                    </h3>
                  </div>
                  <span className="text-xs" style={{ color: "var(--text-faint)" }}>{count} books</span>
                </div>
                {/* Book cover strip */}
                <div className="flex gap-2">
                  {books.map((emoji, i) => (
                    <div
                      key={i}
                      className="flex h-14 w-10 items-center justify-center rounded text-xl"
                      style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                    >
                      {emoji}
                    </div>
                  ))}
                  {count > 3 && (
                    <div
                      className="flex h-14 w-10 items-center justify-center rounded text-xs font-medium"
                      style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-faint)" }}
                    >
                      +{count - 3}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom lists */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium" style={{ color: "var(--text-muted)" }}>Custom Lists</h2>
            <Link
              href="/collections/new"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium text-white"
              style={{ backgroundColor: "var(--accent-primary)" }}
            >
              <Plus className="h-3 w-3" /> New List
            </Link>
          </div>
          <div className="space-y-3">
            {CUSTOM_LISTS.map(({ name, count, description, books }) => (
              <div
                key={name}
                className="flex items-center gap-5 rounded-xl border p-4"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <div className="flex gap-1.5 flex-shrink-0">
                  {books.map((emoji, i) => (
                    <div
                      key={i}
                      className="flex h-12 w-8 items-center justify-center rounded text-lg"
                      style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <div className="min-w-0">
                  <h3
                    className="font-medium truncate"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontSize: "1.05rem" }}
                  >
                    {name}
                  </h3>
                  <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {description}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-faint)" }}>{count} books · Public</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

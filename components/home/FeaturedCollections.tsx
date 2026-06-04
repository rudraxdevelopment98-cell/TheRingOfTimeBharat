import Link from "next/link";
import { ArrowRight } from "lucide-react";

const COLLECTIONS = [
  {
    name: "Nobel Prize Literature",
    theme: "Award Winners",
    count: 120,
    slug: "nobel-prize-literature",
    color: "#c9a84c",
    emoji: "🏆",
  },
  {
    name: "Ancient & Sacred Texts",
    theme: "Before 500 AD",
    count: 340,
    slug: "ancient-sacred-texts",
    color: "#8b4513",
    emoji: "📜",
  },
  {
    name: "Philosophy Through the Ages",
    theme: "2,500 years of thought",
    count: 890,
    slug: "philosophy-through-ages",
    color: "#2c5f2e",
    emoji: "⚖️",
  },
  {
    name: "100 Books That Changed History",
    theme: "Civilisation-defining works",
    count: 100,
    slug: "100-books-changed-history",
    color: "#6b3fa0",
    emoji: "🌍",
  },
  {
    name: "African Literature",
    theme: "Across Centuries",
    count: 650,
    slug: "african-literature",
    color: "#c4622d",
    emoji: "🌺",
  },
  {
    name: "Feminist Literature",
    theme: "A Century of Voices",
    count: 420,
    slug: "feminist-literature",
    color: "#b5338a",
    emoji: "✊",
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-2 font-medium"
              style={{ color: "var(--accent-gold)" }}
            >
              Curated Collections
            </p>
            <h2
              className="text-3xl md:text-4xl font-light"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
            >
              Explore the library
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden md:inline-flex items-center gap-1.5 text-sm transition-colors hover:opacity-80"
            style={{ color: "var(--text-muted)" }}
          >
            All collections
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.slug}
              href={`/collection/${col.slug}`}
              className="group relative overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border)",
              }}
            >
              <div
                className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
                style={{ backgroundColor: col.color }}
              />

              <div className="pl-2">
                <div className="text-3xl mb-4">{col.emoji}</div>
                <div
                  className="text-xs uppercase tracking-wider mb-1"
                  style={{ color: "var(--text-faint)" }}
                >
                  {col.theme}
                </div>
                <h3
                  className="text-xl font-medium mb-1 group-hover:opacity-80 transition-opacity"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    color: "var(--text-primary)",
                  }}
                >
                  {col.name}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {col.count.toLocaleString()} books
                </p>
              </div>

              <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-4 w-4" style={{ color: col.color }} />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 md:hidden text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            All collections <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

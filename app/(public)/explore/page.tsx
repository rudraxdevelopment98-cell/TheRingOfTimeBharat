import { Compass, Filter } from "lucide-react";
import Link from "next/link";

const GENRES = [
  { name: "Philosophy", count: "12,400", icon: "⚖️", slug: "philosophy" },
  { name: "Fiction", count: "340,000", icon: "📖", slug: "fiction" },
  { name: "History", count: "89,000", icon: "🏛️", slug: "history" },
  { name: "Science", count: "67,000", icon: "🔬", slug: "science" },
  { name: "Poetry", count: "45,000", icon: "🌸", slug: "poetry" },
  { name: "Religion & Spirituality", count: "38,000", icon: "🙏", slug: "religion" },
  { name: "Politics", count: "29,000", icon: "🗳️", slug: "politics" },
  { name: "Mathematics", count: "14,000", icon: "∑", slug: "mathematics" },
  { name: "Art & Architecture", count: "21,000", icon: "🎨", slug: "art" },
  { name: "Biography", count: "78,000", icon: "👤", slug: "biography" },
  { name: "Travel & Geography", count: "19,000", icon: "🗺️", slug: "travel" },
  { name: "Economics", count: "24,000", icon: "📊", slug: "economics" },
];

const ERAS = [
  { name: "Ancient", range: "Before 500 AD", count: "8,900", color: "#c9a84c" },
  { name: "Medieval", range: "500 – 1400", count: "12,400", color: "#8b4513" },
  { name: "Renaissance", range: "1400 – 1600", count: "15,600", color: "#2c5f2e" },
  { name: "Enlightenment", range: "1600 – 1800", count: "28,900", color: "#4a6fa5" },
  { name: "Modern", range: "1800 – 1950", count: "145,000", color: "#7c3aed" },
  { name: "Contemporary", range: "1950 – Present", count: "2,100,000", color: "#b5338a" },
];

export default function ExplorePage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)" }}>
      <div
        className="border-b py-12"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Compass className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
            <p
              className="text-xs uppercase tracking-widest font-medium"
              style={{ color: "var(--accent-gold)" }}
            >
              Explore
            </p>
          </div>
          <h1
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Browse the library
          </h1>
          <p className="text-base" style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}>
            2.5 million books across 100+ languages, 6 historical eras, and every genre known to humanity.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-14">
          <h2
            className="text-2xl font-light mb-6"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Browse by Era
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {ERAS.map((era) => (
              <Link
                key={era.name}
                href={`/explore/era/${era.name.toLowerCase()}`}
                className="group rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5 text-center"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <div
                  className="h-1 w-8 rounded-full mx-auto mb-3"
                  style={{ backgroundColor: era.color }}
                />
                <div
                  className="font-medium text-sm mb-1"
                  style={{ color: "var(--text-primary)", fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}
                >
                  {era.name}
                </div>
                <div className="text-xs" style={{ color: "var(--text-faint)" }}>
                  {era.range}
                </div>
                <div
                  className="text-xs font-medium mt-2"
                  style={{ color: era.color }}
                >
                  {era.count}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2
            className="text-2xl font-light mb-6"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Browse by Genre
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {GENRES.map((genre) => (
              <Link
                key={genre.slug}
                href={`/explore/${genre.slug}`}
                className="group flex items-center gap-3 rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <span className="text-2xl">{genre.icon}</span>
                <div>
                  <div
                    className="font-medium text-sm group-hover:opacity-80 transition-opacity"
                    style={{ color: "var(--text-primary)", fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}
                  >
                    {genre.name}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-faint)" }}>
                    {genre.count} books
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div
          className="rounded-2xl border p-8 text-center"
          style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
        >
          <h3
            className="text-2xl font-light mb-3"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Can&apos;t find what you&apos;re looking for?
          </h3>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Use our full-text search with filters for language, era, rating, and more.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white"
            style={{ backgroundColor: "var(--accent-primary)" }}
          >
            <Filter className="h-4 w-4" />
            Advanced Search
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Layers, Plus } from "lucide-react";

const OFFICIAL_COLLECTIONS = [
  { name: "Nobel Prize in Literature", description: "All winners from 1901 to present", count: 120, slug: "nobel-prize-literature", emoji: "🏆", featured: true },
  { name: "Ancient & Sacred Texts", description: "Foundation texts of human civilisation", count: 340, slug: "ancient-sacred-texts", emoji: "📜", featured: true },
  { name: "100 Books That Changed History", description: "Civilisation-defining works across all eras", count: 100, slug: "100-books-changed-history", emoji: "🌍", featured: true },
  { name: "Philosophy Through the Ages", description: "From Socrates to Simone de Beauvoir", count: 890, slug: "philosophy-through-ages", emoji: "⚖️", featured: false },
  { name: "Science That Changed Everything", description: "Foundational scientific texts", count: 280, slug: "science-changed-everything", emoji: "🔬", featured: false },
  { name: "Banned Books of History", description: "Suppressed, censored, and forbidden works", count: 215, slug: "banned-books-history", emoji: "🚫", featured: false },
  { name: "African Literature: Across Centuries", description: "African voices from antiquity to today", count: 650, slug: "african-literature", emoji: "🌺", featured: false },
  { name: "The Islamic Golden Age Library", description: "Scholarship from the 8th–13th centuries", count: 380, slug: "islamic-golden-age", emoji: "🌙", featured: false },
  { name: "Feminist Literature: A Century", description: "A hundred years of feminist writing", count: 420, slug: "feminist-literature", emoji: "✊", featured: false },
  { name: "Books in Endangered Languages", description: "Preserving literary heritage", count: 89, slug: "endangered-languages", emoji: "🌿", featured: false },
  { name: "Dystopian & Utopian Visions", description: "Imagined societies, dark and bright", count: 320, slug: "dystopian-utopian", emoji: "🌐", featured: false },
  { name: "Oral Traditions Written Down", description: "From spoken word to printed page", count: 145, slug: "oral-traditions", emoji: "🎙️", featured: false },
];

export default function CollectionsPage() {
  const featured = OFFICIAL_COLLECTIONS.filter((c) => c.featured);
  const rest = OFFICIAL_COLLECTIONS.filter((c) => !c.featured);

  return (
    <div style={{ backgroundColor: "var(--bg-base)" }}>
      <div
        className="border-b py-12"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Layers className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
                <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--accent-gold)" }}>
                  Collections
                </p>
              </div>
              <h1
                className="text-4xl md:text-5xl font-light mb-4"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
              >
                Curated libraries
              </h1>
              <p className="text-base" style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}>
                Official editorial collections, community curations, and AI-generated reading lists.
              </p>
            </div>
            <Link
              href="/collections/new"
              className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white"
              style={{ backgroundColor: "var(--accent-primary)" }}
            >
              <Plus className="h-4 w-4" />
              Create Collection
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <h2 className="text-lg font-medium mb-5" style={{ color: "var(--text-muted)" }}>
            Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((col) => (
              <Link
                key={col.slug}
                href={`/collection/${col.slug}`}
                className="group relative overflow-hidden rounded-2xl border p-8 transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <div className="text-4xl mb-5">{col.emoji}</div>
                <h3
                  className="text-2xl font-medium mb-2"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                >
                  {col.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  {col.description}
                </p>
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                  style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-faint)" }}
                >
                  {col.count} books
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-5" style={{ color: "var(--text-muted)" }}>
            All Official Collections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((col) => (
              <Link
                key={col.slug}
                href={`/collection/${col.slug}`}
                className="group flex items-start gap-4 rounded-xl border p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <div className="text-2xl flex-shrink-0 mt-0.5">{col.emoji}</div>
                <div className="min-w-0">
                  <h3
                    className="font-medium mb-1 group-hover:opacity-80 transition-opacity"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontSize: "1.1rem" }}
                  >
                    {col.name}
                  </h3>
                  <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                    {col.description}
                  </p>
                  <span className="text-xs" style={{ color: "var(--text-faint)" }}>
                    {col.count} books
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

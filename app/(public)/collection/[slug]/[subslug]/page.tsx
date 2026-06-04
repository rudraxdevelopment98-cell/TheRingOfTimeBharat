import Link from "next/link";
import { Layers, ChevronRight, BookOpen } from "lucide-react";

interface Book {
  title: string;
  author: string;
  year: string;
  language: string;
  cover: string;
  slug: string;
}

const BOOKS: Book[] = [
  { title: "Meditations", author: "Marcus Aurelius", year: "c. 180", language: "Greek", cover: "🏛️", slug: "meditations-marcus-aurelius" },
  { title: "Letters from a Stoic", author: "Seneca", year: "c. 65", language: "Latin", cover: "✉️", slug: "letters-from-a-stoic-seneca" },
  { title: "Enchiridion", author: "Epictetus", year: "c. 125", language: "Greek", cover: "🗝️", slug: "enchiridion-epictetus" },
  { title: "Discourses", author: "Epictetus", year: "c. 108", language: "Greek", cover: "📜", slug: "discourses-epictetus" },
  { title: "On the Shortness of Life", author: "Seneca", year: "c. 49", language: "Latin", cover: "⏳", slug: "on-the-shortness-of-life-seneca" },
  { title: "Fragments", author: "Musonius Rufus", year: "c. 80", language: "Greek", cover: "🪶", slug: "fragments-musonius-rufus" },
];

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function SubCollectionPage({
  params,
}: {
  params: { slug: string; subslug: string };
}) {
  const collectionName = titleFromSlug(params.slug);
  const subName = titleFromSlug(params.subslug);

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div
        className="border-b py-12"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            className="flex flex-wrap items-center gap-2 mb-6 text-sm"
            aria-label="Breadcrumb"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <Link href="/collections" className="transition-opacity hover:opacity-80" style={{ color: "var(--text-muted)" }}>
              Collections
            </Link>
            <ChevronRight className="h-4 w-4" style={{ color: "var(--text-faint)" }} />
            <Link
              href={`/collection/${params.slug}`}
              className="transition-opacity hover:opacity-80"
              style={{ color: "var(--text-muted)" }}
            >
              {collectionName}
            </Link>
            <ChevronRight className="h-4 w-4" style={{ color: "var(--text-faint)" }} />
            <span style={{ color: "var(--text-faint)" }}>{subName}</span>
          </nav>

          <div className="flex items-center gap-3 mb-3">
            <Layers className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
            <p
              className="text-xs uppercase tracking-widest font-medium"
              style={{ color: "var(--accent-gold)", fontFamily: "var(--font-dm-sans)" }}
            >
              {collectionName} · Sub-collection
            </p>
          </div>
          <h1
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            {subName}
          </h1>
          <p
            className="text-base max-w-2xl"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
          >
            A focused gathering within {collectionName} — the essential texts of the {subName}, arranged
            for the reader who wants to go deep rather than wide.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2
            className="text-2xl font-light"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Volumes
          </h2>
          <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: "var(--text-faint)" }}>
            <BookOpen className="h-4 w-4" />
            {BOOKS.length} books
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BOOKS.map((book) => (
            <Link
              key={book.slug}
              href={`/book/${book.slug}`}
              className="group flex items-start gap-4 rounded-2xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <div
                className="aspect-[2/3] w-16 flex-shrink-0 flex items-center justify-center rounded-xl"
                style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border)" }}
              >
                <span className="text-2xl">{book.cover}</span>
              </div>
              <div className="min-w-0">
                <h3
                  className="text-lg font-light leading-tight mb-1 group-hover:opacity-80 transition-opacity"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                >
                  {book.title}
                </h3>
                <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                  {book.author}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs"
                    style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-faint)", fontFamily: "var(--font-fira-code)" }}
                  >
                    {book.year}
                  </span>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs"
                    style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-faint)", fontFamily: "var(--font-fira-code)" }}
                  >
                    {book.language}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

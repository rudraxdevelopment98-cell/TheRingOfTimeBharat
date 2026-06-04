import Link from "next/link";
import { Layers, Users, BookOpen, ArrowRight, Bookmark, ChevronRight } from "lucide-react";

interface Book {
  title: string;
  author: string;
  year: string;
  language: string;
  curatorNote: string;
  cover: string;
  slug: string;
}

const COLLECTION = {
  description:
    "An assembled canon for the unhurried reader — works that taught the West how to think, to grieve, and to govern the self. Each volume here was chosen not for fame alone but for the conversations it still starts across two thousand years.",
  followers: 18_420,
  curatorNote:
    "I keep returning to these not as monuments but as letters — written by people who feared death, doubted the gods, and still chose to set down what they had learned. Read them slowly, and out of order. The fragments will find each other.",
  curatorName: "Eleni Vasquez, Editorial Curator",
};

const SUB_COLLECTIONS = [
  { name: "Greek", slug: "greek" },
  { name: "Stoics", slug: "stoics" },
  { name: "Marcus Aurelius", slug: "marcus-aurelius" },
];

const BOOKS: Book[] = [
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    year: "c. 180",
    language: "Greek",
    curatorNote: "Private notes of an emperor to himself — the closest philosophy comes to a diary.",
    cover: "🏛️",
    slug: "meditations-marcus-aurelius",
  },
  {
    title: "The Nicomachean Ethics",
    author: "Aristotle",
    year: "c. 340 BCE",
    language: "Greek",
    curatorNote: "On what it means to live well, argued with a botanist's patience.",
    cover: "⚖️",
    slug: "nicomachean-ethics-aristotle",
  },
  {
    title: "Letters from a Stoic",
    author: "Seneca",
    year: "c. 65",
    language: "Latin",
    curatorNote: "Consolation disguised as correspondence; wisdom disguised as gossip.",
    cover: "✉️",
    slug: "letters-from-a-stoic-seneca",
  },
  {
    title: "Enchiridion",
    author: "Epictetus",
    year: "c. 125",
    language: "Greek",
    curatorNote: "A handbook small enough to carry, severe enough to last a lifetime.",
    cover: "🗝️",
    slug: "enchiridion-epictetus",
  },
  {
    title: "The Republic",
    author: "Plato",
    year: "c. 375 BCE",
    language: "Greek",
    curatorNote: "Justice imagined as a city, then quietly returned to the soul.",
    cover: "🏺",
    slug: "the-republic-plato",
  },
  {
    title: "On the Nature of Things",
    author: "Lucretius",
    year: "c. 55 BCE",
    language: "Latin",
    curatorNote: "Atoms, mortality, and the courage to be unafraid — set to verse.",
    cover: "🌌",
    slug: "on-the-nature-of-things-lucretius",
  },
  {
    title: "Discourses",
    author: "Epictetus",
    year: "c. 108",
    language: "Greek",
    curatorNote: "Lecture notes taken by a student who knew he was hearing something rare.",
    cover: "📜",
    slug: "discourses-epictetus",
  },
  {
    title: "The Consolation of Philosophy",
    author: "Boethius",
    year: "c. 524",
    language: "Latin",
    curatorNote: "Written in a death-cell, addressed to the goddess Philosophy herself.",
    cover: "⛓️",
    slug: "consolation-of-philosophy-boethius",
  },
];

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const name = titleFromSlug(params.slug);
  const [featured, ...rest] = BOOKS;

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Sub-collection nav */}
        <nav className="flex flex-wrap items-center gap-2 mb-10" aria-label="Sub-collections">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all hover:-translate-y-0.5"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-muted)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            <Layers className="h-3.5 w-3.5" />
            Collections
          </Link>
          {SUB_COLLECTIONS.map((sub) => (
            <span key={sub.slug} className="inline-flex items-center gap-2">
              <ChevronRight className="h-3.5 w-3.5" style={{ color: "var(--text-faint)" }} />
              <Link
                href={`/collection/${params.slug}/${sub.slug}`}
                className="rounded-full border px-3 py-1.5 text-xs font-medium transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--bg-surface)",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {sub.name}
              </Link>
            </span>
          ))}
        </nav>

        {/* Editorial hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4">
            <div
              className="aspect-[2/3] rounded-2xl flex items-center justify-center shadow-2xl"
              style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}
            >
              <span className="text-7xl">{featured.cover}</span>
            </div>
            <p
              className="mt-4 text-center text-xs uppercase tracking-widest"
              style={{ color: "var(--accent-gold)", fontFamily: "var(--font-dm-sans)" }}
            >
              Featured volume
            </p>
            <Link
              href={`/book/${featured.slug}`}
              className="mt-1 block text-center text-lg font-light transition-opacity hover:opacity-80"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
            >
              {featured.title}
            </Link>
            <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>
              {featured.author}
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
              <p
                className="text-xs uppercase tracking-widest font-medium"
                style={{ color: "var(--accent-gold)", fontFamily: "var(--font-dm-sans)" }}
              >
                Collection
              </p>
            </div>
            <h1
              className="text-5xl md:text-6xl font-light leading-[1.05] mb-5"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
            >
              {name}
            </h1>
            <p
              className="text-lg max-w-2xl mb-7"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
            >
              {COLLECTION.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Stat icon={<BookOpen className="h-4 w-4" />} value={`${BOOKS.length} books`} />
              <Stat
                icon={<Users className="h-4 w-4" />}
                value={`${COLLECTION.followers.toLocaleString()} followers`}
              />
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-white"
                style={{ backgroundColor: "var(--accent-secondary)", fontFamily: "var(--font-dm-sans)" }}
              >
                <Bookmark className="h-3.5 w-3.5" />
                Official Collection
              </span>
            </div>

            {/* Curator's note */}
            <figure
              className="rounded-2xl border-l-2 pl-6 pr-4 py-2"
              style={{ borderColor: "var(--accent-primary)" }}
            >
              <blockquote
                className="text-lg italic leading-relaxed"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-source-serif)" }}
              >
                “{COLLECTION.curatorNote}”
              </blockquote>
              <figcaption
                className="mt-3 text-xs uppercase tracking-widest"
                style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
              >
                {COLLECTION.curatorName}
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Asymmetric grid of remaining books */}
        <section className="mt-16">
          <div className="flex items-baseline justify-between mb-6">
            <h2
              className="text-2xl font-light"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
            >
              In this collection
            </h2>
            <span className="text-sm" style={{ color: "var(--text-faint)" }}>
              {rest.length} more volumes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((book, i) => (
              <Link
                key={book.slug}
                href={`/book/${book.slug}`}
                className={`group flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  i === 0 ? "sm:col-span-2 sm:flex-row sm:items-center sm:gap-6" : ""
                }`}
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <div
                  className={`flex items-center justify-center rounded-xl flex-shrink-0 ${
                    i === 0 ? "aspect-[2/3] w-28 mb-0" : "aspect-[2/3] w-20 mb-4"
                  }`}
                  style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                >
                  <span className={i === 0 ? "text-4xl" : "text-3xl"}>{book.cover}</span>
                </div>
                <div className="min-w-0">
                  <h3
                    className="text-xl font-light leading-tight mb-1 group-hover:opacity-80 transition-opacity"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                  >
                    {book.title}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                    {book.author}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Chip>{book.year}</Chip>
                    <Chip>{book.language}</Chip>
                  </div>
                  <p
                    className="text-sm italic"
                    style={{ color: "var(--text-faint)", fontFamily: "var(--font-source-serif)" }}
                  >
                    {book.curatorNote}
                  </p>
                </div>
                {i === 0 && (
                  <ArrowRight
                    className="hidden sm:block h-5 w-5 ml-auto opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                    style={{ color: "var(--accent-primary)" }}
                  />
                )}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-surface)",
        color: "var(--text-muted)",
        fontFamily: "var(--font-dm-sans)",
      }}
    >
      <span style={{ color: "var(--text-faint)" }}>{icon}</span>
      {value}
    </span>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-xs"
      style={{
        backgroundColor: "var(--bg-elevated)",
        color: "var(--text-faint)",
        fontFamily: "var(--font-fira-code)",
      }}
    >
      {children}
    </span>
  );
}

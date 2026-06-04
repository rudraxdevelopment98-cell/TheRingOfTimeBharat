import Link from "next/link";
import { BookOpen, Globe, Clock, Flame } from "lucide-react";

const DISCOVERY_SECTIONS = [
  {
    label: "Trending Now",
    icon: Flame,
    books: [
      { title: "Meditations", author: "Marcus Aurelius", year: "180 AD", lang: "Ancient Greek", cover: "📖" },
      { title: "The Alchemist", author: "Paulo Coelho", year: "1988", lang: "Portuguese", cover: "📗" },
      { title: "Siddhartha", author: "Hermann Hesse", year: "1922", lang: "German", cover: "📘" },
      { title: "Crime and Punishment", author: "Fyodor Dostoevsky", year: "1866", lang: "Russian", cover: "📙" },
    ],
  },
  {
    label: "Lost to Time",
    icon: Clock,
    books: [
      { title: "Book of the Dead", author: "Ancient Egyptians", year: "1550 BC", lang: "Ancient Egyptian", cover: "📜" },
      { title: "Gilgamesh", author: "Sin-liqe-unninni", year: "1200 BC", lang: "Akkadian", cover: "📋" },
      { title: "Enuma Elish", author: "Unknown", year: "1100 BC", lang: "Babylonian", cover: "📃" },
      { title: "Tao Te Ching", author: "Laozi", year: "400 BC", lang: "Classical Chinese", cover: "📄" },
    ],
  },
  {
    label: "World Languages",
    icon: Globe,
    books: [
      { title: "One Hundred Years of Solitude", author: "García Márquez", year: "1967", lang: "Spanish", cover: "📕" },
      { title: "The Tale of Genji", author: "Murasaki Shikibu", year: "1021", lang: "Japanese", cover: "📔" },
      { title: "Shahnameh", author: "Ferdowsi", year: "1010", lang: "Persian", cover: "📒" },
      { title: "Things Fall Apart", author: "Chinua Achebe", year: "1958", lang: "English (Nigeria)", cover: "📓" },
    ],
  },
];

export function DiscoveryFeed() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p
            className="text-xs uppercase tracking-widest mb-2 font-medium"
            style={{ color: "var(--accent-gold)" }}
          >
            Discovery
          </p>
          <h2
            className="text-3xl md:text-4xl font-light"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Explore the archive
          </h2>
        </div>

        <div className="space-y-12">
          {DISCOVERY_SECTIONS.map(({ label, icon: Icon, books }) => (
            <div key={label}>
              <div className="flex items-center gap-2 mb-6">
                <Icon className="h-4 w-4" style={{ color: "var(--accent-primary)" }} />
                <h3
                  className="text-lg font-medium"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                >
                  {label}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {books.map((book) => (
                  <Link
                    key={book.title}
                    href={`/book/${encodeURIComponent(book.title.toLowerCase().replace(/ /g, "-"))}`}
                    className="group flex gap-4 rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div
                      className="flex h-14 w-10 flex-shrink-0 items-center justify-center rounded text-2xl"
                      style={{ backgroundColor: "var(--bg-elevated)" }}
                    >
                      {book.cover}
                    </div>
                    <div className="min-w-0">
                      <h4
                        className="font-medium text-sm leading-tight mb-1 group-hover:opacity-80 transition-opacity"
                        style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontSize: "1rem" }}
                      >
                        {book.title}
                      </h4>
                      <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                        {book.author}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-faint)" }}
                        >
                          {book.year}
                        </span>
                        <span className="text-xs" style={{ color: "var(--text-faint)" }}>
                          {book.lang}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium text-white transition-all hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: "var(--accent-primary)" }}
          >
            <BookOpen className="h-4 w-4" />
            Explore all 2.5 million books
          </Link>
        </div>
      </div>
    </section>
  );
}

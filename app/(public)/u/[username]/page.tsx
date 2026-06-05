import Link from "next/link";
import { User, BookOpen, Star, List, Users, Calendar, BookMarked, Heart } from "lucide-react";

const PLACEHOLDER_BOOKS = [
  { title: "Meditations", author: "Marcus Aurelius", year: 180, emoji: "📖", slug: "meditations" },
  { title: "Crime and Punishment", author: "Dostoevsky", year: 1866, emoji: "📙", slug: "crime-and-punishment" },
  { title: "The Stranger", author: "Camus", year: 1942, emoji: "📘", slug: "the-stranger" },
  { title: "Don Quixote", author: "Cervantes", year: 1605, emoji: "📗", slug: "don-quixote" },
  { title: "Hamlet", author: "Shakespeare", year: 1603, emoji: "📕", slug: "hamlet" },
  { title: "The Odyssey", author: "Homer", year: -800, emoji: "📜", slug: "the-odyssey" },
];

const PLACEHOLDER_REVIEWS = [
  { book: "Meditations", rating: 5, excerpt: "A life-changing text. Marcus Aurelius writes with a humility that is rare in any era — this is philosophy as practice, not performance.", date: "3 days ago", slug: "meditations" },
  { book: "The Stranger", rating: 4, excerpt: "Camus distils existential absurdity into 120 elegant pages. Meursault is maddening and yet the most honest character I've encountered.", date: "2 weeks ago", slug: "the-stranger" },
];

const PLACEHOLDER_LISTS = [
  { name: "Philosophy Starter Pack", description: "The 10 books I'd give anyone new to philosophy", count: 10, isPublic: true },
  { name: "Great Novels of Exile", description: "Writers who created their best work far from home", count: 8, isPublic: true },
];

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const { username } = params;

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Profile header */}
      <div
        className="border-b py-12"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div
              className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--accent-primary)" }}
            >
              <User className="h-10 w-10 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h1
                className="text-3xl font-light mb-1"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
              >
                {username}
              </h1>
              <p
                className="text-sm mb-3"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)", fontStyle: "italic" }}
              >
                "Reading is the finest form of time travel available to us."
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-faint)" }}>
                  <Calendar className="h-3 w-3" /> Member since January 2024
                </span>
              </div>
            </div>

            <button
              className="flex-shrink-0 rounded-full px-5 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: "var(--accent-primary)" }}
            >
              Follow
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            {[
              { icon: BookOpen, value: "89", label: "Books Read" },
              { icon: Star, value: "34", label: "Reviews" },
              { icon: List, value: "12", label: "Lists" },
              { icon: Users, value: "247", label: "Followers" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon className="h-4 w-4 mx-auto mb-1" style={{ color: "var(--accent-primary)" }} />
                <div
                  className="text-xl font-medium"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                >
                  {value}
                </div>
                <div className="text-xs" style={{ color: "var(--text-faint)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Recently Read */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
              Recently Read
            </h2>
            <Link href={`/u/${username}/shelves`} className="text-xs" style={{ color: "var(--text-faint)" }}>
              View all shelves →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {PLACEHOLDER_BOOKS.map((book) => (
              <Link
                key={book.slug}
                href={`/book/${book.slug}`}
                className="group flex gap-3 rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <div
                  className="flex h-12 w-9 flex-shrink-0 items-center justify-center rounded text-xl"
                  style={{ backgroundColor: "var(--bg-elevated)" }}
                >
                  {book.emoji}
                </div>
                <div className="min-w-0">
                  <p
                    className="font-medium text-sm leading-tight truncate"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontSize: "1rem" }}
                  >
                    {book.title}
                  </p>
                  <p className="text-xs truncate" style={{ color: "var(--text-faint)" }}>
                    {book.author}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section>
          <h2 className="text-xl font-light mb-5" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
            Recent Reviews
          </h2>
          <div className="space-y-4">
            {PLACEHOLDER_REVIEWS.map((review) => (
              <div
                key={review.book}
                className="rounded-xl border p-5"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <Link
                    href={`/book/${review.slug}`}
                    className="font-medium hover:opacity-80"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontSize: "1.1rem" }}
                  >
                    {review.book}
                  </Link>
                  <div className="flex gap-0.5 flex-shrink-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5"
                        style={{ color: i < review.rating ? "var(--accent-gold)" : "var(--border)", fill: i < review.rating ? "var(--accent-gold)" : "none" }}
                      />
                    ))}
                  </div>
                </div>
                <p
                  className="text-sm italic leading-relaxed mb-2"
                  style={{ fontFamily: "var(--font-source-serif)", color: "var(--text-muted)" }}
                >
                  {review.excerpt}
                </p>
                <p className="text-xs" style={{ color: "var(--text-faint)" }}>{review.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lists */}
        <section>
          <h2 className="text-xl font-light mb-5" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
            Reading Lists
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PLACEHOLDER_LISTS.map((list) => (
              <div
                key={list.name}
                className="rounded-xl border p-5"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <div className="flex items-start gap-3">
                  <BookMarked className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-primary)" }} />
                  <div>
                    <h3
                      className="font-medium mb-1"
                      style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontSize: "1.05rem" }}
                    >
                      {list.name}
                    </h3>
                    <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                      {list.description}
                    </p>
                    <span className="text-xs" style={{ color: "var(--text-faint)" }}>
                      {list.count} books · {list.isPublic ? "Public" : "Private"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

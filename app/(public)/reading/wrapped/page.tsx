import Link from "next/link";
import { Sparkles, Trophy, BookOpen, Clock, Globe, Crown, Flame } from "lucide-react";

const HEADLINE_STATS = [
  { value: "37", label: "books finished", icon: BookOpen },
  { value: "11,240", label: "pages turned", icon: Flame },
  { value: "187", label: "hours of reading", icon: Clock },
];

const TOP_BOOKS = [
  { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", emoji: "📕" },
  { title: "Meditations", author: "Marcus Aurelius", emoji: "🏛️" },
  { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", emoji: "📘" },
  { title: "The Name of the Rose", author: "Umberto Eco", emoji: "📗" },
  { title: "The Stranger", author: "Albert Camus", emoji: "🌅" },
];

const ERAS = [
  { label: "Antiquity", pct: 14, color: "var(--accent-gold)" },
  { label: "Medieval & Renaissance", pct: 11, color: "var(--accent-secondary)" },
  { label: "19th Century", pct: 38, color: "var(--accent-primary)" },
  { label: "20th Century", pct: 27, color: "var(--text-faint)" },
  { label: "Contemporary", pct: 10, color: "var(--text-muted)" },
];

const SUPERLATIVES = [
  { label: "Top genre", value: "Philosophy", icon: Sparkles },
  { label: "Top author", value: "Dostoevsky", icon: Crown },
  { label: "Most-read language (besides English)", value: "Russian", icon: Globe },
];

export default function ReadingWrappedPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)" }}>
      {/* Hero */}
      <section className="border-b py-20" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <Sparkles className="h-6 w-6" style={{ color: "var(--accent-gold)" }} />
            <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: "var(--accent-gold)" }}>
              Your 2025 Reading Wrapped
            </p>
            <Sparkles className="h-6 w-6" style={{ color: "var(--accent-gold)" }} />
          </div>
          <h1
            className="mx-auto max-w-3xl text-5xl md:text-6xl font-light leading-tight"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            What a year of reading you had.
          </h1>
          <p
            className="mx-auto mt-6 max-w-xl text-lg"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
          >
            You wandered through centuries and continents, from ancient Rome to magic-realist Macondo. Here is the story
            your bookshelf told this year.
          </p>
        </div>
      </section>

      {/* Headline stats */}
      <section className="py-20" style={{ backgroundColor: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {HEADLINE_STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label}>
                  <Icon className="mx-auto mb-5 h-8 w-8" style={{ color: "var(--accent-primary)" }} />
                  <div
                    className="text-7xl md:text-8xl font-light leading-none"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-3 text-sm uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reading personality */}
      <section className="py-20" style={{ backgroundColor: "var(--bg-surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-3 text-xs uppercase tracking-widest font-medium" style={{ color: "var(--accent-gold)" }}>
            Your reading personality
          </p>
          <h2
            className="text-5xl md:text-6xl font-light"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--accent-primary)" }}
          >
            The Wandering Scholar
          </h2>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
          >
            You read widely and deeply, never content to stay in one era or one tongue. You chase big questions across
            languages and centuries, and you finish what you start.
          </p>
        </div>
      </section>

      {/* Superlatives */}
      <section className="py-20" style={{ backgroundColor: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUPERLATIVES.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border p-8 text-center"
                  style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
                >
                  <Icon className="mx-auto mb-4 h-6 w-6" style={{ color: "var(--accent-gold)" }} />
                  <div className="mb-2 text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                  <div
                    className="text-3xl font-light"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                  >
                    {s.value}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="rounded-2xl border p-8"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <div className="mb-2 text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Longest book
              </div>
              <div className="text-2xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
                The Brothers Karamazov
              </div>
              <div className="mt-1 text-sm" style={{ color: "var(--text-faint)", fontFamily: "var(--font-fira-code)" }}>
                824 pages
              </div>
            </div>
            <div
              className="rounded-2xl border p-8"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <div className="mb-2 text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Shortest book
              </div>
              <div className="text-2xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
                The Metamorphosis
              </div>
              <div className="mt-1 text-sm" style={{ color: "var(--text-faint)", fontFamily: "var(--font-fira-code)" }}>
                74 pages
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 5 books */}
      <section className="py-20" style={{ backgroundColor: "var(--bg-surface)" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center gap-3">
            <Trophy className="h-6 w-6" style={{ color: "var(--accent-gold)" }} />
            <h2 className="text-3xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
              Your top 5 books of the year
            </h2>
          </div>
          <ol className="space-y-3">
            {TOP_BOOKS.map((b, i) => (
              <li
                key={b.title}
                className="flex items-center gap-6 rounded-2xl border p-5"
                style={{ backgroundColor: "var(--bg-base)", borderColor: "var(--border)" }}
              >
                <span
                  className="w-10 flex-shrink-0 text-center text-4xl font-light"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--accent-primary)" }}
                >
                  {i + 1}
                </span>
                <span className="text-3xl">{b.emoji}</span>
                <div>
                  <div
                    className="text-xl font-medium"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                  >
                    {b.title}
                  </div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {b.author}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Era breakdown */}
      <section className="py-20" style={{ backgroundColor: "var(--bg-base)" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2
            className="mb-3 text-3xl font-light"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            You read across the centuries
          </h2>
          <p className="mb-8 text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}>
            How your reading spread across the eras of human thought.
          </p>

          <div className="mb-8 flex h-4 w-full overflow-hidden rounded-full" style={{ backgroundColor: "var(--bg-elevated)" }}>
            {ERAS.map((e) => (
              <div key={e.label} style={{ width: `${e.pct}%`, backgroundColor: e.color }} title={`${e.label} ${e.pct}%`} />
            ))}
          </div>

          <div className="space-y-3">
            {ERAS.map((e) => (
              <div key={e.label} className="flex items-center gap-3">
                <span className="h-3 w-3 flex-shrink-0 rounded-full" style={{ backgroundColor: e.color }} />
                <span className="flex-1 text-sm" style={{ color: "var(--text-primary)" }}>
                  {e.label}
                </span>
                <span className="text-sm" style={{ color: "var(--text-faint)", fontFamily: "var(--font-fira-code)" }}>
                  {e.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t py-20" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="mx-auto mb-5 h-7 w-7" style={{ color: "var(--accent-gold)" }} />
          <h2
            className="mx-auto max-w-2xl text-4xl font-light"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Here&apos;s to another year of turning pages.
          </h2>
          <Link
            href="/reading/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white"
            style={{ backgroundColor: "var(--accent-primary)" }}
          >
            Back to your dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import {
  BookMarked,
  BookOpen,
  Flame,
  Globe,
  Target,
  Clock,
  Star,
  TrendingUp,
  ArrowRight,
  Calendar,
  Library,
} from "lucide-react";
import { ProgressBar } from "@/components/reading/ProgressBar";

const STATS = [
  { label: "Books read this year", value: "37", icon: BookOpen },
  { label: "Currently reading", value: "3", icon: BookMarked },
  { label: "Pages read", value: "11,240", icon: TrendingUp },
  { label: "Reading streak", value: "28 days", icon: Flame },
  { label: "Languages explored", value: "6", icon: Globe },
];

const CURRENTLY_READING = [
  { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", emoji: "📕", page: 612, total: 824 },
  { title: "The Name of the Rose", author: "Umberto Eco", emoji: "📗", page: 188, total: 536 },
  { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", emoji: "📘", page: 95, total: 417 },
];

const WANT_TO_READ = [
  { title: "The Odyssey", author: "Homer", emoji: "📜" },
  { title: "Crime and Punishment", author: "Dostoevsky", emoji: "📕" },
  { title: "Middlemarch", author: "George Eliot", emoji: "📙" },
  { title: "The Tale of Genji", author: "Murasaki Shikibu", emoji: "🏯" },
  { title: "Pale Fire", author: "Nabokov", emoji: "🦋" },
  { title: "The Magic Mountain", author: "Thomas Mann", emoji: "⛰️" },
];

const ACTIVITY = [
  { icon: Star, text: "Finished “Meditations” · rated ★★★★★", time: "2 days ago" },
  { icon: BookMarked, text: "Added “The Odyssey” to Want to Read", time: "4 days ago" },
  { icon: BookOpen, text: "Started “The Name of the Rose”", time: "6 days ago" },
  { icon: Star, text: "Finished “The Stranger” · rated ★★★★", time: "1 week ago" },
  { icon: Calendar, text: "Hit a 21-day reading streak", time: "1 week ago" },
];

export default function ReadingDashboardPage() {
  const challengeGoal = 52;
  const challengeDone = 37;
  const challengePct = Math.round((challengeDone / challengeGoal) * 100);

  return (
    <div style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="border-b py-12" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <BookMarked className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
            <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--accent-gold)" }}>
              My Library
            </p>
          </div>
          <h1
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Your reading journey
          </h1>
          <p className="text-base" style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}>
            Every page turned, every world entered. Here is where your year of reading lives.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats row */}
        <section className="mb-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border p-6 transition-all hover:shadow-md hover:-translate-y-0.5"
                  style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
                >
                  <Icon className="h-5 w-5 mb-4" style={{ color: "var(--accent-secondary)" }} />
                  <div
                    className="text-4xl font-light leading-none mb-2"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
          {/* Currently Reading */}
          <section className="lg:col-span-2">
            <h2 className="text-lg font-medium mb-5" style={{ color: "var(--text-muted)" }}>
              Currently Reading
            </h2>
            <div className="space-y-4">
              {CURRENTLY_READING.map((b) => {
                const pct = Math.round((b.page / b.total) * 100);
                return (
                  <div
                    key={b.title}
                    className="flex gap-5 rounded-2xl border p-5"
                    style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
                  >
                    <div
                      className="flex h-24 w-16 flex-shrink-0 items-center justify-center rounded-lg text-3xl"
                      style={{ backgroundColor: "var(--bg-elevated)" }}
                    >
                      {b.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className="text-xl font-medium mb-0.5 truncate"
                        style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                      >
                        {b.title}
                      </h3>
                      <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                        {b.author}
                      </p>
                      <ProgressBar value={b.page} max={b.total} />
                      <div className="mt-2 flex items-center justify-between">
                        <span
                          className="text-xs"
                          style={{ color: "var(--accent-primary)", fontFamily: "var(--font-fira-code)" }}
                        >
                          {pct}%
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "var(--text-faint)", fontFamily: "var(--font-fira-code)" }}
                        >
                          page {b.page} of {b.total}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 2025 Reading Challenge */}
          <section>
            <h2 className="text-lg font-medium mb-5" style={{ color: "var(--text-muted)" }}>
              2025 Reading Challenge
            </h2>
            <div
              className="rounded-2xl border p-7 h-[calc(100%-2.75rem)] flex flex-col"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Target className="h-5 w-5" style={{ color: "var(--accent-gold)" }} />
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  Goal: {challengeGoal} books
                </span>
              </div>
              <div className="mb-2 flex items-baseline gap-2">
                <span
                  className="text-5xl font-light"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                >
                  {challengeDone}
                </span>
                <span className="text-lg" style={{ color: "var(--text-faint)" }}>
                  / {challengeGoal}
                </span>
              </div>
              <ProgressBar value={challengeDone} max={challengeGoal} color="var(--accent-gold)" />
              <p className="mt-4 text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}>
                {challengePct}% of the way there. Fifteen books to go and the year is still young, scholar. Keep turning
                pages.
              </p>
            </div>
          </section>
        </div>

        {/* Want to Read shelf */}
        <section className="mb-14">
          <h2 className="text-lg font-medium mb-5" style={{ color: "var(--text-muted)" }}>
            Want to Read
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {WANT_TO_READ.map((b) => (
              <div
                key={b.title}
                className="group flex w-32 flex-shrink-0 flex-col rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <div
                  className="mb-3 flex h-28 items-center justify-center rounded-lg text-3xl"
                  style={{ backgroundColor: "var(--bg-elevated)" }}
                >
                  {b.emoji}
                </div>
                <div
                  className="text-sm font-medium leading-tight"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                >
                  {b.title}
                </div>
                <div className="mt-0.5 text-xs" style={{ color: "var(--text-faint)" }}>
                  {b.author}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <section className="lg:col-span-2">
            <h2 className="text-lg font-medium mb-5" style={{ color: "var(--text-muted)" }}>
              Recent Activity
            </h2>
            <div
              className="rounded-2xl border divide-y"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              {ACTIVITY.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="flex items-center gap-4 px-6 py-4" style={{ borderColor: "var(--border)" }}>
                    <div
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "var(--bg-elevated)" }}
                    >
                      <Icon className="h-4 w-4" style={{ color: "var(--accent-secondary)" }} />
                    </div>
                    <p className="flex-1 text-sm" style={{ color: "var(--text-primary)" }}>
                      {a.text}
                    </p>
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-faint)" }}>
                      <Clock className="h-3 w-3" />
                      {a.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Wrapped link card */}
          <section>
            <h2 className="text-lg font-medium mb-5" style={{ color: "var(--text-muted)" }}>
              Year in Review
            </h2>
            <Link
              href="/reading/wrapped"
              className="group block rounded-2xl border p-7 transition-all hover:shadow-xl hover:-translate-y-1"
              style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--accent-gold)" }}
            >
              <Library className="h-7 w-7 mb-4" style={{ color: "var(--accent-gold)" }} />
              <h3
                className="text-2xl font-medium mb-2"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
              >
                Your 2025 Reading Wrapped
              </h3>
              <p className="mb-5 text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}>
                Thirty-seven books. Eleven thousand pages. Six languages. See the story your year of reading tells.
              </p>
              <span
                className="inline-flex items-center gap-2 text-sm font-medium transition-transform group-hover:gap-3"
                style={{ color: "var(--accent-gold)" }}
              >
                See your 2025 Reading Wrapped
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SCROLLING_BOOKS = [
  "Don Quixote", "War and Peace", "Mahabharata", "One Hundred Years of Solitude",
  "The Odyssey", "Hamlet", "The Brothers Karamazov", "In Search of Lost Time",
  "Ulysses", "The Divine Comedy", "Faust", "Meditations", "The Iliad",
  "Middlemarch", "Crime and Punishment", "The Tale of Genji", "Paradise Lost",
  "Moby Dick", "Anna Karenina", "The Republic", "Beowulf", "Gilgamesh",
  "Don Quixote", "War and Peace", "Mahabharata", "One Hundred Years of Solitude",
];

export function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-base)", minHeight: "90vh" }}
    >
      <div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--accent-gold)" }}
      />
      <div
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--accent-primary)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium mb-8 border"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
          >
            <Sparkles className="h-3 w-3" style={{ color: "var(--accent-gold)" }} />
            A digital Library of Alexandria
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-6"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            All the world&apos;s{" "}
            <em
              className="italic font-normal"
              style={{ color: "var(--accent-primary)" }}
            >
              knowledge
            </em>
            ,<br />
            between two covers.
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{
              fontFamily: "var(--font-source-serif)",
              color: "var(--text-muted)",
            }}
          >
            Every book. Every language. Every era. Explore the interconnected web of
            human thought across civilisations — and discover your next great read.
          </p>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
            <div
              className="flex items-center gap-3 rounded-2xl border px-5 py-3.5 shadow-sm"
              style={{
                backgroundColor: "var(--bg-elevated)",
                borderColor: "var(--border)",
              }}
            >
              <Search className="h-4 w-4 flex-shrink-0" style={{ color: "var(--text-faint)" }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search books, authors, quotes, eras…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-60"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-dm-sans)",
                }}
              />
              <button
                type="submit"
                className="flex-shrink-0 rounded-xl px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--accent-primary)" }}
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: "var(--accent-primary)" }}
            >
              Start Exploring
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all hover:opacity-80"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
                backgroundColor: "var(--bg-elevated)",
              }}
            >
              Browse Collections
            </Link>
          </div>
        </div>

        <div className="mt-20 overflow-hidden" aria-hidden="true">
          <div className="flex gap-8 animate-scroll-left whitespace-nowrap">
            {SCROLLING_BOOKS.map((title, i) => (
              <span
                key={i}
                className="text-sm font-light flex-shrink-0"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  color: "var(--text-faint)",
                  fontSize: "1.1rem",
                }}
              >
                {title}
                <span className="mx-4 opacity-40">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

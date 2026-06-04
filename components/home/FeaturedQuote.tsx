export function FeaturedQuote() {
  return (
    <section
      className="py-16"
      style={{ backgroundColor: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="text-6xl mb-6 font-serif leading-none select-none"
          style={{ color: "var(--accent-gold)", fontFamily: "var(--font-cormorant)" }}
        >
          &ldquo;
        </div>
        <blockquote
          className="text-2xl md:text-3xl font-light italic leading-relaxed mb-6"
          style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
        >
          A reader lives a thousand lives before he dies. The man who never reads lives only one.
        </blockquote>
        <cite
          className="text-sm not-italic"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
        >
          — George R.R. Martin, <em style={{ fontFamily: "var(--font-source-serif)" }}>A Dance with Dragons</em>
        </cite>
      </div>
    </section>
  );
}

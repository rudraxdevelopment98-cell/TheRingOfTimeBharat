export function StatsBar() {
  const stats = [
    { value: "2.5M+", label: "Books indexed" },
    { value: "100+", label: "Languages" },
    { value: "5,000+", label: "Curated collections" },
    { value: "50K+", label: "Author profiles" },
    { value: "6 eras", label: "Of human history" },
  ];

  return (
    <section
      className="border-y py-8"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-2xl md:text-3xl font-semibold mb-0.5"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--accent-primary)" }}
              >
                {value}
              </div>
              <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

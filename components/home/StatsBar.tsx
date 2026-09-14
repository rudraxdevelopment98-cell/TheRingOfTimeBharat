"use client";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function StatsBar() {
  const { t } = useI18n();

  const stats = [
    { value: "2.5M+", key: "home.statsBooks" },
    { value: "100+", key: "home.statsLanguages" },
    { value: "5,000+", key: "home.statsCollections" },
    { value: "50K+", key: "home.statsAuthors" },
    { value: "6", key: "home.statsEras" },
  ];

  return (
    <section
      className="border-y py-8"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {stats.map(({ value, key }) => (
            <div key={key} className="text-center">
              <div
                className="text-2xl md:text-3xl font-semibold mb-0.5"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--accent-primary)" }}
              >
                {value}
              </div>
              <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
                {t(key)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

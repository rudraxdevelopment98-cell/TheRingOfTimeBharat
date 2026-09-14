"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Languages } from "lucide-react";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const choose = (next: Locale) => {
    setLocale(next);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
        className="flex h-9 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium transition-colors hover:opacity-80"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
      >
        <Languages className="h-4 w-4" />
        <span className="uppercase tracking-wide">{locale}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border py-1 shadow-lg"
          style={{
            backgroundColor: "var(--bg-elevated)",
            borderColor: "var(--border)",
          }}
        >
          {LOCALES.map((code) => {
            const meta = LOCALE_META[code];
            const active = code === locale;
            return (
              <button
                key={code}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => choose(code)}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:opacity-80"
                style={{
                  backgroundColor: active
                    ? "color-mix(in srgb, var(--accent-primary) 12%, transparent)"
                    : "transparent",
                }}
              >
                <span className="text-base leading-none" aria-hidden="true">
                  {meta.flag}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className="block text-sm"
                    style={{
                      color: active ? "var(--accent-primary)" : "var(--text-primary)",
                      fontFamily: "var(--font-dm-sans)",
                    }}
                  >
                    {meta.nativeName}
                  </span>
                  <span className="block text-xs" style={{ color: "var(--text-faint)" }}>
                    {meta.name}
                  </span>
                </span>
                {active && (
                  <Check className="h-4 w-4 flex-shrink-0" style={{ color: "var(--accent-primary)" }} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Languages, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Locale } from "@/lib/i18n/config";

/** Module-level cache so re-renders and revisits don't re-hit the API. */
const translationCache = new Map<string, string>();

function cacheKey(locale: Locale, text: string): string {
  return `${locale}::${text.slice(0, 120)}`;
}

export interface TranslatableTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "p" | "div" | "span";
  /** Language the source text is assumed to be written in. Defaults to English. */
  sourceLocale?: string;
}

export function TranslatableText({
  text,
  className,
  style,
  as = "p",
  sourceLocale = "en",
}: TranslatableTextProps) {
  const { locale, t } = useI18n();
  const [translated, setTranslated] = useState<string | null>(null);
  const [showing, setShowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const canTranslate = Boolean(text?.trim()) && locale !== sourceLocale;

  // Reset whenever the locale or the source text changes.
  useEffect(() => {
    const cached = translationCache.get(cacheKey(locale, text));
    setTranslated(cached ?? null);
    setShowing(false);
    setLoading(false);
    setFailed(false);
  }, [locale, text]);

  const handleTranslate = async (event: React.MouseEvent) => {
    // Cards on listing pages wrap this component in a <Link>; keep the
    // translate control from navigating away.
    event.preventDefault();
    event.stopPropagation();

    if (showing) {
      setShowing(false);
      return;
    }

    const key = cacheKey(locale, text);
    const cached = translationCache.get(key);
    if (cached) {
      setTranslated(cached);
      setShowing(true);
      return;
    }

    setLoading(true);
    setFailed(false);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLocale: locale, sourceLocale }),
      });
      if (!res.ok) throw new Error("translate failed");
      const data: unknown = await res.json();
      const result =
        data && typeof data === "object" && Array.isArray((data as { translations?: unknown }).translations)
          ? ((data as { translations: unknown[] }).translations[0] as unknown)
          : null;

      if (typeof result !== "string" || result.trim().length === 0) {
        throw new Error("empty translation");
      }
      translationCache.set(key, result);
      setTranslated(result);
      setShowing(true);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const Tag = as;
  const body = showing && translated ? translated : text;

  return (
    <>
      {/* Rendered as plain text — never dangerouslySetInnerHTML. */}
      <Tag className={className} style={style}>
        {body}
      </Tag>

      {canTranslate && (
        <span className="mt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleTranslate}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-opacity hover:opacity-80 disabled:opacity-60"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-elevated)",
              color: "var(--text-muted)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {loading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Languages className="h-3 w-3" />
            )}
            {loading
              ? t("common.translating")
              : showing
                ? t("common.showOriginal")
                : t("common.translate")}
          </button>

          {showing && !loading && (
            <span className="text-xs" style={{ color: "var(--text-faint)" }}>
              {t("common.poweredByAI")}
            </span>
          )}

          {failed && (
            <span className="text-xs" style={{ color: "var(--text-faint)" }}>
              {t("common.error")}
            </span>
          )}
        </span>
      )}
    </>
  );
}

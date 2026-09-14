"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, LOCALE_META, isLocale, type Locale } from "@/lib/i18n/config";
import en from "@/messages/en.json";
import hi from "@/messages/hi.json";
import gu from "@/messages/gu.json";

type Dict = Record<string, unknown>;

const DICTIONARIES: Record<Locale, Dict> = {
  en: en as Dict,
  hi: hi as Dict,
  gu: gu as Dict,
};

const STORAGE_KEY = "locale";

/** Safely walk a dot-path into a loosely-typed dictionary. Returns a string or null. */
function lookup(dict: Dict, key: string): string | null {
  const parts = key.split(".");
  let node: unknown = dict;
  for (const part of parts) {
    if (typeof node !== "object" || node === null || Array.isArray(node)) return null;
    node = (node as Record<string, unknown>)[part];
    if (node === undefined) return null;
  }
  return typeof node === "string" ? node : null;
}

function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match
  );
}

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    /* localStorage may be unavailable (private mode, blocked cookies) */
  }
  const nav = typeof navigator !== "undefined" ? navigator.language : "";
  const prefix = nav.split("-")[0]?.toLowerCase();
  if (isLocale(prefix)) return prefix;
  return DEFAULT_LOCALE;
}

export interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Start from DEFAULT_LOCALE so server and first client render agree, then
  // reconcile with the stored/browser preference in an effect.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const detected = detectInitialLocale();
    if (detected !== DEFAULT_LOCALE) setLocaleState(detected);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore storage failures */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = LOCALE_META[locale].dir;
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const active = lookup(DICTIONARIES[locale], key);
      if (active !== null) return interpolate(active, vars);
      const fallback = lookup(DICTIONARIES[DEFAULT_LOCALE], key);
      if (fallback !== null) return interpolate(fallback, vars);
      return key;
    },
    [locale]
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t, dir: LOCALE_META[locale].dir }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an <I18nProvider>");
  }
  return ctx;
}

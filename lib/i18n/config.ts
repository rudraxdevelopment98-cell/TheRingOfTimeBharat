export const LOCALES = ["en", "hi", "gu"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<
  Locale,
  { name: string; nativeName: string; flag: string; dir: "ltr" | "rtl" }
> = {
  en: { name: "English", nativeName: "English", flag: "🇬🇧", dir: "ltr" },
  hi: { name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  gu: { name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳", dir: "ltr" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

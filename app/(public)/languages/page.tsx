import { Globe2 } from "lucide-react";
import Link from "next/link";

const PLACEHOLDER_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", books: "1,200,000", direction: "LTR" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", books: "89,000", direction: "RTL" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳", books: "210,000", direction: "LTR" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", books: "145,000", direction: "LTR" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", books: "120,000", direction: "LTR" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", books: "98,000", direction: "LTR" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", books: "87,000", direction: "LTR" },
  { code: "fa", name: "Persian", nativeName: "فارسی", flag: "🇮🇷", books: "34,000", direction: "RTL" },
  { code: "sa", name: "Sanskrit", nativeName: "संस्कृत", flag: "🇮🇳", books: "12,000", direction: "LTR" },
  { code: "la", name: "Latin", nativeName: "Latina", flag: "🏛️", books: "28,000", direction: "LTR" },
  { code: "el", name: "Ancient Greek", nativeName: "Ἑλληνική", flag: "🇬🇷", books: "9,400", direction: "LTR" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", books: "76,000", direction: "LTR" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹", books: "67,000", direction: "LTR" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪", books: "4,200", direction: "LTR" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", books: "43,000", direction: "LTR" },
];

type LangItem = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  books: string;
  direction: string;
};

export default async function LanguagesPage() {
  let FEATURED_LANGUAGES: LangItem[] = PLACEHOLDER_LANGUAGES;

  try {
    const { prisma } = await import("@/lib/prisma");
    const results = await prisma.language.findMany({
      where: { isFeatured: true },
      orderBy: { totalBooks: "desc" },
    });
    if (results.length > 0) {
      FEATURED_LANGUAGES = results.map((lang) => ({
        code: lang.code,
        name: lang.name,
        nativeName: lang.nativeName ?? lang.name,
        flag: lang.flagEmoji ?? "🌐",
        books: (lang.totalBooks ?? 0).toLocaleString(),
        direction: lang.direction ?? "LTR",
      }));
    }
  } catch {
    /* use placeholder */
  }

  return (
    <div style={{ backgroundColor: "var(--bg-base)" }}>
      <div
        className="border-b py-12"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Globe2 className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
            <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--accent-gold)" }}>
              Language Hub
            </p>
          </div>
          <h1
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            100+ languages, one library
          </h1>
          <p className="text-base" style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}>
            Human knowledge transcends borders. Explore books in their original language or find every available translation.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {FEATURED_LANGUAGES.map((lang) => (
            <Link
              key={lang.code}
              href={`/explore/language/${lang.code}`}
              className="group rounded-xl border p-5 text-center transition-all hover:shadow-md hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <div className="text-3xl mb-2">{lang.flag}</div>
              <div
                className="font-medium mb-1"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-cormorant)", fontSize: "1.05rem" }}
              >
                {lang.name}
              </div>
              <div className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
                {lang.nativeName}
              </div>
              <div className="text-xs" style={{ color: "var(--text-faint)" }}>
                {lang.books} books
              </div>
              {lang.direction === "RTL" && (
                <div
                  className="mt-2 text-xs px-2 py-0.5 rounded-full inline-block"
                  style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-faint)" }}
                >
                  RTL
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

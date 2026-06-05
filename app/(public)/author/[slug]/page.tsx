import Link from "next/link";
import {
  User,
  Calendar,
  Globe,
  ExternalLink,
  BookOpen,
  Quote,
  Network,
  MapPin,
} from "lucide-react";
import { AuthorTimeline } from "@/components/author/AuthorTimeline";

type PersonData = {
  name: string;
  bio: string | null;
  aiBioSummary: string | null;
  birthYear: number | null;
  deathYear: number | null;
  nationality: string | null;
  languagesWritten: string[];
  wikipediaUrl: string | null;
  websiteUrl: string | null;
  books: Array<{
    book: {
      title: string;
      slug: string;
      yearPublished: number | null;
      originalLanguage: string | null;
      aiSummaryShort: string | null;
    };
  }>;
  quotes: Array<{
    id: string;
    text: string;
    book: { title: string } | null;
  }>;
};

function nameFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  let personData: PersonData | null = null;

  try {
    const { prisma } = await import("@/lib/prisma");
    const result = await prisma.person.findUnique({
      where: { slug: params.slug },
      include: {
        books: {
          include: { book: true },
          where: { role: "AUTHOR" },
        },
        quotes: {
          take: 5,
          include: { book: true },
          orderBy: { likesCount: "desc" },
        },
      },
    });
    if (result) personData = result as unknown as PersonData;
  } catch {
    /* use placeholder */
  }

  if (!personData) {
    return (
      <div
        style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}
        className="flex items-center justify-center"
      >
        <div className="text-center">
          <p
            className="text-2xl font-light mb-4"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)" }}
          >
            Author not found
          </p>
          <Link
            href="/authors"
            className="text-sm underline"
            style={{ color: "var(--accent-primary)" }}
          >
            &larr; Back to Authors
          </Link>
        </div>
      </div>
    );
  }

  const name = personData.name || nameFromSlug(params.slug);
  const firstName = name.split(" ")[0];
  const bio = personData.bio ?? personData.aiBioSummary ?? "";
  const birthYear = personData.birthYear ? String(personData.birthYear) : "Unknown";
  const deathYear = personData.deathYear ? String(personData.deathYear) : "Present";
  const nationality = personData.nationality ?? "Unknown";
  const languagesWritten = personData.languagesWritten ?? [];
  const wikipedia = personData.wikipediaUrl ?? "";
  const website = personData.websiteUrl ?? "";

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Header band */}
      <div
        className="border-b py-12"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <User className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
            <p
              className="text-xs uppercase tracking-widest font-medium"
              style={{ color: "var(--accent-gold)", fontFamily: "var(--font-dm-sans)" }}
            >
              Author
            </p>
          </div>
          <h1
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            {name}
          </h1>
          <p
            className="text-base max-w-2xl"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
          >
            {nationality}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-8">
            <div
              className="aspect-square w-full rounded-2xl flex items-center justify-center shadow-lg mb-5"
              style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}
            >
              <User className="h-24 w-24" style={{ color: "var(--text-faint)" }} strokeWidth={1} />
            </div>

            <h2
              className="text-3xl font-light mb-3"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
            >
              {name}
            </h2>

            <div className="space-y-2.5 mb-6">
              <InfoRow icon={<Calendar className="h-4 w-4" />}>
                {birthYear} – {deathYear}
              </InfoRow>
              <InfoRow icon={<MapPin className="h-4 w-4" />}>{nationality}</InfoRow>
              <InfoRow icon={<Globe className="h-4 w-4" />}>{nationality}</InfoRow>
            </div>

            {languagesWritten.length > 0 && (
              <div className="mb-6">
                <p
                  className="text-xs uppercase tracking-widest mb-2.5"
                  style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
                >
                  Languages
                </p>
                <div className="flex flex-wrap gap-2">
                  {languagesWritten.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full border px-3 py-1 text-xs"
                      style={{
                        borderColor: "var(--border)",
                        backgroundColor: "var(--bg-surface)",
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              {wikipedia && <ExternalRow href={wikipedia} label="Wikipedia" />}
              {website && <ExternalRow href={website} label="Website" />}
            </div>

            {/* Influence Network teaser */}
            <Link
              href="/graph"
              className="group mt-6 flex items-center gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <span
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: "var(--bg-elevated)" }}
              >
                <Network className="h-5 w-5" style={{ color: "var(--accent-secondary)" }} />
              </span>
              <span className="min-w-0">
                <span
                  className="block text-sm font-medium"
                  style={{ color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)" }}
                >
                  Influence Network
                </span>
                <span
                  className="block text-xs group-hover:opacity-80 transition-opacity"
                  style={{ color: "var(--text-muted)" }}
                >
                  Explore {firstName}&rsquo;s influence network &rarr;
                </span>
              </span>
            </Link>
          </aside>

          {/* Right column */}
          <div className="lg:col-span-8 space-y-14">
            {/* Biography */}
            {bio && (
              <section>
                <SectionHeader icon={<User className="h-4 w-4" />}>Biography</SectionHeader>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
                >
                  {bio}
                </p>
              </section>
            )}

            {/* Works */}
            {personData.books.length > 0 && (
              <section>
                <SectionHeader icon={<BookOpen className="h-4 w-4" />}>Works</SectionHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {personData.books.map(({ book }) => (
                    <Link
                      key={book.slug}
                      href={`/book/${book.slug}`}
                      className="group flex items-start gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                      style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
                    >
                      <div
                        className="aspect-[2/3] w-14 flex-shrink-0 flex items-center justify-center rounded-xl"
                        style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                      >
                        <BookOpen className="h-6 w-6" style={{ color: "var(--text-faint)" }} />
                      </div>
                      <div className="min-w-0">
                        <h3
                          className="text-lg font-light leading-tight mb-1 group-hover:opacity-80 transition-opacity"
                          style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                        >
                          {book.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {book.yearPublished && <Chip>{book.yearPublished}</Chip>}
                          {book.originalLanguage && <Chip>{book.originalLanguage}</Chip>}
                        </div>
                        {book.aiSummaryShort && (
                          <p
                            className="text-sm italic"
                            style={{ color: "var(--text-faint)", fontFamily: "var(--font-source-serif)" }}
                          >
                            {book.aiSummaryShort}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Notable Quotes */}
            {personData.quotes.length > 0 && (
              <section>
                <SectionHeader icon={<Quote className="h-4 w-4" />}>Notable Quotes</SectionHeader>
                <div className="space-y-5">
                  {personData.quotes.map((quote) => (
                    <figure
                      key={quote.id}
                      className="relative rounded-2xl border p-7 pl-14"
                      style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
                    >
                      <Quote
                        className="absolute left-6 top-6 h-7 w-7"
                        style={{ color: "var(--accent-primary)", opacity: 0.5 }}
                        aria-hidden
                      />
                      <blockquote
                        className="text-xl italic leading-relaxed"
                        style={{ color: "var(--text-primary)", fontFamily: "var(--font-source-serif)" }}
                      >
                        {quote.text}
                      </blockquote>
                      <figcaption
                        className="mt-3 text-xs uppercase tracking-widest"
                        style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
                      >
                        {name}{quote.book ? ` · ${quote.book.title}` : ""}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {/* Timeline */}
            <section>
              <SectionHeader icon={<Calendar className="h-4 w-4" />}>Timeline</SectionHeader>
              <AuthorTimeline
                events={[
                  { year: birthYear, label: `Born — ${nationality} lineage`, type: "birth" },
                  { year: deathYear, label: `Died`, type: "death" },
                ]}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
      <span style={{ color: "var(--text-faint)" }}>{icon}</span>
      <span style={{ fontFamily: "var(--font-dm-sans)" }}>{children}</span>
    </div>
  );
}

function ExternalRow({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-surface)",
        color: "var(--text-muted)",
        fontFamily: "var(--font-dm-sans)",
      }}
    >
      <span>{label}</span>
      <ExternalLink
        className="h-4 w-4 transition-opacity group-hover:opacity-80"
        style={{ color: "var(--text-faint)" }}
      />
    </a>
  );
}

function SectionHeader({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span style={{ color: "var(--accent-primary)" }}>{icon}</span>
      <h2
        className="text-2xl font-light"
        style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
      >
        {children}
      </h2>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-xs"
      style={{
        backgroundColor: "var(--bg-elevated)",
        color: "var(--text-faint)",
        fontFamily: "var(--font-fira-code)",
      }}
    >
      {children}
    </span>
  );
}

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

interface Work {
  title: string;
  year: string;
  language: string;
  note: string;
  cover: string;
  slug: string;
}

const AUTHOR = {
  birthYear: "121",
  deathYear: "180",
  nationality: "Roman",
  era: "Classical Antiquity · Pax Romana",
  languagesWritten: ["Koine Greek", "Latin"],
  bio:
    "Born to a prominent family during the height of the Roman Empire, he was adopted into the imperial line and groomed for power from boyhood. Yet his temperament leaned always toward the study chamber rather than the throne room. Schooled in Stoic philosophy by his beloved tutor, he came to see public office not as privilege but as duty — a burden to be borne with equanimity. During the long campaigns along the northern frontier, amid plague and war, he kept a private journal in Greek, never intended for other eyes. Written to no audience but himself, these notes became one of the most enduring meditations on duty, mortality, and the practice of virtue ever set down. He governed an empire while quietly governing, first of all, himself.",
  wikipedia: "https://en.wikipedia.org/wiki/Marcus_Aurelius",
  website: "https://bibliosphere.example/authors",
};

const WORKS: Work[] = [
  {
    title: "Meditations",
    year: "c. 180",
    language: "Greek",
    note: "Private notes to himself, written on campaign — the closest philosophy comes to a diary.",
    cover: "🏛️",
    slug: "meditations-marcus-aurelius",
  },
  {
    title: "Letters to Fronto",
    year: "c. 145",
    language: "Latin",
    note: "Affectionate correspondence with his rhetoric master, full of youthful warmth.",
    cover: "✉️",
    slug: "letters-to-fronto-marcus-aurelius",
  },
  {
    title: "On Duty and the Common Good",
    year: "c. 170",
    language: "Greek",
    note: "Reflections on the obligations that bind ruler to ruled.",
    cover: "⚖️",
    slug: "on-duty-marcus-aurelius",
  },
  {
    title: "Fragments on Mortality",
    year: "c. 175",
    language: "Greek",
    note: "Scattered passages on death as nature's quiet, ordinary return.",
    cover: "🕯️",
    slug: "fragments-on-mortality-marcus-aurelius",
  },
  {
    title: "The Frontier Journals",
    year: "c. 172",
    language: "Greek",
    note: "Notes kept during the Marcomannic Wars, dust and philosophy intertwined.",
    cover: "🛡️",
    slug: "frontier-journals-marcus-aurelius",
  },
  {
    title: "On Providence",
    year: "c. 178",
    language: "Greek",
    note: "An inquiry into order, fate, and the reason that governs the cosmos.",
    cover: "🌌",
    slug: "on-providence-marcus-aurelius",
  },
];

const QUOTES = [
  "You have power over your mind — not outside events. Realize this, and you will find strength.",
  "Waste no more time arguing about what a good man should be. Be one.",
  "The happiness of your life depends upon the quality of your thoughts.",
];

function nameFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function AuthorPage({ params }: { params: { slug: string } }) {
  const name = nameFromSlug(params.slug);
  const firstName = name.split(" ")[0];

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
            {AUTHOR.era}
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
                {AUTHOR.birthYear} – {AUTHOR.deathYear}
              </InfoRow>
              <InfoRow icon={<MapPin className="h-4 w-4" />}>{AUTHOR.nationality}</InfoRow>
              <InfoRow icon={<Globe className="h-4 w-4" />}>{AUTHOR.era}</InfoRow>
            </div>

            <div className="mb-6">
              <p
                className="text-xs uppercase tracking-widest mb-2.5"
                style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
              >
                Languages
              </p>
              <div className="flex flex-wrap gap-2">
                {AUTHOR.languagesWritten.map((lang) => (
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

            <div className="space-y-2">
              <ExternalRow href={AUTHOR.wikipedia} label="Wikipedia" />
              <ExternalRow href={AUTHOR.website} label="Website" />
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
            <section>
              <SectionHeader icon={<User className="h-4 w-4" />}>Biography</SectionHeader>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
              >
                {AUTHOR.bio}
              </p>
            </section>

            {/* Works */}
            <section>
              <SectionHeader icon={<BookOpen className="h-4 w-4" />}>Works</SectionHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {WORKS.map((work) => (
                  <Link
                    key={work.slug}
                    href={`/book/${work.slug}`}
                    className="group flex items-start gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
                  >
                    <div
                      className="aspect-[2/3] w-14 flex-shrink-0 flex items-center justify-center rounded-xl"
                      style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                    >
                      <span className="text-2xl">{work.cover}</span>
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="text-lg font-light leading-tight mb-1 group-hover:opacity-80 transition-opacity"
                        style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                      >
                        {work.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Chip>{work.year}</Chip>
                        <Chip>{work.language}</Chip>
                      </div>
                      <p
                        className="text-sm italic"
                        style={{ color: "var(--text-faint)", fontFamily: "var(--font-source-serif)" }}
                      >
                        {work.note}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Notable Quotes */}
            <section>
              <SectionHeader icon={<Quote className="h-4 w-4" />}>Notable Quotes</SectionHeader>
              <div className="space-y-5">
                {QUOTES.map((quote, i) => (
                  <figure
                    key={i}
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
                      {quote}
                    </blockquote>
                    <figcaption
                      className="mt-3 text-xs uppercase tracking-widest"
                      style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
                    >
                      {name}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            {/* Timeline */}
            <section>
              <SectionHeader icon={<Calendar className="h-4 w-4" />}>Timeline</SectionHeader>
              <AuthorTimeline
                events={[
                  { year: AUTHOR.birthYear, label: `Born — ${AUTHOR.nationality} lineage`, type: "birth" },
                  { year: "145", label: "Letters to Fronto", type: "work" },
                  { year: "161", label: "Accession to the imperial throne", type: "event" },
                  { year: "170", label: "On Duty and the Common Good", type: "work" },
                  { year: "180", label: "Meditations completed on campaign", type: "work" },
                  { year: AUTHOR.deathYear, label: "Died at Vindobona", type: "death" },
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

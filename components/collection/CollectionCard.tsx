import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CollectionCardProps {
  name: string;
  description?: string;
  bookCount: number;
  emoji: string;
  slug: string;
  accentColor?: string;
}

export function CollectionCard({
  name,
  description,
  bookCount,
  emoji,
  slug,
  accentColor = "var(--accent-primary)",
}: CollectionCardProps) {
  return (
    <Link
      href={`/collection/${slug}`}
      className="group relative flex items-stretch overflow-hidden rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
    >
      <div
        className="w-1.5 flex-shrink-0"
        style={{ backgroundColor: accentColor }}
        aria-hidden
      />
      <div className="flex flex-1 items-start gap-4 p-6 min-w-0">
        <div className="text-3xl flex-shrink-0 mt-0.5">{emoji}</div>
        <div className="min-w-0 flex-1">
          <h3
            className="text-xl font-light mb-1 truncate"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            {name}
          </h3>
          {description && (
            <p
              className="text-sm mb-3 line-clamp-2"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
            >
              {description}
            </p>
          )}
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: "var(--bg-elevated)",
              color: "var(--text-faint)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {bookCount.toLocaleString()} books
          </span>
        </div>
        <ArrowRight
          className="h-5 w-5 flex-shrink-0 self-center opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
          style={{ color: accentColor }}
        />
      </div>
    </Link>
  );
}

import Link from "next/link";
import { User, Plus, Edit, Search } from "lucide-react";

const AUTHORS = [
  { name: "Marcus Aurelius", slug: "marcus-aurelius", nationality: "Roman", born: 121, died: 180, works: 1, rating: 4.8 },
  { name: "Fyodor Dostoevsky", slug: "dostoevsky", nationality: "Russian", born: 1821, died: 1881, works: 8, rating: 4.7 },
  { name: "Leo Tolstoy", slug: "tolstoy", nationality: "Russian", born: 1828, died: 1910, works: 12, rating: 4.6 },
  { name: "Jane Austen", slug: "jane-austen", nationality: "English", born: 1775, died: 1817, works: 6, rating: 4.5 },
  { name: "Albert Camus", slug: "camus", nationality: "French", born: 1913, died: 1960, works: 7, rating: 4.4 },
  { name: "Virginia Woolf", slug: "virginia-woolf", nationality: "English", born: 1882, died: 1941, works: 9, rating: 4.3 },
];

export default function AdminAuthorsPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div className="border-b py-10" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <User className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
              <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--accent-gold)" }}>Admin</p>
            </div>
            <h1 className="text-4xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>Authors</h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white" style={{ backgroundColor: "var(--accent-primary)" }}>
            <Plus className="h-4 w-4" /> Add Author
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-5">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--text-faint)" }} />
            <input type="text" placeholder="Search authors…" className="w-full rounded-xl border pl-9 pr-4 py-2.5 text-sm outline-none" style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
          </div>
        </div>

        <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}>
          {AUTHORS.map((author, i) => (
            <div
              key={author.slug}
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: i < AUTHORS.length - 1 ? "1px solid var(--border)" : "none" }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "var(--accent-primary)" }}>
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <Link href={`/author/${author.slug}`} className="font-medium hover:opacity-80" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontSize: "1.05rem" }}>
                    {author.name}
                  </Link>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs" style={{ color: "var(--text-faint)" }}>{author.nationality}</span>
                    <span className="text-xs" style={{ color: "var(--text-faint)" }}>{author.born < 0 ? `${Math.abs(author.born)} BC` : author.born} – {author.died}</span>
                    <span className="text-xs" style={{ color: "var(--text-faint)" }}>{author.works} works</span>
                    <span className="text-xs" style={{ color: "var(--accent-gold)" }}>★ {author.rating}</span>
                  </div>
                </div>
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}><Edit className="h-3.5 w-3.5" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

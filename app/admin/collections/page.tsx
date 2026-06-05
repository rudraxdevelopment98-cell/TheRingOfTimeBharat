import Link from "next/link";
import { Layers, Plus, Edit, Trash2, BookOpen } from "lucide-react";

const COLLECTIONS = [
  { name: "Nobel Prize in Literature", slug: "nobel-prize-literature", type: "OFFICIAL", bookCount: 120, followerCount: 4200, featured: true },
  { name: "Ancient & Sacred Texts", slug: "ancient-sacred-texts", type: "OFFICIAL", bookCount: 340, followerCount: 3800, featured: true },
  { name: "Philosophy Through the Ages", slug: "philosophy-through-ages", type: "OFFICIAL", bookCount: 890, followerCount: 6100, featured: false },
  { name: "Feminist Literature: A Century", slug: "feminist-literature", type: "OFFICIAL", bookCount: 420, followerCount: 2900, featured: false },
  { name: "My Reading Journey 2025", slug: "my-reading-2025", type: "USER", bookCount: 18, followerCount: 45, featured: false },
];

export default function AdminCollectionsPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div className="border-b py-10" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Layers className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
              <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--accent-gold)" }}>Admin</p>
            </div>
            <h1 className="text-4xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>Collections</h1>
          </div>
          <Link href="/collections/new" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white" style={{ backgroundColor: "var(--accent-primary)" }}>
            <Plus className="h-4 w-4" /> New Collection
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}>
          {COLLECTIONS.map((col, i) => (
            <div
              key={col.slug}
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: i < COLLECTIONS.length - 1 ? "1px solid var(--border)" : "none" }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: "var(--bg-elevated)" }}>
                  <Layers className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
                </div>
                <div>
                  <Link href={`/collection/${col.slug}`} className="font-medium hover:opacity-80" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontSize: "1.05rem" }}>
                    {col.name}
                  </Link>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs" style={{ color: "var(--text-faint)" }}>{col.bookCount} books</span>
                    <span className="text-xs" style={{ color: "var(--text-faint)" }}>{col.followerCount.toLocaleString()} followers</span>
                    <span className="text-xs rounded-full px-2 py-0.5" style={{ backgroundColor: col.type === "OFFICIAL" ? "color-mix(in srgb, var(--accent-primary) 15%, transparent)" : "var(--bg-elevated)", color: col.type === "OFFICIAL" ? "var(--accent-primary)" : "var(--text-faint)" }}>{col.type}</span>
                    {col.featured && <span className="text-xs rounded-full px-2 py-0.5" style={{ backgroundColor: "color-mix(in srgb, var(--accent-gold) 15%, transparent)", color: "var(--accent-gold)" }}>Featured</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border transition-opacity hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}><Edit className="h-3.5 w-3.5" /></button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border transition-opacity hover:opacity-80" style={{ borderColor: "var(--border)", color: "#ef4444" }}><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

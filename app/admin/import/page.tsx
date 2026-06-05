import { Download, Upload, Search, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";

const RECENT_IMPORTS = [
  { source: "Open Library", count: "1,240 books", status: "done", date: "2 hours ago" },
  { source: "Project Gutenberg", count: "340 books", status: "done", date: "Yesterday" },
  { source: "Goodreads CSV", count: "89 books", status: "processing", date: "Just now" },
  { source: "ISBN Lookup", count: "1 book", status: "done", date: "3 days ago" },
];

const statusConfig: Record<string, { label: string; color: string; Icon: typeof CheckCircle }> = {
  done: { label: "Done", color: "var(--accent-secondary)", Icon: CheckCircle },
  processing: { label: "Processing", color: "var(--accent-gold)", Icon: Clock },
  failed: { label: "Failed", color: "#ef4444", Icon: AlertCircle },
};

export default function AdminImportPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div
        className="border-b py-10"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Download className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
            <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--accent-gold)" }}>Admin</p>
          </div>
          <h1 className="text-4xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
            Data Import
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}>
            Import books and metadata from external sources.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        {/* Import sources */}
        {[
          {
            emoji: "📚", title: "Open Library", desc: "Import from openlibrary.org via ISBN or title search. Powers bulk metadata enrichment.",
            action: <div className="flex gap-2 mt-3">
              <input type="text" placeholder="Search title or ISBN…" className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none" style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
              <button className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: "var(--accent-primary)" }}><Search className="h-3.5 w-3.5" /> Search</button>
            </div>,
          },
          {
            emoji: "🆓", title: "Project Gutenberg", desc: "Index all public domain ebooks with epub download links — 60,000+ free books available.",
            action: <button className="mt-3 flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: "var(--accent-secondary)" }}><Download className="h-3.5 w-3.5" /> Run Full Import</button>,
          },
          {
            emoji: "📊", title: "Goodreads CSV", desc: "Upload your Goodreads export to migrate a user's full reading history.",
            action: <div className="mt-3"><label className="flex items-center gap-2 cursor-pointer rounded-lg border-2 border-dashed px-4 py-3 text-sm" style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}><Upload className="h-4 w-4" /> Choose CSV file…<input type="file" accept=".csv" className="sr-only" /></label></div>,
          },
          {
            emoji: "🔢", title: "ISBN Scanner", desc: "Enter or scan an ISBN to auto-populate all book metadata from multiple sources.",
            action: <div className="flex gap-2 mt-3">
              <input type="text" placeholder="978-0-06-112008-4" className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none font-mono" style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border)", color: "var(--text-primary)", fontFamily: "var(--font-fira-code)" }} />
              <button className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: "var(--accent-primary)" }}><Search className="h-3.5 w-3.5" /> Look Up</button>
            </div>,
          },
        ].map(({ emoji, title, desc, action }) => (
          <div key={title} className="rounded-2xl border p-6" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}>
            <div className="flex items-start gap-4">
              <span className="text-3xl">{emoji}</span>
              <div className="flex-1">
                <h2 className="text-lg font-medium mb-1" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>{title}</h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{desc}</p>
                {action}
              </div>
            </div>
          </div>
        ))}

        {/* Recent jobs */}
        <div className="rounded-2xl border p-6" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}>
          <h2 className="text-lg font-light mb-4" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>Recent Import Jobs</h2>
          <div className="space-y-3">
            {RECENT_IMPORTS.map((job) => {
              const cfg = statusConfig[job.status];
              return (
                <div key={job.source + job.date} className="flex items-center justify-between rounded-lg border px-4 py-3" style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4" style={{ color: "var(--text-faint)" }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{job.source}</p>
                      <p className="text-xs" style={{ color: "var(--text-faint)" }}>{job.count} · {job.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <cfg.Icon className="h-3.5 w-3.5" style={{ color: cfg.color }} />
                    <span className="text-xs font-medium" style={{ color: cfg.color }}>{cfg.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

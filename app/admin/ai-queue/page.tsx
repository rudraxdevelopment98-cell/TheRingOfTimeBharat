import { Cpu, RefreshCw, CheckCircle, Clock, AlertCircle, Loader2 } from "lucide-react";

const JOBS = [
  { id: "j001", book: "Don Quixote", type: "summary-flash", status: "done", queued: "2 min ago", duration: "3s" },
  { id: "j002", book: "Meditations", type: "summary-deep", status: "processing", queued: "5 min ago", duration: "—" },
  { id: "j003", book: "The Brothers Karamazov", type: "summary-academic", status: "pending", queued: "8 min ago", duration: "—" },
  { id: "j004", book: "One Hundred Years of Solitude", type: "summary-standard", status: "done", queued: "12 min ago", duration: "5s" },
  { id: "j005", book: "The Divine Comedy", type: "metadata-enrich", status: "failed", queued: "15 min ago", duration: "—" },
  { id: "j006", book: "Things Fall Apart", type: "summary-flash", status: "done", queued: "20 min ago", duration: "2s" },
  { id: "j007", book: "Mrs Dalloway", type: "summary-short", status: "pending", queued: "25 min ago", duration: "—" },
  { id: "j008", book: "The Stranger", type: "summary-deep", status: "done", queued: "30 min ago", duration: "8s" },
];

const statusConfig: Record<string, { color: string; bg: string; Icon: React.ComponentType<{ className?: string }> }> = {
  done: { color: "var(--accent-secondary)", bg: "color-mix(in srgb, var(--accent-secondary) 12%, transparent)", Icon: CheckCircle },
  processing: { color: "var(--accent-gold)", bg: "color-mix(in srgb, var(--accent-gold) 12%, transparent)", Icon: Loader2 },
  pending: { color: "var(--text-faint)", bg: "var(--bg-elevated)", Icon: Clock },
  failed: { color: "#ef4444", bg: "color-mix(in srgb, #ef4444 12%, transparent)", Icon: AlertCircle },
};

export default function AdminAIQueuePage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div className="border-b py-10" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
              <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--accent-gold)" }}>Admin</p>
            </div>
            <h1 className="text-4xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>AI Job Queue</h1>
            <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>Background AI tasks — summaries, enrichment, recommendations.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Jobs", value: "1,284", color: "var(--text-primary)" },
            { label: "Processing", value: "3", color: "var(--accent-gold)" },
            { label: "Completed", value: "1,270", color: "var(--accent-secondary)" },
            { label: "Failed", value: "11", color: "#ef4444" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-xl border p-4 text-center" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}>
              <div className="text-2xl font-light mb-0.5" style={{ fontFamily: "var(--font-cormorant)", color }}>{value}</div>
              <div className="text-xs" style={{ color: "var(--text-faint)" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Job list */}
        <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}>
          <div className="px-5 py-3 border-b" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-elevated)" }}>
            <div className="grid grid-cols-12 gap-4 text-xs uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
              <span className="col-span-4">Book</span>
              <span className="col-span-3">Job Type</span>
              <span className="col-span-2">Status</span>
              <span className="col-span-2">Queued</span>
              <span className="col-span-1">Time</span>
            </div>
          </div>
          {JOBS.map((job, i) => {
            const cfg = statusConfig[job.status];
            return (
              <div
                key={job.id}
                className="px-5 py-3.5 grid grid-cols-12 gap-4 items-center"
                style={{ borderBottom: i < JOBS.length - 1 ? "1px solid var(--border)" : "none" }}
              >
                <span className="col-span-4 text-sm font-medium truncate" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontSize: "0.95rem" }}>{job.book}</span>
                <span className="col-span-3 text-xs font-mono" style={{ fontFamily: "var(--font-fira-code)", color: "var(--text-muted)" }}>{job.type}</span>
                <div className="col-span-2">
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                    <cfg.Icon className="h-3 w-3" />
                    {job.status}
                  </span>
                </div>
                <span className="col-span-2 text-xs" style={{ color: "var(--text-faint)" }}>{job.queued}</span>
                <span className="col-span-1 text-xs font-mono" style={{ fontFamily: "var(--font-fira-code)", color: "var(--text-faint)" }}>{job.duration}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

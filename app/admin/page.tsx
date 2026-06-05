import Link from "next/link";
import {
  Shield,
  BookPlus,
  Database,
  Cpu,
  Users,
  Globe,
  ListTodo,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const stats = [
  { icon: Database, label: "Total Books", value: "25,421", color: "var(--accent-primary)" },
  { icon: Users, label: "Total Authors", value: "8,340", color: "var(--accent-secondary)" },
  { icon: ListTodo, label: "Collections", value: "142", color: "var(--accent-gold)" },
  { icon: Cpu, label: "Pending AI Jobs", value: "7", color: "#e05252" },
  { icon: Users, label: "Users", value: "3,201", color: "var(--accent-primary)" },
  { icon: Globe, label: "Languages", value: "102", color: "var(--accent-secondary)" },
];

const recentBooks = [
  { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", date: "2026-06-03" },
  { title: "Middlemarch", author: "George Eliot", date: "2026-06-02" },
  { title: "The Tale of Genji", author: "Murasaki Shikibu", date: "2026-06-01" },
  { title: "Don Quixote", author: "Miguel de Cervantes", date: "2026-05-31" },
  { title: "Beloved", author: "Toni Morrison", date: "2026-05-30" },
];

const aiJobs = [
  { title: "Middlemarch", type: "summary-deep", status: "DONE", queued: "2026-06-03 14:20" },
  { title: "The Brothers Karamazov", type: "summary-flash", status: "PROCESSING", queued: "2026-06-03 15:05" },
  { title: "Don Quixote", type: "themes-extract", status: "PENDING", queued: "2026-06-03 15:30" },
  { title: "Beloved", type: "summary-flash", status: "PENDING", queued: "2026-06-03 15:45" },
  { title: "The Tale of Genji", type: "summary-deep", status: "DONE", queued: "2026-06-02 09:10" },
];

function statusStyle(status: string): React.CSSProperties {
  if (status === "DONE") return { backgroundColor: "#16a34a22", color: "#16a34a" };
  if (status === "PROCESSING") return { backgroundColor: "#2563eb22", color: "#2563eb" };
  return { backgroundColor: "#d9770622", color: "#d97706" };
}

const quickActions = [
  { label: "Add Book", href: "/admin/books/new", icon: BookPlus },
  { label: "Import from Open Library", href: "/admin/import", icon: Database },
  { label: "Generate Collection", href: "/admin/collections", icon: Sparkles },
  { label: "Run Trending", href: "/admin/ai-queue", icon: TrendingUp },
];

export default function AdminDashboard() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="border-b py-12"
        style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-5 w-5" style={{ color: "var(--accent-gold)" }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--accent-gold)", fontFamily: "var(--font-dm-sans)" }}
            >
              Admin
            </span>
          </div>
          <h1
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Control Centre
          </h1>
          <p style={{ fontFamily: "var(--font-source-serif)", color: "var(--text-muted)" }}>
            Manage the Library of Alexandria
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="rounded-xl border p-6"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <Icon className="h-6 w-6 mb-3" style={{ color }} />
              <div
                className="text-4xl font-bold mb-1"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
              >
                {value}
              </div>
              <div
                className="text-sm"
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--text-muted)" }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Additions */}
          <div
            className="rounded-xl border"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
          >
            <div className="px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
              <h2
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
              >
                Recent Additions
              </h2>
            </div>
            <ul>
              {recentBooks.map((book, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between px-6 py-4 border-b last:border-b-0"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div>
                    <div
                      className="font-medium text-sm"
                      style={{ color: "var(--text-primary)", fontFamily: "var(--font-source-serif)" }}
                    >
                      {book.title}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {book.author} · {book.date}
                    </div>
                  </div>
                  <Link
                    href="/admin/books"
                    className="text-xs px-3 py-1 rounded-full border transition-colors hover:opacity-80"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--accent-primary)",
                      fontFamily: "var(--font-dm-sans)",
                    }}
                  >
                    View
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Job Queue */}
          <div
            className="rounded-xl border"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
          >
            <div className="px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
              <h2
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
              >
                AI Job Queue
              </h2>
            </div>
            <ul>
              {aiJobs.map((job, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between px-6 py-4 border-b last:border-b-0"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex-1 min-w-0 mr-3">
                    <div
                      className="font-medium text-sm truncate"
                      style={{ color: "var(--text-primary)", fontFamily: "var(--font-source-serif)" }}
                    >
                      {job.title}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {job.type} · {job.queued}
                    </div>
                  </div>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0"
                    style={statusStyle(job.status)}
                  >
                    {job.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-xl border p-6"
          style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
        >
          <h2
            className="text-xl font-semibold mb-5"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            {quickActions.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  color: "#ffffff",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

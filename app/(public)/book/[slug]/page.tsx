import { BookOpen, Star, Globe, Calendar, Clock, Users } from "lucide-react";

export default function BookPage({ params }: { params: { slug: string } }) {
  const title = params.slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div
              className="aspect-[2/3] rounded-xl flex items-center justify-center mb-6 shadow-2xl"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="text-center p-8">
                <BookOpen className="h-16 w-16 mx-auto mb-4" style={{ color: "var(--text-faint)" }} />
                <p
                  className="text-2xl font-light"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-muted)" }}
                >
                  {title}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                className="w-full rounded-xl py-3 px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--accent-primary)" }}
              >
                Add to Library
              </button>
              <button
                className="w-full rounded-xl py-3 px-4 text-sm font-medium border transition-opacity hover:opacity-80"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                Want to Read
              </button>
            </div>

            <div
              className="mt-6 rounded-xl border p-4 space-y-3"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              {[
                { icon: Star, label: "Rating", value: "4.7 / 5 (2,340 reviews)" },
                { icon: Globe, label: "Language", value: "Multiple editions" },
                { icon: Calendar, label: "Published", value: "—" },
                { icon: Clock, label: "Reading time", value: "~4-6 hours" },
                { icon: Users, label: "Readers", value: "12,400 on Bibliosphere" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <Icon className="h-4 w-4 flex-shrink-0" style={{ color: "var(--text-faint)" }} />
                  <span style={{ color: "var(--text-faint)" }}>{label}:</span>
                  <span style={{ color: "var(--text-muted)" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-6">
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "var(--accent-gold)" }}
              >
                Book
              </p>
              <h1
                className="text-4xl md:text-5xl font-light mb-3"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
              >
                {title}
              </h1>
              <p className="text-lg" style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}>
                Details loading — connect your database to see full book information.
              </p>
            </div>

            <div
              className="rounded-2xl border p-8"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <div className="flex gap-4 mb-6 flex-wrap">
                {["Summary", "Editions", "Reviews", "AI Chat", "Knowledge Graph"].map((tab) => (
                  <button
                    key={tab}
                    className="px-4 py-2 rounded-full text-sm border transition-all"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "var(--bg-elevated)", border: "1px dashed var(--border)" }}
              >
                <p
                  className="text-center italic"
                  style={{ color: "var(--text-faint)", fontFamily: "var(--font-source-serif)" }}
                >
                  Connect your PostgreSQL database and run{" "}
                  <code
                    className="px-1.5 py-0.5 rounded text-xs not-italic"
                    style={{ backgroundColor: "var(--bg-surface)", fontFamily: "var(--font-fira-code)" }}
                  >
                    prisma db push
                  </code>{" "}
                  to see book data here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

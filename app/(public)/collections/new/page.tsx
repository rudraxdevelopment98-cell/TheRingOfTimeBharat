import Link from "next/link";
import { Plus, Globe, Lock, BookPlus, X, Tag, ArrowLeft } from "lucide-react";

const ADDED_BOOKS_PREVIEW = [
  { title: "Meditations", author: "Marcus Aurelius", emoji: "📖" },
  { title: "The Republic", author: "Plato", emoji: "📜" },
];

const inputStyle = {
  backgroundColor: "var(--bg-elevated)",
  border: "1px solid var(--border)",
  color: "var(--text-primary)",
  fontFamily: "var(--font-dm-sans)",
  borderRadius: "0.75rem",
  padding: "0.625rem 1rem",
  width: "100%",
  outline: "none",
  fontSize: "0.875rem",
};

const labelStyle = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 500,
  marginBottom: "0.375rem",
  color: "var(--text-muted)",
  fontFamily: "var(--font-dm-sans)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

export default function NewCollectionPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      <div
        className="border-b py-10"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-sm mb-4"
            style={{ color: "var(--text-faint)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Collections
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Plus className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
            <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--accent-gold)" }}>
              New Collection
            </p>
          </div>
          <h1
            className="text-4xl font-light"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Create a Collection
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <form action="/api/collections" method="post" className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic info */}
            <div
              className="rounded-2xl border p-6"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <h2
                className="text-lg font-light mb-5"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
              >
                Basic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label style={labelStyle}>Collection Name</label>
                  <input name="name" type="text" placeholder="e.g. Philosophy of the Stoics" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Slug (auto-generated)</label>
                  <input
                    name="slug"
                    type="text"
                    placeholder="philosophy-of-the-stoics"
                    readOnly
                    style={{ ...inputStyle, fontFamily: "var(--font-fira-code)", fontSize: "0.8rem", color: "var(--text-faint)" }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    placeholder="What is this collection about? Who is it for?"
                    style={{ ...inputStyle, resize: "vertical" as const }}
                  />
                </div>
              </div>
            </div>

            {/* Visibility & Type */}
            <div
              className="rounded-2xl border p-6"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <h2
                className="text-lg font-light mb-5"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
              >
                Visibility &amp; Type
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "public", icon: Globe, label: "Public", desc: "Anyone can see this collection" },
                  { value: "private", icon: Lock, label: "Private", desc: "Only you can see this" },
                ].map(({ value, icon: Icon, label, desc }) => (
                  <label
                    key={value}
                    className="flex items-start gap-3 rounded-xl border p-4 cursor-pointer"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-elevated)" }}
                  >
                    <input type="radio" name="visibility" value={value} className="mt-0.5" />
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Icon className="h-3.5 w-3.5" style={{ color: "var(--accent-primary)" }} />
                        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{label}</span>
                      </div>
                      <p className="text-xs" style={{ color: "var(--text-faint)" }}>{desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div
              className="rounded-2xl border p-6"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <h2
                className="text-lg font-light mb-5"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
              >
                Tags &amp; Theme
              </h2>
              <div className="space-y-4">
                <div>
                  <label style={labelStyle}>
                    <Tag className="inline h-3 w-3 mr-1" />
                    Tags (comma-separated)
                  </label>
                  <input name="tags" type="text" placeholder="stoicism, ancient-philosophy, marcus-aurelius" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Theme / Era</label>
                  <select name="theme" style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Select a theme</option>
                    <option>Ancient Philosophy</option>
                    <option>Medieval Literature</option>
                    <option>20th Century Fiction</option>
                    <option>Science &amp; Technology</option>
                    <option>Political Thought</option>
                    <option>World Religions</option>
                    <option>Feminist Writing</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Add Books */}
            <div
              className="rounded-2xl border p-6"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <h2
                className="text-lg font-light mb-5"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
              >
                Add Books
              </h2>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search books to add..."
                  style={{ ...inputStyle, paddingLeft: "2.5rem" }}
                />
                <BookPlus
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: "var(--text-faint)" }}
                />
              </div>
              {ADDED_BOOKS_PREVIEW.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--text-faint)" }}>
                    Added ({ADDED_BOOKS_PREVIEW.length})
                  </p>
                  {ADDED_BOOKS_PREVIEW.map((book) => (
                    <div
                      key={book.title}
                      className="flex items-center justify-between rounded-lg border px-3 py-2"
                      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-elevated)" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{book.emoji}</span>
                        <div>
                          <p className="text-sm font-medium" style={{ color: "var(--text-primary)", fontFamily: "var(--font-cormorant)" }}>
                            {book.title}
                          </p>
                          <p className="text-xs" style={{ color: "var(--text-faint)" }}>{book.author}</p>
                        </div>
                      </div>
                      <button type="button" style={{ color: "var(--text-faint)" }}>
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 rounded-xl py-3 px-6 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--accent-primary)" }}
              >
                Create Collection
              </button>
              <Link
                href="/collections"
                className="rounded-xl py-3 px-6 text-sm font-medium border transition-opacity hover:opacity-80 text-center"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                Cancel
              </Link>
            </div>
          </div>

          {/* Right: preview */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-20 rounded-2xl border p-6"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <p className="text-xs uppercase tracking-wider mb-4" style={{ color: "var(--text-faint)" }}>
                Preview
              </p>
              <div
                className="rounded-xl border p-5"
                style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border)" }}
              >
                <div className="text-3xl mb-3">📚</div>
                <h3
                  className="text-xl font-light mb-1"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                >
                  Your Collection Name
                </h3>
                <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                  Your description will appear here.
                </p>
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3" style={{ color: "var(--text-faint)" }} />
                  <span className="text-xs" style={{ color: "var(--text-faint)" }}>Public · 0 books</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

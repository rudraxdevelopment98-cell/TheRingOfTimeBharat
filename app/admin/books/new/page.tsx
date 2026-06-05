import { BookPlus, Save, Sparkles, Eye } from "lucide-react";

const inputClass =
  "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors";

const inputStyle = {
  backgroundColor: "var(--bg-elevated)",
  borderColor: "var(--border)",
  color: "var(--text-primary)",
  fontFamily: "var(--font-dm-sans)",
};

const labelStyle = {
  color: "var(--text-muted)",
  fontFamily: "var(--font-dm-sans)",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  display: "block",
  marginBottom: "0.375rem",
};

const sectionHeadStyle = {
  fontFamily: "var(--font-cormorant)",
  color: "var(--text-primary)",
  fontSize: "1.25rem",
  fontWeight: 700,
  marginBottom: "1rem",
  marginTop: "0.5rem",
};

export default function NewBookPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="border-b py-12"
        style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <BookPlus className="h-5 w-5" style={{ color: "var(--accent-gold)" }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--accent-gold)", fontFamily: "var(--font-dm-sans)" }}
            >
              Admin · Books
            </span>
          </div>
          <h1
            className="text-4xl font-bold"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Add New Book
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <form action="/api/books" method="post">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Info */}
              <div
                className="rounded-xl border p-6"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <h2 style={sectionHeadStyle}>Basic Information</h2>
                <div className="space-y-4">
                  <div>
                    <label style={labelStyle}>Title</label>
                    <input name="title" type="text" placeholder="e.g. Crime and Punishment" className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Original Title</label>
                    <input name="originalTitle" type="text" placeholder="e.g. Преступление и наказание" className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Slug</label>
                    <input name="slug" type="text" placeholder="e.g. crime-and-punishment" className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Author</label>
                    <input name="author" type="text" placeholder="Search for an author…" className={inputClass} style={inputStyle} />
                  </div>
                </div>
              </div>

              {/* Publication Details */}
              <div
                className="rounded-xl border p-6"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <h2 style={sectionHeadStyle}>Publication Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Year Published</label>
                    <input name="year" type="number" placeholder="e.g. 1866" className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Era</label>
                    <select name="era" className={inputClass} style={inputStyle}>
                      <option value="">Select era…</option>
                      <option>Ancient</option>
                      <option>Medieval</option>
                      <option>Renaissance</option>
                      <option>Early Modern</option>
                      <option>Enlightenment</option>
                      <option>Romantic</option>
                      <option>Victorian</option>
                      <option>19th Century</option>
                      <option>Modern</option>
                      <option>20th Century</option>
                      <option>Contemporary</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label style={labelStyle}>Original Language</label>
                    <input name="language" type="text" placeholder="e.g. Russian" className={inputClass} style={inputStyle} />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div
                className="rounded-xl border p-6"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <h2 style={sectionHeadStyle}>Description</h2>
                <textarea
                  name="description"
                  rows={6}
                  placeholder="Write a compelling description of the book…"
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                />
              </div>

              {/* Media & External Links */}
              <div
                className="rounded-xl border p-6"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <h2 style={sectionHeadStyle}>Media &amp; External Links</h2>
                <div className="space-y-4">
                  <div>
                    <label style={labelStyle}>Cover Image URL</label>
                    <input name="coverUrl" type="url" placeholder="https://…" className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Open Library ID</label>
                    <input name="openLibraryId" type="text" placeholder="e.g. OL7353617M" className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Wikipedia URL</label>
                    <input name="wikipediaUrl" type="url" placeholder="https://en.wikipedia.org/wiki/…" className={inputClass} style={inputStyle} />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: "var(--accent-primary)",
                    color: "#ffffff",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  <Save className="h-4 w-4" />
                  Save Book
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--accent-secondary)",
                    color: "var(--accent-secondary)",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  <Sparkles className="h-4 w-4" />
                  Generate AI Summary
                </button>
              </div>
            </div>

            {/* Right: Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                  <span
                    className="text-sm font-semibold uppercase tracking-wider"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
                  >
                    Preview
                  </span>
                </div>
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
                >
                  {/* Cover placeholder */}
                  <div
                    className="h-56 flex items-center justify-center"
                    style={{ backgroundColor: "var(--bg-elevated)" }}
                  >
                    <BookPlus className="h-16 w-16" style={{ color: "var(--text-faint)" }} />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                    >
                      Book Title
                    </h3>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Author Name
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full border"
                        style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}
                      >
                        Era
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full border"
                        style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}
                      >
                        Language
                      </span>
                    </div>
                    <p
                      className="text-sm pt-2 line-clamp-4"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
                    >
                      The book description will appear here once you start typing above…
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

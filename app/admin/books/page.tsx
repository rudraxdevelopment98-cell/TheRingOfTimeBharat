import Link from "next/link";
import { BookOpen, Edit, Trash2, Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";

const books = [
  { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", era: "19th Century", lang: "Russian", rating: "4.9", views: "142k", cover: "📖" },
  { title: "Middlemarch", author: "George Eliot", era: "Victorian", lang: "English", rating: "4.8", views: "98k", cover: "📚" },
  { title: "The Tale of Genji", author: "Murasaki Shikibu", era: "Heian Period", lang: "Japanese", rating: "4.7", views: "73k", cover: "📜" },
  { title: "Don Quixote", author: "Miguel de Cervantes", era: "Renaissance", lang: "Spanish", rating: "4.8", views: "115k", cover: "📗" },
  { title: "Beloved", author: "Toni Morrison", era: "20th Century", lang: "English", rating: "4.9", views: "88k", cover: "📘" },
  { title: "In Search of Lost Time", author: "Marcel Proust", era: "Modern", lang: "French", rating: "4.7", views: "62k", cover: "📙" },
  { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", era: "20th Century", lang: "Spanish", rating: "4.8", views: "134k", cover: "📕" },
  { title: "Anna Karenina", author: "Leo Tolstoy", era: "19th Century", lang: "Russian", rating: "4.8", views: "109k", cover: "📖" },
  { title: "The Divine Comedy", author: "Dante Alighieri", era: "Medieval", lang: "Italian", rating: "4.6", views: "57k", cover: "📜" },
  { title: "Hamlet", author: "William Shakespeare", era: "Elizabethan", lang: "English", rating: "4.7", views: "201k", cover: "📗" },
];

export default function AdminBooksPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="border-b py-12"
        style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-5 w-5" style={{ color: "var(--accent-gold)" }} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--accent-gold)", fontFamily: "var(--font-dm-sans)" }}
              >
                Admin
              </span>
            </div>
            <h1
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
            >
              Books
            </h1>
          </div>
          <Link
            href="/admin/books/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "#ffffff",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            <Plus className="h-4 w-4" />
            Add Book
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Search */}
        <div className="relative max-w-lg">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: "var(--text-faint)" }}
          />
          <input
            type="text"
            placeholder="Search books by title, author, ISBN…"
            className="w-full rounded-xl border pl-10 pr-4 py-2.5 text-sm outline-none"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-dm-sans)",
            }}
          />
        </div>

        {/* Table */}
        <div
          className="rounded-xl border overflow-hidden"
          style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
        >
          {/* Table Header */}
          <div
            className="grid grid-cols-[48px_1fr_160px_120px_100px_80px_80px_120px] gap-4 px-6 py-3 border-b text-xs font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--border)",
              color: "var(--text-muted)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            <span>Cover</span>
            <span>Title</span>
            <span>Author</span>
            <span>Era</span>
            <span>Language</span>
            <span>Rating</span>
            <span>Views</span>
            <span>Actions</span>
          </div>

          {/* Rows */}
          {books.map((book, i) => (
            <div
              key={i}
              className="grid grid-cols-[48px_1fr_160px_120px_100px_80px_80px_120px] gap-4 px-6 py-4 border-b last:border-b-0 items-center"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="text-2xl">{book.cover}</div>
              <div
                className="font-medium text-sm"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-source-serif)" }}
              >
                {book.title}
              </div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                {book.author}
              </div>
              <div className="text-xs" style={{ color: "var(--text-faint)" }}>
                {book.era}
              </div>
              <div className="text-xs" style={{ color: "var(--text-faint)" }}>
                {book.lang}
              </div>
              <div
                className="text-sm font-semibold"
                style={{ color: "var(--accent-gold)" }}
              >
                {book.rating}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                {book.views}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-1.5 rounded-lg transition-opacity hover:opacity-70"
                  style={{ backgroundColor: "var(--bg-elevated)", color: "var(--accent-primary)" }}
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  className="p-1.5 rounded-lg transition-opacity hover:opacity-70"
                  style={{ backgroundColor: "var(--bg-elevated)", color: "#e05252" }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}>
            Showing 1–10 of 25,421
          </p>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm transition-opacity hover:opacity-70"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
                backgroundColor: "var(--bg-surface)",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm transition-opacity hover:opacity-70"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
                backgroundColor: "var(--bg-surface)",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

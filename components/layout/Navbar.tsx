"use client";
import Link from "next/link";
import { Search, Sun, Moon, BookOpen, Menu, X, Library } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useState } from "react";

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg-base) 85%, transparent)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="flex h-8 w-8 items-center justify-center rounded"
              style={{ backgroundColor: "var(--accent-primary)" }}
            >
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span
              className="text-xl font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
            >
              Bibliosphere
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: "/explore", label: "Explore" },
              { href: "/collections", label: "Collections" },
              { href: "/languages", label: "Languages" },
              { href: "/graph", label: "Knowledge Graph" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-80"
              style={{ color: "var(--text-muted)" }}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Link>

            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-80"
              style={{ color: "var(--text-muted)" }}
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <Link
              href="/reading/dashboard"
              className="hidden md:flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "var(--accent-primary)", fontFamily: "var(--font-dm-sans)" }}
            >
              <Library className="h-3.5 w-3.5" />
              My Library
            </Link>

            <button
              className="md:hidden flex h-9 w-9 items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: "var(--text-muted)" }}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-4 pb-4 pt-2 space-y-2"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-base)" }}
        >
          {["/explore", "/collections", "/languages", "/graph"].map((href) => (
            <Link
              key={href}
              href={href}
              className="block py-2 text-sm capitalize"
              style={{ color: "var(--text-muted)" }}
              onClick={() => setMenuOpen(false)}
            >
              {href.replace("/", "")}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

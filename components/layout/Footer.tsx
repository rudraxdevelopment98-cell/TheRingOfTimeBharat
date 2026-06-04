import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="mt-auto border-t"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="flex h-7 w-7 items-center justify-center rounded"
                style={{ backgroundColor: "var(--accent-primary)" }}
              >
                <BookOpen className="h-3.5 w-3.5 text-white" />
              </div>
              <span
                className="text-lg font-semibold"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
              >
                Bibliosphere
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-faint)" }}>
              All the world's knowledge, between two covers.
            </p>
          </div>

          {[
            {
              title: "Discover",
              links: [
                { href: "/explore", label: "Explore Books" },
                { href: "/collections", label: "Collections" },
                { href: "/languages", label: "Languages" },
                { href: "/graph", label: "Knowledge Graph" },
              ],
            },
            {
              title: "Community",
              links: [
                { href: "/quotes", label: "Quotes" },
                { href: "/reading/dashboard", label: "My Library" },
                { href: "/lists", label: "Reading Lists" },
              ],
            },
            {
              title: "About",
              links: [
                { href: "/about", label: "About" },
                { href: "/api-docs", label: "API" },
                { href: "/privacy", label: "Privacy" },
              ],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <h3
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
              >
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm transition-colors hover:opacity-80"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-8 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>
            © {new Date().getFullYear()} Bibliosphere. A digital Library of Alexandria.
          </p>
          <p className="text-xs italic" style={{ color: "var(--text-faint)", fontFamily: "var(--font-cormorant)" }}>
            "A reader lives a thousand lives before he dies."
          </p>
        </div>
      </div>
    </footer>
  );
}

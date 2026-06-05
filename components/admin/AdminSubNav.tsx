"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

interface AdminSubNavProps {
  links: NavLink[];
}

export function AdminSubNav({ links }: AdminSubNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className="border-b"
      style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 py-2 overflow-x-auto scrollbar-hide">
          {links.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                style={
                  isActive
                    ? {
                        backgroundColor: "var(--accent-primary)",
                        color: "#ffffff",
                      }
                    : {
                        backgroundColor: "var(--bg-surface)",
                        color: "var(--text-muted)",
                      }
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

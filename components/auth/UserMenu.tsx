"use client";

/**
 * Avatar dropdown for the signed-in user.
 *
 * The Navbar is owned by another agent right now — once it lands, drop
 * `<UserMenu />` into the Navbar's actions cluster (and make sure an
 * <AuthProvider> is present above it, ideally hoisted to app/layout.tsx).
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User as UserIcon, BookMarked, Receipt, ChevronDown } from "lucide-react";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  if (status === "loading") {
    return (
      <div
        className="h-9 w-9 animate-pulse rounded-full"
        style={{ backgroundColor: "var(--bg-elevated)" }}
        aria-hidden
      />
    );
  }

  if (!session?.user) {
    return (
      <Link
        href="/auth/signin"
        className="rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
        style={{
          backgroundColor: "var(--accent-primary)",
          color: "var(--on-accent-primary, #ffffff)",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        Sign in
      </Link>
    );
  }

  const user = session.user;
  const initial = (user.name ?? user.email ?? "?").trim().charAt(0).toUpperCase();
  const username = (user as { username?: string }).username ?? user.email?.split("@")[0] ?? "me";

  const links = [
    { href: `/u/${username}`, label: "My profile", icon: UserIcon },
    { href: "/reading/dashboard", label: "Reading dashboard", icon: BookMarked },
    { href: "/purchases", label: "My purchases", icon: Receipt },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border p-0.5 pr-1.5 transition-all hover:shadow-sm"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "var(--on-accent-primary, #ffffff)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {initial}
          </span>
        )}
        <ChevronDown className="h-3.5 w-3.5" style={{ color: "var(--text-faint)" }} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border shadow-lg"
          style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
        >
          <div className="border-b px-4 py-3.5" style={{ borderColor: "var(--border)" }}>
            <p
              className="truncate text-sm font-medium"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)" }}
            >
              {user.name ?? "Reader"}
            </p>
            <p className="truncate text-xs" style={{ color: "var(--text-faint)" }}>
              {user.email}
            </p>
          </div>

          <div className="py-1.5">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
              >
                <Icon className="h-4 w-4" style={{ color: "var(--text-faint)" }} />
                {label}
              </Link>
            ))}
          </div>

          <div className="border-t py-1.5" style={{ borderColor: "var(--border)" }}>
            <button
              type="button"
              role="menuitem"
              onClick={() => void signOut({ callbackUrl: "/" })}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
            >
              <LogOut className="h-4 w-4" style={{ color: "var(--text-faint)" }} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

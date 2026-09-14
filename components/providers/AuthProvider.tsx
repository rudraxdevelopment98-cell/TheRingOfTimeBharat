"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

/**
 * Wraps children in next-auth's SessionProvider so `useSession()` works.
 *
 * NOTE: this should eventually be hoisted into `app/layout.tsx` (wrapping the
 * whole tree, inside ThemeProvider) so every client component can read the
 * session. Until then it is mounted locally by the components that need it.
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

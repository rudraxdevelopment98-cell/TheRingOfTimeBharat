/**
 * Bibliosphere — NextAuth v5 (beta) configuration.
 *
 * Required environment variables:
 *   NEXTAUTH_URL            e.g. http://localhost:3000 (or AUTH_URL in v5)
 *   NEXTAUTH_SECRET         random 32+ byte string — `openssl rand -base64 32`
 *   GOOGLE_CLIENT_ID        Google OAuth 2.0 client id      (optional — provider skipped if absent)
 *   GOOGLE_CLIENT_SECRET    Google OAuth 2.0 client secret  (optional)
 *   GITHUB_ID               GitHub OAuth app client id      (optional — provider skipped if absent)
 *   GITHUB_SECRET           GitHub OAuth app client secret  (optional)
 *
 * Session strategy is JWT so that no Prisma adapter (and therefore no generated
 * client) is needed for auth to function. User rows are still upserted into
 * Postgres on first sign-in, but every DB touch is wrapped in try/catch so a
 * missing / unreachable database degrades gracefully instead of breaking login.
 */

import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

function buildProviders(): NextAuthConfig["providers"] {
  const providers: NextAuthConfig["providers"] = [];

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        allowDangerousEmailAccountLinking: true,
      })
    );
  }

  if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
    providers.push(
      GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        allowDangerousEmailAccountLinking: true,
      })
    );
  }

  return providers;
}

export const authConfig: NextAuthConfig = {
  providers: buildProviders(),
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
  callbacks: {
    async jwt({ token, user }) {
      // Only runs the expensive lookup on first sign-in (when `user` is set).
      if (user?.email) {
        try {
          const { prisma } = await import("@/lib/prisma");
          const existing = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (existing) {
            token.sub = existing.id;
            token.role = (existing as { role?: string }).role ?? "USER";
          } else {
            const created = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name ?? null,
                image: user.image ?? null,
              },
            });
            token.sub = created.id;
            token.role = (created as { role?: string }).role ?? "USER";
          }
        } catch {
          // DB unavailable, or `role` not yet migrated — fall back to the
          // provider-issued subject and the default role.
          token.role = token.role ?? "USER";
        }
      }

      if (!token.role) token.role = "USER";
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        if (token.sub) session.user.id = token.sub;
        session.user.role = (token.role as string | undefined) ?? "USER";
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

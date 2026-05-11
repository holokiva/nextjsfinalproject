import type { NextAuthConfig } from "next-auth";

/**
 * Shared Auth.js options (session shape, custom pages).
 * Used by the full `auth.ts` and by a slim middleware instance so the
 * middleware bundle does not pull in Prisma / bcrypt.
 */
export default {
  trustHost: true,
  providers: [],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        if (user.email) token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        if (typeof token.email === "string") {
          session.user.email = token.email;
        }
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

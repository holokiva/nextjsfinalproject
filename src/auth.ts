import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import authConfig from "./auth.config";
import { prisma } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const rawEmail = credentials?.email;
        const rawPassword = credentials?.password;
        if (
          rawEmail === undefined ||
          rawPassword === undefined ||
          typeof rawEmail !== "string" ||
          typeof rawPassword !== "string"
        ) {
          return null;
        }

        const email = rawEmail.trim().toLowerCase();
        const password = rawPassword;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
});

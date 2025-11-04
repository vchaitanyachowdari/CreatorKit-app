import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

if (!process.env.NEXTAUTH_SECRET) {
  console.error("[v0] NEXTAUTH_SECRET is not set. Auth will not work properly.")
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // In production, validate against database
        // This is a demo - replace with actual user lookup
        const user = {
          id: credentials.email,
          email: credentials.email,
          name: credentials.email.split("@")[0],
        }

        return user
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret:
      process.env.NEXTAUTH_SECRET ||
      (process.env.NODE_ENV === "development" ? "dev-secret-key-change-in-production" : undefined),
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  logger: {
    error: (code, ...message) => {
      console.error("[v0] NextAuth Error:", code, ...message)
    },
    warn: (code, ...message) => {
      console.warn("[v0] NextAuth Warning:", code, ...message)
    },
    debug: (code, ...message) => {
      if (process.env.DEBUG) {
        console.log("[v0] NextAuth Debug:", code, ...message)
      }
    },
  },
}

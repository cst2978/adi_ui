import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";

const providers = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  );
}

if (process.env.EMAIL_SERVER && process.env.EMAIL_FROM) {
  providers.push(
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  );
}

if (process.env.TEST_USER_EMAIL && process.env.TEST_USER_PASSWORD) {
  providers.push(
    CredentialsProvider({
      name: "Test Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const emailMatch = credentials.email === process.env.TEST_USER_EMAIL;
        const passwordMatch =
          credentials.password === process.env.TEST_USER_PASSWORD;

        if (!emailMatch || !passwordMatch) {
          return null;
        }

        return {
          id: "test-doctor",
          name: "Test Clinician",
          email: credentials.email
        };
      }
    })
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  pages: {
    signIn: "/auth/signin"
  },
  session: {
    strategy: "jwt"
  }
};

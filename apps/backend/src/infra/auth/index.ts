import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { db } from "../sql/database";
import * as schema from "../sql/schemas";

export const auth = betterAuth({
  basePath: "/api/auth",
  trustedOrigins: [process.env.FRONTEND_URL],
  baseURL: process.env.BETTER_AUTH_URL,
  redirectURL: process.env.FRONTEND_URL,
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: {
      ...schema,
    },
  }),
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  experimental: {
    joins: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [openAPI()],
});

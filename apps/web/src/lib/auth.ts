import { createAuthClient } from "better-auth/react";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { env } from "env";

export const authClient = createAuthClient({
  baseURL: env.VITE_BACKEND_URL,
  plugins: [tanstackStartCookies()],
});

export type Session = typeof authClient.$Infer.Session;

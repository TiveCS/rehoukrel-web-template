import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { authClient } from "@/lib/auth";

export const authMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const session = await authClient.getSession({
      fetchOptions: {
        headers: request.headers,
      },
    });

    if (!session) {
      throw redirect({ to: "/login" });
    }

    return await next();
  },
);

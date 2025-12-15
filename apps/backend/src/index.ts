import { logger, pino } from "@bogeychan/elysia-logger";
import cors from "@elysiajs/cors";
import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import "reflect-metadata";
import { env } from "./common/env";
import { BetterAuthOpenAPI, betterAuth } from "./infra/auth/auth.setup";
import { todosRoute } from "./modules/todos/routes";

const app = new Elysia()
  .use(
    cors({
      origin: env.FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .use(
    logger({
      stream: pino.destination("./activity.log"),
    }),
  )
  .use(betterAuth)
  .use(
    openapi({
      documentation: {
        components: await BetterAuthOpenAPI.components,
        paths: await BetterAuthOpenAPI.getPaths(),
      },
    }),
  )
  .use(todosRoute)
  .listen(env.PORT);

console.log(`🦊 Elysia is running at ${app.server?.url}`);

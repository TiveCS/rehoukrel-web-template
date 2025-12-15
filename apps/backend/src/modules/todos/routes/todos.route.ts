import { authMacro } from "@/infra/auth/auth.setup";
import Elysia from "elysia";

export const todosRoute = new Elysia({
  prefix: "/todos",
  tags: ["Todos"],
})
  .use(authMacro)
  .get("/", async ({ user }) => {}, {
    auth: true,
  });

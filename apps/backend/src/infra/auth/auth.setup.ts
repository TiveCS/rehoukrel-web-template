import Elysia from "elysia";
import { auth } from ".";
import { HttpStatus } from "@/common/constants";
import { AuthErrors } from "@/common/errors";

export const betterAuth = new Elysia({ name: "better-auth" }).mount(
  auth.handler,
);

export const authMacro = new Elysia().macro({
  auth: {
    async resolve({ status, request: { headers } }) {
      const session = await auth.api.getSession({
        headers,
      });

      if (!session)
        return status(HttpStatus.Unauthorized, AuthErrors.Unauthorized);

      return {
        user: session.user,
        session: session.session,
      };
    },
  },
});

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema());

export const BetterAuthOpenAPI = {
  getPaths: (prefix = "/api/auth") =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null);

      for (const path of Object.keys(paths)) {
        const key = prefix + path;
        reference[key] = paths[path];

        for (const method of Object.keys(paths[path])) {
          const operation = (reference[key] as any)[method];

          operation.tags = ["Better Auth"];
        }
      }

      return reference;
    }) as Promise<any>,
  components: getSchema().then(({ components }) => components) as Promise<any>,
} as const;

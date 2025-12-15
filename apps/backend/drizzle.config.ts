import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  casing: "snake_case",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  schema: ["./src/infra/sql/schemas/**.ts"],
});

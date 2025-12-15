import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schemas";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl)
  throw new Error("DATABASE_URL is not defined in environment variables");

export const db = drizzle(process.env.DATABASE_URL, {
  schema,
});

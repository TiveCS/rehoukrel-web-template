import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./auth.schema";

export const todos = pgTable("todos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 300 }),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id),
});

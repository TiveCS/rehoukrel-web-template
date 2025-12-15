import { db } from "@/infra/sql/database";
import { Todo } from "../entities";
import { todos } from "@/infra/sql/schemas";
import { eq } from "drizzle-orm";

export const todoRepository = {
  async findByOwnerId(ownerId: string): Promise<Todo[]> {
    return await db.select().from(todos).where(eq(todos.ownerId, ownerId));
  },

  async deleteById(id: string): Promise<void> {
    await db.delete(todos).where(eq(todos.id, id));
  },

  async create(newTodo: Omit<Todo, "id">): Promise<Todo> {
    const [createdTodo] = await db.insert(todos).values(newTodo).returning({
      id: todos.id,
    });

    return {
      id: createdTodo.id,
      ...newTodo,
    };
  },

  async update(editedTodo: Todo): Promise<void> {
    await db
      .update(todos)
      .set({
        title: editedTodo.title,
        description: editedTodo.description,
      })
      .where(eq(todos.id, editedTodo.id));
  },
} as const;

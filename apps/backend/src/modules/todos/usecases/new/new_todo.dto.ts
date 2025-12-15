import z from "zod";

export const newTodoRequestSchema = z.object({
  ownerId: z.uuid(),
  title: z
    .string()
    .min(1, "Title must be at least 1 character long")
    .max(100, "Title must be at most 100 characters long"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters long")
    .optional(),
});

export type NewTodoRequest = z.infer<typeof newTodoRequestSchema>;

export type NewTodoResponse = {
  id: string;
  createdAt: string;
};

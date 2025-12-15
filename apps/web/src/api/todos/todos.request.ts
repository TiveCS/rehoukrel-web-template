import z from "zod";

export const newTodoRequestSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title is too long. Max 50 characters."),
  description: z
    .string()
    .max(100, "Description is too long. Max 100 characters.")
    .optional(),
});

export const editTodoRequestSchema = newTodoRequestSchema.extend({
  completed: z.boolean().optional(),
});

export const getListTodoRequestSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).max(100).optional(),
  status: z.enum(["all", "completed", "incomplete"]).optional(),
});

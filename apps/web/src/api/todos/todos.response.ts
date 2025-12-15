import z from "zod";

export const newTodoResponseSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
});

export const editTodoResponseSchema = z.object({
  updatedAt: z.iso.datetime(),
});

export const deleteTodoResponseSchema = z.object({
  deletedAt: z.iso.datetime(),
});

export const getListTodoResponseSchema = z.array(
  z.object({
    id: z.uuid(),
    title: z.string(),
    description: z.string().nullable(),
    completed: z.boolean(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().nullable(),
  }),
);

export const getDetailTodoResponseSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().nullable(),
  completed: z.boolean(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime().nullable(),
});

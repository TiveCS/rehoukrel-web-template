import { createFetch, createSchema } from "better-auth/react";
import { env } from "env";
import {
  editTodoRequestSchema,
  getListTodoRequestSchema,
  newTodoRequestSchema,
} from "./todos.request";
import {
  deleteTodoResponseSchema,
  editTodoResponseSchema,
  getDetailTodoResponseSchema,
  getListTodoResponseSchema,
  newTodoResponseSchema,
} from "./todos.response";

const todoApiRoutes = createSchema({
  "@get/": {
    query: getListTodoRequestSchema,
    output: getListTodoResponseSchema,
  },
  "@get/:id": {
    output: getDetailTodoResponseSchema,
  },
  "@delete/:id": {
    output: deleteTodoResponseSchema,
  },
  "@post/": {
    input: newTodoRequestSchema,
    output: newTodoResponseSchema,
  },
  "@put/:id": {
    input: editTodoRequestSchema,
    output: editTodoResponseSchema,
  },
});

export const apiTodos = createFetch({
  baseURL: `${env.VITE_BACKEND_URL}/api/v1/todos`,
  credentials: "include",
  schema: todoApiRoutes,
});

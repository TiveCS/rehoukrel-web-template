import { failure, ok, Result, validationError } from "@/common/models";
import { db } from "@/infra/sql/database";
import { todos } from "@/infra/sql/schemas";
import { and, eq } from "drizzle-orm";
import { Todo } from "../../entities";
import { TodoErrors } from "../../errors/todo.error";
import { todoRepository } from "../../repositories";
import {
  NewTodoRequest,
  newTodoRequestSchema,
  NewTodoResponse,
} from "./new_todo.dto";

export const newTodoUsecase = async (
  request: NewTodoRequest,
): Promise<Result<NewTodoResponse>> => {
  const validationResult = newTodoRequestSchema.safeParse(request);

  if (!validationResult.success) return validationError(validationResult.error);

  const existingTodos = await db
    .select()
    .from(todos)
    .where(
      and(eq(todos.title, request.title), eq(todos.ownerId, request.ownerId)),
    );

  if (existingTodos.length > 0) return failure(TodoErrors.DuplicateTitle);

  const todo = new Todo();
  todo.title = request.title;
  todo.description = request.description;
  todo.ownerId = request.ownerId;

  const result = await todoRepository.create(todo);

  return ok({
    id: result[0].id,
    createdAt: new Date().toISOString(),
  });
};

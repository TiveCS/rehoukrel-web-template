import { HttpStatus } from "@/common/constants";
import { CommonError } from "@/common/models";

export type TodoError = CommonError & {
  code: `todo.${string}`;
};

export const TodoErrors = {
  DuplicateTitle: {
    code: "todo.duplicate_title",
    description: "Cannot create todo with same title",
    statusCode: HttpStatus.Conflict,
  },
} satisfies Record<string, TodoError>;

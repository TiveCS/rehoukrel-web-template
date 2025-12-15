import z, { type ZodError } from "zod";
import { CommonErrors } from "./error";

export type Result<T extends string | number | object = never> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: {
        code: string;
        messages?: string[];
      };
    };

export function Ok<T extends string | number | object = never>(
  data: T,
): Result<T> {
  return {
    success: true,
    data,
  };
}

export function Failure(errorCode?: string, messages?: string[]): Result {
  return {
    success: false,
    error: {
      code: errorCode || "unknown_error",
      messages,
    },
  };
}

export function ValidationFailure(error: ZodError): Result {
  return {
    success: false,
    error: {
      code: CommonErrors.ValidationError,
      messages: z.treeifyError(error).errors,
    },
  };
}

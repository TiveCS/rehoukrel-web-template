import z, { type ZodError } from "zod";
import { CommonErrors } from "../errors";
import type { CommonError } from "./error.model";

export type SuccessResult<TData extends string | number | object = never> = {
  success: true;
  data: TData;
};

export const successResultSchema = z.object({
  success: z.literal(true),
  data: z.any().optional(),
});

export type FailureResult = {
  success: false;
  error: {
    code: CommonError["code"];
    description: CommonError["description"];
    statusCode: CommonError["statusCode"];
    details?: string[];
  };
};

export const failureResultSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    description: z.string(),
    statusCode: z.number(),
    details: z.array(z.string()).optional(),
  }),
});

export type Result<TData extends string | number | object = never> =
  | SuccessResult<TData>
  | FailureResult;

export const resultSchema = z.union([successResultSchema, failureResultSchema]);

export function ok<TData extends string | number | object = never>(
  data: TData,
): SuccessResult<TData> {
  return {
    success: true,
    data,
  };
}

export function failure(error: CommonError, details?: string[]): FailureResult {
  return {
    success: false,
    error: {
      ...error,
      details,
    },
  };
}

export function toResponse(result: Result) {
  if (isFailureResult(result))
    return {
      code: result.error.code,
      description: result.error.description,
      details: result.error.details,
    };

  return isSuccessResultWithData(result) ? result.data : undefined;
}

export function validationError(zodError: ZodError): FailureResult {
  return {
    success: false,
    error: {
      code: CommonErrors.ValidationError.code,
      description: CommonErrors.ValidationError.description,
      statusCode: CommonErrors.ValidationError.statusCode,
      details: z.treeifyError(zodError).errors,
    },
  };
}

export function isSuccessResult(input: unknown): input is SuccessResult {
  return (
    typeof input === "object" &&
    input !== null &&
    "success" in input &&
    (input as any).success === true
  );
}

export function isSuccessResultWithData<TData extends string | number | object>(
  input: unknown,
): input is SuccessResult<TData> {
  return (
    isSuccessResult(input) &&
    "data" in input &&
    (typeof (input as any).data === "string" ||
      typeof (input as any).data === "number" ||
      typeof (input as any).data === "object")
  );
}

export function isFailureResult(input: unknown): input is FailureResult {
  return (
    typeof input === "object" &&
    input !== null &&
    "success" in input &&
    (input as any).success === false &&
    "error" in input &&
    typeof (input as any).error === "object" &&
    (input as any).error !== null &&
    "code" in (input as any).error &&
    "description" in (input as any).error &&
    "statusCode" in (input as any).error &&
    typeof (input as any).error.code === "string" &&
    typeof (input as any).error.description === "string" &&
    typeof (input as any).error.statusCode === "number"
  );
}

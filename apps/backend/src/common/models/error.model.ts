import type { HttpStatus } from "../constants";

export type CommonError = {
  code: `${string}.${string}`;
  statusCode: HttpStatus;
  description: string;
};

export function toErrorResponse(error: CommonError, details?: string[]) {
  return {
    code: error.code,
    description: error.description,
    details,
  };
}

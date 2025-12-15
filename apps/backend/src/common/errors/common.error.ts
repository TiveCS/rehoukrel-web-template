import { HttpStatus } from "../constants";
import type { CommonError } from "../models";

export const CommonErrors = {
  ValidationError: {
    code: "common.validation_error",
    statusCode: HttpStatus.BadRequest,
    description: "One of the fields did not pass validation.",
  },
  UnhandledError: {
    code: "common.unhandled_error",
    statusCode: HttpStatus.InternalServerError,
    description: "An unhandled error occurred.",
  },
} satisfies Record<string, CommonError>;

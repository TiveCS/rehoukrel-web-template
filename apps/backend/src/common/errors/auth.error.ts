import { HttpStatus } from "../constants";
import type { CommonError } from "../models";

export type AuthError = CommonError & {
  code: `auth.${string}`;
};

export const AuthErrors = {
  Unauthorized: {
    code: "auth.validation_error",
    statusCode: HttpStatus.Unauthorized,
    description: "You are not authorized to access this resource.",
  },
  Forbidden: {
    code: "auth.forbidden",
    statusCode: HttpStatus.Forbidden,
    description: "You do not have permission to access this resource.",
  },
  InvalidCredentials: {
    code: "auth.invalid_credentials",
    statusCode: HttpStatus.Unauthorized,
    description: "The provided credentials are invalid.",
  },
  DuplicateCredentials: {
    code: "auth.duplicate_credentials",
    statusCode: HttpStatus.Conflict,
    description: "The provided credentials are already in use.",
  },
  InvalidToken: {
    code: "auth.invalid_token",
    statusCode: HttpStatus.Unauthorized,
    description: "The provided token is invalid or has expired.",
  },
} satisfies Record<string, AuthError>;

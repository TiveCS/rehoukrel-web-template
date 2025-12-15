export const CommonErrors = {
  ValidationError: "common.validation_error",
} as const;

export type CommonError = (typeof CommonErrors)[keyof typeof CommonErrors];

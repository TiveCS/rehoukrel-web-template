export const HttpStatus = {
  // 2xx Success
  Ok: 200,
  Created: 201,
  NoContent: 204,

  // 4xx Client Errors
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  UnprocessableEntity: 422,

  // 5xx Server Errors
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
} as const;

export type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus];

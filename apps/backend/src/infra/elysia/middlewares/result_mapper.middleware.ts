import {
  isFailureResult,
  isSuccessResult,
  isSuccessResultWithData,
} from "@/common/models";
import Elysia, { status } from "elysia";

export const resultMapper = new Elysia().onAfterHandle(({ responseValue }) => {
  if (isSuccessResult(responseValue)) {
    responseValue = undefined;
    if (isSuccessResultWithData(responseValue)) {
      responseValue = responseValue.data;
    }
  }

  if (isFailureResult(responseValue)) {
    throw status(responseValue.error.statusCode, {
      code: responseValue.error.code,
      description: responseValue.error.description,
      details: responseValue.error.details,
    });
  }
});

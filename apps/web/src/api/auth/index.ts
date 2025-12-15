import { Failure, Ok } from "@/core/result";
import { authClient } from "@/lib/auth";

export const authLogout = async () => {
  const result = await authClient.signOut();

  if (result.error)
    return Failure(
      result.error.code,
      result.error.message ? [result.error.message] : undefined,
    );

  return Ok(result.data);
};

export const authLoginEmail = async (request: {
  email: string;
  password: string;
}) => {
  const result = await authClient.signIn.email({
    ...request,
  });

  if (result.error)
    return Failure(
      result.error.code,
      result.error.message ? [result.error.message] : undefined,
    );

  return Ok(result.data);
};

export const authSignUpEmail = async (request: {
  email: string;
  name: string;
  password: string;
}) => {
  const result = await authClient.signUp.email({
    ...request,
  });

  if (result.error)
    return Failure(
      result.error.code,
      result.error.message ? [result.error.message] : undefined,
    );

  return Ok(result.data);
};

export const authLoginGoogle = async () => {
  return await authClient.signIn.social({
    provider: "google",
  });
};

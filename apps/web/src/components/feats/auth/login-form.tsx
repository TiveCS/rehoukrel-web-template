import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { MailIcon } from "lucide-react";
import { z } from "zod";
import { AppInput } from "@/components/blocks/app-input";
import { PasswordInput } from "@/components/blocks/password-input";
import { GithubLogo } from "@/components/logo/github-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { authClient } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { GoogleLogo } from "../../logo/google-logo";
import React, { ButtonHTMLAttributes, MouseEventHandler } from "react";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    validators: {
      onSubmit: loginSchema,
    },
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value: { email, password } }) => {
      await authClient.signIn.email({
        email,
        password,
      });
    },
  });

  const onGoogleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/`,
    });
  };

  const onGitHubLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await authClient.signIn.social({
      provider: "github",
      callbackURL: `${window.location.origin}/`,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Acme Inc account
                </p>
              </div>

              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <AppInput
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="johnwok@example.com"
                        autoComplete="off"
                        leftIcon={<MailIcon className="size-4" />}
                        leftIconVariant="bordered"
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="flex items-center">
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Link
                          to="/forgot-password"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>

                      <PasswordInput
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        autoComplete="off"
                        showLeftIcon
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <Field>
                <Button type="submit">Login</Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <Field className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="cursor-pointer"
                  aria-label="Login with GitHub"
                  onClick={onGitHubLogin}
                >
                  <GithubLogo />
                  <span className="sr-only">Login with GitHub</span>
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  className="cursor-pointer"
                  aria-label="Login with Google"
                  onClick={onGoogleLogin}
                >
                  <GoogleLogo />
                  <span className="sr-only">Login with Google</span>
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Placeholder"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link to="/tos">Terms of Service</Link> and{" "}
        <Link to="/privacy-policy">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
}

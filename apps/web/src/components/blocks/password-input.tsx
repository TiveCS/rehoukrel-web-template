import { Eye, EyeOffIcon, Lock, type Icon } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AppInput, type AppInputProps } from "./app-input";

export type PasswordInputProps = Omit<
  AppInputProps,
  "type" | "leftIcon" | "rightIcon"
> & {
  iconButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  iconProps?: React.ComponentProps<typeof Icon>;
  showLeftIcon?: boolean;
};

export function PasswordInput({
  iconButtonProps,
  iconProps,
  showLeftIcon = false,
  ...appInputProps
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const { className: iconButtonClassName, ...iconButtonPropsNoClassName } =
    iconButtonProps || {};
  const { className: iconClassName, ...iconPropsNoClassName } = iconProps || {};

  const EyeIcon = showPassword ? EyeOffIcon : Eye;

  return (
    <AppInput
      type={showPassword ? "text" : "password"}
      placeholder="••••••••"
      leftIcon={showLeftIcon ? <Lock className="size-4" /> : undefined}
      leftIconVariant="bordered"
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={cn("cursor-pointer", iconButtonClassName)}
          {...iconButtonPropsNoClassName}
        >
          <EyeIcon
            className={cn("size-3.5", iconClassName)}
            {...iconPropsNoClassName}
          />
        </button>
      }
      rightIconContainerProps={{
        className: "pointer-events-auto", // Allow clicks on the button
      }}
      {...appInputProps}
    />
  );
}

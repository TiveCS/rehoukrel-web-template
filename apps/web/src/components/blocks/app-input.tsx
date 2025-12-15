import type React from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Spinner } from "./spinner";

export type AppInputProps = Omit<React.ComponentProps<typeof Input>, "type"> & {
  type?: React.ComponentProps<typeof Input>["type"];
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftIconVariant?: "default" | "bordered";
  rightIconVariant?: "default" | "bordered";
  leftIconContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  rightIconContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  loading?: boolean;
  loadingPosition?: "left" | "right";
  loadingIcon?: React.ReactNode;
};

export function AppInput({
  leftIcon,
  rightIcon,
  leftIconVariant = "default",
  rightIconVariant = "default",
  leftIconContainerProps,
  rightIconContainerProps,
  containerProps,
  loading = false,
  loadingPosition = "right",
  loadingIcon,
  className,
  disabled,
  ...inputProps
}: AppInputProps) {
  const { className: containerClassName, ...containerPropsRest } =
    containerProps || {};
  const { className: leftIconClassName, ...leftIconPropsRest } =
    leftIconContainerProps || {};
  const { className: rightIconClassName, ...rightIconPropsRest } =
    rightIconContainerProps || {};

  // Detect error state from aria-invalid
  const isInvalid = inputProps["aria-invalid"] === true;

  // Determine which icons to show based on loading state
  const showLeftIcon = leftIcon && !(loading && loadingPosition === "left");
  const showRightIcon = rightIcon && !(loading && loadingPosition === "right");
  const showLeftLoading = loading && loadingPosition === "left";
  const showRightLoading = loading && loadingPosition === "right";

  // Default loading icon
  const defaultLoadingIcon = <Spinner size="small" />;
  const spinnerIcon = loadingIcon || defaultLoadingIcon;

  // Determine padding based on icon presence and variant
  const getLeftPadding = () => {
    if (!showLeftIcon && !showLeftLoading) return "";
    return leftIconVariant === "bordered" ? "pl-13" : "pl-11";
  };

  const getRightPadding = () => {
    if (!showRightIcon && !showRightLoading) return "";
    return rightIconVariant === "bordered" ? "pr-13" : "pr-11";
  };

  const leftPadding = getLeftPadding();
  const rightPadding = getRightPadding();

  return (
    <div className={cn("relative", containerClassName)} {...containerPropsRest}>
      {/* Left Icon or Loading */}
      {(showLeftIcon || showLeftLoading) && (
        <div
          className={cn(
            "absolute left-0 top-0 h-full flex items-center justify-center",
            leftIconVariant === "bordered"
              ? [
                  "bg-gray-100 px-3 rounded-l-md pointer-events-auto",
                  isInvalid
                    ? "border border-red-400 border-r-destructive"
                    : "border-r border-input",
                ]
              : [
                  "left-3 pointer-events-none",
                  "top-1/2 -translate-y-1/2 h-auto",
                ],
            leftIconClassName,
          )}
          {...leftIconPropsRest}
        >
          {showLeftLoading ? spinnerIcon : leftIcon}
        </div>
      )}

      {/* Input Field */}
      <Input
        className={cn(leftPadding, rightPadding, className)}
        disabled={disabled || loading}
        {...inputProps}
      />

      {/* Right Icon or Loading */}
      {(showRightIcon || showRightLoading) && (
        <div
          className={cn(
            "absolute right-0 top-0 h-full flex items-center justify-center",
            rightIconVariant === "bordered"
              ? [
                  "bg-gray-100 px-3 rounded-r-md pointer-events-auto",
                  isInvalid
                    ? "border border-red-400 border-l-destructive"
                    : "border-l border-input",
                ]
              : [
                  "right-3 pointer-events-none",
                  "top-1/2 -translate-y-1/2 h-auto",
                ],
            rightIconClassName,
          )}
          {...rightIconPropsRest}
        >
          {showRightLoading ? spinnerIcon : rightIcon}
        </div>
      )}
    </div>
  );
}

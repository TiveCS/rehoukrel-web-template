import type React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type SpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "small" | "medium" | "large";
  iconClassName?: string;
};

const sizeClasses = {
  small: "size-4",
  medium: "size-6",
  large: "size-10",
} as const;

export function Spinner({
  size = "medium",
  className,
  iconClassName,
  ...props
}: SpinnerProps) {
  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      role="img"
      aria-label="Loading"
      {...props}
    >
      <Loader2
        className={cn(
          "animate-spin text-muted-foreground",
          sizeClasses[size],
          iconClassName,
        )}
      />
    </div>
  );
}

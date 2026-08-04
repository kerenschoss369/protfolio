import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/cn";

const surfaceVariants = {
  flat: "bg-background",
  raised: "bg-surface-1",
  inset: "bg-surface-2",
  accent: "bg-accent-muted",
} as const;

const surfaceBorders = {
  none: "",
  subtle: "border border-border-subtle",
  strong: "border border-border-strong",
  steel:
    "border border-border-subtle shadow-[inset_0_1px_0_0_var(--steel-highlight)]",
} as const;

type SurfaceProps<T extends ElementType = "div"> = {
  as?: T;
  variant?: keyof typeof surfaceVariants;
  border?: keyof typeof surfaceBorders;
  padded?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Surface<T extends ElementType = "div">({
  as,
  variant = "raised",
  border = "subtle",
  padded = false,
  className,
  ...props
}: SurfaceProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "rounded-[var(--radius-md)]",
        surfaceVariants[variant],
        surfaceBorders[border],
        padded && "p-4 sm:p-6",
        className,
      )}
      {...props}
    />
  );
}

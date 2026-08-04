import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  width?: "content" | "prose" | "full";
};

export function Container({
  className,
  width = "content",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--space-gutter)]",
        width === "content" && "max-w-[var(--content-max)]",
        width === "prose" && "max-w-[var(--prose-max)]",
        width === "full" && "max-w-none",
        className,
      )}
      {...props}
    />
  );
}

import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/cn";

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  spacing?: "default" | "compact" | "none";
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Section<T extends ElementType = "section">({
  as,
  spacing = "default",
  className,
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";

  return (
    <Component
      className={cn(
        spacing === "default" && "py-[var(--space-section)]",
        spacing === "compact" && "py-[var(--space-section-sm)]",
        className,
      )}
      {...props}
    />
  );
}

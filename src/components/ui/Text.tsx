import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/cn";

const textStyles = {
  "body-lg":
    "font-sans text-[length:var(--text-body-lg)] leading-[var(--leading-relaxed)]",
  body: "font-sans text-[length:var(--text-body)] leading-[var(--leading-normal)]",
  small:
    "font-sans text-[length:var(--text-sm)] leading-[var(--leading-normal)]",
  meta: "font-mono text-[length:var(--text-meta)] uppercase tracking-[var(--tracking-meta)] leading-[var(--leading-normal)]",
  code: "font-mono text-[length:var(--text-code)] leading-[var(--leading-normal)]",
  muted:
    "font-sans text-[length:var(--text-body)] leading-[var(--leading-normal)] text-muted",
} as const;

type TextVariant = keyof typeof textStyles;

type TextProps<T extends ElementType = "p"> = {
  as?: T;
  variant?: TextVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Text<T extends ElementType = "p">({
  as,
  variant = "body",
  className,
  ...props
}: TextProps<T>) {
  const Component = as ?? "p";

  return (
    <Component className={cn(textStyles[variant], className)} {...props} />
  );
}

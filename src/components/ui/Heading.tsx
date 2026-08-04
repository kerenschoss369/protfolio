import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

const headingStyles = {
  display:
    "font-serif text-[length:var(--text-display)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-balance",
  hero: "font-serif text-[length:var(--text-hero)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-balance",
  page: "font-serif text-[length:var(--text-page)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-balance",
  section:
    "font-sans text-[length:var(--text-section)] font-medium leading-[var(--leading-snug)] tracking-[var(--tracking-tight)]",
  project:
    "font-serif text-[length:var(--text-project)] leading-[var(--leading-snug)] tracking-[var(--tracking-tight)]",
} as const;

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingVariant = keyof typeof headingStyles;

type HeadingProps<T extends HeadingLevel = "h2"> = {
  as?: T;
  variant?: HeadingVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Heading<T extends HeadingLevel = "h2">({
  as,
  variant = "section",
  className,
  ...props
}: HeadingProps<T>) {
  const Component = as ?? "h2";

  return (
    <Component className={cn(headingStyles[variant], className)} {...props} />
  );
}

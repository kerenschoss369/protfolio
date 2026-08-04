import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

const tagVariants = {
  default: "border-border-subtle bg-surface-1 text-foreground",
  accent: "border-transparent bg-accent-muted text-accent",
  steel: "border-border-subtle bg-transparent text-steel",
  success:
    "border-transparent bg-[color-mix(in_srgb,var(--success)_14%,var(--background))] text-success",
  warning:
    "border-transparent bg-[color-mix(in_srgb,var(--warning)_14%,var(--background))] text-warning",
  danger:
    "border-transparent bg-[color-mix(in_srgb,var(--danger)_14%,var(--background))] text-danger",
} as const;

export type TagVariant = keyof typeof tagVariants;

type TagProps = ComponentPropsWithoutRef<"span"> & {
  variant?: TagVariant;
};

export function Tag({ className, variant = "default", ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-sm)] border px-2 py-0.5 font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase",
        tagVariants[variant],
        className,
      )}
      {...props}
    />
  );
}

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

const buttonVariants = {
  primary:
    "bg-accent text-accent-contrast hover:brightness-[1.05] active:brightness-[0.96] disabled:bg-[var(--surface-2)] disabled:text-muted",
  secondary:
    "border border-border-strong bg-transparent text-foreground hover:bg-surface-1 active:bg-surface-2 disabled:border-border-subtle disabled:text-muted",
  ghost:
    "bg-transparent text-foreground hover:bg-surface-1 active:bg-surface-2 disabled:text-muted",
  danger:
    "bg-danger text-danger-contrast hover:brightness-[1.05] active:brightness-[0.96] disabled:bg-[var(--surface-2)] disabled:text-muted",
} as const;

const buttonSizes = {
  sm: "min-h-9 gap-1.5 px-3 text-[length:var(--text-sm)]",
  md: "min-h-[var(--touch-target)] gap-2 px-4 text-[length:var(--text-body)]",
  lg: "min-h-12 gap-2 px-5 text-[length:var(--text-body-lg)]",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={cn(
        "pressable inline-flex items-center justify-center rounded-[var(--radius-md)] font-medium",
        "focus-visible:outline-focus-ring focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <span className="sr-only">Loading</span> : null}
      {children}
    </button>
  );
}

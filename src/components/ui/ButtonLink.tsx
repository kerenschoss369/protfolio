import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const buttonVariants = {
  primary:
    "bg-accent text-accent-contrast hover:brightness-[1.05] active:brightness-[0.96]",
  secondary:
    "border border-border-strong bg-transparent text-foreground hover:bg-surface-1 active:bg-surface-2",
  ghost:
    "bg-transparent text-foreground hover:bg-surface-1 active:bg-surface-2",
  danger:
    "bg-danger text-danger-contrast hover:brightness-[1.05] active:brightness-[0.96]",
} as const satisfies Record<ButtonVariant, string>;

const buttonSizes = {
  sm: "min-h-[var(--touch-target)] gap-1.5 px-3 text-[length:var(--text-sm)]",
  md: "min-h-[var(--touch-target)] gap-2 px-4 text-[length:var(--text-body)]",
  lg: "min-h-12 gap-2 px-5 text-[length:var(--text-body-lg)]",
} as const satisfies Record<ButtonSize, string>;

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
};

export function ButtonLink({
  className,
  href,
  variant = "primary",
  size = "md",
  external = false,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(
    "pressable inline-flex items-center justify-center rounded-[var(--radius-md)] font-medium",
    "focus-visible:outline-focus-ring focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
    buttonVariants[variant],
    buttonSizes[size],
    className,
  );

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    const opensInNewTab = external || href.startsWith("http");

    return (
      <a
        href={href}
        className={classes}
        rel={opensInNewTab ? "noopener noreferrer" : undefined}
        target={opensInNewTab ? "_blank" : undefined}
        {...props}
      >
        {children}
        {opensInNewTab ? (
          <span className="sr-only"> (opens in a new tab)</span>
        ) : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

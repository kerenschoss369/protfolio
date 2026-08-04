import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
};

export function IconButton({
  className,
  label,
  children,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        "border-border-subtle bg-surface-1 text-foreground inline-flex min-h-[var(--touch-target)] min-w-[var(--touch-target)] items-center justify-center rounded-[var(--radius-md)] border transition-[background-color,border-color,color] duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        "hover:border-border-strong hover:bg-surface-2",
        "focus-visible:outline-focus-ring focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

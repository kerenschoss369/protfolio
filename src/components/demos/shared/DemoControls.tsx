import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type DemoControlsProps = {
  children: ReactNode;
  label: string;
  className?: string;
};

/**
 * Grouped control row for mode switches, shortcuts, and actions.
 */
export function DemoControls({
  children,
  label,
  className,
}: DemoControlsProps) {
  return (
    <div
      role="toolbar"
      aria-label={label}
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {children}
    </div>
  );
}

type DemoModeButtonProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  className?: string;
};

export function DemoModeButton({
  label,
  selected,
  onSelect,
  className,
}: DemoModeButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "pressable min-h-[var(--touch-target)] rounded-[var(--radius-md)] border px-3 font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase",
        "focus-visible:outline-focus-ring focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
        selected
          ? "border-accent bg-accent-muted text-accent"
          : "border-border-subtle bg-background text-foreground hover:bg-surface-1",
        className,
      )}
    >
      {label}
    </button>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { IconButton } from "@/components/ui/IconButton";
import { primaryNavItems } from "@/data/navigation";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import {
  getFocusableElements,
  inertBackgroundLandmarks,
  lockBodyScroll,
  trapFocus,
} from "@/lib/focus-trap";

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cvPath: string | null;
  onOpenCommandMenu: () => void;
};

export function MobileNav({
  open,
  onOpenChange,
  cvPath,
  onOpenCommandMenu,
}: MobileNavProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const unlock = lockBodyScroll();
    const clearInert = inertBackgroundLandmarks();

    const frame = window.requestAnimationFrame(() => {
      const focusable = panelRef.current
        ? getFocusableElements(panelRef.current)
        : [];
      focusable[0]?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      clearInert();
      unlock();
      previouslyFocused.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      if (panelRef.current) {
        trapFocus(event, panelRef.current);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      onOpenChange(false);
    }
  }, [pathname, onOpenChange]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[var(--z-overlay)] lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-[var(--overlay)] motion-safe:animate-[overlay-in_var(--duration-fast)_var(--ease-exit)]"
        aria-label="Close navigation menu"
        onClick={() => onOpenChange(false)}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-theme-surface
        className="border-border-subtle bg-background absolute inset-y-0 right-0 flex w-full max-w-full flex-col border-l shadow-[var(--shadow-md)] motion-safe:animate-[nav-panel-in_var(--duration-base)_var(--ease-entrance)] sm:max-w-sm"
      >
        <div className="border-border-subtle flex items-center justify-between border-b px-[var(--space-gutter)] py-4">
          <p id={titleId} className="font-medium tracking-tight">
            Menu
          </p>
          <IconButton
            label="Close navigation menu"
            onClick={() => onOpenChange(false)}
          >
            <X size={18} aria-hidden />
          </IconButton>
        </div>

        <nav
          aria-label="Mobile primary"
          className="flex flex-1 flex-col gap-1 px-[var(--space-gutter)] py-6"
        >
          <Link
            href="/"
            className={cn(
              "inline-flex min-h-[var(--touch-target)] items-center rounded-[var(--radius-md)] px-3 text-[length:var(--text-body-lg)]",
              pathname === "/"
                ? "bg-surface-2 text-foreground"
                : "text-muted hover:bg-surface-1 hover:text-foreground",
            )}
            aria-current={pathname === "/" ? "page" : undefined}
            onClick={() => onOpenChange(false)}
          >
            Home
          </Link>

          {primaryNavItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex min-h-[var(--touch-target)] items-center rounded-[var(--radius-md)] px-3 text-[length:var(--text-body-lg)]",
                  active
                    ? "bg-surface-2 text-foreground"
                    : "text-muted hover:bg-surface-1 hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
                onClick={() => onOpenChange(false)}
              >
                {item.label}
              </Link>
            );
          })}

          {cvPath ? (
            <a
              href={cvPath}
              className="text-muted hover:bg-surface-1 hover:text-foreground inline-flex min-h-[var(--touch-target)] items-center rounded-[var(--radius-md)] px-3 text-[length:var(--text-body-lg)]"
              onClick={() => onOpenChange(false)}
            >
              Download CV
            </a>
          ) : null}
        </nav>

        <div className="border-border-subtle flex items-center justify-between gap-3 border-t px-[var(--space-gutter)] py-4">
          <p className="text-muted font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
            {portfolio.name}
          </p>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="border-border-subtle bg-surface-1 text-foreground inline-flex min-h-[var(--touch-target)] items-center rounded-[var(--radius-md)] border px-3 text-[length:var(--text-sm)]"
              onClick={() => {
                onOpenChange(false);
                onOpenCommandMenu();
              }}
            >
              Command menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { useTheme } from "@/components/theme/ThemeProvider";
import {
  buildCommandActions,
  filterCommandActions,
  type CommandAction,
} from "@/lib/command-actions";
import { cn } from "@/lib/cn";
import {
  getFocusableElements,
  lockBodyScroll,
  trapFocus,
} from "@/lib/focus-trap";

type CommandMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  if (!open) {
    return null;
  }

  return <CommandMenuDialog onOpenChange={onOpenChange} />;
}

function CommandMenuDialog({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { toggleTheme } = useTheme();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const statusId = useId();
  const searchId = useId();
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const actions = useMemo(() => buildCommandActions(), []);
  const results = useMemo(
    () => filterCommandActions(actions, query),
    [actions, query],
  );

  const runAction = useCallback(
    (action: CommandAction) => {
      if (action.kind === "theme") {
        toggleTheme();
        onOpenChange(false);
        return;
      }

      if (!action.href) {
        return;
      }

      onOpenChange(false);

      if (action.kind === "download") {
        window.location.assign(action.href);
        return;
      }

      if (action.kind === "external") {
        if (action.href.startsWith("mailto:")) {
          window.location.assign(action.href);
          return;
        }

        window.open(action.href, "_blank", "noopener,noreferrer");
        return;
      }

      router.push(action.href);
    },
    [onOpenChange, router, toggleTheme],
  );

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const unlock = lockBodyScroll();

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      unlock();
      previouslyFocused.current?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      if (dialogRef.current) {
        trapFocus(event, dialogRef.current);
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) =>
          results.length === 0 ? 0 : (current + 1) % results.length,
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) =>
          results.length === 0
            ? 0
            : (current - 1 + results.length) % results.length,
        );
        return;
      }

      if (event.key === "Enter") {
        const action = results[activeIndex];
        if (action) {
          event.preventDefault();
          runAction(action);
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange, results, activeIndex, runAction]);

  function handleQueryChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center px-3 pt-[12vh] sm:px-4">
      <button
        type="button"
        className="absolute inset-0 bg-[var(--overlay)] motion-safe:animate-[overlay-in_var(--duration-fast)_var(--ease-exit)]"
        aria-label="Close command menu"
        onClick={() => onOpenChange(false)}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-theme-surface
        className="border-border-subtle bg-background relative z-[1] flex max-h-[min(32rem,76vh)] w-full max-w-xl flex-col overflow-hidden rounded-[var(--radius-lg)] border shadow-[var(--shadow-md)] motion-safe:animate-[dialog-in_var(--duration-base)_var(--ease-entrance)]"
      >
        <div className="border-border-subtle flex items-center gap-3 border-b px-4 py-3">
          <Search size={18} className="text-steel shrink-0" aria-hidden />
          <label className="sr-only" htmlFor={searchId}>
            Search commands
          </label>
          <input
            ref={inputRef}
            id={searchId}
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder="Search projects, pages, and actions…"
            className="text-foreground placeholder:text-muted min-w-0 flex-1 bg-transparent text-[length:var(--text-body)] outline-none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-controls={listboxId}
            aria-activedescendant={
              results[activeIndex]
                ? `command-option-${results[activeIndex].id}`
                : undefined
            }
          />
          <kbd className="text-muted border-border-subtle hidden rounded-[var(--radius-sm)] border px-1.5 py-0.5 font-mono text-[length:var(--text-meta)] uppercase sm:inline">
            Esc
          </kbd>
        </div>

        <p id={titleId} className="sr-only">
          Command menu
        </p>
        <p id={statusId} className="sr-only" aria-live="polite">
          {results.length} {results.length === 1 ? "result" : "results"}{" "}
          available
        </p>

        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={titleId}
          className="overflow-y-auto p-2"
        >
          {results.length === 0 ? (
            <li className="text-muted px-3 py-6 text-center text-[length:var(--text-sm)]">
              No matching commands
            </li>
          ) : (
            results.map((action, index) => (
              <li key={action.id} role="presentation">
                <button
                  type="button"
                  id={`command-option-${action.id}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-[var(--radius-md)] px-3 py-3 text-left transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                    index === activeIndex
                      ? "bg-surface-2 text-foreground"
                      : "text-foreground hover:bg-surface-1",
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    runAction(action);
                  }}
                >
                  <span className="min-w-0">
                    <span className="block font-medium">{action.label}</span>
                    <span className="text-muted mt-0.5 block font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
                      {action.group}
                    </span>
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export function useCommandMenuShortcut(onOpen: () => void) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.defaultPrevented) {
        return;
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpen();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onOpen]);
}

export function focusFirstIn(container: HTMLElement | null) {
  if (!container) {
    return;
  }
  const focusable = getFocusableElements(container);
  focusable[0]?.focus();
}

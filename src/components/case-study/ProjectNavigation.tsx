import Link from "next/link";

import { Text } from "@/components/ui/Text";
import type { Project } from "@/data/content-types";
import { cn } from "@/lib/cn";

type ProjectNavigationProps = {
  previous: Project | null;
  next: Project | null;
  className?: string;
};

/**
 * Previous/next follows typed project array order and does not wrap.
 * First project has no previous link; last project has no next link.
 */
export function ProjectNavigation({
  previous,
  next,
  className,
}: ProjectNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Adjacent projects"
      className={cn(
        "border-border-subtle grid gap-4 border-t pt-8 sm:grid-cols-2",
        className,
      )}
    >
      {previous ? (
        <Link
          href={`/work/${previous.slug}`}
          className="group border-border-subtle hover:border-border-strong focus-visible:outline-focus-ring focus-visible:border-accent min-h-[var(--touch-target)] rounded-[var(--radius-md)] border p-4 transition-[border-color,transform] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-px focus-visible:-translate-y-px focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
        >
          <Text variant="meta" className="text-muted">
            <span
              aria-hidden
              className="link-arrow me-1 inline-block -scale-x-100"
            >
              →
            </span>
            Previous project
          </Text>
          <p className="group-hover:text-accent group-focus-visible:text-accent mt-2 font-serif text-[length:var(--text-body-lg)] tracking-tight text-pretty transition-colors">
            {previous.title}
          </p>
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden />
      )}

      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="group border-border-subtle hover:border-border-strong focus-visible:outline-focus-ring focus-visible:border-accent min-h-[var(--touch-target)] rounded-[var(--radius-md)] border p-4 text-left transition-[border-color,transform] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-px focus-visible:-translate-y-px focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)] sm:text-right"
        >
          <Text variant="meta" className="text-muted">
            Next project
            <span aria-hidden className="link-arrow ms-1">
              →
            </span>
          </Text>
          <p className="group-hover:text-accent group-focus-visible:text-accent mt-2 font-serif text-[length:var(--text-body-lg)] tracking-tight text-pretty transition-colors">
            {next.title}
          </p>
        </Link>
      ) : null}
    </nav>
  );
}

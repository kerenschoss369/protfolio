import Link from "next/link";

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
        "border-border-subtle grid gap-4 border-t pt-10 sm:grid-cols-2",
        className,
      )}
    >
      {previous ? (
        <Link
          href={`/work/${previous.slug}`}
          className="group landing-case-panel hover:border-border-strong min-h-11 p-5 transition-[border-color,transform] duration-200 hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        >
          <p className="landing-case-kicker">
            <span aria-hidden className="me-1 inline-block -scale-x-100">
              →
            </span>
            Previous project
          </p>
          <p className="text-foreground mt-3 text-lg font-semibold tracking-tight text-pretty transition-opacity group-hover:opacity-80 sm:text-xl">
            {previous.title}
          </p>
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden />
      )}

      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="group landing-case-panel hover:border-border-strong min-h-11 p-5 text-left transition-[border-color,transform] duration-200 hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] sm:text-right"
        >
          <p className="landing-case-kicker">
            Next project
            <span aria-hidden className="ms-1">
              →
            </span>
          </p>
          <p className="text-foreground mt-3 text-lg font-semibold tracking-tight text-pretty transition-opacity group-hover:opacity-80 sm:text-xl">
            {next.title}
          </p>
        </Link>
      ) : null}
    </nav>
  );
}

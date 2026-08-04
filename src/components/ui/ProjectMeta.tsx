import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ProjectMetaProps = {
  category?: ReactNode;
  dates?: ReactNode;
  stack?: readonly string[];
  className?: string;
};

export function ProjectMeta({
  category,
  dates,
  stack,
  className,
}: ProjectMetaProps) {
  const parts = [category, dates].filter(Boolean);

  return (
    <div
      className={cn(
        "text-muted flex flex-col gap-2 font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase",
        className,
      )}
    >
      {parts.length > 0 ? (
        <p>
          {parts.map((part, index) => (
            <span key={`${String(part)}-${index}`}>
              {index > 0 ? (
                <span aria-hidden className="text-steel mx-2">
                  ·
                </span>
              ) : null}
              {part}
            </span>
          ))}
        </p>
      ) : null}

      {stack && stack.length > 0 ? (
        <ul className="flex flex-wrap gap-x-3 gap-y-1 tracking-normal normal-case">
          {stack.map((item) => (
            <li key={item} className="text-steel">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

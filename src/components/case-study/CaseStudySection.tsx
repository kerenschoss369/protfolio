import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type CaseStudySectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  /** Optional lead line under the section heading. */
  lead?: string;
};

export function CaseStudySection({
  id,
  title,
  children,
  className,
  lead,
}: CaseStudySectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("scroll-mt-24 space-y-5", className)}
    >
      <div className="max-w-[42rem] space-y-2">
        <h2
          id={`${id}-heading`}
          className="hero-heading landing-case-section-title"
        >
          {title}
        </h2>
        {lead ? <p className="text-muted text-sm text-pretty">{lead}</p> : null}
      </div>
      {children}
    </section>
  );
}

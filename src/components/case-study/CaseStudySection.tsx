import type { ReactNode } from "react";

import { Heading } from "@/components/ui/Heading";
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
      className={cn("scroll-mt-28 space-y-4", className)}
    >
      <div className="max-w-[40rem] space-y-2">
        <Heading as="h2" variant="section" id={`${id}-heading`}>
          {title}
        </Heading>
        {lead ? (
          <p className="text-muted text-[length:var(--text-sm)] text-pretty">
            {lead}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

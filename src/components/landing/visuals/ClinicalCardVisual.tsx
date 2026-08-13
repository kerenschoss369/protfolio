"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { CLINICAL_FICTIONAL_NOTE } from "@/components/demos/clinical/clinical-data";
import { useElementInView } from "@/hooks/useElementInView";
import { usePageVisibility } from "@/hooks/usePageVisibility";
import { cn } from "@/lib/cn";

const ACTIONS = [
  { label: "Follow-up", evidence: "oncology follow-up", tone: "accent" },
  { label: "Lab test", evidence: "Repeat CBC", tone: "warn" },
  { label: "Review required", evidence: "seven days", tone: "review" },
] as const;

export function ClinicalCardVisual() {
  const reduced = useReducedMotion();
  const pageVisible = usePageVisibility();
  const [ref, inView] = useElementInView<HTMLDivElement>({
    once: false,
    threshold: 0.25,
  });
  const [step, setStep] = useState(0);
  const active = !reduced && pageVisible && inView;

  useEffect(() => {
    if (!active) {
      return;
    }
    const id = window.setInterval(() => {
      setStep((current) => (current + 1) % (ACTIONS.length + 1));
    }, 2200);
    return () => window.clearInterval(id);
  }, [active]);

  return (
    <div
      ref={ref}
      className="border-border-subtle bg-surface-1 flex h-full flex-col gap-4 rounded-[28px] border p-4 sm:p-5"
    >
      <p className="text-muted text-xs font-medium tracking-widest uppercase">
        Fictional note → structured actions
      </p>
      <div className="border-border-subtle bg-background text-foreground relative flex-1 rounded-2xl border p-4 text-sm leading-relaxed">
        <p>
          {CLINICAL_FICTIONAL_NOTE.split(" ").map((word, i) => {
            const highlight =
              step > 0 &&
              ACTIONS.slice(0, step).some((action) =>
                action.evidence
                  .toLowerCase()
                  .split(" ")
                  .some((token) =>
                    word.toLowerCase().includes(token.toLowerCase()),
                  ),
              );
            return (
              <span
                key={`${word}-${i}`}
                className={cn(
                  "transition-colors duration-500",
                  highlight && "bg-accent-muted text-foreground",
                )}
              >
                {word}{" "}
              </span>
            );
          })}
        </p>
      </div>
      <ul className="grid gap-2">
        {ACTIONS.map((action, index) => (
          <m.li
            key={action.label}
            animate={{
              opacity: reduced || step > index ? 1 : 0.45,
              x: reduced || step > index ? 0 : 12,
            }}
            className="border-border-subtle flex items-center justify-between rounded-full border px-4 py-2 text-xs tracking-wider uppercase"
          >
            <span>{action.label}</span>
            <span className="text-muted">{action.evidence}</span>
          </m.li>
        ))}
      </ul>
      <div className="text-muted flex flex-wrap gap-2 text-xs tracking-widest uppercase">
        <span>React / TypeScript</span>
        <span aria-hidden>↓</span>
        <span>Node / Express</span>
        <span aria-hidden>↓</span>
        <span>FastAPI</span>
        <span aria-hidden>↓</span>
        <span>LLM</span>
      </div>
    </div>
  );
}

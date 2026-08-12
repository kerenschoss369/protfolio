"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { CLINICAL_FICTIONAL_NOTE } from "@/components/demos/clinical/clinical-data";
import { cn } from "@/lib/cn";

const ACTIONS = [
  { label: "Follow-up", evidence: "oncology follow-up", tone: "accent" },
  { label: "Lab test", evidence: "Repeat CBC", tone: "warn" },
  { label: "Review required", evidence: "seven days", tone: "review" },
] as const;

export function ClinicalCardVisual() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % (ACTIONS.length + 1));
    }, 2200);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="flex h-full flex-col gap-4 rounded-[28px] border border-[#D7E2EA]/25 bg-[#121212] p-4 sm:p-5">
      <p className="text-[10px] font-medium tracking-widest text-[#D7E2EA]/55 uppercase">
        Fictional note → structured actions
      </p>
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-[#D7E2EA]/15 bg-[#0C0C0C] p-4 text-sm leading-relaxed text-[#D7E2EA]/85">
        <p>
          {CLINICAL_FICTIONAL_NOTE.split(" ").map((word, i) => {
            const highlight =
              step > 0 &&
              ACTIONS.slice(0, step).some((a) =>
                a.evidence
                  .toLowerCase()
                  .split(" ")
                  .some((w) => word.toLowerCase().includes(w.toLowerCase())),
              );
            return (
              <span
                key={`${word}-${i}`}
                className={cn(
                  "transition-colors duration-500",
                  highlight && "bg-[#D7E2EA]/20 text-[#D7E2EA]",
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
              opacity: reduced || step > index ? 1 : 0.25,
              x: reduced || step > index ? 0 : 12,
            }}
            className="flex items-center justify-between rounded-full border border-[#D7E2EA]/20 px-4 py-2 text-xs tracking-wider uppercase"
          >
            <span>{action.label}</span>
            <span className="text-[#D7E2EA]/45">{action.evidence}</span>
          </m.li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 text-[10px] tracking-widest text-[#D7E2EA]/50 uppercase">
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

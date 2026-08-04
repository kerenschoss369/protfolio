"use client";

import { m } from "motion/react";
import { useState, type ReactNode } from "react";

import { MagneticAction } from "@/components/motion/MagneticAction";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { durations, easings, springs } from "@/lib/animation-config";
import { cn } from "@/lib/cn";

const DISCIPLINES = [
  "Frontend",
  "Full-Stack",
  "Product Engineering",
  "Complex UI",
] as const;

type ContactConvergeProps = {
  children: ReactNode;
  email?: string | null;
};

export function ContactConverge({ children, email }: ContactConvergeProps) {
  const reducedMotion = useReducedMotionPreference();
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    if (!email || typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="relative min-h-28 overflow-hidden">
        <svg
          viewBox="0 0 400 120"
          className="text-steel absolute inset-0 h-full w-full opacity-70"
          aria-hidden
        >
          {DISCIPLINES.map((label, index) => {
            const startY = 18 + index * 24;
            return (
              <m.path
                key={label}
                d={`M20 ${startY} C 140 ${startY}, 220 60, 360 60`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                initial={
                  reducedMotion ? false : { pathLength: 0, opacity: 0.25 }
                }
                animate={{ pathLength: 1, opacity: 0.65 }}
                transition={{
                  duration: durations.slow,
                  delay: index * 0.08,
                  ease: easings.entrance,
                }}
              />
            );
          })}
          <m.circle
            cx="360"
            cy="60"
            r="5"
            className="fill-[var(--accent)]"
            initial={reducedMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={springs.spatial}
          />
        </svg>
        <ul className="relative z-[1] grid gap-2 sm:grid-cols-2">
          {DISCIPLINES.map((label) => (
            <li
              key={label}
              className="font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] text-[var(--muted)] uppercase"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>

      <MagneticAction>
        <div className="space-y-4">{children}</div>
      </MagneticAction>

      {email ? (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copyEmail}
            className={cn(
              "pressable border-border-subtle inline-flex min-h-[var(--touch-target)] items-center rounded-[var(--radius-md)] border px-3 font-mono text-[length:var(--text-meta)] uppercase",
              copied && "border-success text-success",
            )}
          >
            {copied ? "Email copied" : "Copy email"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

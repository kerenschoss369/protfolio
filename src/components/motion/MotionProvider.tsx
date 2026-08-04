"use client";

import { LazyMotion, domMax, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

type MotionProviderProps = {
  children: ReactNode;
};

/**
 * Loads Motion features once for Client islands.
 * `domMax` is required for layout animations (work filters, shared layout).
 * Page shells remain Server Components; only interactive islands import this.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  const reducedMotion = useReducedMotionPreference();

  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "user"}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

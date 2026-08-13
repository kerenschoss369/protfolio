"use client";

import { useEffect, useRef } from "react";

import { useElementInView } from "@/hooks/useElementInView";
import { usePageVisibility } from "@/hooks/usePageVisibility";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

/**
 * Lightweight deterministic rhythm preview. Full engine stays on the case study.
 */
export function TapTapCardVisual() {
  const reducedMotion = useReducedMotionPreference();
  const pageVisible = usePageVisibility();
  const [ref, inView] = useElementInView<HTMLDivElement>({
    once: false,
    threshold: 0.25,
  });
  const noteRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const note = noteRef.current;
    if (!note) {
      return;
    }

    if (reducedMotion || !pageVisible || !inView) {
      note.style.transform = "translate3d(40%, -50%, 0)";
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const duration = 2400;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) {
        start = now;
      }
      const progress = ((now - start) % duration) / duration;
      note.style.transform = `translate3d(${progress * 78}%, -50%, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [inView, pageVisible, reducedMotion]);

  return (
    <div
      ref={ref}
      className="border-border-subtle bg-surface-1 flex h-full flex-col gap-3 rounded-[28px] border p-4 sm:p-5"
    >
      <p className="text-muted text-xs font-medium tracking-widest uppercase">
        Rhythm timing · silent preview
      </p>
      <div
        className="border-border-subtle bg-background relative min-h-[160px] flex-1 rounded-2xl border"
        aria-hidden
      >
        <div className="bg-border-strong absolute inset-x-6 top-1/2 h-px -translate-y-1/2" />
        <div className="border-foreground absolute top-1/2 left-8 size-4 -translate-y-1/2 rounded-full border-2" />
        <span
          ref={noteRef}
          className="bg-foreground absolute top-1/2 left-8 size-3 rounded-full"
        />
      </div>
      <p className="text-muted text-xs tracking-widest uppercase">
        Perfect / Good / Miss feedback on the case study
      </p>
    </div>
  );
}

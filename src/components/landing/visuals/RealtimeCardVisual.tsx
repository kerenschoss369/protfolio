"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { useElementInView } from "@/hooks/useElementInView";
import { usePageVisibility } from "@/hooks/usePageVisibility";

const SCRIPT = [
  { type: "in", text: "> hi" },
  { type: "out", text: "hello — realtime session ready" },
  { type: "in", text: "> 6*7" },
  { type: "event", text: "function_call: multiply" },
  { type: "out", text: "42" },
  { type: "in", text: "> architecture" },
  { type: "event", text: "ws → reader → channel → main" },
  { type: "out", text: "event loop visualized" },
] as const;

export function RealtimeCardVisual() {
  const reduced = useReducedMotion();
  const pageVisible = usePageVisibility();
  const [ref, inView] = useElementInView<HTMLDivElement>({
    once: false,
    threshold: 0.25,
  });
  const [visible, setVisible] = useState(reduced ? SCRIPT.length : 1);
  const active = !reduced && pageVisible && inView;

  useEffect(() => {
    if (!active) {
      return;
    }
    const id = window.setInterval(() => {
      setVisible((current) => (current >= SCRIPT.length ? 1 : current + 1));
    }, 1400);
    return () => window.clearInterval(id);
  }, [active]);

  return (
    <div
      ref={ref}
      className="border-border-subtle bg-surface-1 flex h-full flex-col rounded-[28px] border"
    >
      <div className="border-border-subtle flex items-center gap-2 border-b px-4 py-3">
        <span className="bg-muted size-2 rounded-full" />
        <span className="bg-muted size-2 rounded-full" />
        <span className="bg-muted size-2 rounded-full" />
        <span className="text-muted ms-2 text-xs tracking-widest uppercase">
          realtime-gpt-cli · simulation
        </span>
      </div>
      <div className="text-foreground flex-1 space-y-2 p-4 font-mono text-sm">
        {SCRIPT.slice(0, visible).map((line, index) => (
          <m.p
            key={`${line.text}-${index}`}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={
              line.type === "event"
                ? "text-muted text-xs tracking-wider uppercase"
                : line.type === "in"
                  ? "text-foreground"
                  : "text-accent"
            }
          >
            {line.text}
          </m.p>
        ))}
        <span className="bg-muted inline-block h-4 w-2 animate-pulse" />
      </div>
      <div className="border-border-subtle text-muted border-t px-4 py-3 text-xs tracking-widest uppercase">
        CLI → OpenAI realtime → WebSocket → goroutine → channel → output
      </div>
    </div>
  );
}

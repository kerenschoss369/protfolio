"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

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
  const [visible, setVisible] = useState(reduced ? SCRIPT.length : 1);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setVisible((v) => (v >= SCRIPT.length ? 1 : v + 1));
    }, 1400);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-[#D7E2EA]/25 bg-[#101010]">
      <div className="flex items-center gap-2 border-b border-[#D7E2EA]/15 px-4 py-3">
        <span className="size-2 rounded-full bg-[#D7E2EA]/35" />
        <span className="size-2 rounded-full bg-[#D7E2EA]/35" />
        <span className="size-2 rounded-full bg-[#D7E2EA]/35" />
        <span className="ms-2 text-[10px] tracking-widest text-[#D7E2EA]/50 uppercase">
          realtime-gpt-cli · simulation
        </span>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden p-4 font-mono text-sm text-[#D7E2EA]">
        {SCRIPT.slice(0, visible).map((line, index) => (
          <m.p
            key={`${line.text}-${index}`}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={
              line.type === "event"
                ? "text-[11px] tracking-wider text-[#D7E2EA]/45 uppercase"
                : line.type === "in"
                  ? "text-[#D7E2EA]"
                  : "text-[#BBCCD7]"
            }
          >
            {line.text}
          </m.p>
        ))}
        <span className="inline-block h-4 w-2 animate-pulse bg-[#D7E2EA]/70" />
      </div>
      <div className="border-t border-[#D7E2EA]/15 px-4 py-3 text-[10px] tracking-widest text-[#D7E2EA]/45 uppercase">
        CLI → OpenAI realtime → WebSocket → goroutine → channel → output
      </div>
    </div>
  );
}

"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { useFinePointer } from "@/hooks/useFinePointer";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { cn } from "@/lib/cn";

const DEFAULT_MAX_OFFSET = 4;

type MagnetProps = {
  children: ReactNode;
  className?: string;
  padding?: number;
  strength?: number;
  maxOffset?: number;
  activeTransition?: string;
  inactiveTransition?: string;
};

/**
 * Magnetic hover: translate toward pointer, capped so the target does not
 * escape. Disabled for coarse pointers, reduced motion, and small viewports.
 */
export function Magnet({
  children,
  className,
  padding = 150,
  strength = 3,
  maxOffset = DEFAULT_MAX_OFFSET,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
}: MagnetProps) {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotionPreference();
  const ref = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  const [wideEnough, setWideEnough] = useState(false);
  const enabled = finePointer && !reducedMotion && wideEnough;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 48rem)");
    const sync = () => setWideEnough(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    active.current = false;
    el.style.transition = inactiveTransition;
    el.style.transform = "translate3d(0px, 0px, 0px)";
  }, [inactiveTransition]);

  const onMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!enabled || !el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const halfW = rect.width / 2 + padding;
      const halfH = rect.height / 2 + padding;
      const inside = Math.abs(dx) < halfW && Math.abs(dy) < halfH;

      if (!inside) {
        if (active.current) reset();
        return;
      }

      if (!active.current) {
        active.current = true;
        el.style.transition = activeTransition;
      }

      const tx = Math.max(-maxOffset, Math.min(maxOffset, dx / strength));
      const ty = Math.max(-maxOffset, Math.min(maxOffset, dy / strength));
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    },
    [activeTransition, enabled, maxOffset, padding, reset, strength],
  );

  useEffect(() => {
    if (!enabled) reset();
  }, [enabled, reset]);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </div>
  );
}

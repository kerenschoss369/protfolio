"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { useFinePointer } from "@/hooks/useFinePointer";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { cn } from "@/lib/cn";

type MagnetProps = {
  children: ReactNode;
  className?: string;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
};

/**
 * Magnetic hover: translate toward pointer when within padding of the element.
 */
export function Magnet({
  children,
  className,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
}: MagnetProps) {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotionPreference();
  const ref = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  const enabled = finePointer && !reducedMotion;

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

      el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
    },
    [activeTransition, enabled, padding, reset, strength],
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
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}

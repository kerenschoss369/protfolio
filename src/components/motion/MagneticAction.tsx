"use client";

import { m } from "motion/react";
import {
  useCallback,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import { useFinePointer } from "@/hooks/useFinePointer";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { distances, springs } from "@/lib/animation-config";
import { cn } from "@/lib/cn";

type MagneticActionProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/**
 * Subtle spring attraction toward pointer. Caps displacement so hit targets stay usable.
 */
export function MagneticAction({
  children,
  className,
  strength = distances.magneticPx,
}: MagneticActionProps) {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotionPreference();
  const ref = useRef<HTMLDivElement>(null);
  const enabled = finePointer && !reducedMotion;

  const handleMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!enabled || !ref.current) {
        return;
      }
      const rect = ref.current.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      const clamp = strength;
      ref.current.style.transform = `translate(${Math.max(-clamp, Math.min(clamp, x * 0.12))}px, ${Math.max(-clamp, Math.min(clamp, y * 0.12))}px)`;
    },
    [enabled, strength],
  );

  const handleLeave = useCallback(() => {
    if (!ref.current) {
      return;
    }
    ref.current.style.transform = "translate(0px, 0px)";
  }, []);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      className={cn("inline-block will-change-transform", className)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      transition={springs.settle}
    >
      {children}
    </m.div>
  );
}

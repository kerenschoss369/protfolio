"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { useFinePointer } from "@/hooks/useFinePointer";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

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
 * Mouse-following magnetic hover. Tracks pointer vs element center,
 * applies translate3d divided by strength. Activates within padding of
 * the element edge. In 0.3s ease-out, out 0.6s ease-in-out.
 * Disabled for coarse pointers, reduced motion, and viewports below 48rem.
 */
export function Magnet({
  children,
  className,
  padding = 100,
  strength = 8,
  maxOffset,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
}: MagnetProps) {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotionPreference();
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [wideEnough, setWideEnough] = useState(false);
  const enabled = finePointer && !reducedMotion && wideEnough;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 48rem)");
    const sync = () => setWideEnough(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!enabled || !outer || !inner) {
      if (inner) {
        inner.style.willChange = "";
        inner.style.transition = inactiveTransition;
        inner.style.transform = "translate3d(0px, 0px, 0px)";
      }
      return;
    }

    inner.style.willChange = "transform";
    let active = false;

    const clamp = (value: number) => {
      if (maxOffset === undefined) {
        return value;
      }
      return Math.max(-maxOffset, Math.min(maxOffset, value));
    };

    const reset = () => {
      active = false;
      inner.style.transition = inactiveTransition;
      inner.style.transform = "translate3d(0px, 0px, 0px)";
    };

    const onMove = (event: PointerEvent) => {
      const rect = outer.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left - padding &&
        event.clientX <= rect.right + padding &&
        event.clientY >= rect.top - padding &&
        event.clientY <= rect.bottom + padding;

      if (!inside) {
        if (active) reset();
        return;
      }

      if (!active) {
        active = true;
        inner.style.transition = activeTransition;
      }

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const tx = clamp((event.clientX - cx) / strength);
      const ty = clamp((event.clientY - cy) / strength);
      inner.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", reset);
      reset();
      inner.style.willChange = "";
    };
  }, [
    activeTransition,
    enabled,
    inactiveTransition,
    maxOffset,
    padding,
    strength,
  ]);

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} className="relative">
        {children}
      </div>
    </div>
  );
}

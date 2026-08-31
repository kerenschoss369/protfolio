"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import {
  CURSOR_ARROW_HEIGHT,
  CURSOR_ARROW_WIDTH,
  CURSOR_GLOW_ICE,
  CURSOR_GLOW_LAVENDER,
  CURSOR_GLOW_OFFSET_X,
  CURSOR_GLOW_OFFSET_Y,
  CURSOR_GLOW_OPACITY,
  CURSOR_GLOW_OPACITY_HOVER,
  CURSOR_GLOW_SIZE,
  CURSOR_GLOW_SIZE_HOVER,
  CURSOR_HOTSPOT_X,
  CURSOR_HOTSPOT_Y,
  CUSTOM_CURSOR_HTML_ATTR,
  CUSTOM_CURSOR_INTERACTIVE_SELECTOR,
} from "@/components/cursor/custom-cursor";
import { useCustomCursorEnabled } from "@/hooks/useCustomCursorEnabled";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

const GLOW_LERP = 0.42;
const GLOW_SNAP_EPSILON = 0.08;

/** Classic notched pointer. The white frame is a stroke on this path, not a second shape. */
const ARROW_PATH =
  "M2 2 L2 26 L8 20.2 L12.5 32.5 L16.2 30.8 L11 18.5 L22 18.5 Z";

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }

  const match = target.closest(CUSTOM_CURSOR_INTERACTIVE_SELECTOR);
  if (!(match instanceof Element)) {
    return false;
  }

  return (
    !match.hasAttribute("disabled") &&
    match.getAttribute("aria-disabled") !== "true"
  );
}

export function CustomCursor() {
  const enabled = useCustomCursorEnabled();
  const reducedMotion = useReducedMotionPreference();
  const rootRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.removeAttribute(CUSTOM_CURSOR_HTML_ATTR);
      return;
    }

    document.documentElement.setAttribute(CUSTOM_CURSOR_HTML_ATTR, "");
    return () => {
      document.documentElement.removeAttribute(CUSTOM_CURSOR_HTML_ATTR);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const root = rootRef.current;
    const arrow = arrowRef.current;
    const glow = glowRef.current;
    if (!root || !arrow || !glow) {
      return;
    }

    let x = 0;
    let y = 0;
    let glowX = 0;
    let glowY = 0;
    let glowRaf = 0;
    let hasPosition = false;
    let interactive = false;
    let pressed = false;

    const glowTarget = () => ({
      x: x + CURSOR_GLOW_OFFSET_X,
      y: y + CURSOR_GLOW_OFFSET_Y,
    });

    const paintArrow = () => {
      arrow.style.transform = `translate3d(${x - CURSOR_HOTSPOT_X}px, ${y - CURSOR_HOTSPOT_Y}px, 0)`;
    };

    const paintGlow = () => {
      glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
    };

    const tickGlow = () => {
      glowRaf = 0;
      const target = glowTarget();
      glowX += (target.x - glowX) * GLOW_LERP;
      glowY += (target.y - glowY) * GLOW_LERP;
      paintGlow();

      if (
        Math.abs(target.x - glowX) > GLOW_SNAP_EPSILON ||
        Math.abs(target.y - glowY) > GLOW_SNAP_EPSILON
      ) {
        glowRaf = requestAnimationFrame(tickGlow);
      }
    };

    const scheduleGlow = (snap: boolean) => {
      const target = glowTarget();
      if (snap || reducedMotion) {
        glowX = target.x;
        glowY = target.y;
        paintGlow();
        if (glowRaf !== 0) {
          cancelAnimationFrame(glowRaf);
          glowRaf = 0;
        }
        return;
      }

      if (glowRaf === 0) {
        glowRaf = requestAnimationFrame(tickGlow);
      }
    };

    const setInteractive = (next: boolean) => {
      if (reducedMotion || interactive === next) {
        return;
      }
      interactive = next;
      root.classList.toggle("is-interactive", next);
    };

    const setPressed = (next: boolean) => {
      if (reducedMotion || pressed === next) {
        return;
      }
      pressed = next;
      root.classList.toggle("is-pressed", next);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      x = event.clientX;
      y = event.clientY;
      paintArrow();
      const snap = !hasPosition;
      hasPosition = true;
      root.classList.add("is-visible");
      const overAbout = Boolean(
        !reducedMotion &&
          event.target instanceof Element &&
          event.target.closest("[data-about-invert]"),
      );
      root.classList.toggle("is-about-invert", overAbout);
      setInteractive(isInteractiveTarget(event.target));
      scheduleGlow(snap);
    };

    const onLeave = () => {
      hasPosition = false;
      root.classList.remove("is-visible");
      root.classList.remove("is-about-invert");
      setPressed(false);
      setInteractive(false);
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.button !== 0) {
        return;
      }
      setPressed(true);
    };

    const onUp = () => {
      setPressed(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    window.addEventListener("blur", onLeave);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (glowRaf !== 0) {
        cancelAnimationFrame(glowRaf);
      }
    };
  }, [enabled, reducedMotion]);

  if (!enabled) {
    return null;
  }

  const cursorVars = {
    "--cursor-glow-lavender": CURSOR_GLOW_LAVENDER,
    "--cursor-glow-ice": CURSOR_GLOW_ICE,
    "--cursor-glow-size": `${CURSOR_GLOW_SIZE}px`,
    "--cursor-glow-size-hover": `${CURSOR_GLOW_SIZE_HOVER}px`,
    "--cursor-glow-opacity": CURSOR_GLOW_OPACITY,
    "--cursor-glow-opacity-hover": CURSOR_GLOW_OPACITY_HOVER,
    "--cursor-hotspot-x": `${CURSOR_HOTSPOT_X}px`,
    "--cursor-hotspot-y": `${CURSOR_HOTSPOT_Y}px`,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className="custom-cursor"
      style={cursorVars}
      aria-hidden
      data-custom-cursor-root=""
    >
      <div ref={glowRef} className="custom-cursor-glow">
        <div className="custom-cursor-glow-orb" />
      </div>
      <div ref={arrowRef} className="custom-cursor-arrow">
        <svg
          width={CURSOR_ARROW_WIDTH}
          height={CURSOR_ARROW_HEIGHT}
          viewBox={`0 0 ${CURSOR_ARROW_WIDTH} ${CURSOR_ARROW_HEIGHT}`}
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
          shapeRendering="geometricPrecision"
        >
          <path
            d={ARROW_PATH}
            fill="#050505"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
            paintOrder="stroke fill"
          />
        </svg>
      </div>
    </div>
  );
}

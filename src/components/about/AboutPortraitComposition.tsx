"use client";

import { m } from "motion/react";
import Image from "next/image";

import { useElementInView } from "@/hooks/useElementInView";
import { usePointerPosition } from "@/hooks/usePointerPosition";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { distances, durations, easings, springs } from "@/lib/animation-config";
import { cn } from "@/lib/cn";

const PORTRAIT = {
  src: "/about/keren-schoss-cutout.webp",
  width: 632,
  height: 721,
  alt: "Portrait of Keren Schoss",
} as const;

const META_LABELS = [
  { photo: "Exposure", frontend: "Interface states" },
  { photo: "Crop", frontend: "Responsive grid" },
  { photo: "Focus", frontend: "Hierarchy" },
  { photo: "Color grade", frontend: "Theme tokens" },
] as const;

const CROP_MARKS = [
  "M6 18 V10 H14",
  "M86 10 H94 V18",
  "M6 102 V110 H14",
  "M86 110 H94 V102",
] as const;

type AboutPortraitCompositionProps = {
  statement: string;
  className?: string;
};

/**
 * Editorial portrait stage: transparent cutout, crop marks, grid, and
 * photography → frontend metadata. Decorative chrome is aria-hidden.
 * Portrait remains visible before motion enhancement runs.
 */
export function AboutPortraitComposition({
  statement,
  className,
}: AboutPortraitCompositionProps) {
  const [ref, inView] = useElementInView<HTMLDivElement>({
    once: true,
    threshold: 0.18,
  });
  const reducedMotion = useReducedMotionPreference();
  const enhance = inView && !reducedMotion;
  const {
    enabled: depthEnabled,
    depth,
    handlers,
  } = usePointerPosition(distances.pointerDepthMinPx);

  return (
    <div
      ref={ref}
      className={cn("relative isolate w-full overflow-x-clip", className)}
      {...handlers}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[8%_6%_4%_10%] -z-10 max-md:inset-[4%_4%_8%_4%]"
      >
        <div className="portrait-backdrop absolute inset-0 rounded-[40%_45%_38%_42%/42%_38%_48%_40%] opacity-90" />
        <m.div
          className="portrait-depth absolute inset-[12%_18%_8%_14%] rounded-full blur-2xl"
          initial={false}
          animate={
            depthEnabled
              ? { opacity: 0.5, x: depth.x * 0.4, y: depth.y * 0.4 }
              : { opacity: enhance ? 0.45 : 0.35, x: 0, y: 0 }
          }
          transition={springs.settle}
        />
      </div>

      <m.svg
        aria-hidden
        viewBox="0 0 100 120"
        className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
        initial={false}
        animate={
          enhance
            ? { opacity: 1, scaleX: 1, scaleY: 1 }
            : { opacity: 0.5, scaleX: 0.96, scaleY: 0.98 }
        }
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: durations.slow,
                ease: easings.emphasized,
                delay: 0.25,
              }
        }
        style={{ transformOrigin: "50% 40%" }}
      >
        {Array.from({ length: 7 }, (_, i) => {
          const x = 8 + i * 14;
          return (
            <line
              key={`v-${i}`}
              x1={x}
              y1="6"
              x2={x}
              y2="112"
              className="stroke-[var(--border-subtle)]"
              strokeWidth="0.15"
            />
          );
        })}
        {Array.from({ length: 8 }, (_, i) => {
          const y = 8 + i * 13;
          return (
            <line
              key={`h-${i}`}
              x1="6"
              y1={y}
              x2="94"
              y2={y}
              className="stroke-[var(--border-subtle)]"
              strokeWidth="0.15"
            />
          );
        })}
        <rect
          x="8"
          y="10"
          width="56"
          height="78"
          fill="none"
          className="stroke-[color-mix(in_srgb,var(--steel)_55%,transparent)]"
          strokeWidth="0.25"
          strokeDasharray="1.2 1.4"
        />
      </m.svg>

      <svg
        aria-hidden
        viewBox="0 0 100 120"
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full max-md:opacity-70"
      >
        {CROP_MARKS.map((d, index) => (
          <m.path
            key={d}
            d={d}
            fill="none"
            className="stroke-[var(--accent)]"
            strokeWidth="0.45"
            strokeLinecap="square"
            initial={false}
            animate={
              enhance || reducedMotion
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0.2, opacity: 0.6 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    duration: durations.path * 0.55,
                    ease: easings.emphasized,
                    delay: index * 0.05,
                  }
            }
          />
        ))}
      </svg>

      <m.div
        className="relative z-[1] mx-auto w-[min(100%,22rem)] sm:w-[min(100%,26rem)] lg:w-[min(100%,28rem)] lg:-translate-x-1 lg:translate-y-1"
        initial={false}
        animate={
          depthEnabled
            ? { x: depth.x * 0.35, y: depth.y * 0.25 }
            : { x: 0, y: enhance ? 0 : reducedMotion ? 0 : 5 }
        }
        transition={springs.settle}
      >
        <div className="portrait-edge-separation relative overflow-hidden">
          <m.div
            className="origin-top"
            initial={false}
            animate={
              reducedMotion
                ? { clipPath: "inset(0% 0% 0% 0%)", y: 0 }
                : enhance
                  ? { clipPath: "inset(0% 0% 0% 0%)", y: 0 }
                  : { clipPath: "inset(0% 0% 12% 0%)", y: 0 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    duration: durations.sequence * 0.5,
                    ease: easings.emphasized,
                    delay: 0.1,
                  }
            }
          >
            <Image
              src={PORTRAIT.src}
              alt={PORTRAIT.alt}
              width={PORTRAIT.width}
              height={PORTRAIT.height}
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 42vw, 28rem"
              priority
              className="portrait-image relative z-[1] h-auto w-full object-contain object-[center_12%] max-md:max-h-[min(70vh,28rem)] max-md:object-cover max-md:object-[center_18%]"
            />
          </m.div>
        </div>
      </m.div>

      <m.p
        aria-hidden
        className="pointer-events-none absolute top-[8%] right-0 z-[3] hidden max-w-[11rem] text-right font-serif text-[length:var(--text-section)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-balance text-[color-mix(in_srgb,var(--foreground)_88%,transparent)] lg:block xl:max-w-[13rem] xl:text-[length:var(--text-project)]"
        initial={false}
        animate={
          enhance || reducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0.85, y: 0 }
        }
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: durations.slow, ease: easings.entrance, delay: 0.4 }
        }
      >
        {statement}
      </m.p>

      <ul
        aria-hidden
        className="relative z-[3] mt-6 grid grid-cols-2 gap-x-4 gap-y-3 md:absolute md:right-0 md:bottom-[6%] md:mt-0 md:w-[11.5rem] md:grid-cols-1"
      >
        {META_LABELS.map((item, index) => (
          <m.li
            key={item.photo}
            className="border-border-subtle border-l pl-3 font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase"
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    duration: durations.base,
                    ease: easings.entrance,
                    delay: enhance ? 0.48 + index * 0.06 : 0,
                  }
            }
          >
            <span className="text-steel block">{item.photo}</span>
            <span className="text-accent mt-0.5 block tracking-normal normal-case">
              {item.frontend}
            </span>
          </m.li>
        ))}
      </ul>

      <p className="sr-only">
        Portrait composition connecting photography concepts to frontend
        engineering.
      </p>
    </div>
  );
}

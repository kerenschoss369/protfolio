"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

import { scroll as scrollConfig } from "@/lib/animation-config";
import { cn } from "@/lib/cn";

type StickyFeaturedStackProps = {
  children: ReactNode[];
  className?: string;
};

/**
 * Desktop sticky project stack. Scales previous cards slightly as the next
 * enters. Disabled under reduced motion and below stickyMinWidthPx.
 */
export function StickyFeaturedStack({
  children,
  className,
}: StickyFeaturedStackProps) {
  const reducedMotion = useReducedMotion();
  const [enableSticky, setEnableSticky] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      `(min-width: ${scrollConfig.stickyMinWidthPx}px)`,
    );
    const sync = () => setEnableSticky(media.matches && !reducedMotion);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [reducedMotion]);

  if (!enableSticky) {
    return (
      <div
        className={cn("space-y-10 lg:space-y-16", className)}
        data-sticky-stack="off"
      >
        {children}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} data-sticky-stack="on">
      {children.map((child, index) => (
        <StickyStackItem key={index} index={index} total={children.length}>
          {child}
        </StickyStackItem>
      ))}
    </div>
  );
}

type StickyStackItemProps = {
  children: ReactNode;
  index: number;
  total: number;
};

function StickyStackItem({ children, index, total }: StickyStackItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.85], [1, 0.97]);
  const y = useTransform(scrollYProgress, [0, 0.85], [0, -12]);
  const isLast = index === total - 1;

  return (
    <div
      ref={ref}
      className={cn("relative", !isLast && "min-h-[115vh]", isLast && "pb-8")}
      style={{ zIndex: index + 1 }}
    >
      <m.div
        className="sticky top-[calc(var(--header-offset,5.5rem)+0.75rem)] origin-top will-change-transform"
        style={isLast ? undefined : { scale, y }}
      >
        <div className="featured-sticky-card bg-background/95 supports-[backdrop-filter]:bg-background/90 rounded-[var(--radius-lg)] backdrop-blur-[2px]">
          {children}
        </div>
      </m.div>
    </div>
  );
}

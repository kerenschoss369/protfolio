"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useMemo, useRef, type CSSProperties } from "react";

import { cn } from "@/lib/cn";

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

function AnimatedChar({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = Math.min(1, (index + 8) / total);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible" aria-hidden>
        {char}
      </span>
      <m.span style={{ opacity }} className="absolute inset-0">
        {char}
      </m.span>
    </span>
  );
}

/**
 * Character-by-character scroll-driven opacity reveal.
 * Characters are grouped by word so line wraps never split mid-word.
 */
export function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = useMemo(() => text.split(/(\s+)/), [text]);
  const totalChars = text.length;

  if (reducedMotion) {
    return (
      <p ref={ref} className={className} style={style}>
        {text}
      </p>
    );
  }

  let charIndex = 0;

  return (
    <p
      ref={ref}
      className={cn("text-pretty break-normal hyphens-none", className)}
      style={style}
      aria-label={text}
    >
      <span aria-hidden className="inline">
        {words.map((token, wordIndex) => {
          if (/^\s+$/.test(token)) {
            charIndex += token.length;
            return <span key={`space-${wordIndex}`}>{" "}</span>;
          }

          const startIndex = charIndex;
          const chars = Array.from(token);
          charIndex += chars.length;

          return (
            <span
              key={`word-${wordIndex}-${token}`}
              className="inline-block whitespace-nowrap"
            >
              {chars.map((char, i) => (
                <AnimatedChar
                  key={`${startIndex + i}-${char}`}
                  char={char}
                  index={startIndex + i}
                  total={totalChars}
                  progress={scrollYProgress}
                />
              ))}
            </span>
          );
        })}
      </span>
    </p>
  );
}

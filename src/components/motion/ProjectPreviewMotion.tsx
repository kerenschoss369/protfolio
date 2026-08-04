"use client";

import { AnimatePresence, LayoutGroup, m } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import { useElementInView } from "@/hooks/useElementInView";
import { usePageVisibility } from "@/hooks/usePageVisibility";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { durations, springs } from "@/lib/animation-config";
import { cn } from "@/lib/cn";

const NOTE =
  "Repeat CBC in seven days and schedule an oncology follow-up next month.";

const ACTIONS = [
  {
    id: "lab",
    label: "Lab",
    text: "Repeat CBC in seven days",
    evidence: "Repeat CBC in seven days",
    status: "resolved" as const,
  },
  {
    id: "follow-up",
    label: "Follow-up",
    text: "Schedule oncology follow-up next month",
    evidence: "schedule an oncology follow-up next month",
    status: "needs-review" as const,
  },
] as const;

type HighlightId = (typeof ACTIONS)[number]["id"] | null;

export function ClinicalPreviewMotion() {
  const [ref, inView] = useElementInView<HTMLDivElement>({ threshold: 0.25 });
  const reducedMotion = useReducedMotionPreference();
  const [step, setStep] = useState(0);
  const [highlight, setHighlight] = useState<HighlightId>(null);
  const effectiveStep = reducedMotion ? 4 : step;

  useEffect(() => {
    if (!inView || reducedMotion) {
      return;
    }

    const timers = [
      window.setTimeout(() => setStep(1), 400),
      window.setTimeout(() => setStep(2), 1100),
      window.setTimeout(() => setStep(3), 1800),
      window.setTimeout(() => setStep(4), 2600),
    ];
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [inView, reducedMotion]);

  const onHighlight = useCallback((id: HighlightId) => {
    setHighlight(id);
  }, []);

  return (
    <div ref={ref} className="overflow-hidden">
      <div className="border-border-subtle flex items-center justify-between border-b px-4 py-3">
        <Text variant="meta" className="text-steel">
          Fictional note · review workflow
        </Text>
        <Tag variant="warning">Needs review</Tag>
      </div>
      <div className="grid gap-0 md:grid-cols-2">
        <div className="border-border-subtle space-y-3 border-b p-4 md:border-r md:border-b-0">
          <Text variant="meta" className="text-muted">
            Source note
          </Text>
          <p className="font-serif text-[length:var(--text-sm)] leading-[var(--leading-relaxed)]">
            {NOTE.split(
              /(Repeat CBC in seven days|schedule an oncology follow-up next month)/g,
            ).map((part, index) => {
              const action = ACTIONS.find((item) => item.evidence === part);
              if (!action) {
                return <span key={`${part}-${index}`}>{part}</span>;
              }
              const linked =
                highlight === action.id ||
                (effectiveStep >= 1 && highlight === null && effectiveStep < 4);
              return (
                <button
                  key={action.id}
                  type="button"
                  className={cn(
                    "rounded-sm underline decoration-2 underline-offset-4 transition-[background-color,text-decoration-color] duration-[var(--duration-fast)]",
                    linked || effectiveStep >= 1
                      ? "bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] decoration-[var(--accent)]"
                      : "decoration-transparent",
                    highlight === action.id && "bg-accent-muted",
                  )}
                  onMouseEnter={() => onHighlight(action.id)}
                  onMouseLeave={() => onHighlight(null)}
                  onFocus={() => onHighlight(action.id)}
                  onBlur={() => onHighlight(null)}
                >
                  {part}
                </button>
              );
            })}
          </p>
          <Tag variant="steel">Static demonstration</Tag>
          {effectiveStep >= 4 ? (
            <p className="text-muted font-mono text-[length:var(--text-meta)]">
              Architecture: React → Node → Python → OpenAI · Node → SQLite
            </p>
          ) : null}
        </div>
        <div className="space-y-3 p-4">
          <Text variant="meta" className="text-muted">
            Extracted actions
          </Text>
          <ul className="space-y-3">
            {ACTIONS.map((action, index) => {
              const visibleCard =
                reducedMotion || effectiveStep >= 2 + Math.min(index, 1);
              const emphasized =
                highlight === action.id ||
                (highlight === null && visibleCard && effectiveStep >= 2);
              return reducedMotion ? (
                <li
                  key={action.id}
                  className="rounded-[var(--radius-md)] border p-3"
                  onMouseEnter={() => onHighlight(action.id)}
                  onMouseLeave={() => onHighlight(null)}
                  onFocus={() => onHighlight(action.id)}
                  onBlur={() => onHighlight(null)}
                  tabIndex={0}
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Tag
                      variant={
                        action.status === "needs-review" ? "warning" : "success"
                      }
                    >
                      {action.status === "needs-review"
                        ? "Needs review"
                        : effectiveStep >= 3
                          ? "Resolved"
                          : "Pending"}
                    </Tag>
                    <span className="font-mono text-[length:var(--text-meta)] uppercase">
                      {action.label}
                    </span>
                  </div>
                  <p className="text-[length:var(--text-sm)]">{action.text}</p>
                  <p
                    className={cn(
                      "mt-2 font-mono text-[length:var(--text-meta)]",
                      emphasized ? "text-foreground" : "text-muted",
                    )}
                  >
                    Evidence: “{action.evidence}”
                  </p>
                </li>
              ) : (
                <m.li
                  key={action.id}
                  initial={false}
                  animate={{
                    opacity: visibleCard ? 1 : 0.35,
                    y: visibleCard ? 0 : 8,
                    borderColor:
                      highlight === action.id
                        ? "var(--accent)"
                        : "var(--border-subtle)",
                  }}
                  transition={springs.spatial}
                  className="rounded-[var(--radius-md)] border p-3"
                  onMouseEnter={() => onHighlight(action.id)}
                  onMouseLeave={() => onHighlight(null)}
                  onFocus={() => onHighlight(action.id)}
                  onBlur={() => onHighlight(null)}
                  tabIndex={0}
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Tag
                      variant={
                        action.status === "needs-review" ? "warning" : "success"
                      }
                    >
                      {action.status === "needs-review"
                        ? "Needs review"
                        : effectiveStep >= 3
                          ? "Resolved"
                          : "Pending"}
                    </Tag>
                    <span className="font-mono text-[length:var(--text-meta)] uppercase">
                      {action.label}
                    </span>
                  </div>
                  <p className="text-[length:var(--text-sm)]">{action.text}</p>
                  <p
                    className={cn(
                      "mt-2 font-mono text-[length:var(--text-meta)]",
                      emphasized ? "text-foreground" : "text-muted",
                    )}
                  >
                    Evidence: “{action.evidence}”
                  </p>
                </m.li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

const SCHEDULE_A = [
  { id: "alg", day: "Sun", course: "Algorithms", time: "10:00" },
  { id: "db", day: "Mon", course: "Databases", time: "12:00" },
  { id: "hci", day: "Tue", course: "HCI", time: "09:00" },
  { id: "net", day: "Wed", course: "Networks", time: "14:00" },
] as const;

const SCHEDULE_B = [
  { id: "hci", day: "Sun", course: "HCI", time: "11:00" },
  { id: "alg", day: "Mon", course: "Algorithms", time: "09:00" },
  { id: "net", day: "Tue", course: "Networks", time: "13:00" },
  { id: "db", day: "Wed", course: "Databases", time: "15:00" },
] as const;

export function AcademEasePreviewMotion() {
  const [ref, inView] = useElementInView<HTMLDivElement>({ threshold: 0.2 });
  const reducedMotion = useReducedMotionPreference();
  const [schedule, setSchedule] = useState<"A" | "B">("A");
  const [locale, setLocale] = useState<"en" | "he">("en");

  useEffect(() => {
    if (!inView || reducedMotion) {
      return;
    }
    const id = window.setInterval(() => {
      setSchedule((current) => (current === "A" ? "B" : "A"));
    }, 3200);
    return () => window.clearInterval(id);
  }, [inView, reducedMotion]);

  const slots = schedule === "A" ? SCHEDULE_A : SCHEDULE_B;
  const isRtl = locale === "he";

  return (
    <div ref={ref} className="overflow-hidden">
      <div className="border-border-subtle flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
        <Text variant="meta" className="text-steel">
          Schedule grid · EN / HE
        </Text>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={cn(
              "pressable min-h-[var(--touch-target)] rounded-[var(--radius-sm)] border px-2 font-mono text-[length:var(--text-meta)] uppercase",
              schedule === "A"
                ? "border-accent bg-accent-muted text-accent"
                : "border-border-subtle",
            )}
            aria-pressed={schedule === "A"}
            onClick={() => setSchedule("A")}
          >
            Schedule A
          </button>
          <button
            type="button"
            className={cn(
              "pressable min-h-[var(--touch-target)] rounded-[var(--radius-sm)] border px-2 font-mono text-[length:var(--text-meta)] uppercase",
              schedule === "B"
                ? "border-accent bg-accent-muted text-accent"
                : "border-border-subtle",
            )}
            aria-pressed={schedule === "B"}
            onClick={() => setSchedule("B")}
          >
            Schedule B
          </button>
          <button
            type="button"
            className="pressable border-border-subtle min-h-[var(--touch-target)] rounded-[var(--radius-sm)] border px-2 font-mono text-[length:var(--text-meta)] uppercase"
            aria-pressed={isRtl}
            onClick={() =>
              setLocale((current) => (current === "en" ? "he" : "en"))
            }
          >
            {isRtl ? "עברית" : "English"}
          </button>
        </div>
      </div>
      <LayoutGroup>
        <div
          dir={isRtl ? "rtl" : "ltr"}
          lang={isRtl ? "he" : "en"}
          className="grid grid-cols-2 gap-px bg-[var(--border-subtle)] sm:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {slots.map((slot) => (
              <m.div
                key={slot.id}
                layout={!reducedMotion}
                layoutId={reducedMotion ? undefined : `course-${slot.id}`}
                transition={springs.layout}
                className="bg-background min-h-24 space-y-2 p-3"
              >
                <p className="text-muted font-mono text-[length:var(--text-meta)] uppercase">
                  {slot.day}
                </p>
                <p className="text-[length:var(--text-sm)] font-medium">
                  {slot.course}
                </p>
                <p className="text-steel font-mono text-[length:var(--text-meta)]">
                  {slot.time}
                </p>
              </m.div>
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>
      <div className="border-border-subtle flex flex-wrap gap-2 border-t px-4 py-3">
        {["React", "FastAPI", "MongoDB", "RTL"].map((item) => (
          <Tag key={item} variant="default">
            {item}
          </Tag>
        ))}
      </div>
    </div>
  );
}

const TERMINAL_STEPS = [
  { id: "boot", tone: "muted" as const, text: "$ realtime-gpt-cli" },
  { id: "cmd", tone: "user" as const, text: "> 6*7" },
  { id: "ws", tone: "event" as const, text: "ws     connected · event stream" },
  { id: "reader", tone: "event" as const, text: "reader goroutine ← frame" },
  { id: "channel", tone: "event" as const, text: "channel transfer → main" },
  {
    id: "fn",
    tone: "local" as const,
    text: "local  multiply(6, 7) → 42",
  },
  { id: "out", tone: "assistant" as const, text: "assistant  42" },
] as const;

export function TerminalPreviewMotion() {
  const [ref, inView] = useElementInView<HTMLDivElement>({ threshold: 0.25 });
  const visible = usePageVisibility();
  const reducedMotion = useReducedMotionPreference();
  const [animatedCount, setAnimatedCount] = useState(1);
  const intervalRef = useRef<number | null>(null);
  const visibleCount = reducedMotion ? TERMINAL_STEPS.length : animatedCount;

  useEffect(() => {
    if (!inView || !visible || reducedMotion) {
      return;
    }

    let index = 1;
    intervalRef.current = window.setInterval(() => {
      index += 1;
      setAnimatedCount(index);
      if (index >= TERMINAL_STEPS.length && intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 520);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [inView, reducedMotion, visible]);

  function replay() {
    if (reducedMotion) {
      return;
    }
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    setAnimatedCount(1);
    let index = 1;
    intervalRef.current = window.setInterval(() => {
      index += 1;
      setAnimatedCount(index);
      if (index >= TERMINAL_STEPS.length && intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 520);
  }

  return (
    <div ref={ref} className="overflow-hidden font-mono">
      <div className="border-border-subtle flex items-center justify-between border-b px-4 py-3">
        <Text variant="meta" className="text-steel">
          Terminal · event loop
        </Text>
        <div className="flex items-center gap-2">
          <Tag variant="steel">Offline simulation</Tag>
          <button
            type="button"
            className="pressable border-border-subtle min-h-[var(--touch-target)] rounded-[var(--radius-sm)] border px-2 font-mono text-[length:var(--text-meta)] uppercase"
            onClick={replay}
          >
            Replay
          </button>
        </div>
      </div>
      <div className="space-y-2 p-4 text-[length:var(--text-code)] leading-relaxed">
        {TERMINAL_STEPS.slice(0, visibleCount).map((line) => (
          <m.p
            key={line.id}
            initial={reducedMotion ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: durations.fast }}
            className={
              line.tone === "muted"
                ? "text-muted"
                : line.tone === "event"
                  ? "text-steel"
                  : line.tone === "local"
                    ? "text-accent"
                    : "text-foreground"
            }
          >
            {line.text}
          </m.p>
        ))}
      </div>
      <div className="border-border-subtle flex flex-wrap gap-2 border-t px-4 py-3">
        {["function calling", "goroutines", "channels"].map((item) => (
          <Tag key={item} variant="default">
            {item}
          </Tag>
        ))}
      </div>
    </div>
  );
}

const RHYTHM = [
  { id: "p", label: "Perfect", state: "success" as const, judgment: "Perfect" },
  { id: "g", label: "Good", state: "warning" as const, judgment: "Good" },
  { id: "m", label: "Miss", state: "danger" as const, judgment: "Miss" },
] as const;

export function TapTapPreviewMotion() {
  const [ref, inView] = useElementInView<HTMLDivElement>({
    threshold: 0.25,
    once: false,
  });
  const visible = usePageVisibility();
  const reducedMotion = useReducedMotionPreference();
  const [beat, setBeat] = useState(0);
  const [combo, setCombo] = useState(0);
  const displayBeat = reducedMotion ? 2 : beat;
  const displayCombo = reducedMotion ? 2 : combo;

  useEffect(() => {
    if (!inView || !visible || reducedMotion) {
      return;
    }

    const id = window.setInterval(() => {
      setBeat((current) => {
        const next = (current + 1) % RHYTHM.length;
        setCombo((c) => (RHYTHM[next]?.judgment === "Miss" ? 0 : c + 1));
        return next;
      });
    }, 900);
    return () => window.clearInterval(id);
  }, [inView, reducedMotion, visible]);

  return (
    <div ref={ref} className="overflow-hidden">
      <div className="border-border-subtle flex items-center justify-between border-b px-4 py-3">
        <Text variant="meta" className="text-steel">
          Rhythm timing · silent preview
        </Text>
        <Tag variant="steel">No audio</Tag>
      </div>
      <div className="relative flex min-h-44 items-end justify-center gap-4 px-6 pt-10 pb-8 sm:gap-8">
        <div
          aria-hidden
          className="border-border-subtle absolute inset-x-6 top-1/2 border-t border-dashed"
        />
        {RHYTHM.map((hit, index) => {
          const active = displayBeat === index;
          return (
            <div key={hit.id} className="flex flex-col items-center gap-3">
              <m.div
                className="border-border-strong size-10 rounded-full border-2 bg-[color-mix(in_srgb,var(--accent)_18%,var(--background))] sm:size-12"
                animate={
                  active && !reducedMotion
                    ? { scale: 1.12, y: -10 }
                    : { scale: 1, y: index * 4 }
                }
                transition={springs.snappy}
              />
              <Tag variant={hit.state}>{hit.label}</Tag>
            </div>
          );
        })}
        <m.div
          className="absolute top-4 right-6 font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase"
          animate={{
            scale: reducedMotion ? 1 : 1 + Math.min(displayCombo, 6) * 0.02,
          }}
          transition={springs.snappy}
        >
          Combo {displayCombo}
        </m.div>
      </div>
      <div className="border-border-subtle flex flex-wrap gap-2 border-t px-4 py-3">
        {["Unity", "C#", "shaders", "synchronization"].map((item) => (
          <Tag key={item} variant="default">
            {item}
          </Tag>
        ))}
      </div>
    </div>
  );
}

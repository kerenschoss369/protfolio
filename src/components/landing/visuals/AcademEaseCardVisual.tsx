"use client";

import { m, useReducedMotion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/cn";

const SCHEDULE_A = [
  { day: "Sun", course: "Algorithms", time: "10:00" },
  { day: "Mon", course: "Databases", time: "12:00" },
  { day: "Wed", course: "HCI", time: "09:00" },
];

const SCHEDULE_B = [
  { day: "Sun", course: "Algorithms", time: "08:00" },
  { day: "Tue", course: "Networks", time: "14:00" },
  { day: "Thu", course: "HCI", time: "11:00" },
];

const LIBRARY = ["Exams", "Summaries", "Q&A"] as const;

export function AcademEaseCardVisual() {
  const reduced = useReducedMotion();
  const [lang, setLang] = useState<"en" | "he">("en");
  const rtl = lang === "he";

  return (
    <div
      className="border-border-subtle bg-surface-1 flex h-full flex-col gap-4 rounded-[28px] border p-4 sm:p-5"
      dir={rtl ? "rtl" : "ltr"}
      lang={lang}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-muted text-xs font-medium tracking-widest uppercase">
          {rtl ? "בניית מערכת שעות" : "Schedule builder"}
        </p>
        <div
          className="border-border-subtle flex gap-1 rounded-full border p-1"
          role="group"
          aria-label="Language"
        >
          {(
            [
              { code: "en", label: "EN" },
              { code: "he", label: "HE" },
            ] as const
          ).map((option) => (
            <button
              key={option.code}
              type="button"
              aria-pressed={lang === option.code}
              lang={option.code}
              onClick={() => setLang(option.code)}
              className={cn(
                "min-h-11 min-w-11 rounded-full px-3 py-1 text-xs tracking-widest uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
                lang === option.code
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-3">
        {[
          { title: rtl ? "מערכת א" : "Schedule A", rows: SCHEDULE_A },
          { title: rtl ? "מערכת ב" : "Schedule B", rows: SCHEDULE_B },
        ].map((schedule, index) => (
          <m.div
            key={schedule.title}
            initial={
              reduced ? false : { x: index === 0 ? -16 : 16, opacity: 0 }
            }
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="border-border-subtle bg-background rounded-2xl border p-2.5 sm:p-3"
          >
            <p className="text-muted mb-3 text-xs tracking-widest uppercase">
              {schedule.title}
            </p>
            <ul className="space-y-2">
              {schedule.rows.map((row) => (
                <li
                  key={`${schedule.title}-${row.day}`}
                  className="text-foreground grid grid-cols-[2rem_minmax(0,1fr)_auto] items-baseline gap-x-1 text-xs leading-snug sm:flex sm:items-center sm:justify-between sm:gap-2"
                >
                  <span className="text-muted">{row.day}</span>
                  <span className="min-w-0 truncate">{row.course}</span>
                  <span className="text-muted font-mono">{row.time}</span>
                </li>
              ))}
            </ul>
          </m.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {LIBRARY.map((item) => (
          <span
            key={item}
            className="border-border-subtle text-muted rounded-full border px-3 py-1 text-xs tracking-widest uppercase"
          >
            {rtl && item === "Exams"
              ? "מבחנים"
              : rtl && item === "Summaries"
                ? "סיכומים"
                : rtl
                  ? "שאלות"
                  : item}
          </span>
        ))}
      </div>
    </div>
  );
}

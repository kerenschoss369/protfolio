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
  const [lang, setLang] = useState<"EN" | "HE">("EN");
  const rtl = lang === "HE";

  return (
    <div
      className="flex h-full flex-col gap-4 rounded-[28px] border border-[#D7E2EA]/25 bg-[#121212] p-4 sm:p-5"
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-medium tracking-widest text-[#D7E2EA]/55 uppercase">
          {rtl ? "בניית מערכת שעות" : "Schedule builder"}
        </p>
        <div className="flex gap-1 rounded-full border border-[#D7E2EA]/25 p-1">
          {(["EN", "HE"] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={cn(
                "rounded-full px-3 py-1 text-[10px] tracking-widest uppercase transition-colors",
                lang === code
                  ? "bg-[#D7E2EA] text-[#0C0C0C]"
                  : "text-[#D7E2EA]/70 hover:text-[#D7E2EA]",
              )}
            >
              {code}
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
            initial={reduced ? false : { x: index === 0 ? -16 : 16, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="rounded-2xl border border-[#D7E2EA]/20 bg-[#0C0C0C] p-3"
          >
            <p className="mb-3 text-[10px] tracking-widest text-[#D7E2EA]/50 uppercase">
              {schedule.title}
            </p>
            <ul className="space-y-2">
              {schedule.rows.map((row) => (
                <li
                  key={`${schedule.title}-${row.day}`}
                  className="flex items-center justify-between text-xs text-[#D7E2EA]"
                >
                  <span className="opacity-55">{row.day}</span>
                  <span>{row.course}</span>
                  <span className="font-mono opacity-55">{row.time}</span>
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
            className="rounded-full border border-[#D7E2EA]/20 px-3 py-1 text-[10px] tracking-widest text-[#D7E2EA]/75 uppercase"
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

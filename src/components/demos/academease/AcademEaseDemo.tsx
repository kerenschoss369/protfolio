"use client";

import { useId, useState } from "react";

import {
  academeaseUiCopy,
  courseMaterials,
  filterMaterials,
  getSchedule,
  materialFilters,
  summarizeSchedule,
  type AcademEaseLanguage,
  type MaterialFilter,
  type ScheduleId,
} from "@/components/demos/academease/academease-data";
import {
  DemoControls,
  DemoFrame,
  DemoHeader,
  DemoModeButton,
  DemoStatus,
  SimulationNotice,
} from "@/components/demos/shared";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

export function AcademEaseDemo() {
  const titleId = useId();
  const descriptionId = useId();
  const [language, setLanguage] = useState<AcademEaseLanguage>("en");
  const [scheduleId, setScheduleId] = useState<ScheduleId>("A");
  const [filter, setFilter] = useState<MaterialFilter>("all");

  const copy = academeaseUiCopy[language];
  const slots = getSchedule(scheduleId);
  const summary = summarizeSchedule(slots);
  const materials = filterMaterials(courseMaterials, filter);
  const isRtl = language === "he";

  return (
    <DemoFrame
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      minHeightClassName="min-h-[36rem]"
      className="bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent)_7%,var(--background)),var(--surface-1)_40%,var(--background))]"
    >
      <div
        className="space-y-5 p-4 sm:p-5"
        dir={isRtl ? "rtl" : "ltr"}
        lang={language}
      >
        <SimulationNotice label={copy.fictionalNote} />

        <DemoHeader
          title="AcademEase schedule simulation"
          titleId={titleId}
          description="Compare two fictional saved schedules, switch English/Hebrew (RTL), and filter a small course-material set."
          descriptionId={descriptionId}
        />

        <div className="flex flex-wrap gap-2">
          <Tag variant="steel">Portfolio simulation</Tag>
          <Tag variant="default">Fictional data</Tag>
          <Tag variant="accent">{isRtl ? "RTL" : "LTR"}</Tag>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="space-y-3" aria-label={copy.languageLabel}>
            <Text variant="meta" className="text-muted">
              {copy.languageLabel}
            </Text>
            <DemoControls label={copy.languageLabel}>
              <DemoModeButton
                label="English"
                selected={language === "en"}
                onSelect={() => setLanguage("en")}
              />
              <DemoModeButton
                label="עברית"
                selected={language === "he"}
                onSelect={() => setLanguage("he")}
              />
            </DemoControls>
          </section>

          <section className="space-y-3" aria-label={copy.scheduleLabel}>
            <Text variant="meta" className="text-muted">
              {copy.scheduleLabel}
            </Text>
            <DemoControls label={copy.scheduleLabel}>
              <DemoModeButton
                label={copy.scheduleA}
                selected={scheduleId === "A"}
                onSelect={() => setScheduleId("A")}
              />
              <DemoModeButton
                label={copy.scheduleB}
                selected={scheduleId === "B"}
                onSelect={() => setScheduleId("B")}
              />
            </DemoControls>
          </section>
        </div>

        <DemoStatus
          message={`${scheduleId === "A" ? copy.scheduleA : copy.scheduleB} · ${summary.studyDays} ${copy.studyDays.toLowerCase()} · ${copy.earliestStart} ${summary.earliestStart}`}
        />

        <section aria-label={copy.scheduleLabel} className="space-y-3">
          <div className="border-border-subtle bg-background grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border sm:grid-cols-2 md:grid-cols-4">
            {slots.map((slot) => (
              <article
                key={slot.id}
                className="bg-background min-h-[6.5rem] space-y-2 p-3"
              >
                <p className="text-muted font-mono text-[length:var(--text-meta)] uppercase">
                  {copy.days[slot.dayKey]}
                </p>
                <h4 className="text-[length:var(--text-sm)] font-medium text-pretty">
                  {copy.courses[slot.courseKey]}
                </h4>
                <p className="text-steel font-mono text-[length:var(--text-meta)]">
                  {slot.start}–{slot.end}
                </p>
              </article>
            ))}
          </div>

          <aside
            className="border-border-subtle grid gap-3 rounded-[var(--radius-md)] border p-3 sm:grid-cols-2"
            aria-label={copy.summaryLabel}
          >
            <div>
              <Text variant="meta" className="text-muted">
                {copy.studyDays}
              </Text>
              <p className="font-mono text-[length:var(--text-body-lg)]">
                {summary.studyDays}
              </p>
            </div>
            <div>
              <Text variant="meta" className="text-muted">
                {copy.earliestStart}
              </Text>
              <p className="font-mono text-[length:var(--text-body-lg)]">
                {summary.earliestStart}
              </p>
            </div>
            <Text
              variant="small"
              className="text-muted text-pretty sm:col-span-2"
            >
              {copy.summaryLabel}: illustrative comparison only — not production
              AcademEase metrics.
            </Text>
          </aside>
        </section>

        <section className="space-y-3" aria-label={copy.materialsLabel}>
          <Text variant="meta" className="text-muted">
            {copy.materialsLabel}
          </Text>
          <DemoControls label={copy.filterLabel} className="gap-2">
            {materialFilters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
                className={cn(
                  "min-h-[var(--touch-target)] rounded-[var(--radius-md)] border px-3 font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase",
                  "focus-visible:outline-focus-ring focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
                  filter === item
                    ? "border-accent bg-accent-muted text-accent"
                    : "border-border-subtle bg-background hover:bg-surface-1",
                )}
              >
                {copy.filters[item]}
              </button>
            ))}
          </DemoControls>

          {materials.length === 0 ? (
            <p
              role="status"
              className="border-border-subtle rounded-[var(--radius-md)] border border-dashed p-4 text-[length:var(--text-sm)]"
            >
              {copy.emptyMaterials}
            </p>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-2">
              {materials.map((material) => (
                <li
                  key={material.id}
                  className="border-border-subtle rounded-[var(--radius-md)] border px-3 py-3"
                >
                  <Text variant="meta" className="text-steel">
                    {copy.filters[material.kind]}
                  </Text>
                  <p className="mt-1 text-[length:var(--text-sm)] text-pretty">
                    {copy.materialTitles[material.id]}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </DemoFrame>
  );
}

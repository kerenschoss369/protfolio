import { ProjectVisualFrame } from "@/components/case-study/ProjectVisualFrame";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";

const slots = [
  { day: "Sun", course: "Algorithms", time: "10:00" },
  { day: "Mon", course: "Databases", time: "12:00" },
  { day: "Tue", course: "HCI", time: "09:00" },
  { day: "Wed", course: "Networks", time: "14:00" },
] as const;

/**
 * AcademEase visual: schedule grid, materials, multilingual/RTL cues.
 * Interactive schedule simulation belongs to Phase 5.
 */
export function AcademEaseVisual() {
  return (
    <ProjectVisualFrame
      label="Schedule grid · course materials · RTL"
      caption="Conceptual schedule and materials composition. Portfolio simulation only — not a live product session."
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <Tag variant="accent">EN</Tag>
        <Tag variant="default">FR</Tag>
        <Tag variant="steel">HE · RTL</Tag>
      </div>

      <div className="grid grid-cols-2 gap-px bg-[var(--border-subtle)] sm:grid-cols-4">
        {slots.map((slot) => (
          <div key={slot.day} className="bg-background min-h-24 space-y-2 p-3">
            <p className="text-muted font-mono text-[length:var(--text-meta)] uppercase">
              {slot.day}
            </p>
            <p className="text-[length:var(--text-sm)] font-medium">
              {slot.course}
            </p>
            <p className="text-steel font-mono text-[length:var(--text-meta)]">
              {slot.time}
            </p>
          </div>
        ))}
      </div>

      <div className="border-border-subtle mt-4 grid gap-3 border-t pt-4 sm:grid-cols-3">
        {["Past exams", "Summaries", "Q & A"].map((item) => (
          <div
            key={item}
            className="border-border-subtle rounded-[var(--radius-sm)] border px-3 py-2"
          >
            <Text variant="meta" className="text-muted">
              Drive
            </Text>
            <p className="mt-1 text-[length:var(--text-sm)]">{item}</p>
          </div>
        ))}
      </div>
    </ProjectVisualFrame>
  );
}

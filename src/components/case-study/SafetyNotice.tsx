import { Surface } from "@/components/ui/Surface";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type {
  ClinicalSafetyGuarantees,
  SafetyNotice,
} from "@/data/content-types";

type SafetyNoticeProps = {
  /** Flattened safety copy for screen readers and quick reading. */
  note: string;
  notices?: readonly SafetyNotice[];
  clinicalSafety?: ClinicalSafetyGuarantees;
};

export function SafetyNoticePanel({
  note,
  notices,
  clinicalSafety,
}: SafetyNoticeProps) {
  return (
    <Surface
      as="aside"
      variant="raised"
      border="strong"
      padded
      className="space-y-4"
      aria-label="Safety notice"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Tag variant="warning">Safety</Tag>
        {clinicalSafety?.portfolioDemonstration.label ? (
          <Tag variant="steel">
            {clinicalSafety.portfolioDemonstration.label}
          </Tag>
        ) : null}
      </div>

      <Text className="text-pretty">{note}</Text>

      {notices && notices.length > 0 ? (
        <ul className="grid gap-2 sm:grid-cols-2">
          {notices.map((item) => (
            <li
              key={item.id}
              className="border-border-subtle rounded-[var(--radius-sm)] border px-3 py-2 text-[length:var(--text-sm)]"
            >
              {item.statement}
            </li>
          ))}
        </ul>
      ) : null}

      {clinicalSafety ? (
        <div className="border-border-subtle space-y-2 border-t pt-4">
          <Text variant="meta" className="text-muted">
            Validation practices
          </Text>
          <ul className="space-y-2 text-[length:var(--text-sm)]">
            <li>LLM output is treated as untrusted input.</li>
            <li>Node validates AI-service responses with Zod.</li>
            <li>Python validates structured output with Pydantic.</li>
            <li>Evidence is verified against the submitted note.</li>
            <li>Analyze writes note and actions atomically in SQLite.</li>
            <li>Automated tests mock the LLM.</li>
            <li>{clinicalSafety.knownSavedNoteLimitation}</li>
          </ul>
        </div>
      ) : null}
    </Surface>
  );
}

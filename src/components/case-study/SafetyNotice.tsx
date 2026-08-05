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
  /** When true, show compact summary with expandable full notices. */
  compact?: boolean;
};

export function SafetyNoticePanel({
  note,
  notices,
  clinicalSafety,
  compact = false,
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

      {compact ? (
        <>
          <Text className="text-pretty">
            Demonstration system only. Not clinically validated. Not for medical
            decision-making or real patient data. Not HIPAA compliant. Human
            review is mandatory; AI output is never auto-confirmed.
          </Text>
          {clinicalSafety?.knownSavedNoteLimitation ? (
            <Text variant="small" className="text-muted text-pretty">
              {clinicalSafety.knownSavedNoteLimitation}
            </Text>
          ) : null}
          {notices && notices.length > 0 ? (
            <details className="group">
              <summary className="text-muted hover:text-foreground focus-visible:outline-focus-ring cursor-pointer py-2 text-[length:var(--text-sm)] focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]">
                Safety details
              </summary>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {notices.map((item) => (
                  <li
                    key={item.id}
                    className="border-border-subtle rounded-[var(--radius-sm)] border px-3 py-2 text-[length:var(--text-sm)]"
                  >
                    {item.statement}
                  </li>
                ))}
              </ul>
              {clinicalSafety ? (
                <ul className="text-muted mt-4 space-y-2 text-[length:var(--text-sm)]">
                  <li>LLM output is treated as untrusted input.</li>
                  <li>Node validates AI-service responses with Zod.</li>
                  <li>Python validates structured output with Pydantic.</li>
                  <li>Evidence is verified against the submitted note.</li>
                </ul>
              ) : null}
            </details>
          ) : null}
          <span className="sr-only">{note}</span>
        </>
      ) : (
        <>
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
        </>
      )}
    </Surface>
  );
}

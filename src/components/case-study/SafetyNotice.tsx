import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type {
  ClinicalSafetyGuarantees,
  SafetyNotice,
} from "@/data/content-types";

type SafetyNoticeProps = {
  note: string;
  notices?: readonly SafetyNotice[];
  clinicalSafety?: ClinicalSafetyGuarantees;
  compact?: boolean;
};

export function SafetyNoticePanel({
  note,
  notices,
  clinicalSafety,
  compact = false,
}: SafetyNoticeProps) {
  return (
    <aside
      className="border-border-subtle bg-surface-1 space-y-4 rounded-[var(--radius-lg)] border p-5 sm:p-6"
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
          <Text className="text-foreground text-pretty">
            Demonstration system only. Not clinically validated. Not for medical
            decision-making or real patient data. Not HIPAA compliant. Human
            review is mandatory; AI output is never auto-confirmed. Portfolio
            simulation sends no data to OpenAI.
          </Text>
          {clinicalSafety?.knownSavedNoteLimitation ? (
            <Text variant="small" className="text-muted text-pretty">
              {clinicalSafety.knownSavedNoteLimitation}
            </Text>
          ) : null}
          {notices && notices.length > 0 ? (
            <details className="group">
              <summary className="text-muted hover:text-foreground focus-visible:text-foreground cursor-pointer py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]">
                Safety details
              </summary>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {notices.map((item) => (
                  <li
                    key={item.id}
                    className="border-border-subtle text-foreground rounded-xl border px-3 py-2 text-sm"
                  >
                    {item.statement}
                  </li>
                ))}
              </ul>
              {clinicalSafety ? (
                <ul className="text-muted mt-4 space-y-2 text-sm">
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
          <Text className="text-foreground text-pretty">{note}</Text>

          {notices && notices.length > 0 ? (
            <ul className="grid gap-2 sm:grid-cols-2">
              {notices.map((item) => (
                <li
                  key={item.id}
                  className="border-border-subtle text-foreground rounded-xl border px-3 py-2 text-sm"
                >
                  {item.statement}
                </li>
              ))}
            </ul>
          ) : null}

          {clinicalSafety ? (
            <div className="border-border-subtle space-y-2 border-t pt-4">
              <Text variant="meta" className="landing-case-kicker">
                Validation practices
              </Text>
              <ul className="text-foreground space-y-2 text-sm">
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
    </aside>
  );
}

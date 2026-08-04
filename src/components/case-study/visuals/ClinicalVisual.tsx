import { ProjectVisualFrame } from "@/components/case-study/ProjectVisualFrame";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";

/**
 * Clinical visual language: structured note, evidence, review states,
 * architecture boundaries. Not an interactive medical analyzer (Phase 5).
 */
export function ClinicalVisual() {
  return (
    <ProjectVisualFrame
      label="Clinical note · evidence · review"
      caption="Conceptual preview of note-to-action review. Static fictional content only — not a live medical analysis interface."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border-border-subtle space-y-3 rounded-[var(--radius-md)] border p-3">
          <Text variant="meta" className="text-muted">
            Source note
          </Text>
          <p className="font-serif text-[length:var(--text-sm)] leading-[var(--leading-relaxed)] text-pretty">
            Repeat CBC in seven days and schedule an oncology follow-up next
            month.
          </p>
          <Tag variant="steel">Fictional data</Tag>
        </div>

        <div className="space-y-3">
          <Text variant="meta" className="text-muted">
            Extracted actions
          </Text>
          <div className="border-border-subtle space-y-2 rounded-[var(--radius-md)] border p-3">
            <div className="flex flex-wrap gap-2">
              <Tag variant="warning">Needs review</Tag>
              <span className="font-mono text-[length:var(--text-meta)] uppercase">
                Follow-up
              </span>
            </div>
            <p className="text-[length:var(--text-sm)]">
              Schedule oncology follow-up next month
            </p>
            <p className="text-muted font-mono text-[length:var(--text-meta)]">
              Evidence: “schedule an oncology follow-up next month”
            </p>
          </div>
          <div className="border-border-subtle space-y-2 rounded-[var(--radius-md)] border p-3">
            <div className="flex flex-wrap gap-2">
              <Tag variant="success">Pending</Tag>
              <span className="font-mono text-[length:var(--text-meta)] uppercase">
                Lab
              </span>
            </div>
            <p className="text-[length:var(--text-sm)]">
              Repeat CBC in seven days
            </p>
          </div>
        </div>
      </div>

      <div
        className="border-border-subtle mt-4 flex flex-wrap items-center gap-2 border-t pt-4 font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase"
        aria-hidden
      >
        <span>React</span>
        <span className="text-steel">→</span>
        <span>Node</span>
        <span className="text-steel">→</span>
        <span>Python</span>
        <span className="text-steel">→</span>
        <span>OpenAI</span>
        <span className="text-steel mx-1">·</span>
        <span>Node</span>
        <span className="text-steel">→</span>
        <span>SQLite</span>
      </div>
    </ProjectVisualFrame>
  );
}

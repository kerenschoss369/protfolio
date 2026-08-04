import { ProjectVisualFrame } from "@/components/case-study/ProjectVisualFrame";
import { Tag } from "@/components/ui/Tag";

const lines = [
  { tone: "muted", text: "$ realtime-gpt-cli" },
  { tone: "user", text: "> 6*7" },
  { tone: "event", text: "event  conversation.item.create" },
  { tone: "event", text: "event  response.create" },
  { tone: "event", text: "event  function_call  multiply(a, b)" },
  { tone: "local", text: "local  multiply(6, 7) → 42" },
  { tone: "event", text: "event  function_call_output" },
  { tone: "assistant", text: "assistant  42" },
] as const;

/**
 * Realtime CLI visual: terminal structure and event flow.
 * Not a live AI terminal — interactive simulation is Phase 5.
 */
export function RealtimeCliVisual() {
  return (
    <ProjectVisualFrame
      label="Terminal · goroutines · channels"
      caption="Deterministic conceptual terminal preview. Does not contact OpenAI and does not expose an API key."
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <Tag variant="steel">Offline simulation</Tag>
        <Tag variant="default">OPENAI_API_KEY from env</Tag>
      </div>

      <div className="space-y-2 font-mono text-[length:var(--text-code)] leading-relaxed">
        {lines.map((line) => (
          <p
            key={line.text}
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
          </p>
        ))}
      </div>

      <div
        className="border-border-subtle mt-4 grid gap-2 border-t pt-4 sm:grid-cols-3"
        aria-hidden
      >
        {[
          { label: "Reader goroutine", detail: "Decode JSON events" },
          { label: "Channel", detail: "Pass events to main" },
          { label: "Main goroutine", detail: "Requests + consume" },
        ].map((item) => (
          <div
            key={item.label}
            className="border-border-subtle rounded-[var(--radius-sm)] border px-3 py-2"
          >
            <p className="font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
              {item.label}
            </p>
            <p className="text-muted mt-1 text-[length:var(--text-sm)]">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </ProjectVisualFrame>
  );
}

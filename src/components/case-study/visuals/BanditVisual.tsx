import { ProjectVisualFrame } from "@/components/case-study/ProjectVisualFrame";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";

/**
 * Compact Bandit practice visual. No passwords, flags, or solutions.
 */
export function BanditVisual() {
  return (
    <ProjectVisualFrame
      label="Linux · SSH · permissions"
      caption="Engineering-practice summary visual. Challenge solutions and secrets are never published."
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <Tag variant="accent">33 / 33 levels</Tag>
        <Tag variant="steel">No flags published</Tag>
      </div>

      <div
        className="grid grid-cols-11 gap-1 sm:grid-cols-[repeat(33,minmax(0,1fr))]"
        aria-hidden
      >
        {Array.from({ length: 33 }, (_, index) => (
          <div
            key={index}
            className="bg-accent-muted h-2 rounded-sm sm:h-3"
            title={`Level ${index + 1}`}
          />
        ))}
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {[
          "Linux",
          "SSH",
          "Permissions",
          "Shell tools",
          "Text processing",
          "Scripting logic",
          "Security fundamentals",
        ].map((item) => (
          <li key={item}>
            <Tag variant="default">{item}</Tag>
          </li>
        ))}
      </ul>

      <Text variant="small" className="text-muted mt-4 text-pretty">
        Progressive system exploration across all Bandit levels. Passwords,
        flags, and walkthrough commands are intentionally omitted.
      </Text>
    </ProjectVisualFrame>
  );
}

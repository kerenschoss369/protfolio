import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";

type ConfidentialityNoticeProps = {
  note: string;
};

export function ConfidentialityNotice({ note }: ConfidentialityNoticeProps) {
  return (
    <aside
      className="border-border-subtle bg-surface-1 space-y-3 rounded-[var(--radius-lg)] border p-5 sm:p-6"
      aria-label="Confidentiality notice"
    >
      <Tag variant="steel">Confidentiality</Tag>
      <Text className="text-muted text-pretty">{note}</Text>
    </aside>
  );
}

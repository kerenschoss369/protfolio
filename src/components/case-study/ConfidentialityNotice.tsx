import { Surface } from "@/components/ui/Surface";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";

type ConfidentialityNoticeProps = {
  note: string;
};

export function ConfidentialityNotice({ note }: ConfidentialityNoticeProps) {
  return (
    <Surface
      as="aside"
      variant="inset"
      border="steel"
      padded
      className="space-y-3"
      aria-label="Confidentiality notice"
    >
      <Tag variant="steel">Confidentiality</Tag>
      <Text className="text-pretty">{note}</Text>
    </Surface>
  );
}

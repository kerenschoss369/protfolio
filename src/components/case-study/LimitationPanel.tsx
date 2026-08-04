import { Surface } from "@/components/ui/Surface";
import { Text } from "@/components/ui/Text";
import type { KnownLimitation } from "@/data/content-types";

type LimitationPanelProps = {
  limitations: readonly KnownLimitation[];
};

export function LimitationPanel({ limitations }: LimitationPanelProps) {
  if (limitations.length === 0) {
    return null;
  }

  return (
    <Surface variant="inset" border="subtle" padded className="space-y-3">
      <Text variant="meta" className="text-muted">
        Known limitations
      </Text>
      <ul className="space-y-3">
        {limitations.map((item) => (
          <li
            key={item.id}
            className="text-[length:var(--text-sm)] text-pretty"
          >
            {item.detail}
          </li>
        ))}
      </ul>
    </Surface>
  );
}

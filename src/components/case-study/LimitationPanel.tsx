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
    <div className="landing-case-panel space-y-3 p-5 sm:p-6">
      <Text variant="meta" className="landing-case-kicker">
        Known limitations
      </Text>
      <ul className="space-y-3">
        {limitations.map((item) => (
          <li key={item.id} className="text-foreground text-sm text-pretty">
            {item.detail}
          </li>
        ))}
      </ul>
    </div>
  );
}

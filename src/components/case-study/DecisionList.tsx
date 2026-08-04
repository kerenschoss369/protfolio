import { Text } from "@/components/ui/Text";
import type {
  Challenge,
  EngineeringDecision,
  ProjectHighlight,
} from "@/data/content-types";

type DecisionListProps = {
  items: readonly (EngineeringDecision | Challenge | ProjectHighlight)[];
  emptyLabel?: string;
};

export function DecisionList({ items }: DecisionListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li
          key={item.title}
          className="border-border-subtle border-b pb-4 last:border-b-0 last:pb-0"
        >
          <Text as="h3" className="font-medium">
            {item.title}
          </Text>
          <Text
            variant="small"
            className="text-muted mt-2 max-w-[42rem] text-pretty"
          >
            {item.detail}
          </Text>
        </li>
      ))}
    </ul>
  );
}

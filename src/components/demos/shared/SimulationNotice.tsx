import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

type SimulationNoticeProps = {
  label: string;
  details?: readonly string[];
  className?: string;
};

/**
 * Persistent portfolio-simulation label. Every interactive demo must show this.
 */
export function SimulationNotice({
  label,
  details,
  className,
}: SimulationNoticeProps) {
  return (
    <div
      className={cn(
        "border-border-subtle flex flex-wrap items-start gap-2 border-b pb-3",
        className,
      )}
      role="note"
    >
      <Tag variant="steel">Portfolio simulation</Tag>
      <div className="min-w-0 flex-1 space-y-1">
        <Text variant="small" className="text-pretty">
          {label}
        </Text>
        {details && details.length > 0 ? (
          <ul className="text-muted space-y-0.5 text-[length:var(--text-sm)]">
            {details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

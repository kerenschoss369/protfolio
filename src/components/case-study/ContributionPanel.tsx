import { Surface } from "@/components/ui/Surface";
import { Text } from "@/components/ui/Text";
import type { ProjectContribution } from "@/data/content-types";

type ContributionPanelProps = {
  contribution: ProjectContribution;
};

export function ContributionPanel({ contribution }: ContributionPanelProps) {
  return (
    <div className={`grid gap-4 ${contribution.team ? "lg:grid-cols-2" : ""}`}>
      <Surface variant="raised" border="subtle" padded className="space-y-3">
        <Text variant="meta" className="text-steel">
          Keren’s contribution
        </Text>
        <Text className="text-pretty">{contribution.personal.summary}</Text>
        {contribution.personal.items.length > 0 ? (
          <ul className="space-y-2 text-[length:var(--text-sm)]">
            {contribution.personal.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="text-steel">
                  —
                </span>
                <span className="text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </Surface>

      {contribution.team ? (
        <Surface variant="inset" border="steel" padded className="space-y-3">
          <Text variant="meta" className="text-steel">
            Team contribution
          </Text>
          <Text className="text-pretty">{contribution.team.summary}</Text>
          {contribution.team.items.length > 0 ? (
            <ul className="space-y-2 text-[length:var(--text-sm)]">
              {contribution.team.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="text-steel">
                    —
                  </span>
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </Surface>
      ) : null}
    </div>
  );
}

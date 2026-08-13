import { Text } from "@/components/ui/Text";
import type { ProjectContribution } from "@/data/content-types";

type ContributionPanelProps = {
  contribution: ProjectContribution;
};

export function ContributionPanel({ contribution }: ContributionPanelProps) {
  return (
    <div className={`grid gap-4 ${contribution.team ? "lg:grid-cols-2" : ""}`}>
      <div className="landing-case-panel space-y-3 p-5 sm:p-6">
        <Text variant="meta" className="landing-case-kicker">
          Keren’s contribution
        </Text>
        <Text className="text-foreground text-pretty">
          {contribution.personal.summary}
        </Text>
        {contribution.personal.items.length > 0 ? (
          <ul className="text-foreground space-y-2 text-sm">
            {contribution.personal.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="text-foreground/35">
                  —
                </span>
                <span className="text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {contribution.team ? (
        <div className="landing-case-panel space-y-3 p-5 sm:p-6">
          <Text variant="meta" className="landing-case-kicker">
            Team contribution
          </Text>
          <Text className="text-foreground text-pretty">
            {contribution.team.summary}
          </Text>
          {contribution.team.items.length > 0 ? (
            <ul className="text-foreground space-y-2 text-sm">
              {contribution.team.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="text-foreground/35">
                    —
                  </span>
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

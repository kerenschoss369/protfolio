import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { Project } from "@/data/content-types";
import { getProjectTechnologyGroups } from "@/lib/project-utils";

type TechnologyListProps = {
  project: Project;
};

export function TechnologyList({ project }: TechnologyListProps) {
  if (project.technologyStack.length === 0) {
    return null;
  }

  const groups = getProjectTechnologyGroups(project);

  if (groups.length === 0) {
    return (
      <ul className="flex flex-wrap gap-2">
        {project.technologyStack.map((tech) => (
          <li key={tech}>
            <Tag variant="default">{tech}</Tag>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <div key={group.id} className="space-y-2">
          <Text variant="meta" className="text-muted">
            {group.label}
          </Text>
          <ul className="flex flex-wrap gap-2">
            {group.technologies.map((tech) => (
              <li key={tech}>
                <Tag variant="default">{tech}</Tag>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

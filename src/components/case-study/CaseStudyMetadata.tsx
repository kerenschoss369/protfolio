import { ProjectMeta } from "@/components/ui/ProjectMeta";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { Project } from "@/data/content-types";
import {
  getCollaborationLabel,
  isPendingCollaboration,
  isTeamAttributed,
} from "@/lib/project-utils";

type CaseStudyMetadataProps = {
  project: Project;
};

export function CaseStudyMetadata({ project }: CaseStudyMetadataProps) {
  const collaborationLabel = getCollaborationLabel(project.collaboration);

  return (
    <div className="space-y-3">
      <ProjectMeta
        category={project.category}
        dates={project.dates.display}
        stack={project.technologyStack.slice(0, 6)}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Tag
          variant={
            isTeamAttributed(project.collaboration) ? "warning" : "steel"
          }
        >
          {collaborationLabel}
        </Tag>
        {project.kind === "engineering-practice" ? (
          <Tag variant="default">Engineering practice</Tag>
        ) : null}
        {project.kind === "educational-research" ? (
          <Tag variant="default">Educational research</Tag>
        ) : null}
        {project.featured ? <Tag variant="accent">Featured</Tag> : null}
      </div>
      <Text variant="small" className="text-muted max-w-[40rem] text-pretty">
        {project.collaboration.summary}
        {isTeamAttributed(project.collaboration)
          ? " Not sole authorship."
          : null}
        {isPendingCollaboration(project.collaboration)
          ? " Solo authorship is not claimed."
          : null}
      </Text>
    </div>
  );
}

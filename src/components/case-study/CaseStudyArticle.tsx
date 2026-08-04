import { ArchitectureOverview } from "@/components/case-study/ArchitectureOverview";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { ConfidentialityNotice } from "@/components/case-study/ConfidentialityNotice";
import { ContributionPanel } from "@/components/case-study/ContributionPanel";
import { DecisionList } from "@/components/case-study/DecisionList";
import { getProjectVisual } from "@/components/case-study/getProjectVisual";
import { LimitationPanel } from "@/components/case-study/LimitationPanel";
import { ProjectNavigation } from "@/components/case-study/ProjectNavigation";
import { SafetyNoticePanel } from "@/components/case-study/SafetyNotice";
import { TechnologyList } from "@/components/case-study/TechnologyList";
import { hasInteractiveDemo } from "@/components/demos/demo-projects";
import { ProjectDemoSection } from "@/components/demos/ProjectDemoSection";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { Project } from "@/data/content-types";
import { isClinicalFollowUpDetector } from "@/lib/content-validation";
import { getAdjacentProjects } from "@/lib/project-utils";

type CaseStudyArticleProps = {
  project: Project;
};

export function CaseStudyArticle({ project }: CaseStudyArticleProps) {
  const { previous, next } = getAdjacentProjects(project.slug);
  const clinical = isClinicalFollowUpDetector(project)
    ? project.clinicalSafety
    : undefined;

  return (
    <article className="pt-[var(--space-section-sm)] pb-[var(--space-section)]">
      <Container className="space-y-14 lg:space-y-20">
        <CaseStudyHero
          project={project}
          visual={getProjectVisual(project.slug)}
        />

        {project.safetyNote ? (
          <SafetyNoticePanel
            note={project.safetyNote}
            notices={clinical?.notices}
            clinicalSafety={clinical}
          />
        ) : null}

        {project.confidentialityNote ? (
          <ConfidentialityNotice note={project.confidentialityNote} />
        ) : null}

        {hasInteractiveDemo(project.slug) ? (
          <CaseStudySection
            id="interactive-demo"
            title="Interactive demonstration"
            lead="Deterministic local simulation — not a live product session."
          >
            <ProjectDemoSection slug={project.slug} />
          </CaseStudySection>
        ) : null}

        <div className="editorial-grid gap-y-12">
          <div className="col-span-full space-y-12 lg:col-span-7">
            <CaseStudySection id="problem" title="Problem">
              <Text className="max-w-[40rem] text-pretty">
                {project.problem}
              </Text>
            </CaseStudySection>

            <CaseStudySection id="solution" title="Solution">
              <Text className="max-w-[40rem] text-pretty">
                {project.solution}
              </Text>
            </CaseStudySection>

            {project.highlights.length > 0 ? (
              <CaseStudySection id="highlights" title="What the product covers">
                <DecisionList items={project.highlights} />
              </CaseStudySection>
            ) : null}
          </div>

          <aside className="col-span-full space-y-8 lg:col-span-5">
            {project.demonstrates.length > 0 ? (
              <CaseStudySection
                id="demonstrates"
                title="What this demonstrates"
              >
                <ul className="space-y-2">
                  {project.demonstrates.map((item) => (
                    <li
                      key={item}
                      className="border-border-subtle rounded-[var(--radius-md)] border px-3 py-2 text-[length:var(--text-sm)] text-pretty"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CaseStudySection>
            ) : null}

            {"program" in project && project.program ? (
              <CaseStudySection id="program" title="Program context">
                <Text className="text-pretty">{project.program}</Text>
              </CaseStudySection>
            ) : null}
          </aside>
        </div>

        <CaseStudySection id="contribution" title="Contribution">
          <ContributionPanel contribution={project.contribution} />
        </CaseStudySection>

        {(project.architectureHighlights.length > 0 ||
          project.architecture) && (
          <CaseStudySection id="architecture" title="Architecture">
            <ArchitectureOverview
              architecture={project.architecture}
              highlights={project.architectureHighlights}
            />
          </CaseStudySection>
        )}

        {project.technologyStack.length > 0 ? (
          <CaseStudySection id="technology" title="Technology stack">
            <TechnologyList project={project} />
          </CaseStudySection>
        ) : null}

        {project.engineeringDecisions.length > 0 ? (
          <CaseStudySection id="decisions" title="Key engineering decisions">
            <DecisionList items={project.engineeringDecisions} />
          </CaseStudySection>
        ) : null}

        {project.challenges.length > 0 ? (
          <CaseStudySection id="challenges" title="Challenges">
            <DecisionList items={project.challenges} />
          </CaseStudySection>
        ) : null}

        {project.limitations.length > 0 ? (
          <CaseStudySection id="limitations" title="Known limitations">
            <LimitationPanel limitations={project.limitations} />
          </CaseStudySection>
        ) : null}

        {clinical ? (
          <CaseStudySection
            id="reliability"
            title="Validation and reliability"
            lead="Deterministic application rules remain in force even when the LLM is mocked."
          >
            <ul className="flex flex-wrap gap-2">
              {[
                "Zod boundary validation",
                "Pydantic structured output",
                "Evidence checks",
                "Atomic SQLite persistence",
                "Mocked LLM tests",
                "Human review mandatory",
              ].map((item) => (
                <li key={item}>
                  <Tag variant="default">{item}</Tag>
                </li>
              ))}
            </ul>
          </CaseStudySection>
        ) : null}

        <ProjectNavigation previous={previous} next={next} />
      </Container>
    </article>
  );
}

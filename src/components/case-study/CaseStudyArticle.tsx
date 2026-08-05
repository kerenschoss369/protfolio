import { ArchitectureOverview } from "@/components/case-study/ArchitectureOverview";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { ConfidentialityNotice } from "@/components/case-study/ConfidentialityNotice";
import { ContributionPanel } from "@/components/case-study/ContributionPanel";
import { DecisionList } from "@/components/case-study/DecisionList";
import { getProjectVisual } from "@/components/case-study/getProjectVisual";
import { LimitationPanel } from "@/components/case-study/LimitationPanel";
import { ProjectNavigation } from "@/components/case-study/ProjectNavigation";
import { EmbeddedVisualProvider } from "@/components/case-study/ProjectVisualFrame";
import { SafetyNoticePanel } from "@/components/case-study/SafetyNotice";
import { TechnicalDetails } from "@/components/case-study/TechnicalDetails";
import { TechnologyList } from "@/components/case-study/TechnologyList";
import { hasInteractiveDemo } from "@/components/demos/demo-projects";
import { ProjectDemoSection } from "@/components/demos/ProjectDemoSection";
import {
  DeviceMockup,
  deviceVariantForSlug,
} from "@/components/projects/DeviceMockup";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
import type { Project } from "@/data/content-types";
import { isClinicalFollowUpDetector } from "@/lib/content-validation";
import { getAdjacentProjects } from "@/lib/project-utils";
import {
  buildBreadcrumbJsonLd,
  buildProjectJsonLd,
} from "@/lib/structured-data";

type CaseStudyArticleProps = {
  project: Project;
};

export function CaseStudyArticle({ project }: CaseStudyArticleProps) {
  const { previous, next } = getAdjacentProjects(project.slug);
  const clinical = isClinicalFollowUpDetector(project)
    ? project.clinicalSafety
    : undefined;

  const topDecisions = project.engineeringDecisions.slice(0, 3);
  const remainingDecisions = project.engineeringDecisions.slice(3);
  const primaryChallenge = project.challenges[0];
  const primaryLimitation = project.limitations[0];
  const remainingChallenges = project.challenges.slice(1);
  const remainingLimitations = project.limitations.slice(1);

  return (
    <article className="pt-[var(--space-section-sm)] pb-[var(--space-section)]">
      <JsonLd
        data={[
          buildProjectJsonLd(project),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.title, path: `/work/${project.slug}` },
          ]),
        ]}
      />
      <Container className="space-y-16 lg:space-y-24">
        <CaseStudyHero project={project} />

        <DeviceMockup
          variant={deviceVariantForSlug(project.slug)}
          caption={`Conceptual product preview for ${project.title}`}
          className="mx-auto max-w-5xl"
        >
          <EmbeddedVisualProvider>
            {getProjectVisual(project.slug)}
          </EmbeddedVisualProvider>
        </DeviceMockup>

        {project.safetyNote ? (
          <SafetyNoticePanel
            note={project.safetyNote}
            notices={clinical?.notices}
            clinicalSafety={clinical}
            compact
          />
        ) : null}

        {project.confidentialityNote ? (
          <ConfidentialityNotice note={project.confidentialityNote} />
        ) : null}

        <div className="editorial-grid gap-y-10">
          <CaseStudySection
            id="problem"
            title="Problem"
            className="col-span-full lg:col-span-6"
          >
            <Text className="max-w-[36rem] text-pretty">{project.problem}</Text>
          </CaseStudySection>

          <CaseStudySection
            id="solution"
            title="Solution"
            className="col-span-full lg:col-span-6"
          >
            <Text className="max-w-[36rem] text-pretty">
              {project.solution}
            </Text>
          </CaseStudySection>
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

        {topDecisions.length > 0 ? (
          <CaseStudySection id="decisions" title="Key engineering decisions">
            <DecisionList items={topDecisions} />
          </CaseStudySection>
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

        {(primaryChallenge || primaryLimitation) && (
          <div className="editorial-grid gap-y-10">
            {primaryChallenge ? (
              <CaseStudySection
                id="challenge"
                title="Challenge"
                className="col-span-full lg:col-span-6"
              >
                <DecisionList items={[primaryChallenge]} />
              </CaseStudySection>
            ) : null}
            {primaryLimitation ? (
              <CaseStudySection
                id="limitation"
                title="Limitation"
                className="col-span-full lg:col-span-6"
              >
                <LimitationPanel limitations={[primaryLimitation]} />
              </CaseStudySection>
            ) : null}
          </div>
        )}

        <TechnicalDetails>
          {project.technologyStack.length > 0 ? (
            <CaseStudySection id="technology" title="Technology stack">
              <TechnologyList project={project} />
            </CaseStudySection>
          ) : null}

          {project.highlights.length > 0 ? (
            <CaseStudySection id="highlights" title="What the product covers">
              <DecisionList items={project.highlights} />
            </CaseStudySection>
          ) : null}

          {project.demonstrates.length > 0 ? (
            <CaseStudySection id="demonstrates" title="What this demonstrates">
              <ul className="space-y-2">
                {project.demonstrates.map((item) => (
                  <li
                    key={item}
                    className="text-[length:var(--text-sm)] text-pretty"
                  >
                    — {item}
                  </li>
                ))}
              </ul>
            </CaseStudySection>
          ) : null}

          {remainingDecisions.length > 0 ? (
            <CaseStudySection
              id="more-decisions"
              title="Additional engineering decisions"
            >
              <DecisionList items={remainingDecisions} />
            </CaseStudySection>
          ) : null}

          {remainingChallenges.length > 0 ? (
            <CaseStudySection
              id="more-challenges"
              title="Additional challenges"
            >
              <DecisionList items={remainingChallenges} />
            </CaseStudySection>
          ) : null}

          {remainingLimitations.length > 0 ? (
            <CaseStudySection
              id="more-limitations"
              title="Additional limitations"
            >
              <LimitationPanel limitations={remainingLimitations} />
            </CaseStudySection>
          ) : null}

          {"program" in project && project.program ? (
            <CaseStudySection id="program" title="Program context">
              <Text className="text-pretty">{project.program}</Text>
            </CaseStudySection>
          ) : null}
        </TechnicalDetails>

        <ProjectNavigation previous={previous} next={next} />
      </Container>
    </article>
  );
}

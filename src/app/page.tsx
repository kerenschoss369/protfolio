import { AdditionalWorkSection } from "@/components/home/AdditionalWorkSection";
import { ContactCtaSection } from "@/components/home/ContactCtaSection";
import { EngineeringApproachSection } from "@/components/home/EngineeringApproachSection";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { FeaturedWorkSection } from "@/components/home/FeaturedWorkSection";
import { HeroSection } from "@/components/home/HeroSection";
import { SelectedWorkIntro } from "@/components/home/SelectedWorkIntro";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { VisualBackgroundSection } from "@/components/home/VisualBackgroundSection";
import { engineeringPrinciples } from "@/data/engineering-approach";
import { experience } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import { createPageMetadata } from "@/lib/metadata";
import {
  getEngineeringPracticeProjects,
  getEducationalResearchProjects,
  getFeaturedProjects,
} from "@/lib/project-utils";

export const metadata = createPageMetadata();

export default function HomePage() {
  const featured = getFeaturedProjects();
  const additional = [
    ...getEngineeringPracticeProjects(),
    ...getEducationalResearchProjects(),
  ];
  const primaryExperience = experience[0];

  return (
    <>
      <HeroSection />
      <SelectedWorkIntro />
      <FeaturedWorkSection projects={featured} />
      {primaryExperience ? (
        <ExperiencePreview experience={primaryExperience} />
      ) : null}
      <EngineeringApproachSection principles={engineeringPrinciples} />
      <SkillsPreview groups={skillGroups} />
      <VisualBackgroundSection />
      <AdditionalWorkSection projects={additional} />
      <ContactCtaSection />
    </>
  );
}

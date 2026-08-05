import { AboutPreview } from "@/components/home/AboutPreview";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { ContactCtaSection } from "@/components/home/ContactCtaSection";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { FeaturedWorkSection } from "@/components/home/FeaturedWorkSection";
import { HeroSection } from "@/components/home/HeroSection";
import { SelectedWorkIntro } from "@/components/home/SelectedWorkIntro";
import { capabilityGroups } from "@/data/capabilities";
import { experience } from "@/data/experience";
import { createPageMetadata } from "@/lib/metadata";
import { getFeaturedProjects } from "@/lib/project-utils";

export const metadata = createPageMetadata();

export default function HomePage() {
  const featured = getFeaturedProjects();
  const primaryExperience = experience[0];

  return (
    <>
      <HeroSection />
      <SelectedWorkIntro />
      <FeaturedWorkSection projects={featured} />
      {primaryExperience ? (
        <ExperiencePreview experience={primaryExperience} />
      ) : null}
      <AboutPreview />
      <CapabilitiesSection groups={capabilityGroups} />
      <ContactCtaSection />
    </>
  );
}

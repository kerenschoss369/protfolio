import { LandingCaseStudyNav } from "@/components/landing/LandingCaseStudyNav";
import { LandingRoot } from "@/components/landing/LandingRoot";
import { JsonLd } from "@/components/seo/JsonLd";
import { WorkFilters } from "@/components/work/WorkFilters";
import type { Project } from "@/data/content-types";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data";

type WorkIndexProps = {
  projects: readonly Project[];
};

export function WorkIndex({ projects }: WorkIndexProps) {
  return (
    <LandingRoot variant="case">
      <LandingCaseStudyNav />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <div className="landing-measure px-5 pb-24 sm:px-8 sm:pb-28 md:px-10 md:pb-32">
        <header className="pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-16">
          <h1 className="hero-heading landing-case-title">Work</h1>
        </header>

        <WorkFilters projects={projects} />
      </div>
    </LandingRoot>
  );
}

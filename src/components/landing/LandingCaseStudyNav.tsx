import { HomeSectionLink } from "@/components/navigation/HomeSectionLink";

export function LandingCaseStudyNav() {
  return (
    <div className="border-border-subtle border-b">
      <nav aria-label="Back" className="relative z-40 w-full">
        <div className="landing-measure flex w-full items-center px-5 pt-6 sm:px-8 md:px-10 md:pt-8">
          <HomeSectionLink
            section="top"
            className="landing-nav-link inline-flex items-center"
          >
            <span aria-hidden className="me-2">
              ←
            </span>
            Home Page
          </HomeSectionLink>
        </div>
      </nav>
    </div>
  );
}

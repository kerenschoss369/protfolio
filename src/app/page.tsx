import { LandingAboutSection } from "@/components/landing/LandingAboutSection";
import { LandingContactSection } from "@/components/landing/LandingContactSection";
import { LandingHeroSection } from "@/components/landing/LandingHeroSection";
import { LandingRoot } from "@/components/landing/LandingRoot";
import { LandingWorkSection } from "@/components/landing/LandingWorkSection";
import { portfolio } from "@/data/portfolio";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  description: portfolio.heroStatement,
  path: "/",
});

export default function HomePage() {
  return (
    <LandingRoot>
      <LandingHeroSection />
      <LandingWorkSection />
      <LandingAboutSection />
      <LandingContactSection />
    </LandingRoot>
  );
}

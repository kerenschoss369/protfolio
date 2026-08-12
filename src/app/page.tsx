import { LandingAboutSection } from "@/components/landing/LandingAboutSection";
import { LandingContactSection } from "@/components/landing/LandingContactSection";
import { LandingHeroSection } from "@/components/landing/LandingHeroSection";
import { LandingWorkSection } from "@/components/landing/LandingWorkSection";
import type { Metadata } from "next";

import "@/styles/landing.css";

export const metadata: Metadata = {
  title: {
    absolute: "Keren Schoss - Software Developer",
  },
  description:
    "Software developer portfolio — polished interfaces, full-stack systems, and AI-integrated products.",
};

export default function HomePage() {
  return (
    <div className="landing-root">
      <LandingHeroSection />
      <LandingWorkSection />
      <LandingAboutSection />
      <LandingContactSection />
    </div>
  );
}

import type { ReactNode } from "react";

import { BackToTopButton } from "@/components/landing/BackToTopButton";
import { LandingScrollRestore } from "@/components/landing/LandingScrollRestore";
import { kanit, kerenHand } from "@/lib/landing-fonts";
import { cn } from "@/lib/cn";

import "@/styles/landing.css";

type LandingRootProps = {
  children: ReactNode;
  className?: string;
  variant?: "home" | "case";
};

export function LandingRoot({
  children,
  className,
  variant = "home",
}: LandingRootProps) {
  return (
    <div
      id="top"
      className={cn(
        "landing-root",
        variant === "case" && "landing-case",
        kanit.variable,
        kerenHand.variable,
        className,
      )}
    >
      {children}
      <LandingScrollRestore />
      <BackToTopButton />
    </div>
  );
}

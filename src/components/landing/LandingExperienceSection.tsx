import { Fragment } from "react";

import { ConfidentialityNotice } from "@/components/case-study/ConfidentialityNotice";
import { FadeIn } from "@/components/landing/FadeIn";
import {
  landingEducation,
  landingExperience,
} from "@/components/landing/landing-data";

export function LandingExperienceSection() {
  return (
    <section
      id="experience"
      className="landing-experience landing-section-anchor pt-4 pb-16 sm:pb-20 md:pt-8 md:pb-24"
      aria-labelledby="experience-heading"
    >
      <FadeIn y={40} className="border-border-subtle border-t pt-10 md:pt-14">
        <h2
          id="experience-heading"
          className="hero-heading landing-section-title max-w-4xl leading-none font-black tracking-tight uppercase"
        >
          Technical
          <br />
          experience
        </h2>
      </FadeIn>

      <ul className="space-y-0">
        {landingExperience.map((role, index) => (
          <Fragment key={role.id}>
            <FadeIn delay={0.08 * index} y={28} as="li">
              <div
                className={
                  index === 0
                    ? "py-10 md:py-14"
                    : "border-border-subtle border-t py-10 md:py-14"
                }
              >
                <div className="grid gap-6 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:gap-16">
                  <div>
                    <p className="text-muted text-xs tracking-widest uppercase">
                      {role.dates}
                    </p>
                    <h3 className="text-foreground mt-3 text-2xl font-bold md:text-3xl">
                      {role.role}
                    </h3>
                    <p className="text-muted mt-2 text-sm md:text-base">
                      {role.org}
                    </p>
                  </div>
                  <div className="space-y-5">
                    <p className="text-accent text-lg md:text-xl">
                      {role.statement}
                    </p>
                    {role.areas.length > 0 ? (
                      <ul className="flex flex-wrap gap-2">
                        {role.areas.map((area) => (
                          <li
                            key={area}
                            className="border-border-subtle text-muted rounded-full border px-3 py-1 text-xs tracking-widest uppercase"
                          >
                            {area}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {role.technologies.length > 0 ? (
                      <p className="text-muted text-xs tracking-[0.18em] uppercase">
                        {role.technologies.join(" / ")}
                      </p>
                    ) : null}
                    {role.confidentialityNote ? (
                      <ConfidentialityNotice note={role.confidentialityNote} />
                    ) : null}
                  </div>
                </div>
              </div>
            </FadeIn>
            {index === 0 && landingEducation ? (
              <FadeIn delay={0.16} y={28} as="li">
                <div className="border-border-subtle border-t py-10 md:py-14">
                  <p className="text-muted text-sm md:text-base">
                    Took 3 years to complete my
                  </p>
                  <h3 className="text-foreground mt-3 flex flex-wrap items-baseline gap-x-2 text-2xl font-bold md:text-3xl">
                    Computer Science degree
                    <span className="text-muted text-sm font-normal md:text-base">
                      ({landingEducation.dates})
                    </span>
                  </h3>
                </div>
              </FadeIn>
            ) : null}
          </Fragment>
        ))}
      </ul>
    </section>
  );
}

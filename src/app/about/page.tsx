import { engineeringPrinciples } from "@/data/engineering-approach";
import { experience } from "@/data/experience";
import { educationAndResearch, portfolio } from "@/data/portfolio";
import { skillGroups } from "@/data/skills";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "About Keren Schoss — Frontend & Full-Stack Developer with production Angular experience and a photography background.",
  path: "/about",
});

export default function AboutPage() {
  const primaryExperience = experience[0];

  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl space-y-4">
        <h1 className="font-serif text-4xl tracking-tight">About</h1>
        <p className="text-lg leading-7">
          {portfolio.name} is a {portfolio.title} based in {portfolio.location}.
        </p>
        <p className="leading-7 text-[var(--muted)]">
          {portfolio.about.summary}
        </p>
        {portfolio.about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="leading-7 text-[var(--muted)]">
            {paragraph}
          </p>
        ))}
      </header>

      {primaryExperience ? (
        <section className="mt-12 max-w-3xl space-y-4">
          <h2 className="text-2xl tracking-tight">Professional experience</h2>
          <p className="font-medium">
            {primaryExperience.role} — {primaryExperience.organization}
          </p>
          <p className="text-sm text-[var(--muted)]">
            {primaryExperience.productContext} ·{" "}
            {primaryExperience.dates.display}
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6">
            {primaryExperience.workAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <p className="text-sm text-[var(--muted)]">
            {primaryExperience.confidentialityNote}
          </p>
        </section>
      ) : null}

      <section className="mt-12 max-w-3xl space-y-4">
        <h2 className="text-2xl tracking-tight">Background</h2>
        <ul className="space-y-3 text-sm leading-6 text-[var(--muted)]">
          {educationAndResearch.map((item) => (
            <li key={item.id}>
              <p className="font-medium text-[var(--foreground)]">
                {item.title}
                {item.dates ? ` · ${item.dates}` : null}
              </p>
              <p>
                {item.organization}. {item.summary}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-3xl space-y-4">
        <h2 className="text-2xl tracking-tight">Engineering approach</h2>
        <ul className="space-y-3">
          {engineeringPrinciples.map((principle) => (
            <li key={principle.id}>
              <p className="font-medium">{principle.title}</p>
              <p className="text-sm leading-6 text-[var(--muted)]">
                {principle.summary}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 space-y-8">
        <h2 className="text-2xl tracking-tight">Skills</h2>
        {skillGroups.map((group) => (
          <div key={group.id} className="max-w-3xl space-y-3">
            <h3 className="text-lg">{group.label}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-[var(--border-subtle)] px-2 py-1 text-sm"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

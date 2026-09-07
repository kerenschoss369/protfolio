"use client";

import { m } from "motion/react";
import { ArrowUpRight, Download } from "lucide-react";

import { FadeIn } from "@/components/landing/FadeIn";
import { GitHubLogo, LinkedInLogo } from "@/components/landing/BrandLogos";
import { getConfiguredExternalLinks } from "@/data/links";
import { portfolio } from "@/data/portfolio";

type ContactRowProps = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  icon?: React.ReactNode;
  logo?: React.ReactNode;
  delay: number;
};

function ContactRow({
  label,
  value,
  href,
  external,
  icon,
  logo,
  delay,
}: ContactRowProps) {
  return (
    <FadeIn delay={delay} y={24}>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group border-border-subtle hover:border-border-strong focus-visible:border-border-strong relative flex min-h-11 items-center justify-between gap-4 border-t py-5 transition-colors duration-200 sm:py-6 md:py-8"
      >
        <div className="min-w-0">
          <p className="text-muted text-xs font-light tracking-widest uppercase sm:text-sm">
            {label}
          </p>
          <p className="text-foreground mt-2 flex items-center gap-2 text-lg font-medium tracking-tight break-words transition-transform duration-200 group-hover:translate-x-2 group-focus-visible:translate-x-2 sm:text-xl md:text-2xl">
            {logo ? (
              <span className="text-foreground shrink-0">{logo}</span>
            ) : null}
            <span className="min-w-0 break-words">{value}</span>
          </p>
        </div>
        <span className="text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1">
          {icon ?? <ArrowUpRight size={22} aria-hidden />}
        </span>
      </a>
    </FadeIn>
  );
}

function phoneHref(phone: string) {
  return phone.startsWith("tel:")
    ? phone
    : `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function LandingContactSection() {
  const links = getConfiguredExternalLinks();

  return (
    <section
      className="bg-background landing-measure relative flex flex-col justify-between px-5 py-14 sm:px-8 sm:py-20 md:px-10 md:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="relative z-[1]">
        <div id="contact" className="landing-section-anchor">
          <FadeIn delay={0} y={20}>
            <p className="landing-kicker">04 — Contact</p>
          </FadeIn>

          <FadeIn delay={0.1} y={50}>
            <h2
              id="contact-heading"
              className="hero-heading landing-section-title mt-5 w-full leading-[0.85] font-black tracking-tight uppercase sm:mt-6 sm:leading-[0.8]"
            >
              Let&apos;s
              <br />
              Talk
            </h2>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} y={24} className="mt-6 max-w-none sm:mt-8">
          <p
            className="text-foreground leading-relaxed font-light text-pretty"
            style={{ fontSize: "clamp(0.95rem, 3.2vw, 1.4rem)" }}
          >
            Have an opportunity, an interesting project, or just want to say hi?
          </p>
          <p
            className="text-foreground mt-2 leading-relaxed font-light"
            style={{ fontSize: "clamp(0.95rem, 3vw, 1.4rem)" }}
          >
            I&apos;d love to hear from you.
          </p>
        </FadeIn>

        {links.email ? (
          <FadeIn
            delay={0.3}
            y={20}
            className="landing-contact-email mt-8 sm:mt-14"
          >
            <m.a
              href={`mailto:${links.email}`}
              className="group text-foreground relative inline-flex max-w-full items-start gap-2 font-medium tracking-tight sm:items-center sm:gap-3"
              style={{ fontSize: "clamp(1.15rem, 5.5vw, 4.5rem)" }}
              whileHover={{ x: 8 }}
              whileFocus={{ x: 8 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <span className="relative min-w-0 break-all">
                {links.email}
                <span className="bg-foreground absolute bottom-0 left-0 h-px w-0 transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
              </span>
              <ArrowUpRight
                className="mt-1 size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 sm:mt-0 sm:size-7"
                aria-hidden
              />
            </m.a>
          </FadeIn>
        ) : null}
      </div>

      <div className="relative z-[1] mt-16 sm:mt-20">
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {links.phone ? (
            <ContactRow
              label="Phone"
              value={links.phone}
              href={phoneHref(links.phone)}
              delay={0.35}
            />
          ) : null}
          {links.linkedinUrl ? (
            <ContactRow
              label="LinkedIn"
              value="LinkedIn"
              href={links.linkedinUrl}
              external
              logo={<LinkedInLogo />}
              icon={<ArrowUpRight size={20} aria-hidden />}
              delay={0.4}
            />
          ) : null}
          {links.githubUrl ? (
            <ContactRow
              label="GitHub"
              value="kerenschoss369"
              href={links.githubUrl}
              external
              logo={<GitHubLogo />}
              icon={<ArrowUpRight size={20} aria-hidden />}
              delay={0.45}
            />
          ) : null}
          {links.cvPath ? (
            <ContactRow
              label="CV"
              value="Download CV"
              href={links.cvPath}
              icon={<Download size={20} aria-hidden />}
              delay={0.5}
            />
          ) : null}
        </div>
      </div>

      <footer className="border-border-subtle relative z-[1] mt-20 border-t pt-8 sm:mt-24">
        <p className="text-muted text-center text-xs font-light tracking-widest uppercase sm:text-sm">
          © {portfolio.name} {new Date().getFullYear()}
        </p>
      </footer>
    </section>
  );
}

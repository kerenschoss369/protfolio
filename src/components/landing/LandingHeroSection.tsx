"use client";

import Image from "next/image";

import { ContactButton } from "@/components/landing/ContactButton";
import { FadeIn } from "@/components/landing/FadeIn";
import { Magnet } from "@/components/landing/Magnet";
import { getConfiguredExternalLinks } from "@/data/links";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Projects & Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export function LandingHeroSection() {
  const links = getConfiguredExternalLinks();

  return (
    <section
      id="hero"
      className="relative flex h-screen flex-col overflow-x-clip"
      aria-labelledby="hero-heading"
    >
      <FadeIn delay={0} y={-20} as="nav" className="relative z-40" aria-label="Primary">
        <ul className="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium tracking-wider text-[#D7E2EA] uppercase transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            {links.cvPath ? (
              <a
                href={links.cvPath}
                className="text-sm font-medium tracking-wider text-[#D7E2EA] uppercase transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
                download
              >
                Download CV
              </a>
            ) : (
              <span className="text-sm font-medium tracking-wider text-[#D7E2EA]/40 uppercase md:text-lg lg:text-[1.4rem]">
                Download CV
              </span>
            )}
          </li>
        </ul>
      </FadeIn>

      <div className="relative z-10 mt-6 w-full px-3 sm:mt-4 sm:px-4 md:-mt-5 md:px-6">
        <FadeIn delay={0.15} y={40}>
          <h1
            id="hero-heading"
            className="hero-heading w-full text-center leading-none font-black tracking-tight whitespace-nowrap uppercase"
            style={{
              fontSize: "clamp(2.25rem, calc((100vw - 1.5rem) / 7.4), 17.5vw)",
            }}
          >
            Hi, i&apos;m Keren
          </h1>
        </FadeIn>
      </div>

      <FadeIn
        delay={0.6}
        y={30}
        className="pointer-events-none absolute top-[48%] left-1/2 z-30 w-[557px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-[-2%] sm:w-[713px] sm:translate-y-0 md:bottom-[-4%] md:w-[884px] lg:bottom-[-6%] lg:w-[1041px]"
      >
        <div className="pointer-events-auto">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <Image
              src="/images/portrait.jpg"
              alt="Portrait of Keren Schoss"
              width={2082}
              height={2602}
              priority
              className="h-auto w-full object-contain object-bottom select-none [filter:drop-shadow(0_28px_48px_rgba(0,0,0,0.55))_drop-shadow(0_8px_18px_rgba(0,0,0,0.35))]"
              sizes="(max-width: 640px) 557px, (max-width: 768px) 713px, (max-width: 1024px) 884px, 1041px"
            />
          </Magnet>
        </div>
      </FadeIn>

      <div className="relative z-40 mt-auto flex items-end justify-between px-6 pb-7 sm:px-10 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[160px] font-light tracking-wide text-[#D7E2EA] uppercase leading-snug sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            A software developer blending logic, creativity, and a slight
            obsession with getting the details right.
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton href="#contact" />
        </FadeIn>
      </div>
    </section>
  );
}

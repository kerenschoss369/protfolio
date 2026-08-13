"use client";

import Image from "next/image";

import { ContactButton } from "@/components/landing/ContactButton";
import { FadeIn } from "@/components/landing/FadeIn";
import { LandingChromeNav } from "@/components/landing/LandingChromeNav";
import { Magnet } from "@/components/landing/Magnet";
import { portfolio } from "@/data/portfolio";

export function LandingHeroSection() {
  return (
    <section id="hero" className="hero-shell" aria-labelledby="hero-heading">
      <FadeIn delay={0} y={-20}>
        <LandingChromeNav />
      </FadeIn>

      <div className="hero-copy mt-6 w-full px-4 sm:mt-4 sm:px-6 md:px-6">
        <FadeIn delay={0.15} y={40}>
          <h1
            id="hero-heading"
            className="hero-heading w-full text-center leading-none font-black tracking-tight uppercase md:whitespace-nowrap"
            style={{
              fontSize: "clamp(2.1rem, calc((100vw - 2rem) / 8.2), 17.5vw)",
            }}
          >
            Hi, i&apos;m Keren
          </h1>
        </FadeIn>
      </div>

      <div className="hero-copy mt-5 flex flex-col items-start gap-5 px-5 sm:mt-6 sm:flex-row sm:items-end sm:justify-between sm:px-10 md:mt-auto md:pb-10">
        <FadeIn delay={0.35} y={20} className="max-w-md min-w-0">
          <p className="text-foreground text-sm font-medium tracking-wide uppercase sm:text-base">
            {portfolio.title}
          </p>
          <p
            className="text-muted mt-2 max-w-[20rem] leading-snug font-light tracking-wide uppercase sm:max-w-[260px]"
            style={{ fontSize: "clamp(0.75rem, 2.4vw, 1.15rem)" }}
          >
            {portfolio.heroStatement}
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="shrink-0">
          <ContactButton href="#contact" />
        </FadeIn>
      </div>

      <FadeIn delay={0.6} y={30} className="hero-portrait">
        <div className="hero-portrait-magnet">
          <Magnet
            padding={150}
            strength={40}
            maxOffset={4}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <Image
              src="/images/fullbody.webp"
              alt="Portrait of Keren Schoss"
              width={1451}
              height={1084}
              priority
              className="hero-portrait-img h-auto w-full object-contain object-bottom [filter:drop-shadow(0_28px_48px_rgba(0,0,0,0.55))_drop-shadow(0_8px_18px_rgba(0,0,0,0.35))] select-none"
              sizes="(max-width: 767px) 82vw, (max-width: 1024px) 90vw, 70vw"
            />
          </Magnet>
        </div>
      </FadeIn>
    </section>
  );
}

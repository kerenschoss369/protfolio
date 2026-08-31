"use client";

import Image from "next/image";

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

      <div className="hero-title mt-2 w-full px-3 md:mt-4 md:px-6">
        <h1
          id="hero-heading"
          className="hero-heading-text w-full text-center leading-none font-black tracking-tight uppercase md:whitespace-nowrap"
        >
          <FadeIn
            delay={0.15}
            y={40}
            as="span"
            className="hero-heading hero-title-line"
          >
            Hi,
          </FadeIn>{" "}
          <FadeIn
            delay={0.45}
            y={40}
            as="span"
            className="hero-heading hero-title-line"
          >
            i&apos;m Keren
          </FadeIn>
        </h1>
      </div>

      <div className="hero-copy px-5 md:mt-auto md:px-10 md:pb-10">
        <FadeIn delay={1} y={20} className="hero-statement-wrap min-w-0">
          <p className="hero-statement text-muted leading-snug font-light tracking-wide uppercase">
            {portfolio.heroStatement}
          </p>
        </FadeIn>
      </div>

      <div className="hero-portrait">
        <FadeIn delay={1} y={30} className="hero-portrait-magnet">
          <Magnet
            padding={180}
            strength={10}
            maxOffset={22}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <Image
              src="/images/fullbody.png"
              alt="Portrait of Keren Schoss"
              width={1512}
              height={1040}
              priority
              unoptimized
              className="hero-portrait-img h-auto w-full object-contain object-bottom select-none"
              sizes="(max-width: 767px) 82vw, (max-width: 1024px) 90vw, 70vw"
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}

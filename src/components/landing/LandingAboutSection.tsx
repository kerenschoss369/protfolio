"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import { ContactButton } from "@/components/landing/ContactButton";
import { FadeIn } from "@/components/landing/FadeIn";
import { usePointerGlow } from "@/hooks/usePointerGlow";
import { kerenHand } from "@/lib/landing-fonts";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/cn";

const ABOUT_COPY = `${portfolio.about.paragraphs[0]} From 2014 to 2020 I worked as a professional fashion photographer — that craft still guides composition, hierarchy, and pixel-precise implementation.`;

export function LandingAboutSection() {
  const {
    ref: glowRef,
    onPointerMove,
    onPointerLeave,
  } = usePointerGlow<HTMLElement>();
  const [wink, setWink] = useState(false);

  return (
    <section
      id="about"
      ref={glowRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="landing-glow relative flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24"
      aria-labelledby="about-heading"
    >
      <div className="relative z-[1]">
        <FadeIn delay={0} y={40} className="mb-8 sm:mb-12 md:mb-16">
          <p className="landing-kicker mb-3 sm:mb-4">03 — About me</p>
          <h2
            id="about-heading"
            className="hero-heading leading-[0.95] font-black tracking-tight uppercase"
            style={{ fontSize: "clamp(2.35rem, 10vw, 160px)" }}
          >
            Between logic
            <br />
            &amp; creativity
          </h2>
        </FadeIn>

        <div className="grid w-full items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_26rem] xl:gap-14">
          <FadeIn delay={0.1} y={28} className="min-w-0 space-y-6 sm:space-y-8">
            <p
              className={cn(
                kerenHand.className,
                "about-hand-copy text-foreground max-w-none leading-[1.35] text-pretty sm:max-w-[90%] lg:max-w-[70%]",
              )}
              style={{ fontSize: "clamp(1.2rem, 3.8vw, 2rem)" }}
            >
              {ABOUT_COPY}
            </p>

            <p
              className={cn(
                kerenHand.className,
                "about-hand-copy text-muted max-w-none leading-snug sm:max-w-[90%] lg:max-w-none",
              )}
              style={{ fontSize: "clamp(1.15rem, 3.6vw, 2rem)" }}
            >
              P.S. this is my own handwriting converted into a font that you can
              download{" "}
              <a
                href="/fonts/Keren-Schoss-Hand.ttf"
                download="Keren-Schoss-Hand.ttf"
                className="text-foreground underline decoration-[0.08em] underline-offset-4 transition-opacity hover:opacity-80 focus-visible:opacity-80"
              >
                here
              </a>
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <ContactButton
                href="#contact"
                label="Let's talk"
                magnetic={false}
              />
              <Link href="/about" className="landing-nav-link px-0">
                Full about
              </Link>
            </div>
          </FadeIn>

          <FadeIn
            delay={0.2}
            y={36}
            className="relative mx-auto w-full max-w-[14rem] sm:max-w-[18rem] lg:mx-0 lg:w-full lg:max-w-none lg:justify-self-end"
          >
            <button
              type="button"
              className={cn(
                "about-pic-frame group border-foreground bg-surface-1 relative aspect-square w-full overflow-hidden rounded-full border-2 shadow-[0_24px_48px_rgba(0,0,0,0.45)]",
                wink && "is-wink",
              )}
              aria-pressed={wink}
              aria-label="Playful portrait of Keren Schoss"
              onClick={() => setWink((current) => !current)}
            >
              <Image
                src="/images/aboutme.webp"
                alt="Keren Schoss, frontend and full-stack developer"
                width={640}
                height={640}
                className="about-pic-default h-full w-full object-cover object-top transition-opacity duration-200"
                sizes="(max-width: 640px) 14rem, (max-width: 1024px) 18rem, 26rem"
              />
              <Image
                src="/images/aboutme_blink.webp"
                alt=""
                aria-hidden
                width={640}
                height={640}
                className="about-pic-blink pointer-events-none absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-200"
                sizes="(max-width: 640px) 14rem, (max-width: 1024px) 18rem, 26rem"
              />
            </button>
            <p className="about-hand-copy about-pic-hint mt-3 text-center text-sm tracking-wide sm:mt-4 sm:text-base lg:text-right">
              Hover, focus, or tap the pic
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

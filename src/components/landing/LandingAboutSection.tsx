"use client";

import Image from "next/image";
import { useState } from "react";

import { ContactButton } from "@/components/landing/ContactButton";
import { FadeIn } from "@/components/landing/FadeIn";
import { InvertCursor } from "@/components/landing/InvertCursor";
import { Magnet } from "@/components/landing/Magnet";
import { kerenHand } from "@/lib/landing-fonts";
import { cn } from "@/lib/cn";

const ABOUT_COPY =
  "My work sits somewhere between logic and creativity. I'm a software developer who enjoys untangling complex problems, improving the small details, and turning ideas into experiences people actually enjoy using. With a background in photography and design, I naturally think beyond the code and care deeply about the full result.";

export function LandingAboutSection() {
  const [wink, setWink] = useState(false);

  return (
    <section
      className="about-invert-scope landing-measure relative flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24"
      aria-labelledby="about-heading"
      data-about-invert=""
    >
      <InvertCursor color="#ffffff" size={150} />
      <div className="relative z-[1]">
        <FadeIn delay={0} y={40} className="mb-8 sm:mb-12 md:mb-16">
          <div id="about" className="landing-section-anchor">
            <p className="landing-kicker mb-3 sm:mb-4">03 — About me</p>
            <h2
              id="about-heading"
              className="hero-heading landing-section-title leading-[0.95] font-black tracking-tight uppercase"
            >
              Between logic
              <br />
              &amp; creativity
            </h2>
          </div>
        </FadeIn>

        <div className="about-layout grid w-full items-start gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_18rem] xl:gap-14">
          <div className="min-w-0 space-y-6 sm:space-y-8">
            <p
              className={cn(
                kerenHand.className,
                "about-hand-copy text-foreground max-w-none leading-[1.35] text-pretty text-[1.55rem] md:text-[clamp(1.2rem,3.8vw,2.25rem)]",
              )}
            >
              {ABOUT_COPY}
            </p>

            <p
              className={cn(
                kerenHand.className,
                "about-hand-copy about-hand-ps max-w-none leading-snug sm:max-w-[90%] lg:max-w-none text-[1.45rem] md:text-[clamp(1.15rem,3.6vw,2rem)]",
              )}
            >
              P.S. this is my own handwriting converted into a font that you can
              download{" "}
              <a
                href="/fonts/Keren-Schoss-Hand.ttf"
                download="Keren-Schoss-Hand.ttf"
                className="underline decoration-[0.08em] underline-offset-4 transition-opacity hover:opacity-80 focus-visible:opacity-80"
              >
                here
              </a>
            </p>

            <FadeIn delay={0.2} y={20}>
              <ContactButton
                label="Let's talk"
                magnetic={false}
              />
            </FadeIn>
          </div>

          <FadeIn
            delay={0.2}
            y={36}
            className="about-pic-wrap relative mx-auto w-full max-w-[14rem] sm:max-w-[18rem] lg:mx-0 lg:w-full lg:max-w-none lg:justify-self-end"
          >
            <Magnet className="w-full" padding={100} strength={8}>
            <button
              type="button"
              className={cn(
                "about-pic-frame group relative aspect-square w-full overflow-hidden rounded-full border-2 shadow-[0_24px_48px_rgba(0,0,0,0.45)]",
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
                sizes="(max-width: 640px) 14rem, (max-width: 1024px) 18rem, 18rem"
              />
              <Image
                src="/images/aboutme_blink.webp"
                alt=""
                aria-hidden
                width={640}
                height={640}
                unoptimized
                className="about-pic-blink pointer-events-none absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-200"
                sizes="(max-width: 640px) 14rem, (max-width: 1024px) 18rem, 18rem"
              />
            </button>
            <svg
              className="about-pic-hint"
              viewBox="0 0 100 100"
              aria-hidden
            >
              <path
                id="about-pic-hint-arc"
                d="M 8.7 77.5 A 50 50 0 0 0 91.3 77.5"
                fill="none"
              />
              <text className="about-hand-copy">
                <textPath
                  href="#about-pic-hint-arc"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  Hover if you&apos;re curious
                </textPath>
              </text>
            </svg>
            </Magnet>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

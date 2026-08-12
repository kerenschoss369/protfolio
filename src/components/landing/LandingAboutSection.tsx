"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { ContactButton } from "@/components/landing/ContactButton";
import { FadeIn } from "@/components/landing/FadeIn";
import { cn } from "@/lib/cn";
import { kerenHand } from "@/lib/landing-fonts";

const ABOUT_COPY =
  "My work sits somewhere between logic and creativity. I'm a software developer who enjoys untangling complex problems, improving the small details, and turning ideas into experiences people actually enjoy using. With a background in photography and design, I naturally think beyond the code and care deeply about the full result.";

export function LandingAboutSection() {
  const glowRef = useRef<HTMLElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 40, visible: false });

  const onMove = (event: ReactPointerEvent<HTMLElement>) => {
    const el = glowRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setGlow({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
      visible: true,
    });
  };

  return (
    <section
      id="about"
      ref={glowRef}
      onPointerMove={onMove}
      onPointerLeave={() => setGlow((g) => ({ ...g, visible: false }))}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 py-20 sm:px-8 md:px-10"
      aria-labelledby="about-heading"
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-0 transition-opacity duration-500",
          glow.visible ? "opacity-100" : "opacity-0",
        )}
        style={{
          background: `radial-gradient(520px circle at ${glow.x}% ${glow.y}%, rgba(187, 204, 215, 0.08), transparent 55%)`,
        }}
      />

      <div className="relative z-[1]">
        <FadeIn delay={0} y={40} className="mb-12 md:mb-16">
          <p className="mb-4 text-xs font-light tracking-widest text-[#D7E2EA]/60 uppercase sm:text-sm">
            03 — About me
          </p>
          <h2
            id="about-heading"
            className="hero-heading font-black tracking-tight uppercase leading-none"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            Between logic
            <br />
            &amp; creativity
          </h2>
        </FadeIn>

        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_26rem] xl:gap-14">
          <FadeIn delay={0.1} y={28} className="min-w-0 space-y-8">
            <p
              className={cn(
                kerenHand.className,
                "about-hand-copy max-w-[70%] leading-[1.3] text-[#D7E2EA] text-pretty",
              )}
              style={{ fontSize: "2rem" }}
            >
              {ABOUT_COPY}
            </p>

            <p
              className={cn(kerenHand.className, "about-hand-copy leading-snug")}
              style={{
                color: "lab(89.2185% -2.6775 -5.2559 / 0.45)",
                fontSize: "2rem",
              }}
            >
              P.S. this is my own handwriting converted into a font that you can
              download{" "}
              <a
                href="/fonts/Keren-Schoss-Hand.ttf"
                download="Keren-Schoss-Hand.ttf"
                className="underline decoration-[0.08em] underline-offset-4 transition-opacity hover:opacity-80"
                style={{ color: "lab(89.2185% -2.6775 -5.2559 / 0.75)" }}
              >
                here
              </a>
            </p>

            <ContactButton href="#contact" label="Let's talk" magnetic={false} />
          </FadeIn>

          <FadeIn
            delay={0.2}
            y={36}
            className="relative mx-auto w-full max-w-[16rem] sm:max-w-[18rem] lg:mx-0 lg:w-full lg:max-w-none lg:justify-self-end"
          >
            <div className="group relative aspect-square overflow-hidden rounded-full border-2 border-[#D7E2EA] bg-[#121212] shadow-[0_24px_48px_rgba(0,0,0,0.45)]">
              <Image
                src="/images/aboutme.png"
                alt="Portrait of Keren Schoss"
                width={640}
                height={640}
                className="h-full w-full object-cover object-top transition-opacity duration-200 group-hover:opacity-0"
                sizes="(max-width: 640px) 16rem, (max-width: 1024px) 18rem, 26rem"
              />
              <Image
                src="/images/aboutme_blink.png"
                alt=""
                aria-hidden
                width={640}
                height={640}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                sizes="(max-width: 640px) 16rem, (max-width: 1024px) 18rem, 26rem"
              />
            </div>
            <p className="about-hand-copy mt-4 text-center text-base tracking-wide text-[#D7E2EA]/70 lg:text-right">
              Hover the pic
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

"use client";

import { m } from "motion/react";
import {
  ArrowUpRight,
  Download,
  Phone,
} from "lucide-react";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { ContactButton } from "@/components/landing/ContactButton";
import { FadeIn } from "@/components/landing/FadeIn";
import { getConfiguredExternalLinks } from "@/data/links";
import { cn } from "@/lib/cn";

const PHONE_DISPLAY = "+972-54-391-1500";
const PHONE_HREF = "tel:+972543911500";

type ContactRowProps = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  icon?: React.ReactNode;
  delay: number;
};

function ContactRow({
  label,
  value,
  href,
  external,
  icon,
  delay,
}: ContactRowProps) {
  return (
    <FadeIn delay={delay} y={24}>
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="group relative flex items-center justify-between gap-4 border-t border-[#D7E2EA]/20 py-5 transition-colors duration-200 hover:border-[#D7E2EA]/50 sm:py-6 md:py-8"
      >
        <div className="min-w-0">
          <p className="text-xs font-light tracking-widest text-[#D7E2EA]/55 uppercase transition-opacity duration-200 group-hover:opacity-100 sm:text-sm">
            {label}
          </p>
          <p className="mt-2 truncate text-lg font-medium tracking-tight text-[#D7E2EA] transition-transform duration-200 group-hover:translate-x-2 sm:text-xl md:text-2xl">
            {value}
          </p>
        </div>
        <span className="text-[#D7E2EA]/70 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
          {icon ?? <ArrowUpRight size={22} aria-hidden />}
        </span>
      </a>
    </FadeIn>
  );
}

export function LandingContactSection() {
  const links = getConfiguredExternalLinks();
  const glowRef = useRef<HTMLDivElement>(null);
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
      id="contact"
      ref={glowRef}
      onPointerMove={onMove}
      onPointerLeave={() => setGlow((g) => ({ ...g, visible: false }))}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#0C0C0C] px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24"
      aria-labelledby="contact-heading"
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-500",
          glow.visible ? "opacity-100" : "opacity-0",
        )}
        style={{
          background: `radial-gradient(520px circle at ${glow.x}% ${glow.y}%, rgba(187, 204, 215, 0.08), transparent 55%)`,
        }}
      />

      <div className="relative z-[1]">
        <FadeIn delay={0} y={20}>
          <p className="text-xs font-light tracking-widest text-[#D7E2EA]/60 uppercase sm:text-sm">
            04 — Contact
          </p>
        </FadeIn>

        <FadeIn delay={0.1} y={50}>
          <h2
            id="contact-heading"
            className="hero-heading mt-6 w-full font-black tracking-tight uppercase leading-[0.8]"
            style={{ fontSize: "clamp(4.5rem, 15vw, 220px)" }}
          >
            Let&apos;s
            <br />
            Talk
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={24} className="mt-8 max-w-none">
          <p
            className="whitespace-nowrap font-light leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: "clamp(0.7rem, 2.1vw, 1.4rem)" }}
          >
            Have an opportunity, an interesting project, or just want to say
            hi?
          </p>
          <p
            className="mt-2 font-light leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.4rem)" }}
          >
            I&apos;d love to hear from you.
          </p>
        </FadeIn>

        {links.email ? (
          <FadeIn delay={0.3} y={20} className="mt-10 sm:mt-14">
            <m.a
              href={`mailto:${links.email}`}
              className="group relative inline-flex max-w-full items-center gap-3 font-medium tracking-tight text-[#D7E2EA]"
              style={{ fontSize: "clamp(1.4rem, 4vw, 4.5rem)" }}
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <span className="relative break-all">
                {links.email}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#D7E2EA] transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowUpRight
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden
              />
            </m.a>
          </FadeIn>
        ) : null}
      </div>

      <div className="relative z-[1] mt-16 sm:mt-20">
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <ContactRow
            label="Phone"
            value={PHONE_DISPLAY}
            href={PHONE_HREF}
            icon={<Phone size={20} aria-hidden />}
            delay={0.35}
          />
          {links.linkedinUrl ? (
            <ContactRow
              label="LinkedIn"
              value="LinkedIn"
              href={links.linkedinUrl}
              external
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

        <div className="mt-16 flex justify-start sm:mt-20 md:mt-24">
          <FadeIn delay={0.55} y={20}>
            <ContactButton
              href={links.email ? `mailto:${links.email}` : "#contact"}
              label="Send an Email"
            />
          </FadeIn>
        </div>
      </div>

      <footer className="relative z-[1] mt-20 border-t border-[#D7E2EA]/20 pt-8 sm:mt-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-light tracking-widest text-[#D7E2EA]/60 uppercase sm:text-sm">
            © Keren Schoss 2026
          </p>
          <p className="text-xs font-light tracking-widest text-[#D7E2EA]/60 uppercase sm:text-sm">
            Software Developer — Tel Aviv
          </p>
          <a
            href="#hero"
            className="text-xs font-light tracking-widest text-[#D7E2EA]/60 uppercase transition-opacity duration-200 hover:opacity-100 sm:text-sm"
          >
            Back to Top ↑
          </a>
        </div>
      </footer>
    </section>
  );
}

"use client";

import dynamic from "next/dynamic";

import type { DemoProjectSlug } from "@/components/demos/demo-projects";
import { DemoErrorBoundary } from "@/components/demos/shared/DemoErrorBoundary";
import { DemoLoadingFallback } from "@/components/demos/shared/DemoLoadingFallback";

const ClinicalDemo = dynamic(
  () =>
    import("@/components/demos/clinical/ClinicalDemo").then((mod) => ({
      default: mod.ClinicalDemo,
    })),
  {
    loading: () => <DemoLoadingFallback kind="clinical" />,
  },
);

const RealtimeTerminalDemo = dynamic(
  () =>
    import("@/components/demos/terminal/RealtimeTerminalDemo").then((mod) => ({
      default: mod.RealtimeTerminalDemo,
    })),
  {
    loading: () => <DemoLoadingFallback kind="terminal" />,
  },
);

const AcademEaseDemo = dynamic(
  () =>
    import("@/components/demos/academease/AcademEaseDemo").then((mod) => ({
      default: mod.AcademEaseDemo,
    })),
  {
    loading: () => <DemoLoadingFallback kind="academease" />,
  },
);

const TapTapDemo = dynamic(
  () =>
    import("@/components/demos/taptap/TapTapDemo").then((mod) => ({
      default: mod.TapTapDemo,
    })),
  {
    loading: () => <DemoLoadingFallback kind="taptap" />,
  },
);

type ProjectDemoSectionProps = {
  slug: DemoProjectSlug;
};

/**
 * Dynamically loads the matching project demonstration.
 * Heavy demo code is not included on routes that do not need it.
 */
export function ProjectDemoSection({ slug }: ProjectDemoSectionProps) {
  let demo = null;

  switch (slug) {
    case "clinical-follow-up-detector":
      demo = <ClinicalDemo />;
      break;
    case "realtime-gpt-cli":
      demo = <RealtimeTerminalDemo />;
      break;
    case "academease":
      demo = <AcademEaseDemo />;
      break;
    case "taptap-avengers":
      demo = <TapTapDemo />;
      break;
    default:
      demo = null;
  }

  if (!demo) return null;

  return <DemoErrorBoundary>{demo}</DemoErrorBoundary>;
}

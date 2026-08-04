import type { ReactNode } from "react";

import { AcademEaseVisual } from "@/components/case-study/visuals/AcademEaseVisual";
import { AtlasVisual } from "@/components/case-study/visuals/AtlasVisual";
import { BanditVisual } from "@/components/case-study/visuals/BanditVisual";
import { ClinicalVisual } from "@/components/case-study/visuals/ClinicalVisual";
import { RealtimeCliVisual } from "@/components/case-study/visuals/RealtimeCliVisual";
import { TapTapVisual } from "@/components/case-study/visuals/TapTapVisual";
import type { ProjectSlug } from "@/data/content-types";

export function getProjectVisual(slug: ProjectSlug): ReactNode {
  switch (slug) {
    case "clinical-follow-up-detector":
      return <ClinicalVisual />;
    case "academease":
      return <AcademEaseVisual />;
    case "realtime-gpt-cli":
      return <RealtimeCliVisual />;
    case "taptap-avengers":
      return <TapTapVisual />;
    case "overthewire-bandit":
      return <BanditVisual />;
    case "atlas-research":
      return <AtlasVisual />;
  }
}

import { ProjectVisualFrame } from "@/components/case-study/ProjectVisualFrame";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";

/**
 * ATLAS research visual: abstract data-analysis motif.
 * No fabricated scientific result charts or discovery claims.
 */
export function AtlasVisual() {
  const bars = [28, 36, 44, 52, 61, 48, 39, 33, 29, 26] as const;

  return (
    <ProjectVisualFrame
      label="Invariant-mass analysis · abstract"
      caption="Abstract data-analysis composition for educational research context. Not a scientific result chart and not a discovery claim."
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <Tag variant="steel">Educational research</Tag>
        <Tag variant="default">C++</Tag>
      </div>

      <div className="flex h-36 items-end gap-1.5 sm:gap-2" aria-hidden>
        {bars.map((height, index) => (
          <div
            key={index}
            className="w-full rounded-t-sm bg-[color-mix(in_srgb,var(--steel)_35%,var(--surface-2))]"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      <div className="border-border-subtle mt-4 space-y-2 border-t pt-4">
        <Text variant="meta" className="text-muted">
          Program context
        </Text>
        <Text variant="small" className="text-pretty">
          Alpha Research Program in the Sciences at Tel Aviv University — ATLAS
          two-photon invariant-mass analysis related to evidence for the Higgs
          boson.
        </Text>
        <Text variant="small" className="text-muted text-pretty">
          Does not imply discovery credit, CERN employment, publication
          authorship, or a new scientific result.
        </Text>
      </div>
    </ProjectVisualFrame>
  );
}

import { ProjectVisualFrame } from "@/components/case-study/ProjectVisualFrame";
import { Tag } from "@/components/ui/Tag";

const hits = [
  { label: "Perfect", state: "success" as const },
  { label: "Good", state: "warning" as const },
  { label: "Miss", state: "danger" as const },
] as const;

/**
 * TapTap visual: rhythm lanes and timing feedback.
 * No Marvel characters, copyrighted music, or unlicensed assets.
 */
export function TapTapVisual() {
  return (
    <ProjectVisualFrame
      label="Rhythm lanes · timing · beat map"
      caption="Abstract rhythm composition. Silent conceptual preview — no copyrighted audio or character art."
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <Tag variant="steel">No audio</Tag>
        <Tag variant="default">Unity · C# · ShaderLab</Tag>
      </div>

      <div className="relative flex min-h-40 items-end justify-center gap-5 px-2 pt-8 pb-6 sm:gap-10">
        <div
          aria-hidden
          className="border-border-subtle absolute inset-x-2 top-1/2 border-t border-dashed"
        />
        {hits.map((hit, index) => (
          <div
            key={hit.label}
            className="relative flex flex-col items-center gap-3"
            style={{ transform: `translateY(${index * 4}px)` }}
          >
            <div
              aria-hidden
              className="border-border-strong size-10 rounded-full border-2 bg-[color-mix(in_srgb,var(--accent)_16%,var(--background))] sm:size-12"
            />
            <div
              aria-hidden
              className="bg-border-strong absolute top-12 h-16 w-px sm:top-14"
            />
            <Tag variant={hit.state} className="mt-14 sm:mt-16">
              {hit.label}
            </Tag>
          </div>
        ))}
      </div>

      <div
        className="border-border-subtle mt-2 flex flex-wrap gap-2 border-t pt-4"
        aria-hidden
      >
        {["Beat mapping", "Scoring", "Multiplayer", "Song select"].map(
          (item) => (
            <Tag key={item} variant="default">
              {item}
            </Tag>
          ),
        )}
      </div>
    </ProjectVisualFrame>
  );
}

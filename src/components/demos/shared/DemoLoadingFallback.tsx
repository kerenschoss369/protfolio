import { SimulationNotice } from "@/components/demos/shared/SimulationNotice";
import { Surface } from "@/components/ui/Surface";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

export type DemoLoadingKind = "clinical" | "terminal" | "academease" | "taptap";

const loadingCopy: Record<
  DemoLoadingKind,
  { title: string; notice: string; skeleton: string }
> = {
  clinical: {
    title: "Loading clinical simulation",
    notice:
      "Static portfolio demonstration only — fictional data, no medical submission.",
    skeleton: "Note · actions · architecture",
  },
  terminal: {
    title: "Loading terminal simulation",
    notice: "Local portfolio simulation — no OpenAI connection or API key.",
    skeleton: "Prompt · events · function calls",
  },
  academease: {
    title: "Loading schedule simulation",
    notice:
      "Portfolio simulation — fictional courses only, no student accounts.",
    skeleton: "Schedule · language · materials",
  },
  taptap: {
    title: "Loading rhythm simulation",
    notice:
      "Silent portfolio timing exercise — no audio, no copyrighted assets.",
    skeleton: "Lanes · timing · score",
  },
};

type DemoLoadingFallbackProps = {
  kind: DemoLoadingKind;
  className?: string;
};

/**
 * Project-specific loading shell that reserves space (no spinner-only UX).
 */
export function DemoLoadingFallback({
  kind,
  className,
}: DemoLoadingFallbackProps) {
  const copy = loadingCopy[kind];

  return (
    <Surface
      variant="inset"
      border="steel"
      className={cn("min-h-[28rem] overflow-hidden", className)}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="space-y-4 p-4 sm:p-5">
        <SimulationNotice label={copy.notice} />
        <div className="space-y-2">
          <Text variant="meta" className="text-steel">
            {copy.title}
          </Text>
          <Text variant="small" className="text-muted">
            Preparing {copy.skeleton}. Case-study content stays readable while
            this loads.
          </Text>
        </div>
        <div className="space-y-3" aria-hidden>
          <div className="bg-surface-2 h-10 w-2/3 max-w-sm rounded-[var(--radius-md)]" />
          <div className="bg-surface-2 h-32 rounded-[var(--radius-md)]" />
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="bg-surface-2 h-24 rounded-[var(--radius-md)]" />
            <div className="bg-surface-2 h-24 rounded-[var(--radius-md)]" />
          </div>
        </div>
      </div>
    </Surface>
  );
}

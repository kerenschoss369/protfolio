import { cn } from "@/lib/cn";

type Relationship = {
  id: string;
  text: string;
};

type ArchitectureNodeButtonProps = {
  id: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
  relationships: readonly Relationship[];
};

export function ArchitectureNodeButton({
  id,
  label,
  selected,
  onSelect,
  relationships,
}: ArchitectureNodeButtonProps) {
  return (
    <button
      type="button"
      id={id}
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "w-full rounded-[var(--radius-md)] border px-3 py-3 text-start transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        "focus-visible:outline-focus-ring min-h-[var(--touch-target)] focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
        selected
          ? "border-accent bg-accent-muted"
          : "hover:bg-surface-1 border-transparent",
        "pressable",
      )}
    >
      <span className="font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
        {label}
      </span>
      {relationships.length > 0 ? (
        <ul className="text-steel mt-1 space-y-0.5 text-[length:var(--text-meta)]">
          {relationships.map((rel) => (
            <li key={rel.id}>{rel.text}</li>
          ))}
        </ul>
      ) : null}
    </button>
  );
}

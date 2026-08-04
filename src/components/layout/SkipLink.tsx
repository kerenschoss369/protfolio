export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="bg-accent text-accent-contrast absolute top-3 left-3 z-[var(--z-skip-link)] -translate-y-[200%] rounded-[var(--radius-md)] px-4 py-2 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus:translate-y-0"
    >
      Skip to main content
    </a>
  );
}

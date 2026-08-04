import type { ReactNode } from "react";

/**
 * Remounts on client navigations so restrained route-enter CSS can run.
 * Header/footer live in the layout and do not remount.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="route-enter">{children}</div>;
}

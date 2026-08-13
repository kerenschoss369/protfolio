import { LiveProjectButton } from "@/components/landing/LiveProjectButton";
import { isConfiguredHttpUrl } from "@/lib/links";
import type { ConfigurableUrl } from "@/data/content-types";

type ProjectLinkActionsProps = {
  repositoryUrl: ConfigurableUrl;
  liveUrl: ConfigurableUrl;
};

/**
 * Renders repository / live-demo actions only when URLs are configured.
 * Never renders disabled fake buttons for missing links.
 */
export function ProjectLinkActions({
  repositoryUrl,
  liveUrl,
}: ProjectLinkActionsProps) {
  const hasRepository = isConfiguredHttpUrl(repositoryUrl);
  const hasLive = isConfiguredHttpUrl(liveUrl);

  if (!hasRepository && !hasLive) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {hasRepository ? (
        <LiveProjectButton
          href={repositoryUrl}
          label="View repository ↗"
          external
        />
      ) : null}
      {hasLive ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="landing-case-link-btn landing-case-link-btn-filled"
        >
          Live demo ↗
        </a>
      ) : null}
    </div>
  );
}

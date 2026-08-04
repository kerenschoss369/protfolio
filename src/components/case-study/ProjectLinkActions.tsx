import { ButtonLink } from "@/components/ui/ButtonLink";
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
        <ButtonLink href={repositoryUrl} external variant="secondary" size="sm">
          View repository
        </ButtonLink>
      ) : null}
      {hasLive ? (
        <ButtonLink href={liveUrl} external variant="primary" size="sm">
          Live demo
        </ButtonLink>
      ) : null}
    </div>
  );
}

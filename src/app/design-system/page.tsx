import { notFound } from "next/navigation";

import { DesignSystemPreview } from "@/components/design-system/DesignSystemPreview";
import { createPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Design system",
  description: "Internal design-system preview for development use only.",
  path: "/design-system",
});

export default function DesignSystemPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return <DesignSystemPreview />;
}

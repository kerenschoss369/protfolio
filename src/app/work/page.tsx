import { WorkIndex } from "@/components/work/WorkIndex";
import { createPageMetadata } from "@/lib/metadata";
import { getAllProjects } from "@/lib/project-utils";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Selected software projects by Keren Schoss spanning full-stack products, AI systems, game development, engineering practice, and production frontend work.",
  path: "/work",
});

export default function WorkPage() {
  const projects = getAllProjects();

  return <WorkIndex projects={projects} />;
}

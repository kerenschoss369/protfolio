import { WorkIndex } from "@/components/work/WorkIndex";
import { experience } from "@/data/experience";
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
  const professional = experience[0];

  if (!professional) {
    throw new Error("Professional experience content is required");
  }

  return <WorkIndex projects={projects} experience={professional} />;
}

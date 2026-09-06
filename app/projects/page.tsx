import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectBrowser } from "@/components/projects/project-browser";
import { getProjects } from "@/lib/content";

export const dynamic = "force-dynamic";
export default async function ProjectsPage() {
  const projects = await getProjects();
  return <><PageHero eyebrow="Projects" title="Work with a point of view and a job to do." text="A selection of digital experiences designed to make businesses clearer, more useful, and more distinct." /><section className="py-14 sm:py-20"><Container><ProjectBrowser projects={projects} /></Container></section></>;
}

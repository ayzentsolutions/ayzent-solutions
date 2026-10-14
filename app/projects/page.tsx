import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectBrowser } from "@/components/projects/project-browser";
import { getProjects } from "@/lib/content";

export const dynamic = "force-dynamic";
export default async function ProjectsPage() {
  const projects = await getProjects();
  return <><PageHero eyebrow="Projects" title="Work with a point of view and a job to do." text="A selection of digital experiences designed to make businesses clearer, more useful, and more distinct." /><section className="py-12 sm:py-20 lg:py-24"><Container><div className="mb-8 border-b border-line pb-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">The portfolio</p><p className="mt-2 text-sm text-muted">{projects.length} {projects.length === 1 ? "project" : "projects"} to explore</p></div><ProjectBrowser projects={projects} /></Container></section></>;
}

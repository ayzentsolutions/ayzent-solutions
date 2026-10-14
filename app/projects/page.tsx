import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectBrowser } from "@/components/projects/project-browser";
import { getProjects } from "@/lib/content";
export const dynamic = "force-dynamic";
export default async function ProjectsPage() {
  const projects = await getProjects();
  return <><PageHero eyebrow="Selected work / 02" title="Proof is in the details." text="Browse the projects currently in the Ayzent portfolio." primaryText="Start a project" primaryLink="/contact"/>
    <section className="bg-[#0D1423] py-10 text-[#E2E8F0] sm:py-16 lg:py-24"><Container><div className="mb-8 grid gap-5 border-b border-[#27344A] pb-6 sm:grid-cols-[1fr_auto] sm:items-end"><div><p className="eyebrow text-[#477BFF]">Portfolio archive</p><h2 className="mt-4 font-display text-3xl sm:text-4xl">Selected projects</h2></div><p className="text-sm text-[#94A3B8]">{projects.length} {projects.length === 1 ? "project" : "projects"} available</p></div><ProjectBrowser projects={projects}/></Container></section>
    <section className="bg-[#080D18] py-14 text-[#E2E8F0] sm:py-20"><Container className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><p className="max-w-2xl font-display text-3xl leading-tight sm:text-4xl">Every project starts with a better question.</p><a href="/contact" className="inline-flex min-h-11 items-center gap-2 text-sm text-[#6792FF] hover:text-white">Talk with the studio ↗</a></Container></section></>;
}

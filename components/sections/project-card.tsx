import Link from "next/link";
import type { Project } from "@/lib/site-data";

export function ProjectCard({ project }: { project: Project }) {
  return <Link href={`/projects/${project.slug}`} className="group block"><div className={`aspect-[16/10] ${project.accent || "bg-gold"} p-6 transition-transform duration-300 group-hover:-translate-y-1 sm:p-8`}><div className="flex h-full flex-col justify-between"><span className="text-xs font-medium uppercase tracking-[0.15em] text-ink/70">{project.category}</span><span className="font-display text-3xl font-semibold text-ink sm:text-4xl">{project.name}</span></div></div><div className="pt-4"><p className="text-sm leading-relaxed text-muted">{project.summary || project.overview}</p><span className="mt-3 inline-block text-sm text-foreground group-hover:text-gold">View project →</span></div></Link>;
}

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/site-data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group fx-hover-card block focus-visible:outline-offset-4">
      <div className="fx-card-media relative aspect-[16/10] overflow-hidden border border-[#27344A] bg-[#131D30]">
        {project.coverImage ? <Image src={project.coverImage} alt={project.name} fill sizes="(max-width: 768px) 100vw, 50vw" quality={82} className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]" /> : <div aria-hidden="true" className="absolute inset-0 bg-[#0D1423]" />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080D18]/95 via-[#080D18]/15 to-transparent transition-colors duration-300 group-hover:from-[#080D18]" />
        <div className="absolute inset-0 flex h-full flex-col justify-between p-5 sm:p-8"><div className="flex items-start justify-between gap-3"><span className="w-fit border border-white/20 bg-[#080D18]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.16em] text-[#E2E8F0]">{project.category}</span><span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center border border-white/30 bg-[#080D18]/60 text-lg text-white transition-colors group-hover:border-[#477BFF] group-hover:bg-[#477BFF]">↗</span></div><div><span className="block font-display text-2xl font-semibold leading-tight text-white sm:text-4xl">{project.name}</span><span className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-white/75 transition-colors group-hover:text-white">Explore project <span aria-hidden="true">↗</span></span></div></div>
      </div>
      <div className="border-x border-b border-[#27344A] bg-[#0D1423] p-4 sm:p-5"><p className="max-w-2xl text-sm leading-6 text-[#94A3B8]">{project.summary || project.overview}</p>{project.technologies?.length ? <div className="mt-4 flex flex-wrap gap-2">{project.technologies.slice(0,4).map(technology=><span key={technology} className="border border-[#27344A] px-2.5 py-1 text-[10px] uppercase tracking-wide text-[#94A3B8]">{technology}</span>)}</div> : null}</div>
    </Link>
  );
}

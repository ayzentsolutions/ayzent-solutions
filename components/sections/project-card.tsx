import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/site-data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group motion-lift block rounded-sm focus-visible:outline-offset-4">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        {project.coverImage ? (
          <Image src={project.coverImage} alt={project.name} fill sizes="(max-width: 768px) 100vw, 50vw" quality={78} className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        ) : (
          <div className={`absolute inset-0 ${project.accent || "bg-gold"}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
        <div className="absolute inset-0 flex h-full flex-col justify-between p-5 sm:p-8">
          <span className="w-fit border border-white/25 bg-black/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">{project.category}</span>
          <div>
            <span className="block font-display text-2xl font-semibold leading-tight text-white sm:text-4xl">{project.name}</span>
            <span className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-white/80 transition group-hover:text-white">Explore project <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span></span>
          </div>
        </div>
      </div>
      <div className="pt-4 sm:pt-5">
        <p className="max-w-2xl text-sm leading-6 text-muted">{project.summary || project.overview}</p>
      </div>
    </Link>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type PointerEvent } from "react";
import type { Project } from "@/lib/site-data";

export function ProjectCard({ project }: { project: Project }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({ x: ((event.clientX - rect.left) / rect.width - .5) * 3, y: ((event.clientY - rect.top) / rect.height - .5) * -3 });
  };
  const reset = () => setTilt({ x: 0, y: 0 });
  return (
    <Link href={`/projects/${project.slug}`} onPointerMove={move} onPointerLeave={reset} style={{ transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }} className="group motion-lift block focus-visible:outline-offset-4">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#102746]">
        {project.coverImage ? <Image src={project.coverImage} alt={project.name} fill sizes="(max-width: 768px) 100vw, 50vw" quality={82} className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" /> : <div className="grid-blueprint absolute inset-0 bg-gradient-to-br from-[#102746] to-[#08152B]"><div aria-hidden="true" className="absolute bottom-8 left-8 h-24 w-24 border border-[#66A0FF]/35 bg-[#246BFF]/20" /></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08152B]/95 via-[#08152B]/10 to-transparent transition-opacity duration-300 group-hover:from-[#08152B]"/>
        <div className="absolute inset-0 flex h-full flex-col justify-between p-5 sm:p-8"><div className="flex items-start justify-between gap-3"><span className="w-fit border border-white/25 bg-[#08152B]/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.16em] text-white backdrop-blur-sm">{project.category}</span><span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center border border-white/35 bg-[#08152B]/25 text-lg text-white transition group-hover:rotate-45 group-hover:border-[#66A0FF] group-hover:bg-[#246BFF]">↗</span></div><div><span className="block font-display text-2xl font-semibold leading-tight text-white sm:text-4xl">{project.name}</span><span className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-white/75 transition group-hover:text-white">Explore project <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span></span></div></div>
      </div>
      <div className="pt-4 sm:pt-5"><p className="max-w-2xl text-sm leading-6 text-muted">{project.summary || project.overview}</p></div>
    </Link>
  );
}

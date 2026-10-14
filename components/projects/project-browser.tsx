"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/sections/project-card";
import type { Project } from "@/lib/site-data";

export function ProjectBrowser({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => ["All", ...new Set(projects.map((project) => project.category).filter(Boolean))], [projects]);
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(6);
  const filtered = category === "All" ? projects : projects.filter((project) => project.category === category);

  function select(next: string) {
    setCategory(next);
    setVisible(6);
  }

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {categories.map((item) => (
          <button type="button" key={item} onClick={() => select(item)} aria-pressed={category === item} className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-offset-4 ${category === item ? "border-ink bg-ink text-paper dark:border-paper dark:bg-paper dark:text-ink" : "border-line text-muted hover:border-gold hover:text-gold"}`}>
            {item}
          </button>
        ))}
      </div>
      <p className="mt-5 text-xs text-muted" aria-live="polite">Showing {Math.min(visible, filtered.length)} of {filtered.length} {filtered.length === 1 ? "project" : "projects"}</p>
      <div className="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:gap-y-14">
        {filtered.slice(0, visible).map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
      {filtered.length === 0 && <p className="mt-12 border border-dashed border-line p-8 text-center text-sm text-muted">No projects in this category yet.</p>}
      {visible < filtered.length && <div className="mt-12 text-center"><Button type="button" variant="secondary" onClick={() => setVisible((count) => count + 6)}>Load more projects <span aria-hidden="true">↓</span></Button></div>}
    </>
  );
}

import Image from "next/image";

import Link from "next/link";

import type {
  Project,
} from "@/lib/site-data";

export function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (

    <Link
      href={`/projects/${project.slug}`}
      className="group block"
    >

      <div className="relative aspect-[16/10] overflow-hidden">

        {project.coverImage ? (

          <Image
            src={
              project.coverImage
            }
            alt={
              project.name
            }
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={78}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

        ) : (

          <div
            className={`absolute inset-0 ${
              project.accent ||
              "bg-gold"
            }`}
          />

        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute inset-0 flex h-full flex-col justify-between p-6 sm:p-8">

          <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/70">

            {
              project.category
            }

          </span>

          <span className="font-display text-3xl font-semibold text-white sm:text-4xl">

            {
              project.name
            }

          </span>

        </div>

      </div>

      <div className="pt-4">

        <p className="text-sm leading-relaxed text-muted">

          {
            project.summary ||
            project.overview
          }

        </p>

        <span className="mt-3 inline-block text-sm transition group-hover:text-gold">

          View project →

        </span>

      </div>

    </Link>

  );
}

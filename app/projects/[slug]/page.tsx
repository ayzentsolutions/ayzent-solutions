import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getProject } from "@/lib/content";
import { ShareButtons } from "@/components/content/share-buttons";

export const dynamic = "force-dynamic";
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug); if (!project) notFound();
  return <><section className={`${project.accent || "bg-gold"} py-16 sm:py-24`}><Container><p className="text-xs font-medium uppercase tracking-[.18em] text-ink/70">{project.category}</p><h1 className="mt-5 font-display text-5xl font-semibold text-ink sm:text-7xl">{project.name}</h1><p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">{project.summary || project.overview}</p></Container></section><section className="py-20"><Container className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><aside className="text-sm text-muted"><p>{project.client && `Client · ${project.client}`}</p><p className="mt-3">{project.technologies?.join(" · ")}</p></aside><div className="grid gap-12"><div><h2 className="font-display text-3xl">The challenge</h2><p className="mt-4 max-w-2xl leading-relaxed text-muted">{project.challenge}</p></div><div><h2 className="font-display text-3xl">The approach</h2><p className="mt-4 max-w-2xl leading-relaxed text-muted">{project.solution}</p></div><div><h2 className="font-display text-3xl">What we delivered</h2><ul className="mt-4 grid gap-3 text-muted sm:grid-cols-2">{project.features?.map((feature) => <li key={feature} className="border-t border-line pt-3">{feature}</li>)}</ul></div><ShareButtons title={project.name} /></div></Container></section><section className="border-t border-line py-14"><Container className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><p className="font-display text-3xl">Have a similar challenge?</p><ButtonLink href="/contact">Discuss Your Requirements</ButtonLink></Container></section></>;
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Markdown } from "@/components/content/markdown";
import { PageHero } from "@/components/sections/page-hero";
import { getService } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = await getService((await params).slug);
  if (!service) return {};
  const description = service.text || service.description || "";
  return {
    title: service.title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.title, description, images: service.image ? [service.image] : [] },
    twitter: { card: "summary_large_image", title: service.title, description, images: service.image ? [service.image] : [] },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const service = await getService((await params).slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow={service.icon || "Capabilities"}
        title={service.title}
        text={service.text}
        image={service.image}
        primaryText="Discuss this service"
        primaryLink="/contact"
        layoutVariant="image-led"
        backgroundVariant="midnight"
      />
      <section className="bg-[#080D18] py-12 text-[#E2E8F0] sm:py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(15rem,.65fr)] lg:gap-16">
          <article className="prose prose-neutral max-w-none">
            {service.description ? <Markdown content={service.description} /> : <p className="text-sm leading-8 text-[#94A3B8]">{service.text}</p>}
          </article>
          <aside className="h-fit border-t border-[#27344A] pt-5 lg:sticky lg:top-28">
            <p className="eyebrow text-[#477BFF]">Next step</p>
            <h2 className="mt-3 font-display text-2xl">Have a challenge in this area?</h2>
            <p className="mt-3 text-sm leading-7 text-[#94A3B8]">Tell us what you are working on and we will help you plan the right next step.</p>
            <ButtonLink href="/contact" className="mt-6 bg-[#477BFF] text-white">Talk to our team ↗</ButtonLink>
          </aside>
        </Container>
      </section>
    </>
  );
}

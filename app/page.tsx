import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HomeHeroCarousel } from "@/components/sections/home-hero-carousel";
import { ProjectCard } from "@/components/sections/project-card";
import {
  getClientLogos,
  getFaqs,
  getHeroSlides,
  getProjects,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/content";

export const revalidate = 60;

export default async function Home() {
  const [heroSlides, faqs, projects, services, testimonials, clientLogos, settings] = await Promise.all([
    getHeroSlides(),
    getFaqs(),
    getProjects(),
    getServices(),
    getTestimonials(),
    getClientLogos(),
    getSiteSettings(),
  ]);

  const featuredProjects = projects.some((project) => project.featured)
    ? projects.filter((project) => project.featured)
    : projects;

  return (
    <>
      <HomeHeroCarousel slides={heroSlides} />

      <section className="py-16 sm:py-24 lg:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-5 border-b border-line pb-7 sm:flex-row sm:items-end sm:gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3"><span aria-hidden="true" className="h-px w-8 bg-gold" /><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Capabilities</p></div>
              <h2 className="mt-4 text-balance font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">Made to move you forward.</h2>
            </div>
            <Link href="/services" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-gold">Explore all services <span aria-hidden="true">↗</span></Link>
          </div>

          {services.length ? (
            <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Link key={`${service.title}-${index}`} href="/services" className="group motion-lift flex min-w-0 flex-col border-b border-line py-7 pr-4 sm:px-5 sm:py-8 lg:px-7 lg:py-9">
                  <span className="flex items-center justify-between text-xs text-gold"><span>{String(index + 1).padStart(2, "0")}</span><span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span></span>
                  <h3 className="mt-6 font-display text-2xl leading-tight sm:text-3xl">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted">{service.text}</p>
                  <span className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-gold">Explore capability</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-8 border border-dashed border-line p-6 text-sm text-muted">Our services are being updated. <Link href="/contact" className="text-gold underline underline-offset-4">Talk to us</Link> about your project.</div>
          )}
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-16 sm:py-24 lg:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3"><span aria-hidden="true" className="h-px w-8 bg-gold" /><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Selected work</p></div>
              <h2 className="mt-4 max-w-3xl text-balance font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">Work built around what matters.</h2>
            </div>
            <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium transition-colors hover:text-gold">All projects <span aria-hidden="true">↗</span></Link>
          </div>
          {featuredProjects.length ? (
            <div className="mt-10 grid gap-8 sm:mt-12 md:grid-cols-2 md:gap-x-7 lg:gap-x-10 lg:gap-y-12">
              {featuredProjects.slice(0, 4).map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>
          ) : (
            <div className="mt-10 border border-line bg-background p-6 sm:p-8"><p className="text-sm text-muted">Our portfolio is being prepared.</p><Link href="/contact" className="mt-3 inline-flex min-h-10 items-center text-sm font-medium text-gold">Start a project <span aria-hidden="true" className="ml-2">→</span></Link></div>
          )}
        </Container>
      </section>

      {testimonials.length > 0 && (
        <section className="py-16 sm:py-24 lg:py-28">
          <Container>
            <div className="max-w-3xl"><div className="flex items-center gap-3"><span aria-hidden="true" className="h-px w-8 bg-gold" /><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Client perspective</p></div><h2 className="mt-4 text-balance font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">Good work should leave a useful impression.</h2></div>
            <div className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <article key={`${testimonial.clientName}-${index}`} className="motion-lift flex min-w-0 flex-col border border-line bg-background p-6 sm:p-7">
                  <span aria-hidden="true" className="font-display text-5xl leading-none text-gold">“</span>
                  <p className="mt-4 flex-1 font-display text-xl leading-relaxed">{testimonial.text}</p>
                  <div className="mt-8 border-t border-line pt-4"><p className="text-sm font-semibold">{testimonial.clientName}</p>{testimonial.roleCompany && <p className="mt-1 text-xs text-muted">{testimonial.roleCompany}</p>}</div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {clientLogos.length > 0 && (
        <section className="border-y border-line bg-surface py-12 sm:py-16">
          <Container>
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Organisations and brands</p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {clientLogos.map((client, index) => {
                const content = client.logo ? (
                  <Image src={client.logo} alt={client.name} width={220} height={100} sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw" className="h-14 w-full object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-16" />
                ) : <span className="text-center text-sm text-muted">{client.name}</span>;
                const className = "group flex min-h-20 min-w-0 items-center justify-center border border-line bg-background p-3 transition-colors hover:border-gold sm:min-h-24 sm:p-4";
                return client.link ? (
                  <a key={`${client.name}-${index}`} href={client.link} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
                ) : <div key={`${client.name}-${index}`} className={className}>{content}</div>;
              })}
            </div>
          </Container>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="py-16 sm:py-24 lg:py-28">
          <Container className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:h-fit"><div className="flex items-center gap-3"><span aria-hidden="true" className="h-px w-8 bg-gold" /><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Questions</p></div><h2 className="mt-4 text-balance font-display text-4xl leading-tight tracking-tight sm:text-5xl">A few useful answers.</h2><p className="mt-4 max-w-sm text-sm leading-6 text-muted">Still have a question? We would be glad to hear what you are planning.</p><Link href="/contact" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-gold hover:text-foreground">Get in touch <span aria-hidden="true">↗</span></Link></div>
            <div className="divide-y divide-line border-y border-line">
              {faqs.map(([question, answer], index) => (
                <details key={`${question}-${index}`} className="group py-5 sm:py-6">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 text-base font-medium marker:content-none sm:text-lg"><span>{question}</span><span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-gold transition-transform group-open:rotate-45">+</span></summary>
                  <p className="max-w-3xl pb-2 pt-4 text-sm leading-7 text-muted sm:pt-5">{answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="relative isolate overflow-hidden border-t border-line bg-ink py-16 text-paper sm:py-24 lg:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 -z-10 h-72 w-72 rounded-full border border-gold/30 sm:h-[32rem] sm:w-[32rem]"><div className="absolute inset-8 rounded-full border border-gold/20 sm:inset-12" /></div>
        <Container>
          <div className="max-w-4xl motion-reveal">
            <div className="flex items-center gap-3"><span aria-hidden="true" className="h-px w-8 bg-gold" /><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{settings.homeCtaEyebrow || "Your next move"}</p></div>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">{settings.homeCtaTitle || "Have an idea? Let’s engineer it."}</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">Bring us the challenge. We will help you find a clear, practical path from idea to outcome.</p>
            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
              <ButtonLink href={settings.homeCtaButtonLink || "/contact"}>{settings.homeCtaButtonText || "Discuss Your Requirements"} <span aria-hidden="true">↗</span></ButtonLink>
              <ButtonLink href="/projects" variant="secondary" className="border-white/30 text-white hover:border-gold hover:text-gold">Explore our work</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

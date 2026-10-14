import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { getServices } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
const services = await getServices();

return (
<> <PageHero
     eyebrow="Services"
     title="The right mix of thinking, making, and momentum."
     text="We bring focused capabilities together around the work that will make the biggest difference to your business."
   />

  <section className="py-20 sm:py-28">
    <Container>
      <div className="grid border-t border-line lg:grid-cols-2">
        {services.map((service, index) => (
          <article
            key={service.title}
            className="motion-lift min-w-0 border-b border-line px-4 py-8 transition-colors hover:bg-surface/50 sm:px-6 sm:py-10 lg:odd:pl-0 lg:odd:pr-12 lg:even:border-l lg:even:pl-12"
          >
            <span className="text-xs text-gold">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h2 className="mt-5 font-display text-2xl leading-tight sm:text-3xl">
              {service.title}
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-muted sm:text-base">
              {service.text}
            </p>

            <p className="mt-6 text-sm text-foreground">
              Tailored to your scope, timeline, and priorities.
            </p>
          </article>
        ))}
      </div>
    </Container>
  </section>

  <section className="border-y border-line bg-surface py-16 sm:py-20 lg:py-24">
    <Container className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
      <p className="text-xs font-medium uppercase tracking-[.18em] text-gold">
        A custom fit
      </p>

      <div>
        <h2 className="text-balance font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
          No fixed packages. No forced fit.
        </h2>

        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          Every project is priced around its scope, features, complexity,
          and timeline. We will shape a practical proposal around the work
          you actually need.
        </p>

        <ButtonLink href="/contact" className="mt-7">
          Get a Quote
        </ButtonLink>
      </div>
    </Container>
  </section>
</>

);
}

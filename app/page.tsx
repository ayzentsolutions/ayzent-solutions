import Image from "next/image";
import Link from "next/link";

import {
  ButtonLink,
} from "@/components/ui/button";

import {
  Container,
} from "@/components/ui/container";

import {
  ProjectCard,
} from "@/components/sections/project-card";

import {
  getClientLogos,
  getFaqs,
  getProjects,
  getServices,
  getTestimonials,
} from "@/lib/content";

export const dynamic =
  "force-dynamic";

export default async function Home() {
  const [
    faqs,
    projects,
    services,
    testimonials,
    clientLogos,
  ] = await Promise.all([
    getFaqs(),
    getProjects(),
    getServices(),
    getTestimonials(),
    getClientLogos(),
  ]);

  const featuredProjects =
    projects.filter(
      (project) =>
        project.featured
    ).length
      ? projects.filter(
          (project) =>
            project.featured
        )
      : projects;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">

        <Container className="grid min-h-[calc(100vh-5rem)] items-center gap-12 py-20 lg:grid-cols-[1.15fr_.85fr]">

          <div>

            <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.18em] text-gold">
              Ayzent Solutions
            </p>

            <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[.98] sm:text-7xl">
              Digital work with{" "}
              <em className="font-normal text-gold">
                real momentum.
              </em>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              We build thoughtful
              websites, brands, and
              digital products for
              businesses ready to make
              their next move count.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">

              <ButtonLink href="/contact">
                Start a Project
              </ButtonLink>

              <ButtonLink
                href="/projects"
                variant="secondary"
              >
                Explore Our Work
              </ButtonLink>

            </div>

          </div>

          <div className="relative hidden aspect-square bg-ink p-8 lg:block">

            <div className="absolute inset-8 border border-gold/60" />

            <div className="absolute inset-0 grid place-items-center">

              <span className="font-display text-6xl text-paper">
                A.
              </span>

            </div>

          </div>

        </Container>

      </section>

      <section className="py-20 sm:py-28">

        <Container>

          <div className="flex items-end justify-between gap-4">

            <div>

              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                Capabilities
              </p>

              <h2 className="mt-4 font-display text-4xl sm:text-5xl">
                Made to move you forward.
              </h2>

            </div>

            <Link
              href="/services"
              className="hidden text-sm sm:block hover:text-gold"
            >
              All services →
            </Link>

          </div>

          <div className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">

            {services.map(
              (
                service,
                index
              ) => (

                <div
                  key={
                    service.title
                  }
                  className="border-b border-line py-7 sm:pr-8 lg:pr-10"
                >

                  <span className="text-xs text-gold">
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <h3 className="mt-5 text-lg">
                    {
                      service.title
                    }
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {
                      service.text
                    }
                  </p>

                </div>

              )
            )}

          </div>

        </Container>

      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">

        <Container>

          <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
            Selected work
          </p>

          <div className="mt-4 flex items-end justify-between gap-4">

            <h2 className="font-display text-4xl sm:text-5xl">
              Work that carries weight.
            </h2>

            <Link
              href="/projects"
              className="text-sm hover:text-gold"
            >
              All projects →
            </Link>

          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2">

            {featuredProjects
              .slice(0, 2)
              .map(
                (project) => (

                  <ProjectCard
                    key={
                      project.slug
                    }
                    project={
                      project
                    }
                  />

                )
              )}

          </div>

        </Container>

      </section>

      {/* CLIENT LOGOS */}

      {clientLogos.length >
        0 && (

        <section className="border-y border-line py-16">

          <Container>

            <p className="text-center text-xs font-medium uppercase tracking-[.18em] text-muted">
              Trusted by ambitious
              teams
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">

              {clientLogos.map(
                (client) => {

                  const content =
                    client.logo ? (

                      <div className="relative mx-auto h-16 w-full max-w-[180px]">

                        <Image
                          src={
                            client.logo
                          }
                          alt={
                            client.name
                          }
                          fill
                          unoptimized
                          className="object-contain"
                        />

                      </div>

                    ) : (

                      <span className="font-display text-xl text-muted">
                        {
                          client.name
                        }
                      </span>

                    );

                  return client.link ? (

                    <a
                      key={
                        client.name
                      }
                      href={
                        client.link
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid place-items-center"
                    >
                      {
                        content
                      }
                    </a>

                  ) : (

                    <div
                      key={
                        client.name
                      }
                      className="grid place-items-center"
                    >
                      {
                        content
                      }
                    </div>

                  );
                }
              )}

            </div>

          </Container>

        </section>

      )}

      {testimonials.length >
        0 && (

        <section className="py-20 sm:py-28">

          <Container>

            <p className="text-xs font-medium uppercase tracking-[.18em] text-gold">
              Client perspectives
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">

              {testimonials
                .slice(0, 2)
                .map(
                  (
                    testimonial
                  ) => (

                    <figure
                      className="border border-line p-7"
                      key={
                        testimonial.clientName
                      }
                    >

                      <blockquote className="font-display text-2xl leading-relaxed">
                        “{
                          testimonial.text
                        }”
                      </blockquote>

                      <figcaption className="mt-6 text-sm text-muted">

                        {
                          testimonial.clientName
                        }

                        {testimonial.roleCompany
                          ? ` · ${testimonial.roleCompany}`
                          : ""}

                      </figcaption>

                    </figure>

                  )
                )}

            </div>

          </Container>

        </section>

      )}

      <section className="py-20 sm:py-28">

        <Container className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">

          <div>

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
              Common questions
            </p>

            <h2 className="mt-4 font-display text-4xl sm:text-5xl">
              Let’s make it clear.
            </h2>

          </div>

          <div>

            {faqs.map(
              ([
                question,
                answer,
              ]) => (

                <details
                  key={question}
                  className="border-t border-line py-5 last:border-b"
                >

                  <summary className="cursor-pointer list-none pr-8 text-lg marker:hidden">

                    {
                      question
                    }

                    <span className="float-right text-gold">
                      +
                    </span>

                  </summary>

                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                    {
                      answer
                    }
                  </p>

                </details>

              )
            )}

          </div>

        </Container>

      </section>

      <section className="bg-ink py-20 text-paper sm:py-28">

        <Container className="text-center">

          <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
            A good place to begin
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
            Have something worthwhile
            in mind?
          </h2>

          <ButtonLink
            href="/contact"
            className="mt-8 bg-gold text-ink hover:bg-paper"
          >
            Discuss Your Requirements
          </ButtonLink>

        </Container>

      </section>
    </>
  );
}

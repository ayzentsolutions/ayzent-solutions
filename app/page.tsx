import Image from "next/image";

import Link from "next/link";

import {
  ButtonLink,
} from "@/components/ui/button";

import {
  Container,
} from "@/components/ui/container";

import {
  HomeHeroCarousel,
} from "@/components/sections/home-hero-carousel";

import {
  ProjectCard,
} from "@/components/sections/project-card";

import {
  getClientLogos,
  getFaqs,
  getHeroSlides,
  getProjects,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/content";

/*
|--------------------------------------------------------------------------
| ISR
|--------------------------------------------------------------------------
*/

export const revalidate = 60;

export default async function Home() {
  const [
    heroSlides,
    faqs,
    projects,
    services,
    testimonials,
    clientLogos,
    settings,
  ] = await Promise.all([
    getHeroSlides(),
    getFaqs(),
    getProjects(),
    getServices(),
    getTestimonials(),
    getClientLogos(),
    getSiteSettings(),
  ]);

  const featuredProjects =
    projects.some(
      (project) =>
        project.featured
    )
      ? projects.filter(
          (project) =>
            project.featured
        )
      : projects;

  return (
    <>
      {/* HERO */}

      <HomeHeroCarousel
        slides={heroSlides}
      />

      {/* SERVICES */}

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
              className="hidden text-sm transition hover:text-gold sm:block"
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
                  key={`${service.title}-${index}`}
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

      {/* PROJECTS */}

      <section className="border-y border-line bg-surface py-20 sm:py-28">

        <Container>

          <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
            Selected work
          </p>

          <div className="mt-4 flex items-end justify-between gap-4">

            <h2 className="font-display text-4xl sm:text-5xl">
              Work built around
              what matters.
            </h2>

            <Link
              href="/projects"
              className="hidden text-sm transition hover:text-gold sm:block"
            >
              All projects →
            </Link>

          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2">

            {featuredProjects
              .slice(0, 4)
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

      {/* TESTIMONIALS */}

      {testimonials.length > 0 && (

        <section className="py-20 sm:py-28">

          <Container>

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
              Client perspective
            </p>

            <h2 className="mt-4 max-w-3xl font-display text-4xl sm:text-5xl">
              Good work should leave
              a useful impression.
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {testimonials.map(
                (
                  testimonial,
                  index
                ) => (

                  <article
                    key={`${testimonial.clientName}-${index}`}
                    className="border border-line p-7"
                  >

                    <p className="font-display text-xl leading-relaxed">

                      “{
                        testimonial.text
                      }”

                    </p>

                    <div className="mt-8">

                      <p className="text-sm font-medium">

                        {
                          testimonial.clientName
                        }

                      </p>

                      {testimonial.roleCompany && (

                        <p className="mt-1 text-xs text-muted">

                          {
                            testimonial.roleCompany
                          }

                        </p>

                      )}

                    </div>

                  </article>

                )
              )}

            </div>

          </Container>

        </section>

      )}

      {/* CLIENT LOGOS */}

      {clientLogos.length > 0 && (

        <section className="border-y border-line bg-surface py-14">

          <Container>

            <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Organisations and brands
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">

              {clientLogos.map(
                (
                  client,
                  index
                ) => {

                  const content =
                    client.logo ? (

                      <Image
                        src={
                          client.logo
                        }
                        alt={
                          client.name
                        }
                        width={220}
                        height={100}
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                        className="h-16 w-full object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                      />

                    ) : (

                      <span className="text-sm text-muted">

                        {
                          client.name
                        }

                      </span>

                    );

                  return client.link ? (

                    <a
                      key={`${client.name}-${index}`}
                      href={
                        client.link
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-h-24 items-center justify-center border border-line bg-background p-4"
                    >

                      {content}

                    </a>

                  ) : (

                    <div
                      key={`${client.name}-${index}`}
                      className="flex min-h-24 items-center justify-center border border-line bg-background p-4"
                    >

                      {content}

                    </div>

                  );
                }
              )}

            </div>

          </Container>

        </section>

      )}

      {/* FAQ */}

      {faqs.length > 0 && (

        <section className="py-20 sm:py-28">

          <Container>

            <div className="max-w-3xl">

              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                Questions
              </p>

              <h2 className="mt-4 font-display text-4xl sm:text-5xl">
                A few useful answers.
              </h2>

            </div>

            <div className="mt-12 divide-y border-y border-line">

              {faqs.map(
                (
                  [question, answer],
                  index
                ) => (

                  <details
                    key={`${question}-${index}`}
                    className="group py-6"
                  >

                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg">

                      {question}

                      <span className="text-gold transition group-open:rotate-45">
                        +
                      </span>

                    </summary>

                    <p className="max-w-3xl pt-5 text-sm leading-relaxed text-muted">

                      {answer}

                    </p>

                  </details>

                )
              )}

            </div>

          </Container>

        </section>

      )}

      {/* CTA */}

      <section className="border-t border-line bg-ink py-20 text-paper sm:py-28">

        <Container>

          <div className="max-w-4xl">

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">

              {
                settings.homeCtaEyebrow
              }

            </p>

            <h2 className="mt-5 font-display text-5xl leading-[.98] sm:text-7xl">

              {
                settings.homeCtaTitle
              }

            </h2>

            <div className="mt-9">

              <ButtonLink
                href={
                  settings.homeCtaButtonLink ||
                  "/contact"
                }
              >

                {
                  settings.homeCtaButtonText ||
                  "Discuss Your Requirements"
                }

              </ButtonLink>

            </div>

          </div>

        </Container>

      </section>

    </>
  );
}

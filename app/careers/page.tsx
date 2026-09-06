import { Container } from "@/components/ui/container";

import {
  PageHero,
} from "@/components/sections/page-hero";

import {
  getJobs,
} from "@/lib/content";

export const dynamic =
  "force-dynamic";

export default async function CareersPage() {
  const jobs =
    await getJobs();

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Do work you can stand behind."
        text="We are building a thoughtful team of people who care about clear ideas and excellent execution."
      />

      <section className="py-20">

        <Container>

          <div className="max-w-2xl">

            <h2 className="font-display text-4xl">
              Open roles
            </h2>

            <p className="mt-4 leading-relaxed text-muted">
              Explore current opportunities
              to work with Ayzent Solutions.
            </p>

          </div>

          {jobs.length > 0 ? (

            <div className="mt-12 divide-y border-y border-line">

              {jobs.map(
                (job) => (

                  <article
                    key={
                      job._id ||
                      job.title
                    }
                    className="py-8"
                  >

                    <div className="flex flex-col justify-between gap-6 md:flex-row">

                      <div>

                        <h3 className="font-display text-3xl">
                          {job.title}
                        </h3>

                        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gold">

                          {job.location && (
                            <span>
                              {
                                job.location
                              }
                            </span>
                          )}

                          {job.type && (
                            <span>
                              · {
                                job.type
                              }
                            </span>
                          )}

                        </div>

                        <p className="mt-5 max-w-2xl whitespace-pre-line leading-relaxed text-muted">
                          {
                            job.description
                          }
                        </p>

                        {job.requirements &&
                          job.requirements
                            .length >
                            0 && (

                            <div className="mt-6">

                              <h4 className="text-sm font-medium">
                                Requirements
                              </h4>

                              <ul className="mt-3 grid gap-2 text-sm text-muted">

                                {job.requirements.map(
                                  (
                                    requirement
                                  ) => (

                                    <li
                                      key={
                                        requirement
                                      }
                                    >
                                      • {
                                        requirement
                                      }
                                    </li>

                                  )
                                )}

                              </ul>

                            </div>

                          )}

                        {job.applicationInstructions && (

                          <div className="mt-6 border-l-2 border-gold pl-4">

                            <p className="text-sm font-medium">
                              How to apply
                            </p>

                            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted">
                              {
                                job.applicationInstructions
                              }
                            </p>

                          </div>

                        )}

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

          ) : (

            <div className="mt-12 border-y border-line py-10">

              <h3 className="font-display text-2xl">
                No open roles right now
              </h3>

              <p className="mt-3 max-w-xl leading-relaxed text-muted">
                We do not currently have a
                specific opening, but we are
                always interested in hearing
                from exceptional people.
              </p>

              <a
                className="mt-6 inline-block text-sm hover:text-gold"
                href="mailto:hello@ayzent.com?subject=Careers%20at%20Ayzent"
              >
                Introduce yourself →
              </a>

            </div>

          )}

        </Container>

      </section>
    </>
  );
}

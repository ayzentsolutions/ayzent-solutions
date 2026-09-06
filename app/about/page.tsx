import Image from "next/image";

import {
  ButtonLink,
} from "@/components/ui/button";

import {
  Container,
} from "@/components/ui/container";

import {
  PageHero,
} from "@/components/sections/page-hero";

import {
  getTeam,
} from "@/lib/content";

const values = [
  "Curiosity before certainty",
  "Clarity over clutter",
  "Care in the details",
  "Partnership over hand-off",
];

export const dynamic =
  "force-dynamic";

export default async function AboutPage() {
  const team =
    await getTeam();

  return (
    <>
      <PageHero
        eyebrow="About Ayzent"
        title="The ideas behind more purposeful digital work."
        text="Ayzent Solutions is a design and technology studio for organisations with a clear sense of where they are going."
      />

      <section className="py-20 sm:py-28">

        <Container className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">

          <p className="text-xs font-medium uppercase tracking-[.18em] text-gold">
            Our story
          </p>

          <div className="space-y-6 text-lg leading-relaxed text-muted">

            <p>
              We started Ayzent with a
              simple belief: the digital
              work that matters most is
              built with attention, not
              noise.
            </p>

            <p>
              Today, we work at the point
              where strong ideas meet
              practical delivery—bringing
              strategy, design, and
              engineering into one
              considered process.
            </p>

          </div>

        </Container>

      </section>

      <section className="border-y border-line bg-surface py-20">

        <Container className="grid gap-12 md:grid-cols-2">

          <div>

            <p className="text-xs font-medium uppercase tracking-[.18em] text-gold">
              Mission
            </p>

            <h2 className="mt-4 font-display text-4xl leading-tight">
              Help good businesses make a
              stronger digital impression.
            </h2>

          </div>

          <div>

            <p className="text-xs font-medium uppercase tracking-[.18em] text-gold">
              Vision
            </p>

            <h2 className="mt-4 font-display text-4xl leading-tight">
              A more thoughtful internet,
              shaped by teams that care
              about the people they serve.
            </h2>

          </div>

        </Container>

      </section>

      <section className="py-20 sm:py-28">

        <Container>

          <p className="text-xs font-medium uppercase tracking-[.18em] text-gold">
            What guides us
          </p>

          <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">

            {values.map(
              (
                value,
                index
              ) => (

                <div
                  key={value}
                  className="bg-background p-7"
                >

                  <span className="text-xs text-gold">
                    0{index + 1}
                  </span>

                  <h3 className="mt-8 text-lg">
                    {value}
                  </h3>

                </div>

              )
            )}

          </div>

        </Container>

      </section>

      {/* TEAM */}

      {team.length > 0 && (

        <section className="border-t border-line py-20 sm:py-28">

          <Container>

            <div className="max-w-2xl">

              <p className="text-xs font-medium uppercase tracking-[.18em] text-gold">
                The people
              </p>

              <h2 className="mt-4 font-display text-4xl sm:text-5xl">
                The people behind the work.
              </h2>

            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

              {team.map(
                (member) => (

                  <article
                    key={
                      member._id ||
                      member.name
                    }
                    className="border border-line"
                  >

                    {member.image && (

                      <div className="relative aspect-[4/5] overflow-hidden bg-surface">

                        <Image
                          src={
                            member.image
                          }
                          alt={
                            member.name
                          }
                          fill
                          unoptimized
                          className="object-cover"
                        />

                      </div>

                    )}

                    <div className="p-6">

                      <h3 className="font-display text-2xl">
                        {
                          member.name
                        }
                      </h3>

                      <p className="mt-2 text-sm text-gold">
                        {
                          member.role
                        }
                      </p>

                      {member.shortBio && (

                        <p className="mt-4 text-sm leading-relaxed text-muted">
                          {
                            member.shortBio
                          }
                        </p>

                      )}

                      {member.socialLinks &&
                        member.socialLinks
                          .length >
                          0 && (

                          <div className="mt-5 flex flex-wrap gap-3">

                            {member.socialLinks.map(
                              (
                                link
                              ) => (

                                <a
                                  key={
                                    link
                                  }
                                  href={
                                    link
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm hover:text-gold"
                                >
                                  Profile →
                                </a>

                              )
                            )}

                          </div>

                        )}

                    </div>

                  </article>

                )
              )}

            </div>

          </Container>

        </section>

      )}

      <section className="pb-20">

        <Container>

          <div className="flex flex-col justify-between gap-6 border border-line p-8 sm:flex-row sm:items-center">

            <div>

              <h2 className="font-display text-3xl">
                Let’s build what’s next.
              </h2>

              <p className="mt-2 text-muted">
                Bring us the opportunity,
                challenge, or half-formed
                idea.
              </p>

            </div>

            <ButtonLink href="/contact">
              Start a Project
            </ButtonLink>

          </div>

        </Container>

      </section>

    </>
  );
}

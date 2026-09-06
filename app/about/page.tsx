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
  getAboutContent,
  getTeam,
} from "@/lib/content";

export const dynamic =
  "force-dynamic";

export default async function AboutPage() {
  const [
    content,
    team,
  ] = await Promise.all([
    getAboutContent(),
    getTeam(),
  ]);

  const values =
    content.values || [];

  return (
    <>
      {/* HERO */}

      <PageHero
        eyebrow={
          content.heroEyebrow ||
          "About Ayzent"
        }
        title={
          content.heroTitle ||
          ""
        }
        text={
          content.heroText ||
          ""
        }
      />

      {/* STORY */}

      <section className="py-20 sm:py-28">

        <Container className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">

          <p className="text-xs font-medium uppercase tracking-[.18em] text-gold">

            {
              content.storyEyebrow ||
              "Our story"
            }

          </p>

          <div className="space-y-6 text-lg leading-relaxed text-muted">

            {content.storyParagraphOne && (

              <p>
                {
                  content.storyParagraphOne
                }
              </p>

            )}

            {content.storyParagraphTwo && (

              <p>
                {
                  content.storyParagraphTwo
                }
              </p>

            )}

          </div>

        </Container>

      </section>

      {/* MISSION + VISION */}

      <section className="border-y border-line bg-surface py-20">

        <Container className="grid gap-12 md:grid-cols-2">

          <div>

            <p className="text-xs font-medium uppercase tracking-[.18em] text-gold">

              {
                content.missionEyebrow ||
                "Mission"
              }

            </p>

            <h2 className="mt-4 font-display text-4xl leading-tight">

              {
                content.mission
              }

            </h2>

          </div>

          <div>

            <p className="text-xs font-medium uppercase tracking-[.18em] text-gold">

              {
                content.visionEyebrow ||
                "Vision"
              }

            </p>

            <h2 className="mt-4 font-display text-4xl leading-tight">

              {
                content.vision
              }

            </h2>

          </div>

        </Container>

      </section>

      {/* VALUES */}

      {values.length > 0 && (

        <section className="py-20 sm:py-28">

          <Container>

            <p className="text-xs font-medium uppercase tracking-[.18em] text-gold">

              {
                content.valuesEyebrow ||
                "What guides us"
              }

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

                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}

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

      )}

      {/* TEAM */}

      <section className="border-t border-line py-20 sm:py-28">

        <Container>

          <div className="max-w-2xl">

            <p className="text-xs font-medium uppercase tracking-[.18em] text-gold">

              {
                content.teamEyebrow ||
                "The people"
              }

            </p>

            <h2 className="mt-4 font-display text-4xl sm:text-5xl">

              {
                content.teamTitle ||
                "The people behind the work."
              }

            </h2>

            {content.teamText && (

              <p className="mt-5 leading-relaxed text-muted">

                {
                  content.teamText
                }

              </p>

            )}

          </div>

          {team.length > 0 ? (

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

              {team.map(
                (member) => (

                  <article
                    key={
                      member._id ||
                      member.name
                    }
                    className="overflow-hidden border border-line"
                  >

                    {member.image && (

                      <div className="relative aspect-[4/5] bg-surface">

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
                          .length > 0 && (

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

          ) : content.quote ? (

            <div className="mt-12 bg-ink p-8 text-paper sm:p-10">

              <p className="font-display text-3xl">

                “{
                  content.quote
                }”

              </p>

              {content.quoteAuthor && (

                <p className="mt-8 text-sm text-paper/60">

                  {
                    content.quoteAuthor
                  }

                </p>

              )}

            </div>

          ) : null}

        </Container>

      </section>

      {/* FOUNDER QUOTE */}

      {team.length > 0 &&
        content.quote && (

          <section className="border-t border-line py-20">

            <Container>

              <div className="bg-ink p-8 text-paper sm:p-10">

                <p className="font-display text-3xl">

                  “{
                    content.quote
                  }”

                </p>

                {content.quoteAuthor && (

                  <p className="mt-8 text-sm text-paper/60">

                    {
                      content.quoteAuthor
                    }

                  </p>

                )}

              </div>

            </Container>

          </section>

        )}

      {/* CTA */}

      <section className="pb-20">

        <Container>

          <div className="flex flex-col justify-between gap-6 border border-line p-8 sm:flex-row sm:items-center">

            <div>

              <h2 className="font-display text-3xl">

                {
                  content.ctaTitle ||
                  "Let’s build what’s next."
                }

              </h2>

              {content.ctaText && (

                <p className="mt-2 text-muted">

                  {
                    content.ctaText
                  }

                </p>

              )}

            </div>

            <ButtonLink
              href={
                content.ctaButtonLink ||
                "/contact"
              }
            >
              {
                content.ctaButtonText ||
                "Start a Project"
              }
            </ButtonLink>

          </div>

        </Container>

      </section>
    </>
  );
}

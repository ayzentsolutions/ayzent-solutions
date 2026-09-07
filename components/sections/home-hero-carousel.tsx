
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export interface HeroSlide {
  id?: string;
  _id?: string;

  eyebrow?: string;
  title?: string;
  description?: string;

  primaryButtonText?: string;
  primaryButtonLink?: string;

  secondaryButtonText?: string;
  secondaryButtonLink?: string;

  image?: string;
  alt?: string;

  active?: boolean;
  order?: number;
  displayOrder?: number;
}

interface HomeHeroCarouselProps {
  slides?: HeroSlide[];
}

const FALLBACK_CONTENT = {
  eyebrow: "AYZENT SOLUTIONS",
  title: "Ideas. Engineered.",
  description:
    "We design, build and scale modern digital solutions for ambitious businesses and ideas.",

  primaryButtonText: "Start a Project",
  primaryButtonLink: "/contact",

  secondaryButtonText: "Explore Our Work",
  secondaryButtonLink: "/projects",
};

export function HomeHeroCarousel({
  slides = [],
}: HomeHeroCarouselProps) {
  /*
  |--------------------------------------------------------------------------
  | ACTIVE SLIDES
  |--------------------------------------------------------------------------
  |
  | Only active slides are used.
  |
  | If older CMS data does not contain `active`, it is still accepted.
  |--------------------------------------------------------------------------
  */

  const activeSlides = useMemo(() => {
    return [...slides]
      .filter(
        (slide) =>
          slide.active !== false
      )
      .sort((a, b) => {
        const aOrder =
          a.order ??
          a.displayOrder ??
          0;

        const bOrder =
          b.order ??
          b.displayOrder ??
          0;

        return (
          aOrder - bOrder
        );
      });
  }, [slides]);

  /*
  |--------------------------------------------------------------------------
  | HERO CONTENT
  |--------------------------------------------------------------------------
  |
  | The FIRST active slide is the content source.
  |
  | This content NEVER changes when background slides rotate.
  |--------------------------------------------------------------------------
  */

  const contentSlide =
    activeSlides[0];

  const content = {
    eyebrow:
      contentSlide?.eyebrow ||
      FALLBACK_CONTENT.eyebrow,

    title:
      contentSlide?.title ||
      FALLBACK_CONTENT.title,

    description:
      contentSlide?.description ||
      FALLBACK_CONTENT.description,

    primaryButtonText:
      contentSlide?.primaryButtonText ||
      FALLBACK_CONTENT.primaryButtonText,

    primaryButtonLink:
      contentSlide?.primaryButtonLink ||
      FALLBACK_CONTENT.primaryButtonLink,

    secondaryButtonText:
      contentSlide?.secondaryButtonText ||
      FALLBACK_CONTENT.secondaryButtonText,

    secondaryButtonLink:
      contentSlide?.secondaryButtonLink ||
      FALLBACK_CONTENT.secondaryButtonLink,
  };

  /*
  |--------------------------------------------------------------------------
  | BACKGROUND SLIDES
  |--------------------------------------------------------------------------
  |
  | Only slides containing a valid image participate in the carousel.
  |--------------------------------------------------------------------------
  */

  const backgroundSlides =
    activeSlides.filter(
      (slide) =>
        typeof slide.image ===
          "string" &&
        slide.image.trim()
          .length > 0
    );

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  /*
  |--------------------------------------------------------------------------
  | AUTO ROTATION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (
      backgroundSlides.length <= 1
    ) {
      return;
    }

    const interval =
      window.setInterval(() => {
        setCurrentIndex(
          (current) =>
            (
              current + 1
            ) %
            backgroundSlides.length
        );
      }, 6000);

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, [backgroundSlides.length]);

  /*
  |--------------------------------------------------------------------------
  | RESET INDEX
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (
      currentIndex >=
      backgroundSlides.length
    ) {
      setCurrentIndex(0);
    }
  }, [
    currentIndex,
    backgroundSlides.length,
  ]);

  /*
  |--------------------------------------------------------------------------
  | MANUAL SLIDE CHANGE
  |--------------------------------------------------------------------------
  */

  const goToSlide = (
    index: number
  ) => {
    setCurrentIndex(index);
  };

  /*
  |--------------------------------------------------------------------------
  | NEXT SLIDE
  |--------------------------------------------------------------------------
  */

  const nextSlide = () => {
    if (
      backgroundSlides.length <= 1
    ) {
      return;
    }

    setCurrentIndex(
      (current) =>
        (
          current + 1
        ) %
        backgroundSlides.length
    );
  };

  /*
  |--------------------------------------------------------------------------
  | PREVIOUS SLIDE
  |--------------------------------------------------------------------------
  */

  const previousSlide = () => {
    if (
      backgroundSlides.length <= 1
    ) {
      return;
    }

    setCurrentIndex(
      (current) =>
        (
          current -
          1 +
          backgroundSlides.length
        ) %
        backgroundSlides.length
    );
  };

  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
      {/* ================================================================
          BACKGROUND CAROUSEL
      ================================================================= */}

      <div
        className="absolute inset-0 -z-20"
        aria-hidden="true"
      >
        {backgroundSlides.length >
          0 ? (
          backgroundSlides.map(
            (
              slide,
              index
            ) => {
              const isActive =
                index ===
                currentIndex;

              return (
                <div
                  key={
                    slide._id ||
                    slide.id ||
                    `${slide.image}-${index}`
                  }
                  className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <Image
                    src={
                      slide.image as string
                    }
                    alt={
                      slide.alt ||
                      ""
                    }
                    fill
                    priority={
                      index === 0
                    }
                    sizes="100vw"
                    className={`object-cover transition-transform duration-[7000ms] ease-out ${
                      isActive
                        ? "scale-105"
                        : "scale-100"
                    }`}
                  />
                </div>
              );
            }
          )
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
        )}
      </div>

      {/* ================================================================
          DARK OVERLAY
      ================================================================= */}

      <div
        className="absolute inset-0 -z-10 bg-background/75"
        aria-hidden="true"
      />

      {/* ================================================================
          GRADIENT OVERLAY
      ================================================================= */}

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/70 to-background/30"
        aria-hidden="true"
      />

      {/* ================================================================
          DECORATIVE LIGHT
      ================================================================= */}

      <div
        className="pointer-events-none absolute -right-40 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]"
        aria-hidden="true"
      />

      {/* ================================================================
          HERO CONTENT
      ================================================================= */}

      <Container className="relative z-10 py-24 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          {/* EYEBROW */}

          {content.eyebrow && (
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold sm:text-sm">
              {content.eyebrow}
            </p>
          )}

          {/* TITLE */}

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            {content.title}
          </h1>

          {/* DESCRIPTION */}

          {content.description && (
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg md:text-xl">
              {content.description}
            </p>
          )}

          {/* BUTTONS */}

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            {content.primaryButtonText && (
              <ButtonLink
                href={
                  content.primaryButtonLink ||
                  "/contact"
                }
                variant="primary"
              >
                {
                  content.primaryButtonText
                }
              </ButtonLink>
            )}

            {content.secondaryButtonText && (
              <ButtonLink
                href={
                  content.secondaryButtonLink ||
                  "/projects"
                }
                variant="secondary"
              >
                {
                  content.secondaryButtonText
                }
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>

      {/* ================================================================
          CAROUSEL CONTROLS
      ================================================================= */}

      {backgroundSlides.length >
        1 && (
        <>
          {/* PREVIOUS */}

          <button
            type="button"
            onClick={
              previousSlide
            }
            aria-label="Previous background"
            className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-xl text-white backdrop-blur transition hover:border-gold hover:text-gold lg:flex"
          >
            ←
          </button>

          {/* NEXT */}

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next background"
            className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-xl text-white backdrop-blur transition hover:border-gold hover:text-gold lg:flex"
          >
            →
          </button>
        </>
      )}

      {/* ================================================================
          SLIDE INDICATORS
      ================================================================= */}

      {backgroundSlides.length >
        1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {backgroundSlides.map(
            (
              slide,
              index
            ) => (
              <button
                key={
                  slide._id ||
                  slide.id ||
                  `indicator-${index}`
                }
                type="button"
                onClick={() =>
                  goToSlide(
                    index
                  )
                }
                aria-label={`Go to background ${
                  index + 1
                }`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index ===
                  currentIndex
                    ? "w-8 bg-gold"
                    : "w-2 bg-white/50 hover:bg-white"
                }`}
              />
            )
          )}
        </div>
      )}
    </section>
  );
}


"use client";

import Image from "next/image";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ButtonLink,
} from "@/components/ui/button";

export type HeroSlide = {
  _id?: string;

  eyebrow?: string;

  title?: string;

  highlight?: string;

  text?: string;

  /*
  |--------------------------------------------------------------------------
  | IMPORTANT
  |--------------------------------------------------------------------------
  |
  | This must remain optional because lib/content.ts defines HeroSlide.image
  | as string | undefined.
  |
  */

  image?: string;

  overlayStrength?:
    | "light"
    | "medium"
    | "dark";

  primaryText?: string;

  primaryLink?: string;

  secondaryText?: string;

  secondaryLink?: string;

  active?: boolean;

  displayOrder?: number;
};

function overlayClass(
  strength?: HeroSlide["overlayStrength"]
) {
  switch (strength) {
    case "light":
      return "bg-black/35";

    case "medium":
      return "bg-black/50";

    case "dark":
    default:
      return "bg-black/65";
  }
}

function renderTitle(
  slide: HeroSlide
) {
  const title =
    slide.title || "";

  if (
    !slide.highlight ||
    !title.includes(
      slide.highlight
    )
  ) {
    return title;
  }

  const index =
    title.indexOf(
      slide.highlight
    );

  const before =
    title.slice(
      0,
      index
    );

  const after =
    title.slice(
      index +
        slide.highlight.length
    );

  return (
    <>
      {before}

      <em className="font-normal text-gold">

        {slide.highlight}

      </em>

      {after}
    </>
  );
}

export function HomeHeroCarousel({
  slides,
}: {
  slides: HeroSlide[];
}) {

  /*
  |--------------------------------------------------------------------------
  | ACTIVE BACKGROUND SLIDES
  |--------------------------------------------------------------------------
  |
  | Only slides with an image are used as backgrounds.
  |
  */

  const activeSlides =
    useMemo(
      () =>
        slides.filter(
          (
            slide
          ): slide is HeroSlide & {
            image: string;
          } =>
            slide.active !==
              false &&
            Boolean(
              slide.image
            )
        ),
      [slides]
    );

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    paused,
    setPaused,
  ] = useState(false);

  const total =
    activeSlides.length;

  /*
  |--------------------------------------------------------------------------
  | HERO CONTENT
  |--------------------------------------------------------------------------
  |
  | We use the first available slide for the existing Hero content.
  |
  | Background images rotate independently.
  |
  */

  const contentSlide =
    slides.find(
      (slide) =>
        slide.active !== false
    ) ||
    slides[0];

  useEffect(() => {

    if (
      total <= 1 ||
      paused
    ) {
      return;
    }

    const timer =
      window.setInterval(
        () => {

          setActiveIndex(
            (current) =>
              (
                current +
                1
              ) %
              total
          );

        },
        7000
      );

    return () =>
      window.clearInterval(
        timer
      );

  }, [
    paused,
    total,
  ]);

  useEffect(() => {

    if (
      activeIndex >=
      total
    ) {

      setActiveIndex(0);

    }

  }, [
    activeIndex,
    total,
  ]);

  /*
  |--------------------------------------------------------------------------
  | FALLBACK
  |--------------------------------------------------------------------------
  */

  if (
    !contentSlide
  ) {
    return null;
  }

  function previous() {

    if (
      total <= 1
    ) {
      return;
    }

    setActiveIndex(
      (current) =>
        (
          current -
          1 +
          total
        ) %
        total
    );

  }

  function next() {

    if (
      total <= 1
    ) {
      return;
    }

    setActiveIndex(
      (current) =>
        (
          current +
          1
        ) %
        total
    );

  }

  return (

    <section
      className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-ink"
      onMouseEnter={() =>
        setPaused(true)
      }
      onMouseLeave={() =>
        setPaused(false)
      }
    >

      {/* ============================================================
          BACKGROUND CAROUSEL
          ============================================================ */}

      <div className="absolute inset-0 z-0">

        {activeSlides.length >
        0 ? (

          activeSlides.map(
            (
              slide,
              index
            ) => {

              const active =
                index ===
                activeIndex;

              return (

                <div
                  key={
                    slide._id ||
                    `${slide.image}-${index}`
                  }
                  className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
                    active
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                  aria-hidden={
                    !active
                  }
                >

                  <Image
                    src={
                      slide.image
                    }
                    alt=""
                    fill
                    priority={
                      index === 0
                    }
                    sizes="100vw"
                    quality={82}
                    className={`object-cover transition-transform duration-[7000ms] ease-linear ${
                      active
                        ? "scale-110"
                        : "scale-100"
                    }`}
                  />

                  <div
                    className={`absolute inset-0 ${overlayClass(
                      slide.overlayStrength
                    )}`}
                  />

                </div>

              );

            }
          )

        ) : (

          /*
          |--------------------------------------------------------------------------
          | NO IMAGE FALLBACK
          |--------------------------------------------------------------------------
          */

          <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />

        )}

      </div>

      {/* ============================================================
          GLOBAL OVERLAY
          ============================================================ */}

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(201,162,39,.16),transparent_35%)]" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-t from-black/65 to-transparent" />


      {/* ============================================================
          FIXED HERO CONTENT
          ============================================================ */}

      <div className="relative z-20 mx-auto flex min-h-[calc(100svh-5rem)] max-w-[90rem] items-center px-5 py-24">

        <div className="max-w-4xl text-paper animate-fade-up">

          {contentSlide.eyebrow && (

            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">

              {
                contentSlide.eyebrow
              }

            </p>

          )}

          {contentSlide.title && (

            <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[.96] text-white sm:text-7xl lg:text-8xl">

              {renderTitle(
                contentSlide
              )}

            </h1>

          )}

          {contentSlide.text && (

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">

              {
                contentSlide.text
              }

            </p>

          )}

          <div className="mt-9 flex flex-wrap gap-3">

            {contentSlide.primaryText &&
              contentSlide.primaryLink && (

                <ButtonLink
                  href={
                    contentSlide.primaryLink
                  }
                >

                  {
                    contentSlide.primaryText
                  }

                </ButtonLink>

              )}

            {contentSlide.secondaryText &&
              contentSlide.secondaryLink && (

                <ButtonLink
                  href={
                    contentSlide.secondaryLink
                  }
                  variant="secondary"
                >

                  {
                    contentSlide.secondaryText
                  }

                </ButtonLink>

              )}

          </div>

        </div>

      </div>


      {/* ============================================================
          CAROUSEL CONTROLS
          ============================================================ */}

      {total > 1 && (

        <div className="absolute bottom-7 left-5 right-5 z-30 flex items-end justify-between gap-6 sm:bottom-10 sm:left-8 sm:right-8">


          {/* INDICATORS */}

          <div className="flex flex-1 gap-2">

            {activeSlides.map(
              (
                slide,
                index
              ) => (

                <button
                  key={
                    slide._id ||
                    index
                  }
                  type="button"
                  aria-label={`Show background ${
                    index + 1
                  }`}
                  onClick={() =>
                    setActiveIndex(
                      index
                    )
                  }
                  className="group flex-1 py-3"
                >

                  <span className="block h-px overflow-hidden bg-white/25">

                    <span
                      className={`block h-full bg-gold transition-all ${
                        index ===
                        activeIndex
                          ? "w-full duration-[7000ms]"
                          : "w-0 duration-300"
                      }`}
                    />

                  </span>

                </button>

              )
            )}

          </div>


          {/* NAVIGATION */}

          <div className="flex shrink-0 gap-2">

            <button
              type="button"
              aria-label="Previous background"
              onClick={
                previous
              }
              className="grid h-11 w-11 place-items-center border border-white/30 text-white transition hover:border-gold hover:text-gold"
            >

              ←

            </button>

            <button
              type="button"
              aria-label="Next background"
              onClick={
                next
              }
              className="grid h-11 w-11 place-items-center border border-white/30 text-white transition hover:border-gold hover:text-gold"
            >

              →

            </button>

          </div>

        </div>

      )}

    </section>

  );
}

"use client";

import Image from "next/image";

import {
  useEffect,
  useState,
} from "react";

import {
  ButtonLink,
} from "@/components/ui/button";

export type HeroSlide = {
  _id?: string;

  eyebrow?: string;

  title: string;

  highlight?: string;

  text?: string;

  image: string;

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
      return "bg-black/40";

    case "medium":
      return "bg-black/55";

    case "dark":
    default:
      return "bg-black/70";
  }
}

function renderTitle(
  slide: HeroSlide
) {
  if (
    !slide.highlight ||
    !slide.title.includes(
      slide.highlight
    )
  ) {
    return slide.title;
  }

  const [
    before,
    after,
  ] = slide.title.split(
    slide.highlight
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
  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    paused,
    setPaused,
  ] = useState(false);

  const total =
    slides.length;

  useEffect(() => {
    if (
      total <= 1 ||
      paused
    ) {
      return;
    }

    const timer =
      window.setInterval(() => {
        setActiveIndex(
          (current) =>
            (
              current + 1
            ) % total
        );
      }, 7000);

    return () =>
      window.clearInterval(timer);
  }, [
    paused,
    total,
  ]);

  useEffect(() => {
    if (
      activeIndex >= total
    ) {
      setActiveIndex(0);
    }
  }, [
    activeIndex,
    total,
  ]);

  if (!total) {
    return null;
  }

  function previous() {
    setActiveIndex(
      (current) =>
        (
          current -
          1 +
          total
        ) % total
    );
  }

  function next() {
    setActiveIndex(
      (current) =>
        (
          current + 1
        ) % total
    );
  }

  const activeSlide =
    slides[activeIndex];

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

      {slides.map(
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
                `${slide.title}-${index}`
              }
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
                active
                  ? "z-10 opacity-100"
                  : "z-0 opacity-0"
              }`}
              aria-hidden={
                !active
              }
            >

              <Image
                src={slide.image}
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

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(201,162,39,.18),transparent_35%)]" />

              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

            </div>

          );
        }
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 bg-gradient-to-t from-black/55 to-transparent" />

      <div className="relative z-30 mx-auto flex min-h-[calc(100svh-5rem)] max-w-[90rem] items-center px-5 py-24">

        <div className="max-w-4xl text-paper">

          <div
            key={
              activeSlide._id ||
              activeIndex
            }
            className="animate-fade-up"
          >

            {activeSlide.eyebrow && (

              <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">

                {
                  activeSlide.eyebrow
                }

              </p>

            )}

            <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[.96] text-white sm:text-7xl lg:text-8xl">

              {renderTitle(
                activeSlide
              )}

            </h1>

            {activeSlide.text && (

              <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">

                {
                  activeSlide.text
                }

              </p>

            )}

            <div className="mt-9 flex flex-wrap gap-3">

              {activeSlide.primaryText &&
                activeSlide.primaryLink && (

                  <ButtonLink
                    href={
                      activeSlide.primaryLink
                    }
                  >

                    {
                      activeSlide.primaryText
                    }

                  </ButtonLink>

                )}

              {activeSlide.secondaryText &&
                activeSlide.secondaryLink && (

                  <ButtonLink
                    href={
                      activeSlide.secondaryLink
                    }
                    variant="secondary"
                  >

                    {
                      activeSlide.secondaryText
                    }

                  </ButtonLink>

                )}

            </div>

          </div>

        </div>

      </div>

      {/* SLIDE NUMBER */}

      <div className="absolute left-5 top-6 z-40 flex items-baseline gap-2 text-white sm:left-8 sm:top-8">

        <span className="font-display text-2xl text-gold">

          {String(
            activeIndex + 1
          ).padStart(
            2,
            "0"
          )}

        </span>

        <span className="text-xs text-white/50">

          /
          {" "}
          {String(total).padStart(
            2,
            "0"
          )}

        </span>

      </div>

      {/* CONTROLS */}

      {total > 1 && (

        <div className="absolute bottom-7 left-5 right-5 z-40 flex items-end justify-between gap-6 sm:bottom-10 sm:left-8 sm:right-8">

          <div className="flex flex-1 gap-2">

            {slides.map(
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
                  aria-label={`Go to slide ${
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

          <div className="flex shrink-0 gap-2">

            <button
              type="button"
              aria-label="Previous slide"
              onClick={previous}
              className="grid h-11 w-11 place-items-center border border-white/30 text-white transition hover:border-gold hover:text-gold"
            >
              ←
            </button>

            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
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

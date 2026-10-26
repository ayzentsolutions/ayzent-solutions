"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export interface HeroSlide {
  id?: string;
  _id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  text?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  primaryText?: string;
  primaryLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
  image?: string;
  alt?: string;
  active?: boolean;
  published?: boolean;
  order?: number;
  displayOrder?: number;
}

type Props = {
  slides?: HeroSlide[];
  style?: CSSProperties;
  hidden?: boolean;
  "data-layout"?: string;
  "data-home-section"?: string;
  imageOverride?: string;
};

export function HomeHeroCarousel({
  slides = [],
  style,
  hidden,
  "data-layout": layoutVariant,
  "data-home-section": sectionKey,
  imageOverride,
}: Props) {
  const activeSlides = useMemo(
    () =>
      [...slides]
        .filter((slide) => slide.active !== false && slide.published !== false)
        .sort((a, b) => (a.order ?? a.displayOrder ?? 0) - (b.order ?? b.displayOrder ?? 0)),
    [slides],
  );
  const contentSlide = activeSlides[0];
  const content = {
    eyebrow: contentSlide?.eyebrow || "",
    title: contentSlide?.title || "Ayzent Solutions",
    description: contentSlide?.description || contentSlide?.text || "",
    primaryButtonText: contentSlide?.primaryButtonText || contentSlide?.primaryText || "Contact us",
    primaryButtonLink: contentSlide?.primaryButtonLink || contentSlide?.primaryLink || "/contact",
    secondaryButtonText: contentSlide?.secondaryButtonText || contentSlide?.secondaryText || "Services",
    secondaryButtonLink: contentSlide?.secondaryButtonLink || contentSlide?.secondaryLink || "/services",
  };
  const slideImages = activeSlides.filter(
    (slide) => typeof slide.image === "string" && slide.image.trim(),
  );
  const images = imageOverride
    ? [{ id: "section-image", image: imageOverride, alt: content.title }, ...slideImages.filter((slide) => slide.image !== imageOverride)]
    : slideImages;
  const [selected, setSelected] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const currentImage: HeroSlide | undefined = images[selected] || images[0];

  useEffect(() => {
    setImageFailed(false);
  }, [currentImage?.image]);

  return (
    <section
      style={style}
      hidden={hidden}
      data-layout={layoutVariant}
      data-home-section={sectionKey || "hero"}
      className="home-section relative isolate overflow-hidden border-b border-[#27344A] bg-[#080D18] text-[#E2E8F0]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 15% 0%, rgb(71 123 255 / .12), transparent 48%), linear-gradient(90deg, transparent 0, transparent calc(50% - 1px), rgb(39 52 74 / .35) 50%, transparent calc(50% + 1px), transparent 100%)",
        }}
      />
      <Container
        className={`relative z-10 grid min-h-[min(720px,calc(100svh-76px))] gap-10 py-12 sm:py-16 lg:items-center lg:gap-12 lg:py-20 ${currentImage && !imageFailed ? "lg:grid-cols-[.95fr_1.05fr]" : "max-w-5xl"}`}
      >
        <div className="relative z-10 max-w-3xl">
          {content.eyebrow && (
            <p className="text-sm font-medium text-[#8AA8FF]">{content.eyebrow}</p>
          )}
          <h1 className="mt-5 max-w-4xl text-balance font-display text-[clamp(3rem,8vw,7rem)] font-semibold leading-[.94] tracking-[-.055em]">
            {content.title}
          </h1>
          {content.description && (
            <p className="mt-7 max-w-xl text-base leading-7 text-[#B0BBD0] sm:text-lg sm:leading-8">
              {content.description}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
            <ButtonLink href={content.primaryButtonLink} className="bg-[#477BFF] px-6 text-white hover:bg-[#345FD1]">
              {content.primaryButtonText}
              <span aria-hidden="true" className="ml-2">↗</span>
            </ButtonLink>
            {content.secondaryButtonText && (
              <Link
                href={content.secondaryButtonLink}
                className="inline-flex min-h-12 items-center gap-3 border border-[#27344A] px-5 text-sm text-[#E2E8F0] transition-colors hover:border-[#6792FF] hover:bg-[#131D30]"
              >
                {content.secondaryButtonText}
                <span aria-hidden="true">↗</span>
              </Link>
            )}
          </div>
        </div>

        {currentImage?.image && !imageFailed && (
          <div className="relative min-w-0 lg:pl-3">
            <div className="relative aspect-[4/3] overflow-hidden border border-[#27344A] bg-[#0D1423] sm:aspect-[5/4]">
              <Image
                src={currentImage.image}
                alt={currentImage.alt || currentImage.title || "Ayzent Solutions"}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                onError={() => setImageFailed(true)}
              />
            </div>
            {images.length > 1 && (
              <div className="flex flex-wrap items-center gap-2 pt-4" aria-label="Hero images">
                {images.map((slide, index) => (
                  <button
                    key={slide._id || slide.id || slide.image}
                    type="button"
                    onClick={() => {
                      setSelected(index);
                      setImageFailed(false);
                    }}
                    aria-label={`Show image ${index + 1}`}
                    aria-pressed={selected === index}
                    className={`min-h-9 min-w-9 border px-3 text-sm focus-visible:outline-offset-4 ${selected === index ? "border-[#6792FF] bg-[#131D30]" : "border-[#27344A] hover:border-[#6792FF]"}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

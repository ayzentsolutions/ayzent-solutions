import Image from "next/image";
import type { CSSProperties } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
  primaryText?: string;
  primaryLink?: string;
  image?: string;
  layoutVariant?: "editorial" | "compact" | "image-led";
  backgroundVariant?: "midnight" | "navy" | "elevated";
  style?: CSSProperties;
  hidden?: boolean;
  "data-layout"?: string;
  "data-section-key"?: string;
};

const backgrounds = { midnight: "#080D18", navy: "#0D1423", elevated: "#131D30" } as const;

export function PageHero({
  eyebrow,
  title,
  text,
  primaryText,
  primaryLink,
  image,
  layoutVariant = "editorial",
  backgroundVariant = "midnight",
  style,
  hidden,
  "data-layout": configuredLayout,
  "data-section-key": sectionKey,
}: PageHeroProps) {
  return (
    <section
      hidden={hidden}
      data-layout={configuredLayout || layoutVariant}
      data-section-key={sectionKey || "hero"}
      data-has-image={image ? "true" : "false"}
      style={{ backgroundColor: backgrounds[backgroundVariant], ...style }}
      className="page-hero relative isolate overflow-hidden border-b border-[#27344A] bg-[#080D18] text-[#E2E8F0]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 12% 0%, rgb(71 123 255 / .10), transparent 48%)",
        }}
      />
      <Container
        className={`page-hero-grid relative z-10 grid gap-10 py-14 sm:py-20 lg:py-24 ${image ? "min-h-[25rem] lg:min-h-[32rem] lg:grid-cols-[minmax(0,1.2fr)_minmax(15rem,.8fr)] lg:items-end lg:gap-16" : "min-h-[22rem] max-w-5xl"}`}
      >
        <div className="max-w-4xl min-w-0">
          {eyebrow && <p className="text-sm font-medium text-[#8AA8FF]">{eyebrow}</p>}
          <h1 className="mt-6 max-w-5xl text-balance font-display text-5xl font-semibold leading-[.96] tracking-[-.05em] sm:text-6xl md:text-7xl lg:text-[5.6rem]">
            {title}
          </h1>
          {text && (
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#B0BBD0] sm:mt-8 sm:text-lg sm:leading-8">
              {text}
            </p>
          )}
          {primaryText && (
            <div className="mt-7">
              <ButtonLink
                href={primaryLink || "/contact"}
                className="bg-[#477BFF] text-white hover:bg-[#345FD1]"
              >
                {primaryText}
                <span aria-hidden="true" className="ml-2">↗</span>
              </ButtonLink>
            </div>
          )}
        </div>

        {image && (
          <div className="relative min-w-0 lg:pl-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#27344A] bg-[#131D30] sm:aspect-[5/4]">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

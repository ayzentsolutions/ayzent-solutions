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

export function PageHero({ eyebrow, title, text, primaryText, primaryLink, image, layoutVariant = "editorial", backgroundVariant = "midnight", style, hidden, "data-layout": configuredLayout, "data-section-key": sectionKey }: PageHeroProps) {
  return (
    <section hidden={hidden} data-layout={configuredLayout || layoutVariant} data-section-key={sectionKey || "hero"} style={{ backgroundColor: backgrounds[backgroundVariant], ...style }} className="page-hero relative isolate overflow-hidden border-b border-[#27344A] bg-[#080D18] text-[#E2E8F0]">
      <div aria-hidden="true" className="grid-blueprint pointer-events-none absolute inset-0 opacity-50" />
      <Container className="page-hero-grid relative grid min-h-[25rem] gap-10 py-14 sm:py-20 lg:min-h-[32rem] lg:grid-cols-[minmax(0,1.2fr)_minmax(15rem,.8fr)] lg:items-end lg:gap-16 lg:py-24">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3"><span className="h-px w-10 bg-[#477BFF]" /><p className="eyebrow text-[#8AA8FF]">{eyebrow}</p></div>
          <h1 className="mt-6 max-w-5xl text-balance font-display text-5xl font-semibold leading-[.94] tracking-[-.05em] sm:text-6xl md:text-7xl lg:text-[5.6rem]">{title}</h1>
          {text && <p className="mt-6 max-w-2xl text-base leading-7 text-[#94A3B8] sm:mt-8 sm:text-lg sm:leading-8">{text}</p>}
          {primaryText && <div className="mt-7"><ButtonLink href={primaryLink || "/contact"} className="bg-[#477BFF] text-white hover:bg-[#345FD1]">{primaryText}<span aria-hidden="true" className="ml-2">↗</span></ButtonLink></div>}
        </div>
        <div className={`page-hero-art relative min-h-56 items-end ${image ? "flex" : "hidden lg:flex"}`}>
          {image ? <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#27344A] bg-[#131D30] sm:aspect-[5/4]"><Image src={image} alt={title} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /></div> : <div className="w-full border border-[#27344A] bg-[#0D1423] p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-[#27344A] pb-4"><span className="eyebrow text-[#94A3B8]">Ayzent / Field notes</span><span className="font-mono text-xs text-[#6792FF]">A—01</span></div>
            <div className="mt-7 grid grid-cols-[1fr_auto] items-end gap-4"><div><div className="h-2 w-4/5 bg-[#477BFF]/80" /><div className="mt-3 h-2 w-3/5 bg-[#27344A]" /><div className="mt-3 h-2 w-2/5 bg-[#27344A]" /></div><div className="grid h-16 w-16 place-items-center border border-[#477BFF]/50 bg-[#477BFF]/10 font-display text-2xl text-[#8AA8FF]">A.</div></div>
            <div className="mt-7 grid grid-cols-3 gap-2"><div className="h-9 border border-[#27344A] bg-[#131D30]" /><div className="h-9 border border-[#27344A] bg-[#131D30]" /><div className="h-9 border border-[#27344A] bg-[#477BFF]/15" /></div>
          </div>}
          <div aria-hidden="true" className="absolute -bottom-3 -left-3 h-8 w-8 border-b border-l border-[#477BFF]" />
        </div>
      </Container>
    </section>
  );
}

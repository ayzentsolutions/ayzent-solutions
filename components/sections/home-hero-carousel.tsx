"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export interface HeroSlide {
  id?: string; _id?: string; eyebrow?: string; title?: string; description?: string; text?: string; primaryButtonText?: string; primaryButtonLink?: string; primaryText?: string; primaryLink?: string;
  secondaryButtonText?: string; secondaryButtonLink?: string; secondaryText?: string; secondaryLink?: string; image?: string; alt?: string; active?: boolean; published?: boolean; order?: number; displayOrder?: number;
}
type Props = { slides?: HeroSlide[]; style?: CSSProperties; hidden?: boolean; "data-layout"?: string; "data-home-section"?: string; imageOverride?: string };
const fallback = { eyebrow: "AYZENT SOLUTIONS / DIGITAL ENGINEERING", title: "Ideas into impact.", description: "We engineer digital experiences and products for teams ready to make their next move.", primaryButtonText: "Start a project", primaryButtonLink: "/contact", secondaryButtonText: "Explore selected work", secondaryButtonLink: "/projects" };

export function HomeHeroCarousel({ slides = [], style, hidden, "data-layout": layoutVariant, "data-home-section": sectionKey, imageOverride }: Props) {
  const activeSlides = useMemo(() => [...slides].filter(slide => slide.active !== false && slide.published !== false).sort((a,b) => (a.order ?? a.displayOrder ?? 0) - (b.order ?? b.displayOrder ?? 0)), [slides]);
  const contentSlide = activeSlides[0];
  const content = {
    eyebrow: contentSlide?.eyebrow || fallback.eyebrow,
    title: contentSlide?.title || fallback.title,
    description: contentSlide?.description || contentSlide?.text || fallback.description,
    primaryButtonText: contentSlide?.primaryButtonText || contentSlide?.primaryText || fallback.primaryButtonText,
    primaryButtonLink: contentSlide?.primaryButtonLink || contentSlide?.primaryLink || fallback.primaryButtonLink,
    secondaryButtonText: contentSlide?.secondaryButtonText || contentSlide?.secondaryText || fallback.secondaryButtonText,
    secondaryButtonLink: contentSlide?.secondaryButtonLink || contentSlide?.secondaryLink || fallback.secondaryButtonLink
  };
  const slideImages = activeSlides.filter(slide => typeof slide.image === "string" && slide.image.trim());
  const images = imageOverride ? [{ id: "section-image", image: imageOverride, alt: content.title }, ...slideImages.filter(slide => slide.image !== imageOverride)] : slideImages;
  const [selected, setSelected] = useState(0);
  const currentImage: HeroSlide | undefined = images[selected] || images[0];
  return (
    <section style={style} hidden={hidden} data-layout={layoutVariant} data-home-section={sectionKey || "hero"} className="home-section relative isolate overflow-hidden border-b border-[#27344A] bg-[#080D18] text-[#E2E8F0]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0,transparent_calc(50%-1px),rgba(39,52,74,.45)_50%,transparent_calc(50%+1px),transparent_100%)] opacity-40" />
      <Container className="relative grid min-h-[min(790px,calc(100svh-76px))] gap-12 py-12 sm:py-16 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-8 lg:py-20">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3"><span className="h-px w-10 bg-[#477BFF]" /><p className="eyebrow text-[#8AA8FF]">{content.eyebrow}</p></div>
          <h1 className="mt-7 max-w-4xl text-balance font-display text-[clamp(3.5rem,8.4vw,7.6rem)] font-semibold leading-[.86] tracking-[-.065em]">{content.title}</h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#94A3B8] sm:mt-9 sm:text-lg sm:leading-8">{content.description}</p>
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
            <ButtonLink href={content.primaryButtonLink} className="bg-[#477BFF] px-6 text-white hover:bg-[#345FD1]">{content.primaryButtonText}<span aria-hidden="true" className="ml-2">↗</span></ButtonLink>
            <Link href={content.secondaryButtonLink} className="inline-flex min-h-12 items-center gap-3 border border-[#27344A] px-5 text-sm text-[#E2E8F0] transition-colors hover:border-[#6792FF] hover:bg-[#131D30]">{content.secondaryButtonText}<span aria-hidden="true">↗</span></Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#27344A] pt-5 text-[10px] uppercase tracking-[.17em] text-[#64748B] sm:mt-16"><span>Strategy</span><span>Engineering</span><span>Digital products</span><span>Experience</span></div>
        </div>
        <div className="relative min-w-0 lg:pl-6">
          <div aria-hidden="true" className="absolute -inset-4 border border-[#27344A] sm:-inset-6" />
          <div className="relative overflow-hidden border border-[#27344A] bg-[#0D1423] p-3 sm:p-4">
            <div className="flex items-center justify-between border-b border-[#27344A] px-2 pb-3"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#25C6B7]" /><span className="text-[10px] uppercase tracking-[.2em] text-[#94A3B8]">Selected visual / 0{selected+1}</span></div><span className="font-mono text-[10px] text-[#64748B]">AYZ—SYS</span></div>
            <div className="relative mt-3 aspect-[4/4.2] overflow-hidden bg-[#131D30] sm:aspect-[5/4.2]">
              {currentImage ? <Image src={currentImage.image!} alt={currentImage.alt || currentImage.title || "Ayzent Solutions featured work"} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /> : <div className="absolute inset-0 p-5 sm:p-8"><div className="grid h-full grid-cols-[1fr_.65fr] gap-3"><div className="flex flex-col justify-between border border-[#27344A] bg-[#0D1423] p-4 sm:p-6"><div className="flex gap-1.5"><i className="h-2 w-2 rounded-full bg-[#477BFF]" /><i className="h-2 w-2 rounded-full bg-[#25C6B7]" /><i className="h-2 w-2 rounded-full bg-[#64748B]" /></div><div><div className="h-2 w-4/5 bg-[#477BFF]/70" /><div className="mt-3 h-2 w-3/5 bg-[#27344A]" /><div className="mt-8 grid grid-cols-2 gap-2"><div className="h-16 border border-[#27344A] bg-[#131D30]" /><div className="h-16 border border-[#27344A] bg-[#131D30]" /></div></div></div><div className="flex flex-col gap-3"><div className="h-[42%] border border-[#27344A] bg-[#477BFF]/15" /><div className="flex-1 border border-[#27344A] bg-[#25C6B7]/10" /></div></div></div>}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#080D18]/95 via-[#080D18]/40 to-transparent p-5 pt-20 sm:p-7 sm:pt-24"><p className="eyebrow text-[#8AA8FF]">Design meets delivery</p><p className="mt-2 max-w-md font-display text-2xl leading-tight text-white sm:text-3xl">{currentImage?.title || content.title}</p><p className="mt-2 max-w-md text-xs leading-5 text-white/65">{currentImage?.description || content.description}</p></div>
            </div>
            {images.length > 1 && <div className="flex items-center justify-between gap-3 px-1 pt-3"><p className="text-[10px] uppercase tracking-[.16em] text-[#64748B]">Featured imagery</p><div className="flex gap-2">{images.map((slide,index)=><button key={slide._id || slide.id || slide.image} type="button" onClick={()=>setSelected(index)} aria-label={`Show featured image ${index+1}`} aria-pressed={selected===index} className={`h-2.5 w-8 border transition-colors ${selected===index ? "border-[#477BFF] bg-[#477BFF]" : "border-[#27344A] bg-[#131D30] hover:border-[#6792FF]"}`} />)}</div></div>}
          </div>
          <div className="relative mt-3 flex justify-between gap-4 text-[10px] uppercase tracking-[.16em] text-[#64748B]"><span>Digital systems / 01</span><span>Clarity in complexity ↗</span></div>
        </div>
      </Container>
    </section>
  );
}

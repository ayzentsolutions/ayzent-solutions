"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export interface HeroSlide {
  id?: string; _id?: string; eyebrow?: string; title?: string; description?: string; primaryButtonText?: string; primaryButtonLink?: string;
  secondaryButtonText?: string; secondaryButtonLink?: string; image?: string; alt?: string; active?: boolean; order?: number; displayOrder?: number;
}
type Props = { slides?: HeroSlide[] };
const fallback = { eyebrow: "AYZENT SOLUTIONS / DIGITAL ENGINEERING", title: "Ideas into impact.", description: "We engineer digital experiences and products for teams ready to make their next move.", primaryButtonText: "Start a project", primaryButtonLink: "/contact", secondaryButtonText: "Explore selected work", secondaryButtonLink: "/projects" };

export function HomeHeroCarousel({ slides = [] }: Props) {
  const activeSlides = useMemo(() => [...slides].filter(slide => slide.active !== false).sort((a,b) => (a.order ?? a.displayOrder ?? 0) - (b.order ?? b.displayOrder ?? 0)), [slides]);
  const contentSlide = activeSlides[0];
  const content = {
    eyebrow: contentSlide?.eyebrow || fallback.eyebrow,
    title: contentSlide?.title || fallback.title,
    description: contentSlide?.description || fallback.description,
    primaryButtonText: contentSlide?.primaryButtonText || fallback.primaryButtonText,
    primaryButtonLink: contentSlide?.primaryButtonLink || fallback.primaryButtonLink,
    secondaryButtonText: contentSlide?.secondaryButtonText || fallback.secondaryButtonText,
    secondaryButtonLink: contentSlide?.secondaryButtonLink || fallback.secondaryButtonLink
  };
  const images = activeSlides.filter(slide => typeof slide.image === "string" && slide.image.trim());
  const [index, setIndex] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (images.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % images.length), 7000);
    return () => window.clearInterval(timer);
  }, [images.length]);
  useEffect(() => { if (index >= images.length) setIndex(0); }, [index, images.length]);
  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({ x: ((event.clientX - bounds.left) / bounds.width - .5) * 14, y: ((event.clientY - bounds.top) / bounds.height - .5) * 14 });
  };
  const resetPointer = () => setPointer({ x: 0, y: 0 });
  return (
    <section onPointerMove={handlePointerMove} onPointerLeave={resetPointer} className="relative isolate overflow-hidden bg-[#08152B] text-[#F5F1E8]">
      <div aria-hidden="true" className="grid-blueprint pointer-events-none absolute inset-0 -z-20 opacity-80" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#246BFF]/20 blur-[110px] sm:h-[46rem] sm:w-[46rem]" />
      {images.map((slide, imageIndex) => <div key={slide._id || slide.id || slide.image} aria-hidden="true" className={`absolute inset-y-0 right-0 -z-10 w-full transition-opacity duration-1000 lg:w-[57%] ${imageIndex === index ? "opacity-35" : "opacity-0"}`}><Image src={slide.image!} alt={slide.alt || ""} fill priority={imageIndex === 0} sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" /></div>)}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#08152B] via-[#08152B]/90 to-[#08152B]/30" />
      <Container className="relative grid min-h-[calc(100svh-76px)] gap-10 py-14 sm:py-20 lg:min-h-[calc(100svh-76px)] lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-12 lg:py-20">
        <div className="motion-reveal relative z-10 max-w-4xl">
          <div className="flex items-center gap-3"><span className="h-px w-10 bg-[#66A0FF]" /><p className="eyebrow text-[#66A0FF]">{content.eyebrow}</p></div>
          <h1 className="mt-7 max-w-5xl text-balance font-display text-[clamp(3.3rem,10vw,7.8rem)] font-semibold leading-[.88] tracking-[-.06em]">{content.title}</h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/65 sm:mt-9 sm:text-lg sm:leading-8">{content.description}</p>
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
            <ButtonLink href={content.primaryButtonLink} className="magnetic min-h-12 bg-[#246BFF] px-6 text-white hover:bg-[#1452D5]">{content.primaryButtonText}<span aria-hidden="true" className="ml-2">↗</span></ButtonLink>
            <Link href={content.secondaryButtonLink} className="inline-flex min-h-12 items-center gap-3 border border-white/20 px-5 text-sm text-white/80 transition hover:border-[#66A0FF] hover:text-white">{content.secondaryButtonText}<span aria-hidden="true">↗</span></Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/15 pt-5 text-[10px] uppercase tracking-[.2em] text-white/40 sm:mt-16"><span>Strategy</span><span className="text-[#66A0FF]">•</span><span>Design</span><span className="text-[#66A0FF]">•</span><span>Engineering</span><span className="text-[#66A0FF]">•</span><span>Growth</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-xl lg:ml-auto" style={{transform:`translate3d(${pointer.x}px,${pointer.y}px,0)`,transition:"transform 180ms ease-out"}}>
          <div aria-hidden="true" className="absolute -inset-5 rounded-full border border-[#66A0FF]/20 sm:-inset-8" />
          <div aria-hidden="true" className="absolute -inset-10 rounded-full border border-dashed border-white/10 motion-safe:animate-orbit-slow" />
          <div className="relative aspect-[1.03] overflow-hidden border border-white/20 bg-[#0D203B] p-4 sm:p-6">
            <div className="grid-blueprint absolute inset-0 opacity-50" />
            <div aria-hidden="true" className="absolute left-[12%] top-[12%] h-20 w-20 rounded-full bg-[#246BFF]/40 blur-2xl" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between"><span className="eyebrow text-white/45">Engineering / visual system</span><span className="flex items-center gap-2 text-[10px] text-[#2ED3C2]"><span className="h-1.5 w-1.5 rounded-full bg-[#2ED3C2]" /> ACTIVE</span></div>
              <div className="relative flex flex-1 items-center justify-center py-7">
                <div aria-hidden="true" className="absolute h-[72%] aspect-square rounded-full border border-[#66A0FF]/25" /><div aria-hidden="true" className="absolute h-[52%] aspect-square rounded-full border border-[#66A0FF]/40" />
                <div className="relative grid h-[42%] aspect-square place-items-center bg-[#246BFF] shadow-[0_0_90px_rgba(36,107,255,.35)]"><span className="font-display text-5xl font-semibold text-white sm:text-7xl">A.</span></div>
                <div aria-hidden="true" className="absolute left-[9%] top-[22%] h-3 w-3 bg-[#2ED3C2]" /><div aria-hidden="true" className="absolute bottom-[19%] right-[12%] h-2 w-2 rounded-full bg-[#66A0FF]" />
                <div aria-hidden="true" className="absolute right-[7%] top-[15%] h-16 w-16 border border-white/15 bg-white/[.04] backdrop-blur" />
              </div>
              <div className="flex items-end justify-between gap-3 border-t border-white/15 pt-4"><div><p className="text-xs text-white/40">From first principles</p><p className="mt-1 text-sm font-medium">Built to move forward.</p></div><span className="font-mono text-xs text-[#66A0FF]">AYZ—01</span></div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-3 border border-white/15 bg-[#F5F1E8] px-4 py-3 text-[#08152B] shadow-2xl sm:-left-7 sm:px-5"><p className="eyebrow text-[#246BFF]">Make it useful</p><p className="mt-1 font-display text-lg">Then make it exceptional.</p></div>
          {images.length > 1 && <div className="absolute -right-1 top-4 flex gap-1.5 sm:-right-4">{images.map((slide,i)=><button key={slide._id || slide.id || i} type="button" aria-label={`Show visual ${i+1}`} aria-pressed={index===i} onClick={()=>setIndex(i)} className={`h-1.5 rounded-full transition-all ${index===i ? "w-8 bg-[#66A0FF]" : "w-3 bg-white/35"}`} />)}</div>}
        </div>
      </Container>
    </section>
  );
}

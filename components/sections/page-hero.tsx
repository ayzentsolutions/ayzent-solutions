import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

type PageHeroProps = { eyebrow: string; title: string; text: string; primaryText?: string; primaryLink?: string; };

export function PageHero({ eyebrow, title, text, primaryText, primaryLink }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#08152B] text-[#F5F1E8]">
      <div aria-hidden="true" className="grid-blueprint pointer-events-none absolute inset-0 -z-20 opacity-70" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[28rem] w-[28rem] rounded-full border border-[#66A0FF]/25 sm:h-[42rem] sm:w-[42rem]">
        <div className="absolute inset-8 rounded-full border border-[#66A0FF]/20 sm:inset-16" /><div className="absolute inset-20 rounded-full border border-[#66A0FF]/15 sm:inset-32" />
      </div>
      <Container className="relative grid min-h-[25rem] gap-8 py-14 sm:py-20 lg:min-h-[34rem] lg:grid-cols-[minmax(0,1.15fr)_minmax(15rem,.85fr)] lg:items-end lg:gap-12 lg:py-24">
        <div className="motion-reveal max-w-4xl">
          <div className="flex items-center gap-3"><span className="h-px w-9 bg-[#66A0FF]" /><p className="eyebrow text-[#66A0FF]">{eyebrow}</p></div>
          <h1 className="mt-6 max-w-5xl text-balance font-display text-5xl font-semibold leading-[.98] tracking-[-.045em] sm:text-6xl md:text-7xl lg:text-[5.5rem]">{title}</h1>
          {text && <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:mt-8 sm:text-lg sm:leading-8">{text}</p>}
          {primaryText && <div className="mt-7"><ButtonLink href={primaryLink || "/contact"} className="bg-[#246BFF] text-white hover:bg-[#1452D5]">{primaryText}<span aria-hidden="true" className="ml-2">↗</span></ButtonLink></div>}
        </div>
        <div className="relative hidden min-h-52 items-end justify-end lg:flex">
          <div className="relative w-full max-w-xs border border-white/15 bg-white/[.04] p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between"><span className="eyebrow text-white/40">Studio / 01</span><span className="h-2 w-2 rounded-full bg-[#2ED3C2]" /></div>
            <div aria-hidden="true" className="mt-7 flex h-20 items-end gap-2">{[38,72,49,92,62,82,42,100,68,86,55,75].map((height,index)=><span key={index} className="flex-1 bg-gradient-to-t from-[#246BFF]/25 to-[#66A0FF]" style={{height:`${height}%`}} />)}</div>
            <p className="mt-5 text-xs text-white/55">Ideas translated into useful digital systems.</p>
          </div>
          <div aria-hidden="true" className="absolute -right-3 -top-4 h-12 w-12 border border-[#66A0FF]/60 bg-[#246BFF]/20 backdrop-blur" />
        </div>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[.22em] text-white/35 lg:absolute lg:bottom-7 lg:left-1/2"><span>Scroll to explore</span><span className="h-px w-10 bg-white/20" /><span>01—04</span></div>
      </Container>
    </section>
  );
}

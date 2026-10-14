import { Container } from "@/components/ui/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
};

export function PageHero({ eyebrow, title, text }: PageHeroProps) {
  return (
    <section className="page-hero relative isolate overflow-hidden border-b border-line bg-surface py-16 sm:py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-24 -top-36 h-72 w-72 rounded-full border border-gold/20 sm:h-[28rem] sm:w-[28rem]" />
        <div className="absolute -right-12 -top-24 h-56 w-56 rounded-full border border-gold/15 sm:h-[22rem] sm:w-[22rem]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>
      <Container>
        <div className="max-w-5xl motion-reveal">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-gold sm:w-12" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
          </div>
          <h1 className="mt-6 max-w-5xl text-balance font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl xl:text-8xl">
            {title}
          </h1>
          {text ? (
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:mt-8 sm:text-lg sm:leading-8">
              {text}
            </p>
          ) : null}
          <div aria-hidden="true" className="mt-10 flex items-center gap-3 sm:mt-14">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="h-px w-16 bg-line sm:w-24" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Ideas. Engineered.</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

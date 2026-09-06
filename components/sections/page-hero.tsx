import { Container } from "@/components/ui/container";

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="border-b border-line py-16 sm:py-24"><Container><p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">{eyebrow}</p><h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">{title}</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{text}</p></Container></section>;
}

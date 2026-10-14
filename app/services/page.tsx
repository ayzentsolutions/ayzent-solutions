import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { getServices } from "@/lib/content";
export const dynamic = "force-dynamic";
export default async function ServicesPage() {
  const services = await getServices();
  return <><PageHero eyebrow="Capabilities / 01" title="Engineering the useful, beautifully." text="Explore the services currently offered by Ayzent Solutions." primaryText="Talk through a challenge" primaryLink="/contact"/>
    <section className="bg-[#F5F1E8] py-12 text-[#08152B] sm:py-20 lg:py-28"><Container><div className="grid gap-8 lg:grid-cols-[.45fr_1.55fr]"><div className="lg:sticky lg:top-32 lg:h-fit"><p className="eyebrow text-[#246BFF]">The toolkit</p><p className="mt-4 max-w-xs text-sm leading-7 text-[#647087]">A clear view of the services in our current catalogue.</p><Link href="/projects" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold">See the work ↗</Link></div><div className="border-t border-[#08152B]/15">{services.map((service,index)=><article key={service.title} className="group grid gap-4 border-b border-[#08152B]/15 py-7 transition-colors hover:bg-white/50 sm:grid-cols-[4rem_1fr_auto] sm:gap-6 sm:py-9"><span className="font-mono text-xs text-[#246BFF]">0{index+1}</span><div><h2 className="font-display text-2xl leading-tight sm:text-3xl lg:text-4xl">{service.title}</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-[#647087] sm:text-base">{service.text}</p></div><span aria-hidden="true" className="hidden h-10 w-10 place-items-center border border-[#08152B]/20 transition group-hover:border-[#246BFF] group-hover:bg-[#246BFF] group-hover:text-white sm:grid">↗</span></article>)}</div></div>{!services.length && <p className="py-12 text-sm text-[#647087]">Services are being updated. Contact the studio for current availability.</p>}</Container></section>
    <section className="bg-[#DCE8FF] py-14 text-[#08152B] sm:py-20"><Container className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="eyebrow text-[#246BFF]">Next step</p><h2 className="mt-3 font-display text-3xl sm:text-4xl">Need a mix of capabilities?</h2></div><ButtonLink href="/contact">Tell us about the work ↗</ButtonLink></Container></section></>;
}

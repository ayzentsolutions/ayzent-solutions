import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HomeHeroCarousel } from "@/components/sections/home-hero-carousel";
import { ProjectCard } from "@/components/sections/project-card";
import { getAboutContent, getClientLogos, getFaqs, getHeroSlides, getProducts, getProjects, getServices, getSiteSettings, getTestimonials } from "@/lib/content";

export const revalidate = 60;

export default async function Home() {
  const [heroSlides, faqs, projects, services, testimonials, clientLogos, settings, products, about] = await Promise.all([
    getHeroSlides(), getFaqs(), getProjects(), getServices(), getTestimonials(), getClientLogos(), getSiteSettings(), getProducts(), getAboutContent()
  ]);
  const featuredProjects = (projects.some(project => project.featured) ? projects.filter(project => project.featured) : projects).slice(0, 4);
  const featuredProducts = products.filter(product => product.status === "published").slice(0, 3);
  const story = [about.storyParagraphOne, about.storyParagraphTwo].filter(Boolean).join(" ");
  return (
    <>
      <HomeHeroCarousel slides={heroSlides} />
      <section className="relative overflow-hidden bg-[#F5F1E8] py-16 text-[#08152B] sm:py-24 lg:py-32">
        <Container className="grid gap-9 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <div className="eyebrow flex items-start gap-3 text-[#246BFF]"><span className="mt-2 h-px w-8 bg-[#246BFF]" />{about.storyEyebrow || "The studio"}</div>
          <div>
            <h2 className="max-w-5xl font-display text-4xl leading-[1.04] tracking-[-.04em] sm:text-5xl lg:text-7xl">{story || settings.footerDescription || settings.companyName || "Ideas. Engineered."}</h2>
            <div className="mt-8 flex flex-col justify-between gap-6 border-t border-[#08152B]/15 pt-5 sm:flex-row sm:items-end">
              <p className="max-w-xl text-sm leading-7 text-[#647087] sm:text-base">{about.heroText || about.mission || settings.footerDescription || ""}</p>
              <Link href="/about" className="inline-flex min-h-11 shrink-0 items-center gap-3 text-sm font-semibold text-[#08152B] transition hover:text-[#246BFF]">Get to know us <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#08152B] py-16 text-[#F5F1E8] sm:py-24 lg:py-32">
        <Container>
          <div className="grid gap-7 border-b border-white/15 pb-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><p className="eyebrow text-[#66A0FF]">01 / Capabilities</p><h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">Complexity, made useful.</h2></div>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><p className="max-w-md text-sm leading-7 text-white/55">The capabilities available from the studio, shaped around the work our clients need done.</p><Link href="/services" className="inline-flex min-h-11 items-center gap-2 text-sm text-[#66A0FF] hover:text-white">All capabilities ↗</Link></div>
          </div>
          {services.length ? <div className="mt-3 grid gap-0 md:grid-cols-2 lg:grid-cols-3">{services.slice(0, 6).map((service,index)=><Link href="/services" key={service.title} className={`group relative min-h-56 border-b border-white/15 p-5 transition-colors hover:bg-white/[.04] sm:p-7 lg:min-h-64 ${index % 3 !== 0 ? "lg:border-l lg:border-white/15" : ""} ${index === 1 ? "lg:translate-y-8" : ""}`}><div className="flex items-center justify-between"><span className="font-mono text-xs text-[#66A0FF]">0{index+1}</span><span aria-hidden="true" className="grid h-9 w-9 place-items-center border border-white/20 transition group-hover:border-[#66A0FF] group-hover:bg-[#246BFF]">↗</span></div><h3 className="mt-9 max-w-xs font-display text-2xl leading-tight sm:text-3xl">{service.title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-white/50">{service.text}</p></Link>)}</div> : <p className="py-10 text-white/60">Capabilities are being updated.</p>}
        </Container>
      </section>

      <section className="bg-[#E8E5DC] py-16 text-[#08152B] sm:py-24 lg:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow text-[#246BFF]">02 / Selected work</p><h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.02] tracking-[-.035em] sm:text-5xl lg:text-6xl">Proof lives in the work.</h2></div><Link href="/projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold">Explore the portfolio <span aria-hidden="true">↗</span></Link></div>
          {featuredProjects.length ? <div className="mt-10 grid gap-9 sm:mt-14 md:grid-cols-2 md:gap-x-8 lg:gap-x-12">{featuredProjects.map((project,index)=><div key={project.slug} className={index % 2 === 1 ? "md:mt-24" : ""}><ProjectCard project={project}/></div>)}</div> : <div className="mt-10 border-t border-[#08152B]/15 py-8 text-sm text-[#647087]">Portfolio projects are being prepared.</div>}
        </Container>
      </section>

      {featuredProducts.length > 0 && <section className="bg-[#F5F1E8] py-16 text-[#08152B] sm:py-24 lg:py-32"><Container>
        <div className="grid gap-7 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><p className="eyebrow text-[#246BFF]">03 / Products</p><h2 className="mt-5 font-display text-4xl leading-[1.02] sm:text-5xl">Digital products, out in the world.</h2></div><div className="flex items-end justify-between gap-5"><p className="max-w-lg text-sm leading-7 text-[#647087]">Explore published products and platforms from the Ayzent catalogue.</p><Link href="/products" className="hidden min-h-11 shrink-0 items-center text-sm font-semibold sm:inline-flex">All products ↗</Link></div></div>
        <div className="mt-10 grid gap-5 lg:grid-cols-12">{featuredProducts.map((product,index)=><Link key={product.slug} href={`/products/${product.slug}`} className={`group relative min-w-0 overflow-hidden border border-[#08152B]/10 bg-[#08152B] text-[#F5F1E8] ${index === 0 ? "lg:col-span-7" : "lg:col-span-5"}`}><div className="relative aspect-[5/3] overflow-hidden">{product.coverImage ? <Image src={product.coverImage} alt={`${product.name} product preview`} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition duration-700 group-hover:scale-105"/> : <div aria-hidden="true" className="grid-blueprint absolute inset-0 bg-gradient-to-br from-[#102746] to-[#08152B]"><div className="absolute left-1/4 top-1/4 h-32 w-32 border border-[#66A0FF]/40 bg-[#246BFF]/20"/></div>}<span className="absolute left-4 top-4 border border-white/25 bg-[#08152B]/70 px-3 py-1.5 text-[10px] uppercase tracking-[.18em] backdrop-blur">{product.category || "Product"}</span><span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center border border-white/40 bg-[#08152B]/60 text-xl transition group-hover:bg-[#246BFF]">↗</span></div><div className="flex items-end justify-between gap-5 p-5 sm:p-7"><div><h3 className="font-display text-2xl sm:text-3xl">{product.name}</h3><p className="mt-2 max-w-lg text-sm leading-6 text-white/55">{product.shortDescription}</p></div><span className="hidden text-xs text-[#66A0FF] sm:block">0{index+1}</span></div></Link>)}</div>
      </Container></section>}

      {testimonials.length > 0 && <section className="bg-[#DCE8FF] py-16 text-[#08152B] sm:py-24 lg:py-28"><Container><div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr]"><div><p className="eyebrow text-[#246BFF]">04 / Perspective</p><h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">A useful signal from the people we work with.</h2></div><div className="grid gap-4 md:grid-cols-2">{testimonials.slice(0,2).map((item,index)=><figure key={`${item.clientName}-${index}`} className="flex min-h-64 flex-col justify-between border border-[#08152B]/15 bg-[#F5F1E8]/65 p-6 sm:p-8"><blockquote className="font-display text-xl leading-relaxed sm:text-2xl">“{item.text}”</blockquote><figcaption className="mt-8 border-t border-[#08152B]/15 pt-4"><p className="text-sm font-semibold">{item.clientName}</p>{item.roleCompany && <p className="mt-1 text-xs text-[#647087]">{item.roleCompany}</p>}</figcaption></figure>)}</div></div>
        {clientLogos.length > 0 && <div className="mt-12 border-t border-[#08152B]/15 pt-7"><p className="eyebrow text-[#647087]">Organisations and brands</p><div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-5">{clientLogos.slice(0,8).map((client,index)=><span key={`${client.name}-${index}`} className="text-sm font-semibold tracking-wide text-[#08152B]/65">{client.name}</span>)}</div></div>}
      </Container></section>}

      {faqs.length > 0 && <section className="bg-[#F5F1E8] py-16 text-[#08152B] sm:py-24"><Container className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:gap-16"><div><p className="eyebrow text-[#246BFF]">Questions</p><h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">A few things worth knowing.</h2><Link href="/contact" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold">Ask us directly ↗</Link></div><div className="divide-y divide-[#08152B]/15 border-y border-[#08152B]/15">{faqs.slice(0,6).map(([question,answer],index)=><details key={`${question}-${index}`} className="group py-5"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-medium sm:text-lg"><span>{question}</span><span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center border border-[#08152B]/20 transition group-open:rotate-45 group-open:bg-[#246BFF] group-open:text-white">+</span></summary><p className="max-w-3xl pb-2 pt-4 text-sm leading-7 text-[#647087]">{answer}</p></details>)}</div></Container></section>}

      <section className="relative isolate overflow-hidden bg-[#08152B] py-16 text-[#F5F1E8] sm:py-24 lg:py-32"><div aria-hidden="true" className="grid-blueprint pointer-events-none absolute inset-0 -z-10 opacity-50"/><div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full border border-[#66A0FF]/25 sm:h-[42rem] sm:w-[42rem]"/><Container className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><div><p className="eyebrow text-[#66A0FF]">{settings.homeCtaEyebrow || "Your next move"}</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[.95] tracking-[-.04em] sm:text-6xl lg:text-8xl">{settings.homeCtaTitle || "Have a challenge worth solving?"}</h2></div><div><p className="max-w-md text-sm leading-7 text-white/55">{settings.footerDescription || ""}</p><div className="mt-7 flex flex-wrap gap-3"><ButtonLink href={settings.homeCtaButtonLink || "/contact"} className="bg-[#246BFF] text-white hover:bg-[#1452D5]">{settings.homeCtaButtonText || "Discuss your requirements"} ↗</ButtonLink><Link href="/contact" className="inline-flex min-h-12 items-center border border-white/20 px-5 text-sm hover:border-[#66A0FF]">Contact ↗</Link></div></div></Container></section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HomeHeroCarousel } from "@/components/sections/home-hero-carousel";
import { ProjectCard } from "@/components/sections/project-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { getAboutContent, getClientLogos, getFaqs, getHeroSlides, getProducts, getProjects, getServices, getSiteSettings, getTestimonials } from "@/lib/content";

export const revalidate = 60;

export default async function Home() {
  const [heroSlides, faqs, projects, services, testimonials, clientLogos, settings, products, about] = await Promise.all([
    getHeroSlides(), getFaqs(), getProjects(), getServices(), getTestimonials(), getClientLogos(), getSiteSettings(), getProducts(), getAboutContent()
  ]);
  const featuredProjects = (projects.some(project => project.featured) ? projects.filter(project => project.featured) : projects).slice(0, 4);
  const featuredProducts = products.filter(product => product.status === "published").slice(0, 4);
  const story = [about.storyParagraphOne, about.storyParagraphTwo].filter(Boolean).join(" ");
  const values = (about.values || []).filter(Boolean).slice(0, 4);
  return (
    <>
      <HomeHeroCarousel slides={heroSlides} />

      <section className="border-b border-[#27344A] bg-[#0D1423] py-14 sm:py-20 lg:py-28">
        <Container className="grid gap-8 lg:grid-cols-[.45fr_1.55fr] lg:gap-16">
          <div><p className="eyebrow flex items-center gap-3 text-[#8AA8FF]"><span className="h-px w-8 bg-[#477BFF]" />{about.storyEyebrow || "The studio"}</p><p className="mt-4 max-w-xs text-sm leading-6 text-[#64748B]">{about.heroText || about.mission || ""}</p></div>
          <div><h2 className="max-w-5xl font-display text-3xl leading-[1.08] tracking-[-.04em] sm:text-4xl lg:text-6xl">{story || settings.footerDescription || settings.companyName || "Ayzent Solutions"}</h2><div className="mt-8 flex flex-col justify-between gap-5 border-t border-[#27344A] pt-5 sm:flex-row sm:items-end"><p className="max-w-xl text-sm leading-7 text-[#94A3B8] sm:text-base">{about.mission || settings.footerDescription || ""}</p><Link href="/about" className="inline-flex min-h-11 shrink-0 items-center gap-3 text-sm font-semibold text-[#8AA8FF] hover:text-white">About the studio <span aria-hidden="true">↗</span></Link></div></div>
        </Container>
      </section>

      <section className="bg-[#080D18] py-14 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-7 border-b border-[#27344A] pb-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="eyebrow text-[#8AA8FF]">01 / Capabilities</p><h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">Complexity, made useful.</h2></div><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><p className="max-w-md text-sm leading-7 text-[#94A3B8]">{settings.footerDescription || about.heroText || ""}</p><Link href="/services" className="inline-flex min-h-11 items-center gap-2 text-sm text-[#8AA8FF] hover:text-white">All capabilities ↗</Link></div></div>
          {services.length ? <div className="mt-3 grid gap-0 md:grid-cols-2 lg:grid-cols-3">{services.slice(0, 6).map((service,index)=><ScrollReveal key={service.title} delay={index*45} className={`min-w-0 ${index===1 ? "lg:translate-y-7" : ""}`}><Link href="/services" className="group block min-h-56 border-b border-[#27344A] p-5 transition-colors hover:bg-[#0D1423] sm:p-7 lg:min-h-64"><div className="flex items-center justify-between"><span className="font-mono text-xs text-[#6792FF]">0{index+1}</span><span aria-hidden="true" className="grid h-9 w-9 place-items-center border border-[#27344A] text-[#94A3B8] transition group-hover:border-[#477BFF] group-hover:bg-[#477BFF] group-hover:text-white">↗</span></div><h3 className="mt-9 max-w-xs font-display text-2xl leading-tight sm:text-3xl">{service.title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-[#94A3B8]">{service.text}</p></Link></ScrollReveal>)}</div> : <p className="py-10 text-[#94A3B8]">Capabilities are being updated.</p>}
        </Container>
      </section>

      <section className="border-y border-[#27344A] bg-[#0D1423] py-14 sm:py-20 lg:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow text-[#8AA8FF]">02 / Selected work</p><h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.02] tracking-[-.035em] sm:text-5xl lg:text-6xl">Proof lives in the work.</h2></div><Link href="/projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#E2E8F0] hover:text-[#8AA8FF]">Explore the portfolio <span aria-hidden="true">↗</span></Link></div>
          {featuredProjects.length ? <div className="mt-10 grid gap-9 sm:mt-14 md:grid-cols-2 md:gap-x-8 lg:gap-x-12">{featuredProjects.map((project,index)=><ScrollReveal key={project.slug} delay={index*70} className={index%2 ? "md:mt-24" : ""}><ProjectCard project={project}/></ScrollReveal>)}</div> : <div className="mt-10 border-t border-[#27344A] py-8 text-sm text-[#94A3B8]">Portfolio projects are being prepared.</div>}
        </Container>
      </section>

      {featuredProducts.length > 0 && <section className="bg-[#080D18] py-14 sm:py-20 lg:py-28"><Container><div className="grid gap-7 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><p className="eyebrow text-[#8AA8FF]">03 / Products</p><h2 className="mt-5 font-display text-4xl leading-[1.02] sm:text-5xl">Digital products, out in the world.</h2></div><div className="flex items-end justify-between gap-5"><p className="max-w-lg text-sm leading-7 text-[#94A3B8]">{settings.footerDescription || ""}</p><Link href="/products" className="hidden min-h-11 shrink-0 items-center text-sm font-semibold text-[#8AA8FF] hover:text-white sm:inline-flex">All products ↗</Link></div></div><ProductShowcase products={featuredProducts}/></Container></section>}

      {(about.mission || about.vision || values.length > 0) && <section className="border-y border-[#27344A] bg-[#131D30] py-14 sm:py-20 lg:py-24"><Container><div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow text-[#8AA8FF]">04 / Studio</p><h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{about.valuesEyebrow || about.storyEyebrow || about.teamTitle || settings.companyName || "The studio"}</h2><p className="mt-5 max-w-sm text-sm leading-7 text-[#94A3B8]">{about.teamText || about.heroText || ""}</p></div><div className="grid gap-0 sm:grid-cols-2">{[about.mission,about.vision,...values].filter(Boolean).map((item,index)=><article key={`${item}-${index}`} className="border-t border-[#27344A] py-5 sm:p-6"><span className="font-mono text-xs text-[#6792FF]">0{index+1}</span><p className="mt-3 font-display text-xl leading-snug sm:text-2xl">{item}</p></article>)}</div></div></Container></section>}

      {(testimonials.length > 0 || clientLogos.length > 0) && <section className="bg-[#0D1423] py-14 sm:py-20 lg:py-24"><Container>
        {testimonials.length > 0 && <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr]"><div><p className="eyebrow text-[#8AA8FF]">05 / Perspective</p><h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">A useful signal from the people we work with.</h2></div><div className="grid gap-4 md:grid-cols-2">{testimonials.slice(0,2).map((item,index)=><figure key={`${item.clientName}-${index}`} className="flex min-h-64 flex-col justify-between border border-[#27344A] bg-[#131D30] p-6 sm:p-8"><blockquote className="font-display text-xl leading-relaxed sm:text-2xl">“{item.text}”</blockquote><figcaption className="mt-8 border-t border-[#27344A] pt-4"><p className="text-sm font-semibold">{item.clientName}</p>{item.roleCompany && <p className="mt-1 text-xs text-[#94A3B8]">{item.roleCompany}</p>}</figcaption></figure>)}</div></div>}
        {clientLogos.length > 0 && <div className="mt-12 border-t border-[#27344A] pt-7"><p className="eyebrow text-[#94A3B8]">Organisations and brands</p><div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-5">{clientLogos.slice(0,8).map((client,index)=>{const logo=client.logo||client.image;const visual=logo?<Image src={logo} alt={client.name} width={180} height={72} sizes="(max-width:640px) 40vw,160px" className="max-h-12 w-auto max-w-36 object-contain opacity-75 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"/>:<span className="text-sm font-semibold tracking-wide text-[#94A3B8]">{client.name}</span>;return client.link||client.url?<a key={`${client.name}-${index}`} href={client.link||client.url} target="_blank" rel="noopener noreferrer" className="group flex min-h-12 items-center">{visual}</a>:<span key={`${client.name}-${index}`} className="group flex min-h-12 items-center">{visual}</span>;})}</div></div>}
      </Container></section>}

      {faqs.length > 0 && <section className="bg-[#080D18] py-14 sm:py-20"><Container className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:gap-16"><div><p className="eyebrow text-[#8AA8FF]">Questions</p><h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">A few things worth knowing.</h2><Link href="/contact" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#8AA8FF] hover:text-white">Ask us directly ↗</Link></div><div className="divide-y divide-[#27344A] border-y border-[#27344A]">{faqs.slice(0,6).map(([question,answer],index)=><details key={`${question}-${index}`} className="group py-5"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-medium sm:text-lg"><span>{question}</span><span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center border border-[#27344A] transition group-open:rotate-45 group-open:bg-[#477BFF] group-open:text-white">+</span></summary><p className="max-w-3xl pb-2 pt-4 text-sm leading-7 text-[#94A3B8]">{answer}</p></details>)}</div></Container></section>}

      <section className="border-t border-[#27344A] bg-[#131D30] py-14 sm:py-20 lg:py-28"><Container className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><div><p className="eyebrow text-[#8AA8FF]">{settings.homeCtaEyebrow || "Your next move"}</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[.94] tracking-[-.04em] sm:text-6xl lg:text-8xl">{settings.homeCtaTitle || "Have a challenge worth solving?"}</h2></div><div><p className="max-w-md text-sm leading-7 text-[#94A3B8]">{settings.footerDescription || ""}</p><div className="mt-7 flex flex-wrap gap-3"><ButtonLink href={settings.homeCtaButtonLink || "/contact"} className="bg-[#477BFF] text-white hover:bg-[#345FD1]">{settings.homeCtaButtonText || "Discuss your requirements"} ↗</ButtonLink><Link href="/contact" className="inline-flex min-h-12 items-center border border-[#27344A] px-5 text-sm hover:border-[#6792FF]">Contact ↗</Link></div></div></Container></section>
    </>
  );
}

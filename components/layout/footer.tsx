import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SocialLinks } from "@/components/social/social-links";
import { getServices, getSiteSettings } from "@/lib/content";

const quickLinks = [{ href: "/about", label: "Studio" }, { href: "/services", label: "Services" }, { href: "/projects", label: "Work" }, { href: "/products", label: "Products" }, { href: "/blog", label: "Journal" }, { href: "/careers", label: "Careers" }, { href: "/contact", label: "Contact" }];

export async function Footer() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const whatsappNumber = settings.whatsapp?.replace(/\D/g, "").trim();
  const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}` : undefined;
  const companyName = settings.companyName || "Ayzent Solutions";
  const footerDescription = settings.footerDescription || "Ideas. Engineered.";
  return (
    <footer className="relative isolate overflow-hidden bg-[#08152B] text-[#F5F1E8]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[30rem] w-[30rem] rounded-full border border-[#66A0FF]/20 sm:h-[42rem] sm:w-[42rem]"><div className="absolute inset-8 rounded-full border border-[#66A0FF]/15 sm:inset-16" /><div className="absolute inset-20 rounded-full border border-[#66A0FF]/10 sm:inset-32" /></div>
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.3fr_.7fr_.8fr_1fr] lg:gap-14 lg:py-24">
        <div className="min-w-0">
          <p className="eyebrow text-[#66A0FF]">A good place to begin</p>
          <h2 className="mt-5 max-w-md font-display text-4xl leading-[1.02] sm:text-5xl">Bring us the hard problem.</h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">{footerDescription}</p>
          <ButtonLink href={settings.headerButtonLink || "/contact"} className="magnetic mt-7 bg-[#246BFF] text-white hover:bg-[#1452D5]">{settings.headerButtonText || "Start a project"} <span aria-hidden="true" className="ml-2">↗</span></ButtonLink>
          <div className="mt-7"><SocialLinks /></div>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-col items-start gap-3">
          <h3 className="eyebrow mb-2 text-white/35">Explore</h3>{quickLinks.map(link => <Link key={link.href} href={link.href} className="text-sm text-white/65 transition-colors hover:text-[#66A0FF]">{link.label}</Link>)}
        </nav>
        <nav aria-label="Footer services" className="flex flex-col items-start gap-3">
          <h3 className="eyebrow mb-2 text-white/35">Capabilities</h3>{services.slice(0, 6).map(service => <Link key={service.title} href="/services" className="text-sm text-white/65 transition-colors hover:text-[#66A0FF]">{service.title}</Link>)}{!services.length && <Link href="/services" className="text-sm text-white/65">Explore services</Link>}
        </nav>
        <div className="min-w-0">
          <h3 className="eyebrow mb-4 text-white/35">Keep in touch</h3>
          <div className="flex flex-col items-start gap-3 text-sm text-white/65">{settings.email && <a className="break-all hover:text-white" href={`mailto:${settings.email}`}>{settings.email}</a>}{whatsappLink && <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp ↗</a>}{settings.phone && <a href={`tel:${settings.phone}`} className="hover:text-white">{settings.phone}</a>}{settings.location && <p>{settings.location}</p>}</div>
          <div className="mt-6"><NewsletterForm /></div>
        </div>
      </Container>
      <div className="border-t border-white/10"><Container className="flex flex-col justify-between gap-3 py-5 text-[11px] text-white/40 sm:flex-row sm:items-center"><p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p><p className="tracking-[.16em] uppercase">Built for what comes next.</p><Link href="/search" className="hover:text-white">Search ↗</Link></Container></div>
    </footer>
  );
}

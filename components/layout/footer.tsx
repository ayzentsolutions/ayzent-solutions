import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SocialLinks } from "@/components/social/social-links";
import { getNavigation, getServices, getSiteSettings } from "@/lib/content";

export async function Footer() {
  const [settings, services, navigation] = await Promise.all([getSiteSettings(), getServices(), getNavigation()]);
  const cmsLinks = navigation.filter(item => item.location === "footer" || item.location === "both").map(({ href, label }) => ({ href, label }));
  const quickLinks = cmsLinks;
  const whatsappNumber = settings.whatsapp?.replace(/\D/g, "").trim();
  const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}` : undefined;
  const companyName = settings.companyName || "Ayzent Solutions";
  const footerDescription = settings.footerDescription || "Contact Ayzent Solutions about a website or software project.";
  return (
    <footer className="relative isolate overflow-hidden bg-[#080D18] text-[#E2E8F0]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[30rem] w-[30rem] rounded-full border border-[#6792FF]/20 sm:h-[42rem] sm:w-[42rem]"><div className="absolute inset-8 rounded-full border border-[#6792FF]/15 sm:inset-16" /><div className="absolute inset-20 rounded-full border border-[#6792FF]/10 sm:inset-32" /></div>
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.3fr_.7fr_.8fr_1fr] lg:gap-14 lg:py-24">
        <div className="min-w-0">
          <p className="eyebrow text-[#6792FF]">Contact</p>
          <h2 className="mt-5 max-w-md font-display text-4xl leading-[1.02] sm:text-5xl">Contact Ayzent Solutions</h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">{footerDescription}</p>
          <ButtonLink href={settings.headerButtonLink || "/contact"} className="mt-7 bg-[#477BFF] text-white hover:bg-[#345FD1]">{settings.headerButtonText || "Start a project"} <span aria-hidden="true" className="ml-2">↗</span></ButtonLink>
          <div className="mt-7"><SocialLinks /></div>
        </div>
        {quickLinks.length > 0 && <nav aria-label="Footer navigation" className="flex flex-col items-start gap-3">
          <h3 className="eyebrow mb-2 text-white/35">Explore</h3>{quickLinks.map(link => <Link key={link.href} href={link.href} className="text-sm text-white/65 transition-colors hover:text-[#6792FF]">{link.label}</Link>)}
        </nav>}
        {services.length > 0 && <nav aria-label="Footer services" className="flex flex-col items-start gap-3">
          <h3 className="eyebrow mb-2 text-white/35">Capabilities</h3>{services.slice(0, 6).map(service => <Link key={service.slug || service.title} href={service.slug ? `/services/${service.slug}` : "/services"} className="text-sm text-white/65 transition-colors hover:text-[#6792FF]">{service.title}</Link>)}
        </nav>}
        <div className="min-w-0">
          <h3 className="eyebrow mb-4 text-white/35">Keep in touch</h3>
          <div className="flex flex-col items-start gap-3 text-sm text-white/65">{settings.email && <a className="break-all hover:text-white" href={`mailto:${settings.email}`}>{settings.email}</a>}{whatsappLink && <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp ↗</a>}{settings.phone && <a href={`tel:${settings.phone}`} className="hover:text-white">{settings.phone}</a>}{settings.location && <p>{settings.location}</p>}</div>
          <div className="mt-6"><NewsletterForm /></div>
        </div>
      </Container>
      <div className="border-t border-white/10"><Container className="flex flex-col justify-between gap-3 py-5 text-[11px] text-white/40 sm:flex-row sm:items-center"><p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p><Link href="/privacy" className="hover:text-white">Privacy notice</Link><Link href="/search" className="hover:text-white">Search</Link></Container></div>
    </footer>
  );
}

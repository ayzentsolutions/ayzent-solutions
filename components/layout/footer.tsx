import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SocialLinks } from "@/components/social/social-links";
import { getServices, getSiteSettings } from "@/lib/content";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export async function Footer() {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);

  const whatsappNumber = settings.whatsapp?.replace(/\D/g, "").trim();
  const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}` : undefined;
  const companyName = settings.companyName || "Ayzent Solutions";
  const footerDescription = settings.footerDescription || "Ideas. Engineered.";
  const footerLogo = settings.companyLogo;
  const headerButtonText = settings.headerButtonText || "Start a Project";
  const headerButtonLink = settings.headerButtonLink || "/contact";

  return (
    <footer className="border-t border-line bg-background">
      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.35fr_.8fr_1fr_1.2fr] lg:gap-12 lg:py-20">
        <div className="flex min-w-0 flex-col items-start gap-4">
          <Logo logo={footerLogo} companyName={companyName} />
          <p className="max-w-sm text-sm leading-7 text-muted">{footerDescription}</p>
          <SocialLinks />
          <ButtonLink href={headerButtonLink} variant="secondary" className="mt-2 min-h-11">
            {headerButtonText}
            <span aria-hidden="true">↗</span>
          </ButtonLink>
        </div>

        <nav aria-label="Footer quick links" className="flex flex-col items-start gap-3">
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">Explore</h2>
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-sm text-sm text-muted transition-colors hover:text-gold focus-visible:outline-offset-4">
              {link.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Footer services" className="flex flex-col items-start gap-3">
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">Capabilities</h2>
          {services.length ? services.slice(0, 7).map((service) => (
            <Link key={service.title} href="/services" className="rounded-sm text-sm text-muted transition-colors hover:text-gold focus-visible:outline-offset-4">
              {service.title}
            </Link>
          )) : <p className="text-sm text-muted">Services coming soon.</p>}
          <Link href="/services" className="mt-1 text-sm font-medium text-gold hover:text-foreground">All services <span aria-hidden="true">→</span></Link>
        </nav>

        <div className="flex min-w-0 flex-col items-start gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">Let&apos;s talk</h2>
          <div className="flex flex-col items-start gap-3 text-sm text-muted">
            {settings.email && <a href={`mailto:${settings.email}`} className="break-all transition-colors hover:text-gold">{settings.email}</a>}
            {whatsappLink && <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">Chat on WhatsApp ↗</a>}
            {settings.phone && <a href={`tel:${settings.phone}`} className="transition-colors hover:text-gold">{settings.phone}</a>}
            {settings.location && <p>{settings.location}</p>}
            {!settings.email && !settings.phone && !settings.location && !whatsappLink && <p>Let&apos;s start a conversation.</p>}
          </div>
          <div className="w-full max-w-sm pt-2">
            <NewsletterForm />
          </div>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col items-start justify-between gap-3 py-5 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
          <p className="tracking-wide">Built for what comes next.</p>
        </Container>
      </div>
    </footer>
  );
}

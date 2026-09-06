"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SocialLinks } from "@/components/social/social-links";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
];

const services = [
  "Website Development",
  "Digital Marketing",
  "SEO",
  "Website & Software Maintenance",
  "UI/UX Design",
  "Deployment & Cloud Services",
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="border-t border-line">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            A design and engineering studio building websites, brands, and
            digital products for companies ready to move faster.
          </p>
          <SocialLinks />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm text-foreground">Quick Links</h3>
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm text-foreground">Services</h3>
          {services.map((service) => (
            <Link
              key={service}
              href="/services"
              className="text-sm text-muted transition-colors hover:text-gold"
            >
              {service}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm text-foreground">Get in touch</h3>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <a href="mailto:hello@ayzent.com" className="transition-colors hover:text-gold">
              hello@ayzent.com
            </a>
            <a
              href="https://wa.me/00000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              Chat on WhatsApp
            </a>
            <p>Remote-first · Serving clients worldwide</p>
          </div>

          <NewsletterForm />
        </div>
      </Container>

      <div className="border-t border-line py-6">
        <Container className="flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Ayzent Solutions. All rights reserved.</p>
          <ButtonLink href="/contact" variant="ghost" className="px-0 py-0">
            Start a Project
          </ButtonLink>
        </Container>
      </div>
    </footer>
  );
}

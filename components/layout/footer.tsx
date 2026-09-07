
import Link from "next/link";

import {
  Container,
} from "@/components/ui/container";

import {
  Logo,
} from "@/components/ui/logo";

import {
  ButtonLink,
} from "@/components/ui/button";

import {
  NewsletterForm,
} from "@/components/forms/newsletter-form";

import {
  SocialLinks,
} from "@/components/social/social-links";

import {
  getServices,
  getSiteSettings,
} from "@/lib/content";

const quickLinks = [
  {
    href: "/about",
    label: "About",
  },

  {
    href: "/projects",
    label: "Projects",
  },

  {
    href: "/blog",
    label: "Blog",
  },

  {
    href: "/careers",
    label: "Careers",
  },
];

export async function Footer() {
  const [
    settings,
    services,
  ] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);

  const whatsappNumber =
    settings.whatsapp
      ?.replace(/\D/g, "")
      .trim();

  const whatsappLink =
    whatsappNumber
      ? `https://wa.me/${whatsappNumber}`
      : undefined;

  const companyName =
    settings.companyName ||
    "Ayzent Solutions";

  const footerDescription =
    settings.footerDescription ||
    "Ideas. Engineered.";

  const footerLogo =
    settings.companyLogo;

  const headerButtonText =
    settings.headerButtonText ||
    "Start a Project";

  const headerButtonLink =
    settings.headerButtonLink ||
    "/contact";

  return (
    <footer className="border-t border-line">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* COMPANY */}

        <div className="flex flex-col gap-4">
          <Logo
            logo={footerLogo}
            companyName={companyName}
          />

          <p className="max-w-md text-sm leading-relaxed text-white/60">
            {footerDescription}
          </p>

          <SocialLinks />
        </div>

        {/* QUICK LINKS */}

        <div className="flex flex-col gap-3">
          <h3 className="text-sm text-foreground">
            Quick Links
          </h3>

          {quickLinks.map(
            (link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* SERVICES */}

        <div className="flex flex-col gap-3">
          <h3 className="text-sm text-foreground">
            Services
          </h3>

          {services.length ? (
            services.map(
              (service) => (
                <Link
                  key={
                    service.title
                  }
                  href="/services"
                  className="text-sm text-muted transition-colors hover:text-gold"
                >
                  {service.title}
                </Link>
              )
            )
          ) : (
            <p className="text-sm text-muted">
              Services coming soon.
            </p>
          )}
        </div>

        {/* CONTACT */}

        <div className="flex flex-col gap-4">
          <h3 className="text-sm text-foreground">
            Get in touch
          </h3>

          <div className="flex flex-col gap-2 text-sm text-muted">
            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="transition-colors hover:text-gold"
              >
                {settings.email}
              </a>
            )}

            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gold"
              >
                Chat on WhatsApp
              </a>
            )}

            {settings.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="transition-colors hover:text-gold"
              >
                {settings.phone}
              </a>
            )}

            {settings.location && (
              <p>
                {settings.location}
              </p>
            )}

            {!settings.email &&
              !settings.phone &&
              !settings.location &&
              !whatsappLink && (
                <p>
                  Let&apos;s start a
                  conversation.
                </p>
              )}
          </div>

          <NewsletterForm />
        </div>
      </Container>

      {/* BOTTOM BAR */}

      <div className="border-t border-line py-6">
        <Container className="flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
          <p>
            &copy;{" "}
            {new Date().getFullYear()}{" "}
            {companyName}.
            {" "}
            All rights reserved.
          </p>

          <ButtonLink
            href={headerButtonLink}
            variant="ghost"
            className="px-0 py-0"
          >
            {headerButtonText}
          </ButtonLink>
        </Container>
      </div>
    </footer>
  );
}


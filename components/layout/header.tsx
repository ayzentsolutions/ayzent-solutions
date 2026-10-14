"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

type HeaderProps = {
  buttonText?: string;
  buttonLink?: string;
  logo?: string;
  companyName?: string;
};

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/products", label: "Our Products" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({
  buttonText = "Get a Quote",
  buttonLink = "/contact",
  logo,
  companyName = "Ayzent Solutions",
}: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/90 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
        <Logo logo={logo} companyName={companyName} />

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 text-sm transition-colors duration-200 hover:text-gold focus-visible:rounded-sm ${active ? "text-foreground after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-gold" : "text-muted"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <ButtonLink href={buttonLink} variant="primary">
            {buttonText}
          </ButtonLink>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-primary-navigation"
            className="relative flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-md border border-line transition-colors hover:bg-surface focus-visible:outline-offset-2"
          >
            <span className={`h-px w-5 bg-foreground transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-foreground transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`h-px w-5 bg-foreground transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </Container>

      <div
        id="mobile-primary-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className={`overflow-y-auto border-t border-line bg-background transition-[max-height,opacity] duration-300 ease-in-out lg:hidden ${open ? "max-h-[min(75vh,36rem)] opacity-100" : "pointer-events-none max-h-0 border-t-0 opacity-0"}`}
      >
        <Container className="flex flex-col gap-1 py-5">
          <nav aria-label="Mobile primary navigation" className="flex flex-col">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`rounded-md border-b border-line px-3 py-3.5 text-base transition-colors hover:bg-surface hover:text-gold last:border-b-0 ${active ? "font-semibold text-gold" : "text-foreground"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <ButtonLink href={buttonLink} variant="primary" className="mt-4 w-full">
            {buttonText}
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}

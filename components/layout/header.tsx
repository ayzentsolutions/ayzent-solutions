
"use client";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

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
  ThemeToggle,
} from "@/components/theme/theme-toggle";

type HeaderProps = {
  buttonText?: string;

  buttonLink?: string;

  logo?: string;

  companyName?: string;
};

const navLinks = [
  {
    href: "/about",
    label: "About",
  },

  {
    href: "/services",
    label: "Services",
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

  {
    href: "/contact",
    label: "Contact",
  },
];

export function Header({
  buttonText = "Get a Quote",

  buttonLink = "/contact",

  logo,

  companyName = "Ayzent Solutions",
}: HeaderProps) {
  const pathname =
    usePathname();

  const [
    open,
    setOpen,
  ] = useState(false);

  useEffect(() => {
    document.body.style.overflow =
      open
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (
    pathname.startsWith(
      "/admin"
    )
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        {/* LOGO */}

        <Logo
          logo={logo}
          companyName={companyName}
        />

        {/* DESKTOP NAVIGATION */}

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map(
            (link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* DESKTOP ACTIONS */}

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />

          <ButtonLink
            href={buttonLink}
            variant="primary"
          >
            {buttonText}
          </ButtonLink>
        </div>

        {/* MOBILE ACTIONS */}

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() =>
              setOpen(
                (value) =>
                  !value
              )
            }
            aria-label={
              open
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={open}
            className="relative flex h-9 w-9 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`h-px w-6 bg-foreground transition-transform duration-300 ${
                open
                  ? "translate-y-[3.5px] rotate-45"
                  : ""
              }`}
            />

            <span
              className={`h-px w-6 bg-foreground transition-opacity duration-300 ${
                open
                  ? "opacity-0"
                  : "opacity-100"
              }`}
            />

            <span
              className={`h-px w-6 bg-foreground transition-transform duration-300 ${
                open
                  ? "-translate-y-[5.5px] -rotate-45"
                  : ""
              }`}
            />
          </button>
        </div>
      </Container>

      {/* MOBILE MENU */}

      <div
        className={`overflow-hidden border-t border-line bg-background transition-[max-height] duration-300 ease-in-out lg:hidden ${
          open
            ? "max-h-[28rem]"
            : "max-h-0 border-t-0"
        }`}
      >
        <Container className="flex flex-col gap-1 py-6">
          {navLinks.map(
            (link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() =>
                  setOpen(false)
                }
                className="border-b border-line py-3 text-base text-foreground last:border-b-0"
              >
                {link.label}
              </Link>
            )
          )}

          <ButtonLink
            href={buttonLink}
            variant="primary"
            className="mt-5"
          >
            {buttonText}
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}


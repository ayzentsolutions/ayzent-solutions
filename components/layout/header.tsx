"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import Image from "next/image";

type NavigationLink = { href: string; label: string; location?: "header" | "footer" | "both" };
type HeaderProps = { buttonText?: string; buttonLink?: string; logo?: string; companyName?: string; navigation?: NavigationLink[] };
function isActivePath(pathname: string, href: string) { return pathname === href || pathname.startsWith(`${href}/`); }

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || resolvedTheme === "dark";
  return (
    <button type="button" onClick={() => setTheme(isDark ? "light" : "dark")} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} title={isDark ? "Switch to light mode" : "Switch to dark mode"} className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-current/20 px-3 text-sm font-medium transition-colors hover:border-[#477BFF] focus-visible:outline-offset-4">
      <span aria-hidden="true" className="text-base leading-none">{isDark ? "☀" : "☾"}</span>
      <span className="hidden sm:inline">{isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}

export function Header({ buttonText = "Start a project", buttonLink = "/contact", logo, companyName = "Ayzent Solutions", navigation = [] }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const navLinks = navigation.filter((item) => item.location === "header" || item.location === "both").map(({ href, label }) => ({ href, label }));
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); menuButtonRef.current?.focus(); } };
    document.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", closeOnEscape); };
  }, [open]);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { if (open) firstMenuLinkRef.current?.focus(); }, [open]);
  if (pathname.startsWith("/admin")) return null;
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080D18]/95 text-[#E2E8F0] backdrop-blur-2xl">
      <Container className="flex h-[76px] items-center justify-between gap-3 sm:gap-5">
        <Link href="/" aria-label={`${companyName} home`} className="group flex min-w-0 items-center gap-3">
          <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden"><Image src={logo || "/logo/mark-white.png"} alt="" fill sizes="40px" className="object-contain dark:brightness-0 dark:invert" /></span>
          <span className="min-w-0"><span className="block truncate text-sm font-semibold tracking-wide">{companyName}</span></span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);
            return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={`group relative py-3 text-[12px] transition-colors hover:text-white ${active ? "text-white" : "text-white/60"}`}>
              {link.label}<span aria-hidden="true" className={`absolute -bottom-0.5 left-0 h-px bg-[#6792FF] transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>;
          })}
        </nav>
        <div className="hidden items-center gap-3 xl:flex"><ThemeToggle /><ButtonLink href={buttonLink} className="border border-[#477BFF]/60 bg-[#477BFF] px-5 text-white hover:bg-[#345FD1]">{buttonText}<span aria-hidden="true" className="ml-2">↗</span></ButtonLink></div>
        <div className="flex items-center gap-2 xl:hidden"><ThemeToggle /><button ref={menuButtonRef} type="button" onClick={() => setOpen(v => !v)} aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-primary-navigation" className="grid h-11 w-11 shrink-0 place-items-center border border-white/20 text-white transition hover:border-[#6792FF]">
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span><span aria-hidden="true" className="text-xl">{open ? "×" : "☰"}</span>
        </button></div>
      </Container>
      <div id="mobile-primary-navigation" aria-hidden={!open} className={`fixed inset-x-0 top-[76px] z-50 overflow-y-auto border-t border-white/10 bg-[#080D18] transition-[max-height,opacity] duration-300 xl:hidden ${open ? "max-h-[calc(100dvh-76px)] opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}>
        <Container className="pb-8 pt-5">
          <nav aria-label="Mobile primary navigation" className="grid">
            {navLinks.map((link, index) => { const active = isActivePath(pathname, link.href); return <Link key={link.href} ref={index === 0 ? firstMenuLinkRef : undefined} href={link.href} tabIndex={open ? 0 : -1} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)} className={`flex min-h-14 items-center justify-between border-b border-white/10 py-4 text-lg ${active ? "text-[#6792FF]" : "text-white/80"}`}><span><span className="mr-4 text-xs text-white/30">0{index + 1}</span>{link.label}</span><span aria-hidden="true">↗</span></Link>; })}
          </nav>
          <ButtonLink href={buttonLink} tabIndex={open ? 0 : -1} className="mt-6 w-full bg-[#477BFF] text-white">{buttonText}<span aria-hidden="true" className="ml-2">↗</span></ButtonLink>
          <Link href="/contact" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="mt-5 inline-flex min-h-11 items-center text-sm text-white/60 hover:text-white">Contact the studio <span aria-hidden="true" className="ml-2">→</span></Link>
        </Container>
      </div>
    </header>
  );
}

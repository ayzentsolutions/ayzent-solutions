"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import Image from "next/image";

type NavigationLink = { href: string; label: string; location?: "header" | "footer" | "both" };
type HeaderProps = { buttonText?: string; buttonLink?: string; logo?: string; companyName?: string; navigation?: NavigationLink[] };
function isActivePath(pathname: string, href: string) { return pathname === href || pathname.startsWith(`${href}/`); }

export function Header({ buttonText = "Start a project", buttonLink = "/contact", logo, companyName = "Ayzent Solutions", navigation = [] }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navLinks = navigation.filter((item) => item.location === "header" || item.location === "both").map(({ href, label }) => ({ href, label }));
  const links = navLinks;
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", closeOnEscape); };
  }, [open]);
  useEffect(() => { setOpen(false); }, [pathname]);
  if (pathname.startsWith("/admin")) return null;
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080D18]/95 text-[#E2E8F0] backdrop-blur-2xl">
      <Container className="flex h-[76px] items-center justify-between gap-5">
        <Link href="/" aria-label={`${companyName} home`} className="group flex min-w-0 items-center gap-3">
          <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden"><Image src={logo || "/logo/mark-white.png"} alt="" fill sizes="40px" className="object-contain" /></span>
          <span className="min-w-0"><span className="block truncate text-sm font-semibold tracking-wide">{companyName}</span></span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 xl:flex">
          {links.map((link) => {
            const active = isActivePath(pathname, link.href);
            return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={`group relative py-3 text-[12px] transition-colors hover:text-white ${active ? "text-white" : "text-white/60"}`}>
              {link.label}<span aria-hidden="true" className={`absolute -bottom-0.5 left-0 h-px bg-[#6792FF] transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>;
          })}
        </nav>
        <div className="hidden items-center gap-4 xl:flex"><ButtonLink href={buttonLink} className="border border-[#477BFF]/60 bg-[#477BFF] px-5 text-white hover:bg-[#345FD1]">{buttonText}<span aria-hidden="true" className="ml-2">↗</span></ButtonLink></div>
        <div className="flex items-center gap-3 xl:hidden"><button type="button" onClick={() => setOpen(v => !v)} aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-primary-navigation" className="grid h-11 w-11 shrink-0 place-items-center border border-white/20 text-white transition hover:border-[#6792FF]">
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span><span aria-hidden="true" className="text-xl">{open ? "×" : "☰"}</span>
        </button></div>
      </Container>
      <div id="mobile-primary-navigation" aria-hidden={!open} className={`fixed inset-x-0 top-[76px] z-50 overflow-y-auto border-t border-white/10 bg-[#080D18] transition-[max-height,opacity] duration-300 xl:hidden ${open ? "max-h-[calc(100dvh-76px)] opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}>
        <Container className="pb-8 pt-5">
          <nav aria-label="Mobile primary navigation" className="grid">
            {navLinks.map((link, index) => { const active = isActivePath(pathname, link.href); return <Link key={link.href} href={link.href} tabIndex={open ? 0 : -1} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)} className={`flex min-h-14 items-center justify-between border-b border-white/10 py-4 text-lg ${active ? "text-[#6792FF]" : "text-white/80"}`}><span><span className="mr-4 text-xs text-white/30">0{index + 1}</span>{link.label}</span><span aria-hidden="true">↗</span></Link>; })}
          </nav>
          <ButtonLink href={buttonLink} className="mt-6 w-full bg-[#477BFF] text-white">{buttonText}<span aria-hidden="true" className="ml-2">↗</span></ButtonLink>
          <Link href="/contact" onClick={() => setOpen(false)} className="mt-5 inline-flex min-h-11 items-center text-sm text-white/60 hover:text-white">Contact the studio <span aria-hidden="true" className="ml-2">→</span></Link>
        </Container>
      </div>
    </header>
  );
}

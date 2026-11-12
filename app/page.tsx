import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Coming Soon",
  description: "Ayzent Solutions is coming soon.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const settings = await getSiteSettings();
  const logo = settings.companyLogo?.trim() || "/logo/logo-white.png";

  return (
    <section
      aria-labelledby="coming-soon-title"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#080D18] px-6 py-16 text-[#F8FAFC]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(71,123,255,0.12),transparent_58%)]"
      />
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        <Image
          src={logo}
          alt={settings.companyName || "Ayzent Solutions"}
          width={240}
          height={110}
          priority
          className="mb-14 h-auto max-h-20 w-auto max-w-[min(72vw,240px)] object-contain dark:brightness-0 dark:invert"
        />
        <h1
          id="coming-soon-title"
          className="font-display text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl md:text-7xl"
        >
          Coming Soon
        </h1>
        <Link
          href="/contact"
          className="mt-10 inline-flex min-h-12 items-center justify-center gap-3 border border-[#477BFF] bg-[#477BFF] px-7 text-sm font-semibold text-white transition-colors hover:border-[#6792FF] hover:bg-[#345FD1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8AA8FF]"
        >
          Contact for details
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}

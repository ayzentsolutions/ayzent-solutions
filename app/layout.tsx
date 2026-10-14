import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CursorAtmosphere } from "@/components/effects/cursor-atmosphere";
import { getActiveAnnouncement, getCmsPreviewSession, getNavigation, getSiteSettings } from "@/lib/content";
import { AnnouncementPopup } from "@/components/announcements/announcement-popup";
import { PublicSiteOnly } from "@/components/layout/public-site-only";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const companyName = settings.companyName || "Ayzent Solutions";
  const title = settings.seoTitle || companyName;
  const description = settings.seoDescription || settings.footerDescription || "Ideas. Engineered.";
  const socialImage = settings.socialImage || settings.companyLogo;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title: { default: title, template: `%s | ${companyName}` },
    description,
    alternates: { canonical: "/" },
    openGraph: { type: "website", siteName: companyName, title, description, images: socialImage ? [{ url: socialImage }] : undefined },
    twitter: { card: "summary_large_image", title, description, images: socialImage ? [socialImage] : undefined },
    icons: { icon: settings.companyLogo || "/favicon.ico" },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, navigation, announcement, previewSession] = await Promise.all([getSiteSettings(), getNavigation(), getActiveAnnouncement(), getCmsPreviewSession()]);
  const companyName = settings.companyName || "Ayzent Solutions";
  const headerButtonText = settings.headerButtonText || "Start a Project";
  const headerButtonLink = settings.headerButtonLink || "/contact";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background font-sans text-foreground antialiased`}>
        <CursorAtmosphere />
        <a href="#main-content" className="sr-only z-[100] rounded-md bg-background px-4 py-3 text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus-visible:outline-offset-4">
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <Header companyName={companyName} logo={settings.companyLogo} buttonText={headerButtonText} buttonLink={headerButtonLink} navigation={navigation} />
          <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 outline-none">
            {children}
          </main>
          <PublicSiteOnly>
            {previewSession && <aside className="relative z-[70] flex flex-wrap items-center justify-center gap-3 bg-[#477BFF] px-4 py-2 text-center text-xs font-semibold text-white sm:text-sm" role="status"><span>CMS preview mode · {previewSession.collection}</span><a href="/api/preview/exit" className="underline underline-offset-4">Exit preview</a></aside>}
            <Footer />
            <AnnouncementPopup announcement={announcement || undefined} />
          </PublicSiteOnly>
        </div>
      </body>
    </html>
  );
}

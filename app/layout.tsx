import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getNavigation, getSiteSettings } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const [settings, navigation] = await Promise.all([getSiteSettings(), getNavigation()]);
  const companyName = settings.companyName || "Ayzent Solutions";
  const description = settings.footerDescription || "Ideas. Engineered.";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title: { default: companyName, template: `%s | ${companyName}` },
    description,
    alternates: { canonical: "/" },
    openGraph: { type: "website", siteName: companyName, title: companyName, description },
    twitter: { card: "summary_large_image", title: companyName, description },
    icons: { icon: settings.companyLogo || "/favicon.ico" },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const companyName = settings.companyName || "Ayzent Solutions";
  const headerButtonText = settings.headerButtonText || "Start a Project";
  const headerButtonLink = settings.headerButtonLink || "/contact";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background font-sans text-foreground antialiased`}>
        <a href="#main-content" className="sr-only z-[100] rounded-md bg-background px-4 py-3 text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus-visible:outline-offset-4">
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <Header companyName={companyName} logo={settings.companyLogo} buttonText={headerButtonText} buttonLink={headerButtonLink} navigation={navigation} />
          <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

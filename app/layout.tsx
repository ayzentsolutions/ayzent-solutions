import type {
  Metadata,
} from "next";

import {
  Playfair_Display,
  Inter,
} from "next/font/google";

import "./globals.css";

import {
  ThemeProvider,
} from "@/components/theme/theme-provider";

import {
  Header,
} from "@/components/layout/header";

import {
  Footer,
} from "@/components/layout/footer";

import {
  GoogleAnalytics,
} from "@/components/analytics/google-analytics";

import {
  AnnouncementPopup,
} from "@/components/announcements/announcement-popup";

import {
  getActiveAnnouncement,
  getSiteSettings,
} from "@/lib/content";

const display =
  Playfair_Display({
    subsets: ["latin"],
    variable:
      "--font-display",
    weight: [
      "600",
      "700",
      "800",
    ],
  });

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: [
    "400",
    "500",
    "600",
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env
      .NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000"
  ),

  title: {
    default:
      "Ayzent Solutions",

    template:
      "%s | Ayzent Solutions",
  },

  description:
    "Ayzent Solutions builds websites, brands, and digital products for companies ready to move faster.",

  openGraph: {
    type: "website",

    siteName:
      "Ayzent Solutions",

    title:
      "Ayzent Solutions",

    description:
      "Ayzent Solutions builds websites, brands, and digital products for companies ready to move faster.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    announcement,
    settings,
  ] = await Promise.all([
    getActiveAnnouncement(),
    getSiteSettings(),
  ]);

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >

      <body
        className={`${display.variable} ${sans.variable} font-sans`}
      >

        <ThemeProvider>

          <Header
            buttonText={
              settings.headerButtonText
            }
            buttonLink={
              settings.headerButtonLink
            }
          />

          <main>
            {children}
          </main>

          <Footer />

          <AnnouncementPopup
            announcement={
              announcement
            }
          />

        </ThemeProvider>

        <GoogleAnalytics />

      </body>

    </html>
  );
}

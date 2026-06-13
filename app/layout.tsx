import type { Metadata } from "next";
import { IBM_Plex_Sans, Playfair_Display, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import Masthead from "@/components/Masthead";
import SiteFooter from "@/components/SiteFooter";
import { getCategories, SITE_NAME, SITE_URL } from "@/lib/api";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Carthage Courier — Tunisia's Paper of Record",
    template: "%s — Carthage Courier",
  },
  description:
    "Tunisia's English-language paper of record since 1886. Politics, economy, society, culture and sport from Tunis and the wider Maghreb, reported plainly and set in good type.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSerif.variable} ${plexSans.variable}`}
    >
      <body className="bg-paper font-body text-ink antialiased">
        {adClient && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Masthead categories={categories} />
        <main>{children}</main>
        <SiteFooter categories={categories} />
      </body>
    </html>
  );
}

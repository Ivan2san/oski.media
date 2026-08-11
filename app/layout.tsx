import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { getSite } from "@/lib/content";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-display",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-body",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();

  return {
    metadataBase: new URL(site.url),
    title: { default: site.title, template: `%s — ${site.name}` },
    description: site.description,
    keywords: [
      "sports videographer Sydney",
      "match day highlights",
      "AFL videographer",
      "NRL videographer",
      "football highlights Sydney",
      "club social content",
    ],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: site.title,
      description: site.description,
      url: site.url,
      locale: "en_AU",
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  colorScheme: "dark",
};

/**
 * Deliberately bare. The site's chrome — header, footer, structured data —
 * lives in the (site) route group so the Keystatic admin renders on its own
 * terms rather than inside a marketing header.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${archivo.variable} ${plex.variable}`}>
      <body>{children}</body>
    </html>
  );
}

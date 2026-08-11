/**
 * Static configuration — the things that aren't editable through the CMS
 * because changing them means changing the site, not its content.
 */
export const SITE_STATIC = {
  name: "oski.media",
  locality: "Sydney",
  region: "NSW",
  country: "AU",
  /**
   * Canonical origin. Set NEXT_PUBLIC_SITE_URL in Vercel when the custom
   * domain is attached; until then everything resolves against the
   * production vercel.app URL.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://oski-media.vercel.app",
} as const;

export const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
] as const;

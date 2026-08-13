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
   * Canonical origin. NEXT_PUBLIC_SITE_URL is set in Vercel; this fallback
   * only covers local dev and previews where it isn't.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.oski.media",
} as const;

export const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
] as const;

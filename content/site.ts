export const SITE = {
  name: "oski.media",
  title: "oski.media — Sydney sports videographer",
  tagline: "Match-day content for clubs that want to look pro",
  description:
    "Freelance sports videographer in Sydney. AFL, NRL and football match-day highlights, social cutdowns and club promos — shot, cut and delivered before the conversation moves on.",
  email: "hello@oski.media",
  instagram: "https://instagram.com/oski.media",
  tiktok: "https://tiktok.com/@oski.media",
  instagramHandle: "@oski.media",
  tiktokHandle: "@oski.media",
  locality: "Sydney",
  region: "NSW",
  country: "AU",
  /**
   * Canonical origin. Set NEXT_PUBLIC_SITE_URL in Vercel when the custom
   * domain is attached; until then everything resolves against the
   * preview/production vercel.app URL.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://oski-media.vercel.app",
} as const;

/**
 * The two one-off images that aren't tied to a project. Drop the file into
 * /public/images, uncomment the line, done — until then both slots render a
 * labelled placeholder instead of a broken image.
 */
export const IMAGES: { hero?: string; portrait?: string } = {
  // hero: "/images/showreel-poster.jpg",
  // portrait: "/images/oski-portrait.jpg",
};

export const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
] as const;

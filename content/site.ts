export const SITE = {
  name: "oski.media",
  title: "oski.media — Sydney sports videographer",
  tagline: "Match-day content for clubs that want to look pro",
  description:
    "Freelance sports videographer in Sydney. AFL, NRL and football match-day highlights, social cutdowns and club promos — shot, cut and delivered before the conversation moves on.",
  email: "hello@oski.media",
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
 * Social channels, in the order they appear in the footer, on the contact
 * page and in the JSON-LD `sameAs`. Add or remove one here and all three
 * follow.
 *
 * TODO: confirm the LinkedIn slug and YouTube handle — these are assumed
 * from the brand name, not verified.
 */
export type Social = { label: string; handle: string; href: string };

export const SOCIALS: Social[] = [
  {
    label: "Instagram",
    handle: "@oski.media",
    href: "https://instagram.com/oski.media",
  },
  {
    label: "YouTube",
    handle: "@oski.media",
    href: "https://youtube.com/@oski.media",
  },
  {
    label: "LinkedIn",
    handle: "oski-media",
    href: "https://linkedin.com/in/oski-media",
  },
];

/**
 * One-off images not tied to a project. Drop the file into /public/images,
 * uncomment the line, done — until then the slot renders a labelled
 * placeholder instead of a broken image.
 */
export const IMAGES: { portrait?: string } = {
  // portrait: "/images/oski-portrait.jpg",
};

/**
 * The hero bed — a silent looping cut, which is what the design called for
 * all along ("Showreel · muted loop" is printed in the corner of the hero).
 *
 * The current file is a stand-in: three graded stock frames, one per code,
 * cross-dissolving on a 9.6s seamless loop. Replace it with a real cut of
 * Oski's own footage and nothing else needs to change — keep it silent,
 * roughly 16:9, and under about a megabyte, since it autoplays on every
 * first visit. Export a matching first frame as the poster so there's no
 * jump when playback starts.
 */
export const SHOWREEL = {
  src: "/video/showreel-loop.mp4",
  poster: "/images/showreel-poster.webp",
} as const;

export const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
] as const;

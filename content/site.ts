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
 * One-off images not tied to a project. Drop the file into /public/images,
 * uncomment the line, done — until then the slot renders a labelled
 * placeholder instead of a broken image.
 */
export const IMAGES: { portrait?: string } = {
  // portrait: "/images/oski-portrait.jpg",
};

export type HeroPanel = {
  sport: string;
  alt: string;
  /** Shown in the empty slot — this is what makes each panel self-labelling. */
  hint: string;
  src?: string;
  /** The one panel that survives the mobile collapse. Exactly one. */
  primary?: boolean;
};

/**
 * The hero triptych — three codes, one shooter.
 *
 * Order is deliberate. The headline sits over the first panel and the scrim
 * runs to 94% at the bottom, so panel one wants the quietest frame with dead
 * space low in the composition. The loudest frame belongs in the centre,
 * where nothing overlaps it. Full shot spec in public/images/README.md.
 */
export const HERO_PANELS: HeroPanel[] = [
  {
    sport: "Football",
    alt: "Footballer striking the ball under floodlights",
    hint: "Football — floodlit dusk, striking the ball",
    // src: "/images/hero-football.webp",
  },
  {
    sport: "AFL",
    alt: "AFL player elevated for a pack mark",
    hint: "AFL — pack mark, ball above the hands",
    primary: true,
    // src: "/images/hero-afl.webp",
  },
  {
    sport: "NRL",
    alt: "NRL player breaking a tackle",
    hint: "NRL — contact, tight long lens",
    // src: "/images/hero-nrl.webp",
  },
];

export const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
] as const;

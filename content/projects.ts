/* ── CONTENT ──────────────────────────────────────────────────────────────
   To add a project: copy one block, paste the video link, write two lines.
   Order here is the order on the site (newest first).

   poster — drop a 16:9 frame into /public/images and point at it, e.g.
            "/images/round-12-highlights.jpg". Leave it out and the card
            renders a labelled placeholder instead of a broken image.
   video  — full YouTube link. Leave the xxxxxxxxxxx placeholder and the
            case study shows "video coming soon" rather than a dead embed.
   ------------------------------------------------------------------------ */

export type Project = {
  slug: string;
  title: string;
  club: string;
  /** Sport / competition. Doubles as the first filter row on /work. */
  code: string;
  /** Kind of job. Doubles as the second filter row on /work. */
  type: string;
  featured?: boolean;
  video: string;
  blurb: string;
  delivered: string;
  turnaround: string;
  poster?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "round-12-highlights",
    title: "Round 12 Highlights",
    club: "Marrickville FC",
    code: "Football",
    type: "Match day",
    featured: true,
    video: "https://youtu.be/xxxxxxxxxxx",
    blurb:
      "Two minutes of the derby, cut the same night and posted before midnight. Shot solo from the sideline, graded to the club's kit and captioned for silent playback.",
    delivered: "1× 2min cut, 4× vertical socials",
    turnaround: "Same night",
  },
  {
    slug: "preseason-hype-reel",
    title: "Preseason Hype Reel",
    club: "Balmain Tigers",
    code: "NRL",
    type: "Promo",
    featured: true,
    video: "https://youtu.be/xxxxxxxxxxx",
    blurb:
      "Forty-five seconds to sell a season. One morning at training, cut to the squad's own warm-up track and dropped the week before Round 1.",
    delivered: "1× 45s hero, 16:9 and 9:16",
    turnaround: "Three days",
  },
  {
    slug: "grand-final-day",
    title: "Grand Final Day",
    club: "Sydney Uni AFC",
    code: "AFL",
    type: "Match day",
    featured: true,
    video: "https://youtu.be/xxxxxxxxxxx",
    blurb:
      "Full day coverage from the bus in to the trophy. Highlights up by 9pm, the long cut delivered for the club's end-of-season night.",
    delivered: "1× 3min film, 1× 90s highlights, 60 stills",
    turnaround: "Same night + 1 week",
  },
  {
    slug: "signing-announcement",
    title: "Signing Announcement",
    club: "Marrickville FC",
    code: "Football",
    type: "Promo",
    video: "https://youtu.be/xxxxxxxxxxx",
    blurb:
      "A fifteen-second reveal built to be embargoed and posted on the hour. Shot in twenty minutes at the ground, delivered vertical first.",
    delivered: "1× 15s vertical, 1× still set",
    turnaround: "Next morning",
  },
  {
    slug: "matchday-cutdowns",
    title: "Matchday Social Cutdowns",
    club: "Bankstown City FC",
    code: "Football",
    type: "Social",
    video: "https://youtu.be/xxxxxxxxxxx",
    blurb:
      "A season-long package: every home game turned into six vertical posts by Sunday lunchtime. Built so the club's socials never go quiet mid-round.",
    delivered: "6× verticals per fixture",
    turnaround: "Under 18 hours",
  },
];

export type Service = {
  num: string;
  name: string;
  line: string;
  items: string[];
};

export const SERVICES: Service[] = [
  {
    num: "01",
    name: "Match-day coverage",
    line: "Sideline through to full time, with the highlights up while people are still talking.",
    items: [
      "Highlights cut, 90s–3min",
      "Vertical socials for IG and TikTok",
      "Stills selects for the club feed",
      "Same-night or next-day delivery",
    ],
  },
  {
    num: "02",
    name: "Social content packages",
    line: "A month of posts from one shoot day, sized and captioned for each platform.",
    items: [
      "8–12 vertical edits",
      "Captions burned in for silent playback",
      "Training, player and behind-the-scenes",
      "Delivered as a scheduled drop folder",
    ],
  },
  {
    num: "03",
    name: "Promo & ad production",
    line: "Membership drives, sponsor spots and season launches that look like broadcast.",
    items: [
      "Concept and shot list up front",
      "Half or full shoot day",
      "30s and 15s cuts from one build",
      "Sponsor-ready masters and captions",
    ],
  },
];

/**
 * The home-page ticker: every senior NSW club across the three codes Oski
 * shoots.
 *
 * This is the landscape he works in, NOT a client list — the ticker's
 * accessible label says exactly that. Don't relabel it "clubs worked with"
 * unless every name below is genuinely a client, or it becomes a claim he
 * can't back.
 */
export const CLUBS = [
  // A-League Men — NSW
  "Sydney FC",
  "Western Sydney Wanderers",
  "Macarthur FC",
  "Central Coast Mariners",
  "Newcastle Jets",
  // AFL — NSW
  "Sydney Swans",
  "GWS Giants",
  // NRL — NSW
  "South Sydney Rabbitohs",
  "Sydney Roosters",
  "Canterbury-Bankstown Bulldogs",
  "Parramatta Eels",
  "Penrith Panthers",
  "Cronulla-Sutherland Sharks",
  "Manly Warringah Sea Eagles",
  "St George Illawarra Dragons",
  "Wests Tigers",
  "Newcastle Knights",
];

/* ── DERIVED ──────────────────────────────────────────────────────────── */

export type DecoratedProject = Project & {
  href: string;
  path: string;
  meta: string;
  posterHint: string;
  tags: string[];
};

export function decorate(p: Project): DecoratedProject {
  return {
    ...p,
    href: `/work/${p.slug}`,
    path: `/work/${p.slug}`,
    meta: `${p.club} · ${p.code} · ${p.type}`,
    posterHint: `Poster frame — ${p.title}`,
    tags: [p.code, p.club, p.type],
  };
}

export const ALL_PROJECTS: DecoratedProject[] = PROJECTS.map(decorate);

export const FEATURED: DecoratedProject[] = (
  ALL_PROJECTS.some((p) => p.featured)
    ? ALL_PROJECTS.filter((p) => p.featured)
    : ALL_PROJECTS
).slice(0, 3);

export const CODES: string[] = Array.from(new Set(PROJECTS.map((p) => p.code)));
export const TYPES: string[] = Array.from(new Set(PROJECTS.map((p) => p.type)));

export function getProject(slug: string): DecoratedProject | undefined {
  return ALL_PROJECTS.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): DecoratedProject {
  const i = ALL_PROJECTS.findIndex((p) => p.slug === slug);
  return ALL_PROJECTS[(Math.max(i, 0) + 1) % ALL_PROJECTS.length];
}

/**
 * Pull the 11-character video id out of any YouTube URL form.
 * Returns null for the xxxxxxxxxxx placeholder or anything unparseable, so
 * callers can render a "coming soon" state instead of a broken iframe.
 */
export function youTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/,
  );
  const id = match?.[1];
  if (!id || /^x+$/i.test(id)) return null;
  return id;
}

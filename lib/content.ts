import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import { SITE_STATIC } from "./site";

/**
 * Reads the YAML in content/ that Keystatic writes. Everything runs at build
 * time — the repo is the database, so a checkout is always the current
 * content and the site stays fully static.
 *
 * Server-only: this touches node:fs. Client components take content as props.
 */
const reader = createReader(process.cwd(), keystaticConfig);

export type Project = {
  slug: string;
  title: string;
  date: string;
  club: string;
  code: string;
  type: string;
  featured: boolean;
  video: string | null;
  blurb: string;
  delivered: string;
  turnaround: string;
  /**
   * Both empty strings when unset — Keystatic omits an empty text field from
   * the YAML entirely and reads a missing one back as "", so these are never
   * undefined and callers gate on the string being non-blank, not on the key
   * existing. A quote without `quoteBy` reads as invented, so treat the pair
   * as all-or-nothing when rendering.
   */
  quote: string;
  quoteBy: string;
  poster: string | null;
};

export type DecoratedProject = Project & {
  href: string;
  path: string;
  meta: string;
  posterHint: string;
  tags: string[];
  /** What to actually render: the uploaded poster, else YouTube's thumbnail. */
  posterSrc: string | undefined;
};

/**
 * YouTube publishes a still for every video, so a project with a link never
 * needs a poster uploaded to get a thumbnail.
 *
 * `maxresdefault` (1280x720) only exists for videos uploaded at 720p or
 * above; anything else 404s, which would render as a broken image. Only
 * `hqdefault` is guaranteed, but it's 480x360 with letterbox bars — fine
 * cropped to 16:9, just soft blown up to full width. So this checks once at
 * build time and takes the sharp one when it's there.
 *
 * Returns undefined when neither exists, which means the id is wrong — a
 * mistyped link then shows the labelled placeholder rather than a broken
 * image, matching every other empty slot on the site.
 */
async function youTubeThumb(id: string): Promise<string | undefined> {
  const url = (name: string) => `https://i.ytimg.com/vi/${id}/${name}.jpg`;
  try {
    if ((await fetch(url("maxresdefault"), { method: "HEAD" })).ok) {
      return url("maxresdefault");
    }
    if (!(await fetch(url("hqdefault"), { method: "HEAD" })).ok) return undefined;
  } catch {
    // A build with no network out still gets a working thumbnail.
  }
  return url("hqdefault");
}

async function decorate(project: Project): Promise<DecoratedProject> {
  const id = youTubeId(project.video);
  return {
    ...project,
    href: `/work/${project.slug}`,
    path: `/work/${project.slug}`,
    meta: `${project.club} · ${project.code} · ${project.type}`,
    posterHint: `Poster frame — ${project.title}`,
    tags: [project.code, project.club, project.type],
    // An uploaded frame always wins — it's chosen, the thumbnail is derived.
    posterSrc: project.poster ?? (id ? await youTubeThumb(id) : undefined),
  };
}

/** Newest first. `list()` returns alphabetical, so the date field is load-bearing. */
export async function getProjects(): Promise<DecoratedProject[]> {
  const slugs = await reader.collections.projects.list();
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.projects.read(slug);
      return entry ? decorate({ ...(entry as Omit<Project, "slug">), slug }) : null;
    }),
  );

  return entries
    .filter((p): p is DecoratedProject => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Falls back to the newest three if nothing is flagged, so the home page is never empty. */
export async function getFeatured(): Promise<DecoratedProject[]> {
  const all = await getProjects();
  const flagged = all.filter((p) => p.featured);
  return (flagged.length ? flagged : all).slice(0, 3);
}

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug);
}

export async function getNextProject(slug: string) {
  const all = await getProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return all[(Math.max(i, 0) + 1) % all.length];
}

/** Filter chips are derived, so a new sport or job type creates its own chip. */
export async function getFilters() {
  const all = await getProjects();
  return {
    codes: Array.from(new Set(all.map((p) => p.code))),
    types: Array.from(new Set(all.map((p) => p.type))),
  };
}

/** `price` is free text ("from $650", "POA"), and "" when Oski leaves it out. */
export type ServiceItem = {
  num: string;
  name: string;
  line: string;
  price: string;
  items: string[];
};

export async function getServices(): Promise<{
  intro: string;
  items: ServiceItem[];
}> {
  const services = await reader.singletons.services.read();
  return {
    intro: services?.intro ?? "",
    items: (services?.items ?? []).map((item) => ({
      ...item,
      items: [...item.items],
    })),
  };
}

export async function getClubs(): Promise<string[]> {
  const clubs = await reader.singletons.clubs.read();
  return [...(clubs?.items ?? [])];
}

export type Social = { label: string; handle: string; href: string };

export async function getSite() {
  const site = await reader.singletons.site.read();

  return {
    ...SITE_STATIC,
    title: `${SITE_STATIC.name} — Sydney sports videographer`,
    tagline: site?.tagline ?? "",
    lede: site?.lede ?? "",
    description: site?.description ?? "",
    email: site?.email ?? "",
    socials: (site?.socials ?? []) as readonly Social[],
    portrait: site?.portrait ?? undefined,
    showreel: site?.showreel ?? undefined,
    /** One image holds still, several cross-fade. Order is the loop order. */
    heroImages: (site?.heroImages ?? []).filter(
      (src): src is string => Boolean(src),
    ),
  };
}

/**
 * Pull the 11-character video id out of any YouTube URL form. Returns null
 * for anything unparseable or empty, so callers render a "coming soon" state
 * instead of a broken iframe.
 */
export function youTubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/,
  );
  const id = match?.[1];
  if (!id || /^x+$/i.test(id)) return null;
  return id;
}

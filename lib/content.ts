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
  poster: string | null;
};

export type DecoratedProject = Project & {
  href: string;
  path: string;
  meta: string;
  posterHint: string;
  tags: string[];
};

function decorate(project: Project): DecoratedProject {
  return {
    ...project,
    href: `/work/${project.slug}`,
    path: `/work/${project.slug}`,
    meta: `${project.club} · ${project.code} · ${project.type}`,
    posterHint: `Poster frame — ${project.title}`,
    tags: [project.code, project.club, project.type],
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

export async function getServices() {
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

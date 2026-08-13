import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoFacade } from "@/components/VideoFacade";
import {
  getNextProject,
  getProject,
  getProjects,
  youTubeId,
} from "@/lib/content";
import { SITE_STATIC } from "@/lib/site";
import styles from "./page.module.css";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${project.club}`,
    description: project.blurb,
    alternates: { canonical: project.path },
    openGraph: {
      type: "article",
      title: `${project.title} — ${project.club}`,
      description: project.blurb,
      url: project.path,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const next = await getNextProject(slug);
  const videoId = youTubeId(project.video);

  /**
   * The work is video, so video search is where it should be findable — and
   * this page was emitting no structured data at all. Keyed off `videoId`
   * rather than the raw field: the same parse that decides whether there's a
   * real embed decides whether there's a video to describe, so a project with
   * no link (or a placeholder one) claims nothing. It also normalises both
   * link shapes Oski pastes — /watch?v= and /shorts/ — to one id.
   */
  const videoJsonLd = videoId
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: project.title,
        description: project.blurb,
        // An uploaded poster is a site-root path, which is useless to a
        // crawler; YouTube's own thumbnail is already absolute and URL()
        // ignores the base when the input is. Omitted rather than guessed
        // when there's no poster at all, since a 404 thumbnail invalidates
        // the whole record.
        ...(project.posterSrc && {
          thumbnailUrl: new URL(project.posterSrc, SITE_STATIC.url).toString(),
        }),
        uploadDate: project.date,
        contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
        // Canonical player URL. The facade embeds the youtube-nocookie alias
        // of this same player, so it's the one video either way.
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
      }
    : null;

  return (
    <main id="main" className={`fade-up ${styles.page}`}>
      <div className={styles.topBar}>
        <Link href="/work" className={styles.back}>
          ← All work
        </Link>
        <span className={styles.path}>oski.media{project.path}</span>
      </div>

      <VideoFacade
        videoId={videoId}
        title={project.title}
        poster={project.posterSrc}
        posterHint={project.posterHint}
      />

      <div className={styles.detail}>
        <div className={styles.main}>
          <h1 className={`display ${styles.h1}`}>{project.title}</h1>
          <p className={styles.blurb}>{project.blurb}</p>
          <ul className={styles.tags}>
            {project.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <dl className={styles.specs}>
          <div className={styles.spec}>
            <dt className="eyebrow">Club</dt>
            <dd className={`display display-70 ${styles.club}`}>
              {project.club}
            </dd>
          </div>
          {project.delivered?.trim() && (
            <div className={styles.spec}>
              <dt className="eyebrow">Delivered</dt>
              <dd className={styles.specValue}>{project.delivered}</dd>
            </div>
          )}
          {project.turnaround?.trim() && (
            <div className={styles.spec}>
              <dt className="eyebrow">Turnaround</dt>
              <dd className={styles.specValue}>{project.turnaround}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* All-or-nothing: an unattributed quote reads as invented, so a quote
          with nobody behind it is worth less to a club than no quote at all. */}
      {project.quote.trim() && project.quoteBy.trim() && (
        <figure className={styles.testimonial}>
          <blockquote className={`display display-68 ${styles.quote}`}>
            &ldquo;{project.quote}&rdquo;
          </blockquote>
          <figcaption className={styles.quoteBy}>{project.quoteBy}</figcaption>
        </figure>
      )}

      <nav className={styles.footNav} aria-label="Project navigation">
        <Link href={next.href} className={styles.next}>
          <span className="eyebrow">Next project</span>
          <span className={`display display-64 ${styles.nextTitle}`}>
            {next.title} →
          </span>
        </Link>
        <Link href="/contact" className="btn btn-primary btn-sm">
          Book a shoot
        </Link>
      </nav>

      {/* Escaping `<` for the same reason the site layout does: the title and
          blurb come from the CMS, and JSON.stringify won't neutralise a
          literal `</script>` typed into a text field. */}
      {videoJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(videoJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </main>
  );
}

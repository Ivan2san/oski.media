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
    </main>
  );
}

import Link from "next/link";
import { Slot } from "./Slot";
import type { DecoratedProject } from "@/lib/content";
import styles from "./ProjectCard.module.css";

const CARD_SIZES = "(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw";

export function ProjectCard({ project }: { project: DecoratedProject }) {
  return (
    <Link href={project.href} className={styles.card}>
      <div className={styles.poster}>
        <Slot
          src={project.poster ?? undefined}
          alt={`${project.title} — ${project.club}`}
          hint={project.posterHint}
          sizes={CARD_SIZES}
        />
        <span className={styles.code}>{project.code}</span>
      </div>
      <div className={styles.body}>
        <h3 className={`display display-66 ${styles.title}`}>
          {project.title}
        </h3>
        <span className={styles.meta}>{project.meta}</span>
      </div>
    </Link>
  );
}

"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { DecoratedProject } from "@/lib/content";
import cards from "./ProjectCard.module.css";
import styles from "./WorkGrid.module.css";

const ALL = "All";

export function WorkGrid({
  projects,
  codes,
  types,
}: {
  projects: DecoratedProject[];
  codes: string[];
  types: string[];
}) {
  const [code, setCode] = useState<string>(ALL);
  const [type, setType] = useState<string | null>(null);

  const shown = useMemo(
    () =>
      projects
        .filter((p) => code === ALL || p.code === code)
        .filter((p) => !type || p.type === type),
    [projects, code, type],
  );

  const reset = () => {
    setCode(ALL);
    setType(null);
  };

  return (
    <>
      <div className={styles.titleRow}>
        <h1 className={`display ${styles.h1}`}>Work</h1>
        <p className={styles.count} aria-live="polite">
          {shown.length} {shown.length === 1 ? "project" : "projects"} · Sydney
          · 2025–26
        </p>
      </div>

      <div className={styles.filters}>
        <div className={styles.row} role="group" aria-label="Filter by sport">
          {[ALL, ...codes].map((c) => (
            <Chip key={c} active={c === code} onClick={() => setCode(c)}>
              {c}
            </Chip>
          ))}
        </div>
        <span className={styles.divider} aria-hidden="true" />
        <div className={styles.row} role="group" aria-label="Filter by job type">
          {types.map((t) => (
            <Chip
              key={t}
              active={t === type}
              onClick={() => setType(type === t ? null : t)}
            >
              {t}
            </Chip>
          ))}
        </div>
      </div>

      {shown.length > 0 ? (
        <div className={`${cards.grid} ${styles.grid}`}>
          {shown.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyLine}>
            Nothing shot in that combination yet.
          </p>
          <button type="button" className="btn btn-ghost" onClick={reset}>
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={styles.chip}
      data-active={active || undefined}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

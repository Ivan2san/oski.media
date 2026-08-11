import type { Metadata } from "next";
import { WorkGrid } from "@/components/WorkGrid";
import { getFilters, getProjects } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Match-day highlights, promos and social cutdowns shot for Sydney clubs across AFL, NRL and football.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const [projects, filters] = await Promise.all([getProjects(), getFilters()]);

  return (
    <main id="main" className={`fade-up ${styles.page}`}>
      <WorkGrid
        projects={projects}
        codes={filters.codes}
        types={filters.types}
      />
    </main>
  );
}

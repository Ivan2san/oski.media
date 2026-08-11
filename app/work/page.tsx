import type { Metadata } from "next";
import { WorkGrid } from "@/components/WorkGrid";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Match-day highlights, promos and social cutdowns shot for Sydney clubs across AFL, NRL and football.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main id="main" className={`fade-up ${styles.page}`}>
      <WorkGrid />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Slot } from "@/components/Slot";
import { IMAGES } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Eighteen, Sydney, and at a ground most weekends. Three seasons shooting AFL, NRL and football from local grades through to semi-pro.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main" className={`fade-up ${styles.page}`}>
      <div className={styles.row}>
        <div className={styles.portraitCol}>
          <div className={styles.portrait}>
            <Slot
              src={IMAGES.portrait}
              alt="Oski on the sideline with a camera"
              hint="Portrait — sideline, working, not posed"
              sizes="(max-width: 760px) 100vw, 520px"
            />
          </div>
        </div>

        <div className={styles.copy}>
          <h1 className={`display ${styles.h1}`}>
            Eighteen, Sydney, and at a ground most weekends
          </h1>
          <p className={styles.para}>
            I started filming my own club&rsquo;s games because nobody else was,
            and the highlight cuts pulled more reach than anything else the club
            posted that season. Three seasons on, I shoot across AFL, NRL and
            football, from local grades through to semi-pro.
          </p>
          <p className={styles.para}>
            Sport is the reason I picked up a camera and it&rsquo;s still the
            only thing I want to point it at. A match gives you one take and no
            second chances, which is exactly why the edit has to be ready while
            people are still talking about it. Most cuts land the same night.
          </p>

          <div className={styles.gear}>
            <span className="eyebrow">Gear</span>
            <span className={styles.gearList}>
              Sony FX30 · 70–200mm f2.8 · 24–70mm f2.8 · DJI Mini 4 Pro · Røde
              wireless
            </span>
          </div>

          <Link href="/contact" className={`btn btn-primary btn-sm ${styles.cta}`}>
            Work with me
          </Link>
        </div>
      </div>
    </main>
  );
}

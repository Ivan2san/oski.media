import Link from "next/link";
import { HeroParallax } from "@/components/HeroParallax";
import { HeroShowreel } from "@/components/HeroShowreel";
import { ProjectCard } from "@/components/ProjectCard";
import { Ticker } from "@/components/Ticker";
import { FEATURED } from "@/content/projects";
import { SITE } from "@/content/site";
import cards from "@/components/ProjectCard.module.css";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main id="main">
      <section className={styles.hero}>
        <HeroParallax>
          <HeroShowreel />
        </HeroParallax>
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.heroTop}>
          <span className={styles.live}>
            <span className={styles.pip} aria-hidden="true" />
            Showreel · muted loop
          </span>
          <span className={styles.place}>Sydney, AU</span>
        </div>

        <div className={styles.heroBottom}>
          <div className={styles.heroCopy}>
            <h1 className={`display ${styles.h1}`}>{SITE.tagline}</h1>
            <p className={styles.lede}>
              Freelance sports videographer. AFL, NRL and football across Sydney
              — shot, cut and delivered before the conversation moves on.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary">
            Book a shoot <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <Ticker />

      <section className={styles.work}>
        <div className={styles.workHead}>
          <h2 className={`display ${styles.h2}`}>Selected work</h2>
          <Link href="/work" className={styles.allWork}>
            All work →
          </Link>
        </div>
        <div className={cards.grid}>
          {FEATURED.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className={styles.quoteSection}>
        <div className={styles.quoteRow}>
          <blockquote className={`display display-68 ${styles.quote}`}>
            &ldquo;Fastest turnaround we&rsquo;ve had. The Round 12 cut hit 40k
            before training on Tuesday.&rdquo;
          </blockquote>
          <div className={styles.quoteAside}>
            <span className={styles.attribution}>
              Media manager, Marrickville FC
            </span>
            <Link href="/contact" className="btn btn-ghost">
              Got a round coming up? <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

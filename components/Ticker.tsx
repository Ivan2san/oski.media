import { CLUBS } from "@/content/projects";
import styles from "./Ticker.module.css";

/**
 * Marquee of club names. The list is rendered twice so the -50% keyframe
 * lands exactly on a seam; add a club to CLUBS and both halves follow.
 */
export function Ticker() {
  return (
    <section className={styles.rail} aria-label="Clubs worked with">
      <div className={`display display-68 ${styles.track}`}>
        {[0, 1].map((half) => (
          <span key={half} className={styles.half} aria-hidden={half === 1}>
            {CLUBS.map((club) => (
              <span key={club} className={styles.item}>
                {club}
                <span className={styles.dot} aria-hidden="true">
                  ◆
                </span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
}

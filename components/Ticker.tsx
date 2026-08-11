import { CLUBS } from "@/content/projects";
import styles from "./Ticker.module.css";

/** Seconds each club takes to cross, so the speed holds as the list grows. */
const SECONDS_PER_CLUB = 8;

/**
 * Marquee of the NSW clubs across all three codes. The list is rendered
 * twice so the -50% keyframe lands exactly on a seam.
 *
 * The label is deliberately "covered", not "worked with" — see the note on
 * CLUBS. Duration scales with the list so adding a club slows the track
 * rather than speeding everything up.
 */
export function Ticker() {
  return (
    <section
      className={styles.rail}
      aria-label="Clubs across the codes covered in NSW"
    >
      <div
        className={`display display-68 ${styles.track}`}
        style={
          {
            "--ticker-duration": `${CLUBS.length * SECONDS_PER_CLUB}s`,
          } as React.CSSProperties
        }
      >
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

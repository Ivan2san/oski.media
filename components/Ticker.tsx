import styles from "./Ticker.module.css";

/**
 * Seconds each club takes to cross, so the speed holds as the list grows.
 * At the current name lengths this works out around 70px/s — a readable
 * drift rather than the 30px/s crawl that 8s per club produced.
 */
const SECONDS_PER_CLUB = 3.5;

/**
 * Marquee of the NSW clubs across all three codes. The list is rendered
 * twice so the -50% keyframe lands exactly on a seam.
 *
 * The label is deliberately "covered", not "worked with" — these are the
 * clubs and codes shot across NSW, not a client roster. Duration scales with
 * the list so adding a club slows the track rather than speeding it up.
 */
export function Ticker({ clubs }: { clubs: string[] }) {
  if (!clubs.length) return null;

  return (
    <section
      className={styles.rail}
      aria-label="Clubs across the codes covered in NSW"
    >
      <div
        className={`display display-68 ${styles.track}`}
        style={
          {
            "--ticker-duration": `${clubs.length * SECONDS_PER_CLUB}s`,
          } as React.CSSProperties
        }
      >
        {[0, 1].map((half) => (
          <span key={half} className={styles.half} aria-hidden={half === 1}>
            {clubs.map((club) => (
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

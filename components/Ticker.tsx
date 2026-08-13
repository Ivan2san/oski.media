import styles from "./Ticker.module.css";

/**
 * Seconds each club takes to cross, so the speed holds as the list grows.
 * At the current name lengths this works out around 70px/s — a readable
 * drift rather than the 30px/s crawl that 8s per club produced.
 */
const SECONDS_PER_CLUB = 3.5;

/**
 * Ties the section's accessible name to the visible caption. Hardcoded rather
 * than useId() because this is a server component and the ticker runs once
 * per page, so there is nothing to collide with.
 */
const CAPTION_ID = "ticker-caption";

/**
 * Marquee of the NSW clubs across all three codes. The list is rendered
 * twice so the -50% keyframe lands exactly on a seam.
 *
 * The caption is on screen, not just in an aria-label: a bare strip of club
 * names under the hero reads as a client roster to anyone who can see it.
 * These are the clubs and codes covered across NSW, not clients, so
 * "covered" is load-bearing and has to be visible. The section takes its
 * accessible name from that same caption — an aria-label on top of it would
 * announce the line twice.
 *
 * Duration scales with the list so adding a club slows the track rather than
 * speeding it up.
 */
export function Ticker({ clubs }: { clubs: string[] }) {
  if (!clubs.length) return null;

  return (
    <section className={styles.rail} aria-labelledby={CAPTION_ID}>
      <p id={CAPTION_ID} className={`eyebrow ${styles.caption}`}>
        Codes and clubs covered across NSW
      </p>
      <div className={styles.viewport}>
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
      </div>
    </section>
  );
}

import { Slot } from "./Slot";
import { HERO_PANELS } from "@/content/site";
import styles from "./HeroTriptych.module.css";

const PANEL_SIZES = "(max-width: 700px) 100vw, 34vw";

/**
 * Three codes, one shooter — full-height verticals split by hairline accent
 * rules. Goes inside <HeroParallax>, so it drifts with the scroll.
 *
 * Only the primary panel is eager. The other two are left to native lazy
 * loading, so when the mobile breakpoint hides them with display:none the
 * browser never fetches them at all; on desktop they're in the viewport at
 * load and fetch immediately anyway.
 */
export function HeroTriptych() {
  return (
    <div className={styles.triptych}>
      {HERO_PANELS.map((panel) => (
        <div
          key={panel.sport}
          className={styles.panel}
          data-primary={panel.primary || undefined}
        >
          <Slot
            src={panel.src}
            alt={panel.alt}
            hint={panel.hint}
            sizes={PANEL_SIZES}
            priority={panel.primary}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * The sport tags, as a sibling of the parallax layer rather than a child.
 *
 * Two reasons they can't live on the panels: the parallax layer is offset
 * -14% so anything positioned from its top lands above the fold, and chrome
 * that drifts with the image reads as a glitch. Thirds line up with the
 * panel boundaries because both are equal flex columns.
 */
export function HeroPanelLabels() {
  return (
    <div className={styles.labels}>
      {HERO_PANELS.map((panel) => (
        <span key={panel.sport} className={styles.labelCell}>
          <span className={styles.label}>{panel.sport}</span>
        </span>
      ))}
    </div>
  );
}

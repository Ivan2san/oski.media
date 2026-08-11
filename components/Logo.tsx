import styles from "./Logo.module.css";

/**
 * The wordmark inside its four corner brackets — a viewfinder frame.
 * `size` drives the type; the brackets scale with it.
 */
export function Logo({ size = 19 }: { size?: number }) {
  return (
    <span className={styles.lockup} style={{ fontSize: size }}>
      <span className={styles.tl} aria-hidden="true" />
      <span className={styles.tr} aria-hidden="true" />
      <span className={styles.bl} aria-hidden="true" />
      <span className={styles.br} aria-hidden="true" />
      <span className={`display ${styles.word}`}>oski.media</span>
    </span>
  );
}

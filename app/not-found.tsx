import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main id="main" className={`fade-up ${styles.page}`}>
      <span className="eyebrow">404</span>
      <h1 className={`display ${styles.h1}`}>No footage at that address</h1>
      <p className={styles.line}>
        The cut you&rsquo;re after has moved or never existed. The work is all
        in one place.
      </p>
      <div className={styles.actions}>
        <Link href="/work" className="btn btn-primary btn-sm">
          See the work
        </Link>
        <Link href="/" className="btn btn-ghost">
          Back home
        </Link>
      </div>
    </main>
  );
}

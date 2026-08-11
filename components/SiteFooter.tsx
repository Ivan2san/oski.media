import { Logo } from "./Logo";
import { SITE, SOCIALS } from "@/content/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Logo size={16} />
      <div className={styles.links}>
        <a href={`mailto:${SITE.email}`}>Email</a>
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            rel="me noopener"
            target="_blank"
          >
            {social.label}
          </a>
        ))}
      </div>
      <span className={styles.place}>Sydney, Australia</span>
    </footer>
  );
}

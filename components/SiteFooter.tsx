import { Logo } from "./Logo";
import { SITE } from "@/content/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Logo size={16} />
      <div className={styles.links}>
        <a href={`mailto:${SITE.email}`}>Email</a>
        <a href={SITE.instagram} rel="me noopener" target="_blank">
          Instagram
        </a>
        <a href={SITE.tiktok} rel="me noopener" target="_blank">
          TikTok
        </a>
      </div>
      <span className={styles.place}>Sydney, Australia</span>
    </footer>
  );
}

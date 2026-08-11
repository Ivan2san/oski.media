import { Logo } from "./Logo";
import type { Social } from "@/lib/content";
import styles from "./SiteFooter.module.css";

export function SiteFooter({
  email,
  socials,
}: {
  email: string;
  socials: readonly Social[];
}) {
  return (
    <footer className={styles.footer}>
      <Logo size={16} />
      <div className={styles.links}>
        {email && <a href={`mailto:${email}`}>Email</a>}
        {socials.map((social) => (
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

import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SITE, SOCIALS } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a Sydney sports videographer for your season. Email hello@oski.media or send the fixture details and get a quote back the same day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main" className={`fade-up ${styles.page}`}>
      <div className={styles.row}>
        <div className={styles.left}>
          <h1 className={`display ${styles.h1}`}>
            Let&rsquo;s talk about your season
          </h1>
          <p className={styles.lede}>
            Email or a DM, whichever is quicker for you. I usually reply the
            same day.
          </p>

          <div className={styles.channels}>
            <a href={`mailto:${SITE.email}`} className={`display display-66 ${styles.channel}`}>
              {SITE.email}
            </a>
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="me noopener"
                className={`display display-66 ${styles.channel}`}
              >
                {social.label} — {social.handle}
              </a>
            ))}
            <span className={styles.travel}>
              Based in Sydney. Happy to travel for finals.
            </span>
          </div>
        </div>

        <div className={styles.right}>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}

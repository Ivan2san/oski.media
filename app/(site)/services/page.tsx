import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Match-day coverage, social content packages and promo production for Sydney sports clubs. Same-night highlights, vertical cutdowns, sponsor-ready masters.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main id="main" className={`fade-up ${styles.page}`}>
      <h1 className={`display ${styles.h1}`}>What I shoot</h1>
      <p className={styles.lede}>{services.intro}</p>

      <div className={styles.grid}>
        {services.items.map((service) => (
          <section key={service.num} className={styles.card}>
            <span className={styles.num}>{service.num}</span>
            <h2 className={`display display-64 ${styles.name}`}>
              {service.name}
            </h2>
            {/* Keystatic omits an unset text field from the YAML entirely, so
                `price` reads back as "" and never undefined — the gate has to
                be the string being non-blank, or an unpriced package renders
                an empty element that still takes up the card's row gap. */}
            {service.price.trim() && (
              <p className={styles.price}>{service.price}</p>
            )}
            <p className={styles.line}>{service.line}</p>
            <ul className={styles.items}>
              {service.items.map((item) => (
                <li key={item} className={styles.item}>
                  <span className={styles.slash} aria-hidden="true">
                    /
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className={styles.cta}>
        <h2 className={`display display-64 ${styles.ctaHead}`}>
          Tell me the fixture and I&rsquo;ll send a quote.
        </h2>
        <Link href="/contact" className="btn btn-primary">
          Get in touch
        </Link>
      </div>
    </main>
  );
}

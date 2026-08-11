"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { NAV } from "@/content/site";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label="oski.media — home">
        <Logo />
      </Link>
      <nav className={styles.nav} aria-label="Main">
        {NAV.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={styles.link}
              data-active={active || undefined}
              aria-current={active ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
        <Link
          href="/contact"
          className={styles.contact}
          aria-current={pathname === "/contact" ? "page" : undefined}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}

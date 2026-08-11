"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroParallax.module.css";

/**
 * Drifts the hero frame at 12% of scroll speed. The wrapper is deliberately
 * oversized (128% tall, offset -14%) so the drift never exposes an edge.
 * Skipped entirely when the visitor prefers reduced motion.
 */
export function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (calm.matches) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = ref.current;
        if (!el) return;
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        el.style.transform = `translate3d(0, ${(y * 0.12).toFixed(1)}px, 0)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={styles.layer}>
      {children}
    </div>
  );
}

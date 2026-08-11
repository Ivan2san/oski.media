"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroShowreel.module.css";

/**
 * The hero bed: a silent, looping showreel cut.
 *
 * There is deliberately no `autoPlay` attribute. Playback starts from the
 * effect below only when the visitor hasn't asked for reduced motion, which
 * keeps server and client markup identical (no hydration mismatch) and means
 * anyone who has calmed their OS down gets the poster frame held still. If
 * JS never runs or the browser blocks playback, the poster is what shows —
 * so the hero always has something in it.
 */
export function HeroShowreel({
  src,
  poster,
}: {
  src?: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (calm.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        // Rejected when the browser declines to autoplay; the poster stays.
        void video.play().catch(() => {});
      }
    };

    sync();
    calm.addEventListener("change", sync);
    return () => calm.removeEventListener("change", sync);
  }, [src]);

  if (!src) {
    // No loop uploaded yet — the poster alone still fills the hero.
    return (
      <div
        className={styles.video}
        style={
          poster
            ? { backgroundImage: `url(${poster})`, backgroundSize: "cover" }
            : undefined
        }
        aria-hidden="true"
      />
    );
  }

  return (
    <video
      ref={ref}
      key={src}
      className={styles.video}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

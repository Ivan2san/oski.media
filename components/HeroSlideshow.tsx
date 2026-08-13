"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./HeroSlideshow.module.css";

/** How long each image holds before the cross-fade to the next one starts. */
const SECONDS_PER_IMAGE = 5;

/**
 * The hero bed: one image, or several cross-fading on a loop.
 *
 * The count does the deciding — a single image never starts a timer, so the
 * "still hero" case costs nothing. Anyone who prefers reduced motion holds on
 * the first image, and because the first render is always index 0, server and
 * client markup match and there's no hydration flash.
 */
export function HeroSlideshow({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;

    const sync = () => {
      clearInterval(timer);
      if (calm.matches) {
        setActive(0);
        return;
      }
      timer = setInterval(
        () => setActive((i) => (i + 1) % images.length),
        SECONDS_PER_IMAGE * 1000,
      );
    };

    sync();
    calm.addEventListener("change", sync);
    return () => {
      clearInterval(timer);
      calm.removeEventListener("change", sync);
    };
  }, [images.length]);

  if (!images.length) return null;

  return (
    <div className={styles.stack} aria-hidden="true">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="100vw"
          // Only the first frame blocks paint; the rest load behind it.
          priority={i === 0}
          className={styles.frame}
          style={{ opacity: i === active ? 1 : 0 }}
        />
      ))}
    </div>
  );
}

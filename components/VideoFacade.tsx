"use client";

import { useState } from "react";
import { Slot } from "./Slot";
import styles from "./VideoFacade.module.css";

type VideoFacadeProps = {
  /** null when the project has no real link yet — see youTubeId(). */
  videoId: string | null;
  title: string;
  poster?: string;
  posterHint: string;
};

/**
 * Poster-only until clicked. Nothing from YouTube — no iframe, no cookies,
 * no ~1MB of player JS — loads on page view; the click swaps in the embed.
 */
export function VideoFacade({
  videoId,
  title,
  poster,
  posterHint,
}: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={styles.wrap}>
      <div className={styles.stage}>
        {playing && videoId ? (
          <iframe
            className={styles.frame}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={`${title} — video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <Slot
              src={poster}
              alt={`${title} — poster frame`}
              hint={posterHint}
              sizes="(max-width: 1240px) 100vw, 1240px"
              priority
            />
            {videoId ? (
              <button
                type="button"
                className={styles.play}
                onClick={() => setPlaying(true)}
              >
                <span className={styles.pill}>
                  <span aria-hidden="true">▶</span> Play
                </span>
                <span className="sr-only">Play {title} on YouTube</span>
              </button>
            ) : (
              <span className={styles.pending}>Video coming soon</span>
            )}
          </>
        )}
      </div>
      <figcaption className={styles.caption}>
        {videoId
          ? "Embedded from YouTube · click to load"
          : "Poster frame · full cut going up shortly"}
      </figcaption>
    </figure>
  );
}

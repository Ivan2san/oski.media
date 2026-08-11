import Image from "next/image";
import styles from "./Slot.module.css";

type SlotProps = {
  /** Path under /public, e.g. "/images/round-12-highlights.jpg". */
  src?: string;
  alt: string;
  /** Shown when there's no image yet, so an empty slot reads as intentional. */
  hint: string;
  /** Passed straight to next/image; describes the slot's rendered width. */
  sizes?: string;
  priority?: boolean;
};

/**
 * Production stand-in for the prototype's <image-slot>. Fills its positioned
 * parent. Until a real frame is dropped into /public/images it renders a
 * labelled placeholder rather than a broken image.
 */
export function Slot({ src, alt, hint, sizes = "100vw", priority }: SlotProps) {
  if (!src) {
    return (
      <div className={styles.empty}>
        <span className={styles.frame} aria-hidden="true" />
        <span className={styles.hint}>{hint}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={styles.img}
    />
  );
}

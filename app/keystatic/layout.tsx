import type { Metadata } from "next";

/**
 * The admin sits outside the site's own chrome — no header, footer, fonts or
 * scrim — so Keystatic's UI renders on its own terms.
 */
export const metadata: Metadata = {
  title: "oski.media admin",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

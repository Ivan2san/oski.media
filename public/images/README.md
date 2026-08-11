# Images

Drop real frames here, then point at them from `content/`. Any slot left empty
renders a labelled placeholder — nothing breaks, so you can publish before the
assets exist.

Prefer `.webp`; `next/image` handles the rest.

## Hero triptych

Three full-height vertical panels wired in `HERO_PANELS` (`content/site.ts`).
Uncomment the `src` line on each once the file is here.

| Panel | File | Sport | Status |
| --- | --- | --- | --- |
| Left | `hero-afl.webp` | AFL | Empty — placeholder |
| Centre | `hero-football.webp` | Football | Stock placeholder, see credit below |
| Right | `hero-nrl.webp` | NRL | Empty — placeholder |

**Size:** roughly `1050×1870` (about 9:16). Don't supply 3:4 or wider — the
panel renders around 1:2, so `object-fit: cover` trims the sides hard and a
subject that isn't dead centre gets cut in half.

### Panel order is a layout decision, not a ranking

The headline covers the **left** panel's entire middle and the scrim runs to
94% opacity at the bottom, so a subject-led frame there is simply lost. That
slot wants texture — a floodlit empty pitch, a dark grandstand, a crowd. This
was learned the hard way: the football action shot was originally on the left
and disappeared behind the H1 completely.

The **centre** panel is the only one nothing overlaps, and the only one kept
below 700px, so it takes the strongest frame available. The **right** panel
reads clearly down to about two thirds height, where the CTA sits.

### Shooting

Long lens, background thrown out. At a third of the viewport a busy background
turns to mush; the subject has to carry the panel alone. Keep the subject
centred horizontally — the sides get cropped.

Grade all three to one LUT so they read as a set: crushed blacks to sit on
`#0B0B0C`, desaturated with one warm note. Royal blue and red club strips fight
the `#FFD100` accent — when a kit clashes, pick a backlit frame where the
player reads as a silhouette with a rim of light.

### Credit — `hero-football.webp`

Photo by **Diego Santacruz** on Pexels, free licence (commercial use permitted,
attribution not required — credited here as good practice).
https://www.pexels.com/photo/man-in-yellow-soccer-jersey-playing-football-on-football-field-12616082/

Cropped to 1050×1867 around the player and graded down with ffmpeg
(`saturation 0.82, contrast 1.14, brightness -0.07`, shadows crushed) to sit on
the dark palette.

**This is a stand-in.** Free stock has essentially no genuine AFL, and its
"rugby league" results are actually rugby union — which is why the other two
panels are still empty. Replace all three with Oski's own frames when they
exist; a sports videographer running stock is a credibility risk the first time
a club recognises it. Note the small Coca-Cola sponsor mark on the shirt.

## Everything else

| Slot | Where to wire it | Suggested size |
| --- | --- | --- |
| Portrait | `IMAGES.portrait` in `content/site.ts` | 1200×1500 (4:5) |
| Project posters | `poster:` on each entry in `content/projects.ts` | 1920×1080 (16:9) |

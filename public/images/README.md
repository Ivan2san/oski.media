# Images

Drop real frames here, then point at them from `content/`. Any slot left empty
renders a labelled placeholder — nothing breaks, so you can publish before the
assets exist.

Prefer `.webp`; `next/image` handles the rest.

## Hero triptych

Three full-height vertical panels, one per code, wired in `HERO_PANELS`
(`content/site.ts`). Uncomment the `src` line on each once the file is here.

| Panel | File | Sport | Frame |
| --- | --- | --- | --- |
| Left | `hero-football.webp` | Football | Floodlit dusk, player striking the ball |
| Centre | `hero-afl.webp` | AFL | Pack mark — player elevated, ball above the hands |
| Right | `hero-nrl.webp` | NRL | Contact — tackle or fend-off, tight long lens |

**Size:** `1200×1600` each (3:4 portrait). The parallax layer is 128% tall, so
supply vertical overscan and let `object-fit: cover` crop. Under 250KB each.

**Panel order is not arbitrary.** The headline sits over the left panel and the
scrim runs to 94% opacity at the bottom, so the left frame wants dead space low
in the composition — a dark crowd, empty grass, deep shadow. The loudest frame
belongs in the centre, where nothing overlaps it. The centre panel is also the
only one kept below 700px, so it has to carry the hero alone on a phone.

**Shoot long-lens with the background thrown out.** At a third of the viewport
a busy background turns to mush; the subject has to carry the panel by itself.

**Grade all three to one LUT** so they read as a set: crushed blacks to sit on
`#0B0B0C`, desaturated with one warm note. Royal blue and red club strips fight
the `#FFD100` accent — when a kit clashes, pick a backlit frame where the
player reads as a silhouette with a rim of light.

## Everything else

| Slot | Where to wire it | Suggested size |
| --- | --- | --- |
| Portrait | `IMAGES.portrait` in `content/site.ts` | 1200×1500 (4:5) |
| Project posters | `poster:` on each entry in `content/projects.ts` | 1920×1080 (16:9) |

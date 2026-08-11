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
| Left | `hero-afl.webp` | AFL | Stock stand-in — **CC BY, attribution required** |
| Centre | `hero-football.webp` | Football | Stock stand-in |
| Right | `hero-nrl.webp` | NRL | Stock stand-in |

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

### Credits

All three are stand-ins pending Oski's own frames. Each was cropped to the
panel's tall aspect and graded with ffmpeg to a shared look — saturation ~0.4,
contrast ~1.2, shadows crushed, a touch warm. Brightness is set **per image**,
because matching mean luminance is the wrong target: the football frame is a
night shot with a bright subject on black, so the daylight frames need to keep
enough highlight to survive the hero scrim.

| File | Photographer | Licence | Source |
| --- | --- | --- | --- |
| `hero-afl.webp` | Jimmy Harris | **CC BY 2.0** | [Contested mark inside the Eagles' 50](https://commons.wikimedia.org/wiki/File:Contested_mark_inside_the_Eagles%27_50_(46721657).jpg) |
| `hero-football.webp` | Diego Santacruz | Pexels licence | [Man in yellow soccer jersey](https://www.pexels.com/photo/man-in-yellow-soccer-jersey-playing-football-on-football-field-12616082/) |
| `hero-nrl.webp` | Commander Keane | **CC0** | [Easts player tackled](https://commons.wikimedia.org/wiki/File:Easts_player_tackled_1a.jpg) |

**Attribution obligation.** `hero-afl.webp` is CC BY 2.0, which requires
visible credit wherever it is published — this README is not enough on its own.
Either add a credit line to the site while that image is in use, or swap it for
an own-shot frame. The other two require nothing: Pexels waives attribution and
CC0 is a public-domain dedication.

**Why stand-ins at all.** Free stock has essentially no genuine AFL, and stock
libraries' "rugby league" results are actually rugby union, which any Sydney
club would spot instantly. Wikimedia Commons does have real Australian
football and league photography, but it's daylight spectator work rather than
the long-lens night look the site is built around. Replace all three when
Oski's own frames exist — a sports videographer running stock is a credibility
risk the first time a club recognises it. Note also the small Coca-Cola sponsor
mark on the football shirt.

## Everything else

| Slot | Where to wire it | Suggested size |
| --- | --- | --- |
| Portrait | `IMAGES.portrait` in `content/site.ts` | 1200×1500 (4:5) |
| Project posters | `poster:` on each entry in `content/projects.ts` | 1920×1080 (16:9) |

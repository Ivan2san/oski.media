# Images and video

Drop real assets here, then point at them from `content/`. Any image slot left
empty renders a labelled placeholder — nothing breaks, so you can publish
before the assets exist.

Prefer `.webp` for stills; `next/image` handles the rest.

## The hero

Set under **Site settings → Hero images** in the admin. The number of images
decides the behaviour, so there's no switch to find:

| Images | What happens |
| --- | --- |
| One | Sits still. No timer runs at all. |
| Two or more | Cross-fade on a loop, in the order listed. 5s hold, 2.5s dissolve. |
| None | Labelled placeholder — the page still lays out correctly. |

**Hero video** overrides all of that when set: the video plays instead, and the
first hero image becomes its holding frame. Leave it empty (the default) and
the images run the hero.

Constraints either way:

- **Roughly 16:9.** 1280×720 is plenty — everything sits behind a heavy scrim,
  so resolution beyond 720p is wasted bytes.
- **Keep the action right of centre.** The headline occupies the left of the
  frame on desktop; anything important over there is lost behind type.
- **Video must be silent and under about 1MB.** Browsers only autoplay muted
  video, and it loads on every first visit. It also needs to start and end on
  the same frame or the loop point reads as a glitch.

Reduced-motion visitors get the first image held still — the slideshow never
starts its timer and `HeroShowreel` never calls `play()`. Same if JS fails or
autoplay is blocked.

### The current images are stand-ins

Three graded stock frames, one per code. They were previously baked into a
single 9.6s `.mp4`, which meant swapping any one of them needed ffmpeg; they're
now three separate files Oski can replace individually in the admin. Each is
cropped to 16:9 and graded to a shared look (saturation ~0.45, contrast ~1.2,
shadows crushed, slightly warm).

| File | Code |
| --- | --- |
| `hero-afl.webp` | AFL — contested mark |
| `hero-football.webp` | Football — striker |
| `hero-nrl.webp` | NRL — tackle |

| Code | Photographer | Licence | Source |
| --- | --- | --- | --- |
| AFL | Jimmy Harris | **CC BY 2.0** | [Contested mark inside the Eagles' 50](https://commons.wikimedia.org/wiki/File:Contested_mark_inside_the_Eagles%27_50_(46721657).jpg) |
| Football | Diego Santacruz | Pexels licence | [Man in yellow soccer jersey](https://www.pexels.com/photo/man-in-yellow-soccer-jersey-playing-football-on-football-field-12616082/) |
| NRL | Commander Keane | **CC0** | [Easts player tackled](https://commons.wikimedia.org/wiki/File:Easts_player_tackled_1a.jpg) |

**Attribution obligation.** The AFL frame is CC BY 2.0, which requires visible
credit wherever it's published — this README is not enough on its own. Either
add a credit line to the site while it's in use, or replace the loop with
Oski's own footage. Pexels waives attribution and CC0 is a public-domain
dedication, so the other two need nothing.

Replace all three as soon as real footage exists. A sports videographer running
stock in his own hero is a credibility risk the first time a club recognises
it. Note also the small Coca-Cola sponsor mark on the football shirt.

The old `showreel-loop.mp4` and `showreel-poster.webp` are kept so the Hero
video field has something to demonstrate, but nothing references them by
default.

## Everything else

| Slot | Where to wire it | Suggested size |
| --- | --- | --- |
| Portrait | Admin → Site settings → Portrait | 1200×1500 (4:5) |
| Project posters | Admin → Projects → *entry* → Poster | 1920×1080 (16:9) |

Uploads through the admin land in this folder too. Keep them here — Keystatic
finds a file by stripping `/images/` off the stored path, so anything filed
elsewhere reads as "no image set" in the admin.

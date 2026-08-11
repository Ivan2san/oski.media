# Images and video

Drop real assets here, then point at them from `content/`. Any image slot left
empty renders a labelled placeholder — nothing breaks, so you can publish
before the assets exist.

Prefer `.webp` for stills; `next/image` handles the rest.

## Hero showreel

The hero is a silent looping cut, set under **Site settings → Showreel** in the
admin. The current files are:

| File | Purpose |
| --- | --- |
| `/public/video/showreel-loop.mp4` | The loop itself — muted, autoplaying, looping |
| `/public/images/showreel-poster.webp` | First frame, held before playback starts |

**Replacing it.** Upload a new cut and poster in the admin, or overwrite both
files directly. Either way, no code changes. Keep to these constraints:

- **Silent.** There is no audio track and no controls — browsers only autoplay
  muted video, and an unmuted hero is hostile anyway.
- **Roughly 16:9**, 1280×720 is plenty. It sits behind a heavy scrim, so
  resolution beyond 720p is wasted bytes.
- **Under about 1MB.** It autoplays on every first visit. The current file is
  494KB for 9.6s.
- **Loop seamlessly** — start and end on the same frame, or the cut point
  reads as a glitch every time round.
- **Export a matching first frame** as the poster, or there's a jump when
  playback starts.
- **Keep the action right of centre.** The headline occupies the left of the
  frame on desktop; anything important over there is lost behind type.

Reduced-motion visitors never see it move — `HeroShowreel` only calls `play()`
when the visitor hasn't asked their OS to calm animation down, so they get the
poster held still. Same if autoplay is blocked or JS fails.

### The current loop is a stand-in

Three graded stock frames, one per code, cross-dissolving on a 9.6s seamless
loop. Built with ffmpeg from the sources below, each cropped to 16:9 and graded
to a shared look (saturation ~0.45, contrast ~1.2, shadows crushed, slightly
warm) with brightness set per frame.

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
stock in his own showreel is a credibility risk the first time a club
recognises it. Note also the small Coca-Cola sponsor mark on the football
shirt.

## Everything else

| Slot | Where to wire it | Suggested size |
| --- | --- | --- |
| Portrait | Admin → Site settings → Portrait | 1200×1500 (4:5) |
| Project posters | Admin → Projects → *entry* → Poster | 1920×1080 (16:9) |

Uploads through the admin land in `public/images/uploads/`.

# Images

Drop real frames here, then point at them from `content/`.

| Slot | Where to wire it | Suggested size |
| --- | --- | --- |
| Hero / showreel poster | `IMAGES.hero` in `content/site.ts` | 2400×1350 (16:9) |
| Portrait | `IMAGES.portrait` in `content/site.ts` | 1200×1500 (4:5) |
| Project posters | `poster:` on each entry in `content/projects.ts` | 1920×1080 (16:9) |

Any slot left empty renders a labelled placeholder — nothing breaks.
Prefer `.webp` or a well-compressed `.jpg`; `next/image` handles the rest.

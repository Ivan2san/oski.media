# Logos

Exported from the `Sydney Sports Videographer Portfolio` Claude Design project.
Same lockup throughout — the OSKI MEDIA wordmark inside four corner brackets,
the viewfinder frame that `components/Logo.tsx` draws in CSS.

Nothing in the site points at these yet. They're here for off-site use: social
profiles, email signatures, deliverable slates, anything that needs a raster
mark rather than the live component.

| File | Size | Background | Use |
| --- | --- | --- | --- |
| `oski-media-logo.png` | 1184×844 | Transparent | Compositing over dark footage or dark panels |
| `oski-media-logo-dark.png` | 1920×1500 | `#1a1a1a` | Default. Anywhere a flat file is needed |
| `oski-media-logo-light.png` | 1920×1500 | `#f7f5f0` | Documents, invoices, light-background decks |
| `oski-media-logo-square.png` | 1024×1024 | `#1a1a1a` | Avatars — Instagram, YouTube, LinkedIn |

**The transparent export only reads on dark.** Its wordmark is bone
(`#f2f1ed`), not black, so it disappears on white. Use the light variant there.

## These don't match the site tokens

The exports were graded independently of `app/globals.css`, so the brackets are
a softer amber than the site accent and the darks differ:

| | Logo files | Site (`app/globals.css`, `app/brand.ts`) |
| --- | --- | --- |
| Accent | `#e8b93b` | `#ffd100` |
| Ink | `#f2f1ed` | `#f2f1ed` |
| Black | `#1a1a1a` | `#0B0B0C` |

Close enough that nobody notices them apart; wrong if a logo ever sits next to
live site chrome. Pick one set before that happens — either regrade the exports
or move the site accent — rather than letting both drift.

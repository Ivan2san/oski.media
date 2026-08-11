# oski.media

Portfolio site for a Sydney freelance sports videographer — match-day
highlights, social cutdowns and club promos across AFL, NRL and football.

Ported from the Claude Design prototype
([`oski.media.dc.html`](https://claude.ai/design/p/4e9e2ba9-c425-4d38-af41-c181c5e01db4?file=oski.media.dc.html))
into a real Next.js app. The prototype's hash router became real routes, its
`<image-slot>` placeholders became `next/image` slots, and its fake contact
form became a working Formspree submission.

- **Live:** https://oski-media.vercel.app
- **Stack:** Next.js 15 (App Router) · React 19 · TypeScript · CSS Modules
- **Deploy:** Vercel (`oski-media`, scope `ivans-projects-65720d1a`)

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build; all routes prerender
npm run typecheck
```

## Adding a project

Everything on the site reads from two files. You should never need to touch a
component to publish new work.

Open `content/projects.ts`, copy an existing block in `PROJECTS`, and edit it:

```ts
{
  slug: "round-14-highlights",        // becomes /work/round-14-highlights
  title: "Round 14 Highlights",
  club: "Marrickville FC",
  code: "Football",                   // sport — becomes a filter chip
  type: "Match day",                  // job kind — becomes a filter chip
  featured: true,                     // show in the top 3 on the home page
  video: "https://youtu.be/AbCdEfGhIjK",
  blurb: "Two lines on what the job was and how fast it landed.",
  delivered: "1× 2min cut, 4× vertical socials",
  turnaround: "Same night",
  poster: "/images/round-14.jpg",     // optional
}
```

Order in the array is the order on the site. New filter chips appear
automatically when you introduce a new `code` or `type`. The route, sitemap
entry, page metadata and "next project" link are all derived — nothing else to
update.

`content/site.ts` holds the email, socials, hero image and portrait.

### Placeholders are deliberate

Any slot without an image renders a labelled placeholder, and any project
still on the `youtu.be/xxxxxxxxxxx` placeholder renders "video coming soon"
instead of a dead embed. The site never shows a broken image or empty frame,
so you can publish before the assets exist. See `public/images/README.md`.

## Contact form

Posts to [Formspree](https://formspree.io) as JSON so the visitor stays on the
page and gets the designed "Got it" state.

`NEXT_PUBLIC_FORMSPREE_ID` is already set in Vercel across production, preview
and development — it's the `mqeokozk` in `formspree.io/f/mqeokozk`. To point
the form at a different endpoint:

```bash
vercel env rm NEXT_PUBLIC_FORMSPREE_ID production
vercel env add NEXT_PUBLIC_FORMSPREE_ID production
```

It's a `NEXT_PUBLIC_` value, so it ships in the client bundle — which is fine,
a Formspree form id is a public endpoint, not a credential.

For local dev, `vercel env pull .env.local` fetches it. If the variable is
ever missing the submit button disables itself and says so, rather than
silently dropping enquiries. The email and social links work regardless.

## Attaching the oski.media domain

The site currently resolves against `https://oski-media.vercel.app`. When the
domain is ready:

```bash
vercel domains add oski.media                        # prints the DNS records
vercel env add NEXT_PUBLIC_SITE_URL production       # https://oski.media
vercel --prod                                        # redeploy so metadata picks it up
```

`NEXT_PUBLIC_SITE_URL` feeds canonical URLs, `sitemap.xml`, `robots.txt` and
the OG card, so set it in the same pass as the domain.

## Layout

```
app/
  layout.tsx            header, footer, fonts, JSON-LD, base metadata
  page.tsx              home — hero, ticker, selected work, testimonial
  work/page.tsx         work index (filters are client-side)
  work/[slug]/page.tsx  case study, generateStaticParams + generateMetadata
  services/ about/ contact/
  opengraph-image.tsx   share card, Archivo embedded from assets/fonts
  icon.tsx              32px favicon — OM, white on black
  apple-icon.tsx        180px home-screen icon
  brand.ts              shared font loader + icon colours for the three above
  sitemap.ts robots.ts not-found.tsx
components/             one .tsx + one .module.css each
content/                projects.ts, site.ts — the only files content lives in
assets/fonts/           Archivo .woff for the OG card (Satori can't read woff2)
```

Design tokens (the palette, gutter, radii) are CSS custom properties at the
top of `app/globals.css`. No component hard-codes a hex.

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

## Editing the site

Content is edited through a CMS at **[/keystatic](https://oski-media.vercel.app/keystatic)**.
Sign in with GitHub — anyone with write access to this repo can edit. No code,
no local setup, works on a phone.

Every save is a normal git commit, so the site's history *is* the edit history:
you can see who changed what and revert anything.

| What | Where in the admin |
|---|---|
| Projects — title, club, code, type, video, blurb, poster | **Projects** |
| Services intro and the list of services | **Services** |
| Clubs in the scrolling ticker | **Ticker clubs** |
| Tagline, lede, email, socials, showreel and its poster | **Site settings** |

A few things are derived rather than typed: the URL comes from the title, the
filter chips on `/work` appear automatically from the `code` and `type` values
you use, and the sitemap, page metadata and "next project" link all follow. The
project list is ordered by **date**, newest first — not by the order shown in
the admin, which is alphabetical.

Images uploaded through the admin land in `public/images/`, alongside the
hand-placed ones. They share a folder deliberately: Keystatic locates a file by
stripping the field's `publicPath` off the stored value, so an asset outside
that folder reads as *no image set* — silently, with the field looking empty.

### Editing locally

`npm run dev`, then <http://localhost:3000/keystatic>. In development the admin
writes straight to the files on disk with no GitHub sign-in, so you can draft
against a branch and commit normally.

Underneath, everything is YAML in `content/` — `content/projects/<slug>.yaml`,
plus `services.yaml`, `clubs.yaml` and `site.yaml`. Editing those by hand is
equivalent; the admin is a nicer front end for the same files.

### Placeholders are deliberate

Any slot without an image renders a labelled placeholder, and any project
still on the `youtu.be/xxxxxxxxxxx` placeholder renders "video coming soon"
instead of a dead embed. The site never shows a broken image or empty frame,
so you can publish before the assets exist. See `public/images/README.md`.

## Connecting the CMS to GitHub

One-time setup. Until it's done, `/keystatic` returns a 503 explaining what's
missing — the public site is unaffected either way, which is why the admin
route is guarded rather than allowed to fail the build.

Keystatic ships a wizard that does this automatically, but only in development
mode with `storage.kind: "github"`. This project uses local storage in dev (so
editing locally needs no GitHub App at all), and the wizard would create an App
pointed at localhost anyway. Creating it by hand is quicker:

1. **[Create the App](https://github.com/settings/apps/new)** —
   name it `oski.media CMS`, homepage `https://oski-media.vercel.app`.
2. **Callback URL** — `https://oski-media.vercel.app/api/keystatic/github/oauth/callback`
3. Tick **Request user authorization (OAuth) during installation**.
4. Under **Webhook**, untick **Active**. Keystatic doesn't use webhooks.
5. **Repository permissions:**
   - Contents — **Read and write** (the files, and the branches)
   - Pull requests — **Read and write** (the admin can open a PR instead of
     committing straight to `main`)
   - Metadata — Read-only, ticked for you
6. **Where can this GitHub App be installed** — *Only on this account*.
7. Create it, then **Generate a client secret** and keep the page open.
8. **Install App** → *Only select repositories* → `Ivan2san/oski.media`.

Then set three variables in Vercel. Run these and paste each value when
prompted — don't put secrets in a file that could be committed:

```bash
vercel env add KEYSTATIC_GITHUB_CLIENT_ID production      # Iv23... from the App page
vercel env add KEYSTATIC_GITHUB_CLIENT_SECRET production  # the secret from step 7
openssl rand -hex 40 | vercel env add KEYSTATIC_SECRET production
```

Redeploy, then open `/keystatic` and sign in. Repeat for `preview` if you want
the admin on preview deployments too.

Anyone who needs to edit must be a repo collaborator with **write** access
(Settings → Collaborators). Keystatic acts as the signed-in person, so their
own permissions apply and their name is on the commit.

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
public/video/           the hero showreel loop
```

Design tokens (the palette, gutter, radii) are CSS custom properties at the
top of `app/globals.css`. No component hard-codes a hex.

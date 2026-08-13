import { collection, config, fields, singleton } from "@keystatic/core";

/**
 * Local storage in development writes straight to disk with no auth, so the
 * admin is usable the moment you run `npm run dev`. Production commits to
 * GitHub as the signed-in editor, which is the whole point of a git-backed
 * CMS: content stays in version control and the site stays static.
 */
const storage =
  process.env.NODE_ENV === "development"
    ? ({ kind: "local" } as const)
    : ({
        kind: "github",
        repo: { owner: "Ivan2san", name: "oski.media" },
      } as const);

/**
 * `publicPath` is not optional in practice — without it Keystatic stores a
 * bare filename rather than a site-root path, and every image silently
 * renders broken. `directory` is where the file physically lands.
 *
 * These two must agree with the paths already in the content files. Keystatic
 * strips `publicPath` off a stored value to find the file, so a value that
 * doesn't start with it reads as *empty* — the field renders as though no
 * image was ever set, with no error anywhere. Pointing at `public/images`
 * rather than a separate uploads folder keeps hand-placed assets and uploads
 * in one namespace, which is the only way both stay readable in the admin.
 */
const uploadedImage = (label: string, description?: string) =>
  fields.image({
    label,
    description,
    directory: "public/images",
    publicPath: "/images/",
  });

/**
 * Appended to every image field. Uploads are shrunk automatically after they
 * land (.github/workflows/compress-images.yml), so this is a nudge rather
 * than a rule — but the original is kept in git history forever, and that
 * part can't be undone after the fact.
 */
const SIZE_HINT =
  "Straight off a phone or camera is fine — large uploads are resized automatically after saving.";

export default config({
  storage,

  ui: {
    brand: { name: "oski.media" },
    navigation: {
      Content: ["projects", "services"],
      Site: ["site", "clubs"],
    },
  },

  collections: {
    projects: collection({
      label: "Projects",
      path: "content/projects/*",
      slugField: "title",
      format: { data: "yaml" },
      columns: ["title", "club"],
      entryLayout: "form",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            description: "Shown on the card and as the case-study headline.",
          },
          slug: {
            label: "URL slug",
            description: "Becomes /work/<slug>. Changing it breaks old links.",
          },
        }),
        date: fields.date({
          label: "Shot on",
          description:
            "Orders the site — newest first, everywhere. Not displayed anywhere yet.",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        club: fields.text({
          label: "Club",
          validation: { length: { min: 1 } },
        }),
        code: fields.text({
          label: "Sport",
          description:
            "AFL, NRL, Football… Doubles as a filter chip on the Work page — a new value creates a new chip automatically.",
          validation: { length: { min: 1 } },
        }),
        type: fields.text({
          label: "Job type",
          description:
            "Match day, Promo, Social… Also a filter chip on the Work page.",
          validation: { length: { min: 1 } },
        }),
        featured: fields.checkbox({
          label: "Feature on the home page",
          description: "The first three featured projects show under Selected work.",
          defaultValue: false,
        }),
        video: fields.url({
          label: "YouTube link",
          description:
            "Full YouTube URL. Leave empty and the case study shows “video coming soon” instead of a dead embed.",
        }),
        blurb: fields.text({
          label: "Blurb",
          description: "Two lines on what the job was and how fast it landed.",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        delivered: fields.text({
          label: "Delivered",
          description: "e.g. 1× 2min cut, 4× vertical socials",
        }),
        turnaround: fields.text({
          label: "Turnaround",
          description: "e.g. Same night",
        }),
        poster: uploadedImage(
          "Poster frame",
          `16:9. Leave empty and the card renders a labelled placeholder rather than a broken image. ${SIZE_HINT}`,
        ),
      },
    }),
  },

  singletons: {
    services: singleton({
      label: "Services",
      path: "content/services",
      format: { data: "yaml" },
      schema: {
        intro: fields.text({
          label: "Intro paragraph",
          multiline: true,
        }),
        items: fields.array(
          fields.object({
            num: fields.text({ label: "Number", description: "e.g. 01" }),
            name: fields.text({ label: "Name" }),
            line: fields.text({ label: "One-liner", multiline: true }),
            items: fields.array(fields.text({ label: "Bullet" }), {
              label: "Bullets",
              itemLabel: (props) => props.value,
            }),
          }),
          {
            label: "Service blocks",
            itemLabel: (props) => props.fields.name.value || "Untitled",
          },
        ),
      },
    }),

    clubs: singleton({
      label: "Ticker clubs",
      path: "content/clubs",
      format: { data: "yaml" },
      schema: {
        items: fields.array(fields.text({ label: "Club" }), {
          label: "Clubs",
          description:
            "The scrolling list on the home page. This is the landscape covered across NSW, NOT a client list — the accessible label says “covered”, not “worked with”. Don't add a club here to imply a job that didn't happen.",
          itemLabel: (props) => props.value,
        }),
      },
    }),

    site: singleton({
      label: "Site settings",
      path: "content/site",
      format: { data: "yaml" },
      schema: {
        tagline: fields.text({
          label: "Hero headline",
          multiline: true,
        }),
        lede: fields.text({
          label: "Hero sub-paragraph",
          multiline: true,
        }),
        description: fields.text({
          label: "Search description",
          description:
            "Used for search results and link previews. Aim for 150–160 characters.",
          multiline: true,
        }),
        email: fields.text({ label: "Email" }),
        socials: fields.array(
          fields.object({
            label: fields.text({ label: "Network" }),
            handle: fields.text({ label: "Handle" }),
            href: fields.url({ label: "Link" }),
          }),
          {
            label: "Social channels",
            description:
              "Order here is the order in the footer, on the contact page and in the site's structured data.",
            itemLabel: (props) => props.fields.label.value || "Untitled",
          },
        ),
        portrait: uploadedImage(
          "About page photo",
          `The big photo of you on the About page. Portrait orientation, 4:5 works best. Leave it empty and the page shows a labelled placeholder rather than a gap. ${SIZE_HINT}`,
        ),
        heroImages: fields.array(uploadedImage("Image"), {
          label: "Hero images",
          description:
            `The images behind the headline on the home page. Add one and it sits still; add two or more and they cross-fade on a loop, in this order. Landscape, roughly 16:9. They sit under a dark scrim with type over them, so pick frames with room to breathe — a busy centre fights the headline. ${SIZE_HINT}`,
          itemLabel: (props) => props.value?.filename ?? "Image",
        }),
        showreel: fields.file({
          label: "Hero video",
          description:
            "Optional, and usually empty. Real footage to play instead of the images above — the first hero image becomes its holding frame. Silent, roughly 16:9, under about 1MB since it loads on every first visit. Must start and end on the same frame or the loop point reads as a glitch.",
          directory: "public/video",
          publicPath: "/video/",
        }),
      },
    }),
  },
});

import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getSite } from "@/lib/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSite();

  /** Tells Google this is a real local operator, not a stock template. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    areaServed: { "@type": "City", name: site.locality },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    sameAs: site.socials.map((social) => social.href),
    knowsAbout: [
      "Sports videography",
      "Match-day highlights",
      "Social video production",
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      {children}
      <SiteFooter email={site.email} socials={site.socials} />
      {/* Escaping `<` matters now that these values come from the CMS:
          JSON.stringify does not neutralise a literal `</script>` typed into
          a text field, which would otherwise break out of this block. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Sits here rather than in the root layout so it only counts visitors.
          The root layout also wraps /keystatic, and Oski editing his own site
          would show up as traffic — a handful of daily CMS sessions is enough
          to bend the numbers on a site this size. */}
      <Analytics />
    </>
  );
}

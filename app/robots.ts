import type { MetadataRoute } from "next";
import { SITE_STATIC } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The admin is behind GitHub auth anyway, but there's no reason for it
      // to appear in search results.
      disallow: ["/keystatic", "/api/keystatic"],
    },
    sitemap: `${SITE_STATIC.url}/sitemap.xml`,
  };
}

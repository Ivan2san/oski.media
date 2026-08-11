import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { SITE_STATIC } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/work", "/services", "/about", "/contact"];
  const projects = await getProjects();

  return [
    ...pages.map((path) => ({
      url: `${SITE_STATIC.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${SITE_STATIC.url}${project.path}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}

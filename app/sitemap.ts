import type { MetadataRoute } from "next";
import { ALL_PROJECTS } from "@/content/projects";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/services", "/about", "/contact"];

  return [
    ...pages.map((path) => ({
      url: `${SITE.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...ALL_PROJECTS.map((project) => ({
      url: `${SITE.url}${project.path}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}

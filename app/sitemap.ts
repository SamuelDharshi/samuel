import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url },
    { url: `${site.url}/projects` },
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}` })),
  ];
}

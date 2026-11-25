import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { urlSlug } from "@/data/projects";
import { getProjects } from "@/lib/github";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects } = await getProjects();
  return [
    { url: site.url },
    { url: `${site.url}/projects` },
    ...projects.map((p) => ({ url: `${site.url}/projects/${urlSlug(p)}` })),
  ];
}

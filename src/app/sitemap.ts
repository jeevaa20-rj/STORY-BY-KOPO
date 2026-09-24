import type { MetadataRoute } from "next";
import { getStories } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://storybykopi.com";
  const stories = await getStories();
  const pages = ["", "/portfolio", "/stories", "/about", "/contact"].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.8 }));
  return [...pages, ...stories.map((story) => ({ url: `${baseUrl}/stories/${story.slug}`, lastModified: new Date(story.date), changeFrequency: "yearly" as const, priority: 0.7 }))];
}

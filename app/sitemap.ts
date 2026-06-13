import type { MetadataRoute } from "next";
import { getArticles, SITE_URL } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  try {
    const { articles } = await getArticles({ limit: 200 });
    const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${SITE_URL}/article/${article.slug}`,
      lastModified: article.publishedAt
        ? new Date(article.publishedAt)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
    return [...base, ...articleEntries];
  } catch {
    return base;
  }
}

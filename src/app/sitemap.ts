import type { MetadataRoute } from "next";
import { publicGuides } from "@/lib/public-guides";
import { getAllCountrySlugs } from "@/lib/countries";

const siteUrl = "https://www.theglobalpolymath.com";

const publicRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/countries", priority: 0.95, changeFrequency: "daily" },
  { path: "/compare", priority: 0.9, changeFrequency: "weekly" },
  { path: "/courses", priority: 0.85, changeFrequency: "weekly" },
  { path: "/intelligence", priority: 0.75, changeFrequency: "weekly" },
  { path: "/intelligence/research", priority: 0.75, changeFrequency: "weekly" },
  { path: "/guides", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.7, changeFrequency: "weekly" },
  { path: "/community", priority: 0.65, changeFrequency: "weekly" },
  { path: "/passport", priority: 0.65, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.55, changeFrequency: "monthly" },
  { path: "/why", priority: 0.55, changeFrequency: "monthly" },
  { path: "/verify", priority: 0.4, changeFrequency: "monthly" },
  { path: "/legal", priority: 0.2, changeFrequency: "yearly" },
  { path: "/billing-terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/refunds", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    ...(route.path === "" ? { images: [
      `${siteUrl}/images/cinematic-2026/global-horizon-1600.webp`,
      `${siteUrl}/brand/tgpi-crest-metal-v3-256.png`,
    ] } : route.path === "/about" ? { images: [
      `${siteUrl}/images/cinematic-2026/country-research-1600.webp`,
      `${siteUrl}/images/cinematic-2026/learning-atelier-1600.webp`,
    ] } : {}),
  }));

  const countries: MetadataRoute.Sitemap = getAllCountrySlugs().map((slug) => ({
    url: `${siteUrl}/countries/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...pages, ...countries, ...publicGuides.map(guide => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified: guide.reviewedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))];
}

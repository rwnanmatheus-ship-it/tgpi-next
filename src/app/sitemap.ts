import type { MetadataRoute } from "next";
import { getAllCountrySlugs } from "@/lib/countries";

const siteUrl = "https://www.theglobalpolymath.com";

const publicRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/countries", priority: 0.95, changeFrequency: "daily" },
  { path: "/compare", priority: 0.9, changeFrequency: "weekly" },
  { path: "/courses", priority: 0.85, changeFrequency: "weekly" },
  { path: "/certificates", priority: 0.8, changeFrequency: "weekly" },
  { path: "/intelligence", priority: 0.75, changeFrequency: "weekly" },
  { path: "/intelligence/research", priority: 0.75, changeFrequency: "weekly" },
  { path: "/ranking", priority: 0.75, changeFrequency: "weekly" },
  { path: "/resources", priority: 0.7, changeFrequency: "weekly" },
  { path: "/community", priority: 0.65, changeFrequency: "weekly" },
  { path: "/passport", priority: 0.65, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.55, changeFrequency: "monthly" },
  { path: "/why", priority: 0.55, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const countries: MetadataRoute.Sitemap = getAllCountrySlugs().map((slug) => ({
    url: `${siteUrl}/countries/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...pages, ...countries];
}

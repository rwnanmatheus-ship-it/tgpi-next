import { publishedDirectory } from "@/lib/seo/course-directory.server";
import { directoryPageCount, directoryHref } from "@/lib/seo/course-directory";
import type { MetadataRoute } from "next";
import { publicGuides } from "@/lib/public-guides";
import { getAllCountries, getCountryImageUrl } from "@/lib/countries";
import { getCountryPhotos } from "@/lib/countries/editorial-photography";

import { discoveryLocales, discoveryAlternates } from "@/lib/discovery";

const siteUrl = "https://www.theglobalpolymath.com";

const publicRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/countries", priority: 0.95, changeFrequency: "daily" },
  { path: "/compare", priority: 0.9, changeFrequency: "weekly" },
  { path: "/courses", priority: 0.85, changeFrequency: "weekly" },
  { path: "/accessibility", priority: 0.65, changeFrequency: "monthly" },
  { path: "/intelligence", priority: 0.75, changeFrequency: "weekly" },
  { path: "/intelligence/research", priority: 0.75, changeFrequency: "weekly" },
  { path: "/guia-paises", priority: 0.75, changeFrequency: "monthly" },
  { path: "/guides/enem-portugal-espanha", priority: 0.7, changeFrequency: "monthly" },
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

const landingImages: Record<string, string[]> = {
  "": [
    "/images/cinematic-2026/global-horizon-1600.webp",
    "/brand/tgpi-crest-metal-v3-256.png",
  ],
  "/about": [
    "/images/cinematic-2026/country-research-1600.webp",
    "/images/cinematic-2026/learning-atelier-1600.webp",
  ],
  "/countries": getCountryPhotos("australia").slice(0, 1).map(photo => photo.src),
  "/guia-paises": ["/images/home/editorial-v4/decision-desktop.webp"],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images: landingImages[route.path]?.map(path => siteUrl + path),
  }));

  const countries: MetadataRoute.Sitemap = getAllCountries().map(country => {
    const photos = getCountryPhotos(country.slug);
    const images = photos.length ? photos.map(photo => photo.src) : [getCountryImageUrl(country)];
    return {
      url: `${siteUrl}/countries/${country.slug}`,
      images: images.map(path => new URL(path, siteUrl).href),
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });

  const coursePages: MetadataRoute.Sitemap = publishedDirectory.map(course => ({
    url: siteUrl + course.href,
    images: [new URL(course.image, siteUrl).href],
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...countries, ...coursePages, ...Array.from({length:directoryPageCount(publishedDirectory.length)},(_,index)=>({
    url: `${siteUrl}${directoryHref(index+1)}`, changeFrequency:"weekly" as const, priority:0.7,
  })), ...discoveryLocales.map(locale => ({
    url: `${siteUrl}/discover/${locale}`,
    alternates: { languages: discoveryAlternates },
    images: [`${siteUrl}/banners/tgpi-${locale}.jpg`],
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })), ...publicGuides.map(guide => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified: guide.reviewedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))];
}


import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { getAllCountries } from "@/lib/countries";
import { absoluteUrl, isCountryIndexable, publicRoutePolicy } from "@/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = publicRoutePolicy.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const countries: MetadataRoute.Sitemap = getAllCountries()
    .filter(isCountryIndexable)
    .map((country) => ({
    url: absoluteUrl(`/countries/${country.slug}`),
    changeFrequency: "weekly",
    priority: 0.82,
  }));

  const learning: MetadataRoute.Sitemap = courses.map((course) => ({
    url: absoluteUrl(`/courses/${course.id}`),
    changeFrequency: "monthly",
    priority: 0.78,
  }));

  return [...pages, ...countries, ...learning];
}

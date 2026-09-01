import type { Metadata } from "next";
import type { Country } from "@/lib/countries";
import { buildMetadata } from "@/seo/metadata";
import { tgpiUrls } from "@/seo/urls";

export const priorityCountrySlugs = [
  "united-states",
  "canada",
  "portugal",
  "spain",
  "united-kingdom",
  "germany",
  "france",
  "italy",
  "switzerland",
  "netherlands",
  "ireland",
  "australia",
  "new-zealand",
  "japan",
  "south-korea",
  "singapore",
  "united-arab-emirates",
  "brazil",
  "mexico",
] as const;

const priorityCountrySet = new Set<string>(priorityCountrySlugs);

export function isCountryIndexable(country: Pick<Country, "slug">): boolean {
  return priorityCountrySet.has(country.slug);
}

export function getCountrySeoTitle(country: Country): string {
  return `${country.name}: Cost of Living, Work, Study & Moving Guide`;
}

export function getCountrySeoDescription(country: Country): string {
  return `Explore ${country.name} with TGPI: cost profile, life in ${country.capital}, ${country.language} access, work, study, documents and practical considerations for an international move.`;
}

export function buildCountryMetadata(
  country: Country,
  image: { alt: string; url: string },
): Metadata {
  return buildMetadata({
    title: getCountrySeoTitle(country),
    description: getCountrySeoDescription(country),
    path: tgpiUrls.country(country.slug),
    index: isCountryIndexable(country),
    type: "article",
    image: {
      ...image,
      width: 1600,
      height: 900,
    },
    keywords: [
      `${country.name} cost of living`,
      `living in ${country.name}`,
      `working in ${country.name}`,
      `studying in ${country.name}`,
      `moving to ${country.name}`,
      `${country.name} documents`,
    ],
  });
}

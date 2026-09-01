import type { CountryExplorerItem } from "@/lib/countries";
import { absoluteUrl } from "@/seo/config";
import JsonLd from "@/seo/json-ld";
import { buildBreadcrumbSchema } from "@/seo/schemas/breadcrumb";
import { websiteId } from "@/seo/schemas/website";

type CountriesStructuredDataProps = {
  countries: CountryExplorerItem[];
};

export default function CountriesStructuredData({
  countries,
}: CountriesStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/countries")}#collection`,
        url: absoluteUrl("/countries"),
        name: "TGPI Country Intelligence",
        description:
          "Explore and compare 195 country profiles through a consistent framework for cost, safety, language, education, careers, culture and mobility.",
        isPartOf: {
          "@id": websiteId,
        },
        mainEntity: {
          "@id": `${absoluteUrl("/countries")}#list`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${absoluteUrl("/countries")}#list`,
        name: "TGPI Country Intelligence Profiles",
        numberOfItems: countries.length,
        itemListElement: countries.map((country, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: country.name,
          url: absoluteUrl(`/countries/${country.slug}`),
        })),
      },
      buildBreadcrumbSchema("/countries", [
        { name: "TGPI", path: "/" },
        { name: "Countries", path: "/countries" },
      ]),
    ],
  };

  return <JsonLd data={structuredData} />;
}

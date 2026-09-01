import type { Country } from "@/lib/countries";
import { absoluteUrl } from "@/seo/config";
import type { JsonLdObject } from "@/seo/json-ld";
import { buildBreadcrumbSchema } from "@/seo/schemas/breadcrumb";
import { organizationId } from "@/seo/schemas/organization";
import { websiteId } from "@/seo/schemas/website";
import { tgpiUrls } from "@/seo/urls";

type CountrySchemaOptions = {
  country: Country;
  description: string;
  imageAlt: string;
  imagePath: string;
};

export function buildCountrySchema({
  country,
  description,
  imageAlt,
  imagePath,
}: CountrySchemaOptions): JsonLdObject {
  const path = tgpiUrls.country(country.slug);
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(imagePath);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: `${country.name}: Country Intelligence Guide`,
        description,
        isPartOf: { "@id": websiteId },
        publisher: { "@id": organizationId },
        about: { "@id": `${canonical}#country` },
        primaryImageOfPage: { "@id": `${canonical}#hero-image` },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
        inLanguage: "en",
      },
      {
        "@type": "Country",
        "@id": `${canonical}#country`,
        name: country.name,
        description: country.intelligence.summary,
        containedInPlace: {
          "@type": "Place",
          name: country.region,
        },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Capital", value: country.capital },
          { "@type": "PropertyValue", name: "Language", value: country.language },
          { "@type": "PropertyValue", name: "Currency", value: country.currency },
        ],
      },
      {
        "@type": "ImageObject",
        "@id": `${canonical}#hero-image`,
        contentUrl: imageUrl,
        url: imageUrl,
        width: 1600,
        height: 900,
        caption: imageAlt,
        representativeOfPage: true,
        creditText: "TGPI Cinematic Country Series",
      },
      buildBreadcrumbSchema(path, [
        { name: "TGPI", path: "/" },
        { name: "Countries", path: "/countries" },
        { name: country.name, path },
      ]),
    ],
  };
}

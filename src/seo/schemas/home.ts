import { TGPI_SITE_URL } from "@/seo/config";
import type { JsonLdObject } from "@/seo/json-ld";
import {
  buildOrganizationSchema,
  organizationId,
} from "@/seo/schemas/organization";
import { buildWebsiteSchema, websiteId } from "@/seo/schemas/website";

export function buildHomeSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      {
        "@type": "WebApplication",
        "@id": `${TGPI_SITE_URL}/#application`,
        name: "TGPI Global Decision System",
        url: TGPI_SITE_URL,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires a modern web browser",
        description:
          "A connected system for country intelligence, transparent comparison, document preparation, practical learning and personal progress.",
        featureList: [
          "Country intelligence profiles",
          "Transparent country comparison",
          "International document preparation",
          "Practical global learning",
          "Connected TGPI Global Key",
        ],
        provider: { "@id": organizationId },
        isPartOf: { "@id": websiteId },
      },
    ],
  };
}

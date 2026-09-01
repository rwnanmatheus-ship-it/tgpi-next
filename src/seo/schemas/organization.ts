import {
  absoluteUrl,
  TGPI_BRAND,
  TGPI_CONTACT_EMAIL,
  TGPI_DESCRIPTION,
  TGPI_INSTAGRAM_URL,
  TGPI_SHORT_NAME,
  TGPI_SITE_NAME,
  TGPI_SITE_URL,
} from "@/seo/config";
import type { JsonLdObject } from "@/seo/json-ld";

export const organizationId = `${TGPI_SITE_URL}/#organization`;

export function buildOrganizationSchema(): JsonLdObject {
  return {
    "@type": "EducationalOrganization",
    "@id": organizationId,
    name: TGPI_SITE_NAME,
    alternateName: TGPI_SHORT_NAME,
    url: TGPI_SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(TGPI_BRAND.crest),
    },
    image: absoluteUrl(TGPI_BRAND.institutionalImage),
    description: TGPI_DESCRIPTION,
    foundingDate: "2026-04-14",
    founder: { "@id": `${absoluteUrl("/founder")}#person` },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: TGPI_CONTACT_EMAIL,
      availableLanguage: ["English", "Portuguese", "Spanish"],
    },
    sameAs: [TGPI_INSTAGRAM_URL],
  };
}

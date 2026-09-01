import {
  TGPI_DESCRIPTION,
  TGPI_LANGUAGE,
  TGPI_SHORT_NAME,
  TGPI_SITE_NAME,
  TGPI_SITE_URL,
} from "@/seo/config";
import type { JsonLdObject } from "@/seo/json-ld";
import { organizationId } from "@/seo/schemas/organization";

export const websiteId = `${TGPI_SITE_URL}/#website`;

export function buildWebsiteSchema(): JsonLdObject {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: TGPI_SITE_URL,
    name: TGPI_SITE_NAME,
    alternateName: TGPI_SHORT_NAME,
    description: TGPI_DESCRIPTION,
    publisher: { "@id": organizationId },
    inLanguage: TGPI_LANGUAGE,
  };
}

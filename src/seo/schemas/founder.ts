import { absoluteUrl, TGPI_SITE_NAME } from "@/seo/config";
import type { JsonLdObject } from "@/seo/json-ld";
import { buildBreadcrumbSchema } from "@/seo/schemas/breadcrumb";
import { organizationId } from "@/seo/schemas/organization";
import { websiteId } from "@/seo/schemas/website";

export const founderName = "Renan Matheus da Silva Fernandes" as const;

export function buildFounderSchema(): JsonLdObject {
  const url = absoluteUrl("/founder");
  const personId = `${url}#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile-page`,
        url,
        name: `${founderName} — Founder of TGPI`,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": personId,
        name: founderName,
        url,
        jobTitle: "Founder",
        worksFor: { "@id": organizationId, name: TGPI_SITE_NAME },
      },
      buildBreadcrumbSchema("/founder", [
        { name: "TGPI", path: "/" },
        { name: "About", path: "/about" },
        { name: founderName, path: "/founder" },
      ]),
    ],
  };
}

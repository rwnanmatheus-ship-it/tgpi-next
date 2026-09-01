import { absoluteUrl } from "@/seo/config";
import type { JsonLdObject } from "@/seo/json-ld";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbSchema(
  idPath: string,
  items: readonly BreadcrumbItem[],
): JsonLdObject {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(idPath)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

import type { Course } from "@/types/course";
import { absoluteUrl } from "@/seo/config";
import type { JsonLdObject } from "@/seo/json-ld";
import { buildBreadcrumbSchema } from "@/seo/schemas/breadcrumb";
import { organizationId } from "@/seo/schemas/organization";
import { websiteId } from "@/seo/schemas/website";
import { tgpiUrls } from "@/seo/urls";

export function buildCourseSchema(course: Course): JsonLdObject {
  const path = tgpiUrls.course(course.id);
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${url}#course`,
        url,
        name: course.title,
        description: course.description,
        provider: { "@id": organizationId },
        educationalLevel: course.level,
        timeRequired: `PT${course.estimatedMinutes}M`,
        inLanguage: "en",
        teaches: course.outcomes,
        isPartOf: { "@id": websiteId },
      },
      buildBreadcrumbSchema(path, [
        { name: "TGPI", path: "/" },
        { name: "Learn", path: "/courses" },
        { name: course.title, path },
      ]),
    ],
  };
}

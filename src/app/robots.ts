import type { MetadataRoute } from "next";
import { absoluteUrl, TGPI_SITE_URL } from "@/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api/",
        "/dashboard",
        "/login",
        "/notifications",
        "/onboarding",
        "/profile",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: TGPI_SITE_URL,
  };
}

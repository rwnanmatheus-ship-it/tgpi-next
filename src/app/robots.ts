import type { MetadataRoute } from "next";

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
    sitemap: "https://theglobalpolymath.com/sitemap.xml",
    host: "https://theglobalpolymath.com",
  };
}

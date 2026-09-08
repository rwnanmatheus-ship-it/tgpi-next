import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "TGPI — Global Decision Intelligence",
    short_name: "TGPI",
    description:
      "Compare countries, build a personal global plan, prepare documents and develop practical international capabilities.",
    start_url: "/profile?source=pwa",
    scope: "/",
    display: "standalone",
    background_color: "#040B13",
    theme_color: "#04101B",
    orientation: "any",
    lang: "en",
    dir: "ltr",
    categories: ["education", "productivity", "lifestyle"],
    prefer_related_applications: false,
    icons: [
      {
        src: "/pwa/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Workspace Intelligence",
        short_name: "Workspace",
        description: "Resume your private global decision workspace.",
        url: "/profile?source=pwa-shortcut",
        icons: [{ src: "/pwa/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Country Fit",
        short_name: "Country Fit",
        description: "Connect countries to your real priorities.",
        url: "/country-fit?source=pwa-shortcut",
        icons: [{ src: "/pwa/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Compare Countries",
        short_name: "Compare",
        description: "Review country trade-offs side by side.",
        url: "/compare?source=pwa-shortcut",
        icons: [{ src: "/pwa/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Documents OS",
        short_name: "Documents",
        description: "Continue your private preparation workflow.",
        url: "/passport?source=pwa-shortcut",
        icons: [{ src: "/pwa/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}

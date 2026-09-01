import type { MetadataRoute } from "next";
import {
  TGPI_BRAND,
  TGPI_DESCRIPTION,
  TGPI_SHORT_NAME,
  TGPI_SITE_NAME,
} from "@/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: TGPI_SITE_NAME,
    short_name: TGPI_SHORT_NAME,
    description: TGPI_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F3EA",
    theme_color: "#071A32",
    icons: [
      {
        src: TGPI_BRAND.crest,
        sizes: "256x256",
        type: "image/png",
      },
    ],
  };
}

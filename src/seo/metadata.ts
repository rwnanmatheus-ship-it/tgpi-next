import type { Metadata } from "next";
import {
  absoluteUrl,
  TGPI_BRAND,
  TGPI_DESCRIPTION,
  TGPI_LOCALE,
  TGPI_SHORT_NAME,
} from "@/seo/config";

type SeoImage = {
  alt: string;
  height?: number;
  url: string;
  width?: number;
};

type BuildMetadataOptions = {
  absoluteTitle?: boolean;
  description: string;
  image?: SeoImage;
  index?: boolean;
  keywords?: readonly string[];
  path: string;
  title: string;
  type?: "article" | "website";
};

export const publicRobots: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const privateRobots: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
};

export const noIndexFollowRobots: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
  },
};

export const privatePageMetadata: Metadata = {
  robots: privateRobots,
};

export const noIndexPageMetadata: Metadata = {
  robots: noIndexFollowRobots,
};

export function buildMetadata({
  absoluteTitle = false,
  description,
  image = {
    alt: TGPI_DESCRIPTION,
    height: 630,
    url: TGPI_BRAND.defaultOgImage,
    width: 1200,
  },
  index = true,
  keywords,
  path,
  title,
  type = "website",
}: BuildMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const resolvedImage = absoluteUrl(image.url);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical },
    robots: index ? publicRobots : noIndexFollowRobots,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: TGPI_SHORT_NAME,
      locale: TGPI_LOCALE,
      type,
      images: [
        {
          url: resolvedImage,
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolvedImage],
    },
  };
}

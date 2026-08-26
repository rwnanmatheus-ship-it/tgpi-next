import Image, { type ImageProps } from "next/image";

type BrandCrestProps = Omit<ImageProps, "src" | "alt"> & {
  alt?: string;
};

export const TGPI_CREST_SOURCE = "/brand/tgpi-crest-v2.webp";

export default function BrandCrest({
  alt = "TGPI institutional crest",
  ...imageProps
}: BrandCrestProps) {
  return <Image src={TGPI_CREST_SOURCE} alt={alt} {...imageProps} />;
}

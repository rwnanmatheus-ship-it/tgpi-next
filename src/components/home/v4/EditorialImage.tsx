import { getImageProps } from "next/image";

export type EditorialAsset = "hero" | "decision" | "country" | "preparation" | "learning" | "english" | "budget";

/** Server-rendered art direction: both crops retain Next's density-aware srcset. */
export default function EditorialImage({ asset, alt, sizes, eager = false }: {
  asset: EditorialAsset;
  alt: string;
  sizes: string;
  eager?: boolean;
}) {
  const base = "/images/home/editorial-v5";
  const common = { alt, fill: true, quality: 88, sizes, loading: eager ? "eager" as const : "lazy" as const, fetchPriority: eager ? "high" as const : "auto" as const };
  const { props: desktop } = getImageProps({ ...common, src: `${base}/${asset}-desktop.webp` });
  const { props: mobile } = getImageProps({ ...common, src: `${base}/${asset}-mobile.webp` });
  return <picture>
    <source media="(max-width: 767px)" srcSet={mobile.srcSet} sizes={sizes} />
    {/* getImageProps supplies Next's optimized src/srcset, dimensions and loading attributes. */}
    <img {...desktop} alt={alt} />
  </picture>;
}

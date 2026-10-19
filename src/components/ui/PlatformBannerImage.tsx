import Image from "next/image";

/** Decorative editorial artwork: copy and controls remain accessible HTML. */
export default function PlatformBannerImage({
  className = "",
  priority = false,
}: { className?: string; priority?: boolean }) {
  return (
    <picture>
      <source media="(max-width: 639px)" srcSet="/images/platform/global-study-v1-mobile.webp" />
      <source media="(max-width: 1023px)" srcSet="/images/platform/global-study-v1-768.webp" />
      <Image
        src="/images/platform/global-study-v1.webp"
        alt=""
        fill
        sizes="(min-width: 1440px) 900px, 100vw"
        priority={priority}
        className={`object-cover object-center ${className}`}
      />
    </picture>
  );
}

import Image from "@/components/localization/LocalizedImage";

export default function CertificateSeal({
  className = "",
  priority = false,
  sizes = "(max-width: 680px) 130px, 250px",
}: {
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src="/brand/tgpi-academic-seal-2026.svg"
      unoptimized
      width={1200}
      height={1200}
      alt=""
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}

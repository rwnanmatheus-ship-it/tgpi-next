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
      src="/brand/tgpi-certificate-seal-2026.webp"
      width={1254}
      height={1254}
      alt=""
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}

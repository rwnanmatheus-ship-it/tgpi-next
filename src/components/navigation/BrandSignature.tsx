"use client";
import { useLocale , LocalizedText } from "@/components/localization/LocaleProvider";
import Link from "next/link";
import BrandCrest from "@/components/BrandCrest";

/** The approved crest and one stable, responsive institutional signature. */
export default function BrandSignature({ compact = false }: { compact?: boolean }) {
  const { t } = useLocale();
  return (
    <Link
      href="/"
      className={`tgpi-brand-signature ${compact ? "tgpi-brand-signature-compact" : ""}`}
      aria-label={t("TGPI — The Global Polymath Institute home")}
    >
      <span className="tgpi-brand-symbol">
        <BrandCrest width={44} height={54} sizes="44px" priority alt="" />
      </span>
      <span className="tgpi-brand-wordmark">
        <strong><LocalizedText text={"TGPI"} /></strong>
        <span><LocalizedText text={"The Global Polymath Institute"} /></span>
      </span>
    </Link>
  );
}

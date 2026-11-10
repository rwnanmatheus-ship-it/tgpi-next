"use client";

import Image from "next/image";
import { useLocale } from "@/components/localization/LocaleProvider";
import { homeCertificateSample } from "@/lib/home-content";
import { homeProductArt } from "@/lib/home-showcase";
import styles from "./home.module.css";

export default function HomeCertificatePreview() {
  const { t, locale } = useLocale();
  const src = homeCertificateSample(locale);
  return (
    <figure className={styles.certificatePreview}>
      <div className={styles.certificateStage}>
        <Image className={styles.certificateArt} src={homeProductArt("certificates")} alt="" fill sizes="(max-width: 850px) 92vw, (max-width: 1320px) 54vw, 690px" />
        <span className={styles.certificateEdition}>{t("TGPI / 2026.5")}</span>
        <a href={src} target="_blank" rel="noopener noreferrer" aria-label={t("View certificate sample in full size")} className={styles.certificateDocument}>
          <Image src={src} alt={t("Sample TGPI certificate with ornamental border, full learner name and verification area")} width={1684} height={1191} quality={88} sizes="(max-width: 850px) 84vw, (max-width: 1320px) 48vw, 610px" />
          <span>{t("View full size")} <span aria-hidden="true">↗</span></span>
        </a>
      </div>
      <figcaption>{t("Actual TGPI certificate design. Demonstration only; no credential has been issued.")}</figcaption>
    </figure>
  );
}

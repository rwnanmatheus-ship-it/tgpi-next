"use client";

import { useLocale } from "@/components/localization/LocaleProvider";
import { LocalizedElement } from "@/components/localization/LocalizedElement";
import styles from "./home.module.css";

export default function HomeCertificatePreview() {
  const { t, locale } = useLocale();
  const src = `/images/home/certificate-academic-2026-5-${locale === "pt-BR" ? "pt" : "en"}.webp`;
  return <figure className={styles.certificatePreview}>
    <div className={styles.certificateStage}><span className={styles.certificateEdition}>{t("TGPI / 2026.5")}</span><a href={src} target="_blank" rel="noopener noreferrer" aria-label={t("View certificate sample in full size")}><LocalizedElement as="img" src={src} alt="Sample TGPI certificate with ornamental border, full learner name and verification area" width={1684} height={1191} loading="lazy" decoding="async" /></a><span className={styles.certificateZoom}>{t("View full size")} <span aria-hidden="true">↗</span></span></div>
    <figcaption>{t("Actual TGPI certificate design. Demonstration only; no credential has been issued.")}</figcaption>
  </figure>;
}

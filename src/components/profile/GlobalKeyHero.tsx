import Image from "next/image";
import type { ReactNode } from "react";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import styles from "./GlobalKeyCenter.module.css";

export default function GlobalKeyHero({ children }: { children: ReactNode }) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroMedia}>
        <Image
          className={styles.heroArt}
          fill
          preload
          sizes="(max-width: 690px) 100vw, (max-width: 1450px) 72vw, 960px"
          src="/images/global-identity/integrity-observatory.webp"
          alt=""
        />
      </div>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}><LocalizedText text="TGPI Integrity Chain" /></p>
        <h1><LocalizedText text="TGPI Global ID" /></h1>
        {children}
      </div>
    </header>
  );
}

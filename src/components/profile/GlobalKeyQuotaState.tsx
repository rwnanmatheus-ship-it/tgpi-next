import Link from "next/link";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import GlobalKeyHero from "./GlobalKeyHero";
import styles from "./GlobalKeyCenter.module.css";

export default function GlobalKeyQuotaState({ keyId }: { keyId: string }) {
  return (
    <main className={styles.center}>
      <div className={styles.shell}>
        <GlobalKeyHero>
          <p><LocalizedText text="Identity storage is temporarily unavailable." /></p>
          <Link href="/profile" className={styles.primaryButton}>
            <LocalizedText text="Open workspace" /> ↗
          </Link>
        </GlobalKeyHero>
        <section id="identity" className={styles.identityCard} aria-labelledby="quota-identity-heading">
          <h2 id="quota-identity-heading" className={styles.eyebrow}><LocalizedText text="Member identity" /></h2>
          <p className={styles.identityCode}><code>{keyId}</code></p>
          <p role="status" className={styles.notice}><LocalizedText text="Verification temporarily unavailable" /></p>
          <Link href="/verify" className={styles.textLink}><LocalizedText text="Public verification" /> ↗</Link>
        </section>
      </div>
    </main>
  );
}

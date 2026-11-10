import Image from "next/image";
import styles from "./GlobalKeyCenter.module.css";

export default function IntegritySeal() {
  return (
    <span className={styles.seal} aria-hidden="true">
      <Image src="/images/global-identity/integrity-medallion.webp" alt="" width={720} height={720} sizes="(max-width: 600px) 72px, 120px" />
      <Image className={styles.sealCrest} src="/brand/tgpi-crest-metal-v3-256.png" alt="" width={48} height={58} />
    </span>
  );
}

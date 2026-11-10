import Image from "@/components/localization/LocalizedImage";
import styles from "./CountryFlag.module.css";

type CountryFlagProps = {
  iso2: string;
  width?: number;
  framed?: boolean;
};

/** Exact vector artwork with embedded photographic fabric lighting.
 * Decorative: the adjacent country or language name supplies the accessible label.
 */
export default function CountryFlag({ iso2, width = 36, framed = false }: CountryFlagProps) {
  const code = iso2.toLowerCase();
  if (!/^[a-z]{2}$/.test(code)) return null;

  return (
    <span
      className={`${styles.frame}${framed ? "" : ` ${styles.unframed}`}`}
      aria-hidden="true"
      data-flag-frame={framed ? code : undefined}
      style={{ width, height: width * 0.75 + (framed ? 1 : 0) }}
    >
      <Image
        className={styles.artwork}
        src={`/images/country-flags/${framed ? "" : "studio/"}${code}.svg`}
        alt=""
        width={width}
        height={width * 0.75}
        unoptimized
        draggable={false}
        data-country-flag={code}
      />
    </span>
  );
}

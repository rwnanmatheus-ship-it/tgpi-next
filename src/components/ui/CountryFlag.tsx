import Image from "@/components/localization/LocalizedImage";
import styles from "./CountryFlag.module.css";

type CountryFlagProps = {
  iso2: string;
  width?: number;
};

/** Resolution-independent artwork with a shared, lightweight studio treatment.
 * Decorative: the adjacent country or language name supplies the accessible label.
 */
export default function CountryFlag({ iso2, width = 36 }: CountryFlagProps) {
  const code = iso2.toLowerCase();
  if (!/^[a-z]{2}$/.test(code)) return null;

  return (
    <span
      className={styles.frame}
      aria-hidden="true"
      data-flag-frame={code}
      style={{ width, height: width * 0.75 + 1 }}
    >
      <Image
        className={styles.artwork}
        src={`/images/country-flags/${code}.svg`}
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

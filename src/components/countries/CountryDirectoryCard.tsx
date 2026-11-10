import Image from "next/image";
import Link from "next/link";
import SavedCountryButton from "@/components/activation/SavedCountryButton";
import { useLocale } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import CountryFlag from "@/components/ui/CountryFlag";
import { localizedCountryName, type SearchableCountry } from "@/lib/country-search";
import styles from "./CountryDirectory.module.css";

export type DirectoryCountry = SearchableCountry & {
  emoji: string;
  dossierCount: number;
  observations: number;
};

export default function CountryDirectoryCard({ country, indicatorTotal, selected, compact, onCompare }: {
  country: DirectoryCountry;
  indicatorTotal: number;
  selected: boolean;
  compact: boolean;
  onCompare: (slug: string) => void;
}) {
  const { t, locale } = useLocale();
  const name = localizedCountryName(country, locale);
  const href = `/countries/${country.slug}`;

  return (
    <article className={styles.card} data-selected={selected || undefined}>
      <Link href={href} prefetch={false} className={styles.cardImage} aria-hidden="true" tabIndex={-1}>
        <Image
          src={`/images/countries/identity/${country.slug}.webp`}
          alt=""
          fill
          sizes={compact
            ? "(max-width: 599px) 100px, (max-width: 767px) 200px, 132px"
            : "(max-width: 599px) 94vw, (max-width: 959px) 48vw, (max-width: 1239px) 32vw, 312px"}
          className={styles.photo}
        />
      </Link>
      <div className={styles.cardBody}>
        <div className={styles.identity}>
          <CountryFlag iso2={country.iso2} width={42} />
          <div>
            <p className={styles.location}>{t(country.region)} <span aria-hidden="true">·</span> <span translate="no">{country.iso3}</span></p>
            <h3><Link href={href} prefetch={false}>{name}</Link></h3>
          </div>
        </div>
        <div className={styles.evidence}>
          <span><NavigationIcon name="graph" width={15} height={15} />{country.observations}/{indicatorTotal} {t("National indicators")}</span>
          <span><NavigationIcon name="file" width={15} height={15} />{country.dossierCount > 0 ? `${t("Research summaries")} · ${country.dossierCount}` : t("Core country profile")}</span>
        </div>
        <div className={styles.cardActions}>
          <Link href={href} prefetch={false} className={styles.profileAction} aria-label={`${t("Explore evidence")} · ${name}`}>
            {t("Explore evidence")} <NavigationIcon name="arrow" width={16} height={16} />
          </Link>
          <button type="button" className={styles.compareAction} aria-pressed={selected} aria-label={`${t("Compare")} · ${name}`} title={t("Compare")} onClick={() => onCompare(country.slug)}>
            <NavigationIcon name={selected ? "check" : "compare"} width={18} height={18} />
          </button>
          <SavedCountryButton compact countryName={name} countrySlug={country.slug} />
        </div>
      </div>
    </article>
  );
}

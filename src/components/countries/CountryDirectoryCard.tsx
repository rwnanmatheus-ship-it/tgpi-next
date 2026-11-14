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
    <article className={styles.card} data-tgpi-surface="card" data-tgpi-interactive="true" data-selected={selected || undefined}>
      <div className={styles.cardImage}>
        <Image
          src={`/images/countries/identity/${country.slug}.webp`}
          alt=""
          fill
          sizes={compact
            ? "(max-width: 599px) 100px, (max-width: 767px) 200px, 132px"
            : "(max-width: 599px) 94vw, (max-width: 959px) 48vw, (max-width: 1239px) 32vw, 312px"}
          className={styles.photo}
        />
        <span className={styles.imageCode} translate="no" aria-hidden="true">{country.iso3}</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.identity}>
          <CountryFlag iso2={country.iso2} width={42} />
          <div>
            <p className={styles.location}>{t(country.region)}{compact && <> <span aria-hidden="true">·</span> <span translate="no">{country.iso3}</span></>}</p>
            <h3>{name}</h3>
          </div>
        </div>
        <ul className={styles.evidence}>
          <li><NavigationIcon name="graph" width={15} height={15} /><span>{t("National indicators")}</span><strong>{country.observations}/{indicatorTotal}</strong></li>
          <li><NavigationIcon name="file" width={15} height={15} /><span>{t(country.dossierCount > 0 ? "Research summaries" : "Core country profile")}</span>{country.dossierCount > 0 && <strong>{country.dossierCount}</strong>}</li>
        </ul>
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

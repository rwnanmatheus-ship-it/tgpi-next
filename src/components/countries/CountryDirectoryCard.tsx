import Image from "next/image";
import Link from "next/link";
import SavedCountryButton from "@/components/activation/SavedCountryButton";
import { useLocale } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import CountryFlag from "@/components/ui/CountryFlag";
import type { CountryPhoto } from "@/lib/countries/editorial-photography";
import { localizedCountryName, type SearchableCountry } from "@/lib/country-search";
import styles from "./CountryDirectory.module.css";

export type DirectoryCountry = SearchableCountry & {
  emoji: string;
  photo?: CountryPhoto;
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
  const { photo } = country;
  const href = `/countries/${country.slug}`;

  return (
    <article className={styles.card} data-tgpi-surface="card" data-tgpi-interactive="true" data-selected={selected || undefined}>
      <div className={styles.cardImage}>
        <Link className={styles.photoLink} href={href} prefetch={false} aria-label={`${t("Open country guide")} · ${name}`}>
          <Image
            src={photo?.src ?? `/images/countries/identity/${country.slug}.webp`}
            style={{ objectPosition: photo?.position }}
            alt={photo ? t(photo.alt) : ""}
            fill
            sizes={compact
              ? "(max-width: 599px) 100px, (max-width: 767px) 200px, 132px"
              : "(max-width: 599px) 94vw, (max-width: 899px) 46vw, (max-width: 1320px) 30vw, 330px"}
            className={styles.photo}
          />
        </Link>
        {photo ? <a className={styles.credit} href={photo.creditUrl} rel="external"
          aria-label={`${t("Photography")} · ${photo.photographer}`}>
          <span>{t(photo.location)}</span> · {photo.photographer}
        </a> : <span className={styles.imageCode} translate="no" aria-hidden="true">{country.iso3}</span>}
        <div className={styles.imageActions}>
          <button type="button" className={styles.compareAction} aria-pressed={selected} aria-label={`${t("Compare")} · ${name}`} title={t("Compare")} onClick={() => onCompare(country.slug)}>
            <NavigationIcon name={selected ? "check" : "compare"} width={18} height={18} />
          </button>
          <SavedCountryButton compact countryName={name} countrySlug={country.slug} />
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.identity}>
          <CountryFlag iso2={country.iso2} width={42} />
          <div>
            <p className={styles.location}>{t(country.region)}{compact && <> <span aria-hidden="true">·</span> <span translate="no">{country.iso3}</span></>}</p>
            <h3><Link href={href} prefetch={false}>{name}</Link></h3>
          </div>
        </div>
        <ul className={styles.evidence}>
          <li><NavigationIcon name="graph" width={15} height={15} /><span>{t("National indicators")}</span><strong>{country.observations}/{indicatorTotal}</strong></li>
          <li><NavigationIcon name="file" width={15} height={15} /><span>{t(country.dossierCount > 0 ? "Research summaries" : "Core country profile")}</span>{country.dossierCount > 0 && <strong>{country.dossierCount}</strong>}</li>
        </ul>
        <Link href={`${href}#country-learning`} prefetch={false} className={styles.learningLink}>
          <NavigationIcon name="book" width={16} height={16} />
          <span>{t("Languages & mobility")}</span>
        </Link>
        <div className={styles.cardActions}>
          <Link href={href} prefetch={false} className={styles.profileAction} aria-label={`${t("Open country guide")} · ${name}`}>
            {t("Open country guide")} <NavigationIcon name="arrow" width={16} height={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

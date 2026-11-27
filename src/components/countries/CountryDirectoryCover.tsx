"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import type { CountryPhoto } from "@/lib/countries/editorial-photography";
import { localizedCountryName, type SearchableCountry } from "@/lib/country-search";
import styles from "./CountryDirectoryCover.module.css";

type CoverScene = SearchableCountry & { photo: CountryPhoto };

const tools = [
  { href: "/compare", label: "Compare countries", icon: "compare" },
  { href: "/country-fit", label: "Country Fit", icon: "target" },
  { href: "/plan", label: "My Plan", icon: "file" },
  { href: "/intelligence", label: "Sources & methodology", icon: "book" },
] as const;

export default function CountryDirectoryCover({ count, covers }: { count: number; covers: CoverScene[] }) {
  const { t, locale } = useLocale();
  const [index, setIndex] = useState(0);
  const current = covers[index];
  const name = current ? localizedCountryName(current, locale) : "";
  return (
    <header className={styles.cover}>
      <div className={styles.intro}>
        <p className={styles.brand}><NavigationIcon name="globe" width={17} height={17} /> TGPI <span aria-hidden="true">/</span> {t("Country atlas")}</p>
        <h1>{t("Find your next destination.")}</h1>
        <p className={styles.dek}>{t("Compare places to live, study or work. Explore each destination’s language, costs and sources.")}</p>
        <nav className={styles.tools} aria-label={t("Destination tools")}>
          {tools.map(tool => <Link key={tool.href} href={tool.href}>
            <NavigationIcon name={tool.icon} width={16} height={16} />{t(tool.label)}
          </Link>)}
        </nav>
      </div>
      {current && <figure className={styles.scene}>
        <Image
          src={current.photo.src} alt={t(current.photo.alt)} fill quality={88}
          style={{ objectPosition: current.photo.position }}
          sizes="(min-width: 1440px) 790px, (min-width: 800px) 57vw, 100vw"
          preload={index === 0}
        />
        <div className={styles.count}><span />{t("{count} destinations", { count })}</div>
        <figcaption className={styles.caption}>
          <div aria-live="polite" aria-atomic="true">
            <Link key={current.slug} className={styles.destination} href={`/countries/${current.slug}`}
              aria-label={`${t("Open country guide")} · ${name}`}>
              {name} <NavigationIcon name="arrow" width={18} height={18} />
            </Link>
            <div className={styles.byline}>
              <span>{t(current.photo.location)}</span>
              <a href={current.photo.creditUrl} rel="external" aria-label={`${t("Photography")} · ${current.photo.photographer}`}>{current.photo.photographer}</a>
            </div>
          </div>
          {covers.length > 1 && <div className={styles.paging} role="group" aria-label={t("Featured country profiles")}>
            <button type="button" aria-label={t("Previous")} onClick={() => setIndex(value => (value + covers.length - 1) % covers.length)}>
              <NavigationIcon name="chevron" width={17} height={17} />
            </button>
            <button type="button" aria-label={t("Next")} onClick={() => setIndex(value => (value + 1) % covers.length)}>
              <NavigationIcon name="chevron" width={17} height={17} />
            </button>
          </div>}
        </figcaption>
      </figure>}
    </header>
  );
}

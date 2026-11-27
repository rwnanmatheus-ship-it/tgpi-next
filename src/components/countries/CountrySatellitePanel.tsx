"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import styles from "./CountryDetail.module.css";

const SatelliteAtlas = dynamic(() => import("./SatelliteAtlas"), {
  ssr: false,
  loading: () => <p role="status"><LocalizedText text="Preparing satellite explorer…" /></p>,
});

type Props = {
  country: string;
  name: string;
  point?: { lat: number; lng: number };
};

export default function CountrySatellitePanel({ country, name, point }: Props) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const countries = useMemo(() => [{ slug: country, name }], [country, name]);

  return <section id="satellite" className={styles.satelliteSection}>
    <div className={styles.satelliteHeader}>
      <div className={styles.satelliteIntro}>
        <p><NavigationIcon name="globe" width={16} height={16} /> {t("Geographic context")}</p>
        <h2>{t(name)}{t(", from orbit.")}</h2>
        <div>{t("Explore dated NASA satellite observations and terrain.")}</div>
        {point && <dl><dt>{t("Reference coordinates")}</dt><dd translate="no">
          {Math.abs(point.lat).toFixed(2)}° {point.lat >= 0 ? "N" : "S"} · {Math.abs(point.lng).toFixed(2)}° {point.lng >= 0 ? "E" : "W"}
        </dd></dl>}
        <button type="button" aria-expanded={open} aria-controls="country-satellite-explorer" onClick={() => setOpen(value => !value)}>
          {t(open ? "Close satellite view" : "Open satellite view")} <NavigationIcon name={open ? "close" : "arrow"} width={16} height={16} />
        </button>
      </div>
      <figure className={styles.earthFigure}>
        <div className={styles.earthImage}>
          <Image src="/maps/earth-blue-marble-4k.webp" alt="" fill sizes="(max-width: 760px) 100vw, 48vw" />
          {point && <span aria-hidden="true" className={styles.mapPoint}
            style={{ left: `${(point.lng + 180) / 360 * 100}%`, top: `${(90 - point.lat) / 180 * 100}%` }} />}
        </div>
        <figcaption>{t("Physical imagery is a historical composite, not live satellite coverage.")}{" "}
          <a href="https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/" target="_blank" rel="noreferrer">{t("NASA Blue Marble")} ↗</a>
        </figcaption>
      </figure>
    </div>
    <div id="country-satellite-explorer" hidden={!open}>{open && <SatelliteAtlas countries={countries} selectedSlug={country} onCountryPreview={() => {}} />}</div>
  </section>;
}

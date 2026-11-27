"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SavedCountryButton from "@/components/activation/SavedCountryButton";
import { useLocale } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import CountryFlag from "@/components/ui/CountryFlag";
import type { CountryPhoto } from "@/lib/countries/editorial-photography";
import styles from "./CountryDetail.module.css";

type Props = {
  slug: string;
  name: string;
  iso2: string;
  region: string;
  photos: readonly CountryPhoto[];
};

export default function CountryProfileMasthead({ slug, name, iso2, region, photos }: Props) {
  const { t } = useLocale();
  const [index, setIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const photo = photos[visibleIndex];
  const imageIndices = index === visibleIndex ? [visibleIndex] : [visibleIndex, index];
  const canBrowse = photos.length > 1;

  function advance(direction: number) {
    setIndex(current => (current + direction + photos.length) % photos.length);
  }

  return (
    <header className={styles.masthead} id="overview" tabIndex={-1}>
      <div
        className={styles.cover}
        onTouchStart={event => {
          const finger = event.touches[0];
          touchStart.current = canBrowse && event.touches.length === 1 ? { x: finger.clientX, y: finger.clientY } : null;
        }}
        onTouchCancel={() => { touchStart.current = null; }}
        onTouchEnd={event => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start) return;
          const dx = event.changedTouches[0].clientX - start.x;
          const dy = event.changedTouches[0].clientY - start.y;
          if (Math.abs(dx) >= 55 && Math.abs(dx) > Math.abs(dy) * 1.5) advance(dx < 0 ? 1 : -1);
        }}
        onKeyDown={event => {
          if (!canBrowse || event.altKey || event.ctrlKey || event.metaKey) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            advance(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {imageIndices.map(imageIndex => {
          const scene = photos[imageIndex];
          const visible = visibleIndex === imageIndex;
          return <Image
            key={scene?.src ?? slug}
            src={scene?.src ?? `/images/countries/identity/${slug}.webp`}
            alt={visible && scene ? t(scene.alt) : ""}
            aria-hidden={!visible || undefined}
            fill
            sizes="(max-width: 1023px) 100vw, (max-width: 1440px) 88vw, 1280px"
            quality={88}
            loading="eager"
            fetchPriority={imageIndex === 0 ? "high" : "auto"}
            className={styles.coverImage}
            style={{ objectPosition: scene?.position ?? "55% 46%", opacity: visible ? 1 : 0 }}
            onLoad={() => { if (imageIndex === index) setVisibleIndex(imageIndex); }}
            onError={() => { if (!visible) setIndex(visibleIndex); }}
          />;
        })}
        <div className={styles.coverTop}>
          <Link href="/countries" className={styles.backLink}>
            <NavigationIcon name="chevron" width={14} height={14} />
            {t("Countries")}
          </Link>
          <SavedCountryButton compact countryName={name} countrySlug={slug} />
        </div>
        <div className={styles.coverBottom}>
          <div className={styles.coverTitle}>
            <p><CountryFlag iso2={iso2} width={28} /><span>{t(region)} <i aria-hidden="true">/</i> {t("Country guide")}</span></p>
            <h1>{t(name)}</h1>
          </div>
          {canBrowse && (
            <div className={styles.galleryControls} role="group" aria-label={t("Destination photographs")}>
              <button type="button" onClick={() => advance(-1)} aria-label={t("Previous photograph")}>
                <NavigationIcon name="chevron" width={16} height={16} />
              </button>
              <span aria-hidden="true">{visibleIndex + 1} <i>/</i> {photos.length}</span>
              <button type="button" onClick={() => advance(1)} aria-label={t("Next photograph")}>
                <NavigationIcon name="chevron" width={16} height={16} />
              </button>
            </div>
          )}
        </div>
      </div>
      {canBrowse && <div className={styles.photoRail} role="group" aria-label={t("Destination photographs")}>
        {photos.map((scene, position) => <button
          key={scene.src} type="button" aria-pressed={index === position}
          onClick={() => setIndex(position)}
        >
          <span className={styles.photoThumb}>
            <Image src={scene.src} alt="" fill sizes="64px" style={{ objectFit: "cover", objectPosition: scene.position }} />
          </span>
          <span>{t(scene.location)}</span>
        </button>)}
      </div>}
      {photo && (
        <div className={styles.creditLine}>
          <span aria-live="polite" aria-atomic="true">
            <span className="sr-only">{t("Photo {current} of {total}", { current: visibleIndex + 1, total: photos.length })}. </span>
            {photo.location}
          </span>
          <a href={photo.creditUrl} target="_blank" rel="noreferrer">{photo.photographer} ↗</a>
        </div>
      )}
    </header>
  );
}

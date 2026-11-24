import type { Metadata } from "next";
import { getLocale } from "@/lib/localization/server";
import { guideCopy } from "./copy";
import Link from "next/link";
import GuideSignup from "./GuideSignup";
import { exampleComparison, guideChannel, worksheetPath } from "./campaign";
import styles from "./guia.module.css";

const canonical = "https://www.theglobalpolymath.com/guia-paises";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { title, description } = guideCopy[locale];
  return {
    title, description, alternates: { canonical },
    openGraph: { title, description, url: canonical, locale: locale.replace("-", "_"), images: ["/images/home/editorial-v4/decision-desktop.webp"] },
  };
}

type PageProps = { searchParams: Promise<{ utm_source?: string | string[] }> };

export default async function CountryGuidePage({ searchParams }: PageProps) {
  const [params, locale] = await Promise.all([searchParams, getLocale()]);
  const copy = guideCopy[locale];
  return (
    <main className={styles.main} lang={locale}>
      <div className={styles.layout}>
        <article className={styles.cover}>
          <div className={styles.copy}>
            <p className={styles.kicker}>{copy.kicker}</p>
            <h1>{copy.title}</h1>
            <p>{copy.pitch}</p>
            <a className={styles.download} href={worksheetPath} download data-funnel-event="country_guide_download">{copy.download} <span aria-hidden="true">↓</span></a>
            <span className={styles.note}>{copy.format}</span>
          </div>
        </article>
        <GuideSignup locale={locale} source={guideChannel(params.utm_source)} />
      </div>
      <aside className={styles.example}>
        <h2>{copy.example}</h2>
        <p>{copy.explanation}</p>
        <Link href={exampleComparison} data-funnel-event="country_guide_compare_opened">{copy.compare} →</Link>
      </aside>
    </main>
  );
}

import Link from "next/link";
import { studyLocales, studyOrigin, studyPath, studyPhoto } from "@/data/study-guides";
import { structuredDataJson } from "@/lib/seo/course-directory";
import { type Edition, labels, languageNames, languageTags } from "./edition";
import styles from "./study.module.css";

export function StudyNavigation({ lang, destination, country }: {
  lang: Edition; destination?: string; country?: string;
}) {
  const text = labels[lang];
  return <div className={styles.topline}>
    <nav aria-label={text.breadcrumb} className={styles.crumbs}>
      <Link href="/guides">{text.guides}</Link><span aria-hidden="true">/</span>
      {destination ? <><Link href={studyPath(lang)}>{text.hub}</Link><span aria-hidden="true">/</span><span aria-current="page">{country}</span></> : <span aria-current="page">{text.hub}</span>}
    </nav>
    <nav aria-label={text.languages} className={styles.languages}>
      {studyLocales.map(locale => <Link key={locale} href={studyPath(locale, destination)} lang={languageTags[locale]}
        hrefLang={languageTags[locale]} aria-current={locale === lang ? "page" : undefined}>{languageNames[locale]}</Link>)}
    </nav>
  </div>;
}

export function PhotoCredit({ lang, photo }: { lang: Edition; photo: ReturnType<typeof studyPhoto> }) {
  const text = labels[lang];
  return <span className={styles.credit}>{text.photo} · <a href={photo.sourceUrl}>{photo.author}</a>{" · "}
    <a href={photo.licenseUrl} aria-label={text.license + " · " + photo.license}>{photo.license}</a></span>;
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson(data) }} />;
}

export function breadcrumbSchema(lang: Edition, article?: { country: string; slug: string }) {
  const trail = [
    { name: labels[lang].guides, href: "/guides" },
    { name: labels[lang].hub, href: studyPath(lang) },
    ...(article ? [{ name: article.country, href: studyPath(lang, article.slug) }] : []),
  ];
  return { "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: trail.map(({ name, href }, index) => ({
      "@type": "ListItem", position: index + 1, name, item: studyOrigin + href,
    })),
  };
}

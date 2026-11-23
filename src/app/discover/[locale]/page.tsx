import type { Metadata } from "next";
import { translate } from "@/lib/localization/messages";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { discoveryContent, discoveryLocales, discoveryOrigin, discoveryAlternates, isDiscoveryLocale } from "@/lib/discovery";
import DiscoveryShare from "@/components/discovery/DiscoveryShare";
import styles from "./discovery.module.css";
type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return discoveryLocales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isDiscoveryLocale(locale)) notFound();
  const c = discoveryContent[locale];
  const url = `${discoveryOrigin}/discover/${locale}`;
  const images = [{ url: `${discoveryOrigin}/banners/tgpi-${locale}.jpg`, width: 1600, height: 900, alt: c.title }];
  return { title: `${c.title} | TGPI`, description: c.description,
    alternates: { canonical: url, languages: discoveryAlternates, types: { "application/rss+xml": `${discoveryOrigin}/feed.xml` } },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    openGraph: { type: "website", siteName: "TGPI", url, title: c.title, description: c.description, locale: locale === "en" ? "en_US" : locale === "pt-BR" ? "pt_BR" : `${locale}_${locale.toUpperCase()}`, images },
    twitter: { card: "summary_large_image", title: c.title, description: c.description, images },
  };
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isDiscoveryLocale(locale)) notFound();
  const c = discoveryContent[locale];
  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: c.title, description: c.description, inLanguage: locale, url: `${discoveryOrigin}/discover/${locale}`, about: { "@type": "Organization", name: "The Global Polymath Institute", url: discoveryOrigin }, isPartOf: { "@type": "WebSite", name: "TGPI", url: discoveryOrigin } };
  return <main lang={locale} className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <nav className={styles.languages} aria-label={translate(locale, "Languages")}>{discoveryLocales.map(l => <Link key={l} href={`/discover/${l}`} hrefLang={l} lang={l} aria-current={l === locale ? "page" : undefined}>{discoveryContent[l].name}</Link>)}</nav>
    <section className={styles.hero}>
      <Image src="/images/discovery/global-education.webp" alt="" fill priority sizes="100vw" />
      <div className={styles.heroContent}><p className={styles.eyebrow}>{translate(locale, "TGPI · THE GLOBAL POLYMATH INSTITUTE")}</p><h1>{c.title}</h1><p>{c.description}</p><div className={styles.actions}><Link href="/courses">{c.courses}</Link><Link href="/countries">{c.compare}</Link></div></div>
    </section>
    <section className={styles.section}><p className={styles.eyebrow}>{translate(locale, "THE GLOBAL POLYMATH INSTITUTE")}</p><h2>{c.heading}</h2><p>{c.tagline}</p><div className={styles.grid}>{[
      {title:c.learnTitle,text:c.learnText,href:"/courses",label:c.courses},
      {title:c.countryTitle,text:c.countryText,href:"/compare",label:c.compare},
      {title:c.guideTitle,text:c.guideText,href:"/guides",label:c.guides}
    ].map(item => <article key={item.href}><h3>{item.title}</h3><p>{item.text}</p><Link href={item.href}>{item.label}</Link></article>)}</div><p>{c.certificateNote}</p><div className={styles.actions}><Link href="/sign-up">{c.start}</Link><Link href="/pricing">TGPI Premium</Link></div></section>
    <section className={styles.section}><h2>{c.share}</h2><DiscoveryShare locale={locale} /><p className={styles.note}>{c.artNote}</p></section>
  </main>;
}

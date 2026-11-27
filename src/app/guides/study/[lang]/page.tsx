import type { Metadata } from "next";
import { enemGuidePath } from "@/app/guia-paises/campaign";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isStudyLocale, studyGuides, studyLocales, studyOrigin, studyPath, studyPhoto } from "@/data/study-guides";
import { directoryCover, editionMetadata, labels, languageTags } from "../edition";
import { breadcrumbSchema, JsonLd, PhotoCredit, StudyNavigation } from "../StudyNavigation";
import styles from "../study.module.css";

type Props = { params: Promise<{ lang: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return studyLocales.map(lang => ({ lang })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isStudyLocale(lang)) notFound();
  const text = labels[lang];
  return editionMetadata(lang, text.title, text.description, directoryCover(lang));
}

export default async function StudyDirectory({ params }: Props) {
  const { lang } = await params;
  if (!isStudyLocale(lang)) notFound();
  const text = labels[lang];
  const tag = languageTags[lang];
  const cover = directoryCover(lang);
  const articles = [...studyGuides].sort((left, right) =>
    left.locales[lang].country.localeCompare(right.locales[lang].country, tag));
  const schema = {
    "@context": "https://schema.org", "@type": "CollectionPage", name: text.title,
    url: studyOrigin + studyPath(lang), description: text.description, inLanguage: tag,
    image: studyOrigin + cover.src, relatedLink: studyOrigin + enemGuidePath,
    mainEntity: { "@type": "ItemList", numberOfItems: articles.length,
      itemListElement: articles.map((guide, index) => ({
        "@type": "ListItem", position: index + 1, name: guide.locales[lang].title, url: studyOrigin + studyPath(lang, guide.slug),
      })),
    },
  };
  return <main className={styles.page} lang={tag}>
    <JsonLd data={schema} /><JsonLd data={breadcrumbSchema(lang)} />
    <StudyNavigation lang={lang} />
    <header className={styles.indexHero}>
      <div className={styles.heroCopy}><h1>{text.title}</h1><p>{text.description}</p>
        <a className={styles.directoryJump} href="#destinations">{text.directories} <span aria-hidden="true">↓</span></a>
      </div>
      <figure className={styles.indexImage}>
        <Image src={cover.src} alt="" width={cover.width} height={cover.height} preload
          sizes="(max-width: 760px) 100vw, (max-width: 1240px) 48vw, 560px" />
        <figcaption>{text.art}</figcaption>
      </figure>
    </header>
    <section className={styles.directory} aria-labelledby="destinations">
      <h2 id="destinations">{text.directories}</h2>
      <div className={styles.cards}>
        {articles.map(guide => {
          const copy = guide.locales[lang];
          const photo = studyPhoto(guide.countrySlug);
          const href = studyPath(lang, guide.slug);
          return <article key={guide.slug} className={styles.card}>
            <figure>
              <Link href={href} prefetch={false} aria-label={copy.title} tabIndex={-1}>
                <Image src={photo.src} alt="" width={photo.width} height={photo.height}
                  sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 380px" />
              </Link>
              <figcaption><PhotoCredit photo={photo} lang={lang} /></figcaption>
            </figure>
            <div className={styles.cardCopy}><p className={styles.country}>{copy.country}</p>
              <h3><Link href={href} prefetch={false}>{copy.title}</Link></h3><p>{copy.description}</p>
            </div>
          </article>;
        })}
      </div>
    </section>
    <section className={styles.companion}><h2>{text.enem}</h2>
      <Link href={enemGuidePath} hrefLang="pt-BR">{text.enemLink} →</Link>
    </section>
  </main>;
}

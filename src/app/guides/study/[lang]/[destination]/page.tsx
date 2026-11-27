import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isStudyLocale, studyGuides, studyLocales, studyOrigin, studyPath, studyPhoto, studyReviewed } from "@/data/study-guides";
import { editionMetadata, labels, languageTags, localizedPhotoCaption } from "../../edition";
import { breadcrumbSchema, JsonLd, PhotoCredit, StudyNavigation } from "../../StudyNavigation";
import styles from "../../study.module.css";

type Props = { params: Promise<{ lang: string; destination: string }> };

const related: Record<string, readonly string[]> = {
  "united-states": ["canada", "united-kingdom"], canada: ["united-states", "france"],
  france: ["germany", "canada"], germany: ["france", "japan"],
  japan: ["south-korea", "australia"], "south-korea": ["japan", "united-states"],
  australia: ["new-zealand", "canada"], "south-africa": ["australia", "united-kingdom"],
  brazil: ["argentina", "mexico"], argentina: ["brazil", "mexico"],
  mexico: ["argentina", "united-states"], "new-zealand": ["australia", "canada"],
  india: ["united-kingdom", "japan"], "united-kingdom": ["india", "south-africa"],
};

const illustrationCredit = {
  en: "Academic life · Editorial illustration generated with AI. The scene is fictional.",
  pt: "Vida acadêmica · Ilustração editorial gerada com IA. A cena é fictícia.",
  es: "Vida universitaria · Ilustración editorial generada con IA. La escena es ficticia.",
};

async function getArticle(params: Props["params"]) {
  const { lang, destination } = await params;
  if (!isStudyLocale(lang)) notFound();
  const guide = studyGuides.find(article => article.slug === destination);
  if (!guide) notFound();
  return { lang, guide, copy: guide.locales[lang], photo: studyPhoto(guide.countrySlug) };
}

export const dynamicParams = false;
export function generateStaticParams() {
  return studyLocales.flatMap(lang => studyGuides.map(guide => ({ lang, destination: guide.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, guide, copy, photo } = await getArticle(params);
  return editionMetadata(lang, copy.title, copy.description, { ...photo, caption: localizedPhotoCaption(lang, photo.caption).text }, guide.slug);
}

export default async function StudyArticle({ params }: Props) {
  const { lang, guide, copy, photo } = await getArticle(params);
  const text = labels[lang];
  const tag = languageTags[lang];
  const url = studyOrigin + studyPath(lang, guide.slug);
  const caption = localizedPhotoCaption(lang, photo.caption);
  const artwork = "/images/study-guides/" + guide.slug + ".webp";
  const suggested = studyGuides.filter(other => related[guide.slug]?.includes(other.slug));
  const reviewDate = new Intl.DateTimeFormat(tag, { dateStyle: "long", timeZone: "UTC" }).format(new Date(studyReviewed));
  const schema = {
    "@context": "https://schema.org", "@type": "Article", mainEntityOfPage: url, url,
    headline: copy.title, description: copy.description, inLanguage: tag,
    datePublished: studyReviewed, dateModified: studyReviewed,
    author: { "@type": "Organization", name: text.by, url: studyOrigin + "/about" },
    image: { "@type": "ImageObject", url: studyOrigin + photo.src, width: photo.width, height: photo.height,
      caption: caption.text, creditText: photo.author, license: photo.licenseUrl, acquireLicensePage: photo.sourceUrl },
    citation: guide.sources.map(source => source.url),
    articleSection: copy.sections.map(section => section.heading),
    isPartOf: { "@type": "CollectionPage", name: text.title, url: studyOrigin + studyPath(lang) },
  };
  return <main className={styles.page} lang={tag}>
    <JsonLd data={schema} /><JsonLd data={breadcrumbSchema(lang, { country: copy.country, slug: guide.slug })} />
    <StudyNavigation lang={lang} destination={guide.slug} country={copy.country} />
    <article>
      <header className={styles.articleHeader}><p className={styles.country}>{copy.country}</p>
        <h1>{copy.title}</h1><p className={styles.dek}>{copy.intro}</p>
        <p className={styles.byline}><Link href="/about">{text.by}</Link><span aria-hidden="true"> · </span>
          {text.verified} <time dateTime={studyReviewed}>{reviewDate}</time></p>
      </header>
      <figure className={styles.heroPhoto}>
        <Image src={photo.src} alt={caption.text} lang={caption.tag} width={photo.width} height={photo.height} preload
          sizes="(max-width: 1200px) 100vw, 1160px" />
        <figcaption><span lang={caption.tag}>{caption.text}</span><PhotoCredit lang={lang} photo={photo} /></figcaption>
      </figure>
      <div className={styles.reader}>
        <aside className={styles.side}><nav aria-label={text.contents} className={styles.contents}>
          <h2>{text.contents}</h2><ol>{copy.sections.map((section, index) =>
            <li key={section.heading}><a href={"#topic-" + (index + 1)}>{section.heading}</a></li>)}</ol>
          <a className={styles.faqShortcut} href="#faq">{text.faq}</a>
        </nav></aside>
        <div className={styles.prose}>
          {copy.sections.map((section, index) => <Fragment key={section.heading}>
            <section id={"topic-" + (index + 1)} className={styles.topic}><h2>{section.heading}</h2>
              <p>{section.body}</p>
              {section.steps.length > 0 && <ul className={styles.steps}>{section.steps.map(step => <li key={step}>{step}</li>)}</ul>}
              <div className={styles.sources}><h3>{text.sources}</h3><ul>
                {section.sources.map(sourceIndex => {
                  const source = guide.sources[sourceIndex];
                  return <li key={source.url}><a href={source.url}>{source.label}</a></li>;
                })}
              </ul></div>
            </section>
            {index === 1 && <figure className={styles.studyScene}><Image src={artwork} alt={copy.alt}
              width={1536} height={1024} sizes="(max-width: 780px) 100vw, 720px" />
              <figcaption>{illustrationCredit[lang]}</figcaption></figure>}
          </Fragment>)}
          <section className={styles.faq} id="faq"><h2>{text.faq}</h2>
            {copy.faq.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </section>
          <section className={styles.actions}><h2>{text.research}</h2><div>
            <Link href={"/compare?country=" + guide.countrySlug + "&goal=study"} data-funnel-event="editorial_compare_opened">{text.compare} →</Link>
            <Link href={"/countries/" + guide.countrySlug}>{text.profile} →</Link></div>
          </section>
          <section className={styles.related}><h2>{text.more}</h2><ul>{suggested.map(other =>
            <li key={other.slug}><Link href={studyPath(lang, other.slug)}>{other.locales[lang].title}</Link></li>
          )}</ul><Link className={styles.back} href={studyPath(lang)}>{text.all} →</Link></section>
        </div>
      </div>
    </article>
  </main>;
}

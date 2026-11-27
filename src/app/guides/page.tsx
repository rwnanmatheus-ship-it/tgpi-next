import { localizeMetadata } from "@/lib/localization/metadata.server";

import { LocalizedElement } from "@/components/localization/LocalizedElement";

import { LocalizedText } from "@/components/localization/LocaleProvider";
import { getLocale } from "@/lib/localization/server";
import { enemGuidePath } from "../guia-paises/campaign";
import { guideCopy } from "../guia-paises/copy";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { studyDirectoryLabels, studyLocales, studyPath, studyReaderLocale } from "@/data/study-guides";
import { publicGuides } from "@/lib/public-guides";
import "./guides.css";
const sourceMetadata: Metadata = {
  title: "Moving Abroad & Country Research Guides | TGPI",
  description: "Free practical guides to compare countries, investigate moving-abroad documents and turn international research into clear next steps.",
  alternates: { canonical: "https://www.theglobalpolymath.com/guides" },
};
export default async function GuidesPage() {
  const locale = await getLocale();
  const lang = studyReaderLocale(locale);
  const campaign = guideCopy[locale];
  const collectionDescription = {
    en: "Explore admission routes, language requirements and costs by destination. Each guide links to the responsible university or public authority.",
    es: "Consulta las vías de ingreso, los idiomas y los costes por destino. Cada guía enlaza con la universidad o el organismo público responsable.",
    pt: "Consulte as formas de ingresso, os idiomas e os custos por destino. Cada guia leva à universidade ou ao órgão público responsável.",
  };
  return <main className="guides-page"><LocalizedElement as="nav" aria-label="Breadcrumb"><Link href="/resources"><LocalizedText text={"Resources"} /></Link>{" "}<LocalizedText text={"/ Guides"} /></LocalizedElement><p className="guides-kicker"><LocalizedText text={"TGPI / Public research guides"} /></p><h1><LocalizedText text={"Better questions. Clearer next steps."} /></h1><p><LocalizedText text={"Free guides for researching life abroad. Use practical checklists, inspect original sources and connect your research to the tools that help you organize it. No account is needed to read these guides."} /></p>
    <section className="guides-collection" lang={lang === "pt" ? "pt-BR" : lang}>
      <Image src="/images/study-guides/world-study.webp" alt="" width={1536} height={1024} sizes="(max-width: 700px) 95vw, 410px"/>
      <div><h2><Link href={studyPath(lang)}>{studyDirectoryLabels[lang]}</Link></h2>
      <p>{collectionDescription[lang]}</p>
      <nav>{studyLocales.map(code => <Link key={code} href={studyPath(code)} lang={code === "pt" ? "pt-BR" : code} hrefLang={code === "pt" ? "pt-BR" : code}>{({en:"English",pt:"Português",es:"Español"})[code]}</Link>)}</nav></div>
    </section>
    <div className="guides-grid"><article className="guides-card"><h2><Link href="/guia-paises?utm_source=guias">{campaign.title}</Link></h2><p>{campaign.description}</p></article>
    <article className="guides-card">
      <h2><Link href={enemGuidePath} hrefLang="pt-BR">{campaign.enemGuide}</Link></h2>
      <p>{campaign.enemGuideDescription}</p>
    </article>
    {publicGuides.map(guide => <article className="guides-card" key={guide.slug}><h2><Link href={`/guides/${guide.slug}`}><LocalizedText text={guide.title} /></Link></h2><p><LocalizedText text={guide.description} /></p><p className="guides-meta"><LocalizedText text={"Reviewed"} />{" "}{guide.reviewedAt}{" "}<LocalizedText text={"· Checklist and worksheet"} /></p></article>)}</div><p><LocalizedText text={"These guides provide general research methods, not personalized immigration, legal, tax or financial advice. Requirements and data can change. Always check the responsible official authority."} /></p><Link href="/countries"><LocalizedText text={"Explore country profiles →"} /></Link></main>;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }

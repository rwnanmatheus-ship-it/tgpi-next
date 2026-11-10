
import { LocalizedElement } from "@/components/localization/LocalizedElement";

import { LocalizedText } from "@/components/localization/LocaleProvider";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publicGuides } from "@/lib/public-guides";
import "../guides.css";
const origin = "https://www.theglobalpolymath.com";
export function generateStaticParams() { return publicGuides.map(guide => ({ slug: guide.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = publicGuides.find(item => item.slug === slug);
  if (!guide) return {};
  return { title: `${guide.title} | TGPI`, description: guide.description, alternates: { canonical: `${origin}/guides/${guide.slug}` }, openGraph: { title: guide.title, description: guide.description, url: `${origin}/guides/${guide.slug}`, type: "article" } };
}
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = publicGuides.find(item => item.slug === slug);
  if (!guide) notFound();
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, dateModified: guide.reviewedAt, author: { "@type": "Organization", name: "The Global Polymath Institute", url: origin }, mainEntityOfPage: `${origin}/guides/${guide.slug}` };
  return <main className="guides-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><LocalizedElement as="nav" aria-label="Breadcrumb"><Link href="/resources"><LocalizedText text={"Resources"} /></Link> / <Link href="/guides"><LocalizedText text={"Guides"} /></Link></LocalizedElement><article><p className="guides-kicker"><LocalizedText text={"TGPI / Research methods"} /></p><h1><LocalizedText text={guide.title} /></h1><p className="guides-meta"><LocalizedText text={"By The Global Polymath Institute · Reviewed"} />{" "}<time dateTime={guide.reviewedAt}>{guide.reviewedAt}</time></p><p><LocalizedText text={guide.intro} /></p><LocalizedElement as="nav" aria-label="On this page"><strong><LocalizedText text={"In this guide"} /></strong><ol>{guide.sections.map((section, i) => <li key={section.title}><a href={`#step-${i + 1}`}><LocalizedText text={section.title.slice(3)} /></a></li>)}</ol></LocalizedElement>{guide.sections.map((section, i) => <section className="guides-section" id={`step-${i + 1}`} key={section.title}><h2><LocalizedText text={section.title} /></h2><p><LocalizedText text={section.text} /></p><h3><LocalizedText text={"Record in your checklist"} /></h3><ul>{section.checklist.map(item => <li key={item}><LocalizedText text={item} /></li>)}</ul></section>)}<section className="guides-section"><h2><LocalizedText text={"Your research worksheet"} /></h2><p><LocalizedText text={"Copy this structure into your own notes, or use your browser’s print command to save the guide. Do not include passport numbers, financial account details or other sensitive identifiers."} /></p><div className="guides-table"><table><caption><LocalizedText text={"Repeat one row for each question you need to resolve."} /></caption><thead><tr><th scope="col"><LocalizedText text={"Question"} /></th><th scope="col"><LocalizedText text={"Official source and date checked"} /></th><th scope="col"><LocalizedText text={"Next action and review date"} /></th></tr></thead><tbody><tr><td><LocalizedText text={"What must I verify?"} /></td><td><LocalizedText text={"Where can I confirm it?"} /></td><td><LocalizedText text={"What will I do next?"} /></td></tr></tbody></table></div></section><section><h2><LocalizedText text={"Source starting points"} /></h2><p><LocalizedText text={"Use these original resources to begin verification. They do not replace the destination authority’s instructions for your case."} /></p><ul>{guide.sources.map(source => <li key={source.href}><a href={source.href}><LocalizedText text={source.label} /></a></li>)}</ul></section><Link className="guides-next" href={guide.nextHref}><LocalizedText text={guide.nextLabel} /> →</Link><section><h2><LocalizedText text={"Continue your research"} /></h2><ul>{publicGuides.filter(item => item.slug !== slug).map(item => <li key={item.slug}><Link href={`/guides/${item.slug}`}><LocalizedText text={item.title} /></Link></li>)}<li><Link href="/countries"><LocalizedText text={"Explore source-linked country profiles"} /></Link></li><li><Link href="/courses"><LocalizedText text={"Explore practical learning"} /></Link></li></ul></section></article></main>;
}

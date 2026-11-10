
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
  return <main className="guides-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><nav aria-label="Breadcrumb"><Link href="/resources"><LocalizedText text={"Resources"} /></Link> / <Link href="/guides">Guides</Link></nav><article><p className="guides-kicker">TGPI / Research methods</p><h1>{guide.title}</h1><p className="guides-meta">By The Global Polymath Institute · Reviewed <time dateTime={guide.reviewedAt}>{guide.reviewedAt}</time></p><p>{guide.intro}</p><nav aria-label="On this page"><strong>In this guide</strong><ol>{guide.sections.map((section, i) => <li key={section.title}><a href={`#step-${i + 1}`}>{section.title.slice(3)}</a></li>)}</ol></nav>{guide.sections.map((section, i) => <section className="guides-section" id={`step-${i + 1}`} key={section.title}><h2>{section.title}</h2><p>{section.text}</p><h3>Record in your checklist</h3><ul>{section.checklist.map(item => <li key={item}>{item}</li>)}</ul></section>)}<section className="guides-section"><h2><LocalizedText text={"Your research worksheet"} /></h2><p>Copy this structure into your own notes, or use your browser’s print command to save the guide. Do not include passport numbers, financial account details or other sensitive identifiers.</p><div className="guides-table"><table><caption>Repeat one row for each question you need to resolve.</caption><thead><tr><th scope="col"><LocalizedText text={"Question"} /></th><th scope="col">Official source and date checked</th><th scope="col">Next action and review date</th></tr></thead><tbody><tr><td>What must I verify?</td><td>Where can I confirm it?</td><td>What will I do next?</td></tr></tbody></table></div></section><section><h2>Source starting points</h2><p>Use these original resources to begin verification. They do not replace the destination authority’s instructions for your case.</p><ul>{guide.sources.map(source => <li key={source.href}><a href={source.href}>{source.label}</a></li>)}</ul></section><Link className="guides-next" href={guide.nextHref}>{guide.nextLabel} →</Link><section><h2>Continue your research</h2><ul>{publicGuides.filter(item => item.slug !== slug).map(item => <li key={item.slug}><Link href={`/guides/${item.slug}`}>{item.title}</Link></li>)}<li><Link href="/countries">Explore source-linked country profiles</Link></li><li><Link href="/courses"><LocalizedText text={"Explore practical learning"} /></Link></li></ul></section></article></main>;
}

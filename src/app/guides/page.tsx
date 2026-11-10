import { localizeMetadata } from "@/lib/localization/metadata.server";

import { LocalizedElement } from "@/components/localization/LocalizedElement";

import { LocalizedText } from "@/components/localization/LocaleProvider";
import type { Metadata } from "next";
import Link from "next/link";
import { publicGuides } from "@/lib/public-guides";
import "./guides.css";
const sourceMetadata: Metadata = {
  title: "Moving Abroad & Country Research Guides | TGPI",
  description: "Free practical guides to compare countries, investigate moving-abroad documents and turn international research into clear next steps.",
  alternates: { canonical: "https://www.theglobalpolymath.com/guides" },
};
export default function GuidesPage() {
  return <main className="guides-page"><LocalizedElement as="nav" aria-label="Breadcrumb"><Link href="/resources"><LocalizedText text={"Resources"} /></Link>{" "}<LocalizedText text={"/ Guides"} /></LocalizedElement><p className="guides-kicker"><LocalizedText text={"TGPI / Public research guides"} /></p><h1><LocalizedText text={"Better questions. Clearer next steps."} /></h1><p><LocalizedText text={"Free guides for researching life abroad. Use practical checklists, inspect original sources and connect your research to the tools that help you organize it. No account is needed to read these guides."} /></p><div className="guides-grid">{publicGuides.map(guide => <article className="guides-card" key={guide.slug}><h2><Link href={`/guides/${guide.slug}`}><LocalizedText text={guide.title} /></Link></h2><p><LocalizedText text={guide.description} /></p><p className="guides-meta"><LocalizedText text={"Reviewed"} />{" "}{guide.reviewedAt}{" "}<LocalizedText text={"· Checklist and worksheet"} /></p></article>)}</div><p><LocalizedText text={"These guides provide general research methods, not personalized immigration, legal, tax or financial advice. Requirements and data can change. Always check the responsible official authority."} /></p><Link href="/countries"><LocalizedText text={"Explore country profiles →"} /></Link></main>;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }

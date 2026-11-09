import type { Metadata } from "next";
import Link from "next/link";
import { publicGuides } from "@/lib/public-guides";
import "./guides.css";
export const metadata: Metadata = {
  title: "Moving Abroad & Country Research Guides | TGPI",
  description: "Free practical guides to compare countries, investigate moving-abroad documents and turn international research into clear next steps.",
  alternates: { canonical: "https://www.theglobalpolymath.com/guides" },
};
export default function GuidesPage() {
  return <main className="guides-page"><nav aria-label="Breadcrumb"><Link href="/resources">Resources</Link> / Guides</nav><p className="guides-kicker">TGPI / Public research guides</p><h1>Better questions. Clearer next steps.</h1><p>Free guides for researching life abroad. Use practical checklists, inspect original sources and connect your research to the tools that help you organize it. No account is needed to read these guides.</p><div className="guides-grid">{publicGuides.map(guide => <article className="guides-card" key={guide.slug}><h2><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h2><p>{guide.description}</p><p className="guides-meta">Reviewed {guide.reviewedAt} · Checklist and worksheet</p></article>)}</div><p>These guides provide general research methods, not personalized immigration, legal, tax or financial advice. Requirements and data can change. Always check the responsible official authority.</p><Link href="/countries">Explore country profiles →</Link></main>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { localizeMetadata } from "@/lib/localization/metadata.server";
import { LocalizedText as Copy } from "@/components/localization/LocaleProvider";
import ResearchDiscovery from "@/components/intelligence/global/ResearchDiscovery";
import SourceRegister from "@/components/intelligence/SourceRegister";
import { RESEARCH_COUNTRIES, RESEARCH_SOURCES, RESEARCH_RELEASE } from "@/lib/intelligence/global-research";
import { DOSSIER_COUNTRIES } from "@/lib/intelligence/dossiers";

const sourceMetadata: Metadata = {
  title: "Global Decision Dossiers — 195 Countries | TGPI",
  description: "Explore 195 structured country dossiers with official sources, dated statistics and twelve practical research chapters.",
  alternates: { canonical: "https://www.theglobalpolymath.com/intelligence/research" },
};
export default function ResearchPage() {
  return <main className="ig-shell"><div className="ig-container">
    <header className="ig-hero">
      <p className="ig-eyebrow">{"TGPI /"} <Copy text="Global research dossier" /></p>
      <h1><Copy text="The world, with more context." /></h1>
      <p><Copy text="Research every destination through education, work, costs, housing, health, safety, connectivity and the documents behind your next move." /></p>
      <div className="ig-actions"><a href="#dossier-directory" className="ig-button"><Copy text="Explore all country dossiers" /> ↓</a><Link href="/intelligence#global-source-register" className="ig-link"><Copy text="Explore the sources" /> ↗</Link></div>
    </header>
    <section className="ig-section ig-panel">
      <p className="ig-eyebrow"><Copy text="Release scope /" /> {RESEARCH_RELEASE}</p>
      <h2><Copy text="Coverage is visible, not implied." /></h2>
      <p className="ig-small"><Copy text="{countries} destinations · 12 research chapters each · {sources} distinct source records." values={{ countries: RESEARCH_COUNTRIES.length, sources: RESEARCH_SOURCES.length }} /></p>
      <p className="ig-small"><Copy text="Every destination has a structured dossier. Local rule verification remains uneven: {count} destinations also have selected study summaries with their own review dates and outstanding issues." values={{ count: DOSSIER_COUNTRIES.length }} /></p>
      <p className="ig-small"><Copy text="National statistics, editorial summaries and personal research tasks are different evidence layers. Missing data stays missing; a source access check never renews a legal review." /></p>
    </section>
    <section className="ig-section" id="dossier-directory" style={{ scrollMarginTop: "8rem" }}><ResearchDiscovery mode="countries" /></section>
    <details className="ig-details ig-section"><summary><Copy text="Selected study summaries and their review queue" /></summary><SourceRegister /></details>
    <section className="ig-section ig-panel"><h2><Copy text="From research to a personal plan." /></h2><p className="ig-small"><Copy text="Use dated quotes and official confirmations to resolve the gaps. Your worksheet records your assumptions without turning them into verified country facts." /></p><Link href="/country-fit#research-workbench" className="ig-button"><Copy text="Open my Decision Lab →" /></Link></section>
  </div></main>;
}
export async function generateMetadata() { return localizeMetadata(sourceMetadata); }

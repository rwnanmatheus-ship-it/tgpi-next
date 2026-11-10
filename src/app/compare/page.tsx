import "./compare.css";
import { localizeMetadata } from "@/lib/localization/metadata.server";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CinematicImage from "@/components/ui/CinematicImage";
import ActivationProgressProvider from "@/components/activation/ActivationProgressProvider";
import CompareCountryPicker from "@/components/compare/CompareCountryPicker";
import ComparisonMatrix from "@/components/compare/ComparisonMatrix";
import ComparisonNavigation from "@/components/compare/ComparisonNavigation";
import DecisionLabs from "@/components/compare/DecisionLabs";
import DecisionOverview from "@/components/compare/DecisionOverview";
import { GraphStatus } from "@/components/intelligence/Evidence";
import ResearchLoading from "@/components/intelligence/ResearchLoading";
import DossierComparison from "@/components/intelligence/DossierComparison";
import { getLocale } from "@/lib/localization/server";
import { translate } from "@/lib/localization/messages";
import { getAllCountries } from "@/lib/countries";
import { getIntelligence, identities } from "@/lib/intelligence/server";
import { isComparisonGoal, getComparisonGoalConfig, type ComparisonGoal } from "@/lib/tgpi-comparison";
import { decodeCountrySet } from "@/lib/comparison-catalog";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
const sourceMetadata: Metadata = { title: "Compare Countries — Decision Studio | TGPI", description: "Compare all selected countries with source-linked indicators, reference years, decision lenses and personal planning tools.", alternates: { canonical: "https://www.theglobalpolymath.com/compare" } };
type Country = {slug:string;name:string;emoji:string;region:string;iso2:string;iso3:string};
const PAGE_SIZE=4;
export default async function ComparePage({ searchParams }: { searchParams?: Promise<{ country?: string | string[]; set?:string; goal?:string;view?:string }> }) {
  const [params,locale] = await Promise.all([searchParams,getLocale()]);
  const t=(text:string,values?:Record<string,string|number>)=>translate(locale,text,values);
  const names=new Intl.DisplayNames([locale],{type:"region"});
  const valid = new Set(identities.map(c=>c.slug));
  const raw=params?.set ? decodeCountrySet(params.set) : params?.country ? (Array.isArray(params.country)?params.country:[params.country]) : [];
  const explicit=params?.set !== undefined || params?.country !== undefined;
  const slugs=explicit ? [...new Set(raw)].filter(slug=>valid.has(slug)) : ["portugal","canada","japan"];
  const goal=isComparisonGoal(params?.goal)?params.goal:"overall";
  const countries:Country[]=getAllCountries().flatMap(c=>{const identity=identities.find(i=>i.slug===c.slug);return identity?[{slug:c.slug,name:names.of(identity.iso2)??c.name,emoji:c.emoji,region:c.region,iso2:identity.iso2,iso3:identity.iso3}]:[];}).sort((a,b)=>a.name.localeCompare(b.name,locale));
  const bySlug=new Map(countries.map(c=>[c.slug,c]));
  const selected=slugs.flatMap(slug=>bySlug.get(slug)?[bySlug.get(slug)!]:[]);
  const page=Math.max(1,Math.min(Math.ceil(selected.length/PAGE_SIZE)||1,Math.floor(Number(params?.view))||1));
  const visible=selected.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);
  return <ActivationProgressProvider><main className="ig-shell compare-command"><div className="ig-container">
    <header className="compare-hero"><div className="compare-hero-copy"><p className="compare-kicker">{t("TGPI /")} {t("Decision Studio")}</p><h1 id="compare-title">{t("Compare the world.")}<br/><span>{t("Design your next move.")}</span></h1><p>{t("Your destinations. Your priorities. One clear view of the evidence and your next steps.")}</p><div className="compare-hero-links"><a href="#comparison-builder">{t("Build my comparison")} ↗</a><Link href="/plan">{t("My plan")} →</Link></div><div className="compare-hero-meta"><span>{countries.length} {t("countries")}</span><span>{t("Source-linked data")}</span><span>{t("Connected to your workspace")}</span></div></div><div className="compare-hero-art" aria-hidden="true"><CinematicImage asset="decision-comparison" alt="" priority sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1100px) 100vw, 50vw" position="55% center"/><span className="compare-art-label">{t("Global perspectives")}</span></div></header>
    <CompareCountryPicker key={`${slugs.join(",")}:${goal}:${locale}`} countries={countries} initialSlugs={slugs} initialGoal={goal} hasExplicitSelection={explicit}/>
    {explicit && (!raw.length || raw.some(slug=>!valid.has(slug))) && <p className="ig-status" role="status">{t("Invalid country selections were ignored. Choose destinations from the catalog.")}</p>}
    {selected.length>=2 ? <><nav className="compare-nav" aria-label={t("Comparison sections")}>{[["#decision-overview","Overview"],["#comparison-matrix","Sources & evidence"],["#decision-details","Detailed comparison"],["#decision-labs","Decision Lab"],["#decision-actions","Next steps"]].map(([href,label],i)=><a href={href} key={href}><span>0{i+2}</span>{t(label)}</a>)}</nav>
    <div id="decision-overview" className="compare-section"><ComparisonNavigation countries={selected} goal={goal} page={page} pageSize={PAGE_SIZE}/><DecisionOverview countries={visible}/></div>
    <section className="compare-lens"><span aria-hidden="true">◎</span><div><p className="compare-kicker">{t("Your decision lens")} / {t(getComparisonGoalConfig(goal).shortLabel)}</p><h2>{t(getComparisonGoalConfig(goal).label)}</h2><p>{t(getComparisonGoalConfig(goal).description)}</p></div><Link href="/profile/security#settings-identity">{t("Personalize my profile")} ↗</Link></section>
    <Suspense fallback={<ResearchLoading/>}><ComparisonEvidence visible={visible} selected={selected} goal={goal}/></Suspense>
    <section id="decision-details" className="compare-section"><div className="compare-section-head"><div><p className="compare-kicker">04 / {t("Detailed comparison")}</p><h2>{t("Go beyond the numbers.")}</h2><p>{t("Check legal pathways, education and cost references before committing.")}</p></div><Link className="compare-button" href="/intelligence">{t("Methodology & source coverage")} ↗</Link></div><details className="compare-dossier-disclosure"><summary>{t("Open destination evidence and limitations")}</summary><DossierComparison countries={visible}/></details></section>
    <section id="decision-labs" className="compare-section compare-labs"><div className="compare-section-head"><div><p className="compare-kicker">05 / {t("Decision Lab")}</p><h2>{t("Turn insight into action.")}</h2><p>{t("Build a city budget and a preparation checklist for each destination. Your estimates remain separate from published evidence.")}</p></div><span className="compare-lab-symbol" aria-hidden="true">↗</span></div><DecisionLabs key={visible.map(c=>c.slug).join(",")} countries={visible}/></section>
    {selected.length>PAGE_SIZE && <ComparisonNavigation countries={selected} goal={goal} page={page} pageSize={PAGE_SIZE}/>}</> : <section className="compare-empty"><h2>{t("Choose at least two countries to build a comparison.")}</h2><p>{t("Search the full catalog, add destinations and choose your focus.")}</p></section>}
    <section id="decision-actions" className="compare-section compare-next"><div><p className="compare-kicker">06 / {t("Next steps")}</p><h2>{t("A comparison is only the beginning.")}</h2><p>{t("Connect your research to a plan, learning and practical preparation.")}</p></div><div className="compare-next-grid">{[["/plan","My plan"],["/countries","Explore destinations"],["/learn","Learn"],["/documents","Documents"],["/atlas","Ask Atlas"],["/profile","Workspace"]].map(([href,label])=><Link href={href} key={href}>{t(label)}<span aria-hidden="true">↗</span></Link>)}</div></section>
  </div></main></ActivationProgressProvider>;
}
async function ComparisonEvidence({visible,selected,goal}:{visible:Country[];selected:Country[];goal:ComparisonGoal}){
  const state=await getIntelligence();
  const wanted=new Set(selected.map(c=>c.slug));
  return <><ComparisonMatrix countries={visible} allCountries={selected} observations={state.snapshot.observations.filter(o=>wanted.has(o.country))} goal={goal}/><GraphStatus state={{...state,snapshot:{...state.snapshot,observations:[]}}}/></>;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }

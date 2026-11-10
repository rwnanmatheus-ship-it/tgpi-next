"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useActivationProgress } from "@/components/activation/ActivationProgressProvider";
import { COMPARISON_GOALS, getComparisonGoalConfig, type ComparisonGoal } from "@/lib/tgpi-comparison";
import { countrySearchScore, countrySearchTerms } from "@/lib/country-search";
import { comparisonPath, restoreComparison } from "@/lib/comparison-state";
import { useLocale } from "@/components/localization/LocaleProvider";

const STORAGE_KEY = "tgpi-country-comparison:v1";
export type ComparePickerCountry = { slug: string; name: string; emoji: string; region: string; iso2?: string; iso3?: string };
type Props = { countries: ComparePickerCountry[]; initialSlugs: string[]; initialGoal: ComparisonGoal; hasExplicitSelection: boolean };

export default function CompareCountryPicker({ countries, initialSlugs, initialGoal, hasExplicitSelection }: Props) {
  const router = useRouter();
  const { t } = useLocale();
  const { isAuthenticated, mutate } = useActivationProgress();
  const [selection, setSelection] = useState(initialSlugs);
  const [goal, setGoal] = useState(initialGoal);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [limit, setLimit] = useState(12);
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [pending, startTransition] = useTransition();
  const restored = useRef(false);
  const valid = useMemo(() => new Set(countries.map(c => c.slug)), [countries]);
  const bySlug = useMemo(() => new Map(countries.map(c => [c.slug, c])), [countries]);
  const terms = useMemo(() => new Map(countries.map(c => [c.slug, countrySearchTerms({ ...c, iso2: c.iso2 ?? "ZZ", iso3: c.iso3 ?? "" })])), [countries]);
  const results = useMemo(() => countries.map(country => ({ country, score: countrySearchScore(terms.get(country.slug) ?? [], search) }))
    .filter(({ country, score }) => score > 0 && (region === "all" || country.region === region)).sort((a,b) => b.score - a.score), [countries, terms, search, region]);
  const dirty = selection.join(",") !== initialSlugs.join(",") || goal !== initialGoal;

  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    if (hasExplicitSelection) return;
    try {
      const raw: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      const previous = restoreComparison(raw, valid, COMPARISON_GOALS);
      if (previous) startTransition(() => router.replace(comparisonPath(previous.countrySlugs, previous.goal), { scroll: false }));
    } catch { /* Comparison works without browser storage. */ }
  }, [hasExplicitSelection, router, valid]);

  function toggle(slug: string) {
    setSelection(current => current.includes(slug) ? current.filter(value => value !== slug) : [...current, slug]);
    setNotice("");
  }
  function runComparison() {
    if (selection.length < 2) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ countrySlugs: selection, goal })); } catch { /* URL is authoritative. */ }
    setNotice("");
    startTransition(() => router.push(comparisonPath(selection, goal), { scroll: false }));
  }
  async function saveComparison() {
    setSaving(true);
    try {
      await mutate({ type: "record_comparison", countrySlugs: selection, goal });
      setNotice("Comparison saved to your workspace.");
    } catch {
      setNotice("Workspace save failed. Your selection is still available here; retry or copy the link.");
    } finally { setSaving(false); }
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${location.origin}${comparisonPath(selection, goal)}`);
      setNotice("Decision link copied.");
    } catch { setNotice("Copy the comparison URL from your address bar after applying your selection."); }
  }
  return <section id="comparison-builder" className="compare-builder" aria-labelledby="comparison-builder-title">
    <div className="compare-section-head"><div><p className="compare-kicker">01 / {t("Build my comparison")}</p><h2 id="comparison-builder-title">{t("Your next chapter starts here.")}</h2><p>{t("Search the full catalog, add destinations and choose your focus.")}</p></div><span className="compare-count">{countries.length} <span>{t("countries")}</span></span></div>
    <div className="compare-search-row"><label><span>{t("Search countries")}</span><input type="search" value={search} onChange={e => {setSearch(e.target.value.slice(0,120));setLimit(12);}} placeholder={t("Country, translated name or ISO code…")} /></label><label><span>{t("Region")}</span><select value={region} onChange={e => {setRegion(e.target.value);setLimit(12);}}><option value="all">{t("All regions")}</option>{[...new Set(countries.map(c=>c.region))].map(r=><option key={r} value={r}>{t(r)}</option>)}</select></label></div>
    <div className="compare-catalog" aria-label={t("Available countries")}>{results.slice(0,limit).map(({country}) => <button type="button" key={country.slug} aria-pressed={selection.includes(country.slug)} onClick={()=>toggle(country.slug)}><span className="compare-flag" aria-hidden="true">{country.emoji}</span><span><strong>{country.name}</strong><small>{t(country.region)}</small></span><span aria-hidden="true" className="compare-check">{selection.includes(country.slug) ? "✓" : "+"}</span></button>)}</div>
    {!results.length && <p role="status">{t("No countries match this search.")}</p>}
    <div className="compare-catalog-actions"><span>{t("{count} results",{count:results.length})}</span><div>{limit < results.length && <button type="button" onClick={()=>setLimit(n=>n+24)}>{t("Show more")}</button>}<button type="button" disabled={!results.length} onClick={()=>setSelection(current=>[...new Set([...current,...results.map(r=>r.country.slug)])])}>{t("Add all results")}</button></div></div>
    <div className="compare-selection"><div className="compare-selection-heading"><strong>{t("{count} selected",{count:selection.length})}</strong><button type="button" onClick={()=>{setSelection([]);setNotice("");try{localStorage.removeItem(STORAGE_KEY);}catch{ /* Optional. */ }}} disabled={!selection.length}>{t("Clear")}</button></div><div className="compare-chips">{selection.map(slug=>{const c=bySlug.get(slug);return c ? <button type="button" key={slug} onClick={()=>toggle(slug)} aria-label={t("Remove {country}",{country:c.name})}><span aria-hidden="true">{c.emoji}</span> {c.name}<span aria-hidden="true"> ×</span></button>:null;})}{!selection.length && <p>{t("Choose at least two countries to build a comparison.")}</p>}</div></div>
    <fieldset className="compare-focus"><legend>{t("Decision lens")}</legend>{COMPARISON_GOALS.map(value=><label key={value}><input type="radio" name="comparison-goal" value={value} checked={goal===value} onChange={()=>setGoal(value)} /><span>{t(getComparisonGoalConfig(value).label)}</span></label>)}</fieldset>
    <div className="compare-builder-footer"><div><p className="compare-draft-note">{t(dirty ? "Selection changed. Apply to update the results below." : "Results reflect your current selection.")}</p><p role="status" aria-live="polite">{t(notice)}</p></div><div className="compare-actions"><button type="button" disabled={selection.length<2} onClick={copyLink}>{t("Copy decision link")}</button>{isAuthenticated ? <button type="button" disabled={selection.length<2 || saving || pending || dirty} onClick={saveComparison}>{t(saving ? "Saving…" : "Save to workspace")}</button> : <Link href={`/sign-in?redirect_url=${encodeURIComponent(comparisonPath(selection,goal))}`}>{t("Sign in to save")}</Link>}<button type="button" className="compare-primary" disabled={selection.length<2 || pending || saving} onClick={runComparison}>{t(pending ? "Building…" : "Compare now")} <span aria-hidden="true">↗</span></button></div></div>
  </section>;
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition, type FormEvent } from "react";
import { useActivationProgress } from "@/components/activation/ActivationProgressProvider";
import { useLocale } from "@/components/localization/LocaleProvider";
import CountryFlag from "@/components/ui/CountryFlag";
import { countrySearchTerms, normalizeCountrySearch, rankCountryMatches, type SearchableCountry } from "@/lib/country-search";
import { comparisonPath, comparisonPlanPath, restoreComparison } from "@/lib/comparison-state";
import { COMPARISON_GOALS, getComparisonGoalConfig, type ComparisonGoal } from "@/lib/tgpi-comparison";

const STORAGE_KEY = "tgpi-country-comparison:v1";
const INITIAL_LIMIT = 8;

type Props = {
  countries: SearchableCountry[];
  initialSlugs: string[];
  initialGoal: ComparisonGoal;
  allowRestore: boolean;
  invalidSelection: boolean;
};

export default function CompareCountryPicker({ countries, initialSlugs, initialGoal, allowRestore, invalidSelection }: Props) {
  const router = useRouter();
  const { t, locale } = useLocale();
  const { isAuthenticated, isLoading, progress, mutate } = useActivationProgress();
  const [selection, setSelection] = useState(initialSlugs);
  const [goal, setGoal] = useState(initialGoal);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [savedOnly, setSavedOnly] = useState(false);
  const [limit, setLimit] = useState(INITIAL_LIMIT);
  const [notice, setNotice] = useState("");
  const [manualLink, setManualLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [pending, startTransition] = useTransition();
  const checkedStorage = useRef(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const shareInput = useRef<HTMLInputElement>(null);

  const bySlug = useMemo(() => new Map(countries.map(country => [country.slug, country])), [countries]);
  const terms = useMemo(() => new Map(countries.map(country => [country.slug, countrySearchTerms(country)])), [countries]);
  const regions = useMemo(() => [...new Set(countries.map(country => country.region))].sort((a, b) => t(a).localeCompare(t(b), locale)), [countries, t, locale]);
  const saved = useMemo(() => new Set(progress.savedCountries), [progress.savedCountries]);
  const results = useMemo(() => {
    const eligible = countries.filter(country =>
      (region === "all" || country.region === region) && (!(isAuthenticated && savedOnly) || saved.has(country.slug)));
    return rankCountryMatches(eligible, search, locale, terms);
  }, [countries, region, isAuthenticated, savedOnly, saved, search, locale, terms]);
  const selected = new Set(selection);
  const firstMatch = normalizeCountrySearch(search) && results[0] && !selected.has(results[0].slug) ? results[0] : undefined;
  const dirty = selection.join(",") !== initialSlugs.join(",") || goal !== initialGoal;
  const busy = pending || saving;

  useEffect(() => {
    if (checkedStorage.current) return;
    checkedStorage.current = true;
    if (!allowRestore) return;

    try {
      const raw: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      const previous = restoreComparison(raw, new Set(bySlug.keys()), COMPARISON_GOALS);
      if (previous) startTransition(() => router.replace(comparisonPath(previous.countrySlugs, previous.goal), { scroll: false }));
    } catch { /* Storage is optional. */ }
  }, [allowRestore, bySlug, router]);

  useEffect(() => {
    if (manualLink) shareInput.current?.select();
  }, [manualLink]);

  function updateSelection(slugs: string[]) {
    setSelection(slugs);
    setNotice("");
    setManualLink("");
  }

  function toggle(slug: string) {
    updateSelection(selected.has(slug) ? selection.filter(value => value !== slug) : [...selection, slug]);
  }

  function addTopMatch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!firstMatch || busy) return;
    toggle(firstMatch.slug);
    setSearch("");
    setLimit(INITIAL_LIMIT);
    setNotice(t("{country} added to the comparison.", { country: firstMatch.name }));
    searchInput.current?.focus();
  }

  function runComparison(next: string[], nextGoal: ComparisonGoal) {
    const path = comparisonPath(next, nextGoal);
    try {
      if (next.length >= 2) localStorage.setItem(STORAGE_KEY, JSON.stringify({ countrySlugs: next, goal: nextGoal }));
      else localStorage.removeItem(STORAGE_KEY);
    } catch { /* The comparison is encoded in the URL. */ }
    setManualLink("");
    setNotice("");
    startTransition(() => router.push(next.length >= 2 ? path + "#decision-overview" : path, { scroll: next.length >= 2 }));
  }

  async function saveComparison() {
    setSaving(true);
    setNotice("");
    try {
      await mutate({ type: "record_comparison", countrySlugs: selection, goal });
      setNotice(t("Comparison saved to your workspace."));
    } catch {
      setNotice(t("Workspace save failed. Your selection is still available here; retry or copy the link."));
    } finally {
      setSaving(false);
    }
  }

  async function copyLink() {
    const url = new URL(comparisonPath(selection, goal), location.origin).href;
    try {
      await navigator.clipboard.writeText(url);
      setManualLink("");
      setNotice(t("Decision link copied."));
    } catch {
      setManualLink(url);
      setNotice("");
    }
  }

  return (
    <section id="comparison-builder" className="compare-builder" aria-labelledby="comparison-builder-title" aria-busy={pending}>
      <div className="compare-section-head">
        <div>
          <p className="compare-kicker">{t("Decision Studio")}</p>
          <h2 id="comparison-builder-title">{t("Choose countries")}</h2>
          <p>{t("Search the full catalog, add destinations and choose your focus.")}</p>
        </div>
      </div>
      {invalidSelection && <p className="compare-note" role="status">{t("Invalid country selections were ignored. Choose destinations from the catalog.")}</p>}
      <div className="compare-builder-grid">
        <div className="compare-catalog-area">
          <form className="compare-search-row" role="search" aria-label={t("Search countries")} onSubmit={addTopMatch}>
            <label>
              <span>{t("Search countries")}</span>
              <input ref={searchInput} type="search" value={search} maxLength={120} autoComplete="off"
                onChange={event => { setSearch(event.target.value); setLimit(INITIAL_LIMIT); }}
                placeholder={t("Country, translated name or ISO code…")} />
            </label>
            <label>
              <span>{t("Region")}</span>
              <select value={region} onChange={event => { setRegion(event.target.value); setLimit(INITIAL_LIMIT); }}>
                <option value="all">{t("All regions")}</option>
                {regions.map(value => <option value={value} key={value}>{t(value)}</option>)}
              </select>
            </label>
            {firstMatch && <button className="compare-button compare-add-match" disabled={busy} type="submit">
              {t("Add {country}", { country: firstMatch.name })} <span aria-hidden="true">↵</span>
            </button>}
          </form>
          <div className="compare-catalog-toolbar">
            <span role="status">{t("{count} results", { count: results.length })}</span>
            {isAuthenticated && <label className="compare-toggle">
              <input type="checkbox" checked={savedOnly} disabled={isLoading}
                onChange={event => { setSavedOnly(event.target.checked); setLimit(INITIAL_LIMIT); }} />
              {t("Saved countries")}
            </label>}
          </div>
          <div className="compare-catalog" aria-label={t("Available countries")}>
            {results.slice(0, limit).map(country => (
              <button type="button" key={country.slug} disabled={busy} aria-pressed={selected.has(country.slug)} onClick={() => toggle(country.slug)}>
                <span className="compare-flag" aria-hidden="true"><CountryFlag iso2={country.iso2} width={36} /></span>
                <span><strong>{country.name}</strong><small>{country.iso3} · {t(country.region)}</small></span>
                <span aria-hidden="true" className="compare-check">{selected.has(country.slug) ? "✓" : "+"}</span>
              </button>
            ))}
          </div>
          {!results.length && <p className="compare-note">{t("No countries match this search.")}</p>}
          <div className="compare-catalog-actions">
            {limit < results.length && <button type="button" className="compare-button" onClick={() => setLimit(current => current + 16)}>{t("Show more")}</button>}
            {results.some(country => !selected.has(country.slug)) && <button type="button" className="compare-button" disabled={busy}
              onClick={() => updateSelection([...new Set([...selection, ...results.map(country => country.slug)])])}>{t("Add all results")}</button>}
            {(search || region !== "all" || savedOnly) && <button type="button" className="compare-button" onClick={() => {
              setSearch(""); setRegion("all"); setSavedOnly(false); setLimit(INITIAL_LIMIT); searchInput.current?.focus();
            }}>{t("Reset filters")}</button>}
          </div>
        </div>

        <div className="compare-selection">
          {isAuthenticated && progress.comparisons.length > 0 && <details className="compare-saved">
            <summary>{t("Saved comparisons")}</summary>
            {progress.comparisons.map(comparison => (
              <Link key={comparison.id} href={comparisonPath(comparison.countrySlugs, comparison.goal) + "#decision-overview"} prefetch={false}>
                <strong>{comparison.countrySlugs.slice(0, 2).map(slug => bySlug.get(slug)?.name ?? slug).join(" · ")}</strong>
                <small>{t("{count} selected", { count: comparison.countrySlugs.length })} · {t(getComparisonGoalConfig(comparison.goal).shortLabel)}</small>
              </Link>
            ))}
          </details>}
          <div className="compare-selection-heading">
            <strong aria-live="polite">{t("{count} selected", { count: selection.length })}</strong>
            <button type="button" className="compare-button" onClick={() => {
              updateSelection([]);
              runComparison([], goal);
              searchInput.current?.focus();
            }} disabled={!selection.length || busy}>{t("Clear")}</button>
          </div>
          <div className="compare-chips">
            {selection.map(slug => {
              const country = bySlug.get(slug);
              return country && <button type="button" disabled={busy} key={slug} onClick={() => toggle(slug)} aria-label={t("Remove {country}", { country: country.name })}>
                <CountryFlag iso2={country.iso2} width={28} /> <span>{country.name}</span><span aria-hidden="true">×</span>
              </button>;
            })}
            {!selection.length && <p>{t("Choose at least two countries to build a comparison.")}</p>}
          </div>
          <fieldset className="compare-focus" disabled={busy}>
            <legend>{t("Decision lens")}</legend>
            {COMPARISON_GOALS.map(value => <label key={value}>
              <input type="radio" name="comparison-goal" value={value} checked={goal === value} onChange={() => {
                setGoal(value); setNotice(""); setManualLink("");
              }} />
              <span>{t(getComparisonGoalConfig(value).label)}</span>
            </label>)}
          </fieldset>
          <p className="compare-lens-description">{t(getComparisonGoalConfig(goal).description)}</p>
          <div className="compare-actions">
            <button type="button" className="compare-primary" disabled={busy || (!dirty && selection.length < 2)}
              onClick={() => runComparison(selection, goal)}>
              {pending ? t("Building…") : selection.length < 2 ? t("Apply selection") : t("Compare now")} <span aria-hidden="true">↓</span>
            </button>
            {selection.length >= 2 && selection.length <= 5 && !busy &&
              <Link href={comparisonPlanPath(selection, goal)}>{t("Open my connected plan")}</Link>}
            <button type="button" disabled={busy || selection.length < 2} onClick={copyLink}>{t("Copy decision link")}</button>
            {isAuthenticated ? <button type="button" disabled={selection.length < 2 || busy || dirty} onClick={saveComparison}>
              {t(saving ? "Saving…" : "Save to workspace")}
            </button> : !isLoading && selection.length >= 2 &&
              <Link href={`/sign-in?redirect_url=${encodeURIComponent(comparisonPath(selection, goal))}`}>{t("Sign in to save")}</Link>}
          </div>
          {manualLink && <label className="compare-share">
            <span>{t("Copy decision link")}</span>
            <input ref={shareInput} readOnly value={manualLink} onFocus={event => event.target.select()} />
          </label>}
          {dirty && <p className="compare-draft-note">{t("Selection changed. Apply to update the results below.")}</p>}
          <p className="compare-notice" role="status">{notice}</p>
        </div>
      </div>
    </section>
  );
}

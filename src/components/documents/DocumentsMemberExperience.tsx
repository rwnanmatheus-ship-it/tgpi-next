"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useLocale } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import CountryFlag from "@/components/ui/CountryFlag";
import { countryFlagCode } from "@/lib/country-flag";
import { localizedCountryName, localizedCountryScore, normalizeCountrySearch, type SearchableCountry } from "@/lib/country-search";
import type { DocumentsMemberModel } from "@/lib/documents-os";
import type { NavigationIconName } from "@/lib/navigation-system";

const statusLabels = { completed: "Reviewed", in_progress: "In progress", needs_attention: "Check required", not_started: "Not started" } as const;
const priority = { in_progress: 0, needs_attention: 1, not_started: 2, completed: 3 } as const;
const layerIcons = ["shield", "target", "globe", "file", "book", "certificate"] as const;
type Filter = "all" | "pending" | "completed";

export function DocumentsMemberOverview({ model }: { model: DocumentsMemberModel }) {
  const { t, locale } = useLocale();
  const format = new Intl.NumberFormat(locale);
  const metrics: { value: number | null; label: string; icon: NavigationIconName }[] = [
    { value: model.countries.length, label: "Connected destinations", icon: "globe" },
    { value: model.totalItems - model.completedItems, label: "Research items remaining", icon: "file" },
    { value: model.completedCourses, label: "Courses completed", icon: "book" },
    { value: model.credentialCount, label: "Active certificates", icon: "certificate" },
  ];
  const values = model.nextAction.country ? { country: t(model.nextAction.country) } : undefined;

  return <>
    <dl className="documents-stats" aria-label={t("Your preparation overview")}>
      {metrics.map(({ value, label, icon }) => <div className="documents-stat" key={label}>
        <dt>{t(label)}</dt>
        <dd>{value === null ? "—" : format.format(value)}</dd>
        <span className="documents-icon"><NavigationIcon name={icon} width={20} height={20} /></span>
      </div>)}
    </dl>
    <section className="documents-next" aria-labelledby="documents-next-title">
      <div className="documents-next-copy">
        <span className="documents-icon"><NavigationIcon name="target" /></span>
        <div>
          <p className="documents-eyebrow">{t("Recommended next step")}</p>
          <h2 id="documents-next-title">{t(model.nextAction.title, values)}</h2>
          <p>{t(model.nextAction.description, values)}</p>
        </div>
      </div>
      <Link className="documents-button" href={model.nextAction.href} prefetch={false}>
        {t(model.nextAction.label)} <NavigationIcon name="arrow" width={18} height={18} />
      </Link>
    </section>
  </>;
}

export function DocumentsDestinations({ model, directory }: { model: DocumentsMemberModel; directory: SearchableCountry[] }) {
  const { t, locale } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"priority" | "recent">("priority");
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" });
  const countries = model.countries
    .map(country => {
      const identity = directory.find(item => item.slug === country.slug);
      const name = identity ? localizedCountryName(identity, locale) : t(country.name);
      const flag = identity?.iso2 ?? countryFlagCode(country.emoji);
      const score = identity ? localizedCountryScore(identity, search, locale)
        : Number(normalizeCountrySearch(name).includes(normalizeCountrySearch(search)));
      return { ...country, name, flag, score };
    })
    .filter(country => country.score > 0 &&
      (filter === "all" || (filter === "completed" ? country.status === "completed" : country.status !== "completed")))
    .sort((a, b) => b.score - a.score
      || (sort === "priority" ? priority[a.status] - priority[b.status] : (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))
      || a.name.localeCompare(b.name, locale));

  return (
    <section id="destination-files" className="documents-section" aria-labelledby="documents-files-title">
      <div className="documents-section-heading">
        <div>
          <p className="documents-eyebrow">{t("Your research portfolio")}</p>
          <h2 id="documents-files-title">{t("Destination files")}</h2>
          <p>{t("See what you have reviewed and where preparation still needs attention.")}</p>
        </div>
        <Link className="documents-text-link" href="/countries">{t("Add a destination ↗")}</Link>
      </div>
      {model.countries.length > 0 && <>
        <div className="documents-toolbar">
          <div className="documents-filters" role="group" aria-label={t("Filter destination files")}>
            {([["all", "All files"], ["pending", "To review"], ["completed", "Reviewed"]] as const).map(([value, label]) =>
              <button type="button" aria-pressed={filter === value} key={value} onClick={() => setFilter(value)}>{t(label)}</button>)}
          </div>
          <label className="documents-search">
            <span className="sr-only">{t("Search your destinations")}</span>
            <input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder={t("Search destinations…")} />
          </label>
          <label className="documents-sort">
            <span className="sr-only">{t("Sort destination files")}</span>
            <select value={sort} onChange={event => setSort(event.target.value === "recent" ? "recent" : "priority")}>
              <option value="priority">{t("Preparation priority")}</option>
              <option value="recent">{t("Most recent activity")}</option>
            </select>
          </label>
        </div>
        <p className="documents-result-count" role="status">
          {t("{count} of {total} destination files", { count: countries.length, total: model.countries.length })}
        </p>
      </>}

      {countries.length ? <div className="documents-country-grid">
        {countries.map(country => {
          const date = country.updatedAt ? new Date(country.updatedAt) : null;
          return <article className="documents-country" key={country.slug}>
            <div className="documents-country-heading">
              <CountryFlag iso2={country.flag} width={49} />
              <span className="documents-status" data-status={country.status}>{t(statusLabels[country.status])}</span>
            </div>
            <h3>{country.name}</h3>
            <p>{t("{value0} of {value1} research items reviewed", { value0: country.completedItems, value1: country.totalItems })}</p>
            <div className="documents-progress-label"><span>{t("Checklist progress")}</span><strong>{country.percentage}%</strong></div>
            <progress value={country.percentage} max={100} aria-label={t("Checklist progress for {country}", { country: country.name })} />
            <p className="documents-updated">{date && Number.isFinite(date.getTime())
              ? t("Last checklist change: {value0}", { value0: dateFormat.format(date) })
              : t("No checklist activity recorded")}</p>
            <Link className="documents-country-link" href={country.href} prefetch={false}>
              {t(country.status === "not_started" ? "Start research" : "Open checklist")}<span aria-hidden="true">↗</span>
            </Link>
          </article>;
        })}
      </div> : <div className="documents-empty">
        <span className="documents-icon"><NavigationIcon name="globe" /></span>
        <h3>{t(model.countries.length ? "No files match this view." : "Your first destination starts here.")}</h3>
        <p>{t(model.countries.length ? "Try another name or show all files." : "Choose a destination to connect its document checklist to your plan.")}</p>
        {model.countries.length ? <button className="documents-button secondary" type="button" onClick={() => { setSearch(""); setFilter("all"); }}>{t("Show all files")}</button>
          : <a className="documents-button secondary" href="#preparation-paths">{t("Open research studio")} <span aria-hidden="true">↑</span></a>}
      </div>}
    </section>
  );
}

export function DocumentsReadiness({ model, syncButton }: { model: DocumentsMemberModel; syncButton: ReactNode }) {
  const { t } = useLocale();
  return <>
    <details id="readiness-architecture" className="documents-readiness">
      <summary>{t("Readiness architecture")}</summary>
      <div className="documents-layer-grid">
        {model.layers.map((layer, index) => <Link className="documents-layer" key={layer.label} href={layer.href} prefetch={false}>
          <div className="documents-layer-top">
            <span className="documents-icon"><NavigationIcon name={layerIcons[index]} width={20} height={20} /></span>
            <span className="documents-status" data-status={layer.status}>{t(layer.status === "completed" ? "Connected" : statusLabels[layer.status])}</span>
          </div>
          <h3>{t(layer.label)} <span aria-hidden="true">↗</span></h3>
          <p>{t(layer.description, layer.count === undefined ? undefined : { count: layer.count })}</p>
        </Link>)}
      </div>
    </details>
    <section id="preparation-signals" className="documents-breakdown" aria-labelledby="documents-score-title">
      <div>
        <p className="documents-eyebrow">{t("Preparation signals")}</p>
        <h3 id="documents-score-title">{t("Understand your score.")}</h3>
        <div className="documents-score"><strong>{model.readinessScore}</strong><span>/ 100</span></div>
        <p>{t("A planning indicator based on your profile and checklist activity. Review the breakdown below.")}</p>
        <div className="documents-sync">{syncButton}</div>
      </div>
      <ul>{model.signals.map(signal => <li key={signal.label}>
        <span className="documents-signal-dot" data-achieved={signal.achieved} aria-hidden="true" />
        <span>{t(signal.label)}</span><strong>{signal.achieved ? signal.weight : 0}/{signal.weight}</strong>
      </li>)}</ul>
    </section>
  </>;
}

"use client";

import { useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import CountryFlag from "@/components/ui/CountryFlag";
import { countrySearchTerms, localizedCountryName, normalizeCountrySearch, rankCountryMatches, type SearchableCountry } from "@/lib/country-search";
import styles from "./CountrySearchInput.module.css";

type Props = {
  countries: SearchableCountry[];
  query: string;
  onChange: (value: string) => void;
  onSelect?: (slug: string) => void;
  onShowResults?: () => void;
  terms?: ReadonlyMap<string, string[]>;
};

const discoveryQueries = ["English", "French", "Europe"] as const;

export default function CountrySearchInput({ countries, query, onChange, onSelect, onShowResults, terms }: Props) {
  const { locale, t } = useLocale();
  const router = useRouter();
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>();
  const normalizedQuery = normalizeCountrySearch(query);
  const indexedTerms = useMemo(() => terms ?? new Map(countries.map(country => [country.slug, countrySearchTerms(country)])), [countries, terms]);
  const hasPlaces = countries.some(country => country.places?.length);
  const hasMetadata = countries.some(country => country.language || country.capital);
  const quickQueries = useMemo(() => discoveryQueries.filter(value => rankCountryMatches(countries, value, "en", indexedTerms).length), [countries, indexedTerms]);
  const matches = useMemo(() => normalizedQuery
    ? rankCountryMatches(countries, query, locale, indexedTerms)
    : [], [countries, normalizedQuery, query, locale, indexedTerms]);
  const suggestions = matches.slice(0, 6);
  const expanded = open && suggestions.length > 0;
  const selected = suggestions.findIndex(country => country.slug === active);
  const selectedCountry = selected >= 0 ? suggestions[selected] : undefined;

  function choose(slug: string) {
    setOpen(false);
    setActive(undefined);
    if (onSelect) onSelect(slug);
    else router.push(`/countries/${slug}`);
  }

  function search(value: string) {
    onChange(value);
    setActive(undefined);
    setOpen(true);
    input.current?.focus();
  }

  return (
    <div className={`country-autocomplete ${styles.root}`} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setOpen(false);
        setActive(undefined);
      }
    }}>
      <label htmlFor={id}>{t("Search countries")}</label>
      <div className={`country-search-input ${styles.inputWrap}`}>
        <span aria-hidden="true"><NavigationIcon name="search" width={19} height={19} /></span>
        <input ref={input} id={id} type="search" role="combobox" autoComplete="off" spellCheck={false}
          maxLength={120} aria-autocomplete="list" aria-controls={expanded ? `${id}-options` : undefined}
          aria-expanded={expanded} aria-activedescendant={selectedCountry && expanded ? `${id}-${selectedCountry.slug}` : undefined}
          aria-describedby={`${id}-hint`} value={query} placeholder={t(hasPlaces ? "City, country, language or ISO code…" : hasMetadata ? "Country, capital, language or ISO code…" : "Country, translated name or ISO code…")}
          onFocus={() => setOpen(true)} onClick={() => setOpen(true)}
          onChange={event => search(event.target.value)}
          onKeyDown={event => {
            if (event.nativeEvent.isComposing) return;
            if (event.key === "Escape" && open) {
              event.preventDefault();
              event.stopPropagation();
              setOpen(false);
              setActive(undefined);
            }
            if ((event.key === "ArrowDown" || event.key === "ArrowUp") && suggestions.length) {
              event.preventDefault();
              const offset = event.key === "ArrowDown" ? 1 : -1;
              const index = selected < 0 ? (offset > 0 ? 0 : suggestions.length - 1) : (selected + offset + suggestions.length) % suggestions.length;
              const slug = suggestions[index].slug;
              setOpen(true);
              setActive(slug);
              requestAnimationFrame(() => document.getElementById(`${id}-${slug}`)?.scrollIntoView({ block: "nearest" }));
            }
            if (event.key === "Enter" && expanded) {
              event.preventDefault();
              const exact = suggestions.find(country => [localizedCountryName(country, locale), country.name, country.iso2, country.iso3, country.slug]
                .some(value => normalizeCountrySearch(value) === normalizedQuery));
              if (selectedCountry || exact || onSelect) choose((selectedCountry ?? exact ?? suggestions[0]).slug);
              else { setOpen(false); onShowResults?.(); }
            }
          }}
        />
        {query && <button className={styles.clear} type="button" aria-label={t("Clear search")}
          onMouseDown={event => event.preventDefault()} onClick={() => search("")}>
          <NavigationIcon name="close" width={16} height={16} />
        </button>}
      </div>
      <span id={`${id}-hint`} className="sr-only">{t(hasMetadata ? "Search by country, capital, region or language. Use arrows and Enter to open a destination." : "Type a letter. Use arrow keys to choose a country and Enter to open it.")}</span>
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {open && normalizedQuery ? t("{count} matching destinations", { count: matches.length }) : ""}
      </span>
      {open && <div className={`country-suggestion-panel ${styles.panel}`}>
        {!normalizedQuery ? <div className={styles.discovery}>
          <p>{t("Try a language or region")}</p>
          <div>{quickQueries.map(value => <button key={value} type="button"
            onMouseDown={event => event.preventDefault()} onClick={() => search(t(value))}>
            <NavigationIcon name={value === "Europe" ? "globe" : "book"} width={15} height={15} />{t(value)}
          </button>)}</div>
        </div> : suggestions.length ? <>
          <div className={styles.panelHeading}>
            <span>{t("Suggested countries")}</span>
            <small>{t("{count} matching destinations", { count: matches.length })}</small>
          </div>
          <ul id={`${id}-options`} role="listbox" aria-label={t("Suggested countries")}>
            {suggestions.map(country => (
              <li id={`${id}-${country.slug}`} key={country.slug} role="option" aria-selected={active === country.slug}
                onMouseDown={event => event.preventDefault()} onClick={() => choose(country.slug)} onMouseEnter={() => setActive(country.slug)}>
                <CountryFlag iso2={country.iso2} width={32} />
                <span className={styles.countryName}>
                  <strong>{localizedCountryName(country, locale)}</strong>
                  <span>{[t(country.region), country.places?.find(place => normalizeCountrySearch(place).includes(normalizedQuery)) ?? country.capital].filter(Boolean).join(" · ")}</span>
                </span>
                <small translate="no">{country.iso3}</small>
                <NavigationIcon name={onSelect ? "check" : "chevron"} width={15} height={15} aria-hidden="true" />
              </li>
            ))}
          </ul>
          {!onSelect && <button type="button" className={styles.allMatches} onClick={() => { setOpen(false); if (onShowResults) onShowResults(); else input.current?.focus(); }}>
            {t("Explore all matches")}<span>{matches.length}</span>
          </button>}
        </> : <div className={styles.empty}>
          <NavigationIcon name="search" width={22} height={22} aria-hidden="true" />
          <p>{t("No countries match your search.")}</p>
          <button type="button" onClick={() => search("")}>{t("Clear search")}</button>
        </div>}
      </div>}
    </div>
  );
}

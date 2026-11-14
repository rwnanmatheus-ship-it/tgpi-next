"use client";

import { useId, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import CountryFlag from "@/components/ui/CountryFlag";
import { localizedCountryName, normalizeCountrySearch, rankCountryMatches, type SearchableCountry } from "@/lib/country-search";

type Props = {
  countries: SearchableCountry[];
  query: string;
  onChange: (value: string) => void;
  onSelect?: (slug: string) => void;
  terms?: ReadonlyMap<string, string[]>;
};

export default function CountrySearchInput({ countries, query, onChange, onSelect, terms }: Props) {
  const { locale, t } = useLocale();
  const router = useRouter();
  const id = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>();
  const suggestions = useMemo(() => normalizeCountrySearch(query)
    ? rankCountryMatches(countries, query, locale, terms).slice(0, 6)
    : [], [countries, query, locale, terms]);
  const expanded = open && suggestions.length > 0;
  const selected = suggestions.findIndex(country => country.slug === active);

  function choose(slug: string) {
    setOpen(false);
    setActive(undefined);
    if (onSelect) onSelect(slug);
    else router.push(`/countries/${slug}`);
  }

  return (
    <div className="country-autocomplete" onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setOpen(false);
        setActive(undefined);
      }
    }}>
      <label htmlFor={id}>{t("Search countries")}</label>
      <div className="country-search-input">
        <span aria-hidden="true"><NavigationIcon name="search" width={19} height={19} /></span>
        <input id={id} type="search" role="combobox" autoComplete="off" spellCheck={false}
          maxLength={120} aria-autocomplete="list" aria-controls={expanded ? `${id}-options` : undefined}
          aria-expanded={expanded} aria-activedescendant={expanded && selected >= 0 ? `${id}-${suggestions[selected].slug}` : undefined}
          aria-describedby={`${id}-hint`} value={query} placeholder={t("Country, translated name or ISO code…")}
          onFocus={() => setOpen(true)} onClick={() => setOpen(true)}
          onChange={event => {
            onChange(event.target.value);
            setActive(undefined);
            setOpen(true);
          }}
          onKeyDown={event => {
            if (event.nativeEvent.isComposing) return;
            if (event.key === "Escape" && expanded) {
              event.preventDefault();
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
              if (selected >= 0 || onSelect) {
                event.preventDefault();
                choose(suggestions[Math.max(selected, 0)].slug);
              } else {
                setOpen(false);
              }
            }
          }}
        />
      </div>
      <span id={`${id}-hint`} className="sr-only">{t("Type a letter. Use arrow keys to choose a country and Enter to open it.")}</span>
      {expanded && <div className="country-suggestion-panel">
        <p>{t("Suggested countries")}</p>
        <ul id={`${id}-options`} role="listbox" aria-label={t("Suggested countries")}>
          {suggestions.map(country => (
            <li id={`${id}-${country.slug}`} key={country.slug} role="option" aria-selected={active === country.slug}
              onMouseDown={event => event.preventDefault()} onClick={() => choose(country.slug)} onMouseEnter={() => setActive(country.slug)}>
              <CountryFlag iso2={country.iso2} width={32} />
              <strong>{localizedCountryName(country, locale)}</strong>
              <small translate="no">{country.iso3}</small><span aria-hidden="true">{onSelect ? "+" : "↗"}</span>
            </li>
          ))}
        </ul>
      </div>}
      {onSelect && open && query.trim() && !suggestions.length && <p className="country-search-empty" role="status">{t("No countries match your search.")}</p>}
    </div>
  );
}

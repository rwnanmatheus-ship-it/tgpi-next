"use client";

import { useId, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/localization/LocaleProvider";
import { countrySuggestions, localizedCountryName, type SearchableCountry } from "@/lib/country-search";

type Props = { countries: (SearchableCountry & { emoji: string })[]; query: string; onChange: (value: string) => void };
export default function CountrySearchInput({ countries, query, onChange }: Props) {
  const { locale, t } = useLocale();
  const router = useRouter();
  const id = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const suggestions = useMemo(() => countrySuggestions(countries, query, locale), [countries, query, locale]);
  const expanded = open && suggestions.length > 0;
  const selected = active >= 0 && active < suggestions.length ? active : -1;
  function choose(slug: string) { setOpen(false); router.push(`/countries/${slug}`); }
  return <div className="country-autocomplete" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) { setOpen(false); setActive(-1); } }}>
    <label htmlFor={id}>{t("Search countries")}</label>
    <div className="country-search-input"><span aria-hidden="true">⌕</span><input id={id} type="search" role="combobox" autoComplete="off" spellCheck={false} aria-autocomplete="list" aria-controls={`${id}-options`} aria-expanded={expanded} aria-activedescendant={expanded && selected >= 0 ? `${id}-${suggestions[selected].slug}` : undefined} aria-describedby={`${id}-hint`} value={query} placeholder={t("Country, translated name or ISO code…")} onFocus={() => setOpen(true)} onChange={e => { onChange(e.target.value); setActive(-1); setOpen(true); }} onKeyDown={e => {
      if (e.nativeEvent.isComposing) return;
      if (e.key === "Escape") { setOpen(false); setActive(-1); }
      if (e.key === "ArrowDown" && suggestions.length) { e.preventDefault(); setOpen(true); setActive((selected + 1) % suggestions.length); }
      if (e.key === "ArrowUp" && suggestions.length) { e.preventDefault(); setOpen(true); setActive(selected <= 0 ? suggestions.length - 1 : selected - 1); }
      if (e.key === "Enter" && expanded && selected >= 0) { e.preventDefault(); choose(suggestions[selected].slug); }
    }} /></div>
    <span id={`${id}-hint`} className="sr-only">{t("Type a letter. Use arrow keys to choose a country and Enter to open it.")}</span>
    {expanded && <div className="country-suggestion-panel"><p>{t("Starts with your search")}</p><ul id={`${id}-options`} role="listbox" aria-label={t("Suggested countries")}>{suggestions.map((c, i) => <li id={`${id}-${c.slug}`} key={c.slug} role="option" aria-selected={selected === i} onMouseDown={e => e.preventDefault()} onClick={() => choose(c.slug)} onMouseEnter={() => setActive(i)}><span aria-hidden="true">{c.emoji}</span><strong>{localizedCountryName(c, locale)}</strong><small translate="no">{c.iso3}</small><span aria-hidden="true">↗</span></li>)}</ul></div>}
  </div>;
}

"use client";



import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";
import { useId, useState } from "react";
import { filterProfileOptions } from "@/lib/profile-options";

type Option = { label: string; value: string };
export default function ProfileSearchSelect({ value, options, onChange, label, allowCustom = false, placeholder = "Search or choose…" }: {
  value: string; options: readonly Option[]; onChange: (value: string) => void;
  label: string; allowCustom?: boolean; placeholder?: string;
}) {
  const id = useId();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const localizedOptions = options.map(option => ({ ...option, sourceLabel: option.label, label: t(option.label) }));
  const selected = localizedOptions.find(option => option.value === value)?.label ?? value;
  const filtered = filterProfileOptions(localizedOptions, query);
  const custom = allowCustom && query.trim() && !localizedOptions.some(option => [option.label, option.sourceLabel, option.value].some(text => text.toLowerCase() === query.trim().toLowerCase()));
  const choices = custom ? [...filtered, { label: t('Use “{value}”', { value: query.trim() }), value: query.trim().slice(0, 100) }] : filtered;
  function choose(next: string) { onChange(next); setOpen(false); setQuery(""); setActive(-1); }
  return <div className="relative" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { setOpen(false); setQuery(""); setActive(-1); } }}>
    <div className="relative">
      <input aria-label={t(label)} aria-autocomplete="list" aria-controls={`${id}-list`} aria-expanded={open} aria-activedescendant={open && active >= 0 && active < choices.length ? `${id}-${active}` : undefined} autoComplete="off" role="combobox" className="tgpi-account-input pr-12" value={open ? query : selected} maxLength={100} placeholder={selected || t(placeholder)}
        onFocus={() => { setOpen(true); setQuery(""); }} onChange={event => { setQuery(event.target.value); setOpen(true); setActive(-1); }}
        onKeyDown={event => {
          if (event.key === "Escape") { setOpen(false); setQuery(""); setActive(-1); }
          if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setOpen(true); setActive(index => Math.max(0, Math.min(choices.length - 1, index + (event.key === "ArrowDown" ? 1 : -1)))); }
          if (event.key === "Enter" && open) { event.preventDefault(); if (choices[active >= 0 ? active : 0]) choose(choices[active >= 0 ? active : 0].value); }
        }} />
      {value ? <button aria-label={t('Clear {field}', { field: t(label) })} className="absolute right-1 top-1 grid h-10 w-10 place-items-center rounded-lg text-[var(--tgpi-muted)] hover:bg-[#EEF2F5]" onClick={() => choose("")} type="button">×</button> : null}
    </div>
    {open ? <ul id={`${id}-list`} role="listbox" aria-label={t(label)} className="absolute z-40 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-[var(--tgpi-border)] bg-white p-1 shadow-[0_18px_40px_#0b1f3a26]">
      {choices.map((option, index) => <li id={`${id}-${index}`} key={option.value} role="option" aria-selected={option.value === value} className={`cursor-pointer rounded-xl px-3 py-3 text-sm font-semibold ${index === active || option.value === value ? "bg-[var(--tgpi-navy-raised)] text-white" : "text-[var(--tgpi-navy-raised)] hover:bg-[#EEF2F5]"}`} onPointerDown={event => event.preventDefault()} onClick={() => choose(option.value)}>{option.label}</li>)}
      {!choices.length ? <li className="p-3 text-sm text-[var(--tgpi-muted)]"><LocalizedText text={"No matching result. Try another spelling."} /></li> : null}
    </ul> : null}
  </div>;
}

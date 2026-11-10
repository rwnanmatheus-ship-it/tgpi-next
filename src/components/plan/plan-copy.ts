type Translate = (key: string, values?: Record<string, string | number>) => string;
/** Localize model-generated copy without translating freeform member input. */
export function planCopy(value: string, t: Translate, locale: string): string {
  const translated = t(value);
  if (translated !== value) return translated;
  const list = (text: string) => new Intl.ListFormat(locale, { style: 'short', type: 'conjunction' }).format(text.split(/, | & /).map(part => t(part.replace(/^& /, ''))));
  const patterns: [RegExp, (match: RegExpMatchArray) => string][] = [
    [/^(.+): evidence required$/, match => t('{priority}: evidence required', {priority:t(match[1])})],
    [/^Compare (.+) through the (.+) lens\.$/, match => t('Compare {countries} through the {goal} lens.', {countries:list(match[1]),goal:t(match[2])})],
    [/^Open the documentation checklist for (.+), (where you last saved a review|from your shortlist)\.$/, match => t('Open the documentation checklist for {country}.', {country:t(match[1])})],
    [/^Review your saved monthly estimate for (.+)\.$/, match => t('Review your saved monthly estimate for {country}.', {country:t(match[1])})],
    [/^Review monthly budget references for (.+)\.$/, match => t('Review monthly budget references for {countries}.', {countries:list(match[1])})],
    [/^Review the local monthly budget reference and cost breakdown for (.+)\.$/, match => t('Review the local budget and cost breakdown for {country}.', {country:t(match[1])})],
    [/^Build the language, decision and readiness skills that support your (.+) goal\.$/, () => t('Build practical skills that support your global goal.')],
    [/^Review ([^.]+)$/, match => t('Review {country}', {country:t(match[1])})],
  ];
  for (const [pattern, render] of patterns) { const match = value.match(pattern); if (match) return render(match); }
  return value.includes(', ') || value.includes(' & ') ? list(value) : value;
}

/** Historical titles retain their source meaning, including earlier course editions. */
export function planActivityCopy(value: string, t: Translate, locale: string): string {
  const patterns: [RegExp, string][] = [
    [/^(.+) learning path started$/, '{title} · Learning path started'],
    [/^(.+) progress updated$/, '{title} · Progress updated'],
    [/^(.+) document review completed$/, '{title} · Document review completed'],
    [/^(.+) document review updated$/, '{title} · Document review updated'],
    [/^(.+) monthly estimate saved$/, '{title} · Monthly estimate saved'],
    [/^(.+) completed$/, '{title} · Completed'],
  ];
  const comparison = value.match(/^(.+) comparison completed$/);
  if (comparison) return t('{title} · Comparison completed', { title: new Intl.ListFormat(locale, { type: 'conjunction' }).format(comparison[1].split(' vs ').map(name => t(name))) });
  const count = value.match(/^(\d+) countries compared$/);
  if (count) return t('{count} countries compared', { count: Number(count[1]) });
  for (const [pattern, key] of patterns) {
    const match = value.match(pattern);
    if (match) return t(key, { title: t(match[1]) });
  }
  return t(value);
}

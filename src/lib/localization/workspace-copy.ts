import type { WorkspaceResource } from '../workspace-control';
import type { ActivationActivity } from '../activation-progress';
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
    [/^(.+) saved to your shortlist$/, '{title} · Saved to your shortlist'],
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

export const workspaceKindLabels: Record<WorkspaceResource['kind'] | ActivationActivity['type'], string> = {
  country: 'Countries', saved_country: 'Countries', comparison: 'Comparisons',
  course: 'Learning', documents: 'Preparation', cost: 'Budget research',
};

/** Localize generated display copy while keeping saved resource IDs, routes and values intact. */
export function workspaceResourceCopy(resource: WorkspaceResource, t: Translate, locale: string): Pick<WorkspaceResource, 'title' | 'detail'> {
  let title = t(resource.title), detail = t(resource.detail);
  if (resource.kind === 'comparison') {
    const parts = resource.title.match(/^(.*?)( \(\+\d+\))?$/);
    if (parts) title = new Intl.ListFormat(locale, { type: 'conjunction' }).format(parts[1].split(' / ').map(name => t(name))) + (parts[2] ?? '');
    const goal = resource.detail.match(/^(overall|study|work|live|travel) comparison$/)?.[1];
    const goals: Record<string, string> = { overall: 'Personal research', study: 'Study abroad', work: 'International career', live: 'Long-term life', travel: 'Travel preparation' };
    if (goal) detail = t('{goal} comparison', { goal: t(goals[goal]) });
  } else if (resource.kind === 'documents') {
    const country = resource.title.match(/^(.+) preparation$/)?.[1];
    if (country) title = t('{country} preparation', { country: t(country) });
    const counts = resource.detail.match(/^(\d+) \/ (\d+) checklist items$/);
    if (counts) detail = t('{completed} / {total} checklist items', { completed: counts[1], total: counts[2] });
  } else if (resource.kind === 'course') {
    const practice = resource.detail.match(/^(\d+) \/ (\d+) practice records$/);
    if (practice) detail = t('{done} of {total} practice records', { done: practice[1], total: practice[2] }) + (resource.statusLabel ? ` · ${t(resource.statusLabel)}` : '');
    const counts = resource.detail.match(/^(\d+) \/ (\d+) lessons · (Completed|In progress)$/);
    if (counts) detail = t('{completed} / {total} lessons · {status}', { completed: counts[1], total: counts[2], status: t(resource.statusLabel ?? counts[3]) });
  }
  return { title, detail };
}

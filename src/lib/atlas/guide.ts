import identityData from '@/data/intelligence/identities.json';
import { comparisonPath } from '../comparison-state';
import { getNextSuperAppModule, SUPER_APP_MODULES } from '../super-app';
import type { Locale } from '../localization/config';
import { translate } from '../localization/messages';
import { guideCompareNone, guideCompareOne, guideFallback, guideLearningProject, guideText, guideTopics, type GuideTopic } from './guide-copy';
import type { AtlasNavigationContext } from './navigation-context';

export type GuideResource = { href: string; label: string; literal?: boolean };
export type GuideMemory = { topic: GuideTopic; countries: string[]; goal?: string };

const matchers: readonly [GuideTopic, RegExp][] = [
  ['global-key', /\b(global id|id global|global key|integrity chain|cadeia de integridade)\b/],
  ['credentials', /\b(certific[a-z]*|credential[a-z]*|credencial[a-z]*|zertifikat[a-z]*|attestation[a-z]*)\b/],
  ['intelligence', /\b(fontes?|sources?|fuentes?|fonti|quellen|methodolog[a-z]*|metodolog[a-z]*|methodik|reference year|ano de referencia|collection date)\b/],
  ['documents', /\b(document[a-z]*|dokument[a-z]*|vistos?|visas?|visum|passport[a-z]*|passaport[a-z]*|passeport[a-z]*|pasaport[a-z]*|apostill[a-z]*|apostil[a-z]*)\b/],
  ['compare', /\b(compar[a-z]*|vergleichen|vergleich|confront[a-z]*|versus|vs)\b/],
  ['country-fit', /\b(country fit|shortlist|passende lander|kombinam com|acordes a|adaptees a|adatte ai|melhor pais|best country)\b/],
  ['premium', /\b(premium|billing|cobranca|assinatura|subscription|abonnement|fatturazione|precos|pricing|preise|tarif[a-z]*)\b/],
  ['settings', /\b(privacidade|privacy|privacidad|confidentialite|datenschutz|seguranca da conta|account security|configurac[a-z]*|einstellungen|impostazioni|notificac[a-z]*|notification[a-z]*)\b/],
  ['language', /\b(idioma[s]?|language[s]?|lingua[s]?|langue[s]?|sprach[a-z]*|ingles|english|frances|mandarim|mandarin)\b/],
  ['learning', /\b(estud[a-z]*|study|learning|aprend[a-z]*|cursos?|courses?|studier[a-z]*|studium|etudi[a-z]*|corsi|studia[a-z]*)\b/],
  ['workspace', /\b(workspace|dashboard|espaco de trabalho|espacio de trabajo|espace de travail|arbeitsbereich|spazio di lavoro|meu progresso|my progress)\b/],
  ['community', /\b(comunidade|comunidad|community|communaute|comunita|discuss[a-z]*)\b/],
  ['plan', /\b(plan[a-z]*|mudar|mudanca|mudanza|move abroad|moving|umzug|trasferi[a-z]*|demena[a-z]*|custo[s]?|budget|orcamento|presupuesto|haushalt|bilancio)\b/],
  ['countries', /\b(pais|paises|countries|country|destino[s]?|destination[s]?|lander|destinazion[a-z]*|paese|paesi)\b/],
];

const routes = new Map(SUPER_APP_MODULES.map(module => [module.id, module]));
const identities = new Map(identityData.countries.map(country => [country.slug, country]));
const nameCache = new Map<Locale, Map<string, string>>();
const aliases: Record<string, string> = {
  eua: 'united-states', usa: 'united-states', 'united states of america': 'united-states',
  uk: 'united-kingdom', 'reino unido': 'united-kingdom', 'gran bretana': 'united-kingdom',
  uae: 'united-arab-emirates', eau: 'united-arab-emirates', 'coreia do sul': 'south-korea',
};

export const normalizeAtlasText = (value: string) =>
  value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

function findCountries(text: string, locale: Locale) {
  let names = nameCache.get(locale);
  if (!names) {
    names = new Map(Object.entries(aliases));
    const labels = [...new Set([locale, 'en', 'pt-BR'])].map(lang => new Intl.DisplayNames(lang, { type: 'region' }));
    for (const country of identities.values()) {
      for (const label of [country.name, country.slug, ...labels.map(list => list.of(country.iso2) ?? '')]) {
        const normalized = normalizeAtlasText(label);
        if (normalized.length >= 3 && !names.has(normalized)) names.set(normalized, country.slug);
      }
    }
    nameCache.set(locale, names);
  }
  const padded = ` ${text} `;
  const matches = Array.from(names, ([label, slug]) => ({ start: padded.indexOf(` ${label} `), label, slug }))
    .filter(hit => hit.start >= 0)
    .sort((a, b) => a.start - b.start || b.label.length - a.label.length);
  let end = -1;
  const found = new Set<string>();
  for (const hit of matches) {
    if (hit.start < end || !identities.has(hit.slug)) continue;
    found.add(hit.slug);
    end = hit.start + hit.label.length + 1;
  }
  return [...found].slice(0, 8);
}

function countryName(slug: string, locale: Locale) {
  const country = identities.get(slug);
  return country ? new Intl.DisplayNames(locale, { type: 'region' }).of(country.iso2) ?? country.name : slug;
}

function goalFor(text: string) {
  if (/\b(trabalho|work|trabajo|travail|arbeit|lavoro)\b/.test(text)) return 'work';
  if (/\b(estudo|study|estudio|etudes|studium|studio)\b/.test(text)) return 'study';
  if (/\b(morar|viver|live|vivir|vivre|leben|vivere)\b/.test(text)) return 'live';
  if (/\b(viagem|travel|viaje|voyage|reise|viaggio)\b/.test(text)) return 'travel';
}

export function guideResource(topic: GuideTopic): GuideResource {
  if (topic === 'community') return { href: '/community', label: 'Community' };
  if (topic === 'premium') return { href: '/pricing', label: 'Plans & pricing' };
  const destination = routes.get(topic === 'language' ? 'learning' : topic);
  if (!destination) return { href: '/profile', label: 'Workspace' };
  return { href: destination.href, label: destination.shortLabel };
}

export function nextAtlasTopic(topic: GuideTopic): GuideTopic {
  if (topic === 'community' || topic === 'premium') return 'workspace';
  const next = getNextSuperAppModule(topic === 'language' ? 'learning' : topic).id;
  return next === 'atlas' ? 'plan' : next;
}

export function answerAtlasGuide({
  question, locale, previous, context, topic: explicitTopic,
}: {
  question: string; locale: Locale; previous?: GuideMemory; context?: AtlasNavigationContext; topic?: GuideTopic;
}) {
  const text = normalizeAtlasText(question);
  const mentions = findCountries(text, locale);
  const followUp = /^(and|e|y|et|und|what about|e se|y si|et si|was ist mit|e per)\b/.test(text) || text.split(' ').length <= 4;
  const matched = matchers.find(([, pattern]) => pattern.test(text))?.[0];
  const priorCompare = previous?.topic === 'compare' && mentions.length > 0 && mentions.length < 2 && (!matched || matched === 'countries');
  const topic = explicitTopic ?? (priorCompare ? 'compare' : matched) ?? (mentions.length >= 2 ? 'compare' : undefined)
    ?? (followUp ? previous?.topic : undefined) ?? (mentions.length ? 'countries' : undefined);
  if (!topic) return { content: guideText(guideFallback, locale), resources: [] };
  const previousCountries = (previous?.topic === topic || priorCompare) && (followUp || mentions.length < 2) ? previous?.countries ?? [] : [];
  const contextCountry = context?.country && identities.has(context.country) ? [context.country] : [];
  const countries = [...new Set([
    ...(topic === 'compare' && mentions.length >= 2 ? [] : previousCountries),
    ...mentions,
    ...(mentions.length ? [] : contextCountry),
  ])].slice(0, 8);
  const goal = goalFor(text) ?? (previous?.topic === topic ? previous.goal : undefined);
  let content = guideText(guideTopics[topic].answer, locale);
  const resources = [guideResource(topic)];

  if (topic === 'compare') {
    if (countries.length >= 2) resources[0].href = comparisonPath(countries, goal ?? 'overall');
    else content = countries.length ? guideText(guideCompareOne, locale).replace('{country}', countryName(countries[0], locale)) : guideText(guideCompareNone, locale);
  }
  if (topic === 'learning' && context?.learningCourse) {
    const { id, title, projectBrief } = context.learningCourse;
    resources.unshift({ href: `/courses/${id}/study`, label: title });
    if (projectBrief) content = `${translate(locale, projectBrief)}\n\n${guideText(guideLearningProject, locale)}`;
  }
  if (topic === 'credentials') resources.push({ href: '/verify', label: 'Verify' });
  if (topic === 'documents' || topic === 'compare' || topic === 'countries' || topic === 'plan') {
    resources.push(...countries.slice(0, 3).map(slug => ({ href: `/countries/${slug}`, label: countryName(slug, locale), literal: true })));
  }
  if (topic === 'country-fit') resources.push(guideResource('compare'));

  return { content, resources, memory: { topic, countries, goal } satisfies GuideMemory };
}

export function atlasFirstName(value: string | null | undefined) {
  return value?.replace(/[\p{C}]/gu, '').trim().split(/\s+/u)[0]?.slice(0, 40) || '';
}

export function estimateAtlasBudget(monthly: number, initial: number, months: number, reserve: number) {
  if (![monthly, initial].every(amount => Number.isFinite(amount) && amount >= 0 && amount <= 10_000_000)
    || !Number.isInteger(months) || months < 1 || months > 60
    || !Number.isFinite(reserve) || reserve < 0 || reserve > 100) return null;
  return Math.round((monthly * months + initial) * (100 + reserve)) / 100;
}

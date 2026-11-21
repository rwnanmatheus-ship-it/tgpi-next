import { courseRegions } from './course-regions.ts';
import type { CourseOverview } from '../../types/course-overview';

export const normalizeCourseSearch = (value: string) => value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('en').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const concepts = [
  ['english','ingles','anglais','englisch','inglese'],
  ['spanish','espanhol','espanol','espagnol','spanisch','spagnolo'],
  ['french','frances','francais','franzosisch','francese'],
  ['german','alemao','aleman','allemand','deutsch','tedesco'],
  ['mandarin','mandarim','mandarinchinesisch','mandarino','chinese','chines'],
  ['programming','programacao','programacion','programmation','programmierung','programmazione'],
  ['business','negocios','negocio','affaires','geschaft','affari'], ['career','carreira','carrera','carriere','karriere','carriera'],
  ['budget','orcamento','presupuesto','bilancio'], ['ai','ia','inteligencia artificial','artificial intelligence'],
  ['spreadsheets','planilhas','excel','tableur','tabellen'], ['data','dados','datos','donnees','daten','dati'],
  ['security','seguranca','seguridad','securite','sicherheit','sicurezza'], ['housing','moradia','vivienda','logement','wohnung','alloggio'],
  ['health','saude','salud','sante','gesundheit','salute'],
  ['energy','energia','energie'], ['africa','afrique','afrika'], ['asia','asie','asien'], ['oceania','oceanie','ozeanien'],
  ['north','norte','nord'], ['south','sul','sur','sud'], ['america','amerique','amerika'], ['logistics','logistica','logistique','logistik'],
  ['quality','qualidade','calidad','qualite','qualitat','qualita'],
  ['batteries','battery','baterias','bateria','batterie'],
  ['manufacturing','manufatura','manufactura','fabrication','fertigung','produzione'],
  ['accessibility','acessibilidade','accesibilidad','accessibilite','barrierefreiheit','accessibilita'],
  ['operations','operacoes','operaciones','betrieb','operazioni'],
  ['remote','remoto','distancia','distance'], ['abroad','exterior','extranjero','etranger','ausland','estero'],
];
const stopWords = new Set(['a','o','os','as','um','uma','de','do','da','dos','das','em','no','na','para','por','com','e','the','of','for','in','to','and','with','el','la','los','las','un','una','en','y','le','les','des','du','pour','et','der','die','das','und','fur','il','lo','gli','per','di','curso','cursos','course','courses','aprender','learn','quero','want','cursar']);
function nearWord(a: string, b: string): boolean {
  if (a.length < 4 || Math.abs(a.length - b.length) > 1) return false;
  if (a.length === b.length) {
    const differences = [...a].flatMap((letter, index) => letter !== b[index] ? [index] : []);
    if (differences.length === 2) {
      const [first, second] = differences;
      if (second === first + 1 && a[first] === b[second] && a[second] === b[first]) return true;
    }
  }
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length >= b.length) i++;
    if (b.length >= a.length) j++;
  }
  return edits + Number(i < a.length || j < b.length) <= 1;
}
export function courseSearchScore(course: CourseOverview, query: string, translate: (text: string) => string = text => text): number {
  let q = normalizeCourseSearch(query).slice(0, 160);
  for (const group of concepts) {
    for (const phrase of group.filter(value => value.includes(' '))) {
      q = ` ${q} `.replaceAll(` ${phrase} `, ` ${group[0]} `).trim();
    }
  }
  if (!q) return 1;
  const title = normalizeCourseSearch(`${translate(course.title)} ${course.title}`);
  const content = normalizeCourseSearch([course.desc, course.category, course.series ?? '', course.goalLabel, ...course.benefits, course.marketRegion ? courseRegions.find(([id]) => id === course.marketRegion)?.[1] ?? '' : ''].flatMap(text => [text, translate(text)]).join(' '));
  const words = title.split(' ');
  let score = title.startsWith(q) ? 100 : title.includes(q) ? 60 : 0;
  // Ignore connector words only when there is a meaningful query token.
  const rawTokens = q.split(' ');
  const meaningful = rawTokens.filter(token => !stopWords.has(token));
  const tokens = meaningful.length ? meaningful : rawTokens;
  for (const token of tokens) {
    const alternatives = concepts.find(group => group.includes(token)) ?? [token];
    if (words.includes(token)) score += 18;
    else if (words.some(word => word.startsWith(token))) score += 14;
    else if (alternatives.some(word => (` ${title} `).includes(` ${word} `))) score += 10;
    else if (alternatives.some(word => content.split(' ').some(part => word.length < 3 ? part === word : part.startsWith(word)))) score += 4;
    else if (words.some(word => nearWord(token, word))) score += 2;
    else return 0;
  }
  return score;
}
export function courseMinutes(duration: string): number {
  const hours = Number(duration.match(/(\d+)\s*h/)?.[1] ?? 0), minutes = Number(duration.match(/(\d+)\s*m/)?.[1] ?? 0);
  return hours * 60 + minutes;
}
export function studyWeeks(minutes: number, weeklyMinutes: number): number {
  return Math.max(1, Math.ceil(minutes / Math.max(30, weeklyMinutes)));
}

/** Use the listbox endpoints when no suggestion is selected yet. */
export function moveCourseSuggestion(previous: number, count: number, key: 'ArrowUp' | 'ArrowDown') {
  if (count === 0) return -1;
  const backwards = key === 'ArrowUp';
  if (previous < 0 || previous >= count) return backwards ? count - 1 : 0;
  return (previous + (backwards ? -1 : 1) + count) % count;
}

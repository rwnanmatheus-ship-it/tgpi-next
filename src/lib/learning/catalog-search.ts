import type { CourseOverview } from '../../types/course-overview';

export const normalizeCourseSearch = (value: string) => value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('en').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const concepts = [
  ['english','ingles','anglais','englisch','inglese'], ['career','carreira','carrera','carriere','karriere','carriera'],
  ['budget','orcamento','presupuesto','bilancio'], ['ai','ia','inteligencia artificial','artificial intelligence'],
  ['spreadsheets','planilhas','excel','tableur','tabellen'], ['data','dados','datos','donnees','daten','dati'],
  ['security','seguranca','seguridad','securite','sicherheit','sicurezza'], ['housing','moradia','vivienda','logement','wohnung','alloggio'],
  ['remote','remoto','distancia','distance'], ['abroad','exterior','extranjero','etranger','ausland','estero'],
];
function nearWord(a: string, b: string): boolean {
  if (a.length < 4 || Math.abs(a.length - b.length) > 1) return false;
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
  const q = normalizeCourseSearch(query).slice(0, 160);
  if (!q) return 1;
  const title = normalizeCourseSearch(`${translate(course.title)} ${course.title}`);
  const content = normalizeCourseSearch([course.desc, course.category, course.series ?? '', course.goalLabel, ...course.benefits].flatMap(text => [text, translate(text)]).join(' '));
  const words = title.split(' ');
  let score = title.startsWith(q) ? 100 : title.includes(q) ? 60 : 0;
  for (const token of q.split(' ')) {
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

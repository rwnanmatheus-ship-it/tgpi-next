import type { Locale } from './config';

type CatalogCopy = { title: string; eyebrow: string; searchIdeas: string; longest: string; removeFilter: string; collection: string };
const copy: Record<Locale, CatalogCopy> = {
  en: { title: 'Knowledge opens new worlds.', eyebrow: 'The Global Polymath Institute · Course catalogue', searchIdeas: 'Explore:', longest: 'Longest workload', removeFilter: 'Remove filter', collection: 'Practical learning. Global perspective.' },
  'pt-BR': { title: 'O conhecimento abre novos mundos.', eyebrow: 'The Global Polymath Institute · Catálogo acadêmico', searchIdeas: 'Explore:', longest: 'Maior carga horária', removeFilter: 'Remover filtro', collection: 'Aprendizado prático. Perspectiva global.' },
  es: { title: 'El conocimiento abre nuevos mundos.', eyebrow: 'The Global Polymath Institute · Catálogo académico', searchIdeas: 'Explora:', longest: 'Mayor carga horaria', removeFilter: 'Eliminar filtro', collection: 'Aprendizaje práctico. Perspectiva global.' },
  fr: { title: 'Le savoir ouvre de nouveaux mondes.', eyebrow: 'The Global Polymath Institute · Catalogue de cours', searchIdeas: 'Explorez :', longest: 'Durée la plus longue', removeFilter: 'Retirer le filtre', collection: 'Apprentissage pratique. Perspective mondiale.' },
  de: { title: 'Wissen eröffnet neue Welten.', eyebrow: 'The Global Polymath Institute · Kurskatalog', searchIdeas: 'Entdecken:', longest: 'Längster Lernumfang', removeFilter: 'Filter entfernen', collection: 'Praktisches Lernen. Globale Perspektive.' },
  it: { title: 'Il sapere apre nuovi mondi.', eyebrow: 'The Global Polymath Institute · Catalogo dei corsi', searchIdeas: 'Esplora:', longest: 'Durata maggiore', removeFilter: 'Rimuovi filtro', collection: 'Apprendimento pratico. Prospettiva globale.' },
};
export const catalogCopy = (locale: Locale): CatalogCopy => copy[locale];

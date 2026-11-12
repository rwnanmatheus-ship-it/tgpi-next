/** Approved illustrative artwork. Never evidence, a real campus, or a user photograph. */
export const cinematicKeys = ["global-horizon","learning-atelier","country-research","documents-preparation","workspace-focus","community-conversation","premium-library","arrival-city","housing-abroad","budget-planning","evidence-research","global-economy","ai-workflow","english-dialogue","spreadsheets","international-career","data-analysis","project-management","international-marketing","digital-security","python-automation","communication-negotiation","remote-work","study-abroad","atlas-intelligence","decision-comparison","community-global-exchange","global-documents-precision","learning-achievement","workspace-global-focus","workspace-observatory","documents-command","documents-folios"] as const;
export type CinematicKey = typeof cinematicKeys[number];
export const cinematicWidths = [480, 800, 1200, 1600] as const;
export function cinematicUrl(key: CinematicKey, width: typeof cinematicWidths[number] = 1600, format: 'webp' | 'avif' = 'webp') {
  return `/images/cinematic-2026/${key}-${width}.${format}`;
}
export function cinematicSrcSet(key: CinematicKey, format: 'webp' | 'avif') {
  return cinematicWidths.map(width => `${cinematicUrl(key, width, format)} ${width}w`).join(', ');
}

export function cinematicKeyFromUrl(url: string): CinematicKey | undefined {
  const key = url.match(/^\/images\/cinematic-2026\/([a-z-]+)-\d+\.(?:avif|webp)$/)?.[1];
  return cinematicKeys.find(value => value === key);
}

/** One asset contract shared by catalog, detail, study and dashboard. */
export const courseArtworkKeys: Record<string, CinematicKey> = {
  'ia-trabalho-global': 'ai-workflow',
  'ingles-carreira-internacional': 'english-dialogue',
  'planilhas-decisoes-profissionais': 'spreadsheets',
  'carreira-internacional-profissional': 'international-career',
  'analise-dados-power-bi-ia': 'data-analysis',
  'gestao-projetos-equipes-globais': 'project-management',
  'marketing-mercados-internacionais': 'international-marketing',
  'ciberseguranca-vida-trabalho': 'digital-security',
  'python-automacao-profissionais': 'python-automation',
  'comunicacao-negociacao-pensamento-critico': 'communication-negotiation',
  'country-fit': 'country-research',
  'relocation-budget': 'budget-planning',
  'international-career': 'international-career',
  'global-english-2026': 'english-dialogue',
  'critical-thinking': 'evidence-research',
  'technology-future': 'ai-workflow',
  'global-economics': 'global-economy',
  'arrival-playbook': 'arrival-city',
  'housing-abroad': 'housing-abroad',
  'cross-cultural-confidence': 'community-conversation',
  'digital-safety-abroad': 'digital-security',
  'career-networking': 'international-career',
  'remote-work-systems': 'remote-work',
  'evidence-literacy': 'evidence-research',
  'ai-workflow-foundations': 'ai-workflow',
  'cost-of-living-lab': 'budget-planning',
  'study-abroad-planning': 'study-abroad',
};

/** Distinct 2026 course covers replace shared category artwork. */
export const distinctCourseArtwork = ["career-networking", "ingles-carreira-internacional", "cost-of-living-lab", "technology-future", "ai-workflow-foundations", "critical-thinking", "digital-safety-abroad", "carreira-internacional-profissional",
  "primeiros-socorros-rcp-dea", "preparacao-desastres", "ingles-emergencias",
  "primeiros-socorros-pediatricos", "controle-hemorragias", "primeiros-socorros-psicologicos",
] as const;

export function courseArtwork(id: string, fallback?: string) {
  if ((distinctCourseArtwork as readonly string[]).includes(id)) return `/images/courses/learning-2026/${id}.webp`;
  const key = courseArtworkKeys[id];
  return key ? cinematicUrl(key) : fallback ?? cinematicUrl('learning-atelier');
}


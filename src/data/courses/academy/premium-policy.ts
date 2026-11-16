const freeAcademyCourses = new Set([
  'global-english-2026',
  'country-fit',
  'arrival-playbook',
  'cross-cultural-confidence',
  'evidence-literacy',
  'digital-safety-abroad',
  'ai-workflow-foundations',
  'primeiros-socorros-rcp-dea',
  'preparacao-desastres',
  'ingles-emergencias',
  'primeiros-socorros-pediatricos',
  'controle-hemorragias',
  'primeiros-socorros-psicologicos',
]);

export function isPremiumAcademyCourse(id: string) {
  return !freeAcademyCourses.has(id === 'english-abroad' ? 'global-english-2026' : id);
}

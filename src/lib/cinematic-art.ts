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

const academyCourseBadges: Readonly<Record<string, readonly string[]>> = {
  'country-fit': ['COUNTRY FIT'],
  'relocation-budget': ['MUDANÇA'],
  'arrival-playbook': ['CHEGADA'],
  'housing-abroad': ['MORADIA'],
  'cross-cultural-confidence': ['CULTURA'],
  'cost-of-living-lab': ['CUSTO DE VIDA'],
  'study-abroad-planning': ['ESTUDO NO EXTERIOR'],
  'international-career': ['CARREIRA GLOBAL'],
  'career-networking': ['NETWORKING'],
  'remote-work-systems': ['TRABALHO REMOTO'],
  'carreira-internacional-profissional': ['CARREIRA INTERNACIONAL'],
  'gestao-projetos-equipes-globais': ['GESTÃO DE PROJETOS'],
  'marketing-mercados-internacionais': ['MARKETING GLOBAL'],
  'comunicacao-negociacao-pensamento-critico': ['COMUNICAÇÃO'],
  'digital-safety-abroad': ['SEGURANÇA EM VIAGEM'],
  'evidence-literacy': ['EVIDÊNCIAS'],
  'ai-workflow-foundations': ['FLUXOS COM IA'],
  'ia-trabalho-global': ['IA APLICADA'],
  'planilhas-decisoes-profissionais': ['Excel', 'Google Sheets'],
  'analise-dados-power-bi-ia': ['Power BI', 'IA'],
  'ciberseguranca-vida-trabalho': ['CIBERSEGURANÇA'],
  'python-automacao-profissionais': ['Python'],
  'global-english-2026': ['EN · A2–B1'],
  'ingles-carreira-internacional': ['EN · CARREIRA'],
  'critical-thinking': ['PENSAMENTO CRÍTICO'],
  'technology-future': ['FUTURO DO TRABALHO'],
  'global-economics': ['ECONOMIA GLOBAL'],
  'primeiros-socorros-rcp-dea': ['RCP + DEA · TEORIA'],
  'preparacao-desastres': ['PREPARAÇÃO PARA DESASTRES'],
  'ingles-emergencias': ['EN · EMERGÊNCIAS'],
  'primeiros-socorros-pediatricos': ['PEDIÁTRICOS · TEORIA'],
  'controle-hemorragias': ['HEMORRAGIAS · TEORIA'],
  'primeiros-socorros-psicologicos': ['APOIO PSICOLÓGICO'],
  'avaliacao-produtos-ia': ['IA · AVALIAÇÃO'],
  'rag-acervos-verificaveis': ['RAG'],
  'sql-produto-dados': ['SQL'],
  'engenharia-dados-confiaveis': ['PIPELINES'],
  'ml-aplicado-previsao': ['MACHINE LEARNING'],
  'arquitetura-cloud-finops': ['Cloud + FinOps'],
  'governanca-ia-operacional': ['IA · GOVERNANÇA'],
  'observabilidade-servicos-digitais': ['OBSERVABILIDADE'],
  'privacidade-dados-produto': ['PRIVACIDADE'],
  'acessibilidade-engenharia-web': ['ACESSIBILIDADE WEB'],
  'previsao-probabilistica': ['PROBABILIDADE'],
  'inferencia-causal-negocios': ['CAUSALIDADE'],
  'decisao-multicriterio-avancada': ['MULTICRITÉRIO'],
  'analise-cenarios-futuros': ['CENÁRIOS'],
  'negociacao-multipartes': ['NEGOCIAÇÃO'],
  'pesquisa-usuarios-servicos': ['PESQUISA COM USUÁRIOS'],
  'analise-falhas-pos-incidente': ['PÓS-INCIDENTE'],
  'sintese-evidencias-academicas': ['SÍNTESE DE EVIDÊNCIAS'],
  'analise-risco-portfolios': ['RISCO OPERACIONAL'],
  'redacao-executiva-dados': ['STORYTELLING DE DADOS'],
  'ingles-escrita-executiva-b2': ['EN · B2'],
  'ingles-reunioes-c1': ['EN · C1'],
  'espanhol-negocios-latam': ['ES · B1–B2'],
  'frances-mobilidade-b1': ['FR · B1'],
  'alemao-mobilidade-a2': ['DE · A2'],
  'mandarim-negocios-iniciante': ['ZH · INICIAL'],
  'escrita-academica-ingles': ['EN · ACADÊMICO'],
  'candidatura-pos-eua-europa': ['PÓS-GRADUAÇÃO'],
  'credenciais-documentos-internacionais': ['DOCUMENTOS'],
  'lideranca-intercultural-remota': ['LIDERANÇA REMOTA'],
  'fpa-caixa-forecast': ['FP&A'],
  'demonstracoes-financeiras-decisoes': ['ANÁLISE FINANCEIRA'],
  'unit-economics-saas': ['SaaS · UNIT ECONOMICS'],
  'pricing-internacional': ['PRICING'],
  'compras-globais-fornecedores': ['COMPRAS GLOBAIS'],
  'cadeia-suprimentos-resiliencia': ['SUPPLY CHAIN'],
  'pesquisa-entrada-mercado': ['ENTRADA EM MERCADOS'],
  'cambio-economico-empresas': ['CÂMBIO'],
  'orcamento-capital-cenarios': ['ORÇAMENTO DE CAPITAL'],
  'compensacao-total-global': ['COMPENSAÇÃO GLOBAL'],
  'continuidade-negocios-desastres': ['CONTINUIDADE'],
  'evacuacao-acessivel-planos': ['EVACUAÇÃO ACESSÍVEL'],
  'comunicacao-crise-alertas': ['ALERTAS DE CRISE'],
  'exercicios-mesa-incidentes': ['EXERCÍCIO DE MESA'],
  'resiliencia-ondas-calor': ['ONDAS DE CALOR'],
  'preparacao-alagamentos-comunidades': ['ALAGAMENTOS'],
  'deslocamento-crises-viagem': ['VIAGEM EM CRISE'],
  'abrigos-logistica-acessivel': ['LOGÍSTICA DE ABRIGOS'],
  'resiliencia-energia-telecom': ['ENERGIA + TELECOM'],
  'voluntariado-coordenacao-desastres': ['VOLUNTARIADO'],
};

export const academyCoverIds = Object.keys(academyCourseBadges);

export function courseCoverBadges(id: string): readonly string[] | undefined {
  return Object.hasOwn(academyCourseBadges, id) ? academyCourseBadges[id] : undefined;
}

export function courseArtwork(id: string, fallback?: string) {
  if (courseCoverBadges(id)) return `/images/courses/academy-covers-2026/${id}.webp`;
  if ((distinctCourseArtwork as readonly string[]).includes(id)) return `/images/courses/learning-2026/${id}.webp`;
  const key = courseArtworkKeys[id];
  return key ? cinematicUrl(key) : fallback ?? cinematicUrl('learning-atelier');
}


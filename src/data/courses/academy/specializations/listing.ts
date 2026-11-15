import type { CourseGoal, CourseOverview } from '@/types/course-overview';
import { PREMIUM_SPECIALIZATIONS_SERIES } from '@/lib/learning/catalog-filters';
import { courseArtwork } from '@/lib/cinematic-art';

type Specialization = readonly [
  id: string, goal: CourseGoal, title: string, hours: number, description: string,
  prerequisite: string,
];

const technology = 'future-of-work';
const decisions = 'decision-intelligence';
const economics = 'global-economics';
const mobility = 'global-mobility';

export const specializations = [
  ['experimentos-produto', decisions, 'Experimentação A/B e Growth de Produto', 30, 'Planeje testes controlados e defenda decisões usando intervalos, métricas de proteção e auditoria da alocação.', 'Estatística descritiva e funis de produto.'],
  ['bi-metricas', technology, 'Camada Semântica e Governança de Métricas em BI', 28, 'Publique definições de métricas reutilizáveis com reconciliação, segurança por região e gestão de mudanças.', 'BI intermediário e SQL básico.'],
  ['mlops-producao', technology, 'MLOps: Modelos em Produção e Monitoramento', 34, 'Versione modelos, valide paridade, monitore sinal de deriva e simule promoção e reversão.', 'Python e avaliação de modelos.'],
  ['process-mining', decisions, 'Process Mining e Melhoria de Operações', 28, 'Reconstrua trajetórias a partir de eventos, identifique gargalos e teste melhorias com dados operacionais.', 'Planilhas e estatística descritiva.'],
  ['qa-produtos-globais', technology, 'Engenharia de Qualidade e Testes de Produtos Globais', 30, 'Estruture uma suíte de qualidade com casos por risco, contratos, testes determinísticos e critérios de liberação.', 'Familiaridade com aplicações web e Git.'],
  ['engenharia-localizacao', mobility, 'Engenharia de Localização para Produtos Multilíngues', 30, 'Projete fluxo de tradução, regras de plural, formatos locais e testes para lançamentos multilíngues.', 'HTML e noções de JavaScript.'],
  ['apis-integracoes', technology, 'Design de APIs e Integrações Confiáveis', 32, 'Modele uma API com OpenAPI e demonstre compatibilidade, idempotência e reconciliação em ambiente simulado.', 'HTTP, JSON e lógica de programação.'],
  ['governanca-identidade-cloud', technology, 'Governança de Identidade e Acesso em Cloud', 30, 'Defina acessos por função, revisão de privilégios e trilhas de auditoria para ambientes corporativos.', 'Fundamentos de serviços em nuvem.'],
  ['operacoes-saude', decisions, 'Operações em Saúde e Analytics de Serviços', 28, 'Analise filas administrativas, capacidade e acesso para propor melhorias mensuráveis em serviços de saúde.', 'Planilhas e leitura de indicadores.'],
  ['design-instrucional', mobility, 'Design Instrucional para Capacitação Corporativa', 28, 'Transforme lacunas de desempenho em aprendizagem acessível com prática, avaliação e transferência ao trabalho.', 'Experiência com treinamento, supervisão ou criação de materiais.'],
  ['customer-success-global', economics, 'Customer Success e Onboarding Internacional B2B', 26, 'Defina marcos de adoção, playbooks de risco e planos de expansão baseados em valor demonstrado.', 'Fundamentos de atendimento ou operações B2B.'],
  ['revops-receita', economics, 'Revenue Operations: CRM, Pipeline e Receita', 28, 'Organize o funil de receita com contratos de dados, previsões auditáveis e handoffs entre equipes.', 'Planilhas e fundamentos de vendas B2B.'],
  ['exportacao-ecommerce', economics, 'Operações de E-commerce e Exportação aos EUA', 30, 'Simule o fluxo de exportação com registro de requisitos, custo entregue, rastreio e devoluções.', 'Fundamentos de comércio eletrônico e planilhas.'],
  ['operacoes-carbono', economics, 'Contabilidade de Carbono e Decisões Operacionais', 30, 'Monte um inventário simulado de emissões com limites, fatores rastreáveis e cenários de redução.', 'Planilhas e conversão de unidades.'],
  ['tesouraria-pagamentos', economics, 'Tesouraria e Reconciliação de Pagamentos Globais', 30, 'Reconcilie cobranças, liquidações, comissões e estornos em múltiplas moedas com controles de fechamento.', 'Lógica contábil básica e planilhas.'],
  ['workforce-planning', decisions, 'Workforce Planning e Capacidade de Equipes Globais', 28, 'Converta demanda em cobertura por horário e competência e compare escalas com critérios de serviço e equidade.', 'Planilhas e noções de planejamento operacional.'],
  ['pesquisa-geoespacial', decisions, 'Inteligência Geoespacial para Decisões de Localização', 32, 'Combine dados abertos e análise de acessibilidade para recomendar localizações com incerteza documentada.', 'Análise de dados básica. QGIS ou ferramenta equivalente.'],
] as const satisfies readonly Specialization[];

export type SpecializationId = typeof specializations[number][0];
export const specializationLabCount = 6;
const specializationGoals: Record<typeof specializations[number][1], string> = {
  [technology]: 'Tecnologia e adaptabilidade',
  [decisions]: 'Inteligência de decisão',
  [economics]: 'Economia e oportunidades',
  [mobility]: 'Idiomas e mobilidade',
};

const specializationIds: ReadonlySet<string> = new Set(specializations.map(([id]) => id));
export const isSpecialization = (id: string) => specializationIds.has(id);

export const specializationOverview: CourseOverview[] = specializations.map(([id, goal, title, hours, desc, audience]):
  CourseOverview => ({
  id, goal, title, desc, series: PREMIUM_SPECIALIZATIONS_SERIES, category: specializationGoals[goal], goalLabel: specializationGoals[goal],
  duration: `${hours}h`, audience: `Preparação recomendada: ${audience}`, benefits: [],
  format: 'Laboratórios, portfólio e projeto aplicado',
  href: `/courses/${id}`, image: courseArtwork(id), imageAlt: '',
  level: 'Especialização aplicada', releaseLabel: 'Premium', status: 'available',
  learningPolicy: {
    kind: 'practice', publicationStatus: 'published', accessPolicy: 'premium',
    assessmentPolicy: 'automatic_assessment', credentialStatus: 'criteria_available', instructionLanguage: 'pt-BR',
  },
}));

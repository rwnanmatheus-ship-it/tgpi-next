import { cinematicUrl, type CinematicKey } from '@/lib/cinematic-art';
import type { CourseGoal, CourseOverview } from '@/types/course-overview';
import { projectStageCount } from '../project-stages';

type ExpansionListing = {
  id: string;
  goal: CourseGoal;
  title: string;
  description: string;
  artwork: CinematicKey;
};

export const expansionCourses: readonly ExpansionListing[] = [
  { id: 'avaliacao-produtos-ia', goal: 'future-of-work', title: 'Avaliação de Produtos com IA Generativa', description: 'Construa uma suíte de avaliação para qualidade, custo e falhas em produtos com IA.', artwork: 'ai-workflow' },
  { id: 'rag-acervos-verificaveis', goal: 'future-of-work', title: 'RAG e Pesquisa em Acervos Verificáveis', description: 'Crie e avalie respostas fundamentadas em um acervo versionado.', artwork: 'documents-folios' },
  { id: 'sql-produto-dados', goal: 'future-of-work', title: 'SQL Avançado para Produto e Operações', description: 'Modele eventos e responda perguntas de produto com SQL auditável.', artwork: 'data-analysis' },
  { id: 'engenharia-dados-confiaveis', goal: 'future-of-work', title: 'Engenharia de Dados e Qualidade de Pipelines', description: 'Desenhe ingestão reprocessável, contratos de dados e alertas acionáveis.', artwork: 'python-automation' },
  { id: 'ml-aplicado-previsao', goal: 'future-of-work', title: 'Machine Learning para Previsão e Decisão', description: 'Compare modelos com baselines, validação temporal e custos de erro.', artwork: 'data-analysis' },
  { id: 'arquitetura-cloud-finops', goal: 'future-of-work', title: 'Cloud e FinOps para Produtos Internacionais', description: 'Projete serviços com orçamento, resiliência e custo por unidade.', artwork: 'workspace-observatory' },
  { id: 'governanca-ia-operacional', goal: 'future-of-work', title: 'Governança de IA para Equipes Globais', description: 'Implante inventário, classificação de risco e revisão de mudanças em IA.', artwork: 'evidence-research' },
  { id: 'observabilidade-servicos-digitais', goal: 'future-of-work', title: 'Observabilidade e Confiabilidade de Serviços', description: 'Defina SLIs e diagnostique incidentes no caminho real do usuário.', artwork: 'workspace-global-focus' },
  { id: 'privacidade-dados-produto', goal: 'future-of-work', title: 'Privacidade e Dados por Padrão no Produto', description: 'Transforme minimização, retenção e transparência em requisitos testáveis.', artwork: 'digital-security' },
  { id: 'acessibilidade-engenharia-web', goal: 'future-of-work', title: 'Engenharia de Acessibilidade para Produtos Web', description: 'Audite jornadas com teclado, tecnologias assistivas e testes de regressão.', artwork: 'workspace-focus' },
  { id: 'previsao-probabilistica', goal: 'decision-intelligence', title: 'Previsão Probabilística e Calibração', description: 'Torne previsões testáveis e saiba quando atualizar sua confiança.', artwork: 'evidence-research' },
  { id: 'inferencia-causal-negocios', goal: 'decision-intelligence', title: 'Inferência Causal para Negócios e Políticas', description: 'Diferencie associação, mecanismo e efeito causal antes de recomendar uma ação.', artwork: 'evidence-research' },
  { id: 'decisao-multicriterio-avancada', goal: 'decision-intelligence', title: 'Decisão Multicritério e Análise de Sensibilidade', description: 'Compare alternativas usando restrições, pesos e testes de estabilidade.', artwork: 'evidence-research' },
  { id: 'analise-cenarios-futuros', goal: 'decision-intelligence', title: 'Cenários, Sinais e Estratégia Adaptativa', description: 'Desenvolva estratégias robustas diante de futuros plausíveis.', artwork: 'evidence-research' },
  { id: 'negociacao-multipartes', goal: 'decision-intelligence', title: 'Negociação Multipartes e Construção de Acordos', description: 'Estruture opções e resolva impasses entre grupos com interesses diferentes.', artwork: 'communication-negotiation' },
  { id: 'pesquisa-usuarios-servicos', goal: 'decision-intelligence', title: 'Pesquisa com Usuários para Decisões de Serviço', description: 'Transforme sinais qualitativos em hipóteses e melhorias testáveis.', artwork: 'community-conversation' },
  { id: 'analise-falhas-pos-incidente', goal: 'decision-intelligence', title: 'Análise de Falhas e Aprendizagem Pós-incidente', description: 'Reconstrua decisões, barreiras e dependências antes de corrigir processos.', artwork: 'project-management' },
  { id: 'sintese-evidencias-academicas', goal: 'decision-intelligence', title: 'Síntese de Evidências e Pesquisa Aplicada', description: 'Compare estudos e construa uma conclusão rastreável com nível de confiança.', artwork: 'evidence-research' },
  { id: 'analise-risco-portfolios', goal: 'decision-intelligence', title: 'Risco Operacional e Priorização de Controles', description: 'Quantifique exposição e priorize controles em carteiras de projetos.', artwork: 'project-management' },
  { id: 'redacao-executiva-dados', goal: 'decision-intelligence', title: 'Redação Executiva e Storytelling com Evidências', description: 'Escreva decisões que sobrevivam à leitura rápida e à revisão técnica.', artwork: 'documents-folios' },
  { id: 'ingles-escrita-executiva-b2', goal: 'global-mobility', title: 'Inglês Executivo B2: Escrita e Decisões', description: 'Escreva atualizações, pedidos e decisões em inglês para equipes internacionais.', artwork: 'english-dialogue' },
  { id: 'ingles-reunioes-c1', goal: 'global-mobility', title: 'Inglês C1 para Reuniões, Apresentações e Perguntas Difíceis', description: 'Defenda uma proposta, reconheça limites e conduza perguntas em inglês.', artwork: 'english-dialogue' },
  { id: 'espanhol-negocios-latam', goal: 'global-mobility', title: 'Espanhol B1–B2 para Negócios na América Latina', description: 'Conduza propostas e alinhamentos comerciais em espanhol com clareza.', artwork: 'english-dialogue' },
  { id: 'frances-mobilidade-b1', goal: 'global-mobility', title: 'Francês B1 para Trabalho e Integração', description: 'Pratique entrevistas, procedimentos e alinhamentos profissionais em francês.', artwork: 'english-dialogue' },
  { id: 'alemao-mobilidade-a2', goal: 'global-mobility', title: 'Alemão A2 para Integração e Ambiente de Trabalho', description: 'Resolva situações de agenda, instruções e primeiros contatos em alemão.', artwork: 'english-dialogue' },
  { id: 'mandarim-negocios-iniciante', goal: 'global-mobility', title: 'Mandarim Inicial para Contatos Profissionais', description: 'Pratique apresentações, horários e confirmações em situações de baixo risco.', artwork: 'english-dialogue' },
  { id: 'escrita-academica-ingles', goal: 'global-mobility', title: 'Escrita Acadêmica em Inglês: Argumento e Revisão', description: 'Produza textos acadêmicos com tese, paráfrase precisa e evidência rastreável.', artwork: 'study-abroad' },
  { id: 'candidatura-pos-eua-europa', goal: 'global-mobility', title: 'Candidaturas de Pós-Graduação nos EUA e na Europa', description: 'Monte candidaturas com cronograma, evidências e checagem de requisitos institucionais.', artwork: 'study-abroad' },
  { id: 'credenciais-documentos-internacionais', goal: 'global-mobility', title: 'Credenciais Acadêmicas e Documentos Internacionais', description: 'Mapeie o dossiê de documentos para processos de estudo e trabalho.', artwork: 'documents-preparation' },
  { id: 'lideranca-intercultural-remota', goal: 'global-mobility', title: 'Liderança Intercultural para Equipes Distribuídas', description: 'Lidere acordos, feedback e decisões em equipes com contextos culturais diferentes.', artwork: 'remote-work' },
  { id: 'fpa-caixa-forecast', goal: 'global-economics', title: 'FP&A e Previsão de Caixa para Negócios Globais', description: 'Modele caixa, cenários e desvios com premissas rastreáveis.', artwork: 'spreadsheets' },
  { id: 'demonstracoes-financeiras-decisoes', goal: 'global-economics', title: 'Demonstrações Financeiras e Qualidade dos Resultados', description: 'Reconcilie resultado, balanço e caixa para avaliar a saúde operacional.', artwork: 'budget-planning' },
  { id: 'unit-economics-saas', goal: 'global-economics', title: 'Unit Economics, Retenção e Crescimento SaaS', description: 'Avalie margem, CAC, retenção e recuperação do custo de aquisição.', artwork: 'global-economy' },
  { id: 'pricing-internacional', goal: 'global-economics', title: 'Pricing e Monetização em Mercados Internacionais', description: 'Compare preços, disposição a pagar e impacto em margem e retenção.', artwork: 'international-marketing' },
  { id: 'compras-globais-fornecedores', goal: 'global-economics', title: 'Compras Globais e Gestão de Fornecedores', description: 'Compare custo total, qualidade e continuidade de fornecimento.', artwork: 'global-economy' },
  { id: 'cadeia-suprimentos-resiliencia', goal: 'global-economics', title: 'Supply Chain Internacional e Planejamento de Estoque', description: 'Modele nível de serviço, incerteza de prazo e reposição.', artwork: 'global-economy' },
  { id: 'pesquisa-entrada-mercado', goal: 'global-economics', title: 'Pesquisa e Entrada em Novos Mercados', description: 'Combine dados de demanda, canais e concorrência para escolher um piloto internacional.', artwork: 'international-marketing' },
  { id: 'cambio-economico-empresas', goal: 'global-economics', title: 'Câmbio, Moedas e Exposição de Negócios', description: 'Simule exposição cambial em contratos e fluxos internacionais.', artwork: 'global-economy' },
  { id: 'orcamento-capital-cenarios', goal: 'global-economics', title: 'Orçamento de Capital e Decisões de Investimento', description: 'Avalie projetos com fluxo incremental, valor presente e sensibilidade.', artwork: 'budget-planning' },
  { id: 'compensacao-total-global', goal: 'global-economics', title: 'Compensação Total e Ofertas de Carreira Global', description: 'Compare propostas internacionais por caixa, benefícios e condições de longo prazo.', artwork: 'international-career' },
  { id: 'continuidade-negocios-desastres', goal: 'emergency-readiness', title: 'Continuidade de Negócios em Desastres', description: 'Priorize operações essenciais e teste recuperação após interrupções.', artwork: 'arrival-city' },
  { id: 'evacuacao-acessivel-planos', goal: 'emergency-readiness', title: 'Planejamento de Evacuação Acessível', description: 'Projete comunicação e procedimentos inclusivos para exercícios de evacuação.', artwork: 'arrival-city' },
  { id: 'comunicacao-crise-alertas', goal: 'emergency-readiness', title: 'Comunicação de Crise e Alertas Públicos', description: 'Crie mensagens claras, acessíveis e rastreáveis durante incidentes.', artwork: 'arrival-city' },
  { id: 'exercicios-mesa-incidentes', goal: 'emergency-readiness', title: 'Exercícios de Mesa e Coordenação de Incidentes', description: 'Planeje simulações operacionais e converta observações em correções.', artwork: 'project-management' },
  { id: 'resiliencia-ondas-calor', goal: 'emergency-readiness', title: 'Planejamento Comunitário para Ondas de Calor', description: 'Organize alertas, acesso a locais frescos e continuidade de serviços.', artwork: 'arrival-city' },
  { id: 'preparacao-alagamentos-comunidades', goal: 'emergency-readiness', title: 'Preparação para Alagamentos e Enchentes', description: 'Use informação local para organizar comunicação, dependências e reunificação.', artwork: 'arrival-city' },
  { id: 'deslocamento-crises-viagem', goal: 'emergency-readiness', title: 'Continuidade de Viagens Durante Crises', description: 'Organize contato, documentação e alternativas quando viagens são interrompidas.', artwork: 'arrival-city' },
  { id: 'abrigos-logistica-acessivel', goal: 'emergency-readiness', title: 'Logística de Abrigos e Pontos de Apoio', description: 'Planeje fluxos de informações, suprimentos e acessibilidade em acolhimento temporário.', artwork: 'community-conversation' },
  { id: 'resiliencia-energia-telecom', goal: 'emergency-readiness', title: 'Resiliência Operacional a Falhas de Energia e Comunicação', description: 'Planeje continuidade e comunicação alternativa durante indisponibilidades simultâneas.', artwork: 'digital-security' },
  { id: 'voluntariado-coordenacao-desastres', goal: 'emergency-readiness', title: 'Voluntariado e Coordenação Comunitária em Desastres', description: 'Organize papéis, informações e escalonamento em apoio comunitário.', artwork: 'community-global-exchange' },
];

const categories: Record<CourseGoal, string> = {
  'future-of-work': 'Tecnologia e adaptabilidade',
  'decision-intelligence': 'Inteligência de decisão',
  'global-mobility': 'Idiomas e mobilidade',
  'global-economics': 'Economia e oportunidades',
  'emergency-readiness': 'Primeiros socorros e desastres',
};

export const expansionWorkload = {
  minutes: 15 * 60,
  labMinutes: 100,
  portfolioMinutes: 120,
  assessmentMinutes: 60,
  lessons: 3 + projectStageCount,
} as const;

const expansionIds = new Set(expansionCourses.map(course => course.id));
export function isExpansionCourse(id: string) { return expansionIds.has(id); }

export const expansionOverview: CourseOverview[] = expansionCourses.map(course => ({
  id: course.id,
  title: course.title,
  category: categories[course.goal],
  desc: course.description,
  benefits: [],
  audience: 'Profissionais e estudantes que querem praticar competências aplicadas.',
  duration: `${expansionWorkload.minutes / 60}h`,
  format: '7 aulas e laboratórios aplicados',
  goal: course.goal,
  goalLabel: categories[course.goal],
  href: `/courses/${course.id}`,
  image: cinematicUrl(course.artwork),
  imageAlt: '',
  level: 'Formação aplicada',
  releaseLabel: 'Premium',
  status: 'available',
  learningPolicy: {
    kind: 'practice', publicationStatus: 'published', accessPolicy: 'premium',
    assessmentPolicy: 'automatic_assessment', credentialStatus: 'criteria_available',
    instructionLanguage: 'pt-BR', ...(course.goal === 'emergency-readiness' ? { credentialScope: 'theory' } : {}),
  },
}));

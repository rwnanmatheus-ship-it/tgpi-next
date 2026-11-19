import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "construcao-de-conjuntos-ouro-para-sumarizacao",
    "scenario": "Dois resumos são fluentes mas um inventa uma data ausente do original.",
    "decision": "Rotular cobertura e fidelidade separadamente e adjudicar afirmações sem suporte.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma nova fonte introduz exemplos fora da distribuição original.",
    "tasks": [
      "Dossiê de trabalho — Construção de conjuntos ouro para sumarização",
      "Base de análise: amostra de referência anotada",
      "Conferência de evidências: rubrica de qualidade e adjudicação",
      "Memória de decisão — Dois resumos são fluentes mas um inventa uma data ausente do original",
      "Simulação da mudança: uma nova fonte introduz exemplos fora da distribuição original",
      "Relatório de transferência para analista de avaliação de sistemas de ia"
    ]
  },
  {
    "id": "avaliacao-de-cobertura-de-respostas-com-fontes",
    "scenario": "Uma resposta tem quatro afirmações verificáveis e citações que sustentam três.",
    "decision": "Registrar cobertura de 75% e identificar a afirmação sem evidência.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma nova fonte introduz exemplos fora da distribuição original.",
    "tasks": [
      "Dossiê de trabalho — Avaliação de cobertura de respostas com fontes",
      "Base de análise: amostra de referência anotada",
      "Conferência de evidências: rubrica de qualidade e adjudicação",
      "Memória de decisão — Uma resposta tem quatro afirmações verificáveis e citações que sustentam três",
      "Simulação da mudança: uma nova fonte introduz exemplos fora da distribuição original",
      "Relatório de transferência para analista de avaliação de sistemas de ia"
    ]
  },
  {
    "id": "auditoria-de-unidades-em-extracao-de-tabelas",
    "scenario": "Uma tabela informa valores em milhares e o extrator omite o multiplicador.",
    "decision": "Normalizar escala junto do valor e testar total reconciliado com a fonte.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma nova fonte introduz exemplos fora da distribuição original.",
    "tasks": [
      "Dossiê de trabalho — Auditoria de unidades em extração de tabelas",
      "Base de análise: amostra de referência anotada",
      "Conferência de evidências: rubrica de qualidade e adjudicação",
      "Memória de decisão — Uma tabela informa valores em milhares e o extrator omite o multiplicador",
      "Simulação da mudança: uma nova fonte introduz exemplos fora da distribuição original",
      "Relatório de transferência para analista de avaliação de sistemas de ia"
    ]
  },
  {
    "id": "medicao-de-custo-por-revisao-aceita",
    "scenario": "O fluxo A custa 90 para 60 revisões aceitas e B custa 80 para 40.",
    "decision": "Comparar custos de 1,50 e 2 por revisão aceita com o mesmo critério de aceite.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma nova fonte introduz exemplos fora da distribuição original.",
    "tasks": [
      "Dossiê de trabalho — Medição de custo por revisão aceita",
      "Base de análise: amostra de referência anotada",
      "Conferência de evidências: rubrica de qualidade e adjudicação",
      "Memória de decisão — O fluxo A custa 90 para 60 revisões aceitas e B custa 80 para 40",
      "Simulação da mudança: uma nova fonte introduz exemplos fora da distribuição original",
      "Relatório de transferência para analista de avaliação de sistemas de ia"
    ]
  },
  {
    "id": "avaliacao-de-legibilidade-de-texto-simplificado",
    "scenario": "A versão curta melhora o índice de leitura mas remove a condição de elegibilidade.",
    "decision": "Exigir preservação da condição e testar compreensão com uma pergunta específica.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma nova fonte introduz exemplos fora da distribuição original.",
    "tasks": [
      "Dossiê de trabalho — Avaliação de legibilidade de texto simplificado",
      "Base de análise: amostra de referência anotada",
      "Conferência de evidências: rubrica de qualidade e adjudicação",
      "Memória de decisão — A versão curta melhora o índice de leitura mas remove a condição de elegibilidade",
      "Simulação da mudança: uma nova fonte introduz exemplos fora da distribuição original",
      "Relatório de transferência para analista de avaliação de sistemas de ia"
    ]
  },
  {
    "id": "controle-de-deriva-em-classificacao-de-contatos",
    "scenario": "O conjunto recente traz uma nova categoria que o classificador nunca recebeu.",
    "decision": "Separar mudança de distribuição de queda medida de desempenho em amostra rotulada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma nova fonte introduz exemplos fora da distribuição original.",
    "tasks": [
      "Dossiê de trabalho — Controle de deriva em classificação de contatos",
      "Base de análise: amostra de referência anotada",
      "Conferência de evidências: rubrica de qualidade e adjudicação",
      "Memória de decisão — O conjunto recente traz uma nova categoria que o classificador nunca recebeu",
      "Simulação da mudança: uma nova fonte introduz exemplos fora da distribuição original",
      "Relatório de transferência para analista de avaliação de sistemas de ia"
    ]
  },
  {
    "id": "planejamento-de-revisao-humana-por-amostragem",
    "scenario": "A equipe pode revisar 40 de 400 saídas e há duas classes raras de alto impacto.",
    "decision": "Estratificar a amostra, preservar probabilidades e reportar limites por estrato.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma nova fonte introduz exemplos fora da distribuição original.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de revisão humana por amostragem",
      "Base de análise: amostra de referência anotada",
      "Conferência de evidências: rubrica de qualidade e adjudicação",
      "Memória de decisão — A equipe pode revisar 40 de 400 saídas e há duas classes raras de alto impacto",
      "Simulação da mudança: uma nova fonte introduz exemplos fora da distribuição original",
      "Relatório de transferência para analista de avaliação de sistemas de ia"
    ]
  },
  {
    "id": "avaliacao-comparativa-de-transcricao-regional",
    "scenario": "O corpus de dois sotaques tem quantidades de palavras de referência diferentes.",
    "decision": "Calcular erros por palavra e apresentar resultados por grupo e agregação ponderada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma nova fonte introduz exemplos fora da distribuição original.",
    "tasks": [
      "Dossiê de trabalho — Avaliação comparativa de transcrição regional",
      "Base de análise: amostra de referência anotada",
      "Conferência de evidências: rubrica de qualidade e adjudicação",
      "Memória de decisão — O corpus de dois sotaques tem quantidades de palavras de referência diferentes",
      "Simulação da mudança: uma nova fonte introduz exemplos fora da distribuição original",
      "Relatório de transferência para analista de avaliação de sistemas de ia"
    ]
  },
  {
    "id": "testes-de-consistencia-de-metadados-gerados",
    "scenario": "A data gerada para o mesmo documento difere entre dois campos relacionados.",
    "decision": "Testar coerência interna e confronto com a fonte antes de aceitar o registro.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma nova fonte introduz exemplos fora da distribuição original.",
    "tasks": [
      "Dossiê de trabalho — Testes de consistência de metadados gerados",
      "Base de análise: amostra de referência anotada",
      "Conferência de evidências: rubrica de qualidade e adjudicação",
      "Memória de decisão — A data gerada para o mesmo documento difere entre dois campos relacionados",
      "Simulação da mudança: uma nova fonte introduz exemplos fora da distribuição original",
      "Relatório de transferência para analista de avaliação de sistemas de ia"
    ]
  },
  {
    "id": "gestao-de-filas-de-adjudicacao-multilingue",
    "scenario": "Duas línguas têm igual volume mas uma concentra desacordos sem revisor disponível.",
    "decision": "Dimensionar fila por desacordo e competência linguística e medir prazo até adjudicação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma nova fonte introduz exemplos fora da distribuição original.",
    "tasks": [
      "Dossiê de trabalho — Gestão de filas de adjudicação multilíngue",
      "Base de análise: amostra de referência anotada",
      "Conferência de evidências: rubrica de qualidade e adjudicação",
      "Memória de decisão — Duas línguas têm igual volume mas uma concentra desacordos sem revisor disponível",
      "Simulação da mudança: uma nova fonte introduz exemplos fora da distribuição original",
      "Relatório de transferência para analista de avaliação de sistemas de ia"
    ]
  }
];

export default cases;

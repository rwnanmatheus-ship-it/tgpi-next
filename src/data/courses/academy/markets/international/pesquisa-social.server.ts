import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "desenho-de-quotas-para-entrevistas",
    "scenario": "Uma amostra de 40 entrevistas reserva 25% a um segmento e já recrutou oito dele.",
    "decision": "Recrutar mais dois desse segmento e acompanhar as demais quotas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um subgrupo deixa de ser observado na última rodada.",
    "tasks": [
      "Dossiê de trabalho — Desenho de quotas para entrevistas",
      "Base de análise: quadro de amostra e cobertura",
      "Conferência de evidências: trilha de codificação e decisão",
      "Memória de decisão — Uma amostra de 40 entrevistas reserva 25% a um segmento e já recrutou oito dele",
      "Simulação da mudança: um subgrupo deixa de ser observado na última rodada",
      "Relatório de transferência para analista de pesquisa social aplicada"
    ]
  },
  {
    "id": "recrutamento-de-participantes-bilingues",
    "scenario": "Uma pesquisa exige uso profissional de duas línguas mas o formulário pergunta só língua materna.",
    "decision": "Verificar proficiência e contexto de uso conforme o critério de inclusão.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um subgrupo deixa de ser observado na última rodada.",
    "tasks": [
      "Dossiê de trabalho — Recrutamento de participantes bilíngues",
      "Base de análise: quadro de amostra e cobertura",
      "Conferência de evidências: trilha de codificação e decisão",
      "Memória de decisão — Uma pesquisa exige uso profissional de duas línguas mas o formulário pergunta só língua materna",
      "Simulação da mudança: um subgrupo deixa de ser observado na última rodada",
      "Relatório de transferência para analista de pesquisa social aplicada"
    ]
  },
  {
    "id": "codificacao-de-entrevistas-por-dupla-leitura",
    "scenario": "Dois codificadores concordam em 32 de 40 trechos.",
    "decision": "Registrar concordância bruta de 80%, examinar divergências e revisar o código ambíguo.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um subgrupo deixa de ser observado na última rodada.",
    "tasks": [
      "Dossiê de trabalho — Codificação de entrevistas por dupla leitura",
      "Base de análise: quadro de amostra e cobertura",
      "Conferência de evidências: trilha de codificação e decisão",
      "Memória de decisão — Dois codificadores concordam em 32 de 40 trechos",
      "Simulação da mudança: um subgrupo deixa de ser observado na última rodada",
      "Relatório de transferência para analista de pesquisa social aplicada"
    ]
  },
  {
    "id": "gestao-de-incentivos-para-paineis-de-pesquisa",
    "scenario": "O painel paga 15 por conclusão válida e registra 60 envios dos quais cinco são duplicados.",
    "decision": "Verificar 55 conclusões únicas e estimar 825 antes de outras exclusões previstas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um subgrupo deixa de ser observado na última rodada.",
    "tasks": [
      "Dossiê de trabalho — Gestão de incentivos para painéis de pesquisa",
      "Base de análise: quadro de amostra e cobertura",
      "Conferência de evidências: trilha de codificação e decisão",
      "Memória de decisão — O painel paga 15 por conclusão válida e registra 60 envios dos quais cinco são duplicados",
      "Simulação da mudança: um subgrupo deixa de ser observado na última rodada",
      "Relatório de transferência para analista de pesquisa social aplicada"
    ]
  },
  {
    "id": "planejamento-de-diarios-de-uso",
    "scenario": "O estudo pede registros semanais para um comportamento que ocorre várias vezes ao dia.",
    "decision": "Testar diário por evento e analisar esforço e lacunas de preenchimento.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um subgrupo deixa de ser observado na última rodada.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de diários de uso",
      "Base de análise: quadro de amostra e cobertura",
      "Conferência de evidências: trilha de codificação e decisão",
      "Memória de decisão — O estudo pede registros semanais para um comportamento que ocorre várias vezes ao dia",
      "Simulação da mudança: um subgrupo deixa de ser observado na última rodada",
      "Relatório de transferência para analista de pesquisa social aplicada"
    ]
  },
  {
    "id": "teste-cognitivo-de-questionarios",
    "scenario": "Três participantes interpretam renda familiar como renda individual.",
    "decision": "Reformular a unidade de referência e repetir a entrevista cognitiva.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um subgrupo deixa de ser observado na última rodada.",
    "tasks": [
      "Dossiê de trabalho — Teste cognitivo de questionários",
      "Base de análise: quadro de amostra e cobertura",
      "Conferência de evidências: trilha de codificação e decisão",
      "Memória de decisão — Três participantes interpretam renda familiar como renda individual",
      "Simulação da mudança: um subgrupo deixa de ser observado na última rodada",
      "Relatório de transferência para analista de pesquisa social aplicada"
    ]
  },
  {
    "id": "controle-de-qualidade-de-transcricao-qualitativa",
    "scenario": "A transcrição marca silêncio onde o áudio está inaudível.",
    "decision": "Distinguir ausência de fala e trecho indeterminado e documentar a revisão.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um subgrupo deixa de ser observado na última rodada.",
    "tasks": [
      "Dossiê de trabalho — Controle de qualidade de transcrição qualitativa",
      "Base de análise: quadro de amostra e cobertura",
      "Conferência de evidências: trilha de codificação e decisão",
      "Memória de decisão — A transcrição marca silêncio onde o áudio está inaudível",
      "Simulação da mudança: um subgrupo deixa de ser observado na última rodada",
      "Relatório de transferência para analista de pesquisa social aplicada"
    ]
  },
  {
    "id": "analise-de-nao-resposta-por-canal",
    "scenario": "O canal A recebeu 20 respostas em 100 convites e B recebeu 30 em 300.",
    "decision": "Comparar taxas de resposta de 20% e 10% e investigar perfis ausentes.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um subgrupo deixa de ser observado na última rodada.",
    "tasks": [
      "Dossiê de trabalho — Análise de não resposta por canal",
      "Base de análise: quadro de amostra e cobertura",
      "Conferência de evidências: trilha de codificação e decisão",
      "Memória de decisão — O canal A recebeu 20 respostas em 100 convites e B recebeu 30 em 300",
      "Simulação da mudança: um subgrupo deixa de ser observado na última rodada",
      "Relatório de transferência para analista de pesquisa social aplicada"
    ]
  },
  {
    "id": "construcao-de-matrizes-de-sintese-tematica",
    "scenario": "Um tema aparece em 18 trechos provenientes de apenas duas entrevistas.",
    "decision": "Separar frequência de menções e amplitude entre participantes antes da síntese.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um subgrupo deixa de ser observado na última rodada.",
    "tasks": [
      "Dossiê de trabalho — Construção de matrizes de síntese temática",
      "Base de análise: quadro de amostra e cobertura",
      "Conferência de evidências: trilha de codificação e decisão",
      "Memória de decisão — Um tema aparece em 18 trechos provenientes de apenas duas entrevistas",
      "Simulação da mudança: um subgrupo deixa de ser observado na última rodada",
      "Relatório de transferência para analista de pesquisa social aplicada"
    ]
  },
  {
    "id": "preparacao-de-pacotes-de-dados-anonimizados-para-ensino",
    "scenario": "O arquivo remove nomes mas mantém combinações raras de bairro, idade e cargo.",
    "decision": "Avaliar possibilidade de reidentificação e generalizar ou suprimir combinações antes da entrega.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um subgrupo deixa de ser observado na última rodada.",
    "tasks": [
      "Dossiê de trabalho — Preparação de pacotes de dados anonimizados para ensino",
      "Base de análise: quadro de amostra e cobertura",
      "Conferência de evidências: trilha de codificação e decisão",
      "Memória de decisão — O arquivo remove nomes mas mantém combinações raras de bairro, idade e cargo",
      "Simulação da mudança: um subgrupo deixa de ser observado na última rodada",
      "Relatório de transferência para analista de pesquisa social aplicada"
    ]
  }
];

export default cases;

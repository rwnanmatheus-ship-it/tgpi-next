import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "orcamento-de-impressao-por-tiragem",
    "scenario": "O preparo custa 180 e cada exemplar 0,40 para 600 unidades.",
    "decision": "Estimar 420 no lote e custo médio de 0,70 por exemplar.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente muda uma arte após a preparação do lote.",
    "tasks": [
      "Dossiê de trabalho — Orçamento de impressão por tiragem",
      "Base de análise: ordem de produção por tiragem",
      "Conferência de evidências: controle de prova e acabamento",
      "Memória de decisão — O preparo custa 180 e cada exemplar 0,40 para 600 unidades",
      "Simulação da mudança: o cliente muda uma arte após a preparação do lote",
      "Relatório de transferência para planejador de produção gráfica"
    ]
  },
  {
    "id": "imposicao-e-aproveitamento-de-folhas",
    "scenario": "Cabem oito páginas por folha na imposição aprovada e a tiragem exige 4000 páginas impressas.",
    "decision": "Calcular 500 folhas úteis na configuração dada antes de perdas de acerto.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente muda uma arte após a preparação do lote.",
    "tasks": [
      "Dossiê de trabalho — Imposição e aproveitamento de folhas",
      "Base de análise: ordem de produção por tiragem",
      "Conferência de evidências: controle de prova e acabamento",
      "Memória de decisão — Cabem oito páginas por folha na imposição aprovada e a tiragem exige 4000 páginas impressas",
      "Simulação da mudança: o cliente muda uma arte após a preparação do lote",
      "Relatório de transferência para planejador de produção gráfica"
    ]
  },
  {
    "id": "planejamento-de-acabamentos-graficos",
    "scenario": "A laminação requer secagem prévia e o cronograma coloca ambos na mesma janela.",
    "decision": "Programar dependência e capacidade antes da promessa de acabamento.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente muda uma arte após a preparação do lote.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de acabamentos gráficos",
      "Base de análise: ordem de produção por tiragem",
      "Conferência de evidências: controle de prova e acabamento",
      "Memória de decisão — A laminação requer secagem prévia e o cronograma coloca ambos na mesma janela",
      "Simulação da mudança: o cliente muda uma arte após a preparação do lote",
      "Relatório de transferência para planejador de produção gráfica"
    ]
  },
  {
    "id": "controle-de-provas-de-cor-por-versao",
    "scenario": "A prova aprovada é v2 mas a chapa foi gerada a partir de v3.",
    "decision": "Interromper a liberação documental até reconciliar arte, prova e versão.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente muda uma arte após a preparação do lote.",
    "tasks": [
      "Dossiê de trabalho — Controle de provas de cor por versão",
      "Base de análise: ordem de produção por tiragem",
      "Conferência de evidências: controle de prova e acabamento",
      "Memória de decisão — A prova aprovada é v2 mas a chapa foi gerada a partir de v3",
      "Simulação da mudança: o cliente muda uma arte após a preparação do lote",
      "Relatório de transferência para planejador de produção gráfica"
    ]
  },
  {
    "id": "gestao-de-reimpressoes-sob-demanda",
    "scenario": "O estoque tem 18 exemplares e 26 pedidos confirmados.",
    "decision": "Programar no mínimo oito unidades líquidas e avaliar lote econômico.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente muda uma arte após a preparação do lote.",
    "tasks": [
      "Dossiê de trabalho — Gestão de reimpressões sob demanda",
      "Base de análise: ordem de produção por tiragem",
      "Conferência de evidências: controle de prova e acabamento",
      "Memória de decisão — O estoque tem 18 exemplares e 26 pedidos confirmados",
      "Simulação da mudança: o cliente muda uma arte após a preparação do lote",
      "Relatório de transferência para planejador de produção gráfica"
    ]
  },
  {
    "id": "programacao-de-encadernacao-por-lote",
    "scenario": "A encadernadora processa 100 unidades por hora e há 350 do mesmo formato.",
    "decision": "Reservar 3,5 horas produtivas e acrescentar preparação quando aplicável.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente muda uma arte após a preparação do lote.",
    "tasks": [
      "Dossiê de trabalho — Programação de encadernação por lote",
      "Base de análise: ordem de produção por tiragem",
      "Conferência de evidências: controle de prova e acabamento",
      "Memória de decisão — A encadernadora processa 100 unidades por hora e há 350 do mesmo formato",
      "Simulação da mudança: o cliente muda uma arte após a preparação do lote",
      "Relatório de transferência para planejador de produção gráfica"
    ]
  },
  {
    "id": "previsao-de-consumo-de-papel",
    "scenario": "O plano requer 960 folhas úteis com rendimento previsto de 96%.",
    "decision": "Reservar 1000 folhas no cenário-base.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente muda uma arte após a preparação do lote.",
    "tasks": [
      "Dossiê de trabalho — Previsão de consumo de papel",
      "Base de análise: ordem de produção por tiragem",
      "Conferência de evidências: controle de prova e acabamento",
      "Memória de decisão — O plano requer 960 folhas úteis com rendimento previsto de 96%",
      "Simulação da mudança: o cliente muda uma arte após a preparação do lote",
      "Relatório de transferência para planejador de produção gráfica"
    ]
  },
  {
    "id": "gestao-de-arquivos-de-facas-de-corte",
    "scenario": "Duas facas têm formato externo igual e posição de vinco distinta.",
    "decision": "Vincular código e revisão da faca ao desenho aprovado.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente muda uma arte após a preparação do lote.",
    "tasks": [
      "Dossiê de trabalho — Gestão de arquivos de facas de corte",
      "Base de análise: ordem de produção por tiragem",
      "Conferência de evidências: controle de prova e acabamento",
      "Memória de decisão — Duas facas têm formato externo igual e posição de vinco distinta",
      "Simulação da mudança: o cliente muda uma arte após a preparação do lote",
      "Relatório de transferência para planejador de produção gráfica"
    ]
  },
  {
    "id": "controle-de-expedicao-de-impressos-personalizados",
    "scenario": "Dois pedidos usam a mesma arte de frente e endereços variáveis diferentes.",
    "decision": "Conferir correspondência registro, impressão e etiqueta em amostra rastreável.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente muda uma arte após a preparação do lote.",
    "tasks": [
      "Dossiê de trabalho — Controle de expedição de impressos personalizados",
      "Base de análise: ordem de produção por tiragem",
      "Conferência de evidências: controle de prova e acabamento",
      "Memória de decisão — Dois pedidos usam a mesma arte de frente e endereços variáveis diferentes",
      "Simulação da mudança: o cliente muda uma arte após a preparação do lote",
      "Relatório de transferência para planejador de produção gráfica"
    ]
  },
  {
    "id": "planejamento-de-campanhas-de-mala-direta-impressa",
    "scenario": "A lista tem 1200 linhas, 80 duplicadas e 60 exclusões entre registros únicos.",
    "decision": "Preparar 1060 destinatários elegíveis antes da impressão.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente muda uma arte após a preparação do lote.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de campanhas de mala direta impressa",
      "Base de análise: ordem de produção por tiragem",
      "Conferência de evidências: controle de prova e acabamento",
      "Memória de decisão — A lista tem 1200 linhas, 80 duplicadas e 60 exclusões entre registros únicos",
      "Simulação da mudança: o cliente muda uma arte após a preparação do lote",
      "Relatório de transferência para planejador de produção gráfica"
    ]
  }
];

export default cases;

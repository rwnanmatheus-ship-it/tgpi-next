import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "planejamento-de-sortimento-por-numeracao",
    "scenario": "As vendas registram zero no número 39 durante cinco dias de ruptura.",
    "decision": "Marcar a demanda censurada antes de reduzir o sortimento do número 39.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O fornecedor altera a disponibilidade de um modelo já reservado.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de sortimento por numeração",
      "Base de análise: matriz de modelo e numeração",
      "Conferência de evidências: ficha de componentes e fornecedores",
      "Memória de decisão — As vendas registram zero no número 39 durante cinco dias de ruptura",
      "Simulação da mudança: o fornecedor altera a disponibilidade de um modelo já reservado",
      "Relatório de transferência para analista de operações de calçados e acessórios"
    ]
  },
  {
    "id": "custeio-de-modelos-de-calcado",
    "scenario": "O custo inclui sola 9 por par, cabedal 6 por pé e montagem 4 por par.",
    "decision": "Converter unidades e totalizar 25 por par.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O fornecedor altera a disponibilidade de um modelo já reservado.",
    "tasks": [
      "Dossiê de trabalho — Custeio de modelos de calçado",
      "Base de análise: matriz de modelo e numeração",
      "Conferência de evidências: ficha de componentes e fornecedores",
      "Memória de decisão — O custo inclui sola 9 por par, cabedal 6 por pé e montagem 4 por par",
      "Simulação da mudança: o fornecedor altera a disponibilidade de um modelo já reservado",
      "Relatório de transferência para analista de operações de calçados e acessórios"
    ]
  },
  {
    "id": "mapeamento-de-componentes-de-bolsas",
    "scenario": "Uma bolsa usa duas alças e quatro argolas; a ordem contém 70 bolsas.",
    "decision": "Reservar 140 alças e 280 argolas antes do estoque de contingência.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O fornecedor altera a disponibilidade de um modelo já reservado.",
    "tasks": [
      "Dossiê de trabalho — Mapeamento de componentes de bolsas",
      "Base de análise: matriz de modelo e numeração",
      "Conferência de evidências: ficha de componentes e fornecedores",
      "Memória de decisão — Uma bolsa usa duas alças e quatro argolas; a ordem contém 70 bolsas",
      "Simulação da mudança: o fornecedor altera a disponibilidade de um modelo já reservado",
      "Relatório de transferência para analista de operações de calçados e acessórios"
    ]
  },
  {
    "id": "controle-de-pares-incompletos-em-distribuicao",
    "scenario": "Há 40 pés esquerdos e 36 direitos do mesmo número e cor.",
    "decision": "Registrar 36 pares expedíveis e quatro esquerdos remanescentes.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O fornecedor altera a disponibilidade de um modelo já reservado.",
    "tasks": [
      "Dossiê de trabalho — Controle de pares incompletos em distribuição",
      "Base de análise: matriz de modelo e numeração",
      "Conferência de evidências: ficha de componentes e fornecedores",
      "Memória de decisão — Há 40 pés esquerdos e 36 direitos do mesmo número e cor",
      "Simulação da mudança: o fornecedor altera a disponibilidade de um modelo já reservado",
      "Relatório de transferência para analista de operações de calçados e acessórios"
    ]
  },
  {
    "id": "gestao-de-mostruarios-de-calcados",
    "scenario": "O showroom recebe amostras de pé único e o estoque comercial exige pares.",
    "decision": "Separar finalidade de demonstração e saldo vendável.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O fornecedor altera a disponibilidade de um modelo já reservado.",
    "tasks": [
      "Dossiê de trabalho — Gestão de mostruários de calçados",
      "Base de análise: matriz de modelo e numeração",
      "Conferência de evidências: ficha de componentes e fornecedores",
      "Memória de decisão — O showroom recebe amostras de pé único e o estoque comercial exige pares",
      "Simulação da mudança: o fornecedor altera a disponibilidade de um modelo já reservado",
      "Relatório de transferência para analista de operações de calçados e acessórios"
    ]
  },
  {
    "id": "planejamento-de-reposicao-de-acessorios",
    "scenario": "Vendidas 30 peças por semana, reposição leva duas semanas e o saldo é 45.",
    "decision": "Identificar déficit de 15 frente ao consumo esperado até a reposição.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O fornecedor altera a disponibilidade de um modelo já reservado.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de reposição de acessórios",
      "Base de análise: matriz de modelo e numeração",
      "Conferência de evidências: ficha de componentes e fornecedores",
      "Memória de decisão — Vendidas 30 peças por semana, reposição leva duas semanas e o saldo é 45",
      "Simulação da mudança: o fornecedor altera a disponibilidade de um modelo já reservado",
      "Relatório de transferência para analista de operações de calçados e acessórios"
    ]
  },
  {
    "id": "contratacao-de-oficinas-de-acabamento",
    "scenario": "A oficina A cobra por peça aprovada e a B por peça processada.",
    "decision": "Normalizar a proposta usando rendimento e custo de retrabalho.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O fornecedor altera a disponibilidade de um modelo já reservado.",
    "tasks": [
      "Dossiê de trabalho — Contratação de oficinas de acabamento",
      "Base de análise: matriz de modelo e numeração",
      "Conferência de evidências: ficha de componentes e fornecedores",
      "Memória de decisão — A oficina A cobra por peça aprovada e a B por peça processada",
      "Simulação da mudança: o fornecedor altera a disponibilidade de um modelo já reservado",
      "Relatório de transferência para analista de operações de calçados e acessórios"
    ]
  },
  {
    "id": "gestao-de-pedidos-personalizados-de-couro",
    "scenario": "Uma gravação foi aprovada por áudio mas a grafia do pedido diverge.",
    "decision": "Solicitar prova escrita da personalização antes de liberar o lote.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O fornecedor altera a disponibilidade de um modelo já reservado.",
    "tasks": [
      "Dossiê de trabalho — Gestão de pedidos personalizados de couro",
      "Base de análise: matriz de modelo e numeração",
      "Conferência de evidências: ficha de componentes e fornecedores",
      "Memória de decisão — Uma gravação foi aprovada por áudio mas a grafia do pedido diverge",
      "Simulação da mudança: o fornecedor altera a disponibilidade de um modelo já reservado",
      "Relatório de transferência para analista de operações de calçados e acessórios"
    ]
  },
  {
    "id": "catalogos-de-materiais-alternativos",
    "scenario": "Dois materiais têm aparência próxima e evidências de durabilidade diferentes.",
    "decision": "Relacionar aplicação e teste fornecido antes de declarar equivalência.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O fornecedor altera a disponibilidade de um modelo já reservado.",
    "tasks": [
      "Dossiê de trabalho — Catálogos de materiais alternativos",
      "Base de análise: matriz de modelo e numeração",
      "Conferência de evidências: ficha de componentes e fornecedores",
      "Memória de decisão — Dois materiais têm aparência próxima e evidências de durabilidade diferentes",
      "Simulação da mudança: o fornecedor altera a disponibilidade de um modelo já reservado",
      "Relatório de transferência para analista de operações de calçados e acessórios"
    ]
  },
  {
    "id": "controle-de-prazos-de-colecoes-licenciadas",
    "scenario": "A licença expira em 30 dias e a produção mais distribuição exige 36.",
    "decision": "Identificar diferença de seis dias e revisar escopo autorizado ou cronograma.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O fornecedor altera a disponibilidade de um modelo já reservado.",
    "tasks": [
      "Dossiê de trabalho — Controle de prazos de coleções licenciadas",
      "Base de análise: matriz de modelo e numeração",
      "Conferência de evidências: ficha de componentes e fornecedores",
      "Memória de decisão — A licença expira em 30 dias e a produção mais distribuição exige 36",
      "Simulação da mudança: o fornecedor altera a disponibilidade de um modelo já reservado",
      "Relatório de transferência para analista de operações de calçados e acessórios"
    ]
  }
];

export default cases;

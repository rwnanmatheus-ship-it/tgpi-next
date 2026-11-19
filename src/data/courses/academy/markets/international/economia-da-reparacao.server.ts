import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "triagem-de-eletrodomesticos-para-reparo",
    "scenario": "Três aparelhos chegam sem autorização de diagnóstico e dois sem identificação do proprietário.",
    "decision": "Abrir fila de pendências documentais antes de estimar reparabilidade.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um componente previsto fica indisponível durante a execução.",
    "tasks": [
      "Dossiê de trabalho — Triagem de eletrodomésticos para reparo",
      "Base de análise: ficha de equipamento e condição",
      "Conferência de evidências: controle de peças e autorizações",
      "Memória de decisão — Três aparelhos chegam sem autorização de diagnóstico e dois sem identificação do proprietário",
      "Simulação da mudança: um componente previsto fica indisponível durante a execução",
      "Relatório de transferência para planejador de serviços de reparação"
    ]
  },
  {
    "id": "orcamento-de-oficinas-de-bicicletas",
    "scenario": "Uma revisão exige 90 minutos a 40 por hora e peças de 35.",
    "decision": "Calcular 95 de custo direto antes de incluir despesas e margem.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um componente previsto fica indisponível durante a execução.",
    "tasks": [
      "Dossiê de trabalho — Orçamento de oficinas de bicicletas",
      "Base de análise: ficha de equipamento e condição",
      "Conferência de evidências: controle de peças e autorizações",
      "Memória de decisão — Uma revisão exige 90 minutos a 40 por hora e peças de 35",
      "Simulação da mudança: um componente previsto fica indisponível durante a execução",
      "Relatório de transferência para planejador de serviços de reparação"
    ]
  },
  {
    "id": "gestao-de-garantias-de-moveis",
    "scenario": "A nota informa lote A e a peça devolvida lote B.",
    "decision": "Separar identificação e elegibilidade antes de aprovar o crédito.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um componente previsto fica indisponível durante a execução.",
    "tasks": [
      "Dossiê de trabalho — Gestão de garantias de móveis",
      "Base de análise: ficha de equipamento e condição",
      "Conferência de evidências: controle de peças e autorizações",
      "Memória de decisão — A nota informa lote A e a peça devolvida lote B",
      "Simulação da mudança: um componente previsto fica indisponível durante a execução",
      "Relatório de transferência para planejador de serviços de reparação"
    ]
  },
  {
    "id": "planejamento-de-coleta-de-equipamentos-usados",
    "scenario": "Um veículo leva oito equipamentos e há onze coletas confirmadas.",
    "decision": "Planejar ao menos duas viagens considerando os volumes individuais.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um componente previsto fica indisponível durante a execução.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de coleta de equipamentos usados",
      "Base de análise: ficha de equipamento e condição",
      "Conferência de evidências: controle de peças e autorizações",
      "Memória de decisão — Um veículo leva oito equipamentos e há onze coletas confirmadas",
      "Simulação da mudança: um componente previsto fica indisponível durante a execução",
      "Relatório de transferência para planejador de serviços de reparação"
    ]
  },
  {
    "id": "classificacao-comercial-de-eletronicos-recondicionados",
    "scenario": "Dois aparelhos passam no teste funcional e um apresenta desgaste externo.",
    "decision": "Registrar separadamente estado funcional e classe cosmética.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um componente previsto fica indisponível durante a execução.",
    "tasks": [
      "Dossiê de trabalho — Classificação comercial de eletrônicos recondicionados",
      "Base de análise: ficha de equipamento e condição",
      "Conferência de evidências: controle de peças e autorizações",
      "Memória de decisão — Dois aparelhos passam no teste funcional e um apresenta desgaste externo",
      "Simulação da mudança: um componente previsto fica indisponível durante a execução",
      "Relatório de transferência para planejador de serviços de reparação"
    ]
  },
  {
    "id": "catalogos-de-compatibilidade-de-pecas",
    "scenario": "Peças de encaixe idêntico têm revisões incompatíveis no catálogo.",
    "decision": "Conferir modelo e revisão homologados antes de recomendar a substituição.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um componente previsto fica indisponível durante a execução.",
    "tasks": [
      "Dossiê de trabalho — Catálogos de compatibilidade de peças",
      "Base de análise: ficha de equipamento e condição",
      "Conferência de evidências: controle de peças e autorizações",
      "Memória de decisão — Peças de encaixe idêntico têm revisões incompatíveis no catálogo",
      "Simulação da mudança: um componente previsto fica indisponível durante a execução",
      "Relatório de transferência para planejador de serviços de reparação"
    ]
  },
  {
    "id": "controle-de-creditos-por-componentes-devolvidos",
    "scenario": "Saíram dez componentes para devolução e o fornecedor creditou sete.",
    "decision": "Confrontar remessas e notas de crédito para identificar três pendências.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um componente previsto fica indisponível durante a execução.",
    "tasks": [
      "Dossiê de trabalho — Controle de créditos por componentes devolvidos",
      "Base de análise: ficha de equipamento e condição",
      "Conferência de evidências: controle de peças e autorizações",
      "Memória de decisão — Saíram dez componentes para devolução e o fornecedor creditou sete",
      "Simulação da mudança: um componente previsto fica indisponível durante a execução",
      "Relatório de transferência para planejador de serviços de reparação"
    ]
  },
  {
    "id": "precificacao-de-contratos-de-reparo",
    "scenario": "Um contrato prevê 80 chamados a 25 de custo médio e 600 fixos.",
    "decision": "Estimar 2600 no cenário-base e testar uma frequência maior antes da proposta.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um componente previsto fica indisponível durante a execução.",
    "tasks": [
      "Dossiê de trabalho — Precificação de contratos de reparo",
      "Base de análise: ficha de equipamento e condição",
      "Conferência de evidências: controle de peças e autorizações",
      "Memória de decisão — Um contrato prevê 80 chamados a 25 de custo médio e 600 fixos",
      "Simulação da mudança: um componente previsto fica indisponível durante a execução",
      "Relatório de transferência para planejador de serviços de reparação"
    ]
  },
  {
    "id": "planejamento-de-oficinas-comunitarias",
    "scenario": "Há quatro bancadas mas apenas dois orientadores para atividades supervisionadas.",
    "decision": "Limitar as sessões pelo recurso de supervisão e abrir horários adicionais.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um componente previsto fica indisponível durante a execução.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de oficinas comunitárias",
      "Base de análise: ficha de equipamento e condição",
      "Conferência de evidências: controle de peças e autorizações",
      "Memória de decisão — Há quatro bancadas mas apenas dois orientadores para atividades supervisionadas",
      "Simulação da mudança: um componente previsto fica indisponível durante a execução",
      "Relatório de transferência para planejador de serviços de reparação"
    ]
  },
  {
    "id": "gestao-de-pecas-descontinuadas",
    "scenario": "Uma peça saiu de linha e o substituto tem compatibilidade apenas declarada pelo vendedor.",
    "decision": "Distinguir equivalência documentada e hipótese antes de prometer prazo.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um componente previsto fica indisponível durante a execução.",
    "tasks": [
      "Dossiê de trabalho — Gestão de peças descontinuadas",
      "Base de análise: ficha de equipamento e condição",
      "Conferência de evidências: controle de peças e autorizações",
      "Memória de decisão — Uma peça saiu de linha e o substituto tem compatibilidade apenas declarada pelo vendedor",
      "Simulação da mudança: um componente previsto fica indisponível durante a execução",
      "Relatório de transferência para planejador de serviços de reparação"
    ]
  }
];

export default cases;

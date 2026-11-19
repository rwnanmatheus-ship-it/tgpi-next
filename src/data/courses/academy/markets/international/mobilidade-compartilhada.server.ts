import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "redistribuicao-de-bicicletas-por-estacao",
    "scenario": "Uma estação tem 2 bicicletas e previsão de 12 retiradas líquidas; outra tem excedente de 8.",
    "decision": "Transferir até oito e registrar déficit remanescente de duas no cenário previsto.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma estação fica temporariamente indisponível.",
    "tasks": [
      "Dossiê de trabalho — Redistribuição de bicicletas por estação",
      "Base de análise: posição de frota por zona",
      "Conferência de evidências: registro de viagens e disponibilidade",
      "Memória de decisão — Uma estação tem 2 bicicletas e previsão de 12 retiradas líquidas; outra tem excedente de 8",
      "Simulação da mudança: uma estação fica temporariamente indisponível",
      "Relatório de transferência para analista de mobilidade compartilhada"
    ]
  },
  {
    "id": "dimensionamento-de-frota-de-carsharing",
    "scenario": "A frota tem 40 carros mas seis estão em manutenção e cinco reservados na mesma janela.",
    "decision": "Considerar 29 disponíveis para novas reservas nessa janela.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma estação fica temporariamente indisponível.",
    "tasks": [
      "Dossiê de trabalho — Dimensionamento de frota de carsharing",
      "Base de análise: posição de frota por zona",
      "Conferência de evidências: registro de viagens e disponibilidade",
      "Memória de decisão — A frota tem 40 carros mas seis estão em manutenção e cinco reservados na mesma janela",
      "Simulação da mudança: uma estação fica temporariamente indisponível",
      "Relatório de transferência para analista de mobilidade compartilhada"
    ]
  },
  {
    "id": "planejamento-de-areas-de-estacionamento-compartilhado",
    "scenario": "A zona permite 36 bicicletas mas já abriga 28 e prevê 12 devoluções líquidas.",
    "decision": "Prever excedente de quatro e planejar redistribuição ou alternativa de devolução.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma estação fica temporariamente indisponível.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de áreas de estacionamento compartilhado",
      "Base de análise: posição de frota por zona",
      "Conferência de evidências: registro de viagens e disponibilidade",
      "Memória de decisão — A zona permite 36 bicicletas mas já abriga 28 e prevê 12 devoluções líquidas",
      "Simulação da mudança: uma estação fica temporariamente indisponível",
      "Relatório de transferência para analista de mobilidade compartilhada"
    ]
  },
  {
    "id": "auditoria-de-disponibilidade-de-veiculos",
    "scenario": "O painel mostra veículo livre porém a última confirmação ocorreu antes da manutenção.",
    "decision": "Conciliar telemetria, ordem de serviço e estado liberado antes de oferecer o veículo.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma estação fica temporariamente indisponível.",
    "tasks": [
      "Dossiê de trabalho — Auditoria de disponibilidade de veículos",
      "Base de análise: posição de frota por zona",
      "Conferência de evidências: registro de viagens e disponibilidade",
      "Memória de decisão — O painel mostra veículo livre porém a última confirmação ocorreu antes da manutenção",
      "Simulação da mudança: uma estação fica temporariamente indisponível",
      "Relatório de transferência para analista de mobilidade compartilhada"
    ]
  },
  {
    "id": "analise-de-cancelamentos-em-viagens-compartilhadas",
    "scenario": "Há 24 cancelamentos em 200 reservas e dez ocorreram após falha de retirada.",
    "decision": "Reportar taxa total de 12% e decompor causa operacional verificada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma estação fica temporariamente indisponível.",
    "tasks": [
      "Dossiê de trabalho — Análise de cancelamentos em viagens compartilhadas",
      "Base de análise: posição de frota por zona",
      "Conferência de evidências: registro de viagens e disponibilidade",
      "Memória de decisão — Há 24 cancelamentos em 200 reservas e dez ocorreram após falha de retirada",
      "Simulação da mudança: uma estação fica temporariamente indisponível",
      "Relatório de transferência para analista de mobilidade compartilhada"
    ]
  },
  {
    "id": "gestao-de-assinaturas-de-mobilidade",
    "scenario": "Uma assinatura inclui 30 viagens, três lançamentos duplicados elevaram o uso registrado a 32.",
    "decision": "Conciliar viagens únicas antes de aplicar cobrança excedente.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma estação fica temporariamente indisponível.",
    "tasks": [
      "Dossiê de trabalho — Gestão de assinaturas de mobilidade",
      "Base de análise: posição de frota por zona",
      "Conferência de evidências: registro de viagens e disponibilidade",
      "Memória de decisão — Uma assinatura inclui 30 viagens, três lançamentos duplicados elevaram o uso registrado a 32",
      "Simulação da mudança: uma estação fica temporariamente indisponível",
      "Relatório de transferência para analista de mobilidade compartilhada"
    ]
  },
  {
    "id": "atendimento-a-objetos-esquecidos-em-frotas",
    "scenario": "Um item foi entregue pelo condutor mas duas solicitações têm descrições parecidas.",
    "decision": "Preservar cadeia de guarda e comparar atributos distintivos antes da devolução.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma estação fica temporariamente indisponível.",
    "tasks": [
      "Dossiê de trabalho — Atendimento a objetos esquecidos em frotas",
      "Base de análise: posição de frota por zona",
      "Conferência de evidências: registro de viagens e disponibilidade",
      "Memória de decisão — Um item foi entregue pelo condutor mas duas solicitações têm descrições parecidas",
      "Simulação da mudança: uma estação fica temporariamente indisponível",
      "Relatório de transferência para analista de mobilidade compartilhada"
    ]
  },
  {
    "id": "planejamento-de-oficinas-para-micromobilidade",
    "scenario": "A oficina inspeciona oito bicicletas por turno e recebe 22 para dois turnos.",
    "decision": "Prever saldo de seis e priorizar triagem por estado documentado.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma estação fica temporariamente indisponível.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de oficinas para micromobilidade",
      "Base de análise: posição de frota por zona",
      "Conferência de evidências: registro de viagens e disponibilidade",
      "Memória de decisão — A oficina inspeciona oito bicicletas por turno e recebe 22 para dois turnos",
      "Simulação da mudança: uma estação fica temporariamente indisponível",
      "Relatório de transferência para analista de mobilidade compartilhada"
    ]
  },
  {
    "id": "analise-de-sazonalidade-de-ciclovias",
    "scenario": "A contagem anual subiu mas o equipamento ficou desligado em semanas chuvosas.",
    "decision": "Comparar períodos com cobertura equivalente e marcar lacunas de observação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma estação fica temporariamente indisponível.",
    "tasks": [
      "Dossiê de trabalho — Análise de sazonalidade de ciclovias",
      "Base de análise: posição de frota por zona",
      "Conferência de evidências: registro de viagens e disponibilidade",
      "Memória de decisão — A contagem anual subiu mas o equipamento ficou desligado em semanas chuvosas",
      "Simulação da mudança: uma estação fica temporariamente indisponível",
      "Relatório de transferência para analista de mobilidade compartilhada"
    ]
  },
  {
    "id": "operacao-de-programas-corporativos-de-mobilidade",
    "scenario": "Uma empresa contratou 150 créditos e o painel registra 120 usos mais 12 estornos destes.",
    "decision": "Conciliar consumo líquido de 108 créditos com a fatura.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma estação fica temporariamente indisponível.",
    "tasks": [
      "Dossiê de trabalho — Operação de programas corporativos de mobilidade",
      "Base de análise: posição de frota por zona",
      "Conferência de evidências: registro de viagens e disponibilidade",
      "Memória de decisão — Uma empresa contratou 150 créditos e o painel registra 120 usos mais 12 estornos destes",
      "Simulação da mudança: uma estação fica temporariamente indisponível",
      "Relatório de transferência para analista de mobilidade compartilhada"
    ]
  }
];

export default cases;

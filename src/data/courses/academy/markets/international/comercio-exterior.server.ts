import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "conciliacao-de-pedidos-e-listas-de-volumes",
    "scenario": "Um pedido tem 24 unidades em seis caixas e a lista descreve seis unidades.",
    "decision": "Reconciliar nível de embalagem e quantidade comercial antes de liberar o documento.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A coleta muda para o dia seguinte e um documento já foi emitido.",
    "tasks": [
      "Dossiê de trabalho — Conciliação de pedidos e listas de volumes",
      "Base de análise: dossiê de remessa e volume",
      "Conferência de evidências: mapa de custos e janelas",
      "Memória de decisão — Um pedido tem 24 unidades em seis caixas e a lista descreve seis unidades",
      "Simulação da mudança: a coleta muda para o dia seguinte e um documento já foi emitido",
      "Relatório de transferência para analista de operações de comércio exterior"
    ]
  },
  {
    "id": "planejamento-de-consolidacao-de-cargas-pequenas",
    "scenario": "Duas cargas somam 12 m³ num espaço de 15 mas uma não permite empilhamento.",
    "decision": "Verificar área, geometria e restrições antes de aprovar a consolidação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A coleta muda para o dia seguinte e um documento já foi emitido.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de consolidação de cargas pequenas",
      "Base de análise: dossiê de remessa e volume",
      "Conferência de evidências: mapa de custos e janelas",
      "Memória de decisão — Duas cargas somam 12 m³ num espaço de 15 mas uma não permite empilhamento",
      "Simulação da mudança: a coleta muda para o dia seguinte e um documento já foi emitido",
      "Relatório de transferência para analista de operações de comércio exterior"
    ]
  },
  {
    "id": "analise-de-custos-de-armazenagem-portuaria",
    "scenario": "A tabela simulada isenta três dias e cobra 40 por dia adicional; a permanência foi sete dias.",
    "decision": "Estimar 160 sob essa regra e conferir o marco de início da contagem.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A coleta muda para o dia seguinte e um documento já foi emitido.",
    "tasks": [
      "Dossiê de trabalho — Análise de custos de armazenagem portuária",
      "Base de análise: dossiê de remessa e volume",
      "Conferência de evidências: mapa de custos e janelas",
      "Memória de decisão — A tabela simulada isenta três dias e cobra 40 por dia adicional; a permanência foi sete dias",
      "Simulação da mudança: a coleta muda para o dia seguinte e um documento já foi emitido",
      "Relatório de transferência para analista de operações de comércio exterior"
    ]
  },
  {
    "id": "comparacao-comercial-de-propostas-de-frete",
    "scenario": "Uma proposta inclui coleta e outra começa apenas no terminal.",
    "decision": "Somar os serviços ausentes para comparar o mesmo percurso e moeda.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A coleta muda para o dia seguinte e um documento já foi emitido.",
    "tasks": [
      "Dossiê de trabalho — Comparação comercial de propostas de frete",
      "Base de análise: dossiê de remessa e volume",
      "Conferência de evidências: mapa de custos e janelas",
      "Memória de decisão — Uma proposta inclui coleta e outra começa apenas no terminal",
      "Simulação da mudança: a coleta muda para o dia seguinte e um documento já foi emitido",
      "Relatório de transferência para analista de operações de comércio exterior"
    ]
  },
  {
    "id": "gestao-de-amostras-em-feiras-internacionais",
    "scenario": "Saíram 45 amostras, 20 foram distribuídas e 18 retornaram ao expositor.",
    "decision": "Investigar sete unidades ainda sem destino registrado.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A coleta muda para o dia seguinte e um documento já foi emitido.",
    "tasks": [
      "Dossiê de trabalho — Gestão de amostras em feiras internacionais",
      "Base de análise: dossiê de remessa e volume",
      "Conferência de evidências: mapa de custos e janelas",
      "Memória de decisão — Saíram 45 amostras, 20 foram distribuídas e 18 retornaram ao expositor",
      "Simulação da mudança: a coleta muda para o dia seguinte e um documento já foi emitido",
      "Relatório de transferência para analista de operações de comércio exterior"
    ]
  },
  {
    "id": "planejamento-de-retorno-de-expositores",
    "scenario": "O estande desmonta às 18h e a coleta está marcada para 17h30.",
    "decision": "Reprogramar retirada considerando embalagem e liberação do espaço.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A coleta muda para o dia seguinte e um documento já foi emitido.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de retorno de expositores",
      "Base de análise: dossiê de remessa e volume",
      "Conferência de evidências: mapa de custos e janelas",
      "Memória de decisão — O estande desmonta às 18h e a coleta está marcada para 17h30",
      "Simulação da mudança: a coleta muda para o dia seguinte e um documento já foi emitido",
      "Relatório de transferência para analista de operações de comércio exterior"
    ]
  },
  {
    "id": "controle-de-documentacao-de-origem-declarada",
    "scenario": "A declaração cita o fornecedor anterior após alteração de origem informada.",
    "decision": "Rastrear o lote e solicitar documentação vigente antes de aceitar a alegação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A coleta muda para o dia seguinte e um documento já foi emitido.",
    "tasks": [
      "Dossiê de trabalho — Controle de documentação de origem declarada",
      "Base de análise: dossiê de remessa e volume",
      "Conferência de evidências: mapa de custos e janelas",
      "Memória de decisão — A declaração cita o fornecedor anterior após alteração de origem informada",
      "Simulação da mudança: a coleta muda para o dia seguinte e um documento já foi emitido",
      "Relatório de transferência para analista de operações de comércio exterior"
    ]
  },
  {
    "id": "analise-de-avarias-por-rota-comercial",
    "scenario": "Uma rota teve 5 avarias em 50 cargas e outra 9 em 300.",
    "decision": "Comparar incidências de 10% e 3% com a composição de cargas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A coleta muda para o dia seguinte e um documento já foi emitido.",
    "tasks": [
      "Dossiê de trabalho — Análise de avarias por rota comercial",
      "Base de análise: dossiê de remessa e volume",
      "Conferência de evidências: mapa de custos e janelas",
      "Memória de decisão — Uma rota teve 5 avarias em 50 cargas e outra 9 em 300",
      "Simulação da mudança: a coleta muda para o dia seguinte e um documento já foi emitido",
      "Relatório de transferência para analista de operações de comércio exterior"
    ]
  },
  {
    "id": "gestao-de-catalogos-multilingues-de-exportacao",
    "scenario": "Um código de produto tem descrições divergentes de dimensão em dois idiomas.",
    "decision": "Fixar ficha mestre, unidade e revisão para republicar descrições consistentes.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A coleta muda para o dia seguinte e um documento já foi emitido.",
    "tasks": [
      "Dossiê de trabalho — Gestão de catálogos multilíngues de exportação",
      "Base de análise: dossiê de remessa e volume",
      "Conferência de evidências: mapa de custos e janelas",
      "Memória de decisão — Um código de produto tem descrições divergentes de dimensão em dois idiomas",
      "Simulação da mudança: a coleta muda para o dia seguinte e um documento já foi emitido",
      "Relatório de transferência para analista de operações de comércio exterior"
    ]
  },
  {
    "id": "programacao-de-coletas-de-fornecedores-externos",
    "scenario": "A coleta agrupa dois fornecedores mas um libera a mercadoria após o fechamento do terminal.",
    "decision": "Reordenar coleta ou separar remessa e registrar o impacto no prazo.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A coleta muda para o dia seguinte e um documento já foi emitido.",
    "tasks": [
      "Dossiê de trabalho — Programação de coletas de fornecedores externos",
      "Base de análise: dossiê de remessa e volume",
      "Conferência de evidências: mapa de custos e janelas",
      "Memória de decisão — A coleta agrupa dois fornecedores mas um libera a mercadoria após o fechamento do terminal",
      "Simulação da mudança: a coleta muda para o dia seguinte e um documento já foi emitido",
      "Relatório de transferência para analista de operações de comércio exterior"
    ]
  }
];

export default cases;

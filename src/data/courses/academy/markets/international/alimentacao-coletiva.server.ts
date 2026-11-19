import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "escalas-de-equipes-de-cozinha-institucional",
    "scenario": "3 postos precisam de cobertura simultânea por 4h; dois colaboradores têm 4h e dois têm 2h cada.",
    "decision": "Escalonar as duas jornadas curtas em sequência no terceiro posto e conferir pausas separadamente.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma escola antecipa o intervalo e o fornecedor mantém o horário.",
    "tasks": [
      "Dossiê de trabalho — Escalas de equipes de cozinha institucional",
      "Base de análise: mapa de turnos e volumes",
      "Conferência de evidências: ficha de porções e perdas",
      "Memória de decisão — 3 postos precisam de cobertura simultânea por 4h; dois colaboradores têm 4h e dois têm 2h cada",
      "Simulação da mudança: uma escola antecipa o intervalo e o fornecedor mantém o horário",
      "Relatório de transferência para analista de operações de alimentação coletiva"
    ]
  },
  {
    "id": "dimensionamento-de-porcoes-em-refeitorios",
    "scenario": "São esperados 240 usuários; 70% escolhem o acompanhamento de 120 g.",
    "decision": "Reservar 20,16 kg líquidos antes de aplicar a perda de preparo observada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma escola antecipa o intervalo e o fornecedor mantém o horário.",
    "tasks": [
      "Dossiê de trabalho — Dimensionamento de porções em refeitórios",
      "Base de análise: mapa de turnos e volumes",
      "Conferência de evidências: ficha de porções e perdas",
      "Memória de decisão — São esperados 240 usuários; 70% escolhem o acompanhamento de 120 g",
      "Simulação da mudança: uma escola antecipa o intervalo e o fornecedor mantém o horário",
      "Relatório de transferência para analista de operações de alimentação coletiva"
    ]
  },
  {
    "id": "engenharia-de-cardapio-por-margem",
    "scenario": "A oferece contribuição de 4 por prato e vende 80; B contribui 6 e vende 40.",
    "decision": "Comparar contribuição total de 320 com 240 antes de retirar A.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma escola antecipa o intervalo e o fornecedor mantém o horário.",
    "tasks": [
      "Dossiê de trabalho — Engenharia de cardápio por margem",
      "Base de análise: mapa de turnos e volumes",
      "Conferência de evidências: ficha de porções e perdas",
      "Memória de decisão — A oferece contribuição de 4 por prato e vende 80; B contribui 6 e vende 40",
      "Simulação da mudança: uma escola antecipa o intervalo e o fornecedor mantém o horário",
      "Relatório de transferência para analista de operações de alimentação coletiva"
    ]
  },
  {
    "id": "medicao-de-desperdicio-no-prato",
    "scenario": "Dos 90 kg servidos, 12 retornam nos pratos e 3 ficam na distribuição.",
    "decision": "Calcular retorno de prato sobre servido, 13,33%, e registrar a sobra separadamente.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma escola antecipa o intervalo e o fornecedor mantém o horário.",
    "tasks": [
      "Dossiê de trabalho — Medição de desperdício no prato",
      "Base de análise: mapa de turnos e volumes",
      "Conferência de evidências: ficha de porções e perdas",
      "Memória de decisão — Dos 90 kg servidos, 12 retornam nos pratos e 3 ficam na distribuição",
      "Simulação da mudança: uma escola antecipa o intervalo e o fornecedor mantém o horário",
      "Relatório de transferência para analista de operações de alimentação coletiva"
    ]
  },
  {
    "id": "planejamento-de-refeicoes-em-eventos-esportivos",
    "scenario": "Há 600 inscritos, 420 vales confirmados e duas ondas de chegada desiguais.",
    "decision": "Dimensionar por vales e horário de chegada, testando o limite superior de 600.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma escola antecipa o intervalo e o fornecedor mantém o horário.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de refeições em eventos esportivos",
      "Base de análise: mapa de turnos e volumes",
      "Conferência de evidências: ficha de porções e perdas",
      "Memória de decisão — Há 600 inscritos, 420 vales confirmados e duas ondas de chegada desiguais",
      "Simulação da mudança: uma escola antecipa o intervalo e o fornecedor mantém o horário",
      "Relatório de transferência para analista de operações de alimentação coletiva"
    ]
  },
  {
    "id": "programacao-de-preparo-por-turno-escolar",
    "scenario": "Dois turnos exigem 140 e 100 porções; a cozinha libera lotes de 60.",
    "decision": "Programar quatro lotes e distinguir excedente no primeiro turno de saldo utilizável no segundo.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma escola antecipa o intervalo e o fornecedor mantém o horário.",
    "tasks": [
      "Dossiê de trabalho — Programação de preparo por turno escolar",
      "Base de análise: mapa de turnos e volumes",
      "Conferência de evidências: ficha de porções e perdas",
      "Memória de decisão — Dois turnos exigem 140 e 100 porções; a cozinha libera lotes de 60",
      "Simulação da mudança: uma escola antecipa o intervalo e o fornecedor mantém o horário",
      "Relatório de transferência para analista de operações de alimentação coletiva"
    ]
  },
  {
    "id": "controle-de-substituicoes-de-ingredientes-em-fichas",
    "scenario": "A ficha aprovada usa ingrediente X; Y tem composição e rendimento diferentes.",
    "decision": "Bloquear a troca automática e solicitar validação da ficha e da informação de alergênicos.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma escola antecipa o intervalo e o fornecedor mantém o horário.",
    "tasks": [
      "Dossiê de trabalho — Controle de substituições de ingredientes em fichas",
      "Base de análise: mapa de turnos e volumes",
      "Conferência de evidências: ficha de porções e perdas",
      "Memória de decisão — A ficha aprovada usa ingrediente X; Y tem composição e rendimento diferentes",
      "Simulação da mudança: uma escola antecipa o intervalo e o fornecedor mantém o horário",
      "Relatório de transferência para analista de operações de alimentação coletiva"
    ]
  },
  {
    "id": "contratacao-de-servicos-de-alimentacao-coletiva",
    "scenario": "Uma oferta inclui transporte e outra cobra 0,80 por refeição em 500 refeições.",
    "decision": "Acrescentar 400 à segunda proposta antes de comparar o mesmo escopo.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma escola antecipa o intervalo e o fornecedor mantém o horário.",
    "tasks": [
      "Dossiê de trabalho — Contratação de serviços de alimentação coletiva",
      "Base de análise: mapa de turnos e volumes",
      "Conferência de evidências: ficha de porções e perdas",
      "Memória de decisão — Uma oferta inclui transporte e outra cobra 0,80 por refeição em 500 refeições",
      "Simulação da mudança: uma escola antecipa o intervalo e o fornecedor mantém o horário",
      "Relatório de transferência para analista de operações de alimentação coletiva"
    ]
  },
  {
    "id": "analise-de-filas-em-pracas-de-alimentacao",
    "scenario": "Entram 54 clientes em meia hora e o caixa atende 48 no mesmo intervalo.",
    "decision": "Prever acréscimo de seis pessoas à fila e identificar a faixa crítica.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma escola antecipa o intervalo e o fornecedor mantém o horário.",
    "tasks": [
      "Dossiê de trabalho — Análise de filas em praças de alimentação",
      "Base de análise: mapa de turnos e volumes",
      "Conferência de evidências: ficha de porções e perdas",
      "Memória de decisão — Entram 54 clientes em meia hora e o caixa atende 48 no mesmo intervalo",
      "Simulação da mudança: uma escola antecipa o intervalo e o fornecedor mantém o horário",
      "Relatório de transferência para analista de operações de alimentação coletiva"
    ]
  },
  {
    "id": "gestao-de-recipientes-retornaveis-em-catering",
    "scenario": "Saíram 180 caixas retornáveis, 135 voltaram e 15 têm devolução agendada.",
    "decision": "Conciliar 45 pendentes distinguindo 15 com prazo e 30 sem previsão.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma escola antecipa o intervalo e o fornecedor mantém o horário.",
    "tasks": [
      "Dossiê de trabalho — Gestão de recipientes retornáveis em catering",
      "Base de análise: mapa de turnos e volumes",
      "Conferência de evidências: ficha de porções e perdas",
      "Memória de decisão — Saíram 180 caixas retornáveis, 135 voltaram e 15 têm devolução agendada",
      "Simulação da mudança: uma escola antecipa o intervalo e o fornecedor mantém o horário",
      "Relatório de transferência para analista de operações de alimentação coletiva"
    ]
  }
];

export default cases;

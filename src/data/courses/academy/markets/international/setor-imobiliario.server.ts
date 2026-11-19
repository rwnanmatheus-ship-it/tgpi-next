import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "cadastro-de-unidades-para-locacao",
    "scenario": "Um edifício tem duas unidades 101 em blocos diferentes.",
    "decision": "Usar identificador composto de empreendimento, bloco e unidade antes de anunciar.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade muda de ocupante entre a medição e o fechamento.",
    "tasks": [
      "Dossiê de trabalho — Cadastro de unidades para locação",
      "Base de análise: cadastro de ambientes e ativos",
      "Conferência de evidências: mapa de ocupação e compromissos",
      "Memória de decisão — Um edifício tem duas unidades 101 em blocos diferentes",
      "Simulação da mudança: uma unidade muda de ocupante entre a medição e o fechamento",
      "Relatório de transferência para analista de operações imobiliárias"
    ]
  },
  {
    "id": "planejamento-de-vistoria-de-entrada",
    "scenario": "A vistoria tem fotos sem data e o inventário cita uma pintura posterior.",
    "decision": "Vincular observação, data, ambiente e versão antes do aceite.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade muda de ocupante entre a medição e o fechamento.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de vistoria de entrada",
      "Base de análise: cadastro de ambientes e ativos",
      "Conferência de evidências: mapa de ocupação e compromissos",
      "Memória de decisão — A vistoria tem fotos sem data e o inventário cita uma pintura posterior",
      "Simulação da mudança: uma unidade muda de ocupante entre a medição e o fechamento",
      "Relatório de transferência para analista de operações imobiliárias"
    ]
  },
  {
    "id": "gestao-de-vacancia-por-tipologia",
    "scenario": "Há 5 estúdios vazios entre 20 e 6 apartamentos vazios entre 60.",
    "decision": "Comparar vacâncias de 25% e 10% por tipologia.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade muda de ocupante entre a medição e o fechamento.",
    "tasks": [
      "Dossiê de trabalho — Gestão de vacância por tipologia",
      "Base de análise: cadastro de ambientes e ativos",
      "Conferência de evidências: mapa de ocupação e compromissos",
      "Memória de decisão — Há 5 estúdios vazios entre 20 e 6 apartamentos vazios entre 60",
      "Simulação da mudança: uma unidade muda de ocupante entre a medição e o fechamento",
      "Relatório de transferência para analista de operações imobiliárias"
    ]
  },
  {
    "id": "conciliacao-de-despesas-condominiais",
    "scenario": "Uma despesa anual de 12000 foi lançada integralmente como recorrente mensal.",
    "decision": "Separar desembolso e competência mensal de 1000 ao reconciliar o relatório.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade muda de ocupante entre a medição e o fechamento.",
    "tasks": [
      "Dossiê de trabalho — Conciliação de despesas condominiais",
      "Base de análise: cadastro de ambientes e ativos",
      "Conferência de evidências: mapa de ocupação e compromissos",
      "Memória de decisão — Uma despesa anual de 12000 foi lançada integralmente como recorrente mensal",
      "Simulação da mudança: uma unidade muda de ocupante entre a medição e o fechamento",
      "Relatório de transferência para analista de operações imobiliárias"
    ]
  },
  {
    "id": "operacoes-de-mudanca-em-edificios-comerciais",
    "scenario": "Duas mudanças reservam a única doca às 8h e o elevador tem janela mais curta.",
    "decision": "Coordenar doca e elevador como um conjunto de recursos reserváveis.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade muda de ocupante entre a medição e o fechamento.",
    "tasks": [
      "Dossiê de trabalho — Operações de mudança em edifícios comerciais",
      "Base de análise: cadastro de ambientes e ativos",
      "Conferência de evidências: mapa de ocupação e compromissos",
      "Memória de decisão — Duas mudanças reservam a única doca às 8h e o elevador tem janela mais curta",
      "Simulação da mudança: uma unidade muda de ocupante entre a medição e o fechamento",
      "Relatório de transferência para analista de operações imobiliárias"
    ]
  },
  {
    "id": "planejamento-de-utilizacao-de-escritorios-flexiveis",
    "scenario": "Há 100 mesas e 420 utilizações em cinco dias com terça-feira lotada.",
    "decision": "Registrar utilização média de 84% e preservar o pico diário na decisão.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade muda de ocupante entre a medição e o fechamento.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de utilização de escritórios flexíveis",
      "Base de análise: cadastro de ambientes e ativos",
      "Conferência de evidências: mapa de ocupação e compromissos",
      "Memória de decisão — Há 100 mesas e 420 utilizações em cinco dias com terça-feira lotada",
      "Simulação da mudança: uma unidade muda de ocupante entre a medição e o fechamento",
      "Relatório de transferência para analista de operações imobiliárias"
    ]
  },
  {
    "id": "gestao-de-reservas-de-areas-compartilhadas",
    "scenario": "Uma reserva ocupa o auditório até 18h e exige limpeza antes da sessão das 18h15.",
    "decision": "Medir o intervalo necessário antes de aprovar a próxima reserva.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade muda de ocupante entre a medição e o fechamento.",
    "tasks": [
      "Dossiê de trabalho — Gestão de reservas de áreas compartilhadas",
      "Base de análise: cadastro de ambientes e ativos",
      "Conferência de evidências: mapa de ocupação e compromissos",
      "Memória de decisão — Uma reserva ocupa o auditório até 18h e exige limpeza antes da sessão das 18h15",
      "Simulação da mudança: uma unidade muda de ocupante entre a medição e o fechamento",
      "Relatório de transferência para analista de operações imobiliárias"
    ]
  },
  {
    "id": "coordenacao-de-manutencao-entre-locacoes",
    "scenario": "A unidade ficará disponível em dez dias e a pintura só começa após reparo de quatro dias.",
    "decision": "Construir caminho de dependências e verificar a data de entrada prometida.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade muda de ocupante entre a medição e o fechamento.",
    "tasks": [
      "Dossiê de trabalho — Coordenação de manutenção entre locações",
      "Base de análise: cadastro de ambientes e ativos",
      "Conferência de evidências: mapa de ocupação e compromissos",
      "Memória de decisão — A unidade ficará disponível em dez dias e a pintura só começa após reparo de quatro dias",
      "Simulação da mudança: uma unidade muda de ocupante entre a medição e o fechamento",
      "Relatório de transferência para analista de operações imobiliárias"
    ]
  },
  {
    "id": "gestao-de-inventario-de-imoveis-mobiliados",
    "scenario": "A lista mostra duas cadeiras de mesmo modelo com estados diferentes.",
    "decision": "Identificar cada item, estado e fotografia antes da transferência.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade muda de ocupante entre a medição e o fechamento.",
    "tasks": [
      "Dossiê de trabalho — Gestão de inventário de imóveis mobiliados",
      "Base de análise: cadastro de ambientes e ativos",
      "Conferência de evidências: mapa de ocupação e compromissos",
      "Memória de decisão — A lista mostra duas cadeiras de mesmo modelo com estados diferentes",
      "Simulação da mudança: uma unidade muda de ocupante entre a medição e o fechamento",
      "Relatório de transferência para analista de operações imobiliárias"
    ]
  },
  {
    "id": "analise-de-renovacao-de-contratos-de-ocupacao",
    "scenario": "Dos 50 contratos elegíveis, 30 renovaram e dez renegociam metragem.",
    "decision": "Separar renovação fechada de oportunidade em negociação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade muda de ocupante entre a medição e o fechamento.",
    "tasks": [
      "Dossiê de trabalho — Análise de renovação de contratos de ocupação",
      "Base de análise: cadastro de ambientes e ativos",
      "Conferência de evidências: mapa de ocupação e compromissos",
      "Memória de decisão — Dos 50 contratos elegíveis, 30 renovaram e dez renegociam metragem",
      "Simulação da mudança: uma unidade muda de ocupante entre a medição e o fechamento",
      "Relatório de transferência para analista de operações imobiliárias"
    ]
  }
];

export default cases;

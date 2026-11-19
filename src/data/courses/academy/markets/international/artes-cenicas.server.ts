import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "programacao-de-temporadas-teatrais",
    "scenario": "Duas peças requerem o palco na mesma tarde para montagem.",
    "decision": "Modelar ensaio, montagem, sessão e desmontagem como intervalos ocupados.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma sessão muda de sala depois da abertura das reservas.",
    "tasks": [
      "Dossiê de trabalho — Programação de temporadas teatrais",
      "Base de análise: grade por espaço e sessão",
      "Conferência de evidências: mapa de equipe e compromissos",
      "Memória de decisão — Duas peças requerem o palco na mesma tarde para montagem",
      "Simulação da mudança: uma sessão muda de sala depois da abertura das reservas",
      "Relatório de transferência para produtor de artes cênicas"
    ]
  },
  {
    "id": "gestao-de-bilheteria-por-sessao",
    "scenario": "Há 220 lugares, 30 cortesias emitidas, 160 vendas e 15 bloqueios técnicos.",
    "decision": "Calcular 15 lugares disponíveis e registrar entradas efetivas separadamente.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma sessão muda de sala depois da abertura das reservas.",
    "tasks": [
      "Dossiê de trabalho — Gestão de bilheteria por sessão",
      "Base de análise: grade por espaço e sessão",
      "Conferência de evidências: mapa de equipe e compromissos",
      "Memória de decisão — Há 220 lugares, 30 cortesias emitidas, 160 vendas e 15 bloqueios técnicos",
      "Simulação da mudança: uma sessão muda de sala depois da abertura das reservas",
      "Relatório de transferência para produtor de artes cênicas"
    ]
  },
  {
    "id": "orcamento-de-circulacao-de-espetaculos",
    "scenario": "Três cidades pagam cachês iguais mas uma exige duas noites adicionais.",
    "decision": "Comparar resultado líquido por praça incluindo hospedagem incremental.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma sessão muda de sala depois da abertura das reservas.",
    "tasks": [
      "Dossiê de trabalho — Orçamento de circulação de espetáculos",
      "Base de análise: grade por espaço e sessão",
      "Conferência de evidências: mapa de equipe e compromissos",
      "Memória de decisão — Três cidades pagam cachês iguais mas uma exige duas noites adicionais",
      "Simulação da mudança: uma sessão muda de sala depois da abertura das reservas",
      "Relatório de transferência para produtor de artes cênicas"
    ]
  },
  {
    "id": "coordenacao-de-transporte-de-cenarios",
    "scenario": "Um cenário desmontado cabe em volume mas excede o comprimento útil do veículo.",
    "decision": "Validar dimensão máxima de cada módulo antes de reservar transporte.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma sessão muda de sala depois da abertura das reservas.",
    "tasks": [
      "Dossiê de trabalho — Coordenação de transporte de cenários",
      "Base de análise: grade por espaço e sessão",
      "Conferência de evidências: mapa de equipe e compromissos",
      "Memória de decisão — Um cenário desmontado cabe em volume mas excede o comprimento útil do veículo",
      "Simulação da mudança: uma sessão muda de sala depois da abertura das reservas",
      "Relatório de transferência para produtor de artes cênicas"
    ]
  },
  {
    "id": "gestao-de-reservas-de-salas-de-ensaio",
    "scenario": "Uma sala está livre mas o ensaio precisa de piano disponível em outra sala.",
    "decision": "Alocar sala e recurso conjuntamente antes da confirmação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma sessão muda de sala depois da abertura das reservas.",
    "tasks": [
      "Dossiê de trabalho — Gestão de reservas de salas de ensaio",
      "Base de análise: grade por espaço e sessão",
      "Conferência de evidências: mapa de equipe e compromissos",
      "Memória de decisão — Uma sala está livre mas o ensaio precisa de piano disponível em outra sala",
      "Simulação da mudança: uma sessão muda de sala depois da abertura das reservas",
      "Relatório de transferência para produtor de artes cênicas"
    ]
  },
  {
    "id": "planejamento-de-acessibilidade-em-apresentacoes",
    "scenario": "A apresentação oferece interpretação em uma sessão sem divulgação no bilhete.",
    "decision": "Vincular recurso, horário, localização e informação no processo de reserva.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma sessão muda de sala depois da abertura das reservas.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de acessibilidade em apresentações",
      "Base de análise: grade por espaço e sessão",
      "Conferência de evidências: mapa de equipe e compromissos",
      "Memória de decisão — A apresentação oferece interpretação em uma sessão sem divulgação no bilhete",
      "Simulação da mudança: uma sessão muda de sala depois da abertura das reservas",
      "Relatório de transferência para produtor de artes cênicas"
    ]
  },
  {
    "id": "coordenacao-de-equipes-de-frente-de-sala",
    "scenario": "Duas entradas abrem ao mesmo tempo e uma atende grupos com check-in demorado.",
    "decision": "Dimensionar postos por taxa de chegada e tempo de atendimento de cada acesso.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma sessão muda de sala depois da abertura das reservas.",
    "tasks": [
      "Dossiê de trabalho — Coordenação de equipes de frente de sala",
      "Base de análise: grade por espaço e sessão",
      "Conferência de evidências: mapa de equipe e compromissos",
      "Memória de decisão — Duas entradas abrem ao mesmo tempo e uma atende grupos com check-in demorado",
      "Simulação da mudança: uma sessão muda de sala depois da abertura das reservas",
      "Relatório de transferência para produtor de artes cênicas"
    ]
  },
  {
    "id": "controle-de-ocupacao-em-festivais",
    "scenario": "Foram registradas 900 entradas e 240 saídas; limite simulado de 700 pessoas.",
    "decision": "Estimar 660 presentes e conferir falhas de contagem antes de liberar nova entrada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma sessão muda de sala depois da abertura das reservas.",
    "tasks": [
      "Dossiê de trabalho — Controle de ocupação em festivais",
      "Base de análise: grade por espaço e sessão",
      "Conferência de evidências: mapa de equipe e compromissos",
      "Memória de decisão — Foram registradas 900 entradas e 240 saídas; limite simulado de 700 pessoas",
      "Simulação da mudança: uma sessão muda de sala depois da abertura das reservas",
      "Relatório de transferência para produtor de artes cênicas"
    ]
  },
  {
    "id": "gestao-de-contratos-de-coproducao-artistica",
    "scenario": "Um parceiro paga custos de sala e outro recebe receita bruta antes do rateio.",
    "decision": "Montar demonstrativo de despesas elegíveis e sequência de distribuição contratada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma sessão muda de sala depois da abertura das reservas.",
    "tasks": [
      "Dossiê de trabalho — Gestão de contratos de coprodução artística",
      "Base de análise: grade por espaço e sessão",
      "Conferência de evidências: mapa de equipe e compromissos",
      "Memória de decisão — Um parceiro paga custos de sala e outro recebe receita bruta antes do rateio",
      "Simulação da mudança: uma sessão muda de sala depois da abertura das reservas",
      "Relatório de transferência para produtor de artes cênicas"
    ]
  },
  {
    "id": "medicao-de-recorrencia-de-publico-cultural",
    "scenario": "Houve 500 visitas de 320 pessoas identificadas e 50 entradas sem identificação.",
    "decision": "Separar visitas, pessoas e incerteza antes de estimar recorrência.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma sessão muda de sala depois da abertura das reservas.",
    "tasks": [
      "Dossiê de trabalho — Medição de recorrência de público cultural",
      "Base de análise: grade por espaço e sessão",
      "Conferência de evidências: mapa de equipe e compromissos",
      "Memória de decisão — Houve 500 visitas de 320 pessoas identificadas e 50 entradas sem identificação",
      "Simulação da mudança: uma sessão muda de sala depois da abertura das reservas",
      "Relatório de transferência para produtor de artes cênicas"
    ]
  }
];

export default cases;

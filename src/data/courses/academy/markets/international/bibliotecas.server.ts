import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "desenvolvimento-de-colecoes-multilingues",
    "scenario": "A coleção tem 500 títulos mas a língua com maior lista de espera possui apenas dez.",
    "decision": "Cruzar demanda por idioma, disponibilidade e orçamento no plano de aquisição.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma condição de acesso é alterada depois da primeira solicitação.",
    "tasks": [
      "Dossiê de trabalho — Desenvolvimento de coleções multilíngues",
      "Base de análise: registro de item e autoridade",
      "Conferência de evidências: mapa de acesso e disponibilidade",
      "Memória de decisão — A coleção tem 500 títulos mas a língua com maior lista de espera possui apenas dez",
      "Simulação da mudança: uma condição de acesso é alterada depois da primeira solicitação",
      "Relatório de transferência para analista de serviços bibliotecários"
    ]
  },
  {
    "id": "aquisicao-cooperativa-de-periodicos",
    "scenario": "Três bibliotecas pagam pelo mesmo título e as licenças têm escopos diferentes.",
    "decision": "Comparar cobertura contratual e acesso simultâneo antes da compra conjunta.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma condição de acesso é alterada depois da primeira solicitação.",
    "tasks": [
      "Dossiê de trabalho — Aquisição cooperativa de periódicos",
      "Base de análise: registro de item e autoridade",
      "Conferência de evidências: mapa de acesso e disponibilidade",
      "Memória de decisão — Três bibliotecas pagam pelo mesmo título e as licenças têm escopos diferentes",
      "Simulação da mudança: uma condição de acesso é alterada depois da primeira solicitação",
      "Relatório de transferência para analista de serviços bibliotecários"
    ]
  },
  {
    "id": "gestao-de-emprestimo-entre-bibliotecas",
    "scenario": "Uma solicitação de empréstimo vence em sete dias e o transporte de ida e volta leva seis.",
    "decision": "Oferecer janela útil de um dia ou renegociar prazo antes do envio.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma condição de acesso é alterada depois da primeira solicitação.",
    "tasks": [
      "Dossiê de trabalho — Gestão de empréstimo entre bibliotecas",
      "Base de análise: registro de item e autoridade",
      "Conferência de evidências: mapa de acesso e disponibilidade",
      "Memória de decisão — Uma solicitação de empréstimo vence em sete dias e o transporte de ida e volta leva seis",
      "Simulação da mudança: uma condição de acesso é alterada depois da primeira solicitação",
      "Relatório de transferência para analista de serviços bibliotecários"
    ]
  },
  {
    "id": "analise-de-demanda-por-reservas-de-livros",
    "scenario": "Um título tem 18 reservas em três exemplares e outro tem 10 em um.",
    "decision": "Comparar seis e dez reservas por exemplar com duração de empréstimo.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma condição de acesso é alterada depois da primeira solicitação.",
    "tasks": [
      "Dossiê de trabalho — Análise de demanda por reservas de livros",
      "Base de análise: registro de item e autoridade",
      "Conferência de evidências: mapa de acesso e disponibilidade",
      "Memória de decisão — Um título tem 18 reservas em três exemplares e outro tem 10 em um",
      "Simulação da mudança: uma condição de acesso é alterada depois da primeira solicitação",
      "Relatório de transferência para analista de serviços bibliotecários"
    ]
  },
  {
    "id": "catalogacao-de-publicacoes-seriadas",
    "scenario": "Uma revista mudou de título a partir do volume 12.",
    "decision": "Vincular registros por período mantendo histórico e numeração.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma condição de acesso é alterada depois da primeira solicitação.",
    "tasks": [
      "Dossiê de trabalho — Catalogação de publicações seriadas",
      "Base de análise: registro de item e autoridade",
      "Conferência de evidências: mapa de acesso e disponibilidade",
      "Memória de decisão — Uma revista mudou de título a partir do volume 12",
      "Simulação da mudança: uma condição de acesso é alterada depois da primeira solicitação",
      "Relatório de transferência para analista de serviços bibliotecários"
    ]
  },
  {
    "id": "controle-de-autoridades-bibliograficas",
    "scenario": "Dois autores usam o mesmo nome e têm afiliações e obras diferentes.",
    "decision": "Manter identificadores de autoridade distintos e documentar desambiguação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma condição de acesso é alterada depois da primeira solicitação.",
    "tasks": [
      "Dossiê de trabalho — Controle de autoridades bibliográficas",
      "Base de análise: registro de item e autoridade",
      "Conferência de evidências: mapa de acesso e disponibilidade",
      "Memória de decisão — Dois autores usam o mesmo nome e têm afiliações e obras diferentes",
      "Simulação da mudança: uma condição de acesso é alterada depois da primeira solicitação",
      "Relatório de transferência para analista de serviços bibliotecários"
    ]
  },
  {
    "id": "planejamento-de-bibliotecas-itinerantes",
    "scenario": "O veículo tem seis horas e o itinerário reserva cinco horas de atendimento e duas de trânsito.",
    "decision": "Reduzir ou redistribuir uma hora antes de divulgar as paradas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma condição de acesso é alterada depois da primeira solicitação.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de bibliotecas itinerantes",
      "Base de análise: registro de item e autoridade",
      "Conferência de evidências: mapa de acesso e disponibilidade",
      "Memória de decisão — O veículo tem seis horas e o itinerário reserva cinco horas de atendimento e duas de trânsito",
      "Simulação da mudança: uma condição de acesso é alterada depois da primeira solicitação",
      "Relatório de transferência para analista de serviços bibliotecários"
    ]
  },
  {
    "id": "gestao-de-licencas-de-livros-eletronicos",
    "scenario": "A licença permite dois acessos simultâneos e há oito pedidos concorrentes.",
    "decision": "Modelar fila e comparar custo de ampliação com tempo de espera.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma condição de acesso é alterada depois da primeira solicitação.",
    "tasks": [
      "Dossiê de trabalho — Gestão de licenças de livros eletrônicos",
      "Base de análise: registro de item e autoridade",
      "Conferência de evidências: mapa de acesso e disponibilidade",
      "Memória de decisão — A licença permite dois acessos simultâneos e há oito pedidos concorrentes",
      "Simulação da mudança: uma condição de acesso é alterada depois da primeira solicitação",
      "Relatório de transferência para analista de serviços bibliotecários"
    ]
  },
  {
    "id": "organizacao-de-acervos-de-historia-oral",
    "scenario": "Uma entrevista autoriza consulta local mas não publicação aberta.",
    "decision": "Aplicar nível de acesso por registro e preservar a condição de consentimento.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma condição de acesso é alterada depois da primeira solicitação.",
    "tasks": [
      "Dossiê de trabalho — Organização de acervos de história oral",
      "Base de análise: registro de item e autoridade",
      "Conferência de evidências: mapa de acesso e disponibilidade",
      "Memória de decisão — Uma entrevista autoriza consulta local mas não publicação aberta",
      "Simulação da mudança: uma condição de acesso é alterada depois da primeira solicitação",
      "Relatório de transferência para analista de serviços bibliotecários"
    ]
  },
  {
    "id": "indicadores-de-atendimento-de-referencia",
    "scenario": "Houve 100 atendimentos e 82 respostas concluídas; 12 dessas tiveram recontato.",
    "decision": "Distinguir encerramento e resolução no primeiro contato.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma condição de acesso é alterada depois da primeira solicitação.",
    "tasks": [
      "Dossiê de trabalho — Indicadores de atendimento de referência",
      "Base de análise: registro de item e autoridade",
      "Conferência de evidências: mapa de acesso e disponibilidade",
      "Memória de decisão — Houve 100 atendimentos e 82 respostas concluídas; 12 dessas tiveram recontato",
      "Simulação da mudança: uma condição de acesso é alterada depois da primeira solicitação",
      "Relatório de transferência para analista de serviços bibliotecários"
    ]
  }
];

export default cases;

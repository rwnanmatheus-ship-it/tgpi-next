import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "dimensionamento-de-rotas-de-coleta-seletiva",
    "scenario": "Uma rota gera 5 t e o caminhão comporta 3 t por viagem.",
    "decision": "Prever duas descargas e incorporar tempo de retorno ao desenho da rota.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma área fica indisponível durante o período de maior demanda.",
    "tasks": [
      "Dossiê de trabalho — Dimensionamento de rotas de coleta seletiva",
      "Base de análise: mapa de cobertura por setor",
      "Conferência de evidências: registro de ativo e atendimento",
      "Memória de decisão — Uma rota gera 5 t e o caminhão comporta 3 t por viagem",
      "Simulação da mudança: uma área fica indisponível durante o período de maior demanda",
      "Relatório de transferência para analista de serviços urbanos"
    ]
  },
  {
    "id": "programacao-de-varricao-por-setor",
    "scenario": "Dois setores têm o mesmo comprimento e frequências de atendimento distintas.",
    "decision": "Comparar metros por semana e deslocamento antes de dividir a equipe.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma área fica indisponível durante o período de maior demanda.",
    "tasks": [
      "Dossiê de trabalho — Programação de varrição por setor",
      "Base de análise: mapa de cobertura por setor",
      "Conferência de evidências: registro de ativo e atendimento",
      "Memória de decisão — Dois setores têm o mesmo comprimento e frequências de atendimento distintas",
      "Simulação da mudança: uma área fica indisponível durante o período de maior demanda",
      "Relatório de transferência para analista de serviços urbanos"
    ]
  },
  {
    "id": "gestao-de-chamados-de-iluminacao-publica",
    "scenario": "Três chamados com nomes de rua diferentes apontam ao mesmo poste.",
    "decision": "Vincular ocorrências ao ativo sem apagar os registros individuais.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma área fica indisponível durante o período de maior demanda.",
    "tasks": [
      "Dossiê de trabalho — Gestão de chamados de iluminação pública",
      "Base de análise: mapa de cobertura por setor",
      "Conferência de evidências: registro de ativo e atendimento",
      "Memória de decisão — Três chamados com nomes de rua diferentes apontam ao mesmo poste",
      "Simulação da mudança: uma área fica indisponível durante o período de maior demanda",
      "Relatório de transferência para analista de serviços urbanos"
    ]
  },
  {
    "id": "inventario-de-mobiliario-urbano",
    "scenario": "Um banco mudou de praça mas manteve o código patrimonial.",
    "decision": "Atualizar localização e histórico preservando a identidade do ativo.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma área fica indisponível durante o período de maior demanda.",
    "tasks": [
      "Dossiê de trabalho — Inventário de mobiliário urbano",
      "Base de análise: mapa de cobertura por setor",
      "Conferência de evidências: registro de ativo e atendimento",
      "Memória de decisão — Um banco mudou de praça mas manteve o código patrimonial",
      "Simulação da mudança: uma área fica indisponível durante o período de maior demanda",
      "Relatório de transferência para analista de serviços urbanos"
    ]
  },
  {
    "id": "planejamento-de-zeladoria-em-parques",
    "scenario": "O parque recebe um evento no dia reservado à manutenção de caminhos.",
    "decision": "Reordenar zonas e encaminhar a interdição necessária ao responsável.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma área fica indisponível durante o período de maior demanda.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de zeladoria em parques",
      "Base de análise: mapa de cobertura por setor",
      "Conferência de evidências: registro de ativo e atendimento",
      "Memória de decisão — O parque recebe um evento no dia reservado à manutenção de caminhos",
      "Simulação da mudança: uma área fica indisponível durante o período de maior demanda",
      "Relatório de transferência para analista de serviços urbanos"
    ]
  },
  {
    "id": "medicao-de-acessibilidade-em-calcadas",
    "scenario": "Uma rota tem trechos largos mas um ponto de passagem estreito sem medição.",
    "decision": "Registrar o gargalo e coletar medidas antes de classificar a rota inteira.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma área fica indisponível durante o período de maior demanda.",
    "tasks": [
      "Dossiê de trabalho — Medição de acessibilidade em calçadas",
      "Base de análise: mapa de cobertura por setor",
      "Conferência de evidências: registro de ativo e atendimento",
      "Memória de decisão — Uma rota tem trechos largos mas um ponto de passagem estreito sem medição",
      "Simulação da mudança: uma área fica indisponível durante o período de maior demanda",
      "Relatório de transferência para analista de serviços urbanos"
    ]
  },
  {
    "id": "gestao-de-permissoes-de-uso-de-pracas",
    "scenario": "Dois eventos pedem a mesma praça em horários consecutivos com desmontagem de 2h.",
    "decision": "Considerar a ocupação de montagem e desmontagem antes da autorização.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma área fica indisponível durante o período de maior demanda.",
    "tasks": [
      "Dossiê de trabalho — Gestão de permissões de uso de praças",
      "Base de análise: mapa de cobertura por setor",
      "Conferência de evidências: registro de ativo e atendimento",
      "Memória de decisão — Dois eventos pedem a mesma praça em horários consecutivos com desmontagem de 2h",
      "Simulação da mudança: uma área fica indisponível durante o período de maior demanda",
      "Relatório de transferência para analista de serviços urbanos"
    ]
  },
  {
    "id": "analise-de-ocupacao-de-estacionamentos-publicos",
    "scenario": "Foram contados 72 veículos em 90 vagas utilizáveis num intervalo.",
    "decision": "Registrar ocupação instantânea de 80% e repetir observações para estimar rotatividade.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma área fica indisponível durante o período de maior demanda.",
    "tasks": [
      "Dossiê de trabalho — Análise de ocupação de estacionamentos públicos",
      "Base de análise: mapa de cobertura por setor",
      "Conferência de evidências: registro de ativo e atendimento",
      "Memória de decisão — Foram contados 72 veículos em 90 vagas utilizáveis num intervalo",
      "Simulação da mudança: uma área fica indisponível durante o período de maior demanda",
      "Relatório de transferência para analista de serviços urbanos"
    ]
  },
  {
    "id": "operacao-de-centrais-municipais-de-atendimento",
    "scenario": "O painel conta 120 contatos incluindo 24 retornos para o mesmo protocolo.",
    "decision": "Separar volume de contatos e casos únicos usando os identificadores.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma área fica indisponível durante o período de maior demanda.",
    "tasks": [
      "Dossiê de trabalho — Operação de centrais municipais de atendimento",
      "Base de análise: mapa de cobertura por setor",
      "Conferência de evidências: registro de ativo e atendimento",
      "Memória de decisão — O painel conta 120 contatos incluindo 24 retornos para o mesmo protocolo",
      "Simulação da mudança: uma área fica indisponível durante o período de maior demanda",
      "Relatório de transferência para analista de serviços urbanos"
    ]
  },
  {
    "id": "planejamento-de-pontos-de-entrega-voluntaria",
    "scenario": "Um bairro oferece muito volume mas o terreno proposto impede acesso do veículo coletor.",
    "decision": "Tratar acessibilidade para retirada como condição de viabilidade do ponto.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma área fica indisponível durante o período de maior demanda.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de pontos de entrega voluntária",
      "Base de análise: mapa de cobertura por setor",
      "Conferência de evidências: registro de ativo e atendimento",
      "Memória de decisão — Um bairro oferece muito volume mas o terreno proposto impede acesso do veículo coletor",
      "Simulação da mudança: uma área fica indisponível durante o período de maior demanda",
      "Relatório de transferência para analista de serviços urbanos"
    ]
  }
];

export default cases;

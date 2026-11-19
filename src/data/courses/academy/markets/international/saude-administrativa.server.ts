import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "planejamento-de-agendas-ambulatoriais",
    "scenario": "Uma agenda de 240 minutos tem quatro consultas de 40 e duas de 30.",
    "decision": "Calcular saldo de 20 minutos e verificar dependências de sala e equipe.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade altera sua janela de atendimento após as confirmações.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de agendas ambulatoriais",
      "Base de análise: registro pseudonimizado por atendimento",
      "Conferência de evidências: mapa de recursos e autorizações",
      "Memória de decisão — Uma agenda de 240 minutos tem quatro consultas de 40 e duas de 30",
      "Simulação da mudança: uma unidade altera sua janela de atendimento após as confirmações",
      "Relatório de transferência para coordenador administrativo de serviços de saúde"
    ]
  },
  {
    "id": "gestao-de-salas-de-consulta",
    "scenario": "Dois profissionais estão disponíveis mas somente uma sala atende ao requisito de equipamento.",
    "decision": "Vincular tipo de sala e duração antes de confirmar consultas simultâneas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade altera sua janela de atendimento após as confirmações.",
    "tasks": [
      "Dossiê de trabalho — Gestão de salas de consulta",
      "Base de análise: registro pseudonimizado por atendimento",
      "Conferência de evidências: mapa de recursos e autorizações",
      "Memória de decisão — Dois profissionais estão disponíveis mas somente uma sala atende ao requisito de equipamento",
      "Simulação da mudança: uma unidade altera sua janela de atendimento após as confirmações",
      "Relatório de transferência para coordenador administrativo de serviços de saúde"
    ]
  },
  {
    "id": "analise-de-faltas-em-atendimentos",
    "scenario": "Uma unidade teve 12 faltas em 80 agendamentos e outra 16 em 160.",
    "decision": "Comparar taxas de 15% e 10% distinguindo cancelamento antecipado.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade altera sua janela de atendimento após as confirmações.",
    "tasks": [
      "Dossiê de trabalho — Análise de faltas em atendimentos",
      "Base de análise: registro pseudonimizado por atendimento",
      "Conferência de evidências: mapa de recursos e autorizações",
      "Memória de decisão — Uma unidade teve 12 faltas em 80 agendamentos e outra 16 em 160",
      "Simulação da mudança: uma unidade altera sua janela de atendimento após as confirmações",
      "Relatório de transferência para coordenador administrativo de serviços de saúde"
    ]
  },
  {
    "id": "logistica-administrativa-de-interpretes-em-saude",
    "scenario": "Uma intérprete atende às 9h e às 9h30 em unidades separadas por 45 minutos.",
    "decision": "Reprogramar deslocamento ou modalidade autorizada antes da confirmação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade altera sua janela de atendimento após as confirmações.",
    "tasks": [
      "Dossiê de trabalho — Logística administrativa de intérpretes em saúde",
      "Base de análise: registro pseudonimizado por atendimento",
      "Conferência de evidências: mapa de recursos e autorizações",
      "Memória de decisão — Uma intérprete atende às 9h e às 9h30 em unidades separadas por 45 minutos",
      "Simulação da mudança: uma unidade altera sua janela de atendimento após as confirmações",
      "Relatório de transferência para coordenador administrativo de serviços de saúde"
    ]
  },
  {
    "id": "organizacao-de-arquivos-de-consentimento",
    "scenario": "Um consentimento arquivado corresponde à versão substituída antes do atendimento.",
    "decision": "Sinalizar versão e encaminhar à equipe responsável pela confirmação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade altera sua janela de atendimento após as confirmações.",
    "tasks": [
      "Dossiê de trabalho — Organização de arquivos de consentimento",
      "Base de análise: registro pseudonimizado por atendimento",
      "Conferência de evidências: mapa de recursos e autorizações",
      "Memória de decisão — Um consentimento arquivado corresponde à versão substituída antes do atendimento",
      "Simulação da mudança: uma unidade altera sua janela de atendimento após as confirmações",
      "Relatório de transferência para coordenador administrativo de serviços de saúde"
    ]
  },
  {
    "id": "gestao-de-filas-de-encaminhamento",
    "scenario": "A fila tem pedidos repetidos e prioridades já definidas pela equipe clínica.",
    "decision": "Conciliar identificadores preservando a prioridade atribuída pela equipe competente.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade altera sua janela de atendimento após as confirmações.",
    "tasks": [
      "Dossiê de trabalho — Gestão de filas de encaminhamento",
      "Base de análise: registro pseudonimizado por atendimento",
      "Conferência de evidências: mapa de recursos e autorizações",
      "Memória de decisão — A fila tem pedidos repetidos e prioridades já definidas pela equipe clínica",
      "Simulação da mudança: uma unidade altera sua janela de atendimento após as confirmações",
      "Relatório de transferência para coordenador administrativo de serviços de saúde"
    ]
  },
  {
    "id": "planejamento-de-transporte-eletivo-de-pacientes",
    "scenario": "O transporte tem quatro assentos utilizáveis e dois usuários precisam de acompanhante cada.",
    "decision": "Contar quatro ocupantes antes de aceitar outro passageiro.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade altera sua janela de atendimento após as confirmações.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de transporte eletivo de pacientes",
      "Base de análise: registro pseudonimizado por atendimento",
      "Conferência de evidências: mapa de recursos e autorizações",
      "Memória de decisão — O transporte tem quatro assentos utilizáveis e dois usuários precisam de acompanhante cada",
      "Simulação da mudança: uma unidade altera sua janela de atendimento após as confirmações",
      "Relatório de transferência para coordenador administrativo de serviços de saúde"
    ]
  },
  {
    "id": "conciliacao-de-cadastros-duplicados-de-pacientes",
    "scenario": "Dois usuários compartilham nome e data de nascimento mas têm identificadores diferentes.",
    "decision": "Encaminhar revisão com identificadores autorizados antes de qualquer fusão.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade altera sua janela de atendimento após as confirmações.",
    "tasks": [
      "Dossiê de trabalho — Conciliação de cadastros duplicados de pacientes",
      "Base de análise: registro pseudonimizado por atendimento",
      "Conferência de evidências: mapa de recursos e autorizações",
      "Memória de decisão — Dois usuários compartilham nome e data de nascimento mas têm identificadores diferentes",
      "Simulação da mudança: uma unidade altera sua janela de atendimento após as confirmações",
      "Relatório de transferência para coordenador administrativo de serviços de saúde"
    ]
  },
  {
    "id": "gestao-de-chamados-nao-clinicos-em-hospitais",
    "scenario": "Um chamado de manutenção de quarto aparece como fechado e foi reaberto três vezes.",
    "decision": "Rastrear reincidência por ativo e verificar aceite do serviço.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade altera sua janela de atendimento após as confirmações.",
    "tasks": [
      "Dossiê de trabalho — Gestão de chamados não clínicos em hospitais",
      "Base de análise: registro pseudonimizado por atendimento",
      "Conferência de evidências: mapa de recursos e autorizações",
      "Memória de decisão — Um chamado de manutenção de quarto aparece como fechado e foi reaberto três vezes",
      "Simulação da mudança: uma unidade altera sua janela de atendimento após as confirmações",
      "Relatório de transferência para coordenador administrativo de serviços de saúde"
    ]
  },
  {
    "id": "inventario-de-equipamentos-emprestados-em-reabilitacao",
    "scenario": "Existem 12 equipamentos, sete emprestados, dois em revisão e três disponíveis.",
    "decision": "Liberar até três unidades e manter revisão separada do estoque emprestável.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma unidade altera sua janela de atendimento após as confirmações.",
    "tasks": [
      "Dossiê de trabalho — Inventário de equipamentos emprestados em reabilitação",
      "Base de análise: registro pseudonimizado por atendimento",
      "Conferência de evidências: mapa de recursos e autorizações",
      "Memória de decisão — Existem 12 equipamentos, sete emprestados, dois em revisão e três disponíveis",
      "Simulação da mudança: uma unidade altera sua janela de atendimento após as confirmações",
      "Relatório de transferência para coordenador administrativo de serviços de saúde"
    ]
  }
];

export default cases;

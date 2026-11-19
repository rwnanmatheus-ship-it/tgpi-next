import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "programacao-de-quadras-e-centros-esportivos",
    "scenario": "Uma quadra recebe partidas de 50 minutos com troca de 10 em janela de quatro horas.",
    "decision": "Oferecer quatro horários completos e reservar o intervalo entre sessões.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A programação muda após o envio das confirmações.",
    "tasks": [
      "Dossiê de trabalho — Programação de quadras e centros esportivos",
      "Base de análise: cronograma por local e turno",
      "Conferência de evidências: mapa de credenciais e recursos",
      "Memória de decisão — Uma quadra recebe partidas de 50 minutos com troca de 10 em janela de quatro horas",
      "Simulação da mudança: a programação muda após o envio das confirmações",
      "Relatório de transferência para coordenador de operações esportivas"
    ]
  },
  {
    "id": "planejamento-de-calendarios-de-ligas-amadoras",
    "scenario": "Uma equipe aparece em duas partidas simultâneas em locais distintos.",
    "decision": "Aplicar restrição de equipe e deslocamento ao revisar a rodada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A programação muda após o envio das confirmações.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de calendários de ligas amadoras",
      "Base de análise: cronograma por local e turno",
      "Conferência de evidências: mapa de credenciais e recursos",
      "Memória de decisão — Uma equipe aparece em duas partidas simultâneas em locais distintos",
      "Simulação da mudança: a programação muda após o envio das confirmações",
      "Relatório de transferência para coordenador de operações esportivas"
    ]
  },
  {
    "id": "operacao-de-inscricoes-em-corridas",
    "scenario": "Foram recebidas 520 inscrições, 480 pagamentos confirmados e 12 estornos destes.",
    "decision": "Conciliar 468 inscrições pagas ativas antes de emitir kits.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A programação muda após o envio das confirmações.",
    "tasks": [
      "Dossiê de trabalho — Operação de inscrições em corridas",
      "Base de análise: cronograma por local e turno",
      "Conferência de evidências: mapa de credenciais e recursos",
      "Memória de decisão — Foram recebidas 520 inscrições, 480 pagamentos confirmados e 12 estornos destes",
      "Simulação da mudança: a programação muda após o envio das confirmações",
      "Relatório de transferência para coordenador de operações esportivas"
    ]
  },
  {
    "id": "logistica-de-materiais-de-competicao",
    "scenario": "Dez partidas compartilham quatro conjuntos de material em três locais.",
    "decision": "Organizar rota de transferência entre horários e detectar sobreposição de uso.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A programação muda após o envio das confirmações.",
    "tasks": [
      "Dossiê de trabalho — Logística de materiais de competição",
      "Base de análise: cronograma por local e turno",
      "Conferência de evidências: mapa de credenciais e recursos",
      "Memória de decisão — Dez partidas compartilham quatro conjuntos de material em três locais",
      "Simulação da mudança: a programação muda após o envio das confirmações",
      "Relatório de transferência para coordenador de operações esportivas"
    ]
  },
  {
    "id": "gestao-de-credenciais-de-imprensa-esportiva",
    "scenario": "Uma credencial de imprensa permite sala de entrevista mas não acesso ao vestiário.",
    "decision": "Registrar zona autorizada e vigência por credencial.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A programação muda após o envio das confirmações.",
    "tasks": [
      "Dossiê de trabalho — Gestão de credenciais de imprensa esportiva",
      "Base de análise: cronograma por local e turno",
      "Conferência de evidências: mapa de credenciais e recursos",
      "Memória de decisão — Uma credencial de imprensa permite sala de entrevista mas não acesso ao vestiário",
      "Simulação da mudança: a programação muda após o envio das confirmações",
      "Relatório de transferência para coordenador de operações esportivas"
    ]
  },
  {
    "id": "planejamento-de-voluntariado-esportivo",
    "scenario": "Dos 60 voluntários cadastrados, apenas 35 confirmaram o turno inicial.",
    "decision": "Escalar por confirmação e competência e quantificar a reserva necessária.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A programação muda após o envio das confirmações.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de voluntariado esportivo",
      "Base de análise: cronograma por local e turno",
      "Conferência de evidências: mapa de credenciais e recursos",
      "Memória de decisão — Dos 60 voluntários cadastrados, apenas 35 confirmaram o turno inicial",
      "Simulação da mudança: a programação muda após o envio das confirmações",
      "Relatório de transferência para coordenador de operações esportivas"
    ]
  },
  {
    "id": "atendimento-a-atletas-internacionais",
    "scenario": "A delegação chega às 23h locais e o atendimento fecha às 22h.",
    "decision": "Preparar recepção alternativa confirmada e comunicar horário nos dois fusos.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A programação muda após o envio das confirmações.",
    "tasks": [
      "Dossiê de trabalho — Atendimento a atletas internacionais",
      "Base de análise: cronograma por local e turno",
      "Conferência de evidências: mapa de credenciais e recursos",
      "Memória de decisão — A delegação chega às 23h locais e o atendimento fecha às 22h",
      "Simulação da mudança: a programação muda após o envio das confirmações",
      "Relatório de transferência para coordenador de operações esportivas"
    ]
  },
  {
    "id": "planejamento-de-abertura-de-setores-de-estadio",
    "scenario": "Um setor tem 500 assentos e 60 estão bloqueados por montagem.",
    "decision": "Planejar venda para 440 lugares e verificar acessos antes da liberação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A programação muda após o envio das confirmações.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de abertura de setores de estádio",
      "Base de análise: cronograma por local e turno",
      "Conferência de evidências: mapa de credenciais e recursos",
      "Memória de decisão — Um setor tem 500 assentos e 60 estão bloqueados por montagem",
      "Simulação da mudança: a programação muda após o envio das confirmações",
      "Relatório de transferência para coordenador de operações esportivas"
    ]
  },
  {
    "id": "analise-de-renovacao-de-socios-de-clubes",
    "scenario": "Dos 300 contratos a vencer, 210 renovaram e 20 ainda estão no prazo de resposta.",
    "decision": "Publicar renovação observada de 70% e separar a parcela pendente.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A programação muda após o envio das confirmações.",
    "tasks": [
      "Dossiê de trabalho — Análise de renovação de sócios de clubes",
      "Base de análise: cronograma por local e turno",
      "Conferência de evidências: mapa de credenciais e recursos",
      "Memória de decisão — Dos 300 contratos a vencer, 210 renovaram e 20 ainda estão no prazo de resposta",
      "Simulação da mudança: a programação muda após o envio das confirmações",
      "Relatório de transferência para coordenador de operações esportivas"
    ]
  },
  {
    "id": "controle-de-entregas-de-patrocinio-esportivo",
    "scenario": "O contrato prevê seis inserções e os relatórios contêm quatro fotos de apenas três inserções.",
    "decision": "Contar entregas distintas e solicitar evidência das três restantes.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A programação muda após o envio das confirmações.",
    "tasks": [
      "Dossiê de trabalho — Controle de entregas de patrocínio esportivo",
      "Base de análise: cronograma por local e turno",
      "Conferência de evidências: mapa de credenciais e recursos",
      "Memória de decisão — O contrato prevê seis inserções e os relatórios contêm quatro fotos de apenas três inserções",
      "Simulação da mudança: a programação muda após o envio das confirmações",
      "Relatório de transferência para coordenador de operações esportivas"
    ]
  }
];

export default cases;

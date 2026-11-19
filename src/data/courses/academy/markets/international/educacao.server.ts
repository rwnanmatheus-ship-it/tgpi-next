import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "planejamento-de-horarios-escolares",
    "scenario": "Um professor aparece em duas turmas no mesmo horário apesar de haver salas disponíveis.",
    "decision": "Modelar disponibilidade docente e de sala como restrições simultâneas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma turma entra no programa depois da data de corte.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de horários escolares",
      "Base de análise: matriz de coortes e critérios",
      "Conferência de evidências: registro de capacidade e evidência",
      "Memória de decisão — Um professor aparece em duas turmas no mesmo horário apesar de haver salas disponíveis",
      "Simulação da mudança: uma turma entra no programa depois da data de corte",
      "Relatório de transferência para analista de operações educacionais"
    ]
  },
  {
    "id": "gestao-de-emprestimo-de-materiais-didaticos",
    "scenario": "Um kit inclui quatro itens mas o comprovante de retorno registra três.",
    "decision": "Manter retorno parcial e vincular a pendência ao componente faltante.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma turma entra no programa depois da data de corte.",
    "tasks": [
      "Dossiê de trabalho — Gestão de empréstimo de materiais didáticos",
      "Base de análise: matriz de coortes e critérios",
      "Conferência de evidências: registro de capacidade e evidência",
      "Memória de decisão — Um kit inclui quatro itens mas o comprovante de retorno registra três",
      "Simulação da mudança: uma turma entra no programa depois da data de corte",
      "Relatório de transferência para analista de operações educacionais"
    ]
  },
  {
    "id": "operacoes-de-admissao-internacional",
    "scenario": "O histórico chegou traduzido mas sem vínculo verificável com a inscrição correspondente.",
    "decision": "Solicitar a associação documental antes da análise de admissibilidade.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma turma entra no programa depois da data de corte.",
    "tasks": [
      "Dossiê de trabalho — Operações de admissão internacional",
      "Base de análise: matriz de coortes e critérios",
      "Conferência de evidências: registro de capacidade e evidência",
      "Memória de decisão — O histórico chegou traduzido mas sem vínculo verificável com a inscrição correspondente",
      "Simulação da mudança: uma turma entra no programa depois da data de corte",
      "Relatório de transferência para analista de operações educacionais"
    ]
  },
  {
    "id": "equivalencia-documental-de-historicos-escolares",
    "scenario": "Uma instituição usa créditos semestrais e outra usa horas de contato.",
    "decision": "Documentar a base de conversão e encaminhar equivalência ao avaliador competente.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma turma entra no programa depois da data de corte.",
    "tasks": [
      "Dossiê de trabalho — Equivalência documental de históricos escolares",
      "Base de análise: matriz de coortes e critérios",
      "Conferência de evidências: registro de capacidade e evidência",
      "Memória de decisão — Uma instituição usa créditos semestrais e outra usa horas de contato",
      "Simulação da mudança: uma turma entra no programa depois da data de corte",
      "Relatório de transferência para analista de operações educacionais"
    ]
  },
  {
    "id": "producao-de-bancos-de-itens-educacionais",
    "scenario": "Duas perguntas cobrem o mesmo objetivo e nenhuma avalia aplicação do método.",
    "decision": "Construir matriz de especificação e incluir item de aplicação com justificativa.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma turma entra no programa depois da data de corte.",
    "tasks": [
      "Dossiê de trabalho — Produção de bancos de itens educacionais",
      "Base de análise: matriz de coortes e critérios",
      "Conferência de evidências: registro de capacidade e evidência",
      "Memória de decisão — Duas perguntas cobrem o mesmo objetivo e nenhuma avalia aplicação do método",
      "Simulação da mudança: uma turma entra no programa depois da data de corte",
      "Relatório de transferência para analista de operações educacionais"
    ]
  },
  {
    "id": "analise-de-dificuldade-de-questoes",
    "scenario": "Uma questão teve 18 acertos entre 60 respostas válidas.",
    "decision": "Registrar proporção de acerto de 30% e investigar o enunciado antes de descartar o item.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma turma entra no programa depois da data de corte.",
    "tasks": [
      "Dossiê de trabalho — Análise de dificuldade de questões",
      "Base de análise: matriz de coortes e critérios",
      "Conferência de evidências: registro de capacidade e evidência",
      "Memória de decisão — Uma questão teve 18 acertos entre 60 respostas válidas",
      "Simulação da mudança: uma turma entra no programa depois da data de corte",
      "Relatório de transferência para analista de operações educacionais"
    ]
  },
  {
    "id": "desenho-de-rubricas-para-portfolios",
    "scenario": "Dois avaliadores dão notas distintas porque o nível intermediário usa apenas a palavra bom.",
    "decision": "Ancorar níveis em evidências observáveis e recalibrar com portfólios de referência.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma turma entra no programa depois da data de corte.",
    "tasks": [
      "Dossiê de trabalho — Desenho de rubricas para portfólios",
      "Base de análise: matriz de coortes e critérios",
      "Conferência de evidências: registro de capacidade e evidência",
      "Memória de decisão — Dois avaliadores dão notas distintas porque o nível intermediário usa apenas a palavra bom",
      "Simulação da mudança: uma turma entra no programa depois da data de corte",
      "Relatório de transferência para analista de operações educacionais"
    ]
  },
  {
    "id": "gestao-de-capacidade-de-centros-de-prova",
    "scenario": "O centro dispõe de 40 computadores mas três estão indisponíveis e dois são de reserva.",
    "decision": "Oferecer 35 postos regulares por sessão e separar a contingência.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma turma entra no programa depois da data de corte.",
    "tasks": [
      "Dossiê de trabalho — Gestão de capacidade de centros de prova",
      "Base de análise: matriz de coortes e critérios",
      "Conferência de evidências: registro de capacidade e evidência",
      "Memória de decisão — O centro dispõe de 40 computadores mas três estão indisponíveis e dois são de reserva",
      "Simulação da mudança: uma turma entra no programa depois da data de corte",
      "Relatório de transferência para analista de operações educacionais"
    ]
  },
  {
    "id": "coordenacao-de-tutoria-entre-pares",
    "scenario": "Há 16 tutores com duas vagas cada e 38 interessados.",
    "decision": "Dimensionar seis vagas em espera e combinar disponibilidade por área.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma turma entra no programa depois da data de corte.",
    "tasks": [
      "Dossiê de trabalho — Coordenação de tutoria entre pares",
      "Base de análise: matriz de coortes e critérios",
      "Conferência de evidências: registro de capacidade e evidência",
      "Memória de decisão — Há 16 tutores com duas vagas cada e 38 interessados",
      "Simulação da mudança: uma turma entra no programa depois da data de corte",
      "Relatório de transferência para analista de operações educacionais"
    ]
  },
  {
    "id": "analise-de-evasao-em-educacao-continuada",
    "scenario": "Uma coorte iniciou com 120 pessoas, 18 saíram e 12 pausaram formalmente.",
    "decision": "Reportar 15% de saída e manter pausa como estado separado.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma turma entra no programa depois da data de corte.",
    "tasks": [
      "Dossiê de trabalho — Análise de evasão em educação continuada",
      "Base de análise: matriz de coortes e critérios",
      "Conferência de evidências: registro de capacidade e evidência",
      "Memória de decisão — Uma coorte iniciou com 120 pessoas, 18 saíram e 12 pausaram formalmente",
      "Simulação da mudança: uma turma entra no programa depois da data de corte",
      "Relatório de transferência para analista de operações educacionais"
    ]
  }
];

export default cases;

import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "previsao-de-ocupacao-hoteleira",
    "scenario": "80 quartos vendáveis, 58 confirmados, 7 cancelamentos previstos e 10 vendas novas.",
    "decision": "Projetar 61 ocupados e 76,25% de ocupação mantendo separadas previsão e reserva.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um grupo altera o horário de chegada após o fechamento do turno.",
    "tasks": [
      "Dossiê de trabalho — Previsão de ocupação hoteleira",
      "Base de análise: mapa de ocupação e bloqueios",
      "Conferência de evidências: registro de reserva e liberação",
      "Memória de decisão — 80 quartos vendáveis, 58 confirmados, 7 cancelamentos previstos e 10 vendas novas",
      "Simulação da mudança: um grupo altera o horário de chegada após o fechamento do turno",
      "Relatório de transferência para coordenador de operações hoteleiras"
    ]
  },
  {
    "id": "distribuicao-de-tarifas-por-canal",
    "scenario": "Canal A vende a 100 com 15% de comissão; B a 92 com 5%.",
    "decision": "Comparar receitas líquidas de 85 e 87,40 antes de considerar aquisição incremental.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um grupo altera o horário de chegada após o fechamento do turno.",
    "tasks": [
      "Dossiê de trabalho — Distribuição de tarifas por canal",
      "Base de análise: mapa de ocupação e bloqueios",
      "Conferência de evidências: registro de reserva e liberação",
      "Memória de decisão — Canal A vende a 100 com 15% de comissão; B a 92 com 5%",
      "Simulação da mudança: um grupo altera o horário de chegada após o fechamento do turno",
      "Relatório de transferência para coordenador de operações hoteleiras"
    ]
  },
  {
    "id": "planejamento-de-governanca-de-quartos",
    "scenario": "18 saídas demandam 35 minutos e 12 permanências demandam 15.",
    "decision": "Reservar 810 minutos produtivos e separar quartos com chegada antecipada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um grupo altera o horário de chegada após o fechamento do turno.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de governança de quartos",
      "Base de análise: mapa de ocupação e bloqueios",
      "Conferência de evidências: registro de reserva e liberação",
      "Memória de decisão — 18 saídas demandam 35 minutos e 12 permanências demandam 15",
      "Simulação da mudança: um grupo altera o horário de chegada após o fechamento do turno",
      "Relatório de transferência para coordenador de operações hoteleiras"
    ]
  },
  {
    "id": "auditoria-de-reservas-de-grupos",
    "scenario": "O bloqueio contém 40 quartos, a lista nominal 33 e dois nomes aparecem duas vezes.",
    "decision": "Confirmar 31 nomes distintos e reconciliar os nove restantes antes da liberação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um grupo altera o horário de chegada após o fechamento do turno.",
    "tasks": [
      "Dossiê de trabalho — Auditoria de reservas de grupos",
      "Base de análise: mapa de ocupação e bloqueios",
      "Conferência de evidências: registro de reserva e liberação",
      "Memória de decisão — O bloqueio contém 40 quartos, a lista nominal 33 e dois nomes aparecem duas vezes",
      "Simulação da mudança: um grupo altera o horário de chegada após o fechamento do turno",
      "Relatório de transferência para coordenador de operações hoteleiras"
    ]
  },
  {
    "id": "gestao-de-lavanderia-de-hotel",
    "scenario": "Entraram 180 kg de roupa e cada ciclo admite 32 kg.",
    "decision": "Programar seis ciclos e calcular ociosidade do último sem misturar categorias incompatíveis.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um grupo altera o horário de chegada após o fechamento do turno.",
    "tasks": [
      "Dossiê de trabalho — Gestão de lavanderia de hotel",
      "Base de análise: mapa de ocupação e bloqueios",
      "Conferência de evidências: registro de reserva e liberação",
      "Memória de decisão — Entraram 180 kg de roupa e cada ciclo admite 32 kg",
      "Simulação da mudança: um grupo altera o horário de chegada após o fechamento do turno",
      "Relatório de transferência para coordenador de operações hoteleiras"
    ]
  },
  {
    "id": "negociacao-de-allotments-turisticos",
    "scenario": "Um operador bloqueia 20 quartos por noite em cinco noites e confirma 72 diárias.",
    "decision": "Calcular utilização de 72% e negociar liberação das 28 diárias por data.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um grupo altera o horário de chegada após o fechamento do turno.",
    "tasks": [
      "Dossiê de trabalho — Negociação de allotments turísticos",
      "Base de análise: mapa de ocupação e bloqueios",
      "Conferência de evidências: registro de reserva e liberação",
      "Memória de decisão — Um operador bloqueia 20 quartos por noite em cinco noites e confirma 72 diárias",
      "Simulação da mudança: um grupo altera o horário de chegada após o fechamento do turno",
      "Relatório de transferência para coordenador de operações hoteleiras"
    ]
  },
  {
    "id": "coordenacao-de-recepcao-noturna",
    "scenario": "O fechamento mostra 30 pagamentos e 29 lançamentos; existe um comprovante sem reserva.",
    "decision": "Manter a diferença em conciliação e rastrear o vínculo antes de encerrar o turno.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um grupo altera o horário de chegada após o fechamento do turno.",
    "tasks": [
      "Dossiê de trabalho — Coordenação de recepção noturna",
      "Base de análise: mapa de ocupação e bloqueios",
      "Conferência de evidências: registro de reserva e liberação",
      "Memória de decisão — O fechamento mostra 30 pagamentos e 29 lançamentos; existe um comprovante sem reserva",
      "Simulação da mudança: um grupo altera o horário de chegada após o fechamento do turno",
      "Relatório de transferência para coordenador de operações hoteleiras"
    ]
  },
  {
    "id": "operacoes-de-achados-e-perdidos-em-hoteis",
    "scenario": "Dois hóspedes descrevem um objeto semelhante, mas só um identifica uma marca interna.",
    "decision": "Registrar evidência distintiva e seguir o procedimento autorizado de restituição.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um grupo altera o horário de chegada após o fechamento do turno.",
    "tasks": [
      "Dossiê de trabalho — Operações de achados e perdidos em hotéis",
      "Base de análise: mapa de ocupação e bloqueios",
      "Conferência de evidências: registro de reserva e liberação",
      "Memória de decisão — Dois hóspedes descrevem um objeto semelhante, mas só um identifica uma marca interna",
      "Simulação da mudança: um grupo altera o horário de chegada após o fechamento do turno",
      "Relatório de transferência para coordenador de operações hoteleiras"
    ]
  },
  {
    "id": "planejamento-de-bloqueios-para-manutencao",
    "scenario": "Oito dos 60 quartos entram em obra em noites com 55 reservas.",
    "decision": "Sinalizar déficit de três quartos e reprogramar o bloqueio ou negociar realocação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um grupo altera o horário de chegada após o fechamento do turno.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de bloqueios para manutenção",
      "Base de análise: mapa de ocupação e bloqueios",
      "Conferência de evidências: registro de reserva e liberação",
      "Memória de decisão — Oito dos 60 quartos entram em obra em noites com 55 reservas",
      "Simulação da mudança: um grupo altera o horário de chegada após o fechamento do turno",
      "Relatório de transferência para coordenador de operações hoteleiras"
    ]
  },
  {
    "id": "recuperacao-de-servico-em-hospedagem",
    "scenario": "Uma troca de quarto resolveu a falha técnica mas permanece uma cobrança duplicada.",
    "decision": "Separar resolução física e financeira e fechar somente após confirmar o estorno.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Um grupo altera o horário de chegada após o fechamento do turno.",
    "tasks": [
      "Dossiê de trabalho — Recuperação de serviço em hospedagem",
      "Base de análise: mapa de ocupação e bloqueios",
      "Conferência de evidências: registro de reserva e liberação",
      "Memória de decisão — Uma troca de quarto resolveu a falha técnica mas permanece uma cobrança duplicada",
      "Simulação da mudança: um grupo altera o horário de chegada após o fechamento do turno",
      "Relatório de transferência para coordenador de operações hoteleiras"
    ]
  }
];

export default cases;

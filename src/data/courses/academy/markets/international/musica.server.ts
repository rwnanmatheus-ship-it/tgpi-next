import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "cadastro-de-obras-e-fonogramas",
    "scenario": "Uma mesma obra tem duas gravações por intérpretes diferentes.",
    "decision": "Cadastrar uma obra e dois fonogramas com vínculos e créditos próprios.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O contratante muda a janela de utilização de uma gravação.",
    "tasks": [
      "Dossiê de trabalho — Cadastro de obras e fonogramas",
      "Base de análise: ficha técnica de obra e gravação",
      "Conferência de evidências: mapa de agenda e direitos",
      "Memória de decisão — Uma mesma obra tem duas gravações por intérpretes diferentes",
      "Simulação da mudança: o contratante muda a janela de utilização de uma gravação",
      "Relatório de transferência para coordenador de operações musicais"
    ]
  },
  {
    "id": "conciliacao-de-relatorios-de-royalties",
    "scenario": "Um relatório informa 800 execuções a 0,02 e uma taxa contratual simulada de 10%.",
    "decision": "Conciliar bruto de 16 e líquido de 14,40 antes de atribuir divergências.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O contratante muda a janela de utilização de uma gravação.",
    "tasks": [
      "Dossiê de trabalho — Conciliação de relatórios de royalties",
      "Base de análise: ficha técnica de obra e gravação",
      "Conferência de evidências: mapa de agenda e direitos",
      "Memória de decisão — Um relatório informa 800 execuções a 0,02 e uma taxa contratual simulada de 10%",
      "Simulação da mudança: o contratante muda a janela de utilização de uma gravação",
      "Relatório de transferência para coordenador de operações musicais"
    ]
  },
  {
    "id": "planejamento-de-turnes-de-pequeno-porte",
    "scenario": "Três shows rendem 900 cada e o trajeto acrescenta 600 de custo além dos 1800 previstos.",
    "decision": "Projetar saldo de 300 e testar o cancelamento de uma data.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O contratante muda a janela de utilização de uma gravação.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de turnês de pequeno porte",
      "Base de análise: ficha técnica de obra e gravação",
      "Conferência de evidências: mapa de agenda e direitos",
      "Memória de decisão — Três shows rendem 900 cada e o trajeto acrescenta 600 de custo além dos 1800 previstos",
      "Simulação da mudança: o contratante muda a janela de utilização de uma gravação",
      "Relatório de transferência para coordenador de operações musicais"
    ]
  },
  {
    "id": "gestao-de-agenda-de-estudios-de-gravacao",
    "scenario": "Uma reserva de gravação termina às 14h e outra começa às 14h com 30 min de preparação.",
    "decision": "Reservar o intervalo técnico e renegociar uma das janelas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O contratante muda a janela de utilização de uma gravação.",
    "tasks": [
      "Dossiê de trabalho — Gestão de agenda de estúdios de gravação",
      "Base de análise: ficha técnica de obra e gravação",
      "Conferência de evidências: mapa de agenda e direitos",
      "Memória de decisão — Uma reserva de gravação termina às 14h e outra começa às 14h com 30 min de preparação",
      "Simulação da mudança: o contratante muda a janela de utilização de uma gravação",
      "Relatório de transferência para coordenador de operações musicais"
    ]
  },
  {
    "id": "orcamento-de-lancamentos-independentes",
    "scenario": "Um lançamento dispõe de 3000, já comprometeu 2100 e exige 450 para distribuição.",
    "decision": "Calcular saldo livre de 450 antes de aprovar promoção adicional.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O contratante muda a janela de utilização de uma gravação.",
    "tasks": [
      "Dossiê de trabalho — Orçamento de lançamentos independentes",
      "Base de análise: ficha técnica de obra e gravação",
      "Conferência de evidências: mapa de agenda e direitos",
      "Memória de decisão — Um lançamento dispõe de 3000, já comprometeu 2100 e exige 450 para distribuição",
      "Simulação da mudança: o contratante muda a janela de utilização de uma gravação",
      "Relatório de transferência para coordenador de operações musicais"
    ]
  },
  {
    "id": "operacoes-de-distribuicao-digital-de-musica",
    "scenario": "Uma faixa foi enviada com artista principal trocado em um canal.",
    "decision": "Comparar a ficha mestre com a entrega do canal e rastrear a correção.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O contratante muda a janela de utilização de uma gravação.",
    "tasks": [
      "Dossiê de trabalho — Operações de distribuição digital de música",
      "Base de análise: ficha técnica de obra e gravação",
      "Conferência de evidências: mapa de agenda e direitos",
      "Memória de decisão — Uma faixa foi enviada com artista principal trocado em um canal",
      "Simulação da mudança: o contratante muda a janela de utilização de uma gravação",
      "Relatório de transferência para coordenador de operações musicais"
    ]
  },
  {
    "id": "metadados-para-catalogos-classicos",
    "scenario": "Dois movimentos pertencem à mesma obra e têm títulos locais diferentes.",
    "decision": "Preservar hierarquia obra, movimento, gravação e créditos normalizados.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O contratante muda a janela de utilização de uma gravação.",
    "tasks": [
      "Dossiê de trabalho — Metadados para catálogos clássicos",
      "Base de análise: ficha técnica de obra e gravação",
      "Conferência de evidências: mapa de agenda e direitos",
      "Memória de decisão — Dois movimentos pertencem à mesma obra e têm títulos locais diferentes",
      "Simulação da mudança: o contratante muda a janela de utilização de uma gravação",
      "Relatório de transferência para coordenador de operações musicais"
    ]
  },
  {
    "id": "producao-de-sessoes-musicais-remotas",
    "scenario": "Duas pistas têm a mesma duração mas começam em pontos temporais distintos.",
    "decision": "Fixar referência de início e conferir alinhamento antes de combinar os arquivos.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O contratante muda a janela de utilização de uma gravação.",
    "tasks": [
      "Dossiê de trabalho — Produção de sessões musicais remotas",
      "Base de análise: ficha técnica de obra e gravação",
      "Conferência de evidências: mapa de agenda e direitos",
      "Memória de decisão — Duas pistas têm a mesma duração mas começam em pontos temporais distintos",
      "Simulação da mudança: o contratante muda a janela de utilização de uma gravação",
      "Relatório de transferência para coordenador de operações musicais"
    ]
  },
  {
    "id": "gestao-de-pedidos-de-sincronizacao",
    "scenario": "O pedido autoriza composição mas não documenta os direitos da gravação escolhida.",
    "decision": "Separar as duas autorizações e registrar pendência da gravação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O contratante muda a janela de utilização de uma gravação.",
    "tasks": [
      "Dossiê de trabalho — Gestão de pedidos de sincronização",
      "Base de análise: ficha técnica de obra e gravação",
      "Conferência de evidências: mapa de agenda e direitos",
      "Memória de decisão — O pedido autoriza composição mas não documenta os direitos da gravação escolhida",
      "Simulação da mudança: o contratante muda a janela de utilização de uma gravação",
      "Relatório de transferência para coordenador de operações musicais"
    ]
  },
  {
    "id": "coordenacao-de-arquivos-de-partituras",
    "scenario": "Uma edição de partitura contém marcações próprias do conjunto e outra é o original.",
    "decision": "Catalogar edição e cópia de execução relacionadas sem sobrescrever o original.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O contratante muda a janela de utilização de uma gravação.",
    "tasks": [
      "Dossiê de trabalho — Coordenação de arquivos de partituras",
      "Base de análise: ficha técnica de obra e gravação",
      "Conferência de evidências: mapa de agenda e direitos",
      "Memória de decisão — Uma edição de partitura contém marcações próprias do conjunto e outra é o original",
      "Simulação da mudança: o contratante muda a janela de utilização de uma gravação",
      "Relatório de transferência para coordenador de operações musicais"
    ]
  }
];

export default cases;

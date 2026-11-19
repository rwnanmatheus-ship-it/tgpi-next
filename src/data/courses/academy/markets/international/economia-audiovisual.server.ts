import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "orcamento-de-curtas-independentes",
    "scenario": "A diária de equipe custa 900 e a locação custa 350 por três dias cada.",
    "decision": "Separar os dois custos diários e projetar 3750 antes da contingência.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A distribuição passa a incluir outro território e outra data.",
    "tasks": [
      "Dossiê de trabalho — Orçamento de curtas independentes",
      "Base de análise: plano de produção por janela",
      "Conferência de evidências: mapa de direitos e versões",
      "Memória de decisão — A diária de equipe custa 900 e a locação custa 350 por três dias cada",
      "Simulação da mudança: a distribuição passa a incluir outro território e outra data",
      "Relatório de transferência para coordenador de produção audiovisual"
    ]
  },
  {
    "id": "coordenacao-de-locacoes-de-filmagem",
    "scenario": "Uma locação autoriza filmagem até 18h mas o plano prevê desmontagem até 19h.",
    "decision": "Verificar a janela de ocupação completa e negociar a extensão.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A distribuição passa a incluir outro território e outra data.",
    "tasks": [
      "Dossiê de trabalho — Coordenação de locações de filmagem",
      "Base de análise: plano de produção por janela",
      "Conferência de evidências: mapa de direitos e versões",
      "Memória de decisão — Uma locação autoriza filmagem até 18h mas o plano prevê desmontagem até 19h",
      "Simulação da mudança: a distribuição passa a incluir outro território e outra data",
      "Relatório de transferência para coordenador de produção audiovisual"
    ]
  },
  {
    "id": "gestao-de-continuidade-documental",
    "scenario": "O acessório aparece na mão esquerda num plano e na direita no contraplano.",
    "decision": "Indexar fotografias por cena, tomada e tempo narrativo antes de orientar a retomada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A distribuição passa a incluir outro território e outra data.",
    "tasks": [
      "Dossiê de trabalho — Gestão de continuidade documental",
      "Base de análise: plano de produção por janela",
      "Conferência de evidências: mapa de direitos e versões",
      "Memória de decisão — O acessório aparece na mão esquerda num plano e na direita no contraplano",
      "Simulação da mudança: a distribuição passa a incluir outro território e outra data",
      "Relatório de transferência para coordenador de produção audiovisual"
    ]
  },
  {
    "id": "planejamento-de-diarias-de-elenco",
    "scenario": "Duas cenas requerem a mesma atriz mas em locações com 90 min de deslocamento.",
    "decision": "Incluir trânsito e preparação antes de emitir as ordens do dia.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A distribuição passa a incluir outro território e outra data.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de diárias de elenco",
      "Base de análise: plano de produção por janela",
      "Conferência de evidências: mapa de direitos e versões",
      "Memória de decisão — Duas cenas requerem a mesma atriz mas em locações com 90 min de deslocamento",
      "Simulação da mudança: a distribuição passa a incluir outro território e outra data",
      "Relatório de transferência para coordenador de produção audiovisual"
    ]
  },
  {
    "id": "controle-de-versoes-de-montagem",
    "scenario": "O arquivo final recebeu dois cortes diferentes com nome idêntico.",
    "decision": "Usar identificador de montagem e relatório de mudanças para fixar a cópia de entrega.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A distribuição passa a incluir outro território e outra data.",
    "tasks": [
      "Dossiê de trabalho — Controle de versões de montagem",
      "Base de análise: plano de produção por janela",
      "Conferência de evidências: mapa de direitos e versões",
      "Memória de decisão — O arquivo final recebeu dois cortes diferentes com nome idêntico",
      "Simulação da mudança: a distribuição passa a incluir outro território e outra data",
      "Relatório de transferência para coordenador de produção audiovisual"
    ]
  },
  {
    "id": "gestao-de-autorizacoes-de-imagem",
    "scenario": "A autorização simulada cobre uso institucional mas a proposta inclui campanha paga.",
    "decision": "Marcar a campanha fora do escopo documentado e obter autorização correspondente.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A distribuição passa a incluir outro território e outra data.",
    "tasks": [
      "Dossiê de trabalho — Gestão de autorizações de imagem",
      "Base de análise: plano de produção por janela",
      "Conferência de evidências: mapa de direitos e versões",
      "Memória de decisão — A autorização simulada cobre uso institucional mas a proposta inclui campanha paga",
      "Simulação da mudança: a distribuição passa a incluir outro território e outra data",
      "Relatório de transferência para coordenador de produção audiovisual"
    ]
  },
  {
    "id": "coordenacao-de-entregas-para-festivais",
    "scenario": "O festival exige legenda separada e a cópia traz legenda incorporada.",
    "decision": "Confrontar especificação e pacote de entrega e verificar sincronismo após exportar.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A distribuição passa a incluir outro território e outra data.",
    "tasks": [
      "Dossiê de trabalho — Coordenação de entregas para festivais",
      "Base de análise: plano de produção por janela",
      "Conferência de evidências: mapa de direitos e versões",
      "Memória de decisão — O festival exige legenda separada e a cópia traz legenda incorporada",
      "Simulação da mudança: a distribuição passa a incluir outro território e outra data",
      "Relatório de transferência para coordenador de produção audiovisual"
    ]
  },
  {
    "id": "gestao-de-acervos-de-som-ambiente",
    "scenario": "Dois sons de praça têm duração idêntica e licenças de reutilização distintas.",
    "decision": "Indexar autoria, local, licença e restrição por gravação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A distribuição passa a incluir outro território e outra data.",
    "tasks": [
      "Dossiê de trabalho — Gestão de acervos de som ambiente",
      "Base de análise: plano de produção por janela",
      "Conferência de evidências: mapa de direitos e versões",
      "Memória de decisão — Dois sons de praça têm duração idêntica e licenças de reutilização distintas",
      "Simulação da mudança: a distribuição passa a incluir outro território e outra data",
      "Relatório de transferência para coordenador de produção audiovisual"
    ]
  },
  {
    "id": "planejamento-de-distribuicao-de-documentarios",
    "scenario": "Uma janela exclusiva de exibição coincide com lançamento público previsto.",
    "decision": "Montar cronologia por território e negociar janelas disponíveis.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A distribuição passa a incluir outro território e outra data.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de distribuição de documentários",
      "Base de análise: plano de produção por janela",
      "Conferência de evidências: mapa de direitos e versões",
      "Memória de decisão — Uma janela exclusiva de exibição coincide com lançamento público previsto",
      "Simulação da mudança: a distribuição passa a incluir outro território e outra data",
      "Relatório de transferência para coordenador de produção audiovisual"
    ]
  },
  {
    "id": "operacao-de-catalogos-de-direitos-audiovisuais",
    "scenario": "O catálogo registra direitos para Portugal mas o pedido abrange todos os países lusófonos.",
    "decision": "Limitar a oferta aos territórios documentados e levantar autorizações faltantes.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A distribuição passa a incluir outro território e outra data.",
    "tasks": [
      "Dossiê de trabalho — Operação de catálogos de direitos audiovisuais",
      "Base de análise: plano de produção por janela",
      "Conferência de evidências: mapa de direitos e versões",
      "Memória de decisão — O catálogo registra direitos para Portugal mas o pedido abrange todos os países lusófonos",
      "Simulação da mudança: a distribuição passa a incluir outro território e outra data",
      "Relatório de transferência para coordenador de produção audiovisual"
    ]
  }
];

export default cases;

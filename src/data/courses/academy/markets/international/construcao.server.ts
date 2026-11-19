import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "medicao-de-quantitativos-de-alvenaria",
    "scenario": "Parede de 8 por 3 m inclui abertura de 2 por 2.",
    "decision": "Medir 20 m² líquidos antes de aplicar perda de orçamento.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O responsável aprova uma revisão depois da emissão do pedido.",
    "tasks": [
      "Dossiê de trabalho — Medição de quantitativos de alvenaria",
      "Base de análise: memória de medição por ambiente",
      "Conferência de evidências: registro de revisão e aceite",
      "Memória de decisão — Parede de 8 por 3 m inclui abertura de 2 por 2",
      "Simulação da mudança: o responsável aprova uma revisão depois da emissão do pedido",
      "Relatório de transferência para assistente de planejamento de obras"
    ]
  },
  {
    "id": "orcamento-de-acabamentos-por-ambiente",
    "scenario": "Dois ambientes de 18 e 24 m² usam materiais com preços de 30 e 45 por m².",
    "decision": "Separar subtotais de 540 e 1080 e justificar perdas por material.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O responsável aprova uma revisão depois da emissão do pedido.",
    "tasks": [
      "Dossiê de trabalho — Orçamento de acabamentos por ambiente",
      "Base de análise: memória de medição por ambiente",
      "Conferência de evidências: registro de revisão e aceite",
      "Memória de decisão — Dois ambientes de 18 e 24 m² usam materiais com preços de 30 e 45 por m²",
      "Simulação da mudança: o responsável aprova uma revisão depois da emissão do pedido",
      "Relatório de transferência para assistente de planejamento de obras"
    ]
  },
  {
    "id": "programacao-de-entregas-de-concreto",
    "scenario": "Uma janela aceita dois caminhões por hora e três têm chegada prevista às 9h.",
    "decision": "Redistribuir horários com o responsável técnico e registrar a capacidade real de recebimento.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O responsável aprova uma revisão depois da emissão do pedido.",
    "tasks": [
      "Dossiê de trabalho — Programação de entregas de concreto",
      "Base de análise: memória de medição por ambiente",
      "Conferência de evidências: registro de revisão e aceite",
      "Memória de decisão — Uma janela aceita dois caminhões por hora e três têm chegada prevista às 9h",
      "Simulação da mudança: o responsável aprova uma revisão depois da emissão do pedido",
      "Relatório de transferência para assistente de planejamento de obras"
    ]
  },
  {
    "id": "controle-documental-de-mudancas-de-obra",
    "scenario": "Uma alteração aprovada modifica o desenho mas a compra cita a revisão anterior.",
    "decision": "Associar pedido e medição à revisão vigente e registrar impacto antes da liberação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O responsável aprova uma revisão depois da emissão do pedido.",
    "tasks": [
      "Dossiê de trabalho — Controle documental de mudanças de obra",
      "Base de análise: memória de medição por ambiente",
      "Conferência de evidências: registro de revisão e aceite",
      "Memória de decisão — Uma alteração aprovada modifica o desenho mas a compra cita a revisão anterior",
      "Simulação da mudança: o responsável aprova uma revisão depois da emissão do pedido",
      "Relatório de transferência para assistente de planejamento de obras"
    ]
  },
  {
    "id": "compras-por-pacote-de-execucao",
    "scenario": "Dois pacotes incluem o mesmo acabamento de 80 m².",
    "decision": "Eliminar dupla contagem por fronteira contratual e confirmar quem fornece o item.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O responsável aprova uma revisão depois da emissão do pedido.",
    "tasks": [
      "Dossiê de trabalho — Compras por pacote de execução",
      "Base de análise: memória de medição por ambiente",
      "Conferência de evidências: registro de revisão e aceite",
      "Memória de decisão — Dois pacotes incluem o mesmo acabamento de 80 m²",
      "Simulação da mudança: o responsável aprova uma revisão depois da emissão do pedido",
      "Relatório de transferência para assistente de planejamento de obras"
    ]
  },
  {
    "id": "gestao-de-amostras-de-revestimentos",
    "scenario": "Duas amostras têm o mesmo nome comercial e lotes distintos.",
    "decision": "Registrar lote, acabamento e aprovação de cada amostra antes de associar o pedido.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O responsável aprova uma revisão depois da emissão do pedido.",
    "tasks": [
      "Dossiê de trabalho — Gestão de amostras de revestimentos",
      "Base de análise: memória de medição por ambiente",
      "Conferência de evidências: registro de revisão e aceite",
      "Memória de decisão — Duas amostras têm o mesmo nome comercial e lotes distintos",
      "Simulação da mudança: o responsável aprova uma revisão depois da emissão do pedido",
      "Relatório de transferência para assistente de planejamento de obras"
    ]
  },
  {
    "id": "planejamento-de-ocupacao-de-canteiros",
    "scenario": "A área livre é de 100 m², materiais ocupam 75 e a faixa reservada usa 35.",
    "decision": "Identificar sobreposição de 10 m² e escalonar entregas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O responsável aprova uma revisão depois da emissão do pedido.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de ocupação de canteiros",
      "Base de análise: memória de medição por ambiente",
      "Conferência de evidências: registro de revisão e aceite",
      "Memória de decisão — A área livre é de 100 m², materiais ocupam 75 e a faixa reservada usa 35",
      "Simulação da mudança: o responsável aprova uma revisão depois da emissão do pedido",
      "Relatório de transferência para assistente de planejamento de obras"
    ]
  },
  {
    "id": "conciliacao-entre-medicao-e-faturamento",
    "scenario": "Foram medidos 70 m e faturados 85 m ao mesmo preço.",
    "decision": "Segregar 15 m sem medição correspondente para conferência.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O responsável aprova uma revisão depois da emissão do pedido.",
    "tasks": [
      "Dossiê de trabalho — Conciliação entre medição e faturamento",
      "Base de análise: memória de medição por ambiente",
      "Conferência de evidências: registro de revisão e aceite",
      "Memória de decisão — Foram medidos 70 m e faturados 85 m ao mesmo preço",
      "Simulação da mudança: o responsável aprova uma revisão depois da emissão do pedido",
      "Relatório de transferência para assistente de planejamento de obras"
    ]
  },
  {
    "id": "inventario-de-componentes-para-reuso",
    "scenario": "De 48 componentes retirados, 12 aguardam inspeção e 6 foram rejeitados.",
    "decision": "Registrar 30 disponíveis e manter 12 condicionais separados.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O responsável aprova uma revisão depois da emissão do pedido.",
    "tasks": [
      "Dossiê de trabalho — Inventário de componentes para reúso",
      "Base de análise: memória de medição por ambiente",
      "Conferência de evidências: registro de revisão e aceite",
      "Memória de decisão — De 48 componentes retirados, 12 aguardam inspeção e 6 foram rejeitados",
      "Simulação da mudança: o responsável aprova uma revisão depois da emissão do pedido",
      "Relatório de transferência para assistente de planejamento de obras"
    ]
  },
  {
    "id": "entrega-documental-de-empreendimentos",
    "scenario": "A lista de entrega contém 20 documentos; 18 existem e dois dos 18 estão vencidos.",
    "decision": "Registrar 16 válidos e quatro pendências distintas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O responsável aprova uma revisão depois da emissão do pedido.",
    "tasks": [
      "Dossiê de trabalho — Entrega documental de empreendimentos",
      "Base de análise: memória de medição por ambiente",
      "Conferência de evidências: registro de revisão e aceite",
      "Memória de decisão — A lista de entrega contém 20 documentos; 18 existem e dois dos 18 estão vencidos",
      "Simulação da mudança: o responsável aprova uma revisão depois da emissão do pedido",
      "Relatório de transferência para assistente de planejamento de obras"
    ]
  }
];

export default cases;

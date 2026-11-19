import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "reposicao-de-hortifruti-por-maturacao",
    "scenario": "Uma loja tem 20 caixas maduras e 30 verdes com saída prevista de 12 hoje.",
    "decision": "Priorizar as maduras e recalcular o saldo por estágio após a venda.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A próxima reposição chega depois da abertura da loja.",
    "tasks": [
      "Dossiê de trabalho — Reposição de hortifrúti por maturação",
      "Base de análise: posição por lote e validade",
      "Conferência de evidências: relatório de saída e reposição",
      "Memória de decisão — Uma loja tem 20 caixas maduras e 30 verdes com saída prevista de 12 hoje",
      "Simulação da mudança: a próxima reposição chega depois da abertura da loja",
      "Relatório de transferência para analista de operações de varejo alimentar"
    ]
  },
  {
    "id": "precificacao-de-pereciveis-por-data",
    "scenario": "Dois lotes vencem em datas distintas mas o sistema aplica um desconto único.",
    "decision": "Simular descontos por lote com prazo, saldo e venda diária observada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A próxima reposição chega depois da abertura da loja.",
    "tasks": [
      "Dossiê de trabalho — Precificação de perecíveis por data",
      "Base de análise: posição por lote e validade",
      "Conferência de evidências: relatório de saída e reposição",
      "Memória de decisão — Dois lotes vencem em datas distintas mas o sistema aplica um desconto único",
      "Simulação da mudança: a próxima reposição chega depois da abertura da loja",
      "Relatório de transferência para analista de operações de varejo alimentar"
    ]
  },
  {
    "id": "gestao-de-exposicao-refrigerada",
    "scenario": "A área de exposição admite 24 bandejas e o plano prevê 30.",
    "decision": "Reprogramar exposição e reposição preservando as condições de conservação definidas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A próxima reposição chega depois da abertura da loja.",
    "tasks": [
      "Dossiê de trabalho — Gestão de exposição refrigerada",
      "Base de análise: posição por lote e validade",
      "Conferência de evidências: relatório de saída e reposição",
      "Memória de decisão — A área de exposição admite 24 bandejas e o plano prevê 30",
      "Simulação da mudança: a próxima reposição chega depois da abertura da loja",
      "Relatório de transferência para analista de operações de varejo alimentar"
    ]
  },
  {
    "id": "analise-de-ruptura-invisivel-em-gondola",
    "scenario": "O sistema indica 15 unidades, mas a gôndola está vazia e há 12 no depósito.",
    "decision": "Registrar falha de reposição e investigar três unidades em diferença.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A próxima reposição chega depois da abertura da loja.",
    "tasks": [
      "Dossiê de trabalho — Análise de ruptura invisível em gôndola",
      "Base de análise: posição por lote e validade",
      "Conferência de evidências: relatório de saída e reposição",
      "Memória de decisão — O sistema indica 15 unidades, mas a gôndola está vazia e há 12 no depósito",
      "Simulação da mudança: a próxima reposição chega depois da abertura da loja",
      "Relatório de transferência para analista de operações de varejo alimentar"
    ]
  },
  {
    "id": "planejamento-de-cestas-por-assinatura",
    "scenario": "Há 90 assinantes, 8 pausas confirmadas e 5 novas adesões válidas.",
    "decision": "Preparar 87 cestas distinguindo pedidos ativos e histórico.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A próxima reposição chega depois da abertura da loja.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de cestas por assinatura",
      "Base de análise: posição por lote e validade",
      "Conferência de evidências: relatório de saída e reposição",
      "Memória de decisão — Há 90 assinantes, 8 pausas confirmadas e 5 novas adesões válidas",
      "Simulação da mudança: a próxima reposição chega depois da abertura da loja",
      "Relatório de transferência para analista de operações de varejo alimentar"
    ]
  },
  {
    "id": "distribuicao-de-estoques-promocionais",
    "scenario": "Uma loja vende 20 por dia e outra 5; ambas pedem o mesmo lote promocional.",
    "decision": "Dimensionar dias de cobertura por loja e reservar estoque para reposição.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A próxima reposição chega depois da abertura da loja.",
    "tasks": [
      "Dossiê de trabalho — Distribuição de estoques promocionais",
      "Base de análise: posição por lote e validade",
      "Conferência de evidências: relatório de saída e reposição",
      "Memória de decisão — Uma loja vende 20 por dia e outra 5; ambas pedem o mesmo lote promocional",
      "Simulação da mudança: a próxima reposição chega depois da abertura da loja",
      "Relatório de transferência para analista de operações de varejo alimentar"
    ]
  },
  {
    "id": "conciliacao-de-descontos-de-fornecedores",
    "scenario": "A nota concede desconto sobre 80 caixas, mas o acordo incluía 95 elegíveis.",
    "decision": "Calcular a diferença sobre 15 caixas e anexar documentos de elegibilidade.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A próxima reposição chega depois da abertura da loja.",
    "tasks": [
      "Dossiê de trabalho — Conciliação de descontos de fornecedores",
      "Base de análise: posição por lote e validade",
      "Conferência de evidências: relatório de saída e reposição",
      "Memória de decisão — A nota concede desconto sobre 80 caixas, mas o acordo incluía 95 elegíveis",
      "Simulação da mudança: a próxima reposição chega depois da abertura da loja",
      "Relatório de transferência para analista de operações de varejo alimentar"
    ]
  },
  {
    "id": "planejamento-de-compras-de-floricultura",
    "scenario": "A encomenda pede 90 hastes vendáveis e são esperadas perdas de 10%.",
    "decision": "Comprar 100 hastes no cenário-base e simular variação na qualidade de chegada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A próxima reposição chega depois da abertura da loja.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de compras de floricultura",
      "Base de análise: posição por lote e validade",
      "Conferência de evidências: relatório de saída e reposição",
      "Memória de decisão — A encomenda pede 90 hastes vendáveis e são esperadas perdas de 10%",
      "Simulação da mudança: a próxima reposição chega depois da abertura da loja",
      "Relatório de transferência para analista de operações de varejo alimentar"
    ]
  },
  {
    "id": "sortimento-para-pequenas-mercearias",
    "scenario": "Três produtos lentos ocupam espaço mas um completa uma cesta recorrente.",
    "decision": "Comparar contribuição por espaço e efeito sobre a composição da cesta.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A próxima reposição chega depois da abertura da loja.",
    "tasks": [
      "Dossiê de trabalho — Sortimento para pequenas mercearias",
      "Base de análise: posição por lote e validade",
      "Conferência de evidências: relatório de saída e reposição",
      "Memória de decisão — Três produtos lentos ocupam espaço mas um completa uma cesta recorrente",
      "Simulação da mudança: a próxima reposição chega depois da abertura da loja",
      "Relatório de transferência para analista de operações de varejo alimentar"
    ]
  },
  {
    "id": "auditoria-de-substituicoes-em-supermercado-online",
    "scenario": "Uma substituição mantém preço mas altera ingrediente indicado pelo cliente como restrito.",
    "decision": "Reter a substituição e solicitar escolha compatível pelo canal autorizado.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "A próxima reposição chega depois da abertura da loja.",
    "tasks": [
      "Dossiê de trabalho — Auditoria de substituições em supermercado online",
      "Base de análise: posição por lote e validade",
      "Conferência de evidências: relatório de saída e reposição",
      "Memória de decisão — Uma substituição mantém preço mas altera ingrediente indicado pelo cliente como restrito",
      "Simulação da mudança: a próxima reposição chega depois da abertura da loja",
      "Relatório de transferência para analista de operações de varejo alimentar"
    ]
  }
];

export default cases;

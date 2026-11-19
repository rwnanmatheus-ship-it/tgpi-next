import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "planejamento-de-capacidade-de-viveiros",
    "scenario": "Cada bancada recebe 24 bandejas e quatro das dez bancadas estão ocupadas.",
    "decision": "Planejar até 144 bandejas livres e reservar circulação separadamente.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O comprador antecipa um pedido sem alterar a quantidade.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de capacidade de viveiros",
      "Base de análise: mapa de lotes e janelas de entrega",
      "Conferência de evidências: ficha de rendimento comercial",
      "Memória de decisão — Cada bancada recebe 24 bandejas e quatro das dez bancadas estão ocupadas",
      "Simulação da mudança: o comprador antecipa um pedido sem alterar a quantidade",
      "Relatório de transferência para planejador de horticultura comercial"
    ]
  },
  {
    "id": "programacao-de-colheita-por-pedido",
    "scenario": "Dois pedidos vencem em dias diferentes e apenas um aceita colheita parcial.",
    "decision": "Priorizar janela e maturação e documentar o saldo fracionável.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O comprador antecipa um pedido sem alterar a quantidade.",
    "tasks": [
      "Dossiê de trabalho — Programação de colheita por pedido",
      "Base de análise: mapa de lotes e janelas de entrega",
      "Conferência de evidências: ficha de rendimento comercial",
      "Memória de decisão — Dois pedidos vencem em dias diferentes e apenas um aceita colheita parcial",
      "Simulação da mudança: o comprador antecipa um pedido sem alterar a quantidade",
      "Relatório de transferência para planejador de horticultura comercial"
    ]
  },
  {
    "id": "classificacao-comercial-de-flores-de-corte",
    "scenario": "Um lote tem comprimentos mistos e o contrato estabelece três classes.",
    "decision": "Amostrar, medir e registrar a distribuição por classe antes de precificar.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O comprador antecipa um pedido sem alterar a quantidade.",
    "tasks": [
      "Dossiê de trabalho — Classificação comercial de flores de corte",
      "Base de análise: mapa de lotes e janelas de entrega",
      "Conferência de evidências: ficha de rendimento comercial",
      "Memória de decisão — Um lote tem comprimentos mistos e o contrato estabelece três classes",
      "Simulação da mudança: o comprador antecipa um pedido sem alterar a quantidade",
      "Relatório de transferência para planejador de horticultura comercial"
    ]
  },
  {
    "id": "planejamento-de-caixas-de-hortalicas",
    "scenario": "Uma caixa leva quatro variedades e uma delas só atende 32 das 40 caixas.",
    "decision": "Identificar oito caixas incompletas e aprovar alternativa antes da montagem.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O comprador antecipa um pedido sem alterar a quantidade.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de caixas de hortaliças",
      "Base de análise: mapa de lotes e janelas de entrega",
      "Conferência de evidências: ficha de rendimento comercial",
      "Memória de decisão — Uma caixa leva quatro variedades e uma delas só atende 32 das 40 caixas",
      "Simulação da mudança: o comprador antecipa um pedido sem alterar a quantidade",
      "Relatório de transferência para planejador de horticultura comercial"
    ]
  },
  {
    "id": "custos-de-substratos-por-bandeja",
    "scenario": "Uma bandeja consome 2,5 litros e o saco de 50 litros custa 30.",
    "decision": "Estimar 1,50 por bandeja antes de perdas observadas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O comprador antecipa um pedido sem alterar a quantidade.",
    "tasks": [
      "Dossiê de trabalho — Custos de substratos por bandeja",
      "Base de análise: mapa de lotes e janelas de entrega",
      "Conferência de evidências: ficha de rendimento comercial",
      "Memória de decisão — Uma bandeja consome 2,5 litros e o saco de 50 litros custa 30",
      "Simulação da mudança: o comprador antecipa um pedido sem alterar a quantidade",
      "Relatório de transferência para planejador de horticultura comercial"
    ]
  },
  {
    "id": "controle-de-perdas-pos-colheita",
    "scenario": "A colheita pesou 300 kg, 255 foram vendidos e 15 seguem armazenados.",
    "decision": "Reconciliar 30 kg e investigar destino antes de atribuir toda a diferença a perdas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O comprador antecipa um pedido sem alterar a quantidade.",
    "tasks": [
      "Dossiê de trabalho — Controle de perdas pós-colheita",
      "Base de análise: mapa de lotes e janelas de entrega",
      "Conferência de evidências: ficha de rendimento comercial",
      "Memória de decisão — A colheita pesou 300 kg, 255 foram vendidos e 15 seguem armazenados",
      "Simulação da mudança: o comprador antecipa um pedido sem alterar a quantidade",
      "Relatório de transferência para planejador de horticultura comercial"
    ]
  },
  {
    "id": "coordenacao-de-mercados-de-produtores",
    "scenario": "Há 28 expositores e 24 bancas; quatro dependem de ponto de energia.",
    "decision": "Alocar primeiro as restrições obrigatórias e abrir lista transparente para excedentes.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O comprador antecipa um pedido sem alterar a quantidade.",
    "tasks": [
      "Dossiê de trabalho — Coordenação de mercados de produtores",
      "Base de análise: mapa de lotes e janelas de entrega",
      "Conferência de evidências: ficha de rendimento comercial",
      "Memória de decisão — Há 28 expositores e 24 bancas; quatro dependem de ponto de energia",
      "Simulação da mudança: o comprador antecipa um pedido sem alterar a quantidade",
      "Relatório de transferência para planejador de horticultura comercial"
    ]
  },
  {
    "id": "programacao-de-expedicao-de-mudas",
    "scenario": "Um pedido reúne mudas prontas e outras sem liberação para expedição.",
    "decision": "Separar lotes liberados e negociar entrega parcial rastreável.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O comprador antecipa um pedido sem alterar a quantidade.",
    "tasks": [
      "Dossiê de trabalho — Programação de expedição de mudas",
      "Base de análise: mapa de lotes e janelas de entrega",
      "Conferência de evidências: ficha de rendimento comercial",
      "Memória de decisão — Um pedido reúne mudas prontas e outras sem liberação para expedição",
      "Simulação da mudança: o comprador antecipa um pedido sem alterar a quantidade",
      "Relatório de transferência para planejador de horticultura comercial"
    ]
  },
  {
    "id": "gestao-de-embalagens-de-frutas-frageis",
    "scenario": "A embalagem A custa mais e reduz avarias observadas de 8% a 3%.",
    "decision": "Comparar custo adicional com valor esperado de cinco pontos percentuais de perda evitada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O comprador antecipa um pedido sem alterar a quantidade.",
    "tasks": [
      "Dossiê de trabalho — Gestão de embalagens de frutas frágeis",
      "Base de análise: mapa de lotes e janelas de entrega",
      "Conferência de evidências: ficha de rendimento comercial",
      "Memória de decisão — A embalagem A custa mais e reduz avarias observadas de 8% a 3%",
      "Simulação da mudança: o comprador antecipa um pedido sem alterar a quantidade",
      "Relatório de transferência para planejador de horticultura comercial"
    ]
  },
  {
    "id": "planejamento-de-contratos-de-abastecimento-local",
    "scenario": "Um contrato exige 50 caixas semanais e a oferta varia entre 38 e 64.",
    "decision": "Modelar déficit de 12 no cenário baixo e negociar flexibilidade verificável.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O comprador antecipa um pedido sem alterar a quantidade.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de contratos de abastecimento local",
      "Base de análise: mapa de lotes e janelas de entrega",
      "Conferência de evidências: ficha de rendimento comercial",
      "Memória de decisão — Um contrato exige 50 caixas semanais e a oferta varia entre 38 e 64",
      "Simulação da mudança: o comprador antecipa um pedido sem alterar a quantidade",
      "Relatório de transferência para planejador de horticultura comercial"
    ]
  }
];

export default cases;

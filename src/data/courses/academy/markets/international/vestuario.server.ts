import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "planejamento-de-grades-de-tamanho",
    "scenario": "A grade 1:2:2:1 corresponde a 60 peças.",
    "decision": "Distribuir 10, 20, 20 e 10 por tamanho e comparar com venda histórica.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente divide a encomenda em duas datas de entrega.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de grades de tamanho",
      "Base de análise: grade por modelo e tamanho",
      "Conferência de evidências: controle de lote e reserva",
      "Memória de decisão — A grade 1:2:2:1 corresponde a 60 peças",
      "Simulação da mudança: o cliente divide a encomenda em duas datas de entrega",
      "Relatório de transferência para analista de operações de vestuário"
    ]
  },
  {
    "id": "compras-de-tecidos-por-lote",
    "scenario": "Dois lotes cobrem a metragem total mas apresentam tonalidades diferentes.",
    "decision": "Reservar cada lote por peça ou conjunto e calcular sobra separada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente divide a encomenda em duas datas de entrega.",
    "tasks": [
      "Dossiê de trabalho — Compras de tecidos por lote",
      "Base de análise: grade por modelo e tamanho",
      "Conferência de evidências: controle de lote e reserva",
      "Memória de decisão — Dois lotes cobrem a metragem total mas apresentam tonalidades diferentes",
      "Simulação da mudança: o cliente divide a encomenda em duas datas de entrega",
      "Relatório de transferência para analista de operações de vestuário"
    ]
  },
  {
    "id": "custeio-de-colecao-capsula",
    "scenario": "O desenvolvimento custa 1200 e a coleção tem 80 peças previstas.",
    "decision": "Alocar 15 por peça no cenário planejado e testar venda de apenas 60.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente divide a encomenda em duas datas de entrega.",
    "tasks": [
      "Dossiê de trabalho — Custeio de coleção cápsula",
      "Base de análise: grade por modelo e tamanho",
      "Conferência de evidências: controle de lote e reserva",
      "Memória de decisão — O desenvolvimento custa 1200 e a coleção tem 80 peças previstas",
      "Simulação da mudança: o cliente divide a encomenda em duas datas de entrega",
      "Relatório de transferência para analista de operações de vestuário"
    ]
  },
  {
    "id": "fichas-tecnicas-de-confeccao",
    "scenario": "A ficha de corte cita revisão 3 e a de costura revisão 2.",
    "decision": "Reconciliar medidas e publicar uma revisão aprovada para a ordem.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente divide a encomenda em duas datas de entrega.",
    "tasks": [
      "Dossiê de trabalho — Fichas técnicas de confecção",
      "Base de análise: grade por modelo e tamanho",
      "Conferência de evidências: controle de lote e reserva",
      "Memória de decisão — A ficha de corte cita revisão 3 e a de costura revisão 2",
      "Simulação da mudança: o cliente divide a encomenda em duas datas de entrega",
      "Relatório de transferência para analista de operações de vestuário"
    ]
  },
  {
    "id": "planejamento-de-corte-por-encomenda",
    "scenario": "A encomenda exige 45 peças e cada encaixe completo gera oito.",
    "decision": "Comparar seis encaixes com cinco e um parcial antes de autorizar sobras.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente divide a encomenda em duas datas de entrega.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de corte por encomenda",
      "Base de análise: grade por modelo e tamanho",
      "Conferência de evidências: controle de lote e reserva",
      "Memória de decisão — A encomenda exige 45 peças e cada encaixe completo gera oito",
      "Simulação da mudança: o cliente divide a encomenda em duas datas de entrega",
      "Relatório de transferência para analista de operações de vestuário"
    ]
  },
  {
    "id": "controle-de-amostras-de-showroom",
    "scenario": "Saíram 16 amostras e voltaram 13; duas estão em ensaio externo.",
    "decision": "Rastrear duas externas e investigar a unidade sem destino.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente divide a encomenda em duas datas de entrega.",
    "tasks": [
      "Dossiê de trabalho — Controle de amostras de showroom",
      "Base de análise: grade por modelo e tamanho",
      "Conferência de evidências: controle de lote e reserva",
      "Memória de decisão — Saíram 16 amostras e voltaram 13; duas estão em ensaio externo",
      "Simulação da mudança: o cliente divide a encomenda em duas datas de entrega",
      "Relatório de transferência para analista de operações de vestuário"
    ]
  },
  {
    "id": "analise-de-devolucoes-por-modelagem",
    "scenario": "O modelo A devolve 12 em 100 e B devolve 8 em 40.",
    "decision": "Priorizar diagnóstico da taxa de 20% de B com análise por tamanho.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente divide a encomenda em duas datas de entrega.",
    "tasks": [
      "Dossiê de trabalho — Análise de devoluções por modelagem",
      "Base de análise: grade por modelo e tamanho",
      "Conferência de evidências: controle de lote e reserva",
      "Memória de decisão — O modelo A devolve 12 em 100 e B devolve 8 em 40",
      "Simulação da mudança: o cliente divide a encomenda em duas datas de entrega",
      "Relatório de transferência para analista de operações de vestuário"
    ]
  },
  {
    "id": "distribuicao-de-colecao-por-loja",
    "scenario": "Duas lojas vendem quantidades iguais mas têm composições de tamanho opostas.",
    "decision": "Distribuir por demanda de tamanho e estoque disponível de cada loja.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente divide a encomenda em duas datas de entrega.",
    "tasks": [
      "Dossiê de trabalho — Distribuição de coleção por loja",
      "Base de análise: grade por modelo e tamanho",
      "Conferência de evidências: controle de lote e reserva",
      "Memória de decisão — Duas lojas vendem quantidades iguais mas têm composições de tamanho opostas",
      "Simulação da mudança: o cliente divide a encomenda em duas datas de entrega",
      "Relatório de transferência para analista de operações de vestuário"
    ]
  },
  {
    "id": "gestao-de-acervo-de-figurinos",
    "scenario": "Um figurino foi reservado para dois elencos no mesmo horário.",
    "decision": "Conferir peça individual, prova e deslocamento antes de confirmar uso.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente divide a encomenda em duas datas de entrega.",
    "tasks": [
      "Dossiê de trabalho — Gestão de acervo de figurinos",
      "Base de análise: grade por modelo e tamanho",
      "Conferência de evidências: controle de lote e reserva",
      "Memória de decisão — Um figurino foi reservado para dois elencos no mesmo horário",
      "Simulação da mudança: o cliente divide a encomenda em duas datas de entrega",
      "Relatório de transferência para analista de operações de vestuário"
    ]
  },
  {
    "id": "programacao-de-aluguel-de-roupas",
    "scenario": "Uma roupa retorna às 12h e exige 4h de preparação antes da reserva das 15h.",
    "decision": "Sinalizar conflito de uma hora e oferecer peça ou janela alternativa.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente divide a encomenda em duas datas de entrega.",
    "tasks": [
      "Dossiê de trabalho — Programação de aluguel de roupas",
      "Base de análise: grade por modelo e tamanho",
      "Conferência de evidências: controle de lote e reserva",
      "Memória de decisão — Uma roupa retorna às 12h e exige 4h de preparação antes da reserva das 15h",
      "Simulação da mudança: o cliente divide a encomenda em duas datas de entrega",
      "Relatório de transferência para analista de operações de vestuário"
    ]
  }
];

export default cases;

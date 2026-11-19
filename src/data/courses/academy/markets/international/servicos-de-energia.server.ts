import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "conciliacao-de-creditos-de-geracao-compartilhada",
    "scenario": "Foram distribuídos 960 créditos em quotas de 50%, 30% e 20%.",
    "decision": "Confrontar lançamentos esperados de 480, 288 e 192 com o extrato.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma fonte chega com competência diferente da informada inicialmente.",
    "tasks": [
      "Dossiê de trabalho — Conciliação de créditos de geração compartilhada",
      "Base de análise: ficha por unidade e período",
      "Conferência de evidências: registro de medição e revisão",
      "Memória de decisão — Foram distribuídos 960 créditos em quotas de 50%, 30% e 20%",
      "Simulação da mudança: uma fonte chega com competência diferente da informada inicialmente",
      "Relatório de transferência para analista de operações de serviços de energia"
    ]
  },
  {
    "id": "planejamento-de-atendimento-a-prosumidores",
    "scenario": "A central recebe dúvidas de medição e pedidos de alteração contratual na mesma fila.",
    "decision": "Separar triagem informativa e fluxo autorizado de alteração.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma fonte chega com competência diferente da informada inicialmente.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de atendimento a prosumidores",
      "Base de análise: ficha por unidade e período",
      "Conferência de evidências: registro de medição e revisão",
      "Memória de decisão — A central recebe dúvidas de medição e pedidos de alteração contratual na mesma fila",
      "Simulação da mudança: uma fonte chega com competência diferente da informada inicialmente",
      "Relatório de transferência para analista de operações de serviços de energia"
    ]
  },
  {
    "id": "gestao-de-cadastros-de-unidades-consumidoras",
    "scenario": "Uma unidade conserva o endereço após mudança de titular e medidor.",
    "decision": "Modelar unidade, titularidade temporal e medidor como registros vinculados.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma fonte chega com competência diferente da informada inicialmente.",
    "tasks": [
      "Dossiê de trabalho — Gestão de cadastros de unidades consumidoras",
      "Base de análise: ficha por unidade e período",
      "Conferência de evidências: registro de medição e revisão",
      "Memória de decisão — Uma unidade conserva o endereço após mudança de titular e medidor",
      "Simulação da mudança: uma fonte chega com competência diferente da informada inicialmente",
      "Relatório de transferência para analista de operações de serviços de energia"
    ]
  },
  {
    "id": "analise-de-demanda-de-ponta-em-comercio",
    "scenario": "Três intervalos de quinze minutos exibem potências médias de 45, 72 e 50 kW.",
    "decision": "Identificar pico de 72 kW e manter potência distinta de energia acumulada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma fonte chega com competência diferente da informada inicialmente.",
    "tasks": [
      "Dossiê de trabalho — Análise de demanda de ponta em comércio",
      "Base de análise: ficha por unidade e período",
      "Conferência de evidências: registro de medição e revisão",
      "Memória de decisão — Três intervalos de quinze minutos exibem potências médias de 45, 72 e 50 kW",
      "Simulação da mudança: uma fonte chega com competência diferente da informada inicialmente",
      "Relatório de transferência para analista de operações de serviços de energia"
    ]
  },
  {
    "id": "medicao-de-desempenho-de-contratos-de-iluminacao",
    "scenario": "Um contrato mede disponibilidade sobre 200 pontos e 12 ficaram indisponíveis no instante amostrado.",
    "decision": "Registrar disponibilidade instantânea de 94% e coletar duração para medir o período.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma fonte chega com competência diferente da informada inicialmente.",
    "tasks": [
      "Dossiê de trabalho — Medição de desempenho de contratos de iluminação",
      "Base de análise: ficha por unidade e período",
      "Conferência de evidências: registro de medição e revisão",
      "Memória de decisão — Um contrato mede disponibilidade sobre 200 pontos e 12 ficaram indisponíveis no instante amostrado",
      "Simulação da mudança: uma fonte chega com competência diferente da informada inicialmente",
      "Relatório de transferência para analista de operações de serviços de energia"
    ]
  },
  {
    "id": "triagem-documental-de-pedidos-de-conexao",
    "scenario": "O formulário está completo mas o desenho corresponde a uma revisão retirada.",
    "decision": "Encaminhar pendência documental da revisão antes da análise técnica.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma fonte chega com competência diferente da informada inicialmente.",
    "tasks": [
      "Dossiê de trabalho — Triagem documental de pedidos de conexão",
      "Base de análise: ficha por unidade e período",
      "Conferência de evidências: registro de medição e revisão",
      "Memória de decisão — O formulário está completo mas o desenho corresponde a uma revisão retirada",
      "Simulação da mudança: uma fonte chega com competência diferente da informada inicialmente",
      "Relatório de transferência para analista de operações de serviços de energia"
    ]
  },
  {
    "id": "controle-de-garantias-de-modulos-fotovoltaicos",
    "scenario": "A fatura lista 30 módulos mas só 27 números de série conferem com o cadastro.",
    "decision": "Conciliar 27 e manter três exceções antes da abertura de garantia.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma fonte chega com competência diferente da informada inicialmente.",
    "tasks": [
      "Dossiê de trabalho — Controle de garantias de módulos fotovoltaicos",
      "Base de análise: ficha por unidade e período",
      "Conferência de evidências: registro de medição e revisão",
      "Memória de decisão — A fatura lista 30 módulos mas só 27 números de série conferem com o cadastro",
      "Simulação da mudança: uma fonte chega com competência diferente da informada inicialmente",
      "Relatório de transferência para analista de operações de serviços de energia"
    ]
  },
  {
    "id": "planejamento-de-pecas-para-parques-eolicos",
    "scenario": "Duas turbinas usam versões diferentes de um conjunto com nome idêntico.",
    "decision": "Cruzar revisão e compatibilidade da peça com a frota antes de dimensionar o estoque.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma fonte chega com competência diferente da informada inicialmente.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de peças para parques eólicos",
      "Base de análise: ficha por unidade e período",
      "Conferência de evidências: registro de medição e revisão",
      "Memória de decisão — Duas turbinas usam versões diferentes de um conjunto com nome idêntico",
      "Simulação da mudança: uma fonte chega com competência diferente da informada inicialmente",
      "Relatório de transferência para analista de operações de serviços de energia"
    ]
  },
  {
    "id": "comunicacao-de-obras-de-rede-com-comunidades",
    "scenario": "Um comunicado anuncia um único dia mas a obra tem duas fases em ruas diferentes.",
    "decision": "Produzir avisos por trecho, fase e janela confirmada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma fonte chega com competência diferente da informada inicialmente.",
    "tasks": [
      "Dossiê de trabalho — Comunicação de obras de rede com comunidades",
      "Base de análise: ficha por unidade e período",
      "Conferência de evidências: registro de medição e revisão",
      "Memória de decisão — Um comunicado anuncia um único dia mas a obra tem duas fases em ruas diferentes",
      "Simulação da mudança: uma fonte chega com competência diferente da informada inicialmente",
      "Relatório de transferência para analista de operações de serviços de energia"
    ]
  },
  {
    "id": "gestao-de-ativos-de-medicao-inteligente",
    "scenario": "Um medidor transmite após ter sido transferido para outra unidade.",
    "decision": "Preservar histórico de instalação e atribuir leitura pelo período de vínculo.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma fonte chega com competência diferente da informada inicialmente.",
    "tasks": [
      "Dossiê de trabalho — Gestão de ativos de medição inteligente",
      "Base de análise: ficha por unidade e período",
      "Conferência de evidências: registro de medição e revisão",
      "Memória de decisão — Um medidor transmite após ter sido transferido para outra unidade",
      "Simulação da mudança: uma fonte chega com competência diferente da informada inicialmente",
      "Relatório de transferência para analista de operações de serviços de energia"
    ]
  }
];

export default cases;

import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "reconciliacao-de-leituras-de-hidrometros",
    "scenario": "A sequência do medidor mostra 980 e depois 12; houve substituição registrada.",
    "decision": "Separar leituras por medidor e solicitar o fechamento do dispositivo anterior.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma informação cadastral é retificada após o fechamento do relatório.",
    "tasks": [
      "Dossiê de trabalho — Reconciliação de leituras de hidrômetros",
      "Base de análise: cadastro de unidade e período",
      "Conferência de evidências: histórico de leitura e atendimento",
      "Memória de decisão — A sequência do medidor mostra 980 e depois 12; houve substituição registrada",
      "Simulação da mudança: uma informação cadastral é retificada após o fechamento do relatório",
      "Relatório de transferência para assistente de operações de saneamento"
    ]
  },
  {
    "id": "analise-administrativa-de-consumo-atipico",
    "scenario": "O consumo registrado dobrou e o intervalo entre leituras passou de 30 para 60 dias.",
    "decision": "Comparar consumo diário equivalente antes de sinalizar anomalia.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma informação cadastral é retificada após o fechamento do relatório.",
    "tasks": [
      "Dossiê de trabalho — Análise administrativa de consumo atípico",
      "Base de análise: cadastro de unidade e período",
      "Conferência de evidências: histórico de leitura e atendimento",
      "Memória de decisão — O consumo registrado dobrou e o intervalo entre leituras passou de 30 para 60 dias",
      "Simulação da mudança: uma informação cadastral é retificada após o fechamento do relatório",
      "Relatório de transferência para assistente de operações de saneamento"
    ]
  },
  {
    "id": "planejamento-de-substituicao-de-medidores",
    "scenario": "Há 40 trocas previstas e a equipe realiza seis por dia útil.",
    "decision": "Reservar sete dias e prever acesso às unidades antes de confirmar o calendário.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma informação cadastral é retificada após o fechamento do relatório.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de substituição de medidores",
      "Base de análise: cadastro de unidade e período",
      "Conferência de evidências: histórico de leitura e atendimento",
      "Memória de decisão — Há 40 trocas previstas e a equipe realiza seis por dia útil",
      "Simulação da mudança: uma informação cadastral é retificada após o fechamento do relatório",
      "Relatório de transferência para assistente de operações de saneamento"
    ]
  },
  {
    "id": "cadastro-geografico-de-ligacoes",
    "scenario": "Dois pontos coincidem no mapa mas têm identificadores e endereços internos distintos.",
    "decision": "Validar o vínculo cadastral sem fundir as ligações por proximidade.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma informação cadastral é retificada após o fechamento do relatório.",
    "tasks": [
      "Dossiê de trabalho — Cadastro geográfico de ligações",
      "Base de análise: cadastro de unidade e período",
      "Conferência de evidências: histórico de leitura e atendimento",
      "Memória de decisão — Dois pontos coincidem no mapa mas têm identificadores e endereços internos distintos",
      "Simulação da mudança: uma informação cadastral é retificada após o fechamento do relatório",
      "Relatório de transferência para assistente de operações de saneamento"
    ]
  },
  {
    "id": "gestao-de-interrupcoes-programadas",
    "scenario": "Um aviso cobre a zona A mas a lista de usuários inclui uma derivação fora da zona.",
    "decision": "Conferir a área afetada com o operador e versionar a lista de comunicação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma informação cadastral é retificada após o fechamento do relatório.",
    "tasks": [
      "Dossiê de trabalho — Gestão de interrupções programadas",
      "Base de análise: cadastro de unidade e período",
      "Conferência de evidências: histórico de leitura e atendimento",
      "Memória de decisão — Um aviso cobre a zona A mas a lista de usuários inclui uma derivação fora da zona",
      "Simulação da mudança: uma informação cadastral é retificada após o fechamento do relatório",
      "Relatório de transferência para assistente de operações de saneamento"
    ]
  },
  {
    "id": "atendimento-multilingue-em-concessionarias",
    "scenario": "A mensagem traduzida omite o horário de encerramento do atendimento.",
    "decision": "Conferir campos críticos entre versões e aprovar uma mensagem equivalente.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma informação cadastral é retificada após o fechamento do relatório.",
    "tasks": [
      "Dossiê de trabalho — Atendimento multilíngue em concessionárias",
      "Base de análise: cadastro de unidade e período",
      "Conferência de evidências: histórico de leitura e atendimento",
      "Memória de decisão — A mensagem traduzida omite o horário de encerramento do atendimento",
      "Simulação da mudança: uma informação cadastral é retificada após o fechamento do relatório",
      "Relatório de transferência para assistente de operações de saneamento"
    ]
  },
  {
    "id": "controle-de-ordens-de-servico-de-saneamento",
    "scenario": "Uma ordem foi encerrada no aplicativo sem comprovante do serviço previsto.",
    "decision": "Separar estado administrativo e evidência de execução antes do aceite.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma informação cadastral é retificada após o fechamento do relatório.",
    "tasks": [
      "Dossiê de trabalho — Controle de ordens de serviço de saneamento",
      "Base de análise: cadastro de unidade e período",
      "Conferência de evidências: histórico de leitura e atendimento",
      "Memória de decisão — Uma ordem foi encerrada no aplicativo sem comprovante do serviço previsto",
      "Simulação da mudança: uma informação cadastral é retificada após o fechamento do relatório",
      "Relatório de transferência para assistente de operações de saneamento"
    ]
  },
  {
    "id": "inventario-documental-de-estacoes",
    "scenario": "Três desenhos têm o mesmo código e datas diferentes sem indicação de aprovação.",
    "decision": "Inventariar revisão e estado documental antes de marcar uma versão vigente.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma informação cadastral é retificada após o fechamento do relatório.",
    "tasks": [
      "Dossiê de trabalho — Inventário documental de estações",
      "Base de análise: cadastro de unidade e período",
      "Conferência de evidências: histórico de leitura e atendimento",
      "Memória de decisão — Três desenhos têm o mesmo código e datas diferentes sem indicação de aprovação",
      "Simulação da mudança: uma informação cadastral é retificada após o fechamento do relatório",
      "Relatório de transferência para assistente de operações de saneamento"
    ]
  },
  {
    "id": "planejamento-de-coleta-de-indicadores-de-perdas",
    "scenario": "O volume de entrada cobre mês civil e o faturado cobre ciclos deslocados.",
    "decision": "Alinhar períodos e documentar limites antes de estimar perdas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma informação cadastral é retificada após o fechamento do relatório.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de coleta de indicadores de perdas",
      "Base de análise: cadastro de unidade e período",
      "Conferência de evidências: histórico de leitura e atendimento",
      "Memória de decisão — O volume de entrada cobre mês civil e o faturado cobre ciclos deslocados",
      "Simulação da mudança: uma informação cadastral é retificada após o fechamento do relatório",
      "Relatório de transferência para assistente de operações de saneamento"
    ]
  },
  {
    "id": "gestao-de-solicitacoes-de-novas-ligacoes",
    "scenario": "Duas solicitações para o mesmo lote nomeiam unidades autônomas diferentes.",
    "decision": "Conferir unidade, titular autorizado e protocolo antes da deduplicação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma informação cadastral é retificada após o fechamento do relatório.",
    "tasks": [
      "Dossiê de trabalho — Gestão de solicitações de novas ligações",
      "Base de análise: cadastro de unidade e período",
      "Conferência de evidências: histórico de leitura e atendimento",
      "Memória de decisão — Duas solicitações para o mesmo lote nomeiam unidades autônomas diferentes",
      "Simulação da mudança: uma informação cadastral é retificada após o fechamento do relatório",
      "Relatório de transferência para assistente de operações de saneamento"
    ]
  }
];

export default cases;

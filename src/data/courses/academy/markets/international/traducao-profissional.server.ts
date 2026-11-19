import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "orcamento-de-traducao-por-memoria-reutilizavel",
    "scenario": "Um arquivo tem 2000 palavras novas e 1000 repetidas pagas a 30% da tarifa integral.",
    "decision": "Orçar 2300 palavras equivalentes e explicitar a regra de repetição.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente atualiza a fonte depois da primeira revisão bilíngue.",
    "tasks": [
      "Dossiê de trabalho — Orçamento de tradução por memória reutilizável",
      "Base de análise: matriz de segmentos e contexto",
      "Conferência de evidências: registro de versão e revisão linguística",
      "Memória de decisão — Um arquivo tem 2000 palavras novas e 1000 repetidas pagas a 30% da tarifa integral",
      "Simulação da mudança: o cliente atualiza a fonte depois da primeira revisão bilíngue",
      "Relatório de transferência para coordenador de produção linguística"
    ]
  },
  {
    "id": "gestao-de-glossarios-de-hotelaria",
    "scenario": "O hotel usa suíte para duas categorias diferentes em propriedades distintas.",
    "decision": "Definir conceito, contexto, propriedade e termo aprovado em cada idioma.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente atualiza a fonte depois da primeira revisão bilíngue.",
    "tasks": [
      "Dossiê de trabalho — Gestão de glossários de hotelaria",
      "Base de análise: matriz de segmentos e contexto",
      "Conferência de evidências: registro de versão e revisão linguística",
      "Memória de decisão — O hotel usa suíte para duas categorias diferentes em propriedades distintas",
      "Simulação da mudança: o cliente atualiza a fonte depois da primeira revisão bilíngue",
      "Relatório de transferência para coordenador de produção linguística"
    ]
  },
  {
    "id": "revisao-de-unidades-em-manuais-traduzidos",
    "scenario": "O texto traduzido mantém o número 10 mas troca polegadas por centímetros.",
    "decision": "Recalcular a unidade e verificar arredondamento e convenção do cliente.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente atualiza a fonte depois da primeira revisão bilíngue.",
    "tasks": [
      "Dossiê de trabalho — Revisão de unidades em manuais traduzidos",
      "Base de análise: matriz de segmentos e contexto",
      "Conferência de evidências: registro de versão e revisão linguística",
      "Memória de decisão — O texto traduzido mantém o número 10 mas troca polegadas por centímetros",
      "Simulação da mudança: o cliente atualiza a fonte depois da primeira revisão bilíngue",
      "Relatório de transferência para coordenador de produção linguística"
    ]
  },
  {
    "id": "preparacao-de-arquivos-para-traducao-assistida",
    "scenario": "Um arquivo contém texto editável e valores de variáveis entre chaves.",
    "decision": "Proteger os marcadores, extrair segmentos e testar a reintegração.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente atualiza a fonte depois da primeira revisão bilíngue.",
    "tasks": [
      "Dossiê de trabalho — Preparação de arquivos para tradução assistida",
      "Base de análise: matriz de segmentos e contexto",
      "Conferência de evidências: registro de versão e revisão linguística",
      "Memória de decisão — Um arquivo contém texto editável e valores de variáveis entre chaves",
      "Simulação da mudança: o cliente atualiza a fonte depois da primeira revisão bilíngue",
      "Relatório de transferência para coordenador de produção linguística"
    ]
  },
  {
    "id": "qualidade-de-dublagem-por-restricao-temporal",
    "scenario": "Um segmento dublado tem 6,8 segundos para janela de 5,5.",
    "decision": "Reescrever preservando sentido, testar a leitura e medir o ajuste de 1,3 segundo.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente atualiza a fonte depois da primeira revisão bilíngue.",
    "tasks": [
      "Dossiê de trabalho — Qualidade de dublagem por restrição temporal",
      "Base de análise: matriz de segmentos e contexto",
      "Conferência de evidências: registro de versão e revisão linguística",
      "Memória de decisão — Um segmento dublado tem 6,8 segundos para janela de 5,5",
      "Simulação da mudança: o cliente atualiza a fonte depois da primeira revisão bilíngue",
      "Relatório de transferência para coordenador de produção linguística"
    ]
  },
  {
    "id": "gestao-de-agenda-de-interpretes-de-conferencia",
    "scenario": "Duas salas pedem a mesma combinação linguística em sessões simultâneas.",
    "decision": "Dimensionar cobertura por sala e período incluindo as pausas previstas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente atualiza a fonte depois da primeira revisão bilíngue.",
    "tasks": [
      "Dossiê de trabalho — Gestão de agenda de intérpretes de conferência",
      "Base de análise: matriz de segmentos e contexto",
      "Conferência de evidências: registro de versão e revisão linguística",
      "Memória de decisão — Duas salas pedem a mesma combinação linguística em sessões simultâneas",
      "Simulação da mudança: o cliente atualiza a fonte depois da primeira revisão bilíngue",
      "Relatório de transferência para coordenador de produção linguística"
    ]
  },
  {
    "id": "coordenacao-de-revisao-bilingue-por-pares",
    "scenario": "Revisor e tradutor alteram simultaneamente a mesma versão.",
    "decision": "Fixar uma base, adjudicar divergências e registrar autoria da revisão final.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente atualiza a fonte depois da primeira revisão bilíngue.",
    "tasks": [
      "Dossiê de trabalho — Coordenação de revisão bilíngue por pares",
      "Base de análise: matriz de segmentos e contexto",
      "Conferência de evidências: registro de versão e revisão linguística",
      "Memória de decisão — Revisor e tradutor alteram simultaneamente a mesma versão",
      "Simulação da mudança: o cliente atualiza a fonte depois da primeira revisão bilíngue",
      "Relatório de transferência para coordenador de produção linguística"
    ]
  },
  {
    "id": "curadoria-de-corpora-de-linguagem-simples",
    "scenario": "Um corpus contém textos fáceis de ler mas metade tem licença incompatível com o uso.",
    "decision": "Separar adequação linguística e permissão de reutilização.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente atualiza a fonte depois da primeira revisão bilíngue.",
    "tasks": [
      "Dossiê de trabalho — Curadoria de corpora de linguagem simples",
      "Base de análise: matriz de segmentos e contexto",
      "Conferência de evidências: registro de versão e revisão linguística",
      "Memória de decisão — Um corpus contém textos fáceis de ler mas metade tem licença incompatível com o uso",
      "Simulação da mudança: o cliente atualiza a fonte depois da primeira revisão bilíngue",
      "Relatório de transferência para coordenador de produção linguística"
    ]
  },
  {
    "id": "planejamento-de-traducao-de-quadrinhos",
    "scenario": "Uma fala traduzida ocupa 55 caracteres e o balão comporta aproximadamente 36.",
    "decision": "Testar condensação e legibilidade no desenho antes de pedir ajuste gráfico.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente atualiza a fonte depois da primeira revisão bilíngue.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de tradução de quadrinhos",
      "Base de análise: matriz de segmentos e contexto",
      "Conferência de evidências: registro de versão e revisão linguística",
      "Memória de decisão — Uma fala traduzida ocupa 55 caracteres e o balão comporta aproximadamente 36",
      "Simulação da mudança: o cliente atualiza a fonte depois da primeira revisão bilíngue",
      "Relatório de transferência para coordenador de produção linguística"
    ]
  },
  {
    "id": "controle-de-versoes-de-interfaces-traduzidas",
    "scenario": "O texto aprovado refere-se à versão anterior de uma tela com nova ação principal.",
    "decision": "Associar tradução à chave e ao contexto atualizado e revisar o fluxo renderizado.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "O cliente atualiza a fonte depois da primeira revisão bilíngue.",
    "tasks": [
      "Dossiê de trabalho — Controle de versões de interfaces traduzidas",
      "Base de análise: matriz de segmentos e contexto",
      "Conferência de evidências: registro de versão e revisão linguística",
      "Memória de decisão — O texto aprovado refere-se à versão anterior de uma tela com nova ação principal",
      "Simulação da mudança: o cliente atualiza a fonte depois da primeira revisão bilíngue",
      "Relatório de transferência para coordenador de produção linguística"
    ]
  }
];

export default cases;

import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "planejamento-de-territorios-de-atendimento",
    "scenario": "Dois territórios têm o mesmo número de clientes e deslocamentos médios de 10 e 40 minutos.",
    "decision": "Balancear esforço total por visita e deslocamento em vez de contar clientes apenas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma visita ultrapassa a janela reservada e afeta o turno seguinte.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de territórios de atendimento",
      "Base de análise: grade de visitas e deslocamentos",
      "Conferência de evidências: controle de ativos e comprovantes",
      "Memória de decisão — Dois territórios têm o mesmo número de clientes e deslocamentos médios de 10 e 40 minutos",
      "Simulação da mudança: uma visita ultrapassa a janela reservada e afeta o turno seguinte",
      "Relatório de transferência para planejador de serviços em campo"
    ]
  },
  {
    "id": "gestao-de-janelas-de-chegada-de-tecnicos",
    "scenario": "A janela prometida fecha às 11h e a visita anterior termina às 10h50 a 25 minutos.",
    "decision": "Prever atraso mínimo de 15 minutos e renegociar antes do deslocamento.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma visita ultrapassa a janela reservada e afeta o turno seguinte.",
    "tasks": [
      "Dossiê de trabalho — Gestão de janelas de chegada de técnicos",
      "Base de análise: grade de visitas e deslocamentos",
      "Conferência de evidências: controle de ativos e comprovantes",
      "Memória de decisão — A janela prometida fecha às 11h e a visita anterior termina às 10h50 a 25 minutos",
      "Simulação da mudança: uma visita ultrapassa a janela reservada e afeta o turno seguinte",
      "Relatório de transferência para planejador de serviços em campo"
    ]
  },
  {
    "id": "analise-de-resolucao-na-primeira-visita",
    "scenario": "Foram abertas 80 ordens, 60 resolvidas na primeira visita e cinco reabertas dentre essas.",
    "decision": "Revisar a definição da janela de reabertura e reportar 55 resoluções sustentadas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma visita ultrapassa a janela reservada e afeta o turno seguinte.",
    "tasks": [
      "Dossiê de trabalho — Análise de resolução na primeira visita",
      "Base de análise: grade de visitas e deslocamentos",
      "Conferência de evidências: controle de ativos e comprovantes",
      "Memória de decisão — Foram abertas 80 ordens, 60 resolvidas na primeira visita e cinco reabertas dentre essas",
      "Simulação da mudança: uma visita ultrapassa a janela reservada e afeta o turno seguinte",
      "Relatório de transferência para planejador de serviços em campo"
    ]
  },
  {
    "id": "dimensionamento-de-kits-moveis-de-pecas",
    "scenario": "Uma peça atende à maioria dos chamados mas só cabe em um dos veículos.",
    "decision": "Combinar frequência, compatibilidade e volume ao definir a composição dos kits.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma visita ultrapassa a janela reservada e afeta o turno seguinte.",
    "tasks": [
      "Dossiê de trabalho — Dimensionamento de kits móveis de peças",
      "Base de análise: grade de visitas e deslocamentos",
      "Conferência de evidências: controle de ativos e comprovantes",
      "Memória de decisão — Uma peça atende à maioria dos chamados mas só cabe em um dos veículos",
      "Simulação da mudança: uma visita ultrapassa a janela reservada e afeta o turno seguinte",
      "Relatório de transferência para planejador de serviços em campo"
    ]
  },
  {
    "id": "programacao-de-rotas-com-retorno-ao-deposito",
    "scenario": "A última visita acaba às 16h20 e o retorno ao depósito exige 55 minutos.",
    "decision": "Incluir chegada às 17h15 ao verificar a jornada planejada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma visita ultrapassa a janela reservada e afeta o turno seguinte.",
    "tasks": [
      "Dossiê de trabalho — Programação de rotas com retorno ao depósito",
      "Base de análise: grade de visitas e deslocamentos",
      "Conferência de evidências: controle de ativos e comprovantes",
      "Memória de decisão — A última visita acaba às 16h20 e o retorno ao depósito exige 55 minutos",
      "Simulação da mudança: uma visita ultrapassa a janela reservada e afeta o turno seguinte",
      "Relatório de transferência para planejador de serviços em campo"
    ]
  },
  {
    "id": "conciliacao-de-comprovantes-de-visita",
    "scenario": "Um comprovante foi anexado duas vezes e outra ordem ficou sem assinatura prevista.",
    "decision": "Relacionar comprovantes a ordens únicas e destacar a pendência.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma visita ultrapassa a janela reservada e afeta o turno seguinte.",
    "tasks": [
      "Dossiê de trabalho — Conciliação de comprovantes de visita",
      "Base de análise: grade de visitas e deslocamentos",
      "Conferência de evidências: controle de ativos e comprovantes",
      "Memória de decisão — Um comprovante foi anexado duas vezes e outra ordem ficou sem assinatura prevista",
      "Simulação da mudança: uma visita ultrapassa a janela reservada e afeta o turno seguinte",
      "Relatório de transferência para planejador de serviços em campo"
    ]
  },
  {
    "id": "analise-de-reagendamento-por-peca-ausente",
    "scenario": "Das 30 revisitas, 12 ocorreram por ausência de peça e seis por diagnóstico revisado.",
    "decision": "Medir ao menos 40% por falta de peça e investigar as demais causas separadamente.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma visita ultrapassa a janela reservada e afeta o turno seguinte.",
    "tasks": [
      "Dossiê de trabalho — Análise de reagendamento por peça ausente",
      "Base de análise: grade de visitas e deslocamentos",
      "Conferência de evidências: controle de ativos e comprovantes",
      "Memória de decisão — Das 30 revisitas, 12 ocorreram por ausência de peça e seis por diagnóstico revisado",
      "Simulação da mudança: uma visita ultrapassa a janela reservada e afeta o turno seguinte",
      "Relatório de transferência para planejador de serviços em campo"
    ]
  },
  {
    "id": "gestao-de-chaves-de-acesso-a-imoveis-atendidos",
    "scenario": "Uma chave saiu para técnico A e retornou com B sem transferência registrada.",
    "decision": "Reconstruir a cadeia de custódia e regularizar devolução sem apagar a divergência.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma visita ultrapassa a janela reservada e afeta o turno seguinte.",
    "tasks": [
      "Dossiê de trabalho — Gestão de chaves de acesso a imóveis atendidos",
      "Base de análise: grade de visitas e deslocamentos",
      "Conferência de evidências: controle de ativos e comprovantes",
      "Memória de decisão — Uma chave saiu para técnico A e retornou com B sem transferência registrada",
      "Simulação da mudança: uma visita ultrapassa a janela reservada e afeta o turno seguinte",
      "Relatório de transferência para planejador de serviços em campo"
    ]
  },
  {
    "id": "controle-de-emprestimo-de-ferramentas-de-campo",
    "scenario": "O armário registra quatro ferramentas livres e o inventário identifica só três utilizáveis.",
    "decision": "Liberar três e rastrear o item indisponível por identificação patrimonial.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma visita ultrapassa a janela reservada e afeta o turno seguinte.",
    "tasks": [
      "Dossiê de trabalho — Controle de empréstimo de ferramentas de campo",
      "Base de análise: grade de visitas e deslocamentos",
      "Conferência de evidências: controle de ativos e comprovantes",
      "Memória de decisão — O armário registra quatro ferramentas livres e o inventário identifica só três utilizáveis",
      "Simulação da mudança: uma visita ultrapassa a janela reservada e afeta o turno seguinte",
      "Relatório de transferência para planejador de serviços em campo"
    ]
  },
  {
    "id": "planejamento-de-cobertura-em-regioes-rurais",
    "scenario": "Uma localidade recebe três visitas semanais e cada deslocamento consome duas horas.",
    "decision": "Comparar agrupamento de visitas e prazo máximo de atendimento antes de alterar a rota.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma visita ultrapassa a janela reservada e afeta o turno seguinte.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de cobertura em regiões rurais",
      "Base de análise: grade de visitas e deslocamentos",
      "Conferência de evidências: controle de ativos e comprovantes",
      "Memória de decisão — Uma localidade recebe três visitas semanais e cada deslocamento consome duas horas",
      "Simulação da mudança: uma visita ultrapassa a janela reservada e afeta o turno seguinte",
      "Relatório de transferência para planejador de serviços em campo"
    ]
  }
];

export default cases;

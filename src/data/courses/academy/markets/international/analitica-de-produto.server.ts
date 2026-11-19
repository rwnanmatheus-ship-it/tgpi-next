import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "analise-de-tempo-ate-o-primeiro-valor",
    "scenario": "Dez pessoas iniciaram e seis atingiram o primeiro valor; quatro ainda estão em observação.",
    "decision": "Reportar a fração ativada e o tempo entre ativados com censura explícita.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma versão do aplicativo passa a registrar o evento em outro momento.",
    "tasks": [
      "Dossiê de trabalho — Análise de tempo até o primeiro valor",
      "Base de análise: dicionário de eventos e coortes",
      "Conferência de evidências: tabela de exposição e resultado",
      "Memória de decisão — Dez pessoas iniciaram e seis atingiram o primeiro valor; quatro ainda estão em observação",
      "Simulação da mudança: uma versão do aplicativo passa a registrar o evento em outro momento",
      "Relatório de transferência para analista de produto digital"
    ]
  },
  {
    "id": "diagnostico-de-abandono-de-onboarding",
    "scenario": "A etapa 2 registra 75 pessoas e a 3 registra 60 da mesma coorte.",
    "decision": "Calcular perda condicional de 20% e verificar falhas de instrumentação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma versão do aplicativo passa a registrar o evento em outro momento.",
    "tasks": [
      "Dossiê de trabalho — Diagnóstico de abandono de onboarding",
      "Base de análise: dicionário de eventos e coortes",
      "Conferência de evidências: tabela de exposição e resultado",
      "Memória de decisão — A etapa 2 registra 75 pessoas e a 3 registra 60 da mesma coorte",
      "Simulação da mudança: uma versão do aplicativo passa a registrar o evento em outro momento",
      "Relatório de transferência para analista de produto digital"
    ]
  },
  {
    "id": "medicao-de-adocao-em-contas-multiusuario",
    "scenario": "Duas contas têm dez assentos cada; uma tem nove ativos e outra apenas um.",
    "decision": "Mostrar cobertura de 90% e 10% por conta além da média agregada.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma versão do aplicativo passa a registrar o evento em outro momento.",
    "tasks": [
      "Dossiê de trabalho — Medição de adoção em contas multiusuário",
      "Base de análise: dicionário de eventos e coortes",
      "Conferência de evidências: tabela de exposição e resultado",
      "Memória de decisão — Duas contas têm dez assentos cada; uma tem nove ativos e outra apenas um",
      "Simulação da mudança: uma versão do aplicativo passa a registrar o evento em outro momento",
      "Relatório de transferência para analista de produto digital"
    ]
  },
  {
    "id": "desenho-de-grupos-de-controle-em-notificacoes",
    "scenario": "O sorteio foi por pessoa mas colegas na mesma conta veem as notificações uns dos outros.",
    "decision": "Testar desenho por conta e avaliar contaminação entre grupos.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma versão do aplicativo passa a registrar o evento em outro momento.",
    "tasks": [
      "Dossiê de trabalho — Desenho de grupos de controle em notificações",
      "Base de análise: dicionário de eventos e coortes",
      "Conferência de evidências: tabela de exposição e resultado",
      "Memória de decisão — O sorteio foi por pessoa mas colegas na mesma conta veem as notificações uns dos outros",
      "Simulação da mudança: uma versão do aplicativo passa a registrar o evento em outro momento",
      "Relatório de transferência para analista de produto digital"
    ]
  },
  {
    "id": "auditoria-de-eventos-de-ativacao",
    "scenario": "Um clique reenvia o mesmo identificador após falha de rede.",
    "decision": "Deduplicar pela identidade do evento e distinguir ação de tentativa de envio.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma versão do aplicativo passa a registrar o evento em outro momento.",
    "tasks": [
      "Dossiê de trabalho — Auditoria de eventos de ativação",
      "Base de análise: dicionário de eventos e coortes",
      "Conferência de evidências: tabela de exposição e resultado",
      "Memória de decisão — Um clique reenvia o mesmo identificador após falha de rede",
      "Simulação da mudança: uma versão do aplicativo passa a registrar o evento em outro momento",
      "Relatório de transferência para analista de produto digital"
    ]
  },
  {
    "id": "analise-de-retencao-por-ocasiao-de-uso",
    "scenario": "O serviço é usado trimestralmente e o painel classifica ausência semanal como abandono.",
    "decision": "Definir retenção pela próxima ocasião de uso esperada e observar coortes maduras.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma versão do aplicativo passa a registrar o evento em outro momento.",
    "tasks": [
      "Dossiê de trabalho — Análise de retenção por ocasião de uso",
      "Base de análise: dicionário de eventos e coortes",
      "Conferência de evidências: tabela de exposição e resultado",
      "Memória de decisão — O serviço é usado trimestralmente e o painel classifica ausência semanal como abandono",
      "Simulação da mudança: uma versão do aplicativo passa a registrar o evento em outro momento",
      "Relatório de transferência para analista de produto digital"
    ]
  },
  {
    "id": "modelagem-de-expansao-por-assento",
    "scenario": "Uma conta aumenta de 10 para 15 assentos mas a tarifa cai de 20 para 18.",
    "decision": "Comparar receita de 200 e 270 e decompor efeito de assentos e preço.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma versão do aplicativo passa a registrar o evento em outro momento.",
    "tasks": [
      "Dossiê de trabalho — Modelagem de expansão por assento",
      "Base de análise: dicionário de eventos e coortes",
      "Conferência de evidências: tabela de exposição e resultado",
      "Memória de decisão — Uma conta aumenta de 10 para 15 assentos mas a tarifa cai de 20 para 18",
      "Simulação da mudança: uma versão do aplicativo passa a registrar o evento em outro momento",
      "Relatório de transferência para analista de produto digital"
    ]
  },
  {
    "id": "estudo-de-canibalizacao-entre-planos",
    "scenario": "O plano novo ganhou 100 adesões, 70 vieram de outro plano da empresa.",
    "decision": "Separar 70 migrações das 30 entradas restantes e medir receita incremental.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma versão do aplicativo passa a registrar o evento em outro momento.",
    "tasks": [
      "Dossiê de trabalho — Estudo de canibalização entre planos",
      "Base de análise: dicionário de eventos e coortes",
      "Conferência de evidências: tabela de exposição e resultado",
      "Memória de decisão — O plano novo ganhou 100 adesões, 70 vieram de outro plano da empresa",
      "Simulação da mudança: uma versão do aplicativo passa a registrar o evento em outro momento",
      "Relatório de transferência para analista de produto digital"
    ]
  },
  {
    "id": "qualidade-de-dados-em-experimentos-de-preco",
    "scenario": "Um grupo recebeu moeda distinta e o painel compara valores nominais entre grupos.",
    "decision": "Normalizar moeda e verificar alocação antes de estimar efeito de preço.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma versão do aplicativo passa a registrar o evento em outro momento.",
    "tasks": [
      "Dossiê de trabalho — Qualidade de dados em experimentos de preço",
      "Base de análise: dicionário de eventos e coortes",
      "Conferência de evidências: tabela de exposição e resultado",
      "Memória de decisão — Um grupo recebeu moeda distinta e o painel compara valores nominais entre grupos",
      "Simulação da mudança: uma versão do aplicativo passa a registrar o evento em outro momento",
      "Relatório de transferência para analista de produto digital"
    ]
  },
  {
    "id": "medicao-de-sucesso-de-migracao-de-funcionalidades",
    "scenario": "O recurso antigo foi desligado e o novo recebeu mais acessos, mas houve mais falhas na tarefa.",
    "decision": "Medir conclusão por usuário elegível junto com erros e migração.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma versão do aplicativo passa a registrar o evento em outro momento.",
    "tasks": [
      "Dossiê de trabalho — Medição de sucesso de migração de funcionalidades",
      "Base de análise: dicionário de eventos e coortes",
      "Conferência de evidências: tabela de exposição e resultado",
      "Memória de decisão — O recurso antigo foi desligado e o novo recebeu mais acessos, mas houve mais falhas na tarefa",
      "Simulação da mudança: uma versão do aplicativo passa a registrar o evento em outro momento",
      "Relatório de transferência para analista de produto digital"
    ]
  }
];

export default cases;

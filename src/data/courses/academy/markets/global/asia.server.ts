import 'server-only';
import type { GlobalCourseSpec } from './types';

/** Original fictional occupational cases and authored technical instruction. */
export const asiaSpecs: readonly GlobalCourseSpec[] = [
  {
    "id": "as-rastreabilidade-de-wafers-em-linhas-terceirizadas-de-semicondutores",
    "title": "Rastreabilidade de wafers em linhas terceirizadas de semicondutores",
    "track": "industry",
    "role": "Analista de processos de microeletrônica",
    "positioning": "specialist",
    "scenario": "Uma fábrica fictícia em Taiwan registra 120 wafers em dois fornecedores. O mesmo código local W12 aparece em ambos; 18 medições foram agregadas sem fornecedor.",
    "decision": "Criar chave composta fornecedor, lote e wafer; colocar as 18 medições ambíguas em quarentena até reconciliar a origem.",
    "misconception": "Somar todas as medições W12 como se descrevessem um único wafer.",
    "changedConstraint": "Um terceiro fornecedor reutiliza códigos antigos após seis meses.",
    "tasks": [
      "Dicionário de chaves de wafer",
      "Mapa de genealogia entre fornecedores",
      "Regra de quarentena de medições",
      "Consulta de reconciliação de W12",
      "Teste de colisão temporal",
      "Procedimento de retificação auditável"
    ],
    "method": "Modele a genealogia como relações entre lote de entrada, transformação e lote de saída. A unicidade deve existir no escopo da cadeia, não apenas no equipamento. Distinga identidade física de versão do registro. Ao receber uma correção, preserve o valor anterior e sua justificativa; não reescreva a genealogia silenciosamente. Teste colisão de identificadores e transformação que divide um lote. A produção de microeletrônica exige separar parâmetros de processo, resultados de medição e decisões de liberação. A unidade observacional pode ser wafer, lote, equipamento ou etapa; misturar essas unidades produz conclusões falsas. Registre identificador, instante, instrumento, unidade e condição de coleta antes de comparar resultados. Use limites definidos pelo responsável técnico, distinguindo limites de especificação dos limites estatísticos calculados com o histórico. Uma mudança controlada precisa de hipótese, amostra, critério de retorno e evidência de estabilidade. Os exercícios são análises documentais com dados sintéticos: não autorizam operar máquinas, manipular produtos químicos nem liberar produtos reais.",
    "workedExample": "Caso simulado resolvido: Uma fábrica fictícia em Taiwan registra 120 wafers em dois fornecedores. O mesmo código local W12 aparece em ambos; 18 medições foram agregadas sem fornecedor. Resolução sustentada: Criar chave composta fornecedor, lote e wafer; colocar as 18 medições ambíguas em quarentena até reconciliar a origem. A alternativa inadequada seria: Somar todas as medições W12 como se descrevessem um único wafer. A diferença entre as duas decisões está no critério técnico: Modele a genealogia como relações entre lote de entrada, transformação e lote de saída. A unicidade deve existir no escopo da cadeia, não apenas no equipamento. Distinga identidade física de versão do registro. Ao receber uma correção, preserve o valor anterior e sua justificativa; não reescreva a genealogia silenciosamente. Teste colisão de identificadores e transformação que divide um lote. A evidência desta resolução deve aparecer em dicionário de chaves de wafer e em mapa de genealogia entre fornecedores, permitindo reproduzir a conclusão. Ao introduzir a mudança — um terceiro fornecedor reutiliza códigos antigos após seis meses. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://ref.gs1.org/standards/global-traceability/",
      "https://ref.gs1.org/standards/epcis/"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-rendimento-por-etapa-em-encapsulamento-de-chips",
    "title": "Análise de rendimento por etapa em encapsulamento de chips",
    "track": "industry",
    "role": "Analista de processos de microeletrônica",
    "positioning": "specialist",
    "scenario": "Uma linha na Malásia inicia 1000 unidades, aprova 950 na ligação de fios e 900 dessas no teste final. O painel soma 95% e 94,74%.",
    "decision": "Calcular rendimento acumulado de 90%, multiplicando 950/1000 por 900/950, sem somar percentuais.",
    "misconception": "Anunciar rendimento superior a 100% somando as taxas de aprovação.",
    "changedConstraint": "O retrabalho retorna 20 unidades a uma etapa anterior.",
    "tasks": [
      "Fluxograma de unidades por etapa",
      "Planilha de rendimento acumulado",
      "Separação de primeira passagem e retrabalho",
      "Estratificação por encapsulamento",
      "Gráfico de perdas sequenciais",
      "Memorando de prioridade de investigação"
    ],
    "method": "Defina rendimento de primeira passagem separadamente do rendimento final após retrabalho. Use o denominador efetivamente recebido por cada operação. Reconstrua o fluxo de unidades antes de comparar turnos; produtos diferentes exigem estratificação. Represente perdas com contagens e mantenha a ordem das etapas. Uma melhoria local pode transferir defeitos para o teste seguinte sem melhorar o rendimento final. A produção de microeletrônica exige separar parâmetros de processo, resultados de medição e decisões de liberação. A unidade observacional pode ser wafer, lote, equipamento ou etapa; misturar essas unidades produz conclusões falsas. Registre identificador, instante, instrumento, unidade e condição de coleta antes de comparar resultados. Use limites definidos pelo responsável técnico, distinguindo limites de especificação dos limites estatísticos calculados com o histórico. Uma mudança controlada precisa de hipótese, amostra, critério de retorno e evidência de estabilidade. Os exercícios são análises documentais com dados sintéticos: não autorizam operar máquinas, manipular produtos químicos nem liberar produtos reais.",
    "workedExample": "Caso simulado resolvido: Uma linha na Malásia inicia 1000 unidades, aprova 950 na ligação de fios e 900 dessas no teste final. O painel soma 95% e 94,74%. Resolução sustentada: Calcular rendimento acumulado de 90%, multiplicando 950/1000 por 900/950, sem somar percentuais. A alternativa inadequada seria: Anunciar rendimento superior a 100% somando as taxas de aprovação. A diferença entre as duas decisões está no critério técnico: Defina rendimento de primeira passagem separadamente do rendimento final após retrabalho. Use o denominador efetivamente recebido por cada operação. Reconstrua o fluxo de unidades antes de comparar turnos; produtos diferentes exigem estratificação. Represente perdas com contagens e mantenha a ordem das etapas. Uma melhoria local pode transferir defeitos para o teste seguinte sem melhorar o rendimento final. A evidência desta resolução deve aparecer em fluxograma de unidades por etapa e em planilha de rendimento acumulado, permitindo reproduzir a conclusão. Ao introduzir a mudança — o retrabalho retorna 20 unidades a uma etapa anterior. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/pmc/pmc.htm",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "asia"
  },
  {
    "id": "as-controle-de-deriva-em-sensores-de-salas-limpas",
    "title": "Controle de deriva em sensores de salas limpas",
    "track": "industry",
    "role": "Analista de processos de microeletrônica",
    "positioning": "specialist",
    "scenario": "Um sensor no Japão indica 18, 19 e 20 partículas por amostra; o instrumento de referência indica 10 nas três verificações.",
    "decision": "Investigar viés crescente de 8, 9 e 10 partículas e separar falha de medição de mudança ambiental.",
    "misconception": "Interpretar todo aumento indicado como piora comprovada da sala.",
    "changedConstraint": "A referência perde validade de calibração na última verificação.",
    "tasks": [
      "Tabela de verificações pareadas",
      "Série temporal do viés",
      "Registro de validade da referência",
      "Regra de bloqueio do sensor",
      "Plano de comparação independente",
      "Relatório de impacto nas decisões anteriores"
    ],
    "method": "Compare medidas pareadas, não médias coletadas em horários distintos. Calcule diferença e tendência do erro ao longo do tempo. A referência precisa de validade e incerteza conhecidas; uma etiqueta de calibração não elimina todos os erros. Se a referência fica indisponível, classifique a decisão como inconclusiva e defina contenção documental. Nunca ajuste limites de processo para esconder desvio instrumental. A produção de microeletrônica exige separar parâmetros de processo, resultados de medição e decisões de liberação. A unidade observacional pode ser wafer, lote, equipamento ou etapa; misturar essas unidades produz conclusões falsas. Registre identificador, instante, instrumento, unidade e condição de coleta antes de comparar resultados. Use limites definidos pelo responsável técnico, distinguindo limites de especificação dos limites estatísticos calculados com o histórico. Uma mudança controlada precisa de hipótese, amostra, critério de retorno e evidência de estabilidade. Os exercícios são análises documentais com dados sintéticos: não autorizam operar máquinas, manipular produtos químicos nem liberar produtos reais.",
    "workedExample": "Caso simulado resolvido: Um sensor no Japão indica 18, 19 e 20 partículas por amostra; o instrumento de referência indica 10 nas três verificações. Resolução sustentada: Investigar viés crescente de 8, 9 e 10 partículas e separar falha de medição de mudança ambiental. A alternativa inadequada seria: Interpretar todo aumento indicado como piora comprovada da sala. A diferença entre as duas decisões está no critério técnico: Compare medidas pareadas, não médias coletadas em horários distintos. Calcule diferença e tendência do erro ao longo do tempo. A referência precisa de validade e incerteza conhecidas; uma etiqueta de calibração não elimina todos os erros. Se a referência fica indisponível, classifique a decisão como inconclusiva e defina contenção documental. Nunca ajuste limites de processo para esconder desvio instrumental. A evidência desta resolução deve aparecer em tabela de verificações pareadas e em série temporal do viés, permitindo reproduzir a conclusão. Ao introduzir a mudança — a referência perde validade de calibração na última verificação. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/pmc/pmc.htm",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "asia"
  },
  {
    "id": "as-planejamento-de-troca-de-ferramentas-em-montagem-eletronica",
    "title": "Planejamento de troca de ferramentas em montagem eletrônica",
    "track": "industry",
    "role": "Analista de processos de microeletrônica",
    "positioning": "specialist",
    "scenario": "Uma linha vietnamita tem 420 minutos disponíveis. Duas trocas de 35 minutos deixam 350 minutos, para demanda que exige 360.",
    "decision": "Identificar déficit de dez minutos e testar agrupamento de lotes ou redução validada de preparação antes de prometer entrega.",
    "misconception": "Usar os 420 minutos nominais para aceitar toda a demanda.",
    "changedConstraint": "Uma troca adicional de produto é solicitada no meio do turno.",
    "tasks": [
      "Mapa de preparação interna e externa",
      "Calendário de capacidade líquida",
      "Matriz de compatibilidade de lotes",
      "Sequência proposta de produção",
      "Teste de demanda adicional",
      "Checklist de primeira peça"
    ],
    "method": "Separe preparação interna, que exige parada, de preparação externa, realizada com segurança antes da troca. Cronometre atividades observadas, mantenha restrições de qualidade e inclua verificação da primeira peça. O objetivo não é eliminar controles, mas reduzir espera e movimentos dispensáveis. Planeje sequências respeitando compatibilidade de material, limpeza e ferramenta. Registre o custo de atrasar lotes menores. A produção de microeletrônica exige separar parâmetros de processo, resultados de medição e decisões de liberação. A unidade observacional pode ser wafer, lote, equipamento ou etapa; misturar essas unidades produz conclusões falsas. Registre identificador, instante, instrumento, unidade e condição de coleta antes de comparar resultados. Use limites definidos pelo responsável técnico, distinguindo limites de especificação dos limites estatísticos calculados com o histórico. Uma mudança controlada precisa de hipótese, amostra, critério de retorno e evidência de estabilidade. Os exercícios são análises documentais com dados sintéticos: não autorizam operar máquinas, manipular produtos químicos nem liberar produtos reais.",
    "workedExample": "Caso simulado resolvido: Uma linha vietnamita tem 420 minutos disponíveis. Duas trocas de 35 minutos deixam 350 minutos, para demanda que exige 360. Resolução sustentada: Identificar déficit de dez minutos e testar agrupamento de lotes ou redução validada de preparação antes de prometer entrega. A alternativa inadequada seria: Usar os 420 minutos nominais para aceitar toda a demanda. A diferença entre as duas decisões está no critério técnico: Separe preparação interna, que exige parada, de preparação externa, realizada com segurança antes da troca. Cronometre atividades observadas, mantenha restrições de qualidade e inclua verificação da primeira peça. O objetivo não é eliminar controles, mas reduzir espera e movimentos dispensáveis. Planeje sequências respeitando compatibilidade de material, limpeza e ferramenta. Registre o custo de atrasar lotes menores. A evidência desta resolução deve aparecer em mapa de preparação interna e externa e em calendário de capacidade líquida, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma troca adicional de produto é solicitada no meio do turno. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.epa.gov/sustainability/lean-thinking-and-methods",
      "https://simpy.readthedocs.io/en/latest/simpy_intro/index.html"
    ],
    "region": "asia"
  },
  {
    "id": "as-tratamento-de-dados-censurados-em-testes-de-confiabilidade-eletronica",
    "title": "Tratamento de dados censurados em testes de confiabilidade eletrônica",
    "track": "industry",
    "role": "Analista de processos de microeletrônica",
    "positioning": "specialist",
    "scenario": "Um ensaio sul-coreano acompanha 30 componentes por 100 horas: três falham, os demais continuam funcionando quando o ensaio termina.",
    "decision": "Registrar 27 observações censuradas à direita e três falhas, sem atribuir vida de 100 horas aos sobreviventes.",
    "misconception": "Calcular vida média supondo que todos os componentes falharam no encerramento.",
    "changedConstraint": "Cinco unidades são retiradas antes do fim por motivo desconhecido.",
    "tasks": [
      "Tabela duração e evento",
      "Classificação de censura",
      "Curva descritiva de sobrevivência",
      "Inventário de condições do ensaio",
      "Análise das retiradas precoces",
      "Nota de limites de extrapolação"
    ],
    "method": "Um componente sobrevivente informa que sua vida excedeu o período observado, não que sua vida foi exatamente aquele período. Estruture duração, indicador de evento e causa de retirada. Compare grupos apenas após verificar condições de ensaio e mecanismo de censura. Gráficos de sobrevivência são descritivos do experimento e não garantias de campo. Investigue retiradas relacionadas ao próprio risco de falha. A produção de microeletrônica exige separar parâmetros de processo, resultados de medição e decisões de liberação. A unidade observacional pode ser wafer, lote, equipamento ou etapa; misturar essas unidades produz conclusões falsas. Registre identificador, instante, instrumento, unidade e condição de coleta antes de comparar resultados. Use limites definidos pelo responsável técnico, distinguindo limites de especificação dos limites estatísticos calculados com o histórico. Uma mudança controlada precisa de hipótese, amostra, critério de retorno e evidência de estabilidade. Os exercícios são análises documentais com dados sintéticos: não autorizam operar máquinas, manipular produtos químicos nem liberar produtos reais.",
    "workedExample": "Caso simulado resolvido: Um ensaio sul-coreano acompanha 30 componentes por 100 horas: três falham, os demais continuam funcionando quando o ensaio termina. Resolução sustentada: Registrar 27 observações censuradas à direita e três falhas, sem atribuir vida de 100 horas aos sobreviventes. A alternativa inadequada seria: Calcular vida média supondo que todos os componentes falharam no encerramento. A diferença entre as duas decisões está no critério técnico: Um componente sobrevivente informa que sua vida excedeu o período observado, não que sua vida foi exatamente aquele período. Estruture duração, indicador de evento e causa de retirada. Compare grupos apenas após verificar condições de ensaio e mecanismo de censura. Gráficos de sobrevivência são descritivos do experimento e não garantias de campo. Investigue retiradas relacionadas ao próprio risco de falha. A evidência desta resolução deve aparecer em tabela duração e evento e em classificação de censura, permitindo reproduzir a conclusão. Ao introduzir a mudança — cinco unidades são retiradas antes do fim por motivo desconhecido. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/apr/apr.htm",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "asia"
  },
  {
    "id": "as-balanco-de-capacidade-de-inspecao-optica-automatizada",
    "title": "Balanço de capacidade de inspeção óptica automatizada",
    "track": "industry",
    "role": "Analista de processos de microeletrônica",
    "positioning": "specialist",
    "scenario": "Uma fábrica tailandesa inspeciona 600 placas por hora e a revisão manual aceita 45 casos por hora. A triagem envia 60 suspeitas por hora.",
    "decision": "Reconhecer fila crescente de 15 casos por hora e rever capacidade ou triagem com medição de falsos negativos.",
    "misconception": "Aumentar o limiar automaticamente para manter a fila vazia sem verificar defeitos perdidos.",
    "changedConstraint": "A mistura de placas passa a ter componentes mais complexos.",
    "tasks": [
      "Mapa de fluxo da inspeção",
      "Modelo de fila de revisão",
      "Amostra rotulada independente",
      "Matriz de erros por produto",
      "Comparação de limiares",
      "Plano de contingência para picos"
    ],
    "method": "A inspeção combina detecção automática e decisão humana. Modele chegadas à revisão, capacidade de serviço e variabilidade; uma média favorável não elimina picos. Meça falsos positivos e falsos negativos em amostra rotulada independentemente. Ajustes de limiar alteram os dois erros e devem ser avaliados com os custos correspondentes. Produtos novos exigem nova amostragem, preservando regras de contenção. A produção de microeletrônica exige separar parâmetros de processo, resultados de medição e decisões de liberação. A unidade observacional pode ser wafer, lote, equipamento ou etapa; misturar essas unidades produz conclusões falsas. Registre identificador, instante, instrumento, unidade e condição de coleta antes de comparar resultados. Use limites definidos pelo responsável técnico, distinguindo limites de especificação dos limites estatísticos calculados com o histórico. Uma mudança controlada precisa de hipótese, amostra, critério de retorno e evidência de estabilidade. Os exercícios são análises documentais com dados sintéticos: não autorizam operar máquinas, manipular produtos químicos nem liberar produtos reais.",
    "workedExample": "Caso simulado resolvido: Uma fábrica tailandesa inspeciona 600 placas por hora e a revisão manual aceita 45 casos por hora. A triagem envia 60 suspeitas por hora. Resolução sustentada: Reconhecer fila crescente de 15 casos por hora e rever capacidade ou triagem com medição de falsos negativos. A alternativa inadequada seria: Aumentar o limiar automaticamente para manter a fila vazia sem verificar defeitos perdidos. A diferença entre as duas decisões está no critério técnico: A inspeção combina detecção automática e decisão humana. Modele chegadas à revisão, capacidade de serviço e variabilidade; uma média favorável não elimina picos. Meça falsos positivos e falsos negativos em amostra rotulada independentemente. Ajustes de limiar alteram os dois erros e devem ser avaliados com os custos correspondentes. Produtos novos exigem nova amostragem, preservando regras de contenção. A evidência desta resolução deve aparecer em mapa de fluxo da inspeção e em modelo de fila de revisão, permitindo reproduzir a conclusão. Ao introduzir a mudança — a mistura de placas passa a ter componentes mais complexos. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://simpy.readthedocs.io/en/latest/simpy_intro/index.html",
      "https://scikit-learn.org/stable/modules/model_evaluation.html"
    ],
    "region": "asia"
  },
  {
    "id": "as-qualificacao-documental-de-mudancas-de-resina-em-componentes",
    "title": "Qualificação documental de mudanças de resina em componentes",
    "track": "industry",
    "role": "Analista de processos de microeletrônica",
    "positioning": "specialist",
    "scenario": "Um fornecedor indiano altera resina em 200 lotes, mas fornece teste comparativo apenas para uma aplicação de baixa temperatura.",
    "decision": "Limitar a conclusão à aplicação testada e solicitar evidência para as demais condições antes de aceitar equivalência.",
    "misconception": "Declarar equivalência universal porque o nome comercial da resina foi preservado.",
    "changedConstraint": "O cliente exige operação em ambiente úmido que não foi ensaiado.",
    "tasks": [
      "Matriz de requisitos de resina",
      "Inventário de lotes afetados",
      "Comparação de versões técnicas",
      "Mapa de condições não testadas",
      "Fluxo de aprovação de mudança",
      "Plano documental de contenção"
    ],
    "method": "Construa matriz requisito, condição de uso, evidência e lacuna. Uma declaração comercial não substitui ensaio pertinente. Identifique composição declarada, versão da especificação e população efetivamente testada. Registre quem pode aprovar mudanças e quais produtos já receberam o material. A análise documental organiza a decisão do responsável técnico; não certifica compatibilidade química nem substitui testes especializados. A produção de microeletrônica exige separar parâmetros de processo, resultados de medição e decisões de liberação. A unidade observacional pode ser wafer, lote, equipamento ou etapa; misturar essas unidades produz conclusões falsas. Registre identificador, instante, instrumento, unidade e condição de coleta antes de comparar resultados. Use limites definidos pelo responsável técnico, distinguindo limites de especificação dos limites estatísticos calculados com o histórico. Uma mudança controlada precisa de hipótese, amostra, critério de retorno e evidência de estabilidade. Os exercícios são análises documentais com dados sintéticos: não autorizam operar máquinas, manipular produtos químicos nem liberar produtos reais.",
    "workedExample": "Caso simulado resolvido: Um fornecedor indiano altera resina em 200 lotes, mas fornece teste comparativo apenas para uma aplicação de baixa temperatura. Resolução sustentada: Limitar a conclusão à aplicação testada e solicitar evidência para as demais condições antes de aceitar equivalência. A alternativa inadequada seria: Declarar equivalência universal porque o nome comercial da resina foi preservado. A diferença entre as duas decisões está no critério técnico: Construa matriz requisito, condição de uso, evidência e lacuna. Uma declaração comercial não substitui ensaio pertinente. Identifique composição declarada, versão da especificação e população efetivamente testada. Registre quem pode aprovar mudanças e quais produtos já receberam o material. A análise documental organiza a decisão do responsável técnico; não certifica compatibilidade química nem substitui testes especializados. A evidência desta resolução deve aparecer em matriz de requisitos de resina e em inventário de lotes afetados, permitindo reproduzir a conclusão. Ao introduzir a mudança — o cliente exige operação em ambiente úmido que não foi ensaiado. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://ref.gs1.org/standards/global-traceability/",
      "https://www.itl.nist.gov/div898/handbook/pmc/pmc.htm"
    ],
    "region": "asia"
  },
  {
    "id": "as-programacao-de-manutencao-baseada-em-gargalos-de-producao",
    "title": "Programação de manutenção baseada em gargalos de produção",
    "track": "industry",
    "role": "Analista de processos de microeletrônica",
    "positioning": "specialist",
    "scenario": "Uma planta indonésia tem duas máquinas paralelas de 60 unidades/h e uma etapa seguinte de 80 unidades/h. Parar uma máquina reduz alimentação para 60.",
    "decision": "Quantificar perda potencial de 20 unidades/h na etapa seguinte e planejar janela considerando estoque intermediário validado.",
    "misconception": "Concluir que não há impacto porque ainda resta uma máquina funcionando.",
    "changedConstraint": "O estoque intermediário cobre apenas 30 minutos.",
    "tasks": [
      "Mapa de capacidades por roteiro",
      "Cálculo de cobertura do pulmão",
      "Janela comparada de manutenção",
      "Simulação de indisponibilidade",
      "Registro de riscos de atraso",
      "Plano de comunicação da parada"
    ],
    "method": "Identifique restrição do sistema antes de otimizar disponibilidade isolada. Calcule capacidade por roteiro e mantenha unidades equivalentes. Um pulmão reduz impacto apenas até sua duração de cobertura, sem criar capacidade permanente. Compare manutenção programada com risco de falha e exigências de segurança. O exercício trata planejamento analítico; a execução de manutenção real exige equipe habilitada e bloqueios apropriados. A produção de microeletrônica exige separar parâmetros de processo, resultados de medição e decisões de liberação. A unidade observacional pode ser wafer, lote, equipamento ou etapa; misturar essas unidades produz conclusões falsas. Registre identificador, instante, instrumento, unidade e condição de coleta antes de comparar resultados. Use limites definidos pelo responsável técnico, distinguindo limites de especificação dos limites estatísticos calculados com o histórico. Uma mudança controlada precisa de hipótese, amostra, critério de retorno e evidência de estabilidade. Os exercícios são análises documentais com dados sintéticos: não autorizam operar máquinas, manipular produtos químicos nem liberar produtos reais.",
    "workedExample": "Caso simulado resolvido: Uma planta indonésia tem duas máquinas paralelas de 60 unidades/h e uma etapa seguinte de 80 unidades/h. Parar uma máquina reduz alimentação para 60. Resolução sustentada: Quantificar perda potencial de 20 unidades/h na etapa seguinte e planejar janela considerando estoque intermediário validado. A alternativa inadequada seria: Concluir que não há impacto porque ainda resta uma máquina funcionando. A diferença entre as duas decisões está no critério técnico: Identifique restrição do sistema antes de otimizar disponibilidade isolada. Calcule capacidade por roteiro e mantenha unidades equivalentes. Um pulmão reduz impacto apenas até sua duração de cobertura, sem criar capacidade permanente. Compare manutenção programada com risco de falha e exigências de segurança. O exercício trata planejamento analítico; a execução de manutenção real exige equipe habilitada e bloqueios apropriados. A evidência desta resolução deve aparecer em mapa de capacidades por roteiro e em cálculo de cobertura do pulmão, permitindo reproduzir a conclusão. Ao introduzir a mudança — o estoque intermediário cobre apenas 30 minutos. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://simpy.readthedocs.io/en/latest/simpy_intro/index.html",
      "https://www.epa.gov/sustainability/lean-thinking-and-methods"
    ],
    "region": "asia"
  },
  {
    "id": "as-gestao-de-receitas-de-teste-em-eletronica-de-potencia",
    "title": "Gestão de receitas de teste em eletrônica de potência",
    "track": "industry",
    "role": "Analista de processos de microeletrônica",
    "positioning": "specialist",
    "scenario": "Dois programas de teste na China usam limite de corrente igual, mas um registra amperes e outro miliamperes; cem resultados foram importados sem unidade.",
    "decision": "Interromper comparação dos cem resultados, recuperar unidades e normalizar a escala antes de avaliar conformidade.",
    "misconception": "Aplicar o mesmo número limite aos dois arquivos sem converter unidades.",
    "changedConstraint": "Uma terceira versão muda também a duração do pulso.",
    "tasks": [
      "Esquema de receita versionada",
      "Tabela de conversão de corrente",
      "Manifesto de configuração",
      "Validador de resultados incompletos",
      "Teste de comparabilidade entre receitas",
      "Registro de decisão de reensaio"
    ],
    "method": "Trate receita de teste como configuração versionada: unidade, amplitude, duração, sequência e critério de aceite. A comparabilidade depende de todos os parâmetros relevantes, não somente do nome do teste. Mantenha manifesto de configuração associado a cada resultado. Valide conversões com casos conhecidos e detecte campos ausentes. Não deduza parâmetros críticos a partir da aparência dos valores. A produção de microeletrônica exige separar parâmetros de processo, resultados de medição e decisões de liberação. A unidade observacional pode ser wafer, lote, equipamento ou etapa; misturar essas unidades produz conclusões falsas. Registre identificador, instante, instrumento, unidade e condição de coleta antes de comparar resultados. Use limites definidos pelo responsável técnico, distinguindo limites de especificação dos limites estatísticos calculados com o histórico. Uma mudança controlada precisa de hipótese, amostra, critério de retorno e evidência de estabilidade. Os exercícios são análises documentais com dados sintéticos: não autorizam operar máquinas, manipular produtos químicos nem liberar produtos reais.",
    "workedExample": "Caso simulado resolvido: Dois programas de teste na China usam limite de corrente igual, mas um registra amperes e outro miliamperes; cem resultados foram importados sem unidade. Resolução sustentada: Interromper comparação dos cem resultados, recuperar unidades e normalizar a escala antes de avaliar conformidade. A alternativa inadequada seria: Aplicar o mesmo número limite aos dois arquivos sem converter unidades. A diferença entre as duas decisões está no critério técnico: Trate receita de teste como configuração versionada: unidade, amplitude, duração, sequência e critério de aceite. A comparabilidade depende de todos os parâmetros relevantes, não somente do nome do teste. Mantenha manifesto de configuração associado a cada resultado. Valide conversões com casos conhecidos e detecte campos ausentes. Não deduza parâmetros críticos a partir da aparência dos valores. A evidência desta resolução deve aparecer em esquema de receita versionada e em tabela de conversão de corrente, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma terceira versão muda também a duração do pulso. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/pmc/pmc.htm",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-desperdicio-de-agua-em-fabricacao-de-precisao",
    "title": "Análise de desperdício de água em fabricação de precisão",
    "track": "industry",
    "role": "Analista de processos de microeletrônica",
    "positioning": "specialist",
    "scenario": "Uma planta em Singapura usa 500 m³ para 100 lotes e depois 480 m³ para 80 lotes. O relatório anuncia economia de eficiência.",
    "decision": "Distinguir queda absoluta de 4% de aumento de intensidade de 5 para 6 m³ por lote, reconhecendo mistura e fronteiras.",
    "misconception": "Afirmar melhoria de eficiência apenas porque o consumo total caiu.",
    "changedConstraint": "Os lotes do segundo período são 20% maiores em área processada.",
    "tasks": [
      "Balanço hídrico de fronteira",
      "Definição de unidade funcional",
      "Painel absoluto e intensidade",
      "Ajuste por área processada",
      "Mapa de oportunidades de reúso",
      "Memória de comparação entre períodos"
    ],
    "method": "Escolha unidade funcional que represente produção útil: lote, área ou peça equivalente conforme o processo. Declare fronteiras de medição e fluxos reutilizados para evitar dupla contagem. Compare consumo absoluto e intensidade com ajuste da mistura produtiva. Uma queda no volume pode decorrer de menor produção, não de melhoria. Verifique vazamentos, instrumentação e qualidade necessária antes de propor reúso. A produção de microeletrônica exige separar parâmetros de processo, resultados de medição e decisões de liberação. A unidade observacional pode ser wafer, lote, equipamento ou etapa; misturar essas unidades produz conclusões falsas. Registre identificador, instante, instrumento, unidade e condição de coleta antes de comparar resultados. Use limites definidos pelo responsável técnico, distinguindo limites de especificação dos limites estatísticos calculados com o histórico. Uma mudança controlada precisa de hipótese, amostra, critério de retorno e evidência de estabilidade. Os exercícios são análises documentais com dados sintéticos: não autorizam operar máquinas, manipular produtos químicos nem liberar produtos reais.",
    "workedExample": "Caso simulado resolvido: Uma planta em Singapura usa 500 m³ para 100 lotes e depois 480 m³ para 80 lotes. O relatório anuncia economia de eficiência. Resolução sustentada: Distinguir queda absoluta de 4% de aumento de intensidade de 5 para 6 m³ por lote, reconhecendo mistura e fronteiras. A alternativa inadequada seria: Afirmar melhoria de eficiência apenas porque o consumo total caiu. A diferença entre as duas decisões está no critério técnico: Escolha unidade funcional que represente produção útil: lote, área ou peça equivalente conforme o processo. Declare fronteiras de medição e fluxos reutilizados para evitar dupla contagem. Compare consumo absoluto e intensidade com ajuste da mistura produtiva. Uma queda no volume pode decorrer de menor produção, não de melhoria. Verifique vazamentos, instrumentação e qualidade necessária antes de propor reúso. A evidência desta resolução deve aparecer em balanço hídrico de fronteira e em definição de unidade funcional, permitindo reproduzir a conclusão. Ao introduzir a mudança — os lotes do segundo período são 20% maiores em área processada. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.epa.gov/sustainability/lean-water-toolkit-chapter-3",
      "https://www.fao.org/aquastat/en/overview/methodology/water-use/index.html"
    ],
    "region": "asia"
  },
  {
    "id": "as-reconciliacao-de-pagamentos-upi-com-confirmacoes-tardias",
    "title": "Reconciliação de pagamentos UPI com confirmações tardias",
    "track": "data",
    "role": "Analista de operações financeiras digitais",
    "positioning": "broad",
    "scenario": "Na Índia, 80 débitos têm 77 confirmações imediatas e três confirmações 20 minutos depois.",
    "decision": "Manter três casos pendentes até reconciliar identificadores e impedir novo débito automático.",
    "misconception": "Refazer os três pagamentos como se fossem falhas definitivas.",
    "changedConstraint": "Uma confirmação chega duplicada após o fechamento.",
    "tasks": [
      "Diagrama de estados UPI",
      "Chave de idempotência",
      "Tabela de pendências",
      "Regra de confirmação tardia",
      "Teste de duplicação",
      "Relatório de fechamento"
    ],
    "method": "Implemente estados iniciado, pendente, confirmado, expirado e revertido. A ausência temporária de resposta não comprova falha. Use chave idempotente por intenção comercial e reconcilie pelo identificador da rede. Um serviço financeiro digital precisa distinguir evento comercial, instrução de pagamento, liquidação e lançamento contábil. Modele estados explícitos e use identificadores estáveis para relacionar os registros. Compare contagens, valores e moedas antes de investigar divergências individuais. Datas de evento, processamento e valor podem divergir legitimamente; registre o calendário aplicável. Uma exceção precisa de proprietário, evidência e prazo, preservando o histórico de alterações. Trabalhe somente com dados fictícios e ambientes de demonstração. A análise não fornece aconselhamento financeiro nem autorização regulatória. Teste sempre repetição, atraso, ausência de confirmação e correção posterior, porque esses estados frequentemente explicam diferenças que parecem fraude ou perda definitiva.",
    "workedExample": "Caso simulado resolvido: Na Índia, 80 débitos têm 77 confirmações imediatas e três confirmações 20 minutos depois. Resolução sustentada: Manter três casos pendentes até reconciliar identificadores e impedir novo débito automático. A alternativa inadequada seria: Refazer os três pagamentos como se fossem falhas definitivas. A diferença entre as duas decisões está no critério técnico: Implemente estados iniciado, pendente, confirmado, expirado e revertido. A ausência temporária de resposta não comprova falha. Use chave idempotente por intenção comercial e reconcilie pelo identificador da rede. A evidência desta resolução deve aparecer em diagrama de estados upi e em chave de idempotência, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma confirmação chega duplicada após o fechamento. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.npci.org.in/what-we-do/upi/product-overview",
      "https://docs.stripe.com/api/idempotent_requests"
    ],
    "region": "asia"
  },
  {
    "id": "as-normalizacao-de-qr-de-pagamento-para-comercio-transfronteirico",
    "title": "Normalização de QR de pagamento para comércio transfronteiriço",
    "track": "data",
    "role": "Analista de operações financeiras digitais",
    "positioning": "broad",
    "scenario": "Um lojista tailandês recebe 50 QR, dos quais cinco indicam moeda diferente do preço exibido.",
    "decision": "Bloquear os cinco até conferir moeda, beneficiário e valor antes de confirmar a compra.",
    "misconception": "Interpretar o número do QR como valor na moeda local.",
    "changedConstraint": "O câmbio expira entre leitura e confirmação.",
    "tasks": [
      "Esquema de dados QR",
      "Validação de beneficiário",
      "Tabela de moedas",
      "Regra de expiração cambial",
      "Casos de teste de leitura",
      "Fluxo de confirmação ao lojista"
    ],
    "method": "Separe dados estáticos do recebedor e dados dinâmicos da transação. Valide moeda e validade da cotação em conjunto; não converta silenciosamente um valor sem acordo do usuário. Um serviço financeiro digital precisa distinguir evento comercial, instrução de pagamento, liquidação e lançamento contábil. Modele estados explícitos e use identificadores estáveis para relacionar os registros. Compare contagens, valores e moedas antes de investigar divergências individuais. Datas de evento, processamento e valor podem divergir legitimamente; registre o calendário aplicável. Uma exceção precisa de proprietário, evidência e prazo, preservando o histórico de alterações. Trabalhe somente com dados fictícios e ambientes de demonstração. A análise não fornece aconselhamento financeiro nem autorização regulatória. Teste sempre repetição, atraso, ausência de confirmação e correção posterior, porque esses estados frequentemente explicam diferenças que parecem fraude ou perda definitiva.",
    "workedExample": "Caso simulado resolvido: Um lojista tailandês recebe 50 QR, dos quais cinco indicam moeda diferente do preço exibido. Resolução sustentada: Bloquear os cinco até conferir moeda, beneficiário e valor antes de confirmar a compra. A alternativa inadequada seria: Interpretar o número do QR como valor na moeda local. A diferença entre as duas decisões está no critério técnico: Separe dados estáticos do recebedor e dados dinâmicos da transação. Valide moeda e validade da cotação em conjunto; não converta silenciosamente um valor sem acordo do usuário. A evidência desta resolução deve aparecer em esquema de dados qr e em validação de beneficiário, permitindo reproduzir a conclusão. Ao introduzir a mudança — o câmbio expira entre leitura e confirmação. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.emvco.com/emv-technologies/qr-codes/",
      "https://www.emvco.com/news-publications/the-what-why-and-how-of-emv-qr-codes/"
    ],
    "region": "asia"
  },
  {
    "id": "as-deteccao-de-fracionamento-em-carteiras-de-remessas",
    "title": "Detecção de fracionamento em carteiras de remessas",
    "track": "data",
    "role": "Analista de operações financeiras digitais",
    "positioning": "broad",
    "scenario": "Uma carteira filipina recebe dez transferências de 90 unidades de contas vinculadas em uma hora.",
    "decision": "Agrupar sinais por relação e janela temporal e encaminhar para investigação autorizada sem concluir culpa.",
    "misconception": "Avaliar apenas cada transferência isolada e encerrar todos os alertas.",
    "changedConstraint": "Há também dez pagamentos legítimos de folha no mesmo horário.",
    "tasks": [
      "Janela de agregação",
      "Grafo de relações sintéticas",
      "Features de fracionamento",
      "Amostra de falsos positivos",
      "Fluxo de revisão autorizada",
      "Registro de justificativas"
    ],
    "method": "Construa features temporais e relações entre contas sem transformar correlação em prova. Avalie precisão dos alertas em amostra revisada e documente justificativas. Preserve minimização e acesso restrito aos dados. Um serviço financeiro digital precisa distinguir evento comercial, instrução de pagamento, liquidação e lançamento contábil. Modele estados explícitos e use identificadores estáveis para relacionar os registros. Compare contagens, valores e moedas antes de investigar divergências individuais. Datas de evento, processamento e valor podem divergir legitimamente; registre o calendário aplicável. Uma exceção precisa de proprietário, evidência e prazo, preservando o histórico de alterações. Trabalhe somente com dados fictícios e ambientes de demonstração. A análise não fornece aconselhamento financeiro nem autorização regulatória. Teste sempre repetição, atraso, ausência de confirmação e correção posterior, porque esses estados frequentemente explicam diferenças que parecem fraude ou perda definitiva.",
    "workedExample": "Caso simulado resolvido: Uma carteira filipina recebe dez transferências de 90 unidades de contas vinculadas em uma hora. Resolução sustentada: Agrupar sinais por relação e janela temporal e encaminhar para investigação autorizada sem concluir culpa. A alternativa inadequada seria: Avaliar apenas cada transferência isolada e encerrar todos os alertas. A diferença entre as duas decisões está no critério técnico: Construa features temporais e relações entre contas sem transformar correlação em prova. Avalie precisão dos alertas em amostra revisada e documente justificativas. Preserve minimização e acesso restrito aos dados. A evidência desta resolução deve aparecer em janela de agregação e em grafo de relações sintéticas, permitindo reproduzir a conclusão. Ao introduzir a mudança — há também dez pagamentos legítimos de folha no mesmo horário. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.bis.org/publications/fsi-summary-aml-and-cft-banking-executive-summary",
      "https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Fatf-recommendations.html"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-inadimplencia-por-coortes-de-credito-digital",
    "title": "Análise de inadimplência por coortes de crédito digital",
    "track": "data",
    "role": "Analista de operações financeiras digitais",
    "positioning": "broad",
    "scenario": "Uma fintech indonésia compara 5% de atraso em contratos de um mês com 12% em contratos de seis meses.",
    "decision": "Comparar coortes na mesma idade de contrato antes de atribuir piora ao novo modelo.",
    "misconception": "Tratar as duas taxas como diretamente comparáveis.",
    "changedConstraint": "A definição de atraso muda de 30 para 15 dias.",
    "tasks": [
      "Tabela safra e maturação",
      "Dicionário de atraso",
      "Curva por idade contratual",
      "Ponte entre definições",
      "Análise de exposição",
      "Nota de limites da comparação"
    ],
    "method": "Organize safras pela originação e idade de exposição. Mantenha definição de atraso e denominador consistentes. Contratos ainda jovens têm menos oportunidade de apresentar o evento; não interprete maturação como desempenho superior. Um serviço financeiro digital precisa distinguir evento comercial, instrução de pagamento, liquidação e lançamento contábil. Modele estados explícitos e use identificadores estáveis para relacionar os registros. Compare contagens, valores e moedas antes de investigar divergências individuais. Datas de evento, processamento e valor podem divergir legitimamente; registre o calendário aplicável. Uma exceção precisa de proprietário, evidência e prazo, preservando o histórico de alterações. Trabalhe somente com dados fictícios e ambientes de demonstração. A análise não fornece aconselhamento financeiro nem autorização regulatória. Teste sempre repetição, atraso, ausência de confirmação e correção posterior, porque esses estados frequentemente explicam diferenças que parecem fraude ou perda definitiva.",
    "workedExample": "Caso simulado resolvido: Uma fintech indonésia compara 5% de atraso em contratos de um mês com 12% em contratos de seis meses. Resolução sustentada: Comparar coortes na mesma idade de contrato antes de atribuir piora ao novo modelo. A alternativa inadequada seria: Tratar as duas taxas como diretamente comparáveis. A diferença entre as duas decisões está no critério técnico: Organize safras pela originação e idade de exposição. Mantenha definição de atraso e denominador consistentes. Contratos ainda jovens têm menos oportunidade de apresentar o evento; não interprete maturação como desempenho superior. A evidência desta resolução deve aparecer em tabela safra e maturação e em dicionário de atraso, permitindo reproduzir a conclusão. Ao introduzir a mudança — a definição de atraso muda de 30 para 15 dias. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/",
      "https://scikit-learn.org/stable/modules/cross_validation.html"
    ],
    "region": "asia"
  },
  {
    "id": "as-conciliacao-de-estornos-em-marketplaces-asiaticos",
    "title": "Conciliação de estornos em marketplaces asiáticos",
    "track": "data",
    "role": "Analista de operações financeiras digitais",
    "positioning": "specialist",
    "scenario": "Um marketplace vietnamita vende 100 pedidos de 40 unidades; dez são cancelados e cinco parcialmente devolvidos em 10 unidades.",
    "decision": "Reconciliar venda bruta 4000, cancelamentos 400 e devoluções 50, resultando em 3550 antes de taxas.",
    "misconception": "Deduzir novamente os cancelamentos já excluídos do relatório líquido.",
    "changedConstraint": "Uma taxa de entrega não reembolsável aparece separada.",
    "tasks": [
      "Ponte bruto e líquido",
      "Livro de ajustes por item",
      "Validação de estorno duplicado",
      "Tratamento de frete",
      "Conciliação de repasse",
      "Relatório de exceções"
    ],
    "method": "Use ponte entre valor bruto, descontos, cancelamentos, devoluções e repasse. Associe cada ajuste ao pedido original e à linha de item. Evite deduções repetidas entre relatórios com fronteiras diferentes. Um serviço financeiro digital precisa distinguir evento comercial, instrução de pagamento, liquidação e lançamento contábil. Modele estados explícitos e use identificadores estáveis para relacionar os registros. Compare contagens, valores e moedas antes de investigar divergências individuais. Datas de evento, processamento e valor podem divergir legitimamente; registre o calendário aplicável. Uma exceção precisa de proprietário, evidência e prazo, preservando o histórico de alterações. Trabalhe somente com dados fictícios e ambientes de demonstração. A análise não fornece aconselhamento financeiro nem autorização regulatória. Teste sempre repetição, atraso, ausência de confirmação e correção posterior, porque esses estados frequentemente explicam diferenças que parecem fraude ou perda definitiva.",
    "workedExample": "Caso simulado resolvido: Um marketplace vietnamita vende 100 pedidos de 40 unidades; dez são cancelados e cinco parcialmente devolvidos em 10 unidades. Resolução sustentada: Reconciliar venda bruta 4000, cancelamentos 400 e devoluções 50, resultando em 3550 antes de taxas. A alternativa inadequada seria: Deduzir novamente os cancelamentos já excluídos do relatório líquido. A diferença entre as duas decisões está no critério técnico: Use ponte entre valor bruto, descontos, cancelamentos, devoluções e repasse. Associe cada ajuste ao pedido original e à linha de item. Evite deduções repetidas entre relatórios com fronteiras diferentes. A evidência desta resolução deve aparecer em ponte bruto e líquido e em livro de ajustes por item, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma taxa de entrega não reembolsável aparece separada. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://docs.stripe.com/refunds",
      "https://docs.stripe.com/api/idempotent_requests"
    ],
    "region": "asia"
  },
  {
    "id": "as-qualidade-de-dados-em-cadastros-empresariais-multilingues",
    "title": "Qualidade de dados em cadastros empresariais multilíngues",
    "track": "data",
    "role": "Analista de operações financeiras digitais",
    "positioning": "specialist",
    "scenario": "Em Hong Kong, 200 cadastros contêm nomes em chinês e inglês; 20 pares parecem iguais após transliteração.",
    "decision": "Usar identificadores oficiais e evidência adicional antes de fundir os vinte pares.",
    "misconception": "Fundir automaticamente todos os nomes transliterados iguais.",
    "changedConstraint": "Uma empresa muda de razão social conservando o registro.",
    "tasks": [
      "Modelo de entidade legal",
      "Tabela de nomes e transliterações",
      "Regras de candidatos",
      "Matriz de evidências",
      "Procedimento de fusão reversível",
      "Histórico de mudança de nome"
    ],
    "method": "Separe entidade legal, nome comercial, transliteração e histórico de nomes. Normalização ajuda a localizar candidatos, mas não estabelece identidade. Mantenha reversibilidade das fusões e revisão para correspondências ambíguas. Um serviço financeiro digital precisa distinguir evento comercial, instrução de pagamento, liquidação e lançamento contábil. Modele estados explícitos e use identificadores estáveis para relacionar os registros. Compare contagens, valores e moedas antes de investigar divergências individuais. Datas de evento, processamento e valor podem divergir legitimamente; registre o calendário aplicável. Uma exceção precisa de proprietário, evidência e prazo, preservando o histórico de alterações. Trabalhe somente com dados fictícios e ambientes de demonstração. A análise não fornece aconselhamento financeiro nem autorização regulatória. Teste sempre repetição, atraso, ausência de confirmação e correção posterior, porque esses estados frequentemente explicam diferenças que parecem fraude ou perda definitiva.",
    "workedExample": "Caso simulado resolvido: Em Hong Kong, 200 cadastros contêm nomes em chinês e inglês; 20 pares parecem iguais após transliteração. Resolução sustentada: Usar identificadores oficiais e evidência adicional antes de fundir os vinte pares. A alternativa inadequada seria: Fundir automaticamente todos os nomes transliterados iguais. A diferença entre as duas decisões está no critério técnico: Separe entidade legal, nome comercial, transliteração e histórico de nomes. Normalização ajuda a localizar candidatos, mas não estabelece identidade. Mantenha reversibilidade das fusões e revisão para correspondências ambíguas. A evidência desta resolução deve aparecer em modelo de entidade legal e em tabela de nomes e transliterações, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma empresa muda de razão social conservando o registro. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.w3.org/International/questions/qa-personal-names",
      "https://ref.gs1.org/standards/global-traceability/"
    ],
    "region": "asia"
  },
  {
    "id": "as-monitoramento-de-liquidez-intradiaria-em-sistemas-de-pagamento",
    "title": "Monitoramento de liquidez intradiária em sistemas de pagamento",
    "track": "data",
    "role": "Analista de operações financeiras digitais",
    "positioning": "specialist",
    "scenario": "Um participante em Singapura tem 500 unidades e saídas de 350 às 9h; entradas de 400 chegam às 11h e outra saída de 300 vence às 10h.",
    "decision": "Identificar déficit intradiário de 150 às 10h apesar de saldo final positivo.",
    "misconception": "Considerar apenas o saldo agregado ao fim do dia.",
    "changedConstraint": "A entrada das 11h atrasa duas horas.",
    "tasks": [
      "Linha temporal de fluxos",
      "Curva acumulada de saldo",
      "Pico de necessidade",
      "Cenário de atraso",
      "Inventário de limites",
      "Plano de escalonamento de liquidez"
    ],
    "method": "Ordene fluxos por vencimento e disponibilidade efetiva. Saldo final não captura necessidade máxima de financiamento. Construa curva acumulada, marque limites e teste atrasos sem presumir crédito automaticamente disponível. Um serviço financeiro digital precisa distinguir evento comercial, instrução de pagamento, liquidação e lançamento contábil. Modele estados explícitos e use identificadores estáveis para relacionar os registros. Compare contagens, valores e moedas antes de investigar divergências individuais. Datas de evento, processamento e valor podem divergir legitimamente; registre o calendário aplicável. Uma exceção precisa de proprietário, evidência e prazo, preservando o histórico de alterações. Trabalhe somente com dados fictícios e ambientes de demonstração. A análise não fornece aconselhamento financeiro nem autorização regulatória. Teste sempre repetição, atraso, ausência de confirmação e correção posterior, porque esses estados frequentemente explicam diferenças que parecem fraude ou perda definitiva.",
    "workedExample": "Caso simulado resolvido: Um participante em Singapura tem 500 unidades e saídas de 350 às 9h; entradas de 400 chegam às 11h e outra saída de 300 vence às 10h. Resolução sustentada: Identificar déficit intradiário de 150 às 10h apesar de saldo final positivo. A alternativa inadequada seria: Considerar apenas o saldo agregado ao fim do dia. A diferença entre as duas decisões está no critério técnico: Ordene fluxos por vencimento e disponibilidade efetiva. Saldo final não captura necessidade máxima de financiamento. Construa curva acumulada, marque limites e teste atrasos sem presumir crédito automaticamente disponível. A evidência desta resolução deve aparecer em linha temporal de fluxos e em curva acumulada de saldo, permitindo reproduzir a conclusão. Ao introduzir a mudança — a entrada das 11h atrasa duas horas. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.bis.org/publications/201304-standards-monitoring-tools-intraday-liquidity-management",
      "https://rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=13115"
    ],
    "region": "asia"
  },
  {
    "id": "as-gestao-de-consentimento-em-agregadores-de-financas-abertas",
    "title": "Gestão de consentimento em agregadores de finanças abertas",
    "track": "data",
    "role": "Analista de operações financeiras digitais",
    "positioning": "specialist",
    "scenario": "Um usuário indiano autoriza acesso por 30 dias; o token continua tecnicamente válido no dia 35.",
    "decision": "Negar nova consulta após o prazo de consentimento mesmo que o token ainda funcione.",
    "misconception": "Usar validade técnica do token como autorização permanente.",
    "changedConstraint": "O usuário revoga acesso antes do dia 30.",
    "tasks": [
      "Modelo de consentimento",
      "Matriz finalidade e escopo",
      "Regra de expiração",
      "Evento de revogação",
      "Teste de token residual",
      "Trilha de acesso minimizada"
    ],
    "method": "Modele consentimento com finalidade, escopo, prazo e revogação independentes da credencial técnica. Verifique a autorização em cada operação relevante e registre prova minimizada. Teste expiração e retirada antecipada. Um serviço financeiro digital precisa distinguir evento comercial, instrução de pagamento, liquidação e lançamento contábil. Modele estados explícitos e use identificadores estáveis para relacionar os registros. Compare contagens, valores e moedas antes de investigar divergências individuais. Datas de evento, processamento e valor podem divergir legitimamente; registre o calendário aplicável. Uma exceção precisa de proprietário, evidência e prazo, preservando o histórico de alterações. Trabalhe somente com dados fictícios e ambientes de demonstração. A análise não fornece aconselhamento financeiro nem autorização regulatória. Teste sempre repetição, atraso, ausência de confirmação e correção posterior, porque esses estados frequentemente explicam diferenças que parecem fraude ou perda definitiva.",
    "workedExample": "Caso simulado resolvido: Um usuário indiano autoriza acesso por 30 dias; o token continua tecnicamente válido no dia 35. Resolução sustentada: Negar nova consulta após o prazo de consentimento mesmo que o token ainda funcione. A alternativa inadequada seria: Usar validade técnica do token como autorização permanente. A diferença entre as duas decisões está no critério técnico: Modele consentimento com finalidade, escopo, prazo e revogação independentes da credencial técnica. Verifique a autorização em cada operação relevante e registre prova minimizada. Teste expiração e retirada antecipada. A evidência desta resolução deve aparecer em modelo de consentimento e em matriz finalidade e escopo, permitindo reproduzir a conclusão. Ao introduzir a mudança — o usuário revoga acesso antes do dia 30. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en",
      "https://www.nist.gov/privacy-framework"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-chargeback-por-canal-em-comercio-de-aplicativos",
    "title": "Análise de chargeback por canal em comércio de aplicativos",
    "track": "data",
    "role": "Analista de operações financeiras digitais",
    "positioning": "specialist",
    "scenario": "Um aplicativo sul-coreano tem 20 disputas em 1000 vendas web e cinco em 100 vendas móveis.",
    "decision": "Comparar taxas de 2% e 5% e investigar composição e maturação antes de atribuir causalidade ao canal.",
    "misconception": "Priorizar web apenas por ter maior contagem absoluta.",
    "changedConstraint": "As vendas móveis têm valor médio três vezes maior.",
    "tasks": [
      "Taxas por canal",
      "Exposição financeira",
      "Coortes maduras de disputa",
      "Taxonomia de motivos",
      "Matriz de intervenções",
      "Relatório de incerteza amostral"
    ],
    "method": "Mantenha contagem e valor financeiro em indicadores separados. Considere tempo entre compra e disputa e evite comparar períodos incompletos. Estratifique motivos e produtos para identificar intervenções específicas. Um serviço financeiro digital precisa distinguir evento comercial, instrução de pagamento, liquidação e lançamento contábil. Modele estados explícitos e use identificadores estáveis para relacionar os registros. Compare contagens, valores e moedas antes de investigar divergências individuais. Datas de evento, processamento e valor podem divergir legitimamente; registre o calendário aplicável. Uma exceção precisa de proprietário, evidência e prazo, preservando o histórico de alterações. Trabalhe somente com dados fictícios e ambientes de demonstração. A análise não fornece aconselhamento financeiro nem autorização regulatória. Teste sempre repetição, atraso, ausência de confirmação e correção posterior, porque esses estados frequentemente explicam diferenças que parecem fraude ou perda definitiva.",
    "workedExample": "Caso simulado resolvido: Um aplicativo sul-coreano tem 20 disputas em 1000 vendas web e cinco em 100 vendas móveis. Resolução sustentada: Comparar taxas de 2% e 5% e investigar composição e maturação antes de atribuir causalidade ao canal. A alternativa inadequada seria: Priorizar web apenas por ter maior contagem absoluta. A diferença entre as duas decisões está no critério técnico: Mantenha contagem e valor financeiro em indicadores separados. Considere tempo entre compra e disputa e evite comparar períodos incompletos. Estratifique motivos e produtos para identificar intervenções específicas. A evidência desta resolução deve aparecer em taxas por canal e em exposição financeira, permitindo reproduzir a conclusão. Ao introduzir a mudança — as vendas móveis têm valor médio três vezes maior. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://docs.stripe.com/disputes",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "asia"
  },
  {
    "id": "as-validacao-de-regras-de-arredondamento-em-remessas-multicambiais",
    "title": "Validação de regras de arredondamento em remessas multicambiais",
    "track": "data",
    "role": "Analista de operações financeiras digitais",
    "positioning": "specialist",
    "scenario": "Uma remessa converte 100 unidades em 333,335; a tarifa é 1,005 e os sistemas arredondam em momentos diferentes.",
    "decision": "Definir regra decimal explícita e comparar arredondamento por componente com arredondamento no total.",
    "misconception": "Aceitar diferenças como aleatórias sem regra documentada.",
    "changedConstraint": "A moeda de destino não possui casas decimais.",
    "tasks": [
      "Contrato de precisão decimal",
      "Tabela de escalas monetárias",
      "Testes de meio centavo",
      "Comparação da ordem de cálculo",
      "Ponte de diferenças",
      "Regra de comunicação da cotação"
    ],
    "method": "Use representação decimal adequada para valores monetários e documente precisão intermediária. A ordem das operações influencia o resultado. Prepare testes de fronteira em meios centavos e moedas com escalas distintas. Um serviço financeiro digital precisa distinguir evento comercial, instrução de pagamento, liquidação e lançamento contábil. Modele estados explícitos e use identificadores estáveis para relacionar os registros. Compare contagens, valores e moedas antes de investigar divergências individuais. Datas de evento, processamento e valor podem divergir legitimamente; registre o calendário aplicável. Uma exceção precisa de proprietário, evidência e prazo, preservando o histórico de alterações. Trabalhe somente com dados fictícios e ambientes de demonstração. A análise não fornece aconselhamento financeiro nem autorização regulatória. Teste sempre repetição, atraso, ausência de confirmação e correção posterior, porque esses estados frequentemente explicam diferenças que parecem fraude ou perda definitiva.",
    "workedExample": "Caso simulado resolvido: Uma remessa converte 100 unidades em 333,335; a tarifa é 1,005 e os sistemas arredondam em momentos diferentes. Resolução sustentada: Definir regra decimal explícita e comparar arredondamento por componente com arredondamento no total. A alternativa inadequada seria: Aceitar diferenças como aleatórias sem regra documentada. A diferença entre as duas decisões está no critério técnico: Use representação decimal adequada para valores monetários e documente precisão intermediária. A ordem das operações influencia o resultado. Prepare testes de fronteira em meios centavos e moedas com escalas distintas. A evidência desta resolução deve aparecer em contrato de precisão decimal e em tabela de escalas monetárias, permitindo reproduzir a conclusão. Ao introduzir a mudança — a moeda de destino não possui casas decimais. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://docs.stripe.com/currencies",
      "https://docs.python.org/3/library/decimal.html"
    ],
    "region": "asia"
  },
  {
    "id": "as-avaliacao-de-segmentacao-de-texto-em-tailandes",
    "title": "Avaliação de segmentação de texto em tailandês",
    "track": "ai",
    "role": "Analista de linguagem e sistemas de IA asiáticos",
    "positioning": "broad",
    "scenario": "Um buscador tailandês separa 100 consultas por espaços e perde termos compostos em 28 delas.",
    "decision": "Comparar segmentador específico com referência anotada e medir precisão e cobertura por tipo de termo.",
    "misconception": "Concluir que ausência de espaços significa ausência de palavras.",
    "changedConstraint": "As consultas incluem nomes de marcas estrangeiras.",
    "tasks": [
      "Guia de segmentação",
      "Corpus anotado tailandês",
      "Alinhamento de offsets",
      "Métricas de fronteira",
      "Teste de marcas",
      "Relatório de erros por categoria"
    ],
    "method": "Defina unidade de avaliação antes de escolher o segmentador. Limites de grafema, palavra e termo de busca não são equivalentes. Preserve o texto original e alinhe offsets após normalização. Sistemas linguísticos precisam de avaliação que respeite idioma, escrita, domínio e tarefa. Uma média global pode ocultar falhas graves em grupos pouco representados. Construa conjuntos de teste com origem, licença e critérios de anotação conhecidos; mantenha versões separadas de treinamento e avaliação. Defina uma rubrica observável antes de comparar modelos e registre discordâncias entre avaliadores. Uma resposta fluente pode continuar incorreta, ofensiva ou impossível de verificar. Use dados sintéticos ou consentidos e evite dados pessoais em ferramentas externas. O resultado do laboratório descreve apenas a amostra e a configuração testadas, exigindo nova avaliação quando corpus, modelo, idioma ou contexto de uso mudam.",
    "workedExample": "Caso simulado resolvido: Um buscador tailandês separa 100 consultas por espaços e perde termos compostos em 28 delas. Resolução sustentada: Comparar segmentador específico com referência anotada e medir precisão e cobertura por tipo de termo. A alternativa inadequada seria: Concluir que ausência de espaços significa ausência de palavras. A diferença entre as duas decisões está no critério técnico: Defina unidade de avaliação antes de escolher o segmentador. Limites de grafema, palavra e termo de busca não são equivalentes. Preserve o texto original e alinhe offsets após normalização. A evidência desta resolução deve aparecer em guia de segmentação e em corpus anotado tailandês, permitindo reproduzir a conclusão. Ao introduzir a mudança — as consultas incluem nomes de marcas estrangeiras. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.unicode.org/reports/tr29/",
      "https://www.w3.org/International/techniques/authoring-html.en"
    ],
    "region": "asia"
  },
  {
    "id": "as-teste-de-recuperacao-de-informacao-em-documentos-japoneses",
    "title": "Teste de recuperação de informação em documentos japoneses",
    "track": "ai",
    "role": "Analista de linguagem e sistemas de IA asiáticos",
    "positioning": "broad",
    "scenario": "Uma busca japonesa retorna dez documentos, dos quais sete são relevantes; existem vinte relevantes na coleção.",
    "decision": "Registrar precisão de 70% e cobertura de 35%, distinguindo ordenar bem de recuperar tudo.",
    "misconception": "Anunciar 70% de cobertura usando o denominador dos resultados retornados.",
    "changedConstraint": "Os documentos usam formas antiga e nova do mesmo termo.",
    "tasks": [
      "Conjunto de consultas japonesas",
      "Julgamentos de relevância",
      "Cálculo de precisão e cobertura",
      "Mapa de variantes terminológicas",
      "Comparação de recuperadores",
      "Teste separado de validação"
    ],
    "method": "Estabeleça julgamentos de relevância para consultas reais do domínio. Compare recuperação lexical e semântica mantendo a mesma coleção. Normalize variantes com rastreabilidade e evite avaliar apenas consultas usadas no ajuste. Sistemas linguísticos precisam de avaliação que respeite idioma, escrita, domínio e tarefa. Uma média global pode ocultar falhas graves em grupos pouco representados. Construa conjuntos de teste com origem, licença e critérios de anotação conhecidos; mantenha versões separadas de treinamento e avaliação. Defina uma rubrica observável antes de comparar modelos e registre discordâncias entre avaliadores. Uma resposta fluente pode continuar incorreta, ofensiva ou impossível de verificar. Use dados sintéticos ou consentidos e evite dados pessoais em ferramentas externas. O resultado do laboratório descreve apenas a amostra e a configuração testadas, exigindo nova avaliação quando corpus, modelo, idioma ou contexto de uso mudam.",
    "workedExample": "Caso simulado resolvido: Uma busca japonesa retorna dez documentos, dos quais sete são relevantes; existem vinte relevantes na coleção. Resolução sustentada: Registrar precisão de 70% e cobertura de 35%, distinguindo ordenar bem de recuperar tudo. A alternativa inadequada seria: Anunciar 70% de cobertura usando o denominador dos resultados retornados. A diferença entre as duas decisões está no critério técnico: Estabeleça julgamentos de relevância para consultas reais do domínio. Compare recuperação lexical e semântica mantendo a mesma coleção. Normalize variantes com rastreabilidade e evite avaliar apenas consultas usadas no ajuste. A evidência desta resolução deve aparecer em conjunto de consultas japonesas e em julgamentos de relevância, permitindo reproduzir a conclusão. Ao introduzir a mudança — os documentos usam formas antiga e nova do mesmo termo. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://scikit-learn.org/stable/modules/model_evaluation.html",
      "https://huggingface.co/docs/evaluate/index"
    ],
    "region": "asia"
  },
  {
    "id": "as-qualidade-de-ocr-em-documentos-de-escrita-arabe",
    "title": "Qualidade de OCR em documentos de escrita árabe",
    "track": "ai",
    "role": "Analista de linguagem e sistemas de IA asiáticos",
    "positioning": "broad",
    "scenario": "Um OCR converte corretamente 900 de 1000 caracteres, mas erra seis dos dez números de protocolo.",
    "decision": "Medir erro por campo crítico além da taxa global e exigir revisão dos protocolos.",
    "misconception": "Liberar todos os documentos com base em 90% de acerto geral.",
    "changedConstraint": "O documento mistura direção árabe e códigos latinos.",
    "tasks": [
      "Corpus de páginas árabes",
      "Mapa de campos críticos",
      "Taxa de erro por campo",
      "Teste de direção mista",
      "Tela documental de revisão",
      "Critérios de aceite por uso"
    ],
    "method": "Separe reconhecimento de caracteres, ordem de leitura e extração de campos. Números e identificadores precisam de validação própria. Preserve recortes e coordenadas para revisão; uma normalização visual não pode alterar o identificador. Sistemas linguísticos precisam de avaliação que respeite idioma, escrita, domínio e tarefa. Uma média global pode ocultar falhas graves em grupos pouco representados. Construa conjuntos de teste com origem, licença e critérios de anotação conhecidos; mantenha versões separadas de treinamento e avaliação. Defina uma rubrica observável antes de comparar modelos e registre discordâncias entre avaliadores. Uma resposta fluente pode continuar incorreta, ofensiva ou impossível de verificar. Use dados sintéticos ou consentidos e evite dados pessoais em ferramentas externas. O resultado do laboratório descreve apenas a amostra e a configuração testadas, exigindo nova avaliação quando corpus, modelo, idioma ou contexto de uso mudam.",
    "workedExample": "Caso simulado resolvido: Um OCR converte corretamente 900 de 1000 caracteres, mas erra seis dos dez números de protocolo. Resolução sustentada: Medir erro por campo crítico além da taxa global e exigir revisão dos protocolos. A alternativa inadequada seria: Liberar todos os documentos com base em 90% de acerto geral. A diferença entre as duas decisões está no critério técnico: Separe reconhecimento de caracteres, ordem de leitura e extração de campos. Números e identificadores precisam de validação própria. Preserve recortes e coordenadas para revisão; uma normalização visual não pode alterar o identificador. A evidência desta resolução deve aparecer em corpus de páginas árabes e em mapa de campos críticos, permitindo reproduzir a conclusão. Ao introduzir a mudança — o documento mistura direção árabe e códigos latinos. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.w3.org/TR/alreq/",
      "https://www.w3.org/International/articles/inline-bidi-markup/"
    ],
    "region": "asia"
  },
  {
    "id": "as-avaliacao-de-reconhecimento-de-fala-com-alternancia-hindi-ingles",
    "title": "Avaliação de reconhecimento de fala com alternância hindi-inglês",
    "track": "ai",
    "role": "Analista de linguagem e sistemas de IA asiáticos",
    "positioning": "broad",
    "scenario": "Um assistente transcreve 40 comandos monolíngues e 40 mistos; erra quatro dos primeiros e vinte dos segundos.",
    "decision": "Reportar erros separados de 10% e 50% e melhorar cobertura dos comandos mistos antes do uso amplo.",
    "misconception": "Publicar apenas a média de 30% para ocultar o grupo pior.",
    "changedConstraint": "O usuário troca de idioma dentro de um nome próprio.",
    "tasks": [
      "Plano de amostragem de fala",
      "Transcrições de referência",
      "Métricas por alternância",
      "Validação de entidades",
      "Fluxo de confirmação",
      "Teste de nome próprio misto"
    ],
    "method": "Crie estratos por idioma, alternância e ruído. Avalie intenção e entidades críticas além da taxa de erro de palavras. Identifique quando pedir confirmação e quando abster-se sem executar uma ação incerta. Sistemas linguísticos precisam de avaliação que respeite idioma, escrita, domínio e tarefa. Uma média global pode ocultar falhas graves em grupos pouco representados. Construa conjuntos de teste com origem, licença e critérios de anotação conhecidos; mantenha versões separadas de treinamento e avaliação. Defina uma rubrica observável antes de comparar modelos e registre discordâncias entre avaliadores. Uma resposta fluente pode continuar incorreta, ofensiva ou impossível de verificar. Use dados sintéticos ou consentidos e evite dados pessoais em ferramentas externas. O resultado do laboratório descreve apenas a amostra e a configuração testadas, exigindo nova avaliação quando corpus, modelo, idioma ou contexto de uso mudam.",
    "workedExample": "Caso simulado resolvido: Um assistente transcreve 40 comandos monolíngues e 40 mistos; erra quatro dos primeiros e vinte dos segundos. Resolução sustentada: Reportar erros separados de 10% e 50% e melhorar cobertura dos comandos mistos antes do uso amplo. A alternativa inadequada seria: Publicar apenas a média de 30% para ocultar o grupo pior. A diferença entre as duas decisões está no critério técnico: Crie estratos por idioma, alternância e ruído. Avalie intenção e entidades críticas além da taxa de erro de palavras. Identifique quando pedir confirmação e quando abster-se sem executar uma ação incerta. A evidência desta resolução deve aparecer em plano de amostragem de fala e em transcrições de referência, permitindo reproduzir a conclusão. Ao introduzir a mudança — o usuário troca de idioma dentro de um nome próprio. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://huggingface.co/docs/evaluate/index",
      "https://scikit-learn.org/stable/modules/model_evaluation.html"
    ],
    "region": "asia"
  },
  {
    "id": "as-adaptacao-de-taxonomias-de-moderacao-para-indonesio-informal",
    "title": "Adaptação de taxonomias de moderação para indonésio informal",
    "track": "ai",
    "role": "Analista de linguagem e sistemas de IA asiáticos",
    "positioning": "specialist",
    "scenario": "Uma comunidade tem 120 mensagens com gírias regionais; quinze são marcadas ofensivas por conter palavra que também é um apelido neutro.",
    "decision": "Revisar contexto e taxonomia com falantes competentes e medir falsos positivos da regra lexical.",
    "misconception": "Bloquear qualquer ocorrência da palavra sem considerar contexto.",
    "changedConstraint": "A mesma expressão muda de sentido em outra região.",
    "tasks": [
      "Taxonomia contextual",
      "Guia de casos limítrofes",
      "Amostra de falsos positivos",
      "Matriz regional de sentidos",
      "Fluxo de recurso",
      "Registro de revisão linguística"
    ],
    "method": "Separe categoria de dano, evidência contextual e ação de moderação. Documente exemplos limítrofes sem expor pessoas. Regras locais exigem revisão linguística e mecanismo de recurso; a maioria dos votos não garante interpretação correta. Sistemas linguísticos precisam de avaliação que respeite idioma, escrita, domínio e tarefa. Uma média global pode ocultar falhas graves em grupos pouco representados. Construa conjuntos de teste com origem, licença e critérios de anotação conhecidos; mantenha versões separadas de treinamento e avaliação. Defina uma rubrica observável antes de comparar modelos e registre discordâncias entre avaliadores. Uma resposta fluente pode continuar incorreta, ofensiva ou impossível de verificar. Use dados sintéticos ou consentidos e evite dados pessoais em ferramentas externas. O resultado do laboratório descreve apenas a amostra e a configuração testadas, exigindo nova avaliação quando corpus, modelo, idioma ou contexto de uso mudam.",
    "workedExample": "Caso simulado resolvido: Uma comunidade tem 120 mensagens com gírias regionais; quinze são marcadas ofensivas por conter palavra que também é um apelido neutro. Resolução sustentada: Revisar contexto e taxonomia com falantes competentes e medir falsos positivos da regra lexical. A alternativa inadequada seria: Bloquear qualquer ocorrência da palavra sem considerar contexto. A diferença entre as duas decisões está no critério técnico: Separe categoria de dano, evidência contextual e ação de moderação. Documente exemplos limítrofes sem expor pessoas. Regras locais exigem revisão linguística e mecanismo de recurso; a maioria dos votos não garante interpretação correta. A evidência desta resolução deve aparecer em taxonomia contextual e em guia de casos limítrofes, permitindo reproduzir a conclusão. Ao introduzir a mudança — a mesma expressão muda de sentido em outra região. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://scikit-learn.org/stable/modules/model_evaluation.html",
      "https://huggingface.co/docs/evaluate/index"
    ],
    "region": "asia"
  },
  {
    "id": "as-controle-de-terminologia-em-traducao-de-manuais-coreanos",
    "title": "Controle de terminologia em tradução de manuais coreanos",
    "track": "ai",
    "role": "Analista de linguagem e sistemas de IA asiáticos",
    "positioning": "specialist",
    "scenario": "Um manual usa o mesmo termo coreano em três componentes; a tradução cria três nomes diferentes para a mesma peça.",
    "decision": "Construir glossário por conceito e verificar consistência referencial em todas as instruções.",
    "misconception": "Escolher sinônimos livremente para tornar o manual mais elegante.",
    "changedConstraint": "O mesmo termo passa a designar uma peça diferente em outro modelo.",
    "tasks": [
      "Glossário conceitual coreano",
      "Mapa de referências de peças",
      "Regras de consistência",
      "Lista de ambiguidades por modelo",
      "Teste de instruções traduzidas",
      "Procedimento de aprovação terminológica"
    ],
    "method": "Modele conceitos com identificadores e contexto de aplicação, não apenas pares de palavras. Diferencie polissemia de variação estilística. Valide nomes contra desenhos e referências do produto, registrando dúvidas para especialista. Sistemas linguísticos precisam de avaliação que respeite idioma, escrita, domínio e tarefa. Uma média global pode ocultar falhas graves em grupos pouco representados. Construa conjuntos de teste com origem, licença e critérios de anotação conhecidos; mantenha versões separadas de treinamento e avaliação. Defina uma rubrica observável antes de comparar modelos e registre discordâncias entre avaliadores. Uma resposta fluente pode continuar incorreta, ofensiva ou impossível de verificar. Use dados sintéticos ou consentidos e evite dados pessoais em ferramentas externas. O resultado do laboratório descreve apenas a amostra e a configuração testadas, exigindo nova avaliação quando corpus, modelo, idioma ou contexto de uso mudam.",
    "workedExample": "Caso simulado resolvido: Um manual usa o mesmo termo coreano em três componentes; a tradução cria três nomes diferentes para a mesma peça. Resolução sustentada: Construir glossário por conceito e verificar consistência referencial em todas as instruções. A alternativa inadequada seria: Escolher sinônimos livremente para tornar o manual mais elegante. A diferença entre as duas decisões está no critério técnico: Modele conceitos com identificadores e contexto de aplicação, não apenas pares de palavras. Diferencie polissemia de variação estilística. Valide nomes contra desenhos e referências do produto, registrando dúvidas para especialista. A evidência desta resolução deve aparecer em glossário conceitual coreano e em mapa de referências de peças, permitindo reproduzir a conclusão. Ao introduzir a mudança — o mesmo termo passa a designar uma peça diferente em outro modelo. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.w3.org/TR/jlreq/",
      "https://www.w3.org/International/techniques/authoring-html.en"
    ],
    "region": "asia"
  },
  {
    "id": "as-deteccao-de-vazamento-entre-corpora-multilingues-de-avaliacao",
    "title": "Detecção de vazamento entre corpora multilíngues de avaliação",
    "track": "ai",
    "role": "Analista de linguagem e sistemas de IA asiáticos",
    "positioning": "specialist",
    "scenario": "Um conjunto tem 500 perguntas em inglês e suas traduções chinesas; a divisão aleatória coloca 80 pares em treino e teste.",
    "decision": "Agrupar traduções pela mesma origem antes da divisão e reconstruir o teste sem os 80 pares vazados.",
    "misconception": "Tratar traduções como exemplos independentes porque os caracteres diferem.",
    "changedConstraint": "Paráfrases do mesmo documento entram como novas fontes.",
    "tasks": [
      "Mapa de famílias de conteúdo",
      "Registro de proveniência",
      "Detector de candidatos traduzidos",
      "Divisão por grupo",
      "Auditoria de paráfrases",
      "Relatório de contaminação corrigida"
    ],
    "method": "Crie famílias de conteúdo por origem semântica e proveniência. Deduplicação textual exata não encontra traduções. Registre regras de agrupamento e faça auditoria manual de amostra para reduzir falsos agrupamentos. Sistemas linguísticos precisam de avaliação que respeite idioma, escrita, domínio e tarefa. Uma média global pode ocultar falhas graves em grupos pouco representados. Construa conjuntos de teste com origem, licença e critérios de anotação conhecidos; mantenha versões separadas de treinamento e avaliação. Defina uma rubrica observável antes de comparar modelos e registre discordâncias entre avaliadores. Uma resposta fluente pode continuar incorreta, ofensiva ou impossível de verificar. Use dados sintéticos ou consentidos e evite dados pessoais em ferramentas externas. O resultado do laboratório descreve apenas a amostra e a configuração testadas, exigindo nova avaliação quando corpus, modelo, idioma ou contexto de uso mudam.",
    "workedExample": "Caso simulado resolvido: Um conjunto tem 500 perguntas em inglês e suas traduções chinesas; a divisão aleatória coloca 80 pares em treino e teste. Resolução sustentada: Agrupar traduções pela mesma origem antes da divisão e reconstruir o teste sem os 80 pares vazados. A alternativa inadequada seria: Tratar traduções como exemplos independentes porque os caracteres diferem. A diferença entre as duas decisões está no critério técnico: Crie famílias de conteúdo por origem semântica e proveniência. Deduplicação textual exata não encontra traduções. Registre regras de agrupamento e faça auditoria manual de amostra para reduzir falsos agrupamentos. A evidência desta resolução deve aparecer em mapa de famílias de conteúdo e em registro de proveniência, permitindo reproduzir a conclusão. Ao introduzir a mudança — paráfrases do mesmo documento entram como novas fontes. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://scikit-learn.org/stable/modules/cross_validation.html",
      "https://huggingface.co/docs/evaluate/index"
    ],
    "region": "asia"
  },
  {
    "id": "as-mensuracao-de-custo-de-tokens-em-idiomas-de-baixa-segmentacao",
    "title": "Mensuração de custo de tokens em idiomas de baixa segmentação",
    "track": "ai",
    "role": "Analista de linguagem e sistemas de IA asiáticos",
    "positioning": "specialist",
    "scenario": "Um serviço cobra 0,002 por mil tokens; cem chamadas usam 800 tokens em inglês e 1400 em japonês cada.",
    "decision": "Calcular custos de 0,16 e 0,28 na mesma tarifa e comparar qualidade antes de decidir por redução de contexto.",
    "misconception": "Supor custo igual porque o número de chamadas é igual.",
    "changedConstraint": "A saída média japonesa dobra após mudança do prompt.",
    "tasks": [
      "Medição por tokenizador",
      "Planilha de custo por idioma",
      "Separação entrada e saída",
      "Rubrica de tarefa aceita",
      "Teste de prompt revisado",
      "Painel de custo e qualidade"
    ],
    "method": "Separe tokens de entrada, saída e cache, usando o tokenizador do modelo efetivo. Tamanho em caracteres não determina faturamento. Avalie custo por tarefa aceita e mantenha qualidade e latência como restrições. Sistemas linguísticos precisam de avaliação que respeite idioma, escrita, domínio e tarefa. Uma média global pode ocultar falhas graves em grupos pouco representados. Construa conjuntos de teste com origem, licença e critérios de anotação conhecidos; mantenha versões separadas de treinamento e avaliação. Defina uma rubrica observável antes de comparar modelos e registre discordâncias entre avaliadores. Uma resposta fluente pode continuar incorreta, ofensiva ou impossível de verificar. Use dados sintéticos ou consentidos e evite dados pessoais em ferramentas externas. O resultado do laboratório descreve apenas a amostra e a configuração testadas, exigindo nova avaliação quando corpus, modelo, idioma ou contexto de uso mudam.",
    "workedExample": "Caso simulado resolvido: Um serviço cobra 0,002 por mil tokens; cem chamadas usam 800 tokens em inglês e 1400 em japonês cada. Resolução sustentada: Calcular custos de 0,16 e 0,28 na mesma tarifa e comparar qualidade antes de decidir por redução de contexto. A alternativa inadequada seria: Supor custo igual porque o número de chamadas é igual. A diferença entre as duas decisões está no critério técnico: Separe tokens de entrada, saída e cache, usando o tokenizador do modelo efetivo. Tamanho em caracteres não determina faturamento. Avalie custo por tarefa aceita e mantenha qualidade e latência como restrições. A evidência desta resolução deve aparecer em medição por tokenizador e em planilha de custo por idioma, permitindo reproduzir a conclusão. Ao introduzir a mudança — a saída média japonesa dobra após mudança do prompt. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://huggingface.co/docs/transformers/main_classes/tokenizer",
      "https://docs.anthropic.com/en/docs/about-claude/pricing"
    ],
    "region": "asia"
  },
  {
    "id": "as-validacao-de-assistentes-de-atendimento-em-tagalo",
    "title": "Validação de assistentes de atendimento em tagalo",
    "track": "ai",
    "role": "Analista de linguagem e sistemas de IA asiáticos",
    "positioning": "specialist",
    "scenario": "Um bot filipino responde 60 perguntas; em dez inventa uma política de reembolso ausente das fontes.",
    "decision": "Marcar dez falhas de fundamentação e exigir recuperação da política ou escalonamento.",
    "misconception": "Considerar todas as respostas corretas porque a gramática está natural.",
    "changedConstraint": "A política muda durante a conversa.",
    "tasks": [
      "Rubrica de fundamentação",
      "Base de políticas versionadas",
      "Amostra de afirmações",
      "Fluxo de escalonamento",
      "Teste de atualização durante sessão",
      "Relatório de cobertura em tagalo"
    ],
    "method": "Avalie cada afirmação verificável contra a fonte vigente. Controle versão do documento e instante de consulta. Defina abstenção para política ausente e teste retomada após atualização sem misturar versões. Sistemas linguísticos precisam de avaliação que respeite idioma, escrita, domínio e tarefa. Uma média global pode ocultar falhas graves em grupos pouco representados. Construa conjuntos de teste com origem, licença e critérios de anotação conhecidos; mantenha versões separadas de treinamento e avaliação. Defina uma rubrica observável antes de comparar modelos e registre discordâncias entre avaliadores. Uma resposta fluente pode continuar incorreta, ofensiva ou impossível de verificar. Use dados sintéticos ou consentidos e evite dados pessoais em ferramentas externas. O resultado do laboratório descreve apenas a amostra e a configuração testadas, exigindo nova avaliação quando corpus, modelo, idioma ou contexto de uso mudam.",
    "workedExample": "Caso simulado resolvido: Um bot filipino responde 60 perguntas; em dez inventa uma política de reembolso ausente das fontes. Resolução sustentada: Marcar dez falhas de fundamentação e exigir recuperação da política ou escalonamento. A alternativa inadequada seria: Considerar todas as respostas corretas porque a gramática está natural. A diferença entre as duas decisões está no critério técnico: Avalie cada afirmação verificável contra a fonte vigente. Controle versão do documento e instante de consulta. Defina abstenção para política ausente e teste retomada após atualização sem misturar versões. A evidência desta resolução deve aparecer em rubrica de fundamentação e em base de políticas versionadas, permitindo reproduzir a conclusão. Ao introduzir a mudança — a política muda durante a conversa. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://huggingface.co/docs/evaluate/index",
      "https://scikit-learn.org/stable/modules/model_evaluation.html"
    ],
    "region": "asia"
  },
  {
    "id": "as-tratamento-de-variantes-de-nomes-em-busca-de-documentos-asiaticos",
    "title": "Tratamento de variantes de nomes em busca de documentos asiáticos",
    "track": "ai",
    "role": "Analista de linguagem e sistemas de IA asiáticos",
    "positioning": "specialist",
    "scenario": "Uma busca retorna pessoas chamadas Zhang Wei e ignora versões com ordem invertida; há vinte homônimos.",
    "decision": "Expandir candidatos por ordem de nome e exigir atributos adicionais para confirmar identidade.",
    "misconception": "Unificar os vinte resultados porque a romanização coincide.",
    "changedConstraint": "Um documento apresenta somente iniciais e ano de nascimento.",
    "tasks": [
      "Modelo de nomes multiculturais",
      "Índice de variantes",
      "Conjunto de homônimos",
      "Critério de confirmação",
      "Teste de informação incompleta",
      "Registro de correspondências inconclusivas"
    ],
    "method": "Armazene escrita original, romanização e ordem declarada sem presumir nome e sobrenome universais. A expansão melhora recuperação, mas a confirmação depende de evidência. Classifique correspondências inconclusivas explicitamente. Sistemas linguísticos precisam de avaliação que respeite idioma, escrita, domínio e tarefa. Uma média global pode ocultar falhas graves em grupos pouco representados. Construa conjuntos de teste com origem, licença e critérios de anotação conhecidos; mantenha versões separadas de treinamento e avaliação. Defina uma rubrica observável antes de comparar modelos e registre discordâncias entre avaliadores. Uma resposta fluente pode continuar incorreta, ofensiva ou impossível de verificar. Use dados sintéticos ou consentidos e evite dados pessoais em ferramentas externas. O resultado do laboratório descreve apenas a amostra e a configuração testadas, exigindo nova avaliação quando corpus, modelo, idioma ou contexto de uso mudam.",
    "workedExample": "Caso simulado resolvido: Uma busca retorna pessoas chamadas Zhang Wei e ignora versões com ordem invertida; há vinte homônimos. Resolução sustentada: Expandir candidatos por ordem de nome e exigir atributos adicionais para confirmar identidade. A alternativa inadequada seria: Unificar os vinte resultados porque a romanização coincide. A diferença entre as duas decisões está no critério técnico: Armazene escrita original, romanização e ordem declarada sem presumir nome e sobrenome universais. A expansão melhora recuperação, mas a confirmação depende de evidência. Classifique correspondências inconclusivas explicitamente. A evidência desta resolução deve aparecer em modelo de nomes multiculturais e em índice de variantes, permitindo reproduzir a conclusão. Ao introduzir a mudança — um documento apresenta somente iniciais e ano de nascimento. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.w3.org/International/questions/qa-personal-names",
      "https://www.w3.org/International/techniques/authoring-html.en"
    ],
    "region": "asia"
  },
  {
    "id": "as-inventario-de-emissoes-por-contrato-de-eletricidade-em-singapura",
    "title": "Inventário de emissões por contrato de eletricidade em Singapura",
    "track": "energy",
    "role": "Analista de transição energética e recursos",
    "positioning": "specialist",
    "scenario": "Um prédio consome 100 MWh e possui instrumentos contratuais para 60 MWh; o gestor quer declarar consumo totalmente renovável.",
    "decision": "Separar os 60 MWh cobertos dos 40 sem cobertura e verificar qualidade e período dos instrumentos.",
    "misconception": "Usar o contrato parcial para zerar todas as emissões.",
    "changedConstraint": "Os certificados vencem antes do período de consumo.",
    "tasks": [
      "Fronteira do inventário",
      "Livro de consumo",
      "Registro de instrumentos",
      "Verificação temporal",
      "Cálculo por abordagem",
      "Nota de alegações permitidas"
    ],
    "method": "Diferencie abordagens de localização e de mercado conforme o padrão escolhido. A elegibilidade contratual requer correspondência temporal e outros critérios; possuir um certificado não elimina automaticamente toda a pegada. A análise de energia começa por definir fronteira, período, unidade funcional e qualidade do dado. Potência descreve uma taxa; energia acumula essa taxa no tempo. Compare alternativas com a mesma base de serviço e explicite perdas, indisponibilidade e incerteza. Um cenário de planejamento não é uma previsão garantida. Associe cada fator de conversão à sua fonte, versão e aplicação e preserve dados medidos separados de estimativas. Registre restrições ambientais e operacionais que exigem validação especializada. Os laboratórios trabalham com cálculos e documentação fictícios, sem instruções de intervenção elétrica, química ou mecânica. Resultados não substituem projeto profissional, licenciamento, medição acreditada nem decisão de segurança.",
    "workedExample": "Caso simulado resolvido: Um prédio consome 100 MWh e possui instrumentos contratuais para 60 MWh; o gestor quer declarar consumo totalmente renovável. Resolução sustentada: Separar os 60 MWh cobertos dos 40 sem cobertura e verificar qualidade e período dos instrumentos. A alternativa inadequada seria: Usar o contrato parcial para zerar todas as emissões. A diferença entre as duas decisões está no critério técnico: Diferencie abordagens de localização e de mercado conforme o padrão escolhido. A elegibilidade contratual requer correspondência temporal e outros critérios; possuir um certificado não elimina automaticamente toda a pegada. A evidência desta resolução deve aparecer em fronteira do inventário e em livro de consumo, permitindo reproduzir a conclusão. Ao introduzir a mudança — os certificados vencem antes do período de consumo. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://ghgprotocol.org/scope-2-guidance",
      "https://ghgprotocol.org/corporate-standard"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-curtailment-em-parques-solares-indianos",
    "title": "Análise de curtailment em parques solares indianos",
    "track": "energy",
    "role": "Analista de transição energética e recursos",
    "positioning": "specialist",
    "scenario": "Uma usina poderia produzir 120 MWh; restrições de rede limitam a entrega a 90 MWh.",
    "decision": "Registrar 30 MWh não entregues e 25% de restrição sobre potencial, distinguindo falha técnica.",
    "misconception": "Classificar toda diferença como defeito dos painéis.",
    "changedConstraint": "O medidor de potencial usa modelo com erro de 10%.",
    "tasks": [
      "Balanço potencial e entrega",
      "Taxonomia de perdas",
      "Validação do modelo",
      "Série de restrições de rede",
      "Faixa de incerteza",
      "Relatório de causas concorrentes"
    ],
    "method": "Reconcilie produção potencial modelada, produção física e energia entregue. Separe indisponibilidade, limitação de rede e perdas técnicas. Quantifique incerteza do contrafactual antes de atribuir compensação ou desempenho. A análise de energia começa por definir fronteira, período, unidade funcional e qualidade do dado. Potência descreve uma taxa; energia acumula essa taxa no tempo. Compare alternativas com a mesma base de serviço e explicite perdas, indisponibilidade e incerteza. Um cenário de planejamento não é uma previsão garantida. Associe cada fator de conversão à sua fonte, versão e aplicação e preserve dados medidos separados de estimativas. Registre restrições ambientais e operacionais que exigem validação especializada. Os laboratórios trabalham com cálculos e documentação fictícios, sem instruções de intervenção elétrica, química ou mecânica. Resultados não substituem projeto profissional, licenciamento, medição acreditada nem decisão de segurança.",
    "workedExample": "Caso simulado resolvido: Uma usina poderia produzir 120 MWh; restrições de rede limitam a entrega a 90 MWh. Resolução sustentada: Registrar 30 MWh não entregues e 25% de restrição sobre potencial, distinguindo falha técnica. A alternativa inadequada seria: Classificar toda diferença como defeito dos painéis. A diferença entre as duas decisões está no critério técnico: Reconcilie produção potencial modelada, produção física e energia entregue. Separe indisponibilidade, limitação de rede e perdas técnicas. Quantifique incerteza do contrafactual antes de atribuir compensação ou desempenho. A evidência desta resolução deve aparecer em balanço potencial e entrega e em taxonomia de perdas, permitindo reproduzir a conclusão. Ao introduzir a mudança — o medidor de potencial usa modelo com erro de 10%. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.iea.org/reports/southeast-asia-energy-outlook-2024",
      "https://www.energy.gov/cmei/femp/federal-demand-flexibility"
    ],
    "region": "asia"
  },
  {
    "id": "as-planejamento-de-demanda-eletrica-de-centros-de-dados-no-golfo",
    "title": "Planejamento de demanda elétrica de centros de dados no Golfo",
    "track": "energy",
    "role": "Analista de transição energética e recursos",
    "positioning": "specialist",
    "scenario": "Um centro de dados no Golfo mantém cargas constantes de 10 MW de TI e 4 MW de sistemas auxiliares durante uma hora. As duas parcelas abrangem todo o consumo medido da instalação.",
    "decision": "Calcular PUE de 1,4 e consumo total de 14 MWh nessa hora, sem confundir potência e energia.",
    "misconception": "Informar consumo de 14 MW por ano.",
    "changedConstraint": "A carga de TI cai pela metade enquanto auxiliares ficam constantes.",
    "tasks": [
      "Fronteira de medição PUE",
      "Balanço horário",
      "Curva de utilização",
      "Cenário de carga reduzida",
      "Validação de unidades",
      "Memorando de eficiência operacional"
    ],
    "method": "PUE relaciona energia total e de TI na mesma fronteira e período. Mudanças de utilização alteram o indicador mesmo sem mudança de equipamento. Compare séries compatíveis e inclua condições climáticas e redundância. A análise de energia começa por definir fronteira, período, unidade funcional e qualidade do dado. Potência descreve uma taxa; energia acumula essa taxa no tempo. Compare alternativas com a mesma base de serviço e explicite perdas, indisponibilidade e incerteza. Um cenário de planejamento não é uma previsão garantida. Associe cada fator de conversão à sua fonte, versão e aplicação e preserve dados medidos separados de estimativas. Registre restrições ambientais e operacionais que exigem validação especializada. Os laboratórios trabalham com cálculos e documentação fictícios, sem instruções de intervenção elétrica, química ou mecânica. Resultados não substituem projeto profissional, licenciamento, medição acreditada nem decisão de segurança.",
    "workedExample": "Caso simulado resolvido: Um centro de dados no Golfo mantém cargas constantes de 10 MW de TI e 4 MW de sistemas auxiliares durante uma hora. As duas parcelas abrangem todo o consumo medido da instalação. Resolução sustentada: Calcular PUE de 1,4 e consumo total de 14 MWh nessa hora, sem confundir potência e energia. A alternativa inadequada seria: Informar consumo de 14 MW por ano. A diferença entre as duas decisões está no critério técnico: PUE relaciona energia total e de TI na mesma fronteira e período. Mudanças de utilização alteram o indicador mesmo sem mudança de equipamento. Compare séries compatíveis e inclua condições climáticas e redundância. A evidência desta resolução deve aparecer em fronteira de medição pue e em balanço horário, permitindo reproduzir a conclusão. Ao introduzir a mudança — a carga de ti cai pela metade enquanto auxiliares ficam constantes. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100TSZE.txt",
      "https://www.energy.gov/powering-americas-ai-future-data-center-resource-hub"
    ],
    "region": "asia"
  },
  {
    "id": "as-rastreabilidade-de-atributos-de-hidrogenio-de-baixo-carbono",
    "title": "Rastreabilidade de atributos de hidrogênio de baixo carbono",
    "track": "energy",
    "role": "Analista de transição energética e recursos",
    "positioning": "specialist",
    "scenario": "Um fornecedor do Omã mistura 70 toneladas qualificadas e 30 sem evidência e vende alegação para cem.",
    "decision": "Limitar atribuição ao volume comprovado conforme o esquema aplicável e manter balanço de massa auditável.",
    "misconception": "Estender o atributo às cem toneladas por mistura física.",
    "changedConstraint": "Há perda de cinco toneladas no armazenamento.",
    "tasks": [
      "Mapa de cadeia de custódia",
      "Livro de balanço de massa",
      "Registro de atributos",
      "Alocação de perdas",
      "Teste de dupla contagem",
      "Lista de evidências de conformidade"
    ],
    "method": "Diferencie rastreabilidade física, balanço de massa e sistemas de certificados. Registre entradas, saídas, perdas e regra de alocação do esquema. Não declare conformidade sem verificar critérios e auditoria requeridos. A análise de energia começa por definir fronteira, período, unidade funcional e qualidade do dado. Potência descreve uma taxa; energia acumula essa taxa no tempo. Compare alternativas com a mesma base de serviço e explicite perdas, indisponibilidade e incerteza. Um cenário de planejamento não é uma previsão garantida. Associe cada fator de conversão à sua fonte, versão e aplicação e preserve dados medidos separados de estimativas. Registre restrições ambientais e operacionais que exigem validação especializada. Os laboratórios trabalham com cálculos e documentação fictícios, sem instruções de intervenção elétrica, química ou mecânica. Resultados não substituem projeto profissional, licenciamento, medição acreditada nem decisão de segurança.",
    "workedExample": "Caso simulado resolvido: Um fornecedor do Omã mistura 70 toneladas qualificadas e 30 sem evidência e vende alegação para cem. Resolução sustentada: Limitar atribuição ao volume comprovado conforme o esquema aplicável e manter balanço de massa auditável. A alternativa inadequada seria: Estender o atributo às cem toneladas por mistura física. A diferença entre as duas decisões está no critério técnico: Diferencie rastreabilidade física, balanço de massa e sistemas de certificados. Registre entradas, saídas, perdas e regra de alocação do esquema. Não declare conformidade sem verificar critérios e auditoria requeridos. A evidência desta resolução deve aparecer em mapa de cadeia de custódia e em livro de balanço de massa, permitindo reproduzir a conclusão. Ao introduzir a mudança — há perda de cinco toneladas no armazenamento. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.iea.org/reports/towards-hydrogen-definitions-based-on-their-emissions-intensity",
      "https://ref.gs1.org/standards/global-traceability/"
    ],
    "region": "asia"
  },
  {
    "id": "as-avaliacao-de-resposta-da-demanda-em-fabricas-tailandesas",
    "title": "Avaliação de resposta da demanda em fábricas tailandesas",
    "track": "energy",
    "role": "Analista de transição energética e recursos",
    "positioning": "specialist",
    "scenario": "Uma planta reduz carga de 8 para 6 MW por duas horas, mas eleva 2 MW por três horas depois.",
    "decision": "Registrar redução de pico de 2 MW e aumento líquido de energia de 2 MWh no intervalo completo.",
    "misconception": "Anunciar economia de energia apenas pela redução no pico.",
    "changedConstraint": "A produção do dia cai 10% por causa do deslocamento.",
    "tasks": [
      "Linha de base de demanda",
      "Perfil antes e depois",
      "Cálculo do rebote",
      "Indicador por produção",
      "Cenário de tarifa",
      "Registro de benefício e limite"
    ],
    "method": "Diferencie redução de demanda máxima e economia de energia. Construa linha de base comparável e inclua recuperação posterior da carga. Avalie serviço produtivo mantido e efeitos de calendário antes de atribuir benefício. A análise de energia começa por definir fronteira, período, unidade funcional e qualidade do dado. Potência descreve uma taxa; energia acumula essa taxa no tempo. Compare alternativas com a mesma base de serviço e explicite perdas, indisponibilidade e incerteza. Um cenário de planejamento não é uma previsão garantida. Associe cada fator de conversão à sua fonte, versão e aplicação e preserve dados medidos separados de estimativas. Registre restrições ambientais e operacionais que exigem validação especializada. Os laboratórios trabalham com cálculos e documentação fictícios, sem instruções de intervenção elétrica, química ou mecânica. Resultados não substituem projeto profissional, licenciamento, medição acreditada nem decisão de segurança.",
    "workedExample": "Caso simulado resolvido: Uma planta reduz carga de 8 para 6 MW por duas horas, mas eleva 2 MW por três horas depois. Resolução sustentada: Registrar redução de pico de 2 MW e aumento líquido de energia de 2 MWh no intervalo completo. A alternativa inadequada seria: Anunciar economia de energia apenas pela redução no pico. A diferença entre as duas decisões está no critério técnico: Diferencie redução de demanda máxima e economia de energia. Construa linha de base comparável e inclua recuperação posterior da carga. Avalie serviço produtivo mantido e efeitos de calendário antes de atribuir benefício. A evidência desta resolução deve aparecer em linha de base de demanda e em perfil antes e depois, permitindo reproduzir a conclusão. Ao introduzir a mudança — a produção do dia cai 10% por causa do deslocamento. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.energy.gov/cmei/femp/federal-demand-flexibility",
      "https://www.iea.org/reports/southeast-asia-energy-outlook-2024"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-reuso-de-agua-em-parques-industriais-chineses",
    "title": "Análise de reúso de água em parques industriais chineses",
    "track": "energy",
    "role": "Analista de transição energética e recursos",
    "positioning": "specialist",
    "scenario": "Um parque capta 1000 m³ e recircula 400 m³ internamente; o relatório soma ambos como 1400 m³ de água captada.",
    "decision": "Manter captação externa em 1000 m³ e informar circulação interna separadamente.",
    "misconception": "Somar cada recirculação como nova captação.",
    "changedConstraint": "Parte da água recirculada deixa de atender o uso previsto.",
    "tasks": [
      "Diagrama de fluxos hídricos",
      "Livro de captação externa",
      "Matriz de usos e qualidade",
      "Controle de recirculação",
      "Cenário de rejeição",
      "Nota de fronteira do indicador"
    ],
    "method": "Desenhe a fronteira hídrica e identifique origem, transferência, consumo e descarga. Fluxos internos não ampliam captação externa. Reúso exige qualidade adequada ao destino; quantidade recuperada não prova adequação sanitária ou industrial. A análise de energia começa por definir fronteira, período, unidade funcional e qualidade do dado. Potência descreve uma taxa; energia acumula essa taxa no tempo. Compare alternativas com a mesma base de serviço e explicite perdas, indisponibilidade e incerteza. Um cenário de planejamento não é uma previsão garantida. Associe cada fator de conversão à sua fonte, versão e aplicação e preserve dados medidos separados de estimativas. Registre restrições ambientais e operacionais que exigem validação especializada. Os laboratórios trabalham com cálculos e documentação fictícios, sem instruções de intervenção elétrica, química ou mecânica. Resultados não substituem projeto profissional, licenciamento, medição acreditada nem decisão de segurança.",
    "workedExample": "Caso simulado resolvido: Um parque capta 1000 m³ e recircula 400 m³ internamente; o relatório soma ambos como 1400 m³ de água captada. Resolução sustentada: Manter captação externa em 1000 m³ e informar circulação interna separadamente. A alternativa inadequada seria: Somar cada recirculação como nova captação. A diferença entre as duas decisões está no critério técnico: Desenhe a fronteira hídrica e identifique origem, transferência, consumo e descarga. Fluxos internos não ampliam captação externa. Reúso exige qualidade adequada ao destino; quantidade recuperada não prova adequação sanitária ou industrial. A evidência desta resolução deve aparecer em diagrama de fluxos hídricos e em livro de captação externa, permitindo reproduzir a conclusão. Ao introduzir a mudança — parte da água recirculada deixa de atender o uso previsto. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.epa.gov/sustainability/lean-water-toolkit-chapter-3",
      "https://www.fao.org/aquastat/en/overview/methodology/water-use/index.html"
    ],
    "region": "asia"
  },
  {
    "id": "as-planejamento-de-troca-de-baterias-para-frotas-de-duas-rodas",
    "title": "Planejamento de troca de baterias para frotas de duas rodas",
    "track": "energy",
    "role": "Analista de transição energética e recursos",
    "positioning": "specialist",
    "scenario": "Uma frota vietnamita faz 200 trocas diárias e cada bateria permite duas trocas após recarga; 10% ficam indisponíveis.",
    "decision": "Dimensionar capacidade nominal acima de cem baterias e testar cobertura de picos e indisponibilidade.",
    "misconception": "Comprar cem baterias sem considerar recarga e reserva.",
    "changedConstraint": "As trocas se concentram em quatro horas.",
    "tasks": [
      "Modelo de estados da bateria",
      "Curva horária de trocas",
      "Balanço de recarga",
      "Reserva por indisponibilidade",
      "Simulação de pico",
      "Plano de monitoramento de serviço"
    ],
    "method": "Modele estoque por estado: carregada, em uso, aguardando e indisponível. Capacidade diária média não garante atendimento horário. Use tempos observados e restrições de segurança definidas pelo fabricante, sem improvisar recarga. A análise de energia começa por definir fronteira, período, unidade funcional e qualidade do dado. Potência descreve uma taxa; energia acumula essa taxa no tempo. Compare alternativas com a mesma base de serviço e explicite perdas, indisponibilidade e incerteza. Um cenário de planejamento não é uma previsão garantida. Associe cada fator de conversão à sua fonte, versão e aplicação e preserve dados medidos separados de estimativas. Registre restrições ambientais e operacionais que exigem validação especializada. Os laboratórios trabalham com cálculos e documentação fictícios, sem instruções de intervenção elétrica, química ou mecânica. Resultados não substituem projeto profissional, licenciamento, medição acreditada nem decisão de segurança.",
    "workedExample": "Caso simulado resolvido: Uma frota vietnamita faz 200 trocas diárias e cada bateria permite duas trocas após recarga; 10% ficam indisponíveis. Resolução sustentada: Dimensionar capacidade nominal acima de cem baterias e testar cobertura de picos e indisponibilidade. A alternativa inadequada seria: Comprar cem baterias sem considerar recarga e reserva. A diferença entre as duas decisões está no critério técnico: Modele estoque por estado: carregada, em uso, aguardando e indisponível. Capacidade diária média não garante atendimento horário. Use tempos observados e restrições de segurança definidas pelo fabricante, sem improvisar recarga. A evidência desta resolução deve aparecer em modelo de estados da bateria e em curva horária de trocas, permitindo reproduzir a conclusão. Ao introduzir a mudança — as trocas se concentram em quatro horas. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.iea.org/reports/global-ev-outlook-2025",
      "https://simpy.readthedocs.io/en/latest/simpy_intro/index.html"
    ],
    "region": "asia"
  },
  {
    "id": "as-comparacao-de-intensidade-termica-em-secagem-de-alimentos",
    "title": "Comparação de intensidade térmica em secagem de alimentos",
    "track": "energy",
    "role": "Analista de transição energética e recursos",
    "positioning": "specialist",
    "scenario": "Uma secadora indonésia usa 500 kWh para remover 250 kg de água; outra usa 420 para remover 140 kg.",
    "decision": "Comparar 2 e 3 kWh por kg de água removida, considerando mesmo produto e qualidade final.",
    "misconception": "Declarar a segunda mais eficiente pelo menor consumo absoluto.",
    "changedConstraint": "A umidade inicial dos lotes difere.",
    "tasks": [
      "Balanço de massa de água",
      "Dicionário de umidade",
      "Intensidade térmica",
      "Comparação de cargas",
      "Matriz de qualidade final",
      "Relatório de condições comparáveis"
    ],
    "method": "Defina serviço útil pela massa de água retirada e registre umidade inicial e final em base consistente. Consumo por lote pode favorecer cargas menores. Preserve qualidade do alimento como restrição independente da eficiência energética. A análise de energia começa por definir fronteira, período, unidade funcional e qualidade do dado. Potência descreve uma taxa; energia acumula essa taxa no tempo. Compare alternativas com a mesma base de serviço e explicite perdas, indisponibilidade e incerteza. Um cenário de planejamento não é uma previsão garantida. Associe cada fator de conversão à sua fonte, versão e aplicação e preserve dados medidos separados de estimativas. Registre restrições ambientais e operacionais que exigem validação especializada. Os laboratórios trabalham com cálculos e documentação fictícios, sem instruções de intervenção elétrica, química ou mecânica. Resultados não substituem projeto profissional, licenciamento, medição acreditada nem decisão de segurança.",
    "workedExample": "Caso simulado resolvido: Uma secadora indonésia usa 500 kWh para remover 250 kg de água; outra usa 420 para remover 140 kg. Resolução sustentada: Comparar 2 e 3 kWh por kg de água removida, considerando mesmo produto e qualidade final. A alternativa inadequada seria: Declarar a segunda mais eficiente pelo menor consumo absoluto. A diferença entre as duas decisões está no critério técnico: Defina serviço útil pela massa de água retirada e registre umidade inicial e final em base consistente. Consumo por lote pode favorecer cargas menores. Preserve qualidade do alimento como restrição independente da eficiência energética. A evidência desta resolução deve aparecer em balanço de massa de água e em dicionário de umidade, permitindo reproduzir a conclusão. Ao introduzir a mudança — a umidade inicial dos lotes difere. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.knowledgebank.irri.org/step-by-step-production/postharvest/drying",
      "https://www.iea.org/reports/southeast-asia-energy-outlook-2024"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-perdas-em-redes-de-frio-para-cidades-tropicais",
    "title": "Análise de perdas em redes de frio para cidades tropicais",
    "track": "energy",
    "role": "Analista de transição energética e recursos",
    "positioning": "specialist",
    "scenario": "Uma central fornece 1000 unidades térmicas e os clientes recebem 820; a medição de retorno não fecha.",
    "decision": "Identificar diferença de 180 sem atribuir causa até validar medidores e fronteiras.",
    "misconception": "Classificar toda diferença como vazamento físico comprovado.",
    "changedConstraint": "O período de leitura dos clientes difere em dois dias.",
    "tasks": [
      "Fronteira térmica da rede",
      "Calendário sincronizado de leituras",
      "Balanço de energia",
      "Inventário de medidores",
      "Ponte de divergências",
      "Prioridade de investigação"
    ],
    "method": "Reconcilie leituras no mesmo intervalo e verifique unidades térmicas. Diferencie perda física, erro instrumental e defasagem temporal. Construa ponte de balanço antes de recomendar intervenção e preserve a incerteza residual. A análise de energia começa por definir fronteira, período, unidade funcional e qualidade do dado. Potência descreve uma taxa; energia acumula essa taxa no tempo. Compare alternativas com a mesma base de serviço e explicite perdas, indisponibilidade e incerteza. Um cenário de planejamento não é uma previsão garantida. Associe cada fator de conversão à sua fonte, versão e aplicação e preserve dados medidos separados de estimativas. Registre restrições ambientais e operacionais que exigem validação especializada. Os laboratórios trabalham com cálculos e documentação fictícios, sem instruções de intervenção elétrica, química ou mecânica. Resultados não substituem projeto profissional, licenciamento, medição acreditada nem decisão de segurança.",
    "workedExample": "Caso simulado resolvido: Uma central fornece 1000 unidades térmicas e os clientes recebem 820; a medição de retorno não fecha. Resolução sustentada: Identificar diferença de 180 sem atribuir causa até validar medidores e fronteiras. A alternativa inadequada seria: Classificar toda diferença como vazamento físico comprovado. A diferença entre as duas decisões está no critério técnico: Reconcilie leituras no mesmo intervalo e verifique unidades térmicas. Diferencie perda física, erro instrumental e defasagem temporal. Construa ponte de balanço antes de recomendar intervenção e preserve a incerteza residual. A evidência desta resolução deve aparecer em fronteira térmica da rede e em calendário sincronizado de leituras, permitindo reproduzir a conclusão. Ao introduzir a mudança — o período de leitura dos clientes difere em dois dias. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.iea-dhc.org/fileadmin/documents/Annex_XII/IEA_DHC_Sustainable_District_Cooling_Guidelines.pdf",
      "https://handbook.ashrae.org/handbooks/S24/IP/s24_ch12/s24_ch12_ip.aspx"
    ],
    "region": "asia"
  },
  {
    "id": "as-documentacao-de-descomissionamento-circular-de-paineis-solares",
    "title": "Documentação de descomissionamento circular de painéis solares",
    "track": "energy",
    "role": "Analista de transição energética e recursos",
    "positioning": "specialist",
    "scenario": "Um operador japonês retira 600 painéis: 400 funcionais, 150 danificados e 50 sem histórico.",
    "decision": "Separar avaliação para reúso, reciclagem e investigação documental sem afirmar segurança dos painéis não testados.",
    "misconception": "Revender todos como funcionais com base apenas na aparência.",
    "changedConstraint": "O comprador exige prova de desempenho residual.",
    "tasks": [
      "Inventário de séries",
      "Taxonomia de condição",
      "Mapa de destinos autorizados",
      "Requisitos de evidência de reúso",
      "Registro de cadeia de custódia",
      "Relatório de balanço circular"
    ],
    "method": "Crie inventário por série e condição com critérios de inspeção do responsável técnico. Preserve cadeia de custódia e destino autorizado. A decisão de reúso requer evidência de desempenho e segurança, não somente contagem de material recuperado. A análise de energia começa por definir fronteira, período, unidade funcional e qualidade do dado. Potência descreve uma taxa; energia acumula essa taxa no tempo. Compare alternativas com a mesma base de serviço e explicite perdas, indisponibilidade e incerteza. Um cenário de planejamento não é uma previsão garantida. Associe cada fator de conversão à sua fonte, versão e aplicação e preserve dados medidos separados de estimativas. Registre restrições ambientais e operacionais que exigem validação especializada. Os laboratórios trabalham com cálculos e documentação fictícios, sem instruções de intervenção elétrica, química ou mecânica. Resultados não substituem projeto profissional, licenciamento, medição acreditada nem decisão de segurança.",
    "workedExample": "Caso simulado resolvido: Um operador japonês retira 600 painéis: 400 funcionais, 150 danificados e 50 sem histórico. Resolução sustentada: Separar avaliação para reúso, reciclagem e investigação documental sem afirmar segurança dos painéis não testados. A alternativa inadequada seria: Revender todos como funcionais com base apenas na aparência. A diferença entre as duas decisões está no critério técnico: Crie inventário por série e condição com critérios de inspeção do responsável técnico. Preserve cadeia de custódia e destino autorizado. A decisão de reúso requer evidência de desempenho e segurança, não somente contagem de material recuperado. A evidência desta resolução deve aparecer em inventário de séries e em taxonomia de condição, permitindo reproduzir a conclusão. Ao introduzir a mudança — o comprador exige prova de desempenho residual. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.epa.gov/hw/solar-panel-recycling",
      "https://www.basel.int/Implementation/TechnicalMatters/DevelopmentofTechnicalGuidelines/TechnicalGuidelines/tabid/8025/Default.aspx"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-filas-de-caminhoes-em-portos-de-transbordo",
    "title": "Análise de filas de caminhões em portos de transbordo",
    "track": "logistics",
    "role": "Analista de cadeias comerciais asiáticas",
    "positioning": "specialist",
    "scenario": "Um terminal de Singapura recebe 45 caminhões/h e atende 40/h durante três horas.",
    "decision": "Prever acúmulo mínimo de quinze caminhões, além da variabilidade, e testar agendamento ou capacidade adicional.",
    "misconception": "Prometer fila zero porque a média diária de atendimento parece suficiente.",
    "changedConstraint": "Uma das baias fica indisponível por uma hora.",
    "tasks": [
      "Perfil horário de chegadas",
      "Capacidade por baia",
      "Curva de fila acumulada",
      "Cenário de indisponibilidade",
      "Proposta de agendamento",
      "Indicador de tempo de permanência"
    ],
    "method": "Compare taxas na mesma janela e represente estoque acumulado. Horários de pico importam mais que médias diárias. Modele filas por tipo de serviço e preserve prioridade contratual e restrições de acesso. Uma cadeia logística deve ser descrita por eventos físicos, estados documentais e responsabilidades. Data prevista não equivale a realização confirmada. Modele cada transferência com origem, destino, horário, unidade e evidência de aceite. Ao comparar rotas, mantenha o mesmo nível de serviço e inclua estoque, variabilidade, perdas e exceções. Contratos e regras de transporte dependem da jurisdição e do modal; consulte o texto vigente antes de uma aplicação real. Use simulações com mercadorias comuns e documentos fictícios. A aprendizagem organiza informação e decisões de planejamento, sem substituir despacho aduaneiro habilitado, inspeção de carga, autorização de transporte ou avaliação profissional de mercadorias perigosas.",
    "workedExample": "Caso simulado resolvido: Um terminal de Singapura recebe 45 caminhões/h e atende 40/h durante três horas. Resolução sustentada: Prever acúmulo mínimo de quinze caminhões, além da variabilidade, e testar agendamento ou capacidade adicional. A alternativa inadequada seria: Prometer fila zero porque a média diária de atendimento parece suficiente. A diferença entre as duas decisões está no critério técnico: Compare taxas na mesma janela e represente estoque acumulado. Horários de pico importam mais que médias diárias. Modele filas por tipo de serviço e preserve prioridade contratual e restrições de acesso. A evidência desta resolução deve aparecer em perfil horário de chegadas e em capacidade por baia, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma das baias fica indisponível por uma hora. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://simpy.readthedocs.io/en/latest/simpy_intro/index.html",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "asia"
  },
  {
    "id": "as-reconciliacao-de-conhecimento-eletronico-de-embarque",
    "title": "Reconciliação de conhecimento eletrônico de embarque",
    "track": "logistics",
    "role": "Analista de cadeias comerciais asiáticas",
    "positioning": "specialist",
    "scenario": "Um exportador coreano tem duas versões eletrônicas do documento e a carga é liberada com referência à versão cancelada.",
    "decision": "Suspender o fluxo documental e verificar titularidade e versão válida pelos mecanismos do sistema autorizado.",
    "misconception": "Aceitar a cópia mais recente por data do arquivo local.",
    "changedConstraint": "Há transferência de controle durante a viagem.",
    "tasks": [
      "Linha temporal documental",
      "Registro de versões",
      "Mapa de controle e transferência",
      "Regra de bloqueio",
      "Checklist de verificação autorizada",
      "Plano de reconciliação de exceção"
    ],
    "method": "Diferencie cópia visual de registro eletrônico transferível e controle de titularidade. Registre eventos de emissão, endosso, substituição e cancelamento. Validade depende do regime e sistema aplicáveis; o laboratório não decide propriedade real. Uma cadeia logística deve ser descrita por eventos físicos, estados documentais e responsabilidades. Data prevista não equivale a realização confirmada. Modele cada transferência com origem, destino, horário, unidade e evidência de aceite. Ao comparar rotas, mantenha o mesmo nível de serviço e inclua estoque, variabilidade, perdas e exceções. Contratos e regras de transporte dependem da jurisdição e do modal; consulte o texto vigente antes de uma aplicação real. Use simulações com mercadorias comuns e documentos fictícios. A aprendizagem organiza informação e decisões de planejamento, sem substituir despacho aduaneiro habilitado, inspeção de carga, autorização de transporte ou avaliação profissional de mercadorias perigosas.",
    "workedExample": "Caso simulado resolvido: Um exportador coreano tem duas versões eletrônicas do documento e a carga é liberada com referência à versão cancelada. Resolução sustentada: Suspender o fluxo documental e verificar titularidade e versão válida pelos mecanismos do sistema autorizado. A alternativa inadequada seria: Aceitar a cópia mais recente por data do arquivo local. A diferença entre as duas decisões está no critério técnico: Diferencie cópia visual de registro eletrônico transferível e controle de titularidade. Registre eventos de emissão, endosso, substituição e cancelamento. Validade depende do regime e sistema aplicáveis; o laboratório não decide propriedade real. A evidência desta resolução deve aparecer em linha temporal documental e em registro de versões, permitindo reproduzir a conclusão. Ao introduzir a mudança — há transferência de controle durante a viagem. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://uncitral.un.org/en/texts/ecommerce/modellaw/electronic_transferable_records",
      "https://dcsa.org/standards/bill-of-lading"
    ],
    "region": "asia"
  },
  {
    "id": "as-planejamento-de-conteineres-retornaveis-em-cadeias-asean",
    "title": "Planejamento de contêineres retornáveis em cadeias ASEAN",
    "track": "logistics",
    "role": "Analista de cadeias comerciais asiáticas",
    "positioning": "specialist",
    "scenario": "Uma operação envia 100 caixas/dia e o ciclo de retorno dura cinco dias; 10% das caixas estão em manutenção.",
    "decision": "Partir de necessidade de 500 caixas em circulação e acrescentar reserva consistente com indisponibilidade e variabilidade.",
    "misconception": "Dimensionar apenas cem caixas por considerar um dia de expedição.",
    "changedConstraint": "O ciclo aumenta para sete dias na fronteira.",
    "tasks": [
      "Mapa do ciclo de retorno",
      "Balanço por estado",
      "Dimensionamento de circulação",
      "Reserva de manutenção",
      "Cenário de fronteira",
      "Plano de rastreamento por caixa"
    ],
    "method": "A quantidade necessária depende de vazão multiplicada pelo tempo de ciclo, com a mesma unidade. Separe caixas disponíveis, em trânsito e em manutenção. Verifique picos e perdas sem contar a mesma caixa em dois estados. Uma cadeia logística deve ser descrita por eventos físicos, estados documentais e responsabilidades. Data prevista não equivale a realização confirmada. Modele cada transferência com origem, destino, horário, unidade e evidência de aceite. Ao comparar rotas, mantenha o mesmo nível de serviço e inclua estoque, variabilidade, perdas e exceções. Contratos e regras de transporte dependem da jurisdição e do modal; consulte o texto vigente antes de uma aplicação real. Use simulações com mercadorias comuns e documentos fictícios. A aprendizagem organiza informação e decisões de planejamento, sem substituir despacho aduaneiro habilitado, inspeção de carga, autorização de transporte ou avaliação profissional de mercadorias perigosas.",
    "workedExample": "Caso simulado resolvido: Uma operação envia 100 caixas/dia e o ciclo de retorno dura cinco dias; 10% das caixas estão em manutenção. Resolução sustentada: Partir de necessidade de 500 caixas em circulação e acrescentar reserva consistente com indisponibilidade e variabilidade. A alternativa inadequada seria: Dimensionar apenas cem caixas por considerar um dia de expedição. A diferença entre as duas decisões está no critério técnico: A quantidade necessária depende de vazão multiplicada pelo tempo de ciclo, com a mesma unidade. Separe caixas disponíveis, em trânsito e em manutenção. Verifique picos e perdas sem contar a mesma caixa em dois estados. A evidência desta resolução deve aparecer em mapa do ciclo de retorno e em balanço por estado, permitindo reproduzir a conclusão. Ao introduzir a mudança — o ciclo aumenta para sete dias na fronteira. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://ref.gs1.org/standards/global-traceability/",
      "https://simpy.readthedocs.io/en/latest/simpy_intro/index.html"
    ],
    "region": "asia"
  },
  {
    "id": "as-gestao-de-dados-de-origem-em-fornecedores-de-vestuario-asiatico",
    "title": "Gestão de dados de origem em fornecedores de vestuário asiático",
    "track": "logistics",
    "role": "Analista de cadeias comerciais asiáticas",
    "positioning": "specialist",
    "scenario": "Uma marca compra 1000 peças no Bangladesh e recebe declaração de origem para tecido, mas não para a transformação final.",
    "decision": "Registrar a lacuna e verificar regra de origem aplicável antes de afirmar preferência tarifária.",
    "misconception": "Confundir país do tecido com origem comprovada do produto acabado.",
    "changedConstraint": "Uma etapa de acabamento muda de país.",
    "tasks": [
      "Mapa de transformação",
      "Lista de insumos por origem",
      "Matriz de evidências",
      "Registro de lacunas",
      "Cenário de mudança de acabamento",
      "Dossiê para revisão habilitada"
    ],
    "method": "Separe origem de insumos, local de transformação e origem aduaneira resultante. As regras variam por acordo e produto. Construa genealogia documental sem emitir interpretação jurídica ou declaração não sustentada. Uma cadeia logística deve ser descrita por eventos físicos, estados documentais e responsabilidades. Data prevista não equivale a realização confirmada. Modele cada transferência com origem, destino, horário, unidade e evidência de aceite. Ao comparar rotas, mantenha o mesmo nível de serviço e inclua estoque, variabilidade, perdas e exceções. Contratos e regras de transporte dependem da jurisdição e do modal; consulte o texto vigente antes de uma aplicação real. Use simulações com mercadorias comuns e documentos fictícios. A aprendizagem organiza informação e decisões de planejamento, sem substituir despacho aduaneiro habilitado, inspeção de carga, autorização de transporte ou avaliação profissional de mercadorias perigosas.",
    "workedExample": "Caso simulado resolvido: Uma marca compra 1000 peças no Bangladesh e recebe declaração de origem para tecido, mas não para a transformação final. Resolução sustentada: Registrar a lacuna e verificar regra de origem aplicável antes de afirmar preferência tarifária. A alternativa inadequada seria: Confundir país do tecido com origem comprovada do produto acabado. A diferença entre as duas decisões está no critério técnico: Separe origem de insumos, local de transformação e origem aduaneira resultante. As regras variam por acordo e produto. Construa genealogia documental sem emitir interpretação jurídica ou declaração não sustentada. A evidência desta resolução deve aparecer em mapa de transformação e em lista de insumos por origem, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma etapa de acabamento muda de país. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.wcoomd.org/en/topics/origin/overview.aspx",
      "https://www.wcoomd.org/en/topics/facilitation/instrument-and-tools.aspx"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-confiabilidade-de-corredores-ferroviarios-eurasiaticos",
    "title": "Análise de confiabilidade de corredores ferroviários eurasiáticos",
    "track": "logistics",
    "role": "Analista de cadeias comerciais asiáticas",
    "positioning": "specialist",
    "scenario": "Uma rota tem prazo médio de 14 dias e desvio de seis; outra tem média de 17 e desvio de um.",
    "decision": "Comparar distribuição e prazo de serviço exigido em vez de escolher apenas a menor média.",
    "misconception": "Prometer entrega em catorze dias para todo embarque.",
    "changedConstraint": "O cliente tolera atraso de no máximo dois dias.",
    "tasks": [
      "Base de tempos por etapa",
      "Distribuição de prazo",
      "Percentis de serviço",
      "Mapa de causas de atraso",
      "Cenário de tolerância do cliente",
      "Memorando de escolha de corredor"
    ],
    "method": "Avalie percentis e amostra histórica além da média. Separe atrasos de terminal, fronteira e transporte. Dados escassos não sustentam probabilidades precisas; apresente cenários e teste estoque de proteção. Uma cadeia logística deve ser descrita por eventos físicos, estados documentais e responsabilidades. Data prevista não equivale a realização confirmada. Modele cada transferência com origem, destino, horário, unidade e evidência de aceite. Ao comparar rotas, mantenha o mesmo nível de serviço e inclua estoque, variabilidade, perdas e exceções. Contratos e regras de transporte dependem da jurisdição e do modal; consulte o texto vigente antes de uma aplicação real. Use simulações com mercadorias comuns e documentos fictícios. A aprendizagem organiza informação e decisões de planejamento, sem substituir despacho aduaneiro habilitado, inspeção de carga, autorização de transporte ou avaliação profissional de mercadorias perigosas.",
    "workedExample": "Caso simulado resolvido: Uma rota tem prazo médio de 14 dias e desvio de seis; outra tem média de 17 e desvio de um. Resolução sustentada: Comparar distribuição e prazo de serviço exigido em vez de escolher apenas a menor média. A alternativa inadequada seria: Prometer entrega em catorze dias para todo embarque. A diferença entre as duas decisões está no critério técnico: Avalie percentis e amostra histórica além da média. Separe atrasos de terminal, fronteira e transporte. Dados escassos não sustentam probabilidades precisas; apresente cenários e teste estoque de proteção. A evidência desta resolução deve aparecer em base de tempos por etapa e em distribuição de prazo, permitindo reproduzir a conclusão. Ao introduzir a mudança — o cliente tolera atraso de no máximo dois dias. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/",
      "https://www.itl.nist.gov/div898/handbook/apr/apr.htm"
    ],
    "region": "asia"
  },
  {
    "id": "as-controle-de-temperatura-documental-em-exportacao-de-frutas",
    "title": "Controle de temperatura documental em exportação de frutas",
    "track": "logistics",
    "role": "Analista de cadeias comerciais asiáticas",
    "positioning": "specialist",
    "scenario": "Um lote filipino tem 48 horas de registro, mas quatro horas estão sem leitura.",
    "decision": "Tratar as quatro horas como lacuna e buscar evidência adicional sem presumir conformidade térmica.",
    "misconception": "Interpolar a lacuna e declarar cadeia de frio integralmente comprovada.",
    "changedConstraint": "O sensor estava fora do centro da carga.",
    "tasks": [
      "Linha temporal térmica",
      "Mapa de posicionamento",
      "Registro de calibração",
      "Taxonomia de lacunas",
      "Dossiê de evidência complementar",
      "Regra documental de escalonamento"
    ],
    "method": "Diferencie temperatura do sensor e temperatura representativa do produto. Verifique posicionamento, calibração, intervalo e sincronização. A ausência de alerta não prova condição adequada quando faltam registros; encaminhe decisão de produto ao responsável. Uma cadeia logística deve ser descrita por eventos físicos, estados documentais e responsabilidades. Data prevista não equivale a realização confirmada. Modele cada transferência com origem, destino, horário, unidade e evidência de aceite. Ao comparar rotas, mantenha o mesmo nível de serviço e inclua estoque, variabilidade, perdas e exceções. Contratos e regras de transporte dependem da jurisdição e do modal; consulte o texto vigente antes de uma aplicação real. Use simulações com mercadorias comuns e documentos fictícios. A aprendizagem organiza informação e decisões de planejamento, sem substituir despacho aduaneiro habilitado, inspeção de carga, autorização de transporte ou avaliação profissional de mercadorias perigosas.",
    "workedExample": "Caso simulado resolvido: Um lote filipino tem 48 horas de registro, mas quatro horas estão sem leitura. Resolução sustentada: Tratar as quatro horas como lacuna e buscar evidência adicional sem presumir conformidade térmica. A alternativa inadequada seria: Interpolar a lacuna e declarar cadeia de frio integralmente comprovada. A diferença entre as duas decisões está no critério técnico: Diferencie temperatura do sensor e temperatura representativa do produto. Verifique posicionamento, calibração, intervalo e sincronização. A ausência de alerta não prova condição adequada quando faltam registros; encaminhe decisão de produto ao responsável. A evidência desta resolução deve aparecer em linha temporal térmica e em mapa de posicionamento, permitindo reproduzir a conclusão. Ao introduzir a mudança — o sensor estava fora do centro da carga. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://ref.gs1.org/standards/global-traceability/",
      "https://www.fao.org/fao-who-codexalimentarius/codex-texts/guidelines/en/"
    ],
    "region": "asia"
  },
  {
    "id": "as-planejamento-de-fulfillment-em-festivais-de-comercio-eletronico",
    "title": "Planejamento de fulfillment em festivais de comércio eletrônico",
    "track": "logistics",
    "role": "Analista de cadeias comerciais asiáticas",
    "positioning": "specialist",
    "scenario": "Um centro chinês inicia sem fila e recebe uniformemente 12000 pedidos durante seis horas. A separação processa 1500 pedidos por hora durante todo o período, sem cancelamentos ou paradas.",
    "decision": "Identificar saldo de 3000 pedidos após seis horas sem horas extras ou capacidade adicional.",
    "misconception": "Prometer expedição integral usando volume médio dos dias anteriores.",
    "changedConstraint": "Metade dos pedidos exige embalagem especial.",
    "tasks": [
      "Curva de entrada de pedidos",
      "Tempos por tipo de embalagem",
      "Mapa de gargalos",
      "Balanço de backlog",
      "Priorização por compromisso",
      "Plano de capacidade temporária"
    ],
    "method": "Segmente pedidos por esforço de processamento e não apenas contagem. Construa capacidade por atividade e acompanhe backlog por compromisso de entrega. Acelerar separação pode deslocar o gargalo para embalagem ou expedição. Uma cadeia logística deve ser descrita por eventos físicos, estados documentais e responsabilidades. Data prevista não equivale a realização confirmada. Modele cada transferência com origem, destino, horário, unidade e evidência de aceite. Ao comparar rotas, mantenha o mesmo nível de serviço e inclua estoque, variabilidade, perdas e exceções. Contratos e regras de transporte dependem da jurisdição e do modal; consulte o texto vigente antes de uma aplicação real. Use simulações com mercadorias comuns e documentos fictícios. A aprendizagem organiza informação e decisões de planejamento, sem substituir despacho aduaneiro habilitado, inspeção de carga, autorização de transporte ou avaliação profissional de mercadorias perigosas.",
    "workedExample": "Caso simulado resolvido: Um centro chinês inicia sem fila e recebe uniformemente 12000 pedidos durante seis horas. A separação processa 1500 pedidos por hora durante todo o período, sem cancelamentos ou paradas. Resolução sustentada: Identificar saldo de 3000 pedidos após seis horas sem horas extras ou capacidade adicional. A alternativa inadequada seria: Prometer expedição integral usando volume médio dos dias anteriores. A diferença entre as duas decisões está no critério técnico: Segmente pedidos por esforço de processamento e não apenas contagem. Construa capacidade por atividade e acompanhe backlog por compromisso de entrega. Acelerar separação pode deslocar o gargalo para embalagem ou expedição. A evidência desta resolução deve aparecer em curva de entrada de pedidos e em tempos por tipo de embalagem, permitindo reproduzir a conclusão. Ao introduzir a mudança — metade dos pedidos exige embalagem especial. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://simpy.readthedocs.io/en/latest/simpy_intro/index.html",
      "https://www.epa.gov/sustainability/lean-thinking-and-methods"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-demurrage-e-detention-em-importacoes-asiaticas",
    "title": "Análise de demurrage e detention em importações asiáticas",
    "track": "logistics",
    "role": "Analista de cadeias comerciais asiáticas",
    "positioning": "specialist",
    "scenario": "Um contêiner tem cinco dias livres no terminal e fica sete; depois permanece quatro dias fora, com três livres.",
    "decision": "Separar dois dias de demurrage de um dia de detention conforme contrato aplicável.",
    "misconception": "Somar todos os dias e aplicar uma única tarifa sem fronteira.",
    "changedConstraint": "O calendário contratual exclui um feriado local.",
    "tasks": [
      "Linha temporal do contêiner",
      "Matriz de eventos contratuais",
      "Calendário de dias livres",
      "Planilha por tipo de cobrança",
      "Conferência de faixas",
      "Dossiê de contestação documental"
    ],
    "method": "Defina evento inicial e final de cada cobrança e consulte calendário e faixas do contrato. Registre evidência de disponibilidade e devolução. Não presuma que nomes comerciais e franquias são universais entre transportadores. Uma cadeia logística deve ser descrita por eventos físicos, estados documentais e responsabilidades. Data prevista não equivale a realização confirmada. Modele cada transferência com origem, destino, horário, unidade e evidência de aceite. Ao comparar rotas, mantenha o mesmo nível de serviço e inclua estoque, variabilidade, perdas e exceções. Contratos e regras de transporte dependem da jurisdição e do modal; consulte o texto vigente antes de uma aplicação real. Use simulações com mercadorias comuns e documentos fictícios. A aprendizagem organiza informação e decisões de planejamento, sem substituir despacho aduaneiro habilitado, inspeção de carga, autorização de transporte ou avaliação profissional de mercadorias perigosas.",
    "workedExample": "Caso simulado resolvido: Um contêiner tem cinco dias livres no terminal e fica sete; depois permanece quatro dias fora, com três livres. Resolução sustentada: Separar dois dias de demurrage de um dia de detention conforme contrato aplicável. A alternativa inadequada seria: Somar todos os dias e aplicar uma única tarifa sem fronteira. A diferença entre as duas decisões está no critério técnico: Defina evento inicial e final de cada cobrança e consulte calendário e faixas do contrato. Registre evidência de disponibilidade e devolução. Não presuma que nomes comerciais e franquias são universais entre transportadores. A evidência desta resolução deve aparecer em linha temporal do contêiner e em matriz de eventos contratuais, permitindo reproduzir a conclusão. Ao introduzir a mudança — o calendário contratual exclui um feriado local. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.fmc.gov/detention-and-demurrage/",
      "https://www.cma-cgm.com/local/united-states/detention-and-demurrage"
    ],
    "region": "asia"
  },
  {
    "id": "as-consolidacao-de-carga-para-pequenos-exportadores-nepaleses",
    "title": "Consolidação de carga para pequenos exportadores nepaleses",
    "track": "logistics",
    "role": "Analista de cadeias comerciais asiáticas",
    "positioning": "specialist",
    "scenario": "Três exportadores têm 2, 3 e 4 m³; a consolidação custa 900 e o contrato distribui por volume ocupado.",
    "decision": "Alocar 200, 300 e 400 unidades, verificando adicionais por peso ou manuseio antes do aceite.",
    "misconception": "Dividir igualmente o custo apesar da regra volumétrica.",
    "changedConstraint": "Uma carga ocupa espaço adicional por não permitir empilhamento.",
    "tasks": [
      "Mapa de cargas",
      "Base de rateio",
      "Planilha de custos comuns",
      "Adicionais por restrição",
      "Cenário sem empilhamento",
      "Demonstrativo individual de alocação"
    ],
    "method": "Escolha direcionador de custo compatível com o serviço. Volume, peso taxável e restrições de empilhamento podem gerar bases diferentes. Explicite custos comuns e específicos para evitar subsídio oculto entre participantes. Uma cadeia logística deve ser descrita por eventos físicos, estados documentais e responsabilidades. Data prevista não equivale a realização confirmada. Modele cada transferência com origem, destino, horário, unidade e evidência de aceite. Ao comparar rotas, mantenha o mesmo nível de serviço e inclua estoque, variabilidade, perdas e exceções. Contratos e regras de transporte dependem da jurisdição e do modal; consulte o texto vigente antes de uma aplicação real. Use simulações com mercadorias comuns e documentos fictícios. A aprendizagem organiza informação e decisões de planejamento, sem substituir despacho aduaneiro habilitado, inspeção de carga, autorização de transporte ou avaliação profissional de mercadorias perigosas.",
    "workedExample": "Caso simulado resolvido: Três exportadores têm 2, 3 e 4 m³; a consolidação custa 900 e o contrato distribui por volume ocupado. Resolução sustentada: Alocar 200, 300 e 400 unidades, verificando adicionais por peso ou manuseio antes do aceite. A alternativa inadequada seria: Dividir igualmente o custo apesar da regra volumétrica. A diferença entre as duas decisões está no critério técnico: Escolha direcionador de custo compatível com o serviço. Volume, peso taxável e restrições de empilhamento podem gerar bases diferentes. Explicite custos comuns e específicos para evitar subsídio oculto entre participantes. A evidência desta resolução deve aparecer em mapa de cargas e em base de rateio, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma carga ocupa espaço adicional por não permitir empilhamento. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.sba.gov/counseling/plan-your-business/",
      "https://www.sba.gov/counseling/plan-your-business/break-even-point-calculator/"
    ],
    "region": "asia"
  },
  {
    "id": "as-qualidade-de-eventos-de-entrega-em-redes-de-ultima-milha",
    "title": "Qualidade de eventos de entrega em redes de última milha",
    "track": "logistics",
    "role": "Analista de cadeias comerciais asiáticas",
    "positioning": "specialist",
    "scenario": "Uma rede malaia registra 100 entregas, mas dez provas têm horário anterior à saída do veículo.",
    "decision": "Marcar dez eventos inconsistentes e investigar relógio e origem antes de aceitar desempenho.",
    "misconception": "Aceitar os cem como entregues porque existe um evento com esse nome.",
    "changedConstraint": "O aplicativo opera offline e sincroniza depois.",
    "tasks": [
      "Esquema temporal de eventos",
      "Validador de sequência",
      "Taxonomia de inconsistências",
      "Regra de sincronização offline",
      "Amostra de prova minimizada",
      "Painel de entregas confirmadas"
    ],
    "method": "Separe horário do evento, captura e ingestão. Regras de sequência devem considerar sincronização offline e fuso. Valide prova com identificador de pedido e critério de entrega sem coletar dados pessoais desnecessários. Uma cadeia logística deve ser descrita por eventos físicos, estados documentais e responsabilidades. Data prevista não equivale a realização confirmada. Modele cada transferência com origem, destino, horário, unidade e evidência de aceite. Ao comparar rotas, mantenha o mesmo nível de serviço e inclua estoque, variabilidade, perdas e exceções. Contratos e regras de transporte dependem da jurisdição e do modal; consulte o texto vigente antes de uma aplicação real. Use simulações com mercadorias comuns e documentos fictícios. A aprendizagem organiza informação e decisões de planejamento, sem substituir despacho aduaneiro habilitado, inspeção de carga, autorização de transporte ou avaliação profissional de mercadorias perigosas.",
    "workedExample": "Caso simulado resolvido: Uma rede malaia registra 100 entregas, mas dez provas têm horário anterior à saída do veículo. Resolução sustentada: Marcar dez eventos inconsistentes e investigar relógio e origem antes de aceitar desempenho. A alternativa inadequada seria: Aceitar os cem como entregues porque existe um evento com esse nome. A diferença entre as duas decisões está no critério técnico: Separe horário do evento, captura e ingestão. Regras de sequência devem considerar sincronização offline e fuso. Valide prova com identificador de pedido e critério de entrega sem coletar dados pessoais desnecessários. A evidência desta resolução deve aparecer em esquema temporal de eventos e em validador de sequência, permitindo reproduzir a conclusão. Ao introduzir a mudança — o aplicativo opera offline e sincroniza depois. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://ref.gs1.org/standards/epcis/",
      "https://ref.gs1.org/standards/global-traceability/"
    ],
    "region": "asia"
  },
  {
    "id": "as-dimensionamento-administrativo-de-centros-de-convivencia-para-idosos",
    "title": "Dimensionamento administrativo de centros de convivência para idosos",
    "track": "care",
    "role": "Coordenador administrativo de serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Um centro japonês oferece 40 lugares por manhã e recebe 50 solicitações; dez pessoas precisam de transporte acessível.",
    "decision": "Registrar déficit de dez lugares e planejar transporte como capacidade separada sem excluir automaticamente o grupo acessível.",
    "misconception": "Aceitar apenas usuários que chegam sozinhos para melhorar ocupação.",
    "changedConstraint": "Um veículo acessível fica indisponível.",
    "tasks": [
      "Mapa de recursos por atendimento",
      "Fila por critério explícito",
      "Capacidade de transporte",
      "Cenário de veículo indisponível",
      "Plano de comunicação acessível",
      "Indicador de acesso equitativo"
    ],
    "method": "Mapeie vagas, transporte e apoio como recursos distintos. A capacidade efetiva depende da combinação necessária por pessoa. Priorize segundo critérios institucionais transparentes, com alternativa e comunicação para quem permanece aguardando. A coordenação de cuidado combina fluxo administrativo, acessibilidade e proteção da pessoa atendida. Diferencie agendamento, elegibilidade administrativa e decisão clínica: somente profissionais habilitados devem diagnosticar ou indicar tratamento. Registre dados mínimos necessários, finalidade e acesso autorizado. Um indicador operacional precisa de denominador e período claros; rapidez não deve encobrir exclusão ou perda de continuidade. Trabalhe com perfis fictícios e evite registrar informação sensível em ferramentas abertas. Use matrizes de responsabilidade para encaminhar riscos ao responsável apropriado. Teste alterações de demanda e indisponibilidade de equipe, preservando consentimento, comunicação compreensível e documentação de limites. O exercício não substitui formação clínica, supervisão ou protocolos institucionais.",
    "workedExample": "Caso simulado resolvido: Um centro japonês oferece 40 lugares por manhã e recebe 50 solicitações; dez pessoas precisam de transporte acessível. Resolução sustentada: Registrar déficit de dez lugares e planejar transporte como capacidade separada sem excluir automaticamente o grupo acessível. A alternativa inadequada seria: Aceitar apenas usuários que chegam sozinhos para melhorar ocupação. A diferença entre as duas decisões está no critério técnico: Mapeie vagas, transporte e apoio como recursos distintos. A capacidade efetiva depende da combinação necessária por pessoa. Priorize segundo critérios institucionais transparentes, com alternativa e comunicação para quem permanece aguardando. A evidência desta resolução deve aparecer em mapa de recursos por atendimento e em fila por critério explícito, permitindo reproduzir a conclusão. Ao introduzir a mudança — um veículo acessível fica indisponível. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.who.int/publications/i/item/9789241515993",
      "https://simpy.readthedocs.io/en/latest/simpy_intro/index.html"
    ],
    "region": "asia"
  },
  {
    "id": "as-controle-de-continuidade-em-visitas-domiciliares-nao-clinicas",
    "title": "Controle de continuidade em visitas domiciliares não clínicas",
    "track": "care",
    "role": "Coordenador administrativo de serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Uma equipe coreana agenda 60 visitas; oito são canceladas e seis remarcadas sem responsável definido.",
    "decision": "Atribuir responsável e prazo às catorze exceções, distinguindo cancelamento de remarcação confirmada.",
    "misconception": "Contar as seis remarcações como visitas realizadas.",
    "changedConstraint": "O contato principal de um usuário muda.",
    "tasks": [
      "Máquina de estados de visita",
      "Registro de exceções",
      "Matriz de responsáveis",
      "Protocolo de atualização de contato",
      "Painel de continuidade",
      "Teste de remarcação sem confirmação"
    ],
    "method": "Use estados solicitado, agendado, realizado, cancelado e reagendado. A continuidade exige próximo passo com dono e data. Confirme contatos por canal autorizado e encaminhe sinais de risco conforme protocolo, sem interpretar clinicamente. A coordenação de cuidado combina fluxo administrativo, acessibilidade e proteção da pessoa atendida. Diferencie agendamento, elegibilidade administrativa e decisão clínica: somente profissionais habilitados devem diagnosticar ou indicar tratamento. Registre dados mínimos necessários, finalidade e acesso autorizado. Um indicador operacional precisa de denominador e período claros; rapidez não deve encobrir exclusão ou perda de continuidade. Trabalhe com perfis fictícios e evite registrar informação sensível em ferramentas abertas. Use matrizes de responsabilidade para encaminhar riscos ao responsável apropriado. Teste alterações de demanda e indisponibilidade de equipe, preservando consentimento, comunicação compreensível e documentação de limites. O exercício não substitui formação clínica, supervisão ou protocolos institucionais.",
    "workedExample": "Caso simulado resolvido: Uma equipe coreana agenda 60 visitas; oito são canceladas e seis remarcadas sem responsável definido. Resolução sustentada: Atribuir responsável e prazo às catorze exceções, distinguindo cancelamento de remarcação confirmada. A alternativa inadequada seria: Contar as seis remarcações como visitas realizadas. A diferença entre as duas decisões está no critério técnico: Use estados solicitado, agendado, realizado, cancelado e reagendado. A continuidade exige próximo passo com dono e data. Confirme contatos por canal autorizado e encaminhe sinais de risco conforme protocolo, sem interpretar clinicamente. A evidência desta resolução deve aparecer em máquina de estados de visita e em registro de exceções, permitindo reproduzir a conclusão. Ao introduzir a mudança — o contato principal de um usuário muda. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.who.int/publications/i/item/9789241515993",
      "https://ref.gs1.org/standards/global-traceability/"
    ],
    "region": "asia"
  },
  {
    "id": "as-gestao-de-consentimento-para-comunicacao-com-familiares",
    "title": "Gestão de consentimento para comunicação com familiares",
    "track": "care",
    "role": "Coordenador administrativo de serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Um serviço de Singapura recebe pedido de informações de três familiares; somente um está autorizado para assuntos administrativos.",
    "decision": "Compartilhar apenas o escopo autorizado com a pessoa identificada e encaminhar demais pedidos ao fluxo formal.",
    "misconception": "Enviar o histórico completo ao grupo da família.",
    "changedConstraint": "A autorização é revogada durante o atendimento.",
    "tasks": [
      "Matriz de autorização familiar",
      "Fluxo de verificação proporcional",
      "Registro de escopo",
      "Evento de revogação",
      "Modelo de resposta administrativa",
      "Teste de solicitação fora do escopo"
    ],
    "method": "Separe vínculo familiar de autorização documentada. Registre pessoa, finalidade, escopo, validade e revogação. Verifique identidade de modo proporcional e preserve evidência mínima da comunicação, sem transformar conveniência em acesso irrestrito. A coordenação de cuidado combina fluxo administrativo, acessibilidade e proteção da pessoa atendida. Diferencie agendamento, elegibilidade administrativa e decisão clínica: somente profissionais habilitados devem diagnosticar ou indicar tratamento. Registre dados mínimos necessários, finalidade e acesso autorizado. Um indicador operacional precisa de denominador e período claros; rapidez não deve encobrir exclusão ou perda de continuidade. Trabalhe com perfis fictícios e evite registrar informação sensível em ferramentas abertas. Use matrizes de responsabilidade para encaminhar riscos ao responsável apropriado. Teste alterações de demanda e indisponibilidade de equipe, preservando consentimento, comunicação compreensível e documentação de limites. O exercício não substitui formação clínica, supervisão ou protocolos institucionais.",
    "workedExample": "Caso simulado resolvido: Um serviço de Singapura recebe pedido de informações de três familiares; somente um está autorizado para assuntos administrativos. Resolução sustentada: Compartilhar apenas o escopo autorizado com a pessoa identificada e encaminhar demais pedidos ao fluxo formal. A alternativa inadequada seria: Enviar o histórico completo ao grupo da família. A diferença entre as duas decisões está no critério técnico: Separe vínculo familiar de autorização documentada. Registre pessoa, finalidade, escopo, validade e revogação. Verifique identidade de modo proporcional e preserve evidência mínima da comunicação, sem transformar conveniência em acesso irrestrito. A evidência desta resolução deve aparecer em matriz de autorização familiar e em fluxo de verificação proporcional, permitindo reproduzir a conclusão. Ao introduzir a mudança — a autorização é revogada durante o atendimento. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en",
      "https://www.nist.gov/privacy-framework"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-faltas-em-programas-comunitarios-de-reabilitacao",
    "title": "Análise de faltas em programas comunitários de reabilitação",
    "track": "care",
    "role": "Coordenador administrativo de serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Um programa indiano tem 20 faltas em cem agendamentos rurais e dez em cem urbanos.",
    "decision": "Comparar taxas de 20% e 10% e investigar barreiras antes de atribuir desinteresse.",
    "misconception": "Aplicar punição automática aos usuários rurais.",
    "changedConstraint": "O transporte rural é interrompido em dias de chuva.",
    "tasks": [
      "Dicionário de presença",
      "Taxas por contexto",
      "Mapa de barreiras",
      "Plano de lembretes acessíveis",
      "Cenário de chuva",
      "Avaliação de intervenção administrativa"
    ],
    "method": "Estratifique faltas por contexto e antecedência de cancelamento. Registre barreiras informadas sem inferir características pessoais. Teste intervenções administrativas como lembrete acessível e coordenação de transporte, mantendo decisões clínicas fora da análise. A coordenação de cuidado combina fluxo administrativo, acessibilidade e proteção da pessoa atendida. Diferencie agendamento, elegibilidade administrativa e decisão clínica: somente profissionais habilitados devem diagnosticar ou indicar tratamento. Registre dados mínimos necessários, finalidade e acesso autorizado. Um indicador operacional precisa de denominador e período claros; rapidez não deve encobrir exclusão ou perda de continuidade. Trabalhe com perfis fictícios e evite registrar informação sensível em ferramentas abertas. Use matrizes de responsabilidade para encaminhar riscos ao responsável apropriado. Teste alterações de demanda e indisponibilidade de equipe, preservando consentimento, comunicação compreensível e documentação de limites. O exercício não substitui formação clínica, supervisão ou protocolos institucionais.",
    "workedExample": "Caso simulado resolvido: Um programa indiano tem 20 faltas em cem agendamentos rurais e dez em cem urbanos. Resolução sustentada: Comparar taxas de 20% e 10% e investigar barreiras antes de atribuir desinteresse. A alternativa inadequada seria: Aplicar punição automática aos usuários rurais. A diferença entre as duas decisões está no critério técnico: Estratifique faltas por contexto e antecedência de cancelamento. Registre barreiras informadas sem inferir características pessoais. Teste intervenções administrativas como lembrete acessível e coordenação de transporte, mantendo decisões clínicas fora da análise. A evidência desta resolução deve aparecer em dicionário de presença e em taxas por contexto, permitindo reproduzir a conclusão. Ao introduzir a mudança — o transporte rural é interrompido em dias de chuva. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.who.int/publications/i/item/9789241515993",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "asia"
  },
  {
    "id": "as-acessibilidade-de-portais-de-agendamento-em-alfabetizacao-limitada",
    "title": "Acessibilidade de portais de agendamento em alfabetização limitada",
    "track": "care",
    "role": "Coordenador administrativo de serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Um portal indonésio tem 80 usuários; 24 abandonam uma etapa que exige texto longo, embora consigam escolher horários oralmente.",
    "decision": "Testar instruções simples e alternativas acessíveis com usuários consentidos, medindo conclusão sem expor dados.",
    "misconception": "Concluir que os 24 não querem o serviço.",
    "changedConstraint": "O portal passa a exigir documento anexado.",
    "tasks": [
      "Mapa da jornada",
      "Inventário de barreiras textuais",
      "Protótipo de instrução simples",
      "Roteiro de teste consentido",
      "Alternativa de envio assistido",
      "Métricas de conclusão por etapa"
    ],
    "method": "Avalie a tarefa, não uma suposta deficiência do usuário. Combine linguagem clara, estrutura previsível e alternativas de apoio. Mantenha equivalência de finalidade e privacidade quando oferecer atendimento assistido. A coordenação de cuidado combina fluxo administrativo, acessibilidade e proteção da pessoa atendida. Diferencie agendamento, elegibilidade administrativa e decisão clínica: somente profissionais habilitados devem diagnosticar ou indicar tratamento. Registre dados mínimos necessários, finalidade e acesso autorizado. Um indicador operacional precisa de denominador e período claros; rapidez não deve encobrir exclusão ou perda de continuidade. Trabalhe com perfis fictícios e evite registrar informação sensível em ferramentas abertas. Use matrizes de responsabilidade para encaminhar riscos ao responsável apropriado. Teste alterações de demanda e indisponibilidade de equipe, preservando consentimento, comunicação compreensível e documentação de limites. O exercício não substitui formação clínica, supervisão ou protocolos institucionais.",
    "workedExample": "Caso simulado resolvido: Um portal indonésio tem 80 usuários; 24 abandonam uma etapa que exige texto longo, embora consigam escolher horários oralmente. Resolução sustentada: Testar instruções simples e alternativas acessíveis com usuários consentidos, medindo conclusão sem expor dados. A alternativa inadequada seria: Concluir que os 24 não querem o serviço. A diferença entre as duas decisões está no critério técnico: Avalie a tarefa, não uma suposta deficiência do usuário. Combine linguagem clara, estrutura previsível e alternativas de apoio. Mantenha equivalência de finalidade e privacidade quando oferecer atendimento assistido. A evidência desta resolução deve aparecer em mapa da jornada e em inventário de barreiras textuais, permitindo reproduzir a conclusão. Ao introduzir a mudança — o portal passa a exigir documento anexado. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.w3.org/WAI/tutorials/forms/",
      "https://www.w3.org/TR/coga-usable/"
    ],
    "region": "asia"
  },
  {
    "id": "as-coordenacao-de-interpretes-em-atendimento-administrativo-de-saude",
    "title": "Coordenação de intérpretes em atendimento administrativo de saúde",
    "track": "care",
    "role": "Coordenador administrativo de serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Um centro do Golfo tem doze consultas administrativas em quatro idiomas e dois intérpretes com seis horários cada.",
    "decision": "Verificar compatibilidade de idioma e duração antes de concluir que doze horários cobrem as doze demandas.",
    "misconception": "Distribuir atendimentos apenas por ordem de chegada sem verificar idioma.",
    "changedConstraint": "Uma sessão exige mais tempo e apoio de comunicação.",
    "tasks": [
      "Matriz de pares linguísticos",
      "Agenda compatível por competência",
      "Reserva de duração",
      "Critérios de confidencialidade",
      "Plano de sessão estendida",
      "Indicador de demanda não atendida"
    ],
    "method": "Modele demanda por par linguístico, duração e modalidade. Capacidade agregada não resolve incompatibilidade de competência. Preserve confidencialidade e encaminhe interpretação clínica a profissionais apropriados; familiares não substituem automaticamente serviço qualificado. A coordenação de cuidado combina fluxo administrativo, acessibilidade e proteção da pessoa atendida. Diferencie agendamento, elegibilidade administrativa e decisão clínica: somente profissionais habilitados devem diagnosticar ou indicar tratamento. Registre dados mínimos necessários, finalidade e acesso autorizado. Um indicador operacional precisa de denominador e período claros; rapidez não deve encobrir exclusão ou perda de continuidade. Trabalhe com perfis fictícios e evite registrar informação sensível em ferramentas abertas. Use matrizes de responsabilidade para encaminhar riscos ao responsável apropriado. Teste alterações de demanda e indisponibilidade de equipe, preservando consentimento, comunicação compreensível e documentação de limites. O exercício não substitui formação clínica, supervisão ou protocolos institucionais.",
    "workedExample": "Caso simulado resolvido: Um centro do Golfo tem doze consultas administrativas em quatro idiomas e dois intérpretes com seis horários cada. Resolução sustentada: Verificar compatibilidade de idioma e duração antes de concluir que doze horários cobrem as doze demandas. A alternativa inadequada seria: Distribuir atendimentos apenas por ordem de chegada sem verificar idioma. A diferença entre as duas decisões está no critério técnico: Modele demanda por par linguístico, duração e modalidade. Capacidade agregada não resolve incompatibilidade de competência. Preserve confidencialidade e encaminhe interpretação clínica a profissionais apropriados; familiares não substituem automaticamente serviço qualificado. A evidência desta resolução deve aparecer em matriz de pares linguísticos e em agenda compatível por competência, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma sessão exige mais tempo e apoio de comunicação. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.who.int/publications/i/item/9789241515993",
      "https://www.w3.org/International/techniques/authoring-html.en"
    ],
    "region": "asia"
  },
  {
    "id": "as-qualidade-de-cadastros-em-programas-de-cuidado-de-longa-duracao",
    "title": "Qualidade de cadastros em programas de cuidado de longa duração",
    "track": "care",
    "role": "Coordenador administrativo de serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Um município japonês tem 500 registros e 35 endereços sem atualização há cinco anos.",
    "decision": "Marcar necessidade de verificação dos 35 sem presumir que todos estejam errados ou excluir usuários.",
    "misconception": "Apagar registros antigos para melhorar o indicador de qualidade.",
    "changedConstraint": "Dez usuários não respondem ao primeiro contato.",
    "tasks": [
      "Perfil de qualidade cadastral",
      "Fila de verificação",
      "Protocolo de contato",
      "Histórico de retificação",
      "Tratamento de não resposta",
      "Painel de atualidade sem exclusão"
    ],
    "method": "Qualidade inclui completude, atualidade, consistência e adequação ao uso. Ausência de atualização é sinal de verificação, não prova de falsidade. Defina sequência de contato autorizada e preserve histórico de correções. A coordenação de cuidado combina fluxo administrativo, acessibilidade e proteção da pessoa atendida. Diferencie agendamento, elegibilidade administrativa e decisão clínica: somente profissionais habilitados devem diagnosticar ou indicar tratamento. Registre dados mínimos necessários, finalidade e acesso autorizado. Um indicador operacional precisa de denominador e período claros; rapidez não deve encobrir exclusão ou perda de continuidade. Trabalhe com perfis fictícios e evite registrar informação sensível em ferramentas abertas. Use matrizes de responsabilidade para encaminhar riscos ao responsável apropriado. Teste alterações de demanda e indisponibilidade de equipe, preservando consentimento, comunicação compreensível e documentação de limites. O exercício não substitui formação clínica, supervisão ou protocolos institucionais.",
    "workedExample": "Caso simulado resolvido: Um município japonês tem 500 registros e 35 endereços sem atualização há cinco anos. Resolução sustentada: Marcar necessidade de verificação dos 35 sem presumir que todos estejam errados ou excluir usuários. A alternativa inadequada seria: Apagar registros antigos para melhorar o indicador de qualidade. A diferença entre as duas decisões está no critério técnico: Qualidade inclui completude, atualidade, consistência e adequação ao uso. Ausência de atualização é sinal de verificação, não prova de falsidade. Defina sequência de contato autorizada e preserve histórico de correções. A evidência desta resolução deve aparecer em perfil de qualidade cadastral e em fila de verificação, permitindo reproduzir a conclusão. Ao introduzir a mudança — dez usuários não respondem ao primeiro contato. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.who.int/publications/i/item/9789241515993",
      "https://www.nist.gov/privacy-framework"
    ],
    "region": "asia"
  },
  {
    "id": "as-planejamento-de-voluntariado-para-apoio-intergeracional",
    "title": "Planejamento de voluntariado para apoio intergeracional",
    "track": "care",
    "role": "Coordenador administrativo de serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Um programa malaio tem 30 voluntários inscritos, mas apenas dezoito confirmam disponibilidade nas próximas quatro semanas.",
    "decision": "Planejar com dezoito confirmados e manter doze como capacidade potencial, com supervisão e requisitos cumpridos.",
    "misconception": "Prometer cobertura com todos os trinta nomes do cadastro.",
    "changedConstraint": "Metade dos confirmados só pode atuar remotamente.",
    "tasks": [
      "Funil de disponibilidade",
      "Matriz atividade e competência",
      "Agenda confirmada",
      "Registro de requisitos",
      "Plano de supervisão",
      "Cenário de atuação remota"
    ],
    "method": "Diferencie inscrição, seleção, capacitação, disponibilidade e alocação. Atividades com pessoas vulneráveis exigem requisitos institucionais e supervisão. Combine competência e modalidade com a necessidade, evitando metas de volume que ultrapassem limites de atuação. A coordenação de cuidado combina fluxo administrativo, acessibilidade e proteção da pessoa atendida. Diferencie agendamento, elegibilidade administrativa e decisão clínica: somente profissionais habilitados devem diagnosticar ou indicar tratamento. Registre dados mínimos necessários, finalidade e acesso autorizado. Um indicador operacional precisa de denominador e período claros; rapidez não deve encobrir exclusão ou perda de continuidade. Trabalhe com perfis fictícios e evite registrar informação sensível em ferramentas abertas. Use matrizes de responsabilidade para encaminhar riscos ao responsável apropriado. Teste alterações de demanda e indisponibilidade de equipe, preservando consentimento, comunicação compreensível e documentação de limites. O exercício não substitui formação clínica, supervisão ou protocolos institucionais.",
    "workedExample": "Caso simulado resolvido: Um programa malaio tem 30 voluntários inscritos, mas apenas dezoito confirmam disponibilidade nas próximas quatro semanas. Resolução sustentada: Planejar com dezoito confirmados e manter doze como capacidade potencial, com supervisão e requisitos cumpridos. A alternativa inadequada seria: Prometer cobertura com todos os trinta nomes do cadastro. A diferença entre as duas decisões está no critério técnico: Diferencie inscrição, seleção, capacitação, disponibilidade e alocação. Atividades com pessoas vulneráveis exigem requisitos institucionais e supervisão. Combine competência e modalidade com a necessidade, evitando metas de volume que ultrapassem limites de atuação. A evidência desta resolução deve aparecer em funil de disponibilidade e em matriz atividade e competência, permitindo reproduzir a conclusão. Ao introduzir a mudança — metade dos confirmados só pode atuar remotamente. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.who.int/initiatives/decade-of-healthy-ageing",
      "https://www.who.int/publications/i/item/9789241515993"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-tempo-de-espera-em-servicos-de-apoio-a-cuidadores",
    "title": "Análise de tempo de espera em serviços de apoio a cuidadores",
    "track": "care",
    "role": "Coordenador administrativo de serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Um serviço filipino recebe 100 pedidos; 80 são atendidos em dois dias e vinte continuam abertos há quinze.",
    "decision": "Reportar espera dos atendidos e idade dos abertos separadamente, sem média que exclua a fila.",
    "misconception": "Anunciar espera universal de dois dias usando somente casos concluídos.",
    "changedConstraint": "Os pedidos antigos têm maior complexidade administrativa.",
    "tasks": [
      "Definições de relógio de espera",
      "Base de casos pendentes",
      "Distribuição por coorte",
      "Estratificação de complexidade",
      "Painel de envelhecimento da fila",
      "Plano de revisão de casos antigos"
    ],
    "method": "Meça tempo até atendimento e idade dos casos pendentes como indicadores diferentes. Use coortes e categorias de complexidade. A exclusão dos não concluídos cria viés de sobrevivência e pode ocultar grupos com maior barreira. A coordenação de cuidado combina fluxo administrativo, acessibilidade e proteção da pessoa atendida. Diferencie agendamento, elegibilidade administrativa e decisão clínica: somente profissionais habilitados devem diagnosticar ou indicar tratamento. Registre dados mínimos necessários, finalidade e acesso autorizado. Um indicador operacional precisa de denominador e período claros; rapidez não deve encobrir exclusão ou perda de continuidade. Trabalhe com perfis fictícios e evite registrar informação sensível em ferramentas abertas. Use matrizes de responsabilidade para encaminhar riscos ao responsável apropriado. Teste alterações de demanda e indisponibilidade de equipe, preservando consentimento, comunicação compreensível e documentação de limites. O exercício não substitui formação clínica, supervisão ou protocolos institucionais.",
    "workedExample": "Caso simulado resolvido: Um serviço filipino recebe 100 pedidos; 80 são atendidos em dois dias e vinte continuam abertos há quinze. Resolução sustentada: Reportar espera dos atendidos e idade dos abertos separadamente, sem média que exclua a fila. A alternativa inadequada seria: Anunciar espera universal de dois dias usando somente casos concluídos. A diferença entre as duas decisões está no critério técnico: Meça tempo até atendimento e idade dos casos pendentes como indicadores diferentes. Use coortes e categorias de complexidade. A exclusão dos não concluídos cria viés de sobrevivência e pode ocultar grupos com maior barreira. A evidência desta resolução deve aparecer em definições de relógio de espera e em base de casos pendentes, permitindo reproduzir a conclusão. Ao introduzir a mudança — os pedidos antigos têm maior complexidade administrativa. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/apr/apr.htm",
      "https://www.who.int/publications/i/item/9789241515993"
    ],
    "region": "asia"
  },
  {
    "id": "as-transferencia-administrativa-entre-equipes-de-apoio-social",
    "title": "Transferência administrativa entre equipes de apoio social",
    "track": "care",
    "role": "Coordenador administrativo de serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Uma equipe vietnamita encerra vinte encaminhamentos, mas só doze têm aceite do serviço destinatário.",
    "decision": "Distinguir envio de encaminhamento de aceite confirmado e acompanhar oito transferências pendentes.",
    "misconception": "Encerrar todos como atendimento concluído ao enviar o formulário.",
    "changedConstraint": "O destinatário devolve quatro pedidos por informação incompleta.",
    "tasks": [
      "Mapa de estados do encaminhamento",
      "Checklist de completude",
      "Registro de aceite",
      "Fila de devoluções",
      "Matriz de responsabilidade transitória",
      "Teste de destinatário indisponível"
    ],
    "method": "Uma transferência tem emissão, recebimento, aceite e responsabilidade posterior. Defina critérios de completude e confirmação sem compartilhar dados excessivos. Preserve a responsabilidade de acompanhamento até o marco acordado, conforme política institucional. A coordenação de cuidado combina fluxo administrativo, acessibilidade e proteção da pessoa atendida. Diferencie agendamento, elegibilidade administrativa e decisão clínica: somente profissionais habilitados devem diagnosticar ou indicar tratamento. Registre dados mínimos necessários, finalidade e acesso autorizado. Um indicador operacional precisa de denominador e período claros; rapidez não deve encobrir exclusão ou perda de continuidade. Trabalhe com perfis fictícios e evite registrar informação sensível em ferramentas abertas. Use matrizes de responsabilidade para encaminhar riscos ao responsável apropriado. Teste alterações de demanda e indisponibilidade de equipe, preservando consentimento, comunicação compreensível e documentação de limites. O exercício não substitui formação clínica, supervisão ou protocolos institucionais.",
    "workedExample": "Caso simulado resolvido: Uma equipe vietnamita encerra vinte encaminhamentos, mas só doze têm aceite do serviço destinatário. Resolução sustentada: Distinguir envio de encaminhamento de aceite confirmado e acompanhar oito transferências pendentes. A alternativa inadequada seria: Encerrar todos como atendimento concluído ao enviar o formulário. A diferença entre as duas decisões está no critério técnico: Uma transferência tem emissão, recebimento, aceite e responsabilidade posterior. Defina critérios de completude e confirmação sem compartilhar dados excessivos. Preserve a responsabilidade de acompanhamento até o marco acordado, conforme política institucional. A evidência desta resolução deve aparecer em mapa de estados do encaminhamento e em checklist de completude, permitindo reproduzir a conclusão. Ao introduzir a mudança — o destinatário devolve quatro pedidos por informação incompleta. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.who.int/publications/i/item/9789241515993",
      "https://ref.gs1.org/standards/global-traceability/"
    ],
    "region": "asia"
  },
  {
    "id": "as-normalizacao-de-rendimento-de-arroz-por-umidade",
    "title": "Normalização de rendimento de arroz por umidade",
    "track": "quality",
    "role": "Analista de qualidade agroalimentar e recursos rurais",
    "positioning": "specialist",
    "scenario": "Um lote vietnamita pesa 1000 kg com 20% de umidade; outro pesa 950 kg com 14%.",
    "decision": "Comparar matéria seca de 800 e 817 kg, evitando concluir superioridade do primeiro pelo peso úmido.",
    "misconception": "Comparar apenas massa bruta dos sacos.",
    "changedConstraint": "O comprador exige apresentação em base de 14% de umidade.",
    "tasks": [
      "Dicionário de base de umidade",
      "Balanço de matéria seca",
      "Conversão para base comercial",
      "Registro de instrumento",
      "Comparação de lotes",
      "Memória de limites da estimativa"
    ],
    "method": "Converta massa seca dividindo pela fração seca desejada para obter massa equivalente. Declare base úmida e preserve método de medição. Variação de umidade não deve ser confundida com ganho de matéria útil. Cadeias agroalimentares exigem rastreabilidade de lotes, condições de coleta e critérios de aceitação. Diferencie observação de campo, resultado laboratorial e hipótese; não invente evidência para completar uma tabela. Expresse resultados em unidade e base consistentes, registrando umidade, massa, período e método quando relevantes. Uma amostra só representa a população sob pressupostos claros e não prova ausência de risco em todo o lote. Use dados fictícios e análises documentais; decisões sanitárias, aplicação de produtos e operação de equipamentos dependem de profissionais habilitados e regras locais. Preserve histórico de transformação e segregação para que uma conclusão possa ser rastreada até as entradas e revisada quando surgir nova informação.",
    "workedExample": "Caso simulado resolvido: Um lote vietnamita pesa 1000 kg com 20% de umidade; outro pesa 950 kg com 14%. Resolução sustentada: Comparar matéria seca de 800 e 817 kg, evitando concluir superioridade do primeiro pelo peso úmido. A alternativa inadequada seria: Comparar apenas massa bruta dos sacos. A diferença entre as duas decisões está no critério técnico: Converta massa seca dividindo pela fração seca desejada para obter massa equivalente. Declare base úmida e preserve método de medição. Variação de umidade não deve ser confundida com ganho de matéria útil. A evidência desta resolução deve aparecer em dicionário de base de umidade e em balanço de matéria seca, permitindo reproduzir a conclusão. Ao introduzir a mudança — o comprador exige apresentação em base de 14% de umidade. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.knowledgebank.irri.org/step-by-step-production/postharvest/drying",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "asia"
  },
  {
    "id": "as-rastreabilidade-de-lotes-em-cooperativas-de-cha",
    "title": "Rastreabilidade de lotes em cooperativas de chá",
    "track": "quality",
    "role": "Analista de qualidade agroalimentar e recursos rurais",
    "positioning": "specialist",
    "scenario": "Uma cooperativa nepalesa mistura folhas de cinco produtores em três secagens sem registrar proporções.",
    "decision": "Identificar perda de rastreabilidade quantitativa e reconstruir relações possíveis sem atribuir origem precisa inexistente.",
    "misconception": "Declarar cada pacote proveniente de um único produtor.",
    "changedConstraint": "Um dos produtores comunica problema no lote inicial.",
    "tasks": [
      "Mapa de genealogia do chá",
      "Livro de mistura",
      "Matriz de relações possíveis",
      "Delimitação de lotes afetados",
      "Plano de retenção documental",
      "Teste de comunicação de problema"
    ],
    "method": "Modele entrada, transformação e saída com identificadores. Mistura exige relação muitos para muitos e registro das quantidades. Uma lacuna limita o alcance da segregação; não crie proporções retroativamente sem evidência. Cadeias agroalimentares exigem rastreabilidade de lotes, condições de coleta e critérios de aceitação. Diferencie observação de campo, resultado laboratorial e hipótese; não invente evidência para completar uma tabela. Expresse resultados em unidade e base consistentes, registrando umidade, massa, período e método quando relevantes. Uma amostra só representa a população sob pressupostos claros e não prova ausência de risco em todo o lote. Use dados fictícios e análises documentais; decisões sanitárias, aplicação de produtos e operação de equipamentos dependem de profissionais habilitados e regras locais. Preserve histórico de transformação e segregação para que uma conclusão possa ser rastreada até as entradas e revisada quando surgir nova informação.",
    "workedExample": "Caso simulado resolvido: Uma cooperativa nepalesa mistura folhas de cinco produtores em três secagens sem registrar proporções. Resolução sustentada: Identificar perda de rastreabilidade quantitativa e reconstruir relações possíveis sem atribuir origem precisa inexistente. A alternativa inadequada seria: Declarar cada pacote proveniente de um único produtor. A diferença entre as duas decisões está no critério técnico: Modele entrada, transformação e saída com identificadores. Mistura exige relação muitos para muitos e registro das quantidades. Uma lacuna limita o alcance da segregação; não crie proporções retroativamente sem evidência. A evidência desta resolução deve aparecer em mapa de genealogia do chá e em livro de mistura, permitindo reproduzir a conclusão. Ao introduzir a mudança — um dos produtores comunica problema no lote inicial. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://ref.gs1.org/standards/global-traceability/",
      "https://ref.gs1.org/standards/epcis/"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-perdas-pos-colheita-em-manga-tropical",
    "title": "Análise de perdas pós-colheita em manga tropical",
    "track": "quality",
    "role": "Analista de qualidade agroalimentar e recursos rurais",
    "positioning": "specialist",
    "scenario": "Um grupo indiano colhe 1000 kg de manga, entrega 850 kg ao entreposto e vende 800 kg. Não há estoque final, consumo próprio ou processamento; os 200 kg restantes são perdas documentadas.",
    "decision": "Separar perdas de 150 kg no transporte e 50 no entreposto, calculando 20% total sobre colheita.",
    "misconception": "Somar percentuais calculados com denominadores diferentes.",
    "changedConstraint": "Cem quilos são destinados a processamento secundário.",
    "tasks": [
      "Balanço por etapa",
      "Taxonomia de destinos",
      "Indicadores com denominador",
      "Registro de aproveitamento",
      "Cenário de processamento",
      "Prioridade de investigação de perdas"
    ],
    "method": "Construa balanço de massa por destino, distinguindo perda, descarte, venda e aproveitamento alternativo. Defina fronteira e qualidade comercial. Reclassificar produto para outro uso não equivale necessariamente a perda física. Cadeias agroalimentares exigem rastreabilidade de lotes, condições de coleta e critérios de aceitação. Diferencie observação de campo, resultado laboratorial e hipótese; não invente evidência para completar uma tabela. Expresse resultados em unidade e base consistentes, registrando umidade, massa, período e método quando relevantes. Uma amostra só representa a população sob pressupostos claros e não prova ausência de risco em todo o lote. Use dados fictícios e análises documentais; decisões sanitárias, aplicação de produtos e operação de equipamentos dependem de profissionais habilitados e regras locais. Preserve histórico de transformação e segregação para que uma conclusão possa ser rastreada até as entradas e revisada quando surgir nova informação.",
    "workedExample": "Caso simulado resolvido: Um grupo indiano colhe 1000 kg de manga, entrega 850 kg ao entreposto e vende 800 kg. Não há estoque final, consumo próprio ou processamento; os 200 kg restantes são perdas documentadas. Resolução sustentada: Separar perdas de 150 kg no transporte e 50 no entreposto, calculando 20% total sobre colheita. A alternativa inadequada seria: Somar percentuais calculados com denominadores diferentes. A diferença entre as duas decisões está no critério técnico: Construa balanço de massa por destino, distinguindo perda, descarte, venda e aproveitamento alternativo. Defina fronteira e qualidade comercial. Reclassificar produto para outro uso não equivale necessariamente a perda física. A evidência desta resolução deve aparecer em balanço por etapa e em taxonomia de destinos, permitindo reproduzir a conclusão. Ao introduzir a mudança — cem quilos são destinados a processamento secundário. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.fao.org/platform-food-loss-waste/en/",
      "https://ref.gs1.org/standards/global-traceability/"
    ],
    "region": "asia"
  },
  {
    "id": "as-controle-documental-de-cadeia-halal-multiforncedor",
    "title": "Controle documental de cadeia halal multiforncedor",
    "track": "quality",
    "role": "Analista de qualidade agroalimentar e recursos rurais",
    "positioning": "specialist",
    "scenario": "Uma fábrica malaia tem evidência válida para quatro ingredientes e certificado vencido para um quinto.",
    "decision": "Registrar lacuna do quinto ingrediente e solicitar verificação pelo organismo e esquema aplicáveis antes da alegação.",
    "misconception": "Considerar todo produto conforme porque a maioria dos ingredientes tem evidência.",
    "changedConstraint": "O fornecedor altera a unidade de fabricação.",
    "tasks": [
      "Matriz de ingredientes e evidências",
      "Registro de validade",
      "Mapa de instalações",
      "Checklist de escopo",
      "Fluxo de atualização de fornecedor",
      "Dossiê para organismo competente"
    ],
    "method": "Separe produto, instalação, validade e escopo da certificação. Um documento não cobre automaticamente todas as unidades ou ingredientes. A análise verifica consistência documental; não emite parecer religioso nem substitui certificação reconhecida. Cadeias agroalimentares exigem rastreabilidade de lotes, condições de coleta e critérios de aceitação. Diferencie observação de campo, resultado laboratorial e hipótese; não invente evidência para completar uma tabela. Expresse resultados em unidade e base consistentes, registrando umidade, massa, período e método quando relevantes. Uma amostra só representa a população sob pressupostos claros e não prova ausência de risco em todo o lote. Use dados fictícios e análises documentais; decisões sanitárias, aplicação de produtos e operação de equipamentos dependem de profissionais habilitados e regras locais. Preserve histórico de transformação e segregação para que uma conclusão possa ser rastreada até as entradas e revisada quando surgir nova informação.",
    "workedExample": "Caso simulado resolvido: Uma fábrica malaia tem evidência válida para quatro ingredientes e certificado vencido para um quinto. Resolução sustentada: Registrar lacuna do quinto ingrediente e solicitar verificação pelo organismo e esquema aplicáveis antes da alegação. A alternativa inadequada seria: Considerar todo produto conforme porque a maioria dos ingredientes tem evidência. A diferença entre as duas decisões está no critério técnico: Separe produto, instalação, validade e escopo da certificação. Um documento não cobre automaticamente todas as unidades ou ingredientes. A análise verifica consistência documental; não emite parecer religioso nem substitui certificação reconhecida. A evidência desta resolução deve aparecer em matriz de ingredientes e evidências e em registro de validade, permitindo reproduzir a conclusão. Ao introduzir a mudança — o fornecedor altera a unidade de fabricação. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.fao.org/4/Y2770E/y2770e08.htm",
      "https://www.fao.org/fao-who-codexalimentarius/codex-texts/guidelines/en/"
    ],
    "region": "asia"
  },
  {
    "id": "as-amostragem-de-qualidade-em-exportacao-de-especiarias",
    "title": "Amostragem de qualidade em exportação de especiarias",
    "track": "quality",
    "role": "Analista de qualidade agroalimentar e recursos rurais",
    "positioning": "specialist",
    "scenario": "Um exportador do Sri Lanka retira dez amostras apenas dos sacos superiores de um lote de 500.",
    "decision": "Reconhecer viés de acesso e redesenhar amostragem com cobertura dos estratos pertinentes.",
    "misconception": "Tratar as dez amostras convenientes como representativas de todo o lote.",
    "changedConstraint": "Os sacos inferiores tiveram exposição distinta à umidade.",
    "tasks": [
      "Plano de população e estratos",
      "Mapa de acesso aos sacos",
      "Procedimento de seleção",
      "Registro de cadeia de custódia",
      "Limites de inferência",
      "Cenário de umidade desigual"
    ],
    "method": "Defina população, unidade amostral e objetivo antes de coletar. Use seleção documentada e estratificação quando houver condições diferentes. Tamanho de amostra não corrige seleção enviesada; resultados devem preservar limites de inferência. Cadeias agroalimentares exigem rastreabilidade de lotes, condições de coleta e critérios de aceitação. Diferencie observação de campo, resultado laboratorial e hipótese; não invente evidência para completar uma tabela. Expresse resultados em unidade e base consistentes, registrando umidade, massa, período e método quando relevantes. Uma amostra só representa a população sob pressupostos claros e não prova ausência de risco em todo o lote. Use dados fictícios e análises documentais; decisões sanitárias, aplicação de produtos e operação de equipamentos dependem de profissionais habilitados e regras locais. Preserve histórico de transformação e segregação para que uma conclusão possa ser rastreada até as entradas e revisada quando surgir nova informação.",
    "workedExample": "Caso simulado resolvido: Um exportador do Sri Lanka retira dez amostras apenas dos sacos superiores de um lote de 500. Resolução sustentada: Reconhecer viés de acesso e redesenhar amostragem com cobertura dos estratos pertinentes. A alternativa inadequada seria: Tratar as dez amostras convenientes como representativas de todo o lote. A diferença entre as duas decisões está no critério técnico: Defina população, unidade amostral e objetivo antes de coletar. Use seleção documentada e estratificação quando houver condições diferentes. Tamanho de amostra não corrige seleção enviesada; resultados devem preservar limites de inferência. A evidência desta resolução deve aparecer em plano de população e estratos e em mapa de acesso aos sacos, permitindo reproduzir a conclusão. Ao introduzir a mudança — os sacos inferiores tiveram exposição distinta à umidade. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.fao.org/4/j2291e/j2291e04.htm",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "asia"
  },
  {
    "id": "as-comparacao-de-produtividade-em-aquicultura-com-sobrevivencia",
    "title": "Comparação de produtividade em aquicultura com sobrevivência",
    "track": "quality",
    "role": "Analista de qualidade agroalimentar e recursos rurais",
    "positioning": "specialist",
    "scenario": "Dois tanques indonésios recebem mil animais; um produz 800 de 200 g e outro 600 de 250 g.",
    "decision": "Calcular biomassas de 160 e 150 kg e sobrevivências de 80% e 60%, sem escolher por peso individual apenas.",
    "misconception": "Declarar o segundo superior por ter animais maiores.",
    "changedConstraint": "Os ciclos têm duração diferente.",
    "tasks": [
      "Balanço de população",
      "Biomassa por tanque",
      "Taxa de sobrevivência",
      "Normalização por duração",
      "Matriz de indicadores",
      "Nota de decisão multidimensional"
    ],
    "method": "Compare biomassa, sobrevivência, duração e insumos em conjunto. Peso médio isolado pode esconder mortalidade. As análises são de registros e não orientam tratamento, alimentação ou intervenção biológica sem especialista. Cadeias agroalimentares exigem rastreabilidade de lotes, condições de coleta e critérios de aceitação. Diferencie observação de campo, resultado laboratorial e hipótese; não invente evidência para completar uma tabela. Expresse resultados em unidade e base consistentes, registrando umidade, massa, período e método quando relevantes. Uma amostra só representa a população sob pressupostos claros e não prova ausência de risco em todo o lote. Use dados fictícios e análises documentais; decisões sanitárias, aplicação de produtos e operação de equipamentos dependem de profissionais habilitados e regras locais. Preserve histórico de transformação e segregação para que uma conclusão possa ser rastreada até as entradas e revisada quando surgir nova informação.",
    "workedExample": "Caso simulado resolvido: Dois tanques indonésios recebem mil animais; um produz 800 de 200 g e outro 600 de 250 g. Resolução sustentada: Calcular biomassas de 160 e 150 kg e sobrevivências de 80% e 60%, sem escolher por peso individual apenas. A alternativa inadequada seria: Declarar o segundo superior por ter animais maiores. A diferença entre as duas decisões está no critério técnico: Compare biomassa, sobrevivência, duração e insumos em conjunto. Peso médio isolado pode esconder mortalidade. As análises são de registros e não orientam tratamento, alimentação ou intervenção biológica sem especialista. A evidência desta resolução deve aparecer em balanço de população e em biomassa por tanque, permitindo reproduzir a conclusão. Ao introduzir a mudança — os ciclos têm duração diferente. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.fao.org/fishery/docs/CDrom/FAO_Training/FAO_Training/General/x6709e/x6709e16.htm",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "asia"
  },
  {
    "id": "as-conciliacao-de-pesos-em-leiloes-digitais-de-pescado",
    "title": "Conciliação de pesos em leilões digitais de pescado",
    "track": "quality",
    "role": "Analista de qualidade agroalimentar e recursos rurais",
    "positioning": "specialist",
    "scenario": "Um leilão japonês registra 120 kg brutos incluindo 12 kg de gelo e embalagem, mas fatura como peso líquido.",
    "decision": "Reconciliar peso líquido de 108 kg e verificar regra contratual de tara antes da cobrança.",
    "misconception": "Faturar os 120 kg como pescado.",
    "changedConstraint": "A tara varia entre tipos de caixa.",
    "tasks": [
      "Dicionário de pesos",
      "Tabela de tara por caixa",
      "Registro de pesagem",
      "Ponte de faturamento",
      "Teste de tara variável",
      "Procedimento de contestação"
    ],
    "method": "Separe peso bruto, tara e líquido, com instrumento e instante conhecidos. Tara média exige justificativa e controle de variação. Preserve identificação do lote e condições de pesagem para permitir revisão comercial. Cadeias agroalimentares exigem rastreabilidade de lotes, condições de coleta e critérios de aceitação. Diferencie observação de campo, resultado laboratorial e hipótese; não invente evidência para completar uma tabela. Expresse resultados em unidade e base consistentes, registrando umidade, massa, período e método quando relevantes. Uma amostra só representa a população sob pressupostos claros e não prova ausência de risco em todo o lote. Use dados fictícios e análises documentais; decisões sanitárias, aplicação de produtos e operação de equipamentos dependem de profissionais habilitados e regras locais. Preserve histórico de transformação e segregação para que uma conclusão possa ser rastreada até as entradas e revisada quando surgir nova informação.",
    "workedExample": "Caso simulado resolvido: Um leilão japonês registra 120 kg brutos incluindo 12 kg de gelo e embalagem, mas fatura como peso líquido. Resolução sustentada: Reconciliar peso líquido de 108 kg e verificar regra contratual de tara antes da cobrança. A alternativa inadequada seria: Faturar os 120 kg como pescado. A diferença entre as duas decisões está no critério técnico: Separe peso bruto, tara e líquido, com instrumento e instante conhecidos. Tara média exige justificativa e controle de variação. Preserve identificação do lote e condições de pesagem para permitir revisão comercial. A evidência desta resolução deve aparecer em dicionário de pesos e em tabela de tara por caixa, permitindo reproduzir a conclusão. Ao introduzir a mudança — a tara varia entre tipos de caixa. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.fao.org/fishery/static/FAO_Training/FAO_Training/General/x6709e/x6709e08.htm",
      "https://www.fao.org/4/t0388e/T0388E03.htm"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-cobertura-de-seguro-parametrico-agricola",
    "title": "Análise de cobertura de seguro paramétrico agrícola",
    "track": "quality",
    "role": "Analista de qualidade agroalimentar e recursos rurais",
    "positioning": "specialist",
    "scenario": "Um produto paga se a chuva medida for inferior a 40 mm; uma fazenda perde produção com estação marcando 45 mm.",
    "decision": "Reconhecer possível risco de base e verificar contrato sem prometer pagamento pela perda observada.",
    "misconception": "Afirmar que todo prejuízo agrícola gera indenização paramétrica.",
    "changedConstraint": "A estação fica 50 km distante da propriedade.",
    "tasks": [
      "Mapa do gatilho",
      "Linha temporal de chuva",
      "Registro de distância da estação",
      "Cenário de risco de base",
      "Quadro de informação ao produtor",
      "Lista de dúvidas para seguradora"
    ],
    "method": "Diferencie perda econômica e gatilho contratual. Compare localização, período e qualidade do índice com o risco da fazenda. A análise explica estrutura e limitações; não recomenda produto financeiro nem interpreta cobertura como parecer jurídico. Cadeias agroalimentares exigem rastreabilidade de lotes, condições de coleta e critérios de aceitação. Diferencie observação de campo, resultado laboratorial e hipótese; não invente evidência para completar uma tabela. Expresse resultados em unidade e base consistentes, registrando umidade, massa, período e método quando relevantes. Uma amostra só representa a população sob pressupostos claros e não prova ausência de risco em todo o lote. Use dados fictícios e análises documentais; decisões sanitárias, aplicação de produtos e operação de equipamentos dependem de profissionais habilitados e regras locais. Preserve histórico de transformação e segregação para que uma conclusão possa ser rastreada até as entradas e revisada quando surgir nova informação.",
    "workedExample": "Caso simulado resolvido: Um produto paga se a chuva medida for inferior a 40 mm; uma fazenda perde produção com estação marcando 45 mm. Resolução sustentada: Reconhecer possível risco de base e verificar contrato sem prometer pagamento pela perda observada. A alternativa inadequada seria: Afirmar que todo prejuízo agrícola gera indenização paramétrica. A diferença entre as duas decisões está no critério técnico: Diferencie perda econômica e gatilho contratual. Compare localização, período e qualidade do índice com o risco da fazenda. A análise explica estrutura e limitações; não recomenda produto financeiro nem interpreta cobertura como parecer jurídico. A evidência desta resolução deve aparecer em mapa do gatilho e em linha temporal de chuva, permitindo reproduzir a conclusão. Ao introduzir a mudança — a estação fica 50 km distante da propriedade. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.ifc.org/en/what-we-do/sector-expertise/financial-institutions/financial-inclusion/insurance",
      "https://documents1.worldbank.org/curated/en/815061467997014687/pdf/97456-BRI-Box391476B-PUBLIC-Agricultural-AI-Concept-Final.pdf"
    ],
    "region": "asia"
  },
  {
    "id": "as-rastreabilidade-documental-de-cafe-com-geolocalizacao",
    "title": "Rastreabilidade documental de café com geolocalização",
    "track": "quality",
    "role": "Analista de qualidade agroalimentar e recursos rurais",
    "positioning": "specialist",
    "scenario": "Uma cooperativa laociana possui coordenadas de 80 parcelas, mas 20 registros apontam para o mesmo centro administrativo.",
    "decision": "Marcar vinte registros como localização inadequada para a finalidade e verificar origem antes de alegar rastreabilidade por parcela.",
    "misconception": "Aceitar coordenada preenchida como prova de localização correta.",
    "changedConstraint": "Uma parcela se divide em duas áreas produtivas.",
    "tasks": [
      "Modelo de parcela",
      "Regras de plausibilidade geográfica",
      "Mapa de registros suspeitos",
      "Histórico de divisão de áreas",
      "Protocolo de verificação consentida",
      "Relatório de cobertura válida"
    ],
    "method": "Valide completude, plausibilidade espacial e vínculo com a unidade produtiva. Coordenada existente não garante precisão. Preserve versão e método de captura e minimize exposição pública de informação sensível de produtores. Cadeias agroalimentares exigem rastreabilidade de lotes, condições de coleta e critérios de aceitação. Diferencie observação de campo, resultado laboratorial e hipótese; não invente evidência para completar uma tabela. Expresse resultados em unidade e base consistentes, registrando umidade, massa, período e método quando relevantes. Uma amostra só representa a população sob pressupostos claros e não prova ausência de risco em todo o lote. Use dados fictícios e análises documentais; decisões sanitárias, aplicação de produtos e operação de equipamentos dependem de profissionais habilitados e regras locais. Preserve histórico de transformação e segregação para que uma conclusão possa ser rastreada até as entradas e revisada quando surgir nova informação.",
    "workedExample": "Caso simulado resolvido: Uma cooperativa laociana possui coordenadas de 80 parcelas, mas 20 registros apontam para o mesmo centro administrativo. Resolução sustentada: Marcar vinte registros como localização inadequada para a finalidade e verificar origem antes de alegar rastreabilidade por parcela. A alternativa inadequada seria: Aceitar coordenada preenchida como prova de localização correta. A diferença entre as duas decisões está no critério técnico: Valide completude, plausibilidade espacial e vínculo com a unidade produtiva. Coordenada existente não garante precisão. Preserve versão e método de captura e minimize exposição pública de informação sensível de produtores. A evidência desta resolução deve aparecer em modelo de parcela e em regras de plausibilidade geográfica, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma parcela se divide em duas áreas produtivas. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://docs.qgis.org/latest/en/docs/user_manual/processing_algs/qgis/vectorgeometry.html",
      "https://docs.qgis.org/latest/en/docs/gentle_gis_introduction/coordinate_reference_systems.html"
    ],
    "region": "asia"
  },
  {
    "id": "as-planejamento-de-janelas-de-colheita-em-cooperativas-de-frutas",
    "title": "Planejamento de janelas de colheita em cooperativas de frutas",
    "track": "quality",
    "role": "Analista de qualidade agroalimentar e recursos rurais",
    "positioning": "specialist",
    "scenario": "Uma cooperativa tailandesa prevê 30 toneladas/dia por quatro dias e dispõe de processamento de 25/dia sem armazenamento adicional.",
    "decision": "Identificar excedente acumulado de vinte toneladas e negociar escalonamento ou destino alternativo.",
    "misconception": "Usar capacidade semanal para afirmar ausência de gargalo diário.",
    "changedConstraint": "A chuva concentra colheita em dois dias.",
    "tasks": [
      "Curva diária de oferta",
      "Capacidade de processamento",
      "Balanço de excedente",
      "Mapa de destinos alternativos",
      "Cenário de chuva",
      "Plano de coordenação com produtores"
    ],
    "method": "Modele oferta e capacidade no tempo, incluindo perecibilidade e critérios de qualidade. Estoque não é solução ilimitada para produto perecível. Registre hipóteses agronômicas para validação técnica antes de alterar colheita real. Cadeias agroalimentares exigem rastreabilidade de lotes, condições de coleta e critérios de aceitação. Diferencie observação de campo, resultado laboratorial e hipótese; não invente evidência para completar uma tabela. Expresse resultados em unidade e base consistentes, registrando umidade, massa, período e método quando relevantes. Uma amostra só representa a população sob pressupostos claros e não prova ausência de risco em todo o lote. Use dados fictícios e análises documentais; decisões sanitárias, aplicação de produtos e operação de equipamentos dependem de profissionais habilitados e regras locais. Preserve histórico de transformação e segregação para que uma conclusão possa ser rastreada até as entradas e revisada quando surgir nova informação.",
    "workedExample": "Caso simulado resolvido: Uma cooperativa tailandesa prevê 30 toneladas/dia por quatro dias e dispõe de processamento de 25/dia sem armazenamento adicional. Resolução sustentada: Identificar excedente acumulado de vinte toneladas e negociar escalonamento ou destino alternativo. A alternativa inadequada seria: Usar capacidade semanal para afirmar ausência de gargalo diário. A diferença entre as duas decisões está no critério técnico: Modele oferta e capacidade no tempo, incluindo perecibilidade e critérios de qualidade. Estoque não é solução ilimitada para produto perecível. Registre hipóteses agronômicas para validação técnica antes de alterar colheita real. A evidência desta resolução deve aparecer em curva diária de oferta e em capacidade de processamento, permitindo reproduzir a conclusão. Ao introduzir a mudança — a chuva concentra colheita em dois dias. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://simpy.readthedocs.io/en/latest/simpy_intro/index.html",
      "https://www.fao.org/platform-food-loss-waste/en/"
    ],
    "region": "asia"
  },
  {
    "id": "as-seguranca-de-recuperacao-de-conta-em-aplicativos-superapp",
    "title": "Segurança de recuperação de conta em aplicativos superapp",
    "track": "cyber",
    "role": "Analista de segurança operacional e confiança digital",
    "positioning": "broad",
    "scenario": "Um superapp em Singapura exige MFA no login, mas redefine senha apenas com data de nascimento pública.",
    "decision": "Tratar recuperação como caminho crítico e exigir verificação proporcional equivalente ao risco.",
    "misconception": "Declarar conta segura apenas porque o login tem MFA.",
    "changedConstraint": "O usuário perde o telefone e o email simultaneamente.",
    "tasks": [
      "Mapa de caminhos de recuperação",
      "Modelo de ameaça",
      "Matriz de fatores disponíveis",
      "Casos de perda simultânea",
      "Teste autorizado de enumeração",
      "Plano de recuperação assistida"
    ],
    "method": "Mapeie todos os caminhos para reassumir controle da conta. A resistência do login é limitada pelo caminho de recuperação mais fraco. Teste exceções com contas próprias e registre proteção contra enumeração. Uma avaliação de segurança começa por autorização, ativos, fronteiras e critérios de evidência. Execute somente testes em ambiente próprio ou explicitamente autorizado, usando contas e dados fictícios. Diferencie vulnerabilidade possível, exploração demonstrada em laboratório e incidente confirmado; cada conclusão exige evidência proporcional. Registre identidade, escopo, prazo e responsável por mudanças. Uma medida de controle pode reduzir um risco e criar outro, como indisponibilidade ou exclusão. Compare alternativas mantendo requisitos de negócio e recuperação. Preserve registros mínimos e acesso restrito, sem expor segredos. A documentação do laboratório deve permitir reproduzir a verificação e desfazer alterações de teste, deixando claro o que permaneceu fora de escopo.",
    "workedExample": "Caso simulado resolvido: Um superapp em Singapura exige MFA no login, mas redefine senha apenas com data de nascimento pública. Resolução sustentada: Tratar recuperação como caminho crítico e exigir verificação proporcional equivalente ao risco. A alternativa inadequada seria: Declarar conta segura apenas porque o login tem MFA. A diferença entre as duas decisões está no critério técnico: Mapeie todos os caminhos para reassumir controle da conta. A resistência do login é limitada pelo caminho de recuperação mais fraco. Teste exceções com contas próprias e registre proteção contra enumeração. A evidência desta resolução deve aparecer em mapa de caminhos de recuperação e em modelo de ameaça, permitindo reproduzir a conclusão. Ao introduzir a mudança — o usuário perde o telefone e o email simultaneamente. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html",
      "https://pages.nist.gov/800-63-4/"
    ],
    "region": "asia"
  },
  {
    "id": "as-gestao-de-acesso-temporario-de-fornecedores-em-fabricas-conectadas",
    "title": "Gestão de acesso temporário de fornecedores em fábricas conectadas",
    "track": "cyber",
    "role": "Analista de segurança operacional e confiança digital",
    "positioning": "broad",
    "scenario": "Um integrador sul-coreano recebe acesso por sete dias; a conta continua ativa após sessenta.",
    "decision": "Revogar acesso conforme processo autorizado e corrigir expiração automática com responsável identificado.",
    "misconception": "Manter acesso permanente por conveniência de suporte.",
    "changedConstraint": "O fornecedor precisa retornar para uma emergência.",
    "tasks": [
      "Inventário de acessos externos",
      "Matriz de privilégios",
      "Registro de aprovação",
      "Regra de expiração",
      "Fluxo de acesso emergencial",
      "Teste de desativação"
    ],
    "method": "Modele acesso com finalidade, privilégio mínimo, aprovador e prazo. Emergência deve ter fluxo próprio e rastreável, não exceção permanente. Separe conta individual de conta compartilhada e verifique encerramento efetivo. Uma avaliação de segurança começa por autorização, ativos, fronteiras e critérios de evidência. Execute somente testes em ambiente próprio ou explicitamente autorizado, usando contas e dados fictícios. Diferencie vulnerabilidade possível, exploração demonstrada em laboratório e incidente confirmado; cada conclusão exige evidência proporcional. Registre identidade, escopo, prazo e responsável por mudanças. Uma medida de controle pode reduzir um risco e criar outro, como indisponibilidade ou exclusão. Compare alternativas mantendo requisitos de negócio e recuperação. Preserve registros mínimos e acesso restrito, sem expor segredos. A documentação do laboratório deve permitir reproduzir a verificação e desfazer alterações de teste, deixando claro o que permaneceu fora de escopo.",
    "workedExample": "Caso simulado resolvido: Um integrador sul-coreano recebe acesso por sete dias; a conta continua ativa após sessenta. Resolução sustentada: Revogar acesso conforme processo autorizado e corrigir expiração automática com responsável identificado. A alternativa inadequada seria: Manter acesso permanente por conveniência de suporte. A diferença entre as duas decisões está no critério técnico: Modele acesso com finalidade, privilégio mínimo, aprovador e prazo. Emergência deve ter fluxo próprio e rastreável, não exceção permanente. Separe conta individual de conta compartilhada e verifique encerramento efetivo. A evidência desta resolução deve aparecer em inventário de acessos externos e em matriz de privilégios, permitindo reproduzir a conclusão. Ao introduzir a mudança — o fornecedor precisa retornar para uma emergência. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
      "https://pages.nist.gov/800-63-4/"
    ],
    "region": "asia"
  },
  {
    "id": "as-qualidade-de-logs-de-autenticacao-em-fusos-asiaticos",
    "title": "Qualidade de logs de autenticação em fusos asiáticos",
    "track": "cyber",
    "role": "Analista de segurança operacional e confiança digital",
    "positioning": "broad",
    "scenario": "Um serviço japonês registra 09h local e outro UTC; a análise interpreta eventos como nove horas separados.",
    "decision": "Normalizar instantes preservando fuso original e distinguir horário de captura e ingestão.",
    "misconception": "Ordenar os textos de data sem converter fusos.",
    "changedConstraint": "Um cliente envia relógio incorreto.",
    "tasks": [
      "Esquema de timestamp",
      "Conversão de fuso",
      "Teste de relógio incorreto",
      "Correlação de identificadores",
      "Linha temporal reconstruída",
      "Registro de incerteza temporal"
    ],
    "method": "Use formato inequívoco e fonte temporal conhecida. Horários fornecidos pelo cliente podem ser manipulados ou estar errados. Correlacione identificadores e latência antes de concluir sequência causal entre eventos. Uma avaliação de segurança começa por autorização, ativos, fronteiras e critérios de evidência. Execute somente testes em ambiente próprio ou explicitamente autorizado, usando contas e dados fictícios. Diferencie vulnerabilidade possível, exploração demonstrada em laboratório e incidente confirmado; cada conclusão exige evidência proporcional. Registre identidade, escopo, prazo e responsável por mudanças. Uma medida de controle pode reduzir um risco e criar outro, como indisponibilidade ou exclusão. Compare alternativas mantendo requisitos de negócio e recuperação. Preserve registros mínimos e acesso restrito, sem expor segredos. A documentação do laboratório deve permitir reproduzir a verificação e desfazer alterações de teste, deixando claro o que permaneceu fora de escopo.",
    "workedExample": "Caso simulado resolvido: Um serviço japonês registra 09h local e outro UTC; a análise interpreta eventos como nove horas separados. Resolução sustentada: Normalizar instantes preservando fuso original e distinguir horário de captura e ingestão. A alternativa inadequada seria: Ordenar os textos de data sem converter fusos. A diferença entre as duas decisões está no critério técnico: Use formato inequívoco e fonte temporal conhecida. Horários fornecidos pelo cliente podem ser manipulados ou estar errados. Correlacione identificadores e latência antes de concluir sequência causal entre eventos. A evidência desta resolução deve aparecer em esquema de timestamp e em conversão de fuso, permitindo reproduzir a conclusão. Ao introduzir a mudança — um cliente envia relógio incorreto. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html",
      "https://docs.python.org/3/library/datetime.html"
    ],
    "region": "asia"
  },
  {
    "id": "as-minimizacao-de-dados-em-verificacao-digital-de-identidade",
    "title": "Minimização de dados em verificação digital de identidade",
    "track": "cyber",
    "role": "Analista de segurança operacional e confiança digital",
    "positioning": "broad",
    "scenario": "Uma plataforma indiana guarda imagem integral do documento para uma função que só precisa confirmar maioridade.",
    "decision": "Reavaliar necessidade e guardar evidência mínima compatível com obrigação aplicável e finalidade.",
    "misconception": "Manter cópias indefinidamente porque armazenamento é barato.",
    "changedConstraint": "Surge exigência legítima de auditoria por prazo definido.",
    "tasks": [
      "Inventário de atributos",
      "Matriz finalidade e necessidade",
      "Política de retenção",
      "Mapa de acesso",
      "Cenário de auditoria",
      "Teste de exclusão no prazo"
    ],
    "method": "Faça inventário por campo, finalidade, base aplicável, retenção e acesso. Minimize coleta sem eliminar evidência legalmente necessária. Não assuma que consentimento genérico permite qualquer reutilização ou divulgação. Uma avaliação de segurança começa por autorização, ativos, fronteiras e critérios de evidência. Execute somente testes em ambiente próprio ou explicitamente autorizado, usando contas e dados fictícios. Diferencie vulnerabilidade possível, exploração demonstrada em laboratório e incidente confirmado; cada conclusão exige evidência proporcional. Registre identidade, escopo, prazo e responsável por mudanças. Uma medida de controle pode reduzir um risco e criar outro, como indisponibilidade ou exclusão. Compare alternativas mantendo requisitos de negócio e recuperação. Preserve registros mínimos e acesso restrito, sem expor segredos. A documentação do laboratório deve permitir reproduzir a verificação e desfazer alterações de teste, deixando claro o que permaneceu fora de escopo.",
    "workedExample": "Caso simulado resolvido: Uma plataforma indiana guarda imagem integral do documento para uma função que só precisa confirmar maioridade. Resolução sustentada: Reavaliar necessidade e guardar evidência mínima compatível com obrigação aplicável e finalidade. A alternativa inadequada seria: Manter cópias indefinidamente porque armazenamento é barato. A diferença entre as duas decisões está no critério técnico: Faça inventário por campo, finalidade, base aplicável, retenção e acesso. Minimize coleta sem eliminar evidência legalmente necessária. Não assuma que consentimento genérico permite qualquer reutilização ou divulgação. A evidência desta resolução deve aparecer em inventário de atributos e em matriz finalidade e necessidade, permitindo reproduzir a conclusão. Ao introduzir a mudança — surge exigência legítima de auditoria por prazo definido. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.nist.gov/privacy-framework",
      "https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en"
    ],
    "region": "asia"
  },
  {
    "id": "as-validacao-de-segmentacao-em-redes-de-edificios-inteligentes",
    "title": "Validação de segmentação em redes de edifícios inteligentes",
    "track": "cyber",
    "role": "Analista de segurança operacional e confiança digital",
    "positioning": "specialist",
    "scenario": "Uma simulação de prédio no Golfo coloca câmeras e sistema de pagamentos na mesma rede plana.",
    "decision": "Definir fronteiras e testar regras de comunicação estritamente necessárias em laboratório.",
    "misconception": "Permitir comunicação irrestrita porque os dispositivos estão no mesmo prédio.",
    "changedConstraint": "O suporte remoto exige acesso a uma câmera específica.",
    "tasks": [
      "Inventário de zonas",
      "Matriz de fluxos",
      "Regras de menor privilégio",
      "Plano de teste autorizado",
      "Exceção de suporte limitada",
      "Relatório de comunicação bloqueada"
    ],
    "method": "Mapeie fluxos por origem, destino, serviço e finalidade. Segmentação só funciona se regras e caminhos alternativos forem verificados. Teste permissão e negação com dados fictícios sem interferir em sistemas prediais reais. Uma avaliação de segurança começa por autorização, ativos, fronteiras e critérios de evidência. Execute somente testes em ambiente próprio ou explicitamente autorizado, usando contas e dados fictícios. Diferencie vulnerabilidade possível, exploração demonstrada em laboratório e incidente confirmado; cada conclusão exige evidência proporcional. Registre identidade, escopo, prazo e responsável por mudanças. Uma medida de controle pode reduzir um risco e criar outro, como indisponibilidade ou exclusão. Compare alternativas mantendo requisitos de negócio e recuperação. Preserve registros mínimos e acesso restrito, sem expor segredos. A documentação do laboratório deve permitir reproduzir a verificação e desfazer alterações de teste, deixando claro o que permaneceu fora de escopo.",
    "workedExample": "Caso simulado resolvido: Uma simulação de prédio no Golfo coloca câmeras e sistema de pagamentos na mesma rede plana. Resolução sustentada: Definir fronteiras e testar regras de comunicação estritamente necessárias em laboratório. A alternativa inadequada seria: Permitir comunicação irrestrita porque os dispositivos estão no mesmo prédio. A diferença entre as duas decisões está no critério técnico: Mapeie fluxos por origem, destino, serviço e finalidade. Segmentação só funciona se regras e caminhos alternativos forem verificados. Teste permissão e negação com dados fictícios sem interferir em sistemas prediais reais. A evidência desta resolução deve aparecer em inventário de zonas e em matriz de fluxos, permitindo reproduzir a conclusão. Ao introduzir a mudança — o suporte remoto exige acesso a uma câmera específica. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://csrc.nist.gov/pubs/sp/800/82/r3/final",
      "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-risco-de-dependencias-em-software-de-exportacao",
    "title": "Análise de risco de dependências em software de exportação",
    "track": "cyber",
    "role": "Analista de segurança operacional e confiança digital",
    "positioning": "specialist",
    "scenario": "Um fornecedor vietnamita mantém 100 bibliotecas, dez sem versão registrada e duas com alerta não confirmado.",
    "decision": "Completar inventário e avaliar aplicabilidade dos alertas antes de declarar produto vulnerável ou seguro.",
    "misconception": "Tratar ausência de versão como ausência de risco.",
    "changedConstraint": "Uma biblioteca é carregada apenas em módulo opcional.",
    "tasks": [
      "Inventário de componentes",
      "Registro de versões ausentes",
      "Mapa de caminhos de uso",
      "Triagem de alertas",
      "Plano de atualização",
      "Evidência de regressão"
    ],
    "method": "Relacione componente, versão, origem e caminho de uso. Um alerta precisa de contexto e alcance; ausência de alerta não comprova segurança. Priorize correções por exposição e impacto, preservando compatibilidade e teste de regressão. Uma avaliação de segurança começa por autorização, ativos, fronteiras e critérios de evidência. Execute somente testes em ambiente próprio ou explicitamente autorizado, usando contas e dados fictícios. Diferencie vulnerabilidade possível, exploração demonstrada em laboratório e incidente confirmado; cada conclusão exige evidência proporcional. Registre identidade, escopo, prazo e responsável por mudanças. Uma medida de controle pode reduzir um risco e criar outro, como indisponibilidade ou exclusão. Compare alternativas mantendo requisitos de negócio e recuperação. Preserve registros mínimos e acesso restrito, sem expor segredos. A documentação do laboratório deve permitir reproduzir a verificação e desfazer alterações de teste, deixando claro o que permaneceu fora de escopo.",
    "workedExample": "Caso simulado resolvido: Um fornecedor vietnamita mantém 100 bibliotecas, dez sem versão registrada e duas com alerta não confirmado. Resolução sustentada: Completar inventário e avaliar aplicabilidade dos alertas antes de declarar produto vulnerável ou seguro. A alternativa inadequada seria: Tratar ausência de versão como ausência de risco. A diferença entre as duas decisões está no critério técnico: Relacione componente, versão, origem e caminho de uso. Um alerta precisa de contexto e alcance; ausência de alerta não comprova segurança. Priorize correções por exposição e impacto, preservando compatibilidade e teste de regressão. A evidência desta resolução deve aparecer em inventário de componentes e em registro de versões ausentes, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma biblioteca é carregada apenas em módulo opcional. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.cisa.gov/sbom",
      "https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts"
    ],
    "region": "asia"
  },
  {
    "id": "as-controle-de-compartilhamento-de-arquivos-em-equipes-offshore",
    "title": "Controle de compartilhamento de arquivos em equipes offshore",
    "track": "cyber",
    "role": "Analista de segurança operacional e confiança digital",
    "positioning": "specialist",
    "scenario": "Uma equipe filipina compartilha vinte pastas; cinco permitem acesso público embora contenham contratos internos fictícios.",
    "decision": "Restringir as cinco conforme necessidade e revisar links e acessos efetivos com usuários de teste.",
    "misconception": "Confiar apenas no nome confidencial da pasta.",
    "changedConstraint": "Um cliente precisa acesso externo somente a um documento.",
    "tasks": [
      "Inventário de compartilhamento",
      "Mapa de herança",
      "Teste de acesso efetivo",
      "Plano de correção de links",
      "Exceção por documento",
      "Registro de revisão periódica"
    ],
    "method": "Avalie permissões herdadas, links e grupos em conjunto. Um acesso removido por um caminho pode persistir por outro. Conceda escopo mínimo e prazo quando suportado, verificando a experiência do destinatário autorizado. Uma avaliação de segurança começa por autorização, ativos, fronteiras e critérios de evidência. Execute somente testes em ambiente próprio ou explicitamente autorizado, usando contas e dados fictícios. Diferencie vulnerabilidade possível, exploração demonstrada em laboratório e incidente confirmado; cada conclusão exige evidência proporcional. Registre identidade, escopo, prazo e responsável por mudanças. Uma medida de controle pode reduzir um risco e criar outro, como indisponibilidade ou exclusão. Compare alternativas mantendo requisitos de negócio e recuperação. Preserve registros mínimos e acesso restrito, sem expor segredos. A documentação do laboratório deve permitir reproduzir a verificação e desfazer alterações de teste, deixando claro o que permaneceu fora de escopo.",
    "workedExample": "Caso simulado resolvido: Uma equipe filipina compartilha vinte pastas; cinco permitem acesso público embora contenham contratos internos fictícios. Resolução sustentada: Restringir as cinco conforme necessidade e revisar links e acessos efetivos com usuários de teste. A alternativa inadequada seria: Confiar apenas no nome confidencial da pasta. A diferença entre as duas decisões está no critério técnico: Avalie permissões herdadas, links e grupos em conjunto. Um acesso removido por um caminho pode persistir por outro. Conceda escopo mínimo e prazo quando suportado, verificando a experiência do destinatário autorizado. A evidência desta resolução deve aparecer em inventário de compartilhamento e em mapa de herança, permitindo reproduzir a conclusão. Ao introduzir a mudança — um cliente precisa acesso externo somente a um documento. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://learn.microsoft.com/en-us/sharepoint/external-sharing-overview",
      "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
    ],
    "region": "asia"
  },
  {
    "id": "as-teste-de-revogacao-de-sessoes-em-plataformas-de-ensino",
    "title": "Teste de revogação de sessões em plataformas de ensino",
    "track": "cyber",
    "role": "Analista de segurança operacional e confiança digital",
    "positioning": "specialist",
    "scenario": "Um portal malaio muda senha, mas três sessões antigas continuam operando em dispositivos diferentes.",
    "decision": "Verificar política de revogação e invalidar sessões conforme risco e fluxo autorizado, incluindo tokens de renovação.",
    "misconception": "Considerar mudança de senha suficiente sem testar sessões existentes.",
    "changedConstraint": "Uma sessão possui token offline ainda válido.",
    "tasks": [
      "Modelo de ciclo de sessão",
      "Matriz de eventos de revogação",
      "Teste multidispositivo",
      "Inventário de tokens residuais",
      "Regra de operação sensível",
      "Relatório de limite temporal"
    ],
    "method": "Diferencie credencial, sessão e token de renovação. Defina eventos de revogação e tempo máximo residual. Teste várias sessões próprias e operações sensíveis após revogação para verificar aplicação real no servidor. Uma avaliação de segurança começa por autorização, ativos, fronteiras e critérios de evidência. Execute somente testes em ambiente próprio ou explicitamente autorizado, usando contas e dados fictícios. Diferencie vulnerabilidade possível, exploração demonstrada em laboratório e incidente confirmado; cada conclusão exige evidência proporcional. Registre identidade, escopo, prazo e responsável por mudanças. Uma medida de controle pode reduzir um risco e criar outro, como indisponibilidade ou exclusão. Compare alternativas mantendo requisitos de negócio e recuperação. Preserve registros mínimos e acesso restrito, sem expor segredos. A documentação do laboratório deve permitir reproduzir a verificação e desfazer alterações de teste, deixando claro o que permaneceu fora de escopo.",
    "workedExample": "Caso simulado resolvido: Um portal malaio muda senha, mas três sessões antigas continuam operando em dispositivos diferentes. Resolução sustentada: Verificar política de revogação e invalidar sessões conforme risco e fluxo autorizado, incluindo tokens de renovação. A alternativa inadequada seria: Considerar mudança de senha suficiente sem testar sessões existentes. A diferença entre as duas decisões está no critério técnico: Diferencie credencial, sessão e token de renovação. Defina eventos de revogação e tempo máximo residual. Teste várias sessões próprias e operações sensíveis após revogação para verificar aplicação real no servidor. A evidência desta resolução deve aparecer em modelo de ciclo de sessão e em matriz de eventos de revogação, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma sessão possui token offline ainda válido. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html",
      "https://pages.nist.gov/800-63-4/"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-engenharia-social-em-recrutamento-internacional-remoto",
    "title": "Análise de engenharia social em recrutamento internacional remoto",
    "track": "cyber",
    "role": "Analista de segurança operacional e confiança digital",
    "positioning": "specialist",
    "scenario": "Um candidato no Paquistão recebe oferta com pedido de taxa antecipada e domínio semelhante ao da empresa.",
    "decision": "Verificar por canal independente e não enviar dinheiro ou documentos até esclarecer legitimidade.",
    "misconception": "Tratar logotipo e assinatura como prova suficiente.",
    "changedConstraint": "O remetente usa conta comprometida de parceiro conhecido.",
    "tasks": [
      "Checklist de sinais de oferta",
      "Mapa de canais independentes",
      "Comparação de domínios",
      "Roteiro de verificação",
      "Cenário de conta comprometida",
      "Plano de proteção de documentos"
    ],
    "method": "Separe sinais de alerta de conclusão definitiva. Verifique domínio, processo e pessoa por canal obtido independentemente. Evite responder com dados sensíveis e preserve evidências minimizadas para avaliação, sem realizar investigação invasiva. Uma avaliação de segurança começa por autorização, ativos, fronteiras e critérios de evidência. Execute somente testes em ambiente próprio ou explicitamente autorizado, usando contas e dados fictícios. Diferencie vulnerabilidade possível, exploração demonstrada em laboratório e incidente confirmado; cada conclusão exige evidência proporcional. Registre identidade, escopo, prazo e responsável por mudanças. Uma medida de controle pode reduzir um risco e criar outro, como indisponibilidade ou exclusão. Compare alternativas mantendo requisitos de negócio e recuperação. Preserve registros mínimos e acesso restrito, sem expor segredos. A documentação do laboratório deve permitir reproduzir a verificação e desfazer alterações de teste, deixando claro o que permaneceu fora de escopo.",
    "workedExample": "Caso simulado resolvido: Um candidato no Paquistão recebe oferta com pedido de taxa antecipada e domínio semelhante ao da empresa. Resolução sustentada: Verificar por canal independente e não enviar dinheiro ou documentos até esclarecer legitimidade. A alternativa inadequada seria: Tratar logotipo e assinatura como prova suficiente. A diferença entre as duas decisões está no critério técnico: Separe sinais de alerta de conclusão definitiva. Verifique domínio, processo e pessoa por canal obtido independentemente. Evite responder com dados sensíveis e preserve evidências minimizadas para avaliação, sem realizar investigação invasiva. A evidência desta resolução deve aparecer em checklist de sinais de oferta e em mapa de canais independentes, permitindo reproduzir a conclusão. Ao introduzir a mudança — o remetente usa conta comprometida de parceiro conhecido. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.cisa.gov/secure-our-world/recognize-and-report-phishing",
      "https://consumer.ftc.gov/articles/job-scams"
    ],
    "region": "asia"
  },
  {
    "id": "as-governanca-de-segredos-em-automacoes-empresariais-low-code",
    "title": "Governança de segredos em automações empresariais low-code",
    "track": "cyber",
    "role": "Analista de segurança operacional e confiança digital",
    "positioning": "specialist",
    "scenario": "Uma equipe tailandesa cola credencial em três fluxos e no histórico de chat de suporte.",
    "decision": "Conter exposição e rotacionar a credencial pelo processo autorizado, substituindo cópias por gestão apropriada.",
    "misconception": "Apagar somente a mensagem visível e manter a mesma credencial.",
    "changedConstraint": "Um fluxo crítico depende da credencial antiga.",
    "tasks": [
      "Mapa de dependências do segredo",
      "Plano de contenção",
      "Sequência de rotação",
      "Configuração de acesso mínimo",
      "Teste sem exposição de valor",
      "Registro de encerramento"
    ],
    "method": "Inventarie cópias, permissões e dependências antes de rotacionar. Segredo exposto deve ser tratado como potencialmente comprometido. Planeje troca coordenada e verificação de funcionamento sem imprimir valores sensíveis em logs ou relatórios. Uma avaliação de segurança começa por autorização, ativos, fronteiras e critérios de evidência. Execute somente testes em ambiente próprio ou explicitamente autorizado, usando contas e dados fictícios. Diferencie vulnerabilidade possível, exploração demonstrada em laboratório e incidente confirmado; cada conclusão exige evidência proporcional. Registre identidade, escopo, prazo e responsável por mudanças. Uma medida de controle pode reduzir um risco e criar outro, como indisponibilidade ou exclusão. Compare alternativas mantendo requisitos de negócio e recuperação. Preserve registros mínimos e acesso restrito, sem expor segredos. A documentação do laboratório deve permitir reproduzir a verificação e desfazer alterações de teste, deixando claro o que permaneceu fora de escopo.",
    "workedExample": "Caso simulado resolvido: Uma equipe tailandesa cola credencial em três fluxos e no histórico de chat de suporte. Resolução sustentada: Conter exposição e rotacionar a credencial pelo processo autorizado, substituindo cópias por gestão apropriada. A alternativa inadequada seria: Apagar somente a mensagem visível e manter a mesma credencial. A diferença entre as duas decisões está no critério técnico: Inventarie cópias, permissões e dependências antes de rotacionar. Segredo exposto deve ser tratado como potencialmente comprometido. Planeje troca coordenada e verificação de funcionamento sem imprimir valores sensíveis em logs ou relatórios. A evidência desta resolução deve aparecer em mapa de dependências do segredo e em plano de contenção, permitindo reproduzir a conclusão. Ao introduzir a mudança — um fluxo crítico depende da credencial antiga. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
    ],
    "region": "asia"
  },
  {
    "id": "as-localizacao-de-interfaces-para-escrita-vertical-japonesa",
    "title": "Localização de interfaces para escrita vertical japonesa",
    "track": "content",
    "role": "Especialista em experiências digitais e patrimônio cultural",
    "positioning": "specialist",
    "scenario": "Uma interface japonesa apresenta dez rótulos em modo vertical; três códigos alfanuméricos tornam-se ilegíveis.",
    "decision": "Definir tratamento por tipo de conteúdo e testar legibilidade e navegação antes de publicar.",
    "misconception": "Aplicar rotação uniforme a todo texto.",
    "changedConstraint": "Um leitor de tela anuncia a ordem incorreta.",
    "tasks": [
      "Mapa de direção de escrita",
      "Protótipo de rótulos",
      "Regra de orientação de códigos",
      "Ordem semântica",
      "Teste de leitor de tela",
      "Guia de exceções tipográficas"
    ],
    "method": "Separe direção visual, ordem semântica e orientação de glifos. Escrita vertical não é simplesmente texto horizontal rotacionado. Preserve sequência de leitura no documento e teste códigos, números e conteúdo misto. Uma experiência digital deve preservar significado, direitos e acessibilidade em todo o ciclo de publicação. Identifique público, tarefa, idioma, canal e critério observável de sucesso antes de escolher formato. Separe licença do conteúdo, consentimento de pessoas retratadas e permissão do local ou acervo; uma não substitui automaticamente as outras. Use estrutura semântica e alternativas acessíveis e teste com cenários reais consentidos. Avalie desempenho por compreensão e conclusão de tarefa, evitando métricas de visualização como prova de aprendizagem ou benefício. Documente fontes e versões sem apresentar conteúdo sintético como registro histórico. O exercício não concede direitos autorais, representação cultural, reconhecimento acadêmico ou autorização institucional.",
    "workedExample": "Caso simulado resolvido: Uma interface japonesa apresenta dez rótulos em modo vertical; três códigos alfanuméricos tornam-se ilegíveis. Resolução sustentada: Definir tratamento por tipo de conteúdo e testar legibilidade e navegação antes de publicar. A alternativa inadequada seria: Aplicar rotação uniforme a todo texto. A diferença entre as duas decisões está no critério técnico: Separe direção visual, ordem semântica e orientação de glifos. Escrita vertical não é simplesmente texto horizontal rotacionado. Preserve sequência de leitura no documento e teste códigos, números e conteúdo misto. A evidência desta resolução deve aparecer em mapa de direção de escrita e em protótipo de rótulos, permitindo reproduzir a conclusão. Ao introduzir a mudança — um leitor de tela anuncia a ordem incorreta. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.w3.org/TR/jlreq/",
      "https://www.w3.org/International/techniques/authoring-html.en"
    ],
    "region": "asia"
  },
  {
    "id": "as-adaptacao-cultural-de-tutoriais-de-produtos-para-a-india",
    "title": "Adaptação cultural de tutoriais de produtos para a Índia",
    "track": "content",
    "role": "Especialista em experiências digitais e patrimônio cultural",
    "positioning": "specialist",
    "scenario": "Um tutorial usa endereço, moeda e calendário estrangeiros; 18 de 30 participantes erram a etapa de cadastro.",
    "decision": "Investigar exemplos e rótulos locais e testar revisão, mantendo requisitos reais do produto.",
    "misconception": "Traduzir palavras sem adaptar exemplos ou verificar compreensão.",
    "changedConstraint": "O produto atende usuários de três idiomas indianos.",
    "tasks": [
      "Inventário de pressupostos culturais",
      "Matriz de formatos locais",
      "Roteiro revisado",
      "Amostra por idioma",
      "Teste de cadastro",
      "Registro de mudanças editoriais"
    ],
    "method": "Localização envolve formatos, exemplos, contexto e acessibilidade, além de tradução. Separe requisito funcional de escolha editorial. Teste a tarefa em cada público sem presumir que um idioma represente toda a região. Uma experiência digital deve preservar significado, direitos e acessibilidade em todo o ciclo de publicação. Identifique público, tarefa, idioma, canal e critério observável de sucesso antes de escolher formato. Separe licença do conteúdo, consentimento de pessoas retratadas e permissão do local ou acervo; uma não substitui automaticamente as outras. Use estrutura semântica e alternativas acessíveis e teste com cenários reais consentidos. Avalie desempenho por compreensão e conclusão de tarefa, evitando métricas de visualização como prova de aprendizagem ou benefício. Documente fontes e versões sem apresentar conteúdo sintético como registro histórico. O exercício não concede direitos autorais, representação cultural, reconhecimento acadêmico ou autorização institucional.",
    "workedExample": "Caso simulado resolvido: Um tutorial usa endereço, moeda e calendário estrangeiros; 18 de 30 participantes erram a etapa de cadastro. Resolução sustentada: Investigar exemplos e rótulos locais e testar revisão, mantendo requisitos reais do produto. A alternativa inadequada seria: Traduzir palavras sem adaptar exemplos ou verificar compreensão. A diferença entre as duas decisões está no critério técnico: Localização envolve formatos, exemplos, contexto e acessibilidade, além de tradução. Separe requisito funcional de escolha editorial. Teste a tarefa em cada público sem presumir que um idioma represente toda a região. A evidência desta resolução deve aparecer em inventário de pressupostos culturais e em matriz de formatos locais, permitindo reproduzir a conclusão. Ao introduzir a mudança — o produto atende usuários de três idiomas indianos. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.w3.org/International/techniques/authoring-html.en",
      "https://www.w3.org/TR/coga-usable/"
    ],
    "region": "asia"
  },
  {
    "id": "as-curadoria-participativa-de-patrimonio-imaterial-no-sudeste-asiatico",
    "title": "Curadoria participativa de patrimônio imaterial no Sudeste Asiático",
    "track": "content",
    "role": "Especialista em experiências digitais e patrimônio cultural",
    "positioning": "specialist",
    "scenario": "Um arquivo grava dez relatos comunitários; quatro participantes autorizaram apenas uso educativo interno.",
    "decision": "Restringir os quatro ao escopo acordado e consultar participantes sobre eventual ampliação.",
    "misconception": "Publicar todos porque o projeto tem finalidade cultural.",
    "changedConstraint": "Uma comunidade solicita retirada de um relato.",
    "tasks": [
      "Registro de consentimento por relato",
      "Matriz de usos",
      "Protocolo de consulta comunitária",
      "Metadados de contexto",
      "Fluxo de retirada",
      "Plano de revisão participativa"
    ],
    "method": "Registre quem define contexto, acesso e usos permitidos. Patrimônio vivo não é apenas arquivo disponível. Preserve consentimento específico, possibilidade de revisão e representação contextual, evitando tratar uma pessoa como porta-voz universal. Uma experiência digital deve preservar significado, direitos e acessibilidade em todo o ciclo de publicação. Identifique público, tarefa, idioma, canal e critério observável de sucesso antes de escolher formato. Separe licença do conteúdo, consentimento de pessoas retratadas e permissão do local ou acervo; uma não substitui automaticamente as outras. Use estrutura semântica e alternativas acessíveis e teste com cenários reais consentidos. Avalie desempenho por compreensão e conclusão de tarefa, evitando métricas de visualização como prova de aprendizagem ou benefício. Documente fontes e versões sem apresentar conteúdo sintético como registro histórico. O exercício não concede direitos autorais, representação cultural, reconhecimento acadêmico ou autorização institucional.",
    "workedExample": "Caso simulado resolvido: Um arquivo grava dez relatos comunitários; quatro participantes autorizaram apenas uso educativo interno. Resolução sustentada: Restringir os quatro ao escopo acordado e consultar participantes sobre eventual ampliação. A alternativa inadequada seria: Publicar todos porque o projeto tem finalidade cultural. A diferença entre as duas decisões está no critério técnico: Registre quem define contexto, acesso e usos permitidos. Patrimônio vivo não é apenas arquivo disponível. Preserve consentimento específico, possibilidade de revisão e representação contextual, evitando tratar uma pessoa como porta-voz universal. A evidência desta resolução deve aparecer em registro de consentimento por relato e em matriz de usos, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma comunidade solicita retirada de um relato. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://ich.unesco.org/en/ethics-and-ich-00866",
      "https://ich.unesco.org/en/participation-of-communities-00162"
    ],
    "region": "asia"
  },
  {
    "id": "as-acessibilidade-de-legendas-para-dramas-coreanos",
    "title": "Acessibilidade de legendas para dramas coreanos",
    "track": "content",
    "role": "Especialista em experiências digitais e patrimônio cultural",
    "positioning": "specialist",
    "scenario": "Uma legenda de duas linhas permanece um segundo e reúne quarenta caracteres por linha.",
    "decision": "Avaliar velocidade de leitura e segmentação com critérios de plataforma e público, reduzindo carga sem perder sentido.",
    "misconception": "Manter tudo porque o diálogo completo cabe tecnicamente na tela.",
    "changedConstraint": "Há fala simultânea e som relevante fora de cena.",
    "tasks": [
      "Planilha de velocidade de leitura",
      "Regras de segmentação",
      "Marcação de sons relevantes",
      "Identificação de falantes",
      "Teste em tela móvel",
      "Relatório de preservação de sentido"
    ],
    "method": "Legendas acessíveis devem comunicar fala, identificação necessária e sons relevantes com tempo legível. Equilibre fidelidade, segmentação e sincronização; truncar condição importante altera o sentido. Teste leitura em dispositivo alvo. Uma experiência digital deve preservar significado, direitos e acessibilidade em todo o ciclo de publicação. Identifique público, tarefa, idioma, canal e critério observável de sucesso antes de escolher formato. Separe licença do conteúdo, consentimento de pessoas retratadas e permissão do local ou acervo; uma não substitui automaticamente as outras. Use estrutura semântica e alternativas acessíveis e teste com cenários reais consentidos. Avalie desempenho por compreensão e conclusão de tarefa, evitando métricas de visualização como prova de aprendizagem ou benefício. Documente fontes e versões sem apresentar conteúdo sintético como registro histórico. O exercício não concede direitos autorais, representação cultural, reconhecimento acadêmico ou autorização institucional.",
    "workedExample": "Caso simulado resolvido: Uma legenda de duas linhas permanece um segundo e reúne quarenta caracteres por linha. Resolução sustentada: Avaliar velocidade de leitura e segmentação com critérios de plataforma e público, reduzindo carga sem perder sentido. A alternativa inadequada seria: Manter tudo porque o diálogo completo cabe tecnicamente na tela. A diferença entre as duas decisões está no critério técnico: Legendas acessíveis devem comunicar fala, identificação necessária e sons relevantes com tempo legível. Equilibre fidelidade, segmentação e sincronização; truncar condição importante altera o sentido. Teste leitura em dispositivo alvo. A evidência desta resolução deve aparecer em planilha de velocidade de leitura e em regras de segmentação, permitindo reproduzir a conclusão. Ao introduzir a mudança — há fala simultânea e som relevante fora de cena. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html",
      "https://www.w3.org/WAI/media/av/"
    ],
    "region": "asia"
  },
  {
    "id": "as-documentacao-de-procedencia-em-acervos-digitais-de-arte-asiatica",
    "title": "Documentação de procedência em acervos digitais de arte asiática",
    "track": "content",
    "role": "Especialista em experiências digitais e patrimônio cultural",
    "positioning": "specialist",
    "scenario": "Um museu virtual possui cem imagens; vinte têm autor conhecido mas licença de reprodução não verificada.",
    "decision": "Separar autoria de direito de reprodução e suspender publicação dos vinte até esclarecer permissão.",
    "misconception": "Publicar por citar o nome do artista.",
    "changedConstraint": "Uma imagem representa obra em domínio público com fotografia recente.",
    "tasks": [
      "Modelo obra e reprodução",
      "Inventário de licenças",
      "Matriz de titulares",
      "Fila de dúvidas",
      "Checklist de publicação",
      "Registro de decisões documentadas"
    ],
    "method": "Modele obra, reprodução fotográfica, titularidade e licença como entidades distintas. Domínio público da obra não resolve automaticamente condições da reprodução. Registre jurisdição e dúvidas para análise especializada, sem inventar autorização. Uma experiência digital deve preservar significado, direitos e acessibilidade em todo o ciclo de publicação. Identifique público, tarefa, idioma, canal e critério observável de sucesso antes de escolher formato. Separe licença do conteúdo, consentimento de pessoas retratadas e permissão do local ou acervo; uma não substitui automaticamente as outras. Use estrutura semântica e alternativas acessíveis e teste com cenários reais consentidos. Avalie desempenho por compreensão e conclusão de tarefa, evitando métricas de visualização como prova de aprendizagem ou benefício. Documente fontes e versões sem apresentar conteúdo sintético como registro histórico. O exercício não concede direitos autorais, representação cultural, reconhecimento acadêmico ou autorização institucional.",
    "workedExample": "Caso simulado resolvido: Um museu virtual possui cem imagens; vinte têm autor conhecido mas licença de reprodução não verificada. Resolução sustentada: Separar autoria de direito de reprodução e suspender publicação dos vinte até esclarecer permissão. A alternativa inadequada seria: Publicar por citar o nome do artista. A diferença entre as duas decisões está no critério técnico: Modele obra, reprodução fotográfica, titularidade e licença como entidades distintas. Domínio público da obra não resolve automaticamente condições da reprodução. Registre jurisdição e dúvidas para análise especializada, sem inventar autorização. A evidência desta resolução deve aparecer em modelo obra e reprodução e em inventário de licenças, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma imagem representa obra em domínio público com fotografia recente. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.wipo.int/copyright/en/",
      "https://creativecommons.org/share-your-work/cclicenses/"
    ],
    "region": "asia"
  },
  {
    "id": "as-teste-de-economia-de-jogos-com-itens-cosmeticos",
    "title": "Teste de economia de jogos com itens cosméticos",
    "track": "content",
    "role": "Especialista em experiências digitais e patrimônio cultural",
    "positioning": "specialist",
    "scenario": "Um jogo japonês concede cem moedas por hora e vende item cosmético por mil; um evento dobra ganhos por três dias.",
    "decision": "Estimar dez horas normais ou cinco durante evento e analisar efeitos de oferta e percepção sem prometer receita.",
    "misconception": "Tratar a moeda virtual como investimento garantido.",
    "changedConstraint": "Novos usuários não conseguem acessar o evento.",
    "tasks": [
      "Balanço de moeda virtual",
      "Tempo de aquisição",
      "Cenário de evento",
      "Matriz de acesso por coorte",
      "Revisão de transparência de preço",
      "Indicador de experiência do jogador"
    ],
    "method": "Modele fontes e sumidouros da moeda e segmentação de acesso. Distinga equilíbrio econômico de bem-estar do jogador. Compare esforço necessário e clareza de preço, evitando mecanismos que ocultem custo ou explorem vulnerabilidade. Uma experiência digital deve preservar significado, direitos e acessibilidade em todo o ciclo de publicação. Identifique público, tarefa, idioma, canal e critério observável de sucesso antes de escolher formato. Separe licença do conteúdo, consentimento de pessoas retratadas e permissão do local ou acervo; uma não substitui automaticamente as outras. Use estrutura semântica e alternativas acessíveis e teste com cenários reais consentidos. Avalie desempenho por compreensão e conclusão de tarefa, evitando métricas de visualização como prova de aprendizagem ou benefício. Documente fontes e versões sem apresentar conteúdo sintético como registro histórico. O exercício não concede direitos autorais, representação cultural, reconhecimento acadêmico ou autorização institucional.",
    "workedExample": "Caso simulado resolvido: Um jogo japonês concede cem moedas por hora e vende item cosmético por mil; um evento dobra ganhos por três dias. Resolução sustentada: Estimar dez horas normais ou cinco durante evento e analisar efeitos de oferta e percepção sem prometer receita. A alternativa inadequada seria: Tratar a moeda virtual como investimento garantido. A diferença entre as duas decisões está no critério técnico: Modele fontes e sumidouros da moeda e segmentação de acesso. Distinga equilíbrio econômico de bem-estar do jogador. Compare esforço necessário e clareza de preço, evitando mecanismos que ocultem custo ou explorem vulnerabilidade. A evidência desta resolução deve aparecer em balanço de moeda virtual e em tempo de aquisição, permitindo reproduzir a conclusão. Ao introduzir a mudança — novos usuários não conseguem acessar o evento. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://learn.microsoft.com/en-us/gaming/playfab/economy-monetization/economy-v2/",
      "https://www.ftc.gov/reports/bringing-dark-patterns-light"
    ],
    "region": "asia"
  },
  {
    "id": "as-planejamento-de-conteudo-turistico-responsavel-em-areas-sagradas",
    "title": "Planejamento de conteúdo turístico responsável em áreas sagradas",
    "track": "content",
    "role": "Especialista em experiências digitais e patrimônio cultural",
    "positioning": "specialist",
    "scenario": "Uma campanha nepalesa divulga local comunitário sem informar restrição de fotografia; visitantes aumentam e ocorrem conflitos.",
    "decision": "Consultar gestores e comunidade e corrigir informações de conduta e capacidade antes de ampliar divulgação.",
    "misconception": "Usar o conflito como prova de sucesso pelo número de visitas.",
    "changedConstraint": "Uma cerimônia limita acesso em datas específicas.",
    "tasks": [
      "Mapa de partes envolvidas",
      "Inventário de regras de visita",
      "Calendário de restrições",
      "Roteiro de conteúdo responsável",
      "Fluxo de atualização",
      "Métricas de impacto local"
    ],
    "method": "Conteúdo turístico precisa integrar autorização, contexto e limites de visitação. Alcance não mede benefício local. Registre regras sazonais, canais de atualização e contribuição da comunidade na decisão editorial. Uma experiência digital deve preservar significado, direitos e acessibilidade em todo o ciclo de publicação. Identifique público, tarefa, idioma, canal e critério observável de sucesso antes de escolher formato. Separe licença do conteúdo, consentimento de pessoas retratadas e permissão do local ou acervo; uma não substitui automaticamente as outras. Use estrutura semântica e alternativas acessíveis e teste com cenários reais consentidos. Avalie desempenho por compreensão e conclusão de tarefa, evitando métricas de visualização como prova de aprendizagem ou benefício. Documente fontes e versões sem apresentar conteúdo sintético como registro histórico. O exercício não concede direitos autorais, representação cultural, reconhecimento acadêmico ou autorização institucional.",
    "workedExample": "Caso simulado resolvido: Uma campanha nepalesa divulga local comunitário sem informar restrição de fotografia; visitantes aumentam e ocorrem conflitos. Resolução sustentada: Consultar gestores e comunidade e corrigir informações de conduta e capacidade antes de ampliar divulgação. A alternativa inadequada seria: Usar o conflito como prova de sucesso pelo número de visitas. A diferença entre as duas decisões está no critério técnico: Conteúdo turístico precisa integrar autorização, contexto e limites de visitação. Alcance não mede benefício local. Registre regras sazonais, canais de atualização e contribuição da comunidade na decisão editorial. A evidência desta resolução deve aparecer em mapa de partes envolvidas e em inventário de regras de visita, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma cerimônia limita acesso em datas específicas. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://ich.unesco.org/en/ethics-and-ich-00866",
      "https://ich.unesco.org/en/participation-of-communities-00162"
    ],
    "region": "asia"
  },
  {
    "id": "as-validacao-de-formularios-com-enderecos-do-japao-e-da-coreia",
    "title": "Validação de formulários com endereços do Japão e da Coreia",
    "track": "content",
    "role": "Especialista em experiências digitais e patrimônio cultural",
    "positioning": "specialist",
    "scenario": "Um checkout obriga número de rua e estado; 25 endereços válidos japoneses não se ajustam ao modelo.",
    "decision": "Reformular esquema por país e testar formatos locais sem apagar componentes necessários à entrega.",
    "misconception": "Forçar todos os endereços ao padrão norte-americano.",
    "changedConstraint": "O usuário informa endereço em escrita local e romanizada.",
    "tasks": [
      "Esquemas de endereço por país",
      "Conjunto de endereços sintéticos",
      "Regras condicionais de formulário",
      "Tratamento de escrita dupla",
      "Teste de entrega documental",
      "Plano de correção pelo usuário"
    ],
    "method": "Armazene componentes conforme necessidade do país e preserve versão original. Validação rígida inadequada cria exclusão. Distinga plausibilidade de confirmação postal e permita correção sem alterar silenciosamente o destino. Uma experiência digital deve preservar significado, direitos e acessibilidade em todo o ciclo de publicação. Identifique público, tarefa, idioma, canal e critério observável de sucesso antes de escolher formato. Separe licença do conteúdo, consentimento de pessoas retratadas e permissão do local ou acervo; uma não substitui automaticamente as outras. Use estrutura semântica e alternativas acessíveis e teste com cenários reais consentidos. Avalie desempenho por compreensão e conclusão de tarefa, evitando métricas de visualização como prova de aprendizagem ou benefício. Documente fontes e versões sem apresentar conteúdo sintético como registro histórico. O exercício não concede direitos autorais, representação cultural, reconhecimento acadêmico ou autorização institucional.",
    "workedExample": "Caso simulado resolvido: Um checkout obriga número de rua e estado; 25 endereços válidos japoneses não se ajustam ao modelo. Resolução sustentada: Reformular esquema por país e testar formatos locais sem apagar componentes necessários à entrega. A alternativa inadequada seria: Forçar todos os endereços ao padrão norte-americano. A diferença entre as duas decisões está no critério técnico: Armazene componentes conforme necessidade do país e preserve versão original. Validação rígida inadequada cria exclusão. Distinga plausibilidade de confirmação postal e permita correção sem alterar silenciosamente o destino. A evidência desta resolução deve aparecer em esquemas de endereço por país e em conjunto de endereços sintéticos, permitindo reproduzir a conclusão. Ao introduzir a mudança — o usuário informa endereço em escrita local e romanizada. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.w3.org/International/questions/qa-address-formats.en.html",
      "https://www.upu.int/en/postal-solutions/programmes-services/addressing-solutions"
    ],
    "region": "asia"
  },
  {
    "id": "as-producao-de-audioguias-multilingues-para-museus-asiaticos",
    "title": "Produção de audioguias multilíngues para museus asiáticos",
    "track": "content",
    "role": "Especialista em experiências digitais e patrimônio cultural",
    "positioning": "specialist",
    "scenario": "Um audioguia de 20 minutos cobre dez peças, mas usuários com deficiência visual não conseguem localizar o início de cada descrição.",
    "decision": "Adicionar orientação espacial e navegação por peça, testando compreensão com usuários consentidos.",
    "misconception": "Aumentar volume da narração como única solução.",
    "changedConstraint": "Uma peça é movida para outra sala.",
    "tasks": [
      "Mapa de navegação por peça",
      "Roteiro de audiodescrição",
      "Glossário de pronúncia",
      "Controle de localização",
      "Teste consentido de percurso",
      "Plano de atualização multilíngue"
    ],
    "method": "Separe descrição visual, contexto histórico e orientação de navegação. Acessibilidade exige estrutura e informação de localização, não somente áudio. Mantenha versões alinhadas à disposição física e registre pronúncias e traduções revisadas. Uma experiência digital deve preservar significado, direitos e acessibilidade em todo o ciclo de publicação. Identifique público, tarefa, idioma, canal e critério observável de sucesso antes de escolher formato. Separe licença do conteúdo, consentimento de pessoas retratadas e permissão do local ou acervo; uma não substitui automaticamente as outras. Use estrutura semântica e alternativas acessíveis e teste com cenários reais consentidos. Avalie desempenho por compreensão e conclusão de tarefa, evitando métricas de visualização como prova de aprendizagem ou benefício. Documente fontes e versões sem apresentar conteúdo sintético como registro histórico. O exercício não concede direitos autorais, representação cultural, reconhecimento acadêmico ou autorização institucional.",
    "workedExample": "Caso simulado resolvido: Um audioguia de 20 minutos cobre dez peças, mas usuários com deficiência visual não conseguem localizar o início de cada descrição. Resolução sustentada: Adicionar orientação espacial e navegação por peça, testando compreensão com usuários consentidos. A alternativa inadequada seria: Aumentar volume da narração como única solução. A diferença entre as duas decisões está no critério técnico: Separe descrição visual, contexto histórico e orientação de navegação. Acessibilidade exige estrutura e informação de localização, não somente áudio. Mantenha versões alinhadas à disposição física e registre pronúncias e traduções revisadas. A evidência desta resolução deve aparecer em mapa de navegação por peça e em roteiro de audiodescrição, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma peça é movida para outra sala. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.w3.org/WAI/media/av/description/",
      "https://www.w3.org/WAI/media/av/"
    ],
    "region": "asia"
  },
  {
    "id": "as-controle-de-continuidade-narrativa-em-series-de-animacao",
    "title": "Controle de continuidade narrativa em séries de animação",
    "track": "content",
    "role": "Especialista em experiências digitais e patrimônio cultural",
    "positioning": "specialist",
    "scenario": "Um estúdio filipino produz oito episódios; o objeto central muda de cor e função em três entregas terceirizadas.",
    "decision": "Criar referência versionada e registrar exceções narrativas antes de corrigir divergências.",
    "misconception": "Aprovar cada episódio isoladamente pela qualidade visual.",
    "changedConstraint": "O roteiro muda a função do objeto no episódio final.",
    "tasks": [
      "Bíblia de objeto narrativo",
      "Mapa de estados por episódio",
      "Registro de ativos versionados",
      "Matriz de divergências",
      "Fluxo de aprovação de mudança",
      "Teste de continuidade final"
    ],
    "method": "Use bíblia de produção com identidade, estados e evolução narrativa. Diferencie erro de continuidade de mudança intencional documentada. Relacione cena, versão de roteiro e ativo para evitar correções que contradigam a história. Uma experiência digital deve preservar significado, direitos e acessibilidade em todo o ciclo de publicação. Identifique público, tarefa, idioma, canal e critério observável de sucesso antes de escolher formato. Separe licença do conteúdo, consentimento de pessoas retratadas e permissão do local ou acervo; uma não substitui automaticamente as outras. Use estrutura semântica e alternativas acessíveis e teste com cenários reais consentidos. Avalie desempenho por compreensão e conclusão de tarefa, evitando métricas de visualização como prova de aprendizagem ou benefício. Documente fontes e versões sem apresentar conteúdo sintético como registro histórico. O exercício não concede direitos autorais, representação cultural, reconhecimento acadêmico ou autorização institucional.",
    "workedExample": "Caso simulado resolvido: Um estúdio filipino produz oito episódios; o objeto central muda de cor e função em três entregas terceirizadas. Resolução sustentada: Criar referência versionada e registrar exceções narrativas antes de corrigir divergências. A alternativa inadequada seria: Aprovar cada episódio isoladamente pela qualidade visual. A diferença entre as duas decisões está no critério técnico: Use bíblia de produção com identidade, estados e evolução narrativa. Diferencie erro de continuidade de mudança intencional documentada. Relacione cena, versão de roteiro e ativo para evitar correções que contradigam a história. A evidência desta resolução deve aparecer em bíblia de objeto narrativo e em mapa de estados por episódio, permitindo reproduzir a conclusão. Ao introduzir a mudança — o roteiro muda a função do objeto no episódio final. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://docs.blender.org/manual/en/5.0/files/asset_libraries/introduction.html",
      "https://docs.blender.org/manual/en/5.0/files/linked_libraries/library_overrides.html"
    ],
    "region": "asia"
  },
  {
    "id": "as-desenho-de-piloto-de-exportacao-de-servicos-para-mercados-asean",
    "title": "Desenho de piloto de exportação de serviços para mercados ASEAN",
    "track": "business",
    "role": "Analista de expansão e operações empresariais na Ásia",
    "positioning": "specialist",
    "scenario": "Uma agência brasileira recebe vinte manifestações de interesse no Vietnã, mas nenhum contrato; o plano projeta vinte clientes pagantes.",
    "decision": "Separar interesse de contratação e testar oferta com critérios de conversão e capacidade antes da projeção.",
    "misconception": "Registrar todas as manifestações como receita garantida.",
    "changedConstraint": "Cinco interessados exigem suporte em vietnamita.",
    "tasks": [
      "Mapa de hipóteses comerciais",
      "Oferta de piloto",
      "Critério de conversão",
      "Plano de suporte local",
      "Limite de investimento",
      "Memorando de continuidade"
    ],
    "method": "Defina segmento, tarefa do cliente e evidência mínima de pagamento. Um piloto deve testar hipótese específica e limite de investimento. Mapeie suporte e entrega local como custos da oferta, não detalhe posterior. Uma decisão de expansão precisa conectar problema, cliente, capacidade, custos e evidência. Separe receita contratada, intenção comercial e hipótese de demanda. Compare alternativas com a mesma moeda, período e fronteira operacional, registrando encargos e restrições que ainda precisam de validação local. Dados de entrevista não equivalem a compra e correlação não demonstra causalidade. Use experimentos pequenos com critérios definidos antes da coleta e preserve consentimento dos participantes. Construa cenários, não promessas de retorno, emprego ou aprovação regulatória. As atividades são simulações empresariais e não substituem aconselhamento jurídico, tributário ou financeiro. A decisão final deve explicitar o que é reversível e quais compromissos exigem responsável autorizado.",
    "workedExample": "Caso simulado resolvido: Uma agência brasileira recebe vinte manifestações de interesse no Vietnã, mas nenhum contrato; o plano projeta vinte clientes pagantes. Resolução sustentada: Separar interesse de contratação e testar oferta com critérios de conversão e capacidade antes da projeção. A alternativa inadequada seria: Registrar todas as manifestações como receita garantida. A diferença entre as duas decisões está no critério técnico: Defina segmento, tarefa do cliente e evidência mínima de pagamento. Um piloto deve testar hipótese específica e limite de investimento. Mapeie suporte e entrega local como custos da oferta, não detalhe posterior. A evidência desta resolução deve aparecer em mapa de hipóteses comerciais e em oferta de piloto, permitindo reproduzir a conclusão. Ao introduzir a mudança — cinco interessados exigem suporte em vietnamita. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.sba.gov/counseling/plan-your-business/",
      "https://www.gov.uk/government/publications/the-magenta-book"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-custo-total-em-terceirizacao-para-centros-asiaticos",
    "title": "Análise de custo total em terceirização para centros asiáticos",
    "track": "business",
    "role": "Analista de expansão e operações empresariais na Ásia",
    "positioning": "specialist",
    "scenario": "Uma proposta filipina cobra 12 por hora e outra indiana 10; a segunda exige 30% de horas adicionais de revisão.",
    "decision": "Comparar custo de 12 com 13 por hora equivalente antes de considerar qualidade e demais custos.",
    "misconception": "Escolher automaticamente a tarifa nominal de dez.",
    "changedConstraint": "O retrabalho aumenta no primeiro mês de transição.",
    "tasks": [
      "Modelo de unidade aceita",
      "Planilha de custo total",
      "Registro de retrabalho",
      "Cenário de transição",
      "Rubrica de qualidade",
      "Memorando de seleção"
    ],
    "method": "Defina unidade de serviço aceita e contabilize supervisão, revisão, transferência e ferramentas. Tarifa baixa não garante custo total baixo. Separe fase de aprendizagem da operação estável e teste sensibilidade do retrabalho. Uma decisão de expansão precisa conectar problema, cliente, capacidade, custos e evidência. Separe receita contratada, intenção comercial e hipótese de demanda. Compare alternativas com a mesma moeda, período e fronteira operacional, registrando encargos e restrições que ainda precisam de validação local. Dados de entrevista não equivalem a compra e correlação não demonstra causalidade. Use experimentos pequenos com critérios definidos antes da coleta e preserve consentimento dos participantes. Construa cenários, não promessas de retorno, emprego ou aprovação regulatória. As atividades são simulações empresariais e não substituem aconselhamento jurídico, tributário ou financeiro. A decisão final deve explicitar o que é reversível e quais compromissos exigem responsável autorizado.",
    "workedExample": "Caso simulado resolvido: Uma proposta filipina cobra 12 por hora e outra indiana 10; a segunda exige 30% de horas adicionais de revisão. Resolução sustentada: Comparar custo de 12 com 13 por hora equivalente antes de considerar qualidade e demais custos. A alternativa inadequada seria: Escolher automaticamente a tarifa nominal de dez. A diferença entre as duas decisões está no critério técnico: Defina unidade de serviço aceita e contabilize supervisão, revisão, transferência e ferramentas. Tarifa baixa não garante custo total baixo. Separe fase de aprendizagem da operação estável e teste sensibilidade do retrabalho. A evidência desta resolução deve aparecer em modelo de unidade aceita e em planilha de custo total, permitindo reproduzir a conclusão. Ao introduzir a mudança — o retrabalho aumenta no primeiro mês de transição. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.sba.gov/counseling/plan-your-business/",
      "https://www.sba.gov/counseling/plan-your-business/break-even-point-calculator/"
    ],
    "region": "asia"
  },
  {
    "id": "as-planejamento-de-atendimento-durante-festivais-e-calendarios-asiaticos",
    "title": "Planejamento de atendimento durante festivais e calendários asiáticos",
    "track": "business",
    "role": "Analista de expansão e operações empresariais na Ásia",
    "positioning": "specialist",
    "scenario": "Uma operação cobre clientes na China e Índia com prazo de 24 horas, mas usa calendário único que ignora dois feriados locais.",
    "decision": "Modelar calendários por serviço e comunicar cobertura e prazo compatíveis com cada contrato.",
    "misconception": "Manter promessa uniforme sem equipe de plantão.",
    "changedConstraint": "Uma campanha global coincide com o feriado local.",
    "tasks": [
      "Matriz de calendários",
      "Definição de prazo contratual",
      "Escala de cobertura",
      "Cenário de campanha simultânea",
      "Modelo de comunicação ao cliente",
      "Teste de cálculo de vencimento"
    ],
    "method": "Separe dia corrido, dia útil e horário de suporte contratual. Construa matriz por país e equipe, considerando capacidade real. Um calendário deve ser versionado e validado localmente, sem generalizar práticas de toda a região. Uma decisão de expansão precisa conectar problema, cliente, capacidade, custos e evidência. Separe receita contratada, intenção comercial e hipótese de demanda. Compare alternativas com a mesma moeda, período e fronteira operacional, registrando encargos e restrições que ainda precisam de validação local. Dados de entrevista não equivalem a compra e correlação não demonstra causalidade. Use experimentos pequenos com critérios definidos antes da coleta e preserve consentimento dos participantes. Construa cenários, não promessas de retorno, emprego ou aprovação regulatória. As atividades são simulações empresariais e não substituem aconselhamento jurídico, tributário ou financeiro. A decisão final deve explicitar o que é reversível e quais compromissos exigem responsável autorizado.",
    "workedExample": "Caso simulado resolvido: Uma operação cobre clientes na China e Índia com prazo de 24 horas, mas usa calendário único que ignora dois feriados locais. Resolução sustentada: Modelar calendários por serviço e comunicar cobertura e prazo compatíveis com cada contrato. A alternativa inadequada seria: Manter promessa uniforme sem equipe de plantão. A diferença entre as duas decisões está no critério técnico: Separe dia corrido, dia útil e horário de suporte contratual. Construa matriz por país e equipe, considerando capacidade real. Um calendário deve ser versionado e validado localmente, sem generalizar práticas de toda a região. A evidência desta resolução deve aparecer em matriz de calendários e em definição de prazo contratual, permitindo reproduzir a conclusão. Ao introduzir a mudança — uma campanha global coincide com o feriado local. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://docs.python.org/3/library/datetime.html",
      "https://www.ready.gov/business-continuity-plan"
    ],
    "region": "asia"
  },
  {
    "id": "as-avaliacao-de-prontidao-de-fornecedores-para-compras-regionais",
    "title": "Avaliação de prontidão de fornecedores para compras regionais",
    "track": "business",
    "role": "Analista de expansão e operações empresariais na Ásia",
    "positioning": "specialist",
    "scenario": "Uma empresa de Singapura avalia dez fornecedores; três têm boa amostra, mas não demonstram capacidade no volume necessário.",
    "decision": "Separar qualidade de amostra e capacidade de escala e solicitar evidência para o volume antes da aprovação.",
    "misconception": "Aprovar escala apenas porque a amostra foi bonita.",
    "changedConstraint": "O pedido dobra em trinta dias.",
    "tasks": [
      "Matriz de requisitos",
      "Rubrica de evidência",
      "Teste de capacidade declarada",
      "Cenário de volume dobrado",
      "Registro de lacunas",
      "Decisão condicional de fornecedor"
    ],
    "method": "Defina requisitos eliminatórios e critérios comparativos. Evidência deve corresponder ao produto, volume e prazo. Pontuação média não deve compensar falha em requisito obrigatório; registre lacunas e condição de reavaliação. Uma decisão de expansão precisa conectar problema, cliente, capacidade, custos e evidência. Separe receita contratada, intenção comercial e hipótese de demanda. Compare alternativas com a mesma moeda, período e fronteira operacional, registrando encargos e restrições que ainda precisam de validação local. Dados de entrevista não equivalem a compra e correlação não demonstra causalidade. Use experimentos pequenos com critérios definidos antes da coleta e preserve consentimento dos participantes. Construa cenários, não promessas de retorno, emprego ou aprovação regulatória. As atividades são simulações empresariais e não substituem aconselhamento jurídico, tributário ou financeiro. A decisão final deve explicitar o que é reversível e quais compromissos exigem responsável autorizado.",
    "workedExample": "Caso simulado resolvido: Uma empresa de Singapura avalia dez fornecedores; três têm boa amostra, mas não demonstram capacidade no volume necessário. Resolução sustentada: Separar qualidade de amostra e capacidade de escala e solicitar evidência para o volume antes da aprovação. A alternativa inadequada seria: Aprovar escala apenas porque a amostra foi bonita. A diferença entre as duas decisões está no critério técnico: Defina requisitos eliminatórios e critérios comparativos. Evidência deve corresponder ao produto, volume e prazo. Pontuação média não deve compensar falha em requisito obrigatório; registre lacunas e condição de reavaliação. A evidência desta resolução deve aparecer em matriz de requisitos e em rubrica de evidência, permitindo reproduzir a conclusão. Ao introduzir a mudança — o pedido dobra em trinta dias. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://ref.gs1.org/standards/global-traceability/",
      "https://www.itl.nist.gov/div898/handbook/pmc/pmc.htm"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-margem-em-venda-digital-com-multiplos-marketplaces",
    "title": "Análise de margem em venda digital com múltiplos marketplaces",
    "track": "business",
    "role": "Analista de expansão e operações empresariais na Ásia",
    "positioning": "specialist",
    "scenario": "Um produto vende por 100 no Japão com taxa 15 e frete 20; na Coreia vende por 90 com taxa 9 e frete 10. O custo é 40.",
    "decision": "Calcular contribuições de 25 e 31 antes de tributos e outros custos, usando fronteira explícita.",
    "misconception": "Escolher o maior preço de venda como maior margem.",
    "changedConstraint": "As devoluções são 10% em um canal e 2% no outro.",
    "tasks": [
      "Ponte de contribuição por canal",
      "Dicionário de taxas",
      "Cenário de devoluções",
      "Comparação de repasse",
      "Análise de sensibilidade",
      "Memorando de alocação comercial"
    ],
    "method": "Construa ponte preço, desconto, taxa, frete, custo e devolução. Compare margem por pedido aceito e por cliente quando pertinente. Não misture receita bruta de uma plataforma com repasse líquido de outra. Uma decisão de expansão precisa conectar problema, cliente, capacidade, custos e evidência. Separe receita contratada, intenção comercial e hipótese de demanda. Compare alternativas com a mesma moeda, período e fronteira operacional, registrando encargos e restrições que ainda precisam de validação local. Dados de entrevista não equivalem a compra e correlação não demonstra causalidade. Use experimentos pequenos com critérios definidos antes da coleta e preserve consentimento dos participantes. Construa cenários, não promessas de retorno, emprego ou aprovação regulatória. As atividades são simulações empresariais e não substituem aconselhamento jurídico, tributário ou financeiro. A decisão final deve explicitar o que é reversível e quais compromissos exigem responsável autorizado.",
    "workedExample": "Caso simulado resolvido: Um produto vende por 100 no Japão com taxa 15 e frete 20; na Coreia vende por 90 com taxa 9 e frete 10. O custo é 40. Resolução sustentada: Calcular contribuições de 25 e 31 antes de tributos e outros custos, usando fronteira explícita. A alternativa inadequada seria: Escolher o maior preço de venda como maior margem. A diferença entre as duas decisões está no critério técnico: Construa ponte preço, desconto, taxa, frete, custo e devolução. Compare margem por pedido aceito e por cliente quando pertinente. Não misture receita bruta de uma plataforma com repasse líquido de outra. A evidência desta resolução deve aparecer em ponte de contribuição por canal e em dicionário de taxas, permitindo reproduzir a conclusão. Ao introduzir a mudança — as devoluções são 10% em um canal e 2% no outro. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.sba.gov/counseling/plan-your-business/break-even-point-calculator/",
      "https://docs.stripe.com/refunds"
    ],
    "region": "asia"
  },
  {
    "id": "as-mapeamento-de-competencias-para-equipes-distribuidas-india-japao",
    "title": "Mapeamento de competências para equipes distribuídas Índia-Japão",
    "track": "business",
    "role": "Analista de expansão e operações empresariais na Ásia",
    "positioning": "specialist",
    "scenario": "Uma equipe possui cinco analistas, mas somente um consegue revisar a integração crítica; o plano declara redundância de cinco pessoas.",
    "decision": "Registrar dependência de competência e planejar transferência verificável para pelo menos outro revisor.",
    "misconception": "Usar número de funcionários como prova de cobertura técnica.",
    "changedConstraint": "O revisor principal se ausenta por duas semanas.",
    "tasks": [
      "Matriz tarefa e competência",
      "Registro de evidências",
      "Mapa de dependência",
      "Plano de prática acompanhada",
      "Teste de revisão independente",
      "Cenário de ausência prolongada"
    ],
    "method": "Mapeie tarefa e nível demonstrado com evidência observável. Autodeclaração e presença em treinamento não provam execução independente. Planeje prática acompanhada e teste de transferência sem reduzir critérios de qualidade. Uma decisão de expansão precisa conectar problema, cliente, capacidade, custos e evidência. Separe receita contratada, intenção comercial e hipótese de demanda. Compare alternativas com a mesma moeda, período e fronteira operacional, registrando encargos e restrições que ainda precisam de validação local. Dados de entrevista não equivalem a compra e correlação não demonstra causalidade. Use experimentos pequenos com critérios definidos antes da coleta e preserve consentimento dos participantes. Construa cenários, não promessas de retorno, emprego ou aprovação regulatória. As atividades são simulações empresariais e não substituem aconselhamento jurídico, tributário ou financeiro. A decisão final deve explicitar o que é reversível e quais compromissos exigem responsável autorizado.",
    "workedExample": "Caso simulado resolvido: Uma equipe possui cinco analistas, mas somente um consegue revisar a integração crítica; o plano declara redundância de cinco pessoas. Resolução sustentada: Registrar dependência de competência e planejar transferência verificável para pelo menos outro revisor. A alternativa inadequada seria: Usar número de funcionários como prova de cobertura técnica. A diferença entre as duas decisões está no critério técnico: Mapeie tarefa e nível demonstrado com evidência observável. Autodeclaração e presença em treinamento não provam execução independente. Planeje prática acompanhada e teste de transferência sem reduzir critérios de qualidade. A evidência desta resolução deve aparecer em matriz tarefa e competência e em registro de evidências, permitindo reproduzir a conclusão. Ao introduzir a mudança — o revisor principal se ausenta por duas semanas. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.opm.gov/policy-data-oversight/assessment-and-selection/other-assessment-methods/work-samples-and-simulations/",
      "https://www.ilo.org/skills"
    ],
    "region": "asia"
  },
  {
    "id": "as-mensuracao-de-adocao-de-ferramentas-digitais-em-pequenas-empresas",
    "title": "Mensuração de adoção de ferramentas digitais em pequenas empresas",
    "track": "business",
    "role": "Analista de expansão e operações empresariais na Ásia",
    "positioning": "specialist",
    "scenario": "Um programa indonésio cadastra cem lojas, mas só trinta usam o sistema semanalmente após dois meses.",
    "decision": "Separar cadastro, ativação e uso recorrente e investigar barreiras dos setenta casos sem recorrência.",
    "misconception": "Anunciar cem adoções sustentadas usando inscrições.",
    "changedConstraint": "Vinte lojas operam com conectividade intermitente.",
    "tasks": [
      "Funil de adoção",
      "Evento de valor",
      "Coortes de recorrência",
      "Mapa de barreiras",
      "Cenário de conectividade",
      "Plano de experimento de suporte"
    ],
    "method": "Defina evento de valor e janela de uso coerente com o negócio. Cadastros acumulados ocultam abandono. Combine dados de uso minimizados com entrevistas consentidas, evitando atribuir culpa ao usuário pela falta de adequação. Uma decisão de expansão precisa conectar problema, cliente, capacidade, custos e evidência. Separe receita contratada, intenção comercial e hipótese de demanda. Compare alternativas com a mesma moeda, período e fronteira operacional, registrando encargos e restrições que ainda precisam de validação local. Dados de entrevista não equivalem a compra e correlação não demonstra causalidade. Use experimentos pequenos com critérios definidos antes da coleta e preserve consentimento dos participantes. Construa cenários, não promessas de retorno, emprego ou aprovação regulatória. As atividades são simulações empresariais e não substituem aconselhamento jurídico, tributário ou financeiro. A decisão final deve explicitar o que é reversível e quais compromissos exigem responsável autorizado.",
    "workedExample": "Caso simulado resolvido: Um programa indonésio cadastra cem lojas, mas só trinta usam o sistema semanalmente após dois meses. Resolução sustentada: Separar cadastro, ativação e uso recorrente e investigar barreiras dos setenta casos sem recorrência. A alternativa inadequada seria: Anunciar cem adoções sustentadas usando inscrições. A diferença entre as duas decisões está no critério técnico: Defina evento de valor e janela de uso coerente com o negócio. Cadastros acumulados ocultam abandono. Combine dados de uso minimizados com entrevistas consentidas, evitando atribuir culpa ao usuário pela falta de adequação. A evidência desta resolução deve aparecer em funil de adoção e em evento de valor, permitindo reproduzir a conclusão. Ao introduzir a mudança — vinte lojas operam com conectividade intermitente. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://developers.google.com/analytics/devguides/collection/ga4/events",
      "https://www.gov.uk/government/publications/test-learn-adapt-developing-public-policy-with-randomised-controlled-trials"
    ],
    "region": "asia"
  },
  {
    "id": "as-planejamento-de-sucessao-operacional-em-empresas-familiares-asiaticas",
    "title": "Planejamento de sucessão operacional em empresas familiares asiáticas",
    "track": "business",
    "role": "Analista de expansão e operações empresariais na Ásia",
    "positioning": "specialist",
    "scenario": "Uma pequena exportadora tailandesa depende do fundador para preços, fornecedores e aprovação de todos os pedidos.",
    "decision": "Mapear decisões e limites de delegação e testar continuidade em simulação de ausência.",
    "misconception": "Entregar senhas compartilhadas como plano completo de sucessão.",
    "changedConstraint": "O fundador fica indisponível durante negociação crítica.",
    "tasks": [
      "Mapa de decisões críticas",
      "Matriz de delegação",
      "Procedimentos de exceção",
      "Inventário de conhecimento",
      "Simulação de ausência",
      "Plano de revisão de continuidade"
    ],
    "method": "Separe conhecimento tácito, autoridade e acesso técnico. Documente critérios e exceções com responsáveis substitutos. Delegação precisa de limite e revisão; continuidade não significa transferir poderes legais sem autorização apropriada. Uma decisão de expansão precisa conectar problema, cliente, capacidade, custos e evidência. Separe receita contratada, intenção comercial e hipótese de demanda. Compare alternativas com a mesma moeda, período e fronteira operacional, registrando encargos e restrições que ainda precisam de validação local. Dados de entrevista não equivalem a compra e correlação não demonstra causalidade. Use experimentos pequenos com critérios definidos antes da coleta e preserve consentimento dos participantes. Construa cenários, não promessas de retorno, emprego ou aprovação regulatória. As atividades são simulações empresariais e não substituem aconselhamento jurídico, tributário ou financeiro. A decisão final deve explicitar o que é reversível e quais compromissos exigem responsável autorizado.",
    "workedExample": "Caso simulado resolvido: Uma pequena exportadora tailandesa depende do fundador para preços, fornecedores e aprovação de todos os pedidos. Resolução sustentada: Mapear decisões e limites de delegação e testar continuidade em simulação de ausência. A alternativa inadequada seria: Entregar senhas compartilhadas como plano completo de sucessão. A diferença entre as duas decisões está no critério técnico: Separe conhecimento tácito, autoridade e acesso técnico. Documente critérios e exceções com responsáveis substitutos. Delegação precisa de limite e revisão; continuidade não significa transferir poderes legais sem autorização apropriada. A evidência desta resolução deve aparecer em mapa de decisões críticas e em matriz de delegação, permitindo reproduzir a conclusão. Ao introduzir a mudança — o fundador fica indisponível durante negociação crítica. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.ready.gov/business-continuity-plan",
      "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
    ],
    "region": "asia"
  },
  {
    "id": "as-analise-de-viabilidade-de-suporte-em-idiomas-de-baixa-cobertura",
    "title": "Análise de viabilidade de suporte em idiomas de baixa cobertura",
    "track": "business",
    "role": "Analista de expansão e operações empresariais na Ásia",
    "positioning": "specialist",
    "scenario": "Uma empresa atende 40 tickets mensais em nepalês; contratação fixa custa 2000 e parceiro cobra 30 por ticket aceito.",
    "decision": "Comparar 2000 com 1200 antes de qualidade, disponibilidade e proteção de dados, sem decidir apenas pelo volume.",
    "misconception": "Assumir que tradução automática elimina toda necessidade de suporte.",
    "changedConstraint": "O volume sobe para cem tickets e inclui casos sensíveis.",
    "tasks": [
      "Modelo de demanda linguística",
      "Custo por resolução aceita",
      "Matriz de complexidade",
      "Requisitos de privacidade",
      "Cenário de pico",
      "Memorando de modelo de suporte"
    ],
    "method": "Modele demanda, complexidade e janela de atendimento. Compare custo por resolução válida e capacidade em picos. Ferramentas linguísticas exigem revisão conforme risco e não devem receber dados sensíveis sem base e controle apropriados. Uma decisão de expansão precisa conectar problema, cliente, capacidade, custos e evidência. Separe receita contratada, intenção comercial e hipótese de demanda. Compare alternativas com a mesma moeda, período e fronteira operacional, registrando encargos e restrições que ainda precisam de validação local. Dados de entrevista não equivalem a compra e correlação não demonstra causalidade. Use experimentos pequenos com critérios definidos antes da coleta e preserve consentimento dos participantes. Construa cenários, não promessas de retorno, emprego ou aprovação regulatória. As atividades são simulações empresariais e não substituem aconselhamento jurídico, tributário ou financeiro. A decisão final deve explicitar o que é reversível e quais compromissos exigem responsável autorizado.",
    "workedExample": "Caso simulado resolvido: Uma empresa atende 40 tickets mensais em nepalês; contratação fixa custa 2000 e parceiro cobra 30 por ticket aceito. Resolução sustentada: Comparar 2000 com 1200 antes de qualidade, disponibilidade e proteção de dados, sem decidir apenas pelo volume. A alternativa inadequada seria: Assumir que tradução automática elimina toda necessidade de suporte. A diferença entre as duas decisões está no critério técnico: Modele demanda, complexidade e janela de atendimento. Compare custo por resolução válida e capacidade em picos. Ferramentas linguísticas exigem revisão conforme risco e não devem receber dados sensíveis sem base e controle apropriados. A evidência desta resolução deve aparecer em modelo de demanda linguística e em custo por resolução aceita, permitindo reproduzir a conclusão. Ao introduzir a mudança — o volume sobe para cem tickets e inclui casos sensíveis. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.sba.gov/counseling/plan-your-business/",
      "https://www.sba.gov/counseling/plan-your-business/break-even-point-calculator/"
    ],
    "region": "asia"
  },
  {
    "id": "as-desenho-de-avaliacao-pratica-para-contratacao-por-habilidades",
    "title": "Desenho de avaliação prática para contratação por habilidades",
    "track": "business",
    "role": "Analista de expansão e operações empresariais na Ásia",
    "positioning": "specialist",
    "scenario": "Uma empresa japonesa aplica teste de memorização a candidatos a analista de dados, embora a função exija reconciliar fontes.",
    "decision": "Construir tarefa sintética de reconciliação com rubrica, tempo proporcional e critérios consistentes.",
    "misconception": "Usar familiaridade com perguntas como medida suficiente de desempenho real.",
    "changedConstraint": "Um candidato necessita recurso de acessibilidade.",
    "tasks": [
      "Mapa de tarefas da função",
      "Caso sintético de avaliação",
      "Rubrica de resultado e método",
      "Plano de acessibilidade",
      "Guia de aplicação consistente",
      "Análise de limites da seleção"
    ],
    "method": "Alinhe avaliação às tarefas essenciais e forneça condições comparáveis. Rubrica deve avaliar resultado e raciocínio sem exigir trabalho comercial gratuito. Teste acessibilidade e registre limites preditivos sem afirmar certeza de desempenho futuro. Uma decisão de expansão precisa conectar problema, cliente, capacidade, custos e evidência. Separe receita contratada, intenção comercial e hipótese de demanda. Compare alternativas com a mesma moeda, período e fronteira operacional, registrando encargos e restrições que ainda precisam de validação local. Dados de entrevista não equivalem a compra e correlação não demonstra causalidade. Use experimentos pequenos com critérios definidos antes da coleta e preserve consentimento dos participantes. Construa cenários, não promessas de retorno, emprego ou aprovação regulatória. As atividades são simulações empresariais e não substituem aconselhamento jurídico, tributário ou financeiro. A decisão final deve explicitar o que é reversível e quais compromissos exigem responsável autorizado.",
    "workedExample": "Caso simulado resolvido: Uma empresa japonesa aplica teste de memorização a candidatos a analista de dados, embora a função exija reconciliar fontes. Resolução sustentada: Construir tarefa sintética de reconciliação com rubrica, tempo proporcional e critérios consistentes. A alternativa inadequada seria: Usar familiaridade com perguntas como medida suficiente de desempenho real. A diferença entre as duas decisões está no critério técnico: Alinhe avaliação às tarefas essenciais e forneça condições comparáveis. Rubrica deve avaliar resultado e raciocínio sem exigir trabalho comercial gratuito. Teste acessibilidade e registre limites preditivos sem afirmar certeza de desempenho futuro. A evidência desta resolução deve aparecer em mapa de tarefas da função e em caso sintético de avaliação, permitindo reproduzir a conclusão. Ao introduzir a mudança — um candidato necessita recurso de acessibilidade. — a conclusão precisa ser novamente testada antes de ser mantida.",
    "sources": [
      "https://www.opm.gov/policy-data-oversight/assessment-and-selection/other-assessment-methods/work-samples-and-simulations/",
      "https://www.w3.org/WAI/tutorials/"
    ],
    "region": "asia"
  }
];

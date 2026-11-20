import 'server-only';
import type { GlobalCourseSpec } from './types';

/** Original fictional occupational cases and authored technical instruction. */
export const oceaniaSpecs: readonly GlobalCourseSpec[] = [
  {
    "id": "oc-sequenciamento-de-modulos-habitacionais-pre-fabricados",
    "title": "Sequenciamento de módulos habitacionais pré-fabricados",
    "track": "industry",
    "role": "Analista de planejamento e informação de construção",
    "positioning": "broad",
    "scenario": "Um projeto fictício em Auckland recebe 12 módulos em três caminhões, mas o pátio comporta quatro módulos e a montagem consome três por dia.",
    "decision": "Agendar entregas de quatro módulos em dias separados, condicionadas à liberação do pátio e da montagem.",
    "misconception": "Receber os 12 módulos simultaneamente e ocupar a rota de emergência.",
    "changedConstraint": "A chuva impede montagem durante dois dias.",
    "tasks": [
      "Mapa de acessos",
      "Balanço diário de módulos",
      "Plano de janelas de entrega",
      "Matriz de dependências de montagem",
      "Simulação de interrupção por chuva",
      "Protocolo de confirmação de descarga"
    ],
    "method": "Modele a chegada como evento e a montagem como retirada de estoque, verificando o saldo após cada evento. Planeje janela de descarga, área de apoio e confirmação de recebimento; não confunda capacidade nominal diária com disponibilidade de içamento. Em planejamento de construção, separe desenho autorizado, hipótese de orçamento e instrução de execução. Quantidade representa escopo medido; produtividade depende de acesso, sequência, equipe e inspeção. Uma folga de cronograma não elimina uma restrição técnica. Estruture cada item com localização, revisão do documento, unidade e dependência. Compare alternativas usando a mesma fronteira de custo e registre exclusões. Inspeções e aprovações pertencem aos responsáveis habilitados. O estudante prepara informações para decisão e identifica pontos de parada; não emite laudo estrutural, certificação de conformidade ou autorização de trabalho. Reavalie segurança, qualidade e prazo conjuntamente sempre que uma mudança alterar o método construtivo. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um projeto fictício em Auckland recebe 12 módulos em três caminhões, mas o pátio comporta quatro módulos e a montagem consome três por dia. Resolução: Agendar entregas de quatro módulos em dias separados, condicionadas à liberação do pátio e da montagem. Sem escalonamento, o estoque de 12 excede o limite de quatro em oito módulos. Uma entrega de quatro ainda precisa de área e condição de descarga confirmadas, e a segunda entrega depende do saldo real. O exemplo demonstra uma decisão de planejamento, cuja execução exige confirmação do responsável técnico e das regras locais. Nenhuma economia de prazo justifica ignorar inspeção ou requisito de segurança. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.building.govt.nz/building-code-compliance",
      "https://www.safeworkaustralia.gov.au/safety-topic/industry-and-business/construction"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-rastreabilidade-de-revisoes-em-modelos-bim-federados",
    "title": "Rastreabilidade de revisões em modelos BIM federados",
    "track": "industry",
    "role": "Analista de planejamento e informação de construção",
    "positioning": "specialist",
    "scenario": "Uma equipe australiana combina arquitetura revisão 8 e instalações revisão 6, mas o contrato aprova apenas instalações revisão 5.",
    "decision": "Marcar a revisão 6 como não autorizada e refazer a federação de referência com as versões aprovadas.",
    "misconception": "Assumir que a revisão mais nova é automaticamente a autorizada.",
    "changedConstraint": "O projetista libera uma revisão parcial de apenas um pavimento.",
    "tasks": [
      "Manifesto de modelos",
      "Matriz de estados de revisão",
      "Registro de conflitos por disciplina",
      "Fluxo de aprovação",
      "Teste de federação parcial",
      "Relatório de mudança de referência"
    ],
    "method": "Use manifesto de federação com disciplina, arquivo, hash, revisão e estado de aprovação. Um conflito só é comparável entre conjuntos de versões definidos. Separe detecção geométrica, classificação de responsabilidade e aprovação da solução. Em planejamento de construção, separe desenho autorizado, hipótese de orçamento e instrução de execução. Quantidade representa escopo medido; produtividade depende de acesso, sequência, equipe e inspeção. Uma folga de cronograma não elimina uma restrição técnica. Estruture cada item com localização, revisão do documento, unidade e dependência. Compare alternativas usando a mesma fronteira de custo e registre exclusões. Inspeções e aprovações pertencem aos responsáveis habilitados. O estudante prepara informações para decisão e identifica pontos de parada; não emite laudo estrutural, certificação de conformidade ou autorização de trabalho. Reavalie segurança, qualidade e prazo conjuntamente sempre que uma mudança alterar o método construtivo. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma equipe australiana combina arquitetura revisão 8 e instalações revisão 6, mas o contrato aprova apenas instalações revisão 5. Resolução: Marcar a revisão 6 como não autorizada e refazer a federação de referência com as versões aprovadas. O problema é de estado documental antes de ser geométrico. Contar conflitos no modelo não aprovado pode produzir tarefas sem base contratual; o manifesto impede misturar a revisão parcial com um prédio inteiro atualizado. O exemplo demonstra uma decisão de planejamento, cuja execução exige confirmação do responsável técnico e das regras locais. Nenhuma economia de prazo justifica ignorar inspeção ou requisito de segurança. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.building.govt.nz/building-code-compliance",
      "https://www.safeworkaustralia.gov.au/safety-topic/industry-and-business/construction",
      "https://www.buildingsmart.org/standards/bsi-standards/bim-collaboration-format/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-medicao-de-desperdicio-em-corte-de-madeira-engenheirada",
    "title": "Medição de desperdício em corte de madeira engenheirada",
    "track": "industry",
    "role": "Analista de planejamento e informação de construção",
    "positioning": "specialist",
    "scenario": "Uma oficina recebe 40 painéis de 3 m² e incorpora 102 m² no produto, com 12 m² reaproveitáveis e 6 m² de descarte.",
    "decision": "Reconciliar 120 m² de entrada em 102 incorporados, 12 reaproveitáveis e 6 descartados, distinguindo rendimento de 85% e descarte de 5%.",
    "misconception": "Declarar desperdício de 15% sem separar sobras reaproveitáveis.",
    "changedConstraint": "A nova encomenda aceita peças menores obtidas das sobras.",
    "tasks": [
      "Balanço de área por lote",
      "Mapa de padrões de corte",
      "Classificação de sobras",
      "Indicadores de rendimento e descarte",
      "Simulação de segunda encomenda",
      "Registro de destinação"
    ],
    "method": "Monte balanço de área por lote e diferencie material incorporado, sobra com aplicação viável e resíduo. O rendimento de primeira passagem não é igual ao índice de descarte. Vincule padrões de corte à dimensão e à restrição de acabamento. Em planejamento de construção, separe desenho autorizado, hipótese de orçamento e instrução de execução. Quantidade representa escopo medido; produtividade depende de acesso, sequência, equipe e inspeção. Uma folga de cronograma não elimina uma restrição técnica. Estruture cada item com localização, revisão do documento, unidade e dependência. Compare alternativas usando a mesma fronteira de custo e registre exclusões. Inspeções e aprovações pertencem aos responsáveis habilitados. O estudante prepara informações para decisão e identifica pontos de parada; não emite laudo estrutural, certificação de conformidade ou autorização de trabalho. Reavalie segurança, qualidade e prazo conjuntamente sempre que uma mudança alterar o método construtivo. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma oficina recebe 40 painéis de 3 m² e incorpora 102 m² no produto, com 12 m² reaproveitáveis e 6 m² de descarte. Resolução: Reconciliar 120 m² de entrada em 102 incorporados, 12 reaproveitáveis e 6 descartados, distinguindo rendimento de 85% e descarte de 5%. Os 18 m² não incorporados não são todos perda definitiva. A encomenda posterior pode consumir sobras, mas isso exige compatibilidade de dimensão, qualidade e estoque identificado, sem contar o mesmo benefício duas vezes. O exemplo demonstra uma decisão de planejamento, cuja execução exige confirmação do responsável técnico e das regras locais. Nenhuma economia de prazo justifica ignorar inspeção ou requisito de segurança. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.building.govt.nz/building-code-compliance",
      "https://www.safeworkaustralia.gov.au/safety-topic/industry-and-business/construction"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-planejamento-de-inspecoes-de-envoltoria-estanque",
    "title": "Planejamento de inspeções de envoltória estanque",
    "track": "industry",
    "role": "Analista de planejamento e informação de construção",
    "positioning": "specialist",
    "scenario": "Um edifício tem 24 interfaces de fachada e seis ficarão ocultas após o fechamento de sexta-feira.",
    "decision": "Priorizar inspeção documentada das seis interfaces antes do fechamento, mantendo as demais no plano.",
    "misconception": "Inspecionar apenas ao final porque a fachada parecerá completa.",
    "changedConstraint": "Duas interfaces não estão acessíveis na janela prevista.",
    "tasks": [
      "Mapa de interfaces",
      "Plano de pontos de parada",
      "Checklist de evidências",
      "Matriz de acessibilidade",
      "Cronograma antes do fechamento",
      "Registro de pendências"
    ],
    "method": "Crie pontos de parada associados à sequência de fechamento e à evidência exigida. Diferencie inspeção visual, ensaio especificado e aceitação formal. A prioridade depende de risco de ocultação e consequência da falha, não apenas do tamanho da peça. Em planejamento de construção, separe desenho autorizado, hipótese de orçamento e instrução de execução. Quantidade representa escopo medido; produtividade depende de acesso, sequência, equipe e inspeção. Uma folga de cronograma não elimina uma restrição técnica. Estruture cada item com localização, revisão do documento, unidade e dependência. Compare alternativas usando a mesma fronteira de custo e registre exclusões. Inspeções e aprovações pertencem aos responsáveis habilitados. O estudante prepara informações para decisão e identifica pontos de parada; não emite laudo estrutural, certificação de conformidade ou autorização de trabalho. Reavalie segurança, qualidade e prazo conjuntamente sempre que uma mudança alterar o método construtivo. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um edifício tem 24 interfaces de fachada e seis ficarão ocultas após o fechamento de sexta-feira. Resolução: Priorizar inspeção documentada das seis interfaces antes do fechamento, mantendo as demais no plano. As seis interfaces representam 25% do conjunto, mas não precisam representar 25% do esforço. A ausência de acesso requer reprogramação ou retenção do fechamento pelo responsável, e não uma marcação fictícia de inspeção concluída. O exemplo demonstra uma decisão de planejamento, cuja execução exige confirmação do responsável técnico e das regras locais. Nenhuma economia de prazo justifica ignorar inspeção ou requisito de segurança. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.building.govt.nz/building-code-compliance",
      "https://www.safeworkaustralia.gov.au/safety-topic/industry-and-business/construction"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-controle-de-umidade-documental-em-materiais-de-obra",
    "title": "Controle de umidade documental em materiais de obra",
    "track": "industry",
    "role": "Analista de planejamento e informação de construção",
    "positioning": "broad",
    "scenario": "Um lote de 60 peças tem 48 medições registradas e 12 peças sem identificação correspondente ao medidor.",
    "decision": "Reter a conclusão sobre o lote até reconciliar as 12 peças e o procedimento de medição.",
    "misconception": "Aprovar as 60 peças usando a média das 48 identificadas.",
    "changedConstraint": "O fornecedor troca as etiquetas durante o transporte.",
    "tasks": [
      "Cadastro de peças",
      "Registro de instrumentos",
      "Conciliação de etiquetas",
      "Mapa de cobertura de medições",
      "Procedimento de reinspeção",
      "Nota de limites de aceitação"
    ],
    "method": "Relacione medição, instrumento, momento, localização e peça. Antes de interpretar um limite, confira método aplicável e calibração. Cobertura de registro e adequação técnica são verificações distintas; uma média não substitui rastreabilidade individual quando esta é exigida. Em planejamento de construção, separe desenho autorizado, hipótese de orçamento e instrução de execução. Quantidade representa escopo medido; produtividade depende de acesso, sequência, equipe e inspeção. Uma folga de cronograma não elimina uma restrição técnica. Estruture cada item com localização, revisão do documento, unidade e dependência. Compare alternativas usando a mesma fronteira de custo e registre exclusões. Inspeções e aprovações pertencem aos responsáveis habilitados. O estudante prepara informações para decisão e identifica pontos de parada; não emite laudo estrutural, certificação de conformidade ou autorização de trabalho. Reavalie segurança, qualidade e prazo conjuntamente sempre que uma mudança alterar o método construtivo. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um lote de 60 peças tem 48 medições registradas e 12 peças sem identificação correspondente ao medidor. Resolução: Reter a conclusão sobre o lote até reconciliar as 12 peças e o procedimento de medição. A cobertura identificável é 48/60, ou 80%. Isso não determina aceitação técnica do material, apenas revela a lacuna de rastreabilidade; a regra de aceite deve vir do projeto e do profissional competente. O exemplo demonstra uma decisão de planejamento, cuja execução exige confirmação do responsável técnico e das regras locais. Nenhuma economia de prazo justifica ignorar inspeção ou requisito de segurança. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.building.govt.nz/building-code-compliance",
      "https://www.safeworkaustralia.gov.au/safety-topic/industry-and-business/construction"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-estimativa-de-custos-de-retrofit-termico-residencial",
    "title": "Estimativa de custos de retrofit térmico residencial",
    "track": "industry",
    "role": "Analista de planejamento e informação de construção",
    "positioning": "specialist",
    "scenario": "Dois pacotes fictícios custam 18000 e 24000 unidades e economizam 1500 e 2400 unidades anuais, sem financiamento.",
    "decision": "Calcular retornos simples de 12 e 10 anos e apresentar custos, benefícios e limitações antes de recomendar.",
    "misconception": "Escolher o menor preço inicial afirmando que sempre tem melhor retorno.",
    "changedConstraint": "O segundo pacote exige manutenção adicional de 400 por ano.",
    "tasks": [
      "Planilha de custos comparáveis",
      "Inventário de premissas térmicas",
      "Cálculo de retorno simples",
      "Sensibilidade de tarifa",
      "Comparação de manutenção",
      "Memorando de alternativas"
    ],
    "method": "Compare soluções na mesma fronteira de instalação, manutenção e uso. O retorno simples divide investimento pela economia anual e omite valor temporal e risco. Refaça a economia líquida quando surgem despesas e teste sensibilidade às tarifas. Em planejamento de construção, separe desenho autorizado, hipótese de orçamento e instrução de execução. Quantidade representa escopo medido; produtividade depende de acesso, sequência, equipe e inspeção. Uma folga de cronograma não elimina uma restrição técnica. Estruture cada item com localização, revisão do documento, unidade e dependência. Compare alternativas usando a mesma fronteira de custo e registre exclusões. Inspeções e aprovações pertencem aos responsáveis habilitados. O estudante prepara informações para decisão e identifica pontos de parada; não emite laudo estrutural, certificação de conformidade ou autorização de trabalho. Reavalie segurança, qualidade e prazo conjuntamente sempre que uma mudança alterar o método construtivo. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Dois pacotes fictícios custam 18000 e 24000 unidades e economizam 1500 e 2400 unidades anuais, sem financiamento. Resolução: Calcular retornos simples de 12 e 10 anos e apresentar custos, benefícios e limitações antes de recomendar. Com manutenção adicional, a economia líquida do pacote de 24000 cai para 2000 e seu retorno simples passa a 12 anos. Empatar esse indicador não torna os pacotes equivalentes em conforto, vida útil ou risco. O exemplo demonstra uma decisão de planejamento, cuja execução exige confirmação do responsável técnico e das regras locais. Nenhuma economia de prazo justifica ignorar inspeção ou requisito de segurança. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.building.govt.nz/building-code-compliance",
      "https://www.safeworkaustralia.gov.au/safety-topic/industry-and-business/construction"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-coordenacao-de-passagens-de-servicos-em-estruturas-de-madeira",
    "title": "Coordenação de passagens de serviços em estruturas de madeira",
    "track": "industry",
    "role": "Analista de planejamento e informação de construção",
    "positioning": "specialist",
    "scenario": "Um modelo contém 30 passagens propostas e quatro atravessam zonas marcadas como restritas no desenho autorizado.",
    "decision": "Encaminhar as quatro para decisão do projetista e bloquear sua liberação executiva.",
    "misconception": "Mover ou perfurar as quatro passagens por conveniência da instalação.",
    "changedConstraint": "A instalação altera o diâmetro de duas passagens aprovadas.",
    "tasks": [
      "Cadastro de passagens",
      "Mapa de zonas restritas",
      "Registro de solicitações técnicas",
      "Matriz de responsáveis",
      "Controle de mudanças dimensionais",
      "Pacote de liberação rastreável"
    ],
    "method": "Use identificadores de passagem e registre elemento, posição, dimensão, restrição e estado de autorização. Coordenação espacial identifica incompatibilidade; ela não calcula capacidade estrutural. Toda mudança de dimensão precisa retornar ao fluxo de verificação apropriado. Em planejamento de construção, separe desenho autorizado, hipótese de orçamento e instrução de execução. Quantidade representa escopo medido; produtividade depende de acesso, sequência, equipe e inspeção. Uma folga de cronograma não elimina uma restrição técnica. Estruture cada item com localização, revisão do documento, unidade e dependência. Compare alternativas usando a mesma fronteira de custo e registre exclusões. Inspeções e aprovações pertencem aos responsáveis habilitados. O estudante prepara informações para decisão e identifica pontos de parada; não emite laudo estrutural, certificação de conformidade ou autorização de trabalho. Reavalie segurança, qualidade e prazo conjuntamente sempre que uma mudança alterar o método construtivo. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um modelo contém 30 passagens propostas e quatro atravessam zonas marcadas como restritas no desenho autorizado. Resolução: Encaminhar as quatro para decisão do projetista e bloquear sua liberação executiva. As quatro ocorrências não são quatro defeitos confirmados, mas quatro propostas sem liberação. As outras 26 ainda dependem dos demais requisitos de instalação. A revisão de diâmetro invalida a simples reutilização da aprovação anterior. O exemplo demonstra uma decisão de planejamento, cuja execução exige confirmação do responsável técnico e das regras locais. Nenhuma economia de prazo justifica ignorar inspeção ou requisito de segurança. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.building.govt.nz/building-code-compliance",
      "https://www.safeworkaustralia.gov.au/safety-topic/industry-and-business/construction",
      "https://www.buildingsmart.org/standards/bsi-standards/bim-collaboration-format/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-gestao-de-produtividade-em-frentes-de-reconstrucao-pos-ciclone",
    "title": "Gestão de produtividade em frentes de reconstrução pós-ciclone",
    "track": "industry",
    "role": "Analista de planejamento e informação de construção",
    "positioning": "specialist",
    "scenario": "Três frentes têm 20, 30 e 40 tarefas; apenas a primeira possui acesso e materiais confirmados.",
    "decision": "Liberar inicialmente as 20 tarefas prontas e remover restrições das outras frentes sem prometer execução imediata.",
    "misconception": "Dividir toda a equipe pelas 90 tarefas ignorando acesso e suprimentos.",
    "changedConstraint": "Uma estrada liberada volta a ficar interditada.",
    "tasks": [
      "Quadro de restrições",
      "Backlog por frente",
      "Critérios de prontidão",
      "Plano semanal executável",
      "Simulação de nova interdição",
      "Relatório de confiabilidade de promessas"
    ],
    "method": "Separe trabalho planejado de trabalho pronto para execução. Registre restrições com responsável e data de revisão; tamanho do backlog não mede capacidade disponível. A programação curta utiliza apenas tarefas seguras, autorizadas e com pré-requisitos satisfeitos. Em planejamento de construção, separe desenho autorizado, hipótese de orçamento e instrução de execução. Quantidade representa escopo medido; produtividade depende de acesso, sequência, equipe e inspeção. Uma folga de cronograma não elimina uma restrição técnica. Estruture cada item com localização, revisão do documento, unidade e dependência. Compare alternativas usando a mesma fronteira de custo e registre exclusões. Inspeções e aprovações pertencem aos responsáveis habilitados. O estudante prepara informações para decisão e identifica pontos de parada; não emite laudo estrutural, certificação de conformidade ou autorização de trabalho. Reavalie segurança, qualidade e prazo conjuntamente sempre que uma mudança alterar o método construtivo. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Três frentes têm 20, 30 e 40 tarefas; apenas a primeira possui acesso e materiais confirmados. Resolução: Liberar inicialmente as 20 tarefas prontas e remover restrições das outras frentes sem prometer execução imediata. O total de 90 tarefas descreve escopo, enquanto 20 descrevem prontidão atual. A interdição exige atualizar o conjunto executável e a comunicação de prazo, preservando critérios de segurança e acesso das equipes locais. O exemplo demonstra uma decisão de planejamento, cuja execução exige confirmação do responsável técnico e das regras locais. Nenhuma economia de prazo justifica ignorar inspeção ou requisito de segurança. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.building.govt.nz/building-code-compliance",
      "https://www.safeworkaustralia.gov.au/safety-topic/industry-and-business/construction"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-quantificacao-de-residuos-de-demolicao-por-fluxo",
    "title": "Quantificação de resíduos de demolição por fluxo",
    "track": "industry",
    "role": "Analista de planejamento e informação de construção",
    "positioning": "broad",
    "scenario": "Uma demolição gera 80 toneladas, sendo 50 minerais, 18 madeira, oito metais e quatro materiais ainda não classificados.",
    "decision": "Manter quatro toneladas sem classificação e calcular recuperação somente após comprovar a destinação de cada fluxo.",
    "misconception": "Declarar as 80 toneladas recicladas porque foram retiradas do canteiro.",
    "changedConstraint": "A recicladora rejeita seis toneladas minerais contaminadas.",
    "tasks": [
      "Balanço de massa",
      "Cadastro de transportes",
      "Matriz de destinos",
      "Conciliação de comprovantes",
      "Registro de rejeições",
      "Indicador de recuperação verificável"
    ],
    "method": "Use balanço de massa e comprovantes de recebimento por classe. Saída do canteiro não equivale a reciclagem. Materiais potencialmente perigosos exigem avaliação e gestão competente; o laboratório não instrui manuseio ou identificação visual definitiva. Em planejamento de construção, separe desenho autorizado, hipótese de orçamento e instrução de execução. Quantidade representa escopo medido; produtividade depende de acesso, sequência, equipe e inspeção. Uma folga de cronograma não elimina uma restrição técnica. Estruture cada item com localização, revisão do documento, unidade e dependência. Compare alternativas usando a mesma fronteira de custo e registre exclusões. Inspeções e aprovações pertencem aos responsáveis habilitados. O estudante prepara informações para decisão e identifica pontos de parada; não emite laudo estrutural, certificação de conformidade ou autorização de trabalho. Reavalie segurança, qualidade e prazo conjuntamente sempre que uma mudança alterar o método construtivo. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma demolição gera 80 toneladas, sendo 50 minerais, 18 madeira, oito metais e quatro materiais ainda não classificados. Resolução: Manter quatro toneladas sem classificação e calcular recuperação somente após comprovar a destinação de cada fluxo. A soma dos fluxos reconcilia 80 toneladas, mas a destinação pode mudar o numerador da taxa de recuperação. A rejeição de seis toneladas deve aparecer como devolução ou nova destinação, sem apagar o registro original. O exemplo demonstra uma decisão de planejamento, cuja execução exige confirmação do responsável técnico e das regras locais. Nenhuma economia de prazo justifica ignorar inspeção ou requisito de segurança. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.building.govt.nz/building-code-compliance",
      "https://www.safeworkaustralia.gov.au/safety-topic/industry-and-business/construction"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-planejamento-de-manutencao-de-imoveis-comunitarios-remotos",
    "title": "Planejamento de manutenção de imóveis comunitários remotos",
    "track": "industry",
    "role": "Analista de planejamento e informação de construção",
    "positioning": "specialist",
    "scenario": "Dez edifícios precisam de visitas e uma viagem comporta três imóveis, mas quatro possuem documentação incompleta.",
    "decision": "Agrupar visitas viáveis por rota e obter a documentação dos quatro antes de assumir escopo fechado.",
    "misconception": "Orçar todos como idênticos multiplicando o preço de uma visita por dez.",
    "changedConstraint": "Uma ilha fica sem ligação marítima por duas semanas.",
    "tasks": [
      "Inventário de ativos",
      "Matriz de documentação faltante",
      "Agrupamento de rotas",
      "Estimativa de deslocamento",
      "Plano de contingência insular",
      "Pacote de ordem de serviço"
    ],
    "method": "Estruture o inventário por ativo, sintoma relatado, acesso, dependência e urgência confirmada. Planejamento de manutenção remota inclui deslocamento e disponibilidade local de peças. Relato de usuário é entrada para triagem, não diagnóstico técnico definitivo. Em planejamento de construção, separe desenho autorizado, hipótese de orçamento e instrução de execução. Quantidade representa escopo medido; produtividade depende de acesso, sequência, equipe e inspeção. Uma folga de cronograma não elimina uma restrição técnica. Estruture cada item com localização, revisão do documento, unidade e dependência. Compare alternativas usando a mesma fronteira de custo e registre exclusões. Inspeções e aprovações pertencem aos responsáveis habilitados. O estudante prepara informações para decisão e identifica pontos de parada; não emite laudo estrutural, certificação de conformidade ou autorização de trabalho. Reavalie segurança, qualidade e prazo conjuntamente sempre que uma mudança alterar o método construtivo. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Dez edifícios precisam de visitas e uma viagem comporta três imóveis, mas quatro possuem documentação incompleta. Resolução: Agrupar visitas viáveis por rota e obter a documentação dos quatro antes de assumir escopo fechado. Seriam necessárias pelo menos quatro viagens se todos os dez estivessem prontos e a capacidade fosse o único limite. Documentação, risco e geografia podem aumentar esse número; a conta é um limite inferior de planejamento. O exemplo demonstra uma decisão de planejamento, cuja execução exige confirmação do responsável técnico e das regras locais. Nenhuma economia de prazo justifica ignorar inspeção ou requisito de segurança. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.building.govt.nz/building-code-compliance",
      "https://www.safeworkaustralia.gov.au/safety-topic/industry-and-business/construction"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-balanco-horario-de-minirredes-solares-insulares",
    "title": "Balanço horário de minirredes solares insulares",
    "track": "energy",
    "role": "Analista de eficiência e operação energética",
    "positioning": "specialist",
    "scenario": "Uma minirrede fictícia em Fiji produz 90 kWh durante o dia, atende 65 kWh diurnos e precisa entregar 30 kWh à noite, sem considerar perdas.",
    "decision": "Identificar excedente diurno de 25 kWh e déficit noturno mínimo de 5 kWh antes de incluir armazenamento e perdas.",
    "misconception": "Afirmar autossuficiência porque a potência de pico instalada parece elevada.",
    "changedConstraint": "A eficiência total de armazenamento passa a 80%.",
    "tasks": [
      "Balanço horário de energia",
      "Classificação de cargas críticas",
      "Mapa de excedentes",
      "Cálculo de perdas",
      "Simulação de dia nublado",
      "Memória de alternativas de suprimento"
    ],
    "method": "Construa balanços por intervalo e separe geração direta, carga atendida, excedente e energia não suprida. A eficiência deve ser aplicada à energia que atravessa o armazenamento, não à geração consumida diretamente. Avalie cargas críticas antes de dimensionar alternativas. Na análise energética, potência representa taxa de transferência e energia representa acúmulo durante um intervalo. Converta unidades antes de comparar alternativas e diferencie economia técnica, economia financeira e disponibilidade do serviço. Defina fronteira de medição, período, linha de base e condições de operação. Uma comparação normalizada deve considerar produção, clima ou ocupação quando esses fatores mudam. Registre perdas, autoconsumo, manutenção e incerteza. Dados agregados não autorizam intervenção elétrica nem projeto executivo: conexões, proteção, instalação e operação de equipamentos dependem de profissionais habilitados e requisitos locais. O resultado do curso é uma análise rastreável de opções, com premissas explícitas e critérios para solicitar avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma minirrede fictícia em Fiji produz 90 kWh durante o dia, atende 65 kWh diurnos e precisa entregar 30 kWh à noite, sem considerar perdas. Resolução: Identificar excedente diurno de 25 kWh e déficit noturno mínimo de 5 kWh antes de incluir armazenamento e perdas. Com 25 kWh enviados ao armazenamento e eficiência de 80%, apenas 20 kWh retornam e o déficit noturno sobe a 10 kWh. O resultado mostra uma lacuna energética, mas não dimensiona inversores ou proteções. Uma medida parece atraente somente quando serviço entregue, fronteira e período são comparáveis. O exercício calcula um indicador simplificado, sem garantir economia real, desempenho do equipamento ou aprovação regulatória. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.energy.gov.au/business/equipment-guides",
      "https://www.energy.gov.au/business/energy-management-business/3-implement-energy-savings",
      "https://www.energy.gov.au/business/equipment-guides/renewable-energy"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-priorizacao-de-vazamentos-em-ar-comprimido-industrial",
    "title": "Priorização de vazamentos em ar comprimido industrial",
    "track": "energy",
    "role": "Analista de eficiência e operação energética",
    "positioning": "specialist",
    "scenario": "Uma fábrica mede vazamentos estimados de 4, 8 e 3 kW equivalentes, todos por 4000 horas anuais.",
    "decision": "Priorizar inspeção do vazamento de 8 kW, cuja exposição estimada é 32000 kWh anuais, verificando custo e acesso.",
    "misconception": "Tratar todos os vazamentos como equivalentes por serem três ocorrências.",
    "changedConstraint": "O maior vazamento opera apenas 1000 horas no próximo turno.",
    "tasks": [
      "Inventário de vazamentos",
      "Registro de horas operacionais",
      "Estimativa de energia evitável",
      "Matriz de custo e acesso",
      "Cenário de alteração de turnos",
      "Plano de verificação pós-reparo"
    ],
    "method": "Converta potência equivalente em energia usando horas de ocorrência confirmadas. Evite extrapolar o funcionamento do compressor para cada vazamento sem evidência. Priorize energia evitável, custo de correção e risco de parada em conjunto. Na análise energética, potência representa taxa de transferência e energia representa acúmulo durante um intervalo. Converta unidades antes de comparar alternativas e diferencie economia técnica, economia financeira e disponibilidade do serviço. Defina fronteira de medição, período, linha de base e condições de operação. Uma comparação normalizada deve considerar produção, clima ou ocupação quando esses fatores mudam. Registre perdas, autoconsumo, manutenção e incerteza. Dados agregados não autorizam intervenção elétrica nem projeto executivo: conexões, proteção, instalação e operação de equipamentos dependem de profissionais habilitados e requisitos locais. O resultado do curso é uma análise rastreável de opções, com premissas explícitas e critérios para solicitar avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma fábrica mede vazamentos estimados de 4, 8 e 3 kW equivalentes, todos por 4000 horas anuais. Resolução: Priorizar inspeção do vazamento de 8 kW, cuja exposição estimada é 32000 kWh anuais, verificando custo e acesso. No cenário inicial, os totais são 16000, 32000 e 12000 kWh. Com apenas 1000 horas, o segundo cai a 8000 kWh e deixa de ser o maior por exposição, demonstrando a importância do regime real. Uma medida parece atraente somente quando serviço entregue, fronteira e período são comparáveis. O exercício calcula um indicador simplificado, sem garantir economia real, desempenho do equipamento ou aprovação regulatória. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.energy.gov.au/business/equipment-guides",
      "https://www.energy.gov.au/business/energy-management-business/3-implement-energy-savings",
      "https://www.energy.gov.au/business/equipment-guides/compressed-air"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-normalizacao-de-consumo-em-camaras-frias-sazonais",
    "title": "Normalização de consumo em câmaras frias sazonais",
    "track": "energy",
    "role": "Analista de eficiência e operação energética",
    "positioning": "broad",
    "scenario": "Uma câmara usa 12000 kWh para 300 toneladas em março e 10000 kWh para 200 toneladas em abril.",
    "decision": "Comparar intensidades de 40 e 50 kWh por tonelada e investigar condições operacionais antes de afirmar melhora.",
    "misconception": "Declarar melhora de eficiência porque o consumo total caiu.",
    "changedConstraint": "A temperatura externa de abril é muito menor.",
    "tasks": [
      "Base de consumo e produção",
      "Dicionário de variáveis operacionais",
      "Indicador kWh por tonelada",
      "Mapa de condições ambientais",
      "Plano de investigação",
      "Relatório de comparação normalizada"
    ],
    "method": "Use indicadores de consumo específico e preserve variáveis explicativas. Consumo por tonelada é uma triagem; temperatura de entrada, abertura de portas, clima e regime de operação afetam o resultado. Separe causalidade de correlação e registre dados faltantes. Na análise energética, potência representa taxa de transferência e energia representa acúmulo durante um intervalo. Converta unidades antes de comparar alternativas e diferencie economia técnica, economia financeira e disponibilidade do serviço. Defina fronteira de medição, período, linha de base e condições de operação. Uma comparação normalizada deve considerar produção, clima ou ocupação quando esses fatores mudam. Registre perdas, autoconsumo, manutenção e incerteza. Dados agregados não autorizam intervenção elétrica nem projeto executivo: conexões, proteção, instalação e operação de equipamentos dependem de profissionais habilitados e requisitos locais. O resultado do curso é uma análise rastreável de opções, com premissas explícitas e critérios para solicitar avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma câmara usa 12000 kWh para 300 toneladas em março e 10000 kWh para 200 toneladas em abril. Resolução: Comparar intensidades de 40 e 50 kWh por tonelada e investigar condições operacionais antes de afirmar melhora. A queda absoluta de 2000 kWh acompanha menor produção, mas a intensidade aumenta 25%. O clima mais frio poderia favorecer abril, porém sem controle das demais variáveis não se identifica a causa da piora. Uma medida parece atraente somente quando serviço entregue, fronteira e período são comparáveis. O exercício calcula um indicador simplificado, sem garantir economia real, desempenho do equipamento ou aprovação regulatória. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.energy.gov.au/business/equipment-guides",
      "https://www.energy.gov.au/business/energy-management-business/3-implement-energy-savings",
      "https://www.energy.gov.au/business/equipment-guides/refrigeration"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-verificacao-de-faturas-de-demanda-eletrica",
    "title": "Verificação de faturas de demanda elétrica",
    "track": "energy",
    "role": "Analista de eficiência e operação energética",
    "positioning": "specialist",
    "scenario": "Uma unidade tem demanda medida de 180 kW e tarifa fictícia de 20 unidades por kW, mas a fatura lança 220 kW.",
    "decision": "Apontar diferença de 40 kW e 800 unidades sob a regra simplificada, conferindo contrato e período de medição.",
    "misconception": "Descontar unilateralmente a diferença sem verificar a regra contratual.",
    "changedConstraint": "O contrato prevê um piso de cobrança de 200 kW.",
    "tasks": [
      "Extrato de medições",
      "Matriz de regras tarifárias",
      "Reconciliação de fatura",
      "Cálculo de divergência",
      "Teste de piso contratual",
      "Dossiê de esclarecimento ao fornecedor"
    ],
    "method": "Reconcilie demanda registrada, janela temporal, regra contratual e unidade tarifária. Demanda máxima e energia consumida são componentes diferentes. Um piso pode alterar a cobrança mesmo quando a medição está correta; registre a divergência como solicitação de esclarecimento. Na análise energética, potência representa taxa de transferência e energia representa acúmulo durante um intervalo. Converta unidades antes de comparar alternativas e diferencie economia técnica, economia financeira e disponibilidade do serviço. Defina fronteira de medição, período, linha de base e condições de operação. Uma comparação normalizada deve considerar produção, clima ou ocupação quando esses fatores mudam. Registre perdas, autoconsumo, manutenção e incerteza. Dados agregados não autorizam intervenção elétrica nem projeto executivo: conexões, proteção, instalação e operação de equipamentos dependem de profissionais habilitados e requisitos locais. O resultado do curso é uma análise rastreável de opções, com premissas explícitas e critérios para solicitar avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma unidade tem demanda medida de 180 kW e tarifa fictícia de 20 unidades por kW, mas a fatura lança 220 kW. Resolução: Apontar diferença de 40 kW e 800 unidades sob a regra simplificada, conferindo contrato e período de medição. Com piso de 200 kW, a referência simplificada passa a 4000 unidades e a divergência para 4400 cai a 400. O analista deve anexar regra e medição, sem afirmar cobrança indevida antes da confirmação. Uma medida parece atraente somente quando serviço entregue, fronteira e período são comparáveis. O exercício calcula um indicador simplificado, sem garantir economia real, desempenho do equipamento ou aprovação regulatória. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.energy.gov.au/business/equipment-guides",
      "https://www.energy.gov.au/business/energy-management-business/3-implement-energy-savings",
      "https://www.energy.gov.au/business/equipment-guides/metering-and-monitoring"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-analise-de-perdas-em-distribuicao-de-agua-quente",
    "title": "Análise de perdas em distribuição de água quente",
    "track": "energy",
    "role": "Analista de eficiência e operação energética",
    "positioning": "specialist",
    "scenario": "Uma instalação fornece 2400 kWh térmicos e entrega 1800 kWh úteis, medidos na mesma semana.",
    "decision": "Calcular perda de 600 kWh e eficiência aparente de 75%, verificando compatibilidade dos medidores.",
    "misconception": "Chamar os 600 kWh de consumo evitável garantido.",
    "changedConstraint": "Um dos medidores apresenta defasagem de um dia.",
    "tasks": [
      "Diagrama de fronteira térmica",
      "Cadastro de medidores",
      "Alinhamento temporal",
      "Balanço de energia",
      "Matriz de hipóteses de perda",
      "Plano de confirmação de economia"
    ],
    "method": "Defina entradas e saídas da fronteira térmica e alinhe intervalos. A diferença inclui perdas e possíveis erros de medição; não equivale automaticamente a economia realizável. Compare isolamento, horários e manutenção sem instruir intervenção em equipamento pressurizado. Na análise energética, potência representa taxa de transferência e energia representa acúmulo durante um intervalo. Converta unidades antes de comparar alternativas e diferencie economia técnica, economia financeira e disponibilidade do serviço. Defina fronteira de medição, período, linha de base e condições de operação. Uma comparação normalizada deve considerar produção, clima ou ocupação quando esses fatores mudam. Registre perdas, autoconsumo, manutenção e incerteza. Dados agregados não autorizam intervenção elétrica nem projeto executivo: conexões, proteção, instalação e operação de equipamentos dependem de profissionais habilitados e requisitos locais. O resultado do curso é uma análise rastreável de opções, com premissas explícitas e critérios para solicitar avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma instalação fornece 2400 kWh térmicos e entrega 1800 kWh úteis, medidos na mesma semana. Resolução: Calcular perda de 600 kWh e eficiência aparente de 75%, verificando compatibilidade dos medidores. A conta 1800/2400 fornece 75% apenas se períodos e unidades forem compatíveis. A defasagem impede interpretar o balanço como perda física até reconstruir a janela comum ou registrar a limitação. Uma medida parece atraente somente quando serviço entregue, fronteira e período são comparáveis. O exercício calcula um indicador simplificado, sem garantir economia real, desempenho do equipamento ou aprovação regulatória. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.energy.gov.au/business/equipment-guides",
      "https://www.energy.gov.au/business/energy-management-business/3-implement-energy-savings",
      "https://www.energy.gov.au/business/equipment-guides/process-heat-and-steam"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-otimizacao-documental-de-carregamento-de-frotas-eletricas",
    "title": "Otimização documental de carregamento de frotas elétricas",
    "track": "energy",
    "role": "Analista de eficiência e operação energética",
    "positioning": "specialist",
    "scenario": "Cinco veículos precisam de 20 kWh cada e há quatro horas com limite agregado de 30 kW, sem perdas.",
    "decision": "Reconhecer demanda de 100 kWh e capacidade energética de 120 kWh, testando a programação por veículo e horário.",
    "misconception": "Ligar todos simultaneamente ignorando o limite de potência.",
    "changedConstraint": "Dois veículos devem partir após apenas uma hora.",
    "tasks": [
      "Cadastro de janelas de veículos",
      "Balanço energético da frota",
      "Matriz de potência por intervalo",
      "Agenda de carregamento",
      "Teste de partidas antecipadas",
      "Relatório de energia não entregue"
    ],
    "method": "Modele restrições de energia requerida, potência disponível, chegada e partida. Viabilidade agregada não prova viabilidade individual: cada veículo tem janela e limite de aceitação. Use uma tabela de alocação por intervalo e registre energia não entregue. Na análise energética, potência representa taxa de transferência e energia representa acúmulo durante um intervalo. Converta unidades antes de comparar alternativas e diferencie economia técnica, economia financeira e disponibilidade do serviço. Defina fronteira de medição, período, linha de base e condições de operação. Uma comparação normalizada deve considerar produção, clima ou ocupação quando esses fatores mudam. Registre perdas, autoconsumo, manutenção e incerteza. Dados agregados não autorizam intervenção elétrica nem projeto executivo: conexões, proteção, instalação e operação de equipamentos dependem de profissionais habilitados e requisitos locais. O resultado do curso é uma análise rastreável de opções, com premissas explícitas e critérios para solicitar avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Cinco veículos precisam de 20 kWh cada e há quatro horas com limite agregado de 30 kW, sem perdas. Resolução: Reconhecer demanda de 100 kWh e capacidade energética de 120 kWh, testando a programação por veículo e horário. Há 20 kWh de folga energética no período completo, mas os dois veículos prioritários demandam 40 kWh em uma hora contra 30 kWh disponíveis. A restrição de partida torna o plano inviável sem alternativa. Uma medida parece atraente somente quando serviço entregue, fronteira e período são comparáveis. O exercício calcula um indicador simplificado, sem garantir economia real, desempenho do equipamento ou aprovação regulatória. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.energy.gov.au/business/equipment-guides",
      "https://www.energy.gov.au/business/energy-management-business/3-implement-energy-savings"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-medicao-de-autoconsumo-solar-em-escolas",
    "title": "Medição de autoconsumo solar em escolas",
    "track": "energy",
    "role": "Analista de eficiência e operação energética",
    "positioning": "broad",
    "scenario": "Uma escola, sem bateria e com o mesmo perímetro de medição, gera 500 kWh, exporta 180 kWh e importa 240 kWh na mesma semana; não há outras fontes de energia.",
    "decision": "Calcular autoconsumo de 320 kWh, taxa de autoconsumo de 64% e consumo total de 560 kWh.",
    "misconception": "Confundir taxa de autoconsumo de 64% com cobertura de toda a demanda.",
    "changedConstraint": "A escola fecha durante férias e a exportação aumenta.",
    "tasks": [
      "Dicionário de fluxos elétricos",
      "Reconciliação de medidores",
      "Cálculo de autoconsumo",
      "Indicador de cobertura solar",
      "Comparação de período letivo e férias",
      "Memorando de uso simultâneo"
    ],
    "method": "Diferencie geração, autoconsumo, exportação e consumo da unidade. A taxa de autoconsumo divide energia solar consumida pela geração; a cobertura solar divide essa energia pela demanda total. Alinhe períodos e trate férias como mudança de perfil. Na análise energética, potência representa taxa de transferência e energia representa acúmulo durante um intervalo. Converta unidades antes de comparar alternativas e diferencie economia técnica, economia financeira e disponibilidade do serviço. Defina fronteira de medição, período, linha de base e condições de operação. Uma comparação normalizada deve considerar produção, clima ou ocupação quando esses fatores mudam. Registre perdas, autoconsumo, manutenção e incerteza. Dados agregados não autorizam intervenção elétrica nem projeto executivo: conexões, proteção, instalação e operação de equipamentos dependem de profissionais habilitados e requisitos locais. O resultado do curso é uma análise rastreável de opções, com premissas explícitas e critérios para solicitar avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma escola, sem bateria e com o mesmo perímetro de medição, gera 500 kWh, exporta 180 kWh e importa 240 kWh na mesma semana; não há outras fontes de energia. Resolução: Calcular autoconsumo de 320 kWh, taxa de autoconsumo de 64% e consumo total de 560 kWh. A cobertura da demanda é 320/560, cerca de 57,14%, distinta de 64%. A mesma geração pode apresentar taxa menor nas férias sem piora técnica do sistema, por causa do menor consumo simultâneo. Uma medida parece atraente somente quando serviço entregue, fronteira e período são comparáveis. O exercício calcula um indicador simplificado, sem garantir economia real, desempenho do equipamento ou aprovação regulatória. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.energy.gov.au/business/equipment-guides",
      "https://www.energy.gov.au/business/energy-management-business/3-implement-energy-savings",
      "https://www.energy.gov.au/business/equipment-guides/renewable-energy"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-avaliacao-de-substituicao-de-motores-por-regime-de-carga",
    "title": "Avaliação de substituição de motores por regime de carga",
    "track": "energy",
    "role": "Analista de eficiência e operação energética",
    "positioning": "specialist",
    "scenario": "Um motor consome 10 kW durante 2000 horas e outro estimado em serviço equivalente consumiria 8,5 kW.",
    "decision": "Estimar economia bruta de 3000 kWh anuais e validar equivalência de carga antes de valorar.",
    "misconception": "Usar a potência de placa como consumo constante sem medição.",
    "changedConstraint": "O novo equipamento opera 300 horas adicionais por ano.",
    "tasks": [
      "Perfil de carga",
      "Linha de base de horas",
      "Comparação de energia",
      "Análise de investimento incremental",
      "Cenário de extensão operacional",
      "Requisitos para validação técnica"
    ],
    "method": "Compare potência de entrada medida em condições de serviço equivalentes. Horas adicionais, controles e manutenção podem compensar ganhos unitários. O estudo econômico deve distinguir investimento incremental de investimento total e apontar necessidade de especificação técnica. Na análise energética, potência representa taxa de transferência e energia representa acúmulo durante um intervalo. Converta unidades antes de comparar alternativas e diferencie economia técnica, economia financeira e disponibilidade do serviço. Defina fronteira de medição, período, linha de base e condições de operação. Uma comparação normalizada deve considerar produção, clima ou ocupação quando esses fatores mudam. Registre perdas, autoconsumo, manutenção e incerteza. Dados agregados não autorizam intervenção elétrica nem projeto executivo: conexões, proteção, instalação e operação de equipamentos dependem de profissionais habilitados e requisitos locais. O resultado do curso é uma análise rastreável de opções, com premissas explícitas e critérios para solicitar avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um motor consome 10 kW durante 2000 horas e outro estimado em serviço equivalente consumiria 8,5 kW. Resolução: Estimar economia bruta de 3000 kWh anuais e validar equivalência de carga antes de valorar. Se o novo motor operar 2300 horas, consumirá 19550 kWh contra 20000 do cenário inicial, reduzindo a economia bruta a 450 kWh. Essa comparação ainda depende de igual serviço entregue, que precisa ser explicitado. Uma medida parece atraente somente quando serviço entregue, fronteira e período são comparáveis. O exercício calcula um indicador simplificado, sem garantir economia real, desempenho do equipamento ou aprovação regulatória. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.energy.gov.au/business/equipment-guides",
      "https://www.energy.gov.au/business/energy-management-business/3-implement-energy-savings"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-monitoramento-de-indisponibilidade-em-sistemas-solares-remotos",
    "title": "Monitoramento de indisponibilidade em sistemas solares remotos",
    "track": "energy",
    "role": "Analista de eficiência e operação energética",
    "positioning": "specialist",
    "scenario": "Uma instalação tem 200 horas programadas e fica indisponível por 12 horas, sendo oito sem telemetria e quatro com falha confirmada.",
    "decision": "Separar disponibilidade confirmada de lacuna de observação e evitar classificar todas as 12 horas como falha física.",
    "misconception": "Reportar disponibilidade técnica de 94% como fato sem distinguir ausência de dados.",
    "changedConstraint": "Um registro manual comprova produção em cinco das oito horas sem telemetria.",
    "tasks": [
      "Taxonomia de estados",
      "Linha do tempo de eventos",
      "Indicador de cobertura de telemetria",
      "Registro de evidência manual",
      "Conciliação de indisponibilidade",
      "Plano de melhoria de observabilidade"
    ],
    "method": "Defina estados observado em serviço, falha confirmada e desconhecido. Disponibilidade técnica exige evidência do estado; cobertura de telemetria mede outra dimensão. Use intervalos sem sobreposição e incorpore evidência manual com proveniência. Na análise energética, potência representa taxa de transferência e energia representa acúmulo durante um intervalo. Converta unidades antes de comparar alternativas e diferencie economia técnica, economia financeira e disponibilidade do serviço. Defina fronteira de medição, período, linha de base e condições de operação. Uma comparação normalizada deve considerar produção, clima ou ocupação quando esses fatores mudam. Registre perdas, autoconsumo, manutenção e incerteza. Dados agregados não autorizam intervenção elétrica nem projeto executivo: conexões, proteção, instalação e operação de equipamentos dependem de profissionais habilitados e requisitos locais. O resultado do curso é uma análise rastreável de opções, com premissas explícitas e critérios para solicitar avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma instalação tem 200 horas programadas e fica indisponível por 12 horas, sendo oito sem telemetria e quatro com falha confirmada. Resolução: Separar disponibilidade confirmada de lacuna de observação e evitar classificar todas as 12 horas como falha física. Inicialmente há 188 horas observadas sem falha e oito desconhecidas. A confirmação manual reduz o desconhecido a três horas, sem alterar as quatro horas de falha; o relatório deve mostrar a evolução da evidência. Uma medida parece atraente somente quando serviço entregue, fronteira e período são comparáveis. O exercício calcula um indicador simplificado, sem garantir economia real, desempenho do equipamento ou aprovação regulatória. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.energy.gov.au/business/equipment-guides",
      "https://www.energy.gov.au/business/energy-management-business/3-implement-energy-savings",
      "https://www.energy.gov.au/business/equipment-guides/metering-and-monitoring"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-provisao-financeira-de-manutencao-de-minirredes",
    "title": "Provisão financeira de manutenção de minirredes",
    "track": "energy",
    "role": "Analista de eficiência e operação energética",
    "positioning": "specialist",
    "scenario": "Uma comunidade arrecada 3000 unidades mensais, gasta 2200 na operação e precisa reservar 12000 anuais para manutenção.",
    "decision": "Identificar superávit operacional de 800 mensais e insuficiência de 200 mensais para a reserva prevista.",
    "misconception": "Tratar o superávit de operação como lucro disponível para distribuição.",
    "changedConstraint": "A arrecadação cai 15% por três meses.",
    "tasks": [
      "Fluxo de caixa operacional",
      "Calendário de reposições",
      "Política simulada de reserva",
      "Cálculo de insuficiência",
      "Cenário de queda de arrecadação",
      "Memorando de sustentabilidade financeira"
    ],
    "method": "Separe despesas recorrentes, reserva para reposição e fluxo de caixa. Uma conta de manutenção anual precisa de provisão mensal e regra de uso. Teste inadimplência e sazonalidade sem presumir que aumento tarifário é automaticamente permitido ou socialmente viável. Na análise energética, potência representa taxa de transferência e energia representa acúmulo durante um intervalo. Converta unidades antes de comparar alternativas e diferencie economia técnica, economia financeira e disponibilidade do serviço. Defina fronteira de medição, período, linha de base e condições de operação. Uma comparação normalizada deve considerar produção, clima ou ocupação quando esses fatores mudam. Registre perdas, autoconsumo, manutenção e incerteza. Dados agregados não autorizam intervenção elétrica nem projeto executivo: conexões, proteção, instalação e operação de equipamentos dependem de profissionais habilitados e requisitos locais. O resultado do curso é uma análise rastreável de opções, com premissas explícitas e critérios para solicitar avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma comunidade arrecada 3000 unidades mensais, gasta 2200 na operação e precisa reservar 12000 anuais para manutenção. Resolução: Identificar superávit operacional de 800 mensais e insuficiência de 200 mensais para a reserva prevista. A reserva requerida é 1000 por mês, superior aos 800 disponíveis. Com queda de 15%, a receita vai a 2550 e o saldo operacional a 350, ampliando a lacuna de provisão para 650 mensais. Uma medida parece atraente somente quando serviço entregue, fronteira e período são comparáveis. O exercício calcula um indicador simplificado, sem garantir economia real, desempenho do equipamento ou aprovação regulatória. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.energy.gov.au/business/equipment-guides",
      "https://www.energy.gov.au/business/energy-management-business/3-implement-energy-savings",
      "https://www.business.govt.nz/strategy-and-performance/strategic-finance/metrics-to-help-your-cash-flow"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-rastreabilidade-de-lotes-em-exportacao-de-frutas-frescas",
    "title": "Rastreabilidade de lotes em exportação de frutas frescas",
    "track": "quality",
    "role": "Analista de rastreabilidade e qualidade de alimentos",
    "positioning": "broad",
    "scenario": "Um packing house neozelandês mistura 120 caixas do lote A e 80 do lote B em quatro pallets sem registrar a composição individual.",
    "decision": "Reter a rastreabilidade no conjunto de 200 caixas e reconstruir os vínculos antes de prometer segregação por pallet.",
    "misconception": "Afirmar que cada pallet contém somente um lote porque todos têm o mesmo tamanho.",
    "changedConstraint": "Um comprador solicita rastrear apenas o lote B.",
    "tasks": [
      "Mapa de genealogia de lotes",
      "Registro de mistura",
      "Cadastro de pallets",
      "Consulta reversa simulada",
      "Teste de retirada documental",
      "Plano de prevenção de lacunas"
    ],
    "method": "Modele relações muitos para muitos entre lote de origem, embalagem e expedição. A unidade rastreável precisa acompanhar divisões e misturas. Teste uma consulta reversa do cliente ao fornecedor e uma consulta direta do fornecedor aos destinos. Na gestão de alimentos, o primeiro passo é identificar produto, processo, lote e responsabilidade. Diferencie requisito de qualidade comercial de requisito de segurança. Um limite só deve ser aplicado quando vier de procedimento validado e regra competente; valores didáticos não substituem legislação, plano de controle ou avaliação técnica. Construa registros com hora, origem, unidade e ação tomada. Preserve a relação entre matéria-prima, transformação e destino para permitir investigação e retirada quando determinada. Uma verificação documental confirma rastreabilidade, não inocuidade absoluta. Falhas de monitoramento e desvios de processo precisam de avaliação pelos responsáveis; nunca apague uma ocorrência para melhorar o indicador. Os exercícios desenvolvem análise e documentação complementar, sem habilitar inspeção oficial, prescrição sanitária ou liberação de produto. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um packing house neozelandês mistura 120 caixas do lote A e 80 do lote B em quatro pallets sem registrar a composição individual. Resolução: Reter a rastreabilidade no conjunto de 200 caixas e reconstruir os vínculos antes de prometer segregação por pallet. Sem vínculo por pallet não se consegue limitar o conjunto afetado às 80 caixas do lote B. A solução exige registros adicionais confiáveis ou assumir a abrangência maior, preservando a incerteza declarada. O exercício mantém separadas conformidade do registro e decisão de liberação do alimento. A resposta técnica real depende do plano aplicável e da autoridade responsável; o aluno não deve inferir segurança por aparência. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/food-business/running-a-food-business/food-control-plans",
      "https://www.foodstandards.gov.au/business/food-safety",
      "https://www.mpi.govt.nz/food-business/food-recalls/food-recall-guidance-for-businesses"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-reconciliacao-de-rendimento-em-filetagem-de-pescado",
    "title": "Reconciliação de rendimento em filetagem de pescado",
    "track": "quality",
    "role": "Analista de rastreabilidade e qualidade de alimentos",
    "positioning": "specialist",
    "scenario": "Um lote de 1000 kg gera 420 kg de filé, 180 kg de aparas aproveitáveis e 390 kg de outros fluxos registrados.",
    "decision": "Apontar 10 kg não reconciliados e rendimento de filé de 42%, investigando o balanço.",
    "misconception": "Distribuir os 10 kg proporcionalmente para fechar a planilha sem evidência.",
    "changedConstraint": "A balança de entrada é recalibrada e o peso passa a 995 kg.",
    "tasks": [
      "Balanço de massa do lote",
      "Cadastro de balanças",
      "Indicador de rendimento comercial",
      "Classificação de aparas",
      "Registro de revisão de pesagem",
      "Plano de investigação de diferença"
    ],
    "method": "Use massa em base comparável, considerando embalagem, gelo e água quando pertinente. A soma das saídas e variação de estoque deve explicar a entrada. Rendimento comercial e recuperação total são métricas distintas; identifique medição ou fluxo ausente. Na gestão de alimentos, o primeiro passo é identificar produto, processo, lote e responsabilidade. Diferencie requisito de qualidade comercial de requisito de segurança. Um limite só deve ser aplicado quando vier de procedimento validado e regra competente; valores didáticos não substituem legislação, plano de controle ou avaliação técnica. Construa registros com hora, origem, unidade e ação tomada. Preserve a relação entre matéria-prima, transformação e destino para permitir investigação e retirada quando determinada. Uma verificação documental confirma rastreabilidade, não inocuidade absoluta. Falhas de monitoramento e desvios de processo precisam de avaliação pelos responsáveis; nunca apague uma ocorrência para melhorar o indicador. Os exercícios desenvolvem análise e documentação complementar, sem habilitar inspeção oficial, prescrição sanitária ou liberação de produto. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um lote de 1000 kg gera 420 kg de filé, 180 kg de aparas aproveitáveis e 390 kg de outros fluxos registrados. Resolução: Apontar 10 kg não reconciliados e rendimento de filé de 42%, investigando o balanço. As saídas somam 990 kg. Com entrada corrigida de 995 kg, a diferença passa a cinco, exigindo preservar a versão anterior e a evidência da correção, em vez de alterar silenciosamente o histórico. O exercício mantém separadas conformidade do registro e decisão de liberação do alimento. A resposta técnica real depende do plano aplicável e da autoridade responsável; o aluno não deve inferir segurança por aparência. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/food-business/running-a-food-business/food-control-plans",
      "https://www.foodstandards.gov.au/business/food-safety",
      "https://www.wcpfc.int/scientific-data"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-verificacao-de-declaracoes-de-alergenicos-em-receitas",
    "title": "Verificação de declarações de alergênicos em receitas",
    "track": "quality",
    "role": "Analista de rastreabilidade e qualidade de alimentos",
    "positioning": "specialist",
    "scenario": "Uma receita possui 12 ingredientes, dois compostos com fichas incompletas e um rótulo final já pronto.",
    "decision": "Bloquear a conclusão da revisão de alergênicos até obter as composições dos dois ingredientes compostos.",
    "misconception": "Aprovar a declaração porque os ingredientes principais parecem conhecidos.",
    "changedConstraint": "O fornecedor substitui um ingrediente composto sem aviso prévio.",
    "tasks": [
      "Árvore de ingredientes",
      "Matriz de documentação de fornecedores",
      "Checklist de revisão de declaração",
      "Controle de versões de rótulo",
      "Teste de substituição de ingrediente",
      "Fluxo de aprovação competente"
    ],
    "method": "Revise a composição em todos os níveis do ingrediente e mantenha versão da especificação. Diferencie presença intencional, risco de contato cruzado e exigência de declaração aplicável; nenhuma dessas dimensões pode ser inferida apenas do nome comercial. Na gestão de alimentos, o primeiro passo é identificar produto, processo, lote e responsabilidade. Diferencie requisito de qualidade comercial de requisito de segurança. Um limite só deve ser aplicado quando vier de procedimento validado e regra competente; valores didáticos não substituem legislação, plano de controle ou avaliação técnica. Construa registros com hora, origem, unidade e ação tomada. Preserve a relação entre matéria-prima, transformação e destino para permitir investigação e retirada quando determinada. Uma verificação documental confirma rastreabilidade, não inocuidade absoluta. Falhas de monitoramento e desvios de processo precisam de avaliação pelos responsáveis; nunca apague uma ocorrência para melhorar o indicador. Os exercícios desenvolvem análise e documentação complementar, sem habilitar inspeção oficial, prescrição sanitária ou liberação de produto. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma receita possui 12 ingredientes, dois compostos com fichas incompletas e um rótulo final já pronto. Resolução: Bloquear a conclusão da revisão de alergênicos até obter as composições dos dois ingredientes compostos. A cobertura documental de dez em 12 ingredientes não basta para declarar o conjunto completo. A troca de fornecedor deve acionar revisão de especificação e rótulo antes da aprovação competente. O exercício mantém separadas conformidade do registro e decisão de liberação do alimento. A resposta técnica real depende do plano aplicável e da autoridade responsável; o aluno não deve inferir segurança por aparência. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/food-business/running-a-food-business/food-control-plans",
      "https://www.foodstandards.gov.au/business/food-safety"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-planejamento-de-amostragem-documental-em-linhas-de-envase",
    "title": "Planejamento de amostragem documental em linhas de envase",
    "track": "quality",
    "role": "Analista de rastreabilidade e qualidade de alimentos",
    "positioning": "specialist",
    "scenario": "Uma linha produz seis lotes por turno e a auditoria verifica sempre apenas o primeiro.",
    "decision": "Distribuir a verificação entre lotes e horários, justificando o desenho sem chamar a amostra de representativa por conveniência.",
    "misconception": "Generalizar a conformidade do primeiro lote para toda a produção.",
    "changedConstraint": "Uma falha aparece apenas após troca de embalagem no quarto lote.",
    "tasks": [
      "Plano de população e amostra",
      "Calendário de verificações",
      "Mapa de pontos de mudança",
      "Registro de cobertura",
      "Teste de falha após troca",
      "Nota de limites da auditoria"
    ],
    "method": "Defina população, unidade amostral, motivo da escolha e limite de inferência. Verificações em pontos de mudança podem complementar uma amostra distribuída. A análise documental deve registrar o que foi e o que não foi examinado. Na gestão de alimentos, o primeiro passo é identificar produto, processo, lote e responsabilidade. Diferencie requisito de qualidade comercial de requisito de segurança. Um limite só deve ser aplicado quando vier de procedimento validado e regra competente; valores didáticos não substituem legislação, plano de controle ou avaliação técnica. Construa registros com hora, origem, unidade e ação tomada. Preserve a relação entre matéria-prima, transformação e destino para permitir investigação e retirada quando determinada. Uma verificação documental confirma rastreabilidade, não inocuidade absoluta. Falhas de monitoramento e desvios de processo precisam de avaliação pelos responsáveis; nunca apague uma ocorrência para melhorar o indicador. Os exercícios desenvolvem análise e documentação complementar, sem habilitar inspeção oficial, prescrição sanitária ou liberação de produto. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma linha produz seis lotes por turno e a auditoria verifica sempre apenas o primeiro. Resolução: Distribuir a verificação entre lotes e horários, justificando o desenho sem chamar a amostra de representativa por conveniência. Verificar um dos seis lotes corresponde a 16,67% dos lotes, mas essa fração não garante cobertura temporal ou de mudanças. Incluir a troca de embalagem melhora a detecção do risco específico sem provar ausência de outros desvios. O exercício mantém separadas conformidade do registro e decisão de liberação do alimento. A resposta técnica real depende do plano aplicável e da autoridade responsável; o aluno não deve inferir segurança por aparência. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/food-business/running-a-food-business/food-control-plans",
      "https://www.foodstandards.gov.au/business/food-safety"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-gestao-de-versoes-de-planos-de-controle-de-alimentos",
    "title": "Gestão de versões de planos de controle de alimentos",
    "track": "quality",
    "role": "Analista de rastreabilidade e qualidade de alimentos",
    "positioning": "broad",
    "scenario": "Três cozinhas usam versões 4, 5 e 5 do mesmo plano, sendo a versão 5 a autorizada.",
    "decision": "Retirar de uso controlado a versão 4 e confirmar treinamento e mudanças antes da substituição.",
    "misconception": "Renomear a versão 4 como 5 sem comparar conteúdo.",
    "changedConstraint": "A versão 6 altera apenas o procedimento de resfriamento.",
    "tasks": [
      "Inventário de versões por unidade",
      "Matriz de mudanças",
      "Plano de retirada de cópias",
      "Registro de confirmação de leitura",
      "Teste de alteração parcial",
      "Relatório de implantação"
    ],
    "method": "Mantenha matriz de documento, local, versão autorizada, responsável e confirmação de implantação. Atualização documental inclui acesso e compreensão do procedimento. Uma mudança parcial exige avaliar quem é afetado, preservando o histórico de versões. Na gestão de alimentos, o primeiro passo é identificar produto, processo, lote e responsabilidade. Diferencie requisito de qualidade comercial de requisito de segurança. Um limite só deve ser aplicado quando vier de procedimento validado e regra competente; valores didáticos não substituem legislação, plano de controle ou avaliação técnica. Construa registros com hora, origem, unidade e ação tomada. Preserve a relação entre matéria-prima, transformação e destino para permitir investigação e retirada quando determinada. Uma verificação documental confirma rastreabilidade, não inocuidade absoluta. Falhas de monitoramento e desvios de processo precisam de avaliação pelos responsáveis; nunca apague uma ocorrência para melhorar o indicador. Os exercícios desenvolvem análise e documentação complementar, sem habilitar inspeção oficial, prescrição sanitária ou liberação de produto. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Três cozinhas usam versões 4, 5 e 5 do mesmo plano, sendo a versão 5 a autorizada. Resolução: Retirar de uso controlado a versão 4 e confirmar treinamento e mudanças antes da substituição. Uma de três unidades está com versão antiga, mas a criticidade depende do conteúdo alterado. A mudança de resfriamento deve gerar ação dirigida às operações afetadas, sem concluir que todas as pessoas foram treinadas por e-mail enviado. O exercício mantém separadas conformidade do registro e decisão de liberação do alimento. A resposta técnica real depende do plano aplicável e da autoridade responsável; o aluno não deve inferir segurança por aparência. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/food-business/running-a-food-business/food-control-plans",
      "https://www.foodstandards.gov.au/business/food-safety"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-custo-de-nao-qualidade-em-embalagens-de-laticinios",
    "title": "Custo de não qualidade em embalagens de laticínios",
    "track": "quality",
    "role": "Analista de rastreabilidade e qualidade de alimentos",
    "positioning": "specialist",
    "scenario": "Um lote de 10000 unidades apresenta 200 rejeições; 150 são retrabalhadas a duas unidades monetárias e 50 descartadas com custo de cinco.",
    "decision": "Calcular custo direto de 550 unidades e separar taxa de rejeição de 2% da perda final de 0,5%.",
    "misconception": "Tratar todas as 200 rejeições como descarte definitivo.",
    "changedConstraint": "O retrabalho passa a custar três por unidade.",
    "tasks": [
      "Diagrama de estados de qualidade",
      "Base de rejeições",
      "Cálculo de custos diretos",
      "Indicadores de rejeição e perda",
      "Sensibilidade do retrabalho",
      "Memorando de causa e prevenção"
    ],
    "method": "Modele estados aprovado, rejeitado, retrabalhado e descartado sem contar duas vezes a mesma unidade. Associe custos à transição correta e diferencie custo direto de efeitos como atraso ou devolução, que exigem dados adicionais. Na gestão de alimentos, o primeiro passo é identificar produto, processo, lote e responsabilidade. Diferencie requisito de qualidade comercial de requisito de segurança. Um limite só deve ser aplicado quando vier de procedimento validado e regra competente; valores didáticos não substituem legislação, plano de controle ou avaliação técnica. Construa registros com hora, origem, unidade e ação tomada. Preserve a relação entre matéria-prima, transformação e destino para permitir investigação e retirada quando determinada. Uma verificação documental confirma rastreabilidade, não inocuidade absoluta. Falhas de monitoramento e desvios de processo precisam de avaliação pelos responsáveis; nunca apague uma ocorrência para melhorar o indicador. Os exercícios desenvolvem análise e documentação complementar, sem habilitar inspeção oficial, prescrição sanitária ou liberação de produto. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um lote de 10000 unidades apresenta 200 rejeições; 150 são retrabalhadas a duas unidades monetárias e 50 descartadas com custo de cinco. Resolução: Calcular custo direto de 550 unidades e separar taxa de rejeição de 2% da perda final de 0,5%. O custo inicial é 150 vezes dois mais 50 vezes cinco, total 550. Com retrabalho a três, sobe a 700. A taxa de perda final permanece 50/10000, enquanto custo e esforço aumentam. O exercício mantém separadas conformidade do registro e decisão de liberação do alimento. A resposta técnica real depende do plano aplicável e da autoridade responsável; o aluno não deve inferir segurança por aparência. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/food-business/running-a-food-business/food-control-plans",
      "https://www.foodstandards.gov.au/business/food-safety"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-conciliacao-de-validade-e-giro-em-alimentos-refrigerados",
    "title": "Conciliação de validade e giro em alimentos refrigerados",
    "track": "quality",
    "role": "Analista de rastreabilidade e qualidade de alimentos",
    "positioning": "specialist",
    "scenario": "Um depósito tem 100 caixas que vencem em cinco dias e 80 que vencem em 12 dias, com demanda prevista de 15 caixas por dia.",
    "decision": "Priorizar as 100 caixas próximas do vencimento e identificar risco de sobra de pelo menos 25 em cinco dias.",
    "misconception": "Expedir o lote mais novo porque sua embalagem está na frente.",
    "changedConstraint": "Um pedido adicional de 30 caixas chega para entrega amanhã.",
    "tasks": [
      "Mapa de estoque por validade",
      "Projeção de consumo por janela",
      "Fila de expedição",
      "Registro de requisitos de cliente",
      "Cenário de pedido adicional",
      "Plano de redução de perdas"
    ],
    "method": "Use a regra de primeiro a vencer como critério condicionado a requisitos do cliente e segurança. Compare saldo por validade com demanda dentro da janela, sem transformar previsão em venda garantida. Identifique ações comerciais e operacionais autorizáveis. Na gestão de alimentos, o primeiro passo é identificar produto, processo, lote e responsabilidade. Diferencie requisito de qualidade comercial de requisito de segurança. Um limite só deve ser aplicado quando vier de procedimento validado e regra competente; valores didáticos não substituem legislação, plano de controle ou avaliação técnica. Construa registros com hora, origem, unidade e ação tomada. Preserve a relação entre matéria-prima, transformação e destino para permitir investigação e retirada quando determinada. Uma verificação documental confirma rastreabilidade, não inocuidade absoluta. Falhas de monitoramento e desvios de processo precisam de avaliação pelos responsáveis; nunca apague uma ocorrência para melhorar o indicador. Os exercícios desenvolvem análise e documentação complementar, sem habilitar inspeção oficial, prescrição sanitária ou liberação de produto. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um depósito tem 100 caixas que vencem em cinco dias e 80 que vencem em 12 dias, com demanda prevista de 15 caixas por dia. Resolução: Priorizar as 100 caixas próximas do vencimento e identificar risco de sobra de pelo menos 25 em cinco dias. A demanda prevista de cinco dias é 75, inferior às 100 caixas próximas do vencimento. O pedido adicional pode reduzir a sobra, mas precisa ser confirmado e compatível com validade mínima exigida no destino. O exercício mantém separadas conformidade do registro e decisão de liberação do alimento. A resposta técnica real depende do plano aplicável e da autoridade responsável; o aluno não deve inferir segurança por aparência. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/food-business/running-a-food-business/food-control-plans",
      "https://www.foodstandards.gov.au/business/food-safety"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-documentacao-de-cadeia-fria-em-rotas-insulares",
    "title": "Documentação de cadeia fria em rotas insulares",
    "track": "quality",
    "role": "Analista de rastreabilidade e qualidade de alimentos",
    "positioning": "specialist",
    "scenario": "Uma remessa para Samoa tem seis intervalos de transporte e falta registro de temperatura em dois.",
    "decision": "Classificar os dois intervalos como evidência ausente e encaminhar avaliação conforme plano, sem afirmar manutenção integral da cadeia fria.",
    "misconception": "Preencher os dois intervalos com a temperatura média dos demais.",
    "changedConstraint": "O operador fornece posteriormente um registrador com horário em fuso diferente.",
    "tasks": [
      "Linha do tempo logística",
      "Cadastro de registradores",
      "Conversão de fusos",
      "Mapa de lacunas de monitoramento",
      "Conciliação de arquivo tardio",
      "Dossiê de avaliação da remessa"
    ],
    "method": "Construa linha do tempo por etapa e normalize fusos antes de alinhar medições. Ausência de dado não prova desvio nem conformidade. A decisão sobre produto precisa seguir procedimento validado e responsabilidade definida. Na gestão de alimentos, o primeiro passo é identificar produto, processo, lote e responsabilidade. Diferencie requisito de qualidade comercial de requisito de segurança. Um limite só deve ser aplicado quando vier de procedimento validado e regra competente; valores didáticos não substituem legislação, plano de controle ou avaliação técnica. Construa registros com hora, origem, unidade e ação tomada. Preserve a relação entre matéria-prima, transformação e destino para permitir investigação e retirada quando determinada. Uma verificação documental confirma rastreabilidade, não inocuidade absoluta. Falhas de monitoramento e desvios de processo precisam de avaliação pelos responsáveis; nunca apague uma ocorrência para melhorar o indicador. Os exercícios desenvolvem análise e documentação complementar, sem habilitar inspeção oficial, prescrição sanitária ou liberação de produto. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma remessa para Samoa tem seis intervalos de transporte e falta registro de temperatura em dois. Resolução: Classificar os dois intervalos como evidência ausente e encaminhar avaliação conforme plano, sem afirmar manutenção integral da cadeia fria. Quatro de seis intervalos estão documentados, mas a duração pode ser desigual; cobertura por contagem não é cobertura por tempo. O registrador adicional só fecha a lacuna após confirmar relógio, identificação da remessa e integridade do arquivo. O exercício mantém separadas conformidade do registro e decisão de liberação do alimento. A resposta técnica real depende do plano aplicável e da autoridade responsável; o aluno não deve inferir segurança por aparência. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/food-business/running-a-food-business/food-control-plans",
      "https://www.foodstandards.gov.au/business/food-safety"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-verificacao-de-balanco-de-ingredientes-em-bebidas-vegetais",
    "title": "Verificação de balanço de ingredientes em bebidas vegetais",
    "track": "quality",
    "role": "Analista de rastreabilidade e qualidade de alimentos",
    "positioning": "broad",
    "scenario": "Uma formulação de 500 litros registra 420 litros de água, 60 de base e dez de outros líquidos.",
    "decision": "Apontar diferença de dez litros sem ajustar a receita por suposição.",
    "misconception": "Completar automaticamente a diferença com água e liberar a formulação.",
    "changedConstraint": "A base passa a ser registrada em quilogramas.",
    "tasks": [
      "Tabela de formulação",
      "Dicionário de unidades",
      "Balanço de volumes",
      "Registro de densidades autorizadas",
      "Teste de alteração de unidade",
      "Solicitação de revisão de especificação"
    ],
    "method": "Diferencie massa e volume e use densidade somente quando conhecida e adequada às condições. Um balanço de formulação precisa de unidades compatíveis e controle de versão. Lacunas devem retornar à especificação, não ser resolvidas por preenchimento arbitrário. Na gestão de alimentos, o primeiro passo é identificar produto, processo, lote e responsabilidade. Diferencie requisito de qualidade comercial de requisito de segurança. Um limite só deve ser aplicado quando vier de procedimento validado e regra competente; valores didáticos não substituem legislação, plano de controle ou avaliação técnica. Construa registros com hora, origem, unidade e ação tomada. Preserve a relação entre matéria-prima, transformação e destino para permitir investigação e retirada quando determinada. Uma verificação documental confirma rastreabilidade, não inocuidade absoluta. Falhas de monitoramento e desvios de processo precisam de avaliação pelos responsáveis; nunca apague uma ocorrência para melhorar o indicador. Os exercícios desenvolvem análise e documentação complementar, sem habilitar inspeção oficial, prescrição sanitária ou liberação de produto. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma formulação de 500 litros registra 420 litros de água, 60 de base e dez de outros líquidos. Resolução: Apontar diferença de dez litros sem ajustar a receita por suposição. Os volumes somam 490 litros no cenário simplificado. Ao trocar a unidade da base para massa, não se deve somar diretamente aos litros; é preciso relação de conversão documentada ou manter o balanço em bases separadas. O exercício mantém separadas conformidade do registro e decisão de liberação do alimento. A resposta técnica real depende do plano aplicável e da autoridade responsável; o aluno não deve inferir segurança por aparência. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/food-business/running-a-food-business/food-control-plans",
      "https://www.foodstandards.gov.au/business/food-safety"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-simulacao-de-retirada-documental-de-mel-exportado",
    "title": "Simulação de retirada documental de mel exportado",
    "track": "quality",
    "role": "Analista de rastreabilidade e qualidade de alimentos",
    "positioning": "specialist",
    "scenario": "Um lote de mel de 600 potes foi enviado a três clientes em quantidades 200, 150 e 220, restando 20 no depósito.",
    "decision": "Identificar dez potes não reconciliados e buscar sua localização na simulação.",
    "misconception": "Encerrar o exercício porque a maioria dos potes foi localizada.",
    "changedConstraint": "Um cliente redistribuiu 50 potes a dois varejistas.",
    "tasks": [
      "Genealogia de lote de mel",
      "Mapa de clientes e redistribuição",
      "Balanço de potes",
      "Registro de contatos simulados",
      "Métrica de completude da localização",
      "Relatório de lacunas e correções"
    ],
    "method": "Reconcilie produção, estoque, expedições, devoluções e redistribuição. O teste de retirada mede velocidade e completude de localização, não substitui decisão oficial. A rastreabilidade precisa avançar além do primeiro cliente quando houver redistribuição conhecida. Na gestão de alimentos, o primeiro passo é identificar produto, processo, lote e responsabilidade. Diferencie requisito de qualidade comercial de requisito de segurança. Um limite só deve ser aplicado quando vier de procedimento validado e regra competente; valores didáticos não substituem legislação, plano de controle ou avaliação técnica. Construa registros com hora, origem, unidade e ação tomada. Preserve a relação entre matéria-prima, transformação e destino para permitir investigação e retirada quando determinada. Uma verificação documental confirma rastreabilidade, não inocuidade absoluta. Falhas de monitoramento e desvios de processo precisam de avaliação pelos responsáveis; nunca apague uma ocorrência para melhorar o indicador. Os exercícios desenvolvem análise e documentação complementar, sem habilitar inspeção oficial, prescrição sanitária ou liberação de produto. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um lote de mel de 600 potes foi enviado a três clientes em quantidades 200, 150 e 220, restando 20 no depósito. Resolução: Identificar dez potes não reconciliados e buscar sua localização na simulação. Os destinos e saldo explicam 590 dos 600 potes. A redistribuição não aumenta o total original, apenas cria novos vínculos de destino; contar os 50 novamente como expedição da fábrica inflaria o balanço. O exercício mantém separadas conformidade do registro e decisão de liberação do alimento. A resposta técnica real depende do plano aplicável e da autoridade responsável; o aluno não deve inferir segurança por aparência. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/food-business/running-a-food-business/food-control-plans",
      "https://www.foodstandards.gov.au/business/food-safety",
      "https://www.mpi.govt.nz/food-business/food-recalls/food-recall-guidance-for-businesses"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-validacao-de-series-de-chuva-com-dias-ausentes",
    "title": "Validação de séries de chuva com dias ausentes",
    "track": "data",
    "role": "Analista de dados ambientais e territoriais",
    "positioning": "specialist",
    "scenario": "Uma estação em Vanuatu soma 180 mm em 27 dias observados de um mês de 30 dias.",
    "decision": "Publicar 180 mm como acumulado observado com três dias ausentes, sem chamar o valor de total mensal completo.",
    "misconception": "Preencher os três dias ausentes com zero sem evidência.",
    "changedConstraint": "Uma estação vizinha apresenta chuva forte justamente nos dias faltantes.",
    "tasks": [
      "Calendário de observações",
      "Taxonomia de qualidade",
      "Acumulado observado",
      "Indicador de cobertura temporal",
      "Comparação com estação vizinha",
      "Nota de incerteza e imputação"
    ],
    "method": "Crie calendário completo e classifique cada dia como observado, ausente ou invalidado. Acúmulo parcial e estimativa de total são produtos diferentes. Uma imputação exige método explícito, validação e marcação de valores estimados, preservando o acumulado observado. Em dados ambientais, uma observação deve manter local, instante, unidade, método e qualidade. Não misture estação pontual com área média, valor diário com acumulado mensal ou ausência com zero. Antes de agregar, harmonize projeção espacial e intervalo temporal e preserve os dados originais. Identifique amostragem irregular, deslocamento de sensor e revisões de série. Mapas comunicam padrões, mas a resolução do dado limita a precisão da conclusão. Avalie se o denominador é população, área, tempo ou esforço de coleta. Um indicador pode orientar investigação sem estabelecer causa. O trabalho do analista é produzir resultados reproduzíveis e incerteza legível; alertas oficiais, decisões de proteção civil e avaliações especializadas permanecem com as entidades competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma estação em Vanuatu soma 180 mm em 27 dias observados de um mês de 30 dias. Resolução: Publicar 180 mm como acumulado observado com três dias ausentes, sem chamar o valor de total mensal completo. A cobertura temporal é 27/30, ou 90%. A informação da estação vizinha sugere que a ausência pode ser relevante, mas não fornece automaticamente a precipitação da estação principal devido à variabilidade espacial. A interpretação deve conservar o alcance da amostra e a unidade do indicador. A conta demonstra o método, enquanto a qualidade e representatividade dos dados determinam o quanto se pode generalizar. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.bom.gov.au/water/",
      "https://pacificdata.org/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-analise-de-captura-por-unidade-de-esforco-na-pesca-costeira",
    "title": "Análise de captura por unidade de esforço na pesca costeira",
    "track": "data",
    "role": "Analista de dados ambientais e territoriais",
    "positioning": "specialist",
    "scenario": "Uma comunidade registra 300 kg em 20 viagens e outra 240 kg em dez viagens, com artes comparáveis.",
    "decision": "Comparar 15 e 24 kg por viagem, mantendo o limite de comparabilidade das artes e duração.",
    "misconception": "Concluir que a primeira área tem mais peixe porque capturou maior massa total.",
    "changedConstraint": "As viagens da segunda comunidade duram o dobro.",
    "tasks": [
      "Dicionário de esforço",
      "Base de viagens",
      "Indicador kg por viagem",
      "Estratificação por arte",
      "Cenário de duração desigual",
      "Relatório de limites ecológicos"
    ],
    "method": "Defina esforço de pesca de forma compatível com arte e duração. Captura por viagem pode ocultar diferenças de horas, embarcação e alvo. Estratifique por método e local e evite converter um índice simples em estimativa direta do estoque. Em dados ambientais, uma observação deve manter local, instante, unidade, método e qualidade. Não misture estação pontual com área média, valor diário com acumulado mensal ou ausência com zero. Antes de agregar, harmonize projeção espacial e intervalo temporal e preserve os dados originais. Identifique amostragem irregular, deslocamento de sensor e revisões de série. Mapas comunicam padrões, mas a resolução do dado limita a precisão da conclusão. Avalie se o denominador é população, área, tempo ou esforço de coleta. Um indicador pode orientar investigação sem estabelecer causa. O trabalho do analista é produzir resultados reproduzíveis e incerteza legível; alertas oficiais, decisões de proteção civil e avaliações especializadas permanecem com as entidades competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma comunidade registra 300 kg em 20 viagens e outra 240 kg em dez viagens, com artes comparáveis. Resolução: Comparar 15 e 24 kg por viagem, mantendo o limite de comparabilidade das artes e duração. Se a duração dobra, o segundo índice pode cair ao normalizar por hora. Sem horas efetivas não há cálculo completo; o resultado de 24 kg por viagem descreve apenas a unidade usada e não abundância absoluta. A interpretação deve conservar o alcance da amostra e a unidade do indicador. A conta demonstra o método, enquanto a qualidade e representatividade dos dados determinam o quanto se pode generalizar. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.bom.gov.au/water/",
      "https://pacificdata.org/",
      "https://www.wcpfc.int/scientific-data"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-conciliacao-de-coordenadas-em-inventarios-de-ativos-de-agua",
    "title": "Conciliação de coordenadas em inventários de ativos de água",
    "track": "data",
    "role": "Analista de dados ambientais e territoriais",
    "positioning": "broad",
    "scenario": "Um inventário contém 80 pontos e 12 aparecem no oceano após importar longitude e latitude invertidas.",
    "decision": "Validar a ordem dos campos e corrigir somente registros com evidência, mantendo trilha de alteração.",
    "misconception": "Mover manualmente todos os 12 pontos para a costa mais próxima.",
    "changedConstraint": "Cinco pontos usam um sistema de referência projetado.",
    "tasks": [
      "Dicionário de coordenadas",
      "Teste de faixa e ordem",
      "Mapa de anomalias",
      "Registro de transformações",
      "Conciliação de sistemas de referência",
      "Inventário geográfico revisado"
    ],
    "method": "Confira sistema de referência, ordem dos eixos, sinal e faixa plausível antes de mapear. Um teste de posição detecta anomalia, mas não determina a localização correta. Preserve coordenadas originais e documente transformação e fonte. Em dados ambientais, uma observação deve manter local, instante, unidade, método e qualidade. Não misture estação pontual com área média, valor diário com acumulado mensal ou ausência com zero. Antes de agregar, harmonize projeção espacial e intervalo temporal e preserve os dados originais. Identifique amostragem irregular, deslocamento de sensor e revisões de série. Mapas comunicam padrões, mas a resolução do dado limita a precisão da conclusão. Avalie se o denominador é população, área, tempo ou esforço de coleta. Um indicador pode orientar investigação sem estabelecer causa. O trabalho do analista é produzir resultados reproduzíveis e incerteza legível; alertas oficiais, decisões de proteção civil e avaliações especializadas permanecem com as entidades competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um inventário contém 80 pontos e 12 aparecem no oceano após importar longitude e latitude invertidas. Resolução: Validar a ordem dos campos e corrigir somente registros com evidência, mantendo trilha de alteração. Trocar os eixos pode explicar parte dos 12 registros, porém não os cinco em sistema projetado. Estes exigem transformação adequada a partir do sistema conhecido; ajuste visual não é georreferenciamento verificável. A interpretação deve conservar o alcance da amostra e a unidade do indicador. A conta demonstra o método, enquanto a qualidade e representatividade dos dados determinam o quanto se pode generalizar. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.bom.gov.au/water/",
      "https://pacificdata.org/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-indicadores-de-perdas-aparentes-em-redes-comunitarias-de-agua",
    "title": "Balanço hídrico e perdas totais em redes comunitárias de água",
    "track": "data",
    "role": "Analista de dados ambientais e territoriais",
    "positioning": "specialist",
    "scenario": "Um sistema fornece 10000 m³ e registra 7200 m³ de consumo autorizado faturado e mais 500 m³ de uso autorizado não faturado.",
    "decision": "Calcular diferença de 2300 m³ após incluir todo consumo autorizado, sem chamar toda diferença de vazamento físico.",
    "misconception": "Usar apenas o faturamento e declarar perda física de 2800 m³.",
    "changedConstraint": "O medidor de entrada tem erro estimado ainda não quantificado.",
    "tasks": [
      "Diagrama do balanço hídrico",
      "Cadastro de volumes autorizados",
      "Reconciliação de períodos",
      "Indicador de diferença volumétrica",
      "Registro de incerteza metrológica",
      "Plano de investigação de componentes"
    ],
    "method": "O resíduo entre entrada e consumo autorizado representa perdas totais ainda não desagregadas, que podem incluir componentes reais e aparentes. Não classifique todo o resíduo como perda aparente ou física sem investigação adicional. Use balanço hídrico com fronteira e período definidos. Diferencie consumo autorizado faturado, não faturado e componentes de perda. Diferença de volume inclui possíveis erros de medição e registros, não apenas vazamentos reais. Em dados ambientais, uma observação deve manter local, instante, unidade, método e qualidade. Não misture estação pontual com área média, valor diário com acumulado mensal ou ausência com zero. Antes de agregar, harmonize projeção espacial e intervalo temporal e preserve os dados originais. Identifique amostragem irregular, deslocamento de sensor e revisões de série. Mapas comunicam padrões, mas a resolução do dado limita a precisão da conclusão. Avalie se o denominador é população, área, tempo ou esforço de coleta. Um indicador pode orientar investigação sem estabelecer causa. O trabalho do analista é produzir resultados reproduzíveis e incerteza legível; alertas oficiais, decisões de proteção civil e avaliações especializadas permanecem com as entidades competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um sistema fornece 10000 m³ e registra 7200 m³ de consumo autorizado faturado e mais 500 m³ de uso autorizado não faturado. Resolução: Calcular diferença de 2300 m³ após incluir todo consumo autorizado, sem chamar toda diferença de vazamento físico. O consumo autorizado total é 7700 m³; a diferença é 23% da entrada. A incerteza do medidor deve acompanhar o indicador e pode alterar sua interpretação, exigindo avaliação antes de priorizar investimento em tubulação. A interpretação deve conservar o alcance da amostra e a unidade do indicador. A conta demonstra o método, enquanto a qualidade e representatividade dos dados determinam o quanto se pode generalizar. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional. A diferença de 2300 m³ é um resíduo total a investigar, não uma estimativa isolada de perdas aparentes.",
    "sources": [
      "https://www.bom.gov.au/water/",
      "https://pacificdata.org/",
      "https://www.epa.gov/sites/production/files/2015-04/documents/epa816f13002.pdf",
      "https://www.awwa.org/resource/water-loss-control/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-mapeamento-de-exposicao-de-instalacoes-costeiras",
    "title": "Mapeamento de exposição de instalações costeiras",
    "track": "data",
    "role": "Analista de dados ambientais e territoriais",
    "positioning": "specialist",
    "scenario": "Dez instalações têm cotas de terreno e apenas sete usam o mesmo referencial vertical da superfície de inundação simulada.",
    "decision": "Comparar apenas as sete compatíveis e marcar três como pendentes de harmonização vertical.",
    "misconception": "Subtrair todas as cotas sem verificar o datum.",
    "changedConstraint": "A resolução do modelo de terreno é de 30 metros e uma instalação ocupa cinco metros.",
    "tasks": [
      "Inventário de cotas",
      "Matriz de referenciais verticais",
      "Mapa de exposição preliminar",
      "Registro de resolução",
      "Teste de compatibilidade espacial",
      "Nota de uso permitido do mapa"
    ],
    "method": "Separe perigo, exposição e vulnerabilidade. Uma comparação de elevação requer o mesmo referencial vertical e resolução adequada. O mapa de triagem não substitui levantamento topográfico nem determina segurança de uma instalação específica. Em dados ambientais, uma observação deve manter local, instante, unidade, método e qualidade. Não misture estação pontual com área média, valor diário com acumulado mensal ou ausência com zero. Antes de agregar, harmonize projeção espacial e intervalo temporal e preserve os dados originais. Identifique amostragem irregular, deslocamento de sensor e revisões de série. Mapas comunicam padrões, mas a resolução do dado limita a precisão da conclusão. Avalie se o denominador é população, área, tempo ou esforço de coleta. Um indicador pode orientar investigação sem estabelecer causa. O trabalho do analista é produzir resultados reproduzíveis e incerteza legível; alertas oficiais, decisões de proteção civil e avaliações especializadas permanecem com as entidades competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Dez instalações têm cotas de terreno e apenas sete usam o mesmo referencial vertical da superfície de inundação simulada. Resolução: Comparar apenas as sete compatíveis e marcar três como pendentes de harmonização vertical. Sete registros comparáveis não garantem precisão suficiente em escala de edifício. A diferença de resolução pode ocultar variação local; o relatório deve recomendar dados mais adequados para decisões de engenharia ou proteção civil. A interpretação deve conservar o alcance da amostra e a unidade do indicador. A conta demonstra o método, enquanto a qualidade e representatividade dos dados determinam o quanto se pode generalizar. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.bom.gov.au/water/",
      "https://pacificdata.org/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-analise-de-regeneracao-de-manguezais-por-parcelas",
    "title": "Análise de regeneração de manguezais por parcelas",
    "track": "data",
    "role": "Analista de dados ambientais e territoriais",
    "positioning": "specialist",
    "scenario": "Seis parcelas têm 20, 25, 30, 15, 10 e 20 mudas vivas, mas suas áreas são diferentes.",
    "decision": "Normalizar por área antes de comparar densidade e preservar contagens originais.",
    "misconception": "Classificar a parcela com 30 mudas como a melhor sem considerar tamanho.",
    "changedConstraint": "Duas parcelas foram medidas em estação diferente.",
    "tasks": [
      "Cadastro de parcelas",
      "Base de contagens e áreas",
      "Cálculo de densidade",
      "Matriz de datas de coleta",
      "Plano de comparação sazonal",
      "Relatório de limites de extrapolação"
    ],
    "method": "Calcule densidade usando área efetivamente amostrada e registre desenho de seleção. Contagem, sobrevivência e cobertura são indicadores distintos. Compare datas e condições de coleta; não extrapole para todo o manguezal sem amostragem apropriada. Em dados ambientais, uma observação deve manter local, instante, unidade, método e qualidade. Não misture estação pontual com área média, valor diário com acumulado mensal ou ausência com zero. Antes de agregar, harmonize projeção espacial e intervalo temporal e preserve os dados originais. Identifique amostragem irregular, deslocamento de sensor e revisões de série. Mapas comunicam padrões, mas a resolução do dado limita a precisão da conclusão. Avalie se o denominador é população, área, tempo ou esforço de coleta. Um indicador pode orientar investigação sem estabelecer causa. O trabalho do analista é produzir resultados reproduzíveis e incerteza legível; alertas oficiais, decisões de proteção civil e avaliações especializadas permanecem com as entidades competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Seis parcelas têm 20, 25, 30, 15, 10 e 20 mudas vivas, mas suas áreas são diferentes. Resolução: Normalizar por área antes de comparar densidade e preservar contagens originais. As contagens totalizam 120 mudas, mas esse total não informa densidade sem a soma de áreas. A diferença de estação pode confundir mudança temporal com diferença espacial e exige estratificação ou nova medição. A interpretação deve conservar o alcance da amostra e a unidade do indicador. A conta demonstra o método, enquanto a qualidade e representatividade dos dados determinam o quanto se pode generalizar. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.bom.gov.au/water/",
      "https://pacificdata.org/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-controle-de-qualidade-de-sensores-de-salinidade",
    "title": "Controle de qualidade de sensores de salinidade",
    "track": "data",
    "role": "Analista de dados ambientais e territoriais",
    "positioning": "broad",
    "scenario": "Um sensor registra 35 unidades por quatro horas, salta para 350 por um minuto e retorna a 35.",
    "decision": "Marcar o salto para investigação e verificar unidade, faixa e integridade antes de excluir ou aceitar.",
    "misconception": "Eliminar automaticamente qualquer extremo porque prejudica a média.",
    "changedConstraint": "Um segundo sensor confirma um aumento moderado no mesmo horário.",
    "tasks": [
      "Dicionário de sensor e unidade",
      "Regras de faixa e variação",
      "Série com flags de qualidade",
      "Comparação entre sensores",
      "Registro de adjudicação",
      "Produto revisado com proveniência"
    ],
    "method": "Use testes de faixa, taxa de mudança e consistência com sensores independentes. Um extremo pode ser evento real ou erro; a regra de qualidade deve separar detecção de decisão. Preserve a série bruta e as flags de revisão. Em dados ambientais, uma observação deve manter local, instante, unidade, método e qualidade. Não misture estação pontual com área média, valor diário com acumulado mensal ou ausência com zero. Antes de agregar, harmonize projeção espacial e intervalo temporal e preserve os dados originais. Identifique amostragem irregular, deslocamento de sensor e revisões de série. Mapas comunicam padrões, mas a resolução do dado limita a precisão da conclusão. Avalie se o denominador é população, área, tempo ou esforço de coleta. Um indicador pode orientar investigação sem estabelecer causa. O trabalho do analista é produzir resultados reproduzíveis e incerteza legível; alertas oficiais, decisões de proteção civil e avaliações especializadas permanecem com as entidades competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um sensor registra 35 unidades por quatro horas, salta para 350 por um minuto e retorna a 35. Resolução: Marcar o salto para investigação e verificar unidade, faixa e integridade antes de excluir ou aceitar. A diferença de dez vezes sugere possível escala ou transmissão, mas não prova erro. A confirmação parcial reforça a necessidade de verificar registros de instrumento e contexto em vez de substituir 350 pela média silenciosamente. A interpretação deve conservar o alcance da amostra e a unidade do indicador. A conta demonstra o método, enquanto a qualidade e representatividade dos dados determinam o quanto se pode generalizar. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.bom.gov.au/water/",
      "https://pacificdata.org/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-amostragem-de-residuos-plasticos-em-praias-insulares",
    "title": "Amostragem de resíduos plásticos em praias insulares",
    "track": "data",
    "role": "Analista de dados ambientais e territoriais",
    "positioning": "specialist",
    "scenario": "Duas equipes coletam 200 itens em 100 metros e 150 itens em 50 metros de praia.",
    "decision": "Comparar densidades de dois e três itens por metro, anotando protocolo e esforço de coleta.",
    "misconception": "Declarar a primeira praia mais poluída apenas pelo total de itens.",
    "changedConstraint": "A segunda equipe contou fragmentos menores que a primeira.",
    "tasks": [
      "Protocolo de transectos",
      "Taxonomia de resíduos",
      "Base de contagens",
      "Indicador itens por metro",
      "Comparação de limiares de tamanho",
      "Plano de harmonização"
    ],
    "method": "Padronize extensão, faixa transversal, tamanho mínimo e classificação dos itens. Contagem por metro só é comparável quando o protocolo é equivalente. Massa e número respondem a perguntas diferentes; mantenha ambos quando disponíveis. Em dados ambientais, uma observação deve manter local, instante, unidade, método e qualidade. Não misture estação pontual com área média, valor diário com acumulado mensal ou ausência com zero. Antes de agregar, harmonize projeção espacial e intervalo temporal e preserve os dados originais. Identifique amostragem irregular, deslocamento de sensor e revisões de série. Mapas comunicam padrões, mas a resolução do dado limita a precisão da conclusão. Avalie se o denominador é população, área, tempo ou esforço de coleta. Um indicador pode orientar investigação sem estabelecer causa. O trabalho do analista é produzir resultados reproduzíveis e incerteza legível; alertas oficiais, decisões de proteção civil e avaliações especializadas permanecem com as entidades competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Duas equipes coletam 200 itens em 100 metros e 150 itens em 50 metros de praia. Resolução: Comparar densidades de dois e três itens por metro, anotando protocolo e esforço de coleta. A densidade aparente maior da segunda praia pode refletir limiar de fragmento diferente. Harmonizar categorias ou repetir a coleta é mais defensável do que tratar os dois indicadores como diretamente equivalentes. A interpretação deve conservar o alcance da amostra e a unidade do indicador. A conta demonstra o método, enquanto a qualidade e representatividade dos dados determinam o quanto se pode generalizar. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.bom.gov.au/water/",
      "https://pacificdata.org/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-deteccao-de-duplicacao-em-cadastros-de-resposta-a-desastres",
    "title": "Detecção de duplicação em cadastros de resposta a desastres",
    "track": "data",
    "role": "Analista de dados ambientais e territoriais",
    "positioning": "specialist",
    "scenario": "Uma base contém 1000 linhas e 80 pares candidatos a duplicação por telefone compartilhado.",
    "decision": "Tratar os 80 pares como candidatos e revisar outros atributos antes de mesclar pessoas.",
    "misconception": "Excluir uma linha de cada par porque telefone igual prova pessoa igual.",
    "changedConstraint": "Famílias compartilham um único telefone comunitário.",
    "tasks": [
      "Modelo de entidades",
      "Regras de candidatos",
      "Fila de revisão",
      "Registro reversível de fusões",
      "Teste de telefone compartilhado",
      "Relatório de impacto e privacidade"
    ],
    "method": "Defina entidade, identificador e regra de correspondência antes de deduplicar. Telefones, endereços e nomes podem ser compartilhados. Use revisão por evidências e preserve reversibilidade da fusão, minimizando dados sensíveis e restringindo acesso. Em dados ambientais, uma observação deve manter local, instante, unidade, método e qualidade. Não misture estação pontual com área média, valor diário com acumulado mensal ou ausência com zero. Antes de agregar, harmonize projeção espacial e intervalo temporal e preserve os dados originais. Identifique amostragem irregular, deslocamento de sensor e revisões de série. Mapas comunicam padrões, mas a resolução do dado limita a precisão da conclusão. Avalie se o denominador é população, área, tempo ou esforço de coleta. Um indicador pode orientar investigação sem estabelecer causa. O trabalho do analista é produzir resultados reproduzíveis e incerteza legível; alertas oficiais, decisões de proteção civil e avaliações especializadas permanecem com as entidades competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma base contém 1000 linhas e 80 pares candidatos a duplicação por telefone compartilhado. Resolução: Tratar os 80 pares como candidatos e revisar outros atributos antes de mesclar pessoas. O número final de pessoas únicas não pode ser obtido apenas dos 80 pares, que podem sobrepor-se ou representar indivíduos distintos. O objetivo é reduzir duplicação sem retirar indevidamente pessoas da assistência. A interpretação deve conservar o alcance da amostra e a unidade do indicador. A conta demonstra o método, enquanto a qualidade e representatividade dos dados determinam o quanto se pode generalizar. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.bom.gov.au/water/",
      "https://pacificdata.org/",
      "https://data.govt.nz/toolkit/privacy-and-security/understanding-data-confidentiality/data-confidentiality-principles-and-methods-report"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-paineis-de-acesso-a-servicos-em-ilhas-com-pequenas-populacoes",
    "title": "Painéis de acesso a serviços em ilhas com pequenas populações",
    "track": "data",
    "role": "Analista de dados ambientais e territoriais",
    "positioning": "specialist",
    "scenario": "Uma ilha registra dois atendimentos negados em 20 pedidos e outra quatro em 200.",
    "decision": "Comparar taxas de 10% e 2%, mostrando também os pequenos denominadores.",
    "misconception": "Ordenar desempenho apenas pelo número absoluto de negativas.",
    "changedConstraint": "No mês seguinte a primeira ilha recebe apenas cinco pedidos.",
    "tasks": [
      "Dicionário de indicadores",
      "Tabela de numeradores e denominadores",
      "Painel de taxas contextualizadas",
      "Teste de pequenos números",
      "Regras de divulgação segura",
      "Memorando de interpretação"
    ],
    "method": "Mostre numerador e denominador juntos e evite rankings instáveis para pequenas populações. Uma taxa pode variar muito com poucos eventos. Considere agregação temporal apropriada e proteção contra reidentificação, preservando a necessidade de resposta local. Em dados ambientais, uma observação deve manter local, instante, unidade, método e qualidade. Não misture estação pontual com área média, valor diário com acumulado mensal ou ausência com zero. Antes de agregar, harmonize projeção espacial e intervalo temporal e preserve os dados originais. Identifique amostragem irregular, deslocamento de sensor e revisões de série. Mapas comunicam padrões, mas a resolução do dado limita a precisão da conclusão. Avalie se o denominador é população, área, tempo ou esforço de coleta. Um indicador pode orientar investigação sem estabelecer causa. O trabalho do analista é produzir resultados reproduzíveis e incerteza legível; alertas oficiais, decisões de proteção civil e avaliações especializadas permanecem com as entidades competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma ilha registra dois atendimentos negados em 20 pedidos e outra quatro em 200. Resolução: Comparar taxas de 10% e 2%, mostrando também os pequenos denominadores. A primeira ilha tem taxa cinco vezes maior, mas poucos registros tornam o indicador sensível a mudanças pequenas. Com cinco pedidos, uma única negativa produziria 20%; isso exige contexto, não conclusão automática de deterioração. A interpretação deve conservar o alcance da amostra e a unidade do indicador. A conta demonstra o método, enquanto a qualidade e representatividade dos dados determinam o quanto se pode generalizar. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.bom.gov.au/water/",
      "https://pacificdata.org/",
      "https://data.govt.nz/toolkit/privacy-and-security/understanding-data-confidentiality/data-confidentiality-principles-and-methods-report"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-estoque-de-seguranca-para-abastecimento-entre-ilhas",
    "title": "Estoque de segurança para abastecimento entre ilhas",
    "track": "logistics",
    "role": "Analista de logística e abastecimento do Pacífico",
    "positioning": "broad",
    "scenario": "Uma clínica administrativa consome 40 caixas de material não clínico por semana e o navio regular leva três semanas, com atraso máximo simulado de duas.",
    "decision": "Planejar cobertura adicional de 80 caixas para o atraso simulado e demanda de trânsito de 120, distinguindo ambas.",
    "misconception": "Chamar as 200 caixas de estoque de segurança sem separar demanda normal.",
    "changedConstraint": "A demanda sobe para 55 caixas por semana durante um evento.",
    "tasks": [
      "Base de consumo",
      "Calendário de trânsito",
      "Cálculo de demanda no prazo",
      "Reserva por atraso simulado",
      "Teste de aumento de demanda",
      "Política de reposição revisável"
    ],
    "method": "Use demanda durante o lead time para ponto de reposição e reserva adicional para variabilidade assumida. Uma regra simples baseada em atraso máximo não substitui distribuição probabilística. Teste capacidade de armazenagem e validade do material. Em logística, modele o fluxo físico e o fluxo de informação separadamente e conecte ambos por identificadores. Prazo de trânsito não inclui necessariamente preparação, inspeção, desembaraço e espera. Diferencie capacidade por massa, volume e restrição de produto; o gargalo é o limite efetivamente atingido. Use balanço de estoque e demanda por janela para avaliar risco de ruptura. Custos devem cobrir a mesma fronteira de coleta, frete, armazenagem e entrega, incluindo cobranças condicionais quando conhecidas. Requisitos aduaneiros, de biossegurança e de transporte variam por produto e jurisdição; o aluno organiza evidências e consultas oficiais, sem emitir autorização legal. Preserve eventos de atraso e correções para que o planejamento futuro aprenda com o serviço real. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma clínica administrativa consome 40 caixas de material não clínico por semana e o navio regular leva três semanas, com atraso máximo simulado de duas. Resolução: Planejar cobertura adicional de 80 caixas para o atraso simulado e demanda de trânsito de 120, distinguindo ambas. No cenário inicial, 120 mais 80 resulta em ponto de referência de 200 caixas. Com 55 por semana, as parcelas passam a 165 e 110, total 275; a mudança de demanda altera ambas. O cálculo organiza uma decisão de abastecimento sob condições explícitas. Confirme capacidade real, documentos e regras do operador antes da execução; a estimativa didática não garante trânsito, liberação ou entrega. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/import/importing-into-nz-how-it-works/general-importing-requirements",
      "https://www.customs.govt.nz/business/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-consolidacao-de-cargas-por-massa-e-cubagem",
    "title": "Consolidação de cargas por massa e cubagem",
    "track": "logistics",
    "role": "Analista de logística e abastecimento do Pacífico",
    "positioning": "specialist",
    "scenario": "Um contêiner admite 20 toneladas e 30 m³; a carga proposta tem 12 toneladas e 36 m³.",
    "decision": "Identificar volume como restrição excedida em seis m³, apesar da massa disponível.",
    "misconception": "Aprovar o embarque porque a massa está oito toneladas abaixo do limite.",
    "changedConstraint": "A embalagem reforçada aumenta o volume em 10%.",
    "tasks": [
      "Cadastro dimensional",
      "Cálculo de utilização por recurso",
      "Mapa de restrições de empilhamento",
      "Alternativas de fracionamento",
      "Cenário de embalagem reforçada",
      "Plano de consolidação viável"
    ],
    "method": "Calcule utilização de cada recurso e verifique dimensões, empilhamento e incompatibilidades. Massa e cubagem não são intercambiáveis. A solução pode exigir fracionamento ou outra unidade de carga, condicionada à segurança e ao operador. Em logística, modele o fluxo físico e o fluxo de informação separadamente e conecte ambos por identificadores. Prazo de trânsito não inclui necessariamente preparação, inspeção, desembaraço e espera. Diferencie capacidade por massa, volume e restrição de produto; o gargalo é o limite efetivamente atingido. Use balanço de estoque e demanda por janela para avaliar risco de ruptura. Custos devem cobrir a mesma fronteira de coleta, frete, armazenagem e entrega, incluindo cobranças condicionais quando conhecidas. Requisitos aduaneiros, de biossegurança e de transporte variam por produto e jurisdição; o aluno organiza evidências e consultas oficiais, sem emitir autorização legal. Preserve eventos de atraso e correções para que o planejamento futuro aprenda com o serviço real. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um contêiner admite 20 toneladas e 30 m³; a carga proposta tem 12 toneladas e 36 m³. Resolução: Identificar volume como restrição excedida em seis m³, apesar da massa disponível. A utilização volumétrica seria 120%, enquanto a de massa é 60%. Com reforço, o volume sobe a 39,6 m³, ampliando o excesso; reduzir peso sem reduzir volume não resolve o gargalo. O cálculo organiza uma decisão de abastecimento sob condições explícitas. Confirme capacidade real, documentos e regras do operador antes da execução; a estimativa didática não garante trânsito, liberação ou entrega. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/import/importing-into-nz-how-it-works/general-importing-requirements",
      "https://www.customs.govt.nz/business/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-planejamento-de-janelas-portuarias-sob-restricao-de-mare",
    "title": "Planejamento de janelas portuárias sob restrição de maré",
    "track": "logistics",
    "role": "Analista de logística e abastecimento do Pacífico",
    "positioning": "specialist",
    "scenario": "Uma operação fictícia tem janela autorizada das 08h às 11h e requer duas horas de movimentação mais uma de preparação.",
    "decision": "Programar preparação antes das 08h quando permitida ou rever a operação, pois três horas ocupam toda a janela sem folga.",
    "misconception": "Iniciar preparação às 09h e presumir que a operação termina dentro da janela.",
    "changedConstraint": "A movimentação passa a durar duas horas e meia.",
    "tasks": [
      "Linha do tempo de atividades",
      "Matriz de dependências",
      "Registro de janela autorizada",
      "Cálculo de folga",
      "Simulação de duração maior",
      "Solicitação de reprogramação"
    ],
    "method": "Modele atividades preparatórias, dependências e janela operacional autorizada. Não use dados de maré didáticos para navegação real. A análise de agenda identifica incompatibilidade e deve encaminhar decisões de segurança marítima ao operador competente. Em logística, modele o fluxo físico e o fluxo de informação separadamente e conecte ambos por identificadores. Prazo de trânsito não inclui necessariamente preparação, inspeção, desembaraço e espera. Diferencie capacidade por massa, volume e restrição de produto; o gargalo é o limite efetivamente atingido. Use balanço de estoque e demanda por janela para avaliar risco de ruptura. Custos devem cobrir a mesma fronteira de coleta, frete, armazenagem e entrega, incluindo cobranças condicionais quando conhecidas. Requisitos aduaneiros, de biossegurança e de transporte variam por produto e jurisdição; o aluno organiza evidências e consultas oficiais, sem emitir autorização legal. Preserve eventos de atraso e correções para que o planejamento futuro aprenda com o serviço real. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma operação fictícia tem janela autorizada das 08h às 11h e requer duas horas de movimentação mais uma de preparação. Resolução: Programar preparação antes das 08h quando permitida ou rever a operação, pois três horas ocupam toda a janela sem folga. Com três horas totais dentro da janela, qualquer atraso torna o plano sem margem. O aumento para três horas e meia exige preparação antecipada permitida ou outra janela; não autoriza estender a operação. O cálculo organiza uma decisão de abastecimento sob condições explícitas. Confirme capacidade real, documentos e regras do operador antes da execução; a estimativa didática não garante trânsito, liberação ou entrega. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/import/importing-into-nz-how-it-works/general-importing-requirements",
      "https://www.customs.govt.nz/business/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-conciliacao-de-documentos-de-biosseguranca-de-importacao",
    "title": "Conciliação de documentos de biossegurança de importação",
    "track": "logistics",
    "role": "Analista de logística e abastecimento do Pacífico",
    "positioning": "specialist",
    "scenario": "Uma remessa para a Nova Zelândia tem 15 linhas de produto e três sem descrição suficiente para identificar requisitos oficiais.",
    "decision": "Solicitar descrição e classificação adequadas antes de concluir o checklist de importação.",
    "misconception": "Copiar o requisito de um produto parecido para as três linhas.",
    "changedConstraint": "Uma linha passa a conter material vegetal de embalagem.",
    "tasks": [
      "Matriz de linhas e atributos",
      "Registro de consultas oficiais",
      "Checklist documental por produto",
      "Mapa de pendências",
      "Teste de embalagem vegetal",
      "Dossiê para validação do importador"
    ],
    "method": "Separe descrição comercial, composição, origem, tratamento e finalidade. Requisitos de biossegurança dependem desses atributos e devem ser consultados nas fontes oficiais atuais. Um checklist completo de documentos não equivale a liberação pela autoridade. Em logística, modele o fluxo físico e o fluxo de informação separadamente e conecte ambos por identificadores. Prazo de trânsito não inclui necessariamente preparação, inspeção, desembaraço e espera. Diferencie capacidade por massa, volume e restrição de produto; o gargalo é o limite efetivamente atingido. Use balanço de estoque e demanda por janela para avaliar risco de ruptura. Custos devem cobrir a mesma fronteira de coleta, frete, armazenagem e entrega, incluindo cobranças condicionais quando conhecidas. Requisitos aduaneiros, de biossegurança e de transporte variam por produto e jurisdição; o aluno organiza evidências e consultas oficiais, sem emitir autorização legal. Preserve eventos de atraso e correções para que o planejamento futuro aprenda com o serviço real. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma remessa para a Nova Zelândia tem 15 linhas de produto e três sem descrição suficiente para identificar requisitos oficiais. Resolução: Solicitar descrição e classificação adequadas antes de concluir o checklist de importação. As 12 linhas descritas não tornam a remessa inteira documentalmente pronta. A presença de material vegetal pode criar requisitos adicionais para embalagem, exigindo rever a análise sem presumir que o produto principal cobre tudo. O cálculo organiza uma decisão de abastecimento sob condições explícitas. Confirme capacidade real, documentos e regras do operador antes da execução; a estimativa didática não garante trânsito, liberação ou entrega. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/import/importing-into-nz-how-it-works/general-importing-requirements",
      "https://www.customs.govt.nz/business/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-programacao-de-transporte-refrigerado-com-entregas-multiplas",
    "title": "Programação de transporte refrigerado com entregas múltiplas",
    "track": "logistics",
    "role": "Analista de logística e abastecimento do Pacífico",
    "positioning": "broad",
    "scenario": "Uma rota possui quatro entregas de 20 minutos e 90 minutos de deslocamento, com limite contratual de três horas.",
    "decision": "Calcular duração mínima de 170 minutos e folga de dez, sem omitir carregamento quando fizer parte do contrato.",
    "misconception": "Usar apenas os 90 minutos de estrada para prometer o horário.",
    "changedConstraint": "Uma entrega exige 25 minutos adicionais de espera.",
    "tasks": [
      "Matriz de tempos",
      "Cadastro de janelas de cliente",
      "Roteiro por sequência",
      "Cálculo de folga contratual",
      "Cenário de espera adicional",
      "Plano de comunicação de atraso"
    ],
    "method": "Separe deslocamento, atendimento, espera e preparação. Verifique a fronteira do prazo contratual e requisitos do produto. Sequenciamento deve considerar janelas e capacidade; otimizar distância não garante cumprimento do tempo total. Em logística, modele o fluxo físico e o fluxo de informação separadamente e conecte ambos por identificadores. Prazo de trânsito não inclui necessariamente preparação, inspeção, desembaraço e espera. Diferencie capacidade por massa, volume e restrição de produto; o gargalo é o limite efetivamente atingido. Use balanço de estoque e demanda por janela para avaliar risco de ruptura. Custos devem cobrir a mesma fronteira de coleta, frete, armazenagem e entrega, incluindo cobranças condicionais quando conhecidas. Requisitos aduaneiros, de biossegurança e de transporte variam por produto e jurisdição; o aluno organiza evidências e consultas oficiais, sem emitir autorização legal. Preserve eventos de atraso e correções para que o planejamento futuro aprenda com o serviço real. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma rota possui quatro entregas de 20 minutos e 90 minutos de deslocamento, com limite contratual de três horas. Resolução: Calcular duração mínima de 170 minutos e folga de dez, sem omitir carregamento quando fizer parte do contrato. A espera adicional eleva a rota para 195 minutos, ultrapassando três horas em 15. A decisão exige reprogramar ou negociar condição autorizada, sem compensar por condução insegura ou omissão de registro. O cálculo organiza uma decisão de abastecimento sob condições explícitas. Confirme capacidade real, documentos e regras do operador antes da execução; a estimativa didática não garante trânsito, liberação ou entrega. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/import/importing-into-nz-how-it-works/general-importing-requirements",
      "https://www.customs.govt.nz/business/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-dimensionamento-de-kits-de-continuidade-para-escolas-insulares",
    "title": "Dimensionamento de kits de continuidade para escolas insulares",
    "track": "logistics",
    "role": "Analista de logística e abastecimento do Pacífico",
    "positioning": "specialist",
    "scenario": "Oito escolas precisam de 12 kits cada e o estoque contém 80 kits completos mais 20 incompletos.",
    "decision": "Identificar demanda de 96 e falta de 16 kits completos, sem contar os incompletos como prontos.",
    "misconception": "Declarar cobertura total porque há 100 kits físicos.",
    "changedConstraint": "Quatro kits completos são reservados para reposição de emergência.",
    "tasks": [
      "Lista de componentes",
      "Base de estados de kit",
      "Cálculo de demanda escolar",
      "Mapa de componentes faltantes",
      "Política de reserva",
      "Plano de distribuição rastreável"
    ],
    "method": "Defina composição e estado de prontidão do kit. Estoque físico, disponível e completo são quantidades diferentes. Faça explosão de componentes e registre reserva; a priorização de distribuição deve usar critérios transparentes aprovados. Em logística, modele o fluxo físico e o fluxo de informação separadamente e conecte ambos por identificadores. Prazo de trânsito não inclui necessariamente preparação, inspeção, desembaraço e espera. Diferencie capacidade por massa, volume e restrição de produto; o gargalo é o limite efetivamente atingido. Use balanço de estoque e demanda por janela para avaliar risco de ruptura. Custos devem cobrir a mesma fronteira de coleta, frete, armazenagem e entrega, incluindo cobranças condicionais quando conhecidas. Requisitos aduaneiros, de biossegurança e de transporte variam por produto e jurisdição; o aluno organiza evidências e consultas oficiais, sem emitir autorização legal. Preserve eventos de atraso e correções para que o planejamento futuro aprenda com o serviço real. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Oito escolas precisam de 12 kits cada e o estoque contém 80 kits completos mais 20 incompletos. Resolução: Identificar demanda de 96 e falta de 16 kits completos, sem contar os incompletos como prontos. Com reserva de quatro, restam 76 disponíveis e a falta operacional passa a 20. Os kits incompletos podem reduzir a lacuna somente após receber componentes e passar pela conferência de completude. O cálculo organiza uma decisão de abastecimento sob condições explícitas. Confirme capacidade real, documentos e regras do operador antes da execução; a estimativa didática não garante trânsito, liberação ou entrega. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/import/importing-into-nz-how-it-works/general-importing-requirements",
      "https://www.customs.govt.nz/business/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-analise-de-custo-total-de-frete-para-microexportadores",
    "title": "Análise de custo total de frete para microexportadores",
    "track": "logistics",
    "role": "Analista de logística e abastecimento do Pacífico",
    "positioning": "specialist",
    "scenario": "Uma proposta cobra 900 de frete e 350 de taxas; outra cobra 1100 de frete e 100 de taxas para o mesmo escopo.",
    "decision": "Comparar totais de 1250 e 1200, verificando exclusões antes de escolher.",
    "misconception": "Escolher a proposta de 900 por ter menor linha de frete.",
    "changedConstraint": "A segunda proposta exclui armazenagem estimada em 180.",
    "tasks": [
      "Matriz de escopo de cotações",
      "Tabela de taxas",
      "Cálculo de custo total",
      "Registro de exclusões",
      "Sensibilidade de armazenagem",
      "Memorando de seleção"
    ],
    "method": "Normalize fronteira de serviço, moeda, tributos e condições de cobrança. Uma cotação deve ser comparada no mesmo ponto de entrega e com os mesmos riscos. Custos estimados precisam ser marcados e submetidos à sensibilidade. Em logística, modele o fluxo físico e o fluxo de informação separadamente e conecte ambos por identificadores. Prazo de trânsito não inclui necessariamente preparação, inspeção, desembaraço e espera. Diferencie capacidade por massa, volume e restrição de produto; o gargalo é o limite efetivamente atingido. Use balanço de estoque e demanda por janela para avaliar risco de ruptura. Custos devem cobrir a mesma fronteira de coleta, frete, armazenagem e entrega, incluindo cobranças condicionais quando conhecidas. Requisitos aduaneiros, de biossegurança e de transporte variam por produto e jurisdição; o aluno organiza evidências e consultas oficiais, sem emitir autorização legal. Preserve eventos de atraso e correções para que o planejamento futuro aprenda com o serviço real. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma proposta cobra 900 de frete e 350 de taxas; outra cobra 1100 de frete e 100 de taxas para o mesmo escopo. Resolução: Comparar totais de 1250 e 1200, verificando exclusões antes de escolher. Ao acrescentar 180, a segunda opção chega a 1380 e ultrapassa a primeira em 130. A inversão mostra por que preço de frete isolado não mede custo total, embora prazo e confiabilidade ainda importem. O cálculo organiza uma decisão de abastecimento sob condições explícitas. Confirme capacidade real, documentos e regras do operador antes da execução; a estimativa didática não garante trânsito, liberação ou entrega. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/import/importing-into-nz-how-it-works/general-importing-requirements",
      "https://www.customs.govt.nz/business/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-gestao-de-retornos-de-embalagens-em-cadeias-maritimas",
    "title": "Gestão de retornos de embalagens em cadeias marítimas",
    "track": "logistics",
    "role": "Analista de logística e abastecimento do Pacífico",
    "positioning": "specialist",
    "scenario": "Uma cooperativa envia 500 caixas retornáveis, recebe 380 e mantém 70 confirmadas com clientes.",
    "decision": "Apontar 50 caixas sem localização reconciliada e distinguir retorno de saldo em circulação.",
    "misconception": "Registrar 120 caixas como perdidas porque não voltaram ainda.",
    "changedConstraint": "Um cliente devolve 30 caixas danificadas.",
    "tasks": [
      "Mapa de estados de embalagem",
      "Controle de expedições",
      "Conciliação de saldos com clientes",
      "Indicador de localização",
      "Registro de danos",
      "Plano de recuperação e reposição"
    ],
    "method": "Modele estados expedido, em uso, retornado, danificado e não localizado por identificador ou lote. Prazo de retorno e perda definitiva são critérios distintos. Custos de reparo e substituição dependem de avaliação documentada. Em logística, modele o fluxo físico e o fluxo de informação separadamente e conecte ambos por identificadores. Prazo de trânsito não inclui necessariamente preparação, inspeção, desembaraço e espera. Diferencie capacidade por massa, volume e restrição de produto; o gargalo é o limite efetivamente atingido. Use balanço de estoque e demanda por janela para avaliar risco de ruptura. Custos devem cobrir a mesma fronteira de coleta, frete, armazenagem e entrega, incluindo cobranças condicionais quando conhecidas. Requisitos aduaneiros, de biossegurança e de transporte variam por produto e jurisdição; o aluno organiza evidências e consultas oficiais, sem emitir autorização legal. Preserve eventos de atraso e correções para que o planejamento futuro aprenda com o serviço real. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma cooperativa envia 500 caixas retornáveis, recebe 380 e mantém 70 confirmadas com clientes. Resolução: Apontar 50 caixas sem localização reconciliada e distinguir retorno de saldo em circulação. As 380 retornadas mais 70 localizadas explicam 450 das 500. As 30 danificadas podem pertencer às já retornadas ou a novo evento, por isso o balanço precisa de identificação para evitar contagem dupla. O cálculo organiza uma decisão de abastecimento sob condições explícitas. Confirme capacidade real, documentos e regras do operador antes da execução; a estimativa didática não garante trânsito, liberação ou entrega. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/import/importing-into-nz-how-it-works/general-importing-requirements",
      "https://www.customs.govt.nz/business/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-sequenciamento-de-recebimento-de-pecas-para-manutencao-remota",
    "title": "Sequenciamento de recebimento de peças para manutenção remota",
    "track": "logistics",
    "role": "Analista de logística e abastecimento do Pacífico",
    "positioning": "broad",
    "scenario": "Uma parada precisa de seis peças; quatro chegam na segunda, uma na quarta e a última na sexta.",
    "decision": "Identificar a sexta-feira como limite de disponibilidade completa e avaliar tarefas independentes antes dela.",
    "misconception": "Prometer conclusão na segunda porque a maioria das peças chegou.",
    "changedConstraint": "A peça final depende de inspeção no recebimento.",
    "tasks": [
      "Lista de materiais por tarefa",
      "Calendário de chegadas",
      "Mapa de componentes críticos",
      "Plano de tarefas independentes",
      "Janela de inspeção",
      "Previsão de prontidão completa"
    ],
    "method": "Use lista de materiais ligada à sequência de tarefas. Percentual de peças recebidas não representa percentual de prontidão do trabalho. Identifique componentes críticos, substituições autorizadas e tempo de inspeção antes da liberação. Em logística, modele o fluxo físico e o fluxo de informação separadamente e conecte ambos por identificadores. Prazo de trânsito não inclui necessariamente preparação, inspeção, desembaraço e espera. Diferencie capacidade por massa, volume e restrição de produto; o gargalo é o limite efetivamente atingido. Use balanço de estoque e demanda por janela para avaliar risco de ruptura. Custos devem cobrir a mesma fronteira de coleta, frete, armazenagem e entrega, incluindo cobranças condicionais quando conhecidas. Requisitos aduaneiros, de biossegurança e de transporte variam por produto e jurisdição; o aluno organiza evidências e consultas oficiais, sem emitir autorização legal. Preserve eventos de atraso e correções para que o planejamento futuro aprenda com o serviço real. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma parada precisa de seis peças; quatro chegam na segunda, uma na quarta e a última na sexta. Resolução: Identificar a sexta-feira como limite de disponibilidade completa e avaliar tarefas independentes antes dela. Quatro de seis peças representam 66,67% da contagem, mas a peça ausente pode bloquear todo o conjunto. A chegada na sexta não significa uso imediato se a inspeção ainda for requisito. O cálculo organiza uma decisão de abastecimento sob condições explícitas. Confirme capacidade real, documentos e regras do operador antes da execução; a estimativa didática não garante trânsito, liberação ou entrega. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/import/importing-into-nz-how-it-works/general-importing-requirements",
      "https://www.customs.govt.nz/business/",
      "https://www.buildingsmart.org/standards/bsi-standards/bim-collaboration-format/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-monitoramento-de-confiabilidade-de-servicos-de-ferry",
    "title": "Monitoramento de confiabilidade de serviços de ferry",
    "track": "logistics",
    "role": "Analista de logística e abastecimento do Pacífico",
    "positioning": "specialist",
    "scenario": "Um serviço planeja 100 viagens, cancela dez e opera 90, das quais 72 chegam no horário.",
    "decision": "Reportar execução de 90% e pontualidade de 80% entre operadas, além de 72% sobre o planejado.",
    "misconception": "Anunciar pontualidade de 80% como se incluísse as viagens canceladas.",
    "changedConstraint": "Cinco viagens são substituídas por outro operador.",
    "tasks": [
      "Dicionário de eventos",
      "Base de viagens planejadas",
      "Indicador de execução",
      "Indicador de pontualidade",
      "Regra de substituição",
      "Painel de confiabilidade contextualizado"
    ],
    "method": "Defina universo de cada indicador antes da divisão. Cancelamento, atraso e substituição são eventos diferentes. Mostre medidas condicionais e totais para evitar que cancelamentos melhorem artificialmente o desempenho percebido. Em logística, modele o fluxo físico e o fluxo de informação separadamente e conecte ambos por identificadores. Prazo de trânsito não inclui necessariamente preparação, inspeção, desembaraço e espera. Diferencie capacidade por massa, volume e restrição de produto; o gargalo é o limite efetivamente atingido. Use balanço de estoque e demanda por janela para avaliar risco de ruptura. Custos devem cobrir a mesma fronteira de coleta, frete, armazenagem e entrega, incluindo cobranças condicionais quando conhecidas. Requisitos aduaneiros, de biossegurança e de transporte variam por produto e jurisdição; o aluno organiza evidências e consultas oficiais, sem emitir autorização legal. Preserve eventos de atraso e correções para que o planejamento futuro aprenda com o serviço real. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um serviço planeja 100 viagens, cancela dez e opera 90, das quais 72 chegam no horário. Resolução: Reportar execução de 90% e pontualidade de 80% entre operadas, além de 72% sobre o planejado. Setenta e duas de 90 operadas equivale a 80%, mas 72 de 100 planejadas equivale a 72%. Substituições exigem regra de atribuição e evidência de atendimento para manter comparabilidade entre períodos. O cálculo organiza uma decisão de abastecimento sob condições explícitas. Confirme capacidade real, documentos e regras do operador antes da execução; a estimativa didática não garante trânsito, liberação ou entrega. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.mpi.govt.nz/import/importing-into-nz-how-it-works/general-importing-requirements",
      "https://www.customs.govt.nz/business/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-coordenacao-de-teleatendimento-em-comunidades-com-baixa-conectividade",
    "title": "Coordenação de teleatendimento em comunidades com baixa conectividade",
    "track": "care",
    "role": "Coordenador de operações e acesso a serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Uma agenda rural tem 20 sessões de 30 minutos e quatro usuários só conseguem conexão em janelas de 15 minutos.",
    "decision": "Identificar incompatibilidade das quatro janelas e oferecer canal ou reagendamento aprovado, sem declarar a sessão concluída.",
    "misconception": "Registrar atendimento completo porque o usuário entrou por alguns minutos.",
    "changedConstraint": "A conexão fica indisponível durante toda a manhã.",
    "tasks": [
      "Mapa de janelas de conexão",
      "Taxonomia de estados de sessão",
      "Checklist de canal acessível",
      "Fluxo de reagendamento",
      "Plano de indisponibilidade",
      "Indicador de conclusão efetiva"
    ],
    "method": "Mapeie requisitos mínimos da sessão, canal disponível e alternativa autorizada. Separe conexão estabelecida, sessão iniciada e serviço concluído. Planejamento acessível inclui confirmação de privacidade e meio de retorno, respeitando o protocolo do serviço. Na coordenação de serviços de cuidado, diferencie organização administrativa de decisão clínica. Use somente dados mínimos necessários, com finalidade e acesso definidos. Uma triagem de documentação não diagnostica pessoas nem altera prescrição. Registre pedido, consentimento quando aplicável, necessidade de acessibilidade, responsável e estado de encaminhamento. Prioridade precisa seguir critérios aprovados, e casos de risco devem ser encaminhados pelo protocolo competente. Capacidade de agenda não é capacidade clínica e uma vaga nominal pode depender de transporte, equipe ou equipamento. Indicadores precisam preservar denominadores e evitar identificação de pessoas em grupos pequenos. O estudante aprende a tornar o serviço mais rastreável e acessível, sem prometer habilitação profissional, tratamento ou avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma agenda rural tem 20 sessões de 30 minutos e quatro usuários só conseguem conexão em janelas de 15 minutos. Resolução: Identificar incompatibilidade das quatro janelas e oferecer canal ou reagendamento aprovado, sem declarar a sessão concluída. As quatro pessoas representam 20% da agenda, mas não quatro atendimentos concluídos. Uma alternativa pode ser telefone ou atendimento presencial se o serviço permitir; a escolha depende da necessidade e confirmação do usuário. O exemplo trata do funcionamento do serviço e deve ser testado com dados fictícios. A decisão preserva autonomia, privacidade e encaminhamento competente; nenhum indicador administrativo autoriza reduzir cuidado necessário. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.agedcarequality.gov.au/providers/quality-standards",
      "https://www.health.govt.nz/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-gestao-de-transporte-para-acesso-a-consultas-rurais",
    "title": "Gestão de transporte para acesso a consultas rurais",
    "track": "care",
    "role": "Coordenador de operações e acesso a serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Oito usuários têm consultas entre 09h e 11h e um veículo oferece seis assentos por viagem.",
    "decision": "Identificar falta de dois assentos na viagem única e avaliar segunda rota com horários confirmados.",
    "misconception": "Acomodar oito pessoas em seis assentos para cumprir a agenda.",
    "changedConstraint": "Dois usuários precisam de transporte adaptado que ocupa mais espaço.",
    "tasks": [
      "Cadastro de necessidades de transporte",
      "Matriz de capacidade",
      "Agrupamento por janela",
      "Plano de rotas",
      "Teste de configuração adaptada",
      "Protocolo de confirmação com usuários"
    ],
    "method": "Relacione capacidade física autorizada, necessidades de acessibilidade, tempo de trajeto e janela de atendimento. Um número de assentos não descreve todas as configurações. Confirme os requisitos com o operador e preserve dados mínimos sobre o usuário. Na coordenação de serviços de cuidado, diferencie organização administrativa de decisão clínica. Use somente dados mínimos necessários, com finalidade e acesso definidos. Uma triagem de documentação não diagnostica pessoas nem altera prescrição. Registre pedido, consentimento quando aplicável, necessidade de acessibilidade, responsável e estado de encaminhamento. Prioridade precisa seguir critérios aprovados, e casos de risco devem ser encaminhados pelo protocolo competente. Capacidade de agenda não é capacidade clínica e uma vaga nominal pode depender de transporte, equipe ou equipamento. Indicadores precisam preservar denominadores e evitar identificação de pessoas em grupos pequenos. O estudante aprende a tornar o serviço mais rastreável e acessível, sem prometer habilitação profissional, tratamento ou avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Oito usuários têm consultas entre 09h e 11h e um veículo oferece seis assentos por viagem. Resolução: Identificar falta de dois assentos na viagem única e avaliar segunda rota com horários confirmados. O déficit inicial de dois é apenas contagem simples. A configuração adaptada pode reduzir assentos, portanto o novo plano deve usar capacidade confirmada e evitar prometer horário antes de verificar trânsito e atendimento. O exemplo trata do funcionamento do serviço e deve ser testado com dados fictícios. A decisão preserva autonomia, privacidade e encaminhamento competente; nenhum indicador administrativo autoriza reduzir cuidado necessário. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.agedcarequality.gov.au/providers/quality-standards",
      "https://www.health.govt.nz/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-reconciliacao-de-encaminhamentos-entre-servicos-comunitarios",
    "title": "Reconciliação de encaminhamentos entre serviços comunitários",
    "track": "care",
    "role": "Coordenador de operações e acesso a serviços de cuidado",
    "positioning": "broad",
    "scenario": "Um centro envia 40 encaminhamentos, recebe 28 confirmações e tem oito recusas formais.",
    "decision": "Manter quatro encaminhamentos em estado sem resposta e distinguir confirmação de atendimento realizado.",
    "misconception": "Contar as 28 confirmações como 28 pessoas atendidas.",
    "changedConstraint": "Cinco confirmações são canceladas antes do agendamento.",
    "tasks": [
      "Modelo de estados",
      "Base de encaminhamentos",
      "Conciliação de confirmações",
      "Fila de pendências",
      "Registro de cancelamentos",
      "Painel de acesso efetivo"
    ],
    "method": "Use uma máquina de estados com enviado, recebido, aceito, agendado, concluído e encerrado. Cada transição exige evidência e responsável. Confirmação de recebimento não garante acesso; registre motivo de recusa sem expor informação desnecessária. Na coordenação de serviços de cuidado, diferencie organização administrativa de decisão clínica. Use somente dados mínimos necessários, com finalidade e acesso definidos. Uma triagem de documentação não diagnostica pessoas nem altera prescrição. Registre pedido, consentimento quando aplicável, necessidade de acessibilidade, responsável e estado de encaminhamento. Prioridade precisa seguir critérios aprovados, e casos de risco devem ser encaminhados pelo protocolo competente. Capacidade de agenda não é capacidade clínica e uma vaga nominal pode depender de transporte, equipe ou equipamento. Indicadores precisam preservar denominadores e evitar identificação de pessoas em grupos pequenos. O estudante aprende a tornar o serviço mais rastreável e acessível, sem prometer habilitação profissional, tratamento ou avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um centro envia 40 encaminhamentos, recebe 28 confirmações e tem oito recusas formais. Resolução: Manter quatro encaminhamentos em estado sem resposta e distinguir confirmação de atendimento realizado. Os 28 mais oito explicam 36 dos 40 pedidos, restando quatro sem resposta. Cancelamentos precisam atualizar o estado, mas não apagar o histórico de confirmação; o indicador de conclusão deve usar evidência própria. O exemplo trata do funcionamento do serviço e deve ser testado com dados fictícios. A decisão preserva autonomia, privacidade e encaminhamento competente; nenhum indicador administrativo autoriza reduzir cuidado necessário. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.agedcarequality.gov.au/providers/quality-standards",
      "https://www.health.govt.nz/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-planejamento-de-cobertura-de-apoio-em-servicos-para-idosos",
    "title": "Planejamento de cobertura de apoio em serviços para idosos",
    "track": "care",
    "role": "Coordenador de operações e acesso a serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Uma unidade precisa de 120 horas administrativas de apoio semanal e tem três pessoas com 35 horas disponíveis cada.",
    "decision": "Apontar lacuna de 15 horas e verificar tarefas, competências e cobertura antes de redistribuir.",
    "misconception": "Cobrir a lacuna presumindo trabalho extra gratuito da equipe.",
    "changedConstraint": "Uma pessoa fica ausente por dez horas.",
    "tasks": [
      "Mapa de tarefas de apoio",
      "Matriz de competências",
      "Balanço de horas",
      "Plano de cobertura",
      "Cenário de ausência",
      "Registro de decisões de escala"
    ],
    "method": "Capacidade disponível deve descontar ausência, treinamento e tarefas incompatíveis com o papel. Separe horas contratadas de horas prontas para uma função. Alterar escala exige regras locais e validação de responsáveis; o estudo não define dimensionamento clínico. Na coordenação de serviços de cuidado, diferencie organização administrativa de decisão clínica. Use somente dados mínimos necessários, com finalidade e acesso definidos. Uma triagem de documentação não diagnostica pessoas nem altera prescrição. Registre pedido, consentimento quando aplicável, necessidade de acessibilidade, responsável e estado de encaminhamento. Prioridade precisa seguir critérios aprovados, e casos de risco devem ser encaminhados pelo protocolo competente. Capacidade de agenda não é capacidade clínica e uma vaga nominal pode depender de transporte, equipe ou equipamento. Indicadores precisam preservar denominadores e evitar identificação de pessoas em grupos pequenos. O estudante aprende a tornar o serviço mais rastreável e acessível, sem prometer habilitação profissional, tratamento ou avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma unidade precisa de 120 horas administrativas de apoio semanal e tem três pessoas com 35 horas disponíveis cada. Resolução: Apontar lacuna de 15 horas e verificar tarefas, competências e cobertura antes de redistribuir. Três vezes 35 fornece 105 horas, 12,5% abaixo da necessidade de 120. A ausência reduz a capacidade a 95 e amplia a lacuna a 25, exigindo resposta explícita em vez de expectativa informal de compensação. O exemplo trata do funcionamento do serviço e deve ser testado com dados fictícios. A decisão preserva autonomia, privacidade e encaminhamento competente; nenhum indicador administrativo autoriza reduzir cuidado necessário. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.agedcarequality.gov.au/providers/quality-standards",
      "https://www.health.govt.nz/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-acessibilidade-de-comunicacoes-de-agendamento-em-saude",
    "title": "Acessibilidade de comunicações de agendamento em saúde",
    "track": "care",
    "role": "Coordenador de operações e acesso a serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Um serviço envia 200 lembretes só por mensagem escrita, embora 25 usuários tenham solicitado contato por áudio ou ligação.",
    "decision": "Adaptar o canal dos 25 conforme preferência registrada e verificar entendimento sem divulgar informação sensível.",
    "misconception": "Considerar todas as mensagens entregues como comunicação compreendida.",
    "changedConstraint": "Dez números pertencem a familiares que compartilham o aparelho.",
    "tasks": [
      "Inventário de preferências",
      "Matriz de canais",
      "Modelos de lembrete acessível",
      "Protocolo de confirmação",
      "Teste de telefone compartilhado",
      "Indicador de comunicação efetiva"
    ],
    "method": "Separe entrega técnica, acesso ao conteúdo e compreensão do próximo passo. Registre preferências e permissões de contato com granularidade. Mensagens em aparelhos compartilhados devem minimizar informação e confirmar a identidade pelo procedimento aprovado. Na coordenação de serviços de cuidado, diferencie organização administrativa de decisão clínica. Use somente dados mínimos necessários, com finalidade e acesso definidos. Uma triagem de documentação não diagnostica pessoas nem altera prescrição. Registre pedido, consentimento quando aplicável, necessidade de acessibilidade, responsável e estado de encaminhamento. Prioridade precisa seguir critérios aprovados, e casos de risco devem ser encaminhados pelo protocolo competente. Capacidade de agenda não é capacidade clínica e uma vaga nominal pode depender de transporte, equipe ou equipamento. Indicadores precisam preservar denominadores e evitar identificação de pessoas em grupos pequenos. O estudante aprende a tornar o serviço mais rastreável e acessível, sem prometer habilitação profissional, tratamento ou avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um serviço envia 200 lembretes só por mensagem escrita, embora 25 usuários tenham solicitado contato por áudio ou ligação. Resolução: Adaptar o canal dos 25 conforme preferência registrada e verificar entendimento sem divulgar informação sensível. Os 25 representam 12,5% da lista com necessidade conhecida de adaptação. A comunicação alternativa precisa preservar privacidade; não basta encaminhar o mesmo conteúdo clínico a um familiar sem base e autorização apropriadas. O exemplo trata do funcionamento do serviço e deve ser testado com dados fictícios. A decisão preserva autonomia, privacidade e encaminhamento competente; nenhum indicador administrativo autoriza reduzir cuidado necessário. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.agedcarequality.gov.au/providers/quality-standards",
      "https://www.health.govt.nz/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-documentacao-de-consentimento-para-pesquisa-comunitaria-nao-clinica",
    "title": "Documentação de consentimento para pesquisa comunitária não clínica",
    "track": "care",
    "role": "Coordenador de operações e acesso a serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Uma pesquisa insular tem 60 formulários, mas 12 usam uma versão anterior que não descreve o compartilhamento planejado.",
    "decision": "Suspender esse compartilhamento para os 12 até revisão ética e de consentimento apropriada.",
    "misconception": "Presumir concordância porque todos assinaram alguma versão.",
    "changedConstraint": "A comunidade solicita governança coletiva sobre os resultados.",
    "tasks": [
      "Matriz de versões de consentimento",
      "Mapa de finalidades",
      "Registro de restrições de uso",
      "Fluxo de revisão ética",
      "Plano de governança comunitária",
      "Relatório de lacunas documentais"
    ],
    "method": "Relacione versão de informação, finalidade, data e autorização de uso. Assinatura isolada não demonstra consentimento informado para qualquer finalidade. Respeite governança comunitária e avaliação ética, evitando reduzir direitos individuais a uma aprovação genérica de liderança. Na coordenação de serviços de cuidado, diferencie organização administrativa de decisão clínica. Use somente dados mínimos necessários, com finalidade e acesso definidos. Uma triagem de documentação não diagnostica pessoas nem altera prescrição. Registre pedido, consentimento quando aplicável, necessidade de acessibilidade, responsável e estado de encaminhamento. Prioridade precisa seguir critérios aprovados, e casos de risco devem ser encaminhados pelo protocolo competente. Capacidade de agenda não é capacidade clínica e uma vaga nominal pode depender de transporte, equipe ou equipamento. Indicadores precisam preservar denominadores e evitar identificação de pessoas em grupos pequenos. O estudante aprende a tornar o serviço mais rastreável e acessível, sem prometer habilitação profissional, tratamento ou avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma pesquisa insular tem 60 formulários, mas 12 usam uma versão anterior que não descreve o compartilhamento planejado. Resolução: Suspender esse compartilhamento para os 12 até revisão ética e de consentimento apropriada. Há 48 registros na versão atual e 12 que exigem análise específica. Uma solicitação coletiva pode acrescentar condições de governança, mas não substitui automaticamente requisitos individuais ou aprovação ética. O exemplo trata do funcionamento do serviço e deve ser testado com dados fictícios. A decisão preserva autonomia, privacidade e encaminhamento competente; nenhum indicador administrativo autoriza reduzir cuidado necessário. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.agedcarequality.gov.au/providers/quality-standards",
      "https://www.health.govt.nz/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-gestao-de-filas-de-avaliacao-de-necessidades-de-apoio",
    "title": "Gestão de filas de avaliação de necessidades de apoio",
    "track": "care",
    "role": "Coordenador de operações e acesso a serviços de cuidado",
    "positioning": "broad",
    "scenario": "Uma fila tem 80 pedidos, 20 sem documentação e 15 marcados para prioridade por protocolo aprovado.",
    "decision": "Separar completude documental de prioridade e revisar os 15 sem empurrar automaticamente os incompletos para o fim.",
    "misconception": "Ordenar apenas pela data ou completude ignorando o protocolo de prioridade.",
    "changedConstraint": "Cinco pedidos incompletos também têm marcação prioritária.",
    "tasks": [
      "Modelo de categorias sobrepostas",
      "Fila por prioridade aprovada",
      "Fluxo de apoio documental",
      "Registro de decisões",
      "Teste de prioridade com lacuna",
      "Indicadores de tempo de acesso"
    ],
    "method": "Use critérios aprovados para urgência e uma fila própria de obtenção de documentos. Evite que dificuldade de documentação se transforme em barreira injustificada de acesso. Registre decisões e encaminhe situações de risco ao serviço competente. Na coordenação de serviços de cuidado, diferencie organização administrativa de decisão clínica. Use somente dados mínimos necessários, com finalidade e acesso definidos. Uma triagem de documentação não diagnostica pessoas nem altera prescrição. Registre pedido, consentimento quando aplicável, necessidade de acessibilidade, responsável e estado de encaminhamento. Prioridade precisa seguir critérios aprovados, e casos de risco devem ser encaminhados pelo protocolo competente. Capacidade de agenda não é capacidade clínica e uma vaga nominal pode depender de transporte, equipe ou equipamento. Indicadores precisam preservar denominadores e evitar identificação de pessoas em grupos pequenos. O estudante aprende a tornar o serviço mais rastreável e acessível, sem prometer habilitação profissional, tratamento ou avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma fila tem 80 pedidos, 20 sem documentação e 15 marcados para prioridade por protocolo aprovado. Resolução: Separar completude documental de prioridade e revisar os 15 sem empurrar automaticamente os incompletos para o fim. As categorias podem sobrepor-se: 20 mais 15 não significa 35 pessoas diferentes. Os cinco prioritários incompletos precisam de ação coordenada de acesso e documentação, sem inventar avaliação clínica pelo formulário. O exemplo trata do funcionamento do serviço e deve ser testado com dados fictícios. A decisão preserva autonomia, privacidade e encaminhamento competente; nenhum indicador administrativo autoriza reduzir cuidado necessário. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.agedcarequality.gov.au/providers/quality-standards",
      "https://www.health.govt.nz/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-operacoes-de-programas-de-alimentacao-escolar-inclusiva",
    "title": "Operações de programas de alimentação escolar inclusiva",
    "track": "care",
    "role": "Coordenador de operações e acesso a serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Uma escola planeja 300 refeições e possui 18 solicitações documentadas de adaptação, sendo seis ainda sem confirmação da cozinha.",
    "decision": "Manter as seis como pendentes e obter confirmação antes de comunicar disponibilidade da adaptação.",
    "misconception": "Contar todas as 18 como prontas porque o pedido foi recebido.",
    "changedConstraint": "A lista cresce em dez alunos na véspera.",
    "tasks": [
      "Base mínima de solicitações",
      "Matriz de confirmação de preparo",
      "Fluxo entre escola e cozinha",
      "Checklist de entrega",
      "Cenário de aumento de matrícula",
      "Relatório de atendimento inclusivo"
    ],
    "method": "Diferencie solicitação, especificação aprovada, capacidade de preparo e confirmação de entrega. Informações de restrição alimentar devem circular apenas a quem precisa. O plano não substitui orientação profissional ou controles de segurança de alimentos. Na coordenação de serviços de cuidado, diferencie organização administrativa de decisão clínica. Use somente dados mínimos necessários, com finalidade e acesso definidos. Uma triagem de documentação não diagnostica pessoas nem altera prescrição. Registre pedido, consentimento quando aplicável, necessidade de acessibilidade, responsável e estado de encaminhamento. Prioridade precisa seguir critérios aprovados, e casos de risco devem ser encaminhados pelo protocolo competente. Capacidade de agenda não é capacidade clínica e uma vaga nominal pode depender de transporte, equipe ou equipamento. Indicadores precisam preservar denominadores e evitar identificação de pessoas em grupos pequenos. O estudante aprende a tornar o serviço mais rastreável e acessível, sem prometer habilitação profissional, tratamento ou avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma escola planeja 300 refeições e possui 18 solicitações documentadas de adaptação, sendo seis ainda sem confirmação da cozinha. Resolução: Manter as seis como pendentes e obter confirmação antes de comunicar disponibilidade da adaptação. Doze solicitações estão confirmadas e seis pendentes, o que exige ação antes do serviço. A mudança de matrícula altera quantidade e possivelmente requisitos; multiplicar a receita geral não garante atendimento das adaptações. O exemplo trata do funcionamento do serviço e deve ser testado com dados fictícios. A decisão preserva autonomia, privacidade e encaminhamento competente; nenhum indicador administrativo autoriza reduzir cuidado necessário. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.agedcarequality.gov.au/providers/quality-standards",
      "https://www.health.govt.nz/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-planejamento-de-acessibilidade-em-atividades-de-primeira-infancia",
    "title": "Planejamento de acessibilidade em atividades de primeira infância",
    "track": "care",
    "role": "Coordenador de operações e acesso a serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Uma atividade prevê 24 crianças em quatro estações, mas uma estação só permite participação em pé e três crianças necessitam alternativa sentada.",
    "decision": "Redesenhar a estação para participação equivalente e revisar a circulação, sem separar automaticamente as três crianças.",
    "misconception": "Excluir as três da estação por conveniência de organização.",
    "changedConstraint": "Uma criança precisa de instruções em comunicação alternativa.",
    "tasks": [
      "Mapa de barreiras",
      "Plano de estações acessíveis",
      "Alternativas de comunicação",
      "Roteiro de circulação",
      "Teste de participação equivalente",
      "Registro de ajustes com responsáveis"
    ],
    "method": "Observe a barreira da atividade em vez de atribuir o problema à criança. Planeje meios variados de participação e comunicação, em diálogo com responsáveis e profissionais. Adaptação deve manter objetivo e segurança, sem avaliar desenvolvimento clínico. Na coordenação de serviços de cuidado, diferencie organização administrativa de decisão clínica. Use somente dados mínimos necessários, com finalidade e acesso definidos. Uma triagem de documentação não diagnostica pessoas nem altera prescrição. Registre pedido, consentimento quando aplicável, necessidade de acessibilidade, responsável e estado de encaminhamento. Prioridade precisa seguir critérios aprovados, e casos de risco devem ser encaminhados pelo protocolo competente. Capacidade de agenda não é capacidade clínica e uma vaga nominal pode depender de transporte, equipe ou equipamento. Indicadores precisam preservar denominadores e evitar identificação de pessoas em grupos pequenos. O estudante aprende a tornar o serviço mais rastreável e acessível, sem prometer habilitação profissional, tratamento ou avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma atividade prevê 24 crianças em quatro estações, mas uma estação só permite participação em pé e três crianças necessitam alternativa sentada. Resolução: Redesenhar a estação para participação equivalente e revisar a circulação, sem separar automaticamente as três crianças. Quatro grupos de seis organizam a capacidade, mas não resolvem a barreira postural. A alternativa sentada e a comunicação acessível precisam ser testadas no percurso completo, incluindo início, troca de estação e conclusão. O exemplo trata do funcionamento do serviço e deve ser testado com dados fictícios. A decisão preserva autonomia, privacidade e encaminhamento competente; nenhum indicador administrativo autoriza reduzir cuidado necessário. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.agedcarequality.gov.au/providers/quality-standards",
      "https://www.health.govt.nz/",
      "https://www.education.gov.au/early-childhood"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-indicadores-de-continuidade-em-servicos-domiciliares",
    "title": "Indicadores de continuidade em serviços domiciliares",
    "track": "care",
    "role": "Coordenador de operações e acesso a serviços de cuidado",
    "positioning": "specialist",
    "scenario": "Um serviço planeja 150 visitas, realiza 138 e remarca nove, das quais quatro ocorrem ainda na semana.",
    "decision": "Reportar 138 realizadas no horário original e quatro recuperadas, sem contar as nove remarcações como concluídas.",
    "misconception": "Somar todas as remarcações e anunciar 147 visitas realizadas.",
    "changedConstraint": "Três visitas realizadas não possuem confirmação documental.",
    "tasks": [
      "Dicionário de compromissos",
      "Conciliação de visitas",
      "Indicador de execução original",
      "Indicador de recuperação",
      "Fila de confirmação documental",
      "Memorando de continuidade"
    ],
    "method": "Separe compromisso original, remarcação e realização verificada por identificador. Continuidade inclui atraso e impacto no usuário, não só volume semanal. Pendência de registro requer conferência, sem presumir fraude ou atendimento inexistente. Na coordenação de serviços de cuidado, diferencie organização administrativa de decisão clínica. Use somente dados mínimos necessários, com finalidade e acesso definidos. Uma triagem de documentação não diagnostica pessoas nem altera prescrição. Registre pedido, consentimento quando aplicável, necessidade de acessibilidade, responsável e estado de encaminhamento. Prioridade precisa seguir critérios aprovados, e casos de risco devem ser encaminhados pelo protocolo competente. Capacidade de agenda não é capacidade clínica e uma vaga nominal pode depender de transporte, equipe ou equipamento. Indicadores precisam preservar denominadores e evitar identificação de pessoas em grupos pequenos. O estudante aprende a tornar o serviço mais rastreável e acessível, sem prometer habilitação profissional, tratamento ou avaliação especializada. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um serviço planeja 150 visitas, realiza 138 e remarca nove, das quais quatro ocorrem ainda na semana. Resolução: Reportar 138 realizadas no horário original e quatro recuperadas, sem contar as nove remarcações como concluídas. O total executado informado é 142 se as quatro recuperações forem eventos distintos incluídos no plano. A falta de confirmação de três exige um estado verificável e pode alterar o indicador até a conciliação. O exemplo trata do funcionamento do serviço e deve ser testado com dados fictícios. A decisão preserva autonomia, privacidade e encaminhamento competente; nenhum indicador administrativo autoriza reduzir cuidado necessário. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.agedcarequality.gov.au/providers/quality-standards",
      "https://www.health.govt.nz/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-recuperacao-verificavel-de-backups-em-cooperativas-rurais",
    "title": "Recuperação verificável de backups em cooperativas rurais",
    "track": "cyber",
    "role": "Analista de segurança operacional de pequenas organizações",
    "positioning": "broad",
    "scenario": "Uma cooperativa possui 30 backups diários, mas o único teste de restauração ocorreu há seis meses.",
    "decision": "Realizar restauração autorizada em ambiente isolado e medir completude e tempo, sem presumir recuperabilidade pela contagem de arquivos.",
    "misconception": "Declarar recuperação garantida porque existem 30 cópias.",
    "changedConstraint": "O teste revela dependência de uma chave não incluída no procedimento.",
    "tasks": [
      "Inventário de dependências",
      "Plano de restauração isolada",
      "Checklist de integridade",
      "Medição de tempo de recuperação",
      "Registro de chave ausente",
      "Procedimento revisado de recuperação"
    ],
    "method": "Defina quais dados e dependências são necessários para recuperar o serviço. Teste leitura, integridade e uso em ambiente isolado, registrando versão e tempo. Uma cópia concluída não comprova restauração; inclua credenciais e chaves no plano de acesso seguro. Na segurança operacional, comece pelo ativo, pelo responsável e pelo fluxo autorizado. Separe ameaça, vulnerabilidade e impacto para escolher controles proporcionais. Um controle precisa de evidência de implantação e teste de funcionamento; marcar uma caixa não comprova proteção. Use ambientes de laboratório e contas fictícias, sem executar testes em sistemas de terceiros. Restrinja privilégios à necessidade, preserve registros e tenha plano de recuperação. Métricas devem distinguir cobertura, sucesso do teste e risco residual. A orientação de referência informa o método, mas não certifica conformidade integral. O estudante deve explicar o que foi verificado, o que permanece desconhecido e quando escalar a um responsável especializado antes de realizar mudanças em produção. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma cooperativa possui 30 backups diários, mas o único teste de restauração ocorreu há seis meses. Resolução: Realizar restauração autorizada em ambiente isolado e medir completude e tempo, sem presumir recuperabilidade pela contagem de arquivos. Trinta cópias podem repetir o mesmo problema de configuração. A chave ausente impede a recuperação mesmo com arquivos íntegros, portanto o resultado deve registrar falha e ação corretiva sem apagar as evidências do teste. O exemplo prioriza uma ação defensiva verificável e preserva o serviço. A conclusão não autoriza acesso a terceiros nem garante proteção total; execute apenas controles e testes dentro do escopo aprovado. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.cyber.gov.au/small-business-hub",
      "https://www.ncsc.govt.nz/protect-your-organisation/implement-and-test-backups/",
      "https://www.ownyouronline.govt.nz/business/get-protected/guides/backups-for-your-business/",
      "https://www.cyber.gov.au/publication/small-business-cyber-security-handbook/protecting-devices-systems-and-networks"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-revisao-de-privilegios-em-sistemas-de-reservas-de-turismo",
    "title": "Revisão de privilégios em sistemas de reservas de turismo",
    "track": "cyber",
    "role": "Analista de segurança operacional de pequenas organizações",
    "positioning": "specialist",
    "scenario": "Um operador turístico tem 25 contas nominativas no sistema de reservas. Oito pertencem a ex-funcionários e ainda têm acesso ativo; as integrações precisam manter responsáveis identificados.",
    "decision": "Encaminhar revogação dos oito acessos conforme procedimento e revisar propriedade de integrações antes de excluir contas.",
    "misconception": "Compartilhar a senha do administrador para simplificar as reservas.",
    "changedConstraint": "Duas contas antigas são proprietárias de integrações de pagamento.",
    "tasks": [
      "Inventário de identidades",
      "Matriz de privilégios",
      "Conciliação de desligamentos",
      "Plano de transferência de propriedade",
      "Registro de revogações",
      "Teste de continuidade de reservas"
    ],
    "method": "Compare cadastro de pessoal com contas e permissões, separando pessoa, função e conta de serviço. Revogação deve preservar continuidade e trilha de auditoria. Transfira propriedade por fluxo aprovado antes de remover dependências legítimas. Na segurança operacional, comece pelo ativo, pelo responsável e pelo fluxo autorizado. Separe ameaça, vulnerabilidade e impacto para escolher controles proporcionais. Um controle precisa de evidência de implantação e teste de funcionamento; marcar uma caixa não comprova proteção. Use ambientes de laboratório e contas fictícias, sem executar testes em sistemas de terceiros. Restrinja privilégios à necessidade, preserve registros e tenha plano de recuperação. Métricas devem distinguir cobertura, sucesso do teste e risco residual. A orientação de referência informa o método, mas não certifica conformidade integral. O estudante deve explicar o que foi verificado, o que permanece desconhecido e quando escalar a um responsável especializado antes de realizar mudanças em produção. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um operador turístico tem 25 contas nominativas no sistema de reservas. Oito pertencem a ex-funcionários e ainda têm acesso ativo; as integrações precisam manter responsáveis identificados. Resolução: Encaminhar revogação dos oito acessos conforme procedimento e revisar propriedade de integrações antes de excluir contas. Oito de 25 contas representam 32% com vínculo encerrado, mas a contagem não mede privilégio ou exposição. As integrações exigem tratamento próprio; manter acesso pessoal não é a solução para continuidade. O exemplo prioriza uma ação defensiva verificável e preserva o serviço. A conclusão não autoriza acesso a terceiros nem garante proteção total; execute apenas controles e testes dentro do escopo aprovado. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.cyber.gov.au/small-business-hub",
      "https://www.ncsc.govt.nz/protect-your-organisation/implement-and-test-backups/",
      "https://www.cyber.gov.au/publication/small-business-cyber-security-handbook/securing-accounts-and-identities"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-preparacao-de-resposta-a-phishing-em-organizacoes-insulares",
    "title": "Preparação de resposta a phishing em organizações insulares",
    "track": "cyber",
    "role": "Analista de segurança operacional de pequenas organizações",
    "positioning": "specialist",
    "scenario": "Uma organização recebe dez relatos de mensagem suspeita e três usuários informam ter digitado senha em uma página externa.",
    "decision": "Priorizar os três relatos de possível comprometimento e seguir o fluxo de contenção e recuperação autorizado.",
    "misconception": "Responder só com um aviso geral sem tratar as contas potencialmente comprometidas.",
    "changedConstraint": "Um usuário utilizou a mesma senha em outro serviço institucional.",
    "tasks": [
      "Formulário seguro de relato",
      "Taxonomia de exposição",
      "Fluxo de escalonamento",
      "Checklist de preservação de evidência",
      "Cenário de reutilização",
      "Roteiro de comunicação de recuperação"
    ],
    "method": "Classifique relatos por ação ocorrida, não apenas por aparência da mensagem. Preserve evidências mínimas, use canal seguro e encaminhe contenção ao responsável. Não abra links suspeitos em ambiente de trabalho nem peça senhas aos usuários. Na segurança operacional, comece pelo ativo, pelo responsável e pelo fluxo autorizado. Separe ameaça, vulnerabilidade e impacto para escolher controles proporcionais. Um controle precisa de evidência de implantação e teste de funcionamento; marcar uma caixa não comprova proteção. Use ambientes de laboratório e contas fictícias, sem executar testes em sistemas de terceiros. Restrinja privilégios à necessidade, preserve registros e tenha plano de recuperação. Métricas devem distinguir cobertura, sucesso do teste e risco residual. A orientação de referência informa o método, mas não certifica conformidade integral. O estudante deve explicar o que foi verificado, o que permanece desconhecido e quando escalar a um responsável especializado antes de realizar mudanças em produção. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma organização recebe dez relatos de mensagem suspeita e três usuários informam ter digitado senha em uma página externa. Resolução: Priorizar os três relatos de possível comprometimento e seguir o fluxo de contenção e recuperação autorizado. Os dez relatos indicam alcance percebido, enquanto os três com credencial exposta exigem resposta específica. A reutilização pode ampliar o escopo, mas precisa de revisão por serviço sem solicitar divulgação da senha. O exemplo prioriza uma ação defensiva verificável e preserva o serviço. A conclusão não autoriza acesso a terceiros nem garante proteção total; execute apenas controles e testes dentro do escopo aprovado. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.cyber.gov.au/small-business-hub",
      "https://www.ncsc.govt.nz/protect-your-organisation/implement-and-test-backups/",
      "https://www.cyber.gov.au/publication/small-business-cyber-security-handbook/protecting-devices-systems-and-networks"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-gestao-de-atualizacoes-com-conectividade-intermitente",
    "title": "Gestão de atualizações com conectividade intermitente",
    "track": "cyber",
    "role": "Analista de segurança operacional de pequenas organizações",
    "positioning": "specialist",
    "scenario": "Um escritório remoto tem 40 dispositivos e 12 não recebem atualizações há 60 dias por limitação de conexão.",
    "decision": "Inventariar versões e priorizar correções segundo risco e suporte, planejando janela e verificação de instalação.",
    "misconception": "Desativar atualizações em todos os equipamentos para economizar dados.",
    "changedConstraint": "Quatro dispositivos executam aplicação incompatível com a atualização testada.",
    "tasks": [
      "Inventário de versões",
      "Mapa de criticidade",
      "Plano de distribuição",
      "Janela de teste e retorno",
      "Registro de incompatibilidades",
      "Indicador de instalação verificada"
    ],
    "method": "Separe disponibilidade da atualização, download, instalação e verificação. Planeje distribuição conforme suporte do fornecedor e rede, mantendo contingência. Incompatibilidade exige avaliação e mitigação aprovada, não adiamento indefinido sem registro. Na segurança operacional, comece pelo ativo, pelo responsável e pelo fluxo autorizado. Separe ameaça, vulnerabilidade e impacto para escolher controles proporcionais. Um controle precisa de evidência de implantação e teste de funcionamento; marcar uma caixa não comprova proteção. Use ambientes de laboratório e contas fictícias, sem executar testes em sistemas de terceiros. Restrinja privilégios à necessidade, preserve registros e tenha plano de recuperação. Métricas devem distinguir cobertura, sucesso do teste e risco residual. A orientação de referência informa o método, mas não certifica conformidade integral. O estudante deve explicar o que foi verificado, o que permanece desconhecido e quando escalar a um responsável especializado antes de realizar mudanças em produção. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um escritório remoto tem 40 dispositivos e 12 não recebem atualizações há 60 dias por limitação de conexão. Resolução: Inventariar versões e priorizar correções segundo risco e suporte, planejando janela e verificação de instalação. Os 12 atrasados representam 30% do inventário, mas a prioridade depende da exposição e criticidade. Os quatro incompatíveis precisam de decisão documentada sobre aplicação, substituição ou controle compensatório. O exemplo prioriza uma ação defensiva verificável e preserva o serviço. A conclusão não autoriza acesso a terceiros nem garante proteção total; execute apenas controles e testes dentro do escopo aprovado. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.cyber.gov.au/small-business-hub",
      "https://www.ncsc.govt.nz/protect-your-organisation/implement-and-test-backups/",
      "https://www.cyber.gov.au/publication/small-business-cyber-security-handbook/protecting-devices-systems-and-networks"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-separacao-de-redes-para-visitantes-em-pequenos-alojamentos",
    "title": "Separação de redes para visitantes em pequenos alojamentos",
    "track": "cyber",
    "role": "Analista de segurança operacional de pequenas organizações",
    "positioning": "broad",
    "scenario": "Um alojamento oferece a mesma rede para hóspedes, recepção e equipamentos de pagamento.",
    "decision": "Propor separação de funções e validar controles com o fornecedor em ambiente autorizado.",
    "misconception": "Divulgar a senha da rede interna a todos os hóspedes.",
    "changedConstraint": "A impressora de recepção precisa ser acessada por dois computadores administrativos.",
    "tasks": [
      "Mapa de dispositivos",
      "Matriz de fluxos autorizados",
      "Desenho de segmentos",
      "Plano de alteração e retorno",
      "Casos de teste de acesso",
      "Registro de validação com fornecedor"
    ],
    "method": "Mapeie fluxos necessários entre dispositivos e defina política de comunicação por função. Segmentar não significa bloquear tudo: permissões devem ser explícitas e testadas. Alterações de rede e pagamento exigem confirmação dos fornecedores e plano de reversão. Na segurança operacional, comece pelo ativo, pelo responsável e pelo fluxo autorizado. Separe ameaça, vulnerabilidade e impacto para escolher controles proporcionais. Um controle precisa de evidência de implantação e teste de funcionamento; marcar uma caixa não comprova proteção. Use ambientes de laboratório e contas fictícias, sem executar testes em sistemas de terceiros. Restrinja privilégios à necessidade, preserve registros e tenha plano de recuperação. Métricas devem distinguir cobertura, sucesso do teste e risco residual. A orientação de referência informa o método, mas não certifica conformidade integral. O estudante deve explicar o que foi verificado, o que permanece desconhecido e quando escalar a um responsável especializado antes de realizar mudanças em produção. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um alojamento oferece a mesma rede para hóspedes, recepção e equipamentos de pagamento. Resolução: Propor separação de funções e validar controles com o fornecedor em ambiente autorizado. A impressora ilustra uma exceção legítima dentro do segmento administrativo, sem justificar acesso de hóspedes. O teste deve comprovar o fluxo permitido e negar o desnecessário, preservando a disponibilidade de reservas e pagamentos. O exemplo prioriza uma ação defensiva verificável e preserva o serviço. A conclusão não autoriza acesso a terceiros nem garante proteção total; execute apenas controles e testes dentro do escopo aprovado. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.cyber.gov.au/small-business-hub",
      "https://www.ncsc.govt.nz/protect-your-organisation/implement-and-test-backups/",
      "https://www.cyber.gov.au/publication/small-business-cyber-security-handbook/protecting-devices-systems-and-networks"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-revisao-de-links-publicos-em-armazenamento-de-projetos",
    "title": "Revisão de links públicos em armazenamento de projetos",
    "track": "cyber",
    "role": "Analista de segurança operacional de pequenas organizações",
    "positioning": "specialist",
    "scenario": "Uma equipe possui 200 documentos e 35 estão acessíveis por link público, dos quais dez contêm informação interna.",
    "decision": "Revisar a necessidade de compartilhamento e restringir os dez pelo fluxo aprovado, verificando dependências de publicação.",
    "misconception": "Apagar todos os documentos sem identificar responsáveis ou finalidade.",
    "changedConstraint": "Cinco links públicos são usados em um portal de clientes.",
    "tasks": [
      "Inventário de links",
      "Classificação de informação",
      "Matriz de proprietários",
      "Plano de restrição",
      "Teste de dependências do portal",
      "Registro de revisão periódica"
    ],
    "method": "Classifique informação e finalidade do link antes de alterar acesso. Diferencie público intencional, compartilhamento restrito e exposição indevida. Mantenha proprietário e data de revisão; um link difícil de adivinhar não equivale a autenticação. Na segurança operacional, comece pelo ativo, pelo responsável e pelo fluxo autorizado. Separe ameaça, vulnerabilidade e impacto para escolher controles proporcionais. Um controle precisa de evidência de implantação e teste de funcionamento; marcar uma caixa não comprova proteção. Use ambientes de laboratório e contas fictícias, sem executar testes em sistemas de terceiros. Restrinja privilégios à necessidade, preserve registros e tenha plano de recuperação. Métricas devem distinguir cobertura, sucesso do teste e risco residual. A orientação de referência informa o método, mas não certifica conformidade integral. O estudante deve explicar o que foi verificado, o que permanece desconhecido e quando escalar a um responsável especializado antes de realizar mudanças em produção. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma equipe possui 200 documentos e 35 estão acessíveis por link público, dos quais dez contêm informação interna. Resolução: Revisar a necessidade de compartilhamento e restringir os dez pelo fluxo aprovado, verificando dependências de publicação. Os 35 links são 17,5% da base, mas os dez internos exigem análise específica. Os cinco do portal podem ser legítimos ou precisar de controle adicional; a revisão deve verificar conteúdo e público esperado. O exemplo prioriza uma ação defensiva verificável e preserva o serviço. A conclusão não autoriza acesso a terceiros nem garante proteção total; execute apenas controles e testes dentro do escopo aprovado. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.cyber.gov.au/small-business-hub",
      "https://www.ncsc.govt.nz/protect-your-organisation/implement-and-test-backups/",
      "https://www.cyber.gov.au/publication/small-business-cyber-security-handbook/protecting-devices-systems-and-networks"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-verificacao-de-autenticacao-multifator-em-equipes-distribuidas",
    "title": "Verificação de autenticação multifator em equipes distribuídas",
    "track": "cyber",
    "role": "Analista de segurança operacional de pequenas organizações",
    "positioning": "specialist",
    "scenario": "Uma organização tem 60 contas humanas, 45 com multifator ativo e cinco contas de serviço.",
    "decision": "Reportar cobertura humana de 75% e tratar contas de serviço por controles próprios.",
    "misconception": "Dividir 45 por 65 e interpretar o resultado como cobertura equivalente de todos os tipos de conta.",
    "changedConstraint": "Dez usuários não possuem telefone corporativo.",
    "tasks": [
      "Cadastro de tipos de identidade",
      "Indicador de cobertura humana",
      "Matriz de métodos suportados",
      "Plano de implantação",
      "Roteiro de recuperação",
      "Tratamento de contas de serviço"
    ],
    "method": "Defina população elegível e métodos suportados antes de medir cobertura. Contas humanas e integrações possuem mecanismos diferentes. Planeje recuperação e alternativas aprovadas de autenticação sem forçar uso de aparelho pessoal ou expor códigos. Na segurança operacional, comece pelo ativo, pelo responsável e pelo fluxo autorizado. Separe ameaça, vulnerabilidade e impacto para escolher controles proporcionais. Um controle precisa de evidência de implantação e teste de funcionamento; marcar uma caixa não comprova proteção. Use ambientes de laboratório e contas fictícias, sem executar testes em sistemas de terceiros. Restrinja privilégios à necessidade, preserve registros e tenha plano de recuperação. Métricas devem distinguir cobertura, sucesso do teste e risco residual. A orientação de referência informa o método, mas não certifica conformidade integral. O estudante deve explicar o que foi verificado, o que permanece desconhecido e quando escalar a um responsável especializado antes de realizar mudanças em produção. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma organização tem 60 contas humanas, 45 com multifator ativo e cinco contas de serviço. Resolução: Reportar cobertura humana de 75% e tratar contas de serviço por controles próprios. A lacuna humana é de 15 contas. A ausência de telefone não justifica dispensar controle automaticamente; alternativas compatíveis podem existir e devem ser verificadas com o provedor e a política da organização. O exemplo prioriza uma ação defensiva verificável e preserva o serviço. A conclusão não autoriza acesso a terceiros nem garante proteção total; execute apenas controles e testes dentro do escopo aprovado. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.cyber.gov.au/small-business-hub",
      "https://www.ncsc.govt.nz/protect-your-organisation/implement-and-test-backups/",
      "https://www.cyber.gov.au/publication/small-business-cyber-security-handbook/securing-accounts-and-identities"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-continuidade-de-acesso-administrativo-durante-ciclones",
    "title": "Continuidade de acesso administrativo durante ciclones",
    "track": "cyber",
    "role": "Analista de segurança operacional de pequenas organizações",
    "positioning": "specialist",
    "scenario": "Uma empresa depende de um único administrador e a documentação de recuperação fica no notebook dele.",
    "decision": "Criar procedimento de continuidade com acesso controlado e teste autorizado por pessoa de contingência.",
    "misconception": "Enviar a senha administrativa em um grupo aberto para garantir disponibilidade.",
    "changedConstraint": "O administrador e a pessoa de contingência ficam sem conexão simultaneamente.",
    "tasks": [
      "Mapa de dependências administrativas",
      "Política de acesso de emergência",
      "Procedimento de ativação",
      "Teste de pessoa de contingência",
      "Cenário de indisponibilidade regional",
      "Registro de uso e revogação"
    ],
    "method": "Elimine dependência de pessoa única por governança, documentação e acesso seguro. Defina condições de ativação, aprovação e registro de uso. Disponibilidade de credencial precisa coexistir com proteção e possibilidade de revogação. Na segurança operacional, comece pelo ativo, pelo responsável e pelo fluxo autorizado. Separe ameaça, vulnerabilidade e impacto para escolher controles proporcionais. Um controle precisa de evidência de implantação e teste de funcionamento; marcar uma caixa não comprova proteção. Use ambientes de laboratório e contas fictícias, sem executar testes em sistemas de terceiros. Restrinja privilégios à necessidade, preserve registros e tenha plano de recuperação. Métricas devem distinguir cobertura, sucesso do teste e risco residual. A orientação de referência informa o método, mas não certifica conformidade integral. O estudante deve explicar o que foi verificado, o que permanece desconhecido e quando escalar a um responsável especializado antes de realizar mudanças em produção. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma empresa depende de um único administrador e a documentação de recuperação fica no notebook dele. Resolução: Criar procedimento de continuidade com acesso controlado e teste autorizado por pessoa de contingência. O ponto único de falha envolve identidade, equipamento e localização. Duas pessoas sem meios independentes não resolvem o problema geográfico; o plano deve testar acesso e recuperação sob indisponibilidade regional. O exemplo prioriza uma ação defensiva verificável e preserva o serviço. A conclusão não autoriza acesso a terceiros nem garante proteção total; execute apenas controles e testes dentro do escopo aprovado. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.cyber.gov.au/small-business-hub",
      "https://www.ncsc.govt.nz/protect-your-organisation/implement-and-test-backups/",
      "https://www.cyber.gov.au/publication/small-business-cyber-security-handbook/securing-accounts-and-identities"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-inventario-de-dados-em-formularios-de-pequenos-servicos",
    "title": "Inventário de dados em formulários de pequenos serviços",
    "track": "cyber",
    "role": "Analista de segurança operacional de pequenas organizações",
    "positioning": "broad",
    "scenario": "Um formulário de reserva pede 18 campos, dos quais oito não têm finalidade documentada.",
    "decision": "Revisar os oito campos e remover ou justificar a coleta antes de manter a versão publicada.",
    "misconception": "Coletar tudo porque os dados podem ser úteis no futuro.",
    "changedConstraint": "Um fornecedor solicita exportação completa dos registros.",
    "tasks": [
      "Inventário de campos",
      "Matriz de finalidade",
      "Plano de minimização",
      "Política de retenção simulada",
      "Análise de solicitação de fornecedor",
      "Registro de decisão de compartilhamento"
    ],
    "method": "Associe cada campo a finalidade, necessidade, retenção e destinatário. Minimização reduz exposição, mas deve preservar requisitos legítimos. Uma solicitação de fornecedor precisa de base e escopo definidos, não compartilhamento por conveniência. Na segurança operacional, comece pelo ativo, pelo responsável e pelo fluxo autorizado. Separe ameaça, vulnerabilidade e impacto para escolher controles proporcionais. Um controle precisa de evidência de implantação e teste de funcionamento; marcar uma caixa não comprova proteção. Use ambientes de laboratório e contas fictícias, sem executar testes em sistemas de terceiros. Restrinja privilégios à necessidade, preserve registros e tenha plano de recuperação. Métricas devem distinguir cobertura, sucesso do teste e risco residual. A orientação de referência informa o método, mas não certifica conformidade integral. O estudante deve explicar o que foi verificado, o que permanece desconhecido e quando escalar a um responsável especializado antes de realizar mudanças em produção. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um formulário de reserva pede 18 campos, dos quais oito não têm finalidade documentada. Resolução: Revisar os oito campos e remover ou justificar a coleta antes de manter a versão publicada. Os oito campos representam 44,44% da coleta sem finalidade descrita, o que indica trabalho de revisão e não prova automática de ilegalidade. A exportação deve limitar-se ao necessário e ser aprovada pelo responsável. O exemplo prioriza uma ação defensiva verificável e preserva o serviço. A conclusão não autoriza acesso a terceiros nem garante proteção total; execute apenas controles e testes dentro do escopo aprovado. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.cyber.gov.au/small-business-hub",
      "https://www.ncsc.govt.nz/protect-your-organisation/implement-and-test-backups/",
      "https://www.cyber.gov.au/publication/small-business-cyber-security-handbook/protecting-devices-systems-and-networks"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-analise-de-alertas-de-login-em-equipes-transoceanicas",
    "title": "Análise de alertas de login em equipes transoceânicas",
    "track": "cyber",
    "role": "Analista de segurança operacional de pequenas organizações",
    "positioning": "specialist",
    "scenario": "Uma conta apresenta logins a dez minutos de distância em Auckland e Suva, mas um evento usa saída de VPN corporativa.",
    "decision": "Verificar contexto, dispositivo e uso autorizado de VPN antes de concluir comprometimento.",
    "misconception": "Bloquear todas as contas da equipe com base apenas na distância geográfica aparente.",
    "changedConstraint": "O segundo evento também apresenta dispositivo desconhecido e falhas de multifator.",
    "tasks": [
      "Linha do tempo normalizada",
      "Matriz de sinais",
      "Registro de VPN autorizada",
      "Fluxo de triagem",
      "Cenário de sinais adicionais",
      "Memorando de escalonamento"
    ],
    "method": "Correlacione sinais independentes e preserve horários em fuso comum. Localização por endereço de rede é aproximação, especialmente com VPN. Aumento de evidências pode justificar escalonamento e contenção conforme procedimento, sem conclusões por um único sinal. Na segurança operacional, comece pelo ativo, pelo responsável e pelo fluxo autorizado. Separe ameaça, vulnerabilidade e impacto para escolher controles proporcionais. Um controle precisa de evidência de implantação e teste de funcionamento; marcar uma caixa não comprova proteção. Use ambientes de laboratório e contas fictícias, sem executar testes em sistemas de terceiros. Restrinja privilégios à necessidade, preserve registros e tenha plano de recuperação. Métricas devem distinguir cobertura, sucesso do teste e risco residual. A orientação de referência informa o método, mas não certifica conformidade integral. O estudante deve explicar o que foi verificado, o que permanece desconhecido e quando escalar a um responsável especializado antes de realizar mudanças em produção. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma conta apresenta logins a dez minutos de distância em Auckland e Suva, mas um evento usa saída de VPN corporativa. Resolução: Verificar contexto, dispositivo e uso autorizado de VPN antes de concluir comprometimento. O primeiro par de cidades não prova viagem impossível porque a VPN altera a origem aparente. Dispositivo desconhecido e falhas adicionais aumentam a suspeita e exigem revisão por responsável, mantendo evidências e continuidade. O exemplo prioriza uma ação defensiva verificável e preserva o serviço. A conclusão não autoriza acesso a terceiros nem garante proteção total; execute apenas controles e testes dentro do escopo aprovado. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.cyber.gov.au/small-business-hub",
      "https://www.ncsc.govt.nz/protect-your-organisation/implement-and-test-backups/",
      "https://www.cyber.gov.au/publication/small-business-cyber-security-handbook/securing-accounts-and-identities"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-avaliacao-de-traducao-assistida-para-atendimento-no-pacifico",
    "title": "Avaliação de tradução assistida para atendimento no Pacífico",
    "track": "ai",
    "role": "Analista de avaliação de IA em serviços regionais",
    "positioning": "specialist",
    "scenario": "Um piloto de 40 mensagens traduzidas contém quatro mensagens com erros em datas e outras duas com erros em condições de elegibilidade, embora todas sejam gramaticais.",
    "decision": "Reprovar o critério de fidelidade dos seis casos críticos e revisar a rubrica por tipo de informação.",
    "misconception": "Aprovar todas por fluência e aparência profissional.",
    "changedConstraint": "O piloto passa a incluir uma língua com pouca representação no conjunto de teste.",
    "tasks": [
      "Rubrica de fidelidade",
      "Conjunto de mensagens de referência",
      "Classificação de erros críticos",
      "Relatório por tipo de informação",
      "Plano de avaliação por língua",
      "Fluxo de revisão competente"
    ],
    "method": "Avalie preservação de números, negação, condições e nomes separadamente da fluência. Use referência produzida por pessoa competente e encaminhe ambiguidades. A cobertura de idiomas não pode ser inferida a partir do desempenho em outra língua. Em avaliação de IA, comece pela tarefa e pelo dano de uma resposta incorreta. Separe qualidade do modelo, qualidade dos dados e desenho do processo de uso. Construa casos de teste com referência e critérios explícitos antes de comparar alternativas. Uma resposta fluente pode ser falsa e uma média alta pode ocultar falhas em grupos ou condições específicas. Preserve versão do modelo, configuração e dados de avaliação. Use exemplos sintéticos ou autorizados e não envie informação sensível a serviços sem aprovação. Inclua abstenção, revisão humana e encaminhamento quando a evidência for insuficiente. O curso ensina avaliação e integração responsável em escopo limitado; não promete automação segura de decisões clínicas, legais, financeiras ou de proteção civil. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um piloto de 40 mensagens traduzidas contém quatro mensagens com erros em datas e outras duas com erros em condições de elegibilidade, embora todas sejam gramaticais. Resolução: Reprovar o critério de fidelidade dos seis casos críticos e revisar a rubrica por tipo de informação. Se os seis erros ocorrerem em mensagens distintas, a taxa observada de fidelidade é 34/40, ou 85%. Esse número não prova desempenho para a nova língua; é necessário conjunto próprio com revisão adequada. O resultado deve ser reproduzido com a mesma versão e rubrica. O exemplo demonstra uma decisão de avaliação; ganhos de tempo precisam incluir verificação e correção, e não apenas velocidade de geração. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.gov.au/ai/ai-in-government-policy",
      "https://www.nist.gov/itl/ai-risk-management-framework",
      "https://www.w3.org/TR/its20/#lqissue"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-triagem-assistida-de-imagens-de-recifes-com-classe-desconhecida",
    "title": "Triagem assistida de imagens de recifes com classe desconhecida",
    "track": "ai",
    "role": "Analista de avaliação de IA em serviços regionais",
    "positioning": "specialist",
    "scenario": "Um classificador recebe 100 imagens, das quais 20 mostram condições ausentes do treinamento.",
    "decision": "Criar avaliação de detecção de desconhecido e revisar as 20 sem forçar rótulo conhecido.",
    "misconception": "Atribuir a classe de maior pontuação a todas e chamar isso de identificação confiável.",
    "changedConstraint": "Turbidez reduz a qualidade de 30 novas imagens.",
    "tasks": [
      "Taxonomia de classes",
      "Conjunto de imagens desconhecidas",
      "Rubrica de visibilidade",
      "Matriz de abstenção",
      "Avaliação por turbidez",
      "Protocolo de revisão científica"
    ],
    "method": "Separe classificação de classe conhecida e detecção de condição fora de distribuição. Confiança numérica do modelo não equivale a probabilidade calibrada de acerto. Defina abstenção e avaliação por qualidade de imagem, com referência de especialistas. Em avaliação de IA, comece pela tarefa e pelo dano de uma resposta incorreta. Separe qualidade do modelo, qualidade dos dados e desenho do processo de uso. Construa casos de teste com referência e critérios explícitos antes de comparar alternativas. Uma resposta fluente pode ser falsa e uma média alta pode ocultar falhas em grupos ou condições específicas. Preserve versão do modelo, configuração e dados de avaliação. Use exemplos sintéticos ou autorizados e não envie informação sensível a serviços sem aprovação. Inclua abstenção, revisão humana e encaminhamento quando a evidência for insuficiente. O curso ensina avaliação e integração responsável em escopo limitado; não promete automação segura de decisões clínicas, legais, financeiras ou de proteção civil. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um classificador recebe 100 imagens, das quais 20 mostram condições ausentes do treinamento. Resolução: Criar avaliação de detecção de desconhecido e revisar as 20 sem forçar rótulo conhecido. As 20 imagens desconhecidas representam 20% do lote, mas forçar classe pode ocultar a falha. A turbidez acrescenta uma dimensão de qualidade que deve ser estratificada para não confundir ausência de espécie com ausência de visibilidade. O resultado deve ser reproduzido com a mesma versão e rubrica. O exemplo demonstra uma decisão de avaliação; ganhos de tempo precisam incluir verificação e correção, e não apenas velocidade de geração. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.gov.au/ai/ai-in-government-policy",
      "https://www.nist.gov/itl/ai-risk-management-framework",
      "https://www.wcpfc.int/scientific-data"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-extracao-de-requisitos-de-editais-com-evidencia-textual",
    "title": "Extração de requisitos de editais com evidência textual",
    "track": "ai",
    "role": "Analista de avaliação de IA em serviços regionais",
    "positioning": "broad",
    "scenario": "Um assistente extrai 30 requisitos de um edital e quatro não possuem trecho de origem correspondente.",
    "decision": "Marcar os quatro como não sustentados e exigir ligação de cada requisito ao texto e à versão.",
    "misconception": "Manter os quatro porque parecem requisitos comuns em editais semelhantes.",
    "changedConstraint": "Uma retificação altera dois prazos do edital.",
    "tasks": [
      "Esquema de requisito e origem",
      "Conjunto de teste de extração",
      "Mapa de afirmações sem suporte",
      "Controle de retificações",
      "Teste de prazo alterado",
      "Checklist revisado com evidência"
    ],
    "method": "Use extração rastreável com campo de origem, citação curta, página e versão. Diferencie requisito explícito, interpretação e recomendação. Retificações devem atualizar relações e sinalizar itens afetados sem apagar a base anterior. Em avaliação de IA, comece pela tarefa e pelo dano de uma resposta incorreta. Separe qualidade do modelo, qualidade dos dados e desenho do processo de uso. Construa casos de teste com referência e critérios explícitos antes de comparar alternativas. Uma resposta fluente pode ser falsa e uma média alta pode ocultar falhas em grupos ou condições específicas. Preserve versão do modelo, configuração e dados de avaliação. Use exemplos sintéticos ou autorizados e não envie informação sensível a serviços sem aprovação. Inclua abstenção, revisão humana e encaminhamento quando a evidência for insuficiente. O curso ensina avaliação e integração responsável em escopo limitado; não promete automação segura de decisões clínicas, legais, financeiras ou de proteção civil. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um assistente extrai 30 requisitos de um edital e quatro não possuem trecho de origem correspondente. Resolução: Marcar os quatro como não sustentados e exigir ligação de cada requisito ao texto e à versão. A cobertura de origem é 26/30, cerca de 86,67%, se cada requisito tiver o mesmo peso. As quatro lacunas impedem usar a lista como checklist definitivo; a retificação exige teste de atualização dos prazos. O resultado deve ser reproduzido com a mesma versão e rubrica. O exemplo demonstra uma decisão de avaliação; ganhos de tempo precisam incluir verificação e correção, e não apenas velocidade de geração. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.gov.au/ai/ai-in-government-policy",
      "https://www.nist.gov/itl/ai-risk-management-framework"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-comparacao-de-custo-por-resposta-revisada-em-assistentes-turisticos",
    "title": "Comparação de custo por resposta revisada em assistentes turísticos",
    "track": "ai",
    "role": "Analista de avaliação de IA em serviços regionais",
    "positioning": "specialist",
    "scenario": "O sistema A custa 120 para 80 respostas aceitas e o B custa 90 para 45, sob a mesma rubrica.",
    "decision": "Comparar 1,50 e duas unidades por resposta aceita, incluindo o custo de revisão ainda não contabilizado.",
    "misconception": "Escolher B apenas pelo gasto total menor.",
    "changedConstraint": "O sistema A exige o dobro de minutos de revisão por resposta.",
    "tasks": [
      "Definição de resposta aceita",
      "Base de custos de geração",
      "Registro de tempo de revisão",
      "Custo por resultado útil",
      "Sensibilidade de trabalho humano",
      "Memorando de escolha do piloto"
    ],
    "method": "Defina unidade de resultado útil antes de medir custo. Some geração, revisão e correção na mesma fronteira. Um denominador de respostas aceitas deve usar critérios iguais e identificar rejeições; a análise precisa testar volume e trabalho humano. Em avaliação de IA, comece pela tarefa e pelo dano de uma resposta incorreta. Separe qualidade do modelo, qualidade dos dados e desenho do processo de uso. Construa casos de teste com referência e critérios explícitos antes de comparar alternativas. Uma resposta fluente pode ser falsa e uma média alta pode ocultar falhas em grupos ou condições específicas. Preserve versão do modelo, configuração e dados de avaliação. Use exemplos sintéticos ou autorizados e não envie informação sensível a serviços sem aprovação. Inclua abstenção, revisão humana e encaminhamento quando a evidência for insuficiente. O curso ensina avaliação e integração responsável em escopo limitado; não promete automação segura de decisões clínicas, legais, financeiras ou de proteção civil. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: O sistema A custa 120 para 80 respostas aceitas e o B custa 90 para 45, sob a mesma rubrica. Resolução: Comparar 1,50 e duas unidades por resposta aceita, incluindo o custo de revisão ainda não contabilizado. A vantagem inicial de A pode desaparecer quando a revisão é incluída. Sem valor por minuto não é possível concluir o custo completo; registre a variável faltante e calcule o ponto de equilíbrio quando ela for definida. O resultado deve ser reproduzido com a mesma versão e rubrica. O exemplo demonstra uma decisão de avaliação; ganhos de tempo precisam incluir verificação e correção, e não apenas velocidade de geração. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.gov.au/ai/ai-in-government-policy",
      "https://www.nist.gov/itl/ai-risk-management-framework"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-controle-de-alucinacao-em-resumos-de-reunioes-comunitarias",
    "title": "Controle de alucinação em resumos de reuniões comunitárias",
    "track": "ai",
    "role": "Analista de avaliação de IA em serviços regionais",
    "positioning": "specialist",
    "scenario": "Uma transcrição menciona proposta de nova rota, mas o resumo afirma que a rota foi aprovada.",
    "decision": "Corrigir o estado da decisão para proposta e testar preservação de autoria, condição e aprovação.",
    "misconception": "Aceitar o resumo porque a rota parece uma boa solução.",
    "changedConstraint": "Dois participantes discordam e a transcrição não identifica seus nomes.",
    "tasks": [
      "Esquema de estados de decisão",
      "Rubrica de fidelidade de reunião",
      "Conjunto de trechos ambíguos",
      "Registro de correções",
      "Teste de autoria ausente",
      "Fluxo de confirmação comunitária"
    ],
    "method": "Estruture resumo por assunto, proposta, decisão, responsável e pendência. A ausência de aprovação precisa ser preservada. Quando a transcrição é ambígua, registre incerteza e solicite confirmação em vez de atribuir fala ou decisão inventada. Em avaliação de IA, comece pela tarefa e pelo dano de uma resposta incorreta. Separe qualidade do modelo, qualidade dos dados e desenho do processo de uso. Construa casos de teste com referência e critérios explícitos antes de comparar alternativas. Uma resposta fluente pode ser falsa e uma média alta pode ocultar falhas em grupos ou condições específicas. Preserve versão do modelo, configuração e dados de avaliação. Use exemplos sintéticos ou autorizados e não envie informação sensível a serviços sem aprovação. Inclua abstenção, revisão humana e encaminhamento quando a evidência for insuficiente. O curso ensina avaliação e integração responsável em escopo limitado; não promete automação segura de decisões clínicas, legais, financeiras ou de proteção civil. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma transcrição menciona proposta de nova rota, mas o resumo afirma que a rota foi aprovada. Resolução: Corrigir o estado da decisão para proposta e testar preservação de autoria, condição e aprovação. A diferença entre proposta e decisão altera responsabilidade e próximo passo. Os nomes ausentes não podem ser preenchidos por inferência; o resumo deve manter participantes não identificados e encaminhar validação das atribuições. O resultado deve ser reproduzido com a mesma versão e rubrica. O exemplo demonstra uma decisão de avaliação; ganhos de tempo precisam incluir verificação e correção, e não apenas velocidade de geração. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.gov.au/ai/ai-in-government-policy",
      "https://www.nist.gov/itl/ai-risk-management-framework"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-avaliacao-de-assistentes-de-consulta-a-manuais-de-manutencao",
    "title": "Avaliação de assistentes de consulta a manuais de manutenção",
    "track": "ai",
    "role": "Analista de avaliação de IA em serviços regionais",
    "positioning": "specialist",
    "scenario": "Um assistente responde 50 perguntas e cita a versão antiga em oito, apesar de haver nova versão aprovada.",
    "decision": "Medir uso de versão correta e reavaliar as oito respostas antes de uso operacional.",
    "misconception": "Considerar as citações suficientes sem conferir versão e aplicabilidade.",
    "changedConstraint": "A versão nova vale apenas para um modelo de equipamento.",
    "tasks": [
      "Matriz de documento e equipamento",
      "Banco de perguntas por modelo",
      "Rubrica de aplicabilidade",
      "Relatório de versão incorreta",
      "Teste de atualização parcial",
      "Regra de encaminhamento ao responsável"
    ],
    "method": "Associe documento a equipamento, versão e período de vigência. Recuperação relevante precisa ser também aplicável. Uma citação não garante que o trecho sustente a resposta; inclua casos de equipamento diferente e resposta de abstenção. Em avaliação de IA, comece pela tarefa e pelo dano de uma resposta incorreta. Separe qualidade do modelo, qualidade dos dados e desenho do processo de uso. Construa casos de teste com referência e critérios explícitos antes de comparar alternativas. Uma resposta fluente pode ser falsa e uma média alta pode ocultar falhas em grupos ou condições específicas. Preserve versão do modelo, configuração e dados de avaliação. Use exemplos sintéticos ou autorizados e não envie informação sensível a serviços sem aprovação. Inclua abstenção, revisão humana e encaminhamento quando a evidência for insuficiente. O curso ensina avaliação e integração responsável em escopo limitado; não promete automação segura de decisões clínicas, legais, financeiras ou de proteção civil. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um assistente responde 50 perguntas e cita a versão antiga em oito, apesar de haver nova versão aprovada. Resolução: Medir uso de versão correta e reavaliar as oito respostas antes de uso operacional. As oito respostas são 16% do lote com possível falha de versão, mas a atualização parcial exige saber o modelo. A solução não é sempre escolher o arquivo mais recente, e sim a instrução autorizada para o ativo. O resultado deve ser reproduzido com a mesma versão e rubrica. O exemplo demonstra uma decisão de avaliação; ganhos de tempo precisam incluir verificação e correção, e não apenas velocidade de geração. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.gov.au/ai/ai-in-government-policy",
      "https://www.nist.gov/itl/ai-risk-management-framework"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-validacao-de-previsoes-de-demanda-em-turismo-sazonal",
    "title": "Validação de previsões de demanda em turismo sazonal",
    "track": "ai",
    "role": "Analista de avaliação de IA em serviços regionais",
    "positioning": "broad",
    "scenario": "Para três semanas consecutivas, um modelo prevê 100, 120 e 80 reservas; os totais observados nas mesmas semanas são, respectivamente, 90, 150 e 60 reservas.",
    "decision": "Calcular erros absolutos de dez, 30 e 20, com média de 20 reservas, e comparar a uma linha de base.",
    "misconception": "Afirmar precisão de 100% porque a soma prevista coincide com a soma real.",
    "changedConstraint": "Um ciclone cancela parte das reservas do último período.",
    "tasks": [
      "Base temporal sem vazamento",
      "Previsão de referência",
      "Cálculo de erros absolutos",
      "Análise por temporada",
      "Registro de evento excepcional",
      "Plano de revisão do modelo"
    ],
    "method": "Avalie erro por período e contra uma previsão simples, preservando eventos excepcionais. Compensação de erros na soma não implica boa previsão. Separe demanda observada, cancelamento e capacidade ofertada; evite treinar com informação futura. Em avaliação de IA, comece pela tarefa e pelo dano de uma resposta incorreta. Separe qualidade do modelo, qualidade dos dados e desenho do processo de uso. Construa casos de teste com referência e critérios explícitos antes de comparar alternativas. Uma resposta fluente pode ser falsa e uma média alta pode ocultar falhas em grupos ou condições específicas. Preserve versão do modelo, configuração e dados de avaliação. Use exemplos sintéticos ou autorizados e não envie informação sensível a serviços sem aprovação. Inclua abstenção, revisão humana e encaminhamento quando a evidência for insuficiente. O curso ensina avaliação e integração responsável em escopo limitado; não promete automação segura de decisões clínicas, legais, financeiras ou de proteção civil. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Para três semanas consecutivas, um modelo prevê 100, 120 e 80 reservas; os totais observados nas mesmas semanas são, respectivamente, 90, 150 e 60 reservas. Resolução: Calcular erros absolutos de dez, 30 e 20, com média de 20 reservas, e comparar a uma linha de base. As somas são 300 em ambos os lados, mas a distribuição temporal está errada. A média absoluta de 20 revela a discrepância; o ciclone exige análise de cenário e anotação, não remoção conveniente do erro. O resultado deve ser reproduzido com a mesma versão e rubrica. O exemplo demonstra uma decisão de avaliação; ganhos de tempo precisam incluir verificação e correção, e não apenas velocidade de geração. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.gov.au/ai/ai-in-government-policy",
      "https://www.nist.gov/itl/ai-risk-management-framework"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-avaliacao-de-anonimizacao-assistida-em-relatos-de-servicos",
    "title": "Avaliação de anonimização assistida em relatos de serviços",
    "track": "ai",
    "role": "Analista de avaliação de IA em serviços regionais",
    "positioning": "specialist",
    "scenario": "Um lote de 30 relatos tem nomes removidos, mas seis ainda contêm combinações raras de local e ocupação.",
    "decision": "Revisar risco de reidentificação indireta nos seis e limitar divulgação antes de compartilhar.",
    "misconception": "Declarar anonimização completa porque nenhum nome aparece.",
    "changedConstraint": "Um destinatário possui uma lista pública com as mesmas ocupações.",
    "tasks": [
      "Inventário de identificadores",
      "Rubrica de quase identificadores",
      "Conjunto de testes de divulgação",
      "Registro de revisão",
      "Cenário de dados auxiliares",
      "Plano de acesso e minimização"
    ],
    "method": "Identifique identificadores diretos e combinações quase identificadoras. Remoção de nome é apenas uma etapa; o risco depende de contexto, destinatário e dados auxiliares. Teste utilidade e risco em amostra autorizada e documente limites. Em avaliação de IA, comece pela tarefa e pelo dano de uma resposta incorreta. Separe qualidade do modelo, qualidade dos dados e desenho do processo de uso. Construa casos de teste com referência e critérios explícitos antes de comparar alternativas. Uma resposta fluente pode ser falsa e uma média alta pode ocultar falhas em grupos ou condições específicas. Preserve versão do modelo, configuração e dados de avaliação. Use exemplos sintéticos ou autorizados e não envie informação sensível a serviços sem aprovação. Inclua abstenção, revisão humana e encaminhamento quando a evidência for insuficiente. O curso ensina avaliação e integração responsável em escopo limitado; não promete automação segura de decisões clínicas, legais, financeiras ou de proteção civil. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um lote de 30 relatos tem nomes removidos, mas seis ainda contêm combinações raras de local e ocupação. Resolução: Revisar risco de reidentificação indireta nos seis e limitar divulgação antes de compartilhar. Seis de 30 relatos correspondem a 20% com risco apontado, mas isso não mede a probabilidade real de identificação. A lista auxiliar pode aumentar o risco e exige reavaliar granularidade e acesso antes da divulgação. O resultado deve ser reproduzido com a mesma versão e rubrica. O exemplo demonstra uma decisão de avaliação; ganhos de tempo precisam incluir verificação e correção, e não apenas velocidade de geração. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.gov.au/ai/ai-in-government-policy",
      "https://www.nist.gov/itl/ai-risk-management-framework",
      "https://data.govt.nz/toolkit/privacy-and-security/understanding-data-confidentiality/data-confidentiality-principles-and-methods-report"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-teste-de-consistencia-de-agentes-de-planejamento-de-viagens",
    "title": "Teste de consistência de agentes de planejamento de viagens",
    "track": "ai",
    "role": "Analista de avaliação de IA em serviços regionais",
    "positioning": "specialist",
    "scenario": "Um agente propõe conexão de 25 minutos quando o operador exige 45 no itinerário fictício.",
    "decision": "Rejeitar o itinerário por violar a restrição explícita e testar todas as conexões antes da recomendação.",
    "misconception": "Aceitar a rota porque o tempo total de viagem é menor.",
    "changedConstraint": "O operador altera o tempo mínimo em apenas um aeroporto.",
    "tasks": [
      "Catálogo de restrições",
      "Validador de horários em tabela",
      "Banco de itinerários inválidos",
      "Rubrica de abstenção",
      "Teste de mudança localizada",
      "Relatório de elegibilidade de rotas"
    ],
    "method": "Modele restrições como regras verificáveis independentes do texto gerado. Valide horários, fusos e condições da fonte antes de ranquear opções. O agente deve abster-se quando faltar regra ou informação atual e registrar data de consulta. Em avaliação de IA, comece pela tarefa e pelo dano de uma resposta incorreta. Separe qualidade do modelo, qualidade dos dados e desenho do processo de uso. Construa casos de teste com referência e critérios explícitos antes de comparar alternativas. Uma resposta fluente pode ser falsa e uma média alta pode ocultar falhas em grupos ou condições específicas. Preserve versão do modelo, configuração e dados de avaliação. Use exemplos sintéticos ou autorizados e não envie informação sensível a serviços sem aprovação. Inclua abstenção, revisão humana e encaminhamento quando a evidência for insuficiente. O curso ensina avaliação e integração responsável em escopo limitado; não promete automação segura de decisões clínicas, legais, financeiras ou de proteção civil. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um agente propõe conexão de 25 minutos quando o operador exige 45 no itinerário fictício. Resolução: Rejeitar o itinerário por violar a restrição explícita e testar todas as conexões antes da recomendação. A conexão está 20 minutos abaixo do mínimo informado. Uma alteração localizada não deve mudar todas as rotas; a regra precisa ser vinculada ao aeroporto e à condição específica, evitando generalização indevida. O resultado deve ser reproduzido com a mesma versão e rubrica. O exemplo demonstra uma decisão de avaliação; ganhos de tempo precisam incluir verificação e correção, e não apenas velocidade de geração. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.gov.au/ai/ai-in-government-policy",
      "https://www.nist.gov/itl/ai-risk-management-framework"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-governanca-de-conjuntos-de-dados-de-linguas-indigenas",
    "title": "Governança de conjuntos de dados de línguas indígenas",
    "track": "ai",
    "role": "Analista de avaliação de IA em serviços regionais",
    "positioning": "specialist",
    "scenario": "Um projeto reúne 500 gravações autorizadas para pesquisa e pretende reutilizá-las em serviço comercial sem autorização específica.",
    "decision": "Suspender a reutilização comercial até revisar finalidade, direitos e governança com os titulares e a comunidade pertinente.",
    "misconception": "Assumir que autorização para pesquisa permite qualquer uso posterior.",
    "changedConstraint": "Uma comunidade solicita retirada de um subconjunto de gravações.",
    "tasks": [
      "Registro de proveniência",
      "Matriz de finalidades autorizadas",
      "Mapa de governança comunitária",
      "Fluxo de solicitação de retirada",
      "Inventário de derivados",
      "Memorando de limites de reutilização"
    ],
    "method": "Registre proveniência, finalidade autorizada, restrições e governança por item ou conjunto. Disponibilidade técnica não implica direito de treinamento ou exploração. Planeje retirada, rastreamento de derivados e comunicação de limites com participação competente. Em avaliação de IA, comece pela tarefa e pelo dano de uma resposta incorreta. Separe qualidade do modelo, qualidade dos dados e desenho do processo de uso. Construa casos de teste com referência e critérios explícitos antes de comparar alternativas. Uma resposta fluente pode ser falsa e uma média alta pode ocultar falhas em grupos ou condições específicas. Preserve versão do modelo, configuração e dados de avaliação. Use exemplos sintéticos ou autorizados e não envie informação sensível a serviços sem aprovação. Inclua abstenção, revisão humana e encaminhamento quando a evidência for insuficiente. O curso ensina avaliação e integração responsável em escopo limitado; não promete automação segura de decisões clínicas, legais, financeiras ou de proteção civil. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um projeto reúne 500 gravações autorizadas para pesquisa e pretende reutilizá-las em serviço comercial sem autorização específica. Resolução: Suspender a reutilização comercial até revisar finalidade, direitos e governança com os titulares e a comunidade pertinente. As 500 gravações não constituem um corpus comercialmente utilizável apenas por estarem acessíveis. A retirada exige localizar itens e derivados e avaliar obrigações reais; não prometa apagar efeitos do treinamento sem capacidade comprovada. O resultado deve ser reproduzido com a mesma versão e rubrica. O exemplo demonstra uma decisão de avaliação; ganhos de tempo precisam incluir verificação e correção, e não apenas velocidade de geração. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.gov.au/ai/ai-in-government-policy",
      "https://www.nist.gov/itl/ai-risk-management-framework"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-capital-de-giro-em-microexportacao-de-artesanato-insular",
    "title": "Capital de giro em microexportação de artesanato insular",
    "track": "business",
    "role": "Analista de operações e desenvolvimento de pequenos negócios",
    "positioning": "broad",
    "scenario": "Uma oficina paga 4000 de materiais hoje e recebe 7000 do cliente em 60 dias, tendo 2500 de caixa disponível.",
    "decision": "Identificar necessidade inicial de financiamento de 1500 antes de considerar outros desembolsos.",
    "misconception": "Afirmar que não há problema de caixa porque a venda terá margem positiva.",
    "changedConstraint": "O frete de 800 deve ser pago antes do embarque.",
    "tasks": [
      "Calendário de caixa",
      "Matriz de condições de pagamento",
      "Cálculo de lacuna inicial",
      "Cenário de frete antecipado",
      "Alternativas de faseamento",
      "Memorando de capital de giro"
    ],
    "method": "Construa fluxo de caixa por data de pagamento e recebimento. Receita esperada não financia uma obrigação anterior. Separe margem da operação e lacuna temporal, avaliando adiantamento, faseamento e condições sem presumir acesso a crédito. Na análise de pequenos negócios, separe receita contratada, faturada e recebida. Margem não é saldo de caixa e crescimento de vendas pode aumentar a necessidade de capital de giro. Defina custos variáveis e fixos na mesma unidade de análise e identifique restrições de capacidade. Cotações e previsões são premissas até serem confirmadas; preserve evidências e datas. Compare alternativas considerando prazo, risco, serviço e investimento, sem recomendar crédito ou investimento pessoal pelo exercício. Mercados do Pacífico podem depender de transporte, importações e sazonalidade, que devem aparecer nos cenários. O entregável é uma ferramenta de decisão gerencial com limites explícitos; requisitos fiscais, trabalhistas e regulatórios devem ser confirmados em fontes oficiais e com profissionais competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma oficina paga 4000 de materiais hoje e recebe 7000 do cliente em 60 dias, tendo 2500 de caixa disponível. Resolução: Identificar necessidade inicial de financiamento de 1500 antes de considerar outros desembolsos. Com frete antecipado, o desembolso inicial passa a 4800 e a lacuna a 2300. A diferença entre preço e custos não resolve o vencimento das obrigações; o plano precisa de recursos e confirmação de recebimento. A solução usa números sintéticos e fronteira simplificada. O gestor deve verificar custos omitidos, capacidade de execução e condições contratuais antes de adotar a opção; o cálculo não é promessa de lucro. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://business.gov.au/planning",
      "https://www.business.govt.nz/",
      "https://www.business.govt.nz/strategy-and-performance/strategic-finance/metrics-to-help-your-cash-flow"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-precificacao-por-capacidade-em-experiencias-de-ecoturismo",
    "title": "Precificação por capacidade em experiências de ecoturismo",
    "track": "business",
    "role": "Analista de operações e desenvolvimento de pequenos negócios",
    "positioning": "specialist",
    "scenario": "Uma saída custa 600 fixos e 40 por visitante, com preço de 140 e capacidade de oito pessoas.",
    "decision": "Calcular equilíbrio em seis visitantes e resultado de 200 com oito, sem ignorar custos ausentes.",
    "misconception": "Exigir dez visitantes para uma saída com capacidade de oito.",
    "changedConstraint": "Uma taxa de conservação de 20 por visitante é adicionada.",
    "tasks": [
      "Mapa de custos por natureza",
      "Cálculo de contribuição",
      "Ponto de equilíbrio inteiro",
      "Teste de capacidade",
      "Cenário de taxa de conservação",
      "Tabela de decisão de saída"
    ],
    "method": "Use margem de contribuição unitária e limite de capacidade. O ponto de equilíbrio precisa ser viável na operação e respeitar restrições ambientais e do operador. Separe custos por saída, por visitante e por período. Na análise de pequenos negócios, separe receita contratada, faturada e recebida. Margem não é saldo de caixa e crescimento de vendas pode aumentar a necessidade de capital de giro. Defina custos variáveis e fixos na mesma unidade de análise e identifique restrições de capacidade. Cotações e previsões são premissas até serem confirmadas; preserve evidências e datas. Compare alternativas considerando prazo, risco, serviço e investimento, sem recomendar crédito ou investimento pessoal pelo exercício. Mercados do Pacífico podem depender de transporte, importações e sazonalidade, que devem aparecer nos cenários. O entregável é uma ferramenta de decisão gerencial com limites explícitos; requisitos fiscais, trabalhistas e regulatórios devem ser confirmados em fontes oficiais e com profissionais competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma saída custa 600 fixos e 40 por visitante, com preço de 140 e capacidade de oito pessoas. Resolução: Calcular equilíbrio em seis visitantes e resultado de 200 com oito, sem ignorar custos ausentes. Com taxa adicional, a contribuição cai de 100 para 80 e o equilíbrio passa a 7,5, exigindo oito visitantes inteiros. A capacidade de oito deixa pequena margem de 40 por saída no modelo simplificado. A solução usa números sintéticos e fronteira simplificada. O gestor deve verificar custos omitidos, capacidade de execução e condições contratuais antes de adotar a opção; o cálculo não é promessa de lucro. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://business.gov.au/planning",
      "https://www.business.govt.nz/",
      "https://www.business.qld.gov.au/running-business/finance/essentials/break-even-profit"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-planejamento-de-receitas-de-hospedagem-comunitaria",
    "title": "Planejamento de receitas de hospedagem comunitária",
    "track": "business",
    "role": "Analista de operações e desenvolvimento de pequenos negócios",
    "positioning": "specialist",
    "scenario": "Uma pousada tem dez quartos por 30 noites, vende 180 diárias a 100 unidades e concede 900 de descontos.",
    "decision": "Calcular ocupação de 60% e receita líquida simplificada de 17100, distinguindo tarifa média realizada.",
    "misconception": "Reportar receita de 30000 como se toda capacidade estivesse vendida.",
    "changedConstraint": "Vinte diárias vendidas são canceladas com devolução integral.",
    "tasks": [
      "Inventário de capacidade",
      "Base de diárias",
      "Reconciliação de descontos",
      "Indicadores de ocupação e tarifa",
      "Cenário de cancelamentos",
      "Painel de receita realizada"
    ],
    "method": "Defina quarto-noite disponível, vendido e efetivamente utilizado. Tarifa de tabela não é tarifa média realizada. Reconcilie desconto, cancelamento e reembolso na mesma janela e preserve regra de reconhecimento adotada. Na análise de pequenos negócios, separe receita contratada, faturada e recebida. Margem não é saldo de caixa e crescimento de vendas pode aumentar a necessidade de capital de giro. Defina custos variáveis e fixos na mesma unidade de análise e identifique restrições de capacidade. Cotações e previsões são premissas até serem confirmadas; preserve evidências e datas. Compare alternativas considerando prazo, risco, serviço e investimento, sem recomendar crédito ou investimento pessoal pelo exercício. Mercados do Pacífico podem depender de transporte, importações e sazonalidade, que devem aparecer nos cenários. O entregável é uma ferramenta de decisão gerencial com limites explícitos; requisitos fiscais, trabalhistas e regulatórios devem ser confirmados em fontes oficiais e com profissionais competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma pousada tem dez quartos por 30 noites, vende 180 diárias a 100 unidades e concede 900 de descontos. Resolução: Calcular ocupação de 60% e receita líquida simplificada de 17100, distinguindo tarifa média realizada. A receita inicial de 18000 menos 900 é 17100 e a tarifa média líquida é 95. Cancelamentos exigem identificar os descontos associados antes de recalcular receita; simplesmente subtrair 2000 pode ser uma aproximação inadequada. A solução usa números sintéticos e fronteira simplificada. O gestor deve verificar custos omitidos, capacidade de execução e condições contratuais antes de adotar a opção; o cálculo não é promessa de lucro. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://business.gov.au/planning",
      "https://www.business.govt.nz/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-contratacao-de-servicos-com-pagamentos-por-marcos-verificaveis",
    "title": "Contratação de serviços com pagamentos por marcos verificáveis",
    "track": "business",
    "role": "Analista de operações e desenvolvimento de pequenos negócios",
    "positioning": "specialist",
    "scenario": "Um contrato fictício de 20000 prevê 40% no início, 40% na entrega e 20% no aceite, mas não define evidência de entrega.",
    "decision": "Definir critérios verificáveis e responsáveis antes de usar o segundo marco para pagamento.",
    "misconception": "Pagar a segunda parcela porque o fornecedor afirma ter terminado.",
    "changedConstraint": "O cliente solicita uma mudança de escopo durante a execução.",
    "tasks": [
      "Matriz de marcos",
      "Critérios de evidência",
      "Calendário de pagamentos",
      "Fluxo de aceite",
      "Registro de mudança de escopo",
      "Dossiê de acompanhamento contratual"
    ],
    "method": "Relacione cada marco a entregável, evidência, prazo e responsável por aceite. Pagamento e aprovação técnica não devem depender de termos ambíguos. Mudanças exigem análise de custo e prazo e autorização conforme o contrato. Na análise de pequenos negócios, separe receita contratada, faturada e recebida. Margem não é saldo de caixa e crescimento de vendas pode aumentar a necessidade de capital de giro. Defina custos variáveis e fixos na mesma unidade de análise e identifique restrições de capacidade. Cotações e previsões são premissas até serem confirmadas; preserve evidências e datas. Compare alternativas considerando prazo, risco, serviço e investimento, sem recomendar crédito ou investimento pessoal pelo exercício. Mercados do Pacífico podem depender de transporte, importações e sazonalidade, que devem aparecer nos cenários. O entregável é uma ferramenta de decisão gerencial com limites explícitos; requisitos fiscais, trabalhistas e regulatórios devem ser confirmados em fontes oficiais e com profissionais competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um contrato fictício de 20000 prevê 40% no início, 40% na entrega e 20% no aceite, mas não define evidência de entrega. Resolução: Definir critérios verificáveis e responsáveis antes de usar o segundo marco para pagamento. As parcelas são 8000, 8000 e 4000, mas a conta não resolve a ambiguidade de entrega. A mudança de escopo precisa de registro que indique quais marcos e valores serão afetados, sem presumir aprovação verbal. A solução usa números sintéticos e fronteira simplificada. O gestor deve verificar custos omitidos, capacidade de execução e condições contratuais antes de adotar a opção; o cálculo não é promessa de lucro. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://business.gov.au/planning",
      "https://www.business.govt.nz/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-analise-de-rentabilidade-de-remessas-para-varejo-insular",
    "title": "Análise de rentabilidade de remessas para varejo insular",
    "track": "business",
    "role": "Analista de operações e desenvolvimento de pequenos negócios",
    "positioning": "broad",
    "scenario": "Uma loja compra 200 itens a 20, paga 1000 de frete e vende cada item a 35, sem outros custos.",
    "decision": "Calcular custo alocado de 25 por item e contribuição simplificada de dez, registrando exclusões.",
    "misconception": "Tratar a diferença de 15 entre compra e venda como margem líquida.",
    "changedConstraint": "Dez itens chegam avariados e não podem ser vendidos.",
    "tasks": [
      "Composição do custo de aquisição",
      "Registro de unidades vendáveis",
      "Critério de rateio",
      "Cálculo de contribuição",
      "Cenário de avaria",
      "Relatório de exclusões de custo"
    ],
    "method": "Aloque custos de aquisição com critério explícito e diferencie perda física de custo unitário. O número de unidades vendáveis altera o custo recuperável por item. Inclua taxas e impostos apenas quando conhecidos e evite chamar contribuição de lucro líquido. Na análise de pequenos negócios, separe receita contratada, faturada e recebida. Margem não é saldo de caixa e crescimento de vendas pode aumentar a necessidade de capital de giro. Defina custos variáveis e fixos na mesma unidade de análise e identifique restrições de capacidade. Cotações e previsões são premissas até serem confirmadas; preserve evidências e datas. Compare alternativas considerando prazo, risco, serviço e investimento, sem recomendar crédito ou investimento pessoal pelo exercício. Mercados do Pacífico podem depender de transporte, importações e sazonalidade, que devem aparecer nos cenários. O entregável é uma ferramenta de decisão gerencial com limites explícitos; requisitos fiscais, trabalhistas e regulatórios devem ser confirmados em fontes oficiais e com profissionais competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma loja compra 200 itens a 20, paga 1000 de frete e vende cada item a 35, sem outros custos. Resolução: Calcular custo alocado de 25 por item e contribuição simplificada de dez, registrando exclusões. O desembolso de 5000 precisa ser recuperado em 190 itens vendáveis, elevando custo médio a aproximadamente 26,32. A receita potencial cai para 6650 e o saldo simplificado para 1650, antes dos demais custos. A solução usa números sintéticos e fronteira simplificada. O gestor deve verificar custos omitidos, capacidade de execução e condições contratuais antes de adotar a opção; o cálculo não é promessa de lucro. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://business.gov.au/planning",
      "https://www.business.govt.nz/",
      "https://www.business.qld.gov.au/running-business/finance/essentials/break-even-profit"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-planejamento-de-capacidade-em-oficinas-de-reparo-de-equipamentos",
    "title": "Planejamento de capacidade em oficinas de reparo de equipamentos",
    "track": "business",
    "role": "Analista de operações e desenvolvimento de pequenos negócios",
    "positioning": "specialist",
    "scenario": "Uma oficina tem 160 horas mensais, reserva 40 para administração e recebe 30 serviços de cinco horas cada.",
    "decision": "Identificar capacidade técnica de 120 horas contra demanda de 150 e lacuna de 30.",
    "misconception": "Aceitar todos prometendo entrega no mês porque as horas contratadas somam 160.",
    "changedConstraint": "Seis serviços exigem duas horas adicionais de teste.",
    "tasks": [
      "Mapa de horas disponíveis",
      "Tempos por etapa",
      "Fila de serviços",
      "Cálculo de carga e capacidade",
      "Cenário de testes adicionais",
      "Política de promessa de prazo"
    ],
    "method": "Separe disponibilidade total, tempo de apoio e horas técnicas. A duração do serviço deve incluir diagnóstico, execução, teste e registro. Programação precisa de fila e critérios de promessa, sem converter sobrecarga em trabalho não planejado. Na análise de pequenos negócios, separe receita contratada, faturada e recebida. Margem não é saldo de caixa e crescimento de vendas pode aumentar a necessidade de capital de giro. Defina custos variáveis e fixos na mesma unidade de análise e identifique restrições de capacidade. Cotações e previsões são premissas até serem confirmadas; preserve evidências e datas. Compare alternativas considerando prazo, risco, serviço e investimento, sem recomendar crédito ou investimento pessoal pelo exercício. Mercados do Pacífico podem depender de transporte, importações e sazonalidade, que devem aparecer nos cenários. O entregável é uma ferramenta de decisão gerencial com limites explícitos; requisitos fiscais, trabalhistas e regulatórios devem ser confirmados em fontes oficiais e com profissionais competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma oficina tem 160 horas mensais, reserva 40 para administração e recebe 30 serviços de cinco horas cada. Resolução: Identificar capacidade técnica de 120 horas contra demanda de 150 e lacuna de 30. Os testes adicionais elevam a demanda a 162 horas técnicas e a lacuna a 42. Uma média de cinco horas por serviço deixa de representar o mix; a promessa deve ser revisada por tipo e dependência de peça. A solução usa números sintéticos e fronteira simplificada. O gestor deve verificar custos omitidos, capacidade de execução e condições contratuais antes de adotar a opção; o cálculo não é promessa de lucro. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://business.gov.au/planning",
      "https://www.business.govt.nz/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-gestao-de-compras-coletivas-de-materiais-em-comunidades",
    "title": "Gestão de compras coletivas de materiais em comunidades",
    "track": "business",
    "role": "Analista de operações e desenvolvimento de pequenos negócios",
    "positioning": "specialist",
    "scenario": "Quatro associações pedem 30, 40, 20 e 10 unidades; o fornecedor exige lote mínimo de 120.",
    "decision": "Identificar demanda agregada de 100 e diferença de 20 antes de confirmar a compra.",
    "misconception": "Distribuir automaticamente as 20 extras sem consentimento das associações.",
    "changedConstraint": "Uma associação reduz seu pedido em dez unidades.",
    "tasks": [
      "Consolidação de pedidos",
      "Matriz de compromissos",
      "Cálculo de lote mínimo",
      "Regra de rateio aprovada",
      "Cenário de redução de pedido",
      "Memorando de decisão coletiva"
    ],
    "method": "Use compromisso confirmado, regra de rateio e responsabilidade por excedentes. O desconto do lote mínimo pode ser anulado por estoque sem uso e custo financeiro. Registre quem aceita quantidade e custo antes de assumir obrigação conjunta. Na análise de pequenos negócios, separe receita contratada, faturada e recebida. Margem não é saldo de caixa e crescimento de vendas pode aumentar a necessidade de capital de giro. Defina custos variáveis e fixos na mesma unidade de análise e identifique restrições de capacidade. Cotações e previsões são premissas até serem confirmadas; preserve evidências e datas. Compare alternativas considerando prazo, risco, serviço e investimento, sem recomendar crédito ou investimento pessoal pelo exercício. Mercados do Pacífico podem depender de transporte, importações e sazonalidade, que devem aparecer nos cenários. O entregável é uma ferramenta de decisão gerencial com limites explícitos; requisitos fiscais, trabalhistas e regulatórios devem ser confirmados em fontes oficiais e com profissionais competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Quatro associações pedem 30, 40, 20 e 10 unidades; o fornecedor exige lote mínimo de 120. Resolução: Identificar demanda agregada de 100 e diferença de 20 antes de confirmar a compra. A demanda inicial cobre 83,33% do mínimo. Após redução passa a 90 e a diferença sobe a 30; a decisão pode ser renegociar, adiar ou obter compromisso adicional, e não inventar demanda. A solução usa números sintéticos e fronteira simplificada. O gestor deve verificar custos omitidos, capacidade de execução e condições contratuais antes de adotar a opção; o cálculo não é promessa de lucro. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://business.gov.au/planning",
      "https://www.business.govt.nz/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-medicao-de-conversao-em-servicos-turisticos-com-multiplos-canais",
    "title": "Medição de conversão em serviços turísticos com múltiplos canais",
    "track": "business",
    "role": "Analista de operações e desenvolvimento de pequenos negócios",
    "positioning": "specialist",
    "scenario": "Uma empresa recebe 100 consultas por e-mail e 80 por formulário, mas 30 pessoas usam ambos; há 45 reservas únicas.",
    "decision": "Deduplicar para 150 pessoas e calcular conversão de 30% com a definição apresentada.",
    "misconception": "Dividir 45 por 180 e chamar o resultado de conversão por pessoa.",
    "changedConstraint": "Dez reservas são feitas por grupos com vários viajantes.",
    "tasks": [
      "Modelo de entidades do funil",
      "Regras de deduplicação",
      "Base de consultas",
      "Cálculo de conversão",
      "Teste de reservas de grupo",
      "Relatório de atribuição limitada"
    ],
    "method": "Defina entidade do funil como pessoa, grupo ou consulta antes de calcular. Deduplicação exige regra e privacidade. Reservas e viajantes são unidades diferentes; use o mesmo universo no numerador e denominador e mostre atribuição por canal como análise separada. Na análise de pequenos negócios, separe receita contratada, faturada e recebida. Margem não é saldo de caixa e crescimento de vendas pode aumentar a necessidade de capital de giro. Defina custos variáveis e fixos na mesma unidade de análise e identifique restrições de capacidade. Cotações e previsões são premissas até serem confirmadas; preserve evidências e datas. Compare alternativas considerando prazo, risco, serviço e investimento, sem recomendar crédito ou investimento pessoal pelo exercício. Mercados do Pacífico podem depender de transporte, importações e sazonalidade, que devem aparecer nos cenários. O entregável é uma ferramenta de decisão gerencial com limites explícitos; requisitos fiscais, trabalhistas e regulatórios devem ser confirmados em fontes oficiais e com profissionais competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma empresa recebe 100 consultas por e-mail e 80 por formulário, mas 30 pessoas usam ambos; há 45 reservas únicas. Resolução: Deduplicar para 150 pessoas e calcular conversão de 30% com a definição apresentada. Cem mais 80 menos 30 resulta em 150 pessoas consultantes. Quarenta e cinco sobre 150 é 30%, mas reservas de grupo podem quebrar a equivalência entre pessoa e reserva; o indicador precisa de revisão de entidade. A solução usa números sintéticos e fronteira simplificada. O gestor deve verificar custos omitidos, capacidade de execução e condições contratuais antes de adotar a opção; o cálculo não é promessa de lucro. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://business.gov.au/planning",
      "https://www.business.govt.nz/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-planejamento-de-receitas-de-servicos-por-assinatura-em-mercados-pequenos",
    "title": "Planejamento de receitas de serviços por assinatura em mercados pequenos",
    "track": "business",
    "role": "Analista de operações e desenvolvimento de pequenos negócios",
    "positioning": "broad",
    "scenario": "Um serviço começa com 200 assinantes, perde 20 e conquista 35 no mês, cobrando 15 por assinante ativo no fim.",
    "decision": "Calcular 215 assinantes finais e receita final teórica de 3225 sob a regra simplificada.",
    "misconception": "Tratar 35 novos como crescimento líquido de 35.",
    "changedConstraint": "Dez dos novos têm desconto de 50% no primeiro mês.",
    "tasks": [
      "Balanço de assinantes",
      "Dicionário de estados",
      "Cálculo de crescimento líquido",
      "Reconciliação de descontos",
      "Cenário de inadimplência",
      "Painel de receita e recebimento"
    ],
    "method": "Separe estoque de assinantes, entradas, saídas e estados de pagamento. Receita de fim de mês não equivale a receita reconhecida ou caixa recebido. Descontos, inadimplência e datas de ativação precisam de tratamento explícito. Na análise de pequenos negócios, separe receita contratada, faturada e recebida. Margem não é saldo de caixa e crescimento de vendas pode aumentar a necessidade de capital de giro. Defina custos variáveis e fixos na mesma unidade de análise e identifique restrições de capacidade. Cotações e previsões são premissas até serem confirmadas; preserve evidências e datas. Compare alternativas considerando prazo, risco, serviço e investimento, sem recomendar crédito ou investimento pessoal pelo exercício. Mercados do Pacífico podem depender de transporte, importações e sazonalidade, que devem aparecer nos cenários. O entregável é uma ferramenta de decisão gerencial com limites explícitos; requisitos fiscais, trabalhistas e regulatórios devem ser confirmados em fontes oficiais e com profissionais competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um serviço começa com 200 assinantes, perde 20 e conquista 35 no mês, cobrando 15 por assinante ativo no fim. Resolução: Calcular 215 assinantes finais e receita final teórica de 3225 sob a regra simplificada. O crescimento líquido é 15, ou 7,5% sobre 200. O desconto dos dez reduz a receita simplificada em 75, para 3150, se todos estiverem ativos e a regra for cobrar o mês completo; outras condições mudam o cálculo. A solução usa números sintéticos e fronteira simplificada. O gestor deve verificar custos omitidos, capacidade de execução e condições contratuais antes de adotar a opção; o cálculo não é promessa de lucro. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://business.gov.au/planning",
      "https://www.business.govt.nz/",
      "https://www.business.govt.nz/strategy-and-performance/strategic-finance/key-equations-for-your-finances"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-avaliacao-de-dependencia-de-fornecedores-em-negocios-remotos",
    "title": "Avaliação de dependência de fornecedores em negócios remotos",
    "track": "business",
    "role": "Analista de operações e desenvolvimento de pequenos negócios",
    "positioning": "specialist",
    "scenario": "Uma empresa compra 70% do valor anual de um fornecedor que entrega por uma única rota marítima.",
    "decision": "Mapear concentração de valor e dependência logística, testando alternativa sem presumir equivalência de qualidade.",
    "misconception": "Concluir que existe diversificação porque há cinco fornecedores cadastrados.",
    "changedConstraint": "O segundo fornecedor usa a mesma rota e o mesmo distribuidor de origem.",
    "tasks": [
      "Mapa de gasto por fornecedor",
      "Árvore de dependências",
      "Matriz de riscos comuns",
      "Critérios de substituição",
      "Cenário de rota interrompida",
      "Plano de continuidade de compras"
    ],
    "method": "Diferencie quantidade de fornecedores e independência das fontes de risco. Concentração pode ocorrer em produto, fabricante, transporte ou pagamento. Compare alternativas por especificação, prazo, custo e capacidade de substituição validada. Na análise de pequenos negócios, separe receita contratada, faturada e recebida. Margem não é saldo de caixa e crescimento de vendas pode aumentar a necessidade de capital de giro. Defina custos variáveis e fixos na mesma unidade de análise e identifique restrições de capacidade. Cotações e previsões são premissas até serem confirmadas; preserve evidências e datas. Compare alternativas considerando prazo, risco, serviço e investimento, sem recomendar crédito ou investimento pessoal pelo exercício. Mercados do Pacífico podem depender de transporte, importações e sazonalidade, que devem aparecer nos cenários. O entregável é uma ferramenta de decisão gerencial com limites explícitos; requisitos fiscais, trabalhistas e regulatórios devem ser confirmados em fontes oficiais e com profissionais competentes. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma empresa compra 70% do valor anual de um fornecedor que entrega por uma única rota marítima. Resolução: Mapear concentração de valor e dependência logística, testando alternativa sem presumir equivalência de qualidade. Os cinco cadastros não eliminam a concentração de 70%. A origem e rota compartilhadas criam risco comum; a alternativa precisa ser avaliada quanto à independência real, não apenas ao nome empresarial. A solução usa números sintéticos e fronteira simplificada. O gestor deve verificar custos omitidos, capacidade de execução e condições contratuais antes de adotar a opção; o cálculo não é promessa de lucro. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://business.gov.au/planning",
      "https://www.business.govt.nz/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-redacao-de-avisos-de-interrupcao-de-servicos-em-ilhas",
    "title": "Redação de avisos de interrupção de serviços em ilhas",
    "track": "content",
    "role": "Especialista em conteúdo acessível e informação pública",
    "positioning": "specialist",
    "scenario": "Um aviso informa manutenção amanhã, mas omite data completa, fuso, área afetada e canal de atualização.",
    "decision": "Reescrever com os quatro campos pendentes identificados e solicitar confirmação antes da publicação oficial.",
    "misconception": "Inventar horário e área para tornar o aviso mais completo.",
    "changedConstraint": "A interrupção é adiada depois que parte do público recebeu a primeira versão.",
    "tasks": [
      "Modelo de aviso orientado à ação",
      "Checklist de campos confirmados",
      "Matriz de canais",
      "Controle de versões",
      "Roteiro de aviso de adiamento",
      "Plano de atualização pública"
    ],
    "method": "Use um modelo de aviso com o que muda, quem é afetado, quando, ação esperada e fonte de atualização. Datas relativas perdem sentido em circulação e fusos diferentes. Controle correções e preserve canal de confirmação. No desenho de conteúdo público, comece pela tarefa da pessoa e pela informação necessária para concluí-la. Organize condições, prazos e próximos passos com linguagem clara, preservando precisão. Acessibilidade exige estrutura semântica, alternativas a conteúdo visual e testes com meios de navegação variados; aparência legível não basta. Registre fonte, versão, direitos e data de revisão. Tradução e adaptação cultural precisam de revisão competente, especialmente quando envolvem línguas e conhecimentos comunitários. Diferencie informação oficial confirmada, interpretação editorial e hipótese. Meça sucesso por compreensão e conclusão da tarefa, sem usar cliques como prova de entendimento. O curso desenvolve produção e verificação de conteúdo, sem conferir autoridade para emitir alertas oficiais, alterar regras públicas ou autorizar uso de patrimônio cultural. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um aviso informa manutenção amanhã, mas omite data completa, fuso, área afetada e canal de atualização. Resolução: Reescrever com os quatro campos pendentes identificados e solicitar confirmação antes da publicação oficial. A frase amanhã não permite recuperar a data se a imagem circular depois. O adiamento exige versão identificável e comunicação de correção pelos canais usados, sem apagar silenciosamente a mensagem anterior. O exemplo mostra como uma alteração editorial afeta a tarefa e a interpretação. O produto final deve preservar os fatos fornecidos, permitir revisão e indicar claramente pendências que dependem da fonte ou da comunidade responsável. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.govt.nz/standards-and-guidance/design-and-ux",
      "https://www.w3.org/WAI/tutorials/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-alternativas-textuais-para-mapas-de-acesso-a-servicos",
    "title": "Alternativas textuais para mapas de acesso a serviços",
    "track": "content",
    "role": "Especialista em conteúdo acessível e informação pública",
    "positioning": "specialist",
    "scenario": "Um mapa mostra oito pontos de atendimento, mas apenas os ícones e cores identificam localização e horário.",
    "decision": "Criar lista estruturada com nome, endereço, horário e condição de acesso de cada ponto, além da visualização.",
    "misconception": "Usar texto alternativo mapa de serviços e considerar toda a informação acessível.",
    "changedConstraint": "Dois pontos funcionam apenas mediante agendamento.",
    "tasks": [
      "Inventário de dados do mapa",
      "Tabela acessível de pontos",
      "Textos alternativos por função",
      "Checklist de condições de acesso",
      "Teste sem visualização",
      "Procedimento de sincronização"
    ],
    "method": "Diferencie descrição breve da imagem e alternativa completa dos dados. Uma lista ou tabela deve permitir realizar a mesma tarefa sem interpretar cores ou posição. Inclua condições de atendimento no dado estruturado e mantenha sincronização entre formatos. No desenho de conteúdo público, comece pela tarefa da pessoa e pela informação necessária para concluí-la. Organize condições, prazos e próximos passos com linguagem clara, preservando precisão. Acessibilidade exige estrutura semântica, alternativas a conteúdo visual e testes com meios de navegação variados; aparência legível não basta. Registre fonte, versão, direitos e data de revisão. Tradução e adaptação cultural precisam de revisão competente, especialmente quando envolvem línguas e conhecimentos comunitários. Diferencie informação oficial confirmada, interpretação editorial e hipótese. Meça sucesso por compreensão e conclusão da tarefa, sem usar cliques como prova de entendimento. O curso desenvolve produção e verificação de conteúdo, sem conferir autoridade para emitir alertas oficiais, alterar regras públicas ou autorizar uso de patrimônio cultural. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um mapa mostra oito pontos de atendimento, mas apenas os ícones e cores identificam localização e horário. Resolução: Criar lista estruturada com nome, endereço, horário e condição de acesso de cada ponto, além da visualização. Oito pontos no desenho não são oito opções disponíveis a qualquer hora. O agendamento altera o próximo passo e precisa aparecer tanto no mapa quanto na lista, evitando uma alternativa textual incompleta. O exemplo mostra como uma alteração editorial afeta a tarefa e a interpretação. O produto final deve preservar os fatos fornecidos, permitir revisão e indicar claramente pendências que dependem da fonte ou da comunidade responsável. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.govt.nz/standards-and-guidance/design-and-ux",
      "https://www.w3.org/WAI/tutorials/",
      "https://www.w3.org/WAI/tutorials/images/complex/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-governanca-de-publicacao-de-historias-orais-comunitarias",
    "title": "Governança de publicação de histórias orais comunitárias",
    "track": "content",
    "role": "Especialista em conteúdo acessível e informação pública",
    "positioning": "broad",
    "scenario": "Um acervo possui 50 entrevistas, das quais 15 autorizam apenas consulta local e dez não definem uso de trechos em redes sociais.",
    "decision": "Restringir publicação conforme cada autorização e esclarecer os dez casos antes de reutilizar trechos.",
    "misconception": "Publicar todas porque a gravação foi entregue ao acervo.",
    "changedConstraint": "Um participante solicita correção de atribuição e retirada de um trecho.",
    "tasks": [
      "Registro de direitos",
      "Matriz de acesso por entrevista",
      "Fluxo de autorização de trecho",
      "Mapa de versões publicadas",
      "Procedimento de correção e retirada",
      "Guia de contexto cultural"
    ],
    "method": "Associe entrevista, titularidade, autorização, contexto cultural e restrições de acesso. Entrega ao acervo não implica licença irrestrita. Preserve proveniência e mecanismo de correção, incluindo governança comunitária e direitos individuais aplicáveis. No desenho de conteúdo público, comece pela tarefa da pessoa e pela informação necessária para concluí-la. Organize condições, prazos e próximos passos com linguagem clara, preservando precisão. Acessibilidade exige estrutura semântica, alternativas a conteúdo visual e testes com meios de navegação variados; aparência legível não basta. Registre fonte, versão, direitos e data de revisão. Tradução e adaptação cultural precisam de revisão competente, especialmente quando envolvem línguas e conhecimentos comunitários. Diferencie informação oficial confirmada, interpretação editorial e hipótese. Meça sucesso por compreensão e conclusão da tarefa, sem usar cliques como prova de entendimento. O curso desenvolve produção e verificação de conteúdo, sem conferir autoridade para emitir alertas oficiais, alterar regras públicas ou autorizar uso de patrimônio cultural. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um acervo possui 50 entrevistas, das quais 15 autorizam apenas consulta local e dez não definem uso de trechos em redes sociais. Resolução: Restringir publicação conforme cada autorização e esclarecer os dez casos antes de reutilizar trechos. As 15 de consulta local não devem migrar para divulgação aberta por conveniência. Os dez casos sem definição não podem ser contados como autorizados; a solicitação posterior exige localizar versões e canais derivados. O exemplo mostra como uma alteração editorial afeta a tarefa e a interpretação. O produto final deve preservar os fatos fornecidos, permitir revisão e indicar claramente pendências que dependem da fonte ou da comunidade responsável. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.govt.nz/standards-and-guidance/design-and-ux",
      "https://www.w3.org/WAI/tutorials/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-controle-editorial-de-formularios-bilingues-com-condicoes-de-elegibilidade",
    "title": "Controle editorial de formulários bilíngues com condições de elegibilidade",
    "track": "content",
    "role": "Especialista em conteúdo acessível e informação pública",
    "positioning": "specialist",
    "scenario": "Um formulário em inglês exige residência há dois anos e a tradução omite essa condição em três de cinco páginas de instrução.",
    "decision": "Restaurar a condição nos locais necessários e testar consistência da jornada completa com revisão linguística competente.",
    "misconception": "Aprovar a tradução porque o resumo inicial contém a regra correta.",
    "changedConstraint": "A fonte altera a condição de dois para três anos.",
    "tasks": [
      "Matriz de afirmações críticas",
      "Glossário validado",
      "Registro de omissões",
      "Mapa de dependências editoriais",
      "Teste de regra alterada",
      "Roteiro de revisão bilíngue"
    ],
    "method": "Mapeie afirmações críticas entre fonte e tradução por identificador, não apenas por página. Verifique números, negações, exceções e ação exigida. Atualização de regra deve acionar todos os trechos dependentes e revisão de compreensão. No desenho de conteúdo público, comece pela tarefa da pessoa e pela informação necessária para concluí-la. Organize condições, prazos e próximos passos com linguagem clara, preservando precisão. Acessibilidade exige estrutura semântica, alternativas a conteúdo visual e testes com meios de navegação variados; aparência legível não basta. Registre fonte, versão, direitos e data de revisão. Tradução e adaptação cultural precisam de revisão competente, especialmente quando envolvem línguas e conhecimentos comunitários. Diferencie informação oficial confirmada, interpretação editorial e hipótese. Meça sucesso por compreensão e conclusão da tarefa, sem usar cliques como prova de entendimento. O curso desenvolve produção e verificação de conteúdo, sem conferir autoridade para emitir alertas oficiais, alterar regras públicas ou autorizar uso de patrimônio cultural. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um formulário em inglês exige residência há dois anos e a tradução omite essa condição em três de cinco páginas de instrução. Resolução: Restaurar a condição nos locais necessários e testar consistência da jornada completa com revisão linguística competente. A condição presente uma vez não corrige as três omissões onde o usuário decide. A mudança para três anos precisa de rastreabilidade para localizar cada ocorrência e evitar versões contraditórias no mesmo processo. O exemplo mostra como uma alteração editorial afeta a tarefa e a interpretação. O produto final deve preservar os fatos fornecidos, permitir revisão e indicar claramente pendências que dependem da fonte ou da comunidade responsável. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.govt.nz/standards-and-guidance/design-and-ux",
      "https://www.w3.org/WAI/tutorials/",
      "https://www.w3.org/TR/its20/#lqissue"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-legendas-acessiveis-para-videos-de-orientacao-profissional",
    "title": "Legendas acessíveis para vídeos de orientação profissional",
    "track": "content",
    "role": "Especialista em conteúdo acessível e informação pública",
    "positioning": "specialist",
    "scenario": "Um vídeo de oito minutos tem legendas automáticas com dez erros em nomes de profissões e quatro em prazos.",
    "decision": "Revisar os 14 erros com prioridade aos que alteram ação e verificar sincronização e identificação de fala.",
    "misconception": "Publicar sem revisão porque a taxa geral de reconhecimento parece alta.",
    "changedConstraint": "O vídeo inclui demonstração visual sem descrição verbal.",
    "tasks": [
      "Rubrica de revisão de legenda",
      "Lista de termos críticos",
      "Registro de erros por consequência",
      "Teste de sincronização",
      "Alternativa para demonstração visual",
      "Checklist de publicação acessível"
    ],
    "method": "Avalie legenda por fidelidade, sincronização, segmentação e identificação sonora relevante. Taxa de palavras corretas não mede consequência dos erros. Informação visual necessária à tarefa pode exigir descrição ou alternativa equivalente, além das legendas. No desenho de conteúdo público, comece pela tarefa da pessoa e pela informação necessária para concluí-la. Organize condições, prazos e próximos passos com linguagem clara, preservando precisão. Acessibilidade exige estrutura semântica, alternativas a conteúdo visual e testes com meios de navegação variados; aparência legível não basta. Registre fonte, versão, direitos e data de revisão. Tradução e adaptação cultural precisam de revisão competente, especialmente quando envolvem línguas e conhecimentos comunitários. Diferencie informação oficial confirmada, interpretação editorial e hipótese. Meça sucesso por compreensão e conclusão da tarefa, sem usar cliques como prova de entendimento. O curso desenvolve produção e verificação de conteúdo, sem conferir autoridade para emitir alertas oficiais, alterar regras públicas ou autorizar uso de patrimônio cultural. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um vídeo de oito minutos tem legendas automáticas com dez erros em nomes de profissões e quatro em prazos. Resolução: Revisar os 14 erros com prioridade aos que alteram ação e verificar sincronização e identificação de fala. Os 14 erros não têm o mesmo impacto: um prazo incorreto pode impedir uma candidatura. A demonstração sem descrição revela uma barreira adicional que não é resolvida por transcrever apenas a fala existente. O exemplo mostra como uma alteração editorial afeta a tarefa e a interpretação. O produto final deve preservar os fatos fornecidos, permitir revisão e indicar claramente pendências que dependem da fonte ou da comunidade responsável. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.govt.nz/standards-and-guidance/design-and-ux",
      "https://www.w3.org/WAI/tutorials/",
      "https://www.w3.org/WAI/media/av/captions/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-estrutura-semantica-de-guias-digitais-de-mobilidade-no-pacifico",
    "title": "Estrutura semântica de guias digitais de mobilidade no Pacífico",
    "track": "content",
    "role": "Especialista em conteúdo acessível e informação pública",
    "positioning": "specialist",
    "scenario": "Um guia possui 30 títulos visualmente destacados, mas todos são parágrafos sem hierarquia e o índice não navega.",
    "decision": "Criar hierarquia semântica coerente e vínculos de navegação, verificando ordem de leitura e foco.",
    "misconception": "Aumentar o tamanho da fonte e chamar a estrutura de acessível.",
    "changedConstraint": "Três blocos são reutilizados em páginas com hierarquia diferente.",
    "tasks": [
      "Inventário de títulos",
      "Árvore semântica",
      "Índice navegável",
      "Teste de leitura linear",
      "Contrato de componente reutilizável",
      "Relatório de foco e navegação"
    ],
    "method": "Use títulos para representar organização do conteúdo e não apenas estilo. A ordem deve permitir localizar assunto por tecnologia assistiva. Componentes reutilizados precisam receber nível adequado ao contexto sem quebrar a estrutura da página. No desenho de conteúdo público, comece pela tarefa da pessoa e pela informação necessária para concluí-la. Organize condições, prazos e próximos passos com linguagem clara, preservando precisão. Acessibilidade exige estrutura semântica, alternativas a conteúdo visual e testes com meios de navegação variados; aparência legível não basta. Registre fonte, versão, direitos e data de revisão. Tradução e adaptação cultural precisam de revisão competente, especialmente quando envolvem línguas e conhecimentos comunitários. Diferencie informação oficial confirmada, interpretação editorial e hipótese. Meça sucesso por compreensão e conclusão da tarefa, sem usar cliques como prova de entendimento. O curso desenvolve produção e verificação de conteúdo, sem conferir autoridade para emitir alertas oficiais, alterar regras públicas ou autorizar uso de patrimônio cultural. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um guia possui 30 títulos visualmente destacados, mas todos são parágrafos sem hierarquia e o índice não navega. Resolução: Criar hierarquia semântica coerente e vínculos de navegação, verificando ordem de leitura e foco. Trinta destaques visuais não produzem uma árvore de tópicos navegável. A reutilização exige separar apresentação e semântica para que o mesmo bloco se adapte ao contexto sem pular relações de conteúdo. O exemplo mostra como uma alteração editorial afeta a tarefa e a interpretação. O produto final deve preservar os fatos fornecidos, permitir revisão e indicar claramente pendências que dependem da fonte ou da comunidade responsável. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.govt.nz/standards-and-guidance/design-and-ux",
      "https://www.w3.org/WAI/tutorials/",
      "https://www.w3.org/WAI/tutorials/page-structure/headings/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-edicao-de-tabelas-de-taxas-com-moeda-e-vigencia",
    "title": "Edição de tabelas de taxas com moeda e vigência",
    "track": "content",
    "role": "Especialista em conteúdo acessível e informação pública",
    "positioning": "broad",
    "scenario": "Uma tabela informa 12 taxas em dólares, mas não identifica país da moeda nem data de vigência.",
    "decision": "Solicitar código de moeda e vigência e impedir comparação numérica até confirmar a base.",
    "misconception": "Assumir que todo símbolo de dólar significa dólar americano.",
    "changedConstraint": "Quatro taxas incluem tributo e oito não.",
    "tasks": [
      "Dicionário monetário",
      "Tabela com campos de vigência",
      "Matriz de inclusão tributária",
      "Registro de fontes",
      "Teste de comparação homogênea",
      "Guia de atualização de valores"
    ],
    "method": "Publique valor, código de moeda, unidade de cobrança, inclusão tributária e vigência como campos separados. Comparações exigem mesma fronteira e, quando houver conversão, taxa e data explícitas. Não preencha lacunas pela familiaridade do símbolo. No desenho de conteúdo público, comece pela tarefa da pessoa e pela informação necessária para concluí-la. Organize condições, prazos e próximos passos com linguagem clara, preservando precisão. Acessibilidade exige estrutura semântica, alternativas a conteúdo visual e testes com meios de navegação variados; aparência legível não basta. Registre fonte, versão, direitos e data de revisão. Tradução e adaptação cultural precisam de revisão competente, especialmente quando envolvem línguas e conhecimentos comunitários. Diferencie informação oficial confirmada, interpretação editorial e hipótese. Meça sucesso por compreensão e conclusão da tarefa, sem usar cliques como prova de entendimento. O curso desenvolve produção e verificação de conteúdo, sem conferir autoridade para emitir alertas oficiais, alterar regras públicas ou autorizar uso de patrimônio cultural. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma tabela informa 12 taxas em dólares, mas não identifica país da moeda nem data de vigência. Resolução: Solicitar código de moeda e vigência e impedir comparação numérica até confirmar a base. Uma taxa de 100 pode significar moedas diferentes e escopos diferentes. O tributo misto cria outra incompatibilidade mesmo após identificar a moeda; a tabela precisa permitir distinguir valor base e total confirmado. O exemplo mostra como uma alteração editorial afeta a tarefa e a interpretação. O produto final deve preservar os fatos fornecidos, permitir revisão e indicar claramente pendências que dependem da fonte ou da comunidade responsável. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.govt.nz/standards-and-guidance/design-and-ux",
      "https://www.w3.org/WAI/tutorials/",
      "https://www.business.govt.nz/strategy-and-performance/strategic-finance/key-equations-for-your-finances"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-arquitetura-de-conteudo-para-servicos-com-conectividade-limitada",
    "title": "Arquitetura de conteúdo para serviços com conectividade limitada",
    "track": "content",
    "role": "Especialista em conteúdo acessível e informação pública",
    "positioning": "specialist",
    "scenario": "Um portal exige baixar um PDF de 20 MB para descobrir três documentos necessários ao agendamento.",
    "decision": "Publicar a lista essencial em HTML leve e oferecer o PDF como material complementar, preservando a fonte e versão.",
    "misconception": "Reduzir apenas a resolução da capa sem disponibilizar a informação da tarefa.",
    "changedConstraint": "Um dos documentos muda e o PDF antigo continua circulando.",
    "tasks": [
      "Mapa da tarefa",
      "Inventário de conteúdo essencial",
      "Versão HTML leve",
      "Plano de anexos",
      "Teste em conexão limitada",
      "Procedimento de sincronização de requisito"
    ],
    "method": "Priorize informação necessária para ação no canal mais acessível e leve. Separe conteúdo essencial de anexos e mantenha versão e data. Desempenho deve ser medido na jornada real, incluindo rede limitada e dispositivo básico. No desenho de conteúdo público, comece pela tarefa da pessoa e pela informação necessária para concluí-la. Organize condições, prazos e próximos passos com linguagem clara, preservando precisão. Acessibilidade exige estrutura semântica, alternativas a conteúdo visual e testes com meios de navegação variados; aparência legível não basta. Registre fonte, versão, direitos e data de revisão. Tradução e adaptação cultural precisam de revisão competente, especialmente quando envolvem línguas e conhecimentos comunitários. Diferencie informação oficial confirmada, interpretação editorial e hipótese. Meça sucesso por compreensão e conclusão da tarefa, sem usar cliques como prova de entendimento. O curso desenvolve produção e verificação de conteúdo, sem conferir autoridade para emitir alertas oficiais, alterar regras públicas ou autorizar uso de patrimônio cultural. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um portal exige baixar um PDF de 20 MB para descobrir três documentos necessários ao agendamento. Resolução: Publicar a lista essencial em HTML leve e oferecer o PDF como material complementar, preservando a fonte e versão. O tamanho do arquivo cria barreira antes mesmo da leitura. A lista leve resolve acesso à informação essencial, mas precisa de processo de atualização para não divergir do anexo e deixar requisitos antigos em circulação. O exemplo mostra como uma alteração editorial afeta a tarefa e a interpretação. O produto final deve preservar os fatos fornecidos, permitir revisão e indicar claramente pendências que dependem da fonte ou da comunidade responsável. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.govt.nz/standards-and-guidance/design-and-ux",
      "https://www.w3.org/WAI/tutorials/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-revisao-de-alegacoes-ambientais-em-comunicacao-turistica",
    "title": "Revisão de alegações ambientais em comunicação turística",
    "track": "content",
    "role": "Especialista em conteúdo acessível e informação pública",
    "positioning": "specialist",
    "scenario": "Uma operadora anuncia passeio carbono neutro sem informar fronteira, método ou evidência de compensação.",
    "decision": "Substituir a alegação não sustentada por informações verificáveis e solicitar documentação antes de qualquer afirmação específica.",
    "misconception": "Manter a frase porque outras empresas usam a mesma expressão.",
    "changedConstraint": "O fornecedor apresenta compensações referentes apenas ao escritório.",
    "tasks": [
      "Inventário de alegações",
      "Matriz de evidências",
      "Mapa de fronteiras ambientais",
      "Texto revisado verificável",
      "Teste de comprovante parcial",
      "Fluxo de aprovação de comunicação"
    ],
    "method": "Diferencie redução de emissões, inventário e compensação. Uma alegação precisa de fronteira, período, método e evidência compatíveis. Comunicação clara deve evitar ampliar o alcance do comprovante e declarar o que permanece fora da análise. No desenho de conteúdo público, comece pela tarefa da pessoa e pela informação necessária para concluí-la. Organize condições, prazos e próximos passos com linguagem clara, preservando precisão. Acessibilidade exige estrutura semântica, alternativas a conteúdo visual e testes com meios de navegação variados; aparência legível não basta. Registre fonte, versão, direitos e data de revisão. Tradução e adaptação cultural precisam de revisão competente, especialmente quando envolvem línguas e conhecimentos comunitários. Diferencie informação oficial confirmada, interpretação editorial e hipótese. Meça sucesso por compreensão e conclusão da tarefa, sem usar cliques como prova de entendimento. O curso desenvolve produção e verificação de conteúdo, sem conferir autoridade para emitir alertas oficiais, alterar regras públicas ou autorizar uso de patrimônio cultural. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Uma operadora anuncia passeio carbono neutro sem informar fronteira, método ou evidência de compensação. Resolução: Substituir a alegação não sustentada por informações verificáveis e solicitar documentação antes de qualquer afirmação específica. Compensar atividades do escritório não sustenta automaticamente a neutralidade do passeio, que pode incluir transporte e outros serviços. O ajuste editorial deve refletir o escopo comprovado e evitar um selo inventado de certificação. O exemplo mostra como uma alteração editorial afeta a tarefa e a interpretação. O produto final deve preservar os fatos fornecidos, permitir revisão e indicar claramente pendências que dependem da fonte ou da comunidade responsável. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.govt.nz/standards-and-guidance/design-and-ux",
      "https://www.w3.org/WAI/tutorials/"
    ],
    "region": "oceania"
  },
  {
    "id": "oc-publicacao-responsavel-de-indicadores-em-pequenas-comunidades",
    "title": "Publicação responsável de indicadores em pequenas comunidades",
    "track": "content",
    "role": "Especialista em conteúdo acessível e informação pública",
    "positioning": "specialist",
    "scenario": "Um relatório mostra uma categoria com uma única pessoa e cruza idade, ilha e ocupação em tabela pública.",
    "decision": "Avaliar risco de identificação e reduzir granularidade ou restringir acesso conforme política, preservando utilidade.",
    "misconception": "Publicar porque o nome da pessoa não aparece.",
    "changedConstraint": "Uma versão anterior do relatório permite deduzir o valor suprimido.",
    "tasks": [
      "Inventário de tabelas públicas",
      "Matriz de quase identificadores",
      "Teste de dedução por totais",
      "Comparação entre versões",
      "Alternativa de agregação",
      "Registro de decisão de divulgação"
    ],
    "method": "Considere identificação indireta e divulgação por diferença entre tabelas ou versões. Supressão de uma célula pode ser insuficiente quando totais revelam seu valor. A estratégia precisa equilibrar transparência, finalidade e proteção com revisão competente. No desenho de conteúdo público, comece pela tarefa da pessoa e pela informação necessária para concluí-la. Organize condições, prazos e próximos passos com linguagem clara, preservando precisão. Acessibilidade exige estrutura semântica, alternativas a conteúdo visual e testes com meios de navegação variados; aparência legível não basta. Registre fonte, versão, direitos e data de revisão. Tradução e adaptação cultural precisam de revisão competente, especialmente quando envolvem línguas e conhecimentos comunitários. Diferencie informação oficial confirmada, interpretação editorial e hipótese. Meça sucesso por compreensão e conclusão da tarefa, sem usar cliques como prova de entendimento. O curso desenvolve produção e verificação de conteúdo, sem conferir autoridade para emitir alertas oficiais, alterar regras públicas ou autorizar uso de patrimônio cultural. O laboratório utiliza somente dados sintéticos ou públicos autorizados. Preserve entradas, unidades, versão e justificativa de cada transformação; a reprodução da análise por outra pessoa é o teste de qualidade do entregável. Documente uma alternativa rejeitada e uma condição que invalidaria a conclusão antes de apresentar o resultado.",
    "workedExample": "Caso fictício para estudo: Um relatório mostra uma categoria com uma única pessoa e cruza idade, ilha e ocupação em tabela pública. Resolução: Avaliar risco de identificação e reduzir granularidade ou restringir acesso conforme política, preservando utilidade. A pessoa única pode ser reconhecida pelo contexto local. A versão anterior cria risco de dedução, por isso a revisão deve considerar o conjunto de publicações e não apenas a nova tabela isolada. O exemplo mostra como uma alteração editorial afeta a tarefa e a interpretação. O produto final deve preservar os fatos fornecidos, permitir revisão e indicar claramente pendências que dependem da fonte ou da comunidade responsável. Registre o resultado em tabela com identificador, entrada, regra aplicada, saída e limite. A conclusão vale para as premissas apresentadas; uma mudança de condições exige novo cálculo ou revisão do procedimento, sem converter esta simulação em autorização profissional.",
    "sources": [
      "https://www.digital.govt.nz/standards-and-guidance/design-and-ux",
      "https://www.w3.org/WAI/tutorials/",
      "https://data.govt.nz/toolkit/privacy-and-security/understanding-data-confidentiality/data-confidentiality-principles-and-methods-report"
    ],
    "region": "oceania"
  }
];

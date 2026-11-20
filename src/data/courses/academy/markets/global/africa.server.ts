import 'server-only';
import type { GlobalCourseSpec } from './types';

/** Original fictional occupational cases and authored technical instruction. */
export const africaSpecs: readonly GlobalCourseSpec[] = [
  {
    "id": "af-balanco-de-massa-na-secagem-de-milho-cooperativo",
    "title": "Balanço de massa na secagem de milho cooperativo",
    "track": "quality",
    "role": "Analista de pós-colheita",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma cooperativa de Gana recebe 1000 kg de milho com umidade de 20% e projeta secagem até 12%; não houve perda de matéria seca.",
    "decision": "Conservar 800 kg de matéria seca e estimar massa final de 909,09 kg; a diferença de 90,91 kg é água retirada.",
    "misconception": "Registrar toda a redução de massa como alimento perdido.",
    "changedConstraint": "A amostra de entrada passa a indicar 22% de umidade.",
    "tasks": [
      "Planilha de matéria seca",
      "Protocolo de medição de umidade",
      "Rastreio de sacarias por lote",
      "Reconciliação de entradas e saídas",
      "Análise de sensibilidade da umidade",
      "Memória de classificação de perdas"
    ],
    "method": "Use a fração de matéria seca como invariante: massa inicial multiplicada por um menos a umidade inicial. Divida o resultado por um menos a umidade desejada. Aplique a mesma base, úmida ou seca, nas duas medições. Diferencie água removida, derramamento e rejeição por qualidade. Uma balança sozinha não explica a causa da diferença. Estabeleça a identidade do lote antes de comparar indicadores. Uma perda física é diferença de massa na mesma base; perda econômica também inclui desclassificação e preço. Uma variação de umidade altera massa sem representar necessariamente deterioração. Registre amostragem, instrumento, horário e incerteza. Separe autorização sanitária de planejamento operacional: o exercício não autoriza aplicação de químicos nem liberação de alimento. Construa uma decisão rastreável que outra pessoa consiga reproduzir com a mesma base.",
    "workedExample": "A entrada tem 1000 vezes 0,80, portanto 800 kg secos. Para que esses 800 kg representem 88% do lote final, calcule 800 dividido por 0,88. A saída teórica é 909,09 kg; uma saída real de 895 kg exigiria investigar os 14,09 kg adicionais. No dossiê de balanço de massa na secagem de milho cooperativo, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Conservar 800 kg de matéria seca e estimar massa final de 909,09 kg; a diferença de 90,91 kg é água retirada. Compare a recomendação com esta alternativa incorreta: Registrar toda a redução de massa como alimento perdido. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.fao.org/4/x5039e/x5039e00.htm",
      "https://www.fao.org/4/x5065e/x5065E0a.htm"
    ],
    "region": "africa"
  },
  {
    "id": "af-fila-de-pre-resfriamento-de-hortalicas-de-exportacao",
    "title": "Fila de pré-resfriamento de hortaliças de exportação",
    "track": "logistics",
    "role": "Planejador de cadeia fria agrícola",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um packing house no Quênia recebe três lotes de 400 kg às 8h e dispõe de duas posições de resfriamento com ciclo de 90 minutos; cada lote ocupa uma posição.",
    "decision": "Iniciar dois lotes às 8h e o terceiro às 9h30, registrando 90 minutos de espera para o último e a necessidade de avaliar seu risco de qualidade.",
    "misconception": "Prometer resfriamento simultâneo dos três lotes com duas posições.",
    "changedConstraint": "O segundo ciclo aumenta para 120 minutos por indisponibilidade parcial.",
    "tasks": [
      "Cronograma das posições de frio",
      "Registro de chegada por lote",
      "Matriz de prioridade por sensibilidade",
      "Cálculo de espera e ciclo",
      "Plano de contingência de capacidade",
      "Painel de cumprimento da janela"
    ],
    "method": "Modele cada posição como recurso exclusivo e represente chegada, início, término e espera por lote. Não some capacidade de duas posições como se um lote pudesse ocupar uma fração de ambas sem validação. Considere separadamente tempo até entrar no frio e duração necessária para resfriar o produto. Priorize com critério documentado de sensibilidade e janela comercial. Estabeleça a identidade do lote antes de comparar indicadores. Uma perda física é diferença de massa na mesma base; perda econômica também inclui desclassificação e preço. Uma variação de umidade altera massa sem representar necessariamente deterioração. Registre amostragem, instrumento, horário e incerteza. Separe autorização sanitária de planejamento operacional: o exercício não autoriza aplicação de químicos nem liberação de alimento. Construa uma decisão rastreável que outra pessoa consiga reproduzir com a mesma base.",
    "workedExample": "Duas posições iniciam às 8h e encerram às 9h30. O lote restante aguarda de 8h a 9h30 e termina às 11h. O prazo do terceiro lote é diferente do primeiro mesmo com igual duração de ciclo, por isso a média de ciclo não descreve sua exposição. No dossiê de fila de pré-resfriamento de hortaliças de exportação, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Iniciar dois lotes às 8h e o terceiro às 9h30, registrando 90 minutos de espera para o último e a necessidade de avaliar seu risco de qualidade. Compare a recomendação com esta alternativa incorreta: Prometer resfriamento simultâneo dos três lotes com duas posições. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.fao.org/energy/news-and-events/news/news-details/cooling-the-chain--cutting-the-waste/en",
      "https://log.logcluster.org/en/cold-chain"
    ],
    "region": "africa"
  },
  {
    "id": "af-amostragem-de-qualidade-em-sacarias-de-sorgo",
    "title": "Amostragem de qualidade em sacarias de sorgo",
    "track": "quality",
    "role": "Assistente de controle de grãos",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um armazém do Senegal tem 120 sacarias em seis pilhas; a equipe examina 12 sacas apenas na pilha próxima à porta.",
    "decision": "Distribuir a amostra entre as seis pilhas e registrar seleção e posição; a amostra de conveniência não representa o armazém.",
    "misconception": "Generalizar o resultado das 12 sacas da porta para as 120 sacarias.",
    "changedConstraint": "Uma pilha foi recebida em data diferente e precisa de estrato próprio.",
    "tasks": [
      "Plano de amostragem por pilha",
      "Mapa de localização das sacas",
      "Registro de seleção aleatória",
      "Ficha de condição observada",
      "Comparação de estratos",
      "Relatório de limites amostrais"
    ],
    "method": "Construa uma lista de unidades elegíveis e defina estratos antes de selecionar. Uma alocação proporcional de duas sacas por pilha cobre as seis pilhas neste exercício, mas não cria automaticamente precisão estatística suficiente. Registre o procedimento de aleatorização e a posição de acesso. Condições distintas de recebimento podem exigir estratificação por lote e inspeção adicional. Estabeleça a identidade do lote antes de comparar indicadores. Uma perda física é diferença de massa na mesma base; perda econômica também inclui desclassificação e preço. Uma variação de umidade altera massa sem representar necessariamente deterioração. Registre amostragem, instrumento, horário e incerteza. Separe autorização sanitária de planejamento operacional: o exercício não autoriza aplicação de químicos nem liberação de alimento. Construa uma decisão rastreável que outra pessoa consiga reproduzir com a mesma base.",
    "workedExample": "A amostra inicial cobre 10% das sacas, mas somente uma das seis posições de armazenamento. Distribuir 12 seleções em seis pilhas gera duas por pilha. Se a sexta pilha vier de outro recebimento, compare seus resultados separadamente antes de qualquer resumo conjunto. No dossiê de amostragem de qualidade em sacarias de sorgo, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Distribuir a amostra entre as seis pilhas e registrar seleção e posição; a amostra de conveniência não representa o armazém. Compare a recomendação com esta alternativa incorreta: Generalizar o resultado das 12 sacas da porta para as 120 sacarias. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.fao.org/sustainable-food-value-chains/training-and-learning-center/details-materials/es/c/263157/",
      "https://www.fao.org/4/x5039e/x5039e00.htm"
    ],
    "region": "africa"
  },
  {
    "id": "af-reconciliacao-de-cacau-por-origem-e-fermentacao",
    "title": "Reconciliação de cacau por origem e fermentação",
    "track": "data",
    "role": "Analista de rastreabilidade agrícola",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma associação da Costa do Marfim recebe 300 kg do produtor A e 200 kg do B; a mistura gera lote de 480 kg após processamento registrado.",
    "decision": "Manter ligação dos dois fornecedores ao lote resultante e registrar rendimento de 96%, sem atribuir fisicamente cada quilo a um fornecedor.",
    "misconception": "Declarar que o lote final veio somente do produtor A porque sua entrega foi maior.",
    "changedConstraint": "Parte da entrega B perde documentação de origem.",
    "tasks": [
      "Grafo de transformação de lotes",
      "Registro de fornecedores elegíveis",
      "Memória de rendimento",
      "Tabela de eventos de mistura",
      "Fila de exceções documentais",
      "Plano de segregação de origem"
    ],
    "method": "Represente transformação como evento entre lotes de entrada e saída. Preserve quantidade e identidade de todos os participantes, incluindo perdas declaradas e ajustes. Quando ocorre mistura, a rastreabilidade passa a ser de conjunto de origens, salvo segregação física comprovada. Um rateio contábil pode repartir custos, porém não prova proveniência física exclusiva de uma fração. Estabeleça a identidade do lote antes de comparar indicadores. Uma perda física é diferença de massa na mesma base; perda econômica também inclui desclassificação e preço. Uma variação de umidade altera massa sem representar necessariamente deterioração. Registre amostragem, instrumento, horário e incerteza. Separe autorização sanitária de planejamento operacional: o exercício não autoriza aplicação de químicos nem liberação de alimento. Construa uma decisão rastreável que outra pessoa consiga reproduzir com a mesma base.",
    "workedExample": "As entradas somam 500 kg e a saída 480 kg, portanto o rendimento é 480 dividido por 500, ou 96%. Um rateio proporcional alocaria 288 e 192 kg para cálculo administrativo, mas o registro de origem do lote deve continuar apontando A e B. No dossiê de reconciliação de cacau por origem e fermentação, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Manter ligação dos dois fornecedores ao lote resultante e registrar rendimento de 96%, sem atribuir fisicamente cada quilo a um fornecedor. Compare a recomendação com esta alternativa incorreta: Declarar que o lote final veio somente do produtor A porque sua entrega foi maior. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/systematic-recording-and-support-documentation",
      "https://www.fao.org/4/y5143e/y5143e00.htm"
    ],
    "region": "africa"
  },
  {
    "id": "af-viabilidade-de-caixas-retornaveis-para-tomate",
    "title": "Viabilidade de caixas retornáveis para tomate",
    "track": "business",
    "role": "Analista de operações hortícolas",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma rota nigeriana usa 100 embalagens por viagem; a descartável custa 2 unidades, e a retornável custa 20, com limpeza de 0,50 por uso e vida útil prevista de 20 usos.",
    "decision": "Comparar custo de 1,50 por uso da retornável com 2 da descartável, antes de adicionar retorno, perdas e financiamento.",
    "misconception": "Comparar 20 com 2 e rejeitar o retorno sem considerar os usos.",
    "changedConstraint": "Dez por cento das caixas não retornam após cada viagem.",
    "tasks": [
      "Planilha de custo por utilização",
      "Mapa do ciclo de retorno",
      "Registro de perdas de caixas",
      "Simulação de vida útil",
      "Plano de higienização documental",
      "Parecer de adoção condicionada"
    ],
    "method": "Distribua aquisição pelo número esperado de usos efetivamente realizados, acrescentando limpeza, transporte reverso e reposição. Não use vida útil técnica como sinônimo de recuperação logística garantida. Modele a taxa de retorno por viagem e identifique o ponto em que perdas anulam a economia. A análise econômica deve preservar requisitos de segurança e compatibilidade do material. Estabeleça a identidade do lote antes de comparar indicadores. Uma perda física é diferença de massa na mesma base; perda econômica também inclui desclassificação e preço. Uma variação de umidade altera massa sem representar necessariamente deterioração. Registre amostragem, instrumento, horário e incerteza. Separe autorização sanitária de planejamento operacional: o exercício não autoriza aplicação de químicos nem liberação de alimento. Construa uma decisão rastreável que outra pessoa consiga reproduzir com a mesma base.",
    "workedExample": "A parcela de aquisição por uso é 20 dividido por 20, igual a 1. Com limpeza de 0,50, o total parcial é 1,50. Para 100 embalagens, a economia parcial por viagem seria 50 unidades, porém o retorno de caixas e as perdas ainda não entraram na conta. No dossiê de viabilidade de caixas retornáveis para tomate, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Comparar custo de 1,50 por uso da retornável com 2 da descartável, antes de adicionar retorno, perdas e financiamento. Compare a recomendação com esta alternativa incorreta: Comparar 20 com 2 e rejeitar o retorno sem considerar os usos. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/reverse-logistics",
      "https://www.fao.org/energy/news-and-events/news/news-details/cooling-the-chain--cutting-the-waste/en"
    ],
    "region": "africa"
  },
  {
    "id": "af-programacao-de-secadores-solares-de-mandioca",
    "title": "Programação de secadores solares de mandioca",
    "track": "industry",
    "role": "Planejador de processamento rural",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma unidade em Uganda recebe 900 kg de produto preparado, dispõe de três bandejas de 100 kg e executa um ciclo completo por dia.",
    "decision": "Programar três dias de processamento com capacidade de 300 kg por dia e verificar conservação do material que aguarda.",
    "misconception": "Prometer concluir 900 kg em um dia porque existem três bandejas.",
    "changedConstraint": "A previsão operacional reduz a capacidade diária em um terço.",
    "tasks": [
      "Plano de ocupação de bandejas",
      "Balanço diário de estoque",
      "Registro de condições de secagem",
      "Cronograma de recebimento",
      "Cenário de baixa capacidade",
      "Checklist de liberação por responsável"
    ],
    "method": "Transforme capacidade por bandeja em capacidade por ciclo e, depois, por período. Separe massa de entrada e rendimento de produto seco, que exigem bases diferentes. A fila de matéria-prima precisa de condição de conservação própria; capacidade futura não elimina deterioração durante espera. Registre critério técnico de finalização e valide condições do processo com pessoal competente. Estabeleça a identidade do lote antes de comparar indicadores. Uma perda física é diferença de massa na mesma base; perda econômica também inclui desclassificação e preço. Uma variação de umidade altera massa sem representar necessariamente deterioração. Registre amostragem, instrumento, horário e incerteza. Separe autorização sanitária de planejamento operacional: o exercício não autoriza aplicação de químicos nem liberação de alimento. Construa uma decisão rastreável que outra pessoa consiga reproduzir com a mesma base.",
    "workedExample": "Três bandejas de 100 kg permitem iniciar 300 kg por dia. Dividindo 900 por 300, obtêm-se três dias em capacidade nominal. O estoque que aguarda é 600 kg após o primeiro carregamento e 300 kg após o segundo; esses valores orientam a organização do recebimento. No dossiê de programação de secadores solares de mandioca, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Programar três dias de processamento com capacidade de 300 kg por dia e verificar conservação do material que aguarda. Compare a recomendação com esta alternativa incorreta: Prometer concluir 900 kg em um dia porque existem três bandejas. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/inventory-planning-and-management",
      "https://www.unep.org/resources/report/cleaner-production-training-resource-package"
    ],
    "region": "africa"
  },
  {
    "id": "af-indice-de-perdas-de-pescado-em-mercados-costeiros",
    "title": "Índice de perdas de pescado em mercados costeiros",
    "track": "data",
    "role": "Analista de perdas alimentares",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um mercado de Moçambique recebe 800 kg de pescado e rejeita 40 kg no recebimento; durante a venda, mais 38 kg dos 760 aceitos são descartados.",
    "decision": "Registrar 5% de rejeição inicial e 5% de descarte após aceite, com perda combinada de 78 sobre 800, ou 9,75%.",
    "misconception": "Somar os dois percentuais e afirmar perda exata de 10%.",
    "changedConstraint": "O registro de descarte mistura peso de gelo e pescado.",
    "tasks": [
      "Dicionário de perdas por etapa",
      "Formulário de pesagem líquida",
      "Reconciliação de bases",
      "Indicador de perda combinada",
      "Plano de separação de gelo",
      "Relatório de causas por mercado"
    ],
    "method": "Defina o denominador de cada taxa antes de agregá-la. Perdas sequenciais incidem sobre massas diferentes, portanto taxas de etapas não se somam diretamente. Use peso líquido de produto e mantenha embalagens e gelo em campos próprios. Para avaliar intervenção, compare mercados ou períodos com condições semelhantes de espécie, conservação e canal de venda. Estabeleça a identidade do lote antes de comparar indicadores. Uma perda física é diferença de massa na mesma base; perda econômica também inclui desclassificação e preço. Uma variação de umidade altera massa sem representar necessariamente deterioração. Registre amostragem, instrumento, horário e incerteza. Separe autorização sanitária de planejamento operacional: o exercício não autoriza aplicação de químicos nem liberação de alimento. Construa uma decisão rastreável que outra pessoa consiga reproduzir com a mesma base.",
    "workedExample": "No recebimento, 40 dividido por 800 representa 5%. Na etapa seguinte, 38 dividido por 760 também representa 5%. A perda total é 40 mais 38, igual a 78 kg; 78 dividido por 800 resulta em 9,75%, porque a segunda taxa atua sobre uma base menor. No dossiê de índice de perdas de pescado em mercados costeiros, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Registrar 5% de rejeição inicial e 5% de descarte após aceite, com perda combinada de 78 sobre 800, ou 9,75%. Compare a recomendação com esta alternativa incorreta: Somar os dois percentuais e afirmar perda exata de 10%. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.fao.org/energy/news-and-events/news/news-details/cooling-the-chain--cutting-the-waste/en",
      "https://log.logcluster.org/en/monitoring-logistics-performance"
    ],
    "region": "africa"
  },
  {
    "id": "af-planejamento-de-coleta-leiteira-com-janelas-rurais",
    "title": "Planejamento de coleta leiteira com janelas rurais",
    "track": "logistics",
    "role": "Coordenador de coleta de alimentos",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Três pontos rurais em Ruanda fornecem 150, 200 e 250 litros; o veículo tem capacidade de 500 litros e a entrega deve preservar as condições previstas no protocolo local.",
    "decision": "Dividir a coleta em viagens ou contratar capacidade adicional; os 600 litros excedem em 100 a capacidade nominal.",
    "misconception": "Transportar 600 litros declarando que o limite de 500 é apenas uma média.",
    "changedConstraint": "O ponto de 250 litros antecipa a janela de entrega.",
    "tasks": [
      "Matriz de volumes por ponto",
      "Roteiro por janela de coleta",
      "Controle de capacidade por trecho",
      "Plano de contingência de veículo",
      "Registro de entrega por recipiente",
      "Comparativo de custos de rota"
    ],
    "method": "Calcule carga acumulada após cada parada e não apenas carga média. Uma rota pode cumprir distância e falhar por capacidade, tempo ou condição de conservação. Defina janelas de coleta e entrega, tempos de serviço e restrições de acesso. Compare viagem adicional com veículo maior sob a mesma cobertura, preservando rastreabilidade e critérios técnicos de transporte. Estabeleça a identidade do lote antes de comparar indicadores. Uma perda física é diferença de massa na mesma base; perda econômica também inclui desclassificação e preço. Uma variação de umidade altera massa sem representar necessariamente deterioração. Registre amostragem, instrumento, horário e incerteza. Separe autorização sanitária de planejamento operacional: o exercício não autoriza aplicação de químicos nem liberação de alimento. Construa uma decisão rastreável que outra pessoa consiga reproduzir com a mesma base.",
    "workedExample": "A soma de 150, 200 e 250 é 600 litros. Qualquer rota única com o veículo informado ultrapassa 500, independentemente da ordem das paradas. Uma proposta com duas viagens de 350 e 250 litros respeita capacidade, mas ainda precisa testar tempo de retorno e janelas de atendimento. No dossiê de planejamento de coleta leiteira com janelas rurais, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Dividir a coleta em viagens ou contratar capacidade adicional; os 600 litros excedem em 100 a capacidade nominal. Compare a recomendação com esta alternativa incorreta: Transportar 600 litros declarando que o limite de 500 é apenas uma média. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/road-transport",
      "https://log.logcluster.org/en/cold-chain"
    ],
    "region": "africa"
  },
  {
    "id": "af-custos-de-beneficiamento-de-castanha-por-lote",
    "title": "Custos de beneficiamento de castanha por lote",
    "track": "business",
    "role": "Analista de custos agroindustriais",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma unidade de processamento em Benim gasta 900 unidades em um lote e obtém 180 kg de produto comercializável mais 60 kg de subproduto ainda sem venda.",
    "decision": "Calcular custo conservador de 5 por kg comercializável, separando eventual crédito de subproduto apenas quando houver base verificável.",
    "misconception": "Dividir 900 por 240 e assumir que todo subproduto tem o mesmo valor do produto principal.",
    "changedConstraint": "A recuperação comercial cai para 150 kg.",
    "tasks": [
      "Ficha de custo por lote",
      "Mapa de rendimento comercial",
      "Registro de subprodutos",
      "Sensibilidade a recuperação",
      "Memória de rateio de custos",
      "Painel de margem por canal"
    ],
    "method": "Distinga produto principal, subproduto com mercado e resíduo sem receita comprovada. Um rateio físico pode distorcer rentabilidade quando os valores econômicos diferem. Para decisão inicial, calcule cenário sem receita de subproduto e cenário com receita documentada. Registre custo variável, custo fixo absorvido e rendimento do lote, mantendo o método de comparação consistente. Estabeleça a identidade do lote antes de comparar indicadores. Uma perda física é diferença de massa na mesma base; perda econômica também inclui desclassificação e preço. Uma variação de umidade altera massa sem representar necessariamente deterioração. Registre amostragem, instrumento, horário e incerteza. Separe autorização sanitária de planejamento operacional: o exercício não autoriza aplicação de químicos nem liberação de alimento. Construa uma decisão rastreável que outra pessoa consiga reproduzir com a mesma base.",
    "workedExample": "Sem venda comprovada do subproduto, distribua 900 unidades pelos 180 kg comercializáveis: 5 por kg. Dividir por 240 produziria 3,75, mas atribuiria capacidade econômica não demonstrada aos 60 kg restantes. O cenário de receita adicional deve ser explícito e separado da conclusão conservadora. No dossiê de custos de beneficiamento de castanha por lote, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Calcular custo conservador de 5 por kg comercializável, separando eventual crédito de subproduto apenas quando houver base verificável. Compare a recomendação com esta alternativa incorreta: Dividir 900 por 240 e assumir que todo subproduto tem o mesmo valor do produto principal. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.unep.org/resources/report/cleaner-production-training-resource-package",
      "https://log.logcluster.org/en/monitoring-logistics-performance"
    ],
    "region": "africa"
  },
  {
    "id": "af-rastreio-de-sementes-comunitarias-e-germinacao",
    "title": "Rastreio de sementes comunitárias e germinação",
    "track": "quality",
    "role": "Assistente de bancos de sementes",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um banco comunitário na Tanzânia testa 100 sementes do lote X e observa 82 germinações; o lote Y tem 40 observações e 36 germinações.",
    "decision": "Registrar estimativas de 82% e 90% com tamanhos amostrais distintos, sem concluir superioridade definitiva apenas pelos pontos estimados.",
    "misconception": "Somar germinações e comparar os lotes como se ambos tivessem 100 sementes.",
    "changedConstraint": "O lote Y foi testado em condição de temperatura diferente.",
    "tasks": [
      "Ficha de identidade do lote",
      "Protocolo de amostragem",
      "Registro de condições do ensaio",
      "Cálculo de germinação observada",
      "Comparação de incerteza",
      "Plano de repetição controlada"
    ],
    "method": "A taxa observada é número de germinações dividido por número de sementes efetivamente avaliadas. Preserve data, condições de ensaio e critério de germinação; diferenças de ambiente podem explicar resultados. Uma porcentagem maior com amostra pequena não garante desempenho superior. Planeje repetição com condições comparáveis e mantenha rastreabilidade de lote sem transformar o exercício em certificação oficial. Estabeleça a identidade do lote antes de comparar indicadores. Uma perda física é diferença de massa na mesma base; perda econômica também inclui desclassificação e preço. Uma variação de umidade altera massa sem representar necessariamente deterioração. Registre amostragem, instrumento, horário e incerteza. Separe autorização sanitária de planejamento operacional: o exercício não autoriza aplicação de químicos nem liberação de alimento. Construa uma decisão rastreável que outra pessoa consiga reproduzir com a mesma base.",
    "workedExample": "O lote X tem 82 sobre 100, ou 82%. O lote Y tem 36 sobre 40, ou 90%. A diferença é de oito pontos percentuais, porém o segundo ensaio tem menos observações e condições ainda precisam ser comparadas. Relatar 36% para Y seria usar denominador incorreto. No dossiê de rastreio de sementes comunitárias e germinação, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Registrar estimativas de 82% e 90% com tamanhos amostrais distintos, sem concluir superioridade definitiva apenas pelos pontos estimados. Compare a recomendação com esta alternativa incorreta: Somar germinações e comparar os lotes como se ambos tivessem 100 sementes. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.fao.org/4/i3704e/i3704e.pdf",
      "https://www.fao.org/4/x5039e/x5039e00.htm"
    ],
    "region": "africa"
  },
  {
    "id": "af-perfil-de-demanda-para-minirredes-de-mercados-rurais",
    "title": "Perfil de demanda para minirredes de mercados rurais",
    "track": "energy",
    "role": "Analista de minirredes",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um mercado queniano tem 20 bancas com 0,1 kW durante seis horas e duas câmaras de 1 kW durante dez horas; a simultaneidade foi confirmada.",
    "decision": "Estimar energia diária de 32 kWh e pico informado de 4 kW, antes de perdas e cargas adicionais.",
    "misconception": "Usar 32 kWh como potência de pico.",
    "changedConstraint": "As câmaras passam a funcionar 14 horas por dia.",
    "tasks": [
      "Inventário de cargas",
      "Curva horária de demanda",
      "Memória de energia diária",
      "Tabela de simultaneidade",
      "Cenário de expansão",
      "Lista de medições faltantes"
    ],
    "method": "Construa uma tabela com potência, quantidade e duração por equipamento. Calcule energia de cada classe multiplicando essas três entradas e represente sobreposição dos horários. Pico depende da coincidência temporal, não da soma de energias diárias. Identifique carga crítica, sazonalidade e crescimento antes de estimar capacidade. O resultado é um diagnóstico preliminar, sujeito a medições. Diferencie potência instantânea, expressa em quilowatts, e energia acumulada, expressa em quilowatts-hora. Converta todos os intervalos para a mesma unidade antes de agregar. Preserve condição de operação, indisponibilidade e fonte de medição. Dimensionamento preliminar não autoriza instalação nem intervenção elétrica. Trabalhe somente com dados de simulação e encaminhe critérios de proteção e conformidade para profissional habilitado. A recomendação deve identificar qual hipótese pode alterar sua escolha e qual medição reduziria essa incerteza.",
    "workedExample": "As bancas consomem 20 vezes 0,1 vezes 6, ou 12 kWh. As câmaras consomem 2 vezes 1 vezes 10, ou 20 kWh. O total diário é 32 kWh. Quando todas operam juntas, a potência é 2 mais 2, totalizando 4 kW. No dossiê de perfil de demanda para minirredes de mercados rurais, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Estimar energia diária de 32 kWh e pico informado de 4 kW, antes de perdas e cargas adicionais. Compare a recomendação com esta alternativa incorreta: Usar 32 kWh como potência de pico. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.esmap.org/publications/mini-grids-half-billion-people-market-outlook-and-handbook-decision-makers",
      "https://www.esmap.org/node/1009"
    ],
    "region": "africa"
  },
  {
    "id": "af-conciliacao-de-medidores-pre-pagos-de-minirrede",
    "title": "Conciliação de medidores pré-pagos de minirrede",
    "track": "data",
    "role": "Analista de receitas energéticas",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma rede em Serra Leoa registra 1200 kWh entregues e 1080 kWh debitados em clientes no mesmo período; 40 kWh correspondem a consumo autorizado interno.",
    "decision": "Separar 40 kWh de uso interno e investigar os 80 kWh restantes, equivalentes a 6,67% da energia entregue.",
    "misconception": "Classificar os 120 kWh inteiros como fraude confirmada.",
    "changedConstraint": "Dois medidores registram fechamento em horário diferente.",
    "tasks": [
      "Balanço de energia comercial",
      "Inventário de medidores",
      "Ajuste de períodos de leitura",
      "Fila de diferenças",
      "Relatório de consumo interno",
      "Plano de investigação de perdas"
    ],
    "method": "Alinhe períodos de leitura antes de comparar geração, entrega e faturamento. Diferencie perdas técnicas, consumo autorizado e divergência comercial não explicada. Uma diferença contábil não comprova fraude. Faça reconciliação por trecho e registre medidor ausente, fator de transformação e sincronização. Use limiar de investigação documentado, preservando a capacidade de reconstituir cada ajuste. Diferencie potência instantânea, expressa em quilowatts, e energia acumulada, expressa em quilowatts-hora. Converta todos os intervalos para a mesma unidade antes de agregar. Preserve condição de operação, indisponibilidade e fonte de medição. Dimensionamento preliminar não autoriza instalação nem intervenção elétrica. Trabalhe somente com dados de simulação e encaminhe critérios de proteção e conformidade para profissional habilitado. A recomendação deve identificar qual hipótese pode alterar sua escolha e qual medição reduziria essa incerteza.",
    "workedExample": "A diferença inicial é 1200 menos 1080, igual a 120 kWh. Subtraindo 40 kWh autorizados, ficam 80 para investigação. Dividir 80 por 1200 produz 6,67%. Essa medida identifica uma lacuna de balanço e não sua causa física ou responsabilidade individual. No dossiê de conciliação de medidores pré-pagos de minirrede, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Separar 40 kWh de uso interno e investigar os 80 kWh restantes, equivalentes a 6,67% da energia entregue. Compare a recomendação com esta alternativa incorreta: Classificar os 120 kWh inteiros como fraude confirmada. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.esmap.org/publications/mini-grids-half-billion-people-market-outlook-and-handbook-decision-makers",
      "https://docs.nlr.gov/docs/fy19osti/73822.pdf"
    ],
    "region": "africa"
  },
  {
    "id": "af-autonomia-de-baterias-para-telecomunicacao-rural",
    "title": "Autonomia de baterias para telecomunicação rural",
    "track": "energy",
    "role": "Planejador de continuidade energética",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma estação fictícia na Nigéria tem bateria de 20 kWh, fração utilizável de 80%, eficiência de 90% e carga constante de 2 kW.",
    "decision": "Estimar 14,4 kWh entregáveis e autonomia de 7,2 horas sob as hipóteses fornecidas.",
    "misconception": "Prometer dez horas usando a capacidade nominal inteira.",
    "changedConstraint": "A carga sobe para 2,5 kW durante manutenção de rede.",
    "tasks": [
      "Memória de energia útil",
      "Perfil de carga da estação",
      "Cenário de autonomia",
      "Inventário de limites operacionais",
      "Plano de priorização de cargas",
      "Registro de hipóteses de eficiência"
    ],
    "method": "Calcule energia útil com capacidade nominal, fração utilizável e eficiência na mesma fronteira de sistema. Divida pela carga somente quando ela puder ser aproximada como constante. Degradação, temperatura e picos podem reduzir a autonomia real. Diferencie planejamento de continuidade de especificação de proteção elétrica. Documente quais parâmetros são fornecidos, medidos ou apenas estimados no cenário. Diferencie potência instantânea, expressa em quilowatts, e energia acumulada, expressa em quilowatts-hora. Converta todos os intervalos para a mesma unidade antes de agregar. Preserve condição de operação, indisponibilidade e fonte de medição. Dimensionamento preliminar não autoriza instalação nem intervenção elétrica. Trabalhe somente com dados de simulação e encaminhe critérios de proteção e conformidade para profissional habilitado. A recomendação deve identificar qual hipótese pode alterar sua escolha e qual medição reduziria essa incerteza.",
    "workedExample": "Vinte vezes 0,80 gera 16 kWh antes da eficiência de entrega. Multiplicando por 0,90, restam 14,4 kWh disponíveis à carga. Dividir por 2 kW resulta em 7,2 horas. A conta de 20 dividido por 2 ignora as restrições explicitamente fornecidas. No dossiê de autonomia de baterias para telecomunicação rural, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Estimar 14,4 kWh entregáveis e autonomia de 7,2 horas sob as hipóteses fornecidas. Compare a recomendação com esta alternativa incorreta: Prometer dez horas usando a capacidade nominal inteira. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.nlr.gov/docs/fy19osti/73822.pdf",
      "https://www.esmap.org/publications/mini-grids-half-billion-people-market-outlook-and-handbook-decision-makers"
    ],
    "region": "africa"
  },
  {
    "id": "af-comparacao-de-contratos-de-bombeamento-solar",
    "title": "Comparação de contratos de bombeamento solar",
    "track": "business",
    "role": "Analista comercial de energia produtiva",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma cooperativa de Zâmbia compara aluguel de 300 unidades mensais com compra de 12000 e manutenção anual de 600; horizonte de cinco anos sem desconto.",
    "decision": "Comparar aluguel total de 18000 com compra e manutenção de 15000, declarando que financiamento, risco e valor residual ainda faltam.",
    "misconception": "Declarar compra superior em qualquer situação apenas pelo total sem desconto.",
    "changedConstraint": "O contrato de aluguel inclui substituição em falha e a compra não.",
    "tasks": [
      "Fluxo de desembolsos",
      "Quadro de escopo contratual",
      "Cálculo de custo no horizonte",
      "Matriz de risco de falha",
      "Sensibilidade de manutenção",
      "Memorando de decisão comercial"
    ],
    "method": "Escolha o horizonte e a unidade monetária antes de somar propostas. Compare coberturas equivalentes: manutenção, disponibilidade, transporte, garantia e reposição podem diferir. Uma comparação sem desconto é útil como triagem, mas não mede custo de capital. Registre cláusulas e riscos transferidos. Não confunda menor desembolso previsto com garantia de menor custo em todos os estados possíveis. Diferencie potência instantânea, expressa em quilowatts, e energia acumulada, expressa em quilowatts-hora. Converta todos os intervalos para a mesma unidade antes de agregar. Preserve condição de operação, indisponibilidade e fonte de medição. Dimensionamento preliminar não autoriza instalação nem intervenção elétrica. Trabalhe somente com dados de simulação e encaminhe critérios de proteção e conformidade para profissional habilitado. A recomendação deve identificar qual hipótese pode alterar sua escolha e qual medição reduziria essa incerteza.",
    "workedExample": "O aluguel soma 300 vezes 60 meses, igual a 18000. A compra custa 12000 mais cinco parcelas anuais de 600, chegando a 15000. A diferença simples é 3000. Se houver falha fora de garantia, a diferença pode diminuir ou se inverter; isso precisa de cenário próprio. No dossiê de comparação de contratos de bombeamento solar, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Comparar aluguel total de 18000 com compra e manutenção de 15000, declarando que financiamento, risco e valor residual ainda faltam. Compare a recomendação com esta alternativa incorreta: Declarar compra superior em qualquer situação apenas pelo total sem desconto. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.esmap.org/publications/mini-grids-half-billion-people-market-outlook-and-handbook-decision-makers",
      "https://docs.nlr.gov/docs/fy19osti/73822.pdf"
    ],
    "region": "africa"
  },
  {
    "id": "af-indicadores-de-disponibilidade-de-sistemas-solares-comunitarios",
    "title": "Indicadores de disponibilidade de sistemas solares comunitários",
    "track": "data",
    "role": "Analista de desempenho energético",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um sistema em Malawi deveria operar 200 horas no mês, teve 12 horas de manutenção programada e oito de falha; o contrato inclui ambas como indisponibilidade.",
    "decision": "Reportar disponibilidade contratual de 90%, com 20 horas indisponíveis sobre 200 previstas.",
    "misconception": "Excluir manutenção programada contra a definição contratual e publicar 96%.",
    "changedConstraint": "O próximo contrato passa a excluir quatro horas programadas.",
    "tasks": [
      "Dicionário de disponibilidade",
      "Registro de eventos de parada",
      "Linha temporal consolidada",
      "Memória de indicador contratual",
      "Comparação de definições",
      "Plano de redução de falhas"
    ],
    "method": "Defina período elegível e regras de exclusão antes de calcular o indicador. Consolide eventos sobrepostos para não contar a mesma hora duas vezes. Separe causa, duração e responsabilidade contratual. Apresente disponibilidade técnica e contratual em campos distintos quando as fronteiras diferirem. Um indicador comparável depende de regra estável e dados completos, não apenas de porcentagem alta. Diferencie potência instantânea, expressa em quilowatts, e energia acumulada, expressa em quilowatts-hora. Converta todos os intervalos para a mesma unidade antes de agregar. Preserve condição de operação, indisponibilidade e fonte de medição. Dimensionamento preliminar não autoriza instalação nem intervenção elétrica. Trabalhe somente com dados de simulação e encaminhe critérios de proteção e conformidade para profissional habilitado. A recomendação deve identificar qual hipótese pode alterar sua escolha e qual medição reduziria essa incerteza.",
    "workedExample": "Doze horas programadas mais oito horas de falha totalizam 20, assumindo ausência de sobreposição. A operação disponível é 180 de 200 horas, ou 90%. Oito horas isoladas representariam 4%, mas esse cálculo não respeita a regra contratual informada para o mês. No dossiê de indicadores de disponibilidade de sistemas solares comunitários, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reportar disponibilidade contratual de 90%, com 20 horas indisponíveis sobre 200 previstas. Compare a recomendação com esta alternativa incorreta: Excluir manutenção programada contra a definição contratual e publicar 96%. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.nlr.gov/docs/fy19osti/73822.pdf",
      "https://log.logcluster.org/en/monitoring-logistics-performance"
    ],
    "region": "africa"
  },
  {
    "id": "af-previsao-de-pecas-de-reposicao-para-kits-solares",
    "title": "Previsão de peças de reposição para kits solares",
    "track": "logistics",
    "role": "Planejador de assistência solar",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma carteira na Tanzânia tem 1000 controladores; a taxa anual observada de substituição é 4%, e o prazo de fornecimento é três meses com demanda uniforme no exercício.",
    "decision": "Estimar consumo médio de dez controladores durante o prazo e acrescentar estoque de segurança com base em variabilidade explicitada.",
    "misconception": "Manter 40 peças como demanda de três meses sem ajustar o período.",
    "changedConstraint": "O fornecedor aumenta o prazo para seis meses.",
    "tasks": [
      "Base de equipamentos instalados",
      "Histórico de falhas",
      "Previsão de consumo no prazo",
      "Política de estoque de segurança",
      "Plano de ressuprimento",
      "Painel de obsolescência"
    ],
    "method": "Converta taxa anual em volume esperado no período de cobertura, deixando explícita a hipótese de uniformidade. Diferencie estoque para consumo médio e proteção contra incerteza. Equipamentos novos e antigos podem apresentar comportamentos diferentes, exigindo segmentação por idade ou modelo. Mantenha compatibilidade e substituição autorizada no cadastro. Uma média histórica não elimina risco de falhas correlacionadas. Diferencie potência instantânea, expressa em quilowatts, e energia acumulada, expressa em quilowatts-hora. Converta todos os intervalos para a mesma unidade antes de agregar. Preserve condição de operação, indisponibilidade e fonte de medição. Dimensionamento preliminar não autoriza instalação nem intervenção elétrica. Trabalhe somente com dados de simulação e encaminhe critérios de proteção e conformidade para profissional habilitado. A recomendação deve identificar qual hipótese pode alterar sua escolha e qual medição reduziria essa incerteza.",
    "workedExample": "Quatro por cento de 1000 equivale a 40 substituições anuais. Três meses representam um quarto do ano, então a demanda média no prazo é dez peças. Esse número não é recomendação final de estoque; falta definir variação de consumo, nível de serviço e possibilidade de remanejamento. No dossiê de previsão de peças de reposição para kits solares, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Estimar consumo médio de dez controladores durante o prazo e acrescentar estoque de segurança com base em variabilidade explicitada. Compare a recomendação com esta alternativa incorreta: Manter 40 peças como demanda de três meses sem ajustar o período. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.nlr.gov/docs/fy19osti/73822.pdf",
      "https://log.logcluster.org/en/inventory-control"
    ],
    "region": "africa"
  },
  {
    "id": "af-analise-de-perdas-por-sombreamento-em-carteiras-fotovoltaicas",
    "title": "Análise de perdas por sombreamento em carteiras fotovoltaicas",
    "track": "energy",
    "role": "Analista de dados solares",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Dois sistemas comparáveis em Marrocos produzem 100 e 85 kWh em um dia; o segundo tem sombra registrada, mas também uma hora sem medição.",
    "decision": "Tratar os 15 kWh como diferença observada e investigar a lacuna antes de atribuir tudo ao sombreamento.",
    "misconception": "Afirmar perda causal de 15% por sombra ignorando a hora ausente.",
    "changedConstraint": "O sensor de irradiância apresenta deriva de calibração.",
    "tasks": [
      "Tabela de comparabilidade",
      "Máscara de dados ausentes",
      "Indicador de produção específica",
      "Registro de sombreamento",
      "Plano de validação de sensores",
      "Relatório de atribuição limitada"
    ],
    "method": "Normalize produção por capacidade instalada e compare períodos de irradiância e temperatura compatíveis. Marque dados ausentes sem preenchê-los automaticamente como zero. Um sistema de referência ajuda a detectar diferença, porém não isola causalidade quando há falhas de medição ou condições distintas. Documente critérios de exclusão e teste a conclusão com e sem períodos incompletos. Diferencie potência instantânea, expressa em quilowatts, e energia acumulada, expressa em quilowatts-hora. Converta todos os intervalos para a mesma unidade antes de agregar. Preserve condição de operação, indisponibilidade e fonte de medição. Dimensionamento preliminar não autoriza instalação nem intervenção elétrica. Trabalhe somente com dados de simulação e encaminhe critérios de proteção e conformidade para profissional habilitado. A recomendação deve identificar qual hipótese pode alterar sua escolha e qual medição reduziria essa incerteza.",
    "workedExample": "A diferença observada é 100 menos 85, ou 15 kWh, correspondente a 15% do primeiro sistema. Como existe uma hora sem registro, o total do segundo pode estar subestimado. A análise correta abre uma investigação de completude antes de estimar a parcela atribuível à sombra. No dossiê de análise de perdas por sombreamento em carteiras fotovoltaicas, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Tratar os 15 kWh como diferença observada e investigar a lacuna antes de atribuir tudo ao sombreamento. Compare a recomendação com esta alternativa incorreta: Afirmar perda causal de 15% por sombra ignorando a hora ausente. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.nlr.gov/docs/fy19osti/73822.pdf",
      "https://www.energy.gov/cmei/femp/decision-tree-optimizing-solar-photovoltaic-systems"
    ],
    "region": "africa"
  },
  {
    "id": "af-planejamento-de-consumo-produtivo-em-minirredes",
    "title": "Planejamento de consumo produtivo em minirredes",
    "track": "energy",
    "role": "Analista de desenvolvimento de carga",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma minirrede senegalesa dispõe de excedente diário de 18 kWh entre 10h e 16h; um moinho usa 3 kW por quatro horas e um resfriador 2 kW por quatro horas.",
    "decision": "Reconhecer demanda de 20 kWh e propor ajuste de operação ou capacidade; o excedente informado não atende integralmente os dois usos.",
    "misconception": "Aprovar os dois usos porque cada equipamento isolado cabe no excedente.",
    "changedConstraint": "A janela de excedente cai de seis para quatro horas.",
    "tasks": [
      "Mapa de excedente horário",
      "Perfil de usos produtivos",
      "Cálculo de energia requerida",
      "Quadro de simultaneidade",
      "Cenários de escalonamento",
      "Proposta de teste de carga"
    ],
    "method": "Compare energia disponível e potência por intervalo, pois atender uma restrição não garante atender a outra. Para cada uso produtivo, registre duração mínima, possibilidade de interrupção e valor operacional. Um escalonamento pode reduzir pico, mas não cria energia adicional. Considere conservação do produto e segurança antes de deslocar horários. A proposta precisa declarar qual serviço fica limitado. Diferencie potência instantânea, expressa em quilowatts, e energia acumulada, expressa em quilowatts-hora. Converta todos os intervalos para a mesma unidade antes de agregar. Preserve condição de operação, indisponibilidade e fonte de medição. Dimensionamento preliminar não autoriza instalação nem intervenção elétrica. Trabalhe somente com dados de simulação e encaminhe critérios de proteção e conformidade para profissional habilitado. A recomendação deve identificar qual hipótese pode alterar sua escolha e qual medição reduziria essa incerteza.",
    "workedExample": "O moinho demanda 3 vezes 4, ou 12 kWh. O resfriador demanda 2 vezes 4, ou 8 kWh. Somam 20, dois acima do excedente diário de 18. Alternar horários pode evitar pico simultâneo, mas os dois kWh faltantes permanecem como restrição energética. No dossiê de planejamento de consumo produtivo em minirredes, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reconhecer demanda de 20 kWh e propor ajuste de operação ou capacidade; o excedente informado não atende integralmente os dois usos. Compare a recomendação com esta alternativa incorreta: Aprovar os dois usos porque cada equipamento isolado cabe no excedente. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.esmap.org/publications/mini-grids-half-billion-people-market-outlook-and-handbook-decision-makers",
      "https://www.esmap.org/Accelerating-the-Productive-Use-of-Electricity"
    ],
    "region": "africa"
  },
  {
    "id": "af-orcamento-de-cozinhas-limpas-por-refeicao-entregue",
    "title": "Orçamento de cozinhas limpas por refeição entregue",
    "track": "business",
    "role": "Analista de programas de energia doméstica",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um programa no Quênia compara tecnologia A com custo mensal de 600 para 1000 refeições aceitas e B com 550 para 800, sem dados de exposição ou emissões.",
    "decision": "Comparar custo de 0,60 e 0,6875 por refeição aceita, mantendo saúde e emissões fora da conclusão até haver medição.",
    "misconception": "Escolher B como mais eficiente apenas porque seu gasto mensal é menor.",
    "changedConstraint": "A taxa de refeições aceitas de A cai 15%.",
    "tasks": [
      "Definição de refeição aceita",
      "Planilha de custo unitário",
      "Inventário de dados ambientais",
      "Registro de rejeição",
      "Cenário de escala",
      "Quadro de evidência de benefícios"
    ],
    "method": "Defina unidade funcional antes de comparar tecnologias: uma refeição entregue sob critério equivalente é diferente de uma hora de uso. Inclua combustível, manutenção, treinamento e reposição quando disponíveis. Custos não provam efeito sanitário nem redução de emissões; esses resultados exigem protocolo próprio. Separe análise econômica, desempenho de serviço e evidência ambiental para evitar conclusões além dos dados. Diferencie potência instantânea, expressa em quilowatts, e energia acumulada, expressa em quilowatts-hora. Converta todos os intervalos para a mesma unidade antes de agregar. Preserve condição de operação, indisponibilidade e fonte de medição. Dimensionamento preliminar não autoriza instalação nem intervenção elétrica. Trabalhe somente com dados de simulação e encaminhe critérios de proteção e conformidade para profissional habilitado. A recomendação deve identificar qual hipótese pode alterar sua escolha e qual medição reduziria essa incerteza.",
    "workedExample": "A tem custo de 600 dividido por 1000, igual a 0,60 por refeição. B custa 550 dividido por 800, ou 0,6875. O menor gasto total de B acompanha menor entrega. Sob a unidade funcional definida, A tem custo menor, sem que isso estabeleça superioridade ambiental ou clínica. No dossiê de orçamento de cozinhas limpas por refeição entregue, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Comparar custo de 0,60 e 0,6875 por refeição aceita, mantendo saúde e emissões fora da conclusão até haver medição. Compare a recomendação com esta alternativa incorreta: Escolher B como mais eficiente apenas porque seu gasto mensal é menor. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.who.int/publications/i/item/9789241548885",
      "https://www.esmap.org/publications/mini-grids-half-billion-people-market-outlook-and-handbook-decision-makers"
    ],
    "region": "africa"
  },
  {
    "id": "af-triagem-documental-de-projetos-de-biogas-rural",
    "title": "Triagem documental de projetos de biogás rural",
    "track": "quality",
    "role": "Assistente de projetos bioenergéticos",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma proposta em Uganda promete 100 unidades diárias de gás, mas o balanço de alimentação documenta apenas 60% da matéria-prima usada no cálculo.",
    "decision": "Registrar lacuna de 40% na alimentação e solicitar revisão do balanço antes de aceitar a produção prometida.",
    "misconception": "Extrapolar produção nominal sem verificar disponibilidade da alimentação.",
    "changedConstraint": "Metade da matéria-prima comprovada tem uso concorrente contratado.",
    "tasks": [
      "Matriz de disponibilidade de insumos",
      "Balanço documental de alimentação",
      "Registro de usos concorrentes",
      "Revisão de hipótese de produção",
      "Lista de permissões necessárias",
      "Parecer de prontidão do projeto"
    ],
    "method": "Revise a cadeia de hipóteses entre disponibilidade de insumo, composição, processo e produção utilizável. Potencial técnico não equivale a fornecimento diário garantido. Verifique sazonalidade, transporte e usos concorrentes. Registre fronteira do balanço e não combine rendimentos de bases incompatíveis. A triagem é documental; operação de digestores e riscos de gases exigem projeto e pessoal habilitados. Diferencie potência instantânea, expressa em quilowatts, e energia acumulada, expressa em quilowatts-hora. Converta todos os intervalos para a mesma unidade antes de agregar. Preserve condição de operação, indisponibilidade e fonte de medição. Dimensionamento preliminar não autoriza instalação nem intervenção elétrica. Trabalhe somente com dados de simulação e encaminhe critérios de proteção e conformidade para profissional habilitado. A recomendação deve identificar qual hipótese pode alterar sua escolha e qual medição reduziria essa incerteza.",
    "workedExample": "Se a projeção usa 100 partes de alimentação e apenas 60 estão comprovadas, faltam 40 partes, ou 40%. Não é correto manter a previsão de gás sem revisão. Também não se pode presumir proporcionalidade exata sem verificar composição e desempenho do processo; a conclusão imediata é insuficiência documental. No dossiê de triagem documental de projetos de biogás rural, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Registrar lacuna de 40% na alimentação e solicitar revisão do balanço antes de aceitar a produção prometida. Compare a recomendação com esta alternativa incorreta: Extrapolar produção nominal sem verificar disponibilidade da alimentação. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.unep.org/resources/report/cleaner-production-training-resource-package",
      "https://www.esmap.org/publications/mini-grids-half-billion-people-market-outlook-and-handbook-decision-makers"
    ],
    "region": "africa"
  },
  {
    "id": "af-balanco-de-agua-nao-faturada-em-pequenos-operadores",
    "title": "Balanço de água não faturada em pequenos operadores",
    "track": "data",
    "role": "Analista de desempenho hídrico",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um operador em Gana registra 10000 m³ de entrada, 6500 faturados e 500 de consumo autorizado não faturado.",
    "decision": "Separar 500 m³ autorizados e 3000 m³ de perdas aparentes ou reais ainda não discriminadas; água não faturada totaliza 35%.",
    "misconception": "Classificar os 3500 m³ não faturados como vazamento confirmado.",
    "changedConstraint": "Uma leitura de entrada abrange dois dias adicionais.",
    "tasks": [
      "Balanço de volumes",
      "Calendário de leituras",
      "Cadastro de usos autorizados",
      "Indicador de água não faturada",
      "Plano de investigação de perdas",
      "Registro de qualidade de medição"
    ],
    "method": "Construa uma fronteira de sistema e alinhe todos os medidores ao mesmo período. Água não faturada inclui consumo autorizado sem cobrança e perdas que ainda precisam de classificação. Diferença de balanço não identifica vazamento automaticamente. Revise estimativas, conexões e precisão de medidores antes de atribuir causas. Publique componentes conhecidos e a parcela não explicada em campos separados. A gestão operacional de água exige distinguir volume, vazão, qualidade e continuidade. Uma boa média diária pode ocultar interrupções que afetam bairros específicos. Registre local, momento, unidade, instrumento e responsável pelo dado; preserve ausências como ausências. Amostragem e decisões sanitárias devem seguir protocolo local e pessoal habilitado. Neste laboratório, trabalhe com registros fictícios e não prescreva dosagens. Compare alternativas explicando benefício, custo de execução, cobertura e limitação da evidência utilizada.",
    "workedExample": "De 10000 m³, 6500 geraram fatura, deixando 3500 não faturados. O índice é 3500 dividido por 10000, ou 35%. Destes, 500 são uso autorizado já identificado; os 3000 restantes precisam de investigação técnica e comercial. A distinção muda prioridades sem inventar causa. No dossiê de balanço de água não faturada em pequenos operadores, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Separar 500 m³ autorizados e 3000 m³ de perdas aparentes ou reais ainda não discriminadas; água não faturada totaliza 35%. Compare a recomendação com esta alternativa incorreta: Classificar os 3500 m³ não faturados como vazamento confirmado. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://ppp.worldbank.org/library/basics-non-revenue-water-and-water-balance",
      "https://www.who.int/publications/i/item/9789240067691"
    ],
    "region": "africa"
  },
  {
    "id": "af-continuidade-de-abastecimento-por-bairro-e-horario",
    "title": "Continuidade de abastecimento por bairro e horário",
    "track": "data",
    "role": "Analista de serviços de água",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Dois bairros de uma cidade no Quênia têm serviço de 20 e oito horas diárias; suas populações atendidas são 1000 e 3000 pessoas.",
    "decision": "Calcular média ponderada de 11 horas por pessoa e apresentar também os dois bairros separadamente.",
    "misconception": "Publicar média simples de 14 horas como experiência média dos moradores.",
    "changedConstraint": "O bairro maior perde mais duas horas de serviço.",
    "tasks": [
      "Matriz bairro-horário",
      "Base de população atendida",
      "Média ponderada de continuidade",
      "Mapa de desigualdade",
      "Registro de interrupções",
      "Plano de monitoramento por área"
    ],
    "method": "Escolha ponderação coerente com a pergunta. Média por bairro e média por pessoa respondem a problemas distintos. Preserve distribuição e duração de interrupções, pois uma média pode esconder desvantagem concentrada. Registre população usada, data e cobertura. Use cortes temporais comparáveis e acompanhe disponibilidade em horários relevantes para escolas, trabalho e atividades domésticas. A gestão operacional de água exige distinguir volume, vazão, qualidade e continuidade. Uma boa média diária pode ocultar interrupções que afetam bairros específicos. Registre local, momento, unidade, instrumento e responsável pelo dado; preserve ausências como ausências. Amostragem e decisões sanitárias devem seguir protocolo local e pessoal habilitado. Neste laboratório, trabalhe com registros fictícios e não prescreva dosagens. Compare alternativas explicando benefício, custo de execução, cobertura e limitação da evidência utilizada.",
    "workedExample": "Multiplique 20 horas por 1000 pessoas e oito por 3000. A soma é 44000 pessoa-horas. Dividindo por 4000 pessoas, obtêm-se 11 horas. A média simples de 14 dá peso igual aos bairros, embora três quartos dos moradores estejam na área com menor continuidade. No dossiê de continuidade de abastecimento por bairro e horário, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Calcular média ponderada de 11 horas por pessoa e apresentar também os dois bairros separadamente. Compare a recomendação com esta alternativa incorreta: Publicar média simples de 14 horas como experiência média dos moradores. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.dhis2.org/en/implement/data-quality/analysis.html",
      "https://www.who.int/publications/i/item/9789240067691"
    ],
    "region": "africa"
  },
  {
    "id": "af-prioridade-de-reparo-em-bombas-comunitarias",
    "title": "Prioridade de reparo em bombas comunitárias",
    "track": "business",
    "role": "Coordenador de manutenção hídrica",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Três bombas em Malawi atendem 200, 500 e 300 pessoas; a segunda está parada e as outras têm falhas não impeditivas. Há orçamento para uma visita inicial.",
    "decision": "Priorizar avaliação da bomba parada que atende 500 pessoas, considerando alternativas de acesso e riscos documentados.",
    "misconception": "Escolher a bomba mais próxima apenas para aumentar número de visitas.",
    "changedConstraint": "A comunidade da primeira bomba perde sua fonte alternativa.",
    "tasks": [
      "Matriz de criticidade",
      "Cadastro de usuários por bomba",
      "Registro de fontes alternativas",
      "Ordem de serviço priorizada",
      "Plano de visita",
      "Memória de critérios sociais"
    ],
    "method": "Construa prioridade com consequência da falha, número de usuários, alternativas de acesso e urgência. Distância e facilidade de execução entram no planejamento, mas não devem substituir criticidade. Separe inspeção, diagnóstico e reparo autorizado. Registre limitações e consulte usuários sobre horários e barreiras de acesso. A ordenação precisa ser revisável quando condições das comunidades mudam. A gestão operacional de água exige distinguir volume, vazão, qualidade e continuidade. Uma boa média diária pode ocultar interrupções que afetam bairros específicos. Registre local, momento, unidade, instrumento e responsável pelo dado; preserve ausências como ausências. Amostragem e decisões sanitárias devem seguir protocolo local e pessoal habilitado. Neste laboratório, trabalhe com registros fictícios e não prescreva dosagens. Compare alternativas explicando benefício, custo de execução, cobertura e limitação da evidência utilizada.",
    "workedExample": "A bomba parada concentra 500 dos 1000 usuários dos três pontos. Isso não torna os outros 500 irrelevantes, mas indica consequência imediata maior no cenário original. A visita inicial deve verificar segurança e possibilidade de recuperação, sem prometer reparo antes do diagnóstico e das peças. No dossiê de prioridade de reparo em bombas comunitárias, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Priorizar avaliação da bomba parada que atende 500 pessoas, considerando alternativas de acesso e riscos documentados. Compare a recomendação com esta alternativa incorreta: Escolher a bomba mais próxima apenas para aumentar número de visitas. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.who.int/publications/i/item/9789240067691",
      "https://log.logcluster.org/en/fleet-management"
    ],
    "region": "africa"
  },
  {
    "id": "af-planejamento-de-rotas-de-esvaziamento-de-fossas",
    "title": "Planejamento de rotas de esvaziamento de fossas",
    "track": "logistics",
    "role": "Planejador de serviços de saneamento",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um operador na Tanzânia recebe três solicitações de 2, 3 e 4 m³; o veículo tem tanque de 6 m³ e deve descarregar em instalação autorizada.",
    "decision": "Planejar pelo menos duas viagens de carga, como 2 mais 4 e depois 3 m³, validando rota e destino autorizado.",
    "misconception": "Somar nove m³ em uma viagem de tanque de seis.",
    "changedConstraint": "A instalação de destino reduz sua janela de recebimento.",
    "tasks": [
      "Agenda de solicitações",
      "Matriz de capacidade por viagem",
      "Cadastro de destino autorizado",
      "Cronograma de descarga",
      "Cenário de restrição de horário",
      "Registro de comprovantes de recebimento"
    ],
    "method": "Modele coleta e descarga como eventos de capacidade limitada. Volume estimado precisa de confirmação e margem operacional; não trate tanque nominal como autorização para exceder carga. Inclua tempo de serviço, acesso, deslocamento e recebimento no destino. Operação sanitária requer equipe e procedimentos adequados. O exercício limita-se ao planejamento documental, mantendo cadeia de custódia do material. A gestão operacional de água exige distinguir volume, vazão, qualidade e continuidade. Uma boa média diária pode ocultar interrupções que afetam bairros específicos. Registre local, momento, unidade, instrumento e responsável pelo dado; preserve ausências como ausências. Amostragem e decisões sanitárias devem seguir protocolo local e pessoal habilitado. Neste laboratório, trabalhe com registros fictícios e não prescreva dosagens. Compare alternativas explicando benefício, custo de execução, cobertura e limitação da evidência utilizada.",
    "workedExample": "As solicitações somam nove m³, acima dos seis disponíveis. Uma combinação de dois e quatro ocupa seis, e a solicitação de três exige nova viagem após descarga. Esse arranjo atende volume, mas pode falhar por janela do destino; por isso o cronograma precisa incorporar o horário de recebimento. No dossiê de planejamento de rotas de esvaziamento de fossas, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Planejar pelo menos duas viagens de carga, como 2 mais 4 e depois 3 m³, validando rota e destino autorizado. Compare a recomendação com esta alternativa incorreta: Somar nove m³ em uma viagem de tanque de seis. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.who.int/publications/i/item/9789240062887",
      "https://log.logcluster.org/en/road-transport"
    ],
    "region": "africa"
  },
  {
    "id": "af-cobertura-funcional-de-pontos-de-lavagem-em-escolas",
    "title": "Cobertura funcional de pontos de lavagem em escolas",
    "track": "care",
    "role": "Analista de infraestrutura escolar",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma rede de 20 escolas possui 30 pontos instalados, dos quais 18 têm água e insumo disponíveis na visita; 12 escolas têm ao menos um ponto funcional.",
    "decision": "Reportar 60% dos pontos funcionais e 60% das escolas com cobertura funcional, preservando os denominadores distintos.",
    "misconception": "Divulgar 150% de cobertura porque existem 30 pontos para 20 escolas.",
    "changedConstraint": "Cinco pontos deixam de ter insumo no turno da tarde.",
    "tasks": [
      "Inventário de pontos escolares",
      "Critério de funcionalidade",
      "Registro por turno",
      "Indicador de cobertura por escola",
      "Plano de reposição de insumos",
      "Painel de pendências de manutenção"
    ],
    "method": "Defina funcionalidade com critérios observáveis e aplique-os por momento de visita. Número de instalações não equivale a disponibilidade do serviço. Calcule indicador por ponto e por escola sem misturar unidades. Registre se o local atende diferentes turnos e necessidades de acessibilidade. A análise de cobertura deve orientar reposição e manutenção, não apenas contar infraestrutura construída. A gestão operacional de água exige distinguir volume, vazão, qualidade e continuidade. Uma boa média diária pode ocultar interrupções que afetam bairros específicos. Registre local, momento, unidade, instrumento e responsável pelo dado; preserve ausências como ausências. Amostragem e decisões sanitárias devem seguir protocolo local e pessoal habilitado. Neste laboratório, trabalhe com registros fictícios e não prescreva dosagens. Compare alternativas explicando benefício, custo de execução, cobertura e limitação da evidência utilizada.",
    "workedExample": "De 30 pontos instalados, 18 funcionam, ou 60%. Das 20 escolas, 12 dispõem de ao menos um funcional, também 60%, mas por coincidência numérica. As duas medidas não são intercambiáveis: uma escola pode concentrar muitos pontos enquanto outras ficam sem serviço. No dossiê de cobertura funcional de pontos de lavagem em escolas, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reportar 60% dos pontos funcionais e 60% das escolas com cobertura funcional, preservando os denominadores distintos. Compare a recomendação com esta alternativa incorreta: Divulgar 150% de cobertura porque existem 30 pontos para 20 escolas. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://washdata.org/monitoring/schools",
      "https://www.who.int/publications/i/item/9789240067691"
    ],
    "region": "africa"
  },
  {
    "id": "af-qualidade-de-dados-de-amostras-de-agua",
    "title": "Qualidade de dados de amostras de água",
    "track": "quality",
    "role": "Assistente de monitoramento hídrico",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma campanha em Moçambique coleta 40 amostras; seis não têm horário, quatro não têm localização e duas pertencem a ambos os grupos.",
    "decision": "Registrar oito amostras com ao menos uma lacuna e 32 completas, sem somar duplicadamente as duas comuns.",
    "misconception": "Declarar dez amostras incompletas somando seis e quatro.",
    "changedConstraint": "O laboratório devolve três identificadores sem correspondência.",
    "tasks": [
      "Dicionário de campos obrigatórios",
      "Registro de cadeia de custódia",
      "Validação de identificadores",
      "Contagem de completude",
      "Fila de correção documental",
      "Relatório de adequação analítica"
    ],
    "method": "Valide identificador, local, horário, protocolo e condição de transporte antes de interpretar resultados laboratoriais. Para contar registros com múltiplas falhas, use união de conjuntos em vez de soma simples. Preserve correções com autor e data, mantendo o original. Uma lacuna documental pode limitar uso do resultado; não a substitua por valor inventado para melhorar completude. A gestão operacional de água exige distinguir volume, vazão, qualidade e continuidade. Uma boa média diária pode ocultar interrupções que afetam bairros específicos. Registre local, momento, unidade, instrumento e responsável pelo dado; preserve ausências como ausências. Amostragem e decisões sanitárias devem seguir protocolo local e pessoal habilitado. Neste laboratório, trabalhe com registros fictícios e não prescreva dosagens. Compare alternativas explicando benefício, custo de execução, cobertura e limitação da evidência utilizada.",
    "workedExample": "Seis amostras sem horário e quatro sem local somam dez ocorrências de falha. Duas amostras aparecem nas duas listas, então existem oito registros afetados. Quarenta menos oito deixa 32 completos. A taxa de completude é 80%, mas ainda depende de outros campos exigidos pelo protocolo. No dossiê de qualidade de dados de amostras de água, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Registrar oito amostras com ao menos uma lacuna e 32 completas, sem somar duplicadamente as duas comuns. Compare a recomendação com esta alternativa incorreta: Declarar dez amostras incompletas somando seis e quatro. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.who.int/publications/i/item/9789240067691",
      "https://docs.dhis2.org/en/implement/data-quality/analysis.html"
    ],
    "region": "africa"
  },
  {
    "id": "af-custo-do-abastecimento-por-caminhao-e-ponto-atendido",
    "title": "Custo do abastecimento por caminhão e ponto atendido",
    "track": "business",
    "role": "Analista de operações de abastecimento",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma rota em Angola custa 1200 unidades e entrega 18000 litros em seis pontos; outra custa 900 e entrega 9000 litros em três pontos.",
    "decision": "Comparar custos de 0,0667 e 0,10 por litro entregue, preservando diferenças de acesso e qualidade do serviço.",
    "misconception": "Escolher a segunda rota apenas pelo custo total menor.",
    "changedConstraint": "A primeira rota perde 2000 litros por entrega não concluída.",
    "tasks": [
      "Planilha de custo por litro",
      "Registro de volume entregue",
      "Mapa de pontos atendidos",
      "Indicador de entrega não concluída",
      "Cenário de rota alternativa",
      "Quadro de equidade de cobertura"
    ],
    "method": "Use volume efetivamente recebido como denominador, distinguindo carregamento e entrega. Compare cobertura geográfica e acessibilidade, pois uma rota mais cara pode atender locais sem alternativa. Inclua tempo, combustível, limpeza e descarte quando disponíveis. Não use redução de custo para justificar serviço inadequado. Apresente eficiência econômica junto de continuidade e condições de atendimento. A gestão operacional de água exige distinguir volume, vazão, qualidade e continuidade. Uma boa média diária pode ocultar interrupções que afetam bairros específicos. Registre local, momento, unidade, instrumento e responsável pelo dado; preserve ausências como ausências. Amostragem e decisões sanitárias devem seguir protocolo local e pessoal habilitado. Neste laboratório, trabalhe com registros fictícios e não prescreva dosagens. Compare alternativas explicando benefício, custo de execução, cobertura e limitação da evidência utilizada.",
    "workedExample": "A primeira rota custa 1200 dividido por 18000, aproximadamente 0,0667 por litro. A segunda custa 900 dividido por 9000, ou 0,10. A primeira parece mais eficiente por volume no cenário, mas a decisão ainda precisa considerar quem é atendido e se as condições de serviço são equivalentes. No dossiê de custo do abastecimento por caminhão e ponto atendido, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Comparar custos de 0,0667 e 0,10 por litro entregue, preservando diferenças de acesso e qualidade do serviço. Compare a recomendação com esta alternativa incorreta: Escolher a segunda rota apenas pelo custo total menor. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/road-transport",
      "https://www.who.int/publications/i/item/9789240067691"
    ],
    "region": "africa"
  },
  {
    "id": "af-dimensionamento-administrativo-de-reservas-de-agua",
    "title": "Dimensionamento administrativo de reservas de água",
    "track": "business",
    "role": "Planejador de continuidade de instalações",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma instalação comunitária no Senegal consome 4 m³ diários e tem reserva útil de 12 m³; o consumo estimado inclui todos os usos autorizados.",
    "decision": "Estimar três dias de autonomia em consumo constante, separando reserva útil de capacidade nominal.",
    "misconception": "Prometer quatro dias usando um tanque nominal de 16 m³ que tem apenas 12 úteis.",
    "changedConstraint": "O consumo aumenta 25% durante evento local.",
    "tasks": [
      "Cadastro de volume útil",
      "Histórico de consumo diário",
      "Cálculo de autonomia",
      "Plano de usos prioritários",
      "Cenário de demanda ampliada",
      "Agenda de verificação da reserva"
    ],
    "method": "Defina volume disponível efetivo e consumo na mesma unidade. Autonomia simples supõe demanda constante e ausência de reposição; declare essa hipótese. Diferencie capacidade nominal, volume inacessível e reserva operacional protegida. Considere variação diária e usos prioritários com responsáveis locais. O planejamento não substitui inspeção estrutural, sanitária ou critérios de potabilidade da instalação. A gestão operacional de água exige distinguir volume, vazão, qualidade e continuidade. Uma boa média diária pode ocultar interrupções que afetam bairros específicos. Registre local, momento, unidade, instrumento e responsável pelo dado; preserve ausências como ausências. Amostragem e decisões sanitárias devem seguir protocolo local e pessoal habilitado. Neste laboratório, trabalhe com registros fictícios e não prescreva dosagens. Compare alternativas explicando benefício, custo de execução, cobertura e limitação da evidência utilizada.",
    "workedExample": "Doze m³ úteis divididos por quatro m³ diários fornecem três dias. Usar 16 m³ nominais resultaria em quatro dias e superestimaria disponibilidade em um terço. Com acréscimo de 25% no consumo, a demanda sobe a cinco m³ por dia e a autonomia cai para 2,4 dias. No dossiê de dimensionamento administrativo de reservas de água, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Estimar três dias de autonomia em consumo constante, separando reserva útil de capacidade nominal. Compare a recomendação com esta alternativa incorreta: Prometer quatro dias usando um tanque nominal de 16 m³ que tem apenas 12 úteis. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.who.int/publications/i/item/9789240067691",
      "https://log.logcluster.org/en/inventory-control"
    ],
    "region": "africa"
  },
  {
    "id": "af-monitoramento-de-perdas-em-redes-de-irrigacao-comunitaria",
    "title": "Monitoramento de perdas em redes de irrigação comunitária",
    "track": "data",
    "role": "Analista de eficiência de irrigação",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um canal em Marrocos recebe 500 m³ no período e entrega 350 aos usuários; 50 m³ correspondem a armazenamento final maior que o inicial.",
    "decision": "Registrar 100 m³ não explicados após variação de estoque, sem tratar os 150 m³ de diferença bruta como perda.",
    "misconception": "Ignorar a variação de armazenamento e publicar perda de 30%.",
    "changedConstraint": "A medição de entrega foi feita em intervalo menor.",
    "tasks": [
      "Balanço de canal",
      "Registro de níveis de armazenamento",
      "Alinhamento temporal de vazões",
      "Indicador de diferença não explicada",
      "Mapa de pontos de medição",
      "Plano de redução de incerteza"
    ],
    "method": "Aplique conservação de volume com entradas, entregas, variação de estoque e demais saídas documentadas. Integre vazão ao longo do tempo somente com intervalos consistentes. Diferença não explicada pode incluir erro de medição e não apenas perda física. Separe estimativa de evaporação ou infiltração de observação medida. Registre a incerteza dos instrumentos e do período de comparação. A gestão operacional de água exige distinguir volume, vazão, qualidade e continuidade. Uma boa média diária pode ocultar interrupções que afetam bairros específicos. Registre local, momento, unidade, instrumento e responsável pelo dado; preserve ausências como ausências. Amostragem e decisões sanitárias devem seguir protocolo local e pessoal habilitado. Neste laboratório, trabalhe com registros fictícios e não prescreva dosagens. Compare alternativas explicando benefício, custo de execução, cobertura e limitação da evidência utilizada.",
    "workedExample": "A diferença entre entrada e entrega é 150 m³. Como o armazenamento aumentou 50 m³, esse volume continua no sistema e não deve ser chamado de perda. Restam 100 m³ para explicar, equivalentes a 20% da entrada. A reconciliação depende de medições no mesmo intervalo. No dossiê de monitoramento de perdas em redes de irrigação comunitária, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Registrar 100 m³ não explicados após variação de estoque, sem tratar os 150 m³ de diferença bruta como perda. Compare a recomendação com esta alternativa incorreta: Ignorar a variação de armazenamento e publicar perda de 30%. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.fao.org/aquastat/en/overview/methodology/",
      "https://www.who.int/publications/i/item/9789240067691"
    ],
    "region": "africa"
  },
  {
    "id": "af-gestao-de-filas-e-acesso-em-quiosques-de-agua",
    "title": "Gestão de filas e acesso em quiosques de água",
    "track": "business",
    "role": "Analista de experiência de serviços essenciais",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um quiosque em Ruanda atende uma pessoa a cada três minutos; chegam 30 pessoas por hora durante duas horas, sem fila inicial.",
    "decision": "Reconhecer capacidade de 20 pessoas por hora e crescimento esperado de dez pessoas na fila por hora sob o cenário simplificado.",
    "misconception": "Afirmar que todos serão atendidos sem espera porque o quiosque funciona continuamente.",
    "changedConstraint": "Metade dos usuários precisa de atendimento com duração de cinco minutos.",
    "tasks": [
      "Observação sintética de chegadas",
      "Medição de tempos de serviço",
      "Balanço de fila por intervalo",
      "Plano de organização de acesso",
      "Cenário de atendimento diferenciado",
      "Indicador de espera por usuário"
    ],
    "method": "Converta tempo de serviço em capacidade por período e compare com chegadas. Quando demanda sustentada supera capacidade, a fila cresce mesmo que o serviço nunca pare. Médias ocultam variabilidade e necessidades de usuários; não use o modelo para impor espera excludente. Teste horários, pontos adicionais ou organização de demanda com participação local e registro de efeitos. A gestão operacional de água exige distinguir volume, vazão, qualidade e continuidade. Uma boa média diária pode ocultar interrupções que afetam bairros específicos. Registre local, momento, unidade, instrumento e responsável pelo dado; preserve ausências como ausências. Amostragem e decisões sanitárias devem seguir protocolo local e pessoal habilitado. Neste laboratório, trabalhe com registros fictícios e não prescreva dosagens. Compare alternativas explicando benefício, custo de execução, cobertura e limitação da evidência utilizada.",
    "workedExample": "Sessenta minutos divididos por três geram capacidade de 20 atendimentos por hora. Com 30 chegadas, entram dez pessoas além da capacidade a cada hora. Após duas horas, o saldo simplificado é de 20 aguardando. O modelo não estima distribuição individual de espera sem dados de chegada e variabilidade. No dossiê de gestão de filas e acesso em quiosques de água, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reconhecer capacidade de 20 pessoas por hora e crescimento esperado de dez pessoas na fila por hora sob o cenário simplificado. Compare a recomendação com esta alternativa incorreta: Afirmar que todos serão atendidos sem espera porque o quiosque funciona continuamente. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/monitoring-logistics-performance",
      "https://www.who.int/publications/i/item/9789240067691"
    ],
    "region": "africa"
  },
  {
    "id": "af-liquidez-de-agentes-de-dinheiro-movel-em-dias-de-pagamento",
    "title": "Liquidez de agentes de dinheiro móvel em dias de pagamento",
    "track": "business",
    "role": "Analista de redes de agentes financeiros",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um agente no Quênia abre com 800 unidades em caixa; a previsão do dia inclui saques de 1200 e depósitos em dinheiro de 300, sem reposição intermediária.",
    "decision": "Projetar falta de 100 unidades e programar reposição antes do pico, além de verificar o saldo eletrônico.",
    "misconception": "Somar saques e depósitos como se ambos aumentassem o caixa.",
    "changedConstraint": "Os depósitos previstos chegam somente após o pico de saques.",
    "tasks": [
      "Projeção de caixa por hora",
      "Projeção de saldo eletrônico",
      "Mapa de dias de pagamento",
      "Plano de reposição segura",
      "Indicador de transação recusada",
      "Procedimento de escalonamento"
    ],
    "method": "Modele os dois lados da operação: saque reduz caixa e aumenta saldo eletrônico; depósito faz o inverso. Use ordem temporal, pois saldo final positivo não garante atendimento no pico. Segmente demanda por dia e evento local. Defina limites de operação e reposição autorizada sem expor valores reais ou rotas sensíveis. A recomendação precisa tratar simultaneamente disponibilidade e segurança. Uma operação financeira tem identificador, estado, valor, moeda, horário e participante autorizado. Não confunda solicitação, autorização, liquidação e estorno. Reconcilie razão de transações com saldo de abertura e fechamento, preservando movimentos pendentes. Dados pessoais devem ser substituídos por identificadores sintéticos. Os limites regulatórios dependem do país e precisam de validação local; os números do caso não são limites legais. A solução deve permitir auditoria sem expor credenciais, documentos ou dinheiro de clientes reais.",
    "workedExample": "O caixa projetado no fechamento é 800 mais 300 menos 1200, igual a menos 100. Isso indica insuficiência mesmo na hipótese favorável de depósitos oportunos. Se os 300 só chegarem depois dos saques, a necessidade temporária pode chegar a 400, mostrando por que o perfil horário importa. No dossiê de liquidez de agentes de dinheiro móvel em dias de pagamento, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Projetar falta de 100 unidades e programar reposição antes do pico, além de verificar o saldo eletrônico. Compare a recomendação com esta alternativa incorreta: Somar saques e depósitos como se ambos aumentassem o caixa. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/guide/are-requirements-for-using-agents-proportionate/",
      "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2024/04/Mobile_Money_Certification_Guidance.pdf"
    ],
    "region": "africa"
  },
  {
    "id": "af-reconciliacao-de-estornos-em-carteiras-moveis",
    "title": "Reconciliação de estornos em carteiras móveis",
    "track": "data",
    "role": "Analista de operações de pagamentos",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma carteira em Gana abre com 1000 unidades, recebe 200, paga 150 e registra estorno de 50 de um pagamento já incluído nos 150.",
    "decision": "Esperar saldo de 1100 e vincular o estorno ao pagamento original para evitar duplicação.",
    "misconception": "Registrar estorno como nova despesa e fechar em 1000.",
    "changedConstraint": "O estorno é solicitado hoje mas liquida amanhã.",
    "tasks": [
      "Razão de eventos de carteira",
      "Vínculo de transação e estorno",
      "Máquina de estados",
      "Reconciliação de fechamento",
      "Fila de pendências",
      "Casos de teste de duplicidade"
    ],
    "method": "Trate estorno como evento ligado à operação original, com estado e data de liquidação próprios. Não apague o pagamento do histórico. Uma solicitação de reversão não implica dinheiro disponível até confirmação. Construa soma de movimentos por estado final e controle idempotência por identificador. A trilha deve permitir reproduzir saldo sem interpretar mensagens de usuário como comprovante financeiro. Uma operação financeira tem identificador, estado, valor, moeda, horário e participante autorizado. Não confunda solicitação, autorização, liquidação e estorno. Reconcilie razão de transações com saldo de abertura e fechamento, preservando movimentos pendentes. Dados pessoais devem ser substituídos por identificadores sintéticos. Os limites regulatórios dependem do país e precisam de validação local; os números do caso não são limites legais. A solução deve permitir auditoria sem expor credenciais, documentos ou dinheiro de clientes reais.",
    "workedExample": "Comece em 1000, some o recebimento de 200 e subtraia os pagamentos de 150: saldo intermediário de 1050. O estorno confirmado devolve 50 e leva a 1100. Se ainda estiver pendente, o saldo liquidado permanece 1050, com 50 informados separadamente como valor aguardado. No dossiê de reconciliação de estornos em carteiras móveis, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Esperar saldo de 1100 e vincular o estorno ao pagamento original para evitar duplicação. Compare a recomendação com esta alternativa incorreta: Registrar estorno como nova despesa e fechar em 1000. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2024/04/Mobile_Money_Certification_Guidance.pdf",
      "https://log.logcluster.org/en/systematic-recording-and-support-documentation"
    ],
    "region": "africa"
  },
  {
    "id": "af-deteccao-de-duplicidade-em-pagamentos-offline-de-comerciantes",
    "title": "Detecção de duplicidade em pagamentos offline de comerciantes",
    "track": "data",
    "role": "Analista de integridade transacional",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um lote em Uganda contém 100 registros de pagamento de dez unidades; cinco pares repetem o mesmo identificador e nenhum outro conflito existe.",
    "decision": "Consolidar 95 identificadores únicos e 950 unidades, preservando os cinco registros excedentes para auditoria.",
    "misconception": "Somar 1000 unidades antes de deduplicar e tratar a diferença como receita.",
    "changedConstraint": "Um identificador repetido passa a ter valor divergente.",
    "tasks": [
      "Contrato de identificador transacional",
      "Regra de deduplicação",
      "Fila de conflitos de valor",
      "Reconciliação de lote offline",
      "Teste de reenvio",
      "Relatório de integridade do comerciante"
    ],
    "method": "Defina chave de idempotência antes de processar reenvios. Repetição idêntica pode ser consolidada, mas mesmo identificador com dados divergentes exige quarentena e investigação. Preserve o bruto e crie visão reconciliada em separado. Considere que sincronização offline pode chegar fora de ordem. Não deduplique somente por valor e horário, pois transações legítimas podem compartilhar esses atributos. Uma operação financeira tem identificador, estado, valor, moeda, horário e participante autorizado. Não confunda solicitação, autorização, liquidação e estorno. Reconcilie razão de transações com saldo de abertura e fechamento, preservando movimentos pendentes. Dados pessoais devem ser substituídos por identificadores sintéticos. Os limites regulatórios dependem do país e precisam de validação local; os números do caso não são limites legais. A solução deve permitir auditoria sem expor credenciais, documentos ou dinheiro de clientes reais.",
    "workedExample": "Cem linhas incluem dez linhas pertencentes a cinco pares, representando cinco eventos repetidos uma vez. Há 95 pagamentos únicos, cada um de dez unidades, totalizando 950. A diferença de 50 é duplicação de registro no cenário, não perda de dinheiro nem prova de conduta do comerciante. No dossiê de detecção de duplicidade em pagamentos offline de comerciantes, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Consolidar 95 identificadores únicos e 950 unidades, preservando os cinco registros excedentes para auditoria. Compare a recomendação com esta alternativa incorreta: Somar 1000 unidades antes de deduplicar e tratar a diferença como receita. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2024/04/Mobile_Money_Certification_Guidance.pdf",
      "https://www.postgresql.org/docs/current/ddl-constraints.html"
    ],
    "region": "africa"
  },
  {
    "id": "af-gestao-de-reclamacoes-de-transferencias-moveis-pendentes",
    "title": "Gestão de reclamações de transferências móveis pendentes",
    "track": "business",
    "role": "Coordenador de atendimento financeiro digital",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma central na Tanzânia recebe 60 reclamações: 30 operações liquidadas, 20 pendentes e dez identificadores inexistentes no sistema consultado.",
    "decision": "Separar os três estados e confirmar evidência antes de prometer reembolso; ausência no sistema consultado não prova ausência em toda a cadeia.",
    "misconception": "Devolver automaticamente o valor das 60 solicitações.",
    "changedConstraint": "O parceiro de liquidação fica temporariamente indisponível.",
    "tasks": [
      "Taxonomia de reclamações",
      "Roteiro de verificação",
      "Matriz de estados de transferência",
      "Fila de encaminhamento ao parceiro",
      "Painel de prazo por estado",
      "Modelo de resposta sem promessa indevida"
    ],
    "method": "Classifique a reclamação por estado verificável, não pelo texto emocional ou pela antiguidade isolada. Valide identificador e fronteira de consulta; parceiros podem manter estados intermediários. Separe comunicação ao cliente de ação sobre fundos, com autorização própria. Registre prazo, responsável e próximo evento esperado. Não peça credenciais secretas para localizar uma transferência e preserve acesso mínimo aos dados. Uma operação financeira tem identificador, estado, valor, moeda, horário e participante autorizado. Não confunda solicitação, autorização, liquidação e estorno. Reconcilie razão de transações com saldo de abertura e fechamento, preservando movimentos pendentes. Dados pessoais devem ser substituídos por identificadores sintéticos. Os limites regulatórios dependem do país e precisam de validação local; os números do caso não são limites legais. A solução deve permitir auditoria sem expor credenciais, documentos ou dinheiro de clientes reais.",
    "workedExample": "Trinta casos já liquidados requerem esclarecimento ou investigação do recebimento, vinte dependem de resolução de pendência e dez precisam validar o identificador ou ampliar consulta. Essas categorias somam 60, mas não autorizam o mesmo tratamento financeiro. O primeiro produto da triagem é encaminhamento correto e rastreável. No dossiê de gestão de reclamações de transferências móveis pendentes, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Separar os três estados e confirmar evidência antes de prometer reembolso; ausência no sistema consultado não prova ausência em toda a cadeia. Compare a recomendação com esta alternativa incorreta: Devolver automaticamente o valor das 60 solicitações. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2024/04/Mobile_Money_Certification_Guidance.pdf",
      "https://log.logcluster.org/en/monitoring-logistics-performance"
    ],
    "region": "africa"
  },
  {
    "id": "af-custo-de-aceitacao-digital-para-microcomercios",
    "title": "Custo de aceitação digital para microcomércios",
    "track": "business",
    "role": "Analista de serviços financeiros para pequenos negócios",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um comerciante no Senegal processa 200 pagamentos de 20 unidades; a proposta A cobra 1% por pagamento e B cobra mensalidade de 30 mais 0,5%.",
    "decision": "Comparar custo de 40 em A e 50 em B no volume informado, calculando ponto de equilíbrio de 6000 unidades transacionadas.",
    "misconception": "Escolher B apenas porque a taxa percentual é menor.",
    "changedConstraint": "O volume mensal cresce para 8000 unidades.",
    "tasks": [
      "Inventário de tarifas",
      "Cálculo de custo efetivo",
      "Ponto de equilíbrio por volume",
      "Cenário de crescimento",
      "Quadro de serviços incluídos",
      "Memorando de escolha de plano"
    ],
    "method": "Transforme taxas e mensalidade em função do volume transacionado. Se houver tarifa fixa por transação, quantidade e tíquete também importam. Compare liquidação, reembolso e suporte, pois propostas podem ter coberturas diferentes. Resolva a igualdade dos custos para identificar a fronteira de troca. Não trate projeção de vendas como receita garantida e registre impostos ou cobranças não incluídas. Uma operação financeira tem identificador, estado, valor, moeda, horário e participante autorizado. Não confunda solicitação, autorização, liquidação e estorno. Reconcilie razão de transações com saldo de abertura e fechamento, preservando movimentos pendentes. Dados pessoais devem ser substituídos por identificadores sintéticos. Os limites regulatórios dependem do país e precisam de validação local; os números do caso não são limites legais. A solução deve permitir auditoria sem expor credenciais, documentos ou dinheiro de clientes reais.",
    "workedExample": "O volume é 200 vezes 20, igual a 4000. A cobra 40. B cobra 30 mais 20, totalizando 50. Igualando 0,01V a 30 mais 0,005V, obtém-se V igual a 6000. Acima desse ponto B fica mais barato neste modelo, desde que o restante do serviço seja comparável. No dossiê de custo de aceitação digital para microcomércios, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Comparar custo de 40 em A e 50 em B no volume informado, calculando ponto de equilíbrio de 6000 unidades transacionadas. Compare a recomendação com esta alternativa incorreta: Escolher B apenas porque a taxa percentual é menor. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2024/04/Mobile_Money_Certification_Guidance.pdf",
      "https://log.logcluster.org/en/monitoring-logistics-performance"
    ],
    "region": "africa"
  },
  {
    "id": "af-monitoramento-de-disponibilidade-de-canais-ussd",
    "title": "Monitoramento de disponibilidade de canais USSD",
    "track": "data",
    "role": "Analista de canais financeiros acessíveis",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um serviço em Ruanda registra 1000 sessões, 800 concluídas, 100 abandonadas pelo usuário e 100 com erro técnico; os estados são exclusivos.",
    "decision": "Reportar conclusão de 80%, erro técnico de 10% e abandono de 10%, sem classificar todo insucesso como falha do sistema.",
    "misconception": "Publicar disponibilidade técnica de 80% usando conclusão como substituto.",
    "changedConstraint": "O operador deixa de registrar abandono de sessões sem resposta.",
    "tasks": [
      "Dicionário de estados USSD",
      "Painel de funil de sessão",
      "Taxa de erro por operadora",
      "Auditoria de ausência de evento",
      "Roteiro de teste com baixa conectividade",
      "Plano de monitoramento de acessibilidade"
    ],
    "method": "Defina o evento que inicia e encerra cada sessão e separe resultado técnico de resultado de negócio. Usuários podem abandonar um canal funcional por custo, idioma ou sequência confusa. Analise erros por operadora e horário sem revelar dados pessoais. Identifique sessões sem fechamento e evite atribuir sucesso por ausência de erro. A melhoria precisa preservar acesso em aparelhos básicos. Uma operação financeira tem identificador, estado, valor, moeda, horário e participante autorizado. Não confunda solicitação, autorização, liquidação e estorno. Reconcilie razão de transações com saldo de abertura e fechamento, preservando movimentos pendentes. Dados pessoais devem ser substituídos por identificadores sintéticos. Os limites regulatórios dependem do país e precisam de validação local; os números do caso não são limites legais. A solução deve permitir auditoria sem expor credenciais, documentos ou dinheiro de clientes reais.",
    "workedExample": "O funil contém 800 conclusões, 100 abandonos e 100 erros, somando 1000. A taxa de conclusão é 80%, mas a falha técnica observada é 10%. Uma disponibilidade de 90% também exigiria definição e monitoramento próprios; não deve ser inferida automaticamente só pela contagem de sessões. No dossiê de monitoramento de disponibilidade de canais ussd, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reportar conclusão de 80%, erro técnico de 10% e abandono de 10%, sem classificar todo insucesso como falha do sistema. Compare a recomendação com esta alternativa incorreta: Publicar disponibilidade técnica de 80% usando conclusão como substituto. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2024/04/Mobile_Money_Certification_Guidance.pdf",
      "https://docs.dhis2.org/en/implement/data-quality/analysis.html"
    ],
    "region": "africa"
  },
  {
    "id": "af-reconciliacao-de-grupos-de-poupanca-comunitaria",
    "title": "Reconciliação de grupos de poupança comunitária",
    "track": "business",
    "role": "Assistente de gestão de poupança coletiva",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um grupo em Malawi inicia com 500 unidades, recebe contribuições de 300, empresta 400 e recebe amortizações de principal de 100; não há juros no exercício.",
    "decision": "Esperar caixa de 500 e carteira de principal a receber de 300, mantendo os dois saldos separados.",
    "misconception": "Somar carteira a receber ao caixa e afirmar 800 disponíveis para saque imediato.",
    "changedConstraint": "Uma amortização de 50 é registrada sem comprovante de recebimento.",
    "tasks": [
      "Livro de contribuições",
      "Razão de empréstimos",
      "Registro de amortizações",
      "Reconciliação de caixa",
      "Mapa de principal em aberto",
      "Procedimento de conferência coletiva"
    ],
    "method": "Separe caixa, contribuições e direitos a receber. Empréstimo transforma dinheiro em crédito, sem ser despesa operacional automática; amortização de principal faz o caminho inverso. Preserve identificadores e autorização coletiva, usando nomes fictícios no estudo. Diferencie valor contratado, vencido e recebido. Uma carteira nominal não equivale a liquidez e pode exigir avaliação de recuperabilidade por responsável apropriado. Uma operação financeira tem identificador, estado, valor, moeda, horário e participante autorizado. Não confunda solicitação, autorização, liquidação e estorno. Reconcilie razão de transações com saldo de abertura e fechamento, preservando movimentos pendentes. Dados pessoais devem ser substituídos por identificadores sintéticos. Os limites regulatórios dependem do país e precisam de validação local; os números do caso não são limites legais. A solução deve permitir auditoria sem expor credenciais, documentos ou dinheiro de clientes reais.",
    "workedExample": "O caixa fecha em 500 mais 300 menos 400 mais 100, igual a 500. O principal emprestado ainda aberto é 400 menos 100, ou 300. Os 800 combinados descrevem posições patrimoniais simplificadas, mas somente 500 estão em caixa sob as hipóteses fornecidas. No dossiê de reconciliação de grupos de poupança comunitária, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Esperar caixa de 500 e carteira de principal a receber de 300, mantendo os dois saldos separados. Compare a recomendação com esta alternativa incorreta: Somar carteira a receber ao caixa e afirmar 800 disponíveis para saque imediato. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2024/04/Mobile_Money_Certification_Guidance.pdf",
      "https://log.logcluster.org/en/systematic-recording-and-support-documentation"
    ],
    "region": "africa"
  },
  {
    "id": "af-revisao-de-consentimento-em-aplicativos-de-credito",
    "title": "Revisão de consentimento em aplicativos de crédito",
    "track": "quality",
    "role": "Analista de proteção do consumidor digital",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um aplicativo fictício na Nigéria exige contatos telefônicos para simulação de crédito; a equipe não documentou necessidade e a recusa impede até consultar condições.",
    "decision": "Suspender a exigência no protótipo e revisar finalidade, necessidade, base aplicável e alternativa de acesso com responsável local.",
    "misconception": "Considerar consentimento válido apenas porque existe uma caixa marcada obrigatoriamente.",
    "changedConstraint": "O fornecedor de análise passa a pedir histórico completo de localização.",
    "tasks": [
      "Mapa de dados solicitados",
      "Matriz de finalidade e necessidade",
      "Fluxo de recusa e revogação",
      "Teste de linguagem compreensível",
      "Registro de fornecedores",
      "Plano de revisão jurídica local"
    ],
    "method": "Comece pela finalidade de cada dado e avalie se uma alternativa menos invasiva atende ao mesmo objetivo. Consentimento não deve ser tratado como solução universal para qualquer coleta; requisitos variam por país. Separe consulta de condições, contratação e processamento opcional. Documente retenção, compartilhamento e possibilidade de revogação. Teste compreensão com cenários, sem usar documentos de pessoas reais. Uma operação financeira tem identificador, estado, valor, moeda, horário e participante autorizado. Não confunda solicitação, autorização, liquidação e estorno. Reconcilie razão de transações com saldo de abertura e fechamento, preservando movimentos pendentes. Dados pessoais devem ser substituídos por identificadores sintéticos. Os limites regulatórios dependem do país e precisam de validação local; os números do caso não são limites legais. A solução deve permitir auditoria sem expor credenciais, documentos ou dinheiro de clientes reais.",
    "workedExample": "O protótipo oferece uma escolha apenas aparente: recusar contatos bloqueia até a visualização de condições. O exercício não determina uma conclusão jurídica para todos os países; mostra ausência de justificativa documentada e necessidade de revisar o fluxo. Uma versão de teste pode permitir consulta sem acesso a contatos. No dossiê de revisão de consentimento em aplicativos de crédito, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Suspender a exigência no protótipo e revisar finalidade, necessidade, base aplicável e alternativa de acesso com responsável local. Compare a recomendação com esta alternativa incorreta: Considerar consentimento válido apenas porque existe uma caixa marcada obrigatoriamente. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2024/04/Mobile_Money_Certification_Guidance.pdf",
      "https://www.w3.org/TR/privacy-principles/"
    ],
    "region": "africa"
  },
  {
    "id": "af-qualidade-de-indicadores-de-inclusao-financeira",
    "title": "Qualidade de indicadores de inclusão financeira",
    "track": "data",
    "role": "Analista de monitoramento de inclusão",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um programa em Benim registra 1000 contas abertas, 600 com alguma operação e 300 com uso em três meses consecutivos.",
    "decision": "Publicar separadamente abertura de 1000, ativação de 60% e uso recorrente de 30% da base aberta.",
    "misconception": "Afirmar que as 1000 pessoas se tornaram usuárias financeiras recorrentes.",
    "changedConstraint": "Duzentas contas pertencem a pessoas já atendidas anteriormente.",
    "tasks": [
      "Dicionário de inclusão e atividade",
      "Regra de usuário único",
      "Funil de abertura a recorrência",
      "Corte por barreiras de acesso",
      "Auditoria de duplicidade",
      "Relatório de alcance incremental"
    ],
    "method": "Defina pessoa, conta e transação como unidades diferentes. Uma pessoa pode ter várias contas, e abertura não prova uso ou benefício. Especifique janela de atividade e recorrência antes de comparar períodos. Para alcance incremental, identifique usuários previamente atendidos com método proporcional e privacidade. Não use volume de cadastro como substituto de melhoria econômica ou proteção do consumidor. Uma operação financeira tem identificador, estado, valor, moeda, horário e participante autorizado. Não confunda solicitação, autorização, liquidação e estorno. Reconcilie razão de transações com saldo de abertura e fechamento, preservando movimentos pendentes. Dados pessoais devem ser substituídos por identificadores sintéticos. Os limites regulatórios dependem do país e precisam de validação local; os números do caso não são limites legais. A solução deve permitir auditoria sem expor credenciais, documentos ou dinheiro de clientes reais.",
    "workedExample": "Seiscentas das mil contas tiveram operação, portanto a ativação é 60%. Trezentas tiveram uso nos três meses, correspondendo a 30% da base aberta ou 50% das ativadas. As duas porcentagens respondem a perguntas distintas e precisam de rótulos explícitos para não inflar o resultado. No dossiê de qualidade de indicadores de inclusão financeira, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Publicar separadamente abertura de 1000, ativação de 60% e uso recorrente de 30% da base aberta. Compare a recomendação com esta alternativa incorreta: Afirmar que as 1000 pessoas se tornaram usuárias financeiras recorrentes. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2024/04/Mobile_Money_Certification_Guidance.pdf",
      "https://docs.dhis2.org/en/implement/data-quality/analysis.html"
    ],
    "region": "africa"
  },
  {
    "id": "af-controle-de-repasses-a-comerciantes-por-lote-de-liquidacao",
    "title": "Controle de repasses a comerciantes por lote de liquidação",
    "track": "data",
    "role": "Analista de liquidação comercial",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um lote em Costa do Marfim tem vendas de 10000 unidades, tarifas de 150 e estornos confirmados de 300; o repasse observado foi 9500.",
    "decision": "Esperar 9550 e investigar diferença de 50, verificando retenções e calendário antes de concluir erro do parceiro.",
    "misconception": "Aceitar 9500 como correto porque se aproxima do líquido previsto.",
    "changedConstraint": "Uma retenção contratual de 50 é documentada depois da primeira conciliação.",
    "tasks": [
      "Memória de líquido a repassar",
      "Razão de tarifas",
      "Registro de estornos",
      "Fila de divergências",
      "Calendário de liquidação",
      "Trilha de retenções contratuais"
    ],
    "method": "Reconcilie bruto, descontos, estornos, retenções e pagamento em etapas explícitas. Uma diferença pode decorrer de calendário ou escopo e precisa de evidência antes de correção. Use identificador de lote e transações vinculadas para evitar compensação indevida entre comerciantes. Mantenha valores esperados e observados separados, registrando a justificativa e aprovação de qualquer ajuste posteriormente confirmado. Uma operação financeira tem identificador, estado, valor, moeda, horário e participante autorizado. Não confunda solicitação, autorização, liquidação e estorno. Reconcilie razão de transações com saldo de abertura e fechamento, preservando movimentos pendentes. Dados pessoais devem ser substituídos por identificadores sintéticos. Os limites regulatórios dependem do país e precisam de validação local; os números do caso não são limites legais. A solução deve permitir auditoria sem expor credenciais, documentos ou dinheiro de clientes reais.",
    "workedExample": "De 10000, subtraia 150 de tarifas e 300 de estornos: 9550. O repasse de 9500 fica 50 abaixo. Uma retenção comprovada poderia explicar a diferença, mas precisa constar como componente próprio. Sem essa evidência, o lote permanece em investigação, mesmo que a diferença relativa seja pequena. No dossiê de controle de repasses a comerciantes por lote de liquidação, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Esperar 9550 e investigar diferença de 50, verificando retenções e calendário antes de concluir erro do parceiro. Compare a recomendação com esta alternativa incorreta: Aceitar 9500 como correto porque se aproxima do líquido previsto. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2024/04/Mobile_Money_Certification_Guidance.pdf",
      "https://log.logcluster.org/en/systematic-recording-and-support-documentation"
    ],
    "region": "africa"
  },
  {
    "id": "af-estudo-de-tempo-de-liberacao-em-corredores-africanos",
    "title": "Estudo de tempo de liberação em corredores africanos",
    "track": "logistics",
    "role": "Analista de facilitação de comércio",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Cinco remessas no corredor Quênia-Uganda levam 8, 9, 10, 11 e 42 horas da chegada à liberação, sob definição igual.",
    "decision": "Reportar mediana de dez horas, média de 16 e investigar o caso de 42, preservando todos os registros.",
    "misconception": "Excluir 42 como inconveniente sem uma regra de qualidade de dados.",
    "changedConstraint": "Uma remessa teve registro de chegada inserido com atraso.",
    "tasks": [
      "Dicionário de marcos de liberação",
      "Base de tempos de remessa",
      "Memória de média e mediana",
      "Análise de caso extremo",
      "Auditoria de relógios e fusos",
      "Relatório de gargalos documentados"
    ],
    "method": "Defina chegada, apresentação documental, inspeção e liberação como marcos distintos. Calcule duração com fusos e calendários consistentes. Mediana resume caso central e média é sensível a atrasos extremos; apresente ambas. Antes de excluir um valor, procure erro de registro ou condição operacional válida. O estudo de tempos identifica pontos de investigação, sem atribuir responsabilidade automaticamente. Modele a cadeia como eventos com início, fim, responsável e evidência. Tempo em trânsito, espera documental e processamento são componentes diferentes. Compare operações na mesma definição de serviço, preservando feriados, fusos e calendário. Documentos devem ser verificados por versão e jurisdição; uma simulação não substitui orientação aduaneira. Use unidades e moedas explícitas. A recomendação deve apresentar condição de execução, alternativa de contingência e risco residual, sem confundir rapidez média com garantia para cada embarque.",
    "workedExample": "A soma dos cinco tempos é 80 horas, então a média é 16. Ordenados, o terceiro valor é dez, a mediana. A remessa de 42 influencia fortemente o total, mas pode representar um gargalo real. Retirá-la sem justificativa produziria uma fotografia artificialmente favorável do corredor. No dossiê de estudo de tempo de liberação em corredores africanos, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reportar mediana de dez horas, média de 16 e investigar o caso de 42, preservando todos os registros. Compare a recomendação com esta alternativa incorreta: Excluir 42 como inconveniente sem uma regra de qualidade de dados. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.wcoomd.org/en/topics/facilitation/instrument-and-tools/tools/time-release-study.aspx",
      "https://docs.python.org/3/library/statistics.html"
    ],
    "region": "africa"
  },
  {
    "id": "af-custo-logistico-de-exportacao-para-paises-sem-litoral",
    "title": "Custo logístico de exportação para países sem litoral",
    "track": "business",
    "role": "Analista de corredores de exportação",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma carga fictícia de Ruanda compara rota A de 1500 unidades e seis dias com B de 1200 e dez dias; o custo de estoque foi estimado em 100 por dia.",
    "decision": "Comparar custo ampliado de 2100 em A e 2200 em B, declarando hipóteses e riscos de prazo.",
    "misconception": "Escolher B pelo frete de 1200 sem incorporar o custo de tempo usado no modelo.",
    "changedConstraint": "O custo diário de estoque cai para 40.",
    "tasks": [
      "Quadro de componentes de rota",
      "Memória de custo de tempo",
      "Calendário de trânsito",
      "Sensibilidade de capital imobilizado",
      "Matriz de riscos do corredor",
      "Recomendação de rota condicionada"
    ],
    "method": "Compare rotas com o mesmo ponto de origem, destino e escopo de serviços. Acrescente componentes de espera, armazenagem e estoque somente quando suas bases estiverem explícitas. O custo por dia pode ser estimativa e deve passar por sensibilidade. Diferencie prazo típico de compromisso contratual e considere variação. Uma rota mais barata em frete pode ser mais cara no custo total relevante. Modele a cadeia como eventos com início, fim, responsável e evidência. Tempo em trânsito, espera documental e processamento são componentes diferentes. Compare operações na mesma definição de serviço, preservando feriados, fusos e calendário. Documentos devem ser verificados por versão e jurisdição; uma simulação não substitui orientação aduaneira. Use unidades e moedas explícitas. A recomendação deve apresentar condição de execução, alternativa de contingência e risco residual, sem confundir rapidez média com garantia para cada embarque.",
    "workedExample": "A custa 1500 mais seis vezes 100, chegando a 2100. B custa 1200 mais dez vezes 100, chegando a 2200. A vantagem de A é 100 no cenário. Com custo diário de 40, A totaliza 1740 e B 1600, mostrando que a escolha depende da hipótese econômica. No dossiê de custo logístico de exportação para países sem litoral, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Comparar custo ampliado de 2100 em A e 2200 em B, declarando hipóteses e riscos de prazo. Compare a recomendação com esta alternativa incorreta: Escolher B pelo frete de 1200 sem incorporar o custo de tempo usado no modelo. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/road-transport",
      "https://log.logcluster.org/en/monitoring-logistics-performance"
    ],
    "region": "africa"
  },
  {
    "id": "af-rastreabilidade-documental-de-origem-preferencial-africana",
    "title": "Rastreabilidade documental de origem preferencial africana",
    "track": "quality",
    "role": "Assistente de documentação comercial",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um exportador em Gana prepara dez produtos; seis têm documentação completa de origem, três têm declaração sem suporte e um mistura insumos sem registro.",
    "decision": "Separar seis dossiês prontos para revisão competente e manter quatro pendentes, sem prometer benefício tarifário automaticamente.",
    "misconception": "Emitir a mesma conclusão de origem para os dez produtos porque a fábrica fica em Gana.",
    "changedConstraint": "Um fornecedor altera a origem de um insumo relevante.",
    "tasks": [
      "Matriz produto-insumo",
      "Inventário de evidências de origem",
      "Fila de documentos pendentes",
      "Controle de mudança de fornecedor",
      "Checklist de regra aplicável",
      "Dossiê para revisão aduaneira"
    ],
    "method": "Origem preferencial depende da regra aplicável ao produto e acordo, não apenas do endereço da fábrica. Registre classificação, processo e insumos com fonte e versão. Uma declaração de fornecedor é evidência a verificar, não conclusão universal. Preserve mudanças e encaminhe análise jurídica ou aduaneira ao responsável competente. O exercício treina organização documental e não certifica elegibilidade tarifária. Modele a cadeia como eventos com início, fim, responsável e evidência. Tempo em trânsito, espera documental e processamento são componentes diferentes. Compare operações na mesma definição de serviço, preservando feriados, fusos e calendário. Documentos devem ser verificados por versão e jurisdição; uma simulação não substitui orientação aduaneira. Use unidades e moedas explícitas. A recomendação deve apresentar condição de execução, alternativa de contingência e risco residual, sem confundir rapidez média com garantia para cada embarque.",
    "workedExample": "Seis produtos têm evidência completa para a próxima revisão, equivalentes a 60% da carteira. Três declarações sem suporte e um caso sem rastreio compõem 40% pendentes. Esse indicador mede prontidão documental, não número de produtos com preferência aprovada. A mudança de origem de insumo exige reabrir o dossiê afetado. No dossiê de rastreabilidade documental de origem preferencial africana, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Separar seis dossiês prontos para revisão competente e manter quatro pendentes, sem prometer benefício tarifário automaticamente. Compare a recomendação com esta alternativa incorreta: Emitir a mesma conclusão de origem para os dez produtos porque a fábrica fica em Gana. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.wcoomd.org/en/topics/origin/instrument-and-tools/comparative-study-on-preferential-rules-of-origin.aspx",
      "https://www.wto.org/english/tratop_e/roi_e/roi_e.htm"
    ],
    "region": "africa"
  },
  {
    "id": "af-programacao-de-conteineres-refrigerados-em-portos",
    "title": "Programação de contêineres refrigerados em portos",
    "track": "logistics",
    "role": "Planejador de operações de carga perecível",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um terminal no Senegal possui oito tomadas refrigeradas disponíveis; chegam dez contêineres que exigem conexão contínua e não há saída prevista na janela.",
    "decision": "Identificar déficit de duas conexões e coordenar solução autorizada antes da chegada, sem assumir permanência desconectada aceitável.",
    "misconception": "Aceitar dez unidades e conectar somente oito sem escalonamento.",
    "changedConstraint": "Duas tomadas ficam indisponíveis na inspeção operacional.",
    "tasks": [
      "Agenda de conexão",
      "Inventário de tomadas disponíveis",
      "Mapa de permanência por unidade",
      "Plano de contingência de capacidade",
      "Registro de alarmes encaminhados",
      "Painel de exceções de chegada"
    ],
    "method": "Trate conexão como recurso com ocupação contínua, diferente de uma etapa curta de movimentação. Confirme capacidade operacional disponível e compatibilidade, sem inferir qualidade pelo número instalado. Registre janela de chegada e saída e coordene exceções com operador autorizado. Requisitos de conservação são específicos da carga; planejamento administrativo não autoriza desligamento nem alteração de condição técnica. Modele a cadeia como eventos com início, fim, responsável e evidência. Tempo em trânsito, espera documental e processamento são componentes diferentes. Compare operações na mesma definição de serviço, preservando feriados, fusos e calendário. Documentos devem ser verificados por versão e jurisdição; uma simulação não substitui orientação aduaneira. Use unidades e moedas explícitas. A recomendação deve apresentar condição de execução, alternativa de contingência e risco residual, sem confundir rapidez média com garantia para cada embarque.",
    "workedExample": "Dez chegadas para oito conexões geram duas unidades sem recurso no cenário. Se duas tomadas falharem, ficam seis disponíveis e o déficit sobe a quatro. O plano precisa resolver o desequilíbrio antes da operação, por remanejamento autorizado, revisão de agenda ou capacidade adicional validada. No dossiê de programação de contêineres refrigerados em portos, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Identificar déficit de duas conexões e coordenar solução autorizada antes da chegada, sem assumir permanência desconectada aceitável. Compare a recomendação com esta alternativa incorreta: Aceitar dez unidades e conectar somente oito sem escalonamento. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/cold-chain",
      "https://log.logcluster.org/en/sea-transport"
    ],
    "region": "africa"
  },
  {
    "id": "af-consolidacao-de-cargas-fracionadas-para-comercio-regional",
    "title": "Consolidação de cargas fracionadas para comércio regional",
    "track": "logistics",
    "role": "Analista de consolidação de embarques",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Três comerciantes no Benim têm 2, 3 e 4 toneladas para o mesmo corredor; um veículo comporta dez toneladas, mas apenas oito unidades de volume e as cargas somam nove.",
    "decision": "Reconhecer que o limite de volume impede consolidação integral apesar das nove toneladas caberem em peso.",
    "misconception": "Aprovar o embarque verificando somente o peso.",
    "changedConstraint": "Uma carga passa a exigir segregação de outra.",
    "tasks": [
      "Matriz de peso e cubagem",
      "Cadastro de incompatibilidades",
      "Plano de consolidação",
      "Custo rateado por critério",
      "Teste de limites do veículo",
      "Plano de fracionamento alternativo"
    ],
    "method": "Avalie peso, volume, dimensões, empilhamento e compatibilidade como restrições independentes. Capacidade sobrando em uma dimensão não compensa excesso em outra. Escolha regra de rateio comercial antes de cobrar participantes e registre custos comuns e individuais. Uma consolidação operacionalmente viável ainda precisa de documentação por embarcador. Use dados sintéticos e encaminhe requisitos especiais a operador competente. Modele a cadeia como eventos com início, fim, responsável e evidência. Tempo em trânsito, espera documental e processamento são componentes diferentes. Compare operações na mesma definição de serviço, preservando feriados, fusos e calendário. Documentos devem ser verificados por versão e jurisdição; uma simulação não substitui orientação aduaneira. Use unidades e moedas explícitas. A recomendação deve apresentar condição de execução, alternativa de contingência e risco residual, sem confundir rapidez média com garantia para cada embarque.",
    "workedExample": "As massas somam nove toneladas e ficam abaixo das dez permitidas. A cubagem, porém, soma nove unidades para capacidade de oito, excedendo uma unidade. A conclusão é inviabilidade da combinação integral no veículo informado, não falta de peso disponível. Uma divisão de carga precisa retestar todas as restrições. No dossiê de consolidação de cargas fracionadas para comércio regional, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reconhecer que o limite de volume impede consolidação integral apesar das nove toneladas caberem em peso. Compare a recomendação com esta alternativa incorreta: Aprovar o embarque verificando somente o peso. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/road-transport",
      "https://log.logcluster.org/en/physical-storage-guidelines"
    ],
    "region": "africa"
  },
  {
    "id": "af-planejamento-de-estoques-em-corredores-sujeitos-a-fronteira",
    "title": "Planejamento de estoques em corredores sujeitos a fronteira",
    "track": "logistics",
    "role": "Analista de ressuprimento regional",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um distribuidor em Zâmbia vende 20 unidades por dia; prazo médio de ressuprimento é dez dias e a política fictícia prevê 60 unidades de segurança.",
    "decision": "Usar ponto de pedido inicial de 260 unidades sob demanda constante e revisar se o prazo e a variabilidade mudarem.",
    "misconception": "Definir ponto de pedido de 200 e chamar as 60 unidades de margem dispensável.",
    "changedConstraint": "O prazo de fronteira aumenta para 15 dias.",
    "tasks": [
      "Base de demanda diária",
      "Mapa de prazo por trecho",
      "Cálculo de ponto de pedido",
      "Registro de estoque de segurança",
      "Cenário de atraso aduaneiro",
      "Painel de ruptura e excesso"
    ],
    "method": "O ponto de pedido cobre consumo esperado durante o prazo mais proteção contra incerteza definida pela política. Não use média de prazo como garantia de chegada. Segmente produtos por criticidade e validade, evitando que segurança gere obsolescência. Registre estoque disponível, em trânsito e comprometido na mesma definição de posição de estoque. Ajustes precisam de justificativa reproduzível. Modele a cadeia como eventos com início, fim, responsável e evidência. Tempo em trânsito, espera documental e processamento são componentes diferentes. Compare operações na mesma definição de serviço, preservando feriados, fusos e calendário. Documentos devem ser verificados por versão e jurisdição; uma simulação não substitui orientação aduaneira. Use unidades e moedas explícitas. A recomendação deve apresentar condição de execução, alternativa de contingência e risco residual, sem confundir rapidez média com garantia para cada embarque.",
    "workedExample": "Vinte unidades por dia durante dez dias geram 200 de demanda esperada. Somando 60 de segurança, o ponto inicial é 260. Se o prazo subir a 15, o consumo esperado passa a 300 e o ponto, com a mesma segurança, a 360. A política deve ser revisada com dados de variabilidade. No dossiê de planejamento de estoques em corredores sujeitos a fronteira, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Usar ponto de pedido inicial de 260 unidades sob demanda constante e revisar se o prazo e a variabilidade mudarem. Compare a recomendação com esta alternativa incorreta: Definir ponto de pedido de 200 e chamar as 60 unidades de margem dispensável. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/inventory-control",
      "https://log.logcluster.org/en/systematic-recording-and-support-documentation"
    ],
    "region": "africa"
  },
  {
    "id": "af-reconciliacao-de-lacres-e-eventos-de-transito-aduaneiro",
    "title": "Reconciliação de lacres e eventos de trânsito aduaneiro",
    "track": "quality",
    "role": "Assistente de controle de trânsito",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma remessa na África Austral tem lacre A no embarque e B no recebimento; há registro de abertura autorizada intermediária, mas o documento não informa o novo lacre.",
    "decision": "Manter a remessa em exceção documental até vincular a troca autorizada ao lacre B, sem concluir violação automaticamente.",
    "misconception": "Ignorar a divergência porque existe algum documento de abertura.",
    "changedConstraint": "O registro intermediário chega sem assinatura verificável.",
    "tasks": [
      "Linha de eventos de custódia",
      "Cadastro de lacres",
      "Matriz de autorização de abertura",
      "Fila de prova faltante",
      "Checklist de recebimento",
      "Relatório de continuidade documental"
    ],
    "method": "Trate lacre como identificador de integridade associado a um evento, e não como prova isolada de todo o trajeto. Uma troca pode ser legítima, mas precisa de autorização e ligação entre identificadores. Preserve horário, local e responsável. Divergência documental exige investigação proporcional; não atribua culpa nem libere automaticamente. O estudo é de rastreabilidade, sem ensinar evasão de controle. Modele a cadeia como eventos com início, fim, responsável e evidência. Tempo em trânsito, espera documental e processamento são componentes diferentes. Compare operações na mesma definição de serviço, preservando feriados, fusos e calendário. Documentos devem ser verificados por versão e jurisdição; uma simulação não substitui orientação aduaneira. Use unidades e moedas explícitas. A recomendação deve apresentar condição de execução, alternativa de contingência e risco residual, sem confundir rapidez média com garantia para cada embarque.",
    "workedExample": "O evento de abertura explica a possibilidade de A ter sido substituído, mas não comprova que B seja o lacre resultante. A lacuna é o vínculo entre autorização, substituição e recebimento. Solicitar essa evidência mantém a cadeia auditável e evita tanto acusação precipitada quanto aceitação sem suporte. No dossiê de reconciliação de lacres e eventos de trânsito aduaneiro, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Manter a remessa em exceção documental até vincular a troca autorizada ao lacre B, sem concluir violação automaticamente. Compare a recomendação com esta alternativa incorreta: Ignorar a divergência porque existe algum documento de abertura. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/systematic-recording-and-support-documentation",
      "https://www.wcoomd.org/en/topics/facilitation/instrument-and-tools/tools/time-release-study.aspx"
    ],
    "region": "africa"
  },
  {
    "id": "af-indicadores-de-entrega-em-enderecamento-informal",
    "title": "Indicadores de entrega em endereçamento informal",
    "track": "data",
    "role": "Analista de última milha inclusiva",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma operação em Lagos tenta 200 entregas: 150 concluídas na primeira visita, 30 na segunda e 20 ainda pendentes.",
    "decision": "Reportar sucesso na primeira tentativa de 75% e conclusão acumulada de 90%, sem tratar segunda tentativa como primeira.",
    "misconception": "Divulgar 90% de sucesso na primeira visita somando todas as entregas concluídas.",
    "changedConstraint": "Dez pendências têm instrução de localização incompleta.",
    "tasks": [
      "Dicionário de tentativa e conclusão",
      "Registro de referência de localização",
      "Funil de visitas",
      "Mapa de causas de pendência",
      "Plano de confirmação acessível",
      "Indicador de custo por entrega concluída"
    ],
    "method": "Defina tentativa válida com evidência de visita e condição de acesso, respeitando privacidade. Endereços podem usar referências locais e confirmação por canal acessível sem exigir localização contínua. Separe sucesso na primeira visita, conclusão final e custo de retrabalho. Pendência não significa recusa do cliente. Agrupe causas para melhorar instruções e organização, mantendo possibilidade de revisão. Modele a cadeia como eventos com início, fim, responsável e evidência. Tempo em trânsito, espera documental e processamento são componentes diferentes. Compare operações na mesma definição de serviço, preservando feriados, fusos e calendário. Documentos devem ser verificados por versão e jurisdição; uma simulação não substitui orientação aduaneira. Use unidades e moedas explícitas. A recomendação deve apresentar condição de execução, alternativa de contingência e risco residual, sem confundir rapidez média com garantia para cada embarque.",
    "workedExample": "Cento e cinquenta de 200 é 75% na primeira tentativa. Somando as 30 da segunda, há 180 concluídas, ou 90% acumuladas. As 20 restantes representam 10%. Esse quadro mostra o retrabalho que ficaria invisível se todas as conclusões fossem apresentadas como sucesso de primeira visita. No dossiê de indicadores de entrega em endereçamento informal, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reportar sucesso na primeira tentativa de 75% e conclusão acumulada de 90%, sem tratar segunda tentativa como primeira. Compare a recomendação com esta alternativa incorreta: Divulgar 90% de sucesso na primeira visita somando todas as entregas concluídas. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/monitoring-logistics-performance",
      "https://log.logcluster.org/en/road-transport"
    ],
    "region": "africa"
  },
  {
    "id": "af-custo-de-permanencia-de-conteineres-e-janelas-livres",
    "title": "Custo de permanência de contêineres e janelas livres",
    "track": "business",
    "role": "Analista de custos portuários",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um contrato fictício em Moçambique oferece cinco dias livres e cobra 80 unidades por dia adicional; um contêiner permanece oito dias completos sob a regra fornecida.",
    "decision": "Calcular três dias cobrados e custo de 240, confirmando regra de contagem e componentes contratuais.",
    "misconception": "Cobrar oito vezes 80 ignorando os dias livres.",
    "changedConstraint": "O início da contagem muda de descarga para disponibilização documental.",
    "tasks": [
      "Calendário de permanência",
      "Cadastro de regra de contagem",
      "Memória de dias cobrados",
      "Auditoria de marcos contratuais",
      "Cenário de liberação antecipada",
      "Painel de custos evitáveis"
    ],
    "method": "Leia a definição contratual de início, fim, dias livres e unidade de cobrança antes de calcular. Dias corridos e úteis produzem resultados diferentes. Não combine armazenagem, uso de equipamento e outras tarifas como se fossem o mesmo serviço. Preserve comprovantes de disponibilidade e liberação. O modelo ajuda a conferir uma fatura, mas divergência real exige revisão do contrato aplicável. Modele a cadeia como eventos com início, fim, responsável e evidência. Tempo em trânsito, espera documental e processamento são componentes diferentes. Compare operações na mesma definição de serviço, preservando feriados, fusos e calendário. Documentos devem ser verificados por versão e jurisdição; uma simulação não substitui orientação aduaneira. Use unidades e moedas explícitas. A recomendação deve apresentar condição de execução, alternativa de contingência e risco residual, sem confundir rapidez média com garantia para cada embarque.",
    "workedExample": "Oito dias de permanência menos cinco livres deixam três sujeitos à tarifa do caso. Três vezes 80 são 240 unidades. A conta de 640 cobraria também o período gratuito. Se o marco inicial mudar, refaça o calendário em vez de alterar manualmente o total sem explicar a causa. No dossiê de custo de permanência de contêineres e janelas livres, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Calcular três dias cobrados e custo de 240, confirmando regra de contagem e componentes contratuais. Compare a recomendação com esta alternativa incorreta: Cobrar oito vezes 80 ignorando os dias livres. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/sea-transport",
      "https://log.logcluster.org/en/monitoring-logistics-performance"
    ],
    "region": "africa"
  },
  {
    "id": "af-planejamento-de-abastecimento-de-ilhas-com-servico-intermitente",
    "title": "Planejamento de abastecimento de ilhas com serviço intermitente",
    "track": "logistics",
    "role": "Planejador de suprimentos insulares",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma ilha de Cabo Verde consome 15 caixas diárias e recebe embarcação a cada 14 dias; a capacidade disponível de armazenamento é 180 caixas.",
    "decision": "Identificar demanda de 210 caixas por ciclo e déficit de 30 em relação ao armazenamento, exigindo revisão de frequência, espaço ou fornecimento.",
    "misconception": "Aprovar o plano apenas porque a embarcação transporta mais de 210 caixas.",
    "changedConstraint": "Uma viagem é adiada por quatro dias.",
    "tasks": [
      "Balanço de estoque por ciclo",
      "Calendário de escalas",
      "Capacidade de armazenamento útil",
      "Cenário de atraso marítimo",
      "Plano de itens prioritários",
      "Quadro de alternativas de abastecimento"
    ],
    "method": "Compare consumo entre escalas com capacidade física e prazo de reposição. Capacidade de transporte e de armazenamento são gargalos diferentes. Itens têm validade e condições próprias, portanto agregação por caixas serve apenas ao cenário simplificado. Registre chegada prevista, atraso plausível e consumo prioritário. A contingência deve indicar quem autoriza mudanças e como acompanhar a reserva restante. Modele a cadeia como eventos com início, fim, responsável e evidência. Tempo em trânsito, espera documental e processamento são componentes diferentes. Compare operações na mesma definição de serviço, preservando feriados, fusos e calendário. Documentos devem ser verificados por versão e jurisdição; uma simulação não substitui orientação aduaneira. Use unidades e moedas explícitas. A recomendação deve apresentar condição de execução, alternativa de contingência e risco residual, sem confundir rapidez média com garantia para cada embarque.",
    "workedExample": "Quinze caixas por dia durante 14 dias somam 210. O armazenamento de 180 cobre somente 12 dias, deixando dois sem cobertura no ciclo nominal. Um atraso de quatro dias elevaria a necessidade a 270. O plano precisa resolver a restrição física ou alterar o calendário antes de prometer continuidade. No dossiê de planejamento de abastecimento de ilhas com serviço intermitente, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Identificar demanda de 210 caixas por ciclo e déficit de 30 em relação ao armazenamento, exigindo revisão de frequência, espaço ou fornecimento. Compare a recomendação com esta alternativa incorreta: Aprovar o plano apenas porque a embarcação transporta mais de 210 caixas. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/inventory-control",
      "https://log.logcluster.org/en/sea-transport"
    ],
    "region": "africa"
  },
  {
    "id": "af-triagem-administrativa-de-excursoes-de-temperatura-vacinal",
    "title": "Triagem administrativa de excursões de temperatura vacinal",
    "track": "care",
    "role": "Assistente de logística de imunização",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um depósito fictício em Gana registra alarme de temperatura em dois lotes; o sensor voltou à faixa, mas ainda não houve avaliação do responsável técnico.",
    "decision": "Manter os lotes identificados em condição de espera e encaminhar histórico ao responsável; retorno à faixa não prova adequação do produto.",
    "misconception": "Liberar os lotes automaticamente porque a temperatura atual está normal.",
    "changedConstraint": "O registrador apresenta lacuna de duas horas no histórico.",
    "tasks": [
      "Registro de alarme por lote",
      "Linha temporal de temperatura",
      "Matriz de estado de quarentena",
      "Dossiê para avaliação técnica",
      "Teste de comunicação de exceção",
      "Plano de preservação de evidências"
    ],
    "method": "Acompanhe alarme como evento que inicia investigação, não como decisão automática sobre utilização. Preserve início, duração, extremos observados, sensor e lotes potencialmente afetados. Uma temperatura atual adequada não reconstitui exposição anterior. Use procedimento local e orientação específica do produto, sem aplicar uma regra universal a todos os imunizantes. A função administrativa organiza evidências e impede perda de rastreabilidade. O exercício aborda coordenação administrativa e logística, sem diagnóstico, prescrição ou liberação de produtos. Preserve identidade de item, lote, validade, localização e estado de autorização. Uma exceção deve ser registrada e encaminhada ao responsável, mantendo a evidência original. Use dados fictícios ou anonimizados e acesso mínimo. Defina o denominador de cada indicador e diferencie falha de registro de falha confirmada. Melhoria operacional precisa preservar segurança, equidade de atendimento e capacidade de rastrear a decisão.",
    "workedExample": "O cenário fornece dois lotes com alarme e nenhum parecer técnico. Portanto, o número de lotes liberados por essa informação é zero. O retorno do sensor descreve o presente, enquanto a pergunta de qualidade envolve o histórico. O encaminhamento deve incluir dados originais e destacar a lacuna caso ela exista. No dossiê de triagem administrativa de excursões de temperatura vacinal, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Manter os lotes identificados em condição de espera e encaminhar histórico ao responsável; retorno à faixa não prova adequação do produto. Compare a recomendação com esta alternativa incorreta: Liberar os lotes automaticamente porque a temperatura atual está normal. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.who.int/publications/i/item/WHO-IVB-15.04",
      "https://log.logcluster.org/sites/default/files/2024-05/USAID%20-%20Logistics%20Handbook.pdf"
    ],
    "region": "africa"
  },
  {
    "id": "af-reconciliacao-de-doses-em-campanhas-de-vacinacao",
    "title": "Reconciliação de doses em campanhas de vacinação",
    "track": "data",
    "role": "Analista de estoques de imunização",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma unidade em Senegal recebe 1000 doses, administra 820, transfere 100 com comprovante e mantém 60 em estoque; todas são da mesma apresentação.",
    "decision": "Registrar diferença de 20 doses e investigá-la antes de classificar perda.",
    "misconception": "Declarar perda de 180 ignorando transferência e estoque final.",
    "changedConstraint": "Dez doses transferidas ainda aguardam confirmação do destino.",
    "tasks": [
      "Balanço de doses",
      "Registro de transferência",
      "Reconciliação por apresentação",
      "Fila de diferenças",
      "Indicador de perdas confirmadas",
      "Plano de conferência de recebimento"
    ],
    "method": "Reconcilie recebimento, uso, transferência, perda confirmada e estoque final com a mesma unidade. Frascos e doses não são intercambiáveis sem fator de apresentação. Preserve estados de transferência pendente e recebida para evitar dupla contagem entre unidades. Uma diferença de saldo exige investigação documental; não deve ser convertida automaticamente em descarte nem em erro clínico. O exercício aborda coordenação administrativa e logística, sem diagnóstico, prescrição ou liberação de produtos. Preserve identidade de item, lote, validade, localização e estado de autorização. Uma exceção deve ser registrada e encaminhada ao responsável, mantendo a evidência original. Use dados fictícios ou anonimizados e acesso mínimo. Defina o denominador de cada indicador e diferencie falha de registro de falha confirmada. Melhoria operacional precisa preservar segurança, equidade de atendimento e capacidade de rastrear a decisão.",
    "workedExample": "As saídas e posições explicadas somam 820 mais 100 mais 60, igual a 980. Das 1000 recebidas, restam 20 sem explicação no cenário. Subtrair somente doses administradas geraria 180, incluindo indevidamente estoque ainda existente e material enviado a outra unidade. No dossiê de reconciliação de doses em campanhas de vacinação, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Registrar diferença de 20 doses e investigá-la antes de classificar perda. Compare a recomendação com esta alternativa incorreta: Declarar perda de 180 ignorando transferência e estoque final. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/sites/default/files/2024-05/USAID%20-%20Logistics%20Handbook.pdf",
      "https://log.logcluster.org/en/systematic-recording-and-support-documentation"
    ],
    "region": "africa"
  },
  {
    "id": "af-roteamento-de-amostras-laboratoriais-com-janelas-de-recebimento",
    "title": "Roteamento de amostras laboratoriais com janelas de recebimento",
    "track": "logistics",
    "role": "Coordenador de transporte laboratorial",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um laboratório em Uganda recebe até 16h; um veículo sai às 13h, faz duas coletas de 20 minutos e percorre 140 minutos no total, sem atrasos.",
    "decision": "Estimar chegada às 16h e registrar ausência de margem para imprevistos; revisar agenda para criar folga operacional.",
    "misconception": "Prometer chegada confortável porque a viagem dura menos de três horas.",
    "changedConstraint": "Uma coleta passa a exigir 35 minutos.",
    "tasks": [
      "Cronograma de coleta",
      "Matriz de janelas laboratoriais",
      "Registro de cadeia de custódia",
      "Cálculo de margem temporal",
      "Plano de contingência autorizado",
      "Painel de recebimento confirmado"
    ],
    "method": "Some deslocamento e atendimento em cada parada, incluindo preparação e documentação quando informados. Janela de recebimento é restrição distinta do prazo técnico de conservação da amostra. A equipe responsável define requisitos de embalagem, segurança e tempo; o planejamento administrativo deve preservá-los. Registre coleta, transferência e recebimento com identificador único. Folga zero implica risco mesmo quando o cronograma nominal fecha. O exercício aborda coordenação administrativa e logística, sem diagnóstico, prescrição ou liberação de produtos. Preserve identidade de item, lote, validade, localização e estado de autorização. Uma exceção deve ser registrada e encaminhada ao responsável, mantendo a evidência original. Use dados fictícios ou anonimizados e acesso mínimo. Defina o denominador de cada indicador e diferencie falha de registro de falha confirmada. Melhoria operacional precisa preservar segurança, equidade de atendimento e capacidade de rastrear a decisão.",
    "workedExample": "Duas coletas de 20 minutos totalizam 40. Somadas aos 140 de deslocamento, resultam em 180 minutos, ou três horas. Saindo às 13h, a chegada ocorre às 16h, exatamente no limite. Se uma coleta aumentar 15 minutos, o plano passa a chegar às 16h15. No dossiê de roteamento de amostras laboratoriais com janelas de recebimento, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Estimar chegada às 16h e registrar ausência de margem para imprevistos; revisar agenda para criar folga operacional. Compare a recomendação com esta alternativa incorreta: Prometer chegada confortável porque a viagem dura menos de três horas. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/sites/default/files/2024-05/USAID%20-%20Logistics%20Handbook.pdf",
      "https://log.logcluster.org/en/road-transport"
    ],
    "region": "africa"
  },
  {
    "id": "af-previsao-de-consumo-de-testes-diagnosticos-por-unidade",
    "title": "Previsão de consumo de testes diagnósticos por unidade",
    "track": "data",
    "role": "Analista de suprimentos de saúde",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma unidade no Quênia usa 30 testes por dia útil e opera 20 dias no mês; o estoque disponível é 450 e não há recebimento confirmado.",
    "decision": "Estimar consumo mensal de 600 e déficit projetado de 150, separando demanda prevista de pedido autorizado.",
    "misconception": "Afirmar que 450 testes cobrem o mês usando 15 dias como denominador não informado.",
    "changedConstraint": "A unidade acrescenta cinco dias de atendimento.",
    "tasks": [
      "Histórico de consumo",
      "Calendário de funcionamento",
      "Previsão por unidade",
      "Posição de estoque",
      "Cenário de ampliação de serviço",
      "Solicitação fundamentada de reposição"
    ],
    "method": "A previsão deve usar dias efetivos de atendimento e distinguir consumo rotineiro de campanhas. Estoque físico, comprometido e em trânsito têm estados diferentes. Calcule cobertura em dias com a mesma taxa de uso e explicite incerteza. Um modelo de demanda não autoriza seleção ou uso de teste; a função é apoiar continuidade de suprimento sob protocolos locais e responsáveis habilitados. O exercício aborda coordenação administrativa e logística, sem diagnóstico, prescrição ou liberação de produtos. Preserve identidade de item, lote, validade, localização e estado de autorização. Uma exceção deve ser registrada e encaminhada ao responsável, mantendo a evidência original. Use dados fictícios ou anonimizados e acesso mínimo. Defina o denominador de cada indicador e diferencie falha de registro de falha confirmada. Melhoria operacional precisa preservar segurança, equidade de atendimento e capacidade de rastrear a decisão.",
    "workedExample": "Trinta testes por dia em 20 dias geram demanda de 600. O estoque de 450 cobre 15 dias nesse ritmo. A diferença para o mês é 150 testes, ou cinco dias de consumo. Se houver 25 dias de atendimento, a demanda sobe a 750 e a lacuna passa a 300. No dossiê de previsão de consumo de testes diagnósticos por unidade, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Estimar consumo mensal de 600 e déficit projetado de 150, separando demanda prevista de pedido autorizado. Compare a recomendação com esta alternativa incorreta: Afirmar que 450 testes cobrem o mês usando 15 dias como denominador não informado. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/sites/default/files/2024-05/USAID%20-%20Logistics%20Handbook.pdf",
      "https://log.logcluster.org/en/inventory-control"
    ],
    "region": "africa"
  },
  {
    "id": "af-gestao-de-validade-de-insumos-por-fefo",
    "title": "Gestão de validade de insumos por FEFO",
    "track": "quality",
    "role": "Assistente de almoxarifado de saúde",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um depósito na Tanzânia tem lote A de 100 unidades com validade em 30 dias e B de 200 com validade em 90 dias; consumo previsto é 60 por mês.",
    "decision": "Priorizar A quando tecnicamente elegível e registrar risco de 40 unidades vencerem antes do uso previsto, buscando remanejamento autorizado.",
    "misconception": "Usar B primeiro apenas porque chegou antes ao depósito.",
    "changedConstraint": "A demanda do mês cai para 40 unidades.",
    "tasks": [
      "Mapa de validade por lote",
      "Fila de separação FEFO",
      "Previsão de risco de vencimento",
      "Plano de remanejamento",
      "Registro de autorização",
      "Indicador de perdas por validade"
    ],
    "method": "FEFO ordena pelo vencimento elegível mais próximo, enquanto FIFO usa ordem de entrada; os critérios podem divergir. Verifique restrições de lote, condições de armazenamento e autorização antes de separar. Compare estoque a vencer com consumo provável no período. Remanejamento precisa de rastreio e aceite do destino; não transforme previsão em justificativa para uso fora de condição ou prazo. O exercício aborda coordenação administrativa e logística, sem diagnóstico, prescrição ou liberação de produtos. Preserve identidade de item, lote, validade, localização e estado de autorização. Uma exceção deve ser registrada e encaminhada ao responsável, mantendo a evidência original. Use dados fictícios ou anonimizados e acesso mínimo. Defina o denominador de cada indicador e diferencie falha de registro de falha confirmada. Melhoria operacional precisa preservar segurança, equidade de atendimento e capacidade de rastrear a decisão.",
    "workedExample": "O lote A tem 100 unidades para 30 dias, mas a previsão utiliza apenas 60. Mesmo consumindo A primeiro, 40 ficam expostas a vencimento no cenário. O lote B não elimina esse risco. O plano deve abrir avaliação de remanejamento ou ajuste autorizado, preservando os limites de utilização. No dossiê de gestão de validade de insumos por fefo, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Priorizar A quando tecnicamente elegível e registrar risco de 40 unidades vencerem antes do uso previsto, buscando remanejamento autorizado. Compare a recomendação com esta alternativa incorreta: Usar B primeiro apenas porque chegou antes ao depósito. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/sites/default/files/2024-05/USAID%20-%20Logistics%20Handbook.pdf",
      "https://log.logcluster.org/en/inventory-control"
    ],
    "region": "africa"
  },
  {
    "id": "af-qualidade-de-registros-administrativos-de-referencia-de-pacientes",
    "title": "Qualidade de registros administrativos de referência de pacientes",
    "track": "care",
    "role": "Analista de coordenação de atendimento",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma rede fictícia de Ruanda envia 80 referências; 50 têm recebimento confirmado, 20 ainda estão em prazo e dez estão sem identificador de destino.",
    "decision": "Separar 50 confirmadas, 20 pendentes no prazo e dez falhas documentais, sem classificar todas as 30 restantes como abandono.",
    "misconception": "Declarar que 30 pacientes abandonaram tratamento sem evidência.",
    "changedConstraint": "Cinco destinos passam a usar um novo código de unidade.",
    "tasks": [
      "Dicionário de estados de referência",
      "Cadastro de unidades de destino",
      "Validação de identificadores",
      "Fila de confirmação",
      "Indicador de completude",
      "Plano de atualização de códigos"
    ],
    "method": "Modele referência como fluxo de estados com responsabilidade e data de evento. Confirmação administrativa não descreve necessariamente resultado clínico. Dados ausentes não provam comportamento do paciente. Use identificadores sintéticos, minimização de dados e canais autorizados. Compare prazos por tipo de referência sem criar prioridade clínica; essa decisão pertence à equipe habilitada. Mantenha histórico quando o cadastro de unidades mudar. O exercício aborda coordenação administrativa e logística, sem diagnóstico, prescrição ou liberação de produtos. Preserve identidade de item, lote, validade, localização e estado de autorização. Uma exceção deve ser registrada e encaminhada ao responsável, mantendo a evidência original. Use dados fictícios ou anonimizados e acesso mínimo. Defina o denominador de cada indicador e diferencie falha de registro de falha confirmada. Melhoria operacional precisa preservar segurança, equidade de atendimento e capacidade de rastrear a decisão.",
    "workedExample": "Cinquenta de 80 referências têm confirmação, ou 62,5%. Vinte continuam pendentes dentro do prazo e dez não têm destino identificável. Somar essas categorias e chamar de abandono confundiria situação documental, tempo de processamento e comportamento clínico. O trabalho imediato é corrigir os dez registros e acompanhar os vinte. No dossiê de qualidade de registros administrativos de referência de pacientes, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Separar 50 confirmadas, 20 pendentes no prazo e dez falhas documentais, sem classificar todas as 30 restantes como abandono. Compare a recomendação com esta alternativa incorreta: Declarar que 30 pacientes abandonaram tratamento sem evidência. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.dhis2.org/en/implement/data-quality/analysis.html",
      "https://log.logcluster.org/sites/default/files/2024-05/USAID%20-%20Logistics%20Handbook.pdf"
    ],
    "region": "africa"
  },
  {
    "id": "af-programacao-de-manutencao-de-equipamentos-de-frio-em-saude",
    "title": "Programação de manutenção de equipamentos de frio em saúde",
    "track": "industry",
    "role": "Planejador de manutenção de cadeia fria",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma rede em Moçambique possui 20 equipamentos; cinco têm manutenção vencida, dos quais dois protegem estoques sem alternativa de transferência.",
    "decision": "Priorizar avaliação dos dois sem contingência e programar os cinco vencidos conforme criticidade e autorização técnica.",
    "misconception": "Ordenar somente pela idade do equipamento sem considerar consequência de falha.",
    "changedConstraint": "Uma unidade adicional perde seu equipamento de reserva.",
    "tasks": [
      "Cadastro de ativos",
      "Matriz de criticidade",
      "Agenda de manutenção",
      "Mapa de contingência de estoque",
      "Registro de serviço autorizado",
      "Indicador de pendência crítica"
    ],
    "method": "Combine condição do ativo, consequência de parada e alternativa disponível. Manutenção vencida é sinal de controle e não prova defeito imediato; equipamento novo também pode ser crítico. Planeje janela com a operação para preservar estoque. Intervenção técnica requer pessoal habilitado e procedimentos apropriados. A análise administrativa organiza prioridade, documentação e continuidade, mantendo evidência de execução e liberação. O exercício aborda coordenação administrativa e logística, sem diagnóstico, prescrição ou liberação de produtos. Preserve identidade de item, lote, validade, localização e estado de autorização. Uma exceção deve ser registrada e encaminhada ao responsável, mantendo a evidência original. Use dados fictícios ou anonimizados e acesso mínimo. Defina o denominador de cada indicador e diferencie falha de registro de falha confirmada. Melhoria operacional precisa preservar segurança, equidade de atendimento e capacidade de rastrear a decisão.",
    "workedExample": "Cinco equipamentos representam 25% dos 20 cadastrados com manutenção vencida. Dois deles não têm alternativa, portanto formam uma subfila crítica para avaliação inicial. A prioridade pode mudar se outro equipamento perder reserva. Registrar a justificativa permite revisar a ordem sem confundir urgência com simples antiguidade. No dossiê de programação de manutenção de equipamentos de frio em saúde, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Priorizar avaliação dos dois sem contingência e programar os cinco vencidos conforme criticidade e autorização técnica. Compare a recomendação com esta alternativa incorreta: Ordenar somente pela idade do equipamento sem considerar consequência de falha. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.nlr.gov/docs/fy19osti/73822.pdf",
      "https://www.who.int/publications/i/item/WHO-IVB-15.04"
    ],
    "region": "africa"
  },
  {
    "id": "af-indicadores-de-faltas-e-remarcacao-em-servicos-comunitarios",
    "title": "Indicadores de faltas e remarcação em serviços comunitários",
    "track": "data",
    "role": "Analista de agendamento em saúde",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma unidade no Benim agenda 200 visitas, realiza 150, remarca 30 antes do horário e registra 20 faltas sem aviso.",
    "decision": "Publicar 20 faltas em 170 agendas mantidas, ou 11,76%, se essa for a definição adotada, e informar também os 30 reagendamentos.",
    "misconception": "Misturar remarcação prévia com ausência e publicar 25% de faltas sem definição.",
    "changedConstraint": "Dez remarcações ocorreram depois do horário agendado.",
    "tasks": [
      "Dicionário de status de agenda",
      "Registro de horário de remarcação",
      "Indicador de falta por definição",
      "Análise de barreiras de acesso",
      "Fluxo de comunicação acessível",
      "Painel de capacidade reaproveitada"
    ],
    "method": "Defina a janela que distingue cancelamento ou remarcação prévia de falta. Preserve o denominador e publique categorias mutuamente exclusivas. Uma falta administrativa não explica sua causa nem autoriza penalização automática. Analise barreiras de deslocamento, comunicação e horário com cuidado de privacidade. A melhoria deve recuperar capacidade e facilitar acesso, mantendo decisões clínicas e prioridade assistencial com a equipe competente. O exercício aborda coordenação administrativa e logística, sem diagnóstico, prescrição ou liberação de produtos. Preserve identidade de item, lote, validade, localização e estado de autorização. Uma exceção deve ser registrada e encaminhada ao responsável, mantendo a evidência original. Use dados fictícios ou anonimizados e acesso mínimo. Defina o denominador de cada indicador e diferencie falha de registro de falha confirmada. Melhoria operacional precisa preservar segurança, equidade de atendimento e capacidade de rastrear a decisão.",
    "workedExample": "Das 200 agendas, 30 foram remarcadas previamente, deixando 170 mantidas. Vinte faltas sobre 170 correspondem a 11,76%. Sobre as 200 originais seriam 10%, outra medida possível se rotulada. Agrupar 50 casos não realizados como faltas apagaria a distinção importante das remarcações antecipadas. No dossiê de indicadores de faltas e remarcação em serviços comunitários, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Publicar 20 faltas em 170 agendas mantidas, ou 11,76%, se essa for a definição adotada, e informar também os 30 reagendamentos. Compare a recomendação com esta alternativa incorreta: Misturar remarcação prévia com ausência e publicar 25% de faltas sem definição. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.dhis2.org/en/implement/data-quality/analysis.html",
      "https://log.logcluster.org/en/monitoring-logistics-performance"
    ],
    "region": "africa"
  },
  {
    "id": "af-rastreio-de-kits-de-assistencia-domiciliar-nao-clinica",
    "title": "Rastreio de kits de assistência domiciliar não clínica",
    "track": "care",
    "role": "Coordenador de suprimentos de cuidado",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um programa comunitário na África do Sul despacha 120 kits; 100 têm entrega aceita confirmada, 15 retornam de tentativas não aceitas com embalagem lacrada e cinco seguem em trânsito; os estados são exclusivos.",
    "decision": "Reconciliar 100 entregues, 15 devolvidos e cinco em trânsito, preservando estado e responsável sem inventar perda.",
    "misconception": "Registrar os 20 não entregues como extravio confirmado.",
    "changedConstraint": "Cinco devoluções chegam com embalagem violada.",
    "tasks": [
      "Cadastro de composição de kit",
      "Linha de custódia",
      "Registro de entrega",
      "Triagem de devoluções",
      "Reconciliação de estados",
      "Plano de reposição autorizado"
    ],
    "method": "Defina composição e identificador do kit para rastrear movimentos entre separação, transporte, entrega e retorno. Devolução não equivale automaticamente a item reutilizável; condição e protocolo determinam o próximo estado. Não registre dados sensíveis de beneficiários em planilhas abertas. O estudo trata logística e não orientação de cuidado. Exceções precisam de responsável e evidência antes da baixa ou reposição. O exercício aborda coordenação administrativa e logística, sem diagnóstico, prescrição ou liberação de produtos. Preserve identidade de item, lote, validade, localização e estado de autorização. Uma exceção deve ser registrada e encaminhada ao responsável, mantendo a evidência original. Use dados fictícios ou anonimizados e acesso mínimo. Defina o denominador de cada indicador e diferencie falha de registro de falha confirmada. Melhoria operacional precisa preservar segurança, equidade de atendimento e capacidade de rastrear a decisão.",
    "workedExample": "Os estados informados somam 100 mais 15 mais cinco, exatamente 120 kits. Não existe diferença quantitativa no cenário inicial. A devolução lacrada ainda requer conferência conforme protocolo. Se cinco chegarem violados, muda o estado desses kits para avaliação, sem alterar automaticamente o total de entregas ou confirmar perda financeira. No dossiê de rastreio de kits de assistência domiciliar não clínica, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reconciliar 100 entregues, 15 devolvidos e cinco em trânsito, preservando estado e responsável sem inventar perda. Compare a recomendação com esta alternativa incorreta: Registrar os 20 não entregues como extravio confirmado. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/systematic-recording-and-support-documentation",
      "https://log.logcluster.org/sites/default/files/2024-05/USAID%20-%20Logistics%20Handbook.pdf"
    ],
    "region": "africa"
  },
  {
    "id": "af-completude-de-relatorios-de-unidades-de-saude-remotas",
    "title": "Completude de relatórios de unidades de saúde remotas",
    "track": "data",
    "role": "Analista de informação de serviços",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma rede em Madagascar espera relatórios de 50 unidades; recebe 45, dos quais 40 têm todos os campos obrigatórios e 35 chegaram no prazo.",
    "decision": "Reportar recebimento de 90%, completude de 80% da base esperada e pontualidade de 70%, com denominadores declarados.",
    "misconception": "Publicar qualidade de 90% usando apenas quantidade recebida.",
    "changedConstraint": "Três unidades estavam formalmente fechadas no período e deixam de ser elegíveis.",
    "tasks": [
      "Cadastro de unidades elegíveis",
      "Validador de campos obrigatórios",
      "Registro de prazo",
      "Painel de três dimensões",
      "Fila de correção",
      "Relatório de mudança de denominador"
    ],
    "method": "Separe cobertura de envio, completude do conteúdo e pontualidade. Uma dimensão não substitui as demais. Defina população elegível por período e mantenha histórico de abertura ou fechamento de unidades. Ausência de relatório não significa ausência de atividade. Dados podem exigir tratamento de confidencialidade mesmo agregados em locais pequenos; publique apenas o necessário para decisão operacional. O exercício aborda coordenação administrativa e logística, sem diagnóstico, prescrição ou liberação de produtos. Preserve identidade de item, lote, validade, localização e estado de autorização. Uma exceção deve ser registrada e encaminhada ao responsável, mantendo a evidência original. Use dados fictícios ou anonimizados e acesso mínimo. Defina o denominador de cada indicador e diferencie falha de registro de falha confirmada. Melhoria operacional precisa preservar segurança, equidade de atendimento e capacidade de rastrear a decisão.",
    "workedExample": "Quarenta e cinco recebidos em 50 esperados correspondem a 90%. Quarenta completos em 50 dão 80%, e 35 pontuais em 50 dão 70%. Se forem usados somente recebidos como base, as taxas mudam para 88,89% e 77,78%; esses indicadores precisam de rótulos diferentes e não devem ser comparados diretamente. No dossiê de completude de relatórios de unidades de saúde remotas, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reportar recebimento de 90%, completude de 80% da base esperada e pontualidade de 70%, com denominadores declarados. Compare a recomendação com esta alternativa incorreta: Publicar qualidade de 90% usando apenas quantidade recebida. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.dhis2.org/en/implement/data-quality/analysis.html",
      "https://log.logcluster.org/sites/default/files/2024-05/USAID%20-%20Logistics%20Handbook.pdf"
    ],
    "region": "africa"
  },
  {
    "id": "af-sobrevivencia-de-mudas-em-restauracao-do-sahel",
    "title": "Sobrevivência de mudas em restauração do Sahel",
    "track": "data",
    "role": "Analista de monitoramento de restauração",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um projeto no Senegal planta 1000 mudas; após seis meses, localiza e verifica 800, das quais 600 estão vivas e 200 mortas. As outras 200 plantadas não foram localizadas e seu estado permanece desconhecido.",
    "decision": "Reportar sobrevivência observada de 75% nas 800 verificadas e cobertura de verificação de 80%, sem presumir estado das 200 restantes.",
    "misconception": "Publicar 60% como sobrevivência definitiva de todas as mudas e tratar não verificadas como mortas.",
    "changedConstraint": "A área não visitada concentra solos diferentes dos demais.",
    "tasks": [
      "Cadastro de parcelas e mudas",
      "Protocolo de verificação",
      "Indicador de sobrevivência observada",
      "Mapa de cobertura da campanha",
      "Análise de viés de ausência",
      "Plano de revisita"
    ],
    "method": "Diferencie população plantada, amostra ou cobertura inspecionada e estado observado. Uma muda não localizada não é automaticamente morta. Registre motivo de ausência e investigue se áreas não visitadas têm condições distintas. Compare campanhas com o mesmo critério de vida e identificação. A sobrevivência inicial mede estabelecimento e não demonstra, sozinha, recuperação ecológica permanente ou benefício climático certificado. Defina a unidade de observação, o perímetro espacial e o período antes de comparar resultados ambientais. Uma observação não mede automaticamente causalidade nem permanência. Diferencie atividade executada, condição ecológica observada e resultado atribuído ao projeto. Mantenha referências de localização com acesso proporcional ao risco, especialmente para espécies sensíveis e comunidades. A proposta deve explicitar autorização, consulta local e limites do levantamento. Indicadores precisam de protocolo repetível, tratamento de ausências e verificação independente quando exigida.",
    "workedExample": "Seiscentas vivas entre 800 verificadas resultam em 75%. A campanha verificou 800 de 1000, ou 80%. O produto dessas frações é 60% de mudas plantadas confirmadas vivas, mas essa é uma medida de confirmação mínima, diferente de afirmar sobrevivência definitiva de toda a população. No dossiê de sobrevivência de mudas em restauração do sahel, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reportar sobrevivência observada de 75% nas 800 verificadas e cobertura de verificação de 80%, sem presumir estado das 200 restantes. Compare a recomendação com esta alternativa incorreta: Publicar 60% como sobrevivência definitiva de todas as mudas e tratar não verificadas como mortas. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.fao.org/sustainable-forest-management-toolbox/modules/forest-restoration/en",
      "https://www.fao.org/4/x5307e/x5307e08.htm"
    ],
    "region": "africa"
  },
  {
    "id": "af-desenho-de-amostragem-para-manguezais-comunitarios",
    "title": "Desenho de amostragem para manguezais comunitários",
    "track": "data",
    "role": "Assistente de monitoramento costeiro",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma campanha em Moçambique mede dez parcelas perto da estrada e nenhuma nas áreas inundáveis distantes; pretende representar 100 hectares.",
    "decision": "Estratificar áreas por condição de acesso e inundação e redesenhar a seleção, declarando que a amostra atual é de conveniência.",
    "misconception": "Extrapolar a média das dez parcelas para todos os 100 hectares sem discutir representatividade.",
    "changedConstraint": "O acesso remoto fica disponível apenas em duas marés por mês.",
    "tasks": [
      "Mapa de estratos de manguezal",
      "Plano de seleção de parcelas",
      "Calendário de acesso seguro",
      "Ficha de medição",
      "Registro de limitações de cobertura",
      "Plano de análise por estrato"
    ],
    "method": "Comece pelo objetivo da estimativa e pelos domínios ecológicos relevantes. Facilidade de acesso não deve definir silenciosamente a população representada. Delimite estratos e selecione parcelas com procedimento documentado, considerando segurança e autorização local. Registre esforço de observação e condições de maré. Uma amostra estratificada só melhora inferência se a alocação e os pesos forem coerentes com a área representada. Defina a unidade de observação, o perímetro espacial e o período antes de comparar resultados ambientais. Uma observação não mede automaticamente causalidade nem permanência. Diferencie atividade executada, condição ecológica observada e resultado atribuído ao projeto. Mantenha referências de localização com acesso proporcional ao risco, especialmente para espécies sensíveis e comunidades. A proposta deve explicitar autorização, consulta local e limites do levantamento. Indicadores precisam de protocolo repetível, tratamento de ausências e verificação independente quando exigida.",
    "workedExample": "As dez parcelas descrevem a faixa próxima da estrada. Sem observações das zonas distantes, não há base para assumir igualdade de condições. Se metade da área estiver nesse domínio não observado, uma extrapolação única esconderia exatamente a maior lacuna. O plano deve prever seleção e análise por estrato. No dossiê de desenho de amostragem para manguezais comunitários, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Estratificar áreas por condição de acesso e inundação e redesenhar a seleção, declarando que a amostra atual é de conveniência. Compare a recomendação com esta alternativa incorreta: Extrapolar a média das dez parcelas para todos os 100 hectares sem discutir representatividade. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.fao.org/3/ca6927en/CA6927EN.pdf",
      "https://www.fao.org/sustainable-forest-management-toolbox/modules/forest-management-monitoring/en"
    ],
    "region": "africa"
  },
  {
    "id": "af-esforco-amostral-em-monitoramento-de-fauna-por-cameras",
    "title": "Esforço amostral em monitoramento de fauna por câmeras",
    "track": "data",
    "role": "Analista de dados de biodiversidade",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Dois locais na Tanzânia registram 40 e 30 eventos independentes; o primeiro teve 200 noites-câmera e o segundo 100.",
    "decision": "Comparar taxas de 20 e 30 eventos por 100 noites-câmera, sem inferir abundância absoluta somente desses registros.",
    "misconception": "Concluir que o primeiro tem mais fauna apenas por registrar 40 eventos contra 30.",
    "changedConstraint": "Uma câmera do segundo local ficou inativa sem registro de horário.",
    "tasks": [
      "Inventário de câmeras",
      "Registro de tempo ativo",
      "Regra de evento independente",
      "Taxa por esforço",
      "Máscara de períodos inválidos",
      "Relatório de limites de inferência"
    ],
    "method": "Normalize eventos pelo esforço efetivamente ativo e defina independência temporal para evitar contagem repetida do mesmo episódio. Espécies e locais podem ter probabilidades diferentes de detecção. Uma taxa de encontro é indicador operacional e não estimativa automática de população. Preserve localização sensível com acesso restrito. Verifique falhas de equipamento e data antes de comparar campanhas. Defina a unidade de observação, o perímetro espacial e o período antes de comparar resultados ambientais. Uma observação não mede automaticamente causalidade nem permanência. Diferencie atividade executada, condição ecológica observada e resultado atribuído ao projeto. Mantenha referências de localização com acesso proporcional ao risco, especialmente para espécies sensíveis e comunidades. A proposta deve explicitar autorização, consulta local e limites do levantamento. Indicadores precisam de protocolo repetível, tratamento de ausências e verificação independente quando exigida.",
    "workedExample": "No primeiro local, 40 dividido por 200 e multiplicado por 100 resulta em 20 eventos por 100 noites-câmera. No segundo, 30 sobre 100 resulta em 30. A ordenação muda ao considerar esforço. Ainda assim, diferenças de habitat e detecção impedem transformar essas taxas diretamente em número de animais. No dossiê de esforço amostral em monitoramento de fauna por câmeras, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Comparar taxas de 20 e 30 eventos por 100 noites-câmera, sem inferir abundância absoluta somente desses registros. Compare a recomendação com esta alternativa incorreta: Concluir que o primeiro tem mais fauna apenas por registrar 40 eventos contra 30. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.fao.org/sustainable-forest-management-toolbox/modules/forest-management-monitoring/en",
      "https://www.fao.org/3/ca6927en/CA6927EN.pdf"
    ],
    "region": "africa"
  },
  {
    "id": "af-priorizacao-de-cercas-de-protecao-em-areas-restauradas",
    "title": "Priorização de cercas de proteção em áreas restauradas",
    "track": "business",
    "role": "Planejador de projetos de restauração",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um projeto em Gana tem orçamento para proteger duas de quatro parcelas; as parcelas A e B apresentam dano recorrente documentado, C e D não foram inspecionadas.",
    "decision": "Priorizar avaliação de risco e inspeção de C e D antes de tratar ausência de registro como ausência de dano.",
    "misconception": "Afirmar que somente A e B precisam de proteção porque são as únicas com dano registrado.",
    "changedConstraint": "Uma comunidade informa rota de passagem de gado próxima de D.",
    "tasks": [
      "Matriz de risco por parcela",
      "Registro de cobertura de inspeção",
      "Mapa de uso comunitário",
      "Cenário de orçamento",
      "Plano de consulta local",
      "Justificativa de prioridade"
    ],
    "method": "Use evidência de ameaça, consequência e possibilidade de mitigação, distinguindo observado e desconhecido. Parcela sem inspeção deve aparecer como lacuna, não como risco zero. Considere acesso comunitário e efeitos de deslocar pressão para outra área. Uma intervenção de proteção exige autorização e diálogo local. Priorize medidas com critério transparente e planeje verificação de eficácia após implantação. Defina a unidade de observação, o perímetro espacial e o período antes de comparar resultados ambientais. Uma observação não mede automaticamente causalidade nem permanência. Diferencie atividade executada, condição ecológica observada e resultado atribuído ao projeto. Mantenha referências de localização com acesso proporcional ao risco, especialmente para espécies sensíveis e comunidades. A proposta deve explicitar autorização, consulta local e limites do levantamento. Indicadores precisam de protocolo repetível, tratamento de ausências e verificação independente quando exigida.",
    "workedExample": "A e B têm dano confirmado; C e D têm estado desconhecido. O orçamento para duas parcelas não resolve essa incerteza. Uma inspeção breve ou informação local validada pode alterar a ordem de prioridade, sobretudo se D estiver exposta a uma rota de passagem não considerada inicialmente. No dossiê de priorização de cercas de proteção em áreas restauradas, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Priorizar avaliação de risco e inspeção de C e D antes de tratar ausência de registro como ausência de dano. Compare a recomendação com esta alternativa incorreta: Afirmar que somente A e B precisam de proteção porque são as únicas com dano registrado. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.fao.org/sustainable-forest-management-toolbox/modules/forest-restoration/en",
      "https://www.fao.org/3/ca6927en/CA6927EN.pdf"
    ],
    "region": "africa"
  },
  {
    "id": "af-balanco-de-materiais-em-viveiros-de-restauracao",
    "title": "Balanço de materiais em viveiros de restauração",
    "track": "industry",
    "role": "Analista de operações de viveiros",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um viveiro em Ruanda inicia com 2000 recipientes, despacha 1200 com mudas, recebe 700 de volta e registra 100 danificados; não há outros movimentos.",
    "decision": "Reconciliar 1500 recipientes em posse física, sendo 1400 utilizáveis se os 100 danificados estiverem no saldo, e 500 ainda fora.",
    "misconception": "Declarar 700 recipientes perdidos ignorando os retornos e a posição de despacho.",
    "changedConstraint": "Duzentos recipientes devolvidos ainda aguardam triagem.",
    "tasks": [
      "Razão de recipientes",
      "Registro de despacho e retorno",
      "Triagem de condição",
      "Balanço de recipientes utilizáveis",
      "Indicador de retorno",
      "Plano de reposição"
    ],
    "method": "Separe localização e condição do recipiente: em uso externo, em estoque, em triagem ou danificado. Um retorno aumenta posse física, mas não comprova reutilização imediata. Registre se dano está incluído no saldo ou foi baixado, evitando subtração dupla. Compare taxa de retorno por coorte de despacho e prazo, porque envios recentes ainda podem estar dentro da janela acordada. Defina a unidade de observação, o perímetro espacial e o período antes de comparar resultados ambientais. Uma observação não mede automaticamente causalidade nem permanência. Diferencie atividade executada, condição ecológica observada e resultado atribuído ao projeto. Mantenha referências de localização com acesso proporcional ao risco, especialmente para espécies sensíveis e comunidades. A proposta deve explicitar autorização, consulta local e limites do levantamento. Indicadores precisam de protocolo repetível, tratamento de ausências e verificação independente quando exigida.",
    "workedExample": "De 2000, saem 1200 e voltam 700, deixando 1500 fisicamente no viveiro antes de qualquer baixa. Se os 100 danificados permanecem ali, há 1400 utilizáveis e 500 fora. A primeira reconciliação deve corrigir qualquer conclusão que confundiu posse e condição; o enunciado exige explicitá-las antes de fechar saldo. No dossiê de balanço de materiais em viveiros de restauração, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reconciliar 1500 recipientes em posse física, sendo 1400 utilizáveis se os 100 danificados estiverem no saldo, e 500 ainda fora. Compare a recomendação com esta alternativa incorreta: Declarar 700 recipientes perdidos ignorando os retornos e a posição de despacho. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/systematic-recording-and-support-documentation",
      "https://www.fao.org/sustainable-forest-management-toolbox/modules/forest-restoration/en"
    ],
    "region": "africa"
  },
  {
    "id": "af-preparacao-documental-de-projetos-de-creditos-de-natureza",
    "title": "Preparação documental de projetos de créditos de natureza",
    "track": "quality",
    "role": "Assistente de integridade de projetos ambientais",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um projeto em Madagascar apresenta 200 hectares contratados, mas somente 150 têm limites geográficos verificados; não existe validação externa de créditos.",
    "decision": "Separar área contratada e área verificada e impedir divulgação de créditos certificados sem processo comprovado.",
    "misconception": "Anunciar 200 hectares de créditos certificados apenas com contratos assinados.",
    "changedConstraint": "Parte dos 150 hectares tem sobreposição com outro projeto.",
    "tasks": [
      "Matriz de direitos e limites",
      "Inventário de evidências espaciais",
      "Registro de sobreposições",
      "Mapa de partes interessadas",
      "Checklist de alegações públicas",
      "Plano de validação independente"
    ],
    "method": "Acompanhe prontidão documental em etapas: direitos, delimitação, linha de base, método, monitoramento e verificação aplicável. Contrato de área não equivale a resultado ambiental nem a crédito emitido. Identifique sobreposição e dupla contagem antes de agregar. Proteja dados comunitários e registre consentimentos pertinentes. O curso organiza evidências e linguagem de divulgação, sem atribuir acreditação ou vender promessa de certificação. Defina a unidade de observação, o perímetro espacial e o período antes de comparar resultados ambientais. Uma observação não mede automaticamente causalidade nem permanência. Diferencie atividade executada, condição ecológica observada e resultado atribuído ao projeto. Mantenha referências de localização com acesso proporcional ao risco, especialmente para espécies sensíveis e comunidades. A proposta deve explicitar autorização, consulta local e limites do levantamento. Indicadores precisam de protocolo repetível, tratamento de ausências e verificação independente quando exigida.",
    "workedExample": "Dos 200 hectares contratados, 150 estão delimitados e verificados no sentido espacial informado, ou 75%. Isso não significa que 75% de créditos estejam certificados. São etapas e unidades diferentes. Uma sobreposição reduz a confiança no perímetro elegível e exige resolução antes de qualquer alegação quantitativa de resultado. No dossiê de preparação documental de projetos de créditos de natureza, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Separar área contratada e área verificada e impedir divulgação de créditos certificados sem processo comprovado. Compare a recomendação com esta alternativa incorreta: Anunciar 200 hectares de créditos certificados apenas com contratos assinados. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.fao.org/3/ca6927en/CA6927EN.pdf",
      "https://www.fao.org/sustainable-forest-management-toolbox/modules/forest-restoration/en"
    ],
    "region": "africa"
  },
  {
    "id": "af-monitoramento-de-erosao-com-parcelas-de-referencia",
    "title": "Monitoramento de erosão com parcelas de referência",
    "track": "data",
    "role": "Assistente de avaliação de conservação do solo",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma parcela tratada reduz sedimento de 100 para 60 unidades; a referência não tratada reduz de 80 para 64 no mesmo período.",
    "decision": "Comparar mudanças de menos 40 e menos 16, com diferença de mudanças de menos 24, sem afirmar causalidade definitiva de um único par.",
    "misconception": "Atribuir toda a redução de 40 ao tratamento ignorando mudança da referência.",
    "changedConstraint": "O período posterior teve chuva muito menor.",
    "tasks": [
      "Base de períodos comparáveis",
      "Registro de tratamento",
      "Medição de sedimento",
      "Memória de diferença de mudanças",
      "Análise de condições de chuva",
      "Plano de replicação"
    ],
    "method": "Uma comparação antes e depois pode confundir tratamento com clima e outras mudanças. Use referência quando apropriada e examine se os locais eram comparáveis. A diferença de mudanças ajuda a organizar contraste, mas pressupostos e replicação continuam necessários. Preserve método de coleta, área e unidade. Não converta uma observação local em eficácia universal de uma técnica de conservação. Defina a unidade de observação, o perímetro espacial e o período antes de comparar resultados ambientais. Uma observação não mede automaticamente causalidade nem permanência. Diferencie atividade executada, condição ecológica observada e resultado atribuído ao projeto. Mantenha referências de localização com acesso proporcional ao risco, especialmente para espécies sensíveis e comunidades. A proposta deve explicitar autorização, consulta local e limites do levantamento. Indicadores precisam de protocolo repetível, tratamento de ausências e verificação independente quando exigida.",
    "workedExample": "A tratada muda 60 menos 100, igual a menos 40. A referência muda 64 menos 80, igual a menos 16. A diferença entre mudanças é menos 24. Esse contraste é mais informativo que a redução bruta, mas não elimina diferenças prévias nem comprova que o tratamento foi a única causa. No dossiê de monitoramento de erosão com parcelas de referência, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Comparar mudanças de menos 40 e menos 16, com diferença de mudanças de menos 24, sem afirmar causalidade definitiva de um único par. Compare a recomendação com esta alternativa incorreta: Atribuir toda a redução de 40 ao tratamento ignorando mudança da referência. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.fao.org/3/ca6927en/CA6927EN.pdf",
      "https://www.fao.org/sustainable-forest-management-toolbox/modules/forest-management-monitoring/en"
    ],
    "region": "africa"
  },
  {
    "id": "af-planejamento-de-brigadas-comunitarias-por-risco-de-incendio",
    "title": "Planejamento de brigadas comunitárias por risco de incêndio",
    "track": "business",
    "role": "Coordenador administrativo de prevenção ambiental",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um programa na África do Sul tem três áreas com risco classificado pelo órgão competente como alto, médio e alto; dispõe de duas equipes de prevenção documental e nenhum recurso de combate.",
    "decision": "Organizar visitas preventivas nas duas áreas de risco alto e encaminhar qualquer ocorrência ao serviço competente; não mobilizar combate sem habilitação.",
    "misconception": "Enviar as equipes administrativas para combater fogo por estarem próximas.",
    "changedConstraint": "Uma área média recebe novo alerta oficial de risco alto.",
    "tasks": [
      "Mapa de alertas oficiais",
      "Agenda de ações preventivas",
      "Cadastro de contatos competentes",
      "Protocolo de comunicação",
      "Registro de orientações locais",
      "Plano de revisão de prioridade"
    ],
    "method": "Diferencie prevenção administrativa, preparação comunitária e combate especializado. Use classificação e orientações oficiais, registrando data e validade do alerta. A prioridade deve incorporar exposição e capacidade de acesso seguro sem improvisar resposta operacional. Planeje comunicação, atualização de contatos e documentação de encaminhamento. O estudo não ensina intervenção em incêndio e não substitui treinamento ou autorização do serviço responsável. Defina a unidade de observação, o perímetro espacial e o período antes de comparar resultados ambientais. Uma observação não mede automaticamente causalidade nem permanência. Diferencie atividade executada, condição ecológica observada e resultado atribuído ao projeto. Mantenha referências de localização com acesso proporcional ao risco, especialmente para espécies sensíveis e comunidades. A proposta deve explicitar autorização, consulta local e limites do levantamento. Indicadores precisam de protocolo repetível, tratamento de ausências e verificação independente quando exigida.",
    "workedExample": "Com duas equipes e duas áreas inicialmente classificadas como altas, a agenda preventiva pode cobrir ambas primeiro. Se uma terceira área sobe de classe, o critério precisa considerar gravidade e janela de ação com orientação competente. A disponibilidade de equipe administrativa não cria capacidade de combate nem autorização para aproximação de ocorrência. No dossiê de planejamento de brigadas comunitárias por risco de incêndio, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Organizar visitas preventivas nas duas áreas de risco alto e encaminhar qualquer ocorrência ao serviço competente; não mobilizar combate sem habilitação. Compare a recomendação com esta alternativa incorreta: Enviar as equipes administrativas para combater fogo por estarem próximas. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.fao.org/sustainable-forest-management-toolbox/modules/forest-restoration/en",
      "https://www.fao.org/3/ca6927en/CA6927EN.pdf"
    ],
    "region": "africa"
  },
  {
    "id": "af-analise-de-beneficio-comunitario-em-turismo-de-conservacao",
    "title": "Análise de benefício comunitário em turismo de conservação",
    "track": "business",
    "role": "Analista de operações de turismo responsável",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma operação em Namíbia fatura 10000 unidades; paga 2500 a fornecedores locais e 1500 de salários locais, sem sobreposição entre categorias.",
    "decision": "Reportar 4000 unidades de pagamentos locais diretos, ou 40% da receita, sem chamar isso de impacto econômico total.",
    "misconception": "Somar efeitos indiretos não medidos e anunciar benefício local de 80%.",
    "changedConstraint": "Um fornecedor local revende integralmente produto importado.",
    "tasks": [
      "Mapa de pagamentos locais",
      "Definição de fornecedor elegível",
      "Reconciliação de categorias",
      "Indicador de participação direta",
      "Registro de limitações de impacto",
      "Plano de compra local responsável"
    ],
    "method": "Defina localidade e tipo de benefício antes de calcular. Pagamento direto, valor adicionado e impacto multiplicador são medidas diferentes. Evite dupla contagem entre salário e contratação e registre se o fornecedor é intermediário. Uma participação de compras locais não prova distribuição justa nem conservação efetiva. Combine indicadores financeiros com consulta e evidências sociais apropriadas ao contexto. Defina a unidade de observação, o perímetro espacial e o período antes de comparar resultados ambientais. Uma observação não mede automaticamente causalidade nem permanência. Diferencie atividade executada, condição ecológica observada e resultado atribuído ao projeto. Mantenha referências de localização com acesso proporcional ao risco, especialmente para espécies sensíveis e comunidades. A proposta deve explicitar autorização, consulta local e limites do levantamento. Indicadores precisam de protocolo repetível, tratamento de ausências e verificação independente quando exigida.",
    "workedExample": "Dois mil e quinhentos de compras mais 1500 de salários somam 4000, equivalentes a 40% de 10000. Como as categorias não se sobrepõem, a soma é válida. Se o fornecedor apenas revender importados, o pagamento continua local pela definição adotada, mas não demonstra o mesmo valor adicionado local. No dossiê de análise de benefício comunitário em turismo de conservação, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reportar 4000 unidades de pagamentos locais diretos, ou 40% da receita, sem chamar isso de impacto econômico total. Compare a recomendação com esta alternativa incorreta: Somar efeitos indiretos não medidos e anunciar benefício local de 80%. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.fao.org/3/ca6927en/CA6927EN.pdf",
      "https://log.logcluster.org/en/monitoring-logistics-performance"
    ],
    "region": "africa"
  },
  {
    "id": "af-rastreabilidade-de-coleta-de-residuos-em-areas-protegidas",
    "title": "Rastreabilidade de coleta de resíduos em áreas protegidas",
    "track": "quality",
    "role": "Analista de gestão de resíduos turísticos",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma campanha em Cabo Verde coleta 500 kg, entrega 350 para reciclador com comprovante e mantém 150 em armazenamento temporário autorizado.",
    "decision": "Reportar 500 coletados e 350 encaminhados com comprovação; não declarar 100% reciclado sem evidência do processamento.",
    "misconception": "Usar peso coletado como quantidade efetivamente reciclada.",
    "changedConstraint": "O comprovante do reciclador informa rejeição de 50 kg.",
    "tasks": [
      "Balanço de massa de resíduos",
      "Registro de coleta por local",
      "Comprovantes de transferência",
      "Mapa de armazenamento temporário",
      "Indicador de destinação comprovada",
      "Relatório de rejeição"
    ],
    "method": "Separe coleta, triagem, transferência e processamento final. Um comprovante de recebimento não demonstra sozinho reciclagem integral. Registre material, massa, condição e destino autorizado, preservando evidência por lote. Classifique rejeitos e estoque temporário sem ocultá-los do indicador. A comunicação pública precisa usar o verbo correspondente à etapa realmente comprovada, evitando transformar boa intenção em alegação de resultado final. Defina a unidade de observação, o perímetro espacial e o período antes de comparar resultados ambientais. Uma observação não mede automaticamente causalidade nem permanência. Diferencie atividade executada, condição ecológica observada e resultado atribuído ao projeto. Mantenha referências de localização com acesso proporcional ao risco, especialmente para espécies sensíveis e comunidades. A proposta deve explicitar autorização, consulta local e limites do levantamento. Indicadores precisam de protocolo repetível, tratamento de ausências e verificação independente quando exigida.",
    "workedExample": "Dos 500 kg coletados, 350 têm transferência comprovada, ou 70%, e 150 permanecem armazenados, ou 30%. Se o reciclador rejeitar 50 dos 350, o máximo documental encaminhado para processamento passa a 300, condicionado à evidência posterior. A coleta continua sendo de 500, mas o indicador de destino muda. No dossiê de rastreabilidade de coleta de resíduos em áreas protegidas, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reportar 500 coletados e 350 encaminhados com comprovação; não declarar 100% reciclado sem evidência do processamento. Compare a recomendação com esta alternativa incorreta: Usar peso coletado como quantidade efetivamente reciclada. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/systematic-recording-and-support-documentation",
      "https://logcluster.org/en/document/logistics-operational-guide-log-green-logistics"
    ],
    "region": "africa"
  },
  {
    "id": "af-balanco-de-agua-em-lavanderias-texteis-industriais",
    "title": "Balanço de água em lavanderias têxteis industriais",
    "track": "industry",
    "role": "Analista de produção mais limpa",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma unidade em Marrocos usa 100 m³ de água para 20 toneladas de tecido; após ajuste usa 90 m³ para 15 toneladas com qualidade equivalente.",
    "decision": "Comparar intensidade de cinco e seis m³ por tonelada e reconhecer piora de 20%, apesar da redução do consumo total.",
    "misconception": "Anunciar eficiência melhor porque o consumo total caiu 10%.",
    "changedConstraint": "A mistura de produtos passa a incluir tecido com processo diferente.",
    "tasks": [
      "Balanço de água por operação",
      "Produção equivalente por lote",
      "Indicador de intensidade hídrica",
      "Registro de qualidade",
      "Cenário de mistura de produtos",
      "Plano de teste controlado"
    ],
    "method": "Normalize consumo pela unidade de produção relevante antes de concluir melhoria. Queda de volume pode resultar apenas de menor produção. Controle mistura de produto, qualidade e retrabalho, pois mudam a necessidade do processo. Registre fronteira de medição e compare períodos equivalentes. Uma proposta de redução deve preservar requisitos técnicos e ser testada com autorização, sem intervenção improvisada em equipamentos ou químicos. Um balanço de processo acompanha entradas, saídas úteis, perdas e variação de estoque no mesmo período. Não declare eficiência usando produção de um turno e consumo de outro. Identifique medidor, unidade, condição operacional e tolerância. A análise aqui é documental e não autoriza trabalho em máquinas, químicos ou instalações perigosas. Priorize prevenção da perda na origem, mantendo qualidade e segurança. Registre teste controlado, critério de aceite e responsável pela autorização de qualquer mudança real.",
    "workedExample": "Antes, 100 dividido por 20 resulta em cinco m³ por tonelada. Depois, 90 dividido por 15 resulta em seis. A intensidade sobe uma unidade, ou 20% sobre cinco. O consumo total caiu, mas o processo usou mais água por unidade produzida sob as condições comparadas. No dossiê de balanço de água em lavanderias têxteis industriais, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Comparar intensidade de cinco e seis m³ por tonelada e reconhecer piora de 20%, apesar da redução do consumo total. Compare a recomendação com esta alternativa incorreta: Anunciar eficiência melhor porque o consumo total caiu 10%. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.epa.gov/sustainability/lean-water-toolkit-chapter-3",
      "https://www.epa.gov/sustainability/lean-water-toolkit-chapter-2"
    ],
    "region": "africa"
  },
  {
    "id": "af-rendimento-de-corte-em-pequenas-confeccoes",
    "title": "Rendimento de corte em pequenas confecções",
    "track": "industry",
    "role": "Analista de planejamento de confecção",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma oficina em Etiópia recebe 500 metros de tecido, incorpora 380 em peças e registra 70 de retalhos recuperáveis e 50 de descarte.",
    "decision": "Reportar aproveitamento direto de 76% e segregar 14% recuperável de 10% descartado.",
    "misconception": "Chamar os 24% não incorporados de descarte definitivo.",
    "changedConstraint": "Os retalhos deixam de ter comprador confirmado.",
    "tasks": [
      "Mapa de encaixe documental",
      "Balanço de tecido",
      "Classificação de retalhos",
      "Indicador de aproveitamento",
      "Registro de destinação",
      "Plano de teste de redução de sobra"
    ],
    "method": "Defina comprimento, área ou massa conforme a geometria e mantenha a unidade consistente. Material incorporado, sobra recuperável e descarte são saídas distintas. Compare encaixes com a mesma mistura de tamanhos e qualidade, evitando atribuir ganho a mudança de produto. Recuperável significa possibilidade comprovada de uso, não receita automática. Registre restrições e valide qualquer alteração de processo com a equipe. Um balanço de processo acompanha entradas, saídas úteis, perdas e variação de estoque no mesmo período. Não declare eficiência usando produção de um turno e consumo de outro. Identifique medidor, unidade, condição operacional e tolerância. A análise aqui é documental e não autoriza trabalho em máquinas, químicos ou instalações perigosas. Priorize prevenção da perda na origem, mantendo qualidade e segurança. Registre teste controlado, critério de aceite e responsável pela autorização de qualquer mudança real.",
    "workedExample": "Trezentos e oitenta de 500 metros representam 76% incorporados. Setenta metros correspondem a 14% recuperáveis e 50 a 10% descartados. As três parcelas somam 100%. Se o destino dos retalhos ficar incerto, a classificação exige revisão, mas não autoriza apagar sua existência do balanço. No dossiê de rendimento de corte em pequenas confecções, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reportar aproveitamento direto de 76% e segregar 14% recuperável de 10% descartado. Compare a recomendação com esta alternativa incorreta: Chamar os 24% não incorporados de descarte definitivo. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.unep.org/resources/report/cleaner-production-training-resource-package",
      "https://log.logcluster.org/en/systematic-recording-and-support-documentation"
    ],
    "region": "africa"
  },
  {
    "id": "af-controle-de-refugo-em-fabricacao-de-blocos",
    "title": "Controle de refugo em fabricação de blocos",
    "track": "quality",
    "role": "Analista de qualidade de produção",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma unidade em Gana produz 2000 blocos, reprova 120 na inspeção e reinspeciona 80 após correção autorizada, dos quais 60 passam.",
    "decision": "Separar rejeição inicial de 6%, recuperação de 60 e refugo final de 60, ou 3% da produção.",
    "misconception": "Publicar refugo final de 6% ignorando os recuperados ou somar reinspeções à produção.",
    "changedConstraint": "O critério de inspeção muda no próximo lote.",
    "tasks": [
      "Plano de inspeção documental",
      "Registro de primeira passagem",
      "Rastreio de retrabalho",
      "Indicador de refugo final",
      "Controle de versão de critério",
      "Análise de causa de reprovação"
    ],
    "method": "Diferencie unidade produzida e evento de inspeção. A mesma peça reinspecionada não aumenta produção. Mantenha resultado da primeira passagem, retrabalho autorizado e resultado final vinculados por identificador. Compare lotes apenas com critérios equivalentes e preserve requisitos de segurança e desempenho. A análise estatística identifica padrões; liberação técnica de material requer autoridade e ensaios apropriados. Um balanço de processo acompanha entradas, saídas úteis, perdas e variação de estoque no mesmo período. Não declare eficiência usando produção de um turno e consumo de outro. Identifique medidor, unidade, condição operacional e tolerância. A análise aqui é documental e não autoriza trabalho em máquinas, químicos ou instalações perigosas. Priorize prevenção da perda na origem, mantendo qualidade e segurança. Registre teste controlado, critério de aceite e responsável pela autorização de qualquer mudança real.",
    "workedExample": "Cento e vinte reprovados de 2000 correspondem a 6% inicialmente. Sessenta passam após correção, deixando 60 ainda reprovados no total. O refugo final é 60 sobre 2000, ou 3%. Oitenta reinspeções são eventos adicionais e não devem elevar o denominador para 2080 peças. No dossiê de controle de refugo em fabricação de blocos, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Separar rejeição inicial de 6%, recuperação de 60 e refugo final de 60, ou 3% da produção. Compare a recomendação com esta alternativa incorreta: Publicar refugo final de 6% ignorando os recuperados ou somar reinspeções à produção. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc331.htm",
      "https://www.unep.org/resources/report/cleaner-production-training-resource-package"
    ],
    "region": "africa"
  },
  {
    "id": "af-intensidade-energetica-de-pequenas-moagens",
    "title": "Intensidade energética de pequenas moagens",
    "track": "energy",
    "role": "Analista de eficiência de processos",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um moinho em Zâmbia consome 600 kWh para 30 toneladas em uma semana e 550 para 22 na seguinte; não houve mudança de produto registrada.",
    "decision": "Comparar 20 e 25 kWh por tonelada e investigar piora de 25% na intensidade.",
    "misconception": "Declarar melhora de eficiência porque a conta total caiu 50 kWh.",
    "changedConstraint": "Parte do consumo da segunda semana pertence a manutenção sem produção.",
    "tasks": [
      "Base de energia e produção",
      "Indicador de consumo específico",
      "Registro de tempo sem carga",
      "Separação de manutenção",
      "Cenário de normalização",
      "Plano de medição por operação"
    ],
    "method": "Use energia no mesmo intervalo da produção e explicite o que entra no medidor. Consumo em vazio ou manutenção pode elevar intensidade quando o volume cai. Separe componente fixo e variável quando houver dados suficientes, evitando ajuste arbitrário. Compare produto e condição operacional equivalentes. O diagnóstico orienta medição e revisão autorizada, sem recomendar intervenção elétrica ou mecânica não habilitada. Um balanço de processo acompanha entradas, saídas úteis, perdas e variação de estoque no mesmo período. Não declare eficiência usando produção de um turno e consumo de outro. Identifique medidor, unidade, condição operacional e tolerância. A análise aqui é documental e não autoriza trabalho em máquinas, químicos ou instalações perigosas. Priorize prevenção da perda na origem, mantendo qualidade e segurança. Registre teste controlado, critério de aceite e responsável pela autorização de qualquer mudança real.",
    "workedExample": "Seiscentos kWh divididos por 30 toneladas dão 20 kWh por tonelada. Quinhentos e cinquenta sobre 22 dão 25. A diferença de cinco sobre a base de 20 representa 25% de piora. O total menor acompanha produção menor e não prova ganho de processo. No dossiê de intensidade energética de pequenas moagens, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Comparar 20 e 25 kWh por tonelada e investigar piora de 25% na intensidade. Compare a recomendação com esta alternativa incorreta: Declarar melhora de eficiência porque a conta total caiu 50 kWh. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.unep.org/resources/report/cleaner-production-training-resource-package",
      "https://docs.nlr.gov/docs/fy19osti/73822.pdf"
    ],
    "region": "africa"
  },
  {
    "id": "af-programacao-de-manutencao-por-criticidade-em-oficinas",
    "title": "Programação de manutenção por criticidade em oficinas",
    "track": "industry",
    "role": "Planejador de manutenção industrial",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma oficina em Nigéria tem máquina A com falha que para toda a linha e máquina B com ruído sem perda funcional; há janela para uma avaliação técnica inicial.",
    "decision": "Priorizar avaliação de A pela consequência sistêmica, mantendo B em acompanhamento conforme orientação competente.",
    "misconception": "Escolher B apenas porque sua intervenção parece mais rápida.",
    "changedConstraint": "A passa a ter equipamento de reserva disponível.",
    "tasks": [
      "Cadastro de ativos",
      "Mapa de dependências da linha",
      "Matriz de criticidade",
      "Agenda de avaliação técnica",
      "Registro de contingências",
      "Indicador de indisponibilidade"
    ],
    "method": "Avalie consequência, probabilidade e possibilidade de detecção com evidência proporcional. Facilidade de reparo é uma variável de programação, não medida única de prioridade. Separe avaliação técnica de execução e liberação. Registre dependências e redundância, porque reserva funcional pode mudar criticidade. O planejamento deve respeitar bloqueio, autorização e procedimentos locais de segurança, sem ensinar intervenção prática em máquina energizada. Um balanço de processo acompanha entradas, saídas úteis, perdas e variação de estoque no mesmo período. Não declare eficiência usando produção de um turno e consumo de outro. Identifique medidor, unidade, condição operacional e tolerância. A análise aqui é documental e não autoriza trabalho em máquinas, químicos ou instalações perigosas. Priorize prevenção da perda na origem, mantendo qualidade e segurança. Registre teste controlado, critério de aceite e responsável pela autorização de qualquer mudança real.",
    "workedExample": "No cenário inicial, A interrompe toda a linha e não há reserva informada, enquanto B ainda funciona. Isso sustenta a primeira avaliação em A. Se uma reserva validada entrar em operação, a consequência muda e a ordem pode ser revista. O registro precisa mostrar essa mudança de premissa. No dossiê de programação de manutenção por criticidade em oficinas, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Priorizar avaliação de A pela consequência sistêmica, mantendo B em acompanhamento conforme orientação competente. Compare a recomendação com esta alternativa incorreta: Escolher B apenas porque sua intervenção parece mais rápida. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.nlr.gov/docs/fy19osti/73822.pdf",
      "https://www.unep.org/resources/report/cleaner-production-training-resource-package"
    ],
    "region": "africa"
  },
  {
    "id": "af-balanco-de-embalagens-em-microindustrias-alimentares",
    "title": "Balanço de embalagens em microindústrias alimentares",
    "track": "industry",
    "role": "Analista de materiais de embalagem",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma unidade em Senegal inicia com 5000 embalagens, recebe 3000, usa 6200 e conta 1700 no fechamento, sem outro movimento documentado.",
    "decision": "Esperar 1800 e investigar diferença de 100 unidades, preservando contagem e registros.",
    "misconception": "Ajustar o sistema para 1700 sem registrar causa e aprovação.",
    "changedConstraint": "Cinquenta embalagens usadas estavam em lote de teste separado.",
    "tasks": [
      "Razão de embalagens",
      "Registro de consumo por ordem",
      "Conferência física",
      "Fila de divergências",
      "Cadastro de testes e amostras",
      "Plano de prevenção de perdas"
    ],
    "method": "Reconcilie estoque por item, lote e período, separando produção, amostras, avarias e devoluções. Uma diferença de contagem exige apuração antes de ajuste. Registre unidade de compra e de uso, pois caixas e embalagens individuais podem causar fator incorreto. Preserve histórico de correção e autorização. A análise de consumo deve considerar produção boa e refugo, sem esconder material usado em testes. Um balanço de processo acompanha entradas, saídas úteis, perdas e variação de estoque no mesmo período. Não declare eficiência usando produção de um turno e consumo de outro. Identifique medidor, unidade, condição operacional e tolerância. A análise aqui é documental e não autoriza trabalho em máquinas, químicos ou instalações perigosas. Priorize prevenção da perda na origem, mantendo qualidade e segurança. Registre teste controlado, critério de aceite e responsável pela autorização de qualquer mudança real.",
    "workedExample": "Cinco mil mais três mil menos 6200 gera saldo esperado de 1800. A contagem de 1700 fica 100 abaixo. Se 50 foram usadas em teste e não baixadas, metade da diferença ganha explicação documental; as outras 50 continuam abertas. O ajuste precisa vincular evidências em vez de apagar o desvio. No dossiê de balanço de embalagens em microindústrias alimentares, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Esperar 1800 e investigar diferença de 100 unidades, preservando contagem e registros. Compare a recomendação com esta alternativa incorreta: Ajustar o sistema para 1700 sem registrar causa e aprovação. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/systematic-recording-and-support-documentation",
      "https://www.unep.org/resources/report/cleaner-production-training-resource-package"
    ],
    "region": "africa"
  },
  {
    "id": "af-custo-de-retrabalho-em-montagem-de-equipamentos",
    "title": "Custo de retrabalho em montagem de equipamentos",
    "track": "business",
    "role": "Analista de custos de qualidade",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma montagem na África do Sul produz 400 unidades e retrabalha 40; cada retrabalho usa 20 minutos de mão de obra a 12 unidades monetárias por hora.",
    "decision": "Calcular 800 minutos, ou 13,33 horas, e custo direto de 160, sem incluir peças e atraso ainda não medidos.",
    "misconception": "Calcular 40 vezes 20 vezes 12 sem converter minutos para horas.",
    "changedConstraint": "Metade dos retrabalhos passa a consumir 35 minutos.",
    "tasks": [
      "Registro de causas de retrabalho",
      "Medição de tempo",
      "Memória de custo direto",
      "Quadro de custos não medidos",
      "Cenário de variação de duração",
      "Plano de teste de prevenção"
    ],
    "method": "Converta duração para a unidade da taxa antes de multiplicar. Diferencie custo direto incremental e absorção de custos fixos; uma estimativa não deve misturar os dois sem definição. Registre peças, reinspeção e atraso separadamente quando disponíveis. O número de retrabalhos não descreve gravidade de falha. Priorize causas com evidência e preserve critérios técnicos de qualidade na melhoria. Um balanço de processo acompanha entradas, saídas úteis, perdas e variação de estoque no mesmo período. Não declare eficiência usando produção de um turno e consumo de outro. Identifique medidor, unidade, condição operacional e tolerância. A análise aqui é documental e não autoriza trabalho em máquinas, químicos ou instalações perigosas. Priorize prevenção da perda na origem, mantendo qualidade e segurança. Registre teste controlado, critério de aceite e responsável pela autorização de qualquer mudança real.",
    "workedExample": "Quarenta retrabalhos de 20 minutos totalizam 800 minutos. Dividindo por 60, obtêm-se 13,333 horas. Multiplicando por 12, o custo direto é 160. A conta sem conversão resultaria em 9600, erro de fator 60. O valor correto ainda não inclui material nem impacto de prazo. No dossiê de custo de retrabalho em montagem de equipamentos, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Calcular 800 minutos, ou 13,33 horas, e custo direto de 160, sem incluir peças e atraso ainda não medidos. Compare a recomendação com esta alternativa incorreta: Calcular 40 vezes 20 vezes 12 sem converter minutos para horas. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.unep.org/resources/report/cleaner-production-training-resource-package",
      "https://log.logcluster.org/en/monitoring-logistics-performance"
    ],
    "region": "africa"
  },
  {
    "id": "af-rastreio-de-pecas-reaproveitadas-em-reparo-de-eletronicos",
    "title": "Rastreio de peças reaproveitadas em reparo de eletrônicos",
    "track": "quality",
    "role": "Analista de operações de reparação",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma oficina em Ruanda recupera 50 componentes; 30 passam em teste documentado, dez falham e dez ainda não foram avaliados.",
    "decision": "Separar 30 elegíveis conforme protocolo, dez reprovados e dez em espera; recuperação física não significa aprovação.",
    "misconception": "Disponibilizar os 50 para montagem porque foram retirados de equipamentos funcionais.",
    "changedConstraint": "O protocolo de teste muda para um modelo de componente.",
    "tasks": [
      "Cadastro de componente recuperado",
      "Registro de origem",
      "Resultados de teste por versão",
      "Mapa de estoque por estado",
      "Trilha de montagem autorizada",
      "Plano de destinação de reprovados"
    ],
    "method": "Acompanhe identidade, origem, condição e teste de cada componente quando a criticidade exigir. Um item removido não está automaticamente apto ao uso. Preserve versão do protocolo e compatibilidade de modelo. Separe estoque avaliado e pendente para impedir seleção indevida. Intervenção eletrônica requer pessoal e condições apropriadas; o exercício trata rastreabilidade e decisão documental, sem instrução de reparo perigoso. Um balanço de processo acompanha entradas, saídas úteis, perdas e variação de estoque no mesmo período. Não declare eficiência usando produção de um turno e consumo de outro. Identifique medidor, unidade, condição operacional e tolerância. A análise aqui é documental e não autoriza trabalho em máquinas, químicos ou instalações perigosas. Priorize prevenção da perda na origem, mantendo qualidade e segurança. Registre teste controlado, critério de aceite e responsável pela autorização de qualquer mudança real.",
    "workedExample": "Dos 50 recuperados, 30 têm resultado favorável, ou 60%. Dez falham e dez permanecem desconhecidos. Somar favoráveis e pendentes como disponíveis produziria 40 e trataria ausência de teste como aprovação. Uma mudança de protocolo pode exigir reavaliar quais resultados continuam válidos para o uso planejado. No dossiê de rastreio de peças reaproveitadas em reparo de eletrônicos, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Separar 30 elegíveis conforme protocolo, dez reprovados e dez em espera; recuperação física não significa aprovação. Compare a recomendação com esta alternativa incorreta: Disponibilizar os 50 para montagem porque foram retirados de equipamentos funcionais. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://log.logcluster.org/en/systematic-recording-and-support-documentation",
      "https://www.unep.org/resources/report/cleaner-production-training-resource-package"
    ],
    "region": "africa"
  },
  {
    "id": "af-perdas-de-materia-prima-em-producao-de-moveis",
    "title": "Perdas de matéria-prima em produção de móveis",
    "track": "industry",
    "role": "Analista de produção de mobiliário",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma marcenaria em Uganda recebe 10 m³ de madeira, incorpora 6,5 em móveis e registra 2 de aparas destinadas a uso comprovado e 1,5 de resíduos.",
    "decision": "Reportar incorporação direta de 65% e distinguir 20% de aproveitamento secundário de 15% de resíduo.",
    "misconception": "Afirmar rendimento de produto principal de 85% somando aparas ao móvel.",
    "changedConstraint": "O destino das aparas deixa de aceitar o material.",
    "tasks": [
      "Balanço volumétrico",
      "Mapa de corte",
      "Registro de umidade e base",
      "Cadastro de destinos secundários",
      "Indicador de incorporação",
      "Plano de redução de perdas"
    ],
    "method": "Escolha volume ou massa e mantenha condição de medição consistente, pois umidade e forma alteram comparação. Diferencie produto principal, uso secundário comprovado e resíduo. Um destino anunciado não equivale a aproveitamento efetivo sem evidência. Compare planos de corte com mesmas dimensões e qualidade requeridas. As propostas precisam preservar segurança e especificações técnicas, sem instrução de operação de máquinas. Um balanço de processo acompanha entradas, saídas úteis, perdas e variação de estoque no mesmo período. Não declare eficiência usando produção de um turno e consumo de outro. Identifique medidor, unidade, condição operacional e tolerância. A análise aqui é documental e não autoriza trabalho em máquinas, químicos ou instalações perigosas. Priorize prevenção da perda na origem, mantendo qualidade e segurança. Registre teste controlado, critério de aceite e responsável pela autorização de qualquer mudança real.",
    "workedExample": "Seis e meio de dez m³ correspondem a 65% no produto principal. Dois m³, ou 20%, têm uso secundário documentado, enquanto 1,5 m³, ou 15%, são resíduos. O total de 85% pode descrever aproveitamento material combinado, mas deve receber esse nome e não rendimento do móvel. No dossiê de perdas de matéria-prima em produção de móveis, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reportar incorporação direta de 65% e distinguir 20% de aproveitamento secundário de 15% de resíduo. Compare a recomendação com esta alternativa incorreta: Afirmar rendimento de produto principal de 85% somando aparas ao móvel. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.unep.org/resources/report/cleaner-production-training-resource-package",
      "https://log.logcluster.org/en/systematic-recording-and-support-documentation"
    ],
    "region": "africa"
  },
  {
    "id": "af-avaliacao-documental-de-compras-de-equipamentos-eficientes",
    "title": "Avaliação documental de compras de equipamentos eficientes",
    "track": "business",
    "role": "Analista de compras industriais",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma unidade em Etiópia compara equipamento A de 10000 unidades com consumo anual de 4000 e B de 13000 com consumo de 3000; energia custa 0,20 por unidade consumida.",
    "decision": "Calcular economia anual de 200 e retorno simples de 15 anos para o investimento adicional de 3000, antes de manutenção e financiamento.",
    "misconception": "Prometer retorno em três anos dividindo preço extra por diferença de consumo sem aplicar tarifa.",
    "changedConstraint": "A tarifa de energia dobra.",
    "tasks": [
      "Quadro de equivalência funcional",
      "Memória de investimento incremental",
      "Cálculo de economia anual",
      "Retorno simples",
      "Sensibilidade de tarifa",
      "Matriz de manutenção e garantia"
    ],
    "method": "Compare equipamentos com mesma produção, qualidade e condição de uso. A diferença de consumo deve virar custo usando tarifa e período corretos. Retorno simples divide investimento incremental pela economia anual líquida, sem desconto; não representa toda a viabilidade. Inclua manutenção, disponibilidade, vida útil e garantia quando conhecidos. Não use etiqueta de eficiência como substituto de cálculo para o contexto operacional. Um balanço de processo acompanha entradas, saídas úteis, perdas e variação de estoque no mesmo período. Não declare eficiência usando produção de um turno e consumo de outro. Identifique medidor, unidade, condição operacional e tolerância. A análise aqui é documental e não autoriza trabalho em máquinas, químicos ou instalações perigosas. Priorize prevenção da perda na origem, mantendo qualidade e segurança. Registre teste controlado, critério de aceite e responsável pela autorização de qualquer mudança real.",
    "workedExample": "A diferença anual de consumo é 1000 unidades. Com tarifa de 0,20, a economia é 200 por ano. O investimento adicional de 3000 dividido por 200 resulta em 15 anos. Se a tarifa dobrar e o restante permanecer igual, a economia sobe a 400 e o retorno simples cai a 7,5 anos. No dossiê de avaliação documental de compras de equipamentos eficientes, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Calcular economia anual de 200 e retorno simples de 15 anos para o investimento adicional de 3000, antes de manutenção e financiamento. Compare a recomendação com esta alternativa incorreta: Prometer retorno em três anos dividindo preço extra por diferença de consumo sem aplicar tarifa. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.nlr.gov/docs/fy19osti/73822.pdf",
      "https://www.unep.org/resources/report/cleaner-production-training-resource-package"
    ],
    "region": "africa"
  },
  {
    "id": "af-cursos-offline-com-sincronizacao-de-progresso-em-baixa-conectividade",
    "title": "Cursos offline com sincronização de progresso em baixa conectividade",
    "track": "data",
    "role": "Analista de tecnologia educacional",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um piloto em Uganda registra 100 atividades locais; 80 chegam ao servidor, dez são reenvios dos mesmos identificadores e 20 permanecem só no dispositivo.",
    "decision": "Reconhecer 80 eventos únicos sincronizados, preservar os 20 locais e ignorar duplicação idêntica sem apagar histórico.",
    "misconception": "Contar 90 eventos no servidor como 90 atividades diferentes.",
    "changedConstraint": "Um reenvio contém mesma identidade e resposta divergente.",
    "tasks": [
      "Contrato de evento de aprendizagem",
      "Fila de sincronização",
      "Regra de idempotência",
      "Teste de conflito",
      "Indicador de cobertura de sincronização",
      "Plano de recuperação do dispositivo"
    ],
    "method": "Modele progresso como eventos identificados e ordenados por regra explícita, evitando sobrescrever todo o estado com a última cópia recebida. Reenvio idêntico deve ser idempotente; conflito de conteúdo exige política própria. Separe atividade local, confirmação de envio e persistência no servidor. Não marque conclusão somente por tentativa de transmissão. Teste perda de conexão, repetição e chegada fora de ordem. Planeje uma competência observável e a evidência que demonstraria seu uso antes de escolher mídia ou ferramenta. Acesso ao material, participação e aprendizagem são indicadores distintos. Considere leitores de tela, largura de banda, idioma e disponibilidade de dispositivos. Use exemplos sintéticos e respeite autorização de imagem e voz. Avalie tarefas com critérios claros, feedback acionável e possibilidade de revisão. Não atribua reconhecimento acadêmico externo nem habilitação profissional a uma atividade sem comprovação específica.",
    "workedExample": "O servidor recebeu 90 linhas, mas dez são repetições dos 80 eventos únicos. Vinte atividades continuam no dispositivo, completando as 100 originais. A cobertura de sincronização é 80%. Apagar a fila local antes da confirmação poderia perder exatamente os eventos que ainda não chegaram ao servidor. No dossiê de cursos offline com sincronização de progresso em baixa conectividade, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reconhecer 80 eventos únicos sincronizados, preservar os 20 locais e ignorar duplicação idêntica sem apagar histórico. Compare a recomendação com esta alternativa incorreta: Contar 90 eventos no servidor como 90 atividades diferentes. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.dhis2.org/en/use/android-app/synchronization-troubleshooting.html",
      "https://www.postgresql.org/docs/current/ddl-constraints.html"
    ],
    "region": "africa"
  },
  {
    "id": "af-producao-de-materiais-educacionais-acessiveis-para-leitores-de-tela",
    "title": "Produção de materiais educacionais acessíveis para leitores de tela",
    "track": "content",
    "role": "Editor de acessibilidade educacional",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma apostila digital em Gana possui 20 imagens informativas sem alternativa textual e títulos apenas em negrito visual, sem estrutura semântica.",
    "decision": "Criar hierarquia de títulos e alternativas orientadas à função das imagens, testando navegação sem depender de aparência.",
    "misconception": "Adicionar a mesma descrição genérica a todas as imagens e considerar o documento acessível.",
    "changedConstraint": "Cinco gráficos passam a transmitir dados essenciais de avaliação.",
    "tasks": [
      "Inventário de barreiras",
      "Árvore de títulos",
      "Alternativas textuais contextualizadas",
      "Tabela equivalente de gráficos",
      "Roteiro de teste assistivo",
      "Registro de correções"
    ],
    "method": "Estruture conteúdo por títulos semânticos e ordem de leitura antes de ajustar detalhes visuais. Texto alternativo deve comunicar a função da imagem no contexto; gráfico complexo pode exigir tabela ou descrição longa. Não repita legenda sem utilidade. Teste navegação por títulos, foco e leitura linear com tecnologia assistiva. A revisão automática ajuda, mas não cobre compreensão ou toda a experiência do usuário. Planeje uma competência observável e a evidência que demonstraria seu uso antes de escolher mídia ou ferramenta. Acesso ao material, participação e aprendizagem são indicadores distintos. Considere leitores de tela, largura de banda, idioma e disponibilidade de dispositivos. Use exemplos sintéticos e respeite autorização de imagem e voz. Avalie tarefas com critérios claros, feedback acionável e possibilidade de revisão. Não atribua reconhecimento acadêmico externo nem habilitação profissional a uma atividade sem comprovação específica.",
    "workedExample": "As 20 imagens exigem análise individual de função: decorativas podem receber tratamento diferente das informativas. Os títulos visuais precisam virar estrutura navegável. Se cinco gráficos contiverem dados de avaliação, uma alternativa curta como gráfico de resultados não entrega a informação; uma tabela equivalente permite acessar os valores necessários. No dossiê de produção de materiais educacionais acessíveis para leitores de tela, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Criar hierarquia de títulos e alternativas orientadas à função das imagens, testando navegação sem depender de aparência. Compare a recomendação com esta alternativa incorreta: Adicionar a mesma descrição genérica a todas as imagens e considerar o documento acessível. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.w3.org/WAI/tutorials/page-structure/headings/",
      "https://www.w3.org/WAI/tutorials/images/complex/"
    ],
    "region": "africa"
  },
  {
    "id": "af-planejamento-de-radio-educativo-com-avaliacao-por-telefone",
    "title": "Planejamento de rádio educativo com avaliação por telefone",
    "track": "content",
    "role": "Produtor de educação por rádio",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um programa no Senegal transmite quatro episódios; 1000 ouvintes estimados não foram identificados individualmente e 120 pessoas respondem ao exercício por telefone.",
    "decision": "Separar alcance estimado e participação observada; não interpretar 12% como taxa exata de resposta da população sem base comparável.",
    "misconception": "Afirmar que 880 ouvintes não aprenderam porque não telefonaram.",
    "changedConstraint": "O mesmo participante responde em três episódios.",
    "tasks": [
      "Roteiro de episódio",
      "Mapa de objetivos observáveis",
      "Exercício por canal acessível",
      "Regra de participante único",
      "Painel de alcance e resposta",
      "Plano de feedback"
    ],
    "method": "Desenhe uma tarefa que possa ser respondida pelo canal disponível sem exigir internet ou equipamento adicional. Alcance de transmissão, audiência estimada e participantes identificados usam bases distintas. Registre repetição entre episódios e evite avaliar aprendizagem somente pela iniciativa de telefonar. Use perguntas com aplicação prática e feedback compreensível. Proteja telefone e voz, solicitando apenas dados necessários à atividade. Planeje uma competência observável e a evidência que demonstraria seu uso antes de escolher mídia ou ferramenta. Acesso ao material, participação e aprendizagem são indicadores distintos. Considere leitores de tela, largura de banda, idioma e disponibilidade de dispositivos. Use exemplos sintéticos e respeite autorização de imagem e voz. Avalie tarefas com critérios claros, feedback acionável e possibilidade de revisão. Não atribua reconhecimento acadêmico externo nem habilitação profissional a uma atividade sem comprovação específica.",
    "workedExample": "Cento e vinte respostas são participação observada, enquanto mil ouvintes é uma estimativa de audiência. A divisão produz 12% numericamente, mas não uma taxa precisa se métodos e populações diferirem. Respostas repetidas precisam de vínculo proporcional para separar pessoas e interações, sem presumir que não responder significa não aprender. No dossiê de planejamento de rádio educativo com avaliação por telefone, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Separar alcance estimado e participação observada; não interpretar 12% como taxa exata de resposta da população sem base comparável. Compare a recomendação com esta alternativa incorreta: Afirmar que 880 ouvintes não aprenderam porque não telefonaram. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.fao.org/4/ac789e/AC789E06.htm",
      "https://www.unesco.org/en/digital-education/distance-learning-guidance"
    ],
    "region": "africa"
  },
  {
    "id": "af-localizacao-de-interfaces-educacionais-para-linguas-africanas",
    "title": "Localização de interfaces educacionais para línguas africanas",
    "track": "content",
    "role": "Analista de localização de produtos educacionais",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma interface queniana traduz 100 mensagens, mas 15 interpolam números e cinco exibem datas em formato ambíguo; o idioma de destino usa regras diferentes de plural.",
    "decision": "Testar mensagens com valores zero, um e múltiplos e formatar datas pela localidade, sem concatenar fragmentos traduzidos.",
    "misconception": "Validar somente a captura de tela em que todas as quantidades são iguais a um.",
    "changedConstraint": "O produto passa a incluir uma segunda variante regional.",
    "tasks": [
      "Inventário de mensagens",
      "Matriz de plural e interpolação",
      "Glossário contextual",
      "Casos de data e número",
      "Registro de revisão linguística",
      "Plano de teste por variante"
    ],
    "method": "Use mensagens completas com parâmetros nomeados em vez de unir palavras isoladas, pois ordem e concordância variam. Pluralização depende das regras do idioma e pode ter categorias além de singular e plural. Preserve significado pedagógico e contexto para revisão. Formate números e datas com localidade explícita. Teste comprimentos, fallback e ausência de tradução sem substituir conteúdo silenciosamente. Planeje uma competência observável e a evidência que demonstraria seu uso antes de escolher mídia ou ferramenta. Acesso ao material, participação e aprendizagem são indicadores distintos. Considere leitores de tela, largura de banda, idioma e disponibilidade de dispositivos. Use exemplos sintéticos e respeite autorização de imagem e voz. Avalie tarefas com critérios claros, feedback acionável e possibilidade de revisão. Não atribua reconhecimento acadêmico externo nem habilitação profissional a uma atividade sem comprovação específica.",
    "workedExample": "As 15 mensagens numéricas devem ser exercitadas com mais de um valor, gerando pelo menos 45 combinações se usados zero, um e dois. As cinco datas precisam de formato não ambíguo. Uma tela correta com quantidade um não demonstra funcionamento dos demais estados nem qualidade da variante regional. No dossiê de localização de interfaces educacionais para línguas africanas, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Testar mensagens com valores zero, um e múltiplos e formatar datas pela localidade, sem concatenar fragmentos traduzidos. Compare a recomendação com esta alternativa incorreta: Validar somente a captura de tela em que todas as quantidades são iguais a um. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.unicode.org/reports/tr35/tr35-numbers.html",
      "https://www.w3.org/International/articles/language-tags/"
    ],
    "region": "africa"
  },
  {
    "id": "af-rubricas-de-avaliacao-para-aprendizagem-profissional-por-projetos",
    "title": "Rubricas de avaliação para aprendizagem profissional por projetos",
    "track": "quality",
    "role": "Designer de avaliação educacional",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um curso em Ruanda dá nota por extensão do relatório; um aluno entrega 20 páginas sem teste e outro cinco páginas com método, teste e correção verificáveis.",
    "decision": "Reformular critérios para evidência de competência e distinguir qualidade técnica de extensão, sem aprovar automaticamente qualquer um dos trabalhos.",
    "misconception": "Atribuir maior nota ao relatório de 20 páginas somente pelo tamanho.",
    "changedConstraint": "A avaliação passa a ser parcialmente automática.",
    "tasks": [
      "Mapa de competência observável",
      "Rubrica analítica",
      "Exemplos de níveis de desempenho",
      "Teste de consistência da correção",
      "Plano de feedback acionável",
      "Registro de limites da automação"
    ],
    "method": "Comece pela ação que o aluno deve demonstrar e decomponha-a em critérios observáveis. Descreva níveis de desempenho com evidência, evitando adjetivos vagos como excelente sem definição. Separe método, resultado, teste e justificativa. Calibre a rubrica com exemplos e revise desacordos. Automação pode verificar algumas dimensões, mas não deve alegar revisão humana ou validar artefatos que não examinou. Planeje uma competência observável e a evidência que demonstraria seu uso antes de escolher mídia ou ferramenta. Acesso ao material, participação e aprendizagem são indicadores distintos. Considere leitores de tela, largura de banda, idioma e disponibilidade de dispositivos. Use exemplos sintéticos e respeite autorização de imagem e voz. Avalie tarefas com critérios claros, feedback acionável e possibilidade de revisão. Não atribua reconhecimento acadêmico externo nem habilitação profissional a uma atividade sem comprovação específica.",
    "workedExample": "O primeiro relatório tem mais páginas, mas falta evidência de teste. O segundo fornece etapas verificáveis, porém ainda precisa ser comparado aos critérios técnicos. Uma rubrica com método, rastreabilidade, teste e correção permite avaliar ambos de forma justificável. Contagem de páginas pode medir cumprimento formal, nunca substituir competência. No dossiê de rubricas de avaliação para aprendizagem profissional por projetos, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reformular critérios para evidência de competência e distinguir qualidade técnica de extensão, sem aprovar automaticamente qualquer um dos trabalhos. Compare a recomendação com esta alternativa incorreta: Atribuir maior nota ao relatório de 20 páginas somente pelo tamanho. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.cmu.edu/teaching/assessment/assesslearning/rubrics.html",
      "https://www.unesco.org/en/digital-education/distance-learning-guidance"
    ],
    "region": "africa"
  },
  {
    "id": "af-catalogos-digitais-de-acervos-culturais-comunitarios",
    "title": "Catálogos digitais de acervos culturais comunitários",
    "track": "content",
    "role": "Catalogador de patrimônio digital",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um acervo no Mali contém 200 registros; 30 usam nomes alternativos da mesma pessoa e dez itens têm direitos de divulgação indefinidos.",
    "decision": "Criar controle de autoridade para variantes e restringir publicação dos dez itens até esclarecer direitos.",
    "misconception": "Fundir automaticamente todos os nomes parecidos e publicar todo o acervo.",
    "changedConstraint": "Uma comunidade solicita restrição de acesso a registros sensíveis.",
    "tasks": [
      "Esquema de metadados",
      "Tabela de autoridade de nomes",
      "Registro de direitos e permissões",
      "Fila de possíveis duplicatas",
      "Política de acesso contextual",
      "Teste de recuperação de itens"
    ],
    "method": "Separe descrição do objeto, identidade de pessoas, proveniência e condição de acesso. Um nome semelhante pode representar pessoa diferente; use evidências e revisão para ligar variantes. Metadado público não significa que a mídia esteja liberada para qualquer uso. Registre permissões, sensibilidade cultural e decisões de restrição. Preserve os dados originais e histórico de normalização para permitir correção futura. Planeje uma competência observável e a evidência que demonstraria seu uso antes de escolher mídia ou ferramenta. Acesso ao material, participação e aprendizagem são indicadores distintos. Considere leitores de tela, largura de banda, idioma e disponibilidade de dispositivos. Use exemplos sintéticos e respeite autorização de imagem e voz. Avalie tarefas com critérios claros, feedback acionável e possibilidade de revisão. Não atribua reconhecimento acadêmico externo nem habilitação profissional a uma atividade sem comprovação específica.",
    "workedExample": "Trinta registros com nomes alternativos não correspondem necessariamente a 30 duplicatas de objeto. A tabela de autoridade liga variantes à entidade validada sem apagar a descrição original. Os dez itens com direitos indefinidos entram em fila própria. A catalogação pode avançar internamente enquanto a publicação permanece condicionada à autorização. No dossiê de catálogos digitais de acervos culturais comunitários, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Criar controle de autoridade para variantes e restringir publicação dos dez itens até esclarecer direitos. Compare a recomendação com esta alternativa incorreta: Fundir automaticamente todos os nomes parecidos e publicar todo o acervo. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.loc.gov/marc/authority/",
      "https://www.loc.gov/preservation/digital/formats/"
    ],
    "region": "africa"
  },
  {
    "id": "af-legendas-multilingues-com-controle-de-tempo-para-formacao-tecnica",
    "title": "Legendas multilíngues com controle de tempo para formação técnica",
    "track": "content",
    "role": "Editor de legendagem educacional",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um vídeo em África do Sul contém fala técnica de 40 palavras em quatro segundos; a legenda traduzida tem 60 palavras e cobre toda a área de demonstração.",
    "decision": "Revisar segmentação e concisão preservando o conceito, testar leitura e posicionamento sem impor que todo o texto apareça em quatro segundos.",
    "misconception": "Reduzir fonte até caber e considerar a legenda resolvida.",
    "changedConstraint": "Uma sigla técnica precisa de explicação adicional na primeira ocorrência.",
    "tasks": [
      "Glossário técnico",
      "Arquivo de legendas temporizado",
      "Registro de densidade de leitura",
      "Plano de posicionamento",
      "Teste de compreensão",
      "Lista de revisão por idioma"
    ],
    "method": "Sincronize unidades de sentido com a fala e mantenha legibilidade no dispositivo-alvo. Tradução pode expandir texto; não resolva excesso apenas com fonte menor ou cortes que eliminam condição técnica. Use glossário e revise números, unidades e negações. Reserve posição que não oculte demonstração importante. Teste o resultado com áudio desligado e compare compreensão, documentando os limites do formato. Planeje uma competência observável e a evidência que demonstraria seu uso antes de escolher mídia ou ferramenta. Acesso ao material, participação e aprendizagem são indicadores distintos. Considere leitores de tela, largura de banda, idioma e disponibilidade de dispositivos. Use exemplos sintéticos e respeite autorização de imagem e voz. Avalie tarefas com critérios claros, feedback acionável e possibilidade de revisão. Não atribua reconhecimento acadêmico externo nem habilitação profissional a uma atividade sem comprovação específica.",
    "workedExample": "Sessenta palavras em quatro segundos equivalem a 15 palavras por segundo, uma exigência incompatível com leitura confortável no cenário. O problema pede edição e segmentação, possivelmente ajuste pedagógico do vídeo. Preservar a condição técnica é mais importante que encaixar uma tradução literal em um bloco visualmente pequeno. No dossiê de legendas multilíngues com controle de tempo para formação técnica, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Revisar segmentação e concisão preservando o conceito, testar leitura e posicionamento sem impor que todo o texto apareça em quatro segundos. Compare a recomendação com esta alternativa incorreta: Reduzir fonte até caber e considerar a legenda resolvida. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.w3.org/WAI/media/av/captions/",
      "https://www.w3.org/WAI/media/av/transcribing/"
    ],
    "region": "africa"
  },
  {
    "id": "af-pesquisa-de-experiencia-com-alunos-de-aparelhos-compartilhados",
    "title": "Pesquisa de experiência com alunos de aparelhos compartilhados",
    "track": "data",
    "role": "Pesquisador de experiência educacional",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um estudo na Nigéria observa 20 contas em dez aparelhos compartilhados; a equipe pretende tratar cada aparelho como um aluno.",
    "decision": "Distinguir pessoa, conta e dispositivo e revisar amostragem e consentimento antes de estimar comportamento individual.",
    "misconception": "Concluir que existem dez alunos porque existem dez aparelhos.",
    "changedConstraint": "Duas pessoas usam a mesma conta por limitação de acesso.",
    "tasks": [
      "Plano de pesquisa",
      "Modelo pessoa-conta-dispositivo",
      "Roteiro de consentimento",
      "Matriz de tarefas observadas",
      "Registro de barreiras de acesso",
      "Relatório de limites de identificação"
    ],
    "method": "Defina unidade de análise conforme a pergunta: pessoas aprendem, contas registram eventos e dispositivos permitem acesso. Compartilhamento quebra equivalências simples entre essas unidades. Colete o mínimo necessário com consentimento e não tente inferir identidade por vigilância invasiva. Observe tarefas e barreiras reais, separando dificuldade de interface de indisponibilidade de aparelho. Explique limitações antes de generalizar os achados. Planeje uma competência observável e a evidência que demonstraria seu uso antes de escolher mídia ou ferramenta. Acesso ao material, participação e aprendizagem são indicadores distintos. Considere leitores de tela, largura de banda, idioma e disponibilidade de dispositivos. Use exemplos sintéticos e respeite autorização de imagem e voz. Avalie tarefas com critérios claros, feedback acionável e possibilidade de revisão. Não atribua reconhecimento acadêmico externo nem habilitação profissional a uma atividade sem comprovação específica.",
    "workedExample": "Vinte contas em dez aparelhos produzem média de duas contas por dispositivo, mas não revelam número exato de pessoas. Se duas pessoas compartilham uma conta, a direção do erro também muda. O estudo deve mapear a relação por relato consentido e apresentar resultados no nível que os dados realmente sustentam. No dossiê de pesquisa de experiência com alunos de aparelhos compartilhados, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Distinguir pessoa, conta e dispositivo e revisar amostragem e consentimento antes de estimar comportamento individual. Compare a recomendação com esta alternativa incorreta: Concluir que existem dez alunos porque existem dez aparelhos. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service",
      "https://www.w3.org/TR/privacy-principles/"
    ],
    "region": "africa"
  },
  {
    "id": "af-preservacao-de-arquivos-de-cursos-com-verificacao-de-integridade",
    "title": "Preservação de arquivos de cursos com verificação de integridade",
    "track": "data",
    "role": "Analista de preservação digital educacional",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma instituição em Madagascar copia 500 arquivos para arquivo de preservação; 490 têm hash coincidente e dez divergem, sem causa identificada.",
    "decision": "Manter os dez em investigação, preservar originais e verificar processo de cópia e versão antes de declarar corrupção.",
    "misconception": "Apagar os originais porque a maioria das cópias foi verificada.",
    "changedConstraint": "Um arquivo foi legitimamente atualizado durante a cópia.",
    "tasks": [
      "Inventário de objetos digitais",
      "Manifesto de hashes",
      "Registro de versões",
      "Fila de divergências",
      "Teste de restauração",
      "Plano de retenção e acesso"
    ],
    "method": "Use função de hash adequada para verificar identidade de bytes, mas interprete divergência no contexto de versão e processo. Um hash diferente pode decorrer de alteração legítima, cópia incompleta ou outro evento; não define a causa sozinho. Preserve originais e manifesto, registre ferramenta e data e teste restauração. Integridade técnica não substitui direitos de acesso nem qualidade pedagógica. Planeje uma competência observável e a evidência que demonstraria seu uso antes de escolher mídia ou ferramenta. Acesso ao material, participação e aprendizagem são indicadores distintos. Considere leitores de tela, largura de banda, idioma e disponibilidade de dispositivos. Use exemplos sintéticos e respeite autorização de imagem e voz. Avalie tarefas com critérios claros, feedback acionável e possibilidade de revisão. Não atribua reconhecimento acadêmico externo nem habilitação profissional a uma atividade sem comprovação específica.",
    "workedExample": "Quatrocentos e noventa coincidências em 500 correspondem a 98% verificados como idênticos pela regra adotada. Os dez restantes não devem ser apagados nem classificados todos como corrupção. Se um foi atualizado durante a cópia, a solução pode ser versionamento e nova captura, preservando a evidência do evento. No dossiê de preservação de arquivos de cursos com verificação de integridade, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Manter os dez em investigação, preservar originais e verificar processo de cópia e versão antes de declarar corrupção. Compare a recomendação com esta alternativa incorreta: Apagar os originais porque a maioria das cópias foi verificada. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.loc.gov/preservation/digital/formats/",
      "https://docs.python.org/3/library/hashlib.html"
    ],
    "region": "africa"
  },
  {
    "id": "af-planejamento-de-tutoria-assincrona-com-filas-de-duvida",
    "title": "Planejamento de tutoria assíncrona com filas de dúvida",
    "track": "business",
    "role": "Coordenador de operações educacionais",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma equipe em Cabo Verde recebe 80 dúvidas por dia e responde 60; começa a semana de cinco dias sem pendências e a demanda é constante no exercício.",
    "decision": "Projetar crescimento de 20 pendências por dia e saldo de 100 ao fim da semana, revisando capacidade e prevenção de dúvidas repetidas.",
    "misconception": "Prometer resposta diária a todos porque a equipe trabalha todos os dias úteis.",
    "changedConstraint": "Metade das dúvidas passa a exigir o dobro do tempo de resposta.",
    "tasks": [
      "Taxonomia de dúvidas",
      "Balanço diário de fila",
      "Medição de tempo por categoria",
      "Plano de base de conhecimento",
      "Cenário de capacidade",
      "Indicador de espera e qualidade"
    ],
    "method": "Compare chegada e capacidade de resolução com definição de resposta útil, não apenas mensagem enviada. Uma fila cresce quando entrada sustentada supera saída, mesmo com equipe continuamente ocupada. Segmente complexidade e identifique dúvidas recorrentes que podem ser prevenidas por melhoria de material. Preserve escalonamento e revisão de qualidade. Não reduza tempo à custa de feedback incorreto ou exclusão de perguntas difíceis. Planeje uma competência observável e a evidência que demonstraria seu uso antes de escolher mídia ou ferramenta. Acesso ao material, participação e aprendizagem são indicadores distintos. Considere leitores de tela, largura de banda, idioma e disponibilidade de dispositivos. Use exemplos sintéticos e respeite autorização de imagem e voz. Avalie tarefas com critérios claros, feedback acionável e possibilidade de revisão. Não atribua reconhecimento acadêmico externo nem habilitação profissional a uma atividade sem comprovação específica.",
    "workedExample": "Oitenta entradas menos 60 saídas deixam 20 dúvidas adicionais por dia. Em cinco dias, sem estoque inicial e sob as hipóteses constantes, a fila chega a 100. Respostas automáticas sem resolver a questão não devem ser contadas como saída útil, pois apenas esconderiam a pendência real do aluno. No dossiê de planejamento de tutoria assíncrona com filas de dúvida, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Projetar crescimento de 20 pendências por dia e saldo de 100 ao fim da semana, revisando capacidade e prevenção de dúvidas repetidas. Compare a recomendação com esta alternativa incorreta: Prometer resposta diária a todos porque a equipe trabalha todos os dias úteis. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.unesco.org/en/digital-education/distance-learning-guidance",
      "https://log.logcluster.org/en/monitoring-logistics-performance"
    ],
    "region": "africa"
  },
  {
    "id": "af-sistemas-de-referencia-em-mapas-de-servicos-comunitarios",
    "title": "Sistemas de referência em mapas de serviços comunitários",
    "track": "data",
    "role": "Analista júnior de geoinformação",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma equipe em Gana sobrepõe coordenadas de longitude e latitude a uma camada projetada em metros sem declarar o sistema de origem.",
    "decision": "Atribuir corretamente o sistema original e reprojetar uma cópia para análise, preservando a camada bruta.",
    "misconception": "Alterar apenas o rótulo do sistema projetado e tratar graus como metros.",
    "changedConstraint": "Parte dos pontos tem longitude e latitude invertidas.",
    "tasks": [
      "Inventário de sistemas de referência",
      "Camada original preservada",
      "Fluxo de reprojeção",
      "Teste de pontos de controle",
      "Fila de coordenadas invertidas",
      "Mapa de limitações espaciais"
    ],
    "method": "Diferencie atribuir sistema de referência e transformar coordenadas. Atribuição informa como interpretar números existentes; reprojeção calcula novos números para outro sistema. Confundir as operações pode deslocar toda a camada. Valide extensão e pontos conhecidos antes de medir distância ou área. Preserve ordem dos eixos, unidade e precisão, documentando transformações e registros excluídos por inconsistência. Uma camada espacial possui sistema de referência, escala, resolução, data e método de aquisição. Sobreposição visual não garante alinhamento nem comparabilidade. Preserve o arquivo original e documente transformações em uma cópia. Diferencie ausência de observação de ausência do fenômeno. Valide resultados com pontos ou amostras independentes, respeitando incerteza e restrições de divulgação. Uma estimativa exploratória não substitui levantamento oficial ou autorização territorial. O produto final deve incluir legenda, unidade, fonte, método e limitações.",
    "workedExample": "Um ponto em longitude e latitude usa graus; tratá-lo como coordenada em metros muda sua interpretação sem conversão real. A solução começa por identificar o sistema de origem e então reprojetar para um sistema adequado à área. Pontos invertidos podem parecer válidos numericamente, exigindo teste de localização e extensão esperada. No dossiê de sistemas de referência em mapas de serviços comunitários, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Atribuir corretamente o sistema original e reprojetar uma cópia para análise, preservando a camada bruta. Compare a recomendação com esta alternativa incorreta: Alterar apenas o rótulo do sistema projetado e tratar graus como metros. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.qgis.org/latest/en/docs/gentle_gis_introduction/coordinate_reference_systems.html",
      "https://docs.qgis.org/latest/en/docs/training_manual/vector_analysis/reproject_transform.html"
    ],
    "region": "africa"
  },
  {
    "id": "af-calculo-de-populacao-atendida-por-areas-de-influencia",
    "title": "Cálculo de população atendida por áreas de influência",
    "track": "data",
    "role": "Analista de planejamento territorial",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um posto no Quênia tem área de influência que cobre integralmente duas células de 200 e 300 pessoas e metade de uma célula de 400; não há distribuição interna disponível.",
    "decision": "Estimar 700 pessoas sob hipótese de distribuição uniforme na célula parcial e declarar que se trata de aproximação.",
    "misconception": "Contar as 900 pessoas inteiras porque a área toca as três células.",
    "changedConstraint": "A célula parcial concentra moradias fora da área de influência.",
    "tasks": [
      "Camada de influência",
      "Tabela de população por célula",
      "Memória de interseção proporcional",
      "Registro de hipótese uniforme",
      "Análise de sensibilidade espacial",
      "Mapa de cobertura estimada"
    ],
    "method": "Cruze geometria e população respeitando resolução e data das camadas. Interseção de área não prova distribuição uniforme de pessoas. Quando fizer rateio proporcional, identifique explicitamente a hipótese e teste sensibilidade com informação de assentamentos se disponível. Evite chamar buffer de distância linear de área de acesso real quando existem rios, relevo ou vias. Publique unidade, método e limites. Uma camada espacial possui sistema de referência, escala, resolução, data e método de aquisição. Sobreposição visual não garante alinhamento nem comparabilidade. Preserve o arquivo original e documente transformações em uma cópia. Diferencie ausência de observação de ausência do fenômeno. Valide resultados com pontos ou amostras independentes, respeitando incerteza e restrições de divulgação. Uma estimativa exploratória não substitui levantamento oficial ou autorização territorial. O produto final deve incluir legenda, unidade, fonte, método e limitações.",
    "workedExample": "As duas células completas somam 500 pessoas. Metade de 400 acrescenta 200 sob uniformidade, chegando a 700. Contar 900 superestima a parte coberta segundo o modelo. Se as moradias estiverem concentradas fora da interseção, até os 700 podem ficar acima da cobertura real, exigindo refinamento. No dossiê de cálculo de população atendida por áreas de influência, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Estimar 700 pessoas sob hipótese de distribuição uniforme na célula parcial e declarar que se trata de aproximação. Compare a recomendação com esta alternativa incorreta: Contar as 900 pessoas inteiras porque a área toca as três células. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.qgis.org/latest/en/docs/training_manual/vector_analysis/spatial_statistics.html",
      "https://docs.qgis.org/latest/en/docs/training_manual/vector_analysis/basic_analysis.html"
    ],
    "region": "africa"
  },
  {
    "id": "af-validacao-de-classificacao-de-cobertura-do-solo",
    "title": "Validação de classificação de cobertura do solo",
    "track": "data",
    "role": "Analista de sensoriamento remoto",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma classificação de 100 pontos independentes em Senegal acerta 80; a classe de vegetação foi prevista em 40 pontos e somente 28 são corretos.",
    "decision": "Reportar acurácia global de 80% e precisão da classe vegetação de 70%, sem confundir os dois indicadores.",
    "misconception": "Usar 80% como precisão de todas as classes.",
    "changedConstraint": "Os pontos de validação foram usados também no treinamento.",
    "tasks": [
      "Matriz de confusão",
      "Amostra independente de referência",
      "Indicadores por classe",
      "Registro de vazamento de validação",
      "Mapa de incerteza",
      "Plano de nova amostragem"
    ],
    "method": "Separe treino e validação por unidades independentes e construa matriz de confusão com referência nas linhas ou colunas explicitadas. Acurácia global pode esconder erro em classe rara ou prioritária. Precisão de uma classe responde quantas previsões dela foram corretas; revocação usa outro denominador. Não extrapole desempenho para outra estação ou região sem verificar mudança de distribuição. Uma camada espacial possui sistema de referência, escala, resolução, data e método de aquisição. Sobreposição visual não garante alinhamento nem comparabilidade. Preserve o arquivo original e documente transformações em uma cópia. Diferencie ausência de observação de ausência do fenômeno. Valide resultados com pontos ou amostras independentes, respeitando incerteza e restrições de divulgação. Uma estimativa exploratória não substitui levantamento oficial ou autorização territorial. O produto final deve incluir legenda, unidade, fonte, método e limitações.",
    "workedExample": "Oitenta acertos sobre 100 dão 80% globalmente. Entre 40 previsões de vegetação, 28 corretas resultam em 70% de precisão dessa classe. Para calcular revocação de vegetação, falta saber quantos pontos realmente eram vegetação na referência. Se a validação reutilizou treino, a estimativa pode estar otimista. No dossiê de validação de classificação de cobertura do solo, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reportar acurácia global de 80% e precisão da classe vegetação de 70%, sem confundir os dois indicadores. Compare a recomendação com esta alternativa incorreta: Usar 80% como precisão de todas as classes. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.qgis.org/latest/en/docs/user_manual/processing_algs/qgis/rasteranalysis.html",
      "https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc331.htm"
    ],
    "region": "africa"
  },
  {
    "id": "af-completude-de-mapas-comunitarios-de-infraestrutura",
    "title": "Completude de mapas comunitários de infraestrutura",
    "track": "quality",
    "role": "Analista de qualidade de dados geográficos",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um cadastro em Malawi tem 200 pontos; 30 não têm tipo, 20 não têm data e dez têm ambas as lacunas.",
    "decision": "Registrar 40 pontos incompletos e 160 completos nos dois campos, sem converter completude em exatidão posicional.",
    "misconception": "Declarar 50 pontos incompletos ou afirmar que os 160 completos estão geograficamente corretos.",
    "changedConstraint": "Quinze pontos passam a ter coordenadas duplicadas.",
    "tasks": [
      "Dicionário de atributos",
      "Validador de campos",
      "Regra de duplicidade espacial",
      "Contagem de completude",
      "Plano de verificação em campo",
      "Relatório de dimensões de qualidade"
    ],
    "method": "Qualidade geográfica inclui completude, consistência, atualidade e exatidão, que precisam de testes distintos. Use união de registros afetados para evitar dupla contagem de falhas. Coordenadas iguais podem representar duplicata ou equipamentos co-localizados; não elimine automaticamente. Registre critérios e preserve fonte original. Um formulário completo pode conter localização errada, por isso a auditoria deve manter dimensões separadas. Uma camada espacial possui sistema de referência, escala, resolução, data e método de aquisição. Sobreposição visual não garante alinhamento nem comparabilidade. Preserve o arquivo original e documente transformações em uma cópia. Diferencie ausência de observação de ausência do fenômeno. Valide resultados com pontos ou amostras independentes, respeitando incerteza e restrições de divulgação. Uma estimativa exploratória não substitui levantamento oficial ou autorização territorial. O produto final deve incluir legenda, unidade, fonte, método e limitações.",
    "workedExample": "Trinta sem tipo mais vinte sem data menos dez presentes nas duas listas resulta em 40 pontos incompletos. Restam 160 completos, ou 80%. Essa porcentagem descreve somente os campos avaliados. Os 15 pontos de coordenadas iguais devem passar por análise de identidade e contexto antes de serem fundidos. No dossiê de completude de mapas comunitários de infraestrutura, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Registrar 40 pontos incompletos e 160 completos nos dois campos, sem converter completude em exatidão posicional. Compare a recomendação com esta alternativa incorreta: Declarar 50 pontos incompletos ou afirmar que os 160 completos estão geograficamente corretos. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.qgis.org/latest/en/docs/user_manual/working_with_vector/attribute_table.html",
      "https://docs.qgis.org/latest/en/docs/user_manual/processing_algs/qgis/vectorgeneral.html"
    ],
    "region": "africa"
  },
  {
    "id": "af-comparacao-temporal-de-areas-agricolas-com-imagens-de-resolucao-distinta",
    "title": "Comparação temporal de áreas agrícolas com imagens de resolução distinta",
    "track": "data",
    "role": "Analista de observação agrícola",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma equipe em Zâmbia compara mapa de dez metros de resolução com outro de 30 metros e detecta redução de 15 hectares em pequenas parcelas.",
    "decision": "Verificar harmonização de resolução, classe e data antes de atribuir toda a diferença a abandono agrícola.",
    "misconception": "Publicar 15 hectares de abandono sem avaliar efeito de escala.",
    "changedConstraint": "A imagem mais recente foi captada em fase sazonal diferente.",
    "tasks": [
      "Inventário de resolução e data",
      "Mapa de classes equivalentes",
      "Fluxo de harmonização",
      "Amostra de validação de mudança",
      "Análise de efeito de borda",
      "Relatório de mudança confirmada"
    ],
    "method": "Mantenha definições de classe e suporte espacial comparáveis antes de subtrair áreas. Pixels maiores podem misturar usos e eliminar detalhes de pequenas parcelas. Sazonalidade e nuvem também afetam classificação. Uma diferença cartográfica é hipótese de mudança a validar com referências independentes. Documente reamostragem e não interprete aumento artificial de resolução como ganho de informação real. Uma camada espacial possui sistema de referência, escala, resolução, data e método de aquisição. Sobreposição visual não garante alinhamento nem comparabilidade. Preserve o arquivo original e documente transformações em uma cópia. Diferencie ausência de observação de ausência do fenômeno. Valide resultados com pontos ou amostras independentes, respeitando incerteza e restrições de divulgação. Uma estimativa exploratória não substitui levantamento oficial ou autorização territorial. O produto final deve incluir legenda, unidade, fonte, método e limitações.",
    "workedExample": "A resolução de 30 metros representa células com área nove vezes maior que a de dez metros. Pequenas parcelas podem deixar de aparecer sem mudança física equivalente. Os 15 hectares são diferença observada entre produtos, não abandono confirmado. Uma amostra dirigida às áreas divergentes ajuda a separar mudança real de efeito de processamento. No dossiê de comparação temporal de áreas agrícolas com imagens de resolução distinta, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Verificar harmonização de resolução, classe e data antes de atribuir toda a diferença a abandono agrícola. Compare a recomendação com esta alternativa incorreta: Publicar 15 hectares de abandono sem avaliar efeito de escala. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.qgis.org/latest/en/docs/training_manual/rasters/data_manipulation.html",
      "https://docs.qgis.org/latest/en/docs/gentle_gis_introduction/raster_data.html"
    ],
    "region": "africa"
  },
  {
    "id": "af-acessibilidade-a-mercados-por-rede-viaria-rural",
    "title": "Acessibilidade a mercados por rede viária rural",
    "track": "logistics",
    "role": "Analista de acessibilidade territorial",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Duas aldeias em Uganda ficam a cinco quilômetros em linha reta do mercado; pela rede viária, os trajetos medem seis e 18 quilômetros.",
    "decision": "Comparar rotas pela rede e registrar a diferença de acesso, sem tratar distâncias lineares iguais como serviço equivalente.",
    "misconception": "Atribuir o mesmo tempo de viagem às aldeias por estarem a cinco quilômetros no mapa.",
    "changedConstraint": "Uma ponte da rota curta fica temporariamente interditada.",
    "tasks": [
      "Grafo de vias utilizáveis",
      "Cadastro de restrições",
      "Rotas por rede",
      "Memória de distância e tempo",
      "Cenário de interdição",
      "Mapa de acesso por localidade"
    ],
    "method": "Construa uma rede conectada com sentido, restrições e custo coerentes com o modo de transporte. Distância euclidiana não representa percurso quando vias, rios ou barreiras importam. Tempo exige velocidades e condições explicitadas, não só quilômetros. Verifique conectividade e origem dos pontos antes de calcular. Atualize interdições e publique limitações de acesso sazonal para evitar falsa precisão. Uma camada espacial possui sistema de referência, escala, resolução, data e método de aquisição. Sobreposição visual não garante alinhamento nem comparabilidade. Preserve o arquivo original e documente transformações em uma cópia. Diferencie ausência de observação de ausência do fenômeno. Valide resultados com pontos ou amostras independentes, respeitando incerteza e restrições de divulgação. Uma estimativa exploratória não substitui levantamento oficial ou autorização territorial. O produto final deve incluir legenda, unidade, fonte, método e limitações.",
    "workedExample": "As duas aldeias têm distância linear igual, mas uma rota é três vezes a outra em extensão: 18 dividido por seis. Isso não prova tempo triplo se condições e velocidades diferirem. A interdição de ponte pode mudar totalmente a rede, exigindo recálculo do trajeto em vez de um simples ajuste no mapa visual. No dossiê de acessibilidade a mercados por rede viária rural, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Comparar rotas pela rede e registrar a diferença de acesso, sem tratar distâncias lineares iguais como serviço equivalente. Compare a recomendação com esta alternativa incorreta: Atribuir o mesmo tempo de viagem às aldeias por estarem a cinco quilômetros no mapa. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.qgis.org/latest/en/docs/training_manual/vector_analysis/network_analysis.html",
      "https://docs.qgis.org/latest/en/docs/user_manual/processing_algs/qgis/networkanalysis.html"
    ],
    "region": "africa"
  },
  {
    "id": "af-paineis-de-seca-com-anomalia-de-chuva-e-base-historica",
    "title": "Painéis de seca com anomalia de chuva e base histórica",
    "track": "data",
    "role": "Analista de indicadores climáticos",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma região no Benim registra 60 mm no mês, frente a média histórica de 100 e desvio-padrão de 20 sob série fornecida para o exercício.",
    "decision": "Calcular anomalia de menos 40 mm, ou menos 40%, e escore padronizado de menos dois, sem emitir alerta oficial de seca.",
    "misconception": "Tratar menos 40 mm como escore de menos 40 ou prever perda agrícola certa.",
    "changedConstraint": "A série histórica contém anos com medição incompleta.",
    "tasks": [
      "Base histórica validada",
      "Memória de anomalia absoluta",
      "Indicador percentual",
      "Escore padronizado",
      "Registro de lacunas de estação",
      "Painel de limites de interpretação"
    ],
    "method": "Defina período de referência e unidade antes de calcular anomalias. Diferença absoluta, percentual e padronizada respondem a perguntas distintas. A média e o desvio dependem de qualidade e comparabilidade da série; lacunas precisam de regra transparente. Um indicador de chuva não determina sozinho impacto agrícola ou situação oficial de seca, que exigem outras evidências e autoridades competentes. Uma camada espacial possui sistema de referência, escala, resolução, data e método de aquisição. Sobreposição visual não garante alinhamento nem comparabilidade. Preserve o arquivo original e documente transformações em uma cópia. Diferencie ausência de observação de ausência do fenômeno. Valide resultados com pontos ou amostras independentes, respeitando incerteza e restrições de divulgação. Uma estimativa exploratória não substitui levantamento oficial ou autorização territorial. O produto final deve incluir legenda, unidade, fonte, método e limitações.",
    "workedExample": "Sessenta menos 100 resulta em menos 40 mm. Dividindo por 100, a anomalia relativa é menos 40%. Dividindo a diferença de menos 40 pelo desvio de 20, o escore é menos dois. As três medidas descrevem a mesma observação em escalas diferentes e não devem compartilhar rótulo indistinto. No dossiê de painéis de seca com anomalia de chuva e base histórica, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Calcular anomalia de menos 40 mm, ou menos 40%, e escore padronizado de menos dois, sem emitir alerta oficial de seca. Compare a recomendação com esta alternativa incorreta: Tratar menos 40 mm como escore de menos 40 ou prever perda agrícola certa. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://library.wmo.int/idurl/4/39629",
      "https://docs.python.org/3/library/statistics.html"
    ],
    "region": "africa"
  },
  {
    "id": "af-deteccao-de-duplicatas-em-inventarios-georreferenciados",
    "title": "Detecção de duplicatas em inventários georreferenciados",
    "track": "data",
    "role": "Analista de integração de cadastros territoriais",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Dois cadastros no Senegal incluem 100 e 80 poços; 30 pares foram confirmados como a mesma infraestrutura, e nenhum outro vínculo foi validado.",
    "decision": "Consolidar 150 infraestruturas únicas e manter identificadores das duas fontes nos 30 vínculos confirmados.",
    "misconception": "Somar 180 ou fundir todos os pontos próximos sem confirmação.",
    "changedConstraint": "Dez poços próximos pertencem a sistemas diferentes no mesmo terreno.",
    "tasks": [
      "Contrato de entidade",
      "Tabela de vínculos de fontes",
      "Regra de candidatos por proximidade",
      "Fila de revisão de identidade",
      "Base consolidada",
      "Relatório de proveniência"
    ],
    "method": "Use proximidade para gerar candidatos e atributos para confirmar identidade. Coordenadas podem ter erro e equipamentos distintos podem compartilhar local. Preserve identificadores originais e relação de correspondência; não apague fonte ao consolidar. Diferencie vínculo confirmado, provável e rejeitado. Avalie falsos positivos e negativos com amostra revisada, especialmente quando a consolidação orienta investimento ou cobertura de serviço. Uma camada espacial possui sistema de referência, escala, resolução, data e método de aquisição. Sobreposição visual não garante alinhamento nem comparabilidade. Preserve o arquivo original e documente transformações em uma cópia. Diferencie ausência de observação de ausência do fenômeno. Valide resultados com pontos ou amostras independentes, respeitando incerteza e restrições de divulgação. Uma estimativa exploratória não substitui levantamento oficial ou autorização territorial. O produto final deve incluir legenda, unidade, fonte, método e limitações.",
    "workedExample": "Cem mais 80 gera 180 registros brutos. Trinta correspondem a infraestruturas contadas nas duas fontes, então subtraí-los uma vez produz 150 únicas. Essa conta depende dos vínculos confirmados. Dez poços próximos mas distintos não podem ser fundidos só por distância, pois isso reduziria artificialmente a cobertura cadastrada. No dossiê de detecção de duplicatas em inventários georreferenciados, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Consolidar 150 infraestruturas únicas e manter identificadores das duas fontes nos 30 vínculos confirmados. Compare a recomendação com esta alternativa incorreta: Somar 180 ou fundir todos os pontos próximos sem confirmação. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.qgis.org/latest/en/docs/user_manual/processing_algs/qgis/vectorgeneral.html",
      "https://docs.qgis.org/latest/en/docs/training_manual/vector_analysis/spatial_statistics.html"
    ],
    "region": "africa"
  },
  {
    "id": "af-publicacao-segura-de-mapas-de-populacoes-vulneraveis",
    "title": "Publicação segura de mapas de populações vulneráveis",
    "track": "cyber",
    "role": "Analista de governança de dados espaciais",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Um projeto em Ruanda pretende publicar pontos exatos de 50 domicílios vulneráveis; o objetivo público é mostrar cobertura por distrito, e consentimento de divulgação individual não foi obtido.",
    "decision": "Publicar agregação distrital adequada ao risco e reter pontos individuais em acesso restrito, avaliando possibilidade de reidentificação em grupos pequenos.",
    "misconception": "Retirar nomes e publicar coordenadas exatas como se estivessem anônimas.",
    "changedConstraint": "Um distrito contém apenas dois domicílios no conjunto.",
    "tasks": [
      "Inventário de dados sensíveis",
      "Matriz de finalidade e acesso",
      "Mapa agregado",
      "Teste de reidentificação",
      "Regra de supressão de grupos pequenos",
      "Plano de retenção e revisão"
    ],
    "method": "Localização exata pode identificar pessoas mesmo sem nome, especialmente em áreas de baixa densidade. Comece pela finalidade pública e reduza granularidade ao necessário. Avalie grupos pequenos, cruzamento com outras bases e acesso por perfil. Agregação não elimina todo risco, exigindo supressão ou combinação quando apropriado. Preserve dados brutos com controle e registre quem autoriza uso, publicação e prazo de retenção. Uma camada espacial possui sistema de referência, escala, resolução, data e método de aquisição. Sobreposição visual não garante alinhamento nem comparabilidade. Preserve o arquivo original e documente transformações em uma cópia. Diferencie ausência de observação de ausência do fenômeno. Valide resultados com pontos ou amostras independentes, respeitando incerteza e restrições de divulgação. Uma estimativa exploratória não substitui levantamento oficial ou autorização territorial. O produto final deve incluir legenda, unidade, fonte, método e limitações.",
    "workedExample": "Cinquenta pontos não precisam ser divulgados individualmente para mostrar cobertura distrital. Um distrito com dois domicílios pode continuar identificável mesmo após agregação, dependendo do contexto. O produto público deve passar por revisão de risco e pode combinar áreas ou suprimir contagens, mantendo utilidade sem prometer anonimato absoluto. No dossiê de publicação segura de mapas de populações vulneráveis, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Publicar agregação distrital adequada ao risco e reter pontos individuais em acesso restrito, avaliando possibilidade de reidentificação em grupos pequenos. Compare a recomendação com esta alternativa incorreta: Retirar nomes e publicar coordenadas exatas como se estivessem anônimas. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://www.w3.org/TR/privacy-principles/",
      "https://docs.qgis.org/latest/en/docs/training_manual/vector_analysis/basic_analysis.html"
    ],
    "region": "africa"
  },
  {
    "id": "af-reprodutibilidade-de-analises-espaciais-para-projetos-publicos",
    "title": "Reprodutibilidade de análises espaciais para projetos públicos",
    "track": "data",
    "role": "Analista de processos geoespaciais",
    "positioning": "specialist",
    "scenario": "Caso fictício de aprendizagem: Uma equipe em Moçambique produz mapa final sem registrar filtro, versão de camada ou sistema de referência; outro analista não consegue repetir o resultado.",
    "decision": "Reconstruir e documentar cadeia de entradas, transformações e parâmetros antes de tratar o mapa como resultado reprodutível.",
    "misconception": "Salvar apenas a imagem final em alta resolução e chamar isso de documentação técnica.",
    "changedConstraint": "A camada de origem é atualizada e substitui a versão usada inicialmente.",
    "tasks": [
      "Manifesto de entradas",
      "Modelo de processamento",
      "Registro de parâmetros",
      "Arquivo de versões",
      "Teste de reprodução independente",
      "Pacote de transferência técnica"
    ],
    "method": "Represente a análise como fluxo de dados com entradas imutáveis ou versionadas e parâmetros explícitos. Um projeto visual pode depender de arquivos externos que não acompanham a entrega. Registre ferramenta, versão, sistema espacial, filtros e regras de tratamento de ausências. Execute o fluxo novamente em cópia e compare saídas com tolerância definida. A documentação deve permitir localizar causa de diferença após atualização de fonte. Uma camada espacial possui sistema de referência, escala, resolução, data e método de aquisição. Sobreposição visual não garante alinhamento nem comparabilidade. Preserve o arquivo original e documente transformações em uma cópia. Diferencie ausência de observação de ausência do fenômeno. Valide resultados com pontos ou amostras independentes, respeitando incerteza e restrições de divulgação. Uma estimativa exploratória não substitui levantamento oficial ou autorização territorial. O produto final deve incluir legenda, unidade, fonte, método e limitações.",
    "workedExample": "Uma imagem final preserva aparência, mas não registra como foi calculada. Se a fonte mudar, o mesmo nome de arquivo pode produzir outro mapa. Um manifesto com versão ou hash, parâmetros e sequência permite separar mudança de dado e mudança de método. A reprodução independente testa se as instruções são suficientes para repetir a análise. No dossiê de reprodutibilidade de análises espaciais para projetos públicos, preserve a entrada original, a regra aplicada e a saída calculada. A decisão sustentada pelo exercício é: Reconstruir e documentar cadeia de entradas, transformações e parâmetros antes de tratar o mapa como resultado reprodutível. Compare a recomendação com esta alternativa incorreta: Salvar apenas a imagem final em alta resolução e chamar isso de documentação técnica. Explique o efeito sobre o indicador e indique a informação ainda necessária antes de uma aplicação real.",
    "sources": [
      "https://docs.qgis.org/latest/en/docs/training_manual/processing/modeler_twi.html",
      "https://docs.qgis.org/latest/en/docs/user_manual/processing/modeler.html"
    ],
    "region": "africa"
  }
];

import 'server-only';
import type { GlobalCourseSpec } from './types';

/** Original fictional occupational cases and authored technical instruction. */
export const south_americaSpecs: readonly GlobalCourseSpec[] = [
  {
    "id": "sa-balanco-de-massa-na-torrefacao-de-cafes-especiais",
    "title": "Balanço de massa na torrefação de cafés especiais",
    "track": "industry",
    "role": "Analista de operações agroalimentares",
    "positioning": "broad",
    "scenario": "Uma torrefação colombiana recebe 240 kg de café verde e registra 204 kg de café torrado, dos quais 6 kg ficam retidos para análise.",
    "decision": "Registrar rendimento físico de 85% e quantidade comercial disponível de 198 kg, sem contar retenção como perda de torra.",
    "misconception": "Divulgar 198 dividido por 240 como rendimento de torra sem separar retenção.",
    "changedConstraint": "O próximo lote chega com umidade diferente e exige comparação por base documentada.",
    "tasks": [
      "Ficha de entrada por saca",
      "Balanço verde-torrado",
      "Registro de retenção de amostras",
      "Custo por quilo vendável",
      "Mapa de lotes de embalagem",
      "Relatório de sensibilidade de rendimento"
    ],
    "method": "O rendimento de torra compara massa torrada com massa verde na mesma unidade. Retenção de amostra é destino do produto e não evaporação do processo. Preserve três linhas distintas para perda física, estoque retido e produto liberado. A rastreabilidade agroalimentar começa na unidade física: talhão, produtor, lote, recipiente ou turno. Registre origem, data, unidade de medida e transformações. Em balanços de massa, a entrada precisa corresponder à saída comercial mais perdas, descartes e variação de estoque; rendimento não é sinônimo de qualidade sanitária. Separe limite técnico documentado de preferência comercial. Dados de temperatura, umidade e tempo devem conservar a identificação do instrumento e a condição de amostragem; uma média pode esconder excursões. Para comparar alternativas, mantenha o mesmo denominador e explicite custos excluídos. Em simulação documental, não autorize aplicação de insumos, operação de equipamentos ou liberação de alimentos. Esses atos podem exigir responsável habilitado e verificação local. Trabalhe com planilhas sintéticas e decisões de planejamento, mantendo uma coluna de evidências pendentes. Uma recomendação deve informar o lote afetado, o motivo, o próximo responsável e o critério para reavaliar. A aplicação específica exige produzir ficha de entrada por saca e verificar a ligação com registro de retenção de amostras. Compare sua conclusão com a regra do caso: Registrar rendimento físico de 85% e quantidade comercial disponível de 198 kg, sem contar retenção como perda de torra. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma torrefação colombiana recebe 240 kg de café verde e registra 204 kg de café torrado, dos quais 6 kg ficam retidos para análise. Resolução: Registrar rendimento físico de 85% e quantidade comercial disponível de 198 kg, sem contar retenção como perda de torra. A perda de massa é 36 kg. A razão 204/240 resulta em 0,85. A retirada de seis quilos altera disponibilidade comercial, mas não muda a massa que saiu do torrador. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Divulgar 198 dividido por 240 como rendimento de torra sem separar retenção. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O próximo lote chega com umidade diferente e exige comparação por base documentada. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.cec.org/flwm/method/mass-balance/",
      "https://www.fao.org/4/x0039e/x0039e01.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-secagem-de-cacau-por-lotes",
    "title": "Planejamento de secagem de cacau por lotes",
    "track": "industry",
    "role": "Analista de operações agroalimentares",
    "positioning": "specialist",
    "scenario": "Uma cooperativa equatoriana recebe 900 kg de amêndoas com 60% de água e planeja produto com 7% de água, desconsiderando perdas de sólidos.",
    "decision": "Conservar 360 kg de sólidos e estimar 387,10 kg finais, tratando o valor como balanço ideal.",
    "misconception": "Subtrair 53% da massa inicial para obter a massa final.",
    "changedConstraint": "A inspeção identifica perda adicional de 3% dos sólidos durante o manuseio.",
    "tasks": [
      "Planilha de água e sólidos",
      "Mapa de lotes por terreiro",
      "Cronograma de revolvimento documental",
      "Balanço ideal de secagem",
      "Registro de desvios de pesagem",
      "Plano de comparação com massa observada"
    ],
    "method": "Umidade em base úmida divide água por massa total. Calcule primeiro sólidos secos, que permanecem constantes no modelo ideal, e depois divida pela fração de sólidos na condição final. A rastreabilidade agroalimentar começa na unidade física: talhão, produtor, lote, recipiente ou turno. Registre origem, data, unidade de medida e transformações. Em balanços de massa, a entrada precisa corresponder à saída comercial mais perdas, descartes e variação de estoque; rendimento não é sinônimo de qualidade sanitária. Separe limite técnico documentado de preferência comercial. Dados de temperatura, umidade e tempo devem conservar a identificação do instrumento e a condição de amostragem; uma média pode esconder excursões. Para comparar alternativas, mantenha o mesmo denominador e explicite custos excluídos. Em simulação documental, não autorize aplicação de insumos, operação de equipamentos ou liberação de alimentos. Esses atos podem exigir responsável habilitado e verificação local. Trabalhe com planilhas sintéticas e decisões de planejamento, mantendo uma coluna de evidências pendentes. Uma recomendação deve informar o lote afetado, o motivo, o próximo responsável e o critério para reavaliar. A aplicação específica exige produzir planilha de água e sólidos e verificar a ligação com cronograma de revolvimento documental. Compare sua conclusão com a regra do caso: Conservar 360 kg de sólidos e estimar 387,10 kg finais, tratando o valor como balanço ideal. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma cooperativa equatoriana recebe 900 kg de amêndoas com 60% de água e planeja produto com 7% de água, desconsiderando perdas de sólidos. Resolução: Conservar 360 kg de sólidos e estimar 387,10 kg finais, tratando o valor como balanço ideal. Os sólidos equivalem a 900 vezes 0,40. No destino, eles representam 93% da massa. Dividir 360 por 0,93 evita confundir variação percentual da umidade com perda percentual de peso. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Subtrair 53% da massa inicial para obter a massa final. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A inspeção identifica perda adicional de 3% dos sólidos durante o manuseio. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.fao.org/4/t1838e/t1838e0u.htm",
      "https://www.fao.org/4/s1250e/S1250E0u.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-rastreabilidade-de-castanha-amazonica-em-cooperativas",
    "title": "Rastreabilidade de castanha amazônica em cooperativas",
    "track": "industry",
    "role": "Analista de operações agroalimentares",
    "positioning": "specialist",
    "scenario": "Doze produtores entregam 40 sacos; cinco sacos de dois produtores foram misturados antes da atribuição de código de lote.",
    "decision": "Marcar o lote misto com os dois fornecedores possíveis e não atribuir origem exclusiva.",
    "misconception": "Escolher o fornecedor com maior participação e omitir o outro.",
    "changedConstraint": "Um comprador exige rastrear todas as embalagens derivadas do lote misto.",
    "tasks": [
      "Cadastro de produtores e entregas",
      "Árvore de mistura de sacos",
      "Regra de codificação dos lotes",
      "Matriz de embalagem e destino",
      "Simulação documental de recolhimento",
      "Registro de lacunas de origem"
    ],
    "method": "A genealogia de um lote preserva todas as entradas possíveis. A mistura impede inferência de origem exclusiva sem evidência adicional. Um sistema correto consegue propagar a incerteza até cada embalagem derivada. A rastreabilidade agroalimentar começa na unidade física: talhão, produtor, lote, recipiente ou turno. Registre origem, data, unidade de medida e transformações. Em balanços de massa, a entrada precisa corresponder à saída comercial mais perdas, descartes e variação de estoque; rendimento não é sinônimo de qualidade sanitária. Separe limite técnico documentado de preferência comercial. Dados de temperatura, umidade e tempo devem conservar a identificação do instrumento e a condição de amostragem; uma média pode esconder excursões. Para comparar alternativas, mantenha o mesmo denominador e explicite custos excluídos. Em simulação documental, não autorize aplicação de insumos, operação de equipamentos ou liberação de alimentos. Esses atos podem exigir responsável habilitado e verificação local. Trabalhe com planilhas sintéticas e decisões de planejamento, mantendo uma coluna de evidências pendentes. Uma recomendação deve informar o lote afetado, o motivo, o próximo responsável e o critério para reavaliar. A aplicação específica exige produzir cadastro de produtores e entregas e verificar a ligação com regra de codificação dos lotes. Compare sua conclusão com a regra do caso: Marcar o lote misto com os dois fornecedores possíveis e não atribuir origem exclusiva. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Doze produtores entregam 40 sacos; cinco sacos de dois produtores foram misturados antes da atribuição de código de lote. Resolução: Marcar o lote misto com os dois fornecedores possíveis e não atribuir origem exclusiva. Os cinco sacos formam uma unidade com duas origens potenciais. A rastreabilidade continua útil se registrar a mistura e localizar seus destinos, mesmo sem conseguir reconstruir a contribuição individual. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Escolher o fornecedor com maior participação e omitir o outro. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Um comprador exige rastrear todas as embalagens derivadas do lote misto. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.fao.org/good-hygiene-practices-haccp-toolbox/ghp/control-of-operation/",
      "https://www.fao.org/4/w8088e/w8088e04.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-controle-de-perdas-em-centrais-de-banana",
    "title": "Controle de perdas em centrais de banana",
    "track": "industry",
    "role": "Analista de operações agroalimentares",
    "positioning": "specialist",
    "scenario": "Uma central brasileira recebe 1200 caixas, descarta 60 e vende 1080, mantendo 60 em estoque ao fim do dia.",
    "decision": "Conciliar 1200 como 60 descartadas mais 1080 vendidas mais 60 em estoque; descarte é 5%.",
    "misconception": "Classificar toda caixa não vendida como perda.",
    "changedConstraint": "O estoque remanescente muda de classe comercial no dia seguinte.",
    "tasks": [
      "Conciliação de entrada de caixas",
      "Classificação de descarte",
      "Registro de estoque por maturação",
      "Indicador de perda física",
      "Comparação de receita por classe",
      "Plano de acompanhamento do remanescente"
    ],
    "method": "Balanço de estoque considera saldo inicial, entradas, saídas e saldo final. Perda exige evidência de descarte ou deterioração; baixa velocidade de venda não transforma estoque existente em descarte físico. A rastreabilidade agroalimentar começa na unidade física: talhão, produtor, lote, recipiente ou turno. Registre origem, data, unidade de medida e transformações. Em balanços de massa, a entrada precisa corresponder à saída comercial mais perdas, descartes e variação de estoque; rendimento não é sinônimo de qualidade sanitária. Separe limite técnico documentado de preferência comercial. Dados de temperatura, umidade e tempo devem conservar a identificação do instrumento e a condição de amostragem; uma média pode esconder excursões. Para comparar alternativas, mantenha o mesmo denominador e explicite custos excluídos. Em simulação documental, não autorize aplicação de insumos, operação de equipamentos ou liberação de alimentos. Esses atos podem exigir responsável habilitado e verificação local. Trabalhe com planilhas sintéticas e decisões de planejamento, mantendo uma coluna de evidências pendentes. Uma recomendação deve informar o lote afetado, o motivo, o próximo responsável e o critério para reavaliar. A aplicação específica exige produzir conciliação de entrada de caixas e verificar a ligação com registro de estoque por maturação. Compare sua conclusão com a regra do caso: Conciliar 1200 como 60 descartadas mais 1080 vendidas mais 60 em estoque; descarte é 5%. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma central brasileira recebe 1200 caixas, descarta 60 e vende 1080, mantendo 60 em estoque ao fim do dia. Resolução: Conciliar 1200 como 60 descartadas mais 1080 vendidas mais 60 em estoque; descarte é 5%. Dividir 60 descartes por 1200 recebimentos produz 5%. As outras 60 caixas continuam no ativo físico. A análise de valor pode exigir provisão comercial, mas deve ficar separada do indicador físico. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Classificar toda caixa não vendida como perda. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O estoque remanescente muda de classe comercial no dia seguinte. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.cec.org/flwm/method/mass-balance/",
      "https://www.fao.org/4/x0039e/x0039e01.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-custos-de-racao-e-conversao-em-piscicultura-documental",
    "title": "Custos de ração e conversão em piscicultura documental",
    "track": "industry",
    "role": "Analista de operações agroalimentares",
    "positioning": "broad",
    "scenario": "Um cultivo simulado no Peru usa 1800 kg de ração e registra aumento de biomassa de 1200 kg, sem outras entradas.",
    "decision": "Calcular conversão alimentar aparente de 1,5 kg de ração por kg de ganho e declarar os limites de medição.",
    "misconception": "Usar biomassa final total como denominador sem descontar a inicial.",
    "changedConstraint": "A pesagem final tem incerteza de mais ou menos 100 kg.",
    "tasks": [
      "Memória de biomassa inicial e final",
      "Registro de fornecimento de ração",
      "Cálculo de conversão aparente",
      "Custo alimentar por ganho",
      "Análise de sensibilidade da pesagem",
      "Lista de validações zootécnicas pendentes"
    ],
    "method": "Conversão alimentar aparente relaciona ração fornecida ao ganho de biomassa, sem demonstrar ingestão individual. Mortalidade, escapes e imprecisão de pesagem alteram a interpretação e precisam ser documentados. A rastreabilidade agroalimentar começa na unidade física: talhão, produtor, lote, recipiente ou turno. Registre origem, data, unidade de medida e transformações. Em balanços de massa, a entrada precisa corresponder à saída comercial mais perdas, descartes e variação de estoque; rendimento não é sinônimo de qualidade sanitária. Separe limite técnico documentado de preferência comercial. Dados de temperatura, umidade e tempo devem conservar a identificação do instrumento e a condição de amostragem; uma média pode esconder excursões. Para comparar alternativas, mantenha o mesmo denominador e explicite custos excluídos. Em simulação documental, não autorize aplicação de insumos, operação de equipamentos ou liberação de alimentos. Esses atos podem exigir responsável habilitado e verificação local. Trabalhe com planilhas sintéticas e decisões de planejamento, mantendo uma coluna de evidências pendentes. Uma recomendação deve informar o lote afetado, o motivo, o próximo responsável e o critério para reavaliar. A aplicação específica exige produzir memória de biomassa inicial e final e verificar a ligação com cálculo de conversão aparente. Compare sua conclusão com a regra do caso: Calcular conversão alimentar aparente de 1,5 kg de ração por kg de ganho e declarar os limites de medição. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um cultivo simulado no Peru usa 1800 kg de ração e registra aumento de biomassa de 1200 kg, sem outras entradas. Resolução: Calcular conversão alimentar aparente de 1,5 kg de ração por kg de ganho e declarar os limites de medição. A razão 1800/1200 é 1,5. Se o ganho variar entre 1100 e 1300 kg, a conversão ficará aproximadamente entre 1,64 e 1,38. A precisão aparente de casas decimais não elimina a incerteza. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Usar biomassa final total como denominador sem descontar a inicial. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A pesagem final tem incerteza de mais ou menos 100 kg. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.fao.org/4/s4314e/s4314e03.htm",
      "https://www.fao.org/fishery/static/FAO_Training/FAO_Training/General/x6709e/x6709e10.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-programacao-de-colheita-de-quinoa-por-capacidade",
    "title": "Programação de colheita de quinoa por capacidade",
    "track": "industry",
    "role": "Analista de operações agroalimentares",
    "positioning": "specialist",
    "scenario": "Uma associação boliviana tem 75 toneladas prontas, capacidade documental de processamento de 15 toneladas por dia e janela de quatro dias.",
    "decision": "Identificar déficit de 15 toneladas na janela e negociar capacidade ou calendário antes de prometer processamento integral.",
    "misconception": "Confirmar que toda a produção cabe em quatro dias porque a média mensal é suficiente.",
    "changedConstraint": "Um dia de operação fica indisponível por manutenção programada.",
    "tasks": [
      "Mapa de talhões e volumes",
      "Calendário de prontidão",
      "Tabela de capacidade diária",
      "Fila de processamento por lote",
      "Plano de terceirização documental",
      "Memorando de risco de atraso"
    ],
    "method": "Uma restrição de capacidade deve ser avaliada no período em que a demanda precisa ser atendida. Capacidade mensal não resolve um pico curto sem estoque intermediário ou recurso alternativo validado. A rastreabilidade agroalimentar começa na unidade física: talhão, produtor, lote, recipiente ou turno. Registre origem, data, unidade de medida e transformações. Em balanços de massa, a entrada precisa corresponder à saída comercial mais perdas, descartes e variação de estoque; rendimento não é sinônimo de qualidade sanitária. Separe limite técnico documentado de preferência comercial. Dados de temperatura, umidade e tempo devem conservar a identificação do instrumento e a condição de amostragem; uma média pode esconder excursões. Para comparar alternativas, mantenha o mesmo denominador e explicite custos excluídos. Em simulação documental, não autorize aplicação de insumos, operação de equipamentos ou liberação de alimentos. Esses atos podem exigir responsável habilitado e verificação local. Trabalhe com planilhas sintéticas e decisões de planejamento, mantendo uma coluna de evidências pendentes. Uma recomendação deve informar o lote afetado, o motivo, o próximo responsável e o critério para reavaliar. A aplicação específica exige produzir mapa de talhões e volumes e verificar a ligação com tabela de capacidade diária. Compare sua conclusão com a regra do caso: Identificar déficit de 15 toneladas na janela e negociar capacidade ou calendário antes de prometer processamento integral. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma associação boliviana tem 75 toneladas prontas, capacidade documental de processamento de 15 toneladas por dia e janela de quatro dias. Resolução: Identificar déficit de 15 toneladas na janela e negociar capacidade ou calendário antes de prometer processamento integral. Quatro dias multiplicados por 15 permitem processar 60 toneladas. O volume pronto excede esse limite em 15. Com apenas três dias disponíveis, a folga negativa passa a 30 toneladas. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Confirmar que toda a produção cabe em quatro dias porque a média mensal é suficiente. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Um dia de operação fica indisponível por manutenção programada. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://developers.google.com/optimization/routing/cvrptw_resources",
      "https://www.fao.org/4/s1250e/S1250E0u.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-reconciliacao-de-solidos-no-beneficiamento-de-leite",
    "title": "Reconciliação de sólidos no beneficiamento de leite",
    "track": "industry",
    "role": "Analista de operações agroalimentares",
    "positioning": "specialist",
    "scenario": "Uma operação uruguaia compara 1000 litros de leite com 3,5% de gordura e um lote de 800 litros com 4%, usando a simplificação didática de densidade igual.",
    "decision": "Comparar 35 e 32 unidades equivalentes de gordura e declarar que a densidade deve ser corrigida em cálculo real.",
    "misconception": "Escolher o lote de 4% como maior quantidade total de gordura apenas pelo teor.",
    "changedConstraint": "A densidade informada difere entre os dois lotes.",
    "tasks": [
      "Tabela de volume e composição",
      "Conversão documental de densidade",
      "Balanço simplificado de gordura",
      "Comparação de rendimento potencial",
      "Lista de medições necessárias",
      "Nota de limites da estimativa"
    ],
    "method": "Teor é concentração e precisa ser multiplicado pela quantidade de material para obter conteúdo total. Em análises lácteas, volume e massa não são intercambiáveis sem densidade e condição de referência. A rastreabilidade agroalimentar começa na unidade física: talhão, produtor, lote, recipiente ou turno. Registre origem, data, unidade de medida e transformações. Em balanços de massa, a entrada precisa corresponder à saída comercial mais perdas, descartes e variação de estoque; rendimento não é sinônimo de qualidade sanitária. Separe limite técnico documentado de preferência comercial. Dados de temperatura, umidade e tempo devem conservar a identificação do instrumento e a condição de amostragem; uma média pode esconder excursões. Para comparar alternativas, mantenha o mesmo denominador e explicite custos excluídos. Em simulação documental, não autorize aplicação de insumos, operação de equipamentos ou liberação de alimentos. Esses atos podem exigir responsável habilitado e verificação local. Trabalhe com planilhas sintéticas e decisões de planejamento, mantendo uma coluna de evidências pendentes. Uma recomendação deve informar o lote afetado, o motivo, o próximo responsável e o critério para reavaliar. A aplicação específica exige produzir tabela de volume e composição e verificar a ligação com balanço simplificado de gordura. Compare sua conclusão com a regra do caso: Comparar 35 e 32 unidades equivalentes de gordura e declarar que a densidade deve ser corrigida em cálculo real. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma operação uruguaia compara 1000 litros de leite com 3,5% de gordura e um lote de 800 litros com 4%, usando a simplificação didática de densidade igual. Resolução: Comparar 35 e 32 unidades equivalentes de gordura e declarar que a densidade deve ser corrigida em cálculo real. O primeiro lote contém 1000 vezes 0,035 igual a 35. O segundo contém 800 vezes 0,04 igual a 32. Maior concentração não compensa necessariamente o menor volume. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Escolher o lote de 4% como maior quantidade total de gordura apenas pelo teor. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A densidade informada difere entre os dois lotes. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.fao.org/4/T0045E/T0045E05.htm",
      "https://www.fao.org/4/x6931e/x6931e04.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-documentacao-de-fermentacao-de-frutas-para-bebidas",
    "title": "Documentação de fermentação de frutas para bebidas",
    "track": "industry",
    "role": "Analista de operações agroalimentares",
    "positioning": "specialist",
    "scenario": "Uma unidade no Chile mantém oito tanques com registros diários; dois ficaram 24 horas sem leitura e não têm anotação de contingência.",
    "decision": "Marcar a lacuna e pedir avaliação responsável antes de concluir conformidade do processo.",
    "misconception": "Interpolar valores e apresentá-los como medições reais.",
    "changedConstraint": "O instrumento de um terceiro tanque é identificado como fora da validade de verificação.",
    "tasks": [
      "Mapa de tanques e lotes",
      "Série temporal com ausências",
      "Registro de instrumento por leitura",
      "Matriz de critérios documentais",
      "Fluxo de escalonamento técnico",
      "Relatório de integridade do processo"
    ],
    "method": "Séries de processo precisam preservar ausência e origem de cada observação. Interpolação pode apoiar análise exploratória se claramente identificada, mas não reconstrói uma medição que não ocorreu. A rastreabilidade agroalimentar começa na unidade física: talhão, produtor, lote, recipiente ou turno. Registre origem, data, unidade de medida e transformações. Em balanços de massa, a entrada precisa corresponder à saída comercial mais perdas, descartes e variação de estoque; rendimento não é sinônimo de qualidade sanitária. Separe limite técnico documentado de preferência comercial. Dados de temperatura, umidade e tempo devem conservar a identificação do instrumento e a condição de amostragem; uma média pode esconder excursões. Para comparar alternativas, mantenha o mesmo denominador e explicite custos excluídos. Em simulação documental, não autorize aplicação de insumos, operação de equipamentos ou liberação de alimentos. Esses atos podem exigir responsável habilitado e verificação local. Trabalhe com planilhas sintéticas e decisões de planejamento, mantendo uma coluna de evidências pendentes. Uma recomendação deve informar o lote afetado, o motivo, o próximo responsável e o critério para reavaliar. A aplicação específica exige produzir mapa de tanques e lotes e verificar a ligação com registro de instrumento por leitura. Compare sua conclusão com a regra do caso: Marcar a lacuna e pedir avaliação responsável antes de concluir conformidade do processo. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma unidade no Chile mantém oito tanques com registros diários; dois ficaram 24 horas sem leitura e não têm anotação de contingência. Resolução: Marcar a lacuna e pedir avaliação responsável antes de concluir conformidade do processo. Se seis tanques têm sequência completa e dois não, completude por tanque é 75%. Esse índice não demonstra segurança do produto nem autoriza liberar os tanques com registros completos. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Interpolar valores e apresentá-los como medições reais. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O instrumento de um terceiro tanque é identificado como fora da validade de verificação. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.fao.org/good-hygiene-practices-haccp-toolbox/ghp/control-of-operation/",
      "https://www.fao.org/4/w8088e/w8088e04.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-beneficiamento-de-mandioca-comunitaria",
    "title": "Planejamento de beneficiamento de mandioca comunitária",
    "track": "industry",
    "role": "Analista de operações agroalimentares",
    "positioning": "broad",
    "scenario": "Uma unidade paraguaia recebe 2000 kg de raízes; o caso fornece rendimento estimado de 25% de farinha e embalagens de 5 kg.",
    "decision": "Planejar 500 kg e cem embalagens no cenário estimado, mantendo validação de rendimento e segurança com responsável.",
    "misconception": "Garantir cem embalagens independentemente de qualidade e rendimento reais.",
    "changedConstraint": "A massa de raízes elegíveis cai para 1800 kg após classificação.",
    "tasks": [
      "Balanço estimado de raízes e farinha",
      "Lista de embalagens necessárias",
      "Calendário de entrada por produtor",
      "Custo unitário de embalagem",
      "Registro de perdas de classificação",
      "Plano de revisão do rendimento observado"
    ],
    "method": "Planejamento por rendimento usa uma hipótese explicitamente rotulada e não substitui medição. Diferencie matéria-prima recebida, matéria-prima elegível e saída conforme; cada passagem possui um denominador próprio. A rastreabilidade agroalimentar começa na unidade física: talhão, produtor, lote, recipiente ou turno. Registre origem, data, unidade de medida e transformações. Em balanços de massa, a entrada precisa corresponder à saída comercial mais perdas, descartes e variação de estoque; rendimento não é sinônimo de qualidade sanitária. Separe limite técnico documentado de preferência comercial. Dados de temperatura, umidade e tempo devem conservar a identificação do instrumento e a condição de amostragem; uma média pode esconder excursões. Para comparar alternativas, mantenha o mesmo denominador e explicite custos excluídos. Em simulação documental, não autorize aplicação de insumos, operação de equipamentos ou liberação de alimentos. Esses atos podem exigir responsável habilitado e verificação local. Trabalhe com planilhas sintéticas e decisões de planejamento, mantendo uma coluna de evidências pendentes. Uma recomendação deve informar o lote afetado, o motivo, o próximo responsável e o critério para reavaliar. A aplicação específica exige produzir balanço estimado de raízes e farinha e verificar a ligação com calendário de entrada por produtor. Compare sua conclusão com a regra do caso: Planejar 500 kg e cem embalagens no cenário estimado, mantendo validação de rendimento e segurança com responsável. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma unidade paraguaia recebe 2000 kg de raízes; o caso fornece rendimento estimado de 25% de farinha e embalagens de 5 kg. Resolução: Planejar 500 kg e cem embalagens no cenário estimado, mantendo validação de rendimento e segurança com responsável. No cenário inicial, 2000 vezes 0,25 são 500 kg. Com 1800 kg elegíveis, a projeção é 450 kg, suficiente para noventa embalagens, desde que o rendimento estimado se confirme. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Garantir cem embalagens independentemente de qualidade e rendimento reais. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A massa de raízes elegíveis cai para 1800 kg após classificação. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.fao.org/4/x5032e/x5032e02.htm",
      "https://www.fao.org/family-farming/detail/en/c/1619655/"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-gestao-de-pedidos-de-sementes-nativas-com-procedencia",
    "title": "Gestão de pedidos de sementes nativas com procedência",
    "track": "industry",
    "role": "Analista de operações agroalimentares",
    "positioning": "specialist",
    "scenario": "Um viveiro colombiano promete 5000 mudas e possui 4200 com procedência documentada e 1100 sem registro de origem.",
    "decision": "Reconhecer déficit documental de 800 mudas para o pedido e separar estoque sem procedência.",
    "misconception": "Somar todas as mudas e declarar o requisito de procedência atendido.",
    "changedConstraint": "O comprador acrescenta exigência de distribuição por três áreas de origem.",
    "tasks": [
      "Cadastro de matrizes e coleta",
      "Mapa de lotes de sementes",
      "Vinculação de mudas à procedência",
      "Conciliação de pedidos elegíveis",
      "Plano de lacunas por origem",
      "Dossiê de entrega documental"
    ],
    "method": "Procedência é atributo verificável do lote, não característica inferida pela aparência. Um pedido com requisito de origem deve ser atendido apenas com unidades ligadas a evidências compatíveis. A rastreabilidade agroalimentar começa na unidade física: talhão, produtor, lote, recipiente ou turno. Registre origem, data, unidade de medida e transformações. Em balanços de massa, a entrada precisa corresponder à saída comercial mais perdas, descartes e variação de estoque; rendimento não é sinônimo de qualidade sanitária. Separe limite técnico documentado de preferência comercial. Dados de temperatura, umidade e tempo devem conservar a identificação do instrumento e a condição de amostragem; uma média pode esconder excursões. Para comparar alternativas, mantenha o mesmo denominador e explicite custos excluídos. Em simulação documental, não autorize aplicação de insumos, operação de equipamentos ou liberação de alimentos. Esses atos podem exigir responsável habilitado e verificação local. Trabalhe com planilhas sintéticas e decisões de planejamento, mantendo uma coluna de evidências pendentes. Uma recomendação deve informar o lote afetado, o motivo, o próximo responsável e o critério para reavaliar. A aplicação específica exige produzir cadastro de matrizes e coleta e verificar a ligação com vinculação de mudas à procedência. Compare sua conclusão com a regra do caso: Reconhecer déficit documental de 800 mudas para o pedido e separar estoque sem procedência. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um viveiro colombiano promete 5000 mudas e possui 4200 com procedência documentada e 1100 sem registro de origem. Resolução: Reconhecer déficit documental de 800 mudas para o pedido e separar estoque sem procedência. Embora o estoque físico total seja 5300, somente 4200 unidades atendem ao atributo exigido. O déficit de 800 deve ser comunicado antes da entrega, sem reclassificar silenciosamente as 1100 unidades incertas. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Somar todas as mudas e declarar o requisito de procedência atendido. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O comprador acrescenta exigência de distribuição por três áreas de origem. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.fao.org/sustainable-forest-management-toolbox/modules/forest-reproductive-material/en",
      "https://www.fao.org/4/AD232E/AD232E03.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-reconciliacao-de-certificados-de-energia-por-periodo",
    "title": "Reconciliação de certificados de energia por período",
    "track": "energy",
    "role": "Analista de planejamento energético",
    "positioning": "specialist",
    "scenario": "Uma empresa chilena consome 900 MWh em abril e apresenta certificados de 1000 MWh emitidos para outro período de referência.",
    "decision": "Não afirmar correspondência temporal sem conferir as regras do instrumento e a elegibilidade do período.",
    "misconception": "Declarar cobertura automaticamente porque 1000 supera 900.",
    "changedConstraint": "Metade dos certificados foi transferida antes do cancelamento para uso próprio.",
    "tasks": [
      "Inventário de consumo mensal",
      "Cadastro dos instrumentos",
      "Matriz de elegibilidade temporal",
      "Conciliação de titularidade",
      "Registro de cancelamento documental",
      "Nota de alegações permitidas"
    ],
    "method": "A contabilidade de instrumentos energéticos exige quantidade, titularidade, tecnologia, localização e período compatíveis com o critério usado. Produção física e atributo contratual são registros relacionados, porém distintos. Construa o balanço energético antes de comparar equipamentos: potência representa capacidade instantânea e energia representa potência integrada no tempo. Converta unidades explicitamente e mantenha fronteira do sistema, período e eficiência na mesma linha do cálculo. Diferencie energia produzida, consumida, exportada e indisponível. Uma economia calculada com tarifa média pode divergir do efeito financeiro quando há ponta, demanda ou encargos; registre a simplificação. Compare uma alternativa com uma linha de base equivalente e use cenário de sensibilidade para recurso, preço e disponibilidade. Não trate capacidade nominal como produção garantida. Documente a procedência e o ano dos fatores utilizados, sem converter estimativas educacionais em inventário verificado ou parecer de engenharia. Os exercícios são análises de dados e planejamento: comissionamento, intervenção elétrica e operação de instalações pertencem a profissionais habilitados segundo a jurisdição. Entregue memória de cálculo reproduzível, premissas, restrições e riscos residuais. A aplicação específica exige produzir inventário de consumo mensal e verificar a ligação com matriz de elegibilidade temporal. Compare sua conclusão com a regra do caso: Não afirmar correspondência temporal sem conferir as regras do instrumento e a elegibilidade do período. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma empresa chilena consome 900 MWh em abril e apresenta certificados de 1000 MWh emitidos para outro período de referência. Resolução: Não afirmar correspondência temporal sem conferir as regras do instrumento e a elegibilidade do período. O excedente quantitativo de cem MWh não corrige um período inelegível. Antes de calcular cobertura, filtre instrumentos válidos e ainda disponíveis para a finalidade declarada. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Declarar cobertura automaticamente porque 1000 supera 900. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Metade dos certificados foi transferida antes do cancelamento para uso próprio. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.epa.gov/green-power-markets/energy-attribute-tracking-systems",
      "https://www.epa.gov/green-power-markets/credible-claims"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-analise-de-indisponibilidade-em-parques-eolicos-costeiros",
    "title": "Análise de indisponibilidade em parques eólicos costeiros",
    "track": "energy",
    "role": "Analista de planejamento energético",
    "positioning": "specialist",
    "scenario": "Um parque uruguaio possui 20 turbinas; duas ficam indisponíveis durante 12 das 24 horas do dia e as demais permanecem disponíveis.",
    "decision": "Calcular disponibilidade por turbina-hora de 95%, sem tratá-la como fator de capacidade.",
    "misconception": "Dividir 18 turbinas por 20 e divulgar disponibilidade diária de 90%.",
    "changedConstraint": "Uma terceira turbina sofre limitação parcial durante seis horas.",
    "tasks": [
      "Inventário de turbinas e estados",
      "Linha temporal de indisponibilidade",
      "Cálculo de turbina-hora",
      "Classificação de limitação parcial",
      "Comparação com energia realizada",
      "Relatório de causas documentadas"
    ],
    "method": "Disponibilidade temporal pondera a duração dos estados de cada ativo. Fator de capacidade compara energia produzida à energia máxima nominal; ausência de vento pode reduzir produção sem indisponibilidade mecânica. Construa o balanço energético antes de comparar equipamentos: potência representa capacidade instantânea e energia representa potência integrada no tempo. Converta unidades explicitamente e mantenha fronteira do sistema, período e eficiência na mesma linha do cálculo. Diferencie energia produzida, consumida, exportada e indisponível. Uma economia calculada com tarifa média pode divergir do efeito financeiro quando há ponta, demanda ou encargos; registre a simplificação. Compare uma alternativa com uma linha de base equivalente e use cenário de sensibilidade para recurso, preço e disponibilidade. Não trate capacidade nominal como produção garantida. Documente a procedência e o ano dos fatores utilizados, sem converter estimativas educacionais em inventário verificado ou parecer de engenharia. Os exercícios são análises de dados e planejamento: comissionamento, intervenção elétrica e operação de instalações pertencem a profissionais habilitados segundo a jurisdição. Entregue memória de cálculo reproduzível, premissas, restrições e riscos residuais. A aplicação específica exige produzir inventário de turbinas e estados e verificar a ligação com cálculo de turbina-hora. Compare sua conclusão com a regra do caso: Calcular disponibilidade por turbina-hora de 95%, sem tratá-la como fator de capacidade. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um parque uruguaio possui 20 turbinas; duas ficam indisponíveis durante 12 das 24 horas do dia e as demais permanecem disponíveis. Resolução: Calcular disponibilidade por turbina-hora de 95%, sem tratá-la como fator de capacidade. O universo é 20 vezes 24 igual a 480 turbina-horas. A indisponibilidade soma 24. Assim, 456 divididas por 480 resultam em 95%, sem informação suficiente para calcular produção. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Dividir 18 turbinas por 20 e divulgar disponibilidade diária de 90%. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Uma terceira turbina sofre limitação parcial durante seis horas. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.eia.gov/energyexplained/electricity/measuring-electricity.php",
      "https://support.microsoft.com/en-us/excel/calculate-the-average-of-a-group-of-numbers"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-autoconsumo-solar-em-pequenas-industrias",
    "title": "Planejamento de autoconsumo solar em pequenas indústrias",
    "track": "energy",
    "role": "Analista de planejamento energético",
    "positioning": "broad",
    "scenario": "Uma fábrica no Brasil gera 1200 kWh em um dia, consome diretamente 840 e exporta 360, sob regra tarifária ainda não validada.",
    "decision": "Registrar autoconsumo físico de 70% e avaliar exportação separadamente antes de estimar retorno financeiro.",
    "misconception": "Aplicar a mesma tarifa varejista a toda a energia gerada sem verificar compensação.",
    "changedConstraint": "A produção de fim de semana aumenta enquanto o consumo industrial cai.",
    "tasks": [
      "Série horária de geração",
      "Perfil de carga da fábrica",
      "Conciliação de autoconsumo e exportação",
      "Mapa de premissas tarifárias",
      "Cenários de coincidência de carga",
      "Memória econômica condicionada"
    ],
    "method": "Autoconsumo é energia gerada e utilizada dentro da mesma fronteira temporal e física. A energia exportada pode ter tratamento econômico distinto, por isso produção anual sozinha não demonstra economia de conta. Construa o balanço energético antes de comparar equipamentos: potência representa capacidade instantânea e energia representa potência integrada no tempo. Converta unidades explicitamente e mantenha fronteira do sistema, período e eficiência na mesma linha do cálculo. Diferencie energia produzida, consumida, exportada e indisponível. Uma economia calculada com tarifa média pode divergir do efeito financeiro quando há ponta, demanda ou encargos; registre a simplificação. Compare uma alternativa com uma linha de base equivalente e use cenário de sensibilidade para recurso, preço e disponibilidade. Não trate capacidade nominal como produção garantida. Documente a procedência e o ano dos fatores utilizados, sem converter estimativas educacionais em inventário verificado ou parecer de engenharia. Os exercícios são análises de dados e planejamento: comissionamento, intervenção elétrica e operação de instalações pertencem a profissionais habilitados segundo a jurisdição. Entregue memória de cálculo reproduzível, premissas, restrições e riscos residuais. A aplicação específica exige produzir série horária de geração e verificar a ligação com conciliação de autoconsumo e exportação. Compare sua conclusão com a regra do caso: Registrar autoconsumo físico de 70% e avaliar exportação separadamente antes de estimar retorno financeiro. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma fábrica no Brasil gera 1200 kWh em um dia, consome diretamente 840 e exporta 360, sob regra tarifária ainda não validada. Resolução: Registrar autoconsumo físico de 70% e avaliar exportação separadamente antes de estimar retorno financeiro. A razão 840/1200 resulta em 70%. Os 360 kWh exportados exigem regra própria de valorização. Mais geração em horário sem carga pode ampliar exportação sem ampliar economia na mesma proporção. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Aplicar a mesma tarifa varejista a toda a energia gerada sem verificar compensação. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A produção de fim de semana aumenta enquanto o consumo industrial cai. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://samrepo.nlr.gov/help/electricity_rates.html",
      "https://sam.nlr.gov/photovoltaic"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-balanco-energetico-de-secagem-industrial-de-graos",
    "title": "Balanço energético de secagem industrial de grãos",
    "track": "energy",
    "role": "Analista de planejamento energético",
    "positioning": "specialist",
    "scenario": "Um secador argentino recebe 5000 kWh de energia térmica e entrega 3500 kWh úteis ao processo no modelo fornecido.",
    "decision": "Calcular eficiência útil de 70% e identificar 1500 kWh fora da saída útil definida.",
    "misconception": "Tratar diferença energética como toda recuperável sem análise técnica.",
    "changedConstraint": "A umidade de entrada muda e aumenta a carga térmica por tonelada.",
    "tasks": [
      "Definição de fronteira térmica",
      "Tabela de entradas energéticas",
      "Estimativa de energia útil",
      "Indicador por tonelada seca",
      "Classificação de perdas e incertezas",
      "Plano de medição complementar"
    ],
    "method": "Eficiência depende da fronteira e da definição de energia útil. Uma diferença entre entrada e saída pode envolver perdas, armazenamento e incerteza; não pressupõe potencial técnico integral de recuperação. Construa o balanço energético antes de comparar equipamentos: potência representa capacidade instantânea e energia representa potência integrada no tempo. Converta unidades explicitamente e mantenha fronteira do sistema, período e eficiência na mesma linha do cálculo. Diferencie energia produzida, consumida, exportada e indisponível. Uma economia calculada com tarifa média pode divergir do efeito financeiro quando há ponta, demanda ou encargos; registre a simplificação. Compare uma alternativa com uma linha de base equivalente e use cenário de sensibilidade para recurso, preço e disponibilidade. Não trate capacidade nominal como produção garantida. Documente a procedência e o ano dos fatores utilizados, sem converter estimativas educacionais em inventário verificado ou parecer de engenharia. Os exercícios são análises de dados e planejamento: comissionamento, intervenção elétrica e operação de instalações pertencem a profissionais habilitados segundo a jurisdição. Entregue memória de cálculo reproduzível, premissas, restrições e riscos residuais. A aplicação específica exige produzir definição de fronteira térmica e verificar a ligação com estimativa de energia útil. Compare sua conclusão com a regra do caso: Calcular eficiência útil de 70% e identificar 1500 kWh fora da saída útil definida. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um secador argentino recebe 5000 kWh de energia térmica e entrega 3500 kWh úteis ao processo no modelo fornecido. Resolução: Calcular eficiência útil de 70% e identificar 1500 kWh fora da saída útil definida. A divisão 3500 por 5000 fornece 0,70. Comparar dias diferentes exige normalizar volume processado e umidade removida, pois uma carga mais úmida pode demandar mais energia sem piora do equipamento. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Tratar diferença energética como toda recuperável sem análise técnica. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A umidade de entrada muda e aumenta a carga térmica por tonelada. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.eia.gov/energyexplained/units-and-calculators/energy-conversion-calculators.php",
      "https://www.energy.gov/cmei/energy-efficiency-vs-energy-intensity"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-analise-documental-de-biogas-em-cooperativas",
    "title": "Análise documental de biogás em cooperativas",
    "track": "energy",
    "role": "Analista de planejamento energético",
    "positioning": "specialist",
    "scenario": "Uma cooperativa brasileira registra 3000 m³ de biogás com 60% de metano e outra 2500 m³ com 72%, na mesma condição de referência.",
    "decision": "Reconhecer 1800 m³ equivalentes de metano em ambos os lotes e comparar impurezas separadamente.",
    "misconception": "Escolher o maior volume bruto como maior conteúdo energético sem composição.",
    "changedConstraint": "Um lote apresenta concentração de contaminante sem medição confirmatória.",
    "tasks": [
      "Cadastro de volume e referência",
      "Tabela de composição gasosa",
      "Balanço equivalente de metano",
      "Registro de incerteza analítica",
      "Comparação de usos pretendidos",
      "Fluxo de validação especializada"
    ],
    "method": "Volume de mistura não equivale a volume do componente energético. Normalize condições de pressão e temperatura e só então combine volume com fração de composição; contaminantes podem limitar o uso apesar da equivalência energética. Construa o balanço energético antes de comparar equipamentos: potência representa capacidade instantânea e energia representa potência integrada no tempo. Converta unidades explicitamente e mantenha fronteira do sistema, período e eficiência na mesma linha do cálculo. Diferencie energia produzida, consumida, exportada e indisponível. Uma economia calculada com tarifa média pode divergir do efeito financeiro quando há ponta, demanda ou encargos; registre a simplificação. Compare uma alternativa com uma linha de base equivalente e use cenário de sensibilidade para recurso, preço e disponibilidade. Não trate capacidade nominal como produção garantida. Documente a procedência e o ano dos fatores utilizados, sem converter estimativas educacionais em inventário verificado ou parecer de engenharia. Os exercícios são análises de dados e planejamento: comissionamento, intervenção elétrica e operação de instalações pertencem a profissionais habilitados segundo a jurisdição. Entregue memória de cálculo reproduzível, premissas, restrições e riscos residuais. A aplicação específica exige produzir cadastro de volume e referência e verificar a ligação com balanço equivalente de metano. Compare sua conclusão com a regra do caso: Reconhecer 1800 m³ equivalentes de metano em ambos os lotes e comparar impurezas separadamente. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma cooperativa brasileira registra 3000 m³ de biogás com 60% de metano e outra 2500 m³ com 72%, na mesma condição de referência. Resolução: Reconhecer 1800 m³ equivalentes de metano em ambos os lotes e comparar impurezas separadamente. Três mil vezes 0,60 e dois mil e quinhentos vezes 0,72 resultam em 1800. O empate no componente energético não demonstra equivalência operacional, pois tratamento e compatibilidade ainda precisam ser avaliados. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Escolher o maior volume bruto como maior conteúdo energético sem composição. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Um lote apresenta concentração de contaminante sem medição confirmatória. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.eia.gov/energyexplained/units-and-calculators/energy-conversion-calculators.php",
      "https://support.microsoft.com/en-us/excel/calculate-the-average-of-a-group-of-numbers"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-carregamento-de-frotas-municipais-eletricas",
    "title": "Planejamento de carregamento de frotas municipais elétricas",
    "track": "energy",
    "role": "Analista de planejamento energético",
    "positioning": "specialist",
    "scenario": "Uma frota colombiana precisa de 600 kWh em uma janela de seis horas e dispõe de capacidade agregada de 80 kW, sem perdas.",
    "decision": "Identificar necessidade média de 100 kW e déficit ideal de 120 kWh na janela.",
    "misconception": "Afirmar que a capacidade atende porque 80 kW supera a potência individual de cada carregador.",
    "changedConstraint": "A janela cai para cinco horas devido ao retorno tardio dos veículos.",
    "tasks": [
      "Mapa de veículos e energia requerida",
      "Calendário de conexão",
      "Balanço agregado de potência",
      "Fila de carregamento por prioridade",
      "Cenário de atraso de retorno",
      "Nota de limitações elétricas"
    ],
    "method": "Energia necessária dividida pelo tempo disponível indica potência média mínima em modelo ideal. Capacidade de conexão, simultaneidade, curvas de carga e perdas podem exigir potência superior ou maior janela. Construa o balanço energético antes de comparar equipamentos: potência representa capacidade instantânea e energia representa potência integrada no tempo. Converta unidades explicitamente e mantenha fronteira do sistema, período e eficiência na mesma linha do cálculo. Diferencie energia produzida, consumida, exportada e indisponível. Uma economia calculada com tarifa média pode divergir do efeito financeiro quando há ponta, demanda ou encargos; registre a simplificação. Compare uma alternativa com uma linha de base equivalente e use cenário de sensibilidade para recurso, preço e disponibilidade. Não trate capacidade nominal como produção garantida. Documente a procedência e o ano dos fatores utilizados, sem converter estimativas educacionais em inventário verificado ou parecer de engenharia. Os exercícios são análises de dados e planejamento: comissionamento, intervenção elétrica e operação de instalações pertencem a profissionais habilitados segundo a jurisdição. Entregue memória de cálculo reproduzível, premissas, restrições e riscos residuais. A aplicação específica exige produzir mapa de veículos e energia requerida e verificar a ligação com balanço agregado de potência. Compare sua conclusão com a regra do caso: Identificar necessidade média de 100 kW e déficit ideal de 120 kWh na janela. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma frota colombiana precisa de 600 kWh em uma janela de seis horas e dispõe de capacidade agregada de 80 kW, sem perdas. Resolução: Identificar necessidade média de 100 kW e déficit ideal de 120 kWh na janela. Oito dezenas de kW durante seis horas fornecem no máximo 480 kWh no modelo. Restam 120 kWh. Em cinco horas, o teto cai a 400 kWh e o déficit cresce para duzentos. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Afirmar que a capacidade atende porque 80 kW supera a potência individual de cada carregador. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A janela cai para cinco horas devido ao retorno tardio dos veículos. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.eia.gov/energyexplained/electricity/measuring-electricity.php",
      "https://developers.google.com/optimization/routing/cvrptw_resources"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-reconciliacao-de-consumo-em-sistemas-de-bombeamento",
    "title": "Reconciliação de consumo em sistemas de bombeamento",
    "track": "energy",
    "role": "Analista de planejamento energético",
    "positioning": "broad",
    "scenario": "Um sistema peruano consome 2400 kWh para bombear 1200 m³ e outro 2100 kWh para 700 m³, sem informação de altura manométrica.",
    "decision": "Calcular 2 e 3 kWh por m³ e evitar atribuir diferença à eficiência da bomba sem condições hidráulicas.",
    "misconception": "Declarar o segundo sistema melhor apenas pelo menor consumo total.",
    "changedConstraint": "A altura de elevação é informada como diferente entre as instalações.",
    "tasks": [
      "Tabela de consumo e volume",
      "Indicador específico energético",
      "Cadastro de condições hidráulicas",
      "Comparação de fronteiras",
      "Plano de medição operacional",
      "Relatório de hipóteses de eficiência"
    ],
    "method": "Intensidade energética é consumo dividido por saída útil, mas comparação técnica de bombeamento também depende de altura, perdas de carga e regime. O indicador específico descreve o serviço observado sem isolar causas. Construa o balanço energético antes de comparar equipamentos: potência representa capacidade instantânea e energia representa potência integrada no tempo. Converta unidades explicitamente e mantenha fronteira do sistema, período e eficiência na mesma linha do cálculo. Diferencie energia produzida, consumida, exportada e indisponível. Uma economia calculada com tarifa média pode divergir do efeito financeiro quando há ponta, demanda ou encargos; registre a simplificação. Compare uma alternativa com uma linha de base equivalente e use cenário de sensibilidade para recurso, preço e disponibilidade. Não trate capacidade nominal como produção garantida. Documente a procedência e o ano dos fatores utilizados, sem converter estimativas educacionais em inventário verificado ou parecer de engenharia. Os exercícios são análises de dados e planejamento: comissionamento, intervenção elétrica e operação de instalações pertencem a profissionais habilitados segundo a jurisdição. Entregue memória de cálculo reproduzível, premissas, restrições e riscos residuais. A aplicação específica exige produzir tabela de consumo e volume e verificar a ligação com cadastro de condições hidráulicas. Compare sua conclusão com a regra do caso: Calcular 2 e 3 kWh por m³ e evitar atribuir diferença à eficiência da bomba sem condições hidráulicas. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um sistema peruano consome 2400 kWh para bombear 1200 m³ e outro 2100 kWh para 700 m³, sem informação de altura manométrica. Resolução: Calcular 2 e 3 kWh por m³ e evitar atribuir diferença à eficiência da bomba sem condições hidráulicas. Dois mil e quatrocentos divididos por mil e duzentos são dois. Dois mil e cem por setecentos são três. O segundo consome menos no total e mais por volume, sem prova suficiente de pior bomba. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Declarar o segundo sistema melhor apenas pelo menor consumo total. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A altura de elevação é informada como diferente entre as instalações. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.eia.gov/energyexplained/electricity/measuring-electricity.php",
      "https://www.energy.gov/cmei/energy-efficiency-vs-energy-intensity"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-orcamento-energetico-de-camaras-frias-de-exportacao",
    "title": "Orçamento energético de câmaras frias de exportação",
    "track": "energy",
    "role": "Analista de planejamento energético",
    "positioning": "specialist",
    "scenario": "Uma câmara equatoriana opera 18 horas a potência média de 12 kW e seis horas a 4 kW.",
    "decision": "Estimar 240 kWh diários e manter separados regimes de operação e espera.",
    "misconception": "Multiplicar 12 kW por 24 horas ignorando o regime reduzido informado.",
    "changedConstraint": "A abertura de portas amplia o regime de 12 kW para vinte horas.",
    "tasks": [
      "Diagrama dos regimes diários",
      "Planilha de potência e duração",
      "Estimativa de energia total",
      "Indicador por tonelada armazenada",
      "Cenário de abertura de portas",
      "Plano de confronto com medidor"
    ],
    "method": "Calcule energia como soma de potência média de cada regime multiplicada pela duração correspondente. Um valor nominal de placa não representa necessariamente a potência média; a origem da medição deve estar indicada. Construa o balanço energético antes de comparar equipamentos: potência representa capacidade instantânea e energia representa potência integrada no tempo. Converta unidades explicitamente e mantenha fronteira do sistema, período e eficiência na mesma linha do cálculo. Diferencie energia produzida, consumida, exportada e indisponível. Uma economia calculada com tarifa média pode divergir do efeito financeiro quando há ponta, demanda ou encargos; registre a simplificação. Compare uma alternativa com uma linha de base equivalente e use cenário de sensibilidade para recurso, preço e disponibilidade. Não trate capacidade nominal como produção garantida. Documente a procedência e o ano dos fatores utilizados, sem converter estimativas educacionais em inventário verificado ou parecer de engenharia. Os exercícios são análises de dados e planejamento: comissionamento, intervenção elétrica e operação de instalações pertencem a profissionais habilitados segundo a jurisdição. Entregue memória de cálculo reproduzível, premissas, restrições e riscos residuais. A aplicação específica exige produzir diagrama dos regimes diários e verificar a ligação com estimativa de energia total. Compare sua conclusão com a regra do caso: Estimar 240 kWh diários e manter separados regimes de operação e espera. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma câmara equatoriana opera 18 horas a potência média de 12 kW e seis horas a 4 kW. Resolução: Estimar 240 kWh diários e manter separados regimes de operação e espera. Dezoito vezes doze equivalem a 216 kWh e seis vezes quatro a 24. A soma é 240. Com vinte horas no regime maior e quatro no menor, o total passa a 256 kWh. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Multiplicar 12 kW por 24 horas ignorando o regime reduzido informado. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A abertura de portas amplia o regime de 12 kW para vinte horas. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.eia.gov/energyexplained/electricity/measuring-electricity.php",
      "https://support.microsoft.com/en-us/excel/functions/sumproduct-function"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-manutencao-de-inversores-em-usinas-solares",
    "title": "Planejamento de manutenção de inversores em usinas solares",
    "track": "energy",
    "role": "Analista de planejamento energético",
    "positioning": "specialist",
    "scenario": "Uma planta paraguaia tem quatro inversores de mesma capacidade e manutenção de dois por duas horas em um período de oito horas.",
    "decision": "Estimar indisponibilidade nominal de 12,5% das inversor-horas e não inferir perda energética exata.",
    "misconception": "Divulgar perda de 50% da energia diária porque dois inversores foram mantidos.",
    "changedConstraint": "A manutenção é movida do meio-dia para baixa irradiância.",
    "tasks": [
      "Inventário de inversores",
      "Calendário de janelas",
      "Balanço de inversor-horas",
      "Mapa de irradiância por janela",
      "Estimativa condicionada de produção",
      "Registro de autorização técnica"
    ],
    "method": "Peso temporal e perfil do recurso precisam ser separados. A mesma duração de indisponibilidade pode ter efeitos energéticos diferentes conforme o horário. Planejamento documental deve orientar validação técnica, sem autorizar intervenção. Construa o balanço energético antes de comparar equipamentos: potência representa capacidade instantânea e energia representa potência integrada no tempo. Converta unidades explicitamente e mantenha fronteira do sistema, período e eficiência na mesma linha do cálculo. Diferencie energia produzida, consumida, exportada e indisponível. Uma economia calculada com tarifa média pode divergir do efeito financeiro quando há ponta, demanda ou encargos; registre a simplificação. Compare uma alternativa com uma linha de base equivalente e use cenário de sensibilidade para recurso, preço e disponibilidade. Não trate capacidade nominal como produção garantida. Documente a procedência e o ano dos fatores utilizados, sem converter estimativas educacionais em inventário verificado ou parecer de engenharia. Os exercícios são análises de dados e planejamento: comissionamento, intervenção elétrica e operação de instalações pertencem a profissionais habilitados segundo a jurisdição. Entregue memória de cálculo reproduzível, premissas, restrições e riscos residuais. A aplicação específica exige produzir inventário de inversores e verificar a ligação com balanço de inversor-horas. Compare sua conclusão com a regra do caso: Estimar indisponibilidade nominal de 12,5% das inversor-horas e não inferir perda energética exata. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma planta paraguaia tem quatro inversores de mesma capacidade e manutenção de dois por duas horas em um período de oito horas. Resolução: Estimar indisponibilidade nominal de 12,5% das inversor-horas e não inferir perda energética exata. O total é quatro vezes oito igual a 32 inversor-horas. A manutenção remove quatro, equivalendo a 12,5%. Esse percentual descreve capacidade-tempo, não necessariamente energia que seria produzida. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Divulgar perda de 50% da energia diária porque dois inversores foram mantidos. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A manutenção é movida do meio-dia para baixa irradiância. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://sam.nlr.gov/photovoltaic",
      "https://support.microsoft.com/en-us/excel/calculate-the-average-of-a-group-of-numbers"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-comparacao-de-contratos-de-eficiencia-por-linha-de-base",
    "title": "Comparação de contratos de eficiência por linha de base",
    "track": "energy",
    "role": "Analista de planejamento energético",
    "positioning": "specialist",
    "scenario": "Uma organização argentina reduz consumo de 100 para 85 unidades, mas o volume de produção cai de 1000 para 800 peças.",
    "decision": "Calcular intensidade de 0,10 para 0,10625 por peça e não atribuir redução total à eficiência.",
    "misconception": "Anunciar melhoria de 15% de eficiência com base apenas no consumo total.",
    "changedConstraint": "A mistura de produtos muda para itens com maior demanda de processamento.",
    "tasks": [
      "Planilha de linha de base",
      "Conciliação de volume produzido",
      "Indicador energético específico",
      "Modelo de ajuste por produção",
      "Registro de fatores externos",
      "Memorando de economia condicionada"
    ],
    "method": "Linhas de base precisam ser ajustadas às variáveis que explicam consumo. Redução absoluta pode refletir menor atividade. Um indicador por peça ajuda, mas pode continuar inadequado quando produtos exigem serviços energéticos diferentes. Construa o balanço energético antes de comparar equipamentos: potência representa capacidade instantânea e energia representa potência integrada no tempo. Converta unidades explicitamente e mantenha fronteira do sistema, período e eficiência na mesma linha do cálculo. Diferencie energia produzida, consumida, exportada e indisponível. Uma economia calculada com tarifa média pode divergir do efeito financeiro quando há ponta, demanda ou encargos; registre a simplificação. Compare uma alternativa com uma linha de base equivalente e use cenário de sensibilidade para recurso, preço e disponibilidade. Não trate capacidade nominal como produção garantida. Documente a procedência e o ano dos fatores utilizados, sem converter estimativas educacionais em inventário verificado ou parecer de engenharia. Os exercícios são análises de dados e planejamento: comissionamento, intervenção elétrica e operação de instalações pertencem a profissionais habilitados segundo a jurisdição. Entregue memória de cálculo reproduzível, premissas, restrições e riscos residuais. A aplicação específica exige produzir planilha de linha de base e verificar a ligação com indicador energético específico. Compare sua conclusão com a regra do caso: Calcular intensidade de 0,10 para 0,10625 por peça e não atribuir redução total à eficiência. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma organização argentina reduz consumo de 100 para 85 unidades, mas o volume de produção cai de 1000 para 800 peças. Resolução: Calcular intensidade de 0,10 para 0,10625 por peça e não atribuir redução total à eficiência. Cem divididos por mil são 0,10. Oitenta e cinco por oitocentos são 0,10625. A intensidade cresce 6,25%, apesar da redução absoluta de quinze unidades. Falta avaliar mistura e condições operacionais. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Anunciar melhoria de 15% de eficiência com base apenas no consumo total. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A mistura de produtos muda para itens com maior demanda de processamento. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.energystar.gov/sites/default/files/2024-09/ES_EPI_Guide_20240917.pdf",
      "https://www.energy.gov/cmei/energy-efficiency-vs-energy-intensity"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-transbordo-hidroviario-no-corredor-amazonico",
    "title": "Planejamento de transbordo hidroviário no corredor amazônico",
    "track": "logistics",
    "role": "Analista de cadeias logísticas regionais",
    "positioning": "broad",
    "scenario": "Uma operação peruana recebe 180 toneladas em três dias e possui saída fluvial de 50 toneladas por dia.",
    "decision": "Prever acúmulo de 30 toneladas e reservar armazenagem compatível antes de confirmar o fluxo.",
    "misconception": "Garantir ausência de fila com base na capacidade semanal média.",
    "changedConstraint": "Uma saída é cancelada por condição de navegação.",
    "tasks": [
      "Calendário de chegada de cargas",
      "Tabela de capacidade fluvial",
      "Simulação de estoque no terminal",
      "Plano de priorização de lotes",
      "Mapa de armazenagem temporária",
      "Protocolo documental de contingência"
    ],
    "method": "Transbordo exige sincronizar entradas e saídas por janela operacional. Estoque intermediário cresce quando chegada supera expedição, mesmo que a capacidade em outro período seja suficiente. Represente a cadeia logística como eventos com identificador, origem, destino, horário, quantidade e estado. Lead time total inclui espera, transporte, conferência e liberação; não some apenas deslocamento. Uma reserva de capacidade não equivale a autorização documental. Normalize peso, volume, moeda e fuso antes de conciliar registros. Em decisões de estoque, diferencie demanda média, variabilidade, cobertura e prazo de reposição; estoque disponível exclui unidades bloqueadas ou comprometidas. Compare alternativas pelo custo total e pela probabilidade de atendimento, sem inferir segurança a partir do menor preço. Em casos transfronteiriços, registre documentos e validações pendentes, usando exigências oficiais vigentes como consulta e sem prestar despacho ou aconselhamento jurídico. Para testar o fluxo, introduza um evento fora de ordem, um atraso e uma duplicata. Preserve a diferença entre data planejada e realizada. A entrega deve permitir localizar a causa de uma divergência e o responsável pela próxima decisão. A aplicação específica exige produzir calendário de chegada de cargas e verificar a ligação com simulação de estoque no terminal. Compare sua conclusão com a regra do caso: Prever acúmulo de 30 toneladas e reservar armazenagem compatível antes de confirmar o fluxo. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma operação peruana recebe 180 toneladas em três dias e possui saída fluvial de 50 toneladas por dia. Resolução: Prever acúmulo de 30 toneladas e reservar armazenagem compatível antes de confirmar o fluxo. Cento e oitenta menos três vezes cinquenta deixam trinta toneladas. Uma saída cancelada aumenta o acúmulo em outras cinquenta, antes de considerar novas chegadas. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Garantir ausência de fila com base na capacidade semanal média. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Uma saída é cancelada por condição de navegação. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://developers.google.com/optimization/routing/cvrptw_resources",
      "https://www.cepal.org/es/publicaciones/89985-informe-portuario-2024-2025-como-navegar-nueva-etapa-globalizacion"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-conciliacao-de-tara-em-transporte-de-concentrados-minerais",
    "title": "Conciliação de tara em transporte de concentrados minerais",
    "track": "logistics",
    "role": "Analista de cadeias logísticas regionais",
    "positioning": "specialist",
    "scenario": "Uma carga chilena tem peso bruto de 42 toneladas e tara registrada de 14; o documento comercial usa 30 toneladas líquidas.",
    "decision": "Registrar peso líquido calculado de 28 toneladas e investigar divergência de duas.",
    "misconception": "Aceitar 30 toneladas porque o documento comercial foi emitido primeiro.",
    "changedConstraint": "Uma segunda pesagem usa outra balança e apresenta resolução diferente.",
    "tasks": [
      "Cadastro de balanças e unidades",
      "Tabela de bruto tara e líquido",
      "Conciliação por veículo",
      "Registro de divergências de pesagem",
      "Fluxo de revisão documental",
      "Nota de impacto comercial"
    ],
    "method": "Peso líquido é bruto menos tara na mesma condição. Diferenças não devem ser apagadas por preferência documental; balança, horário e condição do veículo precisam permanecer rastreáveis. Represente a cadeia logística como eventos com identificador, origem, destino, horário, quantidade e estado. Lead time total inclui espera, transporte, conferência e liberação; não some apenas deslocamento. Uma reserva de capacidade não equivale a autorização documental. Normalize peso, volume, moeda e fuso antes de conciliar registros. Em decisões de estoque, diferencie demanda média, variabilidade, cobertura e prazo de reposição; estoque disponível exclui unidades bloqueadas ou comprometidas. Compare alternativas pelo custo total e pela probabilidade de atendimento, sem inferir segurança a partir do menor preço. Em casos transfronteiriços, registre documentos e validações pendentes, usando exigências oficiais vigentes como consulta e sem prestar despacho ou aconselhamento jurídico. Para testar o fluxo, introduza um evento fora de ordem, um atraso e uma duplicata. Preserve a diferença entre data planejada e realizada. A entrega deve permitir localizar a causa de uma divergência e o responsável pela próxima decisão. A aplicação específica exige produzir cadastro de balanças e unidades e verificar a ligação com conciliação por veículo. Compare sua conclusão com a regra do caso: Registrar peso líquido calculado de 28 toneladas e investigar divergência de duas. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma carga chilena tem peso bruto de 42 toneladas e tara registrada de 14; o documento comercial usa 30 toneladas líquidas. Resolução: Registrar peso líquido calculado de 28 toneladas e investigar divergência de duas. Quarenta e duas menos catorze são vinte e oito toneladas. O desvio é dois em relação ao documento comercial. Ainda não existe evidência para decidir qual registro originou o erro. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Aceitar 30 toneladas porque o documento comercial foi emitido primeiro. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Uma segunda pesagem usa outra balança e apresenta resolução diferente. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.nist.gov/publications/simple-guide-evaluating-and-expressing-uncertainty-nist-measurement-results",
      "https://www.nist.gov/publications/traceability-considerations-characterization-and-use-measuring-systems"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-gestao-de-conteineres-reefer-em-exportacao-de-frutas",
    "title": "Gestão de contêineres reefer em exportação de frutas",
    "track": "logistics",
    "role": "Analista de cadeias logísticas regionais",
    "positioning": "specialist",
    "scenario": "Um exportador equatoriano tem 48 contêineres para monitorar, mas somente 42 registros contínuos de temperatura.",
    "decision": "Separar os seis registros incompletos para avaliação e não declarar conformidade térmica integral.",
    "misconception": "Preencher as lacunas com a média dos outros contêineres.",
    "changedConstraint": "Dois dos registros completos usam fuso horário não documentado.",
    "tasks": [
      "Inventário de contêineres e sensores",
      "Matriz de completude térmica",
      "Normalização de fuso documental",
      "Fila de desvios a avaliar",
      "Vinculação de lote ao embarque",
      "Plano de recuperação de evidências"
    ],
    "method": "Completude é condição de rastreabilidade, não prova isolada de conservação. Cada série pertence ao contêiner e ao lote específico. Uma média de outra unidade não substitui informação ausente. Represente a cadeia logística como eventos com identificador, origem, destino, horário, quantidade e estado. Lead time total inclui espera, transporte, conferência e liberação; não some apenas deslocamento. Uma reserva de capacidade não equivale a autorização documental. Normalize peso, volume, moeda e fuso antes de conciliar registros. Em decisões de estoque, diferencie demanda média, variabilidade, cobertura e prazo de reposição; estoque disponível exclui unidades bloqueadas ou comprometidas. Compare alternativas pelo custo total e pela probabilidade de atendimento, sem inferir segurança a partir do menor preço. Em casos transfronteiriços, registre documentos e validações pendentes, usando exigências oficiais vigentes como consulta e sem prestar despacho ou aconselhamento jurídico. Para testar o fluxo, introduza um evento fora de ordem, um atraso e uma duplicata. Preserve a diferença entre data planejada e realizada. A entrega deve permitir localizar a causa de uma divergência e o responsável pela próxima decisão. A aplicação específica exige produzir inventário de contêineres e sensores e verificar a ligação com normalização de fuso documental. Compare sua conclusão com a regra do caso: Separar os seis registros incompletos para avaliação e não declarar conformidade térmica integral. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um exportador equatoriano tem 48 contêineres para monitorar, mas somente 42 registros contínuos de temperatura. Resolução: Separar os seis registros incompletos para avaliação e não declarar conformidade térmica integral. Quarenta e dois divididos por quarenta e oito são 87,5% de séries completas. Isso não informa a percentagem de produto conforme, pois é necessário examinar os valores e critérios aplicáveis. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Preencher as lacunas com a média dos outros contêineres. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Dois dos registros completos usam fuso horário não documentado. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.fao.org/good-hygiene-practices-haccp-toolbox/ghp/control-of-operation/",
      "https://www150.statcan.gc.ca/n1/pub/12-539-x/steps-etapes/4058331-eng.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-rotas-urbanas-com-janelas-de-recebimento",
    "title": "Planejamento de rotas urbanas com janelas de recebimento",
    "track": "logistics",
    "role": "Analista de cadeias logísticas regionais",
    "positioning": "specialist",
    "scenario": "Uma distribuidora colombiana programa dez entregas de 20 minutos com 90 minutos de deslocamento total em uma janela de quatro horas.",
    "decision": "Identificar 290 minutos requeridos e excesso de cinquenta minutos, antes de considerar pausas.",
    "misconception": "Confirmar o roteiro porque há menos de dez clientes.",
    "changedConstraint": "Três clientes reduzem a janela disponível em meia hora.",
    "tasks": [
      "Cadastro de janelas por cliente",
      "Matriz de tempos de viagem",
      "Cronograma de descarga",
      "Teste de viabilidade por rota",
      "Plano de divisão entre veículos",
      "Mensagem de renegociação de horário"
    ],
    "method": "Viabilidade temporal soma atendimento e deslocamento na sequência planejada. Quantidade de paradas sozinha não determina duração. A janela precisa ser atendida individualmente e não apenas no total. Represente a cadeia logística como eventos com identificador, origem, destino, horário, quantidade e estado. Lead time total inclui espera, transporte, conferência e liberação; não some apenas deslocamento. Uma reserva de capacidade não equivale a autorização documental. Normalize peso, volume, moeda e fuso antes de conciliar registros. Em decisões de estoque, diferencie demanda média, variabilidade, cobertura e prazo de reposição; estoque disponível exclui unidades bloqueadas ou comprometidas. Compare alternativas pelo custo total e pela probabilidade de atendimento, sem inferir segurança a partir do menor preço. Em casos transfronteiriços, registre documentos e validações pendentes, usando exigências oficiais vigentes como consulta e sem prestar despacho ou aconselhamento jurídico. Para testar o fluxo, introduza um evento fora de ordem, um atraso e uma duplicata. Preserve a diferença entre data planejada e realizada. A entrega deve permitir localizar a causa de uma divergência e o responsável pela próxima decisão. A aplicação específica exige produzir cadastro de janelas por cliente e verificar a ligação com cronograma de descarga. Compare sua conclusão com a regra do caso: Identificar 290 minutos requeridos e excesso de cinquenta minutos, antes de considerar pausas. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma distribuidora colombiana programa dez entregas de 20 minutos com 90 minutos de deslocamento total em uma janela de quatro horas. Resolução: Identificar 290 minutos requeridos e excesso de cinquenta minutos, antes de considerar pausas. Dez vezes vinte são duzentos minutos. Somados aos noventa de viagem produzem 290. A janela oferece 240; redistribuir ou renegociar é necessário antes da promessa. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Confirmar o roteiro porque há menos de dez clientes. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Três clientes reduzem a janela disponível em meia hora. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://developers.google.com/optimization/routing/vrptw",
      "https://developers.google.com/optimization/routing/cvrptw_resources"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-controle-de-estoque-comprometido-em-distribuicao-hospitalar",
    "title": "Controle de estoque comprometido em distribuição hospitalar",
    "track": "logistics",
    "role": "Analista de cadeias logísticas regionais",
    "positioning": "broad",
    "scenario": "Um armazém brasileiro tem 900 unidades físicas, 250 reservadas e cem bloqueadas, sem sobreposição entre estados.",
    "decision": "Apresentar disponibilidade para novas promessas de 550 unidades.",
    "misconception": "Prometer as novecentas unidades para uma nova demanda.",
    "changedConstraint": "Parte da reserva é cancelada e precisa de liberação registrada.",
    "tasks": [
      "Dicionário de estados de estoque",
      "Conciliação de saldo físico",
      "Mapa de reservas por pedido",
      "Registro de bloqueios e liberações",
      "Cálculo de disponível para promessa",
      "Teste de pedido concorrente"
    ],
    "method": "Estoque físico, reservado e bloqueado representam estados distintos. O sistema deve impedir dupla promessa e conservar a autorização que muda uma unidade de bloqueada para disponível. Represente a cadeia logística como eventos com identificador, origem, destino, horário, quantidade e estado. Lead time total inclui espera, transporte, conferência e liberação; não some apenas deslocamento. Uma reserva de capacidade não equivale a autorização documental. Normalize peso, volume, moeda e fuso antes de conciliar registros. Em decisões de estoque, diferencie demanda média, variabilidade, cobertura e prazo de reposição; estoque disponível exclui unidades bloqueadas ou comprometidas. Compare alternativas pelo custo total e pela probabilidade de atendimento, sem inferir segurança a partir do menor preço. Em casos transfronteiriços, registre documentos e validações pendentes, usando exigências oficiais vigentes como consulta e sem prestar despacho ou aconselhamento jurídico. Para testar o fluxo, introduza um evento fora de ordem, um atraso e uma duplicata. Preserve a diferença entre data planejada e realizada. A entrega deve permitir localizar a causa de uma divergência e o responsável pela próxima decisão. A aplicação específica exige produzir dicionário de estados de estoque e verificar a ligação com mapa de reservas por pedido. Compare sua conclusão com a regra do caso: Apresentar disponibilidade para novas promessas de 550 unidades. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um armazém brasileiro tem 900 unidades físicas, 250 reservadas e cem bloqueadas, sem sobreposição entre estados. Resolução: Apresentar disponibilidade para novas promessas de 550 unidades. Novecentas menos duzentas e cinquenta menos cem são 550 unidades. Cancelar uma reserva pode elevar o disponível somente depois de confirmar que não existe outro compromisso sobre aquelas unidades. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Prometer as novecentas unidades para uma nova demanda. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Parte da reserva é cancelada e precisa de liberação registrada. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/inventory/shipping_receiving/reservation_methods.html",
      "https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/inventory/shipping_receiving/reservation_methods/at_confirmation.html"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-calculo-de-ocupacao-cubica-em-exportacao-de-moveis",
    "title": "Cálculo de ocupação cúbica em exportação de móveis",
    "track": "logistics",
    "role": "Analista de cadeias logísticas regionais",
    "positioning": "specialist",
    "scenario": "Um carregamento paraguaio usa caixas de 0,8 m³ e dispõe de 56 m³ de espaço útil, sem restrição adicional no modelo.",
    "decision": "Estimar setenta caixas como teto volumétrico ideal e verificar peso e arranjo antes de confirmar carga.",
    "misconception": "Tratar setenta caixas como capacidade operacional garantida.",
    "changedConstraint": "O comprador exige posição vertical que reduz aproveitamento geométrico.",
    "tasks": [
      "Cadastro dimensional das embalagens",
      "Memória de cubagem",
      "Plano de arranjo preliminar",
      "Conferência de peso e volume",
      "Lista de restrições de manuseio",
      "Cenário de aproveitamento reduzido"
    ],
    "method": "Cubagem é um limite agregado, mas não demonstra que as dimensões se acomodam fisicamente. Orientação, empilhamento, espaço de circulação e peso podem reduzir a capacidade efetiva. Represente a cadeia logística como eventos com identificador, origem, destino, horário, quantidade e estado. Lead time total inclui espera, transporte, conferência e liberação; não some apenas deslocamento. Uma reserva de capacidade não equivale a autorização documental. Normalize peso, volume, moeda e fuso antes de conciliar registros. Em decisões de estoque, diferencie demanda média, variabilidade, cobertura e prazo de reposição; estoque disponível exclui unidades bloqueadas ou comprometidas. Compare alternativas pelo custo total e pela probabilidade de atendimento, sem inferir segurança a partir do menor preço. Em casos transfronteiriços, registre documentos e validações pendentes, usando exigências oficiais vigentes como consulta e sem prestar despacho ou aconselhamento jurídico. Para testar o fluxo, introduza um evento fora de ordem, um atraso e uma duplicata. Preserve a diferença entre data planejada e realizada. A entrega deve permitir localizar a causa de uma divergência e o responsável pela próxima decisão. A aplicação específica exige produzir cadastro dimensional das embalagens e verificar a ligação com plano de arranjo preliminar. Compare sua conclusão com a regra do caso: Estimar setenta caixas como teto volumétrico ideal e verificar peso e arranjo antes de confirmar carga. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um carregamento paraguaio usa caixas de 0,8 m³ e dispõe de 56 m³ de espaço útil, sem restrição adicional no modelo. Resolução: Estimar setenta caixas como teto volumétrico ideal e verificar peso e arranjo antes de confirmar carga. Cinquenta e seis divididos por 0,8 são setenta. O cálculo oferece um teto no modelo simplificado, e não uma prova de que setenta volumes cabem na geometria real. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Tratar setenta caixas como capacidade operacional garantida. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O comprador exige posição vertical que reduz aproveitamento geométrico. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://developers.google.com/optimization/pack/bin_packing",
      "https://developers.google.com/optimization/pack"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-reconciliacao-de-transito-aduaneiro-por-marcos-documentais",
    "title": "Reconciliação de trânsito aduaneiro por marcos documentais",
    "track": "logistics",
    "role": "Analista de cadeias logísticas regionais",
    "positioning": "specialist",
    "scenario": "Uma carga entre Argentina e Uruguai tem confirmação de chegada ao terminal, mas não possui registro de liberação documental.",
    "decision": "Manter o estado como chegada sem liberação confirmada e escalar a evidência pendente.",
    "misconception": "Marcar entregue porque o veículo chegou ao terminal.",
    "changedConstraint": "O cliente pede retirada antes de a autoridade concluir a verificação.",
    "tasks": [
      "Mapa de marcos do trânsito",
      "Inventário de documentos exigidos",
      "Linha temporal de eventos",
      "Regra de mudança de estado",
      "Lista de responsáveis por confirmação",
      "Protocolo de comunicação de pendência"
    ],
    "method": "Estados logísticos devem corresponder ao evento comprovado. Chegada física, liberação e entrega são transições distintas e podem depender de agentes diferentes. Não fabrique autorização a partir da presença da carga. Represente a cadeia logística como eventos com identificador, origem, destino, horário, quantidade e estado. Lead time total inclui espera, transporte, conferência e liberação; não some apenas deslocamento. Uma reserva de capacidade não equivale a autorização documental. Normalize peso, volume, moeda e fuso antes de conciliar registros. Em decisões de estoque, diferencie demanda média, variabilidade, cobertura e prazo de reposição; estoque disponível exclui unidades bloqueadas ou comprometidas. Compare alternativas pelo custo total e pela probabilidade de atendimento, sem inferir segurança a partir do menor preço. Em casos transfronteiriços, registre documentos e validações pendentes, usando exigências oficiais vigentes como consulta e sem prestar despacho ou aconselhamento jurídico. Para testar o fluxo, introduza um evento fora de ordem, um atraso e uma duplicata. Preserve a diferença entre data planejada e realizada. A entrega deve permitir localizar a causa de uma divergência e o responsável pela próxima decisão. A aplicação específica exige produzir mapa de marcos do trânsito e verificar a ligação com linha temporal de eventos. Compare sua conclusão com a regra do caso: Manter o estado como chegada sem liberação confirmada e escalar a evidência pendente. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma carga entre Argentina e Uruguai tem confirmação de chegada ao terminal, mas não possui registro de liberação documental. Resolução: Manter o estado como chegada sem liberação confirmada e escalar a evidência pendente. O único fato é a chegada. A próxima transição requer evidência específica. Uma atualização clara evita que o cliente interprete localização como permissão de retirada. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Marcar entregue porque o veículo chegou ao terminal. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O cliente pede retirada antes de a autoridade concluir a verificação. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.cepal.org/es/publicaciones/83137-desarrollo-clusteres-logisticos-america-latina",
      "https://www.cepal.org/es/publicaciones/89985-informe-portuario-2024-2025-como-navegar-nueva-etapa-globalizacion"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-abastecimento-em-localidades-andinas",
    "title": "Planejamento de abastecimento em localidades andinas",
    "track": "logistics",
    "role": "Analista de cadeias logísticas regionais",
    "positioning": "specialist",
    "scenario": "Uma localidade boliviana consome 70 unidades por dia e tem reposição de dez dias, com estoque utilizável de 630.",
    "decision": "Reconhecer cobertura de nove dias e déficit de um dia diante do prazo informado.",
    "misconception": "Considerar o estoque suficiente porque supera o consumo semanal.",
    "changedConstraint": "Uma interrupção viária amplia o prazo para doze dias.",
    "tasks": [
      "Série de demanda diária",
      "Cadastro do prazo de reposição",
      "Cálculo de cobertura disponível",
      "Plano de pedido por janela",
      "Cenário de interrupção viária",
      "Memorando de prioridade de abastecimento"
    ],
    "method": "Cobertura divide estoque utilizável pela taxa de consumo compatível. O prazo de reposição precisa ser confrontado com essa cobertura, considerando variabilidade e restrições de acesso. Represente a cadeia logística como eventos com identificador, origem, destino, horário, quantidade e estado. Lead time total inclui espera, transporte, conferência e liberação; não some apenas deslocamento. Uma reserva de capacidade não equivale a autorização documental. Normalize peso, volume, moeda e fuso antes de conciliar registros. Em decisões de estoque, diferencie demanda média, variabilidade, cobertura e prazo de reposição; estoque disponível exclui unidades bloqueadas ou comprometidas. Compare alternativas pelo custo total e pela probabilidade de atendimento, sem inferir segurança a partir do menor preço. Em casos transfronteiriços, registre documentos e validações pendentes, usando exigências oficiais vigentes como consulta e sem prestar despacho ou aconselhamento jurídico. Para testar o fluxo, introduza um evento fora de ordem, um atraso e uma duplicata. Preserve a diferença entre data planejada e realizada. A entrega deve permitir localizar a causa de uma divergência e o responsável pela próxima decisão. A aplicação específica exige produzir série de demanda diária e verificar a ligação com cálculo de cobertura disponível. Compare sua conclusão com a regra do caso: Reconhecer cobertura de nove dias e déficit de um dia diante do prazo informado. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma localidade boliviana consome 70 unidades por dia e tem reposição de dez dias, com estoque utilizável de 630. Resolução: Reconhecer cobertura de nove dias e déficit de um dia diante do prazo informado. Seiscentos e trinta divididos por setenta são nove dias. O prazo de dez dias deixa um dia descoberto; com doze, a lacuna passa a três dias no mesmo ritmo de demanda. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Considerar o estoque suficiente porque supera o consumo semanal. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Uma interrupção viária amplia o prazo para doze dias. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/inventory/shipping_receiving/reservation_methods.html",
      "https://developers.google.com/optimization/routing/cvrptw_resources"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-gestao-de-devolucoes-em-marketplaces-regionais",
    "title": "Gestão de devoluções em marketplaces regionais",
    "track": "logistics",
    "role": "Analista de cadeias logísticas regionais",
    "positioning": "broad",
    "scenario": "Uma operação peruana recebe 240 devoluções: 90 aptas à revenda, 60 pendentes de inspeção e noventa sem possibilidade de revenda.",
    "decision": "Liberar somente as noventa aptas e manter sessenta pendentes em estado separado.",
    "misconception": "Adicionar as pendentes ao estoque disponível para reduzir a ruptura.",
    "changedConstraint": "Vinte unidades aprovadas têm embalagem inadequada para o canal original.",
    "tasks": [
      "Taxonomia de motivos de devolução",
      "Fila de inspeção por unidade",
      "Matriz de destino comercial",
      "Conciliação de estoque recuperado",
      "Indicador de recuperação por coorte",
      "Plano de alteração de embalagem"
    ],
    "method": "Recebimento de devolução não cria disponibilidade comercial automaticamente. Registre condição, inspeção e destino de cada unidade. A taxa de recuperação deve usar coortes fechadas ou declarar pendências. Represente a cadeia logística como eventos com identificador, origem, destino, horário, quantidade e estado. Lead time total inclui espera, transporte, conferência e liberação; não some apenas deslocamento. Uma reserva de capacidade não equivale a autorização documental. Normalize peso, volume, moeda e fuso antes de conciliar registros. Em decisões de estoque, diferencie demanda média, variabilidade, cobertura e prazo de reposição; estoque disponível exclui unidades bloqueadas ou comprometidas. Compare alternativas pelo custo total e pela probabilidade de atendimento, sem inferir segurança a partir do menor preço. Em casos transfronteiriços, registre documentos e validações pendentes, usando exigências oficiais vigentes como consulta e sem prestar despacho ou aconselhamento jurídico. Para testar o fluxo, introduza um evento fora de ordem, um atraso e uma duplicata. Preserve a diferença entre data planejada e realizada. A entrega deve permitir localizar a causa de uma divergência e o responsável pela próxima decisão. A aplicação específica exige produzir taxonomia de motivos de devolução e verificar a ligação com matriz de destino comercial. Compare sua conclusão com a regra do caso: Liberar somente as noventa aptas e manter sessenta pendentes em estado separado. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma operação peruana recebe 240 devoluções: 90 aptas à revenda, 60 pendentes de inspeção e noventa sem possibilidade de revenda. Resolução: Liberar somente as noventa aptas e manter sessenta pendentes em estado separado. Noventa de 240 equivalem a 37,5% já aprovadas. Sessenta ainda não podem ser classificadas como recuperação ou perda definitiva. O resultado muda quando a inspeção termina. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Adicionar as pendentes ao estoque disponível para reduzir a ruptura. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Vinte unidades aprovadas têm embalagem inadequada para o canal original. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.odoo.com/documentation/19.0/applications/websites/ecommerce/order_handling.html",
      "https://www.odoo.com/documentation/18.0/applications/inventory_and_mrp/inventory/shipping_receiving/reservation_methods.html"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-patio-para-exportacao-de-veiculos",
    "title": "Planejamento de pátio para exportação de veículos",
    "track": "logistics",
    "role": "Analista de cadeias logísticas regionais",
    "positioning": "specialist",
    "scenario": "Um terminal argentino recebe 320 veículos e dispõe de 280 vagas utilizáveis, enquanto quarenta partidas não têm confirmação.",
    "decision": "Prever necessidade de quarenta vagas adicionais ou reprogramar a entrada sem contar partidas incertas.",
    "misconception": "Usar partidas não confirmadas para declarar espaço disponível.",
    "changedConstraint": "Uma área de vinte vagas é interditada documentalmente.",
    "tasks": [
      "Mapa de vagas e restrições",
      "Cronograma de entrada de veículos",
      "Cadastro de partidas confirmadas",
      "Simulação de ocupação máxima",
      "Plano de reprogramação de chegada",
      "Registro de decisão de contingência"
    ],
    "method": "Capacidade disponível precisa excluir vagas indisponíveis e saídas ainda não comprovadas. Simule o estoque máximo por evento de chegada e partida, não apenas a diferença entre totais diários. Represente a cadeia logística como eventos com identificador, origem, destino, horário, quantidade e estado. Lead time total inclui espera, transporte, conferência e liberação; não some apenas deslocamento. Uma reserva de capacidade não equivale a autorização documental. Normalize peso, volume, moeda e fuso antes de conciliar registros. Em decisões de estoque, diferencie demanda média, variabilidade, cobertura e prazo de reposição; estoque disponível exclui unidades bloqueadas ou comprometidas. Compare alternativas pelo custo total e pela probabilidade de atendimento, sem inferir segurança a partir do menor preço. Em casos transfronteiriços, registre documentos e validações pendentes, usando exigências oficiais vigentes como consulta e sem prestar despacho ou aconselhamento jurídico. Para testar o fluxo, introduza um evento fora de ordem, um atraso e uma duplicata. Preserve a diferença entre data planejada e realizada. A entrega deve permitir localizar a causa de uma divergência e o responsável pela próxima decisão. A aplicação específica exige produzir mapa de vagas e restrições e verificar a ligação com cadastro de partidas confirmadas. Compare sua conclusão com a regra do caso: Prever necessidade de quarenta vagas adicionais ou reprogramar a entrada sem contar partidas incertas. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um terminal argentino recebe 320 veículos e dispõe de 280 vagas utilizáveis, enquanto quarenta partidas não têm confirmação. Resolução: Prever necessidade de quarenta vagas adicionais ou reprogramar a entrada sem contar partidas incertas. Trezentos e vinte menos duzentos e oitenta produzem excesso de quarenta. Com vinte vagas interditadas, o excesso sobe a sessenta caso as partidas continuem sem confirmação. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Usar partidas não confirmadas para declarar espaço disponível. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Uma área de vinte vagas é interditada documentalmente. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://developers.google.com/optimization/pack/bin_packing",
      "https://developers.google.com/optimization/routing/cvrptw_resources"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-deteccao-de-duplicidade-em-cadastros-de-exportadores",
    "title": "Detecção de duplicidade em cadastros de exportadores",
    "track": "data",
    "role": "Analista de dados e interoperabilidade",
    "positioning": "specialist",
    "scenario": "Uma base uruguaia contém 120 empresas, mas doze aparecem duas vezes por mudança de endereço.",
    "decision": "Produzir 108 entidades únicas e preservar o histórico dos endereços em tabela relacionada.",
    "misconception": "Excluir as linhas antigas sem conservar a relação com transações históricas.",
    "changedConstraint": "Duas empresas distintas compartilham nome comercial.",
    "tasks": [
      "Dicionário de entidade e endereço",
      "Chave de identificação estável",
      "Regra de deduplicação assistida",
      "Tabela de histórico de alterações",
      "Conciliação de contagens",
      "Fila de pares ambíguos"
    ],
    "method": "Deduplicação resolve identidade e não apenas igualdade textual. Separe atributo mutável de identificador persistente; nome compartilhado não prova que dois registros pertencem à mesma entidade. Defina a granularidade de cada tabela antes de combinar dados: uma linha pode representar pessoa, pedido, evento ou período. Escolha uma chave e teste unicidade e preenchimento. Junções entre tabelas com múltiplas linhas por chave podem multiplicar valores; agregue na granularidade correta antes da comparação. Registre moeda, fuso, escala e convenção de ausência no dicionário de dados. Um zero observado é diferente de um valor não coletado. Separe treinamento, validação e teste quando houver previsão e respeite a ordem temporal para impedir vazamento. Avalie erro por segmento e não apenas pela média global. Uma conclusão descritiva não demonstra causalidade. Conserve uma tabela de reconciliação com contagem inicial, exclusões justificadas e contagem final. Em dados pessoais, use registros sintéticos ou anonimizados e limite atributos ao necessário. Entregue consulta ou pseudocódigo executável, resultado esperado, casos de fronteira e limitações da interpretação. A aplicação específica exige produzir dicionário de entidade e endereço e verificar a ligação com regra de deduplicação assistida. Compare sua conclusão com a regra do caso: Produzir 108 entidades únicas e preservar o histórico dos endereços em tabela relacionada. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma base uruguaia contém 120 empresas, mas doze aparecem duas vezes por mudança de endereço. Resolução: Produzir 108 entidades únicas e preservar o histórico dos endereços em tabela relacionada. Cento e vinte menos doze repetições extras deixam 108 entidades. Preservar endereços em histórico permite interpretar contratos emitidos antes da mudança sem reintroduzir duplicatas. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Excluir as linhas antigas sem conservar a relação com transações históricas. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Duas empresas distintas compartilham nome comercial. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.postgresql.org/docs/18/tutorial-join.html",
      "https://www150.statcan.gc.ca/n1/pub/12-539-x/steps-etapes/4058331-eng.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-analise-de-precos-regionais-com-conversao-de-unidades",
    "title": "Análise de preços regionais com conversão de unidades",
    "track": "data",
    "role": "Analista de dados e interoperabilidade",
    "positioning": "specialist",
    "scenario": "Uma feira colombiana informa arroz a 4200 unidades monetárias por kg e outra 2400 por pacote de 500 g.",
    "decision": "Converter o segundo preço para 4800 por kg antes da comparação.",
    "misconception": "Comparar 2400 com 4200 e declarar a segunda feira mais barata.",
    "changedConstraint": "O primeiro preço inclui entrega e o segundo não.",
    "tasks": [
      "Cadastro de produto e embalagem",
      "Tabela de conversão de massa",
      "Série de preço por unidade padrão",
      "Mapa de componentes incluídos",
      "Comparação ajustada por escopo",
      "Registro de qualidade de coleta"
    ],
    "method": "Comparações de preço exigem unidade, qualidade, período e escopo equivalentes. Uma embalagem menor pode ter preço nominal inferior e custo unitário maior. Defina a granularidade de cada tabela antes de combinar dados: uma linha pode representar pessoa, pedido, evento ou período. Escolha uma chave e teste unicidade e preenchimento. Junções entre tabelas com múltiplas linhas por chave podem multiplicar valores; agregue na granularidade correta antes da comparação. Registre moeda, fuso, escala e convenção de ausência no dicionário de dados. Um zero observado é diferente de um valor não coletado. Separe treinamento, validação e teste quando houver previsão e respeite a ordem temporal para impedir vazamento. Avalie erro por segmento e não apenas pela média global. Uma conclusão descritiva não demonstra causalidade. Conserve uma tabela de reconciliação com contagem inicial, exclusões justificadas e contagem final. Em dados pessoais, use registros sintéticos ou anonimizados e limite atributos ao necessário. Entregue consulta ou pseudocódigo executável, resultado esperado, casos de fronteira e limitações da interpretação. A aplicação específica exige produzir cadastro de produto e embalagem e verificar a ligação com série de preço por unidade padrão. Compare sua conclusão com a regra do caso: Converter o segundo preço para 4800 por kg antes da comparação. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma feira colombiana informa arroz a 4200 unidades monetárias por kg e outra 2400 por pacote de 500 g. Resolução: Converter o segundo preço para 4800 por kg antes da comparação. O pacote de meio quilo custa 2400; dois pacotes equivalem a um quilo por 4800. A diferença unitária é seiscentos, mas entrega e qualidade ainda precisam ser alinhadas. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Comparar 2400 com 4200 e declarar a segunda feira mais barata. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O primeiro preço inclui entrega e o segundo não. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://support.microsoft.com/en-us/excel/calculate-the-average-of-a-group-of-numbers",
      "https://www150.statcan.gc.ca/n1/pub/12-539-x/steps-etapes/4058331-eng.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-analise-de-evasao-em-formacao-profissional",
    "title": "Análise de evasão em formação profissional",
    "track": "data",
    "role": "Analista de dados e interoperabilidade",
    "positioning": "broad",
    "scenario": "Uma turma brasileira inicia com 200 alunos; trinta transferem de turma e vinte abandonam o programa.",
    "decision": "Separar transferência de abandono e calcular abandono observado de 10% da coorte inicial.",
    "misconception": "Somar transferências e abandonos para divulgar evasão definitiva de 25%.",
    "changedConstraint": "Cinco transferidos deixam a instituição no mês seguinte.",
    "tasks": [
      "Dicionário de estados de matrícula",
      "Coorte inicial identificada",
      "Linha temporal de transferências",
      "Indicador de abandono por período",
      "Conciliação institucional de alunos",
      "Nota de acompanhamento longitudinal"
    ],
    "method": "Indicadores educacionais dependem da unidade de análise: turma, curso ou instituição. Transferência pode ser saída de uma turma sem saída do programa. Preserve estados e datas para evitar confusão. Defina a granularidade de cada tabela antes de combinar dados: uma linha pode representar pessoa, pedido, evento ou período. Escolha uma chave e teste unicidade e preenchimento. Junções entre tabelas com múltiplas linhas por chave podem multiplicar valores; agregue na granularidade correta antes da comparação. Registre moeda, fuso, escala e convenção de ausência no dicionário de dados. Um zero observado é diferente de um valor não coletado. Separe treinamento, validação e teste quando houver previsão e respeite a ordem temporal para impedir vazamento. Avalie erro por segmento e não apenas pela média global. Uma conclusão descritiva não demonstra causalidade. Conserve uma tabela de reconciliação com contagem inicial, exclusões justificadas e contagem final. Em dados pessoais, use registros sintéticos ou anonimizados e limite atributos ao necessário. Entregue consulta ou pseudocódigo executável, resultado esperado, casos de fronteira e limitações da interpretação. A aplicação específica exige produzir dicionário de estados de matrícula e verificar a ligação com linha temporal de transferências. Compare sua conclusão com a regra do caso: Separar transferência de abandono e calcular abandono observado de 10% da coorte inicial. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma turma brasileira inicia com 200 alunos; trinta transferem de turma e vinte abandonam o programa. Resolução: Separar transferência de abandono e calcular abandono observado de 10% da coorte inicial. Vinte abandonos divididos por duzentos alunos são 10%. As trinta transferências não entram como abandono definitivo enquanto os alunos mantiverem vínculo com o programa. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Somar transferências e abandonos para divulgar evasão definitiva de 25%. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Cinco transferidos deixam a instituição no mês seguinte. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.gov.uk/service-manual/measuring-success/measuring-completion-rate",
      "https://www150.statcan.gc.ca/n1/pub/12-539-x/steps-etapes/4058331-eng.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-paineis-de-atendimento-publico-com-tempos-censurados",
    "title": "Painéis de atendimento público com tempos censurados",
    "track": "data",
    "role": "Analista de dados e interoperabilidade",
    "positioning": "specialist",
    "scenario": "Um serviço peruano possui oitenta solicitações concluídas em cinco dias e vinte ainda abertas há dez dias.",
    "decision": "Mostrar tempos das concluídas e idade das abertas separadamente, sem divulgar cinco dias como prazo de todas.",
    "misconception": "Ignorar os casos abertos ao avaliar desempenho global.",
    "changedConstraint": "As solicitações abertas concentram um único tipo de serviço.",
    "tasks": [
      "Tabela de abertura e encerramento",
      "Regra de censura temporal",
      "Indicador de idade do estoque",
      "Distribuição de prazo concluído",
      "Segmentação por tipo de serviço",
      "Nota de limite do tempo médio"
    ],
    "method": "Casos ainda abertos não possuem tempo final observado. Excluí-los silenciosamente cria viés quando os casos difíceis permanecem em estoque. Relate fluxo concluído e pendência de forma complementar. Defina a granularidade de cada tabela antes de combinar dados: uma linha pode representar pessoa, pedido, evento ou período. Escolha uma chave e teste unicidade e preenchimento. Junções entre tabelas com múltiplas linhas por chave podem multiplicar valores; agregue na granularidade correta antes da comparação. Registre moeda, fuso, escala e convenção de ausência no dicionário de dados. Um zero observado é diferente de um valor não coletado. Separe treinamento, validação e teste quando houver previsão e respeite a ordem temporal para impedir vazamento. Avalie erro por segmento e não apenas pela média global. Uma conclusão descritiva não demonstra causalidade. Conserve uma tabela de reconciliação com contagem inicial, exclusões justificadas e contagem final. Em dados pessoais, use registros sintéticos ou anonimizados e limite atributos ao necessário. Entregue consulta ou pseudocódigo executável, resultado esperado, casos de fronteira e limitações da interpretação. A aplicação específica exige produzir tabela de abertura e encerramento e verificar a ligação com indicador de idade do estoque. Compare sua conclusão com a regra do caso: Mostrar tempos das concluídas e idade das abertas separadamente, sem divulgar cinco dias como prazo de todas. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um serviço peruano possui oitenta solicitações concluídas em cinco dias e vinte ainda abertas há dez dias. Resolução: Mostrar tempos das concluídas e idade das abertas separadamente, sem divulgar cinco dias como prazo de todas. A média de cinco dias descreve apenas oitenta conclusões. Vinte casos já aguardam dez dias; portanto o retrato global precisa informar o estoque envelhecido e sua composição. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Ignorar os casos abertos ao avaliar desempenho global. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: As solicitações abertas concentram um único tipo de serviço. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.gov.uk/service-manual/measuring-success/measuring-completion-rate",
      "https://www150.statcan.gc.ca/n1/pub/12-539-x/steps-etapes/4058331-eng.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-conciliacao-de-indicadores-de-vendas-em-moedas-locais",
    "title": "Conciliação de indicadores de vendas em moedas locais",
    "track": "data",
    "role": "Analista de dados e interoperabilidade",
    "positioning": "specialist",
    "scenario": "Uma empresa paraguaia soma 100 mil unidades em moeda local com cinquenta mil em moeda estrangeira sem conversão.",
    "decision": "Separar moedas e converter apenas com taxa e data documentadas antes de obter total comparável.",
    "misconception": "Somar os valores nominais para divulgar receita de cento e cinquenta mil.",
    "changedConstraint": "O contrato define taxa de referência diferente da taxa do recebimento.",
    "tasks": [
      "Dicionário de moedas e datas",
      "Tabela de taxas com procedência",
      "Conciliação de valores originais",
      "Conversão por critério declarado",
      "Relatório de diferença cambial",
      "Teste de arredondamento monetário"
    ],
    "method": "Valores em moedas diferentes não possuem soma econômica direta. Conserve valor original e convertido, taxa e finalidade da conversão; relatório gerencial pode usar critério distinto do documento contábil oficial. Defina a granularidade de cada tabela antes de combinar dados: uma linha pode representar pessoa, pedido, evento ou período. Escolha uma chave e teste unicidade e preenchimento. Junções entre tabelas com múltiplas linhas por chave podem multiplicar valores; agregue na granularidade correta antes da comparação. Registre moeda, fuso, escala e convenção de ausência no dicionário de dados. Um zero observado é diferente de um valor não coletado. Separe treinamento, validação e teste quando houver previsão e respeite a ordem temporal para impedir vazamento. Avalie erro por segmento e não apenas pela média global. Uma conclusão descritiva não demonstra causalidade. Conserve uma tabela de reconciliação com contagem inicial, exclusões justificadas e contagem final. Em dados pessoais, use registros sintéticos ou anonimizados e limite atributos ao necessário. Entregue consulta ou pseudocódigo executável, resultado esperado, casos de fronteira e limitações da interpretação. A aplicação específica exige produzir dicionário de moedas e datas e verificar a ligação com conciliação de valores originais. Compare sua conclusão com a regra do caso: Separar moedas e converter apenas com taxa e data documentadas antes de obter total comparável. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma empresa paraguaia soma 100 mil unidades em moeda local com cinquenta mil em moeda estrangeira sem conversão. Resolução: Separar moedas e converter apenas com taxa e data documentadas antes de obter total comparável. Sem taxa não há total comparável. Se a simulação adotar taxa de dois para a moeda estrangeira, cinquenta mil convertem para cem mil e o total gerencial será duzentos mil na moeda base. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Somar os valores nominais para divulgar receita de cento e cinquenta mil. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O contrato define taxa de referência diferente da taxa do recebimento. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://support.microsoft.com/en-us/excel/calculate-the-average-of-a-group-of-numbers",
      "https://support.microsoft.com/en-us/excel/functions/sumproduct-function"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-amostragem-de-disponibilidade-de-medicamentos-por-estabelecimento",
    "title": "Amostragem de disponibilidade de medicamentos por estabelecimento",
    "track": "data",
    "role": "Analista de dados e interoperabilidade",
    "positioning": "specialist",
    "scenario": "Uma pesquisa equatoriana visita dez unidades urbanas e nenhuma rural, encontrando disponibilidade em oito.",
    "decision": "Relatar 80% na amostra urbana observada e não generalizar para todo o território.",
    "misconception": "Divulgar cobertura nacional de 80% sem desenho amostral.",
    "changedConstraint": "A próxima rodada inclui estabelecimentos rurais de acesso difícil.",
    "tasks": [
      "Quadro de estabelecimentos elegíveis",
      "Plano de estratificação",
      "Registro de coleta por unidade",
      "Indicador amostral descritivo",
      "Análise de ausência de cobertura",
      "Proposta de expansão da amostra"
    ],
    "method": "Uma proporção amostral é resultado do grupo observado. Generalização exige desenho e pesos compatíveis com a população. Viés de cobertura pode dominar mesmo quando todos os registros coletados estão corretos. Defina a granularidade de cada tabela antes de combinar dados: uma linha pode representar pessoa, pedido, evento ou período. Escolha uma chave e teste unicidade e preenchimento. Junções entre tabelas com múltiplas linhas por chave podem multiplicar valores; agregue na granularidade correta antes da comparação. Registre moeda, fuso, escala e convenção de ausência no dicionário de dados. Um zero observado é diferente de um valor não coletado. Separe treinamento, validação e teste quando houver previsão e respeite a ordem temporal para impedir vazamento. Avalie erro por segmento e não apenas pela média global. Uma conclusão descritiva não demonstra causalidade. Conserve uma tabela de reconciliação com contagem inicial, exclusões justificadas e contagem final. Em dados pessoais, use registros sintéticos ou anonimizados e limite atributos ao necessário. Entregue consulta ou pseudocódigo executável, resultado esperado, casos de fronteira e limitações da interpretação. A aplicação específica exige produzir quadro de estabelecimentos elegíveis e verificar a ligação com registro de coleta por unidade. Compare sua conclusão com a regra do caso: Relatar 80% na amostra urbana observada e não generalizar para todo o território. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma pesquisa equatoriana visita dez unidades urbanas e nenhuma rural, encontrando disponibilidade em oito. Resolução: Relatar 80% na amostra urbana observada e não generalizar para todo o território. Oito de dez são 80%. Como o universo rural não foi representado, o número descreve somente a amostra urbana e não sustenta estimativa territorial. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Divulgar cobertura nacional de 80% sem desenho amostral. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A próxima rodada inclui estabelecimentos rurais de acesso difícil. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www150.statcan.gc.ca/n1/pub/12-539-x/steps-etapes/4058326-eng.htm",
      "https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch6/nse-endae/5214806-eng.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-series-temporais-de-emprego-com-revisao-de-dados",
    "title": "Séries temporais de emprego com revisão de dados",
    "track": "data",
    "role": "Analista de dados e interoperabilidade",
    "positioning": "broad",
    "scenario": "Uma série chilena divulga 500 postos em janeiro e depois revisa para 470; fevereiro apresenta 490 na mesma edição revisada.",
    "decision": "Comparar fevereiro com janeiro revisado e registrar crescimento de vinte postos, cerca de 4,26%.",
    "misconception": "Comparar 490 com a edição antiga de 500 e divulgar queda.",
    "changedConstraint": "Uma mudança de classificação altera a comparabilidade com o ano anterior.",
    "tasks": [
      "Inventário de edições da série",
      "Tabela de revisões por período",
      "Cálculo de variação comparável",
      "Mapa de mudança classificatória",
      "Registro de data de extração",
      "Nota metodológica do painel"
    ],
    "method": "Séries revisadas exigem comparação dentro de uma edição coerente. Misturar vintages pode inverter sinal da variação. Guarde data de extração e edição da classificação utilizada. Defina a granularidade de cada tabela antes de combinar dados: uma linha pode representar pessoa, pedido, evento ou período. Escolha uma chave e teste unicidade e preenchimento. Junções entre tabelas com múltiplas linhas por chave podem multiplicar valores; agregue na granularidade correta antes da comparação. Registre moeda, fuso, escala e convenção de ausência no dicionário de dados. Um zero observado é diferente de um valor não coletado. Separe treinamento, validação e teste quando houver previsão e respeite a ordem temporal para impedir vazamento. Avalie erro por segmento e não apenas pela média global. Uma conclusão descritiva não demonstra causalidade. Conserve uma tabela de reconciliação com contagem inicial, exclusões justificadas e contagem final. Em dados pessoais, use registros sintéticos ou anonimizados e limite atributos ao necessário. Entregue consulta ou pseudocódigo executável, resultado esperado, casos de fronteira e limitações da interpretação. A aplicação específica exige produzir inventário de edições da série e verificar a ligação com cálculo de variação comparável. Compare sua conclusão com a regra do caso: Comparar fevereiro com janeiro revisado e registrar crescimento de vinte postos, cerca de 4,26%. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma série chilena divulga 500 postos em janeiro e depois revisa para 470; fevereiro apresenta 490 na mesma edição revisada. Resolução: Comparar fevereiro com janeiro revisado e registrar crescimento de vinte postos, cerca de 4,26%. Quatrocentos e noventa menos 470 são vinte. Vinte divididos por 470 correspondem a aproximadamente 4,26%. A edição antiga produziria uma conclusão oposta por incompatibilidade da base. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Comparar 490 com a edição antiga de 500 e divulgar queda. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Uma mudança de classificação altera a comparabilidade com o ano anterior. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www150.statcan.gc.ca/n1/pub/12-539-x/steps-etapes/4058331-eng.htm",
      "https://www150.statcan.gc.ca/n1/pub/12-539-x/steps-etapes/4058326-eng.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-geocodificacao-de-enderecos-informais-em-servicos-urbanos",
    "title": "Geocodificação de endereços informais em serviços urbanos",
    "track": "data",
    "role": "Analista de dados e interoperabilidade",
    "positioning": "specialist",
    "scenario": "Uma base boliviana tem 500 endereços; trezentos retornam ponto exato, cem apenas centro do bairro e cem não são localizados.",
    "decision": "Distinguir três níveis de precisão e impedir interpretação dos pontos de bairro como localização domiciliar.",
    "misconception": "Plotar todos os quatrocentos resultados como coordenadas exatas.",
    "changedConstraint": "Um bairro muda de nome e passa a gerar resultados ambíguos.",
    "tasks": [
      "Dicionário de precisão espacial",
      "Registro de retorno do geocodificador",
      "Mapa de endereços não localizados",
      "Camada de pontos generalizados",
      "Teste de uso por escala",
      "Guia de comunicação de incerteza"
    ],
    "method": "Coordenada retornada não garante precisão domiciliar. Registre tipo de correspondência e nível espacial; a escala adequada para um indicador pode ser inadequada para uma rota individual. Defina a granularidade de cada tabela antes de combinar dados: uma linha pode representar pessoa, pedido, evento ou período. Escolha uma chave e teste unicidade e preenchimento. Junções entre tabelas com múltiplas linhas por chave podem multiplicar valores; agregue na granularidade correta antes da comparação. Registre moeda, fuso, escala e convenção de ausência no dicionário de dados. Um zero observado é diferente de um valor não coletado. Separe treinamento, validação e teste quando houver previsão e respeite a ordem temporal para impedir vazamento. Avalie erro por segmento e não apenas pela média global. Uma conclusão descritiva não demonstra causalidade. Conserve uma tabela de reconciliação com contagem inicial, exclusões justificadas e contagem final. Em dados pessoais, use registros sintéticos ou anonimizados e limite atributos ao necessário. Entregue consulta ou pseudocódigo executável, resultado esperado, casos de fronteira e limitações da interpretação. A aplicação específica exige produzir dicionário de precisão espacial e verificar a ligação com mapa de endereços não localizados. Compare sua conclusão com a regra do caso: Distinguir três níveis de precisão e impedir interpretação dos pontos de bairro como localização domiciliar. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma base boliviana tem 500 endereços; trezentos retornam ponto exato, cem apenas centro do bairro e cem não são localizados. Resolução: Distinguir três níveis de precisão e impedir interpretação dos pontos de bairro como localização domiciliar. Trezentos de quinhentos representam 60% de localização exata. Outros 20% estão somente no bairro. Juntar ambos como 80% de exatidão esconderia a diferença de resolução. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Plotar todos os quatrocentos resultados como coordenadas exatas. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Um bairro muda de nome e passa a gerar resultados ambíguos. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www150.statcan.gc.ca/n1/pub/12-539-x/steps-etapes/4058326-eng.htm",
      "https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch6/nse-endae/5214806-eng.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-reconciliacao-de-dados-de-chuva-por-dia-hidrologico",
    "title": "Reconciliação de dados de chuva por dia hidrológico",
    "track": "data",
    "role": "Analista de dados e interoperabilidade",
    "positioning": "specialist",
    "scenario": "Duas estações argentinas usam janelas de observação diferentes e registram 30 e 10 mm no mesmo rótulo de data.",
    "decision": "Alinhar intervalos de medição antes de inferir diferença espacial de vinte milímetros.",
    "misconception": "Atribuir a diferença diretamente à distância entre estações.",
    "changedConstraint": "Uma estação troca o horário de fechamento no meio da série.",
    "tasks": [
      "Cadastro de estações e relógios",
      "Linha temporal de intervalos",
      "Tabela de alinhamento diário",
      "Registro de mudança operacional",
      "Comparação por janela equivalente",
      "Nota de incerteza da interpretação"
    ],
    "method": "Rótulos de data podem esconder intervalos distintos. A observação diária deve incluir início e fim do período; sem alinhamento, a mesma tempestade pode aparecer em dias diferentes. Defina a granularidade de cada tabela antes de combinar dados: uma linha pode representar pessoa, pedido, evento ou período. Escolha uma chave e teste unicidade e preenchimento. Junções entre tabelas com múltiplas linhas por chave podem multiplicar valores; agregue na granularidade correta antes da comparação. Registre moeda, fuso, escala e convenção de ausência no dicionário de dados. Um zero observado é diferente de um valor não coletado. Separe treinamento, validação e teste quando houver previsão e respeite a ordem temporal para impedir vazamento. Avalie erro por segmento e não apenas pela média global. Uma conclusão descritiva não demonstra causalidade. Conserve uma tabela de reconciliação com contagem inicial, exclusões justificadas e contagem final. Em dados pessoais, use registros sintéticos ou anonimizados e limite atributos ao necessário. Entregue consulta ou pseudocódigo executável, resultado esperado, casos de fronteira e limitações da interpretação. A aplicação específica exige produzir cadastro de estações e relógios e verificar a ligação com tabela de alinhamento diário. Compare sua conclusão com a regra do caso: Alinhar intervalos de medição antes de inferir diferença espacial de vinte milímetros. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Duas estações argentinas usam janelas de observação diferentes e registram 30 e 10 mm no mesmo rótulo de data. Resolução: Alinhar intervalos de medição antes de inferir diferença espacial de vinte milímetros. Trinta menos dez é uma diferença aritmética de vinte, mas não uma diferença espacial comprovada. Primeiro verifique se as medições cobrem as mesmas horas. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Atribuir a diferença diretamente à distância entre estações. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Uma estação troca o horário de fechamento no meio da série. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www150.statcan.gc.ca/n1/pub/12-539-x/steps-etapes/4058331-eng.htm",
      "https://www150.statcan.gc.ca/n1/pub/12-539-x/steps-etapes/4058326-eng.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-auditoria-de-juncoes-em-bases-de-faturamento-municipal",
    "title": "Auditoria de junções em bases de faturamento municipal",
    "track": "data",
    "role": "Analista de dados e interoperabilidade",
    "positioning": "specialist",
    "scenario": "Uma tabela contém cem faturas e outra duas ocorrências de atendimento para cada fatura; uma junção direta retorna duzentas linhas.",
    "decision": "Agregar atendimentos por fatura antes de somar receita ou manter o valor em granularidade de fatura.",
    "misconception": "Somar a receita nas duzentas linhas e divulgar faturamento duplicado.",
    "changedConstraint": "Algumas faturas possuem três ocorrências em vez de duas.",
    "tasks": [
      "Contrato de granularidade das tabelas",
      "Teste de unicidade de chaves",
      "Consulta de agregação prévia",
      "Conciliação de receita antes e depois",
      "Mapa de cardinalidade",
      "Teste de fatura com três eventos"
    ],
    "method": "Junções um-para-muitos repetem atributos da entidade pai. A solução depende da métrica: contagem de eventos usa tabela de eventos, receita de faturas exige uma contribuição por fatura. Defina a granularidade de cada tabela antes de combinar dados: uma linha pode representar pessoa, pedido, evento ou período. Escolha uma chave e teste unicidade e preenchimento. Junções entre tabelas com múltiplas linhas por chave podem multiplicar valores; agregue na granularidade correta antes da comparação. Registre moeda, fuso, escala e convenção de ausência no dicionário de dados. Um zero observado é diferente de um valor não coletado. Separe treinamento, validação e teste quando houver previsão e respeite a ordem temporal para impedir vazamento. Avalie erro por segmento e não apenas pela média global. Uma conclusão descritiva não demonstra causalidade. Conserve uma tabela de reconciliação com contagem inicial, exclusões justificadas e contagem final. Em dados pessoais, use registros sintéticos ou anonimizados e limite atributos ao necessário. Entregue consulta ou pseudocódigo executável, resultado esperado, casos de fronteira e limitações da interpretação. A aplicação específica exige produzir contrato de granularidade das tabelas e verificar a ligação com consulta de agregação prévia. Compare sua conclusão com a regra do caso: Agregar atendimentos por fatura antes de somar receita ou manter o valor em granularidade de fatura. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma tabela contém cem faturas e outra duas ocorrências de atendimento para cada fatura; uma junção direta retorna duzentas linhas. Resolução: Agregar atendimentos por fatura antes de somar receita ou manter o valor em granularidade de fatura. Se cada fatura de dez unidades aparece duas vezes, a soma indevida vira dois mil em vez de mil. O teste deve comparar o total antes e depois da junção. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Somar a receita nas duzentas linhas e divulgar faturamento duplicado. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Algumas faturas possuem três ocorrências em vez de duas. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.postgresql.org/docs/18/tutorial-join.html",
      "https://www.postgresql.org/docs/current/functions-aggregate.html"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-margem-de-contribuicao-em-turismo-comunitario-andino",
    "title": "Margem de contribuição em turismo comunitário andino",
    "track": "business",
    "role": "Analista de operações comerciais regionais",
    "positioning": "broad",
    "scenario": "Uma experiência no Peru vende quarenta lugares a cem unidades cada, com custo variável de sessenta por pessoa e custo fixo de mil.",
    "decision": "Calcular contribuição de 1600 e resultado simplificado de seiscentos antes de outros custos.",
    "misconception": "Confundir receita de quatro mil com lucro da experiência.",
    "changedConstraint": "A ocupação cai para vinte e cinco pessoas.",
    "tasks": [
      "Tabela de preço por participante",
      "Mapa de custos variáveis",
      "Orçamento de custos fixos",
      "Memória de contribuição",
      "Cenário de ocupação mínima",
      "Proposta de divisão transparente da receita"
    ],
    "method": "Margem de contribuição é preço menos custo variável. Ela cobre custos fixos e somente depois gera resultado no modelo. Transparência comunitária exige distinguir remuneração de trabalho e excedente. Comece pela unidade econômica: cliente, pedido, contrato, turma ou serviço. Receita bruta não é margem e recebimento não é receita de competência. Registre período, moeda, impostos hipotéticos, custos variáveis e compromissos fixos separadamente. Uma comparação comercial precisa manter escopo equivalente e incluir condições de pagamento, devoluções e capacidade de entrega. Aplique critérios observáveis para aprovar uma proposta, em vez de confiar apenas na aparência do documento. Defina responsáveis por aprovação e escalonamento, preservando rastreabilidade das alterações. Em dados regionais, diferencie fatos oficiais de hipóteses da simulação e não prometa demanda, rentabilidade ou acesso a crédito. Compare pelo menos duas alternativas, calcule a consequência da decisão e documente o custo de oportunidade. Teste o plano com redução de demanda ou atraso de recebimento. A entrega final deve conter memória de cálculo, decisão condicionada, evidências pendentes e orientação de transferência para outro analista. A aplicação específica exige produzir tabela de preço por participante e verificar a ligação com orçamento de custos fixos. Compare sua conclusão com a regra do caso: Calcular contribuição de 1600 e resultado simplificado de seiscentos antes de outros custos. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma experiência no Peru vende quarenta lugares a cem unidades cada, com custo variável de sessenta por pessoa e custo fixo de mil. Resolução: Calcular contribuição de 1600 e resultado simplificado de seiscentos antes de outros custos. Quarenta vezes quarenta geram 1600 de contribuição. Após mil de custo fixo, restam seiscentos. Com 25 pessoas a contribuição é mil e o resultado simplificado se torna zero. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Confundir receita de quatro mil com lucro da experiência. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A ocupação cai para vinte e cinco pessoas. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.sba.gov/counseling/plan-your-business/break-even-point-calculator/",
      "https://support.microsoft.com/en-us/excel/functions/sumproduct-function"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-gestao-de-capital-de-giro-para-exportadores-artesanais",
    "title": "Gestão de capital de giro para exportadores artesanais",
    "track": "business",
    "role": "Analista de operações comerciais regionais",
    "positioning": "specialist",
    "scenario": "Uma associação equatoriana paga 6000 de materiais hoje e recebe 10000 em sessenta dias, sem adiantamento.",
    "decision": "Planejar necessidade inicial de caixa de seis mil e não tratar o valor a receber como saldo disponível.",
    "misconception": "Autorizar compra adicional usando recebível futuro como caixa atual.",
    "changedConstraint": "O comprador solicita trinta dias extras para pagar.",
    "tasks": [
      "Cronograma de pagamentos",
      "Mapa de recebíveis por vencimento",
      "Fluxo de caixa por semana",
      "Estimativa de necessidade de giro",
      "Cenário de atraso do comprador",
      "Condições de adiantamento propostas"
    ],
    "method": "Lucro esperado e liquidez são dimensões diferentes. Um pedido economicamente positivo pode exigir financiamento antes do recebimento. Registre vencimento e probabilidade sem transformar expectativa em dinheiro disponível. Comece pela unidade econômica: cliente, pedido, contrato, turma ou serviço. Receita bruta não é margem e recebimento não é receita de competência. Registre período, moeda, impostos hipotéticos, custos variáveis e compromissos fixos separadamente. Uma comparação comercial precisa manter escopo equivalente e incluir condições de pagamento, devoluções e capacidade de entrega. Aplique critérios observáveis para aprovar uma proposta, em vez de confiar apenas na aparência do documento. Defina responsáveis por aprovação e escalonamento, preservando rastreabilidade das alterações. Em dados regionais, diferencie fatos oficiais de hipóteses da simulação e não prometa demanda, rentabilidade ou acesso a crédito. Compare pelo menos duas alternativas, calcule a consequência da decisão e documente o custo de oportunidade. Teste o plano com redução de demanda ou atraso de recebimento. A entrega final deve conter memória de cálculo, decisão condicionada, evidências pendentes e orientação de transferência para outro analista. A aplicação específica exige produzir cronograma de pagamentos e verificar a ligação com fluxo de caixa por semana. Compare sua conclusão com a regra do caso: Planejar necessidade inicial de caixa de seis mil e não tratar o valor a receber como saldo disponível. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma associação equatoriana paga 6000 de materiais hoje e recebe 10000 em sessenta dias, sem adiantamento. Resolução: Planejar necessidade inicial de caixa de seis mil e não tratar o valor a receber como saldo disponível. Os quatro mil de diferença comercial não eliminam a saída inicial de seis mil. O atraso não muda necessariamente a margem nominal, mas amplia o período de exposição financeira. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Autorizar compra adicional usando recebível futuro como caixa atual. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O comprador solicita trinta dias extras para pagar. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.gov.uk/government/publications/civil-service-helping-you-with-managing-suppliers-and-contracts/contract-management-training-accreditation-foundation-level-takeaway-guide-html",
      "https://www.gov.uk/government/publications/commercial-capability-contract-management-standards/contract-management-principles"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-precificacao-de-servicos-de-traducao-regional-por-escopo",
    "title": "Precificação de serviços de tradução regional por escopo",
    "track": "business",
    "role": "Analista de operações comerciais regionais",
    "positioning": "specialist",
    "scenario": "Um projeto uruguaio tem 20000 palavras e orçamento de 4000, mas 5000 palavras adicionais são incluídas após aprovação.",
    "decision": "Registrar ampliação de escopo de 25% e renegociar prazo e preço em vez de absorver silenciosamente.",
    "misconception": "Manter o mesmo cronograma e assumir que o acréscimo é irrelevante.",
    "changedConstraint": "O cliente acrescenta revisão de layout e glossário validado.",
    "tasks": [
      "Matriz de escopo contratado",
      "Contagem auditável de palavras",
      "Tabela de serviços adicionais",
      "Orçamento por componente",
      "Pedido de alteração formal",
      "Calendário revisado de entrega"
    ],
    "method": "Precificação por palavra só cobre o que a definição de serviço inclui. Revisão especializada, layout e gestão terminológica podem ter esforço próprio. Alterações precisam preservar uma base comparável. Comece pela unidade econômica: cliente, pedido, contrato, turma ou serviço. Receita bruta não é margem e recebimento não é receita de competência. Registre período, moeda, impostos hipotéticos, custos variáveis e compromissos fixos separadamente. Uma comparação comercial precisa manter escopo equivalente e incluir condições de pagamento, devoluções e capacidade de entrega. Aplique critérios observáveis para aprovar uma proposta, em vez de confiar apenas na aparência do documento. Defina responsáveis por aprovação e escalonamento, preservando rastreabilidade das alterações. Em dados regionais, diferencie fatos oficiais de hipóteses da simulação e não prometa demanda, rentabilidade ou acesso a crédito. Compare pelo menos duas alternativas, calcule a consequência da decisão e documente o custo de oportunidade. Teste o plano com redução de demanda ou atraso de recebimento. A entrega final deve conter memória de cálculo, decisão condicionada, evidências pendentes e orientação de transferência para outro analista. A aplicação específica exige produzir matriz de escopo contratado e verificar a ligação com tabela de serviços adicionais. Compare sua conclusão com a regra do caso: Registrar ampliação de escopo de 25% e renegociar prazo e preço em vez de absorver silenciosamente. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um projeto uruguaio tem 20000 palavras e orçamento de 4000, mas 5000 palavras adicionais são incluídas após aprovação. Resolução: Registrar ampliação de escopo de 25% e renegociar prazo e preço em vez de absorver silenciosamente. Cinco mil sobre vinte mil representam 25%. Mantida a taxa simplificada de 0,20 por palavra, a tradução adicional seria mil, antes de avaliar tarefas não linguísticas. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Manter o mesmo cronograma e assumir que o acréscimo é irrelevante. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O cliente acrescenta revisão de layout e glossário validado. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.gov.uk/government/publications/civil-service-helping-you-with-managing-suppliers-and-contracts/contract-management-training-accreditation-foundation-level-takeaway-guide-html",
      "https://www.gov.uk/government/publications/commercial-capability-contract-management-standards/contract-management-principles"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-economia-unitaria-de-assinaturas-educacionais-locais",
    "title": "Economia unitária de assinaturas educacionais locais",
    "track": "business",
    "role": "Analista de operações comerciais regionais",
    "positioning": "specialist",
    "scenario": "Uma plataforma brasileira recebe 300 assinaturas de vinte unidades e gasta seis por assinante em serviço variável mais 2500 fixos.",
    "decision": "Calcular contribuição de 4200 e resultado simplificado de 1700, sem confundir assinantes com lucro garantido.",
    "misconception": "Multiplicar assinantes pelo preço e apresentar seis mil como resultado líquido.",
    "changedConstraint": "Quarenta assinaturas ficam inadimplentes no mês.",
    "tasks": [
      "Registro de assinaturas por estado",
      "Mapa de custos por aluno",
      "Conciliação de cobrança e recebimento",
      "Memória de contribuição mensal",
      "Cenário de inadimplência",
      "Plano de indicadores de retenção"
    ],
    "method": "Receita contratada, receita reconhecida e dinheiro recebido podem divergir. Para economia unitária, relacione custo variável ao período e às obrigações realmente prestadas, mantendo inadimplência explícita. Comece pela unidade econômica: cliente, pedido, contrato, turma ou serviço. Receita bruta não é margem e recebimento não é receita de competência. Registre período, moeda, impostos hipotéticos, custos variáveis e compromissos fixos separadamente. Uma comparação comercial precisa manter escopo equivalente e incluir condições de pagamento, devoluções e capacidade de entrega. Aplique critérios observáveis para aprovar uma proposta, em vez de confiar apenas na aparência do documento. Defina responsáveis por aprovação e escalonamento, preservando rastreabilidade das alterações. Em dados regionais, diferencie fatos oficiais de hipóteses da simulação e não prometa demanda, rentabilidade ou acesso a crédito. Compare pelo menos duas alternativas, calcule a consequência da decisão e documente o custo de oportunidade. Teste o plano com redução de demanda ou atraso de recebimento. A entrega final deve conter memória de cálculo, decisão condicionada, evidências pendentes e orientação de transferência para outro analista. A aplicação específica exige produzir registro de assinaturas por estado e verificar a ligação com conciliação de cobrança e recebimento. Compare sua conclusão com a regra do caso: Calcular contribuição de 4200 e resultado simplificado de 1700, sem confundir assinantes com lucro garantido. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma plataforma brasileira recebe 300 assinaturas de vinte unidades e gasta seis por assinante em serviço variável mais 2500 fixos. Resolução: Calcular contribuição de 4200 e resultado simplificado de 1700, sem confundir assinantes com lucro garantido. Trezentos vezes catorze produzem 4200 de contribuição. Após 2500 fixos restam 1700 no modelo. Custos fiscais, estornos e aquisição ainda podem alterar o resultado econômico. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Multiplicar assinantes pelo preço e apresentar seis mil como resultado líquido. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Quarenta assinaturas ficam inadimplentes no mês. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.sba.gov/counseling/plan-your-business/break-even-point-calculator/",
      "https://support.microsoft.com/en-us/excel/functions/sumproduct-function"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-avaliacao-de-propostas-b2b-com-prazos-diferentes",
    "title": "Avaliação de propostas B2B com prazos diferentes",
    "track": "business",
    "role": "Analista de operações comerciais regionais",
    "positioning": "broad",
    "scenario": "Uma empresa colombiana recebe oferta A de 9000 à vista e B de 10000 em noventa dias, sem taxa de desconto fornecida.",
    "decision": "Comparar valor nominal e prazo separadamente e pedir custo de capital antes de afirmar superioridade econômica.",
    "misconception": "Escolher B como melhor em qualquer situação pelo maior valor nominal.",
    "changedConstraint": "A proposta B passa a exigir serviço adicional de suporte.",
    "tasks": [
      "Quadro de escopo equivalente",
      "Calendário de recebimentos",
      "Modelo de desconto parametrizado",
      "Mapa de risco de contraparte",
      "Comparação de suporte incluído",
      "Memorando de decisão condicionada"
    ],
    "method": "Fluxos em datas diferentes precisam de critério temporal comum. Sem taxa e risco, é possível descrever opções e ponto de indiferença, mas não declarar um vencedor econômico universal. Comece pela unidade econômica: cliente, pedido, contrato, turma ou serviço. Receita bruta não é margem e recebimento não é receita de competência. Registre período, moeda, impostos hipotéticos, custos variáveis e compromissos fixos separadamente. Uma comparação comercial precisa manter escopo equivalente e incluir condições de pagamento, devoluções e capacidade de entrega. Aplique critérios observáveis para aprovar uma proposta, em vez de confiar apenas na aparência do documento. Defina responsáveis por aprovação e escalonamento, preservando rastreabilidade das alterações. Em dados regionais, diferencie fatos oficiais de hipóteses da simulação e não prometa demanda, rentabilidade ou acesso a crédito. Compare pelo menos duas alternativas, calcule a consequência da decisão e documente o custo de oportunidade. Teste o plano com redução de demanda ou atraso de recebimento. A entrega final deve conter memória de cálculo, decisão condicionada, evidências pendentes e orientação de transferência para outro analista. A aplicação específica exige produzir quadro de escopo equivalente e verificar a ligação com modelo de desconto parametrizado. Compare sua conclusão com a regra do caso: Comparar valor nominal e prazo separadamente e pedir custo de capital antes de afirmar superioridade econômica. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma empresa colombiana recebe oferta A de 9000 à vista e B de 10000 em noventa dias, sem taxa de desconto fornecida. Resolução: Comparar valor nominal e prazo separadamente e pedir custo de capital antes de afirmar superioridade econômica. B paga mil a mais e demora noventa dias. A diferença nominal pode compensar ou não o custo de esperar; suporte adicional também reduz a comparabilidade. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Escolher B como melhor em qualquer situação pelo maior valor nominal. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A proposta B passa a exigir serviço adicional de suporte. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.gov.uk/government/publications/civil-service-helping-you-with-managing-suppliers-and-contracts/contract-management-training-accreditation-foundation-level-takeaway-guide-html",
      "https://support.microsoft.com/en-us/excel/calculate-the-average-of-a-group-of-numbers"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-compras-coletivas-para-microvarejo",
    "title": "Planejamento de compras coletivas para microvarejo",
    "track": "business",
    "role": "Analista de operações comerciais regionais",
    "positioning": "specialist",
    "scenario": "Dez lojas paraguaias pedem vinte caixas cada; o fornecedor oferece desconto para 250 caixas e há demanda confirmada de duzentas.",
    "decision": "Comparar custo do excedente de cinquenta caixas com economia de desconto antes de ampliar pedido.",
    "misconception": "Comprar 250 somente para atingir o desconto sem destino para o excedente.",
    "changedConstraint": "O prazo de validade do produto é inferior à cobertura estimada.",
    "tasks": [
      "Consolidação de pedidos por loja",
      "Tabela de faixas de desconto",
      "Custo total por cenário",
      "Mapa de destino do excedente",
      "Análise de validade e cobertura",
      "Regra de aprovação coletiva"
    ],
    "method": "Desconto unitário não garante menor gasto ou melhor retorno. Inclua quantidade realmente necessária, armazenagem, validade e risco de encalhe na comparação de compras em lote. Comece pela unidade econômica: cliente, pedido, contrato, turma ou serviço. Receita bruta não é margem e recebimento não é receita de competência. Registre período, moeda, impostos hipotéticos, custos variáveis e compromissos fixos separadamente. Uma comparação comercial precisa manter escopo equivalente e incluir condições de pagamento, devoluções e capacidade de entrega. Aplique critérios observáveis para aprovar uma proposta, em vez de confiar apenas na aparência do documento. Defina responsáveis por aprovação e escalonamento, preservando rastreabilidade das alterações. Em dados regionais, diferencie fatos oficiais de hipóteses da simulação e não prometa demanda, rentabilidade ou acesso a crédito. Compare pelo menos duas alternativas, calcule a consequência da decisão e documente o custo de oportunidade. Teste o plano com redução de demanda ou atraso de recebimento. A entrega final deve conter memória de cálculo, decisão condicionada, evidências pendentes e orientação de transferência para outro analista. A aplicação específica exige produzir consolidação de pedidos por loja e verificar a ligação com custo total por cenário. Compare sua conclusão com a regra do caso: Comparar custo do excedente de cinquenta caixas com economia de desconto antes de ampliar pedido. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Dez lojas paraguaias pedem vinte caixas cada; o fornecedor oferece desconto para 250 caixas e há demanda confirmada de duzentas. Resolução: Comparar custo do excedente de cinquenta caixas com economia de desconto antes de ampliar pedido. O excedente é cinquenta caixas, equivalendo a 25% da demanda confirmada. O benefício precisa superar o custo e o risco dessas unidades extras para justificar a ampliação. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Comprar 250 somente para atingir o desconto sem destino para o excedente. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O prazo de validade do produto é inferior à cobertura estimada. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.sba.gov/counseling/plan-your-business/break-even-point-calculator/",
      "https://support.microsoft.com/en-us/excel/calculate-the-average-of-a-group-of-numbers"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-controle-de-comissoes-em-vendas-multicanal",
    "title": "Controle de comissões em vendas multicanal",
    "track": "business",
    "role": "Analista de operações comerciais regionais",
    "positioning": "specialist",
    "scenario": "Uma operação argentina vende 12000 pelo canal A com comissão de 10% e 8000 pelo canal B com comissão de 15%.",
    "decision": "Calcular comissões de 1200 em cada canal e taxa combinada de 12%.",
    "misconception": "Aplicar média simples de 12,5% à receita total.",
    "changedConstraint": "O canal B introduz taxa fixa por transação.",
    "tasks": [
      "Tabela de vendas por canal",
      "Cadastro de regras de comissão",
      "Memória de taxas variáveis",
      "Conciliação de repasses",
      "Comparação de receita após canal",
      "Cenário de taxa por transação"
    ],
    "method": "Taxas combinadas são ponderadas pela base de cálculo, não pela quantidade de canais. Separe comissão percentual de tarifa fixa e reconcilie o repasse com as regras de cada transação. Comece pela unidade econômica: cliente, pedido, contrato, turma ou serviço. Receita bruta não é margem e recebimento não é receita de competência. Registre período, moeda, impostos hipotéticos, custos variáveis e compromissos fixos separadamente. Uma comparação comercial precisa manter escopo equivalente e incluir condições de pagamento, devoluções e capacidade de entrega. Aplique critérios observáveis para aprovar uma proposta, em vez de confiar apenas na aparência do documento. Defina responsáveis por aprovação e escalonamento, preservando rastreabilidade das alterações. Em dados regionais, diferencie fatos oficiais de hipóteses da simulação e não prometa demanda, rentabilidade ou acesso a crédito. Compare pelo menos duas alternativas, calcule a consequência da decisão e documente o custo de oportunidade. Teste o plano com redução de demanda ou atraso de recebimento. A entrega final deve conter memória de cálculo, decisão condicionada, evidências pendentes e orientação de transferência para outro analista. A aplicação específica exige produzir tabela de vendas por canal e verificar a ligação com memória de taxas variáveis. Compare sua conclusão com a regra do caso: Calcular comissões de 1200 em cada canal e taxa combinada de 12%. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma operação argentina vende 12000 pelo canal A com comissão de 10% e 8000 pelo canal B com comissão de 15%. Resolução: Calcular comissões de 1200 em cada canal e taxa combinada de 12%. A comissão total é 2400 sobre receita de vinte mil, resultando em 12%. A média simples de 10% e 15% atribuiria pesos iguais a receitas diferentes. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Aplicar média simples de 12,5% à receita total. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O canal B introduz taxa fixa por transação. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://support.microsoft.com/en-us/excel/functions/sumproduct-function",
      "https://support.microsoft.com/en-us/excel/calculate-the-average-of-a-group-of-numbers"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-comercial-de-safras-de-artesanato",
    "title": "Planejamento comercial de safras de artesanato",
    "track": "business",
    "role": "Analista de operações comerciais regionais",
    "positioning": "specialist",
    "scenario": "Uma cooperativa boliviana tem capacidade de 600 peças antes de uma feira e recebe pedidos firmes de 450 mais intenção não vinculante de duzentas.",
    "decision": "Reservar 450 para contratos e tratar as duzentas intenções como cenário comercial, com limite adicional de 150 peças.",
    "misconception": "Prometer 650 peças como se toda intenção fosse pedido confirmado.",
    "changedConstraint": "Um fornecedor atrasa material para cem peças.",
    "tasks": [
      "Carteira de pedidos por estado",
      "Plano de capacidade artesanal",
      "Calendário de materiais",
      "Reserva por contrato confirmado",
      "Cenário de conversão de intenções",
      "Regra de comunicação de prazo"
    ],
    "method": "Carteira comercial precisa distinguir contrato, proposta e intenção. Capacidade comprometida deve ser reservada por obrigação confirmada, preservando visibilidade da demanda potencial sem criar promessas incompatíveis. Comece pela unidade econômica: cliente, pedido, contrato, turma ou serviço. Receita bruta não é margem e recebimento não é receita de competência. Registre período, moeda, impostos hipotéticos, custos variáveis e compromissos fixos separadamente. Uma comparação comercial precisa manter escopo equivalente e incluir condições de pagamento, devoluções e capacidade de entrega. Aplique critérios observáveis para aprovar uma proposta, em vez de confiar apenas na aparência do documento. Defina responsáveis por aprovação e escalonamento, preservando rastreabilidade das alterações. Em dados regionais, diferencie fatos oficiais de hipóteses da simulação e não prometa demanda, rentabilidade ou acesso a crédito. Compare pelo menos duas alternativas, calcule a consequência da decisão e documente o custo de oportunidade. Teste o plano com redução de demanda ou atraso de recebimento. A entrega final deve conter memória de cálculo, decisão condicionada, evidências pendentes e orientação de transferência para outro analista. A aplicação específica exige produzir carteira de pedidos por estado e verificar a ligação com calendário de materiais. Compare sua conclusão com a regra do caso: Reservar 450 para contratos e tratar as duzentas intenções como cenário comercial, com limite adicional de 150 peças. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma cooperativa boliviana tem capacidade de 600 peças antes de uma feira e recebe pedidos firmes de 450 mais intenção não vinculante de duzentas. Resolução: Reservar 450 para contratos e tratar as duzentas intenções como cenário comercial, com limite adicional de 150 peças. Seiscentas menos 450 deixam 150 peças de folga. As duzentas intenções excedem a folga em cinquenta, antes de qualquer redução de capacidade por material. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Prometer 650 peças como se toda intenção fosse pedido confirmado. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Um fornecedor atrasa material para cem peças. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://developers.google.com/optimization/routing/cvrptw_resources",
      "https://www.gov.uk/government/publications/civil-service-helping-you-with-managing-suppliers-and-contracts/contract-management-training-accreditation-foundation-level-takeaway-guide-html"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-gestao-de-descontos-em-contratos-de-suporte-regional",
    "title": "Gestão de descontos em contratos de suporte regional",
    "track": "business",
    "role": "Analista de operações comerciais regionais",
    "positioning": "broad",
    "scenario": "Um fornecedor peruano cobra 3000 por mês para cem horas e oferece desconto de 10%, mantendo demanda prevista de 120 horas.",
    "decision": "Reavaliar escopo e capacidade, pois preço com desconto de 2700 não resolve vinte horas adicionais de demanda.",
    "misconception": "Aceitar o desconto como ganho suficiente sem ajustar o volume do serviço.",
    "changedConstraint": "A demanda inclui cobertura fora do horário contratado.",
    "tasks": [
      "Matriz de horas por serviço",
      "Tabela de preço e desconto",
      "Cálculo de capacidade comprometida",
      "Mapa de exclusões contratuais",
      "Orçamento de horas adicionais",
      "Proposta de alteração de nível de serviço"
    ],
    "method": "Negociação de preço e negociação de escopo são dimensões distintas. Compare a taxa efetiva e o esforço necessário, incluindo cobertura e disponibilidade. Um desconto pode reduzir viabilidade se o volume também aumenta. Comece pela unidade econômica: cliente, pedido, contrato, turma ou serviço. Receita bruta não é margem e recebimento não é receita de competência. Registre período, moeda, impostos hipotéticos, custos variáveis e compromissos fixos separadamente. Uma comparação comercial precisa manter escopo equivalente e incluir condições de pagamento, devoluções e capacidade de entrega. Aplique critérios observáveis para aprovar uma proposta, em vez de confiar apenas na aparência do documento. Defina responsáveis por aprovação e escalonamento, preservando rastreabilidade das alterações. Em dados regionais, diferencie fatos oficiais de hipóteses da simulação e não prometa demanda, rentabilidade ou acesso a crédito. Compare pelo menos duas alternativas, calcule a consequência da decisão e documente o custo de oportunidade. Teste o plano com redução de demanda ou atraso de recebimento. A entrega final deve conter memória de cálculo, decisão condicionada, evidências pendentes e orientação de transferência para outro analista. A aplicação específica exige produzir matriz de horas por serviço e verificar a ligação com cálculo de capacidade comprometida. Compare sua conclusão com a regra do caso: Reavaliar escopo e capacidade, pois preço com desconto de 2700 não resolve vinte horas adicionais de demanda. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um fornecedor peruano cobra 3000 por mês para cem horas e oferece desconto de 10%, mantendo demanda prevista de 120 horas. Resolução: Reavaliar escopo e capacidade, pois preço com desconto de 2700 não resolve vinte horas adicionais de demanda. O preço cai para 2700. Distribuído por 120 horas, ele representa 22,50 por hora demandada, diferente dos trinta por hora previstos no contrato original. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Aceitar o desconto como ganho suficiente sem ajustar o volume do serviço. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A demanda inclui cobertura fora do horário contratado. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.gov.uk/government/publications/civil-service-helping-you-with-managing-suppliers-and-contracts/contract-management-training-accreditation-foundation-level-takeaway-guide-html",
      "https://www.sba.gov/counseling/plan-your-business/break-even-point-calculator/"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-conciliacao-de-vouchers-em-programas-de-capacitacao",
    "title": "Conciliação de vouchers em programas de capacitação",
    "track": "business",
    "role": "Analista de operações comerciais regionais",
    "positioning": "specialist",
    "scenario": "Um programa chileno emite mil vouchers; seiscentos são resgatados, cem expiram e trezentos continuam válidos.",
    "decision": "Separar emissão, resgate e estoque válido; taxa de resgate até a data é 60%.",
    "misconception": "Considerar quatrocentos vouchers como fracasso definitivo.",
    "changedConstraint": "Cinquenta resgates são cancelados após a primeira aula.",
    "tasks": [
      "Registro de emissão e validade",
      "Linha temporal de resgates",
      "Conciliação de cancelamentos",
      "Indicador de uso por coorte",
      "Mapa de estoque ainda válido",
      "Plano de comunicação de vencimento"
    ],
    "method": "Coortes de incentivos exigem data de corte e estados mutuamente compreensíveis. Não classifique saldo válido como expiração. Cancelamento de resgate precisa de regra para reativação ou encerramento. Comece pela unidade econômica: cliente, pedido, contrato, turma ou serviço. Receita bruta não é margem e recebimento não é receita de competência. Registre período, moeda, impostos hipotéticos, custos variáveis e compromissos fixos separadamente. Uma comparação comercial precisa manter escopo equivalente e incluir condições de pagamento, devoluções e capacidade de entrega. Aplique critérios observáveis para aprovar uma proposta, em vez de confiar apenas na aparência do documento. Defina responsáveis por aprovação e escalonamento, preservando rastreabilidade das alterações. Em dados regionais, diferencie fatos oficiais de hipóteses da simulação e não prometa demanda, rentabilidade ou acesso a crédito. Compare pelo menos duas alternativas, calcule a consequência da decisão e documente o custo de oportunidade. Teste o plano com redução de demanda ou atraso de recebimento. A entrega final deve conter memória de cálculo, decisão condicionada, evidências pendentes e orientação de transferência para outro analista. A aplicação específica exige produzir registro de emissão e validade e verificar a ligação com conciliação de cancelamentos. Compare sua conclusão com a regra do caso: Separar emissão, resgate e estoque válido; taxa de resgate até a data é 60%. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um programa chileno emite mil vouchers; seiscentos são resgatados, cem expiram e trezentos continuam válidos. Resolução: Separar emissão, resgate e estoque válido; taxa de resgate até a data é 60%. Seiscentos sobre mil produzem 60% de resgate bruto. Cem expirados são 10%; trezentos ainda podem ser usados. Após cancelamentos, reporte bruto e líquido com a regra declarada. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Considerar quatrocentos vouchers como fracasso definitivo. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Cinquenta resgates são cancelados após a primeira aula. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.gov.uk/service-manual/measuring-success/measuring-completion-rate",
      "https://www.gov.uk/service-manual/measuring-success/how-to-set-performance-metrics-for-your-service"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-setup-em-metalmecanica-de-pequenos-lotes",
    "title": "Planejamento de setup em metalmecânica de pequenos lotes",
    "track": "industry",
    "role": "Analista de planejamento e qualidade industrial",
    "positioning": "specialist",
    "scenario": "Uma fábrica brasileira dedica 90 minutos a cada uma de quatro trocas e 600 minutos à produção em um turno estendido de 960 minutos.",
    "decision": "Reconhecer ocupação integral de 960 minutos e ausência de folga no modelo.",
    "misconception": "Acrescentar outro lote sem reduzir setup ou ampliar janela.",
    "changedConstraint": "Uma troca exige limpeza adicional de trinta minutos.",
    "tasks": [
      "Mapa de famílias de produto",
      "Tabela de setup interno e externo",
      "Cronograma de sequenciamento",
      "Cálculo de ocupação do recurso",
      "Lista de oportunidades documentais",
      "Cenário de limpeza adicional"
    ],
    "method": "Separe preparação que exige máquina parada de preparação que pode ocorrer externamente. Sequenciamento por família pode reduzir trocas, mas precisa preservar requisitos de qualidade e prazo. Mapeie a sequência produtiva distinguindo tempo de ciclo, preparação, fila e disponibilidade. A capacidade do fluxo depende da restrição que efetivamente limita a saída; aumentar produção antes do gargalo pode apenas elevar estoque em processo. Calcule indicadores com denominador consistente: retrabalho não é nova produção e peça rejeitada não integra saída conforme. Para investigar variação, estratifique por lote, turno, máquina e matéria-prima antes de atribuir uma causa. Uma correlação operacional sugere uma hipótese, mas não comprova falha de um componente. Defina regra de amostragem e preserve identificação do instrumento; resolução numérica não garante exatidão. Em manutenção e segurança, os exercícios limitam-se a documentação, análise e planejamento. Não execute intervenções, ensaios perigosos ou liberação de máquinas. Documente autorização necessária, condição de parada e especialista responsável. Entregue plano rastreável com critério de aceite, testes controlados e revisão após mudança de condição. A aplicação específica exige produzir mapa de famílias de produto e verificar a ligação com cronograma de sequenciamento. Compare sua conclusão com a regra do caso: Reconhecer ocupação integral de 960 minutos e ausência de folga no modelo. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma fábrica brasileira dedica 90 minutos a cada uma de quatro trocas e 600 minutos à produção em um turno estendido de 960 minutos. Resolução: Reconhecer ocupação integral de 960 minutos e ausência de folga no modelo. Quatro vezes noventa são 360 minutos. Somados aos seiscentos de produção, ocupam toda a janela. A limpeza adicional cria déficit de trinta minutos. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Acrescentar outro lote sem reduzir setup ou ampliar janela. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Uma troca exige limpeza adicional de trinta minutos. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.nist.gov/mep/lean-and-process-improvement",
      "https://www.nist.gov/mep/value-stream-mapping"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-conciliacao-de-refugo-e-retrabalho-em-autopecas",
    "title": "Conciliação de refugo e retrabalho em autopeças",
    "track": "industry",
    "role": "Analista de planejamento e qualidade industrial",
    "positioning": "specialist",
    "scenario": "Uma linha argentina inicia mil peças; setenta são refugadas, oitenta retrabalhadas com sucesso e 850 aprovadas sem retrabalho.",
    "decision": "Registrar saída conforme de 930 e aprovação de primeira passagem de 85%.",
    "misconception": "Somar retrabalho bem-sucedido como produção adicional além das mil peças.",
    "changedConstraint": "Vinte peças retrabalhadas falham na segunda inspeção.",
    "tasks": [
      "Mapa de destinos por peça",
      "Definição de primeira passagem",
      "Conciliação de refugo",
      "Registro de retrabalho e resultado",
      "Indicador de saída conforme",
      "Plano de análise por causa"
    ],
    "method": "Cada peça deve ter identidade preservada ao atravessar retrabalho. First pass yield mede conformidade sem retorno; rendimento final pode incluir recuperação, mas não nova contagem física da mesma peça. Mapeie a sequência produtiva distinguindo tempo de ciclo, preparação, fila e disponibilidade. A capacidade do fluxo depende da restrição que efetivamente limita a saída; aumentar produção antes do gargalo pode apenas elevar estoque em processo. Calcule indicadores com denominador consistente: retrabalho não é nova produção e peça rejeitada não integra saída conforme. Para investigar variação, estratifique por lote, turno, máquina e matéria-prima antes de atribuir uma causa. Uma correlação operacional sugere uma hipótese, mas não comprova falha de um componente. Defina regra de amostragem e preserve identificação do instrumento; resolução numérica não garante exatidão. Em manutenção e segurança, os exercícios limitam-se a documentação, análise e planejamento. Não execute intervenções, ensaios perigosos ou liberação de máquinas. Documente autorização necessária, condição de parada e especialista responsável. Entregue plano rastreável com critério de aceite, testes controlados e revisão após mudança de condição. A aplicação específica exige produzir mapa de destinos por peça e verificar a ligação com conciliação de refugo. Compare sua conclusão com a regra do caso: Registrar saída conforme de 930 e aprovação de primeira passagem de 85%. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma linha argentina inicia mil peças; setenta são refugadas, oitenta retrabalhadas com sucesso e 850 aprovadas sem retrabalho. Resolução: Registrar saída conforme de 930 e aprovação de primeira passagem de 85%. Oitocentas e cinquenta mais oitenta resultam em 930 peças finais conformes. Dividir 850 por mil informa 85% de primeira passagem, diferente dos 93% de rendimento final. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Somar retrabalho bem-sucedido como produção adicional além das mil peças. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Vinte peças retrabalhadas falham na segunda inspeção. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://asq.org/quality-resources/quality-glossary",
      "https://www.nist.gov/mep/value-stream-mapping"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-analise-de-gargalo-em-beneficiamento-mineral-documental",
    "title": "Análise de gargalo em beneficiamento mineral documental",
    "track": "industry",
    "role": "Analista de planejamento e qualidade industrial",
    "positioning": "broad",
    "scenario": "Três etapas no Chile têm capacidades de 80, 60 e 75 toneladas por hora em série e sem estoques intermediários limitantes.",
    "decision": "Usar sessenta toneladas por hora como teto do fluxo no modelo e investigar a etapa intermediária.",
    "misconception": "Prometer oitenta toneladas por hora porque essa é a capacidade de entrada.",
    "changedConstraint": "A etapa intermediária fica indisponível por uma hora em oito.",
    "tasks": [
      "Mapa de fluxo mineral",
      "Tabela de capacidade por etapa",
      "Identificação da restrição",
      "Balanço horário de estoque",
      "Cenário de indisponibilidade",
      "Plano documental de alternativas"
    ],
    "method": "Em etapas seriadas, a menor capacidade sustentada limita a vazão total. Melhorar etapas não restritivas pode não aumentar a saída, sobretudo quando o recurso gargalo continua inalterado. Mapeie a sequência produtiva distinguindo tempo de ciclo, preparação, fila e disponibilidade. A capacidade do fluxo depende da restrição que efetivamente limita a saída; aumentar produção antes do gargalo pode apenas elevar estoque em processo. Calcule indicadores com denominador consistente: retrabalho não é nova produção e peça rejeitada não integra saída conforme. Para investigar variação, estratifique por lote, turno, máquina e matéria-prima antes de atribuir uma causa. Uma correlação operacional sugere uma hipótese, mas não comprova falha de um componente. Defina regra de amostragem e preserve identificação do instrumento; resolução numérica não garante exatidão. Em manutenção e segurança, os exercícios limitam-se a documentação, análise e planejamento. Não execute intervenções, ensaios perigosos ou liberação de máquinas. Documente autorização necessária, condição de parada e especialista responsável. Entregue plano rastreável com critério de aceite, testes controlados e revisão após mudança de condição. A aplicação específica exige produzir mapa de fluxo mineral e verificar a ligação com identificação da restrição. Compare sua conclusão com a regra do caso: Usar sessenta toneladas por hora como teto do fluxo no modelo e investigar a etapa intermediária. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Três etapas no Chile têm capacidades de 80, 60 e 75 toneladas por hora em série e sem estoques intermediários limitantes. Resolução: Usar sessenta toneladas por hora como teto do fluxo no modelo e investigar a etapa intermediária. Sessenta é inferior a oitenta e a 75. Em oito horas, o teto ideal é 480 toneladas; se o gargalo opera sete, o teto passa a 420 antes de outras perdas. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Prometer oitenta toneladas por hora porque essa é a capacidade de entrada. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A etapa intermediária fica indisponível por uma hora em oito. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.nist.gov/mep/value-stream-mapping",
      "https://developers.google.com/optimization/routing/cvrptw_resources"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-gestao-de-metrologia-em-embalagens-flexiveis",
    "title": "Gestão de metrologia em embalagens flexíveis",
    "track": "industry",
    "role": "Analista de planejamento e qualidade industrial",
    "positioning": "specialist",
    "scenario": "Um laboratório peruano compara espessura de filme com instrumento cuja resolução é 0,01 mm e requisito de tolerância total de 0,02 mm.",
    "decision": "Sinalizar que a resolução é grande em relação à tolerância e pedir avaliação metrológica antes de aceitar medições como suficientes.",
    "misconception": "Declarar capacidade de medição adequada só porque o visor mostra casas decimais.",
    "changedConstraint": "A temperatura de medição varia entre turnos sem registro.",
    "tasks": [
      "Inventário de instrumentos",
      "Matriz de tolerância e resolução",
      "Plano de verificação metrológica",
      "Registro de condição ambiental",
      "Comparação entre operadores",
      "Nota de limite de decisão"
    ],
    "method": "Resolução é o menor incremento exibido e não a incerteza total. Compare capacidade do sistema de medição com tolerância, repetibilidade e condições de uso antes de atribuir diferenças ao produto. Mapeie a sequência produtiva distinguindo tempo de ciclo, preparação, fila e disponibilidade. A capacidade do fluxo depende da restrição que efetivamente limita a saída; aumentar produção antes do gargalo pode apenas elevar estoque em processo. Calcule indicadores com denominador consistente: retrabalho não é nova produção e peça rejeitada não integra saída conforme. Para investigar variação, estratifique por lote, turno, máquina e matéria-prima antes de atribuir uma causa. Uma correlação operacional sugere uma hipótese, mas não comprova falha de um componente. Defina regra de amostragem e preserve identificação do instrumento; resolução numérica não garante exatidão. Em manutenção e segurança, os exercícios limitam-se a documentação, análise e planejamento. Não execute intervenções, ensaios perigosos ou liberação de máquinas. Documente autorização necessária, condição de parada e especialista responsável. Entregue plano rastreável com critério de aceite, testes controlados e revisão após mudança de condição. A aplicação específica exige produzir inventário de instrumentos e verificar a ligação com plano de verificação metrológica. Compare sua conclusão com a regra do caso: Sinalizar que a resolução é grande em relação à tolerância e pedir avaliação metrológica antes de aceitar medições como suficientes. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um laboratório peruano compara espessura de filme com instrumento cuja resolução é 0,01 mm e requisito de tolerância total de 0,02 mm. Resolução: Sinalizar que a resolução é grande em relação à tolerância e pedir avaliação metrológica antes de aceitar medições como suficientes. Um incremento de 0,01 ocupa metade da tolerância total de 0,02. Isso indica pouca discriminação e exige análise especializada; não basta arredondar resultados para parecer preciso. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Declarar capacidade de medição adequada só porque o visor mostra casas decimais. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A temperatura de medição varia entre turnos sem registro. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.nist.gov/publications/simple-guide-evaluating-and-expressing-uncertainty-nist-measurement-results",
      "https://www.nist.gov/publications/traceability-considerations-characterization-and-use-measuring-systems"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-ordens-de-manutencao-por-criticidade",
    "title": "Planejamento de ordens de manutenção por criticidade",
    "track": "industry",
    "role": "Analista de planejamento e qualidade industrial",
    "positioning": "specialist",
    "scenario": "Uma planta colombiana possui vinte ordens atrasadas; três afetam barreiras de segurança e dezessete são melhorias cosméticas.",
    "decision": "Escalar as três ordens de barreira com responsável técnico antes de priorizar por idade apenas.",
    "misconception": "Executar primeiro as ordens mais antigas sem considerar consequência.",
    "changedConstraint": "Uma ordem cosmética passa a indicar deterioração estrutural a investigar.",
    "tasks": [
      "Inventário de ordens e sintomas",
      "Matriz de consequência e exposição",
      "Fila de escalonamento técnico",
      "Calendário condicionado de execução",
      "Registro de autorização e fechamento",
      "Teste de revisão de criticidade"
    ],
    "method": "Criticidade combina consequência e contexto, não apenas atraso. A classificação documental deve apoiar avaliação habilitada e não autorizar manutenção pelo aluno. Novas evidências podem mudar prioridade. Mapeie a sequência produtiva distinguindo tempo de ciclo, preparação, fila e disponibilidade. A capacidade do fluxo depende da restrição que efetivamente limita a saída; aumentar produção antes do gargalo pode apenas elevar estoque em processo. Calcule indicadores com denominador consistente: retrabalho não é nova produção e peça rejeitada não integra saída conforme. Para investigar variação, estratifique por lote, turno, máquina e matéria-prima antes de atribuir uma causa. Uma correlação operacional sugere uma hipótese, mas não comprova falha de um componente. Defina regra de amostragem e preserve identificação do instrumento; resolução numérica não garante exatidão. Em manutenção e segurança, os exercícios limitam-se a documentação, análise e planejamento. Não execute intervenções, ensaios perigosos ou liberação de máquinas. Documente autorização necessária, condição de parada e especialista responsável. Entregue plano rastreável com critério de aceite, testes controlados e revisão após mudança de condição. A aplicação específica exige produzir inventário de ordens e sintomas e verificar a ligação com fila de escalonamento técnico. Compare sua conclusão com a regra do caso: Escalar as três ordens de barreira com responsável técnico antes de priorizar por idade apenas. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma planta colombiana possui vinte ordens atrasadas; três afetam barreiras de segurança e dezessete são melhorias cosméticas. Resolução: Escalar as três ordens de barreira com responsável técnico antes de priorizar por idade apenas. Três ordens representam 15% do estoque, mas podem concentrar o risco mais relevante. A proporção numérica não justifica alocar 15% do esforço sem avaliar intervenção necessária. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Executar primeiro as ordens mais antigas sem considerar consequência. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Uma ordem cosmética passa a indicar deterioração estrutural a investigar. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://asq.org/quality-progress/articles/back-to-basics-the-levels-of-fix?id=ecd2c74a676942bd82968f50568546c6",
      "https://asq.org/quality-resources/quality-glossary"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-conciliacao-de-umidade-na-producao-de-madeira",
    "title": "Conciliação de umidade na produção de madeira",
    "track": "industry",
    "role": "Analista de planejamento e qualidade industrial",
    "positioning": "specialist",
    "scenario": "Uma serraria uruguaia compara 1000 kg de madeira a 20% de umidade em base úmida com meta de 10%, sem perda de sólidos.",
    "decision": "Conservar oitocentos kg de sólidos e estimar massa final de 888,89 kg.",
    "misconception": "Reduzir a massa em dez por cento e declarar novecentos kg como resultado exato.",
    "changedConstraint": "O processo registra perda adicional de cavacos.",
    "tasks": [
      "Tabela de base de umidade",
      "Balanço de sólidos",
      "Estimativa de água removida",
      "Registro de cavacos e aparas",
      "Plano de pesagem por lote",
      "Nota de comparação com resultado real"
    ],
    "method": "A base de umidade precisa ser explicitada. Em base úmida, água integra o denominador; em base seca, o denominador são sólidos. Confundir convenções gera resultados incompatíveis. Mapeie a sequência produtiva distinguindo tempo de ciclo, preparação, fila e disponibilidade. A capacidade do fluxo depende da restrição que efetivamente limita a saída; aumentar produção antes do gargalo pode apenas elevar estoque em processo. Calcule indicadores com denominador consistente: retrabalho não é nova produção e peça rejeitada não integra saída conforme. Para investigar variação, estratifique por lote, turno, máquina e matéria-prima antes de atribuir uma causa. Uma correlação operacional sugere uma hipótese, mas não comprova falha de um componente. Defina regra de amostragem e preserve identificação do instrumento; resolução numérica não garante exatidão. Em manutenção e segurança, os exercícios limitam-se a documentação, análise e planejamento. Não execute intervenções, ensaios perigosos ou liberação de máquinas. Documente autorização necessária, condição de parada e especialista responsável. Entregue plano rastreável com critério de aceite, testes controlados e revisão após mudança de condição. A aplicação específica exige produzir tabela de base de umidade e verificar a ligação com estimativa de água removida. Compare sua conclusão com a regra do caso: Conservar oitocentos kg de sólidos e estimar massa final de 888,89 kg. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma serraria uruguaia compara 1000 kg de madeira a 20% de umidade em base úmida com meta de 10%, sem perda de sólidos. Resolução: Conservar oitocentos kg de sólidos e estimar massa final de 888,89 kg. Os oitocentos kg de sólidos representam 90% da massa final. Dividir por 0,90 fornece 888,89 kg. A água removida ideal é aproximadamente 111,11 kg. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Reduzir a massa em dez por cento e declarar novecentos kg como resultado exato. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O processo registra perda adicional de cavacos. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.fao.org/4/t1838e/t1838e0u.htm",
      "https://www.fao.org/4/s1250e/S1250E0u.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-corte-textil-por-aproveitamento",
    "title": "Planejamento de corte têxtil por aproveitamento",
    "track": "industry",
    "role": "Analista de planejamento e qualidade industrial",
    "positioning": "broad",
    "scenario": "Uma confecção paraguaia consome 500 metros de tecido e obtém peças equivalentes a 420 metros, com oitenta de retalhos.",
    "decision": "Registrar aproveitamento de 84% e mapear destinos dos retalhos sem chamá-los automaticamente de perda definitiva.",
    "misconception": "Declarar 16% de resíduo descartado sem verificar reaproveitamento.",
    "changedConstraint": "Parte dos retalhos atende a um produto secundário com demanda limitada.",
    "tasks": [
      "Plano de corte por referência",
      "Conciliação de tecido e retalho",
      "Indicador de aproveitamento primário",
      "Cadastro de aplicações secundárias",
      "Limite de demanda por retalho",
      "Comparação econômica dos destinos"
    ],
    "method": "Aproveitamento físico do produto principal não equivale a descarte total do material restante. Para avaliar circularidade, registre qualidade, quantidade e destino efetivo de cada fluxo secundário. Mapeie a sequência produtiva distinguindo tempo de ciclo, preparação, fila e disponibilidade. A capacidade do fluxo depende da restrição que efetivamente limita a saída; aumentar produção antes do gargalo pode apenas elevar estoque em processo. Calcule indicadores com denominador consistente: retrabalho não é nova produção e peça rejeitada não integra saída conforme. Para investigar variação, estratifique por lote, turno, máquina e matéria-prima antes de atribuir uma causa. Uma correlação operacional sugere uma hipótese, mas não comprova falha de um componente. Defina regra de amostragem e preserve identificação do instrumento; resolução numérica não garante exatidão. Em manutenção e segurança, os exercícios limitam-se a documentação, análise e planejamento. Não execute intervenções, ensaios perigosos ou liberação de máquinas. Documente autorização necessária, condição de parada e especialista responsável. Entregue plano rastreável com critério de aceite, testes controlados e revisão após mudança de condição. A aplicação específica exige produzir plano de corte por referência e verificar a ligação com indicador de aproveitamento primário. Compare sua conclusão com a regra do caso: Registrar aproveitamento de 84% e mapear destinos dos retalhos sem chamá-los automaticamente de perda definitiva. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma confecção paraguaia consome 500 metros de tecido e obtém peças equivalentes a 420 metros, com oitenta de retalhos. Resolução: Registrar aproveitamento de 84% e mapear destinos dos retalhos sem chamá-los automaticamente de perda definitiva. Quatrocentos e vinte divididos por quinhentos são 84%. O saldo de oitenta metros pode ter reaproveitamento, estoque ou descarte, cada qual com tratamento físico e econômico distinto. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Declarar 16% de resíduo descartado sem verificar reaproveitamento. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Parte dos retalhos atende a um produto secundário com demanda limitada. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.cec.org/flwm/method/mass-balance/",
      "https://www.nist.gov/mep/lean-and-process-improvement"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-analise-de-capacidade-em-impressao-de-embalagens",
    "title": "Análise de capacidade em impressão de embalagens",
    "track": "industry",
    "role": "Analista de planejamento e qualidade industrial",
    "positioning": "specialist",
    "scenario": "Uma gráfica equatoriana imprime 6000 folhas por hora, mas acabamento limita o fluxo a 4000 e o pedido tem 32000 folhas.",
    "decision": "Planejar no mínimo oito horas de acabamento, além de restrições de preparação e perdas.",
    "misconception": "Prometer prazo de 5,33 horas usando apenas velocidade de impressão.",
    "changedConstraint": "O pedido exige inspeção de mil folhas por hora em uma amostra de 8000.",
    "tasks": [
      "Roteiro de etapas gráficas",
      "Tabela de velocidades por recurso",
      "Memória do prazo restritivo",
      "Plano de lote intermediário",
      "Cronograma de inspeção",
      "Cenário de mudança de pedido"
    ],
    "method": "Velocidade de uma etapa não representa prazo de ponta a ponta. Modele a ordem de precedência, lotes de transferência e capacidade das atividades de saída, que podem limitar a entrega final. Mapeie a sequência produtiva distinguindo tempo de ciclo, preparação, fila e disponibilidade. A capacidade do fluxo depende da restrição que efetivamente limita a saída; aumentar produção antes do gargalo pode apenas elevar estoque em processo. Calcule indicadores com denominador consistente: retrabalho não é nova produção e peça rejeitada não integra saída conforme. Para investigar variação, estratifique por lote, turno, máquina e matéria-prima antes de atribuir uma causa. Uma correlação operacional sugere uma hipótese, mas não comprova falha de um componente. Defina regra de amostragem e preserve identificação do instrumento; resolução numérica não garante exatidão. Em manutenção e segurança, os exercícios limitam-se a documentação, análise e planejamento. Não execute intervenções, ensaios perigosos ou liberação de máquinas. Documente autorização necessária, condição de parada e especialista responsável. Entregue plano rastreável com critério de aceite, testes controlados e revisão após mudança de condição. A aplicação específica exige produzir roteiro de etapas gráficas e verificar a ligação com memória do prazo restritivo. Compare sua conclusão com a regra do caso: Planejar no mínimo oito horas de acabamento, além de restrições de preparação e perdas. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma gráfica equatoriana imprime 6000 folhas por hora, mas acabamento limita o fluxo a 4000 e o pedido tem 32000 folhas. Resolução: Planejar no mínimo oito horas de acabamento, além de restrições de preparação e perdas. Trinta e duas mil divididas por quatro mil exigem oito horas no acabamento. O cálculo da impressão descreve apenas uma etapa e não sustenta o prazo total. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Prometer prazo de 5,33 horas usando apenas velocidade de impressão. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O pedido exige inspeção de mil folhas por hora em uma amostra de 8000. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.nist.gov/mep/value-stream-mapping",
      "https://developers.google.com/optimization/routing/cvrptw_resources"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-rastreabilidade-de-componentes-em-reparacao-de-eletronicos",
    "title": "Rastreabilidade de componentes em reparação de eletrônicos",
    "track": "industry",
    "role": "Analista de planejamento e qualidade industrial",
    "positioning": "specialist",
    "scenario": "Uma oficina brasileira troca componentes de trinta aparelhos e registra dez peças sem fornecedor identificado.",
    "decision": "Separar as peças sem procedência e reconstruir quais aparelhos as receberam antes de declarar rastreabilidade completa.",
    "misconception": "Atribuir todas as peças ao fornecedor habitual sem comprovação.",
    "changedConstraint": "Um fornecedor informa desvio em um lote já utilizado.",
    "tasks": [
      "Cadastro de componentes recebidos",
      "Vínculo de peça a aparelho",
      "Mapa de fornecedor e lote",
      "Registro de intervenção documental",
      "Simulação de localização de afetados",
      "Plano de lacunas de procedência"
    ],
    "method": "Rastreabilidade na reparação conecta peça recebida, intervenção e aparelho de destino. O fornecedor habitual não é evidência de origem. Preserve lacunas em vez de fabricar um histórico plausível. Mapeie a sequência produtiva distinguindo tempo de ciclo, preparação, fila e disponibilidade. A capacidade do fluxo depende da restrição que efetivamente limita a saída; aumentar produção antes do gargalo pode apenas elevar estoque em processo. Calcule indicadores com denominador consistente: retrabalho não é nova produção e peça rejeitada não integra saída conforme. Para investigar variação, estratifique por lote, turno, máquina e matéria-prima antes de atribuir uma causa. Uma correlação operacional sugere uma hipótese, mas não comprova falha de um componente. Defina regra de amostragem e preserve identificação do instrumento; resolução numérica não garante exatidão. Em manutenção e segurança, os exercícios limitam-se a documentação, análise e planejamento. Não execute intervenções, ensaios perigosos ou liberação de máquinas. Documente autorização necessária, condição de parada e especialista responsável. Entregue plano rastreável com critério de aceite, testes controlados e revisão após mudança de condição. A aplicação específica exige produzir cadastro de componentes recebidos e verificar a ligação com mapa de fornecedor e lote. Compare sua conclusão com a regra do caso: Separar as peças sem procedência e reconstruir quais aparelhos as receberam antes de declarar rastreabilidade completa. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma oficina brasileira troca componentes de trinta aparelhos e registra dez peças sem fornecedor identificado. Resolução: Separar as peças sem procedência e reconstruir quais aparelhos as receberam antes de declarar rastreabilidade completa. Dez peças sem origem representam um terço do conjunto de trinta se houver uma peça por aparelho, hipótese que precisa ser confirmada. A lista de destinos permite limitar a investigação. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Atribuir todas as peças ao fornecedor habitual sem comprovação. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Um fornecedor informa desvio em um lote já utilizado. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.unido.org/learning-resources/building-trust-conformity-assessment-toolbox",
      "https://hub.unido.org/quality-infrastructure-training"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-analise-de-rendimento-em-transformacao-de-plasticos-reciclados",
    "title": "Análise de rendimento em transformação de plásticos reciclados",
    "track": "industry",
    "role": "Analista de planejamento e qualidade industrial",
    "positioning": "specialist",
    "scenario": "Uma operação argentina recebe 1500 kg de material, remove 300 de contaminação e produz 1080 kg de grânulos.",
    "decision": "Separar elegibilidade de 80% e rendimento de transformação de 90% sobre os 1200 kg elegíveis.",
    "misconception": "Divulgar apenas 72% como eficiência do processo sem distinguir triagem.",
    "changedConstraint": "O próximo lote traz 30% de contaminação.",
    "tasks": [
      "Balanço de material recebido",
      "Registro de rejeitos da triagem",
      "Massa elegível por lote",
      "Rendimento da transformação",
      "Comparação de qualidade de entrada",
      "Plano de melhoria por etapa"
    ],
    "method": "Dois rendimentos seriados respondem a perguntas diferentes. O rendimento global resulta do produto entre elegibilidade e conversão. Ação de melhoria depende de localizar em qual etapa a massa é removida. Mapeie a sequência produtiva distinguindo tempo de ciclo, preparação, fila e disponibilidade. A capacidade do fluxo depende da restrição que efetivamente limita a saída; aumentar produção antes do gargalo pode apenas elevar estoque em processo. Calcule indicadores com denominador consistente: retrabalho não é nova produção e peça rejeitada não integra saída conforme. Para investigar variação, estratifique por lote, turno, máquina e matéria-prima antes de atribuir uma causa. Uma correlação operacional sugere uma hipótese, mas não comprova falha de um componente. Defina regra de amostragem e preserve identificação do instrumento; resolução numérica não garante exatidão. Em manutenção e segurança, os exercícios limitam-se a documentação, análise e planejamento. Não execute intervenções, ensaios perigosos ou liberação de máquinas. Documente autorização necessária, condição de parada e especialista responsável. Entregue plano rastreável com critério de aceite, testes controlados e revisão após mudança de condição. A aplicação específica exige produzir balanço de material recebido e verificar a ligação com massa elegível por lote. Compare sua conclusão com a regra do caso: Separar elegibilidade de 80% e rendimento de transformação de 90% sobre os 1200 kg elegíveis. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma operação argentina recebe 1500 kg de material, remove 300 de contaminação e produz 1080 kg de grânulos. Resolução: Separar elegibilidade de 80% e rendimento de transformação de 90% sobre os 1200 kg elegíveis. Mil e duzentos sobre mil e quinhentos são 80%. Mil e oitenta sobre mil e duzentos são 90%. O global de 72% combina ambos e não identifica sozinho o gargalo. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Divulgar apenas 72% como eficiência do processo sem distinguir triagem. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O próximo lote traz 30% de contaminação. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.cec.org/flwm/method/mass-balance/",
      "https://www.nist.gov/mep/value-stream-mapping"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-coordenacao-administrativa-de-teleatendimento-em-zonas-rurais",
    "title": "Coordenação administrativa de teleatendimento em zonas rurais",
    "track": "care",
    "role": "Coordenador de operações de serviços comunitários",
    "positioning": "broad",
    "scenario": "Um serviço colombiano agenda sessenta sessões de vinte minutos com capacidade de quatrocentos minutos por profissional e dois profissionais.",
    "decision": "Identificar demanda de 1200 minutos e capacidade de oitocentos, negociando quarenta sessões no modelo sem transições.",
    "misconception": "Confirmar todas as sessenta sessões porque há dois profissionais.",
    "changedConstraint": "A conexão de uma localidade exige cinco minutos extras por sessão.",
    "tasks": [
      "Mapa de sessões e duração",
      "Calendário de profissionais",
      "Balanço de capacidade administrativa",
      "Plano de prioridade e encaminhamento",
      "Roteiro de confirmação de acesso",
      "Cenário de tempo de conexão"
    ],
    "method": "Planeje sessões pelo tempo de ocupação total, incluindo preparação e transição. A coordenação não define prioridade clínica; critérios assistenciais devem vir do serviço responsável. Organize o serviço como uma jornada com entrada, consentimento, encaminhamento, atendimento e retorno. Diferencie necessidade informada, elegibilidade documentada e decisão clínica: coordenação administrativa não autoriza diagnóstico ou prescrição. Planeje capacidade usando duração total, transição e pausas, sem tratar toda ausência como capacidade recuperável. Em listas de espera, defina critérios transparentes de prioridade e escale situações de risco aos profissionais apropriados. Trabalhe com dados fictícios e minimize atributos pessoais; não exponha informação sensível para demonstrar um painel. Meça acesso, continuidade e conclusão por grupos relevantes sem identificar pessoas. Uma taxa de satisfação não substitui resultado assistencial nem prova de segurança. Registre responsável, prazo e confirmação do encaminhamento; enviar uma mensagem não garante que o serviço recebeu ou aceitou o caso. Teste a jornada com falta de documentação, indisponibilidade e mudança de endereço. Entregue protocolo administrativo verificável e limites de atuação. A aplicação específica exige produzir mapa de sessões e duração e verificar a ligação com balanço de capacidade administrativa. Compare sua conclusão com a regra do caso: Identificar demanda de 1200 minutos e capacidade de oitocentos, negociando quarenta sessões no modelo sem transições. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um serviço colombiano agenda sessenta sessões de vinte minutos com capacidade de quatrocentos minutos por profissional e dois profissionais. Resolução: Identificar demanda de 1200 minutos e capacidade de oitocentos, negociando quarenta sessões no modelo sem transições. Sessenta vezes vinte requerem 1200 minutos. Dois profissionais com quatrocentos minutos fornecem oitocentos. No modelo inicial cabem quarenta sessões, antes de tempo técnico adicional. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Confirmar todas as sessenta sessões porque há dois profissionais. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A conexão de uma localidade exige cinco minutos extras por sessão. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.who.int/publications-detail-redirect/9789240059184",
      "https://developers.google.com/optimization/routing/cvrptw_resources"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-gestao-de-encaminhamentos-para-reabilitacao-comunitaria",
    "title": "Gestão de encaminhamentos para reabilitação comunitária",
    "track": "care",
    "role": "Coordenador de operações de serviços comunitários",
    "positioning": "specialist",
    "scenario": "Uma rede peruana emite cem encaminhamentos; setenta são recebidos pelo serviço de destino e cinquenta têm agendamento confirmado.",
    "decision": "Distinguir emissão, recebimento e agendamento e relatar cinquenta confirmações de agenda.",
    "misconception": "Divulgar cem pessoas atendidas porque houve emissão de encaminhamento.",
    "changedConstraint": "Dez agendamentos são devolvidos por documentação incompleta.",
    "tasks": [
      "Mapa de etapas do encaminhamento",
      "Registro de confirmação de recebimento",
      "Lista de pendências documentais",
      "Indicador de agendamento confirmado",
      "Fluxo de retorno à origem",
      "Painel de continuidade administrativa"
    ],
    "method": "Encaminhamento é um processo de múltiplas confirmações. Enviar documento não prova recebimento, e agendar não prova atendimento. Preserve o estado e a responsabilidade de cada transição. Organize o serviço como uma jornada com entrada, consentimento, encaminhamento, atendimento e retorno. Diferencie necessidade informada, elegibilidade documentada e decisão clínica: coordenação administrativa não autoriza diagnóstico ou prescrição. Planeje capacidade usando duração total, transição e pausas, sem tratar toda ausência como capacidade recuperável. Em listas de espera, defina critérios transparentes de prioridade e escale situações de risco aos profissionais apropriados. Trabalhe com dados fictícios e minimize atributos pessoais; não exponha informação sensível para demonstrar um painel. Meça acesso, continuidade e conclusão por grupos relevantes sem identificar pessoas. Uma taxa de satisfação não substitui resultado assistencial nem prova de segurança. Registre responsável, prazo e confirmação do encaminhamento; enviar uma mensagem não garante que o serviço recebeu ou aceitou o caso. Teste a jornada com falta de documentação, indisponibilidade e mudança de endereço. Entregue protocolo administrativo verificável e limites de atuação. A aplicação específica exige produzir mapa de etapas do encaminhamento e verificar a ligação com lista de pendências documentais. Compare sua conclusão com a regra do caso: Distinguir emissão, recebimento e agendamento e relatar cinquenta confirmações de agenda. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma rede peruana emite cem encaminhamentos; setenta são recebidos pelo serviço de destino e cinquenta têm agendamento confirmado. Resolução: Distinguir emissão, recebimento e agendamento e relatar cinquenta confirmações de agenda. Setenta por cento têm recebimento registrado e cinquenta por cento têm agendamento. A diferença de vinte entre recebimento e agenda é uma fila específica a investigar. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Divulgar cem pessoas atendidas porque houve emissão de encaminhamento. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Dez agendamentos são devolvidos por documentação incompleta. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.who.int/publications/i/item/9789241514033",
      "https://www.gov.uk/service-manual/measuring-success/measuring-completion-rate"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-transporte-nao-emergencial-para-idosos",
    "title": "Planejamento de transporte não emergencial para idosos",
    "track": "care",
    "role": "Coordenador de operações de serviços comunitários",
    "positioning": "specialist",
    "scenario": "Uma rede uruguaia possui doze vagas por viagem e prevê 35 passageiros com acompanhante obrigatório para dez deles.",
    "decision": "Planejar 45 lugares ocupados e no mínimo quatro viagens no modelo agregado.",
    "misconception": "Programar três viagens contando somente os usuários principais.",
    "changedConstraint": "Cinco pessoas precisam de configuração de assento diferente.",
    "tasks": [
      "Cadastro de necessidades de transporte",
      "Tabela de passageiros e acompanhantes",
      "Cálculo de ocupação por viagem",
      "Plano de agrupamento por horário",
      "Confirmação de acessibilidade do veículo",
      "Roteiro de contingência de ausência"
    ],
    "method": "Capacidade depende de lugares efetivamente ocupados e configuração compatível. Acompanhantes não podem ser ignorados. O plano agregado deve ser refinado por localização, horário e condições de acesso. Organize o serviço como uma jornada com entrada, consentimento, encaminhamento, atendimento e retorno. Diferencie necessidade informada, elegibilidade documentada e decisão clínica: coordenação administrativa não autoriza diagnóstico ou prescrição. Planeje capacidade usando duração total, transição e pausas, sem tratar toda ausência como capacidade recuperável. Em listas de espera, defina critérios transparentes de prioridade e escale situações de risco aos profissionais apropriados. Trabalhe com dados fictícios e minimize atributos pessoais; não exponha informação sensível para demonstrar um painel. Meça acesso, continuidade e conclusão por grupos relevantes sem identificar pessoas. Uma taxa de satisfação não substitui resultado assistencial nem prova de segurança. Registre responsável, prazo e confirmação do encaminhamento; enviar uma mensagem não garante que o serviço recebeu ou aceitou o caso. Teste a jornada com falta de documentação, indisponibilidade e mudança de endereço. Entregue protocolo administrativo verificável e limites de atuação. A aplicação específica exige produzir cadastro de necessidades de transporte e verificar a ligação com cálculo de ocupação por viagem. Compare sua conclusão com a regra do caso: Planejar 45 lugares ocupados e no mínimo quatro viagens no modelo agregado. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma rede uruguaia possui doze vagas por viagem e prevê 35 passageiros com acompanhante obrigatório para dez deles. Resolução: Planejar 45 lugares ocupados e no mínimo quatro viagens no modelo agregado. Trinta e cinco usuários mais dez acompanhantes são 45 ocupantes. Três viagens oferecem 36 lugares, insuficientes; quatro oferecem 48 no modelo simplificado. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Programar três viagens contando somente os usuários principais. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Cinco pessoas precisam de configuração de assento diferente. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.who.int/publications/i/item/9789240103726",
      "https://developers.google.com/optimization/pack/bin_packing"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-organizacao-de-agendas-de-apoio-a-cuidadores-familiares",
    "title": "Organização de agendas de apoio a cuidadores familiares",
    "track": "care",
    "role": "Coordenador de operações de serviços comunitários",
    "positioning": "specialist",
    "scenario": "Um centro brasileiro oferece 24 encontros e recebe quarenta inscrições; oito pessoas podem participar de dois horários e 32 só de um.",
    "decision": "Planejar alocação por compatibilidade de horário e manter fila explícita, sem contar flexibilidade como vaga adicional.",
    "misconception": "Afirmar atendimento de quarenta porque oito têm duas opções.",
    "changedConstraint": "Seis pessoas mudam disponibilidade após receber confirmação.",
    "tasks": [
      "Matriz de disponibilidade por inscrito",
      "Inventário de vagas por horário",
      "Regra transparente de alocação",
      "Fila de espera com confirmação",
      "Roteiro de reagendamento",
      "Indicador de ocupação efetiva"
    ],
    "method": "Disponibilidade múltipla aumenta flexibilidade de alocação, mas não capacidade. A confirmação deve vincular pessoa e encontro sem duplicar assento; critérios de prioridade precisam ser previamente definidos. Organize o serviço como uma jornada com entrada, consentimento, encaminhamento, atendimento e retorno. Diferencie necessidade informada, elegibilidade documentada e decisão clínica: coordenação administrativa não autoriza diagnóstico ou prescrição. Planeje capacidade usando duração total, transição e pausas, sem tratar toda ausência como capacidade recuperável. Em listas de espera, defina critérios transparentes de prioridade e escale situações de risco aos profissionais apropriados. Trabalhe com dados fictícios e minimize atributos pessoais; não exponha informação sensível para demonstrar um painel. Meça acesso, continuidade e conclusão por grupos relevantes sem identificar pessoas. Uma taxa de satisfação não substitui resultado assistencial nem prova de segurança. Registre responsável, prazo e confirmação do encaminhamento; enviar uma mensagem não garante que o serviço recebeu ou aceitou o caso. Teste a jornada com falta de documentação, indisponibilidade e mudança de endereço. Entregue protocolo administrativo verificável e limites de atuação. A aplicação específica exige produzir matriz de disponibilidade por inscrito e verificar a ligação com regra transparente de alocação. Compare sua conclusão com a regra do caso: Planejar alocação por compatibilidade de horário e manter fila explícita, sem contar flexibilidade como vaga adicional. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um centro brasileiro oferece 24 encontros e recebe quarenta inscrições; oito pessoas podem participar de dois horários e 32 só de um. Resolução: Planejar alocação por compatibilidade de horário e manter fila explícita, sem contar flexibilidade como vaga adicional. Há quarenta demandas para 24 lugares, déficit agregado de dezesseis. As oito pessoas flexíveis ajudam a encaixar horários, mas continuam representando oito participantes. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Afirmar atendimento de quarenta porque oito têm duas opções. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Seis pessoas mudam disponibilidade após receber confirmação. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.who.int/publications/i/item/9789240103726",
      "https://developers.google.com/optimization/routing/cvrptw_resources"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-controle-documental-de-emprestimo-de-tecnologias-assistivas",
    "title": "Controle documental de empréstimo de tecnologias assistivas",
    "track": "care",
    "role": "Coordenador de operações de serviços comunitários",
    "positioning": "broad",
    "scenario": "Um programa chileno possui oitenta itens, vinte emprestados, dez em manutenção e cinco reservados, sem sobreposição.",
    "decision": "Apresentar 45 itens disponíveis e manter avaliação especializada de adequação antes do empréstimo.",
    "misconception": "Oferecer sessenta itens porque só descontou os emprestados.",
    "changedConstraint": "Quatro itens disponíveis perdem documentação de inspeção.",
    "tasks": [
      "Cadastro individual de equipamentos",
      "Mapa de empréstimo e devolução",
      "Fila de manutenção documental",
      "Reserva por solicitação",
      "Cálculo de disponibilidade elegível",
      "Fluxo de avaliação por responsável"
    ],
    "method": "Inventário de tecnologia assistiva precisa combinar estado físico, documentação e adequação ao usuário. Disponibilidade administrativa não comprova indicação clínica ou segurança de uso. Organize o serviço como uma jornada com entrada, consentimento, encaminhamento, atendimento e retorno. Diferencie necessidade informada, elegibilidade documentada e decisão clínica: coordenação administrativa não autoriza diagnóstico ou prescrição. Planeje capacidade usando duração total, transição e pausas, sem tratar toda ausência como capacidade recuperável. Em listas de espera, defina critérios transparentes de prioridade e escale situações de risco aos profissionais apropriados. Trabalhe com dados fictícios e minimize atributos pessoais; não exponha informação sensível para demonstrar um painel. Meça acesso, continuidade e conclusão por grupos relevantes sem identificar pessoas. Uma taxa de satisfação não substitui resultado assistencial nem prova de segurança. Registre responsável, prazo e confirmação do encaminhamento; enviar uma mensagem não garante que o serviço recebeu ou aceitou o caso. Teste a jornada com falta de documentação, indisponibilidade e mudança de endereço. Entregue protocolo administrativo verificável e limites de atuação. A aplicação específica exige produzir cadastro individual de equipamentos e verificar a ligação com fila de manutenção documental. Compare sua conclusão com a regra do caso: Apresentar 45 itens disponíveis e manter avaliação especializada de adequação antes do empréstimo. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um programa chileno possui oitenta itens, vinte emprestados, dez em manutenção e cinco reservados, sem sobreposição. Resolução: Apresentar 45 itens disponíveis e manter avaliação especializada de adequação antes do empréstimo. Oitenta menos vinte menos dez menos cinco são 45. Se quatro não têm inspeção documentada, a quantidade pronta para seguir o fluxo deve ser reavaliada com o responsável. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Oferecer sessenta itens porque só descontou os emprestados. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Quatro itens disponíveis perdem documentação de inspeção. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.who.int/publications/i/item/9789240020283",
      "https://www.who.int/publications/i/item/9789240013988"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-gestao-de-frequencia-em-centros-de-convivencia",
    "title": "Gestão de frequência em centros de convivência",
    "track": "care",
    "role": "Coordenador de operações de serviços comunitários",
    "positioning": "specialist",
    "scenario": "Um centro argentino tem cem inscritos, sessenta frequentadores únicos no mês e duzentas presenças registradas.",
    "decision": "Relatar alcance de sessenta pessoas e média de 3,33 presenças entre frequentadores.",
    "misconception": "Divulgar duzentas pessoas atendidas somando visitas repetidas.",
    "changedConstraint": "Dez inscrições pertencem à mesma pessoa com cadastro duplicado.",
    "tasks": [
      "Cadastro de participantes únicos",
      "Registro de presenças por encontro",
      "Regra de deduplicação",
      "Indicador de alcance mensal",
      "Distribuição de frequência individual",
      "Nota de limites de participação"
    ],
    "method": "Pessoa, inscrição e presença são unidades diferentes. O alcance conta indivíduos únicos; intensidade de participação conta eventos por indivíduo. A escolha do denominador precisa acompanhar o nome do indicador. Organize o serviço como uma jornada com entrada, consentimento, encaminhamento, atendimento e retorno. Diferencie necessidade informada, elegibilidade documentada e decisão clínica: coordenação administrativa não autoriza diagnóstico ou prescrição. Planeje capacidade usando duração total, transição e pausas, sem tratar toda ausência como capacidade recuperável. Em listas de espera, defina critérios transparentes de prioridade e escale situações de risco aos profissionais apropriados. Trabalhe com dados fictícios e minimize atributos pessoais; não exponha informação sensível para demonstrar um painel. Meça acesso, continuidade e conclusão por grupos relevantes sem identificar pessoas. Uma taxa de satisfação não substitui resultado assistencial nem prova de segurança. Registre responsável, prazo e confirmação do encaminhamento; enviar uma mensagem não garante que o serviço recebeu ou aceitou o caso. Teste a jornada com falta de documentação, indisponibilidade e mudança de endereço. Entregue protocolo administrativo verificável e limites de atuação. A aplicação específica exige produzir cadastro de participantes únicos e verificar a ligação com regra de deduplicação. Compare sua conclusão com a regra do caso: Relatar alcance de sessenta pessoas e média de 3,33 presenças entre frequentadores. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um centro argentino tem cem inscritos, sessenta frequentadores únicos no mês e duzentas presenças registradas. Resolução: Relatar alcance de sessenta pessoas e média de 3,33 presenças entre frequentadores. Duzentas presenças divididas por sessenta pessoas resultam em aproximadamente 3,33. Isso não significa que todos compareceram três vezes nem informa qualidade do serviço. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Divulgar duzentas pessoas atendidas somando visitas repetidas. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Dez inscrições pertencem à mesma pessoa com cadastro duplicado. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.gov.uk/service-manual/measuring-success/measuring-completion-rate",
      "https://www.gov.uk/service-manual/measuring-success/how-to-set-performance-metrics-for-your-service"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-coordenacao-de-apoio-administrativo-a-migrantes",
    "title": "Coordenação de apoio administrativo a migrantes",
    "track": "care",
    "role": "Coordenador de operações de serviços comunitários",
    "positioning": "specialist",
    "scenario": "Um serviço equatoriano recebe oitenta solicitações: trinta sobre documentos, vinte sobre matrícula e trinta fora do escopo institucional.",
    "decision": "Encaminhar as trinta fora do escopo por canal validado e organizar as cinquenta restantes por finalidade.",
    "misconception": "Dar respostas jurídicas conclusivas para encerrar todos os casos.",
    "changedConstraint": "Uma regra pública de documentação muda durante a semana.",
    "tasks": [
      "Taxonomia de solicitações",
      "Mapa de fontes oficiais por tema",
      "Fluxo de encaminhamento externo",
      "Controle de edição de orientações",
      "Registro de confirmação de recepção",
      "Painel de pendências por responsável"
    ],
    "method": "Atendimento administrativo pode orientar acesso a informação oficial e encaminhamento, sem substituir consultoria jurídica ou autoridade pública. A data de validade da orientação deve acompanhar a informação. Organize o serviço como uma jornada com entrada, consentimento, encaminhamento, atendimento e retorno. Diferencie necessidade informada, elegibilidade documentada e decisão clínica: coordenação administrativa não autoriza diagnóstico ou prescrição. Planeje capacidade usando duração total, transição e pausas, sem tratar toda ausência como capacidade recuperável. Em listas de espera, defina critérios transparentes de prioridade e escale situações de risco aos profissionais apropriados. Trabalhe com dados fictícios e minimize atributos pessoais; não exponha informação sensível para demonstrar um painel. Meça acesso, continuidade e conclusão por grupos relevantes sem identificar pessoas. Uma taxa de satisfação não substitui resultado assistencial nem prova de segurança. Registre responsável, prazo e confirmação do encaminhamento; enviar uma mensagem não garante que o serviço recebeu ou aceitou o caso. Teste a jornada com falta de documentação, indisponibilidade e mudança de endereço. Entregue protocolo administrativo verificável e limites de atuação. A aplicação específica exige produzir taxonomia de solicitações e verificar a ligação com fluxo de encaminhamento externo. Compare sua conclusão com a regra do caso: Encaminhar as trinta fora do escopo por canal validado e organizar as cinquenta restantes por finalidade. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um serviço equatoriano recebe oitenta solicitações: trinta sobre documentos, vinte sobre matrícula e trinta fora do escopo institucional. Resolução: Encaminhar as trinta fora do escopo por canal validado e organizar as cinquenta restantes por finalidade. Trinta mais vinte resultam em cinquenta casos dentro do escopo descrito. Os outros trinta exigem encaminhamento documentado; encerramento interno não deve ser anunciado como solução externa. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Dar respostas jurídicas conclusivas para encerrar todos os casos. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Uma regra pública de documentação muda durante a semana. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.unhcr.org/resettlement-handbook/2-managing-resettlement-activities/2-4-communication-with-communities-about-resettlement/",
      "https://www.unhcr.org/resettlement-handbook/2-managing-resettlement-activities/2-5-file-management-and-record-keeping/"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-entrega-de-refeicoes-em-programas-sociais",
    "title": "Planejamento de entrega de refeições em programas sociais",
    "track": "care",
    "role": "Coordenador de operações de serviços comunitários",
    "positioning": "specialist",
    "scenario": "Um programa boliviano oferece 300 refeições por dia e tem 340 beneficiários elegíveis confirmados.",
    "decision": "Identificar déficit diário de quarenta refeições e aplicar regra transparente de alocação com responsável do programa.",
    "misconception": "Registrar todos como atendidos porque estão cadastrados.",
    "changedConstraint": "Vinte beneficiários passam a precisar de formato alimentar específico.",
    "tasks": [
      "Lista de elegibilidade atualizada",
      "Plano diário de refeições",
      "Matriz de restrições comunicadas",
      "Regra de alocação e confirmação",
      "Registro de entrega por dia",
      "Plano de escalonamento de déficit"
    ],
    "method": "Elegibilidade não demonstra recebimento. Separe cadastro, programação e entrega efetiva. Restrições alimentares exigem orientação responsável e não devem ser improvisadas pela coordenação administrativa. Organize o serviço como uma jornada com entrada, consentimento, encaminhamento, atendimento e retorno. Diferencie necessidade informada, elegibilidade documentada e decisão clínica: coordenação administrativa não autoriza diagnóstico ou prescrição. Planeje capacidade usando duração total, transição e pausas, sem tratar toda ausência como capacidade recuperável. Em listas de espera, defina critérios transparentes de prioridade e escale situações de risco aos profissionais apropriados. Trabalhe com dados fictícios e minimize atributos pessoais; não exponha informação sensível para demonstrar um painel. Meça acesso, continuidade e conclusão por grupos relevantes sem identificar pessoas. Uma taxa de satisfação não substitui resultado assistencial nem prova de segurança. Registre responsável, prazo e confirmação do encaminhamento; enviar uma mensagem não garante que o serviço recebeu ou aceitou o caso. Teste a jornada com falta de documentação, indisponibilidade e mudança de endereço. Entregue protocolo administrativo verificável e limites de atuação. A aplicação específica exige produzir lista de elegibilidade atualizada e verificar a ligação com matriz de restrições comunicadas. Compare sua conclusão com a regra do caso: Identificar déficit diário de quarenta refeições e aplicar regra transparente de alocação com responsável do programa. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um programa boliviano oferece 300 refeições por dia e tem 340 beneficiários elegíveis confirmados. Resolução: Identificar déficit diário de quarenta refeições e aplicar regra transparente de alocação com responsável do programa. Trezentas vagas diárias diante de 340 pessoas deixam quarenta sem atendimento no mesmo dia. O relatório deve preservar a lacuna e a decisão adotada para enfrentá-la. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Registrar todos como atendidos porque estão cadastrados. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Vinte beneficiários passam a precisar de formato alimentar específico. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://developers.google.com/optimization/routing/cvrptw_resources",
      "https://www.gov.uk/service-manual/measuring-success/measuring-completion-rate"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-gestao-de-visitas-domiciliares-com-consentimento-documentado",
    "title": "Gestão de visitas domiciliares com consentimento documentado",
    "track": "care",
    "role": "Coordenador de operações de serviços comunitários",
    "positioning": "broad",
    "scenario": "Uma equipe paraguaia planeja cinquenta visitas; quarenta possuem consentimento válido e dez estão pendentes de confirmação.",
    "decision": "Programar apenas visitas que atendem ao fluxo de consentimento e manter dez pendentes para contato apropriado.",
    "misconception": "Marcar todas como autorizadas com base no cadastro anterior.",
    "changedConstraint": "Cinco consentimentos são revogados antes da data programada.",
    "tasks": [
      "Mapa de solicitações de visita",
      "Registro de consentimento e validade",
      "Calendário de confirmação",
      "Fluxo de revogação",
      "Lista de pendências de contato",
      "Indicador de visita efetivamente realizada"
    ],
    "method": "Consentimento precisa ter finalidade, momento e possibilidade de revogação compatíveis com o serviço. Um registro histórico não autoriza automaticamente uma nova visita em contexto diferente. Organize o serviço como uma jornada com entrada, consentimento, encaminhamento, atendimento e retorno. Diferencie necessidade informada, elegibilidade documentada e decisão clínica: coordenação administrativa não autoriza diagnóstico ou prescrição. Planeje capacidade usando duração total, transição e pausas, sem tratar toda ausência como capacidade recuperável. Em listas de espera, defina critérios transparentes de prioridade e escale situações de risco aos profissionais apropriados. Trabalhe com dados fictícios e minimize atributos pessoais; não exponha informação sensível para demonstrar um painel. Meça acesso, continuidade e conclusão por grupos relevantes sem identificar pessoas. Uma taxa de satisfação não substitui resultado assistencial nem prova de segurança. Registre responsável, prazo e confirmação do encaminhamento; enviar uma mensagem não garante que o serviço recebeu ou aceitou o caso. Teste a jornada com falta de documentação, indisponibilidade e mudança de endereço. Entregue protocolo administrativo verificável e limites de atuação. A aplicação específica exige produzir mapa de solicitações de visita e verificar a ligação com calendário de confirmação. Compare sua conclusão com a regra do caso: Programar apenas visitas que atendem ao fluxo de consentimento e manter dez pendentes para contato apropriado. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma equipe paraguaia planeja cinquenta visitas; quarenta possuem consentimento válido e dez estão pendentes de confirmação. Resolução: Programar apenas visitas que atendem ao fluxo de consentimento e manter dez pendentes para contato apropriado. Quarenta de cinquenta estão aptas a seguir o fluxo na fotografia inicial, equivalendo a 80%. Cinco revogações reduzem esse conjunto e exigem atualização imediata do calendário. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Marcar todas como autorizadas com base no cadastro anterior. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Cinco consentimentos são revogados antes da data programada. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.unhcr.org/resettlement-handbook/2-managing-resettlement-activities/2-5-file-management-and-record-keeping/",
      "https://www.who.int/publications/i/item/9789241514033"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-organizacao-de-continuidade-de-cuidado-apos-alta-administrativa",
    "title": "Organização de continuidade de cuidado após alta administrativa",
    "track": "care",
    "role": "Coordenador de operações de serviços comunitários",
    "positioning": "specialist",
    "scenario": "Uma rede brasileira recebe setenta avisos de alta; 45 têm consulta de seguimento marcada e 25 ainda não possuem confirmação.",
    "decision": "Relatar 45 marcações e abrir acompanhamento administrativo das 25 pendentes, sem presumir descontinuidade clínica definitiva.",
    "misconception": "Declarar todos os setenta acompanhados porque o aviso de alta foi recebido.",
    "changedConstraint": "Dez pacientes mudam de município de referência.",
    "tasks": [
      "Registro de avisos recebidos",
      "Mapa de serviço de referência",
      "Conciliação de consultas marcadas",
      "Fila de confirmação de seguimento",
      "Fluxo de mudança territorial",
      "Painel de continuidade por etapa"
    ],
    "method": "Recepção de aviso, marcação e comparecimento são marcos distintos. A equipe administrativa acompanha transições e pendências; decisões clínicas e prazos assistenciais precisam vir do responsável habilitado. Organize o serviço como uma jornada com entrada, consentimento, encaminhamento, atendimento e retorno. Diferencie necessidade informada, elegibilidade documentada e decisão clínica: coordenação administrativa não autoriza diagnóstico ou prescrição. Planeje capacidade usando duração total, transição e pausas, sem tratar toda ausência como capacidade recuperável. Em listas de espera, defina critérios transparentes de prioridade e escale situações de risco aos profissionais apropriados. Trabalhe com dados fictícios e minimize atributos pessoais; não exponha informação sensível para demonstrar um painel. Meça acesso, continuidade e conclusão por grupos relevantes sem identificar pessoas. Uma taxa de satisfação não substitui resultado assistencial nem prova de segurança. Registre responsável, prazo e confirmação do encaminhamento; enviar uma mensagem não garante que o serviço recebeu ou aceitou o caso. Teste a jornada com falta de documentação, indisponibilidade e mudança de endereço. Entregue protocolo administrativo verificável e limites de atuação. A aplicação específica exige produzir registro de avisos recebidos e verificar a ligação com conciliação de consultas marcadas. Compare sua conclusão com a regra do caso: Relatar 45 marcações e abrir acompanhamento administrativo das 25 pendentes, sem presumir descontinuidade clínica definitiva. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma rede brasileira recebe setenta avisos de alta; 45 têm consulta de seguimento marcada e 25 ainda não possuem confirmação. Resolução: Relatar 45 marcações e abrir acompanhamento administrativo das 25 pendentes, sem presumir descontinuidade clínica definitiva. Quarenta e cinco sobre setenta correspondem a cerca de 64,29% com marcação registrada. As 25 pendentes precisam de verificação sem inferir que nenhuma recebeu atendimento por outro canal. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Declarar todos os setenta acompanhados porque o aviso de alta foi recebido. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Dez pacientes mudam de município de referência. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.who.int/publications/i/item/9789241514033",
      "https://www.gov.uk/service-manual/measuring-success/measuring-completion-rate"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-producao-de-guias-bilingues-para-turismo-de-base-comunitaria",
    "title": "Produção de guias bilíngues para turismo de base comunitária",
    "track": "content",
    "role": "Especialista em conteúdo e comunicação regional",
    "positioning": "specialist",
    "scenario": "Um guia peruano possui vinte instruções e a tradução omite quatro restrições de acesso a áreas comunitárias.",
    "decision": "Revisar as quatro omissões e exigir equivalência de restrições antes da publicação.",
    "misconception": "Aprovar a tradução porque o texto ficou mais curto e fluente.",
    "changedConstraint": "A comunidade altera uma regra de visita após a versão impressa.",
    "tasks": [
      "Inventário de instruções e restrições",
      "Glossário validado pela comunidade",
      "Matriz de equivalência bilíngue",
      "Lista de divergências de sentido",
      "Plano de atualização de versões",
      "Teste de compreensão de visitante"
    ],
    "method": "Tradução funcional precisa preservar ação, condição e limite. Em contexto comunitário, conveniência do visitante não autoriza apagar regras de acesso ou representar consentimento inexistente. Defina público, tarefa e contexto antes do formato editorial. Uma peça informativa precisa distinguir evidência, interpretação e chamada para ação, preservando o significado quando é adaptada para outro canal ou idioma. Planeje hierarquia com título descritivo, contexto suficiente e instruções verificáveis. Em acessibilidade, ofereça equivalente textual para informação visual e identifique falantes e sons relevantes nas legendas; transcrição automática exige revisão. Não use imagens de pessoas ou acervos sem registrar direitos e permissões aplicáveis. Faça teste de compreensão com perguntas sobre a ação esperada e não apenas sobre preferência estética. Diferencie alcance, atenção, entendimento e conversão; seus denominadores medem etapas distintas. Mantenha histórico de versões e inventário de afirmações com fontes e datas. Ao corrigir um erro, verifique todas as adaptações derivadas. Entregue conteúdo, guia de atualização, critérios de revisão e métricas coerentes com a finalidade pública ou comercial. A aplicação específica exige produzir inventário de instruções e restrições e verificar a ligação com matriz de equivalência bilíngue. Compare sua conclusão com a regra do caso: Revisar as quatro omissões e exigir equivalência de restrições antes da publicação. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um guia peruano possui vinte instruções e a tradução omite quatro restrições de acesso a áreas comunitárias. Resolução: Revisar as quatro omissões e exigir equivalência de restrições antes da publicação. Dezesseis de vinte instruções foram preservadas, cobertura documental de 80%. Mesmo quatro omissões podem impedir publicação se afetam acesso; o indicador não substitui revisão do significado. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Aprovar a tradução porque o texto ficou mais curto e fluente. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A comunidade altera uma regra de visita após a versão impressa. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.w3.org/WAI/tips/writing/",
      "https://www.w3.org/WAI/tutorials/page-structure/content/"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-legendagem-acessivel-de-formacao-tecnica-regional",
    "title": "Legendagem acessível de formação técnica regional",
    "track": "content",
    "role": "Especialista em conteúdo e comunicação regional",
    "positioning": "specialist",
    "scenario": "Um vídeo brasileiro de doze minutos tem fala legível, mas não identifica dois instrutores nem três alarmes demonstrados na aula.",
    "decision": "Incluir identificação de falante e sons relevantes para a compreensão do procedimento.",
    "misconception": "Declarar acessibilidade completa porque todas as palavras faladas estão transcritas.",
    "changedConstraint": "A plataforma de destino limita caracteres por linha.",
    "tasks": [
      "Roteiro de falantes e sons",
      "Arquivo de legenda com tempos",
      "Registro de termos técnicos",
      "Teste de sincronização",
      "Revisão de legibilidade por plataforma",
      "Lista de limitações remanescentes"
    ],
    "method": "Legendas acessíveis representam diálogo e informação sonora relevante. Identificação de falante deve aparecer quando a imagem não resolve quem fala. Sons ligados à compreensão da aula precisam de equivalência textual. Defina público, tarefa e contexto antes do formato editorial. Uma peça informativa precisa distinguir evidência, interpretação e chamada para ação, preservando o significado quando é adaptada para outro canal ou idioma. Planeje hierarquia com título descritivo, contexto suficiente e instruções verificáveis. Em acessibilidade, ofereça equivalente textual para informação visual e identifique falantes e sons relevantes nas legendas; transcrição automática exige revisão. Não use imagens de pessoas ou acervos sem registrar direitos e permissões aplicáveis. Faça teste de compreensão com perguntas sobre a ação esperada e não apenas sobre preferência estética. Diferencie alcance, atenção, entendimento e conversão; seus denominadores medem etapas distintas. Mantenha histórico de versões e inventário de afirmações com fontes e datas. Ao corrigir um erro, verifique todas as adaptações derivadas. Entregue conteúdo, guia de atualização, critérios de revisão e métricas coerentes com a finalidade pública ou comercial. A aplicação específica exige produzir roteiro de falantes e sons e verificar a ligação com registro de termos técnicos. Compare sua conclusão com a regra do caso: Incluir identificação de falante e sons relevantes para a compreensão do procedimento. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um vídeo brasileiro de doze minutos tem fala legível, mas não identifica dois instrutores nem três alarmes demonstrados na aula. Resolução: Incluir identificação de falante e sons relevantes para a compreensão do procedimento. A transcrição cobre a fala, mas cinco elementos relevantes permanecem sem equivalente. Ajustar quebra de linha deve preservar conteúdo e sincronização, sem eliminar instruções para caber no formato. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Declarar acessibilidade completa porque todas as palavras faladas estão transcritas. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A plataforma de destino limita caracteres por linha. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.w3.org/WAI/media/av/captions/",
      "https://www.w3.org/WAI/media/av/transcribing/"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-curadoria-de-mapas-narrativos-sobre-patrimonio-ferroviario",
    "title": "Curadoria de mapas narrativos sobre patrimônio ferroviário",
    "track": "content",
    "role": "Especialista em conteúdo e comunicação regional",
    "positioning": "broad",
    "scenario": "Um projeto argentino reúne cinquenta fotografias: trinta com licença comprovada, dez de autoria desconhecida e dez com uso restrito.",
    "decision": "Selecionar as trinta elegíveis e manter as demais em revisão de direitos.",
    "misconception": "Publicar todas citando o arquivo como se atribuição substituísse permissão.",
    "changedConstraint": "A licença de cinco imagens exige compartilhamento em condições específicas.",
    "tasks": [
      "Inventário de imagens e procedência",
      "Matriz de direitos por item",
      "Roteiro espacial da narrativa",
      "Ficha de atribuição",
      "Plano de substituição de ativos",
      "Registro de versões publicadas"
    ],
    "method": "Curadoria combina pertinência histórica e direito de uso. Atribuição e autorização são requisitos diferentes; uma imagem disponível na internet não é automaticamente livre para publicação. Defina público, tarefa e contexto antes do formato editorial. Uma peça informativa precisa distinguir evidência, interpretação e chamada para ação, preservando o significado quando é adaptada para outro canal ou idioma. Planeje hierarquia com título descritivo, contexto suficiente e instruções verificáveis. Em acessibilidade, ofereça equivalente textual para informação visual e identifique falantes e sons relevantes nas legendas; transcrição automática exige revisão. Não use imagens de pessoas ou acervos sem registrar direitos e permissões aplicáveis. Faça teste de compreensão com perguntas sobre a ação esperada e não apenas sobre preferência estética. Diferencie alcance, atenção, entendimento e conversão; seus denominadores medem etapas distintas. Mantenha histórico de versões e inventário de afirmações com fontes e datas. Ao corrigir um erro, verifique todas as adaptações derivadas. Entregue conteúdo, guia de atualização, critérios de revisão e métricas coerentes com a finalidade pública ou comercial. A aplicação específica exige produzir inventário de imagens e procedência e verificar a ligação com roteiro espacial da narrativa. Compare sua conclusão com a regra do caso: Selecionar as trinta elegíveis e manter as demais em revisão de direitos. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um projeto argentino reúne cinquenta fotografias: trinta com licença comprovada, dez de autoria desconhecida e dez com uso restrito. Resolução: Selecionar as trinta elegíveis e manter as demais em revisão de direitos. Trinta de cinquenta possuem licença comprovada para análise, mas é preciso conferir compatibilidade com o uso pretendido. Os outros vinte não devem ser tratados como elegíveis por ausência de oposição. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Publicar todas citando o arquivo como se atribuição substituísse permissão. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A licença de cinco imagens exige compartilhamento em condições específicas. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.wipo.int/en/web/copyright/faq-copyright",
      "https://creativecommons.org/faq/"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-comunicacao-de-riscos-de-calor-em-servicos-municipais",
    "title": "Comunicação de riscos de calor em serviços municipais",
    "track": "content",
    "role": "Especialista em conteúdo e comunicação regional",
    "positioning": "specialist",
    "scenario": "Uma peça chilena afirma que todos devem evitar sair, mas a fonte oficial diferencia grupos, horários e sinais de alerta.",
    "decision": "Reescrever a orientação preservando condições e encaminhamento oficial sem criar regra universal.",
    "misconception": "Usar a frase mais alarmista para aumentar compartilhamentos.",
    "changedConstraint": "O alerta muda de nível após a publicação.",
    "tasks": [
      "Inventário de afirmações da fonte",
      "Matriz de público e situação",
      "Texto em linguagem clara",
      "Versão acessível para celular",
      "Plano de atualização do alerta",
      "Teste de compreensão da ação"
    ],
    "method": "Comunicação de risco precisa permitir ação compatível com a fonte e com o público. Clareza não significa remover condições essenciais. Nível do alerta e data devem permanecer visíveis. Defina público, tarefa e contexto antes do formato editorial. Uma peça informativa precisa distinguir evidência, interpretação e chamada para ação, preservando o significado quando é adaptada para outro canal ou idioma. Planeje hierarquia com título descritivo, contexto suficiente e instruções verificáveis. Em acessibilidade, ofereça equivalente textual para informação visual e identifique falantes e sons relevantes nas legendas; transcrição automática exige revisão. Não use imagens de pessoas ou acervos sem registrar direitos e permissões aplicáveis. Faça teste de compreensão com perguntas sobre a ação esperada e não apenas sobre preferência estética. Diferencie alcance, atenção, entendimento e conversão; seus denominadores medem etapas distintas. Mantenha histórico de versões e inventário de afirmações com fontes e datas. Ao corrigir um erro, verifique todas as adaptações derivadas. Entregue conteúdo, guia de atualização, critérios de revisão e métricas coerentes com a finalidade pública ou comercial. A aplicação específica exige produzir inventário de afirmações da fonte e verificar a ligação com texto em linguagem clara. Compare sua conclusão com a regra do caso: Reescrever a orientação preservando condições e encaminhamento oficial sem criar regra universal. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma peça chilena afirma que todos devem evitar sair, mas a fonte oficial diferencia grupos, horários e sinais de alerta. Resolução: Reescrever a orientação preservando condições e encaminhamento oficial sem criar regra universal. Uma frase universal pode ser curta e ainda orientar incorretamente. A revisão deve conferir quem deve agir, quando, como e por qual canal obter ajuda oficial. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Usar a frase mais alarmista para aumentar compartilhamentos. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O alerta muda de nível após a publicação. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.who.int/publications/i/item/9789240092501",
      "https://www.who.int/news-room/questions-and-answers/item/emergencies-risk-communication"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-localizacao-de-interfaces-de-comercio-para-espanhol-regional",
    "title": "Localização de interfaces de comércio para espanhol regional",
    "track": "content",
    "role": "Especialista em conteúdo e comunicação regional",
    "positioning": "specialist",
    "scenario": "Uma loja uruguaia adapta cem mensagens do português; doze usam termos ambíguos para entrega e devolução.",
    "decision": "Revisar os doze termos no contexto da tarefa e testar compreensão antes de liberar o fluxo.",
    "misconception": "Aprovar pela semelhança linguística entre português e espanhol.",
    "changedConstraint": "O checkout passa a atender clientes no Chile e no Peru.",
    "tasks": [
      "Inventário de mensagens de interface",
      "Glossário por função comercial",
      "Capturas com contexto de tela",
      "Matriz de ambiguidades",
      "Teste de tarefa por variante",
      "Guia de atualização terminológica"
    ],
    "method": "Localização de interface depende da tarefa que o texto permite executar. Termos de entrega, cobrança e devolução podem variar em uso regional. Tradução isolada perde contexto de botão e estado. Defina público, tarefa e contexto antes do formato editorial. Uma peça informativa precisa distinguir evidência, interpretação e chamada para ação, preservando o significado quando é adaptada para outro canal ou idioma. Planeje hierarquia com título descritivo, contexto suficiente e instruções verificáveis. Em acessibilidade, ofereça equivalente textual para informação visual e identifique falantes e sons relevantes nas legendas; transcrição automática exige revisão. Não use imagens de pessoas ou acervos sem registrar direitos e permissões aplicáveis. Faça teste de compreensão com perguntas sobre a ação esperada e não apenas sobre preferência estética. Diferencie alcance, atenção, entendimento e conversão; seus denominadores medem etapas distintas. Mantenha histórico de versões e inventário de afirmações com fontes e datas. Ao corrigir um erro, verifique todas as adaptações derivadas. Entregue conteúdo, guia de atualização, critérios de revisão e métricas coerentes com a finalidade pública ou comercial. A aplicação específica exige produzir inventário de mensagens de interface e verificar a ligação com capturas com contexto de tela. Compare sua conclusão com a regra do caso: Revisar os doze termos no contexto da tarefa e testar compreensão antes de liberar o fluxo. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma loja uruguaia adapta cem mensagens do português; doze usam termos ambíguos para entrega e devolução. Resolução: Revisar os doze termos no contexto da tarefa e testar compreensão antes de liberar o fluxo. Doze por cento das mensagens foram sinalizadas, mas sua relevância depende da posição na jornada. Uma ambiguidade no pagamento pode ter consequência maior que várias em conteúdo secundário. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Aprovar pela semelhança linguística entre português e espanhol. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O checkout passa a atender clientes no Chile e no Peru. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.w3.org/WAI/tips/writing/",
      "https://www.w3.org/WAI/tutorials/page-structure/content/"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-edicao-de-relatorios-publicos-com-graficos-verificaveis",
    "title": "Edição de relatórios públicos com gráficos verificáveis",
    "track": "content",
    "role": "Especialista em conteúdo e comunicação regional",
    "positioning": "specialist",
    "scenario": "Um relatório colombiano traz gráfico de crescimento de cinquenta para sessenta com eixo iniciado em 49.",
    "decision": "Informar aumento de 20% e revisar o eixo ou explicar a escala para evitar impressão visual desproporcional.",
    "misconception": "Afirmar que o crescimento foi de quase seis vezes pela altura das barras.",
    "changedConstraint": "A versão móvel corta a unidade do eixo vertical.",
    "tasks": [
      "Tabela de dados do gráfico",
      "Memória de variação percentual",
      "Revisão de escala e eixo",
      "Texto alternativo descritivo",
      "Teste de leitura em celular",
      "Registro de fonte e edição"
    ],
    "method": "A variação percentual usa a base inicial. Escalas truncadas podem ser úteis em certos gráficos, mas exigem contexto claro e não devem induzir leitura proporcional incorreta em barras. Defina público, tarefa e contexto antes do formato editorial. Uma peça informativa precisa distinguir evidência, interpretação e chamada para ação, preservando o significado quando é adaptada para outro canal ou idioma. Planeje hierarquia com título descritivo, contexto suficiente e instruções verificáveis. Em acessibilidade, ofereça equivalente textual para informação visual e identifique falantes e sons relevantes nas legendas; transcrição automática exige revisão. Não use imagens de pessoas ou acervos sem registrar direitos e permissões aplicáveis. Faça teste de compreensão com perguntas sobre a ação esperada e não apenas sobre preferência estética. Diferencie alcance, atenção, entendimento e conversão; seus denominadores medem etapas distintas. Mantenha histórico de versões e inventário de afirmações com fontes e datas. Ao corrigir um erro, verifique todas as adaptações derivadas. Entregue conteúdo, guia de atualização, critérios de revisão e métricas coerentes com a finalidade pública ou comercial. A aplicação específica exige produzir tabela de dados do gráfico e verificar a ligação com revisão de escala e eixo. Compare sua conclusão com a regra do caso: Informar aumento de 20% e revisar o eixo ou explicar a escala para evitar impressão visual desproporcional. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um relatório colombiano traz gráfico de crescimento de cinquenta para sessenta com eixo iniciado em 49. Resolução: Informar aumento de 20% e revisar o eixo ou explicar a escala para evitar impressão visual desproporcional. Sessenta menos cinquenta são dez; dez divididos por cinquenta resultam em 20%. A altura visual sob eixo truncado não é a razão econômica ou estatística entre os valores. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Afirmar que o crescimento foi de quase seis vezes pela altura das barras. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A versão móvel corta a unidade do eixo vertical. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://service-manual.ons.gov.uk/data-visualisation/guidance/axes-and-gridlines",
      "https://www150.statcan.gc.ca/n1/pub/89-26-0005/892600052022001-eng.htm"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-documentacao-audiovisual-de-oficios-tradicionais-com-consentimento",
    "title": "Documentação audiovisual de ofícios tradicionais com consentimento",
    "track": "content",
    "role": "Especialista em conteúdo e comunicação regional",
    "positioning": "broad",
    "scenario": "Um acervo equatoriano grava vinte participantes; quinze autorizam divulgação pública e cinco autorizam apenas preservação interna.",
    "decision": "Separar usos permitidos e excluir os cinco registros internos da peça pública.",
    "misconception": "Publicar todos porque aceitaram ser gravados.",
    "changedConstraint": "Dois participantes retiram permissão para um trecho específico.",
    "tasks": [
      "Registro de participantes e autorizações",
      "Matriz de finalidade por gravação",
      "Roteiro de seleção de trechos",
      "Controle de retirada de consentimento",
      "Metadados de acesso ao acervo",
      "Lista de versões e destinos publicados"
    ],
    "method": "Consentimento para registrar não equivale a consentimento para qualquer divulgação. Preserve finalidade e restrições por pessoa e trecho, incluindo cópias e versões derivadas. Defina público, tarefa e contexto antes do formato editorial. Uma peça informativa precisa distinguir evidência, interpretação e chamada para ação, preservando o significado quando é adaptada para outro canal ou idioma. Planeje hierarquia com título descritivo, contexto suficiente e instruções verificáveis. Em acessibilidade, ofereça equivalente textual para informação visual e identifique falantes e sons relevantes nas legendas; transcrição automática exige revisão. Não use imagens de pessoas ou acervos sem registrar direitos e permissões aplicáveis. Faça teste de compreensão com perguntas sobre a ação esperada e não apenas sobre preferência estética. Diferencie alcance, atenção, entendimento e conversão; seus denominadores medem etapas distintas. Mantenha histórico de versões e inventário de afirmações com fontes e datas. Ao corrigir um erro, verifique todas as adaptações derivadas. Entregue conteúdo, guia de atualização, critérios de revisão e métricas coerentes com a finalidade pública ou comercial. A aplicação específica exige produzir registro de participantes e autorizações e verificar a ligação com roteiro de seleção de trechos. Compare sua conclusão com a regra do caso: Separar usos permitidos e excluir os cinco registros internos da peça pública. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um acervo equatoriano grava vinte participantes; quinze autorizam divulgação pública e cinco autorizam apenas preservação interna. Resolução: Separar usos permitidos e excluir os cinco registros internos da peça pública. Quinze registros têm permissão pública no cenário inicial. Os outros cinco podem permanecer preservados dentro da finalidade autorizada; não devem ser convertidos em publicidade por conveniência editorial. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Publicar todos porque aceitaram ser gravados. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Dois participantes retiram permissão para um trecho específico. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.wipo.int/en/web/copyright/faq-copyright",
      "https://creativecommons.org/faq/"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-redacao-de-instrucoes-de-uso-para-equipamentos-reparados",
    "title": "Redação de instruções de uso para equipamentos reparados",
    "track": "content",
    "role": "Especialista em conteúdo e comunicação regional",
    "positioning": "specialist",
    "scenario": "Uma oficina peruana entrega manual de oito passos, mas dois exigem ferramenta ou intervenção reservada a técnico.",
    "decision": "Separar instruções de usuário e encaminhamento técnico, evitando orientar intervenção indevida.",
    "misconception": "Manter todos os passos no guia doméstico para parecer completo.",
    "changedConstraint": "O equipamento possui duas versões com comandos diferentes.",
    "tasks": [
      "Mapa de tarefas por perfil",
      "Inventário de versões do produto",
      "Roteiro de uso autorizado",
      "Lista de advertências verificadas",
      "Teste de compreensão sem intervenção",
      "Guia de encaminhamento técnico"
    ],
    "method": "Instrução de uso precisa respeitar o perfil do leitor e a fronteira entre operação e intervenção especializada. Completeza não significa incluir ações que a pessoa não está autorizada ou preparada para executar. Defina público, tarefa e contexto antes do formato editorial. Uma peça informativa precisa distinguir evidência, interpretação e chamada para ação, preservando o significado quando é adaptada para outro canal ou idioma. Planeje hierarquia com título descritivo, contexto suficiente e instruções verificáveis. Em acessibilidade, ofereça equivalente textual para informação visual e identifique falantes e sons relevantes nas legendas; transcrição automática exige revisão. Não use imagens de pessoas ou acervos sem registrar direitos e permissões aplicáveis. Faça teste de compreensão com perguntas sobre a ação esperada e não apenas sobre preferência estética. Diferencie alcance, atenção, entendimento e conversão; seus denominadores medem etapas distintas. Mantenha histórico de versões e inventário de afirmações com fontes e datas. Ao corrigir um erro, verifique todas as adaptações derivadas. Entregue conteúdo, guia de atualização, critérios de revisão e métricas coerentes com a finalidade pública ou comercial. A aplicação específica exige produzir mapa de tarefas por perfil e verificar a ligação com roteiro de uso autorizado. Compare sua conclusão com a regra do caso: Separar instruções de usuário e encaminhamento técnico, evitando orientar intervenção indevida. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma oficina peruana entrega manual de oito passos, mas dois exigem ferramenta ou intervenção reservada a técnico. Resolução: Separar instruções de usuário e encaminhamento técnico, evitando orientar intervenção indevida. Seis passos podem permanecer no roteiro de usuário após validação. Dois precisam de descrição de encaminhamento e não de procedimento operacional executado pelo aluno. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Manter todos os passos no guia doméstico para parecer completo. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O equipamento possui duas versões com comandos diferentes. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.w3.org/WAI/tips/writing/",
      "https://www.w3.org/WAI/tutorials/page-structure/content/"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-editorial-de-educacao-financeira-sem-promessas",
    "title": "Planejamento editorial de educação financeira sem promessas",
    "track": "content",
    "role": "Especialista em conteúdo e comunicação regional",
    "positioning": "specialist",
    "scenario": "Uma campanha paraguaia usa exemplo de retorno mensal fixo e apresenta o resultado como garantido para qualquer aplicação.",
    "decision": "Rotular a simulação, explicitar hipóteses e remover garantia de retorno ou recomendação individual.",
    "misconception": "Aumentar a promessa para obter mais cliques.",
    "changedConstraint": "O patrocinador pede destaque de um produto específico.",
    "tasks": [
      "Inventário de alegações financeiras",
      "Matriz de hipóteses do exemplo",
      "Roteiro educativo revisado",
      "Separação de publicidade e conteúdo",
      "Teste de interpretação do público",
      "Registro de revisão e fontes"
    ],
    "method": "Conteúdo educativo deve permitir distinguir simulação, informação geral e oferta comercial. Retorno hipotético não prova desempenho futuro, e clareza exige explicitar risco e condições do exemplo. Defina público, tarefa e contexto antes do formato editorial. Uma peça informativa precisa distinguir evidência, interpretação e chamada para ação, preservando o significado quando é adaptada para outro canal ou idioma. Planeje hierarquia com título descritivo, contexto suficiente e instruções verificáveis. Em acessibilidade, ofereça equivalente textual para informação visual e identifique falantes e sons relevantes nas legendas; transcrição automática exige revisão. Não use imagens de pessoas ou acervos sem registrar direitos e permissões aplicáveis. Faça teste de compreensão com perguntas sobre a ação esperada e não apenas sobre preferência estética. Diferencie alcance, atenção, entendimento e conversão; seus denominadores medem etapas distintas. Mantenha histórico de versões e inventário de afirmações com fontes e datas. Ao corrigir um erro, verifique todas as adaptações derivadas. Entregue conteúdo, guia de atualização, critérios de revisão e métricas coerentes com a finalidade pública ou comercial. A aplicação específica exige produzir inventário de alegações financeiras e verificar a ligação com roteiro educativo revisado. Compare sua conclusão com a regra do caso: Rotular a simulação, explicitar hipóteses e remover garantia de retorno ou recomendação individual. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma campanha paraguaia usa exemplo de retorno mensal fixo e apresenta o resultado como garantido para qualquer aplicação. Resolução: Rotular a simulação, explicitar hipóteses e remover garantia de retorno ou recomendação individual. Uma taxa fixa inserida em planilha apenas produz um cenário matemático. Ela não demonstra que um produto entregará aquele resultado nem que seja apropriado a cada leitor. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Aumentar a promessa para obter mais cliques. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O patrocinador pede destaque de um produto específico. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.w3.org/WAI/tips/writing/",
      "https://www.sba.gov/counseling/plan-your-business/break-even-point-calculator/"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-gestao-de-atualizacao-de-conteudos-de-mobilidade-regional",
    "title": "Gestão de atualização de conteúdos de mobilidade regional",
    "track": "content",
    "role": "Especialista em conteúdo e comunicação regional",
    "positioning": "specialist",
    "scenario": "Um portal brasileiro possui sessenta páginas e uma regra oficial muda em doze páginas identificadas por etiqueta.",
    "decision": "Revisar as doze e procurar derivações em materiais não etiquetados antes de declarar atualização completa.",
    "misconception": "Alterar somente a página principal e considerar toda a informação sincronizada.",
    "changedConstraint": "Uma tradução conserva a regra antiga após a revisão em português.",
    "tasks": [
      "Inventário de afirmações por página",
      "Mapa de dependências editoriais",
      "Fila de revisão por fonte",
      "Matriz de versões linguísticas",
      "Teste de busca de regra antiga",
      "Registro de data de validação"
    ],
    "method": "Informação regulatória derivada exige rastrear a afirmação até a fonte e seus destinos. Etiquetas ajudam localizar dependências, mas não garantem que o inventário esteja completo. Defina público, tarefa e contexto antes do formato editorial. Uma peça informativa precisa distinguir evidência, interpretação e chamada para ação, preservando o significado quando é adaptada para outro canal ou idioma. Planeje hierarquia com título descritivo, contexto suficiente e instruções verificáveis. Em acessibilidade, ofereça equivalente textual para informação visual e identifique falantes e sons relevantes nas legendas; transcrição automática exige revisão. Não use imagens de pessoas ou acervos sem registrar direitos e permissões aplicáveis. Faça teste de compreensão com perguntas sobre a ação esperada e não apenas sobre preferência estética. Diferencie alcance, atenção, entendimento e conversão; seus denominadores medem etapas distintas. Mantenha histórico de versões e inventário de afirmações com fontes e datas. Ao corrigir um erro, verifique todas as adaptações derivadas. Entregue conteúdo, guia de atualização, critérios de revisão e métricas coerentes com a finalidade pública ou comercial. A aplicação específica exige produzir inventário de afirmações por página e verificar a ligação com fila de revisão por fonte. Compare sua conclusão com a regra do caso: Revisar as doze e procurar derivações em materiais não etiquetados antes de declarar atualização completa. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um portal brasileiro possui sessenta páginas e uma regra oficial muda em doze páginas identificadas por etiqueta. Resolução: Revisar as doze e procurar derivações em materiais não etiquetados antes de declarar atualização completa. Doze páginas conhecidas representam 20% do portal. A revisão precisa incluir traduções e peças derivadas; trocar uma página não comprova sincronização das demais. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Alterar somente a página principal e considerar toda a informação sincronizada. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Uma tradução conserva a regra antiga após a revisão em português. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.gov.uk/government/publications/civil-service-helping-you-with-managing-suppliers-and-contracts/contract-management-training-accreditation-foundation-level-takeaway-guide-html",
      "https://www.w3.org/WAI/tips/writing/"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-revisao-de-acessos-de-fornecedores-em-cooperativas-digitais",
    "title": "Revisão de acessos de fornecedores em cooperativas digitais",
    "track": "cyber",
    "role": "Analista de segurança operacional defensiva",
    "positioning": "broad",
    "scenario": "Uma cooperativa brasileira encerra contrato com quatro fornecedores, mas seis contas associadas continuam ativas.",
    "decision": "Revogar ou suspender as seis contas conforme processo autorizado e verificar tokens e acessos relacionados.",
    "misconception": "Desativar somente as quatro contas com nome da empresa e ignorar as restantes.",
    "changedConstraint": "Uma integração depende de conta de serviço pertencente ao fornecedor encerrado.",
    "tasks": [
      "Inventário de identidades externas",
      "Mapa de contratos e responsáveis",
      "Plano de revogação autorizado",
      "Lista de tokens e integrações",
      "Teste de acesso após encerramento",
      "Registro de exceção temporária"
    ],
    "method": "Desligamento deve abranger todas as identidades associadas ao contrato, inclusive contas de serviço e tokens. A mudança precisa considerar dependências para evitar interrupção silenciosa sem preservar acesso indevido. Delimite ativos, identidades e ações permitidas antes de avaliar um controle. Diferencie autenticação, autorização e registro: reconhecer uma pessoa não significa permitir qualquer operação. Use privilégio mínimo e revogação verificável, incluindo contas de serviço e fornecedores. Classifique eventos por evidência observável e preserve uma linha temporal; um alerta isolado não demonstra comprometimento. Teste somente em laboratório próprio ou com autorização explícita, usando contas e dados sintéticos. Não publique credenciais reais nem reproduza ataques contra terceiros. Priorize riscos por impacto e exposição, documentando pressupostos e controles compensatórios. Em continuidade, uma cópia existente só tem utilidade demonstrada quando a restauração é testada e o resultado reconciliado. Defina responsáveis, comunicação e critérios de encerramento de incidente. Meça tempo de detecção, contenção e recuperação separadamente. Entregue configuração proposta, procedimento de verificação, evidências do teste e limitações que exigem avaliação especializada. A aplicação específica exige produzir inventário de identidades externas e verificar a ligação com plano de revogação autorizado. Compare sua conclusão com a regra do caso: Revogar ou suspender as seis contas conforme processo autorizado e verificar tokens e acessos relacionados. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma cooperativa brasileira encerra contrato com quatro fornecedores, mas seis contas associadas continuam ativas. Resolução: Revogar ou suspender as seis contas conforme processo autorizado e verificar tokens e acessos relacionados. Quatro fornecedores podem corresponder a mais de quatro contas. O universo de revisão são as seis identidades encontradas e suas credenciais derivadas, não apenas o nome comercial. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Desativar somente as quatro contas com nome da empresa e ignorar as restantes. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Uma integração depende de conta de serviço pertencente ao fornecedor encerrado. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html",
      "https://www.fbi.gov/investigate/cyber/ten-actions-to-improve-cyber-resiliency"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-recuperacao-testada-de-arquivos-de-escritorios-locais",
    "title": "Recuperação testada de arquivos de escritórios locais",
    "track": "cyber",
    "role": "Analista de segurança operacional defensiva",
    "positioning": "specialist",
    "scenario": "Um escritório uruguaio copia cem pastas diariamente, mas o teste recupera apenas 92 porque oito têm permissões ausentes.",
    "decision": "Registrar recuperação incompleta de 92% e corrigir o procedimento antes de declarar restauração integral.",
    "misconception": "Declarar backup eficaz apenas porque o trabalho de cópia terminou sem erro.",
    "changedConstraint": "Uma nova cópia inclui arquivos criptografados sem chave de recuperação validada.",
    "tasks": [
      "Inventário de dados a proteger",
      "Mapa de permissões e chaves",
      "Roteiro de restauração em laboratório",
      "Conciliação de arquivos recuperados",
      "Registro de falhas por pasta",
      "Plano de novo teste de recuperação"
    ],
    "method": "Backup e restauração são capacidades distintas. Verifique conteúdo, permissões e chaves necessárias para uso. Sucesso do trabalho de cópia não demonstra que o serviço pode operar após uma perda. Delimite ativos, identidades e ações permitidas antes de avaliar um controle. Diferencie autenticação, autorização e registro: reconhecer uma pessoa não significa permitir qualquer operação. Use privilégio mínimo e revogação verificável, incluindo contas de serviço e fornecedores. Classifique eventos por evidência observável e preserve uma linha temporal; um alerta isolado não demonstra comprometimento. Teste somente em laboratório próprio ou com autorização explícita, usando contas e dados sintéticos. Não publique credenciais reais nem reproduza ataques contra terceiros. Priorize riscos por impacto e exposição, documentando pressupostos e controles compensatórios. Em continuidade, uma cópia existente só tem utilidade demonstrada quando a restauração é testada e o resultado reconciliado. Defina responsáveis, comunicação e critérios de encerramento de incidente. Meça tempo de detecção, contenção e recuperação separadamente. Entregue configuração proposta, procedimento de verificação, evidências do teste e limitações que exigem avaliação especializada. A aplicação específica exige produzir inventário de dados a proteger e verificar a ligação com roteiro de restauração em laboratório. Compare sua conclusão com a regra do caso: Registrar recuperação incompleta de 92% e corrigir o procedimento antes de declarar restauração integral. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um escritório uruguaio copia cem pastas diariamente, mas o teste recupera apenas 92 porque oito têm permissões ausentes. Resolução: Registrar recuperação incompleta de 92% e corrigir o procedimento antes de declarar restauração integral. Noventa e duas pastas recuperadas de cem representam 92% do escopo testado. As oito ausentes podem conter informação crítica, por isso a porcentagem precisa acompanhar impacto e correção. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Declarar backup eficaz apenas porque o trabalho de cópia terminou sem erro. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Uma nova cópia inclui arquivos criptografados sem chave de recuperação validada. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://learn.microsoft.com/en-us/azure/security/fundamentals/backup-plan-to-protect-against-ransomware",
      "https://www.fbi.gov/investigate/cyber/ten-actions-to-improve-cyber-resiliency"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-triagem-defensiva-de-mensagens-de-cobranca-em-microempresas",
    "title": "Triagem defensiva de mensagens de cobrança em microempresas",
    "track": "cyber",
    "role": "Analista de segurança operacional defensiva",
    "positioning": "specialist",
    "scenario": "Uma equipe peruana recebe quinze mensagens; três alteram conta bancária e pedem pagamento urgente sem confirmação por canal conhecido.",
    "decision": "Suspender a alteração e confirmar por canal independente previamente validado antes de transferir valores.",
    "misconception": "Usar o telefone da própria mensagem suspeita para confirmar a mudança.",
    "changedConstraint": "A mensagem reproduz o histórico real de uma conversa anterior.",
    "tasks": [
      "Rubrica de sinais observáveis",
      "Registro de mensagens sintéticas",
      "Fluxo de confirmação independente",
      "Mapa de aprovadores de pagamento",
      "Guia de preservação de evidências",
      "Teste de escalonamento sem transferência"
    ],
    "method": "Mensagens plausíveis podem usar contexto verdadeiro. O controle é validar a mudança de destino por canal independente e autoridade apropriada, não confiar somente em aparência ou histórico da conversa. Delimite ativos, identidades e ações permitidas antes de avaliar um controle. Diferencie autenticação, autorização e registro: reconhecer uma pessoa não significa permitir qualquer operação. Use privilégio mínimo e revogação verificável, incluindo contas de serviço e fornecedores. Classifique eventos por evidência observável e preserve uma linha temporal; um alerta isolado não demonstra comprometimento. Teste somente em laboratório próprio ou com autorização explícita, usando contas e dados sintéticos. Não publique credenciais reais nem reproduza ataques contra terceiros. Priorize riscos por impacto e exposição, documentando pressupostos e controles compensatórios. Em continuidade, uma cópia existente só tem utilidade demonstrada quando a restauração é testada e o resultado reconciliado. Defina responsáveis, comunicação e critérios de encerramento de incidente. Meça tempo de detecção, contenção e recuperação separadamente. Entregue configuração proposta, procedimento de verificação, evidências do teste e limitações que exigem avaliação especializada. A aplicação específica exige produzir rubrica de sinais observáveis e verificar a ligação com fluxo de confirmação independente. Compare sua conclusão com a regra do caso: Suspender a alteração e confirmar por canal independente previamente validado antes de transferir valores. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma equipe peruana recebe quinze mensagens; três alteram conta bancária e pedem pagamento urgente sem confirmação por canal conhecido. Resolução: Suspender a alteração e confirmar por canal independente previamente validado antes de transferir valores. Três das quinze mensagens exigem confirmação reforçada pelo pedido de mudança. Isso não prova que sejam fraude; fundamenta retenção preventiva até verificação autorizada. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Usar o telefone da própria mensagem suspeita para confirmar a mudança. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A mensagem reproduz o histórico real de uma conversa anterior. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams",
      "https://www.nist.gov/itl/smallbusinesscyber/guidance-topic/phishing"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-gestao-de-autenticacao-multifator-em-escolas-independentes",
    "title": "Gestão de autenticação multifator em escolas independentes",
    "track": "cyber",
    "role": "Analista de segurança operacional defensiva",
    "positioning": "specialist",
    "scenario": "Uma escola colombiana possui oitenta contas; sessenta usam segundo fator e vinte continuam só com senha.",
    "decision": "Reportar cobertura de 75% e priorizar contas com acesso sensível entre as vinte restantes.",
    "misconception": "Declarar a escola totalmente protegida porque a maioria ativou segundo fator.",
    "changedConstraint": "Dez contas têm recuperação vinculada ao mesmo telefone pessoal.",
    "tasks": [
      "Inventário de contas e privilégios",
      "Matriz de método de segundo fator",
      "Plano de ativação assistida",
      "Revisão de canais de recuperação",
      "Teste de perda de dispositivo",
      "Registro de exceções aprovadas"
    ],
    "method": "Segundo fator reduz classes de risco, mas sua eficácia depende de método, recuperação e contexto de uso. Conta administrativa sem proteção merece análise diferenciada, mesmo em um conjunto de alta cobertura. Delimite ativos, identidades e ações permitidas antes de avaliar um controle. Diferencie autenticação, autorização e registro: reconhecer uma pessoa não significa permitir qualquer operação. Use privilégio mínimo e revogação verificável, incluindo contas de serviço e fornecedores. Classifique eventos por evidência observável e preserve uma linha temporal; um alerta isolado não demonstra comprometimento. Teste somente em laboratório próprio ou com autorização explícita, usando contas e dados sintéticos. Não publique credenciais reais nem reproduza ataques contra terceiros. Priorize riscos por impacto e exposição, documentando pressupostos e controles compensatórios. Em continuidade, uma cópia existente só tem utilidade demonstrada quando a restauração é testada e o resultado reconciliado. Defina responsáveis, comunicação e critérios de encerramento de incidente. Meça tempo de detecção, contenção e recuperação separadamente. Entregue configuração proposta, procedimento de verificação, evidências do teste e limitações que exigem avaliação especializada. A aplicação específica exige produzir inventário de contas e privilégios e verificar a ligação com plano de ativação assistida. Compare sua conclusão com a regra do caso: Reportar cobertura de 75% e priorizar contas com acesso sensível entre as vinte restantes. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma escola colombiana possui oitenta contas; sessenta usam segundo fator e vinte continuam só com senha. Resolução: Reportar cobertura de 75% e priorizar contas com acesso sensível entre as vinte restantes. Sessenta divididos por oitenta são 75%. Os vinte restantes representam 25%, e a concentração de recuperação pode criar dependência adicional que o indicador de ativação não revela. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Declarar a escola totalmente protegida porque a maioria ativou segundo fator. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Dez contas têm recuperação vinculada ao mesmo telefone pessoal. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://pages.nist.gov/800-63-4/sp800-63b.html",
      "https://www.fbi.gov/investigate/cyber/ten-actions-to-improve-cyber-resiliency"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-segregacao-de-funcoes-em-pagamentos-de-associacoes",
    "title": "Segregação de funções em pagamentos de associações",
    "track": "cyber",
    "role": "Analista de segurança operacional defensiva",
    "positioning": "broad",
    "scenario": "Uma associação chilena permite que a mesma pessoa cadastre fornecedor, aprove despesa e libere pagamento sem revisão.",
    "decision": "Propor separação de aprovação ou controle compensatório documentado para reduzir concentração de autoridade.",
    "misconception": "Considerar o fluxo seguro porque todos os participantes confiam na pessoa.",
    "changedConstraint": "A equipe tem apenas duas pessoas e não pode criar três aprovadores.",
    "tasks": [
      "Mapa de etapas do pagamento",
      "Matriz de permissões por função",
      "Inventário de conflitos de acesso",
      "Desenho de controle compensatório",
      "Roteiro de conferência independente",
      "Registro de revisão de exceções"
    ],
    "method": "Segregação de funções limita a capacidade de iniciar e concluir uma operação sem conferência. Em equipes pequenas, controles compensatórios podem incluir revisão independente e reconciliação, com responsabilidade explícita. Delimite ativos, identidades e ações permitidas antes de avaliar um controle. Diferencie autenticação, autorização e registro: reconhecer uma pessoa não significa permitir qualquer operação. Use privilégio mínimo e revogação verificável, incluindo contas de serviço e fornecedores. Classifique eventos por evidência observável e preserve uma linha temporal; um alerta isolado não demonstra comprometimento. Teste somente em laboratório próprio ou com autorização explícita, usando contas e dados sintéticos. Não publique credenciais reais nem reproduza ataques contra terceiros. Priorize riscos por impacto e exposição, documentando pressupostos e controles compensatórios. Em continuidade, uma cópia existente só tem utilidade demonstrada quando a restauração é testada e o resultado reconciliado. Defina responsáveis, comunicação e critérios de encerramento de incidente. Meça tempo de detecção, contenção e recuperação separadamente. Entregue configuração proposta, procedimento de verificação, evidências do teste e limitações que exigem avaliação especializada. A aplicação específica exige produzir mapa de etapas do pagamento e verificar a ligação com inventário de conflitos de acesso. Compare sua conclusão com a regra do caso: Propor separação de aprovação ou controle compensatório documentado para reduzir concentração de autoridade. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma associação chilena permite que a mesma pessoa cadastre fornecedor, aprove despesa e libere pagamento sem revisão. Resolução: Propor separação de aprovação ou controle compensatório documentado para reduzir concentração de autoridade. O problema não é contar usuários, mas identificar quem pode atravessar todas as etapas. Com duas pessoas, o desenho precisa impedir autoaprovação ou criar uma revisão verificável. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Considerar o fluxo seguro porque todos os participantes confiam na pessoa. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A equipe tem apenas duas pessoas e não pode criar três aprovadores. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html",
      "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-inventario-de-exposicao-de-documentos-em-portais-municipais",
    "title": "Inventário de exposição de documentos em portais municipais",
    "track": "cyber",
    "role": "Analista de segurança operacional defensiva",
    "positioning": "specialist",
    "scenario": "Uma auditoria autorizada em ambiente de teste encontra quarenta links, cinco dos quais apontam a documentos fictícios marcados como restritos.",
    "decision": "Retirar exposição no ambiente e revisar permissões, cache e links derivados antes de encerrar o achado.",
    "misconception": "Apagar apenas o link visível e presumir que o arquivo ficou inacessível.",
    "changedConstraint": "O mesmo documento aparece em uma cópia de pré-visualização.",
    "tasks": [
      "Inventário de URLs de teste",
      "Mapa de classificação documental",
      "Matriz de permissão esperada",
      "Plano de correção de acesso",
      "Teste de acesso após mudança",
      "Registro de cópias derivadas"
    ],
    "method": "Remover navegação não é controle de autorização. A verificação deve ocorrer no recurso e nas cópias derivadas, usando identidade apropriada e escopo autorizado. Delimite ativos, identidades e ações permitidas antes de avaliar um controle. Diferencie autenticação, autorização e registro: reconhecer uma pessoa não significa permitir qualquer operação. Use privilégio mínimo e revogação verificável, incluindo contas de serviço e fornecedores. Classifique eventos por evidência observável e preserve uma linha temporal; um alerta isolado não demonstra comprometimento. Teste somente em laboratório próprio ou com autorização explícita, usando contas e dados sintéticos. Não publique credenciais reais nem reproduza ataques contra terceiros. Priorize riscos por impacto e exposição, documentando pressupostos e controles compensatórios. Em continuidade, uma cópia existente só tem utilidade demonstrada quando a restauração é testada e o resultado reconciliado. Defina responsáveis, comunicação e critérios de encerramento de incidente. Meça tempo de detecção, contenção e recuperação separadamente. Entregue configuração proposta, procedimento de verificação, evidências do teste e limitações que exigem avaliação especializada. A aplicação específica exige produzir inventário de urls de teste e verificar a ligação com matriz de permissão esperada. Compare sua conclusão com a regra do caso: Retirar exposição no ambiente e revisar permissões, cache e links derivados antes de encerrar o achado. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma auditoria autorizada em ambiente de teste encontra quarenta links, cinco dos quais apontam a documentos fictícios marcados como restritos. Resolução: Retirar exposição no ambiente e revisar permissões, cache e links derivados antes de encerrar o achado. Cinco em quarenta links são 12,5% de achados no conjunto testado. Essa taxa não estima toda a exposição do portal; serve para organizar os recursos identificados e a correção. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Apagar apenas o link visível e presumir que o arquivo ficou inacessível. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O mesmo documento aparece em uma cópia de pré-visualização. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html",
      "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Testing_Automation_Cheat_Sheet.html"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-planejamento-de-resposta-a-perda-de-celular-corporativo",
    "title": "Planejamento de resposta a perda de celular corporativo",
    "track": "cyber",
    "role": "Analista de segurança operacional defensiva",
    "positioning": "specialist",
    "scenario": "Uma empresa argentina perde aparelho com três aplicativos autenticados e cópia local de arquivos sem inventário confirmado.",
    "decision": "Acionar revogação de sessões e avaliação do conteúdo por responsável, preservando registro das ações.",
    "misconception": "Trocar apenas a senha de um aplicativo e declarar o incidente encerrado.",
    "changedConstraint": "O aparelho ficou sem conexão e não confirma recebimento de comando remoto.",
    "tasks": [
      "Linha temporal do incidente",
      "Inventário de contas do aparelho",
      "Plano de revogação autorizado",
      "Registro de comandos e confirmações",
      "Mapa de dados potencialmente afetados",
      "Critérios de comunicação e encerramento"
    ],
    "method": "Resposta a dispositivo perdido combina identidade, dados e capacidade de gerenciamento. Um comando enviado não é ação comprovada enquanto não houver confirmação; sessões existentes podem exigir revogação específica. Delimite ativos, identidades e ações permitidas antes de avaliar um controle. Diferencie autenticação, autorização e registro: reconhecer uma pessoa não significa permitir qualquer operação. Use privilégio mínimo e revogação verificável, incluindo contas de serviço e fornecedores. Classifique eventos por evidência observável e preserve uma linha temporal; um alerta isolado não demonstra comprometimento. Teste somente em laboratório próprio ou com autorização explícita, usando contas e dados sintéticos. Não publique credenciais reais nem reproduza ataques contra terceiros. Priorize riscos por impacto e exposição, documentando pressupostos e controles compensatórios. Em continuidade, uma cópia existente só tem utilidade demonstrada quando a restauração é testada e o resultado reconciliado. Defina responsáveis, comunicação e critérios de encerramento de incidente. Meça tempo de detecção, contenção e recuperação separadamente. Entregue configuração proposta, procedimento de verificação, evidências do teste e limitações que exigem avaliação especializada. A aplicação específica exige produzir linha temporal do incidente e verificar a ligação com plano de revogação autorizado. Compare sua conclusão com a regra do caso: Acionar revogação de sessões e avaliação do conteúdo por responsável, preservando registro das ações. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma empresa argentina perde aparelho com três aplicativos autenticados e cópia local de arquivos sem inventário confirmado. Resolução: Acionar revogação de sessões e avaliação do conteúdo por responsável, preservando registro das ações. Há pelo menos três sessões conhecidas a tratar, mas o inventário incompleto impede afirmar abrangência total. Documente o que foi revogado e o que continua incerto sem prometer apagamento remoto confirmado. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Trocar apenas a senha de um aplicativo e declarar o incidente encerrado. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O aparelho ficou sem conexão e não confirma recebimento de comando remoto. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
      "https://pages.nist.gov/800-63-4/sp800-63b.html"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-revisao-de-permissoes-de-planilhas-em-redes-de-saude",
    "title": "Revisão de permissões de planilhas em redes de saúde",
    "track": "cyber",
    "role": "Analista de segurança operacional defensiva",
    "positioning": "specialist",
    "scenario": "Uma rede equatoriana compartilha planilha fictícia com trinta usuários, dos quais dez não precisam editar e cinco não participam mais do projeto.",
    "decision": "Remover os cinco acessos obsoletos e reduzir os dez à permissão necessária conforme aprovação.",
    "misconception": "Manter todos como editores para evitar solicitações de suporte.",
    "changedConstraint": "Um link público permanece ativo mesmo após revisar usuários nomeados.",
    "tasks": [
      "Inventário de compartilhamentos",
      "Matriz de necessidade de acesso",
      "Plano de redução de privilégios",
      "Revisão de links públicos",
      "Teste com perfis sintéticos",
      "Registro de aprovação e auditoria"
    ],
    "method": "Permissões nomeadas e links de compartilhamento são caminhos distintos. Privilégio mínimo exige revisar ambos, considerando finalidade e necessidade de leitura, edição ou administração. Delimite ativos, identidades e ações permitidas antes de avaliar um controle. Diferencie autenticação, autorização e registro: reconhecer uma pessoa não significa permitir qualquer operação. Use privilégio mínimo e revogação verificável, incluindo contas de serviço e fornecedores. Classifique eventos por evidência observável e preserve uma linha temporal; um alerta isolado não demonstra comprometimento. Teste somente em laboratório próprio ou com autorização explícita, usando contas e dados sintéticos. Não publique credenciais reais nem reproduza ataques contra terceiros. Priorize riscos por impacto e exposição, documentando pressupostos e controles compensatórios. Em continuidade, uma cópia existente só tem utilidade demonstrada quando a restauração é testada e o resultado reconciliado. Defina responsáveis, comunicação e critérios de encerramento de incidente. Meça tempo de detecção, contenção e recuperação separadamente. Entregue configuração proposta, procedimento de verificação, evidências do teste e limitações que exigem avaliação especializada. A aplicação específica exige produzir inventário de compartilhamentos e verificar a ligação com plano de redução de privilégios. Compare sua conclusão com a regra do caso: Remover os cinco acessos obsoletos e reduzir os dez à permissão necessária conforme aprovação. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma rede equatoriana compartilha planilha fictícia com trinta usuários, dos quais dez não precisam editar e cinco não participam mais do projeto. Resolução: Remover os cinco acessos obsoletos e reduzir os dez à permissão necessária conforme aprovação. O conjunto inicial tem trinta usuários. Cinco devem deixar o escopo e dez precisam de privilégio reduzido. A presença de link público pode invalidar uma revisão limitada à lista de nomes. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Manter todos como editores para evitar solicitações de suporte. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Um link público permanece ativo mesmo após revisar usuários nomeados. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html",
      "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Testing_Automation_Cheat_Sheet.html"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-controle-de-dependencias-em-aplicacoes-de-organizacoes-sociais",
    "title": "Controle de dependências em aplicações de organizações sociais",
    "track": "cyber",
    "role": "Analista de segurança operacional defensiva",
    "positioning": "broad",
    "scenario": "Uma aplicação boliviana possui cinquenta dependências diretas e um alerta confirmado sobre biblioteca usada em função exposta.",
    "decision": "Priorizar análise de alcance e atualização compatível da biblioteca alertada, testando a função afetada.",
    "misconception": "Atualizar todas as dependências às cegas e publicar sem regressão.",
    "changedConstraint": "A versão corrigida exige adaptação de uma API usada pelo sistema.",
    "tasks": [
      "Inventário de dependências e versões",
      "Mapa da função exposta",
      "Registro de alerta e alcance",
      "Plano de atualização isolada",
      "Teste de regressão funcional",
      "Memorando de risco residual"
    ],
    "method": "Gestão de dependências combina vulnerabilidade publicada, uso real e compatibilidade. Versão nova não é suficiente se a aplicação quebra ou se a biblioteca vulnerável permanece transitivamente instalada. Delimite ativos, identidades e ações permitidas antes de avaliar um controle. Diferencie autenticação, autorização e registro: reconhecer uma pessoa não significa permitir qualquer operação. Use privilégio mínimo e revogação verificável, incluindo contas de serviço e fornecedores. Classifique eventos por evidência observável e preserve uma linha temporal; um alerta isolado não demonstra comprometimento. Teste somente em laboratório próprio ou com autorização explícita, usando contas e dados sintéticos. Não publique credenciais reais nem reproduza ataques contra terceiros. Priorize riscos por impacto e exposição, documentando pressupostos e controles compensatórios. Em continuidade, uma cópia existente só tem utilidade demonstrada quando a restauração é testada e o resultado reconciliado. Defina responsáveis, comunicação e critérios de encerramento de incidente. Meça tempo de detecção, contenção e recuperação separadamente. Entregue configuração proposta, procedimento de verificação, evidências do teste e limitações que exigem avaliação especializada. A aplicação específica exige produzir inventário de dependências e versões e verificar a ligação com registro de alerta e alcance. Compare sua conclusão com a regra do caso: Priorizar análise de alcance e atualização compatível da biblioteca alertada, testando a função afetada. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma aplicação boliviana possui cinquenta dependências diretas e um alerta confirmado sobre biblioteca usada em função exposta. Resolução: Priorizar análise de alcance e atualização compatível da biblioteca alertada, testando a função afetada. O número total de cinquenta dependências não determina prioridade. A evidência liga um alerta a uma função exposta; valide o caminho e a correção em ambiente controlado antes da publicação. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Atualizar todas as dependências às cegas e publicar sem regressão. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: A versão corrigida exige adaptação de uma API usada pelo sistema. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://cheatsheetseries.owasp.org/cheatsheets/Vulnerable_Dependency_Management_Cheat_Sheet.html",
      "https://csrc.nist.gov/pubs/sp/800/61/r3/final"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-validacao-de-autorizacoes-em-sistemas-de-inscricao",
    "title": "Validação de autorizações em sistemas de inscrição",
    "track": "cyber",
    "role": "Analista de segurança operacional defensiva",
    "positioning": "specialist",
    "scenario": "Em laboratório de uma plataforma paraguaia, dois perfis sintéticos conseguem abrir o registro do outro alterando o identificador na URL.",
    "decision": "Exigir verificação de autorização no servidor por recurso e testar os dois sentidos de acesso.",
    "misconception": "Ocultar o botão da interface e considerar a falha resolvida.",
    "changedConstraint": "Um endpoint de exportação usa regra diferente do formulário.",
    "tasks": [
      "Matriz de perfis e recursos",
      "Casos de teste de autorização",
      "Registro do comportamento observado",
      "Regra proposta no servidor",
      "Teste de exportação e visualização",
      "Evidências da correção em laboratório"
    ],
    "method": "Autorização deve proteger cada recurso e ação no servidor. Identificador imprevisível ou botão oculto não substitui decisão de permissão. Mantenha testes dentro do laboratório autorizado e com dados sintéticos. Delimite ativos, identidades e ações permitidas antes de avaliar um controle. Diferencie autenticação, autorização e registro: reconhecer uma pessoa não significa permitir qualquer operação. Use privilégio mínimo e revogação verificável, incluindo contas de serviço e fornecedores. Classifique eventos por evidência observável e preserve uma linha temporal; um alerta isolado não demonstra comprometimento. Teste somente em laboratório próprio ou com autorização explícita, usando contas e dados sintéticos. Não publique credenciais reais nem reproduza ataques contra terceiros. Priorize riscos por impacto e exposição, documentando pressupostos e controles compensatórios. Em continuidade, uma cópia existente só tem utilidade demonstrada quando a restauração é testada e o resultado reconciliado. Defina responsáveis, comunicação e critérios de encerramento de incidente. Meça tempo de detecção, contenção e recuperação separadamente. Entregue configuração proposta, procedimento de verificação, evidências do teste e limitações que exigem avaliação especializada. A aplicação específica exige produzir matriz de perfis e recursos e verificar a ligação com registro do comportamento observado. Compare sua conclusão com a regra do caso: Exigir verificação de autorização no servidor por recurso e testar os dois sentidos de acesso. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Em laboratório de uma plataforma paraguaia, dois perfis sintéticos conseguem abrir o registro do outro alterando o identificador na URL. Resolução: Exigir verificação de autorização no servidor por recurso e testar os dois sentidos de acesso. Se A consegue consultar B e B consegue consultar A, há dois casos negativos que deveriam ser negados. A revisão deve incluir leitura, alteração e exportação, pois cada caminho pode aplicar regra distinta. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Ocultar o botão da interface e considerar a falha resolvida. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Um endpoint de exportação usa regra diferente do formulário. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html",
      "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Testing_Automation_Cheat_Sheet.html"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-rastreabilidade-documental-de-lotes-de-cobre-reciclado",
    "title": "Rastreabilidade documental de lotes de cobre reciclado",
    "track": "quality",
    "role": "Analista de conformidade e rastreabilidade",
    "positioning": "specialist",
    "scenario": "Uma operação chilena mistura três lotes de 10, 15 e 25 toneladas e expede vinte toneladas do material combinado.",
    "decision": "Vincular a expedição às três origens possíveis e registrar saldo físico combinado de trinta toneladas.",
    "misconception": "Atribuir as vinte toneladas somente ao maior fornecedor sem evidência de segregação.",
    "changedConstraint": "Um dos fornecedores comunica desvio de composição em sua entrega.",
    "tasks": [
      "Cadastro de entradas por fornecedor",
      "Genealogia de mistura",
      "Conciliação de saldo combinado",
      "Mapa de destinos expedidos",
      "Simulação de rastreamento reverso",
      "Registro de segregação ou incerteza"
    ],
    "method": "Rastreabilidade de mistura preserva todas as origens que podem ter contribuído. Atribuição proporcional é modelo contábil, não prova de identidade física de cada unidade expedida. Transforme cada requisito em um teste observável com entrada, regra, evidência e responsável. Um documento assinado não comprova por si só que uma atividade aconteceu ou atendeu ao critério. Separe requisitos contratuais, legais e internos e registre a edição consultada, sem declarar certificação externa. Defina amostra e universo antes de calcular conformidade; resultados de uma amostra direcionada não podem ser generalizados como taxa de toda a população. Classifique desvios pela consequência e pela necessidade de contenção, preservando evidência original e histórico da correção. Uma ação corretiva deve lidar com causa demonstrada e ter verificação de eficácia; treinamento genérico pode ser insuficiente quando o erro vem do processo. Em rastreabilidade, teste tanto a partir do produto para a origem quanto da origem para todos os destinos afetados. Entregue matriz de requisitos, registro de desvios, plano de ação e decisão condicionada aos limites do exame documental. A aplicação específica exige produzir cadastro de entradas por fornecedor e verificar a ligação com conciliação de saldo combinado. Compare sua conclusão com a regra do caso: Vincular a expedição às três origens possíveis e registrar saldo físico combinado de trinta toneladas. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma operação chilena mistura três lotes de 10, 15 e 25 toneladas e expede vinte toneladas do material combinado. Resolução: Vincular a expedição às três origens possíveis e registrar saldo físico combinado de trinta toneladas. Dez mais quinze mais vinte e cinco somam cinquenta. Após expedir vinte, restam trinta. O comunicado de um fornecedor exige localizar todos os destinos potencialmente afetados pela mistura. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Atribuir as vinte toneladas somente ao maior fornecedor sem evidência de segregação. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Um dos fornecedores comunica desvio de composição em sua entrega. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.cec.org/flwm/method/mass-balance/",
      "https://www.unido.org/learning-resources/building-trust-conformity-assessment-toolbox"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-controle-de-evidencias-em-compras-publicas-de-tecnologia",
    "title": "Controle de evidências em compras públicas de tecnologia",
    "track": "quality",
    "role": "Analista de conformidade e rastreabilidade",
    "positioning": "specialist",
    "scenario": "Um processo brasileiro exige oito documentos; seis estão presentes, um está vencido e outro corresponde a fornecedor diferente.",
    "decision": "Registrar seis requisitos comprovados e duas pendências, sem tratar presença de arquivo como atendimento.",
    "misconception": "Marcar oito de oito porque existem oito anexos.",
    "changedConstraint": "Um requisito é alterado por esclarecimento oficial antes da análise final.",
    "tasks": [
      "Matriz de requisitos e edição",
      "Índice de anexos por fornecedor",
      "Verificação de validade temporal",
      "Registro de divergências",
      "Plano de esclarecimentos formais",
      "Relatório de atendimento documental"
    ],
    "method": "Conformidade documental exige pertinência, validade e vínculo correto. Contar anexos não demonstra atendimento. Preserve a versão do requisito para que a decisão possa ser reproduzida. Transforme cada requisito em um teste observável com entrada, regra, evidência e responsável. Um documento assinado não comprova por si só que uma atividade aconteceu ou atendeu ao critério. Separe requisitos contratuais, legais e internos e registre a edição consultada, sem declarar certificação externa. Defina amostra e universo antes de calcular conformidade; resultados de uma amostra direcionada não podem ser generalizados como taxa de toda a população. Classifique desvios pela consequência e pela necessidade de contenção, preservando evidência original e histórico da correção. Uma ação corretiva deve lidar com causa demonstrada e ter verificação de eficácia; treinamento genérico pode ser insuficiente quando o erro vem do processo. Em rastreabilidade, teste tanto a partir do produto para a origem quanto da origem para todos os destinos afetados. Entregue matriz de requisitos, registro de desvios, plano de ação e decisão condicionada aos limites do exame documental. A aplicação específica exige produzir matriz de requisitos e edição e verificar a ligação com verificação de validade temporal. Compare sua conclusão com a regra do caso: Registrar seis requisitos comprovados e duas pendências, sem tratar presença de arquivo como atendimento. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um processo brasileiro exige oito documentos; seis estão presentes, um está vencido e outro corresponde a fornecedor diferente. Resolução: Registrar seis requisitos comprovados e duas pendências, sem tratar presença de arquivo como atendimento. Seis documentos atendem ao cenário descrito. O vencido e o de outro fornecedor não comprovam os requisitos, resultando em 75% de atendimento documental observado, sem decidir habilitação jurídica. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Marcar oito de oito porque existem oito anexos. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Um requisito é alterado por esclarecimento oficial antes da análise final. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.unido.org/learning-resources/building-trust-conformity-assessment-toolbox",
      "https://www.gov.uk/government/publications/civil-service-helping-you-with-managing-suppliers-and-contracts/contract-management-training-accreditation-foundation-level-takeaway-guide-html"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-analise-de-integridade-de-cadeias-de-custodia-laboratoriais",
    "title": "Análise de integridade de cadeias de custódia laboratoriais",
    "track": "quality",
    "role": "Analista de conformidade e rastreabilidade",
    "positioning": "broad",
    "scenario": "Um laboratório peruano recebe quarenta amostras e cinco não têm horário de transferência registrado.",
    "decision": "Sinalizar cinco cadeias incompletas e pedir avaliação responsável de impacto antes de afirmar integridade integral.",
    "misconception": "Copiar o horário de recebimento como se fosse o horário de transferência.",
    "changedConstraint": "Duas amostras também apresentam divergência de identificador.",
    "tasks": [
      "Registro de amostras e lacres",
      "Linha temporal de transferências",
      "Matriz de campos obrigatórios",
      "Lista de divergências de identidade",
      "Fluxo de avaliação técnica",
      "Relatório de integridade documental"
    ],
    "method": "Cadeia de custódia descreve quem teve a amostra, quando e em qual condição. Ausência de horário deve permanecer ausência; preenchimento retroativo exige evidência e identificação de quem corrigiu. Transforme cada requisito em um teste observável com entrada, regra, evidência e responsável. Um documento assinado não comprova por si só que uma atividade aconteceu ou atendeu ao critério. Separe requisitos contratuais, legais e internos e registre a edição consultada, sem declarar certificação externa. Defina amostra e universo antes de calcular conformidade; resultados de uma amostra direcionada não podem ser generalizados como taxa de toda a população. Classifique desvios pela consequência e pela necessidade de contenção, preservando evidência original e histórico da correção. Uma ação corretiva deve lidar com causa demonstrada e ter verificação de eficácia; treinamento genérico pode ser insuficiente quando o erro vem do processo. Em rastreabilidade, teste tanto a partir do produto para a origem quanto da origem para todos os destinos afetados. Entregue matriz de requisitos, registro de desvios, plano de ação e decisão condicionada aos limites do exame documental. A aplicação específica exige produzir registro de amostras e lacres e verificar a ligação com matriz de campos obrigatórios. Compare sua conclusão com a regra do caso: Sinalizar cinco cadeias incompletas e pedir avaliação responsável de impacto antes de afirmar integridade integral. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um laboratório peruano recebe quarenta amostras e cinco não têm horário de transferência registrado. Resolução: Sinalizar cinco cadeias incompletas e pedir avaliação responsável de impacto antes de afirmar integridade integral. Trinta e cinco de quarenta têm o campo informado, completude de 87,5%. Esse número não autoriza concluir validade analítica, que depende de outros critérios técnicos. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Copiar o horário de recebimento como se fosse o horário de transferência. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Duas amostras também apresentam divergência de identificador. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.unido.org/learning-resources/building-trust-conformity-assessment-toolbox",
      "https://www.nist.gov/publications/traceability-considerations-characterization-and-use-measuring-systems"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-qualificacao-documental-de-fornecedores-de-embalagens",
    "title": "Qualificação documental de fornecedores de embalagens",
    "track": "quality",
    "role": "Analista de conformidade e rastreabilidade",
    "positioning": "specialist",
    "scenario": "Uma empresa colombiana avalia dez fornecedores; quatro apresentam evidência atual, três evidência vencida e três somente declaração comercial.",
    "decision": "Distinguir níveis de evidência e manter seis fornecedores pendentes conforme o critério do programa.",
    "misconception": "Dar a mesma nota aos dez porque todos disseram atender.",
    "changedConstraint": "Um fornecedor atual muda o processo produtivo sem atualizar documentação.",
    "tasks": [
      "Matriz de critérios de qualificação",
      "Inventário de evidências por fornecedor",
      "Controle de validade",
      "Registro de mudanças de processo",
      "Plano de avaliação proporcional ao risco",
      "Lista de decisões condicionadas"
    ],
    "method": "Declaração comercial e evidência verificável possuem força diferente. Qualificação deve indicar qual requisito está sustentado e em qual edição, sem se transformar em certificação externa. Transforme cada requisito em um teste observável com entrada, regra, evidência e responsável. Um documento assinado não comprova por si só que uma atividade aconteceu ou atendeu ao critério. Separe requisitos contratuais, legais e internos e registre a edição consultada, sem declarar certificação externa. Defina amostra e universo antes de calcular conformidade; resultados de uma amostra direcionada não podem ser generalizados como taxa de toda a população. Classifique desvios pela consequência e pela necessidade de contenção, preservando evidência original e histórico da correção. Uma ação corretiva deve lidar com causa demonstrada e ter verificação de eficácia; treinamento genérico pode ser insuficiente quando o erro vem do processo. Em rastreabilidade, teste tanto a partir do produto para a origem quanto da origem para todos os destinos afetados. Entregue matriz de requisitos, registro de desvios, plano de ação e decisão condicionada aos limites do exame documental. A aplicação específica exige produzir matriz de critérios de qualificação e verificar a ligação com controle de validade. Compare sua conclusão com a regra do caso: Distinguir níveis de evidência e manter seis fornecedores pendentes conforme o critério do programa. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma empresa colombiana avalia dez fornecedores; quatro apresentam evidência atual, três evidência vencida e três somente declaração comercial. Resolução: Distinguir níveis de evidência e manter seis fornecedores pendentes conforme o critério do programa. Quatro de dez têm evidência atual no cenário. Os demais seis não estão comprovados pelo mesmo critério; isso não significa automaticamente incapacidade, mas exige investigação ou restrição conforme a regra. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Dar a mesma nota aos dez porque todos disseram atender. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Um fornecedor atual muda o processo produtivo sem atualizar documentação. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.unido.org/learning-resources/building-trust-conformity-assessment-toolbox",
      "https://www.gov.uk/government/publications/civil-service-helping-you-with-managing-suppliers-and-contracts/contract-management-training-accreditation-foundation-level-takeaway-guide-html"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-gestao-de-nao-conformidades-em-servicos-de-transporte-escolar",
    "title": "Gestão de não conformidades em serviços de transporte escolar",
    "track": "quality",
    "role": "Analista de conformidade e rastreabilidade",
    "positioning": "specialist",
    "scenario": "Uma revisão uruguaia encontra doze desvios documentais; três se repetem após ação corretiva encerrada.",
    "decision": "Reabrir avaliação de eficácia dos três repetidos e investigar a causa antes de declarar o programa concluído.",
    "misconception": "Contar encerramento administrativo como prova de correção eficaz.",
    "changedConstraint": "Um desvio repetido aparece em outra unidade operacional.",
    "tasks": [
      "Registro de desvios por requisito",
      "Vinculação de ação e causa",
      "Plano de contenção documental",
      "Teste de eficácia por recorrência",
      "Mapa de extensão entre unidades",
      "Memorando de reavaliação"
    ],
    "method": "Encerrar uma tarefa não demonstra eliminar a causa do desvio. A eficácia precisa de evidência posterior sob condição relevante; repetição pode indicar falha no diagnóstico, execução ou controle. Transforme cada requisito em um teste observável com entrada, regra, evidência e responsável. Um documento assinado não comprova por si só que uma atividade aconteceu ou atendeu ao critério. Separe requisitos contratuais, legais e internos e registre a edição consultada, sem declarar certificação externa. Defina amostra e universo antes de calcular conformidade; resultados de uma amostra direcionada não podem ser generalizados como taxa de toda a população. Classifique desvios pela consequência e pela necessidade de contenção, preservando evidência original e histórico da correção. Uma ação corretiva deve lidar com causa demonstrada e ter verificação de eficácia; treinamento genérico pode ser insuficiente quando o erro vem do processo. Em rastreabilidade, teste tanto a partir do produto para a origem quanto da origem para todos os destinos afetados. Entregue matriz de requisitos, registro de desvios, plano de ação e decisão condicionada aos limites do exame documental. A aplicação específica exige produzir registro de desvios por requisito e verificar a ligação com plano de contenção documental. Compare sua conclusão com a regra do caso: Reabrir avaliação de eficácia dos três repetidos e investigar a causa antes de declarar o programa concluído. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma revisão uruguaia encontra doze desvios documentais; três se repetem após ação corretiva encerrada. Resolução: Reabrir avaliação de eficácia dos três repetidos e investigar a causa antes de declarar o programa concluído. Três recorrências em doze desvios equivalem a 25% do conjunto observado. A taxa descreve esse registro e orienta investigação, sem estimar risco de toda a operação. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Contar encerramento administrativo como prova de correção eficaz. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Um desvio repetido aparece em outra unidade operacional. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://asq.org/quality-progress/articles/back-to-basics-the-levels-of-fix?id=ecd2c74a676942bd82968f50568546c6",
      "https://careers.asq.org/career-resources/on-the-job-3/capa-corrective-and-preventive-action-for-quality-engineer-2026-112"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-reconciliacao-de-requisitos-de-acessibilidade-em-licitacoes",
    "title": "Reconciliação de requisitos de acessibilidade em licitações",
    "track": "quality",
    "role": "Analista de conformidade e rastreabilidade",
    "positioning": "specialist",
    "scenario": "Um edital argentino exige cinco critérios de acessibilidade, mas a proposta comprova três e promete resolver dois depois.",
    "decision": "Registrar três comprovados e dois pendentes, verificando a regra do processo antes de aceitar promessa como evidência.",
    "misconception": "Declarar conformidade integral com base no compromisso futuro.",
    "changedConstraint": "Uma demonstração revela que um dos três critérios falha em uso real.",
    "tasks": [
      "Matriz de critérios do edital",
      "Roteiro de demonstração acessível",
      "Inventário de evidências",
      "Registro de falhas por tarefa",
      "Plano de esclarecimento e correção",
      "Relatório de decisão condicionada"
    ],
    "method": "Acessibilidade se verifica por tarefas e requisitos aplicáveis, não apenas por declaração. Promessa futura pode ter papel contratual, mas não comprova estado atual; a regra do processo precisa ser consultada. Transforme cada requisito em um teste observável com entrada, regra, evidência e responsável. Um documento assinado não comprova por si só que uma atividade aconteceu ou atendeu ao critério. Separe requisitos contratuais, legais e internos e registre a edição consultada, sem declarar certificação externa. Defina amostra e universo antes de calcular conformidade; resultados de uma amostra direcionada não podem ser generalizados como taxa de toda a população. Classifique desvios pela consequência e pela necessidade de contenção, preservando evidência original e histórico da correção. Uma ação corretiva deve lidar com causa demonstrada e ter verificação de eficácia; treinamento genérico pode ser insuficiente quando o erro vem do processo. Em rastreabilidade, teste tanto a partir do produto para a origem quanto da origem para todos os destinos afetados. Entregue matriz de requisitos, registro de desvios, plano de ação e decisão condicionada aos limites do exame documental. A aplicação específica exige produzir matriz de critérios do edital e verificar a ligação com inventário de evidências. Compare sua conclusão com a regra do caso: Registrar três comprovados e dois pendentes, verificando a regra do processo antes de aceitar promessa como evidência. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Um edital argentino exige cinco critérios de acessibilidade, mas a proposta comprova três e promete resolver dois depois. Resolução: Registrar três comprovados e dois pendentes, verificando a regra do processo antes de aceitar promessa como evidência. Três de cinco representam 60% inicialmente comprovados. Se um falha na demonstração, a base de evidência muda e precisa de atualização antes da conclusão. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Declarar conformidade integral com base no compromisso futuro. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Uma demonstração revela que um dos três critérios falha em uso real. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.unido.org/learning-resources/building-trust-conformity-assessment-toolbox",
      "https://www.w3.org/WAI/tutorials/page-structure/content/"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-auditoria-de-origem-de-fibras-em-marcas-independentes",
    "title": "Auditoria de origem de fibras em marcas independentes",
    "track": "quality",
    "role": "Analista de conformidade e rastreabilidade",
    "positioning": "broad",
    "scenario": "Uma marca equatoriana vende cem peças com alegação de fibra rastreada, mas somente setenta possuem vínculo documental ao lote de origem.",
    "decision": "Limitar a alegação às setenta comprovadas e investigar as outras trinta.",
    "misconception": "Estender a alegação às cem porque a maioria possui documentação.",
    "changedConstraint": "Duas notas de origem se referem a lotes que não foram usados na coleção.",
    "tasks": [
      "Inventário de peças por lote",
      "Mapa de documentos de origem",
      "Conciliação de entrada e consumo",
      "Registro de alegações por produto",
      "Lista de lacunas de rastreabilidade",
      "Plano de correção de comunicação"
    ],
    "method": "Alegação de origem precisa acompanhar o produto específico e o lote efetivamente utilizado. Documento verdadeiro de um lote não comprova outro; maioria documentada não valida todo o catálogo. Transforme cada requisito em um teste observável com entrada, regra, evidência e responsável. Um documento assinado não comprova por si só que uma atividade aconteceu ou atendeu ao critério. Separe requisitos contratuais, legais e internos e registre a edição consultada, sem declarar certificação externa. Defina amostra e universo antes de calcular conformidade; resultados de uma amostra direcionada não podem ser generalizados como taxa de toda a população. Classifique desvios pela consequência e pela necessidade de contenção, preservando evidência original e histórico da correção. Uma ação corretiva deve lidar com causa demonstrada e ter verificação de eficácia; treinamento genérico pode ser insuficiente quando o erro vem do processo. Em rastreabilidade, teste tanto a partir do produto para a origem quanto da origem para todos os destinos afetados. Entregue matriz de requisitos, registro de desvios, plano de ação e decisão condicionada aos limites do exame documental. A aplicação específica exige produzir inventário de peças por lote e verificar a ligação com conciliação de entrada e consumo. Compare sua conclusão com a regra do caso: Limitar a alegação às setenta comprovadas e investigar as outras trinta. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma marca equatoriana vende cem peças com alegação de fibra rastreada, mas somente setenta possuem vínculo documental ao lote de origem. Resolução: Limitar a alegação às setenta comprovadas e investigar as outras trinta. Setenta por cento possuem vínculo inicial. A divergência das duas notas pode reduzir esse conjunto; revise a genealogia antes de calcular nova cobertura ou publicar a alegação. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Estender a alegação às cem porque a maioria possui documentação. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Duas notas de origem se referem a lotes que não foram usados na coleção. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.unido.org/learning-resources/building-trust-conformity-assessment-toolbox",
      "https://www.cec.org/flwm/method/mass-balance/"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-controle-de-versoes-em-procedimentos-de-cooperativas",
    "title": "Controle de versões em procedimentos de cooperativas",
    "track": "quality",
    "role": "Analista de conformidade e rastreabilidade",
    "positioning": "specialist",
    "scenario": "Uma cooperativa boliviana mantém vinte procedimentos; cinco postos usam cópia anterior e três não indicam edição.",
    "decision": "Localizar e substituir cópias obsoletas, identificar as três sem edição e confirmar uso da versão vigente.",
    "misconception": "Apagar o arquivo antigo central e presumir atualização em todos os postos.",
    "changedConstraint": "Uma alteração urgente é comunicada por mensagem sem revisão formal.",
    "tasks": [
      "Inventário de procedimentos vigentes",
      "Mapa de cópias por posto",
      "Registro de distribuição e retirada",
      "Fluxo de alteração emergencial",
      "Teste de localização de versão",
      "Evidência de confirmação de atualização"
    ],
    "method": "Controle de versão inclui distribuição e uso, não somente arquivo mestre. Uma instrução correta no servidor não protege um posto que continua executando cópia antiga. Alterações urgentes também precisam de rastreabilidade. Transforme cada requisito em um teste observável com entrada, regra, evidência e responsável. Um documento assinado não comprova por si só que uma atividade aconteceu ou atendeu ao critério. Separe requisitos contratuais, legais e internos e registre a edição consultada, sem declarar certificação externa. Defina amostra e universo antes de calcular conformidade; resultados de uma amostra direcionada não podem ser generalizados como taxa de toda a população. Classifique desvios pela consequência e pela necessidade de contenção, preservando evidência original e histórico da correção. Uma ação corretiva deve lidar com causa demonstrada e ter verificação de eficácia; treinamento genérico pode ser insuficiente quando o erro vem do processo. Em rastreabilidade, teste tanto a partir do produto para a origem quanto da origem para todos os destinos afetados. Entregue matriz de requisitos, registro de desvios, plano de ação e decisão condicionada aos limites do exame documental. A aplicação específica exige produzir inventário de procedimentos vigentes e verificar a ligação com registro de distribuição e retirada. Compare sua conclusão com a regra do caso: Localizar e substituir cópias obsoletas, identificar as três sem edição e confirmar uso da versão vigente. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma cooperativa boliviana mantém vinte procedimentos; cinco postos usam cópia anterior e três não indicam edição. Resolução: Localizar e substituir cópias obsoletas, identificar as três sem edição e confirmar uso da versão vigente. Cinco cópias são sabidamente antigas e três têm estado desconhecido. O plano precisa tratar os oito pontos antes de afirmar que todos trabalham com a versão válida. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Apagar o arquivo antigo central e presumir atualização em todos os postos. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Uma alteração urgente é comunicada por mensagem sem revisão formal. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.unido.org/learning-resources/building-trust-conformity-assessment-toolbox",
      "https://www.gov.uk/government/publications/civil-service-helping-you-with-managing-suppliers-and-contracts/contract-management-training-accreditation-foundation-level-takeaway-guide-html"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-conciliacao-de-pesagens-em-reciclagem-de-equipamentos",
    "title": "Conciliação de pesagens em reciclagem de equipamentos",
    "track": "quality",
    "role": "Analista de conformidade e rastreabilidade",
    "positioning": "specialist",
    "scenario": "Uma rede paraguaia recebe dez toneladas, envia seis para recuperação, duas para destino autorizado e mantém duas em estoque.",
    "decision": "Conciliar integralmente os dez e distinguir recuperação de destinação e estoque.",
    "misconception": "Divulgar recuperação de 100% somando todo material recebido.",
    "changedConstraint": "O destino informa que parte das seis toneladas exige nova separação.",
    "tasks": [
      "Balanço de massa recebido",
      "Registro de saída por destino",
      "Comprovantes documentais de recebimento",
      "Estoque por condição",
      "Indicador de recuperação comprovada",
      "Plano de revisão após retorno do destino"
    ],
    "method": "Movimentação e recuperação efetiva são eventos distintos. Enviar a um recuperador não prova resultado final sem informação compatível. Preserve estado provisório quando o destino ainda processa o material. Transforme cada requisito em um teste observável com entrada, regra, evidência e responsável. Um documento assinado não comprova por si só que uma atividade aconteceu ou atendeu ao critério. Separe requisitos contratuais, legais e internos e registre a edição consultada, sem declarar certificação externa. Defina amostra e universo antes de calcular conformidade; resultados de uma amostra direcionada não podem ser generalizados como taxa de toda a população. Classifique desvios pela consequência e pela necessidade de contenção, preservando evidência original e histórico da correção. Uma ação corretiva deve lidar com causa demonstrada e ter verificação de eficácia; treinamento genérico pode ser insuficiente quando o erro vem do processo. Em rastreabilidade, teste tanto a partir do produto para a origem quanto da origem para todos os destinos afetados. Entregue matriz de requisitos, registro de desvios, plano de ação e decisão condicionada aos limites do exame documental. A aplicação específica exige produzir balanço de massa recebido e verificar a ligação com comprovantes documentais de recebimento. Compare sua conclusão com a regra do caso: Conciliar integralmente os dez e distinguir recuperação de destinação e estoque. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma rede paraguaia recebe dez toneladas, envia seis para recuperação, duas para destino autorizado e mantém duas em estoque. Resolução: Conciliar integralmente os dez e distinguir recuperação de destinação e estoque. Seis sobre dez representam 60% enviados à recuperação, não necessariamente recuperados. Duas toneladas seguem outro destino e duas continuam no estoque, fechando o balanço físico. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Divulgar recuperação de 100% somando todo material recebido. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: O destino informa que parte das seis toneladas exige nova separação. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www.cec.org/flwm/method/mass-balance/",
      "https://www.unido.org/learning-resources/building-trust-conformity-assessment-toolbox"
    ],
    "region": "south-america"
  },
  {
    "id": "sa-avaliacao-de-completude-em-relatorios-de-impacto-social",
    "title": "Avaliação de completude em relatórios de impacto social",
    "track": "quality",
    "role": "Analista de conformidade e rastreabilidade",
    "positioning": "specialist",
    "scenario": "Uma organização brasileira acompanha duzentas pessoas, mas obtém resposta de resultado de apenas 120 e relata melhora em noventa.",
    "decision": "Informar melhora em 75% dos respondentes e cobertura de resposta de 60%, sem generalizar aos duzentos.",
    "misconception": "Divulgar 75% de melhora para todo o público acompanhado.",
    "changedConstraint": "Os não respondentes concentram pessoas com menor participação.",
    "tasks": [
      "Quadro de participantes acompanhados",
      "Registro de respostas por indicador",
      "Cálculo de cobertura de resposta",
      "Resultado entre respondentes",
      "Análise de perfil de não resposta",
      "Nota de limites de atribuição"
    ],
    "method": "Resultado entre respondentes depende da seleção de quem respondeu. Não resposta diferencial pode enviesar a interpretação. Melhorar após um programa também não demonstra que o programa causou a mudança. Transforme cada requisito em um teste observável com entrada, regra, evidência e responsável. Um documento assinado não comprova por si só que uma atividade aconteceu ou atendeu ao critério. Separe requisitos contratuais, legais e internos e registre a edição consultada, sem declarar certificação externa. Defina amostra e universo antes de calcular conformidade; resultados de uma amostra direcionada não podem ser generalizados como taxa de toda a população. Classifique desvios pela consequência e pela necessidade de contenção, preservando evidência original e histórico da correção. Uma ação corretiva deve lidar com causa demonstrada e ter verificação de eficácia; treinamento genérico pode ser insuficiente quando o erro vem do processo. Em rastreabilidade, teste tanto a partir do produto para a origem quanto da origem para todos os destinos afetados. Entregue matriz de requisitos, registro de desvios, plano de ação e decisão condicionada aos limites do exame documental. A aplicação específica exige produzir quadro de participantes acompanhados e verificar a ligação com cálculo de cobertura de resposta. Compare sua conclusão com a regra do caso: Informar melhora em 75% dos respondentes e cobertura de resposta de 60%, sem generalizar aos duzentos. Explique qual entrada permitiria chegar a uma conclusão diferente e conserve essa condição no memorando de entrega.",
    "workedExample": "Simulação educacional: Uma organização brasileira acompanha duzentas pessoas, mas obtém resposta de resultado de apenas 120 e relata melhora em noventa. Resolução: Informar melhora em 75% dos respondentes e cobertura de resposta de 60%, sem generalizar aos duzentos. Noventa sobre 120 são 75%; 120 sobre duzentos são 60%. Ambas as medidas são necessárias. O conjunto de oitenta sem resposta impede afirmar o mesmo resultado para todos. Para reproduzir o raciocínio, registre a entrada original em uma linha, a regra aplicada em outra e a saída com sua unidade. Em seguida, confronte a alternativa incorreta: Divulgar 75% de melhora para todo o público acompanhado. Essa alternativa precisa ser rejeitada pelos fatos do caso, e não apenas porque parece pouco profissional. Repita a análise com a nova restrição: Os não respondentes concentram pessoas com menor participação. Registre o que permanece válido, o que precisa ser recalculado e qual evidência falta para uma decisão operacional real.",
    "sources": [
      "https://www150.statcan.gc.ca/n1/pub/62f0026m/2011001/section2-eng.htm",
      "https://www150.statcan.gc.ca/n1/pub/12-539-x/steps-etapes/4058331-eng.htm"
    ],
    "region": "south-america"
  }
];

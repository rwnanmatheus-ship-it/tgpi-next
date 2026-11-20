import 'server-only';
import type { GlobalCourseSpec } from './types';

/** Original fictional occupational cases and authored technical instruction. */
export const north_americaSpecs: readonly GlobalCourseSpec[] = [
  {
    "id": "na-calibracao-de-incerteza-em-modelos-preditivos",
    "title": "Calibração de incerteza em modelos preditivos",
    "track": "ai",
    "role": "Analista de confiabilidade de modelos",
    "positioning": "broad",
    "scenario": "Em uma faixa de confiança 0,8, um classificador fictício acerta 60 de 100 casos. Outra faixa 0,6 contém 50 casos e 30 acertos.",
    "decision": "O erro ponderado dessas faixas é (100×0,2+50×0)/150=0,1333; recalibrar sem usar o teste final.",
    "misconception": "Declarar o modelo calibrado porque a acurácia global parece alta.",
    "changedConstraint": "A proporção da classe positiva dobra no próximo período.",
    "tasks": [
      "Diagrama de confiabilidade",
      "Tabela de faixas e contagens",
      "Separação de treino calibração e teste",
      "Cálculo de erro ponderado",
      "Política de abstenção",
      "Teste de mudança de prevalência"
    ],
    "method": "Calibrar significa comparar confiança declarada e frequência observada. Separe treino, calibração e teste; agrupe previsões em faixas e meça erro de calibração ponderado pelo número de casos. Uma previsão de 0,8 não significa certeza individual. Use curvas de confiabilidade e limite explícito para abstenção, mantendo o conjunto final intocado. Antes de medir um sistema de IA, escreva o uso pretendido, a população de tarefas e o tipo de dano que um erro pode causar. Separe seleção de configuração e avaliação final para não otimizar sobre a resposta do teste. Preserve amostras sintéticas e versões de entradas, modelo e parâmetros. Uma média precisa ser acompanhada da distribuição dos erros e das categorias críticas. Quando faltarem dados suficientes, documente a lacuna e proponha abstenção ou revisão responsável, em vez de converter confiança do sistema em certeza. O objetivo do laboratório é tornar a decisão reproduzível e permitir comparação honesta entre alternativas sob as mesmas condições. No caso deste curso, use diagrama de confiabilidade para explicitar a regra e cálculo de erro ponderado para demonstrar sua aplicação. Confira se teste de mudança de prevalência permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Em uma faixa de confiança 0,8, um classificador fictício acerta 60 de 100 casos. Outra faixa 0,6 contém 50 casos e 30 acertos. Resolução: O erro ponderado dessas faixas é (100×0,2+50×0)/150=0,1333; recalibrar sem usar o teste final. O erro a evitar é: Declarar o modelo calibrado porque a acurácia global parece alta. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A proporção da classe positiva dobra no próximo período. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://scikit-learn.org/stable/modules/calibration.html",
      "https://www.nist.gov/itl/ai-risk-management-framework",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-deteccao-de-contaminacao-em-benchmarks-de-linguagem",
    "title": "Detecção de contaminação em benchmarks de linguagem",
    "track": "ai",
    "role": "Curador de benchmarks de IA",
    "positioning": "broad",
    "scenario": "Um benchmark fictício tem 200 questões. Vinte possuem cópia literal no corpus e dez apenas tratam do mesmo tema com enunciado independente.",
    "decision": "Excluir ou reservar os vinte vazamentos confirmados, auditar os dez semelhantes e recalcular sobre 180 questões elegíveis.",
    "misconception": "Eliminar toda questão temática semelhante e anunciar ausência comprovada de contaminação.",
    "changedConstraint": "O fornecedor revela somente índices de documentos, sem o corpus original.",
    "tasks": [
      "Inventário de corpus",
      "Normalizador de texto",
      "Detector de duplicatas",
      "Registro de adjudicação",
      "Benchmark descontaminado",
      "Nota de cobertura da auditoria"
    ],
    "method": "Contaminação ocorre quando exemplos ou equivalentes do teste aparecem no treino ou no material usado durante ajuste. Compare hashes normalizados, similaridade textual e linhagem de versões. Separe duplicação literal de semelhança temática. Um detector indica suspeita; uma revisão documentada decide a exclusão e conserva o histórico. Antes de medir um sistema de IA, escreva o uso pretendido, a população de tarefas e o tipo de dano que um erro pode causar. Separe seleção de configuração e avaliação final para não otimizar sobre a resposta do teste. Preserve amostras sintéticas e versões de entradas, modelo e parâmetros. Uma média precisa ser acompanhada da distribuição dos erros e das categorias críticas. Quando faltarem dados suficientes, documente a lacuna e proponha abstenção ou revisão responsável, em vez de converter confiança do sistema em certeza. O objetivo do laboratório é tornar a decisão reproduzível e permitir comparação honesta entre alternativas sob as mesmas condições. No caso deste curso, use inventário de corpus para explicitar a regra e registro de adjudicação para demonstrar sua aplicação. Confira se nota de cobertura da auditoria permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um benchmark fictício tem 200 questões. Vinte possuem cópia literal no corpus e dez apenas tratam do mesmo tema com enunciado independente. Resolução: Excluir ou reservar os vinte vazamentos confirmados, auditar os dez semelhantes e recalcular sobre 180 questões elegíveis. O erro a evitar é: Eliminar toda questão temática semelhante e anunciar ausência comprovada de contaminação. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O fornecedor revela somente índices de documentos, sem o corpus original. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.nist.gov/itl/ai-risk-management-framework",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-roteamento-de-inferencia-entre-modelos-de-custo-diferente",
    "title": "Roteamento de inferência entre modelos de custo diferente",
    "track": "ai",
    "role": "Analista de operações de inferência",
    "positioning": "broad",
    "scenario": "Um serviço fictício recebe 1.000 pedidos. O modelo pequeno custa 0,01 por pedido e atende 800; os outros 200 exigem chamada adicional de 0,08.",
    "decision": "O custo é 1.000×0,01+200×0,08=26; comparar qualidade e privacidade com a alternativa de 80 para todas as chamadas grandes.",
    "misconception": "Contabilizar apenas os 800 atendimentos simples e ignorar as chamadas de escalonamento.",
    "changedConstraint": "O limite de latência cai de quatro para dois segundos.",
    "tasks": [
      "Matriz de dificuldade",
      "Contrato de roteamento",
      "Planilha de custo completo",
      "Conjunto de tarefas críticas",
      "Teste de latência",
      "Plano de contingência por fornecedor"
    ],
    "method": "Um roteador escolhe o modelo conforme risco, dificuldade e orçamento. Compare custo esperado por solicitação incluindo chamadas repetidas, validação e escalonamento. Defina um conjunto de tarefas que sempre exige revisão; não envie automaticamente conteúdo sensível a outro fornecedor. Avalie o roteador separadamente de cada modelo. Antes de medir um sistema de IA, escreva o uso pretendido, a população de tarefas e o tipo de dano que um erro pode causar. Separe seleção de configuração e avaliação final para não otimizar sobre a resposta do teste. Preserve amostras sintéticas e versões de entradas, modelo e parâmetros. Uma média precisa ser acompanhada da distribuição dos erros e das categorias críticas. Quando faltarem dados suficientes, documente a lacuna e proponha abstenção ou revisão responsável, em vez de converter confiança do sistema em certeza. O objetivo do laboratório é tornar a decisão reproduzível e permitir comparação honesta entre alternativas sob as mesmas condições. No caso deste curso, use matriz de dificuldade para explicitar a regra e conjunto de tarefas críticas para demonstrar sua aplicação. Confira se plano de contingência por fornecedor permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um serviço fictício recebe 1.000 pedidos. O modelo pequeno custa 0,01 por pedido e atende 800; os outros 200 exigem chamada adicional de 0,08. Resolução: O custo é 1.000×0,01+200×0,08=26; comparar qualidade e privacidade com a alternativa de 80 para todas as chamadas grandes. O erro a evitar é: Contabilizar apenas os 800 atendimentos simples e ignorar as chamadas de escalonamento. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O limite de latência cai de quatro para dois segundos. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.nist.gov/itl/ai-risk-management-framework",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-versionamento-de-embeddings-em-indices-vetoriais",
    "title": "Versionamento de embeddings em índices vetoriais",
    "track": "ai",
    "role": "Engenheiro de operações de busca vetorial",
    "positioning": "broad",
    "scenario": "Um índice fictício contém 600 documentos do modelo A. A equipe adiciona 400 vetores do modelo B, de mesma dimensão, e observa piora de recuperação.",
    "decision": "Criar índice B separado, recalcular os 1.000 documentos e comparar recuperação antes de trocar o tráfego.",
    "misconception": "Misturar os vetores porque todos têm 768 dimensões.",
    "changedConstraint": "A fonte remove cem documentos por mudança de licença.",
    "tasks": [
      "Manifesto de embeddings",
      "Contrato de distância",
      "Índice paralelo",
      "Conjunto de consultas de referência",
      "Relatório de migração",
      "Procedimento de exclusão e reversão"
    ],
    "method": "Vetores de modelos diferentes podem ocupar espaços incompatíveis mesmo com dimensão idêntica. Registre modelo, versão, normalização e métrica junto do índice. Uma migração segura reprocessa documentos e consultas com o mesmo contrato. Compare recuperação sobre consultas fixas e permita reversão ao índice anterior. Antes de medir um sistema de IA, escreva o uso pretendido, a população de tarefas e o tipo de dano que um erro pode causar. Separe seleção de configuração e avaliação final para não otimizar sobre a resposta do teste. Preserve amostras sintéticas e versões de entradas, modelo e parâmetros. Uma média precisa ser acompanhada da distribuição dos erros e das categorias críticas. Quando faltarem dados suficientes, documente a lacuna e proponha abstenção ou revisão responsável, em vez de converter confiança do sistema em certeza. O objetivo do laboratório é tornar a decisão reproduzível e permitir comparação honesta entre alternativas sob as mesmas condições. No caso deste curso, use manifesto de embeddings para explicitar a regra e conjunto de consultas de referência para demonstrar sua aplicação. Confira se procedimento de exclusão e reversão permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um índice fictício contém 600 documentos do modelo A. A equipe adiciona 400 vetores do modelo B, de mesma dimensão, e observa piora de recuperação. Resolução: Criar índice B separado, recalcular os 1.000 documentos e comparar recuperação antes de trocar o tráfego. O erro a evitar é: Misturar os vetores porque todos têm 768 dimensões. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A fonte remove cem documentos por mudança de licença. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://docs.pytorch.org/docs/stable/nn.functional.html",
      "https://www.nist.gov/itl/ai-risk-management-framework",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-avaliacao-de-agentes-por-maquinas-de-estados",
    "title": "Avaliação de agentes por máquinas de estados",
    "track": "ai",
    "role": "Analista de testes de agentes",
    "positioning": "broad",
    "scenario": "Um agente fictício confirma uma reserva, recebe timeout e tenta criar a mesma reserva novamente com outro identificador.",
    "decision": "Consultar o estado pelo identificador original e repetir apenas com a mesma chave idempotente; não presumir falha por timeout.",
    "misconception": "Criar outra reserva para garantir que pelo menos uma tentativa funcione.",
    "changedConstraint": "A ferramenta retorna sucesso depois que o usuário cancelou a intenção.",
    "tasks": [
      "Diagrama de estados",
      "Contrato de ferramentas",
      "Registro de chaves idempotentes",
      "Teste de timeout",
      "Teste de cancelamento",
      "Traço de execução verificável"
    ],
    "method": "Um agente com ferramentas precisa de estados, transições autorizadas e saídas observáveis. Especifique precondições e pós-condições por ação. Progresso textual não comprova alteração no sistema. Testes devem cobrir interrupção, repetição e falha entre confirmação e persistência, usando ferramentas simuladas e identificadores idempotentes. Antes de medir um sistema de IA, escreva o uso pretendido, a população de tarefas e o tipo de dano que um erro pode causar. Separe seleção de configuração e avaliação final para não otimizar sobre a resposta do teste. Preserve amostras sintéticas e versões de entradas, modelo e parâmetros. Uma média precisa ser acompanhada da distribuição dos erros e das categorias críticas. Quando faltarem dados suficientes, documente a lacuna e proponha abstenção ou revisão responsável, em vez de converter confiança do sistema em certeza. O objetivo do laboratório é tornar a decisão reproduzível e permitir comparação honesta entre alternativas sob as mesmas condições. No caso deste curso, use diagrama de estados para explicitar a regra e teste de timeout para demonstrar sua aplicação. Confira se traço de execução verificável permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um agente fictício confirma uma reserva, recebe timeout e tenta criar a mesma reserva novamente com outro identificador. Resolução: Consultar o estado pelo identificador original e repetir apenas com a mesma chave idempotente; não presumir falha por timeout. O erro a evitar é: Criar outra reserva para garantir que pelo menos uma tentativa funcione. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A ferramenta retorna sucesso depois que o usuário cancelou a intenção. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.nist.gov/itl/ai-risk-management-framework",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-monitoramento-de-deriva-em-modelos-com-rotulos-atrasados",
    "title": "Monitoramento de deriva em modelos com rótulos atrasados",
    "track": "ai",
    "role": "Analista de monitoramento de modelos",
    "positioning": "broad",
    "scenario": "Em dados fictícios, 30% dos rótulos da semana atual chegaram e 95% dos da semana anterior; a acurácia parcial cai de 90% para 70%.",
    "decision": "Não comparar diretamente; criar janela de maturação e verificar se os rótulos pendentes se concentram nos casos difíceis.",
    "misconception": "Reverter o modelo imediatamente usando a diferença entre amostras com maturidade desigual.",
    "changedConstraint": "O prazo mediano de chegada do rótulo passa de dois para cinco dias.",
    "tasks": [
      "Contrato de evento",
      "Painel de completude de rótulos",
      "Teste de deriva de entrada",
      "Coortes maduras",
      "Regra de alerta",
      "Plano de reavaliação temporal"
    ],
    "method": "Quando rótulos chegam depois, mudanças nas entradas são sinais antecipados e não prova de degradação. Monitore distribuição de atributos, cobertura e taxa de abstenção; depois una o rótulo à previsão original pela identidade do evento. Compare coortes de mesma maturidade para evitar viés temporal. Antes de medir um sistema de IA, escreva o uso pretendido, a população de tarefas e o tipo de dano que um erro pode causar. Separe seleção de configuração e avaliação final para não otimizar sobre a resposta do teste. Preserve amostras sintéticas e versões de entradas, modelo e parâmetros. Uma média precisa ser acompanhada da distribuição dos erros e das categorias críticas. Quando faltarem dados suficientes, documente a lacuna e proponha abstenção ou revisão responsável, em vez de converter confiança do sistema em certeza. O objetivo do laboratório é tornar a decisão reproduzível e permitir comparação honesta entre alternativas sob as mesmas condições. No caso deste curso, use contrato de evento para explicitar a regra e coortes maduras para demonstrar sua aplicação. Confira se plano de reavaliação temporal permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Em dados fictícios, 30% dos rótulos da semana atual chegaram e 95% dos da semana anterior; a acurácia parcial cai de 90% para 70%. Resolução: Não comparar diretamente; criar janela de maturação e verificar se os rótulos pendentes se concentram nos casos difíceis. O erro a evitar é: Reverter o modelo imediatamente usando a diferença entre amostras com maturidade desigual. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O prazo mediano de chegada do rótulo passa de dois para cinco dias. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.nist.gov/itl/ai-risk-management-framework",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-planejamento-de-capacidade-de-gpu-para-inferencia",
    "title": "Planejamento de capacidade de GPU para inferência",
    "track": "ai",
    "role": "Planejador de infraestrutura de IA",
    "positioning": "broad",
    "scenario": "Um serviço fictício recebe 12 pedidos por segundo e cada pedido permanece quatro segundos em processamento; a capacidade testada é de 40 concorrentes.",
    "decision": "A concorrência média estimada é 48; reduzir serviço ou ampliar capacidade antes de prometer estabilidade.",
    "misconception": "Usar a taxa de 12 pedidos como se fossem apenas 12 solicitações simultâneas.",
    "changedConstraint": "O contexto mediano aumenta de 2.000 para 8.000 tokens.",
    "tasks": [
      "Perfil de tokens",
      "Medição de memória",
      "Modelo de concorrência",
      "Teste de carga",
      "Política de fila",
      "Plano de capacidade com margem"
    ],
    "method": "Capacidade de inferência depende de tokens, comprimento de contexto, lote e memória, não apenas quantidade de requisições. Meça processamento de entrada e geração separadamente. Estime concorrência pela taxa de chegada e tempo de serviço; imponha fila limitada e orçamento de memória antes de aumentar o lote. Antes de medir um sistema de IA, escreva o uso pretendido, a população de tarefas e o tipo de dano que um erro pode causar. Separe seleção de configuração e avaliação final para não otimizar sobre a resposta do teste. Preserve amostras sintéticas e versões de entradas, modelo e parâmetros. Uma média precisa ser acompanhada da distribuição dos erros e das categorias críticas. Quando faltarem dados suficientes, documente a lacuna e proponha abstenção ou revisão responsável, em vez de converter confiança do sistema em certeza. O objetivo do laboratório é tornar a decisão reproduzível e permitir comparação honesta entre alternativas sob as mesmas condições. No caso deste curso, use perfil de tokens para explicitar a regra e teste de carga para demonstrar sua aplicação. Confira se plano de capacidade com margem permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um serviço fictício recebe 12 pedidos por segundo e cada pedido permanece quatro segundos em processamento; a capacidade testada é de 40 concorrentes. Resolução: A concorrência média estimada é 48; reduzir serviço ou ampliar capacidade antes de prometer estabilidade. O erro a evitar é: Usar a taxa de 12 pedidos como se fossem apenas 12 solicitações simultâneas. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O contexto mediano aumenta de 2.000 para 8.000 tokens. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://docs.pytorch.org/docs/stable/notes/cuda.html",
      "https://www.nist.gov/itl/ai-risk-management-framework",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-testes-de-regressao-de-extracao-estruturada-com-schemas",
    "title": "Testes de regressão de extração estruturada com schemas",
    "track": "ai",
    "role": "Analista de qualidade de extração com IA",
    "positioning": "broad",
    "scenario": "Em 100 faturas fictícias, todas produzem JSON válido, mas oito têm moeda errada e quatro omitem o fornecedor; dois registros têm ambos os erros.",
    "decision": "Há dez documentos com erro semântico ou de completude, não doze documentos distintos; medir também erros por campo.",
    "misconception": "Anunciar 100% de qualidade porque nenhum JSON apresentou erro de sintaxe.",
    "changedConstraint": "O novo fornecedor passa a emitir faturas multilíngues com separador decimal diferente.",
    "tasks": [
      "Schema versionado",
      "Validador semântico",
      "Corpus de faturas sintéticas",
      "Matriz de erro por campo",
      "Teste de sobreposição de erros",
      "Relatório de regressão"
    ],
    "method": "Extração estruturada precisa validar tipo, cardinalidade, campos obrigatórios e semântica. Um JSON sintaticamente válido pode conter data impossível ou valor na moeda errada. Separe falha de parser, falha de schema e erro factual. Preserve amostras redigidas e versões de schema para medir regressão por campo. Antes de medir um sistema de IA, escreva o uso pretendido, a população de tarefas e o tipo de dano que um erro pode causar. Separe seleção de configuração e avaliação final para não otimizar sobre a resposta do teste. Preserve amostras sintéticas e versões de entradas, modelo e parâmetros. Uma média precisa ser acompanhada da distribuição dos erros e das categorias críticas. Quando faltarem dados suficientes, documente a lacuna e proponha abstenção ou revisão responsável, em vez de converter confiança do sistema em certeza. O objetivo do laboratório é tornar a decisão reproduzível e permitir comparação honesta entre alternativas sob as mesmas condições. No caso deste curso, use schema versionado para explicitar a regra e matriz de erro por campo para demonstrar sua aplicação. Confira se relatório de regressão permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Em 100 faturas fictícias, todas produzem JSON válido, mas oito têm moeda errada e quatro omitem o fornecedor; dois registros têm ambos os erros. Resolução: Há dez documentos com erro semântico ou de completude, não doze documentos distintos; medir também erros por campo. O erro a evitar é: Anunciar 100% de qualidade porque nenhum JSON apresentou erro de sintaxe. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O novo fornecedor passa a emitir faturas multilíngues com separador decimal diferente. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.nist.gov/itl/ai-risk-management-framework",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-desenho-de-testes-contrafactuais-para-decisoes-automatizadas",
    "title": "Desenho de testes contrafactuais para decisões automatizadas",
    "track": "ai",
    "role": "Analista de avaliação de equidade algorítmica",
    "positioning": "broad",
    "scenario": "Em cinquenta pares fictícios de currículos com experiência idêntica e nomes diferentes, oito pares recebem recomendações opostas.",
    "decision": "Registrar divergência de 16%, investigar mecanismo e bloquear uso decisório até resolver a inconsistência; não inferir causalidade populacional ampla.",
    "misconception": "Descartar divergências como ruído porque a maioria dos pares manteve o resultado.",
    "changedConstraint": "A equipe troca nomes por endereços que funcionam como proxies geográficos.",
    "tasks": [
      "Protocolo contrafactual",
      "Pares de teste controlados",
      "Rubrica de divergência",
      "Análise de proxies",
      "Relatório de limitações",
      "Plano de mitigação e reteste"
    ],
    "method": "Um teste contrafactual altera um atributo irrelevante mantendo evidências relevantes constantes. Ele investiga sensibilidade indevida e não prova ausência completa de discriminação. Defina quais atributos podem legitimamente mudar a decisão, gere pares controlados e compare saídas e justificativas; avalie também proxies e efeitos de contexto. Antes de medir um sistema de IA, escreva o uso pretendido, a população de tarefas e o tipo de dano que um erro pode causar. Separe seleção de configuração e avaliação final para não otimizar sobre a resposta do teste. Preserve amostras sintéticas e versões de entradas, modelo e parâmetros. Uma média precisa ser acompanhada da distribuição dos erros e das categorias críticas. Quando faltarem dados suficientes, documente a lacuna e proponha abstenção ou revisão responsável, em vez de converter confiança do sistema em certeza. O objetivo do laboratório é tornar a decisão reproduzível e permitir comparação honesta entre alternativas sob as mesmas condições. No caso deste curso, use protocolo contrafactual para explicitar a regra e análise de proxies para demonstrar sua aplicação. Confira se plano de mitigação e reteste permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Em cinquenta pares fictícios de currículos com experiência idêntica e nomes diferentes, oito pares recebem recomendações opostas. Resolução: Registrar divergência de 16%, investigar mecanismo e bloquear uso decisório até resolver a inconsistência; não inferir causalidade populacional ampla. O erro a evitar é: Descartar divergências como ruído porque a maioria dos pares manteve o resultado. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A equipe troca nomes por endereços que funcionam como proxies geográficos. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.nist.gov/itl/ai-risk-management-framework",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-gestao-de-datasets-de-preferencia-para-alinhamento",
    "title": "Gestão de datasets de preferência para alinhamento",
    "track": "ai",
    "role": "Curador de dados de alinhamento",
    "positioning": "broad",
    "scenario": "Um conjunto fictício contém 120 pares: 70 preferências claras, 30 empates e vinte casos em que ambas as respostas inventam fatos.",
    "decision": "Manter categorias explícitas e excluir os vinte pares inadequados do ajuste por preferência até correção; não forçar vencedor.",
    "misconception": "Transformar todos os empates em preferência pela primeira resposta.",
    "changedConstraint": "O guia passa a priorizar concisão sem permitir perda de condições essenciais.",
    "tasks": [
      "Rubrica de preferência",
      "Registro de empates",
      "Auditoria de inadequação dupla",
      "Matriz de desacordo",
      "Separação de ajuste e teste",
      "Histórico de revisão de rótulos"
    ],
    "method": "Pares de preferência devem comparar respostas ao mesmo pedido sob uma rubrica consistente. Registre empate, inadequação de ambas e contexto do avaliador. Uma preferência não equivale a verdade factual. Meça desacordo por categoria, revise ambiguidades e mantenha exemplos de avaliação fora dos pares usados para ajuste. Antes de medir um sistema de IA, escreva o uso pretendido, a população de tarefas e o tipo de dano que um erro pode causar. Separe seleção de configuração e avaliação final para não otimizar sobre a resposta do teste. Preserve amostras sintéticas e versões de entradas, modelo e parâmetros. Uma média precisa ser acompanhada da distribuição dos erros e das categorias críticas. Quando faltarem dados suficientes, documente a lacuna e proponha abstenção ou revisão responsável, em vez de converter confiança do sistema em certeza. O objetivo do laboratório é tornar a decisão reproduzível e permitir comparação honesta entre alternativas sob as mesmas condições. No caso deste curso, use rubrica de preferência para explicitar a regra e matriz de desacordo para demonstrar sua aplicação. Confira se histórico de revisão de rótulos permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um conjunto fictício contém 120 pares: 70 preferências claras, 30 empates e vinte casos em que ambas as respostas inventam fatos. Resolução: Manter categorias explícitas e excluir os vinte pares inadequados do ajuste por preferência até correção; não forçar vencedor. O erro a evitar é: Transformar todos os empates em preferência pela primeira resposta. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O guia passa a priorizar concisão sem permitir perda de condições essenciais. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.nist.gov/itl/ai-risk-management-framework",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-inventario-criptografico-para-migracao-pos-quantica",
    "title": "Inventário criptográfico para migração pós-quântica",
    "track": "cyber",
    "role": "Analista de agilidade criptográfica",
    "positioning": "broad",
    "scenario": "Um inventário fictício inclui dez sistemas: três guardam dados sigilosos por quinze anos e sete processam dados efêmeros; dois dos três não aceitam atualização de biblioteca.",
    "decision": "Priorizar os três de longa confidencialidade, abrir tratamento dos dois legados e testar interoperabilidade antes de qualquer troca.",
    "misconception": "Escolher prioridade somente pela idade do servidor.",
    "changedConstraint": "Um fornecedor não apresenta cronograma de suporte a novos algoritmos.",
    "tasks": [
      "Inventário de algoritmos",
      "Mapa de dependências",
      "Classificação de longevidade",
      "Plano de laboratório",
      "Matriz de interoperabilidade",
      "Registro de riscos de fornecedor"
    ],
    "method": "Agilidade criptográfica começa identificando algoritmos, bibliotecas, certificados e dependências; não começa substituindo tudo. Classifique validade necessária da informação, exposição e capacidade de atualização. Diferencie criptografia simétrica, troca de chaves e assinatura. Uma migração depende de interoperabilidade testada e orientação institucional atualizada. Comece delimitando ativos, identidades, dados e fronteiras de confiança do ambiente autorizado. Para cada controle, escreva a ameaça que ele reduz, o evento que deveria bloquear e a evidência que comprova a execução. Um controle existente no desenho pode falhar na implantação ou na exceção operacional. Use apenas contas, arquivos e serviços de laboratório; nenhum teste requer credenciais reais ou exploração de terceiros. Registre precondição, resultado esperado, resultado observado e risco residual. Quando um controle afeta disponibilidade, planeje retorno e valide dependências antes da mudança. O relatório deve distinguir ausência de evidência, falha confirmada e limitação de cobertura. No caso deste curso, use inventário de algoritmos para explicitar a regra e plano de laboratório para demonstrar sua aplicação. Confira se registro de riscos de fornecedor permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um inventário fictício inclui dez sistemas: três guardam dados sigilosos por quinze anos e sete processam dados efêmeros; dois dos três não aceitam atualização de biblioteca. Resolução: Priorizar os três de longa confidencialidade, abrir tratamento dos dois legados e testar interoperabilidade antes de qualquer troca. O erro a evitar é: Escolher prioridade somente pela idade do servidor. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Um fornecedor não apresenta cronograma de suporte a novos algoritmos. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.nist.gov/cybersecurity/what-post-quantum-cryptography",
      "https://www.nist.gov/cyberframework",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
    ],
    "region": "north-america"
  },
  {
    "id": "na-priorizacao-de-vulnerabilidades-por-exposicao-e-exploracao",
    "title": "Priorização de vulnerabilidades por exposição e exploração",
    "track": "cyber",
    "role": "Analista de gestão de exposição",
    "positioning": "broad",
    "scenario": "Um caso fictício compara CVSS 9,8 em servidor isolado desligado com CVSS 8,1 explorada ativamente em portal público de autenticação.",
    "decision": "Tratar imediatamente o portal exposto e registrar plano para o servidor isolado, sem usar apenas a maior pontuação como ordem.",
    "misconception": "Corrigir primeiro o ativo desligado e deixar o portal explorado para o próximo mês.",
    "changedConstraint": "O servidor isolado será conectado à rede em 48 horas.",
    "tasks": [
      "Inventário de exposição",
      "Fila contextual de correção",
      "Registro de exploração conhecida",
      "Plano de mitigação",
      "Validação de versão",
      "Exceção com data de expiração"
    ],
    "method": "Pontuação técnica isolada não determina prioridade operacional. Combine exposição real, evidência de exploração, criticidade do ativo e controles compensatórios. Registre exceções com prazo. A validação é defensiva e autorizada: não explore serviço de terceiros. Confirme que a correção alcançou o ativo vulnerável por inventário e versão. Comece delimitando ativos, identidades, dados e fronteiras de confiança do ambiente autorizado. Para cada controle, escreva a ameaça que ele reduz, o evento que deveria bloquear e a evidência que comprova a execução. Um controle existente no desenho pode falhar na implantação ou na exceção operacional. Use apenas contas, arquivos e serviços de laboratório; nenhum teste requer credenciais reais ou exploração de terceiros. Registre precondição, resultado esperado, resultado observado e risco residual. Quando um controle afeta disponibilidade, planeje retorno e valide dependências antes da mudança. O relatório deve distinguir ausência de evidência, falha confirmada e limitação de cobertura. No caso deste curso, use inventário de exposição para explicitar a regra e plano de mitigação para demonstrar sua aplicação. Confira se exceção com data de expiração permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um caso fictício compara CVSS 9,8 em servidor isolado desligado com CVSS 8,1 explorada ativamente em portal público de autenticação. Resolução: Tratar imediatamente o portal exposto e registrar plano para o servidor isolado, sem usar apenas a maior pontuação como ordem. O erro a evitar é: Corrigir primeiro o ativo desligado e deixar o portal explorado para o próximo mês. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O servidor isolado será conectado à rede em 48 horas. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.nist.gov/cyberframework",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
    ],
    "region": "north-america"
  },
  {
    "id": "na-rastreabilidade-de-componentes-por-sbom-em-produtos-digitais",
    "title": "Rastreabilidade de componentes por SBOM em produtos digitais",
    "track": "cyber",
    "role": "Analista de cadeia de suprimentos de software",
    "positioning": "broad",
    "scenario": "Uma aplicação fictícia declara cem pacotes, mas o artefato distribuído contém oitenta, incluindo uma biblioteca transitiva ausente da lista manual.",
    "decision": "Gerar SBOM a partir do processo de construção e reconciliar a biblioteca transitiva com o hash do artefato entregue.",
    "misconception": "Usar a lista manual como prova de que nenhuma dependência transitiva existe.",
    "changedConstraint": "O mesmo produto passa a distribuir uma imagem de contêiner e um instalador desktop.",
    "tasks": [
      "SBOM de exemplo",
      "Mapa de relações transitivas",
      "Vínculo entre hash e versão",
      "Conferência do artefato",
      "Fila de impacto",
      "Procedimento de atualização do inventário"
    ],
    "method": "Uma SBOM descreve componentes e relações; precisa versão, origem e associação ao artefato distribuído. Diferencie dependência declarada, componente efetivamente empacotado e biblioteca carregada em execução. Cruze inventário com vulnerabilidades e validação de explorabilidade; não publique segredos ou caminhos internos desnecessários. Comece delimitando ativos, identidades, dados e fronteiras de confiança do ambiente autorizado. Para cada controle, escreva a ameaça que ele reduz, o evento que deveria bloquear e a evidência que comprova a execução. Um controle existente no desenho pode falhar na implantação ou na exceção operacional. Use apenas contas, arquivos e serviços de laboratório; nenhum teste requer credenciais reais ou exploração de terceiros. Registre precondição, resultado esperado, resultado observado e risco residual. Quando um controle afeta disponibilidade, planeje retorno e valide dependências antes da mudança. O relatório deve distinguir ausência de evidência, falha confirmada e limitação de cobertura. No caso deste curso, use sbom de exemplo para explicitar a regra e conferência do artefato para demonstrar sua aplicação. Confira se procedimento de atualização do inventário permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma aplicação fictícia declara cem pacotes, mas o artefato distribuído contém oitenta, incluindo uma biblioteca transitiva ausente da lista manual. Resolução: Gerar SBOM a partir do processo de construção e reconciliar a biblioteca transitiva com o hash do artefato entregue. O erro a evitar é: Usar a lista manual como prova de que nenhuma dependência transitiva existe. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O mesmo produto passa a distribuir uma imagem de contêiner e um instalador desktop. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.cisa.gov/sbom",
      "https://www.nist.gov/cyberframework",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
    ],
    "region": "north-america"
  },
  {
    "id": "na-controle-de-identidades-nao-humanas-em-integracoes-saas",
    "title": "Controle de identidades não humanas em integrações SaaS",
    "track": "cyber",
    "role": "Analista de identidades de máquina",
    "positioning": "broad",
    "scenario": "Um inventário fictício encontra vinte tokens: oito sem dono, seis sem uso em noventa dias e quatro presentes nas duas categorias.",
    "decision": "A união dos casos problemáticos tem dez tokens; mapear dependências antes de revogar e criar responsáveis para os oito órfãos.",
    "misconception": "Revogar todos sem verificar integrações ou somar oito e seis como catorze tokens distintos.",
    "changedConstraint": "Uma integração crítica não permite duas chaves simultâneas.",
    "tasks": [
      "Inventário de tokens fictícios",
      "Matriz de proprietários",
      "Mapa de dependências",
      "Plano de rotação",
      "Teste de revogação",
      "Política de expiração"
    ],
    "method": "Contas de serviço e tokens precisam dono, finalidade, escopo, validade e fluxo de revogação. Separe credencial de identidade e evite tokens compartilhados entre ambientes. A rotação exige sobreposição controlada, teste de dependências e verificação de retirada da chave antiga. Nunca registre a credencial real no exercício. Comece delimitando ativos, identidades, dados e fronteiras de confiança do ambiente autorizado. Para cada controle, escreva a ameaça que ele reduz, o evento que deveria bloquear e a evidência que comprova a execução. Um controle existente no desenho pode falhar na implantação ou na exceção operacional. Use apenas contas, arquivos e serviços de laboratório; nenhum teste requer credenciais reais ou exploração de terceiros. Registre precondição, resultado esperado, resultado observado e risco residual. Quando um controle afeta disponibilidade, planeje retorno e valide dependências antes da mudança. O relatório deve distinguir ausência de evidência, falha confirmada e limitação de cobertura. No caso deste curso, use inventário de tokens fictícios para explicitar a regra e plano de rotação para demonstrar sua aplicação. Confira se política de expiração permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um inventário fictício encontra vinte tokens: oito sem dono, seis sem uso em noventa dias e quatro presentes nas duas categorias. Resolução: A união dos casos problemáticos tem dez tokens; mapear dependências antes de revogar e criar responsáveis para os oito órfãos. O erro a evitar é: Revogar todos sem verificar integrações ou somar oito e seis como catorze tokens distintos. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma integração crítica não permite duas chaves simultâneas. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final",
      "https://www.nist.gov/cyberframework",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
    ],
    "region": "north-america"
  },
  {
    "id": "na-exercicios-de-restauracao-resistente-a-ransomware",
    "title": "Exercícios de restauração resistente a ransomware",
    "track": "cyber",
    "role": "Coordenador de exercícios de recuperação",
    "positioning": "broad",
    "scenario": "Uma empresa fictícia exige RPO de quatro horas e RTO de oito. O último backup utilizável tem dez horas e a restauração testada leva seis.",
    "decision": "O teste atende RTO e falha RPO; ajustar frequência e confirmar que restauração preserva integridade e acesso.",
    "misconception": "Declarar recuperação aprovada porque o serviço voltou em menos de oito horas.",
    "changedConstraint": "As credenciais administrativas originais ficam indisponíveis durante o exercício.",
    "tasks": [
      "Matriz RPO e RTO",
      "Mapa de dependências de restauração",
      "Roteiro isolado",
      "Verificação de integridade",
      "Registro de tempos",
      "Plano de recuperação de identidade"
    ],
    "method": "Backup só oferece recuperação demonstrada quando restauração, identidade, integridade e dependências são testadas. Defina RPO pela perda tolerável de dados e RTO pelo prazo de retomada. Teste em ambiente isolado com cópias sintéticas, sem malware. Diferencie cópia imutável, isolamento e capacidade de recuperar chaves. Comece delimitando ativos, identidades, dados e fronteiras de confiança do ambiente autorizado. Para cada controle, escreva a ameaça que ele reduz, o evento que deveria bloquear e a evidência que comprova a execução. Um controle existente no desenho pode falhar na implantação ou na exceção operacional. Use apenas contas, arquivos e serviços de laboratório; nenhum teste requer credenciais reais ou exploração de terceiros. Registre precondição, resultado esperado, resultado observado e risco residual. Quando um controle afeta disponibilidade, planeje retorno e valide dependências antes da mudança. O relatório deve distinguir ausência de evidência, falha confirmada e limitação de cobertura. No caso deste curso, use matriz rpo e rto para explicitar a regra e verificação de integridade para demonstrar sua aplicação. Confira se plano de recuperação de identidade permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma empresa fictícia exige RPO de quatro horas e RTO de oito. O último backup utilizável tem dez horas e a restauração testada leva seis. Resolução: O teste atende RTO e falha RPO; ajustar frequência e confirmar que restauração preserva integridade e acesso. O erro a evitar é: Declarar recuperação aprovada porque o serviço voltou em menos de oito horas. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: As credenciais administrativas originais ficam indisponíveis durante o exercício. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.nist.gov/cyberframework",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
    ],
    "region": "north-america"
  },
  {
    "id": "na-modelagem-de-autorizacao-em-apis-multiempresa",
    "title": "Modelagem de autorização em APIs multiempresa",
    "track": "cyber",
    "role": "Analista de segurança de APIs",
    "positioning": "broad",
    "scenario": "Uma API fictícia aceita tenantId no corpo. Um usuário da empresa A envia o identificador da empresa B e consegue baixar um relatório.",
    "decision": "Vincular locatário à sessão e validar autorização do objeto antes de leitura, inclusive no endpoint de exportação.",
    "misconception": "Apenas trocar identificadores sequenciais por UUIDs.",
    "changedConstraint": "O relatório passa a incluir arquivos armazenados em serviço separado.",
    "tasks": [
      "Matriz de ações e objetos",
      "Contrato de contexto de locatário",
      "Casos de acesso cruzado",
      "Teste de exportação",
      "Política de arquivos",
      "Relatório de regressão de autorização"
    ],
    "method": "Autenticação identifica o solicitante; autorização verifica ação, recurso e contexto. Em multiempresa, derive o identificador do locatário de uma associação confiável e valide em cada acesso. Teste leitura, alteração, exportação e recursos indiretos. Identificadores imprevisíveis não substituem controle de acesso por objeto. Comece delimitando ativos, identidades, dados e fronteiras de confiança do ambiente autorizado. Para cada controle, escreva a ameaça que ele reduz, o evento que deveria bloquear e a evidência que comprova a execução. Um controle existente no desenho pode falhar na implantação ou na exceção operacional. Use apenas contas, arquivos e serviços de laboratório; nenhum teste requer credenciais reais ou exploração de terceiros. Registre precondição, resultado esperado, resultado observado e risco residual. Quando um controle afeta disponibilidade, planeje retorno e valide dependências antes da mudança. O relatório deve distinguir ausência de evidência, falha confirmada e limitação de cobertura. No caso deste curso, use matriz de ações e objetos para explicitar a regra e teste de exportação para demonstrar sua aplicação. Confira se relatório de regressão de autorização permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma API fictícia aceita tenantId no corpo. Um usuário da empresa A envia o identificador da empresa B e consegue baixar um relatório. Resolução: Vincular locatário à sessão e validar autorização do objeto antes de leitura, inclusive no endpoint de exportação. O erro a evitar é: Apenas trocar identificadores sequenciais por UUIDs. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O relatório passa a incluir arquivos armazenados em serviço separado. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://owasp.org/API-Security/",
      "https://www.nist.gov/cyberframework",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
    ],
    "region": "north-america"
  },
  {
    "id": "na-verificacao-de-procedencia-de-artefatos-de-compilacao",
    "title": "Verificação de procedência de artefatos de compilação",
    "track": "cyber",
    "role": "Analista de integridade de builds",
    "positioning": "broad",
    "scenario": "Um pacote fictício possui assinatura válida, porém sua atestação aponta para commit diferente do aprovado na revisão.",
    "decision": "Bloquear a promoção até reconciliar o commit e reconstruir a partir da fonte aprovada; assinatura isolada não resolve a divergência.",
    "misconception": "Publicar o pacote porque qualquer assinatura válida comprova revisão.",
    "changedConstraint": "A compilação depende de uma imagem base atualizada sem digest fixo.",
    "tasks": [
      "Contrato de procedência",
      "Verificação de digest",
      "Mapa fonte artefato",
      "Lista de construtores autorizados",
      "Teste de dependência mutável",
      "Registro de bloqueio de promoção"
    ],
    "method": "Procedência de compilação registra fonte, processo e identidade que produziram um artefato. Assinatura válida identifica o emissor, mas não prova que a fonte era segura. Verifique vínculo entre commit revisado, construtor autorizado e digest do pacote. Rejeite alterações inesperadas de parâmetros e preserve evidências. Comece delimitando ativos, identidades, dados e fronteiras de confiança do ambiente autorizado. Para cada controle, escreva a ameaça que ele reduz, o evento que deveria bloquear e a evidência que comprova a execução. Um controle existente no desenho pode falhar na implantação ou na exceção operacional. Use apenas contas, arquivos e serviços de laboratório; nenhum teste requer credenciais reais ou exploração de terceiros. Registre precondição, resultado esperado, resultado observado e risco residual. Quando um controle afeta disponibilidade, planeje retorno e valide dependências antes da mudança. O relatório deve distinguir ausência de evidência, falha confirmada e limitação de cobertura. No caso deste curso, use contrato de procedência para explicitar a regra e lista de construtores autorizados para demonstrar sua aplicação. Confira se registro de bloqueio de promoção permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um pacote fictício possui assinatura válida, porém sua atestação aponta para commit diferente do aprovado na revisão. Resolução: Bloquear a promoção até reconciliar o commit e reconstruir a partir da fonte aprovada; assinatura isolada não resolve a divergência. O erro a evitar é: Publicar o pacote porque qualquer assinatura válida comprova revisão. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A compilação depende de uma imagem base atualizada sem digest fixo. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://slsa.dev/spec/v1.1/provenance",
      "https://www.nist.gov/cyberframework",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
    ],
    "region": "north-america"
  },
  {
    "id": "na-desenho-de-acesso-temporario-para-operacoes-privilegiadas",
    "title": "Desenho de acesso temporário para operações privilegiadas",
    "track": "cyber",
    "role": "Analista de acesso privilegiado",
    "positioning": "broad",
    "scenario": "Um operador fictício recebe privilégio por trinta minutos; o token emitido no início continua válido por oito horas.",
    "decision": "Alinhar validade do token e revogação ao prazo de concessão, testando chamadas após o minuto trinta.",
    "misconception": "Concluir que o acesso terminou porque a interface oculta o botão administrativo.",
    "changedConstraint": "Uma intervenção crítica exige prorrogação durante indisponibilidade do aprovador.",
    "tasks": [
      "Fluxo de concessão",
      "Matriz de privilégio mínimo",
      "Contrato de expiração",
      "Teste de token ativo",
      "Trilha de auditoria",
      "Procedimento de exceção emergencial"
    ],
    "method": "Acesso temporário reduz exposição quando tem aprovação adequada, escopo mínimo e expiração aplicada pelo sistema. Registre pedido, justificativa, aprovador e ações relevantes. Uma sessão aberta pode sobreviver ao fim da concessão se os tokens não forem tratados. Teste expiração em operações ativas e trilha de auditoria. Comece delimitando ativos, identidades, dados e fronteiras de confiança do ambiente autorizado. Para cada controle, escreva a ameaça que ele reduz, o evento que deveria bloquear e a evidência que comprova a execução. Um controle existente no desenho pode falhar na implantação ou na exceção operacional. Use apenas contas, arquivos e serviços de laboratório; nenhum teste requer credenciais reais ou exploração de terceiros. Registre precondição, resultado esperado, resultado observado e risco residual. Quando um controle afeta disponibilidade, planeje retorno e valide dependências antes da mudança. O relatório deve distinguir ausência de evidência, falha confirmada e limitação de cobertura. No caso deste curso, use fluxo de concessão para explicitar a regra e teste de token ativo para demonstrar sua aplicação. Confira se procedimento de exceção emergencial permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um operador fictício recebe privilégio por trinta minutos; o token emitido no início continua válido por oito horas. Resolução: Alinhar validade do token e revogação ao prazo de concessão, testando chamadas após o minuto trinta. O erro a evitar é: Concluir que o acesso terminou porque a interface oculta o botão administrativo. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma intervenção crítica exige prorrogação durante indisponibilidade do aprovador. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.nist.gov/cyberframework",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
    ],
    "region": "north-america"
  },
  {
    "id": "na-avaliacao-de-seguranca-de-webhooks-e-repeticoes",
    "title": "Avaliação de segurança de webhooks e repetições",
    "track": "cyber",
    "role": "Analista de segurança de integrações",
    "positioning": "broad",
    "scenario": "Um serviço fictício recebe evento de pagamento aprovado e depois evento antigo pendente; o mesmo aprovado chega três vezes.",
    "decision": "Persistir identificador processado e impedir regressão indevida do estado; reconciliar com o provedor quando a ordem for ambígua.",
    "misconception": "Atualizar o estado sempre com o último evento recebido.",
    "changedConstraint": "O provedor passa a reenviar eventos com mais de 24 horas de atraso.",
    "tasks": [
      "Contrato de assinatura",
      "Registro de eventos",
      "Máquina de estados",
      "Teste de repetição",
      "Teste de ordem invertida",
      "Plano de reconciliação"
    ],
    "method": "Webhooks confiáveis precisam autenticar origem, conferir conteúdo assinado e tolerar repetição legítima. Use corpo original para assinatura, registre identificador de evento e aplique transição idempotente. Uma entrega fora de ordem exige consulta ao estado autoritativo, não confiança cega na ordem de chegada. Comece delimitando ativos, identidades, dados e fronteiras de confiança do ambiente autorizado. Para cada controle, escreva a ameaça que ele reduz, o evento que deveria bloquear e a evidência que comprova a execução. Um controle existente no desenho pode falhar na implantação ou na exceção operacional. Use apenas contas, arquivos e serviços de laboratório; nenhum teste requer credenciais reais ou exploração de terceiros. Registre precondição, resultado esperado, resultado observado e risco residual. Quando um controle afeta disponibilidade, planeje retorno e valide dependências antes da mudança. O relatório deve distinguir ausência de evidência, falha confirmada e limitação de cobertura. No caso deste curso, use contrato de assinatura para explicitar a regra e teste de repetição para demonstrar sua aplicação. Confira se plano de reconciliação permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um serviço fictício recebe evento de pagamento aprovado e depois evento antigo pendente; o mesmo aprovado chega três vezes. Resolução: Persistir identificador processado e impedir regressão indevida do estado; reconciliar com o provedor quando a ordem for ambígua. O erro a evitar é: Atualizar o estado sempre com o último evento recebido. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O provedor passa a reenviar eventos com mais de 24 horas de atraso. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://docs.stripe.com/webhooks",
      "https://www.nist.gov/cyberframework",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
    ],
    "region": "north-america"
  },
  {
    "id": "na-minimizacao-de-dados-em-registros-de-observabilidade",
    "title": "Minimização de dados em registros de observabilidade",
    "track": "cyber",
    "role": "Analista de privacidade em observabilidade",
    "positioning": "broad",
    "scenario": "Um log fictício mascara senha no corpo, mas registra o token no cabeçalho Authorization e o e-mail na query string.",
    "decision": "Remover credenciais antes da emissão e substituir identificadores por referência operacional controlada; verificar todos os canais do evento.",
    "misconception": "Considerar o log seguro porque o campo password está mascarado.",
    "changedConstraint": "Uma ferramenta de suporte passa a exportar logs para fornecedor externo.",
    "tasks": [
      "Inventário de campos",
      "Regras de redação",
      "Teste de cabeçalhos",
      "Política de retenção",
      "Mapa de exportação",
      "Procedimento de investigação com acesso mínimo"
    ],
    "method": "Logs devem ajudar diagnóstico sem coletar senhas, tokens ou conteúdo pessoal desnecessário. Classifique campos antes da emissão, aplique redação estruturada e retenção proporcional. Hash simples de dado previsível pode permitir reidentificação. Teste fontes alternativas de vazamento, como cabeçalhos, erros e parâmetros de URL. Comece delimitando ativos, identidades, dados e fronteiras de confiança do ambiente autorizado. Para cada controle, escreva a ameaça que ele reduz, o evento que deveria bloquear e a evidência que comprova a execução. Um controle existente no desenho pode falhar na implantação ou na exceção operacional. Use apenas contas, arquivos e serviços de laboratório; nenhum teste requer credenciais reais ou exploração de terceiros. Registre precondição, resultado esperado, resultado observado e risco residual. Quando um controle afeta disponibilidade, planeje retorno e valide dependências antes da mudança. O relatório deve distinguir ausência de evidência, falha confirmada e limitação de cobertura. No caso deste curso, use inventário de campos para explicitar a regra e política de retenção para demonstrar sua aplicação. Confira se procedimento de investigação com acesso mínimo permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um log fictício mascara senha no corpo, mas registra o token no cabeçalho Authorization e o e-mail na query string. Resolução: Remover credenciais antes da emissão e substituir identificadores por referência operacional controlada; verificar todos os canais do evento. O erro a evitar é: Considerar o log seguro porque o campo password está mascarado. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma ferramenta de suporte passa a exportar logs para fornecedor externo. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.nist.gov/cyberframework",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
    ],
    "region": "north-america"
  },
  {
    "id": "na-analise-de-sobrevivencia-para-cancelamento-com-censura",
    "title": "Análise de sobrevivência para cancelamento com censura",
    "track": "data",
    "role": "Analista de retenção e sobrevivência",
    "positioning": "broad",
    "scenario": "Dez contratos fictícios começam juntos; dois cancelam no mês um, dois no mês dois e seis seguem ativos ao fim do estudo.",
    "decision": "A sobrevivência estimada após mês dois é (8/10)×(6/8)=0,6; os seis ativos são censurados, não cancelamentos de duração dois.",
    "misconception": "Calcular duração média usando apenas os quatro cancelados e aplicar a todos.",
    "changedConstraint": "Três contratos entram no estudo depois do primeiro mês.",
    "tasks": [
      "Tabela de risco",
      "Registro de censura",
      "Curva de sobrevivência",
      "Cálculo manual por intervalo",
      "Análise de entrada tardia",
      "Nota de interpretação"
    ],
    "method": "Tempo até cancelamento exige distinguir evento observado e cliente ainda ativo no fim da janela. O cliente censurado contribui enquanto está em risco. Use tabela de risco e estimador de sobrevivência em cada tempo; médias calculadas só sobre cancelados subestimam duração. Declare período e condições de observação. Defina primeiro a unidade de análise, o denominador, a janela temporal e a pergunta que o resultado poderá responder. Preserve identificadores e origem para reproduzir cada transformação; registre exclusões e dados ausentes. Faça uma conferência manual pequena antes de aplicar a regra ao conjunto completo. Compare a conclusão com uma alternativa simples e teste o que acontece quando muda uma premissa essencial. Associação, previsão e causalidade exigem evidências diferentes e não devem ser usadas como sinônimos. Uma apresentação com muitas casas decimais não elimina erro de medição, seleção ou interpretação. Entregue cálculo, hipótese, teste e limite em formato legível. No caso deste curso, use tabela de risco para explicitar a regra e cálculo manual por intervalo para demonstrar sua aplicação. Confira se nota de interpretação permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Dez contratos fictícios começam juntos; dois cancelam no mês um, dois no mês dois e seis seguem ativos ao fim do estudo. Resolução: A sobrevivência estimada após mês dois é (8/10)×(6/8)=0,6; os seis ativos são censurados, não cancelamentos de duração dois. O erro a evitar é: Calcular duração média usando apenas os quatro cancelados e aplicar a todos. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Três contratos entram no estudo depois do primeiro mês. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/apr/apr.htm",
      "https://www.itl.nist.gov/div898/handbook/",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-desenho-de-testes-sequenciais-sem-inflar-falsos-positivos",
    "title": "Desenho de testes sequenciais sem inflar falsos positivos",
    "track": "data",
    "role": "Analista de experimentação sequencial",
    "positioning": "broad",
    "scenario": "Um teste fictício verifica p-valor diariamente por vinte dias e para no dia em que aparece 0,04, sem regra sequencial.",
    "decision": "Tratar o achado como exploratório e refazer análise com procedimento e dados adequados; não interpretar 0,04 como teste único planejado.",
    "misconception": "Anunciar vitória definitiva e apagar os dezenove resultados anteriores.",
    "changedConstraint": "O diretor solicita parada antecipada por aumento de falhas graves.",
    "tasks": [
      "Plano de experimento",
      "Calendário de análises",
      "Regra de parada",
      "Métrica de proteção",
      "Registro de decisões",
      "Relatório confirmatório e exploratório"
    ],
    "method": "Inspecionar um experimento repetidamente e parar no primeiro resultado favorável altera o erro estatístico. Defina horizonte, métricas, regra de interrupção e método sequencial antes do teste. Diferencie pausa operacional por dano de parada por significância. Registre análises exploratórias sem apresentá-las como confirmação pré-especificada. Defina primeiro a unidade de análise, o denominador, a janela temporal e a pergunta que o resultado poderá responder. Preserve identificadores e origem para reproduzir cada transformação; registre exclusões e dados ausentes. Faça uma conferência manual pequena antes de aplicar a regra ao conjunto completo. Compare a conclusão com uma alternativa simples e teste o que acontece quando muda uma premissa essencial. Associação, previsão e causalidade exigem evidências diferentes e não devem ser usadas como sinônimos. Uma apresentação com muitas casas decimais não elimina erro de medição, seleção ou interpretação. Entregue cálculo, hipótese, teste e limite em formato legível. No caso deste curso, use plano de experimento para explicitar a regra e métrica de proteção para demonstrar sua aplicação. Confira se relatório confirmatório e exploratório permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um teste fictício verifica p-valor diariamente por vinte dias e para no dia em que aparece 0,04, sem regra sequencial. Resolução: Tratar o achado como exploratório e refazer análise com procedimento e dados adequados; não interpretar 0,04 como teste único planejado. O erro a evitar é: Anunciar vitória definitiva e apagar os dezenove resultados anteriores. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O diretor solicita parada antecipada por aumento de falhas graves. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-reconciliacao-de-receitas-entre-eventos-e-razao-contabil",
    "title": "Reconciliação de receitas entre eventos e razão contábil",
    "track": "data",
    "role": "Analista de reconciliação de dados financeiros",
    "positioning": "broad",
    "scenario": "Um caso fictício tem vendas de 10.000, estornos de 500, taxa de 300 e 1.000 ainda não liquidados. O banco recebe 8.200.",
    "decision": "Reconciliar 10.000−500−300−1.000=8.200, separando receita líquida de recebimento e sem tratar toda diferença como erro.",
    "misconception": "Registrar 8.200 como receita total do período só porque esse foi o depósito.",
    "changedConstraint": "Um estorno ocorre no mês seguinte à venda original.",
    "tasks": [
      "Mapa de grãos",
      "Ponte de reconciliação",
      "Dicionário de estados",
      "Teste de moeda",
      "Tratamento de estorno tardio",
      "Relatório de diferenças temporais"
    ],
    "method": "Eventos operacionais e contabilidade representam fatos em grãos e momentos distintos. Defina identidade da transação, reconhecimento, estorno e moeda. Faça ponte entre pedido, pagamento, liquidação e receita reconhecida; preserve diferenças temporais como categorias explicadas, em vez de forçar igualdade de totais. Defina primeiro a unidade de análise, o denominador, a janela temporal e a pergunta que o resultado poderá responder. Preserve identificadores e origem para reproduzir cada transformação; registre exclusões e dados ausentes. Faça uma conferência manual pequena antes de aplicar a regra ao conjunto completo. Compare a conclusão com uma alternativa simples e teste o que acontece quando muda uma premissa essencial. Associação, previsão e causalidade exigem evidências diferentes e não devem ser usadas como sinônimos. Uma apresentação com muitas casas decimais não elimina erro de medição, seleção ou interpretação. Entregue cálculo, hipótese, teste e limite em formato legível. No caso deste curso, use mapa de grãos para explicitar a regra e teste de moeda para demonstrar sua aplicação. Confira se relatório de diferenças temporais permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um caso fictício tem vendas de 10.000, estornos de 500, taxa de 300 e 1.000 ainda não liquidados. O banco recebe 8.200. Resolução: Reconciliar 10.000−500−300−1.000=8.200, separando receita líquida de recebimento e sem tratar toda diferença como erro. O erro a evitar é: Registrar 8.200 como receita total do período só porque esse foi o depósito. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Um estorno ocorre no mês seguinte à venda original. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-qualidade-de-dados-em-series-com-mudanca-de-horario",
    "title": "Qualidade de dados em séries com mudança de horário",
    "track": "data",
    "role": "Analista de qualidade temporal de dados",
    "positioning": "broad",
    "scenario": "Uma série fictícia registra duas ocorrências de 01:30 no fim do horário de verão, uma com offset −04:00 e outra −05:00.",
    "decision": "Manter as duas observações como instantes separados por uma hora; não deduplicar pelo texto local.",
    "misconception": "Excluir uma ocorrência porque o horário visível é igual.",
    "changedConstraint": "Uma filial envia timestamps locais sem offset nem zona.",
    "tasks": [
      "Contrato temporal",
      "Mapa de zonas",
      "Casos de hora repetida",
      "Regra de ingestão ambígua",
      "Teste de agregação diária",
      "Relatório de duração real"
    ],
    "method": "Séries temporais devem preservar instante, zona e regra de agregação. Horas repetidas e inexistentes no horário de verão tornam ambíguo um texto local sem offset. Armazene instante inequívoco, converta para apresentação e teste agregações por dia local; duração real não é sempre diferença de relógios locais. Defina primeiro a unidade de análise, o denominador, a janela temporal e a pergunta que o resultado poderá responder. Preserve identificadores e origem para reproduzir cada transformação; registre exclusões e dados ausentes. Faça uma conferência manual pequena antes de aplicar a regra ao conjunto completo. Compare a conclusão com uma alternativa simples e teste o que acontece quando muda uma premissa essencial. Associação, previsão e causalidade exigem evidências diferentes e não devem ser usadas como sinônimos. Uma apresentação com muitas casas decimais não elimina erro de medição, seleção ou interpretação. Entregue cálculo, hipótese, teste e limite em formato legível. No caso deste curso, use contrato temporal para explicitar a regra e regra de ingestão ambígua para demonstrar sua aplicação. Confira se relatório de duração real permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma série fictícia registra duas ocorrências de 01:30 no fim do horário de verão, uma com offset −04:00 e outra −05:00. Resolução: Manter as duas observações como instantes separados por uma hora; não deduplicar pelo texto local. O erro a evitar é: Excluir uma ocorrência porque o horário visível é igual. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma filial envia timestamps locais sem offset nem zona. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://docs.python.org/3/library/zoneinfo.html",
      "https://www.itl.nist.gov/div898/handbook/",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-privacidade-diferencial-para-publicacao-de-contagens",
    "title": "Privacidade diferencial para publicação de contagens",
    "track": "data",
    "role": "Analista de publicação estatística privada",
    "positioning": "broad",
    "scenario": "Um painel fictício permite uma contribuição por pessoa e publica cinco contagens, cada uma com orçamento epsilon 0,2 sob composição básica.",
    "decision": "Registrar orçamento composto de até 1,0 e impedir consultas ilimitadas; explicitar precisão e unidade protegida.",
    "misconception": "Afirmar proteção ilimitada porque cada consulta contém números aleatórios.",
    "changedConstraint": "A mesma pessoa passa a contribuir em dez categorias.",
    "tasks": [
      "Definição de unidade protegida",
      "Análise de sensibilidade",
      "Registro de orçamento",
      "Simulador de ruído",
      "Avaliação de utilidade",
      "Política de consultas repetidas"
    ],
    "method": "Privacidade diferencial limita influência de uma contribuição segundo mecanismo e orçamento definidos. Delimite unidade protegida, sensibilidade, vizinhança e composição antes de adicionar ruído. Dados com ruído não se tornam automaticamente corretos para qualquer uso. Publicações repetidas consomem orçamento e podem acumular exposição. Defina primeiro a unidade de análise, o denominador, a janela temporal e a pergunta que o resultado poderá responder. Preserve identificadores e origem para reproduzir cada transformação; registre exclusões e dados ausentes. Faça uma conferência manual pequena antes de aplicar a regra ao conjunto completo. Compare a conclusão com uma alternativa simples e teste o que acontece quando muda uma premissa essencial. Associação, previsão e causalidade exigem evidências diferentes e não devem ser usadas como sinônimos. Uma apresentação com muitas casas decimais não elimina erro de medição, seleção ou interpretação. Entregue cálculo, hipótese, teste e limite em formato legível. No caso deste curso, use definição de unidade protegida para explicitar a regra e simulador de ruído para demonstrar sua aplicação. Confira se política de consultas repetidas permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um painel fictício permite uma contribuição por pessoa e publica cinco contagens, cada uma com orçamento epsilon 0,2 sob composição básica. Resolução: Registrar orçamento composto de até 1,0 e impedir consultas ilimitadas; explicitar precisão e unidade protegida. O erro a evitar é: Afirmar proteção ilimitada porque cada consulta contém números aleatórios. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A mesma pessoa passa a contribuir em dez categorias. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.nist.gov/itl/applied-cybersecurity/privacy-engineering/collaboration-space/focus-areas/de-id/differential-privacy",
      "https://www.itl.nist.gov/div898/handbook/",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-deteccao-de-anomalias-com-sazonalidade-operacional",
    "title": "Detecção de anomalias com sazonalidade operacional",
    "track": "data",
    "role": "Analista de detecção de anomalias",
    "positioning": "broad",
    "scenario": "Um atendimento fictício recebe em média 200 chamados às segundas e oitenta aos domingos. Um domingo com 150 ficaria abaixo do limite global 180.",
    "decision": "Comparar com domingos equivalentes e investigar aumento de 87,5%, sem chamar o valor normal por estar abaixo de 180.",
    "misconception": "Usar o mesmo limiar bruto para todos os dias.",
    "changedConstraint": "Um feriado nacional altera o padrão de uma segunda-feira.",
    "tasks": [
      "Calendário operacional",
      "Baseline sazonal",
      "Detector de desvios",
      "Catálogo de eventos",
      "Teste de feriado",
      "Avaliação de custo de alertas"
    ],
    "method": "Desvios precisam ser comparados com um comportamento esperado compatível com dia, hora e evento conhecido. Separe sazonalidade, tendência e mudança estrutural. Limites fixos globais podem alarmar em picos normais e ocultar quedas em períodos críticos. Avalie alertas por custo de investigação e falhas perdidas. Defina primeiro a unidade de análise, o denominador, a janela temporal e a pergunta que o resultado poderá responder. Preserve identificadores e origem para reproduzir cada transformação; registre exclusões e dados ausentes. Faça uma conferência manual pequena antes de aplicar a regra ao conjunto completo. Compare a conclusão com uma alternativa simples e teste o que acontece quando muda uma premissa essencial. Associação, previsão e causalidade exigem evidências diferentes e não devem ser usadas como sinônimos. Uma apresentação com muitas casas decimais não elimina erro de medição, seleção ou interpretação. Entregue cálculo, hipótese, teste e limite em formato legível. No caso deste curso, use calendário operacional para explicitar a regra e catálogo de eventos para demonstrar sua aplicação. Confira se avaliação de custo de alertas permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um atendimento fictício recebe em média 200 chamados às segundas e oitenta aos domingos. Um domingo com 150 ficaria abaixo do limite global 180. Resolução: Comparar com domingos equivalentes e investigar aumento de 87,5%, sem chamar o valor normal por estar abaixo de 180. O erro a evitar é: Usar o mesmo limiar bruto para todos os dias. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Um feriado nacional altera o padrão de uma segunda-feira. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-validacao-de-modelos-de-previsao-com-janelas-moveis",
    "title": "Validação de modelos de previsão com janelas móveis",
    "track": "data",
    "role": "Analista de validação temporal",
    "positioning": "broad",
    "scenario": "Um modelo fictício prevê vendas no dia primeiro usando um indicador mensal revisado no dia vinte, mas o treino o trata como conhecido no início.",
    "decision": "Reconstruir a versão disponível na data de previsão e repetir o backtest; o indicador final não era uma entrada legítima.",
    "misconception": "Aprovar o modelo porque o corte das linhas foi feito por data.",
    "changedConstraint": "O prazo de publicação do indicador aumenta dez dias.",
    "tasks": [
      "Calendário de disponibilidade",
      "Backtest de origem móvel",
      "Baseline ingênuo",
      "Erro por horizonte",
      "Auditoria de vazamento",
      "Teste de revisão de dados"
    ],
    "method": "Previsão deve ser avaliada respeitando a ordem temporal e a informação disponível na origem. Separe horizontes, rode janelas móveis e compare com baseline simples. Variáveis consolidadas depois da data da previsão geram vazamento mesmo sem misturar linhas futuras explicitamente. Reporte erro por horizonte. Defina primeiro a unidade de análise, o denominador, a janela temporal e a pergunta que o resultado poderá responder. Preserve identificadores e origem para reproduzir cada transformação; registre exclusões e dados ausentes. Faça uma conferência manual pequena antes de aplicar a regra ao conjunto completo. Compare a conclusão com uma alternativa simples e teste o que acontece quando muda uma premissa essencial. Associação, previsão e causalidade exigem evidências diferentes e não devem ser usadas como sinônimos. Uma apresentação com muitas casas decimais não elimina erro de medição, seleção ou interpretação. Entregue cálculo, hipótese, teste e limite em formato legível. No caso deste curso, use calendário de disponibilidade para explicitar a regra e erro por horizonte para demonstrar sua aplicação. Confira se teste de revisão de dados permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um modelo fictício prevê vendas no dia primeiro usando um indicador mensal revisado no dia vinte, mas o treino o trata como conhecido no início. Resolução: Reconstruir a versão disponível na data de previsão e repetir o backtest; o indicador final não era uma entrada legítima. O erro a evitar é: Aprovar o modelo porque o corte das linhas foi feito por data. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O prazo de publicação do indicador aumenta dez dias. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://scikit-learn.org/stable/modules/cross_validation.html",
      "https://www.itl.nist.gov/div898/handbook/",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-rastreabilidade-de-metricas-em-camadas-semanticas",
    "title": "Rastreabilidade de métricas em camadas semânticas",
    "track": "data",
    "role": "Analista de engenharia de métricas",
    "positioning": "broad",
    "scenario": "Duas lojas fictícias têm 10 vendas em cem visitas e noventa vendas em trezentas visitas.",
    "decision": "A conversão conjunta é 100/400=25%, não a média simples de 10% e 30%, que seria 20%.",
    "misconception": "Publicar média não ponderada como conversão total.",
    "changedConstraint": "Uma sessão passa a poder gerar vários pedidos.",
    "tasks": [
      "Contrato de métrica",
      "Modelo de entidades",
      "Teste de cardinalidade",
      "Cálculo ponderado",
      "Histórico semântico",
      "Casos de múltiplos pedidos"
    ],
    "method": "Uma camada semântica define métrica, entidade, dimensão, janela e regra de agregação. Razões não devem ser somadas sem os denominadores correspondentes. Controle relações de cardinalidade para impedir duplicação por junções. Toda alteração precisa versão e exemplos que evidenciem mudança de interpretação. Defina primeiro a unidade de análise, o denominador, a janela temporal e a pergunta que o resultado poderá responder. Preserve identificadores e origem para reproduzir cada transformação; registre exclusões e dados ausentes. Faça uma conferência manual pequena antes de aplicar a regra ao conjunto completo. Compare a conclusão com uma alternativa simples e teste o que acontece quando muda uma premissa essencial. Associação, previsão e causalidade exigem evidências diferentes e não devem ser usadas como sinônimos. Uma apresentação com muitas casas decimais não elimina erro de medição, seleção ou interpretação. Entregue cálculo, hipótese, teste e limite em formato legível. No caso deste curso, use contrato de métrica para explicitar a regra e cálculo ponderado para demonstrar sua aplicação. Confira se casos de múltiplos pedidos permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Duas lojas fictícias têm 10 vendas em cem visitas e noventa vendas em trezentas visitas. Resolução: A conversão conjunta é 100/400=25%, não a média simples de 10% e 30%, que seria 20%. O erro a evitar é: Publicar média não ponderada como conversão total. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma sessão passa a poder gerar vários pedidos. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-amostragem-estratificada-para-auditoria-de-qualidade",
    "title": "Amostragem estratificada para auditoria de qualidade",
    "track": "data",
    "role": "Analista de auditoria amostral",
    "positioning": "broad",
    "scenario": "Uma população fictícia tem novecentos itens comuns e cem críticos. A amostra contém cinquenta de cada; falham cinco comuns e vinte críticos.",
    "decision": "Estimar taxa ponderada de 0,9×0,1+0,1×0,4=13%, e distinguir dos 25% brutos da amostra.",
    "misconception": "Anunciar que um quarto de toda a produção falha usando a amostra desbalanceada.",
    "changedConstraint": "O grupo crítico passa de 10% para 25% do volume.",
    "tasks": [
      "Plano de estratos",
      "Tabela de inclusão",
      "Pesos amostrais",
      "Estimativa ponderada",
      "Registro de incerteza",
      "Teste de mudança de composição"
    ],
    "method": "Uma auditoria estratificada separa grupos com risco ou frequência diferentes. Registre probabilidade de inclusão e use pesos para estimar o total. Amostra enriquecida em casos críticos melhora investigação, mas a proporção bruta não representa necessariamente a população. Declare incerteza e diferenças entre detecção e estimação. Defina primeiro a unidade de análise, o denominador, a janela temporal e a pergunta que o resultado poderá responder. Preserve identificadores e origem para reproduzir cada transformação; registre exclusões e dados ausentes. Faça uma conferência manual pequena antes de aplicar a regra ao conjunto completo. Compare a conclusão com uma alternativa simples e teste o que acontece quando muda uma premissa essencial. Associação, previsão e causalidade exigem evidências diferentes e não devem ser usadas como sinônimos. Uma apresentação com muitas casas decimais não elimina erro de medição, seleção ou interpretação. Entregue cálculo, hipótese, teste e limite em formato legível. No caso deste curso, use plano de estratos para explicitar a regra e estimativa ponderada para demonstrar sua aplicação. Confira se teste de mudança de composição permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma população fictícia tem novecentos itens comuns e cem críticos. A amostra contém cinquenta de cada; falham cinco comuns e vinte críticos. Resolução: Estimar taxa ponderada de 0,9×0,1+0,1×0,4=13%, e distinguir dos 25% brutos da amostra. O erro a evitar é: Anunciar que um quarto de toda a produção falha usando a amostra desbalanceada. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O grupo crítico passa de 10% para 25% do volume. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-mapeamento-de-linhagem-para-incidentes-de-dados",
    "title": "Mapeamento de linhagem para incidentes de dados",
    "track": "data",
    "role": "Analista de confiabilidade de pipelines",
    "positioning": "broad",
    "scenario": "Um lote fictício duplicado alimentou dois painéis e três exportações; um dos painéis usou partição anterior e não foi afetado.",
    "decision": "Confirmar execuções e partições para restringir impacto a um painel e três exportações antes de corrigir e avisar responsáveis.",
    "misconception": "Reprocessar tudo e declarar cinco destinos afetados só pelo grafo estático.",
    "changedConstraint": "Uma exportação já foi usada em decisão externa.",
    "tasks": [
      "Grafo de linhagem",
      "Registro de execução",
      "Matriz de impacto",
      "Plano de reprocessamento",
      "Conferência de identidades",
      "Memorando de correção"
    ],
    "method": "Linhagem conecta origem, transformação, destino e versão executada. Um grafo de dependências planejadas não comprova quais dados foram usados na execução real. Registre lotes, partições, horários e regras; delimite impacto antes de reprocessar. Valide restauração com contagens e identidades, não apenas término do job. Defina primeiro a unidade de análise, o denominador, a janela temporal e a pergunta que o resultado poderá responder. Preserve identificadores e origem para reproduzir cada transformação; registre exclusões e dados ausentes. Faça uma conferência manual pequena antes de aplicar a regra ao conjunto completo. Compare a conclusão com uma alternativa simples e teste o que acontece quando muda uma premissa essencial. Associação, previsão e causalidade exigem evidências diferentes e não devem ser usadas como sinônimos. Uma apresentação com muitas casas decimais não elimina erro de medição, seleção ou interpretação. Entregue cálculo, hipótese, teste e limite em formato legível. No caso deste curso, use grafo de linhagem para explicitar a regra e plano de reprocessamento para demonstrar sua aplicação. Confira se memorando de correção permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um lote fictício duplicado alimentou dois painéis e três exportações; um dos painéis usou partição anterior e não foi afetado. Resolução: Confirmar execuções e partições para restringir impacto a um painel e três exportações antes de corrigir e avisar responsáveis. O erro a evitar é: Reprocessar tudo e declarar cinco destinos afetados só pelo grafo estático. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma exportação já foi usada em decisão externa. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/",
      "https://scikit-learn.org/stable/model_selection.html"
    ],
    "region": "north-america"
  },
  {
    "id": "na-analise-de-cargas-coincidentes-para-eletrificacao-predial",
    "title": "Análise de cargas coincidentes para eletrificação predial",
    "track": "energy",
    "role": "Analista de planejamento de eletrificação",
    "positioning": "broad",
    "scenario": "Um edifício fictício tem pico existente de 80 kW, carga nova de 40 kW e vinte kW deslocáveis fora do pico; o limite contratual é cem kW.",
    "decision": "No cenário com deslocamento comprovado, o pico chega a cem kW; sem controle, chega a 120 kW e ultrapassa o limite.",
    "misconception": "Concluir que há folga porque o consumo mensal médio equivale a sessenta kW.",
    "changedConstraint": "A carga flexível precisa operar durante o pico por exigência do ocupante.",
    "tasks": [
      "Perfil horário",
      "Mapa de coincidência",
      "Cenários de flexibilidade",
      "Comparação com limite",
      "Plano de medição",
      "Lista de validações profissionais"
    ],
    "method": "Eletrificação exige avaliar perfil horário e coincidência, não somar apenas potências nominais nem usar consumo mensal como pico. Registre demanda existente, flexibilidade e restrições de serviço. A análise é de planejamento com dados simulados; dimensionamento e intervenção elétrica exigem profissionais habilitados e normas locais. Estabeleça a fronteira física, o período e as unidades antes de comparar cenários de energia. Diferencie potência instantânea, energia acumulada e capacidade utilizável. Uma estimativa de planejamento precisa registrar perdas, disponibilidade e hipóteses de operação; não substitui projeto executivo, autorização ou avaliação de profissional habilitado. Faça análise de sensibilidade para uma entrada que possa mudar e preserve a versão de cada fator utilizado. Identifique quais dados seriam medidos e quais são apenas fornecidos pelo caso sintético. A recomendação deve explicar as condições em que permanece válida e os pontos que exigem verificação técnica antes de qualquer aplicação real. No caso deste curso, use perfil horário para explicitar a regra e comparação com limite para demonstrar sua aplicação. Confira se lista de validações profissionais permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um edifício fictício tem pico existente de 80 kW, carga nova de 40 kW e vinte kW deslocáveis fora do pico; o limite contratual é cem kW. Resolução: No cenário com deslocamento comprovado, o pico chega a cem kW; sem controle, chega a 120 kW e ultrapassa o limite. O erro a evitar é: Concluir que há folga porque o consumo mensal médio equivale a sessenta kW. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A carga flexível precisa operar durante o pico por exigência do ocupante. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.energy.gov/femp/measurement-and-verification",
      "https://www.energy.gov/eere/buildings/building-technologies-office"
    ],
    "region": "north-america"
  },
  {
    "id": "na-monitoramento-de-desempenho-de-bombas-de-calor",
    "title": "Monitoramento de desempenho de bombas de calor",
    "track": "energy",
    "role": "Analista de desempenho térmico",
    "positioning": "broad",
    "scenario": "Em um ensaio fictício, são entregues 30 kWh térmicos com dez kWh elétricos do compressor e dois kWh auxiliares.",
    "decision": "O COP da fronteira total é 30/12=2,5; registrar separadamente o COP de três quando o auxiliar é excluído.",
    "misconception": "Anunciar COP três como desempenho completo omitindo energia auxiliar.",
    "changedConstraint": "Um período de degelo aumenta a energia auxiliar para quatro kWh.",
    "tasks": [
      "Fronteira energética",
      "Registro de sensores",
      "Cálculo de COP",
      "Segmentação por temperatura",
      "Análise de degelo",
      "Plano de investigação de desvio"
    ],
    "method": "Desempenho de bomba de calor depende de temperatura externa, carga, degelo e energia auxiliar. Compare calor útil entregue e eletricidade no mesmo intervalo e fronteira. COP instantâneo não equivale a desempenho sazonal. Investigue sensores e condições antes de atribuir variação a defeito de equipamento. Estabeleça a fronteira física, o período e as unidades antes de comparar cenários de energia. Diferencie potência instantânea, energia acumulada e capacidade utilizável. Uma estimativa de planejamento precisa registrar perdas, disponibilidade e hipóteses de operação; não substitui projeto executivo, autorização ou avaliação de profissional habilitado. Faça análise de sensibilidade para uma entrada que possa mudar e preserve a versão de cada fator utilizado. Identifique quais dados seriam medidos e quais são apenas fornecidos pelo caso sintético. A recomendação deve explicar as condições em que permanece válida e os pontos que exigem verificação técnica antes de qualquer aplicação real. No caso deste curso, use fronteira energética para explicitar a regra e segmentação por temperatura para demonstrar sua aplicação. Confira se plano de investigação de desvio permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Em um ensaio fictício, são entregues 30 kWh térmicos com dez kWh elétricos do compressor e dois kWh auxiliares. Resolução: O COP da fronteira total é 30/12=2,5; registrar separadamente o COP de três quando o auxiliar é excluído. O erro a evitar é: Anunciar COP três como desempenho completo omitindo energia auxiliar. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Um período de degelo aumenta a energia auxiliar para quatro kWh. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.energy.gov/femp/measurement-and-verification",
      "https://www.energy.gov/eere/buildings/building-technologies-office"
    ],
    "region": "north-america"
  },
  {
    "id": "na-gestao-de-flexibilidade-de-recarga-de-frotas",
    "title": "Gestão de flexibilidade de recarga de frotas",
    "track": "energy",
    "role": "Planejador de recarga de frotas",
    "positioning": "broad",
    "scenario": "Dez veículos fictícios precisam de vinte kWh cada entre 22h e 6h. O local permite quarenta kW e a eficiência assumida é 90%.",
    "decision": "A energia da rede é 200/0,9=222,22 kWh; a potência média necessária é 27,78 kW em oito horas, sujeita aos horários individuais.",
    "misconception": "Dividir duzentos por oito e ignorar perdas e veículos com saída antecipada.",
    "changedConstraint": "Quatro veículos precisam sair às duas horas.",
    "tasks": [
      "Matriz de necessidades",
      "Janelas de partida",
      "Curva de potência agregada",
      "Cálculo de perdas",
      "Simulação de prioridade",
      "Plano de contingência de carregador"
    ],
    "method": "Planeje recarga por energia necessária, janela disponível, potência efetiva e restrição do local. Potência nominal não garante fornecimento contínuo. Preserve reserva operacional e prioridade de saída. Uma estratégia só é viável se atende cada veículo e o limite agregado; use simulação sem operar equipamentos reais. Estabeleça a fronteira física, o período e as unidades antes de comparar cenários de energia. Diferencie potência instantânea, energia acumulada e capacidade utilizável. Uma estimativa de planejamento precisa registrar perdas, disponibilidade e hipóteses de operação; não substitui projeto executivo, autorização ou avaliação de profissional habilitado. Faça análise de sensibilidade para uma entrada que possa mudar e preserve a versão de cada fator utilizado. Identifique quais dados seriam medidos e quais são apenas fornecidos pelo caso sintético. A recomendação deve explicar as condições em que permanece válida e os pontos que exigem verificação técnica antes de qualquer aplicação real. No caso deste curso, use matriz de necessidades para explicitar a regra e cálculo de perdas para demonstrar sua aplicação. Confira se plano de contingência de carregador permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Dez veículos fictícios precisam de vinte kWh cada entre 22h e 6h. O local permite quarenta kW e a eficiência assumida é 90%. Resolução: A energia da rede é 200/0,9=222,22 kWh; a potência média necessária é 27,78 kW em oito horas, sujeita aos horários individuais. O erro a evitar é: Dividir duzentos por oito e ignorar perdas e veículos com saída antecipada. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Quatro veículos precisam sair às duas horas. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://afdc.energy.gov/fuels/electricity_infrastructure.html",
      "https://www.energy.gov/femp/measurement-and-verification",
      "https://www.energy.gov/eere/buildings/building-technologies-office"
    ],
    "region": "north-america"
  },
  {
    "id": "na-verificacao-de-economia-energetica-com-baseline-ajustado",
    "title": "Verificação de economia energética com baseline ajustado",
    "track": "energy",
    "role": "Analista de medição e verificação",
    "positioning": "broad",
    "scenario": "Uma fábrica fictícia consumia mil kWh para cem unidades e passa a novecentos kWh para oitenta unidades.",
    "decision": "A intensidade piora de dez para 11,25 kWh por unidade; a queda de 10% no consumo não demonstra ganho de eficiência.",
    "misconception": "Anunciar economia de dez por cento sem considerar queda da produção.",
    "changedConstraint": "A fábrica muda a composição para produto mais intensivo em energia.",
    "tasks": [
      "Baseline de referência",
      "Mapa de variáveis de ajuste",
      "Modelo de intensidade",
      "Registro de eventos não rotineiros",
      "Teste de composição",
      "Relatório de economia e limites"
    ],
    "method": "Economia é diferença entre consumo observado e contrafactual ajustado às condições. Mantenha fronteira, clima, ocupação e produção comparáveis. Redução bruta pode refletir menor atividade, não eficiência. Documente variáveis, período de referência e eventos não rotineiros; dados faltantes precisam tratamento explícito. Estabeleça a fronteira física, o período e as unidades antes de comparar cenários de energia. Diferencie potência instantânea, energia acumulada e capacidade utilizável. Uma estimativa de planejamento precisa registrar perdas, disponibilidade e hipóteses de operação; não substitui projeto executivo, autorização ou avaliação de profissional habilitado. Faça análise de sensibilidade para uma entrada que possa mudar e preserve a versão de cada fator utilizado. Identifique quais dados seriam medidos e quais são apenas fornecidos pelo caso sintético. A recomendação deve explicar as condições em que permanece válida e os pontos que exigem verificação técnica antes de qualquer aplicação real. No caso deste curso, use baseline de referência para explicitar a regra e registro de eventos não rotineiros para demonstrar sua aplicação. Confira se relatório de economia e limites permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma fábrica fictícia consumia mil kWh para cem unidades e passa a novecentos kWh para oitenta unidades. Resolução: A intensidade piora de dez para 11,25 kWh por unidade; a queda de 10% no consumo não demonstra ganho de eficiência. O erro a evitar é: Anunciar economia de dez por cento sem considerar queda da produção. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A fábrica muda a composição para produto mais intensivo em energia. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.energy.gov/femp/measurement-and-verification",
      "https://www.energy.gov/eere/buildings/building-technologies-office"
    ],
    "region": "north-america"
  },
  {
    "id": "na-planejamento-de-resiliencia-com-armazenamento-distribuido",
    "title": "Planejamento de resiliência com armazenamento distribuído",
    "track": "energy",
    "role": "Analista de resiliência energética",
    "positioning": "broad",
    "scenario": "Uma bateria fictícia de cem kWh tem reserva de 20% e eficiência de descarga de 90%; as cargas críticas demandam doze kW constantes.",
    "decision": "A energia entregue estimada é 100×0,8×0,9=72 kWh e a autonomia simplificada é seis horas.",
    "misconception": "Dividir cem por doze e prometer mais de oito horas sem considerar reserva e perdas.",
    "changedConstraint": "Uma carga crítica adicional de seis kW precisa ser incorporada.",
    "tasks": [
      "Inventário de cargas críticas",
      "Fronteira de energia útil",
      "Cálculo de autonomia",
      "Cenário de potência",
      "Teste de carga adicional",
      "Dossiê de validação técnica"
    ],
    "method": "Autonomia depende de energia utilizável, perfil da carga, eficiência e reserva. kW limita potência instantânea; kWh limita duração. Separe cargas críticas e opcionais. Uma estimativa de planejamento não aprova instalação, proteção ou operação em ilha, que exigem análise técnica e autorização local. Estabeleça a fronteira física, o período e as unidades antes de comparar cenários de energia. Diferencie potência instantânea, energia acumulada e capacidade utilizável. Uma estimativa de planejamento precisa registrar perdas, disponibilidade e hipóteses de operação; não substitui projeto executivo, autorização ou avaliação de profissional habilitado. Faça análise de sensibilidade para uma entrada que possa mudar e preserve a versão de cada fator utilizado. Identifique quais dados seriam medidos e quais são apenas fornecidos pelo caso sintético. A recomendação deve explicar as condições em que permanece válida e os pontos que exigem verificação técnica antes de qualquer aplicação real. No caso deste curso, use inventário de cargas críticas para explicitar a regra e cenário de potência para demonstrar sua aplicação. Confira se dossiê de validação técnica permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma bateria fictícia de cem kWh tem reserva de 20% e eficiência de descarga de 90%; as cargas críticas demandam doze kW constantes. Resolução: A energia entregue estimada é 100×0,8×0,9=72 kWh e a autonomia simplificada é seis horas. O erro a evitar é: Dividir cem por doze e prometer mais de oito horas sem considerar reserva e perdas. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma carga crítica adicional de seis kW precisa ser incorporada. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.energy.gov/oe/energy-storage",
      "https://www.energy.gov/femp/measurement-and-verification",
      "https://www.energy.gov/eere/buildings/building-technologies-office"
    ],
    "region": "north-america"
  },
  {
    "id": "na-conciliacao-de-certificados-de-energia-por-periodo-e-local",
    "title": "Conciliação de certificados de energia por período e local",
    "track": "energy",
    "role": "Analista de atributos de energia",
    "positioning": "broad",
    "scenario": "Uma empresa fictícia consome mil MWh e possui oitocentos certificados válidos de um MWh; cem deles já foram cancelados para outra filial.",
    "decision": "Só setecentos MWh estão disponíveis para esta declaração; não reivindicar cobertura integral nem reutilizar certificados cancelados.",
    "misconception": "Contar os oitocentos em duas filiais porque pertencem ao mesmo grupo.",
    "changedConstraint": "O registro muda o período permitido para correspondência de consumo.",
    "tasks": [
      "Livro de atributos",
      "Mapa de titularidade",
      "Reconciliação de consumo",
      "Registro de cancelamento",
      "Teste de dupla contagem",
      "Nota metodológica de declaração"
    ],
    "method": "Atributos energéticos precisam correspondência entre emissão, titularidade, consumo e cancelamento. Separe eletricidade física de instrumento contratual e declare método de contabilização. Um certificado não autoriza dupla contagem. Fronteira temporal e geográfica depende do programa e da norma aplicável, que devem ser verificadas. Estabeleça a fronteira física, o período e as unidades antes de comparar cenários de energia. Diferencie potência instantânea, energia acumulada e capacidade utilizável. Uma estimativa de planejamento precisa registrar perdas, disponibilidade e hipóteses de operação; não substitui projeto executivo, autorização ou avaliação de profissional habilitado. Faça análise de sensibilidade para uma entrada que possa mudar e preserve a versão de cada fator utilizado. Identifique quais dados seriam medidos e quais são apenas fornecidos pelo caso sintético. A recomendação deve explicar as condições em que permanece válida e os pontos que exigem verificação técnica antes de qualquer aplicação real. No caso deste curso, use livro de atributos para explicitar a regra e registro de cancelamento para demonstrar sua aplicação. Confira se nota metodológica de declaração permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma empresa fictícia consome mil MWh e possui oitocentos certificados válidos de um MWh; cem deles já foram cancelados para outra filial. Resolução: Só setecentos MWh estão disponíveis para esta declaração; não reivindicar cobertura integral nem reutilizar certificados cancelados. O erro a evitar é: Contar os oitocentos em duas filiais porque pertencem ao mesmo grupo. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O registro muda o período permitido para correspondência de consumo. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.epa.gov/green-power-markets/renewable-energy-certificates-recs",
      "https://www.energy.gov/femp/measurement-and-verification",
      "https://www.energy.gov/eere/buildings/building-technologies-office"
    ],
    "region": "north-america"
  },
  {
    "id": "na-analise-de-risco-climatico-para-continuidade-de-instalacoes",
    "title": "Análise de risco climático para continuidade de instalações",
    "track": "energy",
    "role": "Analista de adaptação de instalações",
    "positioning": "broad",
    "scenario": "Uma instalação fictícia tem dois acessos; ambos atravessam a mesma área de inundação e são tratados como redundância independente.",
    "decision": "Registrar falha de causa comum e procurar rota ou estoque alternativo fora da área compartilhada.",
    "misconception": "Contar dois acessos como garantia de continuidade sem analisar a geografia.",
    "changedConstraint": "Uma subestação que alimenta o local também está na mesma área de risco.",
    "tasks": [
      "Mapa de dependências",
      "Matriz ameaça exposição vulnerabilidade",
      "Análise de causa comum",
      "Cenários de interrupção",
      "Prioridade de adaptação",
      "Registro de risco residual"
    ],
    "method": "Risco climático combina ameaça, exposição e vulnerabilidade. Diferencie evento agudo e mudança crônica; não transforme cenário em previsão exata. Relacione dependências de água, energia, pessoas e transporte. Avalie medidas por custo, redução de exposição e risco residual, usando mapas oficiais com escala e data. Estabeleça a fronteira física, o período e as unidades antes de comparar cenários de energia. Diferencie potência instantânea, energia acumulada e capacidade utilizável. Uma estimativa de planejamento precisa registrar perdas, disponibilidade e hipóteses de operação; não substitui projeto executivo, autorização ou avaliação de profissional habilitado. Faça análise de sensibilidade para uma entrada que possa mudar e preserve a versão de cada fator utilizado. Identifique quais dados seriam medidos e quais são apenas fornecidos pelo caso sintético. A recomendação deve explicar as condições em que permanece válida e os pontos que exigem verificação técnica antes de qualquer aplicação real. No caso deste curso, use mapa de dependências para explicitar a regra e cenários de interrupção para demonstrar sua aplicação. Confira se registro de risco residual permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma instalação fictícia tem dois acessos; ambos atravessam a mesma área de inundação e são tratados como redundância independente. Resolução: Registrar falha de causa comum e procurar rota ou estoque alternativo fora da área compartilhada. O erro a evitar é: Contar dois acessos como garantia de continuidade sem analisar a geografia. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma subestação que alimenta o local também está na mesma área de risco. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.energy.gov/femp/measurement-and-verification",
      "https://www.energy.gov/eere/buildings/building-technologies-office"
    ],
    "region": "north-america"
  },
  {
    "id": "na-avaliacao-de-perdas-e-indisponibilidade-em-ativos-solares",
    "title": "Avaliação de perdas e indisponibilidade em ativos solares",
    "track": "energy",
    "role": "Analista de operações solares",
    "positioning": "broad",
    "scenario": "Uma planta fictícia tinha potencial estimado de cem MWh; perdeu oito por restrição da rede, cinco por indisponibilidade e dois por sujeira.",
    "decision": "A produção estimada é 85 MWh; atribuir cada perda à categoria correta e validar se as categorias se sobrepõem.",
    "misconception": "Somar toda perda ao indicador de falha dos inversores.",
    "changedConstraint": "Dois eventos de restrição de rede coincidem com manutenção programada.",
    "tasks": [
      "Árvore de perdas",
      "Conferência temporal",
      "Registro de disponibilidade",
      "Tratamento de sobreposição",
      "Relatório de desempenho",
      "Plano de investigação prioritária"
    ],
    "method": "Desempenho fotovoltaico exige separar recurso solar, disponibilidade, limitação de rede, sujeira e falha de medição. Compare períodos equivalentes e mantenha irradiância e energia sincronizadas. Energia não gerada por restrição externa não deve ser atribuída automaticamente à manutenção. Use dados fictícios e não execute intervenção elétrica. Estabeleça a fronteira física, o período e as unidades antes de comparar cenários de energia. Diferencie potência instantânea, energia acumulada e capacidade utilizável. Uma estimativa de planejamento precisa registrar perdas, disponibilidade e hipóteses de operação; não substitui projeto executivo, autorização ou avaliação de profissional habilitado. Faça análise de sensibilidade para uma entrada que possa mudar e preserve a versão de cada fator utilizado. Identifique quais dados seriam medidos e quais são apenas fornecidos pelo caso sintético. A recomendação deve explicar as condições em que permanece válida e os pontos que exigem verificação técnica antes de qualquer aplicação real. No caso deste curso, use árvore de perdas para explicitar a regra e tratamento de sobreposição para demonstrar sua aplicação. Confira se plano de investigação prioritária permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma planta fictícia tinha potencial estimado de cem MWh; perdeu oito por restrição da rede, cinco por indisponibilidade e dois por sujeira. Resolução: A produção estimada é 85 MWh; atribuir cada perda à categoria correta e validar se as categorias se sobrepõem. O erro a evitar é: Somar toda perda ao indicador de falha dos inversores. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Dois eventos de restrição de rede coincidem com manutenção programada. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.energy.gov/femp/measurement-and-verification",
      "https://www.energy.gov/eere/buildings/building-technologies-office"
    ],
    "region": "north-america"
  },
  {
    "id": "na-planejamento-de-manutencao-eolica-com-janela-meteorologica",
    "title": "Planejamento de manutenção eólica com janela meteorológica",
    "track": "energy",
    "role": "Planejador de manutenção eólica",
    "positioning": "broad",
    "scenario": "Um serviço fictício precisa duas horas de acesso, quatro de trabalho e uma de retorno. A previsão oferece janela de seis horas.",
    "decision": "A janela é insuficiente para sete horas previstas, antes de margem; reprogramar ou redefinir escopo com responsável técnico.",
    "misconception": "Executar porque o trabalho principal dura apenas quatro horas.",
    "changedConstraint": "A entrega da peça ocorre duas horas depois do horário planejado.",
    "tasks": [
      "Matriz de pré-requisitos",
      "Janela meteorológica",
      "Cronograma de mobilização",
      "Plano de peças",
      "Cenário de adiamento",
      "Registro de decisão do responsável"
    ],
    "method": "Janelas de manutenção dependem de condição meteorológica, acesso, equipe qualificada, peças e limites do fabricante. Planeje alternativas e custos de adiamento; não ensine execução em altura ou elétrica sem treinamento específico. A duração da janela deve cobrir mobilização, serviço e margem de retorno. Estabeleça a fronteira física, o período e as unidades antes de comparar cenários de energia. Diferencie potência instantânea, energia acumulada e capacidade utilizável. Uma estimativa de planejamento precisa registrar perdas, disponibilidade e hipóteses de operação; não substitui projeto executivo, autorização ou avaliação de profissional habilitado. Faça análise de sensibilidade para uma entrada que possa mudar e preserve a versão de cada fator utilizado. Identifique quais dados seriam medidos e quais são apenas fornecidos pelo caso sintético. A recomendação deve explicar as condições em que permanece válida e os pontos que exigem verificação técnica antes de qualquer aplicação real. No caso deste curso, use matriz de pré-requisitos para explicitar a regra e plano de peças para demonstrar sua aplicação. Confira se registro de decisão do responsável permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um serviço fictício precisa duas horas de acesso, quatro de trabalho e uma de retorno. A previsão oferece janela de seis horas. Resolução: A janela é insuficiente para sete horas previstas, antes de margem; reprogramar ou redefinir escopo com responsável técnico. O erro a evitar é: Executar porque o trabalho principal dura apenas quatro horas. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A entrega da peça ocorre duas horas depois do horário planejado. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.energy.gov/eere/wind/wind-energy-technologies-office",
      "https://www.energy.gov/femp/measurement-and-verification",
      "https://www.energy.gov/eere/buildings/building-technologies-office"
    ],
    "region": "north-america"
  },
  {
    "id": "na-inventario-de-emissoes-em-redes-de-calor-e-frio",
    "title": "Inventário de emissões em redes de calor e frio",
    "track": "energy",
    "role": "Analista de dados de descarbonização",
    "positioning": "broad",
    "scenario": "Uma rede fictícia compra mil MWh com fator médio de 0,2 tCO2e por MWh e perde cem MWh na distribuição.",
    "decision": "As emissões de compra são duzentas tCO2e; por novecentos MWh entregues, a intensidade é aproximadamente 0,222 tCO2e por MWh.",
    "misconception": "Multiplicar apenas a energia entregue e omitir as perdas do inventário de compra.",
    "changedConstraint": "A rede inclui cogeração com produção simultânea de eletricidade.",
    "tasks": [
      "Fronteira de inventário",
      "Livro de energia",
      "Biblioteca de fatores",
      "Regra de alocação",
      "Cálculo de intensidade entregue",
      "Análise de incerteza"
    ],
    "method": "Inventários precisam energia, fator de emissão, fonte e período consistentes. Diferencie fator médio e marginal e evite aplicar um em pergunta que exige o outro. Alocação de cogeração precisa regra explícita. Estimativas não substituem verificação independente e devem preservar incerteza dos dados de atividade. Estabeleça a fronteira física, o período e as unidades antes de comparar cenários de energia. Diferencie potência instantânea, energia acumulada e capacidade utilizável. Uma estimativa de planejamento precisa registrar perdas, disponibilidade e hipóteses de operação; não substitui projeto executivo, autorização ou avaliação de profissional habilitado. Faça análise de sensibilidade para uma entrada que possa mudar e preserve a versão de cada fator utilizado. Identifique quais dados seriam medidos e quais são apenas fornecidos pelo caso sintético. A recomendação deve explicar as condições em que permanece válida e os pontos que exigem verificação técnica antes de qualquer aplicação real. No caso deste curso, use fronteira de inventário para explicitar a regra e regra de alocação para demonstrar sua aplicação. Confira se análise de incerteza permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma rede fictícia compra mil MWh com fator médio de 0,2 tCO2e por MWh e perde cem MWh na distribuição. Resolução: As emissões de compra são duzentas tCO2e; por novecentos MWh entregues, a intensidade é aproximadamente 0,222 tCO2e por MWh. O erro a evitar é: Multiplicar apenas a energia entregue e omitir as perdas do inventário de compra. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A rede inclui cogeração com produção simultânea de eletricidade. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://ghgprotocol.org/corporate-standard",
      "https://www.energy.gov/femp/measurement-and-verification",
      "https://www.energy.gov/eere/buildings/building-technologies-office"
    ],
    "region": "north-america"
  },
  {
    "id": "na-coordenacao-administrativa-de-atendimento-virtual-em-saude",
    "title": "Coordenação administrativa de atendimento virtual em saúde",
    "track": "care",
    "role": "Coordenador de operações de atendimento virtual",
    "positioning": "broad",
    "scenario": "Um serviço fictício agenda cem consultas virtuais; dez usuários não conseguem conectar, cinco faltam e dois casos conectados são encaminhados pela equipe clínica.",
    "decision": "Separar dez falhas técnicas de cinco ausências e dois encaminhamentos clínicos; não contar todos como abandono do paciente.",
    "misconception": "Classificar toda consulta não concluída como falta e aplicar cobrança automaticamente.",
    "changedConstraint": "O serviço passa a atender usuários em estados ou províncias diferentes.",
    "tasks": [
      "Mapa da jornada virtual",
      "Checklist técnico acessível",
      "Categorias administrativas de desfecho",
      "Fluxo de escalonamento clínico",
      "Relatório de acesso",
      "Registro mínimo de consentimento aplicável"
    ],
    "method": "O fluxo administrativo virtual deve confirmar identidade, disponibilidade tecnológica, consentimentos aplicáveis e encaminhamento para equipe clínica. Diferencie falha de conexão, ausência e necessidade clínica urgente. Não faça triagem clínica nem recomendação terapêutica. Use dados sintéticos e registre o mínimo necessário para resolver agendamento e acesso. O trabalho administrativo deve facilitar acesso e continuidade sem ultrapassar a competência clínica. Defina quais decisões são operacionais e quais precisam ser encaminhadas a profissional habilitado. Use dados sintéticos, minimize informações pessoais e preserve rastreabilidade de mudança. Um status preenchido no sistema não demonstra que o atendimento ou a transferência aconteceu; procure a evidência apropriada de cada etapa. Considere acessibilidade, idioma e barreiras tecnológicas na organização do fluxo. A qualidade do exercício depende de identificar lacunas e responsáveis, e não de preencher campos com suposições. Nenhuma atividade deste curso autoriza diagnóstico, prescrição, triagem clínica ou decisão sobre segurança de dispositivo. No caso deste curso, use mapa da jornada virtual para explicitar a regra e fluxo de escalonamento clínico para demonstrar sua aplicação. Confira se registro mínimo de consentimento aplicável permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um serviço fictício agenda cem consultas virtuais; dez usuários não conseguem conectar, cinco faltam e dois casos conectados são encaminhados pela equipe clínica. Resolução: Separar dez falhas técnicas de cinco ausências e dois encaminhamentos clínicos; não contar todos como abandono do paciente. O erro a evitar é: Classificar toda consulta não concluída como falta e aplicar cobrança automaticamente. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O serviço passa a atender usuários em estados ou províncias diferentes. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://telehealth.hhs.gov/providers",
      "https://www.ahrq.gov/health-literacy/improve/precautions/index.html",
      "https://www.healthit.gov/topic/interoperability"
    ],
    "region": "north-america"
  },
  {
    "id": "na-qualidade-de-cadastros-para-interoperabilidade-de-saude",
    "title": "Qualidade de cadastros para interoperabilidade de saúde",
    "track": "care",
    "role": "Analista de identidade cadastral em saúde",
    "positioning": "broad",
    "scenario": "Dois cadastros fictícios têm nome igual, datas de nascimento diferentes e endereços distintos; um terceiro tem grafia abreviada e identificador institucional igual ao primeiro.",
    "decision": "Não fundir os homônimos; investigar a correspondência do terceiro usando identificador e regras institucionais verificadas.",
    "misconception": "Unir os três porque o nome normalizado é semelhante.",
    "changedConstraint": "Um sistema remove zeros iniciais do identificador na exportação.",
    "tasks": [
      "Dicionário de identificadores",
      "Regras de normalização",
      "Conjunto de homônimos",
      "Fila de revisão",
      "Teste de zeros iniciais",
      "Trilha de decisões de vínculo"
    ],
    "method": "Identidade de paciente exige reconciliação cuidadosa de identificadores e dados demográficos. Correspondência por nome sozinho pode unir pessoas distintas; diferença de grafia não comprova diferença de identidade. Registre confiança e revisão autorizada. Use registros inteiramente fictícios e não decida tratamento com base no exercício. O trabalho administrativo deve facilitar acesso e continuidade sem ultrapassar a competência clínica. Defina quais decisões são operacionais e quais precisam ser encaminhadas a profissional habilitado. Use dados sintéticos, minimize informações pessoais e preserve rastreabilidade de mudança. Um status preenchido no sistema não demonstra que o atendimento ou a transferência aconteceu; procure a evidência apropriada de cada etapa. Considere acessibilidade, idioma e barreiras tecnológicas na organização do fluxo. A qualidade do exercício depende de identificar lacunas e responsáveis, e não de preencher campos com suposições. Nenhuma atividade deste curso autoriza diagnóstico, prescrição, triagem clínica ou decisão sobre segurança de dispositivo. No caso deste curso, use dicionário de identificadores para explicitar a regra e fila de revisão para demonstrar sua aplicação. Confira se trilha de decisões de vínculo permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Dois cadastros fictícios têm nome igual, datas de nascimento diferentes e endereços distintos; um terceiro tem grafia abreviada e identificador institucional igual ao primeiro. Resolução: Não fundir os homônimos; investigar a correspondência do terceiro usando identificador e regras institucionais verificadas. O erro a evitar é: Unir os três porque o nome normalizado é semelhante. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Um sistema remove zeros iniciais do identificador na exportação. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.hl7.org/fhir/patient.html",
      "https://www.ahrq.gov/health-literacy/improve/precautions/index.html",
      "https://www.healthit.gov/topic/interoperability"
    ],
    "region": "north-america"
  },
  {
    "id": "na-planejamento-de-capacidade-de-salas-ambulatoriais",
    "title": "Planejamento de capacidade de salas ambulatoriais",
    "track": "care",
    "role": "Analista de capacidade ambulatorial",
    "positioning": "broad",
    "scenario": "Duas salas fictícias operam seis horas cada; cada atendimento ocupa quarenta minutos e preparação ocupa dez.",
    "decision": "Cada sala comporta no máximo sete blocos completos de cinquenta minutos, total catorze, antes de margens e outras restrições.",
    "misconception": "Agendar dezoito atendimentos dividindo 720 minutos apenas pelos quarenta minutos clínicos.",
    "changedConstraint": "Uma sala fica indisponível por noventa minutos para manutenção.",
    "tasks": [
      "Matriz de recursos",
      "Mapa de duração",
      "Modelo de blocos",
      "Simulação de indisponibilidade",
      "Indicadores de espera",
      "Plano de validação com coordenação clínica"
    ],
    "method": "Capacidade administrativa combina tempo de sala, limpeza, equipe e variação da duração. Dividir horas por tempo médio produz limite teórico, não agenda robusta. Separe restrições clínicas definidas por profissionais e premissas operacionais. Considere acessibilidade e intervalos; não aumente atendimentos violando protocolos de cuidado. O trabalho administrativo deve facilitar acesso e continuidade sem ultrapassar a competência clínica. Defina quais decisões são operacionais e quais precisam ser encaminhadas a profissional habilitado. Use dados sintéticos, minimize informações pessoais e preserve rastreabilidade de mudança. Um status preenchido no sistema não demonstra que o atendimento ou a transferência aconteceu; procure a evidência apropriada de cada etapa. Considere acessibilidade, idioma e barreiras tecnológicas na organização do fluxo. A qualidade do exercício depende de identificar lacunas e responsáveis, e não de preencher campos com suposições. Nenhuma atividade deste curso autoriza diagnóstico, prescrição, triagem clínica ou decisão sobre segurança de dispositivo. No caso deste curso, use matriz de recursos para explicitar a regra e simulação de indisponibilidade para demonstrar sua aplicação. Confira se plano de validação com coordenação clínica permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Duas salas fictícias operam seis horas cada; cada atendimento ocupa quarenta minutos e preparação ocupa dez. Resolução: Cada sala comporta no máximo sete blocos completos de cinquenta minutos, total catorze, antes de margens e outras restrições. O erro a evitar é: Agendar dezoito atendimentos dividindo 720 minutos apenas pelos quarenta minutos clínicos. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma sala fica indisponível por noventa minutos para manutenção. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.ahrq.gov/patient-safety/settings/emergency-dept/crowding-toolkit/index.html",
      "https://www.ahrq.gov/health-literacy/improve/precautions/index.html",
      "https://www.healthit.gov/topic/interoperability"
    ],
    "region": "north-america"
  },
  {
    "id": "na-monitoramento-administrativo-de-encaminhamentos-pendentes",
    "title": "Monitoramento administrativo de encaminhamentos pendentes",
    "track": "care",
    "role": "Coordenador de encaminhamentos assistenciais",
    "positioning": "broad",
    "scenario": "Uma rede fictícia envia sessenta encaminhamentos; quarenta são aceitos, trinta agendados e vinte concluídos.",
    "decision": "Registrar vinte sem aceite, dez aceitos sem agenda e dez agendados não concluídos; verificar devolutiva dos vinte concluídos.",
    "misconception": "Declarar taxa de resolução de cem por cento porque todos foram enviados.",
    "changedConstraint": "O prestador muda os documentos exigidos para aceitar novos pedidos.",
    "tasks": [
      "Máquina de estados",
      "Registro de responsáveis",
      "Fila de pendências",
      "Matriz documental",
      "Indicador de tempo por estado",
      "Roteiro de escalonamento autorizado"
    ],
    "method": "Encaminhamento é um fluxo com pedido, aceite, agendamento, atendimento e retorno; não apenas envio de mensagem. Defina dono e prazo por estado, diferenciando pendência documental de prioridade clínica. A prioridade é determinada pela equipe habilitada. Escalone atrasos sem prometer cobertura ou interpretar diagnóstico. O trabalho administrativo deve facilitar acesso e continuidade sem ultrapassar a competência clínica. Defina quais decisões são operacionais e quais precisam ser encaminhadas a profissional habilitado. Use dados sintéticos, minimize informações pessoais e preserve rastreabilidade de mudança. Um status preenchido no sistema não demonstra que o atendimento ou a transferência aconteceu; procure a evidência apropriada de cada etapa. Considere acessibilidade, idioma e barreiras tecnológicas na organização do fluxo. A qualidade do exercício depende de identificar lacunas e responsáveis, e não de preencher campos com suposições. Nenhuma atividade deste curso autoriza diagnóstico, prescrição, triagem clínica ou decisão sobre segurança de dispositivo. No caso deste curso, use máquina de estados para explicitar a regra e matriz documental para demonstrar sua aplicação. Confira se roteiro de escalonamento autorizado permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma rede fictícia envia sessenta encaminhamentos; quarenta são aceitos, trinta agendados e vinte concluídos. Resolução: Registrar vinte sem aceite, dez aceitos sem agenda e dez agendados não concluídos; verificar devolutiva dos vinte concluídos. O erro a evitar é: Declarar taxa de resolução de cem por cento porque todos foram enviados. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O prestador muda os documentos exigidos para aceitar novos pedidos. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.ahrq.gov/health-literacy/improve/precautions/index.html",
      "https://www.healthit.gov/topic/interoperability"
    ],
    "region": "north-america"
  },
  {
    "id": "na-acessibilidade-operacional-para-pacientes-com-barreira-linguistica",
    "title": "Acessibilidade operacional para pacientes com barreira linguística",
    "track": "care",
    "role": "Coordenador de acesso linguístico em saúde",
    "positioning": "broad",
    "scenario": "Um serviço fictício atende vinte usuários que solicitam interpretação; quinze recebem recurso qualificado e cinco recebem apenas folheto traduzido.",
    "decision": "Registrar quinze atendimentos com interpretação e cinco lacunas; folheto não substitui comunicação oral necessária.",
    "misconception": "Contar todos como atendimento linguístico resolvido porque o folheto existe.",
    "changedConstraint": "Uma consulta exige simultaneamente interpretação e recurso para deficiência auditiva.",
    "tasks": [
      "Mapa de necessidades",
      "Fluxo de solicitação de intérprete",
      "Matriz de recursos",
      "Registro de lacunas",
      "Teste de necessidade combinada",
      "Indicador de disponibilidade"
    ],
    "method": "Acesso linguístico requer identificar idioma preferido, oferecer recurso apropriado e registrar disponibilidade. Familiar não substitui automaticamente intérprete qualificado. Separe tradução escrita, interpretação oral e acessibilidade auditiva. Operações devem facilitar escolha informada sem coletar nacionalidade desnecessária ou inferir competência a partir do sotaque. O trabalho administrativo deve facilitar acesso e continuidade sem ultrapassar a competência clínica. Defina quais decisões são operacionais e quais precisam ser encaminhadas a profissional habilitado. Use dados sintéticos, minimize informações pessoais e preserve rastreabilidade de mudança. Um status preenchido no sistema não demonstra que o atendimento ou a transferência aconteceu; procure a evidência apropriada de cada etapa. Considere acessibilidade, idioma e barreiras tecnológicas na organização do fluxo. A qualidade do exercício depende de identificar lacunas e responsáveis, e não de preencher campos com suposições. Nenhuma atividade deste curso autoriza diagnóstico, prescrição, triagem clínica ou decisão sobre segurança de dispositivo. No caso deste curso, use mapa de necessidades para explicitar a regra e registro de lacunas para demonstrar sua aplicação. Confira se indicador de disponibilidade permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um serviço fictício atende vinte usuários que solicitam interpretação; quinze recebem recurso qualificado e cinco recebem apenas folheto traduzido. Resolução: Registrar quinze atendimentos com interpretação e cinco lacunas; folheto não substitui comunicação oral necessária. O erro a evitar é: Contar todos como atendimento linguístico resolvido porque o folheto existe. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma consulta exige simultaneamente interpretação e recurso para deficiência auditiva. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.ahrq.gov/health-literacy/improve/precautions/index.html",
      "https://www.healthit.gov/topic/interoperability"
    ],
    "region": "north-america"
  },
  {
    "id": "na-gestao-de-inventario-administrativo-de-dispositivos-assistivos",
    "title": "Gestão de inventário administrativo de dispositivos assistivos",
    "track": "care",
    "role": "Analista de operações de tecnologia assistiva",
    "positioning": "broad",
    "scenario": "Um estoque fictício tem trinta dispositivos: seis em avaliação, quatro em limpeza e cinco reservados; dois reservados também estão em avaliação.",
    "decision": "A indisponibilidade pela união é treze, deixando dezessete potencialmente disponíveis, ainda sujeitos à liberação específica.",
    "misconception": "Subtrair quinze e ignorar a sobreposição, ou liberar tudo que está na prateleira.",
    "changedConstraint": "Um fabricante publica aviso de segurança para um lote identificado.",
    "tasks": [
      "Livro de dispositivos",
      "Matriz de estados",
      "Controle de reservas",
      "Tratamento de sobreposição",
      "Rastreamento de lote",
      "Fluxo de aviso de segurança"
    ],
    "method": "Dispositivos assistivos precisam rastrear identificação, condição, limpeza autorizada, reserva e responsável. Disponível fisicamente não significa liberado para uso. Critérios de adequação e configuração são definidos por profissional habilitado. O curso trata controle e encaminhamento, sem prescrição ou manutenção técnica de segurança. O trabalho administrativo deve facilitar acesso e continuidade sem ultrapassar a competência clínica. Defina quais decisões são operacionais e quais precisam ser encaminhadas a profissional habilitado. Use dados sintéticos, minimize informações pessoais e preserve rastreabilidade de mudança. Um status preenchido no sistema não demonstra que o atendimento ou a transferência aconteceu; procure a evidência apropriada de cada etapa. Considere acessibilidade, idioma e barreiras tecnológicas na organização do fluxo. A qualidade do exercício depende de identificar lacunas e responsáveis, e não de preencher campos com suposições. Nenhuma atividade deste curso autoriza diagnóstico, prescrição, triagem clínica ou decisão sobre segurança de dispositivo. No caso deste curso, use livro de dispositivos para explicitar a regra e tratamento de sobreposição para demonstrar sua aplicação. Confira se fluxo de aviso de segurança permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um estoque fictício tem trinta dispositivos: seis em avaliação, quatro em limpeza e cinco reservados; dois reservados também estão em avaliação. Resolução: A indisponibilidade pela união é treze, deixando dezessete potencialmente disponíveis, ainda sujeitos à liberação específica. O erro a evitar é: Subtrair quinze e ignorar a sobreposição, ou liberar tudo que está na prateleira. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Um fabricante publica aviso de segurança para um lote identificado. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.ahrq.gov/health-literacy/improve/precautions/index.html",
      "https://www.healthit.gov/topic/interoperability"
    ],
    "region": "north-america"
  },
  {
    "id": "na-indicadores-administrativos-de-transicao-de-cuidado",
    "title": "Indicadores administrativos de transição de cuidado",
    "track": "care",
    "role": "Analista de continuidade administrativa do cuidado",
    "positioning": "broad",
    "scenario": "De cinquenta transições fictícias, quarenta possuem documento enviado, trinta possuem recebimento confirmado e vinte e cinco têm responsável de continuidade identificado.",
    "decision": "Reportar cada etapa separadamente e investigar as vinte e cinco sem responsável confirmado; envio não prova transferência concluída.",
    "misconception": "Considerar quarenta transições concluídas somente pelo comprovante de envio.",
    "changedConstraint": "O destinatário muda o canal de recebimento durante a semana.",
    "tasks": [
      "Mapa de transferência",
      "Checklist de informação administrativa",
      "Registro de recebimento",
      "Matriz de responsabilidade",
      "Painel de etapas",
      "Plano de correção de canal"
    ],
    "method": "Transição de cuidado exige conferir que informação e responsabilidade chegaram ao destino certo. Envio, recebimento e confirmação de entendimento são evidências distintas. Defina critérios operacionais com a equipe clínica e não interprete plano terapêutico. Compare coortes equivalentes e preserve privacidade em relatórios. O trabalho administrativo deve facilitar acesso e continuidade sem ultrapassar a competência clínica. Defina quais decisões são operacionais e quais precisam ser encaminhadas a profissional habilitado. Use dados sintéticos, minimize informações pessoais e preserve rastreabilidade de mudança. Um status preenchido no sistema não demonstra que o atendimento ou a transferência aconteceu; procure a evidência apropriada de cada etapa. Considere acessibilidade, idioma e barreiras tecnológicas na organização do fluxo. A qualidade do exercício depende de identificar lacunas e responsáveis, e não de preencher campos com suposições. Nenhuma atividade deste curso autoriza diagnóstico, prescrição, triagem clínica ou decisão sobre segurança de dispositivo. No caso deste curso, use mapa de transferência para explicitar a regra e matriz de responsabilidade para demonstrar sua aplicação. Confira se plano de correção de canal permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. De cinquenta transições fictícias, quarenta possuem documento enviado, trinta possuem recebimento confirmado e vinte e cinco têm responsável de continuidade identificado. Resolução: Reportar cada etapa separadamente e investigar as vinte e cinco sem responsável confirmado; envio não prova transferência concluída. O erro a evitar é: Considerar quarenta transições concluídas somente pelo comprovante de envio. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O destinatário muda o canal de recebimento durante a semana. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.ahrq.gov/health-literacy/improve/precautions/index.html",
      "https://www.healthit.gov/topic/interoperability"
    ],
    "region": "north-america"
  },
  {
    "id": "na-qualidade-de-dados-de-experiencia-do-paciente",
    "title": "Qualidade de dados de experiência do paciente",
    "track": "care",
    "role": "Analista de experiência e dados do paciente",
    "positioning": "broad",
    "scenario": "De mil usuários fictícios elegíveis, cem respondem; oitenta usam aplicativo e vinte respondem por telefone, embora apenas metade da população use aplicativo.",
    "decision": "Reportar resposta de dez por cento e investigar viés de canal antes de generalizar satisfação.",
    "misconception": "Anunciar que a nota dos cem demonstra satisfação de todos os mil.",
    "changedConstraint": "A pesquisa digital deixa de oferecer versão acessível por leitor de tela.",
    "tasks": [
      "Plano de amostra",
      "Registro de elegibilidade",
      "Análise de canal",
      "Painel de não resposta",
      "Rubrica de anonimização",
      "Teste de acessibilidade da coleta"
    ],
    "method": "Pesquisas de experiência medem relatos de serviço, não desfecho clínico. Registre elegibilidade, taxa de resposta, canal e composição dos respondentes. Notas altas de uma amostra seletiva não descrevem toda a população. Diferencie reclamação individual que precisa resposta de estimativa agregada e evite divulgar texto identificável. O trabalho administrativo deve facilitar acesso e continuidade sem ultrapassar a competência clínica. Defina quais decisões são operacionais e quais precisam ser encaminhadas a profissional habilitado. Use dados sintéticos, minimize informações pessoais e preserve rastreabilidade de mudança. Um status preenchido no sistema não demonstra que o atendimento ou a transferência aconteceu; procure a evidência apropriada de cada etapa. Considere acessibilidade, idioma e barreiras tecnológicas na organização do fluxo. A qualidade do exercício depende de identificar lacunas e responsáveis, e não de preencher campos com suposições. Nenhuma atividade deste curso autoriza diagnóstico, prescrição, triagem clínica ou decisão sobre segurança de dispositivo. No caso deste curso, use plano de amostra para explicitar a regra e painel de não resposta para demonstrar sua aplicação. Confira se teste de acessibilidade da coleta permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. De mil usuários fictícios elegíveis, cem respondem; oitenta usam aplicativo e vinte respondem por telefone, embora apenas metade da população use aplicativo. Resolução: Reportar resposta de dez por cento e investigar viés de canal antes de generalizar satisfação. O erro a evitar é: Anunciar que a nota dos cem demonstra satisfação de todos os mil. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A pesquisa digital deixa de oferecer versão acessível por leitor de tela. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.ahrq.gov/health-literacy/improve/precautions/index.html",
      "https://www.healthit.gov/topic/interoperability"
    ],
    "region": "north-america"
  },
  {
    "id": "na-programacao-de-transporte-nao-emergencial-para-servicos-de-saude",
    "title": "Programação de transporte não emergencial para serviços de saúde",
    "track": "care",
    "role": "Planejador de transporte assistencial não emergencial",
    "positioning": "broad",
    "scenario": "Um veículo fictício tem quatro lugares, mas um passageiro requer espaço que ocupa dois lugares; há três passageiros adicionais para a mesma viagem.",
    "decision": "A demanda equivalente é cinco lugares; separar viagens ou usar veículo compatível, sem reduzir requisitos de acessibilidade.",
    "misconception": "Contar quatro pessoas como quatro lugares e improvisar acomodação.",
    "changedConstraint": "Uma consulta termina noventa minutos depois do previsto.",
    "tasks": [
      "Matriz de passageiros sintéticos",
      "Requisitos de acessibilidade",
      "Janelas de chegada",
      "Plano de capacidade",
      "Contingência de retorno",
      "Registro de confirmação"
    ],
    "method": "Transporte não emergencial combina janela de atendimento, tempo de deslocamento, acessibilidade e confirmação. Não é serviço de urgência. Restrições de mobilidade e apoio devem ser estabelecidas por responsáveis adequados; operações não improvisam assistência clínica. Preserve tempo de retorno e contingência para atraso. O trabalho administrativo deve facilitar acesso e continuidade sem ultrapassar a competência clínica. Defina quais decisões são operacionais e quais precisam ser encaminhadas a profissional habilitado. Use dados sintéticos, minimize informações pessoais e preserve rastreabilidade de mudança. Um status preenchido no sistema não demonstra que o atendimento ou a transferência aconteceu; procure a evidência apropriada de cada etapa. Considere acessibilidade, idioma e barreiras tecnológicas na organização do fluxo. A qualidade do exercício depende de identificar lacunas e responsáveis, e não de preencher campos com suposições. Nenhuma atividade deste curso autoriza diagnóstico, prescrição, triagem clínica ou decisão sobre segurança de dispositivo. No caso deste curso, use matriz de passageiros sintéticos para explicitar a regra e plano de capacidade para demonstrar sua aplicação. Confira se registro de confirmação permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um veículo fictício tem quatro lugares, mas um passageiro requer espaço que ocupa dois lugares; há três passageiros adicionais para a mesma viagem. Resolução: A demanda equivalente é cinco lugares; separar viagens ou usar veículo compatível, sem reduzir requisitos de acessibilidade. O erro a evitar é: Contar quatro pessoas como quatro lugares e improvisar acomodação. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma consulta termina noventa minutos depois do previsto. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.ahrq.gov/health-literacy/improve/precautions/index.html",
      "https://www.healthit.gov/topic/interoperability"
    ],
    "region": "north-america"
  },
  {
    "id": "na-auditoria-de-dados-para-agendas-de-vacinacao-ocupacional",
    "title": "Auditoria de dados para agendas de vacinação ocupacional",
    "track": "care",
    "role": "Analista de operações de saúde ocupacional",
    "positioning": "broad",
    "scenario": "Um cadastro fictício tem cem trabalhadores; dez aparecem duplicados e cinco não têm data de nascimento validada.",
    "decision": "Deduplicar com revisão autorizada e separar os cinco registros incompletos; não inferir elegibilidade clínica pela idade aproximada.",
    "misconception": "Gerar convocação automática usando cadastros duplicados e datas estimadas.",
    "changedConstraint": "A orientação institucional atualiza os critérios de elegibilidade.",
    "tasks": [
      "Dicionário cadastral",
      "Regra de duplicidade",
      "Fila de validação documental",
      "Controle de versão de critérios",
      "Plano de convocação autorizado",
      "Relatório de completude"
    ],
    "method": "Administração de agendas de vacinação requer elegibilidade e intervalos definidos por equipe clínica e orientações oficiais atuais. O analista controla completude, duplicidade e convocação; não indica vacina nem altera esquema. Use datas sintéticas e sinalize inconsistências para validação profissional antes de qualquer comunicação individual. O trabalho administrativo deve facilitar acesso e continuidade sem ultrapassar a competência clínica. Defina quais decisões são operacionais e quais precisam ser encaminhadas a profissional habilitado. Use dados sintéticos, minimize informações pessoais e preserve rastreabilidade de mudança. Um status preenchido no sistema não demonstra que o atendimento ou a transferência aconteceu; procure a evidência apropriada de cada etapa. Considere acessibilidade, idioma e barreiras tecnológicas na organização do fluxo. A qualidade do exercício depende de identificar lacunas e responsáveis, e não de preencher campos com suposições. Nenhuma atividade deste curso autoriza diagnóstico, prescrição, triagem clínica ou decisão sobre segurança de dispositivo. No caso deste curso, use dicionário cadastral para explicitar a regra e controle de versão de critérios para demonstrar sua aplicação. Confira se relatório de completude permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um cadastro fictício tem cem trabalhadores; dez aparecem duplicados e cinco não têm data de nascimento validada. Resolução: Deduplicar com revisão autorizada e separar os cinco registros incompletos; não inferir elegibilidade clínica pela idade aproximada. O erro a evitar é: Gerar convocação automática usando cadastros duplicados e datas estimadas. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A orientação institucional atualiza os critérios de elegibilidade. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.ahrq.gov/health-literacy/improve/precautions/index.html",
      "https://www.healthit.gov/topic/interoperability"
    ],
    "region": "north-america"
  },
  {
    "id": "na-controle-estatistico-de-processos-com-subgrupos-racionais",
    "title": "Controle estatístico de processos com subgrupos racionais",
    "track": "industry",
    "role": "Analista de controle estatístico industrial",
    "positioning": "specialist",
    "scenario": "Um processo fictício possui especificação de 9 a 11 mm e limites de controle de 9,6 a 10,4; aparece ponto de 10,6 mm.",
    "decision": "O ponto atende especificação, mas sinaliza mudança do processo; investigar sem classificá-lo automaticamente como produto não conforme.",
    "misconception": "Ignorar o sinal porque o ponto ainda está entre nove e onze.",
    "changedConstraint": "A coleta passa a misturar duas máquinas com médias distintas.",
    "tasks": [
      "Plano de subgrupos",
      "Carta de controle",
      "Mapa de especificações",
      "Roteiro de investigação",
      "Teste de mistura de máquinas",
      "Registro de ação e resultado"
    ],
    "method": "Cartas de controle distinguem variação comum de sinais de mudança; limites de controle não são limites de especificação. Forme subgrupos em condições comparáveis e examine estabilidade antes de calcular capacidade. Registre causa investigada e evite ajustar máquina por todo ponto individual, criando mais variabilidade. Descreva a função do processo, as entradas e os requisitos que a saída precisa atender. Separe observação do processo, resultado de medição e hipótese causal. Uma melhoria aparente só é defensável quando a comparação usa mesma fronteira e condições relevantes conhecidas. Mantenha rastreabilidade por lote, ordem ou unidade, sem misturar versões de processo. O exercício é analítico e documental: não exige intervenção em máquina, alteração de proteção, trabalho elétrico ou operação de equipamento. Questões de segurança e qualificação devem ser verificadas pelo responsável habilitado. Preserve a condição inicial, o teste de alteração e a justificativa do que pode ser transferido para outro contexto. No caso deste curso, use plano de subgrupos para explicitar a regra e roteiro de investigação para demonstrar sua aplicação. Confira se registro de ação e resultado permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um processo fictício possui especificação de 9 a 11 mm e limites de controle de 9,6 a 10,4; aparece ponto de 10,6 mm. Resolução: O ponto atende especificação, mas sinaliza mudança do processo; investigar sem classificá-lo automaticamente como produto não conforme. O erro a evitar é: Ignorar o sinal porque o ponto ainda está entre nove e onze. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A coleta passa a misturar duas máquinas com médias distintas. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/pmc/pmc.htm",
      "https://www.itl.nist.gov/div898/handbook/",
      "https://www.nist.gov/mep"
    ],
    "region": "north-america"
  },
  {
    "id": "na-analise-de-sistema-de-medicao-para-inspecao-dimensional",
    "title": "Análise de sistema de medição para inspeção dimensional",
    "track": "industry",
    "role": "Analista de confiabilidade de medição",
    "positioning": "specialist",
    "scenario": "Dois operadores fictícios medem dez peças três vezes; um operador apresenta leituras sistematicamente 0,2 mm maiores.",
    "decision": "Investigar técnica e referência antes de atribuir diferenças ao processo produtivo; separar efeito de operador e peça.",
    "misconception": "Ajustar a máquina para compensar a leitura do operador sem verificar medição.",
    "changedConstraint": "O instrumento novo tem mais casas decimais, mas referência desconhecida.",
    "tasks": [
      "Plano de medições repetidas",
      "Tabela por peça e operador",
      "Análise de repetibilidade",
      "Análise de diferença sistemática",
      "Registro de referência",
      "Critério de uso do instrumento"
    ],
    "method": "Variação de medição inclui repetibilidade do instrumento e reprodutibilidade entre operadores. Repita medições em peças representativas e ordem controlada. Resolução de mostrador não equivale a exatidão. Uma avaliação adequada considera tolerância, uso pretendido e referência, sem emitir certificado de calibração no exercício. Descreva a função do processo, as entradas e os requisitos que a saída precisa atender. Separe observação do processo, resultado de medição e hipótese causal. Uma melhoria aparente só é defensável quando a comparação usa mesma fronteira e condições relevantes conhecidas. Mantenha rastreabilidade por lote, ordem ou unidade, sem misturar versões de processo. O exercício é analítico e documental: não exige intervenção em máquina, alteração de proteção, trabalho elétrico ou operação de equipamento. Questões de segurança e qualificação devem ser verificadas pelo responsável habilitado. Preserve a condição inicial, o teste de alteração e a justificativa do que pode ser transferido para outro contexto. No caso deste curso, use plano de medições repetidas para explicitar a regra e análise de diferença sistemática para demonstrar sua aplicação. Confira se critério de uso do instrumento permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Dois operadores fictícios medem dez peças três vezes; um operador apresenta leituras sistematicamente 0,2 mm maiores. Resolução: Investigar técnica e referência antes de atribuir diferenças ao processo produtivo; separar efeito de operador e peça. O erro a evitar é: Ajustar a máquina para compensar a leitura do operador sem verificar medição. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O instrumento novo tem mais casas decimais, mas referência desconhecida. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/mpc/mpc.htm",
      "https://www.itl.nist.gov/div898/handbook/",
      "https://www.nist.gov/mep"
    ],
    "region": "north-america"
  },
  {
    "id": "na-rastreabilidade-de-lotes-na-manufatura-aditiva",
    "title": "Rastreabilidade de lotes na manufatura aditiva",
    "track": "industry",
    "role": "Analista de dados de manufatura aditiva",
    "positioning": "specialist",
    "scenario": "Um lote fictício de vinte peças usa o mesmo arquivo, mas cinco foram produzidas após alteração de orientação e parâmetro de energia.",
    "decision": "Separar as cinco como condição de processo distinta e verificar qualificação antes de reunir resultados do lote.",
    "misconception": "Agrupar todas as peças porque o arquivo CAD é igual.",
    "changedConstraint": "O pó reaproveitado recebe mistura com material de outro lote.",
    "tasks": [
      "Genealogia de material",
      "Manifesto de arquivo",
      "Registro de parâmetros",
      "Mapa de condição de processo",
      "Plano de segregação",
      "Dossiê de avaliação de alteração"
    ],
    "method": "Manufatura aditiva requer vínculo entre material, máquina, parâmetros, arquivo e tratamento posterior. Mesmo geometria idêntica não prova equivalência de peça produzida por processo distinto. Registre revisões e qualificação conforme uso. O curso trata dados e qualidade, sem autorizar produção de componentes críticos. Descreva a função do processo, as entradas e os requisitos que a saída precisa atender. Separe observação do processo, resultado de medição e hipótese causal. Uma melhoria aparente só é defensável quando a comparação usa mesma fronteira e condições relevantes conhecidas. Mantenha rastreabilidade por lote, ordem ou unidade, sem misturar versões de processo. O exercício é analítico e documental: não exige intervenção em máquina, alteração de proteção, trabalho elétrico ou operação de equipamento. Questões de segurança e qualificação devem ser verificadas pelo responsável habilitado. Preserve a condição inicial, o teste de alteração e a justificativa do que pode ser transferido para outro contexto. No caso deste curso, use genealogia de material para explicitar a regra e mapa de condição de processo para demonstrar sua aplicação. Confira se dossiê de avaliação de alteração permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um lote fictício de vinte peças usa o mesmo arquivo, mas cinco foram produzidas após alteração de orientação e parâmetro de energia. Resolução: Separar as cinco como condição de processo distinta e verificar qualificação antes de reunir resultados do lote. O erro a evitar é: Agrupar todas as peças porque o arquivo CAD é igual. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O pó reaproveitado recebe mistura com material de outro lote. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.nist.gov/additive-manufacturing",
      "https://www.itl.nist.gov/div898/handbook/",
      "https://www.nist.gov/mep"
    ],
    "region": "north-america"
  },
  {
    "id": "na-programacao-de-manutencao-por-criticidade-funcional",
    "title": "Programação de manutenção por criticidade funcional",
    "track": "industry",
    "role": "Planejador de confiabilidade industrial",
    "positioning": "specialist",
    "scenario": "Uma bomba fictícia tem reserva idêntica, mas ambas dependem do mesmo painel; a equipe considera a função totalmente redundante.",
    "decision": "Registrar o painel como ponto único de falha e revisar a estratégia com manutenção habilitada.",
    "misconception": "Reduzir inspeções porque existem duas bombas.",
    "changedConstraint": "O fornecedor descontinua peça necessária ao painel comum.",
    "tasks": [
      "Árvore funcional",
      "Matriz de modos de falha",
      "Mapa de causa comum",
      "Fila por criticidade",
      "Plano de peças",
      "Registro de validação técnica"
    ],
    "method": "Criticidade combina consequência da falha, probabilidade, detectabilidade e dependências. Uma pontuação ajuda ordenar discussão, mas não substitui avaliação técnica de segurança. Diferencie item redundante e falha comum, e relacione tarefas a modos de falha específicos em vez de repetir manutenção por calendário indiscriminadamente. Descreva a função do processo, as entradas e os requisitos que a saída precisa atender. Separe observação do processo, resultado de medição e hipótese causal. Uma melhoria aparente só é defensável quando a comparação usa mesma fronteira e condições relevantes conhecidas. Mantenha rastreabilidade por lote, ordem ou unidade, sem misturar versões de processo. O exercício é analítico e documental: não exige intervenção em máquina, alteração de proteção, trabalho elétrico ou operação de equipamento. Questões de segurança e qualificação devem ser verificadas pelo responsável habilitado. Preserve a condição inicial, o teste de alteração e a justificativa do que pode ser transferido para outro contexto. No caso deste curso, use árvore funcional para explicitar a regra e fila por criticidade para demonstrar sua aplicação. Confira se registro de validação técnica permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma bomba fictícia tem reserva idêntica, mas ambas dependem do mesmo painel; a equipe considera a função totalmente redundante. Resolução: Registrar o painel como ponto único de falha e revisar a estratégia com manutenção habilitada. O erro a evitar é: Reduzir inspeções porque existem duas bombas. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O fornecedor descontinua peça necessária ao painel comum. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/",
      "https://www.nist.gov/mep"
    ],
    "region": "north-america"
  },
  {
    "id": "na-mapeamento-de-fluxo-de-valor-com-tempo-de-espera",
    "title": "Mapeamento de fluxo de valor com tempo de espera",
    "track": "industry",
    "role": "Analista de melhoria de fluxo industrial",
    "positioning": "specialist",
    "scenario": "Uma ordem fictícia exige duas horas de processamento, seis de fila e uma de transporte.",
    "decision": "O prazo é nove horas e a fração de processamento é 2/9≈22,22%; priorizar investigação da fila antes de automatizar os dois minutos finais.",
    "misconception": "Anunciar prazo de duas horas porque só esse tempo agrega transformação.",
    "changedConstraint": "O tamanho de lote dobra e aumenta a espera do primeiro item.",
    "tasks": [
      "Mapa de fluxo",
      "Linha de tempo",
      "Classificação de atividades",
      "Medição de fila",
      "Cenário de lote",
      "Plano de experimento de melhoria"
    ],
    "method": "Fluxo de valor separa tempo de transformação, espera, transporte e retrabalho. Some intervalos na mesma fronteira e não confunda ocupação de recurso com prazo total de entrega. Identifique gargalo com observação e capacidade efetiva; reduzir tempo fora do gargalo pode não elevar vazão. Descreva a função do processo, as entradas e os requisitos que a saída precisa atender. Separe observação do processo, resultado de medição e hipótese causal. Uma melhoria aparente só é defensável quando a comparação usa mesma fronteira e condições relevantes conhecidas. Mantenha rastreabilidade por lote, ordem ou unidade, sem misturar versões de processo. O exercício é analítico e documental: não exige intervenção em máquina, alteração de proteção, trabalho elétrico ou operação de equipamento. Questões de segurança e qualificação devem ser verificadas pelo responsável habilitado. Preserve a condição inicial, o teste de alteração e a justificativa do que pode ser transferido para outro contexto. No caso deste curso, use mapa de fluxo para explicitar a regra e medição de fila para demonstrar sua aplicação. Confira se plano de experimento de melhoria permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma ordem fictícia exige duas horas de processamento, seis de fila e uma de transporte. Resolução: O prazo é nove horas e a fração de processamento é 2/9≈22,22%; priorizar investigação da fila antes de automatizar os dois minutos finais. O erro a evitar é: Anunciar prazo de duas horas porque só esse tempo agrega transformação. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O tamanho de lote dobra e aumenta a espera do primeiro item. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/",
      "https://www.nist.gov/mep"
    ],
    "region": "north-america"
  },
  {
    "id": "na-gestao-de-obsolescencia-de-componentes-eletronicos",
    "title": "Gestão de obsolescência de componentes eletrônicos",
    "track": "industry",
    "role": "Analista de obsolescência industrial",
    "positioning": "specialist",
    "scenario": "Um componente fictício tem estoque de 500 unidades, consumo mensal de cinquenta e descarte esperado de 10%.",
    "decision": "O estoque utilizável estimado é 450 e cobre nove meses; planejar alternativa e qualificação antes do esgotamento.",
    "misconception": "Prometer dez meses sem considerar descarte ou compras já comprometidas.",
    "changedConstraint": "A demanda mensal sobe para 75 unidades.",
    "tasks": [
      "Registro de fim de vida",
      "Mapa de produtos afetados",
      "Cálculo de cobertura útil",
      "Plano de compra final",
      "Matriz de alternativas",
      "Cronograma de qualificação"
    ],
    "method": "Obsolescência exige detectar fim de vida, mapear produtos afetados e avaliar alternativas qualificadas. Forma e pinagem equivalentes não garantem comportamento elétrico ou conformidade. Compare consumo previsto, estoque utilizável, prazo e risco de compra final. Decisão de substituição técnica cabe à engenharia responsável. Descreva a função do processo, as entradas e os requisitos que a saída precisa atender. Separe observação do processo, resultado de medição e hipótese causal. Uma melhoria aparente só é defensável quando a comparação usa mesma fronteira e condições relevantes conhecidas. Mantenha rastreabilidade por lote, ordem ou unidade, sem misturar versões de processo. O exercício é analítico e documental: não exige intervenção em máquina, alteração de proteção, trabalho elétrico ou operação de equipamento. Questões de segurança e qualificação devem ser verificadas pelo responsável habilitado. Preserve a condição inicial, o teste de alteração e a justificativa do que pode ser transferido para outro contexto. No caso deste curso, use registro de fim de vida para explicitar a regra e plano de compra final para demonstrar sua aplicação. Confira se cronograma de qualificação permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um componente fictício tem estoque de 500 unidades, consumo mensal de cinquenta e descarte esperado de 10%. Resolução: O estoque utilizável estimado é 450 e cobre nove meses; planejar alternativa e qualificação antes do esgotamento. O erro a evitar é: Prometer dez meses sem considerar descarte ou compras já comprometidas. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A demanda mensal sobe para 75 unidades. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/",
      "https://www.nist.gov/mep"
    ],
    "region": "north-america"
  },
  {
    "id": "na-planejamento-de-celulas-com-variabilidade-de-ciclo",
    "title": "Planejamento de células com variabilidade de ciclo",
    "track": "industry",
    "role": "Analista de balanceamento de células",
    "positioning": "specialist",
    "scenario": "Uma célula fictícia dispõe de 420 minutos para 140 unidades; uma estação tem ciclo médio de 2,8 minutos, mas picos frequentes de cinco.",
    "decision": "O takt é três minutos; investigar variabilidade e acúmulo antes de declarar capacidade suficiente pela média 2,8.",
    "misconception": "Concluir estabilidade porque ciclo médio é menor que takt.",
    "changedConstraint": "Uma etapa de verificação adicional de trinta segundos torna-se obrigatória.",
    "tasks": [
      "Cálculo de takt",
      "Distribuição de ciclos",
      "Mapa de precedências",
      "Simulação de fila",
      "Cenário de verificação",
      "Plano de balanceamento validado"
    ],
    "method": "Balanceamento precisa considerar distribuição dos tempos, disponibilidade e precedências, não apenas média. Takt expressa ritmo requerido pela demanda; ciclo expressa comportamento da operação. Uma célula pode atender a média e falhar repetidamente nos picos. Faça simulação de filas antes de redistribuir trabalho real. Descreva a função do processo, as entradas e os requisitos que a saída precisa atender. Separe observação do processo, resultado de medição e hipótese causal. Uma melhoria aparente só é defensável quando a comparação usa mesma fronteira e condições relevantes conhecidas. Mantenha rastreabilidade por lote, ordem ou unidade, sem misturar versões de processo. O exercício é analítico e documental: não exige intervenção em máquina, alteração de proteção, trabalho elétrico ou operação de equipamento. Questões de segurança e qualificação devem ser verificadas pelo responsável habilitado. Preserve a condição inicial, o teste de alteração e a justificativa do que pode ser transferido para outro contexto. No caso deste curso, use cálculo de takt para explicitar a regra e simulação de fila para demonstrar sua aplicação. Confira se plano de balanceamento validado permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma célula fictícia dispõe de 420 minutos para 140 unidades; uma estação tem ciclo médio de 2,8 minutos, mas picos frequentes de cinco. Resolução: O takt é três minutos; investigar variabilidade e acúmulo antes de declarar capacidade suficiente pela média 2,8. O erro a evitar é: Concluir estabilidade porque ciclo médio é menor que takt. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma etapa de verificação adicional de trinta segundos torna-se obrigatória. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/",
      "https://www.nist.gov/mep"
    ],
    "region": "north-america"
  },
  {
    "id": "na-controle-de-alteracoes-em-instrucoes-digitais-de-trabalho",
    "title": "Controle de alterações em instruções digitais de trabalho",
    "track": "industry",
    "role": "Analista de documentação de operações",
    "positioning": "specialist",
    "scenario": "Uma fábrica fictícia publica revisão quatro, mas três tablets mantêm cópia offline da revisão três usada em quarenta ordens.",
    "decision": "Identificar ordens expostas, atualizar e verificar tablets e avaliar impacto da diferença entre revisões com responsáveis.",
    "misconception": "Considerar implantação concluída porque o arquivo central foi substituído.",
    "changedConstraint": "A rede fica indisponível durante a troca de turno.",
    "tasks": [
      "Manifesto de revisão",
      "Matriz de distribuição",
      "Plano de atualização offline",
      "Registro de ordens expostas",
      "Verificação de entendimento",
      "Procedimento de retirada de versão"
    ],
    "method": "Instrução digital precisa versão aprovada, data efetiva, escopo de aplicação e acesso à edição correta no posto. Confirmação de leitura não demonstra habilidade. Relacione mudança ao treinamento e à retirada de cópias antigas, preservando histórico. Não altere instruções de segurança sem revisão competente. Descreva a função do processo, as entradas e os requisitos que a saída precisa atender. Separe observação do processo, resultado de medição e hipótese causal. Uma melhoria aparente só é defensável quando a comparação usa mesma fronteira e condições relevantes conhecidas. Mantenha rastreabilidade por lote, ordem ou unidade, sem misturar versões de processo. O exercício é analítico e documental: não exige intervenção em máquina, alteração de proteção, trabalho elétrico ou operação de equipamento. Questões de segurança e qualificação devem ser verificadas pelo responsável habilitado. Preserve a condição inicial, o teste de alteração e a justificativa do que pode ser transferido para outro contexto. No caso deste curso, use manifesto de revisão para explicitar a regra e registro de ordens expostas para demonstrar sua aplicação. Confira se procedimento de retirada de versão permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma fábrica fictícia publica revisão quatro, mas três tablets mantêm cópia offline da revisão três usada em quarenta ordens. Resolução: Identificar ordens expostas, atualizar e verificar tablets e avaliar impacto da diferença entre revisões com responsáveis. O erro a evitar é: Considerar implantação concluída porque o arquivo central foi substituído. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A rede fica indisponível durante a troca de turno. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/",
      "https://www.nist.gov/mep"
    ],
    "region": "north-america"
  },
  {
    "id": "na-analise-de-rendimento-de-primeira-passagem-e-retrabalho",
    "title": "Análise de rendimento de primeira passagem e retrabalho",
    "track": "industry",
    "role": "Analista de qualidade de processo",
    "positioning": "specialist",
    "scenario": "De cem unidades fictícias, oitenta passam de primeira e quinze são recuperadas em retrabalho; cinco são descartadas.",
    "decision": "O rendimento de primeira passagem é 80% e o final é 95%; registrar retrabalho de quinze unidades separadamente.",
    "misconception": "Anunciar 95% de primeira passagem por contar recuperadas como aprovadas originais.",
    "changedConstraint": "Duas unidades passam por retrabalho duas vezes.",
    "tasks": [
      "Identidade de unidades",
      "Registro de passagens",
      "Cálculo de rendimento inicial",
      "Cálculo de rendimento final",
      "Mapa de retrabalho repetido",
      "Relatório de custo da correção"
    ],
    "method": "Rendimento de primeira passagem mede unidades que atravessam uma etapa sem retrabalho; rendimento final pode ocultar custo de correção. Preserve identidade de unidade e passagem. Em processos seriados, rendimento composto depende das definições e independência; não some percentuais de etapas como se fossem unidades. Descreva a função do processo, as entradas e os requisitos que a saída precisa atender. Separe observação do processo, resultado de medição e hipótese causal. Uma melhoria aparente só é defensável quando a comparação usa mesma fronteira e condições relevantes conhecidas. Mantenha rastreabilidade por lote, ordem ou unidade, sem misturar versões de processo. O exercício é analítico e documental: não exige intervenção em máquina, alteração de proteção, trabalho elétrico ou operação de equipamento. Questões de segurança e qualificação devem ser verificadas pelo responsável habilitado. Preserve a condição inicial, o teste de alteração e a justificativa do que pode ser transferido para outro contexto. No caso deste curso, use identidade de unidades para explicitar a regra e cálculo de rendimento final para demonstrar sua aplicação. Confira se relatório de custo da correção permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. De cem unidades fictícias, oitenta passam de primeira e quinze são recuperadas em retrabalho; cinco são descartadas. Resolução: O rendimento de primeira passagem é 80% e o final é 95%; registrar retrabalho de quinze unidades separadamente. O erro a evitar é: Anunciar 95% de primeira passagem por contar recuperadas como aprovadas originais. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Duas unidades passam por retrabalho duas vezes. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.itl.nist.gov/div898/handbook/",
      "https://www.nist.gov/mep"
    ],
    "region": "north-america"
  },
  {
    "id": "na-governanca-de-dados-de-gemeos-digitais-industriais",
    "title": "Governança de dados de gêmeos digitais industriais",
    "track": "industry",
    "role": "Analista de governança de gêmeos digitais",
    "positioning": "specialist",
    "scenario": "Um gêmeo fictício estima temperatura usando sensor atualizado a cada minuto, mas a interface exibe como leitura instantânea sem horário.",
    "decision": "Exibir timestamp e estado de atualidade e restringir decisões que exigem resposta em segundos.",
    "misconception": "Usar o modelo para controle rápido porque a animação parece contínua.",
    "changedConstraint": "O sensor é substituído por outro com unidade Fahrenheit.",
    "tasks": [
      "Contrato de finalidade",
      "Mapa de sensores",
      "Dicionário de unidades",
      "Regra de atualidade",
      "Teste de substituição",
      "Plano de validação frente ao ativo"
    ],
    "method": "Gêmeo digital precisa finalidade, fronteira, atualização e validação frente ao ativo representado. Um modelo visual não garante fidelidade física. Registre sensores, unidades, atraso e hipóteses; diferencie simulação e observação. Mudança no ativo exige revisar modelo e condições de uso, especialmente quando decisões operacionais dependem dele. Descreva a função do processo, as entradas e os requisitos que a saída precisa atender. Separe observação do processo, resultado de medição e hipótese causal. Uma melhoria aparente só é defensável quando a comparação usa mesma fronteira e condições relevantes conhecidas. Mantenha rastreabilidade por lote, ordem ou unidade, sem misturar versões de processo. O exercício é analítico e documental: não exige intervenção em máquina, alteração de proteção, trabalho elétrico ou operação de equipamento. Questões de segurança e qualificação devem ser verificadas pelo responsável habilitado. Preserve a condição inicial, o teste de alteração e a justificativa do que pode ser transferido para outro contexto. No caso deste curso, use contrato de finalidade para explicitar a regra e regra de atualidade para demonstrar sua aplicação. Confira se plano de validação frente ao ativo permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um gêmeo fictício estima temperatura usando sensor atualizado a cada minuto, mas a interface exibe como leitura instantânea sem horário. Resolução: Exibir timestamp e estado de atualidade e restringir decisões que exigem resposta em segundos. O erro a evitar é: Usar o modelo para controle rápido porque a animação parece contínua. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O sensor é substituído por outro com unidade Fahrenheit. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.nist.gov/programs-projects/digital-twins",
      "https://www.itl.nist.gov/div898/handbook/",
      "https://www.nist.gov/mep"
    ],
    "region": "north-america"
  },
  {
    "id": "na-planejamento-de-cadeia-fria-por-evidencia-de-excursao",
    "title": "Planejamento de cadeia fria por evidência de excursão",
    "track": "logistics",
    "role": "Analista de monitoramento de cadeia fria",
    "positioning": "specialist",
    "scenario": "Um lote fictício exige de 2 a 8 graus; registra doze graus por quarenta minutos, embora a média diária seja seis.",
    "decision": "Segregar e encaminhar dados da excursão para decisão qualificada; a média não invalida o evento fora de faixa.",
    "misconception": "Liberar o lote porque a média permaneceu dentro da faixa.",
    "changedConstraint": "O relógio do sensor apresenta diferença de vinte minutos.",
    "tasks": [
      "Perfil térmico",
      "Registro de calibração",
      "Linha do tempo de excursão",
      "Plano de segregação",
      "Conferência de relógios",
      "Dossiê para disposição autorizada"
    ],
    "method": "Cadeia fria exige faixa permitida, tempo de exposição, sensor e protocolo específico do produto. Uma média aceitável não elimina excursões. Separe registro de temperatura, investigação e decisão de disposição, esta feita por responsável qualificado. Não declare produto seguro apenas por aparência ou retorno à faixa. Modele o fluxo por identidade, quantidade, estado, local e tempo. Antes de otimizar custo ou prazo, confira se a solução respeita capacidade, documentação, acessibilidade e responsabilidades aplicáveis. Diferencie mensagem recebida de evento físico e estoque disponível de item apenas presente. Reconcile entradas, saídas e pendências no mesmo período, explicitando sobreposições para não contar duas vezes. Use pedidos, materiais e pessoas inteiramente fictícios. A recomendação deve mostrar o efeito de uma restrição alterada e indicar quando é necessária decisão de especialista, operador habilitado ou autoridade competente. Promessa operacional só é válida dentro das condições e evidências registradas. No caso deste curso, use perfil térmico para explicitar a regra e plano de segregação para demonstrar sua aplicação. Confira se dossiê para disposição autorizada permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um lote fictício exige de 2 a 8 graus; registra doze graus por quarenta minutos, embora a média diária seja seis. Resolução: Segregar e encaminhar dados da excursão para decisão qualificada; a média não invalida o evento fora de faixa. O erro a evitar é: Liberar o lote porque a média permaneceu dentro da faixa. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O relógio do sensor apresenta diferença de vinte minutos. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.cdc.gov/vaccines/hcp/storage-handling/index.html",
      "https://www.gs1.org/standards/epcis",
      "https://developers.google.com/optimization/routing"
    ],
    "region": "north-america"
  },
  {
    "id": "na-otimizacao-de-estoque-por-nivel-de-servico-e-variabilidade",
    "title": "Otimização de estoque por nível de serviço e variabilidade",
    "track": "logistics",
    "role": "Analista de planejamento de estoque",
    "positioning": "specialist",
    "scenario": "Demanda fictícia média é vinte unidades por dia e o prazo constante é cinco dias; segurança definida no exercício é trinta unidades.",
    "decision": "O ponto de reposição simplificado é 20×5+30=130 unidades; revisar premissas se o prazo variar.",
    "misconception": "Usar trinta como ponto total e ignorar demanda durante o prazo.",
    "changedConstraint": "O prazo passa a oscilar entre cinco e nove dias.",
    "tasks": [
      "Dicionário de serviço",
      "Perfil de demanda",
      "Perfil de prazo",
      "Cálculo de reposição",
      "Teste de variabilidade",
      "Plano de revisão de parâmetros"
    ],
    "method": "Estoque de segurança depende de variabilidade da demanda e do prazo, além do nível de serviço definido. Diferencie probabilidade de não faltar num ciclo e proporção de demanda atendida. Um ponto de reposição precisa unidade e revisão quando a distribuição muda; fórmula simplificada exige premissas explícitas. Modele o fluxo por identidade, quantidade, estado, local e tempo. Antes de otimizar custo ou prazo, confira se a solução respeita capacidade, documentação, acessibilidade e responsabilidades aplicáveis. Diferencie mensagem recebida de evento físico e estoque disponível de item apenas presente. Reconcile entradas, saídas e pendências no mesmo período, explicitando sobreposições para não contar duas vezes. Use pedidos, materiais e pessoas inteiramente fictícios. A recomendação deve mostrar o efeito de uma restrição alterada e indicar quando é necessária decisão de especialista, operador habilitado ou autoridade competente. Promessa operacional só é válida dentro das condições e evidências registradas. No caso deste curso, use dicionário de serviço para explicitar a regra e cálculo de reposição para demonstrar sua aplicação. Confira se plano de revisão de parâmetros permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Demanda fictícia média é vinte unidades por dia e o prazo constante é cinco dias; segurança definida no exercício é trinta unidades. Resolução: O ponto de reposição simplificado é 20×5+30=130 unidades; revisar premissas se o prazo variar. O erro a evitar é: Usar trinta como ponto total e ignorar demanda durante o prazo. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O prazo passa a oscilar entre cinco e nove dias. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.gs1.org/standards/epcis",
      "https://developers.google.com/optimization/routing"
    ],
    "region": "north-america"
  },
  {
    "id": "na-gestao-de-devolucoes-com-disposicao-rastreavel",
    "title": "Gestão de devoluções com disposição rastreável",
    "track": "logistics",
    "role": "Analista de operações de devolução",
    "positioning": "specialist",
    "scenario": "Um centro fictício recebe cem devoluções; sessenta são revendáveis, vinte exigem teste, dez reparo e dez descarte autorizado.",
    "decision": "Manter quatro estados distintos e liberar somente as sessenta já aprovadas, sem somar pendências ao estoque disponível.",
    "misconception": "Reintegrar noventa porque apenas dez foram destinadas a descarte.",
    "changedConstraint": "Quinze itens perdem o identificador original durante o transporte.",
    "tasks": [
      "Taxonomia de motivos",
      "Mapa de disposição",
      "Livro de custódia",
      "Controle de crédito",
      "Fila de identificação",
      "Indicador de recuperação efetiva"
    ],
    "method": "Devolução não termina no recebimento. Classifique identidade, condição, motivo, direito aplicável e destino autorizado. Separe reembolso, inspeção, reparo, descarte e reintegração. Uma unidade visualmente íntegra pode exigir teste ou restrição de revenda. Evite duplo crédito e registre cadeia de custódia. Modele o fluxo por identidade, quantidade, estado, local e tempo. Antes de otimizar custo ou prazo, confira se a solução respeita capacidade, documentação, acessibilidade e responsabilidades aplicáveis. Diferencie mensagem recebida de evento físico e estoque disponível de item apenas presente. Reconcile entradas, saídas e pendências no mesmo período, explicitando sobreposições para não contar duas vezes. Use pedidos, materiais e pessoas inteiramente fictícios. A recomendação deve mostrar o efeito de uma restrição alterada e indicar quando é necessária decisão de especialista, operador habilitado ou autoridade competente. Promessa operacional só é válida dentro das condições e evidências registradas. No caso deste curso, use taxonomia de motivos para explicitar a regra e controle de crédito para demonstrar sua aplicação. Confira se indicador de recuperação efetiva permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um centro fictício recebe cem devoluções; sessenta são revendáveis, vinte exigem teste, dez reparo e dez descarte autorizado. Resolução: Manter quatro estados distintos e liberar somente as sessenta já aprovadas, sem somar pendências ao estoque disponível. O erro a evitar é: Reintegrar noventa porque apenas dez foram destinadas a descarte. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Quinze itens perdem o identificador original durante o transporte. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.gs1.org/standards/epcis",
      "https://developers.google.com/optimization/routing"
    ],
    "region": "north-america"
  },
  {
    "id": "na-analise-de-capacidade-portuaria-com-tempo-de-permanencia",
    "title": "Análise de capacidade portuária com tempo de permanência",
    "track": "logistics",
    "role": "Analista de planejamento de terminais",
    "positioning": "specialist",
    "scenario": "Um pátio fictício recebe duzentos contêineres por dia e tem permanência média de quatro dias em regime estável.",
    "decision": "O estoque médio esperado é oitocentos contêineres; se a permanência sobe a seis dias, passa a 1.200 sob mesmo fluxo.",
    "misconception": "Planejar capacidade para duzentos porque esse é o número diário de entradas.",
    "changedConstraint": "Uma inspeção retém 15% dos contêineres por dez dias adicionais.",
    "tasks": [
      "Modelo de fluxo",
      "Tabela de permanência",
      "Cálculo de estoque médio",
      "Cenário de retenção",
      "Mapa de restrições de pátio",
      "Plano de redução de permanência"
    ],
    "method": "Capacidade de pátio depende de entradas, saídas, permanência e restrições de empilhamento. Relação entre estoque médio, fluxo e tempo só vale com fronteiras e regime adequados. Reduzir permanência pode liberar capacidade sem expandir área. Examine extremos e congestionamento, não apenas média mensal. Modele o fluxo por identidade, quantidade, estado, local e tempo. Antes de otimizar custo ou prazo, confira se a solução respeita capacidade, documentação, acessibilidade e responsabilidades aplicáveis. Diferencie mensagem recebida de evento físico e estoque disponível de item apenas presente. Reconcile entradas, saídas e pendências no mesmo período, explicitando sobreposições para não contar duas vezes. Use pedidos, materiais e pessoas inteiramente fictícios. A recomendação deve mostrar o efeito de uma restrição alterada e indicar quando é necessária decisão de especialista, operador habilitado ou autoridade competente. Promessa operacional só é válida dentro das condições e evidências registradas. No caso deste curso, use modelo de fluxo para explicitar a regra e cenário de retenção para demonstrar sua aplicação. Confira se plano de redução de permanência permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um pátio fictício recebe duzentos contêineres por dia e tem permanência média de quatro dias em regime estável. Resolução: O estoque médio esperado é oitocentos contêineres; se a permanência sobe a seis dias, passa a 1.200 sob mesmo fluxo. O erro a evitar é: Planejar capacidade para duzentos porque esse é o número diário de entradas. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma inspeção retém 15% dos contêineres por dez dias adicionais. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.gs1.org/standards/epcis",
      "https://developers.google.com/optimization/routing"
    ],
    "region": "north-america"
  },
  {
    "id": "na-validacao-de-dados-mestres-para-classificacao-comercial",
    "title": "Validação de dados mestres para classificação comercial",
    "track": "logistics",
    "role": "Analista de dados de comércio internacional",
    "positioning": "specialist",
    "scenario": "Dois produtos fictícios chamados módulo possuem funções e materiais diferentes, mas a base copia o mesmo código sem documentação.",
    "decision": "Suspender cópia automática e obter atributos técnicos para análise competente; nome igual não prova classificação igual.",
    "misconception": "Usar o código do produto mais vendido como padrão para todos.",
    "changedConstraint": "O produto incorpora bateria e muda a composição declarada.",
    "tasks": [
      "Dicionário de atributos",
      "Checklist documental",
      "Mapa de variantes",
      "Registro de análise competente",
      "Controle de alteração",
      "Fila de dados incompletos"
    ],
    "method": "Dados mestres de comércio precisam descrição técnica, composição, função e documentação rastreável. Código tarifário não deve ser deduzido apenas do nome comercial. Registre interpretação e encaminhe classificação a especialista habilitado conforme jurisdição. Cópia de código antigo pode perpetuar erro quando muda material ou uso. Modele o fluxo por identidade, quantidade, estado, local e tempo. Antes de otimizar custo ou prazo, confira se a solução respeita capacidade, documentação, acessibilidade e responsabilidades aplicáveis. Diferencie mensagem recebida de evento físico e estoque disponível de item apenas presente. Reconcile entradas, saídas e pendências no mesmo período, explicitando sobreposições para não contar duas vezes. Use pedidos, materiais e pessoas inteiramente fictícios. A recomendação deve mostrar o efeito de uma restrição alterada e indicar quando é necessária decisão de especialista, operador habilitado ou autoridade competente. Promessa operacional só é válida dentro das condições e evidências registradas. No caso deste curso, use dicionário de atributos para explicitar a regra e registro de análise competente para demonstrar sua aplicação. Confira se fila de dados incompletos permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Dois produtos fictícios chamados módulo possuem funções e materiais diferentes, mas a base copia o mesmo código sem documentação. Resolução: Suspender cópia automática e obter atributos técnicos para análise competente; nome igual não prova classificação igual. O erro a evitar é: Usar o código do produto mais vendido como padrão para todos. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O produto incorpora bateria e muda a composição declarada. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.trade.gov/harmonized-system-hs-codes",
      "https://www.gs1.org/standards/epcis",
      "https://developers.google.com/optimization/routing"
    ],
    "region": "north-america"
  },
  {
    "id": "na-planejamento-de-rotas-com-janelas-e-tempo-de-servico",
    "title": "Planejamento de rotas com janelas e tempo de serviço",
    "track": "logistics",
    "role": "Planejador de distribuição urbana",
    "positioning": "specialist",
    "scenario": "Uma rota fictícia tem sessenta minutos de viagem e quatro entregas de quinze minutos, dentro de janela total de noventa.",
    "decision": "O plano exige 120 minutos sem margem e não cabe na janela; dividir rota ou renegociar horários.",
    "misconception": "Aprovar a rota porque os sessenta minutos de deslocamento cabem na janela.",
    "changedConstraint": "Uma entrega passa a exigir trinta minutos de conferência.",
    "tasks": [
      "Matriz de viagem",
      "Tabela de serviço",
      "Janelas de atendimento",
      "Simulação de capacidade",
      "Cenário de atraso",
      "Plano de confirmação de rota"
    ],
    "method": "Roteirização deve incluir viagem, espera, serviço, capacidade e horário permitido. Menor distância não garante cumprimento. Valide cada parada e retorno, preservando intervalos legais e requisitos de acessibilidade. Uma estimativa de mapa não é compromisso de entrega sem margem e atualização das condições. Modele o fluxo por identidade, quantidade, estado, local e tempo. Antes de otimizar custo ou prazo, confira se a solução respeita capacidade, documentação, acessibilidade e responsabilidades aplicáveis. Diferencie mensagem recebida de evento físico e estoque disponível de item apenas presente. Reconcile entradas, saídas e pendências no mesmo período, explicitando sobreposições para não contar duas vezes. Use pedidos, materiais e pessoas inteiramente fictícios. A recomendação deve mostrar o efeito de uma restrição alterada e indicar quando é necessária decisão de especialista, operador habilitado ou autoridade competente. Promessa operacional só é válida dentro das condições e evidências registradas. No caso deste curso, use matriz de viagem para explicitar a regra e simulação de capacidade para demonstrar sua aplicação. Confira se plano de confirmação de rota permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma rota fictícia tem sessenta minutos de viagem e quatro entregas de quinze minutos, dentro de janela total de noventa. Resolução: O plano exige 120 minutos sem margem e não cabe na janela; dividir rota ou renegociar horários. O erro a evitar é: Aprovar a rota porque os sessenta minutos de deslocamento cabem na janela. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma entrega passa a exigir trinta minutos de conferência. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.gs1.org/standards/epcis",
      "https://developers.google.com/optimization/routing"
    ],
    "region": "north-america"
  },
  {
    "id": "na-visibilidade-de-remessas-por-eventos-interoperaveis",
    "title": "Visibilidade de remessas por eventos interoperáveis",
    "track": "logistics",
    "role": "Analista de visibilidade logística",
    "positioning": "specialist",
    "scenario": "Uma remessa fictícia tem entrega registrada às 16h e depois recebe mensagem de saída às 10h, transmitida com atraso.",
    "decision": "Manter entrega como estado atual e registrar saída tardia no histórico com horário de ocorrência e recebimento.",
    "misconception": "Voltar o status para em trânsito porque essa foi a última mensagem recebida.",
    "changedConstraint": "O transportador envia horário sem zona temporal.",
    "tasks": [
      "Contrato de evento",
      "Dicionário de estados",
      "Registro de duas temporalidades",
      "Teste de atraso",
      "Regra de correção",
      "Plano de reconciliação de rastreio"
    ],
    "method": "Eventos logísticos precisam identidade, etapa, local, horário e origem confiável. Chegada de mensagem não coincide necessariamente com ocorrência física. Modele atraso e correções sem apagar histórico. Diferencie status informado e observação validada; regras de negócio devem impedir regressões causadas por mensagens fora de ordem. Modele o fluxo por identidade, quantidade, estado, local e tempo. Antes de otimizar custo ou prazo, confira se a solução respeita capacidade, documentação, acessibilidade e responsabilidades aplicáveis. Diferencie mensagem recebida de evento físico e estoque disponível de item apenas presente. Reconcile entradas, saídas e pendências no mesmo período, explicitando sobreposições para não contar duas vezes. Use pedidos, materiais e pessoas inteiramente fictícios. A recomendação deve mostrar o efeito de uma restrição alterada e indicar quando é necessária decisão de especialista, operador habilitado ou autoridade competente. Promessa operacional só é válida dentro das condições e evidências registradas. No caso deste curso, use contrato de evento para explicitar a regra e teste de atraso para demonstrar sua aplicação. Confira se plano de reconciliação de rastreio permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma remessa fictícia tem entrega registrada às 16h e depois recebe mensagem de saída às 10h, transmitida com atraso. Resolução: Manter entrega como estado atual e registrar saída tardia no histórico com horário de ocorrência e recebimento. O erro a evitar é: Voltar o status para em trânsito porque essa foi a última mensagem recebida. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O transportador envia horário sem zona temporal. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.gs1.org/standards/epcis",
      "https://developers.google.com/optimization/routing"
    ],
    "region": "north-america"
  },
  {
    "id": "na-gestao-de-embalagens-retornaveis-por-ciclo-e-perda",
    "title": "Gestão de embalagens retornáveis por ciclo e perda",
    "track": "logistics",
    "role": "Analista de ativos logísticos retornáveis",
    "positioning": "specialist",
    "scenario": "Cem embalagens fictícias saem num mês; oitenta retornam, dez continuam dentro do prazo e dez excedem o limite de investigação.",
    "decision": "Registrar oitenta retornadas, dez pendentes e dez em investigação, sem declarar perda definitiva de vinte.",
    "misconception": "Calcular taxa de perda de 20% imediatamente e ignorar prazo de retorno.",
    "changedConstraint": "O cliente passa a reter embalagens por mais quinze dias contratualmente.",
    "tasks": [
      "Livro de posse",
      "Coortes de expedição",
      "Calendário de retorno",
      "Fila de investigação",
      "Custo por ciclo",
      "Teste de mudança de prazo"
    ],
    "method": "Embalagem retornável exige identidade, posse, limpeza aplicável, giro e perda. Taxa de retorno deve usar coorte e janela suficientes; embalagens ainda em trânsito não são necessariamente perdidas. Compare custo por uso efetivo incluindo recuperação, inspeção e descarte, sem pressupor reutilização ilimitada. Modele o fluxo por identidade, quantidade, estado, local e tempo. Antes de otimizar custo ou prazo, confira se a solução respeita capacidade, documentação, acessibilidade e responsabilidades aplicáveis. Diferencie mensagem recebida de evento físico e estoque disponível de item apenas presente. Reconcile entradas, saídas e pendências no mesmo período, explicitando sobreposições para não contar duas vezes. Use pedidos, materiais e pessoas inteiramente fictícios. A recomendação deve mostrar o efeito de uma restrição alterada e indicar quando é necessária decisão de especialista, operador habilitado ou autoridade competente. Promessa operacional só é válida dentro das condições e evidências registradas. No caso deste curso, use livro de posse para explicitar a regra e fila de investigação para demonstrar sua aplicação. Confira se teste de mudança de prazo permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Cem embalagens fictícias saem num mês; oitenta retornam, dez continuam dentro do prazo e dez excedem o limite de investigação. Resolução: Registrar oitenta retornadas, dez pendentes e dez em investigação, sem declarar perda definitiva de vinte. O erro a evitar é: Calcular taxa de perda de 20% imediatamente e ignorar prazo de retorno. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O cliente passa a reter embalagens por mais quinze dias contratualmente. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.gs1.org/standards/epcis",
      "https://developers.google.com/optimization/routing"
    ],
    "region": "north-america"
  },
  {
    "id": "na-planejamento-de-suprimentos-com-risco-de-fonte-unica",
    "title": "Planejamento de suprimentos com risco de fonte única",
    "track": "logistics",
    "role": "Analista de risco de suprimentos",
    "positioning": "specialist",
    "scenario": "Uma empresa fictícia compra de dois distribuidores, ambos abastecidos pela mesma planta; tem sessenta dias de estoque e alternativa exige 120 dias de qualificação.",
    "decision": "Reconhecer fonte física única e lacuna de sessenta dias entre cobertura e qualificação, priorizando plano de mitigação.",
    "misconception": "Declarar suprimento diversificado porque há dois contratos de compra.",
    "changedConstraint": "A planta anuncia manutenção de noventa dias.",
    "tasks": [
      "Mapa multinível",
      "Registro de origem comum",
      "Cálculo de cobertura",
      "Cronograma de alternativa",
      "Cenário de interrupção",
      "Plano de mitigação de dependência"
    ],
    "method": "Fonte única é risco de dependência funcional, não apenas quantidade de fornecedores cadastrados. Dois distribuidores podem depender da mesma fábrica. Mapeie níveis, estoque, lead time e qualificação de alternativa. Estoque adicional compra tempo, mas não elimina risco de interrupção prolongada ou componente sem substituto. Modele o fluxo por identidade, quantidade, estado, local e tempo. Antes de otimizar custo ou prazo, confira se a solução respeita capacidade, documentação, acessibilidade e responsabilidades aplicáveis. Diferencie mensagem recebida de evento físico e estoque disponível de item apenas presente. Reconcile entradas, saídas e pendências no mesmo período, explicitando sobreposições para não contar duas vezes. Use pedidos, materiais e pessoas inteiramente fictícios. A recomendação deve mostrar o efeito de uma restrição alterada e indicar quando é necessária decisão de especialista, operador habilitado ou autoridade competente. Promessa operacional só é válida dentro das condições e evidências registradas. No caso deste curso, use mapa multinível para explicitar a regra e cronograma de alternativa para demonstrar sua aplicação. Confira se plano de mitigação de dependência permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma empresa fictícia compra de dois distribuidores, ambos abastecidos pela mesma planta; tem sessenta dias de estoque e alternativa exige 120 dias de qualificação. Resolução: Reconhecer fonte física única e lacuna de sessenta dias entre cobertura e qualificação, priorizando plano de mitigação. O erro a evitar é: Declarar suprimento diversificado porque há dois contratos de compra. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A planta anuncia manutenção de noventa dias. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.gs1.org/standards/epcis",
      "https://developers.google.com/optimization/routing"
    ],
    "region": "north-america"
  },
  {
    "id": "na-auditoria-de-frete-por-peso-tarifavel-e-excecoes",
    "title": "Auditoria de frete por peso tarifável e exceções",
    "track": "logistics",
    "role": "Analista de auditoria de transporte",
    "positioning": "specialist",
    "scenario": "Um volume fictício pesa dez kg e mede 60×40×30 cm; o contrato usa divisor volumétrico de 6.000 cm³ por kg.",
    "decision": "O peso volumétrico é doze kg e, sob a regra contratual do exercício, esse é o peso tarifável.",
    "misconception": "Cobrar dez kg porque a balança mede o peso físico.",
    "changedConstraint": "O contrato altera o divisor para 5.000 e inclui sobretaxa remota.",
    "tasks": [
      "Dicionário tarifário",
      "Registro dimensional",
      "Cálculo de peso volumétrico",
      "Conferência de adicionais",
      "Amostra de faturas",
      "Memória de contestação"
    ],
    "method": "Frete pode ser cobrado por peso real, volumétrico ou regra contratual específica. Registre dimensões, fator, arredondamento e serviços adicionais. Uma tarifa unitária menor não garante menor custo completo. Audite amostras com documento e preserve divergências para contestação fundamentada, sem inventar regra universal. Modele o fluxo por identidade, quantidade, estado, local e tempo. Antes de otimizar custo ou prazo, confira se a solução respeita capacidade, documentação, acessibilidade e responsabilidades aplicáveis. Diferencie mensagem recebida de evento físico e estoque disponível de item apenas presente. Reconcile entradas, saídas e pendências no mesmo período, explicitando sobreposições para não contar duas vezes. Use pedidos, materiais e pessoas inteiramente fictícios. A recomendação deve mostrar o efeito de uma restrição alterada e indicar quando é necessária decisão de especialista, operador habilitado ou autoridade competente. Promessa operacional só é válida dentro das condições e evidências registradas. No caso deste curso, use dicionário tarifário para explicitar a regra e conferência de adicionais para demonstrar sua aplicação. Confira se memória de contestação permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um volume fictício pesa dez kg e mede 60×40×30 cm; o contrato usa divisor volumétrico de 6.000 cm³ por kg. Resolução: O peso volumétrico é doze kg e, sob a regra contratual do exercício, esse é o peso tarifável. O erro a evitar é: Cobrar dez kg porque a balança mede o peso físico. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O contrato altera o divisor para 5.000 e inclui sobretaxa remota. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.gs1.org/standards/epcis",
      "https://developers.google.com/optimization/routing"
    ],
    "region": "north-america"
  },
  {
    "id": "na-avaliacao-de-incerteza-em-inventarios-ambientais",
    "title": "Avaliação de incerteza em inventários ambientais",
    "track": "quality",
    "role": "Analista de qualidade de inventários ambientais",
    "positioning": "specialist",
    "scenario": "Uma atividade fictícia é estimada entre novecentas e 1.100 unidades e o fator assumido é 0,2 kg por unidade.",
    "decision": "A faixa simplificada é de 180 a 220 kg, sem afirmar que contempla incerteza do fator; registrar a hipótese de fator fixo.",
    "misconception": "Publicar duzentos kg com seis casas decimais como valor exato.",
    "changedConstraint": "O fator passa a variar entre 0,18 e 0,24 kg por unidade.",
    "tasks": [
      "Fronteira de inventário",
      "Livro de unidades",
      "Registro de fontes",
      "Faixa de atividade",
      "Análise de sensibilidade",
      "Nota de precisão e limites"
    ],
    "method": "Um inventário ambiental combina medição, fator, estimativa e fronteira. Registre unidades e fontes antes de agregar. Incerteza não desaparece ao apresentar muitas casas decimais. Quando a relação é linear e o fator é tratado como fixo, uma faixa de atividade gera faixa proporcional; incertezas correlacionadas exigem cuidado adicional. Uma conclusão de qualidade precisa conectar critério, observação, origem e limite. Defina o que foi efetivamente verificado e o que permanece fora da cobertura; ausência de dado não equivale a conformidade. Preserve unidade, identidade e período ao reunir documentos de fontes diferentes. Toda correção deve manter histórico em vez de apagar a evidência original. Uma assinatura, certificado ou resultado isolado precisa ser interpretado dentro de seu escopo e competência. O laboratório usa registros sintéticos e não emite licença, laudo regulatório ou aprovação técnica. A entrega deve permitir que outra pessoa refaça a conferência e encontre as mesmas lacunas. No caso deste curso, use fronteira de inventário para explicitar a regra e faixa de atividade para demonstrar sua aplicação. Confira se nota de precisão e limites permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma atividade fictícia é estimada entre novecentas e 1.100 unidades e o fator assumido é 0,2 kg por unidade. Resolução: A faixa simplificada é de 180 a 220 kg, sem afirmar que contempla incerteza do fator; registrar a hipótese de fator fixo. O erro a evitar é: Publicar duzentos kg com seis casas decimais como valor exato. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O fator passa a variar entre 0,18 e 0,24 kg por unidade. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.epa.gov/quality",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-controle-de-cadeia-de-custodia-de-amostras-ambientais",
    "title": "Controle de cadeia de custódia de amostras ambientais",
    "track": "quality",
    "role": "Coordenador documental de amostragem ambiental",
    "positioning": "specialist",
    "scenario": "Doze amostras fictícias chegam ao laboratório; uma etiqueta está ilegível e duas não possuem registro de temperatura exigido pelo protocolo do exercício.",
    "decision": "Manter três desvios documentados e solicitar avaliação técnica de aceitabilidade, sem atribuir resultados à amostra ilegível.",
    "misconception": "Completar a etiqueta de memória e presumir condição térmica adequada.",
    "changedConstraint": "O mensageiro entrega as amostras quatro horas após o horário registrado.",
    "tasks": [
      "Formulário de custódia",
      "Identificadores de amostra",
      "Livro de transferências",
      "Registro de desvios",
      "Conferência de recebimento",
      "Dossiê de avaliação técnica"
    ],
    "method": "Cadeia de custódia preserva identidade, coleta, transferência, condição e recebimento. Resultado laboratorial não corrige falha de identificação da amostra. Registre desvios e encaminhe decisão de aceitabilidade ao responsável técnico. O exercício usa documentos sintéticos e não habilita coleta ou análise regulatória. Uma conclusão de qualidade precisa conectar critério, observação, origem e limite. Defina o que foi efetivamente verificado e o que permanece fora da cobertura; ausência de dado não equivale a conformidade. Preserve unidade, identidade e período ao reunir documentos de fontes diferentes. Toda correção deve manter histórico em vez de apagar a evidência original. Uma assinatura, certificado ou resultado isolado precisa ser interpretado dentro de seu escopo e competência. O laboratório usa registros sintéticos e não emite licença, laudo regulatório ou aprovação técnica. A entrega deve permitir que outra pessoa refaça a conferência e encontre as mesmas lacunas. No caso deste curso, use formulário de custódia para explicitar a regra e registro de desvios para demonstrar sua aplicação. Confira se dossiê de avaliação técnica permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Doze amostras fictícias chegam ao laboratório; uma etiqueta está ilegível e duas não possuem registro de temperatura exigido pelo protocolo do exercício. Resolução: Manter três desvios documentados e solicitar avaliação técnica de aceitabilidade, sem atribuir resultados à amostra ilegível. O erro a evitar é: Completar a etiqueta de memória e presumir condição térmica adequada. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O mensageiro entrega as amostras quatro horas após o horário registrado. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.epa.gov/quality/guidance-quality-assurance-project-plans",
      "https://www.epa.gov/quality",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-rastreabilidade-de-residuos-por-massa-e-destino",
    "title": "Rastreabilidade de resíduos por massa e destino",
    "track": "quality",
    "role": "Analista de rastreabilidade de resíduos",
    "positioning": "specialist",
    "scenario": "Um fluxo fictício gera dez toneladas: sete vão à triagem, duas ao destino final e uma fica em estoque; a triagem rejeita duas.",
    "decision": "O potencial encaminhado após triagem é cinco toneladas, sujeito a evidência de reciclagem; não anunciar sete recicladas.",
    "misconception": "Contar tudo que saiu para triagem como reciclagem concluída.",
    "changedConstraint": "Uma tonelada de rejeito retorna ao gerador no mês seguinte.",
    "tasks": [
      "Balanço de massa",
      "Mapa de destinos",
      "Livro de comprovantes",
      "Regra de estoque",
      "Tratamento de rejeito",
      "Relatório de evidência de recuperação"
    ],
    "method": "Balanço de resíduos exige entradas, saídas, estoque e destino documentado. Massa coletada não prova reciclagem efetiva; diferencie triagem, rejeito e transformação. Preserve unidade, umidade e período comparáveis. Verificação de conformidade e autorização do destino precisa consulta às exigências locais por responsável competente. Uma conclusão de qualidade precisa conectar critério, observação, origem e limite. Defina o que foi efetivamente verificado e o que permanece fora da cobertura; ausência de dado não equivale a conformidade. Preserve unidade, identidade e período ao reunir documentos de fontes diferentes. Toda correção deve manter histórico em vez de apagar a evidência original. Uma assinatura, certificado ou resultado isolado precisa ser interpretado dentro de seu escopo e competência. O laboratório usa registros sintéticos e não emite licença, laudo regulatório ou aprovação técnica. A entrega deve permitir que outra pessoa refaça a conferência e encontre as mesmas lacunas. No caso deste curso, use balanço de massa para explicitar a regra e regra de estoque para demonstrar sua aplicação. Confira se relatório de evidência de recuperação permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um fluxo fictício gera dez toneladas: sete vão à triagem, duas ao destino final e uma fica em estoque; a triagem rejeita duas. Resolução: O potencial encaminhado após triagem é cinco toneladas, sujeito a evidência de reciclagem; não anunciar sete recicladas. O erro a evitar é: Contar tudo que saiu para triagem como reciclagem concluída. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma tonelada de rejeito retorna ao gerador no mês seguinte. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.epa.gov/smm",
      "https://www.epa.gov/quality",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-avaliacao-de-desempenho-de-sensores-de-qualidade-do-ar",
    "title": "Avaliação de desempenho de sensores de qualidade do ar",
    "track": "quality",
    "role": "Analista de dados de monitoramento atmosférico",
    "positioning": "specialist",
    "scenario": "Um sensor fictício acompanha perfeitamente a variação da referência, mas registra sempre cinco µg/m³ a mais.",
    "decision": "Registrar viés aditivo de cinco e avaliar correção e validação independente; correlação perfeita não demonstra exatidão.",
    "misconception": "Aprovar o sensor apenas porque a correlação é um.",
    "changedConstraint": "A umidade relativa sobe acima da faixa usada na comparação.",
    "tasks": [
      "Plano de comparação",
      "Registro de unidade e intervalo",
      "Cálculo de viés",
      "Análise de erro",
      "Teste de condição ambiental",
      "Nota de uso permitido"
    ],
    "method": "Sensores de baixo custo precisam comparação com referência adequada, controle de condições e objetivo definido. Correlação alta não elimina viés sistemático. Registre unidade, média temporal e condições ambientais. Não interprete leitura isolada como diagnóstico médico nem como substituto automático de medição regulatória. Uma conclusão de qualidade precisa conectar critério, observação, origem e limite. Defina o que foi efetivamente verificado e o que permanece fora da cobertura; ausência de dado não equivale a conformidade. Preserve unidade, identidade e período ao reunir documentos de fontes diferentes. Toda correção deve manter histórico em vez de apagar a evidência original. Uma assinatura, certificado ou resultado isolado precisa ser interpretado dentro de seu escopo e competência. O laboratório usa registros sintéticos e não emite licença, laudo regulatório ou aprovação técnica. A entrega deve permitir que outra pessoa refaça a conferência e encontre as mesmas lacunas. No caso deste curso, use plano de comparação para explicitar a regra e análise de erro para demonstrar sua aplicação. Confira se nota de uso permitido permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um sensor fictício acompanha perfeitamente a variação da referência, mas registra sempre cinco µg/m³ a mais. Resolução: Registrar viés aditivo de cinco e avaliar correção e validação independente; correlação perfeita não demonstra exatidão. O erro a evitar é: Aprovar o sensor apenas porque a correlação é um. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A umidade relativa sobe acima da faixa usada na comparação. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.epa.gov/air-sensor-toolbox",
      "https://www.epa.gov/quality",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-gestao-de-evidencias-para-alegacoes-de-circularidade",
    "title": "Gestão de evidências para alegações de circularidade",
    "track": "quality",
    "role": "Analista de evidências de circularidade",
    "positioning": "specialist",
    "scenario": "Um produto fictício de dez kg contém três kg de material reciclado; o fabricante afirma que oito kg são tecnicamente recicláveis.",
    "decision": "Registrar 30% de conteúdo reciclado e 80% de reciclabilidade técnica como afirmações distintas, sem declarar 80% de material reciclado.",
    "misconception": "Usar o maior percentual para qualquer alegação ambiental.",
    "changedConstraint": "O fornecedor passa a entregar certificado apenas para parte do lote.",
    "tasks": [
      "Matriz de alegações",
      "Definição de denominadores",
      "Livro de massa",
      "Inventário de evidências",
      "Tratamento de lote parcial",
      "Revisão de linguagem de comunicação"
    ],
    "method": "Alegação de circularidade precisa denominador, fronteira, período e etapa comprovada. Conteúdo reciclado, reciclabilidade e reciclagem efetiva são medidas diferentes. Não transforme intenção de projeto em resultado observado. Mantenha documentos de origem e reconciliação de massa, distinguindo evidência do fornecedor e verificação independente. Uma conclusão de qualidade precisa conectar critério, observação, origem e limite. Defina o que foi efetivamente verificado e o que permanece fora da cobertura; ausência de dado não equivale a conformidade. Preserve unidade, identidade e período ao reunir documentos de fontes diferentes. Toda correção deve manter histórico em vez de apagar a evidência original. Uma assinatura, certificado ou resultado isolado precisa ser interpretado dentro de seu escopo e competência. O laboratório usa registros sintéticos e não emite licença, laudo regulatório ou aprovação técnica. A entrega deve permitir que outra pessoa refaça a conferência e encontre as mesmas lacunas. No caso deste curso, use matriz de alegações para explicitar a regra e inventário de evidências para demonstrar sua aplicação. Confira se revisão de linguagem de comunicação permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um produto fictício de dez kg contém três kg de material reciclado; o fabricante afirma que oito kg são tecnicamente recicláveis. Resolução: Registrar 30% de conteúdo reciclado e 80% de reciclabilidade técnica como afirmações distintas, sem declarar 80% de material reciclado. O erro a evitar é: Usar o maior percentual para qualquer alegação ambiental. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O fornecedor passa a entregar certificado apenas para parte do lote. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.epa.gov/quality",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-planejamento-de-auditorias-por-risco-de-processo",
    "title": "Planejamento de auditorias por risco de processo",
    "track": "quality",
    "role": "Analista de planejamento de auditorias",
    "positioning": "specialist",
    "scenario": "Duas áreas fictícias tiveram zero achados no ano anterior; uma mudou sistema e fornecedor, a outra mantém processo estável.",
    "decision": "Priorizar a área alterada para avaliar novos controles, sem presumir baixo risco pela ausência histórica de achados.",
    "misconception": "Distribuir esforço igualmente porque ambas tiveram o mesmo resultado passado.",
    "changedConstraint": "A área estável recebe requisito contratual novo.",
    "tasks": [
      "Universo de auditoria",
      "Matriz de risco",
      "Plano de amostragem",
      "Roteiro de evidências",
      "Modelo de constatação",
      "Revisão de prioridade por mudança"
    ],
    "method": "Auditoria por risco relaciona objetivos, consequências, controles e evidências amostrais. Frequência histórica não deve ser único critério; mudança de processo pode criar risco novo. Uma constatação precisa condição, critério, evidência e consequência, evitando julgamento pessoal. A amostra delimita a conclusão e não prova ausência universal de falhas. Uma conclusão de qualidade precisa conectar critério, observação, origem e limite. Defina o que foi efetivamente verificado e o que permanece fora da cobertura; ausência de dado não equivale a conformidade. Preserve unidade, identidade e período ao reunir documentos de fontes diferentes. Toda correção deve manter histórico em vez de apagar a evidência original. Uma assinatura, certificado ou resultado isolado precisa ser interpretado dentro de seu escopo e competência. O laboratório usa registros sintéticos e não emite licença, laudo regulatório ou aprovação técnica. A entrega deve permitir que outra pessoa refaça a conferência e encontre as mesmas lacunas. No caso deste curso, use universo de auditoria para explicitar a regra e roteiro de evidências para demonstrar sua aplicação. Confira se revisão de prioridade por mudança permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Duas áreas fictícias tiveram zero achados no ano anterior; uma mudou sistema e fornecedor, a outra mantém processo estável. Resolução: Priorizar a área alterada para avaliar novos controles, sem presumir baixo risco pela ausência histórica de achados. O erro a evitar é: Distribuir esforço igualmente porque ambas tiveram o mesmo resultado passado. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A área estável recebe requisito contratual novo. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.epa.gov/quality",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-controle-de-nao-conformidades-por-eficacia-da-correcao",
    "title": "Controle de não conformidades por eficácia da correção",
    "track": "quality",
    "role": "Analista de melhoria de sistemas de qualidade",
    "positioning": "specialist",
    "scenario": "Uma operação fictícia corrige vinte etiquetas erradas e declara problema resolvido; na semana seguinte oito novas etiquetas apresentam o mesmo erro.",
    "decision": "Registrar correção de vinte itens, mas ação corretiva ineficaz ou ausente; investigar geração da etiqueta e validar prevenção.",
    "misconception": "Encerrar a ocorrência porque as vinte etiquetas originais foram substituídas.",
    "changedConstraint": "O erro aparece somente em pedidos de um canal específico.",
    "tasks": [
      "Registro de contenção",
      "Mapa de causa",
      "Plano de ação corretiva",
      "Indicador de recorrência",
      "Teste por canal",
      "Critério de eficácia"
    ],
    "method": "Correção resolve o item observado; ação corretiva trata causa para reduzir recorrência. Fechar tarefa não comprova eficácia. Defina indicador e prazo de observação antes do fechamento, diferenciando contenção imediata de mudança sistêmica. Análise causal deve ser sustentada por evidência, não por atribuição automática de culpa. Uma conclusão de qualidade precisa conectar critério, observação, origem e limite. Defina o que foi efetivamente verificado e o que permanece fora da cobertura; ausência de dado não equivale a conformidade. Preserve unidade, identidade e período ao reunir documentos de fontes diferentes. Toda correção deve manter histórico em vez de apagar a evidência original. Uma assinatura, certificado ou resultado isolado precisa ser interpretado dentro de seu escopo e competência. O laboratório usa registros sintéticos e não emite licença, laudo regulatório ou aprovação técnica. A entrega deve permitir que outra pessoa refaça a conferência e encontre as mesmas lacunas. No caso deste curso, use registro de contenção para explicitar a regra e indicador de recorrência para demonstrar sua aplicação. Confira se critério de eficácia permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma operação fictícia corrige vinte etiquetas erradas e declara problema resolvido; na semana seguinte oito novas etiquetas apresentam o mesmo erro. Resolução: Registrar correção de vinte itens, mas ação corretiva ineficaz ou ausente; investigar geração da etiqueta e validar prevenção. O erro a evitar é: Encerrar a ocorrência porque as vinte etiquetas originais foram substituídas. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O erro aparece somente em pedidos de um canal específico. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.epa.gov/quality",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-qualidade-de-dados-em-declaracoes-de-materiais",
    "title": "Qualidade de dados em declarações de materiais",
    "track": "quality",
    "role": "Analista de dados de conformidade de materiais",
    "positioning": "specialist",
    "scenario": "Um fornecedor fictício declara composição da revisão A; a empresa vende revisões A e B, cuja resina mudou.",
    "decision": "Aplicar o documento somente à revisão coberta e solicitar evidência para B, sem inferir equivalência.",
    "misconception": "Marcar todas as revisões como conformes porque o nome comercial é igual.",
    "changedConstraint": "O fornecedor informa concentração em ppm e a base espera percentual.",
    "tasks": [
      "Matriz peça revisão",
      "Dicionário de substâncias",
      "Conferência de unidades",
      "Registro de cobertura",
      "Fila de lacunas",
      "Controle de atualização de evidências"
    ],
    "method": "Declarações de materiais precisam identificação de peça, revisão, substância, unidade e cobertura. Declaração do fornecedor não deve ser aplicada a variantes não incluídas. Ausência de informação não equivale a ausência da substância. Encaminhe enquadramento regulatório a profissional competente e fontes oficiais atuais. Uma conclusão de qualidade precisa conectar critério, observação, origem e limite. Defina o que foi efetivamente verificado e o que permanece fora da cobertura; ausência de dado não equivale a conformidade. Preserve unidade, identidade e período ao reunir documentos de fontes diferentes. Toda correção deve manter histórico em vez de apagar a evidência original. Uma assinatura, certificado ou resultado isolado precisa ser interpretado dentro de seu escopo e competência. O laboratório usa registros sintéticos e não emite licença, laudo regulatório ou aprovação técnica. A entrega deve permitir que outra pessoa refaça a conferência e encontre as mesmas lacunas. No caso deste curso, use matriz peça revisão para explicitar a regra e registro de cobertura para demonstrar sua aplicação. Confira se controle de atualização de evidências permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um fornecedor fictício declara composição da revisão A; a empresa vende revisões A e B, cuja resina mudou. Resolução: Aplicar o documento somente à revisão coberta e solicitar evidência para B, sem inferir equivalência. O erro a evitar é: Marcar todas as revisões como conformes porque o nome comercial é igual. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O fornecedor informa concentração em ppm e a base espera percentual. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.epa.gov/quality",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-validacao-de-limpeza-por-evidencia-documental",
    "title": "Validação de limpeza por evidência documental",
    "track": "quality",
    "role": "Analista documental de validação de processos",
    "positioning": "specialist",
    "scenario": "Um registro fictício confirma execução, mas omite tempo de contato e identificação do produto; o procedimento exige ambos.",
    "decision": "Registrar evidência incompleta e solicitar avaliação do responsável, sem preencher dados retrospectivamente como observados.",
    "misconception": "Liberar o equipamento porque o formulário possui assinatura.",
    "changedConstraint": "A equipe troca o produto e mantém o procedimento antigo.",
    "tasks": [
      "Matriz de parâmetros",
      "Modelo de registro",
      "Mapa de produtos",
      "Controle de revisão",
      "Fila de evidência incompleta",
      "Roteiro de avaliação de alteração"
    ],
    "method": "Documentação de limpeza deve relacionar procedimento aprovado, execução, produto, equipamento e verificação definida. Assinatura não comprova que todos os parâmetros foram atendidos. O curso trata rastreabilidade e detecção de lacunas; não define critérios sanitários ou autoriza liberação técnica de instalações. Uma conclusão de qualidade precisa conectar critério, observação, origem e limite. Defina o que foi efetivamente verificado e o que permanece fora da cobertura; ausência de dado não equivale a conformidade. Preserve unidade, identidade e período ao reunir documentos de fontes diferentes. Toda correção deve manter histórico em vez de apagar a evidência original. Uma assinatura, certificado ou resultado isolado precisa ser interpretado dentro de seu escopo e competência. O laboratório usa registros sintéticos e não emite licença, laudo regulatório ou aprovação técnica. A entrega deve permitir que outra pessoa refaça a conferência e encontre as mesmas lacunas. No caso deste curso, use matriz de parâmetros para explicitar a regra e controle de revisão para demonstrar sua aplicação. Confira se roteiro de avaliação de alteração permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um registro fictício confirma execução, mas omite tempo de contato e identificação do produto; o procedimento exige ambos. Resolução: Registrar evidência incompleta e solicitar avaliação do responsável, sem preencher dados retrospectivamente como observados. O erro a evitar é: Liberar o equipamento porque o formulário possui assinatura. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A equipe troca o produto e mantém o procedimento antigo. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.epa.gov/quality",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-analise-de-confiabilidade-de-registros-de-inspecao-remota",
    "title": "Análise de confiabilidade de registros de inspeção remota",
    "track": "quality",
    "role": "Analista de evidências de inspeção remota",
    "positioning": "specialist",
    "scenario": "Um ativo fictício tem vinte pontos de inspeção; vídeo cobre quinze e três destes ficam desfocados.",
    "decision": "Há doze pontos efetivamente observáveis e oito pendentes; relatar cobertura de 60% sem concluir aprovação do ativo.",
    "misconception": "Declarar cobertura de 75% contando todos os pontos presentes no vídeo.",
    "changedConstraint": "O vídeo não permite confirmar que a etiqueta pertence ao ativo inspecionado.",
    "tasks": [
      "Plano de pontos",
      "Registro de identidade",
      "Rubrica de qualidade visual",
      "Mapa de zonas ocultas",
      "Relatório de cobertura",
      "Lista de verificações presenciais"
    ],
    "method": "Inspeção remota depende de cobertura visual, identificação, horário e limite de observação. Imagem nítida de uma parte não comprova condição do conjunto. Registre zonas ocultas e critérios que exigem presença física. Não certifique segurança estrutural ou elétrica com exercício de imagem; encaminhe a avaliação habilitada. Uma conclusão de qualidade precisa conectar critério, observação, origem e limite. Defina o que foi efetivamente verificado e o que permanece fora da cobertura; ausência de dado não equivale a conformidade. Preserve unidade, identidade e período ao reunir documentos de fontes diferentes. Toda correção deve manter histórico em vez de apagar a evidência original. Uma assinatura, certificado ou resultado isolado precisa ser interpretado dentro de seu escopo e competência. O laboratório usa registros sintéticos e não emite licença, laudo regulatório ou aprovação técnica. A entrega deve permitir que outra pessoa refaça a conferência e encontre as mesmas lacunas. No caso deste curso, use plano de pontos para explicitar a regra e mapa de zonas ocultas para demonstrar sua aplicação. Confira se lista de verificações presenciais permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um ativo fictício tem vinte pontos de inspeção; vídeo cobre quinze e três destes ficam desfocados. Resolução: Há doze pontos efetivamente observáveis e oito pendentes; relatar cobertura de 60% sem concluir aprovação do ativo. O erro a evitar é: Declarar cobertura de 75% contando todos os pontos presentes no vídeo. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O vídeo não permite confirmar que a etiqueta pertence ao ativo inspecionado. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.epa.gov/quality",
      "https://www.itl.nist.gov/div898/handbook/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-modelagem-de-receita-recorrente-por-coortes-contratuais",
    "title": "Modelagem de receita recorrente por coortes contratuais",
    "track": "business",
    "role": "Analista de operações de receita",
    "positioning": "specialist",
    "scenario": "Uma coorte fictícia começa com mil de receita mensal; perde cem, expande duzentos e ganha trezentos de clientes novos.",
    "decision": "A retenção líquida da coorte é (1.000−100+200)/1.000=110%; os trezentos novos ficam fora desse denominador.",
    "misconception": "Somar novos clientes e anunciar retenção de 140%.",
    "changedConstraint": "Um cliente cancela e reativa no mesmo mês.",
    "tasks": [
      "Dicionário de eventos contratuais",
      "Tabela de coortes",
      "Ponte de receita",
      "Cálculo de retenção líquida",
      "Regra de reativação",
      "Reconciliação com faturamento"
    ],
    "method": "Receita recorrente contratual, caixa e receita contábil são visões diferentes. Defina início, cancelamento, expansão e moeda de cada contrato. Compare coortes com mesma maturidade; desconto inicial não deve ser tratado como preço permanente. Preserve reconciliação para evitar contar reativação como novo cliente e expansão ao mesmo tempo. Transforme o objetivo de negócio em uma definição mensurável com unidade, prazo, população e responsabilidade. Diferencie indicador operacional, resultado financeiro e hipótese de comportamento. Um número agregado pode ocultar segmentos com necessidades ou custos muito diferentes. Registre premissas, compare ao menos uma alternativa e teste uma mudança que possa alterar a escolha. Use valores fictícios e não apresente a simulação como previsão de receita ou orientação contábil, jurídica ou de investimento. Quando a decisão depender de contrato ou norma local, indique a validação especializada necessária. A entrega deve sustentar o que a organização pode prometer e mostrar claramente a incerteza. No caso deste curso, use dicionário de eventos contratuais para explicitar a regra e cálculo de retenção líquida para demonstrar sua aplicação. Confira se reconciliação com faturamento permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma coorte fictícia começa com mil de receita mensal; perde cem, expande duzentos e ganha trezentos de clientes novos. Resolução: A retenção líquida da coorte é (1.000−100+200)/1.000=110%; os trezentos novos ficam fora desse denominador. O erro a evitar é: Somar novos clientes e anunciar retenção de 140%. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Um cliente cancela e reativa no mesmo mês. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://docs.stripe.com/billing/subscriptions/analytics",
      "https://www.sba.gov/business-guide/manage-your-business"
    ],
    "region": "north-america"
  },
  {
    "id": "na-planejamento-financeiro-de-assinaturas-com-uso-variavel",
    "title": "Planejamento financeiro de assinaturas com uso variável",
    "track": "business",
    "role": "Analista de unit economics de produtos digitais",
    "positioning": "specialist",
    "scenario": "Um plano fictício cobra vinte por mês; taxa é um, suporte médio dois e uso custa doze para noventa clientes e quarenta para dez.",
    "decision": "A margem de contribuição total é 2.000−100−200−1.480=220; o grupo intensivo perde 23 por cliente antes de custos fixos.",
    "misconception": "Concluir que todos os clientes são lucrativos porque a margem total é positiva.",
    "changedConstraint": "A proporção de usuários intensivos sobe de 10% para 25%.",
    "tasks": [
      "Modelo de custos",
      "Distribuição de consumo",
      "Margem por coorte",
      "Simulação de sensibilidade",
      "Política de comunicação de uso",
      "Plano de validação de hipóteses"
    ],
    "method": "Assinatura com custo de uso exige margem por coorte e distribuição de consumo, não só usuário médio. Separe custo fixo, variável, taxas e suporte. Uma margem positiva agregada pode ocultar usuários deficitários. Simule limites transparentes sem mudar contrato ou preço real no exercício. Transforme o objetivo de negócio em uma definição mensurável com unidade, prazo, população e responsabilidade. Diferencie indicador operacional, resultado financeiro e hipótese de comportamento. Um número agregado pode ocultar segmentos com necessidades ou custos muito diferentes. Registre premissas, compare ao menos uma alternativa e teste uma mudança que possa alterar a escolha. Use valores fictícios e não apresente a simulação como previsão de receita ou orientação contábil, jurídica ou de investimento. Quando a decisão depender de contrato ou norma local, indique a validação especializada necessária. A entrega deve sustentar o que a organização pode prometer e mostrar claramente a incerteza. No caso deste curso, use modelo de custos para explicitar a regra e simulação de sensibilidade para demonstrar sua aplicação. Confira se plano de validação de hipóteses permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um plano fictício cobra vinte por mês; taxa é um, suporte médio dois e uso custa doze para noventa clientes e quarenta para dez. Resolução: A margem de contribuição total é 2.000−100−200−1.480=220; o grupo intensivo perde 23 por cliente antes de custos fixos. O erro a evitar é: Concluir que todos os clientes são lucrativos porque a margem total é positiva. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A proporção de usuários intensivos sobe de 10% para 25%. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://docs.stripe.com/billing/subscriptions/usage-based",
      "https://www.sba.gov/business-guide/manage-your-business",
      "https://docs.stripe.com/billing/subscriptions/analytics"
    ],
    "region": "north-america"
  },
  {
    "id": "na-auditoria-operacional-de-programas-de-indicacao",
    "title": "Auditoria operacional de programas de indicação",
    "track": "business",
    "role": "Analista de operações de parcerias",
    "positioning": "specialist",
    "scenario": "Um programa fictício registra cem conversões; dez são duplicadas e cinco dessas duplicadas também foram reembolsadas.",
    "decision": "Deduplicar primeiro e aplicar regras de reembolso aos registros únicos, sem subtrair os mesmos casos duas vezes.",
    "misconception": "Pagar cem bônus por contar eventos brutos como clientes distintos.",
    "changedConstraint": "Uma família usa o mesmo dispositivo para inscrições legítimas.",
    "tasks": [
      "Contrato de atribuição",
      "Tabela de conversões únicas",
      "Regra de reembolso",
      "Fila de revisão",
      "Teste de dispositivo compartilhado",
      "Reconciliação de créditos"
    ],
    "method": "Indicação precisa identificar origem, elegibilidade, evento de conversão e janela. Evite atribuir a mesma venda a múltiplos indicadores e separar crédito de pagamento. Regras devem ser publicadas e aplicadas sem discriminação. Detecte padrões suspeitos com revisão, sem presumir fraude apenas por endereço compartilhado. Transforme o objetivo de negócio em uma definição mensurável com unidade, prazo, população e responsabilidade. Diferencie indicador operacional, resultado financeiro e hipótese de comportamento. Um número agregado pode ocultar segmentos com necessidades ou custos muito diferentes. Registre premissas, compare ao menos uma alternativa e teste uma mudança que possa alterar a escolha. Use valores fictícios e não apresente a simulação como previsão de receita ou orientação contábil, jurídica ou de investimento. Quando a decisão depender de contrato ou norma local, indique a validação especializada necessária. A entrega deve sustentar o que a organização pode prometer e mostrar claramente a incerteza. No caso deste curso, use contrato de atribuição para explicitar a regra e fila de revisão para demonstrar sua aplicação. Confira se reconciliação de créditos permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um programa fictício registra cem conversões; dez são duplicadas e cinco dessas duplicadas também foram reembolsadas. Resolução: Deduplicar primeiro e aplicar regras de reembolso aos registros únicos, sem subtrair os mesmos casos duas vezes. O erro a evitar é: Pagar cem bônus por contar eventos brutos como clientes distintos. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma família usa o mesmo dispositivo para inscrições legítimas. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.sba.gov/business-guide/manage-your-business",
      "https://docs.stripe.com/billing/subscriptions/analytics"
    ],
    "region": "north-america"
  },
  {
    "id": "na-planejamento-de-onboarding-com-dependencias-e-valor-entregue",
    "title": "Planejamento de onboarding com dependências e valor entregue",
    "track": "business",
    "role": "Analista de operações de sucesso do cliente",
    "positioning": "specialist",
    "scenario": "De cem contas fictícias, oitenta completam perfil, cinquenta integram dados e trinta geram primeiro relatório utilizável.",
    "decision": "A ativação definida pelo relatório é 30%, não 80%; investigar a passagem de integração para resultado.",
    "misconception": "Declarar oitenta clientes ativados porque preencheram o perfil.",
    "changedConstraint": "Vinte integrações falham por erro do próprio produto.",
    "tasks": [
      "Mapa de dependências",
      "Definição de ativação",
      "Funil por estado",
      "Registro de barreiras",
      "Teste de primeiro valor",
      "Plano de recuperação de falhas"
    ],
    "method": "Onboarding deve conectar configuração, habilidade e primeiro resultado útil. Conclusão de checklist não prova ativação. Modele dependências e barreiras por segmento, medindo tempo até valor e desistência por etapa. Recurso indisponível por falha técnica não deve ser classificado como falta de interesse do cliente. Transforme o objetivo de negócio em uma definição mensurável com unidade, prazo, população e responsabilidade. Diferencie indicador operacional, resultado financeiro e hipótese de comportamento. Um número agregado pode ocultar segmentos com necessidades ou custos muito diferentes. Registre premissas, compare ao menos uma alternativa e teste uma mudança que possa alterar a escolha. Use valores fictícios e não apresente a simulação como previsão de receita ou orientação contábil, jurídica ou de investimento. Quando a decisão depender de contrato ou norma local, indique a validação especializada necessária. A entrega deve sustentar o que a organização pode prometer e mostrar claramente a incerteza. No caso deste curso, use mapa de dependências para explicitar a regra e registro de barreiras para demonstrar sua aplicação. Confira se plano de recuperação de falhas permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. De cem contas fictícias, oitenta completam perfil, cinquenta integram dados e trinta geram primeiro relatório utilizável. Resolução: A ativação definida pelo relatório é 30%, não 80%; investigar a passagem de integração para resultado. O erro a evitar é: Declarar oitenta clientes ativados porque preencheram o perfil. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Vinte integrações falham por erro do próprio produto. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.sba.gov/business-guide/manage-your-business",
      "https://docs.stripe.com/billing/subscriptions/analytics"
    ],
    "region": "north-america"
  },
  {
    "id": "na-gestao-de-capacidade-de-suporte-por-complexidade",
    "title": "Gestão de capacidade de suporte por complexidade",
    "track": "business",
    "role": "Planejador de operações de suporte",
    "positioning": "specialist",
    "scenario": "Uma equipe fictícia recebe oitenta casos simples de cinco minutos e vinte complexos de trinta minutos.",
    "decision": "A carga é mil minutos, sendo seiscentos dos complexos; priorizar capacidade especializada apesar de serem apenas 20% dos casos.",
    "misconception": "Alocar apenas vinte por cento do tempo aos casos complexos.",
    "changedConstraint": "A taxa de reabertura dos casos simples sobe para 15%.",
    "tasks": [
      "Taxonomia de complexidade",
      "Modelo de carga",
      "Fila especializada",
      "Registro de reabertura",
      "Plano de cobertura",
      "Simulação de capacidade"
    ],
    "method": "Capacidade de suporte depende de chegada, complexidade, tempo de atendimento e retrabalho. Média global oculta filas especializadas. Registre resolução válida, reabertura e transferência; reduzir duração por encerramento prematuro pode piorar serviço. Planeje cobertura e escalonamento com dados sintéticos e sem prometer nível contratual irreal. Transforme o objetivo de negócio em uma definição mensurável com unidade, prazo, população e responsabilidade. Diferencie indicador operacional, resultado financeiro e hipótese de comportamento. Um número agregado pode ocultar segmentos com necessidades ou custos muito diferentes. Registre premissas, compare ao menos uma alternativa e teste uma mudança que possa alterar a escolha. Use valores fictícios e não apresente a simulação como previsão de receita ou orientação contábil, jurídica ou de investimento. Quando a decisão depender de contrato ou norma local, indique a validação especializada necessária. A entrega deve sustentar o que a organização pode prometer e mostrar claramente a incerteza. No caso deste curso, use taxonomia de complexidade para explicitar a regra e registro de reabertura para demonstrar sua aplicação. Confira se simulação de capacidade permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma equipe fictícia recebe oitenta casos simples de cinco minutos e vinte complexos de trinta minutos. Resolução: A carga é mil minutos, sendo seiscentos dos complexos; priorizar capacidade especializada apesar de serem apenas 20% dos casos. O erro a evitar é: Alocar apenas vinte por cento do tempo aos casos complexos. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A taxa de reabertura dos casos simples sobe para 15%. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.sba.gov/business-guide/manage-your-business",
      "https://docs.stripe.com/billing/subscriptions/analytics"
    ],
    "region": "north-america"
  },
  {
    "id": "na-controle-de-evidencias-em-prestacao-de-contas-de-projetos",
    "title": "Controle de evidências em prestação de contas de projetos",
    "track": "business",
    "role": "Analista de governança de projetos financiados",
    "positioning": "specialist",
    "scenario": "Um projeto fictício tem despesa de cinco mil paga, mas só três mil possuem entregas e documentos vinculados ao escopo aprovado.",
    "decision": "Registrar dois mil com evidência pendente e solicitar validação competente; não afirmar elegibilidade apenas pelo extrato bancário.",
    "misconception": "Considerar todo pagamento como execução comprovada.",
    "changedConstraint": "O financiador aprova mudança de escopo com vigência a partir de data específica.",
    "tasks": [
      "Matriz objetivo despesa",
      "Índice de documentos",
      "Controle de vigência",
      "Registro de entrega",
      "Fila de lacunas",
      "Memória de conferência"
    ],
    "method": "Prestação de contas precisa vincular objetivo, atividade, despesa, documento e critério aplicável. Pagamento não prova entrega nem elegibilidade. Regras dependem do instrumento contratual e da jurisdição; o curso ensina organização e conferência, sem substituir assessoria contábil ou jurídica. Preserve versões e conflitos de interesse declarados. Transforme o objetivo de negócio em uma definição mensurável com unidade, prazo, população e responsabilidade. Diferencie indicador operacional, resultado financeiro e hipótese de comportamento. Um número agregado pode ocultar segmentos com necessidades ou custos muito diferentes. Registre premissas, compare ao menos uma alternativa e teste uma mudança que possa alterar a escolha. Use valores fictícios e não apresente a simulação como previsão de receita ou orientação contábil, jurídica ou de investimento. Quando a decisão depender de contrato ou norma local, indique a validação especializada necessária. A entrega deve sustentar o que a organização pode prometer e mostrar claramente a incerteza. No caso deste curso, use matriz objetivo despesa para explicitar a regra e registro de entrega para demonstrar sua aplicação. Confira se memória de conferência permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um projeto fictício tem despesa de cinco mil paga, mas só três mil possuem entregas e documentos vinculados ao escopo aprovado. Resolução: Registrar dois mil com evidência pendente e solicitar validação competente; não afirmar elegibilidade apenas pelo extrato bancário. O erro a evitar é: Considerar todo pagamento como execução comprovada. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O financiador aprova mudança de escopo com vigência a partir de data específica. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.sba.gov/business-guide/manage-your-business",
      "https://docs.stripe.com/billing/subscriptions/analytics"
    ],
    "region": "north-america"
  },
  {
    "id": "na-comparacao-de-propostas-por-custo-total-de-contratacao",
    "title": "Comparação de propostas por custo total de contratação",
    "track": "business",
    "role": "Analista de contratação de serviços digitais",
    "positioning": "specialist",
    "scenario": "A proposta fictícia A cobra dez mil de implantação e mil por mês; B cobra dois mil por mês sem implantação, por doze meses.",
    "decision": "A custa 22 mil e B 24 mil antes de outros itens; verificar equivalência de escopo e custo de saída antes de decidir.",
    "misconception": "Escolher B só porque não exige implantação.",
    "changedConstraint": "A migração de dados de A exige serviço adicional de cinco mil.",
    "tasks": [
      "Matriz de escopo",
      "Modelo de custo total",
      "Registro de premissas",
      "Critérios qualitativos",
      "Cenário de migração",
      "Memorando de decisão"
    ],
    "method": "Compare propostas por mesmo escopo, período e unidade de serviço. Inclua implantação, suporte, migração, reajuste e saída, sem transformar estimativa em cotação garantida. Critérios qualitativos precisam evidência e peso explícito. Menor preço inicial pode aumentar dependência e custo futuro. Transforme o objetivo de negócio em uma definição mensurável com unidade, prazo, população e responsabilidade. Diferencie indicador operacional, resultado financeiro e hipótese de comportamento. Um número agregado pode ocultar segmentos com necessidades ou custos muito diferentes. Registre premissas, compare ao menos uma alternativa e teste uma mudança que possa alterar a escolha. Use valores fictícios e não apresente a simulação como previsão de receita ou orientação contábil, jurídica ou de investimento. Quando a decisão depender de contrato ou norma local, indique a validação especializada necessária. A entrega deve sustentar o que a organização pode prometer e mostrar claramente a incerteza. No caso deste curso, use matriz de escopo para explicitar a regra e critérios qualitativos para demonstrar sua aplicação. Confira se memorando de decisão permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. A proposta fictícia A cobra dez mil de implantação e mil por mês; B cobra dois mil por mês sem implantação, por doze meses. Resolução: A custa 22 mil e B 24 mil antes de outros itens; verificar equivalência de escopo e custo de saída antes de decidir. O erro a evitar é: Escolher B só porque não exige implantação. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A migração de dados de A exige serviço adicional de cinco mil. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.sba.gov/business-guide/manage-your-business",
      "https://docs.stripe.com/billing/subscriptions/analytics"
    ],
    "region": "north-america"
  },
  {
    "id": "na-mapeamento-de-competencias-por-evidencia-de-tarefa",
    "title": "Mapeamento de competências por evidência de tarefa",
    "track": "business",
    "role": "Analista de inteligência de competências",
    "positioning": "specialist",
    "scenario": "Dois profissionais fictícios possuem o mesmo certificado; um conclui tarefa com revisão e outro executa de forma autônoma, ambos com resultado correto.",
    "decision": "Registrar níveis de autonomia diferentes e planejar prática adequada; o certificado sozinho não resolve a distinção.",
    "misconception": "Atribuir o mesmo domínio operacional somente pela credencial.",
    "changedConstraint": "A tarefa muda para um contexto com restrição de acessibilidade.",
    "tasks": [
      "Mapa de tarefas",
      "Rubrica de desempenho",
      "Registro de autonomia",
      "Amostras de evidência",
      "Plano de prática",
      "Teste de transferência de contexto"
    ],
    "method": "Competência deve ser demonstrada por tarefa observável em contexto e nível de autonomia definidos. Autoavaliação e certificado são indícios diferentes de desempenho. Construa rubrica com critérios e amostras; evite confundir acesso a oportunidade de praticar com capacidade. Use avaliação formativa sem decisões discriminatórias. Transforme o objetivo de negócio em uma definição mensurável com unidade, prazo, população e responsabilidade. Diferencie indicador operacional, resultado financeiro e hipótese de comportamento. Um número agregado pode ocultar segmentos com necessidades ou custos muito diferentes. Registre premissas, compare ao menos uma alternativa e teste uma mudança que possa alterar a escolha. Use valores fictícios e não apresente a simulação como previsão de receita ou orientação contábil, jurídica ou de investimento. Quando a decisão depender de contrato ou norma local, indique a validação especializada necessária. A entrega deve sustentar o que a organização pode prometer e mostrar claramente a incerteza. No caso deste curso, use mapa de tarefas para explicitar a regra e amostras de evidência para demonstrar sua aplicação. Confira se teste de transferência de contexto permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Dois profissionais fictícios possuem o mesmo certificado; um conclui tarefa com revisão e outro executa de forma autônoma, ambos com resultado correto. Resolução: Registrar níveis de autonomia diferentes e planejar prática adequada; o certificado sozinho não resolve a distinção. O erro a evitar é: Atribuir o mesmo domínio operacional somente pela credencial. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A tarefa muda para um contexto com restrição de acessibilidade. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.sba.gov/business-guide/manage-your-business",
      "https://docs.stripe.com/billing/subscriptions/analytics"
    ],
    "region": "north-america"
  },
  {
    "id": "na-analise-de-abandono-em-jornadas-de-inscricao-acessiveis",
    "title": "Análise de abandono em jornadas de inscrição acessíveis",
    "track": "business",
    "role": "Analista de operações de conversão acessível",
    "positioning": "specialist",
    "scenario": "Uma jornada fictícia tem duzentos inícios e cem conclusões; quarenta usuários recebem erro de validação não anunciado ao leitor de tela.",
    "decision": "Reportar conversão de 50% e tratar a barreira técnica como hipótese prioritária de perda, sem atribuir culpa aos usuários.",
    "misconception": "Concluir que metade não tem interesse e aumentar pressão comercial.",
    "changedConstraint": "O usuário alterna de celular para computador no meio da inscrição.",
    "tasks": [
      "Contrato de eventos",
      "Funil por estado",
      "Mapa de erros",
      "Teste assistivo",
      "Regra de continuidade entre dispositivos",
      "Plano de medição de correção"
    ],
    "method": "Abandono precisa ser distinguido de erro técnico, pausa e conclusão em outro canal. Instrumente eventos mínimos e consentimentos aplicáveis; não colete conteúdo sensível para medir funil. Compare segmentos com cautela e teste teclado, leitor de tela e recuperação de estado. Taxa agregada pode ocultar barreira de acessibilidade. Transforme o objetivo de negócio em uma definição mensurável com unidade, prazo, população e responsabilidade. Diferencie indicador operacional, resultado financeiro e hipótese de comportamento. Um número agregado pode ocultar segmentos com necessidades ou custos muito diferentes. Registre premissas, compare ao menos uma alternativa e teste uma mudança que possa alterar a escolha. Use valores fictícios e não apresente a simulação como previsão de receita ou orientação contábil, jurídica ou de investimento. Quando a decisão depender de contrato ou norma local, indique a validação especializada necessária. A entrega deve sustentar o que a organização pode prometer e mostrar claramente a incerteza. No caso deste curso, use contrato de eventos para explicitar a regra e teste assistivo para demonstrar sua aplicação. Confira se plano de medição de correção permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma jornada fictícia tem duzentos inícios e cem conclusões; quarenta usuários recebem erro de validação não anunciado ao leitor de tela. Resolução: Reportar conversão de 50% e tratar a barreira técnica como hipótese prioritária de perda, sem atribuir culpa aos usuários. O erro a evitar é: Concluir que metade não tem interesse e aumentar pressão comercial. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O usuário alterna de celular para computador no meio da inscrição. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.w3.org/WAI/tutorials/forms/",
      "https://www.sba.gov/business-guide/manage-your-business",
      "https://docs.stripe.com/billing/subscriptions/analytics"
    ],
    "region": "north-america"
  },
  {
    "id": "na-planejamento-de-expansao-por-prontidao-operacional-regional",
    "title": "Planejamento de expansão por prontidão operacional regional",
    "track": "business",
    "role": "Analista de operações de expansão internacional",
    "positioning": "specialist",
    "scenario": "Uma empresa fictícia recebe mil visitas de uma região, mas só oferece suporte em idioma compreendido por 30% dos contatos do piloto.",
    "decision": "Registrar lacuna de suporte e testar cobertura antes de investir em aquisição ampla; tráfego não comprova atendimento viável.",
    "misconception": "Abrir campanhas nacionais porque o número de visitas é alto.",
    "changedConstraint": "O meio de pagamento principal do piloto não está disponível para parte do público.",
    "tasks": [
      "Matriz de prontidão",
      "Mapa de idioma e suporte",
      "Registro de hipóteses",
      "Desenho de piloto",
      "Critérios de entrada",
      "Plano de contingência operacional"
    ],
    "method": "Expansão exige verificar idioma, suporte, meios de pagamento, capacidade e requisitos locais com especialistas. Um grande mercado potencial não prova prontidão de entrega. Defina critérios de entrada e piloto, distinguindo interesse medido de suposição. Analise dependências e limites de serviço antes de escalar aquisição. Transforme o objetivo de negócio em uma definição mensurável com unidade, prazo, população e responsabilidade. Diferencie indicador operacional, resultado financeiro e hipótese de comportamento. Um número agregado pode ocultar segmentos com necessidades ou custos muito diferentes. Registre premissas, compare ao menos uma alternativa e teste uma mudança que possa alterar a escolha. Use valores fictícios e não apresente a simulação como previsão de receita ou orientação contábil, jurídica ou de investimento. Quando a decisão depender de contrato ou norma local, indique a validação especializada necessária. A entrega deve sustentar o que a organização pode prometer e mostrar claramente a incerteza. No caso deste curso, use matriz de prontidão para explicitar a regra e desenho de piloto para demonstrar sua aplicação. Confira se plano de contingência operacional permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma empresa fictícia recebe mil visitas de uma região, mas só oferece suporte em idioma compreendido por 30% dos contatos do piloto. Resolução: Registrar lacuna de suporte e testar cobertura antes de investir em aquisição ampla; tráfego não comprova atendimento viável. O erro a evitar é: Abrir campanhas nacionais porque o número de visitas é alto. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O meio de pagamento principal do piloto não está disponível para parte do público. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.sba.gov/business-guide/manage-your-business",
      "https://docs.stripe.com/billing/subscriptions/analytics"
    ],
    "region": "north-america"
  },
  {
    "id": "na-descricao-de-audio-para-materiais-educacionais-visuais",
    "title": "Descrição de áudio para materiais educacionais visuais",
    "track": "content",
    "role": "Roteirista de audiodescrição educacional",
    "positioning": "specialist",
    "scenario": "Uma aula fictícia diz apenas como vemos aqui enquanto um gráfico mostra receita subir de cem para 150 e custo de oitenta para 140.",
    "decision": "Descrever as duas séries e o estreitamento da diferença de vinte para dez, sem afirmar melhora da margem pela alta da receita.",
    "misconception": "Dizer apenas que ambas as linhas sobem e omitir a relação relevante.",
    "changedConstraint": "O gráfico usa cores indistinguíveis em impressão monocromática.",
    "tasks": [
      "Mapa de informação visual",
      "Roteiro de audiodescrição",
      "Glossário de séries",
      "Teste de pausas",
      "Versão textual equivalente",
      "Registro de avaliação de compreensão"
    ],
    "method": "Audiodescrição comunica informação visual necessária à compreensão, sem narrar todo detalhe decorativo. Identifique objetivo pedagógico, espaços de fala e termos consistentes. Teste com usuário e preserve informação já acessível no áudio original. A descrição deve diferenciar observação de interpretação e evitar inferir emoção ou identidade sem evidência. Comece pela tarefa que o leitor ou aluno precisa compreender e concluir. Identifique informação essencial, conhecimento prévio e barreiras de formato antes de escolher apresentação. Uma peça visualmente sofisticada pode falhar se omite condição importante, impede navegação assistiva ou usa fonte sem evidência. Preserve versão, autoria, permissões e registro de revisão. Teste compreensão com pergunta ou tarefa observável, sem confundir impressão estética com aprendizagem. Use conteúdo sintético ou autorizado, descrevendo claramente os limites da avaliação. A entrega deve permitir revisão por outra pessoa e oferecer alternativa acessível para informação indispensável, em vez de exigir um único modo de percepção ou interação. No caso deste curso, use mapa de informação visual para explicitar a regra e teste de pausas para demonstrar sua aplicação. Confira se registro de avaliação de compreensão permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma aula fictícia diz apenas como vemos aqui enquanto um gráfico mostra receita subir de cem para 150 e custo de oitenta para 140. Resolução: Descrever as duas séries e o estreitamento da diferença de vinte para dez, sem afirmar melhora da margem pela alta da receita. O erro a evitar é: Dizer apenas que ambas as linhas sobem e omitir a relação relevante. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O gráfico usa cores indistinguíveis em impressão monocromática. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.w3.org/WAI/media/av/description/",
      "https://www.w3.org/WAI/tutorials/",
      "https://www.w3.org/WAI/media/av/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-controle-de-qualidade-de-transcricoes-com-termos-tecnicos",
    "title": "Controle de qualidade de transcrições com termos técnicos",
    "track": "content",
    "role": "Analista de qualidade de transcrição técnica",
    "positioning": "specialist",
    "scenario": "Uma transcrição fictícia troca quinze por cinquenta em instrução de planejamento; no restante de mil palavras há apenas mais dois erros.",
    "decision": "A taxa global baixa não autoriza aprovação; corrigir o número crítico pela fonte e registrar teste de números e unidades.",
    "misconception": "Liberar o texto por apresentar menos de um por cento de erros.",
    "changedConstraint": "O áudio apresenta dois falantes com sobreposição no trecho numérico.",
    "tasks": [
      "Glossário técnico",
      "Rubrica de erro crítico",
      "Alinhamento áudio texto",
      "Fila de dúvida auditiva",
      "Teste de números e negações",
      "Relatório de revisão"
    ],
    "method": "Transcrição precisa preservar termos, números, falantes e incerteza auditiva. Taxa de erro de palavras pode subestimar um erro crítico de unidade ou negação. Crie glossário e marque trechos não compreendidos em vez de completar por plausibilidade. Revise áudio e texto com amostra orientada por risco. Comece pela tarefa que o leitor ou aluno precisa compreender e concluir. Identifique informação essencial, conhecimento prévio e barreiras de formato antes de escolher apresentação. Uma peça visualmente sofisticada pode falhar se omite condição importante, impede navegação assistiva ou usa fonte sem evidência. Preserve versão, autoria, permissões e registro de revisão. Teste compreensão com pergunta ou tarefa observável, sem confundir impressão estética com aprendizagem. Use conteúdo sintético ou autorizado, descrevendo claramente os limites da avaliação. A entrega deve permitir revisão por outra pessoa e oferecer alternativa acessível para informação indispensável, em vez de exigir um único modo de percepção ou interação. No caso deste curso, use glossário técnico para explicitar a regra e fila de dúvida auditiva para demonstrar sua aplicação. Confira se relatório de revisão permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma transcrição fictícia troca quinze por cinquenta em instrução de planejamento; no restante de mil palavras há apenas mais dois erros. Resolução: A taxa global baixa não autoriza aprovação; corrigir o número crítico pela fonte e registrar teste de números e unidades. O erro a evitar é: Liberar o texto por apresentar menos de um por cento de erros. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O áudio apresenta dois falantes com sobreposição no trecho numérico. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.w3.org/WAI/media/av/transcripts/",
      "https://www.w3.org/WAI/tutorials/",
      "https://www.w3.org/WAI/media/av/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-arquitetura-de-conteudo-para-documentacao-baseada-em-tarefas",
    "title": "Arquitetura de conteúdo para documentação baseada em tarefas",
    "track": "content",
    "role": "Arquiteto de documentação de produto",
    "positioning": "specialist",
    "scenario": "Uma documentação fictícia descreve dez botões, mas não explica a ordem para importar, validar e publicar um conjunto de dados.",
    "decision": "Criar fluxo com pré-requisitos e validação antes de publicação, mantendo referência dos botões separada.",
    "misconception": "Adicionar capturas de todos os botões e chamar isso de tutorial completo.",
    "changedConstraint": "A importação passa a aceitar arquivo parcialmente válido.",
    "tasks": [
      "Mapa de tarefas",
      "Roteiro de pré-requisitos",
      "Tutorial verificável",
      "Referência separada",
      "Fluxo de recuperação",
      "Registro de teste com leitor"
    ],
    "method": "Documentação por tarefa organiza pré-requisitos, passos, resultado esperado e recuperação de erro. Diferencie tutorial, referência e explicação conceitual. Uma lista completa de funções não substitui orientação para concluir um objetivo. Teste com usuário que não participou da autoria e registre pontos de inferência obrigatória. Comece pela tarefa que o leitor ou aluno precisa compreender e concluir. Identifique informação essencial, conhecimento prévio e barreiras de formato antes de escolher apresentação. Uma peça visualmente sofisticada pode falhar se omite condição importante, impede navegação assistiva ou usa fonte sem evidência. Preserve versão, autoria, permissões e registro de revisão. Teste compreensão com pergunta ou tarefa observável, sem confundir impressão estética com aprendizagem. Use conteúdo sintético ou autorizado, descrevendo claramente os limites da avaliação. A entrega deve permitir revisão por outra pessoa e oferecer alternativa acessível para informação indispensável, em vez de exigir um único modo de percepção ou interação. No caso deste curso, use mapa de tarefas para explicitar a regra e referência separada para demonstrar sua aplicação. Confira se registro de teste com leitor permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma documentação fictícia descreve dez botões, mas não explica a ordem para importar, validar e publicar um conjunto de dados. Resolução: Criar fluxo com pré-requisitos e validação antes de publicação, mantendo referência dos botões separada. O erro a evitar é: Adicionar capturas de todos os botões e chamar isso de tutorial completo. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A importação passa a aceitar arquivo parcialmente válido. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://diataxis.fr/",
      "https://www.w3.org/WAI/tutorials/",
      "https://www.w3.org/WAI/media/av/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-gestao-de-direitos-de-uso-em-acervos-de-midia",
    "title": "Gestão de direitos de uso em acervos de mídia",
    "track": "content",
    "role": "Analista de operações de direitos de mídia",
    "positioning": "specialist",
    "scenario": "Um acervo fictício tem foto licenciada para uso editorial por doze meses, enquanto a campanha proposta é comercial e dura dois anos.",
    "decision": "Sinalizar incompatibilidade de finalidade e prazo e obter autorização adequada antes de uso; não reutilizar a licença editorial.",
    "misconception": "Publicar porque a imagem foi adquirida de um banco de mídia.",
    "changedConstraint": "A campanha passa a incluir materiais de parceiros externos.",
    "tasks": [
      "Inventário de ativos",
      "Matriz de licenças",
      "Registro de finalidade",
      "Calendário de expiração",
      "Fila de autorização",
      "Controle de distribuição a parceiros"
    ],
    "method": "Direitos de mídia dependem de titularidade, licença, finalidade, território, prazo e restrições. Disponibilidade pública não significa livre reutilização. Registre evidência e versão da autorização; encaminhe dúvidas legais a responsável qualificado. Separe direitos da obra, imagem e música quando aplicável, sem presumir cobertura automática. Comece pela tarefa que o leitor ou aluno precisa compreender e concluir. Identifique informação essencial, conhecimento prévio e barreiras de formato antes de escolher apresentação. Uma peça visualmente sofisticada pode falhar se omite condição importante, impede navegação assistiva ou usa fonte sem evidência. Preserve versão, autoria, permissões e registro de revisão. Teste compreensão com pergunta ou tarefa observável, sem confundir impressão estética com aprendizagem. Use conteúdo sintético ou autorizado, descrevendo claramente os limites da avaliação. A entrega deve permitir revisão por outra pessoa e oferecer alternativa acessível para informação indispensável, em vez de exigir um único modo de percepção ou interação. No caso deste curso, use inventário de ativos para explicitar a regra e calendário de expiração para demonstrar sua aplicação. Confira se controle de distribuição a parceiros permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um acervo fictício tem foto licenciada para uso editorial por doze meses, enquanto a campanha proposta é comercial e dura dois anos. Resolução: Sinalizar incompatibilidade de finalidade e prazo e obter autorização adequada antes de uso; não reutilizar a licença editorial. O erro a evitar é: Publicar porque a imagem foi adquirida de um banco de mídia. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: A campanha passa a incluir materiais de parceiros externos. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.w3.org/WAI/tutorials/",
      "https://www.w3.org/WAI/media/av/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-preparacao-de-dados-para-arquivos-audiovisuais-pesquisaveis",
    "title": "Preparação de dados para arquivos audiovisuais pesquisáveis",
    "track": "content",
    "role": "Analista de metadados audiovisuais",
    "positioning": "specialist",
    "scenario": "Um acervo fictício tem vídeo de sessenta minutos e legendas que começam dois minutos após a introdução removida de uma versão derivada.",
    "decision": "Registrar offset e vincular cada legenda à edição correta; não aplicar os mesmos timecodes ao mestre e à derivada.",
    "misconception": "Copiar as legendas para todas as versões porque o conteúdo principal é igual.",
    "changedConstraint": "Uma nova edição remove três intervalos no meio do vídeo.",
    "tasks": [
      "Esquema de metadados",
      "Mapa mestre derivadas",
      "Tabela de timecodes",
      "Registro de offsets",
      "Teste de busca por trecho",
      "Controle de versão editorial"
    ],
    "method": "Acervo audiovisual pesquisável precisa metadados de identidade, tempo, idioma, versão e direitos. Transcrição e descrição enriquecem busca, mas não devem alterar o original. Use timecodes consistentes e relacione derivadas ao arquivo mestre. Um resultado de busca deve permitir voltar ao trecho e à fonte correta. Comece pela tarefa que o leitor ou aluno precisa compreender e concluir. Identifique informação essencial, conhecimento prévio e barreiras de formato antes de escolher apresentação. Uma peça visualmente sofisticada pode falhar se omite condição importante, impede navegação assistiva ou usa fonte sem evidência. Preserve versão, autoria, permissões e registro de revisão. Teste compreensão com pergunta ou tarefa observável, sem confundir impressão estética com aprendizagem. Use conteúdo sintético ou autorizado, descrevendo claramente os limites da avaliação. A entrega deve permitir revisão por outra pessoa e oferecer alternativa acessível para informação indispensável, em vez de exigir um único modo de percepção ou interação. No caso deste curso, use esquema de metadados para explicitar a regra e registro de offsets para demonstrar sua aplicação. Confira se controle de versão editorial permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um acervo fictício tem vídeo de sessenta minutos e legendas que começam dois minutos após a introdução removida de uma versão derivada. Resolução: Registrar offset e vincular cada legenda à edição correta; não aplicar os mesmos timecodes ao mestre e à derivada. O erro a evitar é: Copiar as legendas para todas as versões porque o conteúdo principal é igual. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma nova edição remove três intervalos no meio do vídeo. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.w3.org/WAI/tutorials/",
      "https://www.w3.org/WAI/media/av/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-design-de-avaliacoes-praticas-com-rubricas-analiticas",
    "title": "Design de avaliações práticas com rubricas analíticas",
    "track": "content",
    "role": "Designer de avaliação aplicada",
    "positioning": "specialist",
    "scenario": "Uma avaliação fictícia atribui nota máxima a relatório longo, embora ele use denominador errado e não teste a conclusão.",
    "decision": "Revisar a rubrica para exigir cálculo reproduzível e teste, e reavaliar o relatório segundo evidência, não tamanho.",
    "misconception": "Manter a nota porque o documento tem muitas páginas e linguagem formal.",
    "changedConstraint": "O aluno entrega solução em planilha acessível em vez de texto.",
    "tasks": [
      "Mapa de competência",
      "Rubrica analítica",
      "Exemplos de fronteira",
      "Critérios de cálculo",
      "Roteiro de feedback",
      "Registro de equivalência de formato"
    ],
    "method": "Rubrica analítica separa critérios de qualidade, níveis e evidências observáveis. Extensão do texto e aparência não demonstram competência. Calibre com exemplos de fronteira e registre limites da avaliação automática. Um projeto deve permitir solução alternativa defensável e feedback específico para revisão, sem prometer validação profissional externa. Comece pela tarefa que o leitor ou aluno precisa compreender e concluir. Identifique informação essencial, conhecimento prévio e barreiras de formato antes de escolher apresentação. Uma peça visualmente sofisticada pode falhar se omite condição importante, impede navegação assistiva ou usa fonte sem evidência. Preserve versão, autoria, permissões e registro de revisão. Teste compreensão com pergunta ou tarefa observável, sem confundir impressão estética com aprendizagem. Use conteúdo sintético ou autorizado, descrevendo claramente os limites da avaliação. A entrega deve permitir revisão por outra pessoa e oferecer alternativa acessível para informação indispensável, em vez de exigir um único modo de percepção ou interação. No caso deste curso, use mapa de competência para explicitar a regra e critérios de cálculo para demonstrar sua aplicação. Confira se registro de equivalência de formato permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma avaliação fictícia atribui nota máxima a relatório longo, embora ele use denominador errado e não teste a conclusão. Resolução: Revisar a rubrica para exigir cálculo reproduzível e teste, e reavaliar o relatório segundo evidência, não tamanho. O erro a evitar é: Manter a nota porque o documento tem muitas páginas e linguagem formal. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O aluno entrega solução em planilha acessível em vez de texto. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://ies.ed.gov/ncee/wwc/PracticeGuide/1",
      "https://www.w3.org/WAI/tutorials/",
      "https://www.w3.org/WAI/media/av/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-edicao-de-visualizacoes-para-leitura-em-dispositivos-moveis",
    "title": "Edição de visualizações para leitura em dispositivos móveis",
    "track": "content",
    "role": "Editor de visualização acessível",
    "positioning": "specialist",
    "scenario": "Um gráfico fictício de dez séries fica ilegível a 360 pixels; três séries respondem à pergunta principal e sete são contexto.",
    "decision": "Destacar as três com rótulos diretos e oferecer seleção ou tabela para as demais, preservando acesso ao conjunto completo.",
    "misconception": "Remover os eixos para ganhar espaço e manter todas as dez linhas sobrepostas.",
    "changedConstraint": "O usuário aumenta a fonte do sistema para duzentos por cento.",
    "tasks": [
      "Briefing de pergunta visual",
      "Protótipo móvel",
      "Tabela equivalente",
      "Teste de rótulos",
      "Teste de ampliação",
      "Registro de preservação de dados"
    ],
    "method": "Visualização móvel exige hierarquia, rótulos legíveis e preservação do significado. Reduzir um gráfico desktop pode ocultar escala e comparação. Escolha agregação conforme pergunta, mantenha denominador e ofereça tabela acessível. Teste largura real e contraste sem depender de cor para distinguir séries. Comece pela tarefa que o leitor ou aluno precisa compreender e concluir. Identifique informação essencial, conhecimento prévio e barreiras de formato antes de escolher apresentação. Uma peça visualmente sofisticada pode falhar se omite condição importante, impede navegação assistiva ou usa fonte sem evidência. Preserve versão, autoria, permissões e registro de revisão. Teste compreensão com pergunta ou tarefa observável, sem confundir impressão estética com aprendizagem. Use conteúdo sintético ou autorizado, descrevendo claramente os limites da avaliação. A entrega deve permitir revisão por outra pessoa e oferecer alternativa acessível para informação indispensável, em vez de exigir um único modo de percepção ou interação. No caso deste curso, use briefing de pergunta visual para explicitar a regra e teste de rótulos para demonstrar sua aplicação. Confira se registro de preservação de dados permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um gráfico fictício de dez séries fica ilegível a 360 pixels; três séries respondem à pergunta principal e sete são contexto. Resolução: Destacar as três com rótulos diretos e oferecer seleção ou tabela para as demais, preservando acesso ao conjunto completo. O erro a evitar é: Remover os eixos para ganhar espaço e manter todas as dez linhas sobrepostas. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O usuário aumenta a fonte do sistema para duzentos por cento. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.w3.org/WAI/tutorials/images/complex/",
      "https://www.w3.org/WAI/tutorials/",
      "https://www.w3.org/WAI/media/av/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-planejamento-editorial-de-aprendizagem-por-recuperacao",
    "title": "Planejamento editorial de aprendizagem por recuperação",
    "track": "content",
    "role": "Designer de prática e retenção",
    "positioning": "specialist",
    "scenario": "Um curso fictício mostra solução antes de cada pergunta; noventa por cento acertam logo depois, mas só quarenta por cento uma semana depois.",
    "decision": "Inserir tentativa sem solução prévia e revisão espaçada, avaliando retenção em tarefa nova; o acerto imediato não prova aprendizagem duradoura.",
    "misconception": "Declarar domínio de noventa por cento e remover as revisões.",
    "changedConstraint": "O aluno retorna após intervalo de um mês.",
    "tasks": [
      "Mapa de objetivos",
      "Sequência de recuperação",
      "Calendário de revisão",
      "Feedback por erro",
      "Tarefa de transferência",
      "Relatório de retenção"
    ],
    "method": "Prática de recuperação pede lembrar e aplicar antes de rever a resposta. Distribua revisões no tempo e varie contexto, com feedback que explica o erro. Reconhecimento de alternativa familiar não equivale a domínio. Combine perguntas abertas e tarefas, evitando exposição repetida da mesma resposta como único treino. Comece pela tarefa que o leitor ou aluno precisa compreender e concluir. Identifique informação essencial, conhecimento prévio e barreiras de formato antes de escolher apresentação. Uma peça visualmente sofisticada pode falhar se omite condição importante, impede navegação assistiva ou usa fonte sem evidência. Preserve versão, autoria, permissões e registro de revisão. Teste compreensão com pergunta ou tarefa observável, sem confundir impressão estética com aprendizagem. Use conteúdo sintético ou autorizado, descrevendo claramente os limites da avaliação. A entrega deve permitir revisão por outra pessoa e oferecer alternativa acessível para informação indispensável, em vez de exigir um único modo de percepção ou interação. No caso deste curso, use mapa de objetivos para explicitar a regra e feedback por erro para demonstrar sua aplicação. Confira se relatório de retenção permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um curso fictício mostra solução antes de cada pergunta; noventa por cento acertam logo depois, mas só quarenta por cento uma semana depois. Resolução: Inserir tentativa sem solução prévia e revisão espaçada, avaliando retenção em tarefa nova; o acerto imediato não prova aprendizagem duradoura. O erro a evitar é: Declarar domínio de noventa por cento e remover as revisões. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O aluno retorna após intervalo de um mês. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://ies.ed.gov/ncee/wwc/PracticeGuide/1",
      "https://www.w3.org/WAI/tutorials/",
      "https://www.w3.org/WAI/media/av/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-governanca-de-conteudos-gerados-por-ia-em-publicacoes",
    "title": "Governança de conteúdos gerados por IA em publicações",
    "track": "content",
    "role": "Analista de governança editorial de IA",
    "positioning": "specialist",
    "scenario": "Um artigo fictício contém dez afirmações factuais; oito têm fonte primária e duas citam relatórios inexistentes sugeridos por um modelo.",
    "decision": "Remover ou corrigir as duas afirmações e revisar referências; cobertura factual documentada é oito de dez antes da correção.",
    "misconception": "Publicar as duas porque os títulos dos relatórios parecem plausíveis.",
    "changedConstraint": "Uma fonte oficial corrige dado depois da publicação.",
    "tasks": [
      "Livro de afirmações",
      "Registro de fontes",
      "Rubrica de revisão factual",
      "Controle de proveniência",
      "Fluxo de correção pública",
      "Histórico de responsabilidade editorial"
    ],
    "method": "Conteúdo assistido por IA precisa proveniência, revisão factual, direitos e responsabilidade editorial. Fluência não substitui fonte. Separe afirmação verificável, interpretação e criação; registre o que foi checado e o que continua incerto. Não invente citação, especialista ou instituição para dar autoridade. Comece pela tarefa que o leitor ou aluno precisa compreender e concluir. Identifique informação essencial, conhecimento prévio e barreiras de formato antes de escolher apresentação. Uma peça visualmente sofisticada pode falhar se omite condição importante, impede navegação assistiva ou usa fonte sem evidência. Preserve versão, autoria, permissões e registro de revisão. Teste compreensão com pergunta ou tarefa observável, sem confundir impressão estética com aprendizagem. Use conteúdo sintético ou autorizado, descrevendo claramente os limites da avaliação. A entrega deve permitir revisão por outra pessoa e oferecer alternativa acessível para informação indispensável, em vez de exigir um único modo de percepção ou interação. No caso deste curso, use livro de afirmações para explicitar a regra e controle de proveniência para demonstrar sua aplicação. Confira se histórico de responsabilidade editorial permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Um artigo fictício contém dez afirmações factuais; oito têm fonte primária e duas citam relatórios inexistentes sugeridos por um modelo. Resolução: Remover ou corrigir as duas afirmações e revisar referências; cobertura factual documentada é oito de dez antes da correção. O erro a evitar é: Publicar as duas porque os títulos dos relatórios parecem plausíveis. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: Uma fonte oficial corrige dado depois da publicação. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.w3.org/WAI/tutorials/",
      "https://www.w3.org/WAI/media/av/"
    ],
    "region": "north-america"
  },
  {
    "id": "na-localizacao-de-interfaces-com-expansao-e-plurais",
    "title": "Localização de interfaces com expansão e plurais",
    "track": "content",
    "role": "Analista de engenharia de localização",
    "positioning": "specialist",
    "scenario": "Uma interface fictícia monta a frase por concatenação de número e tarefa concluída, gerando 2 tarefa concluída e quebrando em alemão.",
    "decision": "Usar mensagem completa com plural e placeholders nomeados, testando zero, um, dois e valores longos.",
    "misconception": "Traduzir cada fragmento isoladamente e reduzir a fonte para caber.",
    "changedConstraint": "O idioma novo exige ordem diferente para quantidade e substantivo.",
    "tasks": [
      "Inventário de mensagens",
      "Contrato de placeholders",
      "Tabela de plurais",
      "Pseudolocalização",
      "Teste assistivo",
      "Registro de expansão e truncamento"
    ],
    "method": "Localização de interface precisa contexto, variável, plural e limite funcional, não troca literal de palavras. Teste expansão, ordem de elementos, formatos e tecnologias assistivas. Não concatene fragmentos que impedem gramática correta. Preservar a ação e o estado é mais importante que manter o mesmo comprimento visual. Comece pela tarefa que o leitor ou aluno precisa compreender e concluir. Identifique informação essencial, conhecimento prévio e barreiras de formato antes de escolher apresentação. Uma peça visualmente sofisticada pode falhar se omite condição importante, impede navegação assistiva ou usa fonte sem evidência. Preserve versão, autoria, permissões e registro de revisão. Teste compreensão com pergunta ou tarefa observável, sem confundir impressão estética com aprendizagem. Use conteúdo sintético ou autorizado, descrevendo claramente os limites da avaliação. A entrega deve permitir revisão por outra pessoa e oferecer alternativa acessível para informação indispensável, em vez de exigir um único modo de percepção ou interação. No caso deste curso, use inventário de mensagens para explicitar a regra e pseudolocalização para demonstrar sua aplicação. Confira se registro de expansão e truncamento permite localizar o teste, a revisão e o limite da conclusão.",
    "workedExample": "Exemplo resolvido com dados fictícios. Uma interface fictícia monta a frase por concatenação de número e tarefa concluída, gerando 2 tarefa concluída e quebrando em alemão. Resolução: Usar mensagem completa com plural e placeholders nomeados, testando zero, um, dois e valores longos. O erro a evitar é: Traduzir cada fragmento isoladamente e reduzir a fonte para caber. A diferença entre as duas decisões está no uso das condições e evidências fornecidas, e não na aparência do relatório. Registre a entrada, a regra aplicada e o resultado em linhas separadas. Para conferir a transferência, altere a seguinte condição: O idioma novo exige ordem diferente para quantidade e substantivo. Recalcule ou reavalie somente o que essa alteração afeta; se faltar um dado necessário, marque a decisão como pendente em vez de inventá-lo.",
    "sources": [
      "https://www.w3.org/International/articles/composite-messages/",
      "https://www.w3.org/WAI/tutorials/",
      "https://www.w3.org/WAI/media/av/"
    ],
    "region": "north-america"
  }
];

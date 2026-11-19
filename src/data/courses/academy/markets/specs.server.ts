import 'server-only';
import type { MarketCourseSpec } from './types';

/** Original fictional occupational cases; protected decisions never enter the public listing. */
export const marketSpecs = [
  {
    "id": "agentes-atendimento-b2b",
    "track": "ai",
    "title": "Agentes de IA para Suporte B2B com Escalonamento",
    "role": "Analista de operações de suporte com IA",
    "positioning": "broad",
    "scenario": "Uma empresa simula 60 tickets: 40 dúvidas documentadas, dez pedidos de alteração e dez sem informação suficiente. O agente só pode responder dúvidas; alterações exigem aprovação.",
    "decision": "Separar resposta, proposta de alteração e abstenção; testar as três classes.",
    "misconception": "Autorizar alterações para melhorar a taxa de resolução.",
    "changedConstraint": "O documento de preços muda durante o piloto.",
    "tasks": [
      "Contrato de intenções e permissões",
      "Rubrica para três classes de ticket",
      "Inventário de artigos e versões",
      "Máquina de estados do escalonamento",
      "Custo por ticket corretamente resolvido",
      "Plano de regressão após mudança de preço"
    ]
  },
  {
    "id": "curadoria-datasets-ia",
    "track": "ai",
    "title": "Curadoria de Datasets para Treinamento e Avaliação de IA",
    "role": "Curador de dados para IA",
    "positioning": "broad",
    "scenario": "Um conjunto de 120 exemplos contém 20 duplicatas e rótulos conflitantes em dez pares. Separar treino e teste ao acaso por linha pode colocar o mesmo conteúdo nos dois lados.",
    "decision": "Deduplicar por conteúdo e agrupar versões antes de separar os conjuntos.",
    "misconception": "Separar linhas primeiro e tratar a duplicação como melhoria de cobertura.",
    "changedConstraint": "Um fornecedor entrega exemplos sem licença de reutilização.",
    "tasks": [
      "Contrato de esquema e rótulos",
      "Rubrica de desacordo entre anotadores",
      "Registro de licença e proveniência",
      "Fluxo de adjudicação",
      "Relatório de vazamento entre conjuntos",
      "Plano de revisão por versão"
    ]
  },
  {
    "id": "operacoes-anotacao-multimodal",
    "track": "ai",
    "title": "Operações de Anotação Multimodal e Controle de Qualidade",
    "role": "Coordenador de anotação multimodal",
    "positioning": "specialist",
    "scenario": "Um lote contém 80 imagens e 40 áudios. Dois anotadores discordam em 18 itens; oito são ambíguos pelo próprio guia. A concordância bruta não identifica qual anotador está correto.",
    "decision": "Adjudicar ambiguidades e revisar o guia antes de medir desempenho individual.",
    "misconception": "Punir o anotador que discordou da maioria sem revisão.",
    "changedConstraint": "O próximo lote inclui sotaques ausentes do piloto.",
    "tasks": [
      "Taxonomia de imagens e áudio",
      "Guia com casos de fronteira",
      "Mapa de permissões de mídia",
      "Fluxo de adjudicação",
      "Amostra estratificada de qualidade",
      "Revisão do guia para novo sotaque"
    ]
  },
  {
    "id": "red-team-ia-defensivo",
    "track": "ai",
    "title": "Red Team Defensivo para Assistentes de IA",
    "role": "Analista de avaliação adversarial de IA",
    "positioning": "specialist",
    "scenario": "Um assistente consulta 30 documentos fictícios. Três contêm instruções embutidas para divulgar um marcador secreto de teste. O laboratório é isolado e não tem contas reais.",
    "decision": "Tratar instruções recuperadas como dados e verificar se o marcador permanece protegido.",
    "misconception": "Avaliar apenas a qualidade das respostas benignas.",
    "changedConstraint": "O ataque passa de texto visível para metadados do documento.",
    "tasks": [
      "Modelo de ameaça do assistente",
      "Matriz de testes adversariais autorizados",
      "Mapa de fronteiras do corpus",
      "Protocolo de execução isolada",
      "Indicadores de vazamento e abstenção",
      "Relatório de regressão defensiva"
    ]
  },
  {
    "id": "operacoes-voz-ia",
    "track": "ai",
    "title": "Qualidade e Operações de Assistentes de Voz",
    "role": "Analista de qualidade de voz com IA",
    "positioning": "specialist",
    "scenario": "Em 50 diálogos fictícios, dez contêm ruído e cinco têm correção de um número pelo usuário. Transcrição correta não garante execução correta de uma solicitação.",
    "decision": "Testar a confirmação do número final e separar reconhecimento de execução.",
    "misconception": "Usar apenas acurácia média de transcrição como aceite.",
    "changedConstraint": "O usuário interrompe a confirmação com uma nova solicitação.",
    "tasks": [
      "Contrato de turnos e confirmações",
      "Rubrica de reconhecimento e intenção",
      "Registro de consentimento simulado",
      "Estados de interrupção e retomada",
      "Latência de ponta a ponta",
      "Teste de regressão por condição acústica"
    ]
  },
  {
    "id": "avaliacao-traducao-ia",
    "track": "ai",
    "title": "Avaliação de Tradução Automática em Produtos Internacionais",
    "role": "Avaliador de tradução com IA",
    "positioning": "broad",
    "scenario": "Uma amostra de 40 instruções contém oito prazos, seis negações e quatro valores monetários. A versão mais fluente troca duas obrigações por sugestões.",
    "decision": "Aplicar falha crítica à mudança de obrigação mesmo com boa fluência.",
    "misconception": "Escolher a versão mais natural pelo estilo.",
    "changedConstraint": "Uma nova região usa outra convenção de data.",
    "tasks": [
      "Contrato de significado e tom",
      "Rubrica de erros críticos",
      "Glossário e registro de fontes",
      "Fluxo de revisão e aprovação",
      "Taxa de erro por categoria",
      "Regressão de datas e unidades"
    ]
  },
  {
    "id": "operacoes-sinteticos",
    "track": "ai",
    "title": "Dados Sintéticos: Utilidade, Privacidade e Validação",
    "role": "Analista de dados sintéticos",
    "positioning": "specialist",
    "scenario": "Uma base sintética de 200 linhas replica exatamente três registros fictícios de origem e melhora a média enquanto elimina um grupo raro de dez casos.",
    "decision": "Avaliar memorização e cobertura de grupos separadamente da semelhança média.",
    "misconception": "Declarar anonimização garantida por ser sintético.",
    "changedConstraint": "A base será usada para testar uma regra sobre o grupo raro.",
    "tasks": [
      "Contrato de uso da base",
      "Rubrica de utilidade e cobertura",
      "Inventário de origem e retenção",
      "Fluxo de geração e aprovação",
      "Testes de reprodução e grupos raros",
      "Relatório de limites de privacidade"
    ]
  },
  {
    "id": "compras-solucoes-ia",
    "track": "ai",
    "title": "Aquisição e Due Diligence de Soluções com IA",
    "role": "Analista de compras de soluções de IA",
    "positioning": "specialist",
    "scenario": "Dois fornecedores oferecem resumos. A custa 100 por mil tentativas com 80% de sucesso; B custa 90 com 60%. Não há evidência sobre exportação de dados ou reversibilidade.",
    "decision": "Comparar custo por sucesso e resolver os requisitos de dados antes da escolha.",
    "misconception": "Escolher B pelo preço nominal menor.",
    "changedConstraint": "O fornecedor anuncia mudança de modelo sem aviso prévio.",
    "tasks": [
      "Requisitos eliminatórios da compra",
      "Benchmark comparável de fornecedores",
      "Questionário de proveniência e dados",
      "Fluxo contratual de mudanças",
      "Modelo de custo por sucesso",
      "Plano de saída e portabilidade"
    ]
  },
  {
    "id": "operacoes-conhecimento-ia",
    "track": "ai",
    "title": "Arquitetura Operacional de Bases de Conhecimento para IA",
    "role": "Gestor de conhecimento para IA",
    "positioning": "broad",
    "scenario": "Uma base tem 90 artigos, 15 vencidos e dez restritos a uma equipe. Melhorar a busca sem controlar validade e acesso pode aumentar respostas incorretas.",
    "decision": "Filtrar autorização e validade antes da recuperação e registrar versões.",
    "misconception": "Indexar tudo para maximizar a cobertura.",
    "changedConstraint": "Dois departamentos publicam orientações conflitantes.",
    "tasks": [
      "Contrato de uso do conhecimento",
      "Conjunto de perguntas sem resposta",
      "Inventário de artigos e responsáveis",
      "Fluxo de revisão e publicação",
      "Cobertura e qualidade por assunto",
      "Plano de resolução de conflitos"
    ]
  },
  {
    "id": "ia-documentos-comerciais",
    "track": "ai",
    "title": "IA para Extração e Conferência de Documentos Comerciais",
    "role": "Analista de processamento documental com IA",
    "positioning": "broad",
    "scenario": "De 60 faturas fictícias, dez têm duas moedas e cinco repetem o número em emissores distintos. O total de itens nem sempre inclui tributos.",
    "decision": "Usar chave composta e reconciliar campos com regras explícitas de moeda e total.",
    "misconception": "Deduplicar somente pelo número da fatura.",
    "changedConstraint": "O novo modelo de fatura altera a posição dos tributos.",
    "tasks": [
      "Esquema de campos e chaves",
      "Rubrica de extração por campo",
      "Registro de modelos e versões",
      "Fila de exceções documentais",
      "Custo por documento conferido",
      "Regressão após novo layout"
    ]
  },
  {
    "id": "triagem-soc",
    "track": "cyber",
    "title": "Triagem SOC e Análise de Alertas de Segurança",
    "role": "Analista SOC em formação complementar",
    "positioning": "broad",
    "scenario": "Um exercício reúne 200 eventos de login, 20 alertas e três incidentes conhecidos. Dois alertas referem-se ao mesmo incidente; um incidente não gerou alerta.",
    "decision": "Deduplicar incidentes e medir cobertura e precisão com denominadores distintos.",
    "misconception": "Contar cada alerta como incidente independente.",
    "changedConstraint": "Uma fonte passa a registrar horário local sem fuso.",
    "tasks": [
      "Inventário de ativos monitorados",
      "Linha do tempo normalizada",
      "Regra de correlação testável",
      "Relatório de triagem",
      "Plano de cobertura de logs",
      "Handoff de turno"
    ]
  },
  {
    "id": "engenharia-deteccao",
    "track": "cyber",
    "title": "Engenharia de Detecção e Validação de Regras",
    "role": "Analista de engenharia de detecção",
    "positioning": "broad",
    "scenario": "Uma regra detecta 12 de 15 incidentes de laboratório e gera 48 alertas benignos. O próximo ajuste remove um padrão usado por dois incidentes conhecidos.",
    "decision": "Reexecutar positivos e negativos antes de aceitar redução de ruído.",
    "misconception": "Aceitar o ajuste porque reduz alertas totais.",
    "changedConstraint": "O formato do campo de usuário muda.",
    "tasks": [
      "Modelo de ameaça da regra",
      "Contrato dos campos de log",
      "Corpus positivo e negativo",
      "Protocolo de teste da detecção",
      "Métrica de cobertura e esforço",
      "Changelog e reversão"
    ]
  },
  {
    "id": "seguranca-saas",
    "track": "cyber",
    "title": "Segurança Operacional de Aplicações SaaS",
    "role": "Analista de segurança SaaS",
    "positioning": "broad",
    "scenario": "Uma organização fictícia usa 12 aplicativos e 40 integrações. Cinco contas administrativas não têm proprietário atual e três integrações leem todos os arquivos.",
    "decision": "Revalidar proprietários e reduzir permissões conforme necessidade documentada.",
    "misconception": "Manter integrações antigas porque nunca houve incidente.",
    "changedConstraint": "Uma aquisição adiciona outro domínio de identidade.",
    "tasks": [
      "Mapa de aplicativos e identidades",
      "Inventário de logs de auditoria",
      "Regras de acesso anômalo",
      "Plano de contenção de integração",
      "Teste de recuperação administrativa",
      "Revisão periódica de acessos"
    ]
  },
  {
    "id": "identidades-maquina",
    "track": "cyber",
    "title": "Segurança de Identidades de Máquina e Segredos",
    "role": "Analista de identidades não humanas",
    "positioning": "specialist",
    "scenario": "Uma API usa o mesmo segredo em desenvolvimento e produção. O segredo aparece em um log sintético; o processo de rotação pode interromper três integrações.",
    "decision": "Preservar evidência, revogar a exposição e coordenar rotação com validação das dependências.",
    "misconception": "Apagar a linha de log e manter o segredo.",
    "changedConstraint": "Uma integração só aceita uma chave ativa por vez.",
    "tasks": [
      "Mapa de contas de serviço",
      "Inventário de exposição de segredos",
      "Detecção de uso fora do padrão",
      "Runbook de rotação coordenada",
      "Teste de continuidade sem segredo antigo",
      "Handoff e responsabilidade por chave"
    ]
  },
  {
    "id": "seguranca-cadeia-software",
    "track": "cyber",
    "title": "Segurança da Cadeia de Suprimentos de Software",
    "role": "Analista de segurança de dependências",
    "positioning": "broad",
    "scenario": "Um pacote transitivo tem vulnerabilidade, mas apenas um dos quatro serviços usa a função afetada. O inventário não registra versões implantadas.",
    "decision": "Verificar exposição e versões reais antes de priorizar e documentar mitigação.",
    "misconception": "Classificar todos os serviços como igualmente comprometidos.",
    "changedConstraint": "O mantenedor publica uma atualização incompatível.",
    "tasks": [
      "Mapa de componentes e confiança",
      "Inventário de versões implantadas",
      "Regra de exposição por serviço",
      "Plano de atualização e exceção",
      "Teste de integridade do artefato",
      "Revisão de dependências críticas"
    ]
  },
  {
    "id": "analise-fraude-digital",
    "track": "cyber",
    "title": "Análise Operacional de Fraude Digital",
    "role": "Analista de prevenção a fraude",
    "positioning": "broad",
    "scenario": "Uma regra sinaliza 100 contas, dez confirmadas em revisão. Bloquear automaticamente pode prejudicar usuários legítimos; os dados não demonstram todos os casos perdidos.",
    "decision": "Separar alerta, revisão e bloqueio e acompanhar falsos positivos.",
    "misconception": "Chamar as 100 contas de fraudulentas.",
    "changedConstraint": "Um novo país apresenta padrão de acesso diferente.",
    "tasks": [
      "Mapa de ativos e abuso",
      "Eventos de conta normalizados",
      "Regra de sinalização por risco",
      "Fluxo de revisão e recurso",
      "Teste de recuperação de conta legítima",
      "Relatório de viés operacional"
    ]
  },
  {
    "id": "forense-logs-cloud",
    "track": "cyber",
    "title": "Análise Forense de Logs em Ambientes Cloud",
    "role": "Analista de evidências digitais de cloud",
    "positioning": "specialist",
    "scenario": "Uma chave temporária acessa três recursos em oito minutos. Um deles não registra leitura de objeto; ausência desse evento não prova que nada ocorreu.",
    "decision": "Preservar fontes e declarar explicitamente a lacuna de cobertura.",
    "misconception": "Concluir ausência de acesso pela falta de log.",
    "changedConstraint": "O período de retenção de uma fonte termina em 24 horas.",
    "tasks": [
      "Mapa de fontes e retenção",
      "Cronologia com fusos",
      "Hipóteses e consultas de correlação",
      "Registro de coleta e integridade",
      "Plano de preservação prioritária",
      "Relatório factual e limites"
    ]
  },
  {
    "id": "seguranca-ot-planejamento",
    "track": "cyber",
    "title": "Segurança OT: Inventário e Planejamento de Proteções",
    "role": "Analista de planejamento de segurança OT",
    "positioning": "specialist",
    "scenario": "Uma rede industrial fictícia contém um controlador legado que não pode ser atualizado durante produção. Uma varredura ativa pode afetar disponibilidade.",
    "decision": "Planejar inventário passivo e controles compensatórios com o responsável operacional.",
    "misconception": "Executar varredura agressiva para completar o inventário.",
    "changedConstraint": "O integrador solicita acesso remoto permanente.",
    "tasks": [
      "Mapa de zonas e dependências",
      "Inventário passivo simulado",
      "Detecções compatíveis com disponibilidade",
      "Fluxo de acesso remoto temporário",
      "Exercício documental de recuperação",
      "Plano de exceções revisáveis"
    ]
  },
  {
    "id": "risco-terceiros-cyber",
    "track": "cyber",
    "title": "Risco Cibernético de Fornecedores e Terceiros",
    "role": "Analista de risco de terceiros",
    "positioning": "specialist",
    "scenario": "Um fornecedor crítico apresenta certificado, mas não há evidência sobre restauração do serviço contratado nem sobre subcontratados que acessam dados.",
    "decision": "Verificar escopo das evidências e dependências específicas do serviço.",
    "misconception": "Aceitar qualquer certificado como cobertura integral.",
    "changedConstraint": "O fornecedor altera o subcontratado principal.",
    "tasks": [
      "Inventário de terceiros e criticidade",
      "Mapa de evidências por serviço",
      "Regras de sinais de deterioração",
      "Plano de escalonamento contratual",
      "Teste de continuidade por cenário",
      "Revisão de subcontratados"
    ]
  },
  {
    "id": "recuperacao-ransomware-planejamento",
    "track": "cyber",
    "title": "Planejamento de Recuperação após Ransomware",
    "role": "Coordenador de exercícios de recuperação",
    "positioning": "specialist",
    "scenario": "Um exercício simula perda de arquivos e identidade. Backups existem, mas a conta que restaura depende do serviço indisponível.",
    "decision": "Testar recuperação isolada incluindo identidade e chaves antes de afirmar prontidão.",
    "misconception": "Considerar a existência do backup como recuperação garantida.",
    "changedConstraint": "A cópia mais recente contém alteração não identificada.",
    "tasks": [
      "Mapa de serviços essenciais",
      "Inventário de registros de recuperação",
      "Sinais de integridade comprometida",
      "Runbook de exercício isolado",
      "Teste de restauração e reconciliação",
      "Relatório de lições e pendências"
    ]
  },
  {
    "id": "analytics-engineering-operacional",
    "track": "data",
    "title": "Analytics Engineering: Contratos e Transformações de Dados",
    "role": "Analista de transformações analíticas",
    "positioning": "broad",
    "scenario": "Pedidos têm duas linhas e três pagamentos cada. Uma junção direta multiplica valores e o painel parece crescer sem novas vendas.",
    "decision": "Agregar ao grão correto e reconciliar antes de publicar métricas.",
    "misconception": "Tratar o aumento por junção como crescimento real.",
    "changedConstraint": "Uma fonte passa a enviar correções retroativas.",
    "tasks": [
      "Definição de grão e população",
      "Dicionário de chaves e unidades",
      "Tabela de métricas reconciliadas",
      "Plano de comparação entre versões",
      "Transformação reproduzível",
      "Memorando de mudança de métrica"
    ]
  },
  {
    "id": "data-stewardship",
    "track": "data",
    "title": "Data Stewardship e Catálogos de Dados",
    "role": "Data steward em formação aplicada",
    "positioning": "broad",
    "scenario": "Três equipes usam cliente ativo com definições distintas. Uma considera login, outra pagamento e outra contrato vigente.",
    "decision": "Catalogar as três definições e seus usos antes de propor uma regra comum.",
    "misconception": "Sobrescrever todas com a definição mais usada.",
    "changedConstraint": "Uma fusão exige consolidar históricos.",
    "tasks": [
      "Mapa de decisões e consumidores",
      "Dicionário e proprietários",
      "Comparação das três populações",
      "Análise de impacto da mudança",
      "Catálogo versionado",
      "Plano de migração e comunicação"
    ]
  },
  {
    "id": "observabilidade-dados",
    "track": "data",
    "title": "Observabilidade de Dados e Gestão de Incidentes Analíticos",
    "role": "Analista de confiabilidade de dados",
    "positioning": "broad",
    "scenario": "Uma carga diária chega completa em número de linhas, mas metade dos valores monetários veio em centavos em vez de unidades.",
    "decision": "Testar unidades e distribuições além da contagem de linhas.",
    "misconception": "Aprovar porque o total de registros coincide.",
    "changedConstraint": "O esquema permanece igual, mas muda a regra de negócio.",
    "tasks": [
      "Contrato de dados críticos",
      "Testes de qualidade e unidade",
      "Painel de distribuição e segmentos",
      "Hipóteses para origem do desvio",
      "Reprodução do incidente",
      "Memorando de correção e reprocessamento"
    ]
  },
  {
    "id": "privacidade-analytics",
    "track": "data",
    "title": "Analytics com Minimização e Dados Agregados",
    "role": "Analista de analytics responsável",
    "positioning": "specialist",
    "scenario": "Uma tabela agregada por cidade e profissão possui grupos de uma pessoa. Remover nomes não impede inferência individual.",
    "decision": "Avaliar granularidade e risco de reidentificação antes de compartilhar.",
    "misconception": "Declarar anonimização porque os nomes foram removidos.",
    "changedConstraint": "Uma segunda tabela permite cruzar os grupos.",
    "tasks": [
      "Finalidade e população mínima",
      "Inventário de campos necessários",
      "Análise de grupos pequenos",
      "Teste de combinação de tabelas",
      "Agregação reproduzível",
      "Relatório de limites de compartilhamento"
    ]
  },
  {
    "id": "pesquisa-operacional-servicos",
    "track": "data",
    "title": "Pesquisa Operacional para Alocação de Serviços",
    "role": "Analista de planejamento quantitativo",
    "positioning": "broad",
    "scenario": "Duas equipes têm 20 e 30 horas disponíveis. As tarefas exigem competências diferentes; somar 50 horas ignora elegibilidade.",
    "decision": "Modelar restrições por competência e testar factibilidade antes de otimizar custo.",
    "misconception": "Distribuir tarefas apenas pela capacidade total.",
    "changedConstraint": "Uma pessoa fica indisponível no turno mais carregado.",
    "tasks": [
      "Modelo de decisão e variáveis",
      "Tabela de capacidade e elegibilidade",
      "Indicadores de utilização",
      "Cenários de indisponibilidade",
      "Solução reproduzível em planilha",
      "Memorando de compromisso entre custo e serviço"
    ]
  },
  {
    "id": "metrologia-digital",
    "track": "data",
    "title": "Metrologia de Dados e Incerteza de Medição",
    "role": "Analista de qualidade de medição",
    "positioning": "specialist",
    "scenario": "Dois sensores diferem em dois graus; um arredonda ao grau e outro ao décimo. Não há referência calibrada no conjunto.",
    "decision": "Investigar resolução e referência antes de atribuir o desvio ao processo.",
    "misconception": "Declarar o sensor mais preciso como necessariamente exato.",
    "changedConstraint": "A temperatura ambiente varia entre medições.",
    "tasks": [
      "Definição do mensurando",
      "Dicionário de unidade e resolução",
      "Distribuição de diferenças",
      "Plano de comparação controlada",
      "Planilha de incertezas declaradas",
      "Relatório de limites de inferência"
    ]
  },
  {
    "id": "people-analytics-responsavel",
    "track": "data",
    "title": "People Analytics: Capacidade, Equidade e Evidência",
    "role": "Analista de people analytics",
    "positioning": "broad",
    "scenario": "Uma equipe tem maior rotatividade, mas também mais contratos temporários. Comparar taxas brutas confunde composição com possível efeito de gestão.",
    "decision": "Estratificar por vínculo e período e limitar a conclusão ao desenho.",
    "misconception": "Atribuir toda diferença à liderança.",
    "changedConstraint": "Uma política muda no mesmo mês da medição.",
    "tasks": [
      "Pergunta e população de trabalho",
      "Dicionário de vínculos e saídas",
      "Taxas com denominadores",
      "Análise de composição e incerteza",
      "Relatório reproduzível agregado",
      "Recomendação condicional e privacidade"
    ]
  },
  {
    "id": "pesquisa-bibliometrica",
    "track": "data",
    "title": "Bibliometria e Mapeamento de Conhecimento Científico",
    "role": "Analista de inteligência científica",
    "positioning": "specialist",
    "scenario": "Duas áreas têm médias de citações distintas e janelas de publicação diferentes. Um autor usa duas grafias do nome.",
    "decision": "Normalizar identidade e comparar campos e janelas compatíveis.",
    "misconception": "Ordenar qualidade científica só por citações brutas.",
    "changedConstraint": "A base de indexação amplia cobertura de um país.",
    "tasks": [
      "Pergunta e corpus científico",
      "Dicionário de autores e versões",
      "Distribuição de citações por campo",
      "Análise de viés de cobertura",
      "Mapa reproduzível de temas",
      "Memorando de limites bibliométricos"
    ]
  },
  {
    "id": "analise-esportiva-operacional",
    "track": "data",
    "title": "Análise de Desempenho Esportivo com Dados",
    "role": "Analista de dados esportivos em formação complementar",
    "positioning": "specialist",
    "scenario": "Um atleta soma dez ações em 20 minutos e outro 12 em 90. Não há controle de posição nem de contexto de jogo.",
    "decision": "Comparar exposição e contexto sem inferir superioridade só pelas contagens.",
    "misconception": "Escolher o segundo atleta por ter mais ações.",
    "changedConstraint": "O formato da competição altera a duração das partidas.",
    "tasks": [
      "Pergunta e unidade de desempenho",
      "Dicionário de eventos e minutos",
      "Taxas por exposição e posição",
      "Análise de contexto e incerteza",
      "Relatório reproduzível de partidas",
      "Memorando sem conclusões clínicas"
    ]
  },
  {
    "id": "inteligencia-patentes",
    "track": "data",
    "title": "Inteligência de Patentes e Paisagens Tecnológicas",
    "role": "Analista de informação tecnológica",
    "positioning": "specialist",
    "scenario": "Uma busca retorna 120 documentos, incluindo publicações da mesma família em três países. Contar documentos como invenções infla o resultado.",
    "decision": "Agrupar famílias e registrar cobertura e limites da estratégia de busca.",
    "misconception": "Contar cada publicação como tecnologia independente.",
    "changedConstraint": "Uma mudança de classificação recupera novos documentos.",
    "tasks": [
      "Pergunta e estratégia de busca",
      "Dicionário de famílias e datas",
      "Mapa de temas e depositantes",
      "Teste de sensibilidade da busca",
      "Base deduplicada reproduzível",
      "Relatório informacional sem parecer jurídico"
    ]
  },
  {
    "id": "planejamento-solar-comercial",
    "track": "energy",
    "title": "Análise de Viabilidade Operacional de Energia Solar",
    "role": "Analista de planejamento solar",
    "positioning": "broad",
    "scenario": "Um prédio consome 100 unidades diárias, 70 à noite; a geração proposta de 100 ocorre durante o dia e não existe bateria.",
    "decision": "Modelar importação e exportação por horário em vez de assumir compensação física perfeita.",
    "misconception": "Concluir autossuficiência pelo total diário igual.",
    "changedConstraint": "A política de remuneração do excedente muda.",
    "tasks": [
      "Fronteira de consumo e geração",
      "Perfil horário de autoconsumo",
      "Cenários de perdas solares",
      "Modelo de custo total",
      "Plano documental de manutenção",
      "Indicadores de piloto e sazonalidade"
    ]
  },
  {
    "id": "operacoes-eolicas-planejamento",
    "track": "energy",
    "title": "Planejamento de Operações e Manutenção Eólica",
    "role": "Analista de planejamento de ativos eólicos",
    "positioning": "specialist",
    "scenario": "Uma turbina fictícia tem 95% de disponibilidade de tempo, mas as paradas coincidem com o período de maior vento.",
    "decision": "Separar disponibilidade temporal de perda de produção e modelar o recurso por período.",
    "misconception": "Converter 95% de tempo diretamente em 95% de energia anual.",
    "changedConstraint": "Uma peça crítica passa a ter prazo de 60 dias.",
    "tasks": [
      "Fronteira e indicadores do ativo",
      "Série temporal de recurso e parada",
      "Cenários de eficiência e perda",
      "Custo de indisponibilidade",
      "Plano de dependências e peças",
      "Relatório de revisão da estratégia"
    ]
  },
  {
    "id": "planejamento-baterias",
    "track": "energy",
    "title": "Baterias Estacionárias: Planejamento e Análise de Uso",
    "role": "Analista de operações de armazenamento",
    "positioning": "broad",
    "scenario": "Uma bateria tem 100 kWh nominais, limite operacional de 80% e entrega 90% da energia utilizada. A demanda pede 75 kWh.",
    "decision": "Calcular 72 kWh úteis no cenário e reconhecer o déficit de três.",
    "misconception": "Usar os 100 kWh nominais como energia disponível garantida.",
    "changedConstraint": "A demanda de pico aumenta sem elevar o consumo diário.",
    "tasks": [
      "Unidade funcional de armazenamento",
      "Perfil de carga e descarga",
      "Planilha de eficiência e limites",
      "Custo por energia útil",
      "Plano documental de segurança e reposição",
      "Monitoramento de capacidade útil"
    ]
  },
  {
    "id": "recarga-veiculos-eletricos",
    "track": "energy",
    "title": "Operações e Capacidade de Redes de Recarga Elétrica",
    "role": "Planejador de operações de recarga",
    "positioning": "broad",
    "scenario": "Dez veículos precisam de 20 kWh em duas horas. A capacidade disponível do local é 80 kW, sem outras perdas.",
    "decision": "Reconhecer demanda média de 100 kW e planejar escalonamento ou outra janela.",
    "misconception": "Afirmar viabilidade porque existem dez conectores.",
    "changedConstraint": "Metade dos veículos passa a chegar uma hora mais tarde.",
    "tasks": [
      "Balanço de energia da frota",
      "Agenda de sessões e simultaneidade",
      "Cenários de perdas e ocupação",
      "Modelo de custo e capacidade",
      "Plano de indisponibilidade de pontos",
      "Indicadores de fila e energia entregue"
    ]
  },
  {
    "id": "bombas-calor-planejamento",
    "track": "energy",
    "title": "Bombas de Calor: Análise Operacional e Planejamento",
    "role": "Analista de eficiência térmica",
    "positioning": "specialist",
    "scenario": "Uma demanda térmica de 30 kWh é atendida com COP de três em uma condição e de dois em outra.",
    "decision": "Calcular dez e 15 kWh elétricos e manter explícita a condição de desempenho.",
    "misconception": "Usar COP três como constante para todo o ano.",
    "changedConstraint": "O perfil de ocupação muda no inverno.",
    "tasks": [
      "Fronteira térmica e elétrica",
      "Perfil de demanda por estação",
      "Cenários de COP e perdas",
      "Custo de operação por cenário",
      "Plano de validação técnica externa",
      "Monitoramento de consumo normalizado"
    ]
  },
  {
    "id": "retrofit-energetico",
    "track": "energy",
    "title": "Planejamento de Retrofit Energético de Edifícios",
    "role": "Coordenador de projetos de eficiência",
    "positioning": "broad",
    "scenario": "Duas intervenções prometem reduzir 20% e 30% do mesmo consumo. A segunda atua sobre o saldo após a primeira.",
    "decision": "Modelar efeitos sequenciais e comparar com hipóteses de interação.",
    "misconception": "Somar e prometer redução de 50% automaticamente.",
    "changedConstraint": "O edifício muda a área ocupada após o retrofit.",
    "tasks": [
      "Fronteira e linha de base",
      "Perfil de consumo e ocupação",
      "Modelo de interação entre medidas",
      "Custo total do pacote",
      "Plano de validação e manutenção",
      "Indicadores antes e depois normalizados"
    ]
  },
  {
    "id": "operacoes-agua",
    "track": "energy",
    "title": "Eficiência Hídrica e Planejamento de Operações de Água",
    "role": "Analista de eficiência hídrica",
    "positioning": "specialist",
    "scenario": "Uma instalação recebe 100 m³, mede 70 no uso final e registra dez em descarga. Há 20 sem explicação e medidores com datas distintas.",
    "decision": "Reconciliar períodos e incerteza antes de classificar todo saldo como vazamento.",
    "misconception": "Declarar vazamento comprovado de 20 m³ sem verificar medição.",
    "changedConstraint": "Uma linha começa a reutilizar parte da água internamente.",
    "tasks": [
      "Fronteira de captação e uso",
      "Série temporal de entradas e saídas",
      "Cenários de medição e perdas",
      "Custo por serviço hídrico",
      "Plano de investigação e responsabilidades",
      "Painel de balanço reconciliado"
    ]
  },
  {
    "id": "passaporte-produto-circular",
    "track": "energy",
    "title": "Passaportes Digitais de Produto e Circularidade",
    "role": "Analista de informação para circularidade",
    "positioning": "specialist",
    "scenario": "Um produto mistura três materiais e possui fornecedores com declarações de datas diferentes. O passaporte não demonstra por si só reciclabilidade local.",
    "decision": "Separar dados de composição, origem e condições reais de recuperação.",
    "misconception": "Usar a existência do passaporte como prova de sustentabilidade.",
    "changedConstraint": "O fornecedor troca um material sem atualizar o cadastro.",
    "tasks": [
      "Unidade funcional e fronteira do produto",
      "Fluxo temporal de versões",
      "Cenários de recuperação de materiais",
      "Custo do ciclo de informação",
      "Plano de validação de declarações",
      "Monitoramento de atualização do passaporte"
    ]
  },
  {
    "id": "agroenergia-recursos",
    "track": "energy",
    "title": "Planejamento de Energia e Recursos em Operações Agrícolas",
    "role": "Analista de recursos em agrooperações",
    "positioning": "specialist",
    "scenario": "A irrigação demanda energia no período seco, enquanto a estimativa de geração usa média anual. A produção depende de janela específica.",
    "decision": "Comparar recurso e demanda por estação e janela operacional.",
    "misconception": "Dimensionar a decisão pela média anual isolada.",
    "changedConstraint": "Uma safra altera o calendário da irrigação.",
    "tasks": [
      "Fronteira de energia e água",
      "Calendário de demanda da operação",
      "Cenários de recurso e eficiência",
      "Custo por unidade de serviço",
      "Plano documental de contingência",
      "Painel de revisão sazonal"
    ]
  },
  {
    "id": "coordenacao-transicao-energetica",
    "track": "energy",
    "title": "Coordenação de Projetos de Transição Energética Local",
    "role": "Coordenador de projetos energéticos",
    "positioning": "specialist",
    "scenario": "Três projetos reduzem consumo, mas disputam a mesma janela de obra e uma aprovação ainda não foi obtida.",
    "decision": "Tratar aprovação e janela como restrições antes de ordenar retorno.",
    "misconception": "Somar benefícios e iniciar todos simultaneamente.",
    "changedConstraint": "Uma escola só permite intervenção nas férias.",
    "tasks": [
      "Fronteira de benefícios por projeto",
      "Calendário integrado de entregas",
      "Cenários de benefício sem dupla contagem",
      "Modelo de custo e prioridade",
      "Mapa de aprovações e responsáveis",
      "Plano de piloto e revisão pública"
    ]
  },
  {
    "id": "coordenacao-teleatendimento",
    "track": "care",
    "title": "Coordenação Administrativa de Teleatendimento em Saúde",
    "role": "Coordenador administrativo de saúde digital",
    "positioning": "broad",
    "scenario": "Uma clínica fictícia oferece 40 horários remotos e recebe 50 solicitações. Dez usuários precisam de apoio digital; não há protocolo clínico no exercício.",
    "decision": "Planejar capacidade e apoio de acesso sem classificar urgência clínica.",
    "misconception": "Priorizar gravidade por decisão do atendente administrativo.",
    "changedConstraint": "A conexão do prestador falha durante o turno.",
    "tasks": [
      "Mapa da jornada de agendamento",
      "Modelo de capacidade e apoio",
      "Dicionário de status da consulta",
      "Mensagens mínimas e acessíveis",
      "Piloto de redução de ausências",
      "Runbook de indisponibilidade"
    ]
  },
  {
    "id": "interoperabilidade-saude-operacoes",
    "track": "care",
    "title": "Interoperabilidade em Saúde: Mapeamento Administrativo de Dados",
    "role": "Analista de integração administrativa em saúde",
    "positioning": "broad",
    "scenario": "Dois sistemas usam concluído para estados diferentes: atendimento realizado e solicitação encerrada sem atendimento. Há 30 registros para migrar.",
    "decision": "Mapear significado e motivo do estado antes de converter os dados.",
    "misconception": "Unir todos os estados com o mesmo rótulo.",
    "changedConstraint": "Um sistema passa a registrar cancelamento separadamente.",
    "tasks": [
      "Mapa de estados e responsáveis",
      "Capacidade da fila de reconciliação",
      "Dicionário de correspondência semântica",
      "Matriz de acesso por campo",
      "Piloto com casos de fronteira",
      "Handoff de migração e reconciliação"
    ]
  },
  {
    "id": "qualidade-dados-saude",
    "track": "care",
    "title": "Qualidade de Dados Administrativos em Saúde",
    "role": "Data steward de serviços de saúde",
    "positioning": "broad",
    "scenario": "Uma lista de 100 agendamentos contém dez duplicatas e cinco identificadores ausentes. Remover nomes iguais pode unir pessoas distintas.",
    "decision": "Usar chaves e investigação de identidade sem deduplicar pelo nome.",
    "misconception": "Excluir todo nome repetido como duplicata.",
    "changedConstraint": "O mesmo usuário recebe um identificador novo na migração.",
    "tasks": [
      "Mapa de captura dos registros",
      "Fila de correção e capacidade",
      "Regras de identidade e qualidade",
      "Política de acesso mínimo",
      "Piloto de prevenção de duplicatas",
      "Relatório de reconciliação de migração"
    ]
  },
  {
    "id": "navegacao-servicos-saude",
    "track": "care",
    "title": "Navegação Administrativa de Serviços de Saúde",
    "role": "Navegador administrativo de serviços",
    "positioning": "specialist",
    "scenario": "Uma pessoa fictícia precisa localizar o setor correto e confirmar documentos. O atendimento não pode aconselhar tratamento nem garantir cobertura.",
    "decision": "Orientar o próximo passo administrativo e encaminhar questões clínicas ou contratuais ao responsável.",
    "misconception": "Prometer cobertura e tratamento para reduzir ansiedade.",
    "changedConstraint": "A pessoa precisa de alternativa ao canal digital.",
    "tasks": [
      "Mapa de caminhos administrativos",
      "Capacidade de encaminhamentos",
      "Dicionário de requisitos verificados",
      "Roteiro de comunicação acessível",
      "Piloto de completude documental",
      "Handoff com confirmação de recebimento"
    ]
  },
  {
    "id": "operacoes-longevidade",
    "track": "care",
    "title": "Operações de Serviços para Longevidade e Envelhecimento",
    "role": "Coordenador de serviços de apoio não clínico",
    "positioning": "broad",
    "scenario": "Um serviço não clínico organiza 20 visitas de apoio e possui 60 horas disponíveis. Cinco visitas exigem transporte adicional e acompanhamento especializado externo.",
    "decision": "Separar capacidade, deslocamento e encaminhamento para necessidades fora do escopo.",
    "misconception": "Tratar todas as visitas como iguais para caber na agenda.",
    "changedConstraint": "Um familiar altera o contato autorizado.",
    "tasks": [
      "Mapa de serviço e limites",
      "Modelo de agenda e deslocamento",
      "Registro mínimo de contatos",
      "Fluxo de autorização de comunicação",
      "Piloto de pontualidade e continuidade",
      "Plano de substituição de profissional"
    ]
  },
  {
    "id": "coordenacao-acessibilidade-saude",
    "track": "care",
    "title": "Acessibilidade Administrativa em Serviços de Saúde",
    "role": "Coordenador de acesso inclusivo em saúde",
    "positioning": "specialist",
    "scenario": "O novo canal reduz tempo médio, mas oito de 40 usuários fictícios não conseguem completar o formulário por barreiras de acesso.",
    "decision": "Manter alternativa acessível e medir conclusão por grupo de necessidade.",
    "misconception": "Excluir os oito do cálculo para avaliar apenas usuários digitais.",
    "changedConstraint": "O serviço atende pessoas que usam intérprete.",
    "tasks": [
      "Mapa de barreiras na jornada",
      "Capacidade de apoio alternativo",
      "Registro mínimo de necessidades de acesso",
      "Mensagens e canais acessíveis",
      "Piloto com medida de exclusão",
      "Handoff de apoio e consentimento"
    ]
  },
  {
    "id": "operacoes-pesquisa-clinica",
    "track": "care",
    "title": "Operações Documentais de Pesquisa Clínica",
    "role": "Assistente de operações documentais de pesquisa",
    "positioning": "specialist",
    "scenario": "Um estudo fictício possui 30 documentos e duas versões de formulário. Cinco registros não indicam qual versão estava vigente; não há participação de pacientes reais.",
    "decision": "Preservar a lacuna de versão e encaminhar a verificação ao responsável do estudo.",
    "misconception": "Preencher retroativamente a versão mais recente em todos.",
    "changedConstraint": "Uma emenda altera o calendário de documentos.",
    "tasks": [
      "Mapa documental e limites de atuação",
      "Fila de pendências por prazo",
      "Dicionário de versões e identificadores",
      "Matriz de acesso e confidencialidade",
      "Piloto de controle de documentos",
      "Handoff de emenda e reconciliação"
    ]
  },
  {
    "id": "operacoes-saude-ocupacional",
    "track": "care",
    "title": "Coordenação Administrativa de Saúde Ocupacional",
    "role": "Coordenador administrativo de saúde ocupacional",
    "positioning": "specialist",
    "scenario": "Uma empresa acompanha 80 convocações, mas o gestor de escala não precisa de resultados clínicos. Há dez pendências de contato.",
    "decision": "Compartilhar apenas status administrativo necessário e manter resultados restritos.",
    "misconception": "Enviar relatórios clínicos completos para facilitar a escala.",
    "changedConstraint": "O prestador muda e precisa de reconciliação dos status.",
    "tasks": [
      "Mapa de convocações e fronteiras",
      "Capacidade e calendário de pendências",
      "Dicionário de estados administrativos",
      "Matriz de acesso mínimo",
      "Piloto de completude de contato",
      "Plano de transição de prestador"
    ]
  },
  {
    "id": "analise-experiencia-paciente",
    "track": "care",
    "title": "Análise da Experiência Administrativa do Paciente",
    "role": "Analista de experiência de serviços de saúde",
    "positioning": "broad",
    "scenario": "Um questionário tem 20 respostas em 100 atendimentos e só é enviado a quem concluiu o canal digital. A média não representa todos os usuários.",
    "decision": "Relatar a seleção e testar formas acessíveis de coletar outras experiências.",
    "misconception": "Divulgar a média como satisfação de todos os pacientes.",
    "changedConstraint": "Uma mudança de canal altera a taxa de resposta.",
    "tasks": [
      "Mapa de pontos de contato",
      "Capacidade de coleta e retorno",
      "Dicionário de respostas e cobertura",
      "Plano de comunicação e privacidade",
      "Piloto com medida de representatividade",
      "Relatório de melhoria sem inferência clínica"
    ]
  },
  {
    "id": "continuidade-cuidados-administrativa",
    "track": "care",
    "title": "Continuidade Administrativa entre Serviços de Cuidado",
    "role": "Analista de coordenação administrativa de cuidado",
    "positioning": "specialist",
    "scenario": "De 25 encaminhamentos fictícios, 20 foram recebidos, três aguardam confirmação e dois têm documentos incompletos. Envio não significa atendimento realizado.",
    "decision": "Manter estados distintos e responsáveis até a confirmação apropriada.",
    "misconception": "Marcar os 25 como concluídos pela expedição.",
    "changedConstraint": "Um serviço receptor fica indisponível por uma semana.",
    "tasks": [
      "Mapa de handoffs entre serviços",
      "Modelo de fila e capacidade receptora",
      "Dicionário de estados de transferência",
      "Mensagens mínimas de acompanhamento",
      "Piloto de reconciliação de pendências",
      "Plano de continuidade com destinatário alternativo"
    ]
  },
  {
    "id": "bim-coordenacao-informacao",
    "track": "industry",
    "title": "BIM: Coordenação de Informação e Entregáveis",
    "role": "Coordenador de informação de construção",
    "positioning": "broad",
    "scenario": "Três disciplinas usam revisões diferentes de um mesmo elemento. O exercício avalia coordenação documental, sem dimensionamento estrutural.",
    "decision": "Comparar identificadores, revisões e requisitos antes de consolidar o modelo de informação.",
    "misconception": "Consolidar pela data mais recente do arquivo sem verificar conteúdo.",
    "changedConstraint": "Um requisito de entrega muda após a revisão.",
    "tasks": [
      "Matriz de requisitos de informação",
      "Registro de objetos e revisões",
      "Plano de capacidade de revisão",
      "Testes de consistência do modelo",
      "Fluxo de mudança e aprovação",
      "Pacote de entrega rastreável"
    ]
  },
  {
    "id": "planejamento-manutencao-industrial",
    "track": "industry",
    "title": "Planejamento e Controle de Manutenção Industrial",
    "role": "Planejador de manutenção",
    "positioning": "broad",
    "scenario": "Uma parada permite oito horas e três tarefas sequenciais exigem quatro, três e duas horas. A soma excede a janela antes de incluir testes.",
    "decision": "Replanejar dependências e tempo de retorno ao serviço antes de confirmar a parada.",
    "misconception": "Prometer conclusão em oito horas removendo o teste da agenda.",
    "changedConstraint": "Uma peça crítica chega com revisão diferente.",
    "tasks": [
      "Requisitos da intervenção simulada",
      "Hierarquia de ativos e peças",
      "Cronograma de capacidade e dependências",
      "Plano de medição de retorno",
      "Análise de risco e configuração",
      "Dossiê de entrega e pendências"
    ]
  },
  {
    "id": "qualidade-manufatura",
    "track": "industry",
    "title": "Qualidade de Processo e Inspeção Documental na Manufatura",
    "role": "Analista de qualidade industrial",
    "positioning": "broad",
    "scenario": "Uma amostra apresenta média dentro da especificação e duas peças fora do limite. A média não comprova conformidade individual.",
    "decision": "Registrar as duas não conformidades e investigar distribuição e medição.",
    "misconception": "Aprovar o lote pela média aceitável.",
    "changedConstraint": "O instrumento de medição é substituído.",
    "tasks": [
      "Requisitos e critérios de aceite",
      "Registro de produto e configuração",
      "Mapa de fluxo e retrabalho",
      "Plano de medição e amostragem",
      "Análise de falhas e ações",
      "Relatório de verificação rastreável"
    ]
  },
  {
    "id": "robotica-colaborativa-planejamento",
    "track": "industry",
    "title": "Robótica Colaborativa: Planejamento de Integração",
    "role": "Analista de projetos de integração robótica",
    "positioning": "specialist",
    "scenario": "Uma célula simulada precisa entregar oito peças por minuto, mas a alimentação manual suporta cinco. Nenhum equipamento real será operado.",
    "decision": "Modelar o gargalo e encaminhar avaliação de segurança antes de qualquer implantação.",
    "misconception": "Atribuir oito peças por minuto ao sistema pela capacidade nominal do robô.",
    "changedConstraint": "O mix de peças exige nova ferramenta.",
    "tasks": [
      "Matriz de requisitos da célula",
      "Registro de interfaces e versões",
      "Modelo de capacidade do fluxo",
      "Plano de medição de ciclo",
      "Análise documental de riscos",
      "Critérios de validação do sistema"
    ]
  },
  {
    "id": "manufatura-aditiva-operacoes",
    "track": "industry",
    "title": "Manufatura Aditiva: Operações, Rastreio e Qualidade",
    "role": "Coordenador de operações de manufatura aditiva",
    "positioning": "specialist",
    "scenario": "Duas peças usam o mesmo arquivo, mas materiais e parâmetros de processo diferentes. A geometria igual não comprova desempenho equivalente.",
    "decision": "Rastrear material, parâmetros e configuração como parte do resultado.",
    "misconception": "Aprovar equivalência apenas pelo arquivo geométrico igual.",
    "changedConstraint": "O fornecedor muda o lote de material.",
    "tasks": [
      "Requisitos de peça e uso",
      "Registro de arquivo material e parâmetros",
      "Plano de capacidade e lotes",
      "Plano documental de medição",
      "Controle de mudanças de material",
      "Pacote de verificação e limites"
    ]
  },
  {
    "id": "semicondutores-operacoes-qualidade",
    "track": "industry",
    "title": "Semicondutores: Rastreabilidade e Operações de Qualidade",
    "role": "Analista documental de operações de semicondutores",
    "positioning": "specialist",
    "scenario": "Um lote passa por três etapas e é dividido após a segunda. Um desvio de processo pode afetar somente parte dos descendentes.",
    "decision": "Manter genealogia e configuração por etapa para delimitar a investigação.",
    "misconception": "Tratar todos os lotes com o mesmo código comercial como idênticos.",
    "changedConstraint": "Um equipamento recebe nova revisão de receita.",
    "tasks": [
      "Requisitos de rastreabilidade por etapa",
      "Genealogia de lotes e receitas",
      "Modelo de capacidade e espera",
      "Plano de medição de rendimento",
      "Análise de desvio e mudança",
      "Relatório de rastreio e evidência"
    ]
  },
  {
    "id": "comissionamento-documental",
    "track": "industry",
    "title": "Comissionamento: Planejamento e Evidências de Aceitação",
    "role": "Coordenador documental de comissionamento",
    "positioning": "specialist",
    "scenario": "Quatro testes de componentes passaram, mas o teste integrado não foi realizado. O cliente precisa do sistema funcionando como conjunto.",
    "decision": "Manter a aceitação integrada pendente e planejar evidências de interface.",
    "misconception": "Encerrar o comissionamento pelos testes dos componentes.",
    "changedConstraint": "O cliente altera uma condição de uso prevista.",
    "tasks": [
      "Matriz de requisitos de aceitação",
      "Registro de configuração entregue",
      "Agenda de testes e recursos",
      "Plano de instrumentos e evidências",
      "Gestão de desvios e mudanças",
      "Dossiê de verificação e validação"
    ]
  },
  {
    "id": "confiabilidade-ativos",
    "track": "industry",
    "title": "Análise de Confiabilidade e Planejamento de Ativos",
    "role": "Analista de confiabilidade operacional",
    "positioning": "broad",
    "scenario": "Duas máquinas tiveram duas falhas cada, mas operaram 100 e mil horas. Comparar contagens ignora exposição e criticidade.",
    "decision": "Calcular indicadores por exposição e avaliar consequências antes de priorizar.",
    "misconception": "Classificar confiabilidade igual por ter o mesmo número de falhas.",
    "changedConstraint": "O perfil de uso muda para carga mais alta.",
    "tasks": [
      "Requisitos de disponibilidade e função",
      "Cadastro e histórico de ativos",
      "Modelo de capacidade e exposição",
      "Plano de coleta de falhas",
      "Análise de modos e consequências",
      "Memorando de decisão de manutenção"
    ]
  },
  {
    "id": "planejamento-obras-digital",
    "track": "industry",
    "title": "Planejamento Digital e Controle de Entregas de Obras",
    "role": "Analista de planejamento de obras",
    "positioning": "broad",
    "scenario": "Uma atividade começa apenas após duas aprovações. O cronograma mostra duração física, mas omite os prazos de análise e entrega de material.",
    "decision": "Incluir dependências e restrições verificadas antes de confirmar a data final.",
    "misconception": "Usar apenas a soma dos tempos de execução física.",
    "changedConstraint": "Um fornecedor só entrega em janela quinzenal.",
    "tasks": [
      "Requisitos e marcos de entrega",
      "Registro de documentos e revisões",
      "Rede de dependências e capacidade",
      "Plano de medição de avanço físico",
      "Registro de riscos e mudanças",
      "Pacote de aceite por marco"
    ]
  },
  {
    "id": "operacoes-drones-dados",
    "track": "industry",
    "title": "Operações Documentais de Missões e Dados de Drones",
    "role": "Coordenador documental de missões com drones",
    "positioning": "specialist",
    "scenario": "Uma missão simulada busca imagens de inspeção, mas faltam requisitos de resolução e confirmação de autorização local. Não haverá voo real.",
    "decision": "Definir qualidade da informação e verificar requisitos locais antes de planejar execução.",
    "misconception": "Presumir autorização porque o equipamento é pequeno.",
    "changedConstraint": "A condição de iluminação altera a utilidade das imagens.",
    "tasks": [
      "Requisitos de dados da missão",
      "Registro de equipamento e versões",
      "Agenda de capacidade e dependências",
      "Plano de qualidade das imagens",
      "Mapa de autorizações e riscos",
      "Dossiê de dados e limitações"
    ]
  },
  {
    "id": "cadeia-frio-operacoes",
    "track": "logistics",
    "title": "Cadeia Fria: Rastreabilidade e Gestão de Exceções",
    "role": "Analista de operações de cadeia fria",
    "positioning": "broad",
    "scenario": "Um lote foi dividido em três cargas. Um sensor registra excursão em uma delas; a média diária permanece dentro da faixa.",
    "decision": "Investigar a excursão e os descendentes afetados sem usar a média como liberação.",
    "misconception": "Liberar todas as cargas pela média aceitável.",
    "changedConstraint": "Uma das cargas perde o registro do sensor.",
    "tasks": [
      "Mapa de lotes e eventos de condição",
      "Balanço por estado de estoque",
      "Perfil de prazo e exposição",
      "Modelo de custo entregue",
      "Fluxo de quarentena e decisão autorizada",
      "Simulado de rastreio inverso"
    ]
  },
  {
    "id": "logistica-reversa-tecnologia",
    "track": "logistics",
    "title": "Logística Reversa de Equipamentos e Recuperação de Valor",
    "role": "Analista de logística reversa",
    "positioning": "broad",
    "scenario": "De 100 equipamentos retornados, 60 são reparáveis, 20 aguardam diagnóstico e 20 seguem descarte autorizado. Recebimento não significa disponibilidade para revenda.",
    "decision": "Separar estados e rastrear diagnóstico e destinação antes de contar estoque útil.",
    "misconception": "Registrar os 100 como prontos para venda.",
    "changedConstraint": "Um equipamento contém dados do antigo usuário.",
    "tasks": [
      "Identidade do equipamento e eventos",
      "Balanço por estado de recuperação",
      "Prazo de diagnóstico e retorno",
      "Custo por unidade recuperada",
      "Fluxo de dados e destinação autorizada",
      "Reconciliação de saídas e pendências"
    ]
  },
  {
    "id": "planejamento-armazens",
    "track": "logistics",
    "title": "Planejamento de Operações de Armazéns e Fulfillment",
    "role": "Analista de operações de armazém",
    "positioning": "broad",
    "scenario": "Um armazém processa 80 pedidos por turno e recebe 100. A mesma equipe precisa tratar devoluções, ausentes do modelo atual.",
    "decision": "Incluir devoluções e backlog na capacidade antes de prometer expedição.",
    "misconception": "Avaliar capacidade apenas pelos pedidos novos expedidos.",
    "changedConstraint": "O mix passa a ter mais pedidos com múltiplos itens.",
    "tasks": [
      "Mapa de eventos de separação",
      "Balanço de pedidos e estoque",
      "Perfil de chegada e prazo",
      "Modelo de capacidade e custo",
      "Tratamento de falta e avaria",
      "Simulado de fechamento de turno"
    ]
  },
  {
    "id": "planejamento-ultima-milha",
    "track": "logistics",
    "title": "Planejamento de Última Milha e Janelas de Entrega",
    "role": "Planejador de operações de entrega",
    "positioning": "broad",
    "scenario": "Dez entregas cabem na distância planejada, mas quatro têm a mesma janela de 30 minutos em locais distantes.",
    "decision": "Tratar janelas e capacidade como restrições antes de minimizar distância.",
    "misconception": "Aceitar a rota apenas porque a quilometragem é menor.",
    "changedConstraint": "Dois destinatários mudam o horário de recebimento.",
    "tasks": [
      "Mapa de pedidos e eventos de entrega",
      "Reconciliação de volumes por rota",
      "Modelo de janelas e calendário",
      "Custo por entrega confirmada",
      "Fluxo de ausência e reentrega",
      "Relatório de prometido versus realizado"
    ]
  },
  {
    "id": "operacoes-portuarias-documentais",
    "track": "logistics",
    "title": "Operações Portuárias: Documentos, Eventos e Handoffs",
    "role": "Analista documental de operações portuárias",
    "positioning": "specialist",
    "scenario": "Um contêiner possui eventos de chegada e descarga, mas falta confirmação de liberação por autoridade competente. Evento físico não equivale a autorização.",
    "decision": "Manter estados físicos e documentais separados e encaminhar a pendência.",
    "misconception": "Declarar disponibilidade pela descarga concluída.",
    "changedConstraint": "Um prazo documental vence antes da janela de retirada.",
    "tasks": [
      "Mapa de unidade e eventos portuários",
      "Balanço de estados por unidade",
      "Calendário de prazos e janelas",
      "Modelo de custo de permanência",
      "Fluxo de pendências autorizadas",
      "Reconciliação de entrega e retirada"
    ]
  },
  {
    "id": "rastreabilidade-alimentos",
    "track": "logistics",
    "title": "Rastreabilidade e Operações Documentais de Alimentos",
    "role": "Analista de rastreabilidade de alimentos",
    "positioning": "broad",
    "scenario": "Um ingrediente de lote A é misturado com B e distribuído em quatro lotes de produto. Uma ocorrência em A exige identificar todos os descendentes relevantes.",
    "decision": "Preservar a relação de transformação para delimitar os lotes afetados.",
    "misconception": "Buscar somente embalagens que ainda tenham o código A visível.",
    "changedConstraint": "Parte do produto é reprocessada em outro lote.",
    "tasks": [
      "Mapa de transformação de ingredientes",
      "Balanço de massa por lote",
      "Prazo e validade documental",
      "Custo por fluxo rastreado",
      "Plano de exceções e autoridade de decisão",
      "Simulado de rastreio de ingrediente"
    ]
  },
  {
    "id": "logistica-humanitaria-planejamento",
    "track": "logistics",
    "title": "Planejamento de Logística Humanitária e Distribuição",
    "role": "Analista de logística de apoio humanitário",
    "positioning": "specialist",
    "scenario": "Dois pontos recebem 100 kits cada, mas atendem 50 e 150 famílias. A distribuição igual não implica cobertura equivalente.",
    "decision": "Medir necessidade e cobertura por local com critérios transparentes.",
    "misconception": "Avaliar equidade apenas pelo volume igual enviado.",
    "changedConstraint": "Uma rota fica indisponível por dois dias.",
    "tasks": [
      "Mapa de kits e eventos de distribuição",
      "Balanço por local e condição",
      "Calendário de acesso e reposição",
      "Modelo de capacidade de distribuição",
      "Fluxo de falta e escalonamento",
      "Reconciliação de recebido e distribuído"
    ]
  },
  {
    "id": "embalagens-operacoes",
    "track": "logistics",
    "title": "Engenharia Operacional de Embalagens: Análise e Planejamento",
    "role": "Analista de operações de embalagens",
    "positioning": "specialist",
    "scenario": "Uma embalagem reduz frete em dez unidades monetárias, mas aumenta avaria esperada em 15. Os volumes úteis entregues também diferem.",
    "decision": "Comparar custo total por unidade útil e requisitos de proteção.",
    "misconception": "Escolher a embalagem pelo frete menor isolado.",
    "changedConstraint": "O canal de distribuição adiciona uma etapa de transbordo.",
    "tasks": [
      "Identificação de embalagem e conteúdo",
      "Balanço de unidades úteis",
      "Perfil de manuseio e prazo",
      "Modelo de custo e avaria",
      "Fluxo de falha e revisão técnica",
      "Simulado de rastreio de lote de embalagem"
    ]
  },
  {
    "id": "planejamento-transporte-multimodal",
    "track": "logistics",
    "title": "Planejamento de Transporte Multimodal e Interfaces",
    "role": "Analista de planejamento multimodal",
    "positioning": "specialist",
    "scenario": "Dois trechos levam três dias cada, mas a conexão parte semanalmente. A soma de seis dias pode omitir até seis dias de espera.",
    "decision": "Modelar a conexão e o calendário junto aos tempos de trânsito.",
    "misconception": "Prometer seis dias pela soma dos dois trechos.",
    "changedConstraint": "Uma mudança documental impede o transbordo previsto.",
    "tasks": [
      "Mapa de carga e eventos por modal",
      "Reconciliação de unidades e documentos",
      "Calendário de conexão e margem",
      "Custo total de trânsito e espera",
      "Fluxo de conexão perdida",
      "Relatório de rastreio de ponta a ponta"
    ]
  },
  {
    "id": "operacoes-pecas-criticas",
    "track": "logistics",
    "title": "Planejamento de Estoque e Logística de Peças Críticas",
    "role": "Analista de logística de manutenção",
    "positioning": "specialist",
    "scenario": "Uma peça barata tem demanda rara, mas prazo de reposição de 90 dias e falha paralisa um serviço. Valor de compra não representa criticidade.",
    "decision": "Combinar consequência, prazo e alternativas na política de estoque.",
    "misconception": "Eliminar a peça do estoque por baixa rotação.",
    "changedConstraint": "O fabricante anuncia descontinuação.",
    "tasks": [
      "Identidade e compatibilidade da peça",
      "Balanço disponível reservado e reparo",
      "Cenários de prazo e indisponibilidade",
      "Custo de posse e interrupção",
      "Fluxo de falta e alternativa autorizada",
      "Simulado de atendimento de manutenção"
    ]
  },
  {
    "id": "quality-assurance-biotech",
    "track": "quality",
    "title": "Quality Assurance Documental em Biotecnologia",
    "role": "Analista documental de qualidade em biotecnologia",
    "positioning": "specialist",
    "scenario": "Um procedimento fictício tem duas revisões e cinco registros sem identificação da versão usada. Não há produtos ou amostras reais.",
    "decision": "Preservar os registros e investigar a versão aplicável sem preenchimento retroativo fictício.",
    "misconception": "Aplicar a revisão atual a todos os registros antigos.",
    "changedConstraint": "Uma mudança de fornecedor altera o processo descrito.",
    "tasks": [
      "Matriz de requisitos e aplicabilidade",
      "Histórico de versões e correções",
      "Plano de amostragem documental",
      "Registro de desvio e investigação",
      "Proposta de mudança e eficácia",
      "Dossiê de auditoria documental"
    ]
  },
  {
    "id": "capa-sistemas-qualidade",
    "track": "quality",
    "title": "CAPA: Investigação de Causas e Eficácia de Ações",
    "role": "Analista de melhoria de sistemas de qualidade",
    "positioning": "broad",
    "scenario": "Um erro reaparece três vezes após treinamento e ocorre em um campo com instruções contraditórias. A causa ainda é hipótese.",
    "decision": "Investigar o desenho do campo e testar a hipótese antes de definir ação corretiva.",
    "misconception": "Registrar falta de atenção como causa final sem evidência.",
    "changedConstraint": "A correção reduz o erro, mas aumenta registros incompletos.",
    "tasks": [
      "Matriz de requisito e desvio",
      "Trilha de evidências da ocorrência",
      "Plano de amostragem de causas",
      "Investigação e contenção",
      "Teste de eficácia e efeitos indesejados",
      "Relatório de fechamento de CAPA"
    ]
  },
  {
    "id": "validacao-sistemas-documental",
    "track": "quality",
    "title": "Validação Documental de Sistemas Computadorizados",
    "role": "Analista de evidências de validação",
    "positioning": "specialist",
    "scenario": "Um sistema atende ao fluxo normal, mas não foi testado para acesso negado, restauração e mudança de versão. O exercício é simulado.",
    "decision": "Relacionar risco e requisitos aos testes de exceção antes de recomendar aceite.",
    "misconception": "Aceitar pelo funcionamento do caminho principal.",
    "changedConstraint": "Um fornecedor muda a configuração de autenticação.",
    "tasks": [
      "Matriz de requisitos e risco",
      "Registro de configuração e evidência",
      "Plano de cobertura de testes",
      "Registro de desvios de validação",
      "Controle de mudança e regressão",
      "Pacote documental de aceitação"
    ]
  },
  {
    "id": "operacoes-regulatorias",
    "track": "quality",
    "title": "Operações Regulatórias e Gestão de Dossiês",
    "role": "Coordenador documental de assuntos regulatórios",
    "positioning": "specialist",
    "scenario": "Um dossiê fictício possui 40 arquivos, dois vencidos e três referências a uma versão antiga. O aluno não interpreta nem aprova exigência legal.",
    "decision": "Mapear aplicabilidade e pendências e encaminhar interpretação ao responsável qualificado.",
    "misconception": "Declarar conformidade pelo número completo de arquivos.",
    "changedConstraint": "Uma autoridade atualiza o formato de submissão.",
    "tasks": [
      "Matriz de requisitos verificados",
      "Inventário de arquivos e versões",
      "Amostra de consistência entre referências",
      "Registro de lacunas e responsáveis",
      "Plano de atualização de formato",
      "Dossiê de revisão sem parecer legal"
    ]
  },
  {
    "id": "integridade-dados-laboratoriais",
    "track": "quality",
    "title": "Integridade de Dados e Registros Laboratoriais",
    "role": "Analista documental de integridade de dados",
    "positioning": "specialist",
    "scenario": "Uma planilha de resultados fictícios contém correção sem data e uma fórmula substituída por valor fixo. Não há ensaio real.",
    "decision": "Reconstruir origem e histórico e registrar o desvio sem fabricar execução.",
    "misconception": "Inserir uma data anterior para completar o registro.",
    "changedConstraint": "O arquivo é migrado para outro sistema.",
    "tasks": [
      "Matriz de finalidade e requisitos",
      "Trilha de correções e fórmulas",
      "Plano de amostragem de registros",
      "Investigação de integridade",
      "Plano de mudança e reconciliação",
      "Relatório factual de evidências"
    ]
  },
  {
    "id": "qualidade-dispositivos-medicos",
    "track": "quality",
    "title": "Qualidade Documental de Dispositivos Médicos",
    "role": "Analista documental de qualidade de dispositivos",
    "positioning": "specialist",
    "scenario": "Um dispositivo fictício possui requisito, desenho e teste em versões incompatíveis. Nenhum produto será fabricado ou utilizado.",
    "decision": "Reconciliar a configuração e a rastreabilidade antes de concluir que o requisito foi verificado.",
    "misconception": "Usar qualquer teste aprovado como prova da versão atual.",
    "changedConstraint": "Um componente muda por indisponibilidade.",
    "tasks": [
      "Matriz de requisitos e finalidade",
      "Registro de configuração documental",
      "Plano de amostragem de evidências",
      "Registro de desvio de rastreabilidade",
      "Plano de alteração de componente",
      "Dossiê de revisão técnica externa"
    ]
  },
  {
    "id": "qualificacao-fornecedores-qualidade",
    "track": "quality",
    "title": "Qualificação Documental de Fornecedores em Setores Regulados",
    "role": "Analista de qualidade de fornecedores",
    "positioning": "broad",
    "scenario": "Um fornecedor apresenta certificado cujo escopo não cobre o processo contratado. O documento está vigente, mas não resolve a lacuna.",
    "decision": "Verificar escopo e evidências do processo específico antes de recomendar aprovação.",
    "misconception": "Aceitar pelo prazo de validade do certificado.",
    "changedConstraint": "O fornecedor terceiriza uma etapa crítica.",
    "tasks": [
      "Matriz de requisitos por serviço",
      "Inventário de evidências e escopos",
      "Plano de amostragem por risco",
      "Registro de lacuna e contenção",
      "Plano de mudança de subcontratado",
      "Relatório de qualificação condicional"
    ]
  },
  {
    "id": "operacoes-estabilidade-documental",
    "track": "quality",
    "title": "Operações Documentais de Estudos de Estabilidade",
    "role": "Coordenador documental de estudos de estabilidade",
    "positioning": "specialist",
    "scenario": "Um cronograma fictício tem 12 pontos previstos e dois sem registro. Não há dados suficientes para inferir prazo de validade e nenhuma amostra real é manipulada.",
    "decision": "Registrar lacunas e encaminhar avaliação técnica sem interpolar resultados como observados.",
    "misconception": "Preencher pontos ausentes pela tendência da série.",
    "changedConstraint": "Uma condição de armazenamento muda no meio do estudo.",
    "tasks": [
      "Matriz de protocolo e aplicabilidade",
      "Registro de pontos e versões",
      "Plano de completude e amostragem",
      "Registro de desvio de cronograma",
      "Controle documental da mudança",
      "Relatório de limites da evidência"
    ]
  },
  {
    "id": "auditoria-sistemas-gestao",
    "track": "quality",
    "title": "Auditoria Interna Baseada em Evidências e Risco",
    "role": "Auditor interno em formação complementar",
    "positioning": "broad",
    "scenario": "Uma equipe afirma ter corrigido um processo, mas só apresenta o procedimento novo; não há registro de uso ou teste de eficácia.",
    "decision": "Separar aprovação documental de implementação e eficácia.",
    "misconception": "Encerrar o achado pelo procedimento publicado.",
    "changedConstraint": "O escopo da auditoria passa a incluir um terceiro.",
    "tasks": [
      "Matriz de critérios de auditoria",
      "Índice de evidências e entrevistas",
      "Plano de amostragem por risco",
      "Achado factual e causa investigável",
      "Plano de ação e eficácia",
      "Relatório de fechamento e pendências"
    ]
  },
  {
    "id": "gestao-conhecimento-cientifico",
    "track": "quality",
    "title": "Gestão de Conhecimento e Transferência de Processos Científicos",
    "role": "Coordenador de conhecimento técnico",
    "positioning": "specialist",
    "scenario": "Uma equipe transfere um processo fictício usando apenas o procedimento final; decisões, exceções e pressupostos não foram registrados.",
    "decision": "Documentar condições, limites e evidências de transferência além da instrução final.",
    "misconception": "Considerar a transferência concluída pelo envio do documento.",
    "changedConstraint": "O receptor usa equipamento de configuração diferente.",
    "tasks": [
      "Matriz de conhecimento necessário",
      "Histórico de versões e decisões",
      "Plano de verificação de entendimento",
      "Registro de lacunas de transferência",
      "Plano de mudança de configuração",
      "Dossiê de aceite do receptor"
    ]
  },
  {
    "id": "operacoes-licitacoes-internacionais",
    "track": "business",
    "title": "Operações de Propostas e Concorrências Internacionais",
    "role": "Coordenador de propostas comerciais",
    "positioning": "specialist",
    "scenario": "Uma concorrência fictícia exige três anexos e assinatura até um horário em outro fuso. A equipe tem dois anexos e aprovação pendente.",
    "decision": "Tratar requisitos eliminatórios e prazo convertido antes de avaliar estética da proposta.",
    "misconception": "Enviar material incompleto esperando aceitação posterior.",
    "changedConstraint": "O comprador publica uma alteração dois dias antes do prazo.",
    "tasks": [
      "Escopo de proposta e responsabilidades",
      "Mapa de requisitos públicos e fontes",
      "Cronograma reverso e capacidade",
      "Modelo de custo da proposta",
      "Checklist de aceite e versões",
      "Plano de revisão de taxa de sucesso"
    ]
  },
  {
    "id": "operacoes-parcerias",
    "track": "business",
    "title": "Partner Operations e Gestão de Ecossistemas B2B",
    "role": "Analista de operações de parcerias",
    "positioning": "broad",
    "scenario": "Dez parceiros estão cadastrados, mas só três geraram oportunidade qualificada. Cadastro não demonstra ativação nem receita.",
    "decision": "Definir marcos de ativação e separar indicação de venda recebida.",
    "misconception": "Medir sucesso apenas pelo número de contratos de parceria.",
    "changedConstraint": "Dois parceiros reivindicam a mesma indicação.",
    "tasks": [
      "Escopo e proposta de valor da parceria",
      "Hipóteses de demanda do canal",
      "Fluxo de indicação e capacidade",
      "Modelo de contribuição por parceiro",
      "Handoff de atribuição e conflitos",
      "Piloto de ativação e recorrência"
    ]
  },
  {
    "id": "operacoes-comunidades",
    "track": "business",
    "title": "Community Operations e Serviços de Comunidade",
    "role": "Coordenador de operações de comunidade",
    "positioning": "broad",
    "scenario": "Uma comunidade tem mil inscritos e 50 participantes semanais. Um evento aumenta mensagens, mas também conflitos não resolvidos.",
    "decision": "Medir participação útil e capacidade de moderação junto ao volume.",
    "misconception": "Tratar toda mensagem como engajamento positivo.",
    "changedConstraint": "O grupo abre um segundo idioma.",
    "tasks": [
      "Escopo e necessidades da comunidade",
      "Mapa de sinais de participação",
      "Processo de eventos e moderação",
      "Modelo de esforço e orçamento",
      "Protocolo de qualidade e recurso",
      "Piloto com indicadores de retenção"
    ]
  },
  {
    "id": "operacoes-eventos-globais",
    "track": "business",
    "title": "Operações de Eventos Híbridos e Internacionais",
    "role": "Coordenador de eventos híbridos",
    "positioning": "broad",
    "scenario": "Um evento promete tradução e acesso remoto, mas o orçamento cobre apenas palco presencial. A agenda usa um único fuso sem rótulo.",
    "decision": "Reconciliar promessa, capacidade e custo antes de abrir inscrição.",
    "misconception": "Manter a promessa e resolver recursos depois.",
    "changedConstraint": "O palestrante principal muda de fuso.",
    "tasks": [
      "Escopo e requisitos dos participantes",
      "Pesquisa documental de público",
      "Run of show e capacidade",
      "Orçamento e cenários de custos",
      "Plano de aceite e contingência",
      "Piloto e análise pós-evento"
    ]
  },
  {
    "id": "operacoes-seguros-documental",
    "track": "business",
    "title": "Operações Documentais de Seguros e Sinistros",
    "role": "Analista administrativo de operações de seguros",
    "positioning": "specialist",
    "scenario": "Um processo fictício possui aviso, documentos e análise pendente. Receber o aviso não equivale a reconhecer cobertura; o aluno não emite parecer securitário.",
    "decision": "Manter estados administrativos e encaminhar decisão de cobertura ao responsável habilitado.",
    "misconception": "Prometer indenização na confirmação de recebimento.",
    "changedConstraint": "O solicitante envia uma nova versão do documento.",
    "tasks": [
      "Escopo administrativo e limites",
      "Mapa de fontes e requisitos confirmados",
      "Fluxo de documentos e capacidade",
      "Modelo de custo de processamento",
      "Checklist de handoff e correção",
      "Piloto de redução de pendências"
    ]
  },
  {
    "id": "operacoes-imoveis-servicos",
    "track": "business",
    "title": "Property Operations: Gestão Administrativa de Serviços",
    "role": "Coordenador administrativo de propriedades",
    "positioning": "broad",
    "scenario": "Um imóvel recebe dez solicitações com urgências e prestadores diferentes. O orçamento não inclui deslocamento nem revisão do serviço.",
    "decision": "Separar escopo, autorização e capacidade antes de prometer prazo e custo.",
    "misconception": "Aprovar todas pelo valor inicial do orçamento.",
    "changedConstraint": "Uma solicitação depende de profissional habilitado.",
    "tasks": [
      "Escopo de serviço e responsabilidades",
      "Pesquisa documental de prestadores",
      "Fluxo de chamados e agenda",
      "Modelo de custo total",
      "Checklist de aceite e escalonamento",
      "Piloto de tempo e retrabalho"
    ]
  },
  {
    "id": "operacoes-turismo-acessivel",
    "track": "business",
    "title": "Operações de Turismo Acessível e Experiência de Serviço",
    "role": "Coordenador de experiências acessíveis",
    "positioning": "specialist",
    "scenario": "Um roteiro anuncia acessibilidade porque o hotel tem elevador, mas transporte e atrações não foram verificados. O caso é inteiramente fictício.",
    "decision": "Verificar a jornada completa e registrar limitações antes de anunciar adequação.",
    "misconception": "Garantir acessibilidade por uma única característica do hotel.",
    "changedConstraint": "Um fornecedor altera o veículo de transporte.",
    "tasks": [
      "Escopo e necessidades de acesso",
      "Mapa de evidências dos fornecedores",
      "Agenda de handoffs e capacidade",
      "Modelo de custo por experiência",
      "Checklist de entrega e contingência",
      "Piloto de jornada com limites explícitos"
    ]
  },
  {
    "id": "operacoes-projetos-financiados",
    "track": "business",
    "title": "Operações de Projetos Financiados e Prestação de Contas",
    "role": "Coordenador administrativo de projetos financiados",
    "positioning": "specialist",
    "scenario": "Um projeto fictício recebe 100 unidades, compromete 60 e paga 40. Confundir compromisso e pagamento distorce o saldo disponível.",
    "decision": "Manter contratado, comprometido e pago em estados distintos com reconciliação.",
    "misconception": "Tratar os 60 comprometidos como dinheiro ainda livre.",
    "changedConstraint": "Uma despesa muda de elegibilidade contratual.",
    "tasks": [
      "Escopo e critérios do projeto",
      "Mapa de requisitos e fontes",
      "Cronograma de entregas e aprovações",
      "Modelo de caixa e compromissos",
      "Checklist documental de prestação",
      "Piloto de fechamento e pendências"
    ]
  },
  {
    "id": "operacoes-servicos-juridicos",
    "track": "business",
    "title": "Legal Operations: Processos e Informação Administrativa",
    "role": "Analista de operações jurídicas em formação complementar",
    "positioning": "specialist",
    "scenario": "Uma equipe administrativa acompanha 40 solicitações, mas não pode interpretar mérito jurídico. O painel mistura prazo informado e prazo validado pelo responsável.",
    "decision": "Separar status e validação e encaminhar decisões jurídicas ao profissional habilitado.",
    "misconception": "Interpretar prazo legal automaticamente pela descrição livre.",
    "changedConstraint": "O escritório muda a taxonomia de assuntos.",
    "tasks": [
      "Escopo administrativo e limites",
      "Mapa de necessidades dos usuários",
      "Fluxo de solicitação e capacidade",
      "Modelo de custo por serviço",
      "Checklist de handoff e versão",
      "Piloto de qualidade de classificação"
    ]
  },
  {
    "id": "operacoes-franquias",
    "track": "business",
    "title": "Operações de Redes e Padronização de Serviços",
    "role": "Analista de operações de redes",
    "positioning": "specialist",
    "scenario": "Cinco unidades usam o mesmo procedimento, mas possuem volumes e recursos distintos. Comparar apenas receita pode esconder falhas de serviço.",
    "decision": "Avaliar processo, capacidade e qualidade no contexto de cada unidade.",
    "misconception": "Aplicar a meta da maior unidade igualmente a todas.",
    "changedConstraint": "Uma unidade passa a atender em outro idioma.",
    "tasks": [
      "Escopo do padrão e variações permitidas",
      "Pesquisa de necessidades por unidade",
      "Mapa de capacidade e fluxo",
      "Modelo de contribuição e custo",
      "Checklist de conformidade operacional",
      "Piloto de melhoria entre unidades"
    ]
  },
  {
    "id": "redacao-tecnica-produtos",
    "track": "content",
    "title": "Redação Técnica e Documentação de Produtos Digitais",
    "role": "Redator técnico de produtos",
    "positioning": "broad",
    "scenario": "Uma integração tem guia de instalação, mas não explica pré-requisitos, erro de autenticação ou como confirmar sucesso.",
    "decision": "Documentar tarefa, pré-requisitos, resultado esperado e recuperação testável.",
    "misconception": "Publicar apenas a descrição das funcionalidades.",
    "changedConstraint": "Uma nova versão altera o formato de configuração.",
    "tasks": [
      "Mapa de tarefas e navegação",
      "Registro de fontes e licenças",
      "Guia com glossário e exemplos",
      "Versão acessível dos passos",
      "Teste de instalação sem ajuda",
      "Plano de atualização por versão"
    ]
  },
  {
    "id": "ux-writing-servicos",
    "track": "content",
    "title": "UX Writing para Jornadas de Serviços Internacionais",
    "role": "UX writer em formação aplicada",
    "positioning": "broad",
    "scenario": "Uma tela usa concluir para enviar um pedido ainda sujeito a análise. Usuários fictícios interpretam o botão como aprovação definitiva.",
    "decision": "Usar texto que diferencie envio, análise e confirmação.",
    "misconception": "Manter concluir porque é mais curto.",
    "changedConstraint": "O serviço adiciona uma etapa de pagamento.",
    "tasks": [
      "Mapa de estados e microcopy",
      "Registro de requisitos de conteúdo",
      "Glossário de ações e confirmações",
      "Alternativas acessíveis para erros",
      "Teste de compreensão por tarefa",
      "Plano de consistência entre telas"
    ]
  },
  {
    "id": "producao-legendas-acessiveis",
    "track": "content",
    "title": "Produção Editorial de Legendas e Transcrições Acessíveis",
    "role": "Editor de legendas e transcrições",
    "positioning": "broad",
    "scenario": "Um vídeo contém diálogo, alarme e mudança de interlocutor. A transcrição automática omite o alarme que explica a ação seguinte.",
    "decision": "Revisar informação sonora relevante e sincronização além das palavras faladas.",
    "misconception": "Considerar a transcrição automática como legenda final.",
    "changedConstraint": "O vídeo recebe cortes que mudam a duração.",
    "tasks": [
      "Mapa de público e função do vídeo",
      "Registro de direitos de mídia",
      "Transcrição revisada por sentido",
      "Legendas com informação sonora",
      "Teste de sincronização e leitura",
      "Pacote de publicação e versões"
    ]
  },
  {
    "id": "localizacao-jogos-operacoes",
    "track": "content",
    "title": "Operações de Localização de Jogos e Conteúdo Interativo",
    "role": "Coordenador de localização de jogos",
    "positioning": "specialist",
    "scenario": "Uma mensagem usa limite de 20 caracteres e contém uma variável. A tradução aumenta o texto e quebra o identificador da variável.",
    "decision": "Preservar variáveis e testar limite no contexto de interface.",
    "misconception": "Traduzir também o nome da variável para uniformizar o idioma.",
    "changedConstraint": "A mesma frase passa a aparecer para personagens de gêneros distintos.",
    "tasks": [
      "Mapa de contextos e chaves",
      "Registro de origem e direitos",
      "Glossário e instruções de variável",
      "Revisão acessível da interface",
      "Teste contextual e de truncamento",
      "Plano de atualização por build"
    ]
  },
  {
    "id": "conteudo-museus-digitais",
    "track": "content",
    "title": "Curadoria de Conteúdo para Museus e Acervos Digitais",
    "role": "Curador editorial de acervos digitais",
    "positioning": "specialist",
    "scenario": "Um acervo tem 50 objetos, dez com autoria incerta e cinco sem direito de reprodução verificado.",
    "decision": "Distinguir atribuição, incerteza e permissão antes de publicar.",
    "misconception": "Preencher autoria provável como fato para completar o catálogo.",
    "changedConstraint": "Uma pesquisa altera a data atribuída a um objeto.",
    "tasks": [
      "Arquitetura do catálogo por tarefa",
      "Registro de proveniência e direitos",
      "Texto curatorial com incerteza explícita",
      "Alternativas acessíveis por objeto",
      "Revisão factual e de navegação",
      "Plano de correção de metadados"
    ]
  },
  {
    "id": "preservacao-digital",
    "track": "content",
    "title": "Preservação Digital e Gestão de Coleções Documentais",
    "role": "Coordenador de preservação documental",
    "positioning": "specialist",
    "scenario": "Uma coleção possui cópias em dois discos, mas nenhum teste de integridade ou registro de formato. Cópia duplicada não comprova preservação.",
    "decision": "Inventariar formatos e testar integridade e recuperação com histórico.",
    "misconception": "Declarar preservação permanente pelo número de cópias.",
    "changedConstraint": "Um formato deixa de abrir na ferramenta atual.",
    "tasks": [
      "Mapa de usuários e acesso",
      "Inventário de origem e direitos",
      "Política de descrição e nomes",
      "Alternativa acessível de consulta",
      "Teste de integridade e recuperação",
      "Plano de migração e revisão"
    ]
  },
  {
    "id": "comunicacao-cientifica-publica",
    "track": "content",
    "title": "Comunicação Científica para Públicos Internacionais",
    "role": "Comunicador científico em formação aplicada",
    "positioning": "broad",
    "scenario": "Um estudo observacional encontra associação em uma população restrita. O título proposto promete efeito causal universal.",
    "decision": "Preservar desenho, população e incerteza na comunicação.",
    "misconception": "Usar a promessa causal para aumentar alcance.",
    "changedConstraint": "Uma revisão posterior muda a estimativa principal.",
    "tasks": [
      "Mapa de público e perguntas",
      "Registro de estudos e direitos",
      "Texto com associação e causalidade distintas",
      "Gráficos com alternativa textual",
      "Revisão de entendimento e precisão",
      "Plano de atualização da evidência"
    ]
  },
  {
    "id": "plain-language-servicos",
    "track": "content",
    "title": "Linguagem Clara para Serviços Públicos e Institucionais",
    "role": "Editor de linguagem clara",
    "positioning": "broad",
    "scenario": "Uma orientação informa exceção e prazo em notas separadas. Leitores fictícios seguem o caminho geral e perdem a condição de elegibilidade.",
    "decision": "Reorganizar ação, condição e prazo sem remover a exceção relevante.",
    "misconception": "Apagar a exceção para reduzir o tamanho do texto.",
    "changedConstraint": "A regra passa a ter dois públicos elegíveis.",
    "tasks": [
      "Mapa de tarefas e critérios",
      "Registro de fontes oficiais",
      "Reescrita com condições explícitas",
      "Versão acessível de formulário",
      "Teste de elegibilidade e ação",
      "Plano de atualização sincronizada"
    ]
  },
  {
    "id": "operacoes-editoriais-multilingues",
    "track": "content",
    "title": "Operações Editoriais e Publicação em Múltiplos Idiomas",
    "role": "Coordenador editorial multilíngue",
    "positioning": "broad",
    "scenario": "Seis idiomas compartilham uma página; uma alteração de prazo foi aplicada em dois. Os demais ainda apresentam a data antiga.",
    "decision": "Rastrear a mudança por chave e estado de revisão em todos os idiomas.",
    "misconception": "Publicar parcialmente sem informar divergência de prazo.",
    "changedConstraint": "Um idioma exige revisão de terminologia jurídica externa.",
    "tasks": [
      "Arquitetura de conteúdo por idioma",
      "Registro de fontes e permissões",
      "Glossário e guia de equivalência",
      "Checklist de estrutura acessível",
      "Teste de consistência entre versões",
      "Fluxo de publicação e correção"
    ]
  },
  {
    "id": "acessibilidade-documentos-digitais",
    "track": "content",
    "title": "Acessibilidade de Documentos e Publicações Digitais",
    "role": "Editor de documentos acessíveis",
    "positioning": "broad",
    "scenario": "Um PDF parece correto, mas a ordem de leitura atravessa colunas e os links dizem clique aqui. O arquivo-fonte está disponível.",
    "decision": "Corrigir estrutura e ordem na fonte e testar a tarefa com leitura assistiva.",
    "misconception": "Aprovar apenas pela aparência visual.",
    "changedConstraint": "O documento recebe uma tabela larga e novas imagens.",
    "tasks": [
      "Mapa de tarefas de leitura",
      "Registro de origem de materiais",
      "Revisão de títulos e links",
      "Estrutura e alternativas textuais",
      "Teste de leitura e navegação",
      "Pacote de fonte editável e revisão"
    ]
  },
  {
    "id": "planejamento-de-fornadas-por-janela-de-venda",
    "track": "business",
    "title": "Planejamento de fornadas por janela de venda",
    "role": "Programador de produção de padaria",
    "positioning": "specialist",
    "scenario": "O forno comporta 48 pães por ciclo de 30 minutos. Às 7h há 12 pães prontos e pedidos firmes de 92 até 8h. Os dois ciclos podem terminar antes da retirada.",
    "decision": "Reservar dois ciclos. A necessidade líquida é 80 e um ciclo deixa 32 pães em falta.",
    "misconception": "Somar estoque com capacidade de apenas um ciclo e aceitar todos os pedidos.",
    "changedConstraint": "Um ciclo termina quinze minutos depois da retirada.",
    "tasks": [
      "Quadro de pedidos por horário",
      "Saldo inicial confirmado",
      "Mapa de capacidade do forno",
      "Cronograma de fornadas",
      "Análise de sobra por janela",
      "Simulação de atraso"
    ]
  },
  {
    "id": "modelagem-de-rendimento-de-massas",
    "track": "business",
    "title": "Modelagem de rendimento de massas",
    "role": "Analista de rendimento de panificação",
    "positioning": "specialist",
    "scenario": "Três lotes de 10 kg de massa crua resultam em 8,6, 8,8 e 8,7 kg vendáveis. A encomenda é de 43,5 kg. Considere rendimento médio constante apenas na simulação.",
    "decision": "Planejar 50 kg de massa crua, pois o rendimento conjunto é 26,1/30 = 87%.",
    "misconception": "Acrescentar 13% ao pedido e tratar isso como inversão da perda.",
    "changedConstraint": "O primeiro lote novo rende 8,2 kg e a meta comercial permanece.",
    "tasks": [
      "Ficha de pesagem",
      "Balanço de massa",
      "Cálculo de rendimento ponderado",
      "Plano de lotes inteiros",
      "Análise de sensibilidade",
      "Registro de desvio"
    ]
  },
  {
    "id": "controle-de-perdas-no-balcao",
    "track": "business",
    "title": "Controle de perdas no balcão",
    "role": "Encarregado de controle de perdas",
    "positioning": "specialist",
    "scenario": "De 120 unidades expostas, 84 são vendidas, 18 doadas com registro e 12 descartadas. O saldo contado é seis. A loja quer separar descarte de saída sem receita.",
    "decision": "Registrar 10% de descarte e 25% de saída sem receita sobre as 120 expostas.",
    "misconception": "Classificar as seis unidades que continuam no balcão como descarte.",
    "changedConstraint": "Uma doação de três unidades foi registrada duas vezes.",
    "tasks": [
      "Mapa de destinos",
      "Conciliação de unidades",
      "Definição de indicadores",
      "Análise por turno",
      "Teste de duplicidade",
      "Painel de perdas"
    ]
  },
  {
    "id": "compras-sazonais-de-farinha",
    "track": "business",
    "title": "Compras sazonais de farinha",
    "role": "Comprador de insumos de panificação",
    "positioning": "specialist",
    "scenario": "A previsão é consumir 180 sacos em seis semanas, com estoque inicial de 50 e capacidade de 100. O fornecedor oferece desconto para entrada imediata de 120 sacos.",
    "decision": "Negociar entregas fracionadas: o primeiro recebimento tem limite de 50 sacos antes de qualquer consumo.",
    "misconception": "Aceitar o lote integral porque o desconto reduz o custo unitário.",
    "changedConstraint": "A demanda cai de 30 para 20 sacos semanais a partir da terceira semana.",
    "tasks": [
      "Projeção semanal",
      "Mapa de capacidade",
      "Comparativo de propostas",
      "Cronograma de compras",
      "Simulação de sazonalidade",
      "Memorando ao fornecedor"
    ]
  },
  {
    "id": "custeio-de-confeitaria-por-encomenda",
    "track": "business",
    "title": "Custeio de confeitaria por encomenda",
    "role": "Orçamentista de confeitaria",
    "positioning": "specialist",
    "scenario": "Uma encomenda de 40 caixas custa 240 em ingredientes, 80 em embalagens e 160 em mão de obra direta. A taxa de venda é 4% da receita. A meta é margem de contribuição de 20% após esses custos.",
    "decision": "Dividir 480 por 0,76: cobrar pelo menos 631,58 no lote antes de arredondar por caixa.",
    "misconception": "Somar 24% a 480 e assumir que a margem sobre a receita será 20%.",
    "changedConstraint": "O cliente mantém a quantidade e pede embalagem que custa mais uma unidade monetária por caixa.",
    "tasks": [
      "Ficha de insumos",
      "Orçamento de tempo",
      "Mapa de custos variáveis",
      "Formação de preço",
      "Teste de margem",
      "Proposta revisada"
    ]
  },
  {
    "id": "programacao-de-fermentacao-em-camara",
    "track": "business",
    "title": "Programação de fermentação em câmara",
    "role": "Programador de câmaras de fermentação",
    "positioning": "specialist",
    "scenario": "Uma câmara tem oito posições. O lote A ocupa cinco de 6h a 8h, B precisa de quatro por duas horas e deve sair até 10h. Para o exercício, os parâmetros do processo já foram aprovados.",
    "decision": "Reservar B de 8h a 10h e registrar a dependência da liberação de A.",
    "misconception": "Iniciar B às 7h porque o total diário de horas parece suficiente.",
    "changedConstraint": "A liberação de A atrasa trinta minutos e o prazo de B permanece.",
    "tasks": [
      "Inventário de posições",
      "Gráfico de ocupação",
      "Mapa de precedências",
      "Teste de sobreposição",
      "Plano de contingência",
      "Registro de passagem de turno"
    ]
  },
  {
    "id": "previsao-de-demanda-para-padarias-de-bairro",
    "track": "business",
    "title": "Previsão de demanda para padarias de bairro",
    "role": "Analista de demanda de padaria",
    "positioning": "specialist",
    "scenario": "Cinco sábados registram vendas de 80, 84, 55, 82 e 79 pães. No terceiro, faltou produto antes do encerramento. A gerência propõe usar 55 como demanda observada total.",
    "decision": "Marcar a terceira observação como limitada pelo estoque e comparar previsões com e sem esse dia.",
    "misconception": "Substituir 55 por 84 e declarar o valor imputado como venda real.",
    "changedConstraint": "Um evento de rua altera o movimento do próximo sábado.",
    "tasks": [
      "Histórico anotado",
      "Calendário de eventos",
      "Previsão de referência",
      "Teste retrospectivo",
      "Intervalo de planejamento",
      "Registro de ruptura"
    ]
  },
  {
    "id": "dimensionamento-de-entregas-de-pao-fresco",
    "track": "business",
    "title": "Dimensionamento de entregas de pão fresco",
    "role": "Coordenador de distribuição de padaria",
    "positioning": "specialist",
    "scenario": "A van leva 60 caixas. Duas lojas pedem 35 e 30 caixas até 9h. Existe somente uma viagem antes desse horário. Uma terceira loja aceita entrega posterior.",
    "decision": "Identificar déficit de cinco caixas na janela e negociar outra capacidade ou novo horário antes de prometer.",
    "misconception": "Deslocar a terceira loja para mais tarde e afirmar que isso resolve os 65 pedidos prioritários.",
    "changedConstraint": "A primeira loja aceita receber dez caixas depois das 9h.",
    "tasks": [
      "Matriz de pedidos",
      "Mapa de janelas",
      "Balanço de capacidade",
      "Plano de carregamento",
      "Comparação de alternativas",
      "Comprovante de entrega simulado"
    ]
  },
  {
    "id": "padronizacao-de-fichas-de-producao-de-confeitaria",
    "track": "business",
    "title": "Padronização de fichas de produção de confeitaria",
    "role": "Técnico de documentação de confeitaria",
    "positioning": "specialist",
    "scenario": "A ficha vigente produz 24 unidades com 960 g de recheio. Uma cópia antiga usa 35 g por unidade. Uma ordem de 60 unidades aponta somente para o nome da receita.",
    "decision": "Prender a ordem à revisão vigente e reservar 2.400 g de recheio, documentando a diferença de versão.",
    "misconception": "Fazer a média entre as duas dosagens sem aprovação da alteração.",
    "changedConstraint": "O cliente solicita porções de 45 g para uma nova versão da encomenda.",
    "tasks": [
      "Cadastro de versões",
      "Tabela de unidades",
      "Ficha escalonada",
      "Controle de mudança",
      "Teste de rastreabilidade",
      "Pacote para troca de turno"
    ]
  },
  {
    "id": "gestao-de-devolucoes-de-pao-no-atacado",
    "track": "business",
    "title": "Gestão de devoluções de pão no atacado",
    "role": "Analista comercial de devoluções",
    "positioning": "specialist",
    "scenario": "O atacadista enviou 400 unidades a A e 100 a B. Recebeu 20 devoluções de cada. O contrato fictício credita somente devoluções identificadas por remessa. Em B, quatro estão sem identificação.",
    "decision": "Separar taxa física (5% em A e 20% em B) do crédito elegível: em B apenas 16 estão conciliadas.",
    "misconception": "Tratar as duas lojas como equivalentes porque devolveram 20 unidades cada.",
    "changedConstraint": "Seis unidades registradas em A chegam com referência da remessa de B.",
    "tasks": [
      "Registro de remessas",
      "Conferência de devoluções",
      "Taxa ponderada",
      "Conciliação de créditos",
      "Análise de divergência",
      "Proposta de ajuste de fornecimento"
    ]
  }
] as const satisfies readonly MarketCourseSpec[];

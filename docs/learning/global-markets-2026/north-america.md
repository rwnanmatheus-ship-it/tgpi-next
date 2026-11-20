# América do Norte — pesquisa e decisões editoriais TGPI

Data de consulta: 20 de novembro de 2026. Cobertura: Estados Unidos, Canadá e México. Os 100 cursos estão materializados em `north-america.json`; dez áreas, dez cursos por área. Os casos são autorais, fictícios e específicos; não são cópia de aulas das fontes. O conjunto combina temas com sinal amplo de mercado e hipóteses editoriais de nicho. Não foi encontrado um ranking público, consistente e regional de cursos menos pesquisados. `broad` e `specialist` não são medidas de volume de busca, empregabilidade ou salário.

## Evidências de mercado

1. **Estados Unidos — BLS, tabela atual 2025–2035.** A página consultada apresenta crescimento projetado expressivo em cuidado, energia renovável e dados: nurse practitioners 41%, solar photovoltaic installers 36,5%, data scientists 34,6%, wind turbine service technicians 29,5%, medical and health services managers 24,2%. O crescimento percentual deve ser interpretado junto ao número de vagas e ao tamanho da ocupação. Cursos TGPI de operações administrativas e análise são complementares; não habilitam para essas profissões clínicas ou técnicas regulamentadas.
   Fonte primária: https://www.bls.gov/emp/tables/fastest-growing-occupations.htm
   Ref de pesquisa: turn216038898view0 (página aberta); turn550593290search0.

2. **Canadá — COPS, exercício 2026–2035.** A fonte oficial informa atualização das projeções em 2026 e distingue expansão de reposição de trabalhadores. Essa distinção impede chamar toda abertura de crescimento novo. Os outlooks do Job Bank são regionais e não devem ser comparados nacionalmente como ranking homogêneo.
   Fontes primárias: https://occupations.esdc.gc.ca/sppc-cops/content.jsp?cid=occupationdatasearch&lang=en&wbdisable=false ; https://professions.edsc.gc.ca/sppc-cops/l.3bd.2t.1ilshtml%40-eng.jsp?fid=1&lang=en&lid=16 ; https://www.jobbank.gc.ca/trend-analysis/search-job-outlooks/frequently-asked-questions?wbdisable=false
   Refs de pesquisa: turn550593290search4, turn550593290search5 e turn550593290search7. A tentativa de abertura sem parâmetro do FAQ apresentou timeout; o resultado de busca do texto oficial foi lido.

3. **México — Observatorio Laboral, ENOE segundo trimestre de 2026.** A fonte descreve composição da ocupação por setor e emprego profissional. Indústria de transformação, comércio, educação/saúde e serviços profissionais sustentam diversidade de áreas; tamanho de setor não prova crescimento ou escassez. A seleção inclui operações industriais, logística, acesso administrativo ao cuidado e serviços digitais, sem presumir equivalência de exigências entre países.
   Fontes primárias: https://www.observatoriolaboral.gob.mx/static/estudios-publicaciones/Ocupacion_sectores.html ; https://www.observatoriolaboral.gob.mx/static/estudios-publicaciones/Tendencias_empleo.html ; https://www.economia.gob.mx/datamexico/es/explore?profile=occupation
   Refs de pesquisa: turn469652048search3, turn469652048search0, turn469652048search14.

4. **Procura por aprendizagem — Coursera, dados próprios de 2025.** O relatório do provedor destaca dados, IA, Python, inglês profissional, Excel e gestão de projetos entre cursos populares. Isso é comportamento na plataforma Coursera, não censo do mercado nem volume de busca da TGPI. A decisão editorial é aprofundar problemas concretos adjacentes — calibração, linhagem, extração estruturada, acessibilidade e operações — evitando mais uma coleção de cursos introdutórios genéricos.
   Fonte primária: https://blog.coursera.org/2026s-fastest-growing-skills-and-top-learning-trends-from-2025/
   Refs de pesquisa: turn216038898view2 (aberta); turn550593290search3. O relatório regional apresenta também dados agregados de aprendizagem, mas não fundamenta afirmar procura baixa por qualquer tema individual.

## Decisão de conteúdo

- IA: dez problemas de avaliação e operação, com exemplo resolvido próprio. Inclui incerteza, vazamento de benchmark, custo de roteamento, embeddings, estados de agente, rótulos atrasados, capacidade de GPU, extração com schema, testes contrafactuais e dados de preferência.
- Segurança: dez problemas defensivos e autorizados, incluindo inventário pós-quântico, contexto de vulnerabilidade, SBOM, identidade de máquina, recuperação, autorização multiempresa, procedência, acesso temporário, webhooks e logs mínimos.
- Dados: dez métodos com distinção de unidades, tempo, amostra e inferência, incluindo censura, testes sequenciais, reconciliação, horário de verão, privacidade diferencial, sazonalidade, backtest, métricas, estratos e linhagem.
- Energia: dez tarefas de planejamento e análise, sem execução técnica ou promessa de habilitação: eletrificação, bombas de calor, recarga, baseline, armazenamento, certificados, adaptação, perdas solares, manutenção eólica e emissões térmicas.
- Cuidado: dez cursos administrativos e de qualidade de dados. Não ensinam diagnóstico, prescrição, triagem clínica ou liberação de dispositivo.
- Indústria, logística, qualidade, negócios e conteúdo: cinquenta problemas distintos de fluxo, medição, rastreabilidade, capacidade, evidência e acessibilidade. O posicionamento `specialist` é hipótese editorial de público específico, não alegação de pouca concorrência ou ausência em outras plataformas.

## Fontes instrucionais

Cada curso contém duas ou três referências primárias. As famílias de referência são NIST, CISA, scikit-learn, PyTorch, OWASP, Stripe, DOE, EPA, AHRQ, HHS, HL7, GS1, Google OR-Tools, SBA, W3C WAI e IES. Fontes com página aberta para inspeção direta nesta tarefa: NIST AI RMF, scikit-learn calibration, Stripe webhooks, W3C WAI tutorials e índice do NIST handbook. O NIST handbook usa estrutura de frames; a página índice responde, mas o extrator de texto mostra apenas aviso de frames. Outros links são referências primárias selecionadas; nem toda URL do conjunto foi testada individualmente nesta subtarefa.

Exemplos de fontes instrucionais inspecionadas:

- https://www.nist.gov/itl/ai-risk-management-framework — turn216038898view3. O framework é voluntário e está em revisão; não declarar acreditação ou endosso NIST.
- https://scikit-learn.org/stable/modules/calibration.html — turn469652048view3. Referência sobre interpretação e calibração de probabilidades.
- https://docs.stripe.com/webhooks — turn469652048view2. Referência primária para assinatura, repetição e ordem de eventos.
- https://www.w3.org/WAI/tutorials/ — turn469652048view1. Referência sobre técnicas e exemplos de acessibilidade por tarefa.
- https://www.itl.nist.gov/div898/handbook/ — turn469652048view0. Métodos estatísticos; índice em frames.

## Validação do material

Exatamente 100 IDs e cenários únicos. Seis entregáveis distintos por curso. Método mínimo de 173 palavras, combinando instrução específica e fundamento compartilhado explicitado por área. Exemplo resolvido mínimo de 120 palavras, com solução concreta, erro a evitar e alteração para transferência. As 60 horas serão estimativa de estudo, produção, teste e revisão conforme integração do proprietário; este conjunto não declara horas de vídeo, aprovação humana dos projetos, acreditação externa, emprego garantido ou exclusividade de mercado.

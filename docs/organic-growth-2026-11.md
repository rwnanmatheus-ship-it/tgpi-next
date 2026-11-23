# TGPI — expansão orgânica e descoberta internacional

Pesquisa e implementação: 23/11/2026. Nenhuma audiência, posição ou receita foi estimada como resultado observado.

## Diagnóstico

A plataforma já oferece conteúdo público, sitemap, canonicals e guias. A troca de idioma baseada em conta/cookie não oferece seis endereços estáveis aos robôs. Por isso esta entrega cria seis páginas institucionais com texto completo no HTML, URLs próprias e hreflang recíproco. Isso não representa tradução indexável de todas as páginas da plataforma.

A ampliação da descoberta precisa combinar demanda específica (idioma, habilidade e decisão), conteúdo útil, distribuição editorial e conversão. Banners hospedados não aparecem automaticamente em outros sites. RSS permite assinatura e reutilização; nenhum agregador recebe o conteúdo automaticamente nesta entrega.

## Implementado

- /discover/en, /discover/pt-BR, /discover/es, /discover/fr, /discover/de, /discover/it: apresentação, trilhas de entrada, guias, catálogo, cadastro e Premium.
- Idioma de URL prevalece apenas nas páginas /discover; o restante mantém preferências de conta/dispositivo. Cabeçalho interno não pode ser injetado pelo visitante.
- Seis banners JPEG 1600 × 900 com identidade TGPI, arte conceitual exclusiva e texto localizado. Download, link compartilhável, Web Share com fallback e código de incorporação sem rastreamento adicional.
- Sitemap amplia cobertura para cursos públicos e variantes internacionais, preservando páginas privadas e noindex.
- Course JSON-LD com dados reais do curso: título, descrição, idioma de instrução, carga estimada, resultados e provedor. Sem avaliações, notas ou acreditações inventadas. Não garante resultados enriquecidos.
- Metadados canônicos e sociais dos cursos legados/profissionais.
- /feed.xml: RSS dos guias existentes, com datas editoriais reais e auto-discovery.
- IndexNow: chave pública de verificação, submissão com timeout e workflow após produção. O script exige arquivo de propriedade já publicado. HTTP 200/202 significa recebimento, nunca comprovação de indexação. IndexNow não substitui Search Console e não submete ao Google.
- Prévia grande para buscadores permitida nas páginas públicas; restrições explícitas dos filhos permanecem.

## Estratégia de aquisição

Prioridade é atrair uma pergunta real e oferecer uma ação útil. A quantidade de cursos não substitui qualidade editorial ou evidência de aprendizagem.

| Frente | Conteúdo útil | Entrada | Próximo passo | Medida |
| --- | --- | --- | --- | --- |
| Idiomas | Aula prática com situação, exercício e resposta comentada | Curso específico | Criar conta e praticar | Início e conclusão de aula |
| Países | Comparação com fontes, período e limitações | Perfil ou comparação | Investigar e salvar objetivo | Retorno e objetivo salvo |
| Mobilidade | Checklist com autoridade e dependências | Guia | Ferramenta de preparação | Uso da ferramenta |
| Carreira | Demonstração de projeto e rubrica | Curso | Executar atividade | Projeto concluído |
| Marca | Explicação clara do produto e limites | Discovery localizado | Explorar catálogo | Cadastro qualificado |
| Premium | Benefício de organização demonstrado | Pricing | Checkout | Assinatura confirmada |

Não usar contagem de pedidos de robôs/auditorias como tráfego humano. Não atribuir uma assinatura ao SEO sem evidência de origem e conversão.

## Distribuição editorial: plano de 30 dias

### Dias 1–3

Concluir verificação da propriedade correta no Google Search Console e Bing Webmaster Tools, enviar o sitemap canônico e inspecionar home, uma página de idioma, um curso e um guia. Registrar baseline de impressões, cliques, páginas indexadas e países, sem inventar valores na ausência de acesso. Validar medição existente e consentimento antes de ativar rastreamento.

### Dias 4–10

Escolher três perguntas com base em consultas reais do Search Console e dúvidas reais do público. Preparar respostas demonstráveis, com exemplo próprio, exercício, autoria, fonte e data de revisão. Sugestões a validar: inglês para primeira entrevista; custo total de uma mudança; como comparar destinos com dados de anos diferentes. Evitar páginas sobre mudanças de vistos sem conferência oficial.

Para cada material: um guia/aula original; um vídeo explicativo; três cortes verticais com lições distintas; um carrossel; um resumo que leve à atividade correta. Não enviar todo conteúdo para a home.

### Dias 11–20

Publicar versões adaptadas em canais da marca: Instagram, YouTube, TikTok e, se existentes, LinkedIn e Pinterest. Adaptação inclui idioma, contexto e formato do canal. Acesso e publicação por canal precisam ser confirmados no serviço; nenhum post externo está implícito na publicação do site.

Usar banners localizados em perfis e páginas próprias onde aceitos. Oferecer incorporação voluntária a parceiros educacionais relevantes. Participar de comunidades respondendo perguntas com utilidade e respeitando regras de links. Não comprar links, publicar comentários em massa, mandar mensagens indiscriminadas ou criar contas para manipular reputação.

### Dias 21–30

Revisar páginas com impressões e poucos cliques; ajustar título e introdução à intenção real sem clickbait. Corrigir páginas descobertas e não indexadas após identificar a causa: duplicação, conteúdo insuficiente, erro ou baixa relevância. Avaliar cadastro, primeira atividade e assinatura, não só visitas.

Traduzir e revisar primeiro os guias/cursos que demonstram procura; então criar URLs próprias, canonicals e alternates para cada conteúdo realmente equivalente. Não anunciar que toda a plataforma já possui SEO multilíngue por causa das seis páginas desta entrega.

## Descoberta sem busca direta

Google Discover pode recomendar conteúdo indexado, útil e interessante, com imagem relevante de pelo menos 1200px e boa experiência. Elegibilidade não garante distribuição. Imagens de artigos devem representar o assunto; banners com muito texto não são a escolha recomendada para ilustrar artigos no Discover.

YouTube, redes sociais e recomendações de parceiros dependem de publicação, relevância e resposta do público. Não há comando que apresente um site em toda a internet. Recursos de IA do Google seguem requisitos usuais de SEO; não exigem um arquivo especial de IA nem oferecem atalho garantido.

## Pesquisa: fontes oficiais

- https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- https://developers.google.com/search/docs/specialty/international/localized-versions
- https://developers.google.com/search/docs/appearance/google-discover
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- https://developers.google.com/search/docs/appearance/video
- https://developers.google.com/search/docs/monitor-debug/search-console-start
- https://www.indexnow.org/documentation
- https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a

## Limites da entrega

A disponibilidade pública depende também das redes, regras locais e mecanismos de busca. Não foram configurados contornos de bloqueios geográficos. A verificação do Search Console foi preparada para a conta oficial indicada pelo fundador. A confirmação de propriedade, o envio do sitemap, a publicação externa e o recebimento IndexNow só devem ser reportados mediante confirmação dos respectivos serviços. A preparação técnica, por si só, não comprova esses resultados.

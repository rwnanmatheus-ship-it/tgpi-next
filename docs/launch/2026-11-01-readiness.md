# TGPI — atualização de confiabilidade e matriz de aceite, 01/11/2026

## Estado e escopo

Esta matriz complementa o relatório de 31/10 e prevalece quanto às alterações descritas aqui. O PR #88 foi integrado ao commit 24d753cea381568ea6871eb855e3cf168bf0d0e7 e publicado em produção. Seus riscos de concorrência receberam implementação e testes simulados; o ciclo Stripe real continua sem aceite. A publicação dos dez cursos em acesso antecipado também está confirmada. Nenhuma dessas publicações encerra os critérios operacionais ou pedagógicos pendentes.

Esta atualização implementa redirecionamentos permanentes de `/learn/:path*` para `/courses/:path*`, `/prices` para `/pricing` e `/billing` para `/billing-terms`; amplia a localização da apresentação de cursos e dos blocos principais do Workspace; traduz comandos e avisos de comunidade/certificados conectados ao Workspace; e separa a conclusão de aulas dos requisitos de certificação. O contador ignora IDs duplicados/removidos e não considera um curso sem aulas concluído.

Os indicadores de estrutura curricular descrevem o conteúdo declarado, sem anunciar prontidão operacional da certificação. A elegibilidade continua no fluxo protegido de certificação. Notas, requisitos, pagamentos, matrículas, assinaturas, papéis e registros existentes são preservados. Nenhum usuário foi promovido, avaliado ou certificado nesta execução.

A preferência de idioma continua sendo resolvida pelo serviço existente e não é usada como autorização. Nomes pessoais e conteúdo autoral do usuário não são traduzidos. Slugs, identificadores e valores persistidos ficam estáveis. Currículos e templates dinâmicos ainda podem exibir conteúdo original.

## Validação desta revisão

- 388 testes automatizados aprovados, zero falhas ou testes pulados.
- TypeScript aprovado.
- Build Next.js padrão local aprovado; o build remoto da revisão final deve ser verificado antes da publicação.
- ESLint executado; a conclusão e avisos devem ser conferidos no registro da execução.
- Novos testes renderizam os componentes reais de curso e Workspace em seis idiomas com dados e dependências controlados. Verificam escape do nome, destinos canônicos, rótulos acessíveis, progresso sem duplicidade e curso vazio. Não são testes com aluno real ou cobrança real.
- Navegação de leitura na produção autenticada confirmou conteúdo misto no Workspace antes da alteração. A conta do fundador não foi usada para criar evidências de aprendizagem, testar pagamentos ou emitir certificados.
- Inventário de textos estáticos: 1.302 mensagens registradas e 2.407 candidatos antes; 1.462 registradas e 2.302 candidatos depois. Não mede toda a plataforma nem qualidade linguística. Conteúdo dinâmico, aulas, APIs e downloads exigem inventários próprios.

## Checklist mensurável

Cada linha é um critério com peso igual apenas para contagem. A porcentagem não estima esforço restante, qualidade global ou percentual de software por construir. Um critério sem comprovação conta como pendente, não como falha demonstrada. A compatibilidade de URLs só pode ser encerrada após conferir os redirects na implantação publicada. Os demais oito critérios técnicos abaixo têm evidência local ou da produção existente; revalidar a publicação final.

| ID | Critério | Evidência / condição de encerramento |
|---|---|---|
| 01 | Produção implantada | Deployment READY no projeto e equipe corretos; conferir o commit final |
| 02 | Rotas públicas canônicas disponíveis | HTTP 200 em home, países, comparação, catálogo, preços e políticas |
| 03 | Compatibilidade das URLs antigas | Conferir 308 e destino correto, incluindo query string e subrota de aula |
| 04 | Barreiras anônimas básicas | APIs privadas retornam 401 e private/no-store |
| 05 | Checkout concorrente em testes automatizados | Suíte aprovada com providers controlados; não equivale ao Stripe Test |
| 06 | Eventos de cobrança concorrentes em testes automatizados | Suíte aprovada com persistência controlada; não equivale a webhook real |
| 07 | Qualidade técnica da revisão | TypeScript, suíte, lint sem erros e build da revisão final |
| 08 | Controles alterados do curso nos seis idiomas | Renderização real do componente com fixtures; progresso e destinos preservados |
| 09 | Apresentação principal alterada do Workspace nos seis idiomas | Renderização do componente e comandos; não certifica todos os módulos aninhados |
| 10 | Cadastro, login e recuperação completos | Pendente: conta descartável e caixa de entrada de teste |
| 11 | Regras implantadas e isolamento de duas contas | Pendente: ruleset completo e acessos diretos negados entre contas |
| 12 | Objetivo e comparação após novo login | Pendente: salvar, sair, entrar e retomar em conta controlada |
| 13 | Ciclo financeiro Stripe Test completo | Pendente: compra, renovação, falha, cancelamento, portal e revogação |
| 14 | Curso Inglês Global até certificado público | Pendente: aluno legítimo, avaliações, PDF, QR e consulta pública |
| 15 | Dez cursos: aluno e revisor distintos | Pendente: envio, revisão qualificada, recuperação e emissão no backend real |
| 16 | Validação pedagógica dos dez cursos | Pendente: revisão independente e tempo medido com tarefas representativas |
| 17 | Localização integral da plataforma | Pendente: textos restantes, currículos, APIs, materiais e revisão linguística |
| 18 | Atlas com geração real e avaliação | Pendente: serviço, créditos, retenção, limites e respostas avaliadas |
| 19 | Manutenção da comunidade recuperada | Pendente: verificar execuções atuais e jobs retidos; erros históricos não provam falha atual |
| 20 | E-mail de notificações com entrega verificada | Pendente: provedor, domínio remetente, worker e eventos de entrega |
| 21 | Operação de suporte e políticas revisadas | Pendente: recebimento, atendimento, cancelamento e política compatível com operação real |
| 22 | Mobile físico e acessibilidade da jornada | Pendente: teclado virtual, foco, leitores de tela e fluxos completos |
| 23 | Performance medida | Pendente: métricas de páginas e jornadas, sem notas inventadas |
| 24 | Ciclo operacional dos dados | Pendente: restauração de backup e exclusão/retencão entre produtos |

Após o encerramento dos nove critérios técnicos da revisão, a contagem é 9/24 encerrados (37,5%) e 15/24 pendentes (62,5%). Antes disso, usar a contagem real dos testes executados. Não divulgar esta contagem como “62,5% do site está faltando”.

## Continuidade necessária

Os critérios 10–24 não podem ser marcados aprovados por build ou autorização de publicação. Usar contas controladas, Stripe Test, revisor independente e serviços reais. A sessão disponível do fundador serve para inspeção, não como aluno sintético. Não alterar notas, afrouxar gates, ativar IA sem validação ou simular entrega de e-mail para reduzir artificialmente a contagem.

Rollback de interface: retornar ao commit anterior. Se houver rollback além desta revisão e atravessando as alterações de cobrança do PR #88, reconciliar o estado canônico com Stripe antes de confiar no espelho legado de Clerk. Preservar chaves e registros existentes.

# TGPI Home V4 — auditoria e entrega

Data: 19 de outubro de 2026. Base auditada: `2a949fcad05e8edfcbed41d0dc09d2121aad6a02`, branch `fix-deploy-hoje`. Implementação em `feat/home-editorial-v4`, PR #71. Produção não foi alterada.

## Diagnóstico com evidências

Não classificamos hipóteses visuais como bugs reproduzidos. A Home anterior tinha onze blocos, um hero com uma simulação chamada “Live product preview” e métricas decorativas (`HomeHeroV3.tsx`, `src/data/home-system.ts`). A simplificação da narrativa, o contraste, as fotografias e a hierarquia são decisões de produto e design, não defeitos funcionais presumidos.

Inconsistências confirmadas no código:

| Evidência | Comportamento real | Correção |
| --- | --- | --- |
| `src/app/pricing/page.tsx`, `src/lib/subscription-plans.ts` | Anunciavam 1 comparação / 3 países grátis e uso ilimitado Premium. | Texto agora acompanha as permissões existentes. Não alteramos o controle de acesso para forçar a oferta antiga. |
| `src/app/compare/page.tsx`, `CompareCountryPicker.tsx` | Comparação pública com até 3 países de cada vez, sem contador de uso por plano. | Demonstração e tabela da Home usam esse limite. |
| `src/lib/onboarding.ts`, `api/intelligence/plan/route.ts` | Lista de interesse limitada a 5 para qualquer conta. | A Home distingue a lista de interesse de favoritos e não promete países ilimitados. |
| `src/lib/activation-progress.ts` | Histórico limitado a 4 comparações; favoritos limitados a 8, sem distinção de plano. | A Home não promete histórico ou favoritos ilimitados. |
| Rotas de lições e APIs de aprendizagem | Exigem autenticação; não encontramos bloqueio Premium nessas rotas atuais. | Não anunciamos a biblioteca atual como exclusiva do Premium. |
| `src/app/premium/page.tsx` → `requirePremium()` | Premium Command Center possui autorização no servidor. | É o diferencial pago apresentado. |
| `src/app/sign-up/[[...sign-up]]/page.tsx` | Redirecionava sempre a `/welcome`; cadastro complementar sempre seguia para onboarding. | Intenção local validada segue por signup → welcome → destino escolhido, mantendo o cadastro complementar. |
| `src/app/country-fit/page.tsx` | Um contexto salvo tinha precedência sobre o objetivo explícito da URL. | O objetivo válido pedido pela URL prevalece, preservando os outros campos salvos; gravação continua explícita. |

Os dois últimos itens são defeitos de fluxo demonstrados por leitura das ramificações e cobertos por testes de retorno/validação. Não simulamos conclusão de cadastro com uma conta real.

## Destinos e acesso

| Recurso | Destino | Acesso atual |
| --- | --- | --- |
| Cadastro | `/sign-up?next=%2Fonboarding` | Público; Clerk; depois perfil complementar. |
| Workspace | `/profile`; `/dashboard` redireciona para `/profile` | Conta autenticada. |
| Country Fit | `/country-fit` | Pesquisa pública; salvar requer conta. É um plano de pesquisa, não um ranking ou probabilidade de sucesso. |
| Compare | `/compare?country=portugal&country=canada&goal=study` | Público, até 3 países por comparação. |
| Preparação | `/passport` | Experiência pública e experiência de membro. |
| Aprendizagem | `/courses` | Catálogo/visão geral públicos; lições e progresso exigem conta. |
| Oferta Premium | `/pricing#membership` | Público; o botão existente verifica a assinatura antes de checkout. |
| Premium | `/premium` | `requirePremium()`; assinatura válida ou acesso controlado de fundador/Preview existente. |

Não mudamos o header, o rodapé, o brasão aprovado nem as regras de autenticação/autorização. A Home mantém inglês e `html lang="en"`; não foi criada uma segunda infraestrutura de tradução.

## Oferta e cobrança

A configuração comercial do repositório (`subscription-plans.ts` e `docs/TGPI_PREMIUM_ACCESS_V1.md`) define **US$ 19.90/mês**. Não lemos chaves secretas nem criamos clientes, sessões de checkout, assinaturas ou cobranças para testar.

O Price ativo da Stripe não foi consultado nesta sessão. Antes de qualquer checkout futuro, a nova validação somente de leitura exige preço ativo, USD, 1990 centavos, intervalo mensal e contagem 1; divergências interrompem o fluxo antes da criação de cliente ou sessão. Esse bloqueio não substitui a conferência comercial do ambiente antes de produção.

O gerenciamento usa o portal Stripe existente, criado somente para a referência de cliente da conta autenticada. A Home informa renovação mensal, cancelamento, confirmação dos termos no checkout e possível conversão bancária. Não promete prazo gratuito ou política de reembolso diferente da publicada.

## Cursos e certificados

Os três destaques possuem `status: available` no catálogo e módulos/lições reais no registro de cursos:

- `global-english-2026`: Global English: Live, Work & Belong Abroad, 18 lições / 6h10 no catálogo.
- `country-fit`: Country Fit: Choose Where You Can Thrive, 3 lições / 1h.
- `relocation-budget`: Move Abroad: Build Your Financial Runway, 3 lições / 1h.

O fluxo verificado no servidor está implementado para Global English (`learning-records.server.ts`); exige progresso, avaliações/gates, capstone, reflexão, identidade/email e consentimento para o registro público, além de armazenamento/assinatura configurados. O descriptor do curso ainda marca o certificado como `preview`. Os cursos curtos registram aprendizagem, mas **não emitem certificado profissional**. A Home usa linguagem condicional e não sugere que todo curso emite certificado. A verificação pública existente e a geração de PDF foram preservadas.

## Persistência

- Objetivo, orçamento, idiomas, prazo e países de interesse: `unsafeMetadata.tgpiOnboarding` no Clerk, por APIs autenticadas de onboarding/plano. Não significam autorização Premium.
- Worksheet ativa: `unsafeMetadata.tgpiResearchWorksheet`; gravação explícita.
- Histórico, favoritos, posição de lição e tarefas: `privateMetadata.tgpiActivationV1`, por API no servidor; o cliente sincroniza alterações.
- Resultados de avaliações e credenciais: Firestore, com transações e serviço de backend; assinatura/verificação próprias.
- Seleção temporária do Compare: `tgpi-country-comparison:v1` no localStorage; o histórico de membro é salvo separadamente.
- Home sem seletor fictício: os links de exemplo levam objetivo e país pela URL; nenhuma visita à Home altera silenciosamente o plano.

## Implementação e imagens

Oito blocos: hero, três passos, exemplo real de comparação, quatro capacidades, três cursos, acesso/planos, instituição/FAQ e CTA final compacto. A demonstração usa o **mesmo `EvidenceCard`** do Compare e o snapshot versionado de 02/09/2026, identificado com data e alertas de atualização. O plano do hero é produzido pela mesma função de Country Fit. Não há notas de fit inventadas, interfaces rasterizadas ou dados privados.

A Home é majoritariamente Server Components; apenas os CTAs de conta usam `useAuth`. Mantém um H1, FAQ nativo com `details/summary` e dados estruturados com as mesmas respostas visíveis. A navegação recente e o footer permanecem intactos. O CTA final é compacto para evitar dois grandes banners consecutivos.

Sete imagens geradas para esta entrega, com 14 arquivos WebP desktop/mobile, em `public/images/home/editorial-v4/`. Não usamos banco de imagens. Não declaramos exclusividade jurídica. Originais gerados em 1536×1024; não houve ampliação artificial. Hero desktop: 69.304 bytes; mobile: 39.020 bytes. Veja `IMAGERY.md`.

## Verificações e limites

- `npm run build`: aprovado, incluindo os testes de prebuild; Home é estática.
- `npm run typecheck`: aprovado.
- `npm run lint`: zero erros; permanece um warning pré-existente em `src/lib/authGuard.ts` sobre navegação por `window.location.assign`.
- `test:home`: 7 testes aprovados (retorno seguro, consentimento/GPC, rotas, assets, semântica e contrato de Price).
- `test:navigation-system`: 7 aprovados.
- `test:notifications`: 10 aprovados.
- `test:certificate-pdf`: 8 aprovados.
- Corrigidos quatro erros de lint anteriores: nomes de variáveis `module` em três testes e apóstrofo não escapado no componente de credencial. Sem alteração funcional nesses componentes.
- 360, 390, 430, 768, 1024, 1440 e 1920 px: sem overflow horizontal, cortes detectados ou imagens visíveis quebradas no harness visual, com um H1 em cada largura. Ver `evidence/visual-qa.json`.
- Axe sobre o conteúdo `main`, WCAG 2 A/AA e 2.1 AA: zero violações automatizadas. Não equivale a auditoria humana integral.
- FAQ abre por controle nativo; foco visível e estilos reduced-motion implementados. Ampliação de texto de 200% em 720 px não gerou overflow. Não substitui testes de zoom nativo em todos os navegadores.

A inspeção visual automatizada usa o HTML compilado, assets reais e movimentação nativa das respostas SSR, sem executar os bundles de aplicação, para não depender de credenciais. Não é um teste de autenticação. `evidence/desktop.webp` e `mobile.webp` vêm desse harness; `preview-desktop.jpg` e `preview-membership.jpg` mostram a prévia hospedada com hidratação real. A prévia Vercel READY também foi aberta num navegador real com hidratação: Home e CTA de cadastro carregaram; o CTA secundário abriu Compare com Portugal, Canadá e objetivo study. O menu Apps abriu/fechou e o FAQ respondeu a clique e teclado (Space). Não houve erros da aplicação observados na Home; havia aviso de chave Clerk de desenvolvimento (esperado em Preview), aviso já existente de CSS estrutural do Clerk e erro de extensão do navegador, não do site.

Pendências explícitas antes de produção:

1. Validar conta gratuita/Premium real, conclusão de cadastro e retorno, persistência real de plano e emissão de certificado em ambiente de teste autorizado. Não foram criadas contas nem usadas credenciais do usuário.
2. Conferir o Price ativo da Stripe em modo adequado, sem criar uma assinatura neste teste.
3. Obter medição completa de LCP, CLS e INP em navegador e dados de campo suficientes para p75. Não há evidência para afirmar as metas ≤2,5s / ≤0,1 / ≤200ms. O laboratório HTTP em `evidence/http-performance.json` recebeu HTTP 200 e cache HIT nas três amostras: cabeçalhos em 4.486 / 4.510 / 4.586 ms e HTML de 166.139 bytes, incluindo a rede, TLS e proxy desta sessão. Esses tempos não isolam o servidor nem medem LCP/CLS/INP.
4. Analytics opcional está implementado e **desativado por padrão**. Ativar `TGPI_FUNNEL_ANALYTICS_ENABLED=true` só com a política operacional de coleta/retenção definida; a preferência explícita fica em `/cookies`. Eventos não contêm IDs, emails, países, objetivos ou dados de pagamento. Logs agregados não fornecem assinantes únicos, MRR ou atribuição de CAC.

## Revisão

Prévia: https://tgpi-next-f8qz35n21-rwnanmatheus-ship-its-projects.vercel.app/

PR: https://github.com/rwnanmatheus-ship-it/tgpi-next/pull/71

A prévia mantém a proteção de acesso do projeto. O proprietário pode abrir com sua sessão Vercel. Nenhuma proteção foi removida. Produção exige autorização explícita separada.

# Manutenção do repositório TGPI

## Arquitetura e contratos

| Área | Onde começar | Contratos a preservar |
| --- | --- | --- |
| Identidade e dados | `src/proxy.ts`, `src/lib/auth`, `src/app/api/account-*`, `src/app/api/member*` | Sessão Clerk, autorização por recurso, perfis privados e exportação autenticada |
| Aprendizado e credenciais | `src/app/courses`, `src/app/api/learning`, `src/app/api/credentials`, `src/lib/learning-records.server.ts` | IDs e versões dos cursos, progresso persistido, emissão, revogação, verificação e compartilhamento |
| Premium | `src/app/api/stripe`, `src/app/api/billing`, `src/lib/billing.server.ts` | Propriedade da sessão, assinatura de webhook, idempotência e concessão do plano no servidor |
| Atlas, comunidade e plano | `src/app/api/atlas`, `src/app/api/community`, `src/app/api/plan` | Histórico por usuário, anexos privados, moderação, preferências e limites de custo |
| Fundação | `next.config.ts`, `public/sw.js`, `src/lib/localization`, `vercel.json` | URLs e redirecionamentos, SEO, separação de cache público e privado, idiomas e rotinas agendadas |

O proxy disponibiliza o contexto da sessão Clerk. Os layouts e handlers protegidos devem conferir autenticação, propriedade e permissões. O Firestore tem consumidores no cliente e no servidor. Para mudanças nas regras, inventarie ambos e valide a configuração ativa em um ambiente isolado.

## Ordem de execução

| Prioridade | Ação | Evidência de conclusão |
| --- | --- | --- |
| P0 | Verificar proteção de `fix-deploy-hoje`, status obrigatório do job `quality`, Dependabot, detecção de segredos e push protection. Configurar regras para impedir force push e exclusão da branch de produção. | Estado dos controles confirmado por administrador, PR de validação com checks executados e plano de recuperação testado. Preservar fluxo viável para manutenção por uma pessoa. |
| P0 | Revisar regras efetivas de Firestore e Storage, IAM de contas de serviço e escopos por ambiente na Vercel. | Exportação segura das políticas e testes com contas fictícias para visitante, proprietário, outro usuário e administrador. Exercitar os caminhos legados em uso. |
| P1 | Avaliar a visibilidade do repositório e a classificação de código, documentação e material didático. | Decisão registrada com impacto nos forks, plano do GitHub, acesso da integração Vercel e recuperação. Se aprovada a migração, validar preview e produção antes de concluir. |
| P1 | Inventariar branches por ancestralidade, PR, atividade, dependência de deploy e trabalho único. | Inventário revisável com as branches já integradas, ativas ou que exigem retenção, e referência recuperável para remoções autorizadas. |
| P2 | Consolidar documentação vigente e movimentar código por domínio conforme as áreas forem evoluindo. | Índice atualizado, links resolvidos, imports verificados e compatibilidade demonstrada com dados anteriores e URLs publicadas. |

A configuração local de um workflow prepara a execução no Actions. Confirme a execução da checagem no PR e sua obrigatoriedade no GitHub antes de registrar a proteção como ativa. Consulte [rulesets do GitHub](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets), [segurança no GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions) e o [checklist de segurança do Firebase](https://firebase.google.com/support/guides/security-checklist).

## Dependências transitivas

O SDK Firebase está fixado em `12.18.0`: a resolução testada com
`12.19.0` instalava duas cópias de `@firebase/app` e impedia o registro do
Firestore na instância inicializada pelo SDK. Execute
`node --test scripts/firebase-sdk.test.mjs` antes de atualizar essa família
de pacotes. O teste usa apenas uma configuração sintética em memória.

Os overrides em `package.json` são restritos aos consumidores que precisam
das versões corrigidas de `@grpc/grpc-js` e `minimatch`. Revise-os quando
Firestore e typescript-eslint adotarem versões corrigidas em seus próprios
manifestos. Ao remover um override, confirme a versão resolvida, rode
`npm audit` e valide os testes e o build.

## Prompt mestre para copiar

```text
Você mantém rwnanmatheus-ship-it/tgpi-next, aplicação Next.js App Router,
TypeScript, Tailwind, Clerk, Firebase, Stripe e Vercel. O objetivo é reduzir
risco e complexidade enquanto preserva caminhos públicos, dados gravados,
aprendizado, credenciais verificáveis e assinatura Premium.

Entrada: [objetivo da rodada], [áreas afetadas], [ambiente autorizado],
[restrições de rollout]. Confirme o ref atual, o último SHA em produção e
o vínculo entre GitHub e Vercel. Leia AGENTS.md, README.md, SECURITY.md,
package.json, .github/workflows e os contratos do domínio antes de editar.
Consulte a documentação da versão instalada no caso de mudanças no Next.js.

1. Faça um inventário dos entrypoints, módulos, integrações, arquivos
   gerados, owners reais e dados que atravessam as fronteiras cliente,
   servidor e terceiros. Registre evidências por caminho e commit. Verifique
   regras e estados administrativos usando metadados. Remova credenciais,
   payloads pessoais, documentos de alunos e dados de pagamento dos logs,
   screenshots, artefatos, saídas de comandos e descrições de PR.
2. Priorize com base em impacto e evidência. Trate primeiro exposição de
   segredos, controle de acesso, perda de dados e estados incorretos de
   cobrança ou certificação. Para cada mudança indique entrada afetada,
   impacto, dependência, risco de regressão e verificação. Diferencie
   confirmação no código, configuração ativa e comportamento observado.
3. Organize por domínio usando a estrutura e os módulos existentes.
   Atravesse páginas, serviços e persistência somente onde a mudança
   exigir. Preserve imports públicos, aliases, slugs, versões de curso,
   contratos das APIs, índices, versões das credenciais, redirecionamentos
   e caminhos de mídia. Para migrar dados, planeje leitura compatível,
   escrita idempotente, reconciliação e rollback antes da execução.
4. Garanta autorização no servidor por operação e proprietário. Verifique
   sessão, escopo, validação de entrada e respostas privadas sem cache.
   Preserve assinatura e idempotência dos webhooks e crons. Separe
   credenciais de teste, preview e produção. Use valores fictícios em
   testes. Revise limites de acesso e custo dos serviços externos.
5. Governe o GitHub. Use branch de trabalho e commits revisáveis, token padrão
   com acesso mínimo, Actions de terceiros fixadas por SHA e dependências
   acompanhadas por PR. Verifique proteção da branch e acesso de bots.
   Classifique branches por ancestralidade e PR/deploy antes de sugerir
   remoções. Vincule a migração de visibilidade, alterações no histórico,
   exclusões, permissões que possam bloquear o mantenedor e rotação em
   produção a um plano aprovado e uma forma de recuperar acesso e serviço.
6. Execute npm ci, npm run typecheck e npm run build. Registre o resultado
   de lint, testes e localização executados pelo prebuild. Reproduza
   regressões com testes de sucesso e negativa, especialmente isolamento
   entre usuários, eventos repetidos e falhas de provedor. Use dados
   sintéticos e preview com credenciais de teste.
7. Abra o PR com resumo do problema, arquivos, evidência, testes, impacto
   no deploy, eventuais migrações e rollback. Quando houver produção no
   escopo, acompanhe CI e Vercel até o SHA publicado e valide as rotas
   afetadas com smoke tests seguros. Trate destaques de CI e Vercel como
   evidência separada. Entregue links para PR, checks e deploy, indicando
   verificações pendentes e a ação concreta para cada uma.

Saída: diagnóstico com evidências, decisão e escopo, correções aplicadas,
validação e sequência de manutenção. Declare os controles administrativos
e de runtime que ainda exigem verificação. Evite adicionar dados reais de
usuários, segredos ou detalhes privados a documentos públicos.
```

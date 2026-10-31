# TGPI — validação de lançamento, 31/10/2026

## Decisão

**BLOQUEADO PARA LANÇAMENTO** segundo os critérios de aceite solicitados em 31/10. Não significa indisponibilidade geral: a produção atende aos smoke tests executados. A jornada completa ainda não tem evidência de aceite e a auditoria identificou risco de checkout concorrente no código publicado. As correções deste candidato devem permanecer em preview até validação real. Nenhuma cobrança real, migração destrutiva, campanha ou emissão de certificado na conta do fundador foi realizada.

## Base confirmada

- Repositório: rwnanmatheus-ship-it/tgpi-next; branch de produção: fix-deploy-hoje.
- Commit inicial/produção observado: 438079d227c642fb580f4da1d6f21cbca51f2466.
- Deployment ativo e candidato de rollback informado pela Vercel: dpl_3SbKS8Sgw7X5vrsvuTDPiCgM3ot9. READY não equivale a estabilidade funcional comprovada.
- Domínios oficiais associados: https://www.theglobalpolymath.com e https://theglobalpolymath.com.
- Workspace inicialmente vazio; checkout limpo, sem alterações pré-existentes.
- Next.js 16.3.4, React 19.2.4, TypeScript, Clerk, Firebase REST e Stripe 22.
- A sessão do fundador estava ativa no navegador. Foi preservada e usada somente para navegação e leitura; não substitui duas contas controladas.

## Matriz

| Área | Problema observado | Impacto | Prioridade | Correção/ação | Validação | Status |
|---|---|---|---|---|---|---|
| Checkout | Criação sem idempotency key e sem intenção persistida | Cliques simultâneos podem criar sessões/clientes distintos | P0 | Intenção transacional na árvore Firestore privada existente, chave estável, expiração de 1h, parâmetros estáveis, recusa de sessão encerrada; criação de customer idempotente | 8 testes com dependências simuladas, incluindo 20 requisições concorrentes. Stripe/Firestore reais pendentes | bloqueado |
| Webhook | Persistência em metadata Clerk, sem transação entre leitura e atualização | Concorrência pode sobrescrever estado; filtro por timestamp e ID não prova processamento exatamente uma vez | P0 | Necessita teste real de duplicatas, concorrência e eventos fora de ordem; reconciliar estado canônico com serialização durável | Inspeção apenas; não alterado neste candidato | bloqueado |
| Conta | Cadastro, recuperação, logout/reabertura e dois usuários não exercitados nesta sessão | Jornada e isolamento sem aceite | P0 | Contas controladas em Clerk de desenvolvimento e teste de recuperação com caixa de entrada acessível | Proteção HTTP anônima executada; fundador autenticado observado | não verificado |
| Objetivos | Persistência entre logout/login não exercitada em conta controlada | Retomada sem aceite | P1 | Salvar objetivo e comparação em preview, recarregar e reentrar; verificar Workspace | Comparação pública renderizada no navegador; testes locais de persistência | não verificado |
| Inglês Global | Rótulos estáticos indicam Preview ready/In build; serviço real mostra emissão segura pronta depois do carregamento | Comunicação inconsistente e certificação sem E2E | P1 | Validar 18 aulas, seis gates, capstone, reflexão e emissão pública com conta controlada; depois alinhar rótulos ao estado validado | Tela de certificação leu status real: identidade verificada, emissão pronta. Nenhuma avaliação/emissão executada | não verificado |
| Cursos profissionais | Dez cursos já publicados em acesso antecipado; validação pedagógica e revisão de projetos ainda pendentes | Não anunciar como dez cursos plenamente validados | P1 | Preservar registros e avisos; testar aluno e revisor independentes e qualificados | Inspeção de documentação e catálogo, testes sintéticos | não verificado |
| Idioma | Comparação e certificação apresentam inglês com interface em português | Controles e instruções essenciais podem ficar incompreensíveis | P1 | Este candidato traduz controles principais do comparador nos seis idiomas; tradução restante deve ser validada por jornada | TypeScript/testes locais; renderização do candidato e revisão linguística pendentes | não verificado |
| Stripe | Variáveis de produção e preview existem, mas presença não comprova valores, modo ou entrega de webhooks; BILLING_ENABLED ausente no preview geral | Ciclo financeiro ainda não testado | P0 | Confirmar chaves test e preço USD 1990 mensal, habilitar cobrança apenas no preview de teste e executar ciclo financeiro sem dinheiro real | Metadados consultados sem descriptografar valores; nenhuma transação Stripe executada | bloqueado |
| Termos/suporte | Políticas existem e suporte usa mailto; recebimento e revisão jurídica não comprovados | Confiança e resolução de problemas sem aceite | P1 | Validar caixa de suporte e revisão dos dados institucionais/políticas | Inspeção de links e código; não foi enviado e-mail | não verificado |
| Firestore/Storage | Não há regras implantadas exportadas no checkout; flags de confirmação existem | Regras completas e isolamento direto não comprovados | P0 | Inspecionar ruleset implantado e testar duas contas, inclusive requests diretos | Inspeção de código e metadados somente | não verificado |
| HTTP/produção | Nenhuma falha nos 10 smoke checks | Páginas e barreiras anônimas respondem | P1 | Manter e repetir no candidato | Script verify-premium executado no domínio oficial | validado |
| Observabilidade | Nenhum erro de runtime retornado na janela de 24h | Não comprova caminhos não exercitados | P1 | Reconsultar após teste do candidato | Vercel runtime errors 24h e logs 1h | validado |
| Testes existentes | Quatro falhas por mocks/asserções desatualizadas | Suíte completa não executava limpa | P1 | Atualizar mock de histórico, aceitar cron independente e label localizado sem alterar comportamento do produto | 376 testes passaram após correções | corrigido e validado |
| Visual | Sem overflow horizontal na certificação a 390px na medição executada | Evidência limitada a uma página | P2 | Ampliar teste responsivo e teclado nas jornadas controladas | DOM: viewport 390, document 375; viewport restaurado | validado |

## Alterações e limites do checkout

A intenção fica em tgpiLearningUsers/{uid}/billing/checkout, dentro da árvore que a arquitetura existente trata como exclusiva do servidor. É obrigatório conferir o ruleset completo implantado antes da promoção. O servidor reserva uma intenção por usuário em transação; pedidos repetidos compartilham ID, parâmetros e expiração absoluta. Falhas ambíguas não liberam a intenção. Stripe recebe uma chave de idempotência para customer e outra para sessão. Um replay consulta o estado atual da sessão antes de retornar sua URL.

Uma sessão cancelada no navegador permanece reutilizável até expirar. Uma sessão concluída não retorna URL; o usuário consulta cobrança. Mudança de origem, customer ou oferta durante a intenção aberta é recusada. Se Stripe não tiver recebido a primeira chamada e a repetição ocorrer quando faltam menos de 30 minutos para expirar, a API pode recusar criação; aguardar a expiração é o comportamento seguro desta primeira correção. O comportamento precisa ser exercitado no modo test. Nenhum redirecionamento concede Premium.

## Curso inicial proposto

Inglês Global: viva, trabalhe e sinta-se em casa no exterior, versão 2.0.0, 18 aulas, seis módulos, estimativa editorial 6h10. Política inspecionada: checkpoints das aulas, seis avaliações de módulo (75%), capstone (80%), reflexão e identidade verificada; nota agregada mínima 80. Emissão depende de validação no servidor, registro persistido e assinatura. Esta descrição é inspeção do contrato, não aprovação da certificação real. O teste obrigatório de emissão, PDF/QR e consulta pública permanece pendente. Não há alegação de acreditação acadêmica.

## Oferta observada

Free: perfis de países, comparação de até três destinos, plano de pesquisa, até cinco países de interesse, aprendizagem e progresso. Premium anunciado: US$19,90/mês em USD; Centro de Comando protegido, visão integrada e gerenciamento de cobrança. O site informa que Premium não aumenta os limites atuais de comparação/lista. Política de servidor inspecionada: active/trialing concede; past_due/unpaid/paused/incomplete não concede; cancelamento ao fim do período conserva acesso enquanto active. Não foi testada renovação, falha, cancelamento nem portal no Stripe test. Atlas não recebeu aceite de oferta nesta sessão.

## Verificações executadas

- npm ci --ignore-scripts: concluído.
- npm run typecheck: passou.
- npm run lint: passou (avisos de tamanho Babel, sem erro).
- node --experimental-strip-types --test scripts/*.test.mjs: 376 passaram, zero falhas, zero pulados. Dependências financeiras e persistência simuladas nos testes novos; não são E2E.
- npm run build: passou também após as traduções e a inclusão dos testes de billing no prebuild.
- node scripts/verify-premium-command-center.mjs https://www.theglobalpolymath.com: 10 contratos HTTP passaram e contratos estruturais passaram. Proteção de /premium, /profile/security e aula; páginas de curso, comparação, país e catálogo; APIs /api/progress e /api/billing/status retornaram 401 e private/no-store.
- Navegador real: home com sessão existente, comparação Portugal/Canadá, catálogo, curso Inglês Global e tela de certificação. Sem mutações na conta do fundador.
- Não executados: cadastro, recuperação, logout/login, troca de contas, objetivo persistido real, avaliações completas, certificado real, isolamento direto de duas contas, pagamento/renovação/falha/cancelamento, erro de rede e sessão expirada.

## Próximo aceite necessário

Usar duas contas controladas em Clerk de desenvolvimento e, para cursos profissionais, revisor administrativo independente. Confirmar Stripe test/price/webhook e habilitar BILLING_ENABLED somente nesse preview. Disponibilizar as regras implantadas para inspeção. Executar a matriz completa, corrigir o webhook e as falhas observadas antes de promover. A ausência dessas evidências não foi tratada como autorização para reduzir controles ou validar artificialmente um certificado.

## Publicação

Somente branch e preview estão previstos neste incremento. Produção permanece no commit inicial enquanto houver os bloqueadores descritos. Não há testes pós-publicação de uma nova produção porque ela não foi promovida. O commit/deployment do candidato e o resultado final do build serão registrados após a criação.

## Continuação — candidato de cobrança e publicação independente

A solicitação seguinte autorizou concluir e publicar todas as atualizações possíveis. O candidato financeiro agora usa um registro canônico transacional em `tgpiLearningUsers/{uid}/billing/subscription` e recibos de eventos em `billingEvents`. Os contratos públicos permanecem SubscriptionRecord v1. Registros anteriores do Clerk são preservados e servem de fallback somente enquanto o documento canônico não existir; falhas de leitura não acionam fallback. Autorização Premium, Workspace, configurações, status e notificações consultam o mesmo serviço. Atualizações atrasadas do espelho no Clerk não concedem acesso. Cada tentativa transacional relê assinaturas atuais no Stripe e grava estado e recibo juntos. Eventos antigos não restauram snapshots antigos, e uma exclusão antiga não cancela uma assinatura nova ativa. Clientes excluídos e preços divergentes revogam acesso. Histórico truncado ou proprietário divergente falham sem conceder benefícios.

Dez testes adicionais exercitam concorrência otimista com repetição, 20 entregas simultâneas, eventos antigos e com o mesmo segundo, espelho atrasado, falhas de persistência/Clerk, mudança de preço, inadimplência e exclusão de customer. Total local: 386 testes aprovados. São testes com provider e armazenamento simulados, não Stripe test real. A migração lógica de autoridade requer aceite real em preview e revisão das regras implantadas antes da produção. Não é migração destrutiva nem alteração de preço. Metadados Clerk antigos permanecem disponíveis para rollback, mas um rollback depois de eventos novos exige reconciliar o estado Stripe; não confiar cegamente no espelho.

O preview anterior apresentou sessão autenticada em modo de desenvolvimento, com perfil inicial sem dados pessoais. Foi executada a comparação Portugal/Canadá: Workspace passou a exibir dois países e uma comparação salva. Isto comprova integração básica de comparação/Workspace nessa sessão; ainda não comprova isolamento entre contas ou persistência após novo login.

A publicação independente deve conter somente controles/traduções de comparação e ajustes de testes já validados; não levar as alterações financeiras sem aceite. Ela não aprova o lançamento completo nem oculta o P0 do webhook ainda em produção. O novo candidato financeiro deve continuar separado no PR #88.

Fontes técnicas consultadas: https://docs.stripe.com/webhooks (ordem e repetição de eventos), https://firebase.google.com/docs/firestore/transaction-data-contention (isolamento serializável) e documentação empacotada do Next.js 16.3.4.

Nesta continuação, o build padrão local encontrou falha de persistência do cache Turbopack. O diretório gerado foi preservado em scratch e o build limpo avançou até uma falha interna do next/font/google/Turbopack (import map). Sem alterar fontes ou dependências do produto, foi iniciado também o build oficial com `npm run build -- --webpack`. O resultado remoto padrão deve ser confirmado antes de qualquer promoção; não atribuir essa falha a TypeScript nem omiti-la.

# Publicação independente — comparação — 31/10/2026

Escopo: traduzir controles centrais da comparação em seis idiomas e corrigir quatro mocks/asserções de testes desatualizados. Seleção, comparação, persistência, autenticação, cursos, certificados, planos, cobrança, webhooks e regras permanecem com o código anterior de produção. A tradução completa do sistema não é afirmada.

Validação local deste recorte: 368 testes passaram; TypeScript e lint passaram. A implementação foi visualizada no preview 4a80d4f e uma comparação autenticada Portugal/Canadá apareceu no Workspace (duas entradas de países, uma comparação). A sessão local foi interrompida depois; isolamento entre contas e retomada após logout ainda não foram testados. O build padrão e os testes HTTP do deployment deste recorte são condições para promover.

As alterações financeiras e sua migração lógica de autoridade permanecem somente no PR #88. Não fazem parte deste recorte. O risco de concorrência do webhook na versão antiga continua sendo bloqueador do lançamento comercial; esta publicação não o corrige nem declara a jornada completa apta. A certificação real e o ciclo Stripe test ainda precisam de aceite.

Rollback: commit de origem 438079d227c642fb580f4da1d6f21cbca51f2466, deployment dpl_3SbKS8Sgw7X5vrsvuTDPiCgM3ot9. Não há migração de dados neste recorte.

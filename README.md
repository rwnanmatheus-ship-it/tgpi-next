# TGPI — The Global Polymath Institute

Aplicação da TGPI para comparar países, criar um plano internacional, estudar e emitir credenciais verificáveis. [Site oficial](https://www.theglobalpolymath.com)

## Desenvolvimento local

Use Node.js 24 e npm, aprovados no workflow Platform foundation. Consulte [.env.example](.env.example) para identificar as variáveis utilizadas e configure somente as integrações necessárias em um `.env.local` ignorado pelo Git. Use credenciais e projetos de teste no desenvolvimento.

```bash
npm ci
npm run dev
```

Abra [localhost:3000](http://localhost:3000). Para validar uma alteração antes de abrir o PR, execute:

```bash
npm run typecheck
npm run build
```

`prebuild` executa lint, a suíte de testes e a verificação de localização. O npm também executa essa etapa automaticamente antes de `npm run build`.

## Mapa do repositório

| Caminho | Responsabilidade |
| --- | --- |
| [src/app](src/app) | Rotas, páginas e handlers do App Router |
| [src/components](src/components) | Componentes de produto e interfaces compartilhadas |
| [src/lib](src/lib) | Serviços, contratos e integrações, incluindo módulos exclusivos de servidor |
| [src/data](src/data) | Catálogos e conteúdo versionado |
| [src/core](src/core), [src/modules](src/modules) | Módulos transversais e áreas de produto existentes |
| [src/hooks](src/hooks), [src/styles](src/styles), [src/types](src/types) | Hooks, estilos e tipos compartilhados |
| [public](public) | Recursos servidos diretamente, incluindo mídia e PWA |
| [scripts](scripts) | Testes, auditorias, geração e verificações operacionais |
| [.github/workflows](.github/workflows) | Verificações de qualidade e monitores do site |
| [docs](docs) | Referências de engenharia, produto, localização e histórico de releases |

## Manutenção e segurança

Abra PRs pequenos com evidências de teste e descrição do impacto. A branch `fix-deploy-hoje` está ligada à produção na Vercel. Use o [guia de manutenção e prompt mestre](docs/engineering/repository-maintenance.md) para planejar mudanças e a [política de segurança](SECURITY.md) para relatar vulnerabilidades de forma privada.

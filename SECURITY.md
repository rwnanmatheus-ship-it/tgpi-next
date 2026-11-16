# Segurança

Comunique possíveis vulnerabilidades à TGPI em [contact@theglobalpolymath.com](mailto:contact@theglobalpolymath.com), com o assunto “Relato de segurança TGPI”. Inclua o recurso afetado, a versão ou o commit quando disponível, o impacto observado e evidências com dados fictícios ou ocultados. Mantenha credenciais, dados pessoais e detalhes sensíveis fora de issues e pull requests públicos.

A investigação prioriza a versão em produção de [theglobalpolymath.com](https://www.theglobalpolymath.com). Se houver suspeita de exposição de uma credencial, a equipe deve revogá-la ou rotacioná-la no serviço de origem, revisar os acessos e validar as integrações afetadas. A remoção do arquivo no Git integra a contenção junto com a avaliação do histórico, forks, artefatos de CI e caches.

O [guia de manutenção](docs/engineering/repository-maintenance.md) cobre mudanças defensivas no código, governança de repositório e critérios para validar a operação.

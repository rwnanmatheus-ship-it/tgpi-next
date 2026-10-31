# Professional Learning — candidato funcional

Os dez cursos têm oito aulas, diagnóstico reflexivo, práticas, questionário de aplicação, projeto com rubrica e recuperação. A versão 1.0.0 estima 8 horas por curso: 80 minutos de estudo, 240 de prática, 40 de avaliação e 120 de projeto. São estimativas editoriais da primeira edição de fundamentos aplicados, não horas medidas ou as faixas de planejamento originais. Precisam ser revistas após tarefas representativas com alunos.

O candidato implementa matrícula e registros privados por usuário/versão, revisão humana independente por administrador que atesta competência temática, áudio consentido em inglês, arquivos privados criptografados, contestação, emissão idempotente, compartilhamento opcional e revogação/substituição auditada. XLSX, PBIX e PY são exigidos nos respectivos projetos; presença ou assinatura de formato não validam competência. Arquivos não são executados no servidor.

Acesso dos novos cursos segue o acesso gratuito com conta já oferecido pelo plano Free, sem alteração de preço ou contrato. Produção permanece com allowlist vazia até a validação completa. Preview disponibiliza o candidato. Idioma de instrução e certificado: português; exemplos em inglês são preservados.

Verificações locais: 14 testes de política/runtime com fixtures sintéticas, incluindo dez fluxos, isolamento, falha essencial, recuperação, histórico, emissão concorrente, ciclo do certificado e arquivos privados. Não são avaliação de pessoas reais. Planilhas foram recalculadas e renderizadas; PDF técnico com marca sem validade foi inspecionado. Excel/Sheets e Power BI nativos ainda requerem teste. Dataset World Bank inclui fonte, licença, data, dicionário e hash; dados sintéticos de orçamento estão identificados.

Pendências de liberação: testar matrícula, recarga, duas contas e arquivos privados no backend real; submeter projeto e revisar com conta administrativa distinta e qualificada; conferir emissão/PDF/QR/estados no ambiente real; inspeção responsiva e teclado; revisão editorial e teste pedagógico representativo dos dez cursos. Build e testes sintéticos não substituem esses critérios. Não habilitar produção sem registrá-los.

Reversão: conservar branch de produção anterior; candidato não muda matrículas ou certificados antigos e não migra/destrói coleções. Novos registros ficam em caminhos versionados de tgpiLearningUsers. A chave existente de assinatura também deriva chaves de arquivos/áudio com domínios separados: sua rotação exige estratégia de chaves antigas antes de remover o segredo anterior. Uploads limitados a seis vínculos/projeto, dez arquivos/dia/conta e 3 MB por arquivo; áudio até 600 KB e cinco/dia.

## Atualização editorial e aceite observado — 31/10/2026

Adicionados 80 laboratórios originais, um por módulo, apresentados na aula e no download. Os casos são fictícios, com entradas, resultados esperados e variações; o dataset público mantém proveniência separada. Esta ampliação não representa aprovação independente nem tempo de estudo medido.

Na sessão anterior do preview a matrícula e uma prática identificada como teste técnico persistiram após recarga; outra conta apresentou diagnóstico inicial sem o progresso da primeira. O painel de revisão retornou 404 para ambas, em concordância com requireAdmin e privateMetadata.role. Nenhuma avaliação ou emissão real foi realizada. O papel administrativo precisa ser configurado pelo responsável no Clerk de desenvolvimento utilizado pelo preview, preservando aluno e revisor distintos. Não substituir esta exigência por bypass ou autoavaliação.

## Liberação em acesso antecipado autorizada — 31/10/2026

O fundador instruiu expressamente publicar e atualizar os critérios pendentes depois. A lista de produção habilita os dez percursos como acesso antecipado, com aviso nas páginas de curso e estudo. Isto não converte evidências pendentes em aprovadas, não modifica notas, rubricas ou matrículas e não remove controles de emissão. Os 18 indicadores de liberação pedagógica não foram marcados como concluídos artificialmente. A estimativa permanece 8 horas por curso, sujeita a revisão. A reversão pode restaurar a allowlist vazia ou a implantação anterior.

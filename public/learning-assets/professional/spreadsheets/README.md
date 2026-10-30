# TGPI — planilhas de prática

`exercise.xlsx` contém três destinos fictícios e células para o aluno completar. `solution.xlsx` contém a solução editável, um gráfico ligado às fórmulas e comentários de cálculo na própria folha.

Todos os valores são sintéticos, numa única unidade monetária de exercício. Não representam preços de países nem cotações. Objetivo: separar custos iniciais, despesas recorrentes, renda, caixa e cobertura.

Na solução, altere a moradia do destino A de 900 para 1.000. O total mensal deve mudar de 1.350 para 1.450 e o déficit de 450 para 550. O caixa inicial disponível permanece em 4.800; a cobertura muda de aproximadamente 10,67 para 8,73 meses. Restaure o valor original após testar.

Teste também: renda igual à despesa (sem déficit neste modelo), renda zero e uma categoria vazia. Célula vazia deve aparecer como dado ausente; zero válido continua sendo zero. A planilha simplificada não modela inflação, impostos, rendimento da reserva, mudança cambial ou imprevistos.

As fórmulas são armazenadas em formato internacional do Excel. Conforme idioma, SUM aparece como SOMA, IF como SE, COUNT como CONT.NÚM e MAX como MÁXIMO. Os separadores de argumentos e decimais dependem da localidade. No Google Sheets, importe uma cópia do XLSX e confira cálculos e gráfico antes de trabalhar; não há garantia de preservação de todos os recursos entre versões. Os arquivos foram recalculados, testados com alterações e inspecionados visualmente no motor de geração; testes nativos no Excel/Sheets ainda precisam ser realizados.

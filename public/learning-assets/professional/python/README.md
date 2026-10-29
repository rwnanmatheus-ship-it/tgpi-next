# TGPI — automação local de despesas sintéticas

Material inicial do curso em preparação. Não usa dados pessoais, cotações reais ou serviço externo. O arquivo é um exemplo educacional original TGPI, não um dataset público empírico para o projeto de Power BI.

Requisitos: Python 3.10 ou superior, biblioteca padrão; sem dependências externas. Baixe estes cinco arquivos para uma pasta local. O código não é executado pelo servidor TGPI.

```sh
python -m unittest -v test_solution.py
python solution.py expenses.csv report.json
```

Em alguns sistemas o comando é `python3`. A saída deve equivaler a `expected.json`. O programa cria somente o caminho de saída explicitamente informado e recusa sobrescrever um arquivo existente. Uma segunda execução deve usar outro nome ou exigir arquivamento deliberado da saída anterior.

## Exercício

Antes de estudar `solution.py`, implemente um programa que valide o cabeçalho, leia o CSV com o módulo `csv`, some valores por categoria e moeda usando `Decimal` e escreva JSON em caminho separado. Defina o comportamento de arquivo ausente, valor inválido e repetição. Não faça conversão cambial.

## Solução comentada

- `DictReader` preserva o campo com vírgula entre aspas.
- O cabeçalho estrito detecta delimitador ou esquema incompatível.
- Valores aceitam ponto decimal e no máximo duas casas, sem notação exponencial ou negativos neste exercício.
- Os limites de tamanho, linhas e valor tornam o escopo explícito; não transformam o programa em executor seguro de código não confiável.
- A chave de agrupamento inclui moeda. Valores de moedas diferentes nunca são somados.
- `Decimal` mantém a aritmética decimal deste exercício, sem conversão para `float`.
- A ordenação produz resultado determinístico; o modo de criação `x` preserva arquivos existentes.

Adicione casos de teste para arquivo vazio, coluna ausente e mudança de delimitador. Não use arquivos reais de clientes, credenciais ou pastas de produção. A solução é material de prática; avaliações finais devem usar casos diferentes e revisão das evidências.

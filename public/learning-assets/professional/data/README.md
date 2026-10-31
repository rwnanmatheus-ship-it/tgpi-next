# TGPI — laboratório de análise de dados públicos

Fonte: World Bank, World Development Indicators, indicador NY.GDP.PCAP.CD (PIB per capita em US$ correntes).

URL: https://api.worldbank.org/v2/country/BRA;PRT;CAN;DEU/indicator/NY.GDP.PCAP.CD?date=2020:2023&format=json&per_page=100

Licença: Creative Commons Attribution 4.0 (CC BY 4.0), conforme política de dados abertos do Banco Mundial: https://datacatalog.worldbank.org/public-licenses . Atribua o Banco Mundial e identifique as transformações. A TGPI não representa o Banco Mundial nem recebe seu endosso.

Extração: 29/10/2026. Consulte `provenance.json` para a data de atualização da fonte e hash do JSON original. A seleção contém Brasil, Canadá, Alemanha e Portugal, anos 2020–2023, 16 observações. Transformações: seleção de países/período, nomes de colunas e ordenação. Os valores numéricos não foram alterados.

## Dicionário

| Campo | Tipo | Significado |
| --- | --- | --- |
| country_iso3 | Texto | Código ISO3 do país |
| country | Texto | Nome do país na fonte |
| year | Inteiro | Ano de referência |
| gdp_per_capita_current_usd | Decimal | PIB dividido pela população, em US$ correntes |

Chave: country_iso3 + year. Unidade da observação: um país em um ano. CSV UTF-8, vírgula entre colunas e ponto decimal. Não misture localidade de leitura com a unidade dos dados.

PIB per capita não é salário, renda disponível, custo de vida ou medida de poder de compra. Valores correntes são afetados por preços e câmbio; diferenças não comprovam causalidade nem a situação de uma pessoa. A amostra pequena serve para aprender modelagem e leitura, não para decidir onde morar. A série pode ser revisada pela fonte.

## Exercício guiado

1. No Power BI Desktop, obtenha dados de Texto/CSV. Selecione o arquivo local e confira delimitador e UTF-8. Na prévia, devem aparecer quatro colunas.
2. Abra Transformar Dados. Defina país e código como texto, ano como inteiro e PIB per capita como decimal, usando a localidade de origem para interpretar o ponto decimal.
3. Confira 16 linhas, quatro códigos e quatro anos. Agrupe temporariamente por código+ano para conferir unicidade; preserve a tabela original.
4. Use um gráfico de linhas com ano no eixo, país na legenda e um valor por país/ano. Não some PIB per capita de países como se fosse PIB mundial.
5. Acrescente uma tabela com país, ano, valor, unidade e nota de fonte. Confira uma observação no JSON original.
6. Teste os filtros de país e ano e documente o que cada visual representa. Se um visual não tem seleção única, prefira uma medida que sinalize a ambiguidade a uma soma inadequada.

## Medidas DAX de apoio

```dax
PIBSelecionado = SELECTEDVALUE(GDP[gdp_per_capita_current_usd])
PIB2020 = CALCULATE(SELECTEDVALUE(GDP[gdp_per_capita_current_usd]), GDP[year] = 2020)
PIB2023 = CALCULATE(SELECTEDVALUE(GDP[gdp_per_capita_current_usd]), GDP[year] = 2023)
Variacao2020a2023 = DIVIDE([PIB2023] - [PIB2020], [PIB2020])
```

Nomeie a tabela como `GDP`. Para as medidas por ano, selecione um país por contexto. A variação é nominal em dólares correntes, não crescimento real nem efeito de uma política. Confira o resultado com `(valor_2023 / valor_2020) - 1`. A sintaxe pode exigir ajuste de separadores conforme sua configuração.

`power-query.m` apresenta uma importação comentada. Ajuste somente o caminho local para onde salvou o CSV. O script detecta chaves duplicadas e mantém as observações originais.

Requisitos de sistema: consulte a documentação oficial antes de instalar: https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-get-the-desktop . O Desktop exige Windows compatível e versão de 64 bits. Compartilhamento em serviços online pode ter requisitos de licença adicionais; publicar na nuvem não é necessário para esta atividade.

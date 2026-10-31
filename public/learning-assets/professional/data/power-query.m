// TGPI: ajuste o caminho para o arquivo que você baixou.
// A base contém dados públicos atribuídos ao Banco Mundial; veja README.md.
let
    Source = Csv.Document(File.Contents("C:\TGPI\world-bank-gdp.csv"), [Delimiter=",", Columns=4, Encoding=65001, QuoteStyle=QuoteStyle.Csv]),
    Headers = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    // A origem usa ponto decimal, independentemente da localidade do computador.
    Typed = Table.TransformColumnTypes(Headers, {{"country_iso3", type text}, {"country", type text}, {"year", Int64.Type}, {"gdp_per_capita_current_usd", type number}}, "en-US"),
    Keys = Table.Group(Typed, {"country_iso3", "year"}, {{"rows", each Table.RowCount(_), Int64.Type}}),
    Duplicates = Table.SelectRows(Keys, each [rows] <> 1),
    // Não remove duplicações silenciosamente: exige investigação.
    Checked = if Table.RowCount(Duplicates) > 0 then error "Chave país+ano duplicada. Confira a fonte." else Typed
in
    Checked

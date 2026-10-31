"""Prepare the small, attributed World Bank teaching extract without modifying values."""
import csv
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import urlopen

url = "https://api.worldbank.org/v2/country/BRA;PRT;CAN;DEU/indicator/NY.GDP.PCAP.CD?date=2020:2023&format=json&per_page=100"
target = Path(__file__).resolve().parents[1] / "public/learning-assets/professional/data"
target.mkdir(parents=True, exist_ok=True)
with urlopen(url, timeout=20) as response:
    raw = response.read()
metadata, records = json.loads(raw)
if len(records) != 16 or metadata["total"] != 16:
    raise ValueError("Expected four countries and four years; inspect changes before publication.")
if any(row["value"] is None for row in records):
    raise ValueError("Missing observation: do not substitute zero.")
(target / "world-bank-source.json").write_bytes(raw)
with (target / "world-bank-gdp.csv").open("w", newline="", encoding="utf-8") as destination:
    writer = csv.writer(destination)
    writer.writerow(["country_iso3", "country", "year", "gdp_per_capita_current_usd"])
    for row in sorted(records, key=lambda row: (row["countryiso3code"], row["date"])):
        writer.writerow([row["countryiso3code"], row["country"]["value"], row["date"], row["value"]])
(target / "provenance.json").write_text(json.dumps({
    "publisher": "World Bank", "dataset": "World Development Indicators", "indicator": "NY.GDP.PCAP.CD",
    "sourceUrl": url, "license": "CC BY 4.0", "licenseUrl": "https://datacatalog.worldbank.org/public-licenses",
    "retrievedOn": datetime.now(timezone.utc).date().isoformat(), "sourceUpdatedOn": metadata["lastupdated"], "observations": len(records),
    "rawSha256": hashlib.sha256(raw).hexdigest(),
    "changes": "Selected four countries and years 2020–2023; renamed columns and sorted rows. Numeric observations unchanged.",
    "dictionary": {"country_iso3": "ISO3 country code; part of the row key", "country": "Country label from source", "year": "Calendar year; part of the row key", "gdp_per_capita_current_usd": "GDP per capita in current US dollars, not wages, purchasing power or living costs"},
}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Prepared 16 attributed observations; no null observations replaced.")

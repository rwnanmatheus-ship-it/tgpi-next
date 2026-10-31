"""TGPI exercise solution: local-only, standard-library CSV summarizer.

No network, subprocesses, credentials or student-code execution.
Input: UTF-8 CSV, comma delimiter, decimal point, nonnegative amounts.
Currency values are grouped, never converted or combined across currencies.
"""
from __future__ import annotations

import argparse
import csv
import json
import re
import sys
from collections import defaultdict
from decimal import Decimal, InvalidOperation
from pathlib import Path

MAX_BYTES = 1_000_000
MAX_ROWS = 10_000
MAX_AMOUNT = Decimal("1000000000.00")


def summarize(path: Path) -> dict:
    if not path.is_file() or path.stat().st_size > MAX_BYTES:
        raise ValueError("Input must be an existing CSV of at most 1 MB.")
    totals: dict[tuple[str, str], Decimal] = defaultdict(lambda: Decimal("0"))
    count = 0
    with path.open("r", encoding="utf-8-sig", newline="") as source:
        reader = csv.DictReader(source)
        if reader.fieldnames != ["category", "currency", "amount", "description"]:
            raise ValueError("Expected columns: category,currency,amount,description.")
        for line, row in enumerate(reader, start=2):
            count += 1
            if count > MAX_ROWS:
                raise ValueError("Input exceeds 10,000 rows.")
            if None in row or any(value is None for value in row.values()):
                raise ValueError(f"Line {line}: incorrect number of fields.")
            category = row["category"].strip()
            currency = row["currency"].strip()
            raw_amount = row["amount"].strip()
            if not re.fullmatch(r"[a-z][a-z0-9_-]{0,39}", category):
                raise ValueError(f"Line {line}: invalid category identifier.")
            if not re.fullmatch(r"[A-Z]{3}", currency):
                raise ValueError(f"Line {line}: currency must have three uppercase letters.")
            if not re.fullmatch(r"[0-9]{1,10}(\.[0-9]{1,2})?", raw_amount):
                raise ValueError(f"Line {line}: amount requires decimal point and at most two decimals.")
            try:
                amount = Decimal(raw_amount)
            except InvalidOperation as cause:
                raise ValueError(f"Line {line}: invalid amount.") from cause
            if not amount.is_finite() or not Decimal("0") <= amount <= MAX_AMOUNT:
                raise ValueError(f"Line {line}: amount outside supported bounds.")
            totals[(category, currency)] += amount
    if count == 0:
        raise ValueError("Input has no expense rows.")
    return {"groups": [
        {"category": category, "currency": currency, "total": f"{total:.2f}"}
        for (category, currency), total in sorted(totals.items())
    ], "rows": count}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    if args.input.resolve() == args.output.resolve():
        parser.error("Output must be different from the input.")
    try:
        result = summarize(args.input)
        # Create-only output protects existing work. Repeat with another path or
        # deliberately archive the previous output; never silently overwrite it.
        with args.output.open("x", encoding="utf-8") as destination:
            json.dump(result, destination, ensure_ascii=False, indent=2)
            destination.write("\n")
    except (OSError, UnicodeError, ValueError, csv.Error) as cause:
        print(f"Unable to create report: {cause}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

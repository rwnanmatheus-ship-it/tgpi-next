import json
import tempfile
import unittest
from pathlib import Path
from solution import summarize


class SummaryTests(unittest.TestCase):
    def test_known_synthetic_result(self):
        folder = Path(__file__).parent
        self.assertEqual(summarize(folder / "expenses.csv"), json.loads((folder / "expected.json").read_text()))

    def test_preserves_currencies_and_handles_quoted_comma(self):
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "data.csv"
            source.write_text('category,currency,amount,description\nfood,EUR,10.10,"A, B"\nfood,BRL,20.20,C\n', encoding="utf-8")
            result = summarize(source)
            self.assertEqual(result["rows"], 2)
            self.assertEqual(len(result["groups"]), 2)
            self.assertEqual(result["groups"][0]["currency"], "BRL")

    def test_rejects_invalid_or_incomplete_inputs(self):
        for amount in ["NaN", "Infinity", "-1", "1e8", "1.001", "", "1000000001"]:
            with self.subTest(amount=amount), tempfile.TemporaryDirectory() as directory:
                source = Path(directory) / "data.csv"
                source.write_text(f"category,currency,amount,description\nfood,EUR,{amount},test\n", encoding="utf-8")
                with self.assertRaises(ValueError):
                    summarize(source)


if __name__ == "__main__":
    unittest.main()

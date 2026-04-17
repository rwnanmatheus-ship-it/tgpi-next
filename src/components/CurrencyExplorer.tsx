"use client";

import { useEffect, useMemo, useState } from "react";

type CurrencyExplorerProps = {
  countryName: string;
  baseCurrency: string;
  userPreferredCurrency?: string;
  onRateLoaded?: (data: {
    rate: number | null;
    targetCurrency: string;
    date: string;
  }) => void;
};

const currencyOptions = [
  "USD",
  "BRL",
  "EUR",
  "JPY",
  "EGP",
  "GBP",
  "CAD",
  "AUD",
  "CHF",
  "CNY",
];

function formatAmount(value: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}

export default function CurrencyExplorer({
  countryName,
  baseCurrency,
  userPreferredCurrency = "USD",
  onRateLoaded,
}: CurrencyExplorerProps) {
  const [targetCurrency, setTargetCurrency] = useState(userPreferredCurrency || "USD");
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setTargetCurrency(userPreferredCurrency || "USD");
  }, [userPreferredCurrency]);

  useEffect(() => {
    async function loadRate() {
      setLoading(true);
      setError("");

      try {
        if (baseCurrency === targetCurrency) {
          const today = new Date().toISOString().slice(0, 10);
          setRate(1);
          setDate(today);
          onRateLoaded?.({ rate: 1, targetCurrency, date: today });
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://api.frankfurter.dev/v2/rates?base=${baseCurrency}&quotes=${targetCurrency}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Could not load currency data.");
        }

        const data = await response.json();
        const nextRate = data?.rates?.[targetCurrency];

        if (!nextRate) {
          throw new Error("Rate unavailable.");
        }

        const safeRate = Number(nextRate);
        const safeDate = data?.date || "";

        setRate(safeRate);
        setDate(safeDate);
        onRateLoaded?.({
          rate: safeRate,
          targetCurrency,
          date: safeDate,
        });
      } catch (err: any) {
        setError(err?.message || "Could not load exchange rate.");
        setRate(null);
        onRateLoaded?.({
          rate: null,
          targetCurrency,
          date: "",
        });
      } finally {
        setLoading(false);
      }
    }

    loadRate();
  }, [baseCurrency, targetCurrency, onRateLoaded]);

  const numericAmount = useMemo(() => {
    const parsed = Number(amount);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }, [amount]);

  const converted = rate !== null ? numericAmount * rate : 0;

  const quickExamples = useMemo(() => {
    if (rate === null) return [];
    return [1, 10, 100, 1000].map((value) => ({
      base: value,
      converted: value * rate,
    }));
  }, [rate]);

  return (
    <section className="mb-8 rounded-3xl border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8">
      <div className="mb-6">
        <h2 className="mb-2 text-3xl font-bold text-yellow-400">
          Currency Explorer
        </h2>
        <p className="max-w-3xl text-slate-300">
          Compare the {countryName} currency with your preferred currency or any
          other supported currency, and simulate practical conversions directly
          on the page.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-yellow-400">
            Live Conversion
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Country Currency
              </label>
              <input
                value={baseCurrency}
                disabled
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Convert To
              </label>
              <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                {currencyOptions.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-slate-300">
                Amount in {baseCurrency}
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
            {loading ? (
              <p className="text-slate-300">Loading exchange rate...</p>
            ) : error ? (
              <p className="text-red-300">{error}</p>
            ) : (
              <>
                <p className="mb-2 text-sm text-slate-400">
                  Latest available reference rate
                  {date ? ` • ${date}` : ""}
                </p>

                <p className="mb-3 text-lg text-slate-200">
                  1 {baseCurrency} ={" "}
                  <span className="font-bold text-yellow-400">
                    {rate?.toFixed(4)} {targetCurrency}
                  </span>
                </p>

                <p className="text-3xl font-bold text-white">
                  {formatAmount(converted, targetCurrency)}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-yellow-400">
            Quick Reference
          </h3>

          <div className="grid gap-3">
            {loading ? (
              <p className="text-slate-300">Preparing examples...</p>
            ) : error ? (
              <p className="text-red-300">Could not generate quick references.</p>
            ) : (
              quickExamples.map((item) => (
                <div
                  key={item.base}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4"
                >
                  <span className="text-slate-300">
                    {item.base} {baseCurrency}
                  </span>
                  <span className="font-semibold text-yellow-300">
                    {formatAmount(item.converted, targetCurrency)}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-yellow-700/20 bg-yellow-500/5 p-5">
            <h4 className="mb-2 font-semibold text-yellow-400">
              TGPI Insight
            </h4>
            <p className="text-sm leading-7 text-slate-300">
              This tool helps users understand everyday value, compare local
              purchasing context, and make more informed decisions for travel,
              study, relocation, and cultural preparation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
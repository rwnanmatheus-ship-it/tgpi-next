"use client";

import { useMemo, useState } from "react";

type CostItem = {
  label: string;
  amount: number;
};

type LifeSimulatorProps = {
  countryName: string;
  currencyCode: string;
  items: CostItem[];
};

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

export default function LifeSimulator({
  countryName,
  currencyCode,
  items,
}: LifeSimulatorProps) {
  const rentItem =
    items.find((item) =>
      item.label.toLowerCase().includes("shared rent estimate")
    ) ?? null;

  const transportItem =
    items.find((item) =>
      item.label.toLowerCase().includes("metro ticket") ||
      item.label.toLowerCase().includes("bus ticket")
    ) ?? null;

  const mealItem =
    items.find((item) => item.label.toLowerCase().includes("casual meal")) ??
    null;

  const mobileItem =
    items.find((item) =>
      item.label.toLowerCase().includes("monthly mobile plan")
    ) ?? null;

  const [monthlyIncome, setMonthlyIncome] = useState("3000");
  const [weeklyTransportRides, setWeeklyTransportRides] = useState("10");
  const [monthlyCasualMeals, setMonthlyCasualMeals] = useState("12");

  const simulation = useMemo(() => {
    const income = Number(monthlyIncome) || 0;
    const rides = Number(weeklyTransportRides) || 0;
    const meals = Number(monthlyCasualMeals) || 0;

    const rent = rentItem?.amount ?? 0;
    const transport = (transportItem?.amount ?? 0) * rides * 4;
    const mealsCost = (mealItem?.amount ?? 0) * meals;
    const mobile = mobileItem?.amount ?? 0;

    const estimatedMonthlyCost = rent + transport + mealsCost + mobile;
    const remaining = income - estimatedMonthlyCost;

    return {
      income,
      rent,
      transport,
      mealsCost,
      mobile,
      estimatedMonthlyCost,
      remaining,
    };
  }, [
    mealItem?.amount,
    mobileItem?.amount,
    monthlyCasualMeals,
    monthlyIncome,
    rentItem?.amount,
    transportItem?.amount,
    weeklyTransportRides,
  ]);

  const remainingTone =
    simulation.remaining >= 0 ? "text-emerald-300" : "text-red-300";

  return (
    <section className="mb-8 rounded-3xl border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8">
      <div className="mb-6">
        <h2 className="mb-2 text-3xl font-bold text-yellow-400">
          Life Simulator
        </h2>
        <p className="max-w-3xl text-slate-300">
          Simulate a basic monthly life scenario in {countryName} using local
          reference prices. This helps users estimate affordability before
          travel, study, relocation, or integration decisions.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-yellow-400">
            Simulation Inputs
          </h3>

          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Monthly Income ({currencyCode})
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Weekly Transport Rides
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={weeklyTransportRides}
                onChange={(e) => setWeeklyTransportRides(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Casual Meals Per Month
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={monthlyCasualMeals}
                onChange={(e) => setMonthlyCasualMeals(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-yellow-400">
            Estimated Monthly Scenario
          </h3>

          <div className="grid gap-3">
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-slate-300">Income</span>
              <span className="font-semibold text-white">
                {formatAmount(simulation.income, currencyCode)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-slate-300">Rent Estimate</span>
              <span className="font-semibold text-white">
                {formatAmount(simulation.rent, currencyCode)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-slate-300">Transport Estimate</span>
              <span className="font-semibold text-white">
                {formatAmount(simulation.transport, currencyCode)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-slate-300">Meals Estimate</span>
              <span className="font-semibold text-white">
                {formatAmount(simulation.mealsCost, currencyCode)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-slate-300">Mobile Plan</span>
              <span className="font-semibold text-white">
                {formatAmount(simulation.mobile, currencyCode)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-yellow-700/20 bg-yellow-500/5 p-4">
              <span className="text-yellow-200">Estimated Monthly Cost</span>
              <span className="font-bold text-yellow-300">
                {formatAmount(simulation.estimatedMonthlyCost, currencyCode)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-slate-300">Remaining</span>
              <span className={`text-xl font-bold ${remainingTone}`}>
                {formatAmount(simulation.remaining, currencyCode)}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <h4 className="mb-2 font-semibold text-yellow-400">TGPI Insight</h4>
            <p className="text-sm leading-7 text-slate-300">
              This is a simplified educational simulation built from reference
              local prices. It is designed to help users visualize basic monthly
              affordability before deeper planning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
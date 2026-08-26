"use client";

import Link from "next/link";
import { useState } from "react";

const outcomes = [
  {
    id: "move",
    label: "Move abroad",
    eyebrow: "Mobility strategy",
    headline: "Turn a destination into a sequenced move plan.",
    description:
      "Premium connects Country Fit, comparison evidence, document readiness and practical learning around the country you are preparing to enter.",
    result: "A prioritized international move system",
    path: ["Choose", "Compare", "Prepare", "Act"],
  },
  {
    id: "work",
    label: "Work globally",
    eyebrow: "Career mobility",
    headline: "Match opportunity with readiness and capability.",
    description:
      "Evaluate countries through career context, organize the evidence behind your choice and build the language and adaptability required to compete globally.",
    result: "A connected global career strategy",
    path: ["Position", "Evaluate", "Prepare", "Compete"],
  },
  {
    id: "study",
    label: "Study internationally",
    eyebrow: "Education pathway",
    headline: "Build an application-ready global study path.",
    description:
      "Connect country intelligence, academic evidence, funding readiness and capability development instead of managing your study goal through scattered research.",
    result: "A structured academic readiness system",
    path: ["Discover", "Compare", "Evidence", "Apply"],
  },
  {
    id: "adapt",
    label: "Build global adaptability",
    eyebrow: "Long-term capability",
    headline: "Develop the operating system for an international life.",
    description:
      "Use TGPI to continuously improve decision quality, practical skills and readiness across countries, opportunities and changing life priorities.",
    result: "A compounding global capability profile",
    path: ["Understand", "Learn", "Prove", "Evolve"],
  },
] as const;

type OutcomeId = (typeof outcomes)[number]["id"];

export default function PricingOutcomeSelector() {
  const [activeId, setActiveId] = useState<OutcomeId>("move");
  const active = outcomes.find((outcome) => outcome.id === activeId) ?? outcomes[0];

  return (
    <section className="py-16 sm:py-20" aria-labelledby="pricing-outcome-title">
      <div className="overflow-hidden rounded-[30px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_24px_70px_rgba(11,31,58,0.08)]">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
          <div className="border-b border-[#D8D2C4] bg-[#F1EBDD] p-7 sm:p-9 lg:border-b-0 lg:border-r">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">
              Value built around you
            </p>
            <h2 id="pricing-outcome-title" className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-[#071A31] sm:text-5xl">
              What should Premium help you achieve?
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#596576]">
              Select the outcome behind your subscription. The TGPI system reorganizes
              around the decision you need to make.
            </p>

            <div className="mt-7 grid gap-2" role="group" aria-label="Choose your Premium outcome">
              {outcomes.map((outcome, index) => {
                const selected = outcome.id === active.id;

                return (
                  <button
                    key={outcome.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveId(outcome.id)}
                    className={`flex min-h-14 items-center justify-between rounded-xl border px-4 text-left text-sm font-extrabold transition ${
                      selected
                        ? "border-[#0B1F3A] bg-[#0B1F3A] text-white shadow-[0_12px_30px_rgba(11,31,58,0.12)]"
                        : "border-[#D8D2C4] bg-[#FFFDF8] text-[#3D4858] hover:border-[#B58A2A]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={selected ? "text-[#F0D58C]" : "text-[#956A13]"}>
                        0{index + 1}
                      </span>
                      {outcome.label}
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-between bg-[#071A31] p-7 text-white sm:p-9 lg:p-11" aria-live="polite">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.23em] text-[#F0D58C]">
                {active.eyebrow}
              </p>
              <h3 className="mt-4 max-w-2xl font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl">
                {active.headline}
              </h3>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                {active.description}
              </p>
            </div>

            <div className="mt-9">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {active.path.map((step, index) => (
                  <div key={step} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-4">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#F0D58C]">
                      Step 0{index + 1}
                    </p>
                    <p className="mt-2 text-sm font-bold text-white/85">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-[#D7B45D]/25 bg-[#D7B45D]/8 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#F0D58C]">Designed outcome</p>
                  <p className="mt-2 text-sm font-bold text-white">{active.result}</p>
                </div>
                <Link href="#membership" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#B58A2A] px-5 text-sm font-extrabold text-[#071A31] transition hover:bg-[#C79B36]">
                  See membership
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

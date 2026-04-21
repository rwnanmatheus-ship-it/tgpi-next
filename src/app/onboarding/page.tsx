"use client";

import { useState } from "react";
import Link from "next/link";
import OnboardingStepper from "@/components/OnboardingStepper";
import DestinationPicker from "@/components/DestinationPicker";

const intents = ["work", "relocation", "tourism", "study", "networking"];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState("");
  const [intent, setIntent] = useState("work");

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-10">
          <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            TGPI Elite Onboarding
          </p>

          <h1 className="text-4xl font-bold text-yellow-400">
            Start your global transition intelligently
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            This onboarding is designed to turn curiosity into direction. Choose
            your destination, define your intent, and activate your global identity.
          </p>
        </section>

        <OnboardingStepper currentStep={step} />

        {step === 1 ? (
          <DestinationPicker value={destination} onChange={setDestination} />
        ) : null}

        {step === 2 ? (
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold text-yellow-400">
              Define Your Intent
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {intents.map((option) => {
                const active = intent === option;
                return (
                  <button
                    key={option}
                    onClick={() => setIntent(option)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      active
                        ? "border-yellow-500 bg-yellow-500/10"
                        : "border-slate-800 bg-slate-950 hover:border-yellow-500"
                    }`}
                  >
                    <p className="text-lg font-bold capitalize text-white">
                      {option}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        {step === 3 ? (
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              Your TGPI Journey Is Ready
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <SummaryCard label="Destination" value={destination || "Not selected"} />
              <SummaryCard label="Intent" value={intent} />
              <SummaryCard label="Next Move" value="Complete your identity profile" />
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/profile"
                className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black"
              >
                Complete Profile
              </Link>

              <Link
                href="/dashboard"
                className="rounded-xl border border-slate-700 bg-slate-950 px-6 py-3 font-semibold text-white"
              >
                Go to Dashboard
              </Link>
            </div>
          </section>
        ) : null}

        <section className="flex flex-wrap gap-4">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-6 py-3 font-semibold text-white"
            >
              Back
            </button>
          ) : null}

          {step < 3 ? (
            <button
              onClick={() => setStep((prev) => prev + 1)}
              className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black"
            >
              Continue
            </button>
          ) : null}
        </section>
      </div>
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}
"use client";

import { countries } from "@/data/countries";
import { recommendCountries } from "@/lib/recommendation";

export default function DashboardPage() {
  const recommended = recommendCountries(countries, {
    goal: "Work abroad",
    region: "Europe",
    favorites: ["portugal"],
  });

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-10">
        <h1 className="text-4xl font-bold text-yellow-400">
          Your Global Dashboard 🌍
        </h1>

        {/* RECOMENDAÇÕES */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-yellow-300">
            Recommended for You
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {recommended.map((c) => (
              <div
                key={c.slug}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="text-xl font-bold text-white">
                  {c.emoji} {c.name}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {c.shortDescription}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PROGRESSO */}
        <section>
          <h2 className="text-2xl font-bold text-yellow-300">
            Your Progress
          </h2>

          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-900 p-6">
              <p className="text-sm text-slate-400">Countries explored</p>
              <p className="text-3xl font-bold text-yellow-400">5</p>
            </div>

            <div className="rounded-2xl bg-slate-900 p-6">
              <p className="text-sm text-slate-400">Courses completed</p>
              <p className="text-3xl font-bold text-yellow-400">2</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
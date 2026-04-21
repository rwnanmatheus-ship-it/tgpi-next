import { getRecommendedCountries } from "@/lib/recommendation-engine";

export default function RecommendedCountries({
  intent,
}: {
  intent: string;
}) {
  const countries = getRecommendedCountries(intent);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">
        Recommended For You
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {countries.map((c) => (
          <div
            key={c}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
          >
            <p className="font-semibold text-white">{c}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
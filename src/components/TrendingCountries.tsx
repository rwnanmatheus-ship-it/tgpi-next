export default function TrendingCountries() {
  const countries = ["Canada", "Portugal", "USA", "Germany"];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <h3 className="text-yellow-400 font-bold">
        Trending Destinations
      </h3>

      <ul className="mt-3 space-y-2 text-sm text-slate-300">
        {countries.map((c) => (
          <li key={c}>• {c}</li>
        ))}
      </ul>
    </div>
  );
}
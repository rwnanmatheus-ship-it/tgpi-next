const rows = [
  {
    feature: "Country preparation",
    free: "Basic",
    premium: "Advanced",
  },
  {
    feature: "Ranking visibility",
    free: "Preview",
    premium: "Full",
  },
  {
    feature: "Community access",
    free: "Standard",
    premium: "Priority",
  },
  {
    feature: "Identity trust layer",
    free: "Basic",
    premium: "Enhanced",
  },
  {
    feature: "Strategic positioning",
    free: "Limited",
    premium: "High",
  },
];

export default function PremiumComparisonMatrix() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-yellow-400">
        Free vs Premium
      </h2>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="py-3 text-sm text-slate-400">Feature</th>
              <th className="py-3 text-sm text-slate-400">Free</th>
              <th className="py-3 text-sm text-slate-400">Premium</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className="border-b border-slate-800">
                <td className="py-4 text-sm text-white">{row.feature}</td>
                <td className="py-4 text-sm text-slate-300">{row.free}</td>
                <td className="py-4 text-sm font-semibold text-yellow-300">
                  {row.premium}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
const items = [
  { label: "Coffee", value: "$4.50" },
  { label: "Casual Meal", value: "$14.00" },
  { label: "Metro Ticket", value: "$2.30" },
  { label: "Shared Rent", value: "$780/mo" },
];

export default function CostOfLivingCard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-bold text-white">Cost of Living</h2>
      <p className="mt-1 text-sm text-slate-400">
        Reference prices for planning your global journey.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-black/30 p-4"
          >
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-1 text-xl font-bold text-yellow-400">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
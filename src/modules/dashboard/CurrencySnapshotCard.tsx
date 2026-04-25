const currencies = [
  { code: "USD", label: "US Dollar", value: "1.00" },
  { code: "EUR", label: "Euro", value: "0.92" },
  { code: "JPY", label: "Japanese Yen", value: "154.20" },
  { code: "BRL", label: "Brazilian Real", value: "5.10" },
];

export default function CurrencySnapshotCard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-bold text-white">Currency Snapshot</h2>

      <div className="mt-4 space-y-3">
        {currencies.map((item) => (
          <div
            key={item.code}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4"
          >
            <div>
              <p className="font-bold text-yellow-400">{item.code}</p>
              <p className="text-xs text-slate-400">{item.label}</p>
            </div>

            <p className="font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
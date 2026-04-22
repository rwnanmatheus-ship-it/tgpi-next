export default function PremiumPage() {
  const plans = [
    {
      name: "FREE",
      price: "$0",
      features: ["Basic exploration", "Starter dashboard", "Core country pages"],
    },
    {
      name: "PREMIUM",
      price: "$19",
      features: [
        "Advanced comparisons",
        "Smart TGPI insights",
        "Premium recommendation layer",
      ],
    },
    {
      name: "ELITE",
      price: "$49",
      features: [
        "Full intelligence layer",
        "Elite global tools",
        "High-value strategic experience",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
          <h1 className="text-4xl font-bold text-yellow-400">Upgrade TGPI</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Unlock deeper guidance, stronger signals, premium comparison tools,
            and a more powerful international experience.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h2 className="text-2xl font-bold text-yellow-400">{plan.name}</h2>
              <p className="mt-2 text-4xl font-bold text-white">{plan.price}</p>
              <div className="mt-5 space-y-2">
                {plan.features.map((feature) => (
                  <p key={feature} className="text-sm text-slate-300">
                    • {feature}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
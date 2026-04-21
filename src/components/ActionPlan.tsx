export default function ActionPlan() {
  const steps = [
    "Complete your profile",
    "Choose your main destination",
    "Join a country room",
    "Increase your XP",
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">
        Your Action Plan
      </h2>

      <ul className="mt-4 space-y-2">
        {steps.map((s, i) => (
          <li key={i} className="text-sm text-slate-300">
            • {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
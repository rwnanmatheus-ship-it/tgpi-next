import TGPIPageShell from "@/components/TGPIPageShell";

const plans = [
  {
    name: "Basic",
    price: "$39",
    tag: "Start your journey",
    features: ["Basic courses", "Progress tracking", "Standard certificate"],
  },
  {
    name: "Premium",
    price: "$79",
    tag: "Most popular",
    highlight: true,
    features: ["Everything in Basic", "Unlimited course access", "Verified certificates", "Priority support"],
  },
  {
    name: "Premium Plus",
    price: "$129",
    tag: "For global builders",
    features: ["Everything in Premium", "Mentorship add-on", "Advanced projects", "Early access"],
  },
];

export default function PremiumPage() {
  return (
    <TGPIPageShell>
      <section className="mb-10">
        <p className="text-sm text-slate-500">Home › Plans</p>
        <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-tight">
          Choose the ideal plan for <span className="text-yellow-400">you</span>
        </h1>
        <p className="mt-4 text-slate-400">
          Learn without limits. Cancel anytime.
        </p>

        <div className="mt-8 inline-flex rounded-2xl border border-white/10 bg-white/5 p-1">
          <button className="rounded-xl px-5 py-2 text-sm text-slate-300">Monthly</button>
          <button className="rounded-xl bg-yellow-500 px-5 py-2 text-sm font-bold text-black">
            Annual · -20%
          </button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-3xl border p-7 ${
              plan.highlight
                ? "border-yellow-500/60 bg-yellow-500/10 shadow-[0_0_60px_rgba(250,204,21,0.08)]"
                : "border-white/10 bg-white/5"
            }`}
          >
            {plan.highlight && (
              <p className="mb-3 w-fit rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                Most popular
              </p>
            )}

            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{plan.tag}</p>

            <p className="mt-6 text-4xl font-bold text-yellow-400">
              {plan.price}
              <span className="text-sm text-slate-400"> /month</span>
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {plan.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>

            <button className="mt-8 w-full rounded-2xl bg-yellow-500 px-5 py-3 font-bold text-black">
              Choose plan
            </button>
          </article>
        ))}
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {["7-day guarantee", "Secure environment", "Easy cancellation"].map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-yellow-400">
            ◎ {item}
          </div>
        ))}
      </section>
    </TGPIPageShell>
  );
}
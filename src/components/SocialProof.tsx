export default function SocialProof() {
  const signals = [
    "Users are preparing for Canada 🇨🇦",
    "New profiles are being completed for Portugal 🇵🇹",
    "Learners are building readiness for Germany 🇩🇪",
    "Certificates are being issued through TGPI",
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-yellow-400">
        Live Global Signals
      </h2>

      <p className="mt-3 text-sm leading-7 text-slate-300">
        TGPI is becoming a living network of people preparing for real
        international transitions.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {signals.map((signal) => (
          <div
            key={signal}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
          >
            <p className="text-sm leading-7 text-slate-300">• {signal}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
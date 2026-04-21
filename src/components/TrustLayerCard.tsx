export default function TrustLayerCard({
  verified,
  plan,
  maskedDocument,
}: {
  verified: boolean;
  plan?: string;
  maskedDocument?: string;
}) {
  const lines = [
    verified ? "Verified identity signal active" : "Standard identity signal",
    plan === "premium" ? "Premium trust layer active" : "Free trust layer",
    maskedDocument || "No masked document visible",
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">
        Trust Layer
      </h2>

      <div className="mt-4 space-y-3">
        {lines.map((line) => (
          <div
            key={line}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
          >
            <p className="text-sm text-slate-300">✔ {line}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
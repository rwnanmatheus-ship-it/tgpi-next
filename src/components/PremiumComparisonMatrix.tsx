export default function PremiumComparisonMatrix() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-yellow-400">
        Free vs Premium
      </h2>

      <div className="mt-6 grid gap-4">
        <Row feature="Preparation depth" free="Basic" premium="Advanced" />
        <Row feature="Visibility" free="Limited" premium="High" />
        <Row feature="Ranking power" free="Low" premium="High" />
        <Row feature="Network access" free="Standard" premium="Priority" />
      </div>
    </section>
  );
}

function Row({
  feature,
  free,
  premium,
}: {
  feature: string;
  free: string;
  premium: string;
}) {
  return (
    <div className="grid grid-cols-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
      <p>{feature}</p>
      <p className="text-slate-400">{free}</p>
      <p className="text-yellow-400 font-bold">{premium}</p>
    </div>
  );
}
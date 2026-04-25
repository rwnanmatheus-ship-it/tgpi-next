import TGPIPageShell from "@/components/TGPIPageShell";

export default function CountryDetailPage() {
  return (
    <TGPIPageShell>
      <section className="rounded-3xl border border-white/10 bg-[#07111f] p-6">
        <h1 className="text-4xl font-bold text-yellow-400">Japan 🇯🇵</h1>
        <p className="text-slate-400">Asia · Tokyo</p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 p-5">
            <p className="text-sm text-slate-400">Capital</p>
            <p className="text-lg font-bold">Tokyo</p>
          </div>

          <div className="rounded-2xl border border-white/10 p-5">
            <p className="text-sm text-slate-400">Currency</p>
            <p className="text-lg font-bold">JPY</p>
          </div>

          <div className="rounded-2xl border border-white/10 p-5">
            <p className="text-sm text-slate-400">Population</p>
            <p className="text-lg font-bold">125M</p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-yellow-400">Cost of Living</p>
          <p className="mt-3 text-sm text-slate-400">
            Housing, food, transport and lifestyle overview.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-yellow-400">Opportunities</p>
          <p className="mt-3 text-sm text-slate-400">
            Work, study and visa pathways.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-yellow-400">Culture</p>
          <p className="mt-3 text-sm text-slate-400">
            Traditions, behavior and society insights.
          </p>
        </div>
      </section>
    </TGPIPageShell>
  );
}
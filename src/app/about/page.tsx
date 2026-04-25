import TGPIPageShell from "@/components/TGPIPageShell";
import { tgpiImages } from "@/data/tgpi-images";

export default function AboutPage() {
  return (
    <TGPIPageShell>
      <section className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="text-sm text-slate-500">Home › About</p>

          <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-tight">
            The knowledge that connects the <span className="text-yellow-400">world</span>.
          </h1>

          <p className="mt-6 max-w-2xl text-slate-400">
            TGPI was created to offer global, accessible, and transformative education for people who want to live, study, work, and lead across borders.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["195", "Countries"],
              ["50K+", "Students"],
              ["120+", "Courses"],
              ["15", "Experts"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-bold text-yellow-400">{value}</p>
                <p className="text-sm text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="min-h-[440px] rounded-3xl border border-yellow-500/20 bg-cover bg-center"
          style={{ backgroundImage: `url(${tgpiImages.globe})` }}
        />
      </section>
    </TGPIPageShell>
  );
}
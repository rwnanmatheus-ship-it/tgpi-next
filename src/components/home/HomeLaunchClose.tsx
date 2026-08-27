import Link from "next/link";

const benefits = [
  "A living country shortlist",
  "Transparent comparisons by objective",
  "Documents connected to the decision",
  "Learning connected to readiness gaps",
] as const;

const workspaceLayers = [
  ["Explore", "Country Intelligence", "Discover options through consistent evidence."],
  ["Compare", "Decision Intelligence", "See leaders, margins and meaningful trade-offs."],
  ["Prepare", "Documents OS", "Turn a direction into an evidence-ready plan."],
  ["Learn", "TGPI Learning", "Build the capabilities your objective requires."],
  ["Prove", "Global Key", "Carry progress across one connected identity."],
] as const;

export default function HomeLaunchClose() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[34px] border border-white/10 bg-[var(--tgpi-navy)] shadow-[var(--tgpi-shadow-premium)]">
        <div className="grid lg:grid-cols-[1.08fr_.92fr]">
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-light)]">
              TGPI Premium
            </p>
            <h2 className="mt-4 max-w-2xl font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[0.95] text-white">
              Turn exploration into a living global plan.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#dce4ee]">
              TGPI Premium keeps the intelligence, preparation and capability behind your international objective connected as your plan evolves.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl border border-white/15 bg-white/5 p-4 text-sm font-semibold text-white">
                  <span className="mr-2 text-[var(--tgpi-gold-light)]">✓</span>
                  {benefit}
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:flex">
              <Link href="/onboarding" className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-7 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:-translate-y-0.5 hover:bg-[#d1a644] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Find your country fit
              </Link>
              <Link href="/pricing" className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 px-7 text-sm font-extrabold text-white transition hover:border-[var(--tgpi-gold-light)] hover:text-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
                Explore TGPI Premium
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 bg-[linear-gradient(145deg,#102d50,#071a32)] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="h-full rounded-[28px] border border-white/15 bg-white/5 p-6 text-white backdrop-blur-xl">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">One objective · five connected layers</p>
              <div className="mt-6 grid gap-3">
                {workspaceLayers.map(([label, value, description], index) => (
                  <div key={label} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-black/10 p-4">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--tgpi-gold)]/30 bg-[var(--tgpi-gold)]/10 text-[10px] font-extrabold text-[var(--tgpi-gold-light)]">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">{label}</p>
                      <p className="mt-1 font-[var(--tgpi-font-display)] text-xl font-semibold text-white">{value}</p>
                      <p className="mt-1 text-xs leading-5 text-white/45">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-white/60">
                Start free. Premium Founding Access is currently collected without activating a charge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

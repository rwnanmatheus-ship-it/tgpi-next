import Link from "next/link";

const shortlist = [["Portugal", "84", "Adaptation + mobility"], ["Spain", "82", "Lifestyle + language"], ["Netherlands", "79", "Career + infrastructure"]] as const;

export default function HomeHeroV3() {
  return (
    <section className="px-4 pb-14 pt-5 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto grid max-w-[1280px] overflow-hidden rounded-[32px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] shadow-[var(--tgpi-shadow-premium)] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-20">
          <p className="w-fit rounded-full border border-[#d7b45f] bg-[var(--tgpi-gold-soft)] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#765009]">The Global Polymath Institute</p>
          <h1 className="mt-7 max-w-3xl font-[var(--tgpi-font-display)] text-[clamp(3.4rem,7vw,6rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-[var(--tgpi-ink)]">Compare the world before you <span className="text-[var(--tgpi-gold)]">choose.</span></h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-[var(--tgpi-muted)] sm:text-lg">Build your international strategy using countries, careers, costs, education, documents and decision tools in one connected system.</p>
          <div className="mt-8 grid gap-3 sm:flex"><Link href="/onboarding" className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-7 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(7,26,50,0.24)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-navy-soft)] focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">Find your country fit</Link><Link href="/countries" className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[var(--tgpi-gold)] bg-[var(--tgpi-gold-soft)] px-7 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:-translate-y-0.5 hover:bg-[#f2dda0] focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">Explore 195 countries</Link></div>
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6b7480]"><span>195 countries</span><span>100+ signals</span><span>Source-aware</span><span>Decision-first</span></div>
        </div>
        <div className="relative bg-[linear-gradient(145deg,#071a32,#102d50)] p-5 text-white sm:p-8 lg:p-10">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,rgba(240,213,140,.8),transparent_22%),linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:auto,32px_32px,32px_32px]" />
          <div className="relative rounded-[28px] border border-white/15 bg-white/8 p-5 shadow-[0_30px_80px_rgba(0,0,0,.25)] backdrop-blur-xl sm:p-7">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">Current goal</p><h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Move to Europe</h2></div><span className="rounded-full border border-emerald-400/35 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-200">Profile active</span></div>
            <div className="mt-5 grid gap-4 sm:grid-cols-[1.2fr_.8fr]"><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="flex items-end justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/55">Country fit</p><p className="mt-2 text-5xl font-semibold text-[var(--tgpi-gold-light)]">84%</p></div><p className="text-xs text-white/50">+6 this month</p></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[84%] rounded-full bg-[linear-gradient(90deg,#c59632,#f0d58c)]" /></div></div><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/55">Next blocker</p><p className="mt-3 text-lg font-bold text-white">Language certificate</p><p className="mt-2 text-sm text-white/55">Prepare · Validate · Submit</p></div></div>
            <div className="mt-4 space-y-3">{shortlist.map(([country, score, note], index) => <div key={country} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><div className="flex items-center gap-3"><span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-xs font-extrabold text-[var(--tgpi-gold-light)]">{index + 1}</span><div><p className="font-bold text-white">{country}</p><p className="text-xs text-white/45">{note}</p></div></div><span className="text-xl font-semibold text-[var(--tgpi-gold-light)]">{score}</span></div>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

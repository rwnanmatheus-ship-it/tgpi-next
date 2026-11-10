import type { Metadata } from "next";
import Link from "next/link";
import { getProductHealth } from "@/lib/admin/product-health.server";
import { healthCopy } from "@/lib/admin/product-health-copy";
import RefreshHealth from "./RefreshHealth";

export const metadata: Metadata = {
  title: `${healthCopy.title} | TGPI`,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const statusStyles = {
  verified: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
  configured: "border-sky-300/25 bg-sky-300/10 text-sky-200",
  attention: "border-amber-300/25 bg-amber-300/10 text-amber-200",
  failed: "border-rose-300/25 bg-rose-300/10 text-rose-200",
} as const;

const healthStates = ["verified", "configured", "attention", "failed"] as const;
const triageOrder = { failed: 0, attention: 1, configured: 2, verified: 3 };
const timestampFormat = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "medium",
  timeZone: "America/Sao_Paulo",
});

export default async function AdminPage() {
  const { checks, checkedAt, environment } = await getProductHealth();
  const ordered = [...checks].sort((a, b) => triageOrder[a.state] - triageOrder[b.state]);

  return (
    <main lang="pt-BR" className="min-h-[75vh] bg-[#080e19] px-4 py-8 text-slate-100 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="relative isolate overflow-hidden rounded-3xl border border-sky-200/15 bg-[radial-gradient(ellipse_at_top_right,#1b395f,#101c30_54%,#0c1424)] p-6 sm:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-15 [background-image:linear-gradient(to_right,#829ac1_1px,transparent_1px),linear-gradient(to_bottom,#829ac1_1px,transparent_1px)] [background-size:36px_36px] [mask-image:linear-gradient(to_left,black,transparent_65%)]" />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs font-extrabold tracking-[0.22em] text-[#f1ca77]">{healthCopy.eyebrow}</p>
            <span className="rounded-full border border-white/20 bg-slate-950/45 px-3 py-1 text-xs font-semibold text-slate-200">{healthCopy.restricted}</span>
          </div>
          <h1 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-6xl">{healthCopy.title}</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">{healthCopy.intro}</p>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-5 border-t border-white/15 pt-5">
            <div aria-live="polite">
              <p className="text-sm font-bold text-sky-200">{environment}</p>
              <p className="mt-1 text-xs text-slate-300">
                {healthCopy.checkedAt} · <time dateTime={checkedAt}>{timestampFormat.format(new Date(checkedAt))}{healthCopy.timeZone}</time>
              </p>
            </div>
            <RefreshHealth />
          </div>
        </header>

        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {healthStates.map((state) => {
            const { label, detail, mark } = healthCopy.states[state];
            return (
              <div key={state} className="rounded-2xl border border-white/12 bg-[#101a2b] p-4 sm:p-5">
                <dt className="text-sm font-bold text-slate-100">{label}</dt>
                <dd className="mt-3">
                  <div className="flex items-center gap-3 text-3xl font-bold tabular-nums">
                    <span aria-hidden="true" className={`grid size-8 place-items-center rounded-lg border text-sm ${statusStyles[state]}`}>{mark}</span>
                    {checks.filter((check) => check.state === state).length}
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{detail}</p>
                </dd>
              </div>
            );
          })}
        </dl>

        <section aria-labelledby="health-signals">
          <h2 id="health-signals" className="text-2xl font-bold text-white">{healthCopy.signals}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{healthCopy.scope}</p>
          <ul className="mt-4 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/12 bg-[#101a2b]">
            {ordered.map((check) => (
              <li key={check.id} className="grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:p-5">
                <div>
                  <p className="text-xs font-semibold text-slate-400">{check.source}</p>
                  <h3 className="mt-1 text-base font-bold text-white">{check.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-300">{check.detail}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[check.state]}`}>
                    <span aria-hidden="true">{healthCopy.states[check.state].mark}</span>{healthCopy.states[check.state].label}
                  </span>
                  {check.id !== "access" && (
                    <span className="text-xs tabular-nums text-slate-300">
                      {healthCopy.timing} · {check.durationMs === 0 ? "<1" : check.durationMs}{healthCopy.milliseconds}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-5 text-slate-400">{healthCopy.verificationScope}</p>
        </section>

        <section aria-labelledby="health-operations" className="rounded-2xl border border-white/12 bg-[#101a2b] p-5 sm:p-6">
          <h2 id="health-operations" className="text-xl font-bold text-white">{healthCopy.operations}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{healthCopy.operationsDetail}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {healthCopy.links.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} prefetch={false} className="flex h-full min-h-12 items-center justify-between gap-3 rounded-xl border border-sky-300/20 px-3 py-2 text-sm font-semibold text-sky-100 hover:bg-sky-300/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200">
                  {label}<span aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const countries = [
  { name: "Canada", score: 87, note: "Career + education", tone: "bg-emerald-500" },
  { name: "England", score: 84, note: "Academic leverage", tone: "bg-amber-500" },
  { name: "Portugal", score: 81, note: "Adaptation + mobility", tone: "bg-sky-500" },
] as const;

const readiness = [
  ["Budget", "72%"],
  ["Skills", "84%"],
  ["Documents", "58%"],
  ["Timeline", "66%"],
] as const;

const documents = [
  ["Passport", "Ready"],
  ["Diploma", "Ready"],
  ["Translation", "Pending"],
  ["Language certificate", "Next"],
] as const;

const tabs = ["Overview", "Countries", "Readiness", "Documents"] as const;
type Tab = (typeof tabs)[number];

export default function HomeDecisionOS() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  if (pathname !== "/") return null;

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[var(--tgpi-navy)] py-20 text-white sm:py-24">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_15%_20%,rgba(197,150,50,.34),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,.12),transparent_24%)]" />
      <div className="tgpi-container relative">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="tgpi-reveal">
            <p className="text-xs font-extrabold uppercase tracking-[0.26em] text-[var(--tgpi-gold-light)]">TGPI Decision OS</p>
            <h2 className="mt-5 max-w-xl font-[var(--tgpi-font-display)] text-[clamp(3rem,5vw,5.2rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white">
              See the system before you create an account.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#CAD5E3] sm:text-lg">
              TGPI connects country fit, readiness, documents, timeline and next actions in one decision environment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/onboarding" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-6 py-4 text-sm font-extrabold text-[var(--tgpi-navy)] shadow-[0_18px_45px_rgba(0,0,0,.28)] transition duration-300 hover:-translate-y-1 hover:bg-[#d1a644] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Find your country fit
              </Link>
              <Link href="/countries" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-1 hover:border-[var(--tgpi-gold)] hover:text-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
                Explore countries
              </Link>
            </div>
          </div>

          <div className="tgpi-float rounded-[30px] border border-white/15 bg-[#0D2746]/92 p-4 shadow-[0_40px_100px_rgba(0,0,0,.34)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">Current objective</p>
                <p className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold text-white">Study and build a career abroad</p>
              </div>
              <span className="w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-extrabold text-emerald-200">Profile active</span>
            </div>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="TGPI Decision OS preview">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`min-h-11 shrink-0 rounded-xl px-4 text-xs font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] ${activeTab === tab ? "bg-[var(--tgpi-gold)] text-[var(--tgpi-navy)]" : "border border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:text-white"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-5 min-h-[360px]">
              {activeTab === "Overview" && (
                <div className="grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
                  <CountryPanel />
                  <div className="grid gap-4">
                    <ReadinessPanel />
                    <NextBlocker />
                  </div>
                </div>
              )}

              {activeTab === "Countries" && <CountryPanel expanded />}

              {activeTab === "Readiness" && (
                <div className="grid gap-4 md:grid-cols-[1fr_.8fr]">
                  <ReadinessPanel expanded />
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.055] p-5">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/45">Recommended action</p>
                    <p className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold text-white">Improve document readiness first.</p>
                    <p className="mt-4 text-sm leading-6 text-white/55">Your country options are strong. Translation and language proof are the main constraints reducing your readiness score.</p>
                    <Link href="/passport" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-5 text-sm font-extrabold text-[var(--tgpi-navy)]">Open Documents OS</Link>
                  </div>
                </div>
              )}

              {activeTab === "Documents" && (
                <div className="grid gap-4 md:grid-cols-[1.1fr_.9fr]">
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.055] p-5">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/45">Document checklist</p>
                    <div className="mt-5 space-y-3">
                      {documents.map(([label, status]) => (
                        <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 p-4">
                          <span className="text-sm font-bold text-white">{label}</span>
                          <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${status === "Ready" ? "bg-emerald-400/10 text-emerald-200" : status === "Next" ? "bg-amber-400/10 text-amber-200" : "bg-white/10 text-white/60"}`}>{status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <NextBlocker />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountryPanel({ expanded = false }: { expanded?: boolean }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.055] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/45">Recommended shortlist</p>
          <p className="mt-2 text-sm text-[#C8D3E0]">Based on education, language, budget and mobility.</p>
        </div>
        <span className="font-[var(--tgpi-font-display)] text-4xl font-semibold text-[var(--tgpi-gold-light)]">87</span>
      </div>
      <div className={`mt-5 grid gap-3 ${expanded ? "md:grid-cols-3" : ""}`}>
        {countries.map((country, index) => (
          <Link key={country.name} href={`/countries/${country.name === "England" ? "united-kingdom" : country.name.toLowerCase()}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)]/55 hover:bg-white/[0.08]">
            <span className={`h-2.5 w-2.5 rounded-full ${country.tone}`} />
            <span><span className="block text-sm font-extrabold text-white">{index + 1}. {country.name}</span><span className="mt-1 block text-xs text-white/45">{country.note}</span></span>
            <span className="font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-gold-light)]">{country.score}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ReadinessPanel({ expanded = false }: { expanded?: boolean }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.055] p-5">
      <div className="flex items-end justify-between gap-4">
        <div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/45">Global readiness</p><p className="mt-2 font-[var(--tgpi-font-display)] text-5xl font-semibold text-white">70%</p></div>
        <span className="text-xs font-extrabold text-amber-200">+8 this month</span>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[70%] rounded-full bg-gradient-to-r from-[var(--tgpi-gold)] to-[#F0D58C]" /></div>
      <div className={`mt-5 grid grid-cols-2 gap-3 ${expanded ? "sm:grid-cols-4" : ""}`}>
        {readiness.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-black/10 p-3"><p className="text-[10px] uppercase tracking-[0.15em] text-white/40">{label}</p><p className="mt-1 text-sm font-extrabold text-white">{value}</p></div>
        ))}
      </div>
    </div>
  );
}

function NextBlocker() {
  return (
    <Link href="/passport" className="group rounded-[24px] border border-white/10 bg-white/[0.055] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--tgpi-gold)]/55 hover:bg-white/[0.08]">
      <div className="flex items-center justify-between gap-4">
        <div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/45">Next blocker</p><p className="mt-2 text-lg font-extrabold text-white">Document preparation</p><p className="mt-1 text-sm text-white/45">Passport · Translation · Deadline</p></div>
        <span className="text-2xl text-[var(--tgpi-gold-light)] transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}

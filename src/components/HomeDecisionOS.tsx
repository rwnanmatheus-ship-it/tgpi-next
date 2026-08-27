"use client";

import Link from "next/link";
import { useState } from "react";

const countries = [
  { name: "Canada", slug: "canada", score: 87, note: "Career + education", tone: "bg-emerald-400" },
  { name: "United Kingdom", slug: "united-kingdom", score: 84, note: "Academic leverage", tone: "bg-amber-400" },
  { name: "Portugal", slug: "portugal", score: 81, note: "Adaptation + mobility", tone: "bg-sky-400" },
] as const;

const readiness = [
  ["Budget", "72%"],
  ["Capability", "84%"],
  ["Documents", "58%"],
  ["Timeline", "66%"],
] as const;

const documents = [
  ["Identity evidence", "Ready"],
  ["Academic record", "Ready"],
  ["Certified translation", "Review"],
  ["Language evidence", "Next"],
] as const;

const learning = [
  ["Daily independence", "In progress"],
  ["Safety & culture", "Ready to start"],
  ["Career action", "Planned"],
] as const;

const tabs = ["System", "Countries", "Readiness", "Documents", "Learning"] as const;
type Tab = (typeof tabs)[number];

export default function HomeDecisionOS() {
  const [activeTab, setActiveTab] = useState<Tab>("System");

  return (
    <section
      className="relative overflow-hidden border-y border-white/10 bg-[var(--tgpi-navy)] py-16 text-white sm:py-24"
      aria-labelledby="home-decision-os-title"
    >
      <div className="absolute inset-0 opacity-55 [background-image:radial-gradient(circle_at_12%_18%,rgba(197,150,50,.28),transparent_28%),radial-gradient(circle_at_88%_10%,rgba(52,111,168,.3),transparent_28%),linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] [background-size:auto,auto,42px_42px,42px_42px]" />
      <div className="tgpi-container relative">
        <div className="grid gap-10 xl:grid-cols-[0.68fr_1.32fr] xl:items-center">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--tgpi-gold-light)]">
              Product demonstration
            </p>
            <h2
              id="home-decision-os-title"
              className="mt-5 max-w-xl font-[var(--tgpi-font-display)] text-[clamp(3rem,5vw,5rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white"
            >
              See how one country question becomes a system.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#CAD6E4] sm:text-lg">
              A shortlist becomes a comparison. The comparison exposes readiness gaps. Those gaps connect to documents, learning and the next practical action.
            </p>

            <div className="mt-7 flex flex-wrap gap-2" aria-label="TGPI connected capabilities">
              {["Country fit", "Trade-offs", "Readiness", "Documents", "Learning evidence"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/12 bg-white/5 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/65"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:flex">
              <Link
                href="/compare"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy)] shadow-[0_18px_45px_rgba(0,0,0,.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Build a real comparison
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tgpi-gold-light)] hover:text-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold-light)]"
              >
                Create a Global Key
              </Link>
            </div>
            <p className="mt-5 text-xs leading-6 text-white/42">
              The data below is an illustrative product preview, not a personal recommendation.
            </p>
          </div>

          <div className="rounded-[30px] border border-white/15 bg-[#0D2746]/94 p-4 shadow-[0_40px_100px_rgba(0,0,0,.34)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">
                  Illustrative objective
                </p>
                <p className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold text-white">
                  Study and build a career abroad
                </p>
              </div>
              <span className="w-fit rounded-full border border-[var(--tgpi-gold)]/35 bg-[var(--tgpi-gold)]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-light)]">
                Connected preview
              </span>
            </div>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="TGPI Decision OS preview">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  id={`tgpi-preview-tab-${tab.toLowerCase()}`}
                  role="tab"
                  aria-controls="tgpi-preview-panel"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`min-h-11 shrink-0 rounded-xl px-4 text-xs font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] ${activeTab === tab ? "bg-[var(--tgpi-gold)] text-[var(--tgpi-navy)]" : "border border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:text-white"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div
              id="tgpi-preview-panel"
              role="tabpanel"
              aria-labelledby={`tgpi-preview-tab-${activeTab.toLowerCase()}`}
              className="mt-5 min-h-[390px]"
            >
              <PreviewPanel activeTab={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewPanel({ activeTab }: { activeTab: Tab }) {
  switch (activeTab) {
    case "Countries":
      return <CountryPanel expanded />;
    case "Readiness":
      return (
        <div className="grid gap-4 md:grid-cols-[1fr_.82fr]">
          <ReadinessPanel expanded />
          <RecommendationPanel />
        </div>
      );
    case "Documents":
      return (
        <div className="grid gap-4 md:grid-cols-[1.08fr_.92fr]">
          <DocumentPanel />
          <NextActionPanel />
        </div>
      );
    case "Learning":
      return <LearningPanel />;
    case "System":
    default:
      return (
        <div className="grid gap-4 xl:grid-cols-[1.08fr_.92fr]">
          <CountryPanel />
          <div className="grid gap-4">
            <ReadinessPanel />
            <NextActionPanel />
          </div>
        </div>
      );
  }
}

function CountryPanel({ expanded = false }: { expanded?: boolean }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.055] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/45">
            Example shortlist
          </p>
          <p className="mt-2 text-sm leading-6 text-[#C8D3E0]">
            Structured around education, language, budget and mobility.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-black/10 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/45">
          Demo
        </span>
      </div>
      <div className={`mt-5 grid gap-3 ${expanded ? "md:grid-cols-3" : ""}`}>
        {countries.map((country, index) => (
          <Link
            key={country.name}
            href={`/countries/${country.slug}`}
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)]/55 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
          >
            <span className={`h-2.5 w-2.5 rounded-full ${country.tone}`} />
            <span>
              <span className="block text-sm font-extrabold text-white">
                {index + 1}. {country.name}
              </span>
              <span className="mt-1 block text-xs text-white/45">{country.note}</span>
            </span>
            <span className="font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-gold-light)]">
              {country.score}
            </span>
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
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/45">
            Example readiness
          </p>
          <p className="mt-2 font-[var(--tgpi-font-display)] text-5xl font-semibold text-white">70%</p>
        </div>
        <span className="text-xs font-extrabold text-amber-200">Directional signal</span>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-[var(--tgpi-gold)] to-[#F0D58C]" />
      </div>
      <div className={`mt-5 grid grid-cols-2 gap-3 ${expanded ? "sm:grid-cols-4" : ""}`}>
        {readiness.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-black/10 p-3">
            <p className="text-[10px] uppercase tracking-[0.15em] text-white/40">{label}</p>
            <p className="mt-1 text-sm font-extrabold text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendationPanel() {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.055] p-5">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/45">
        System recommendation
      </p>
      <p className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold text-white">
        Strengthen evidence before narrowing the shortlist.
      </p>
      <p className="mt-4 text-sm leading-7 text-white/55">
        Country options are promising, but translation and language evidence remain the most visible preparation gaps.
      </p>
      <Link
        href="/passport"
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-5 text-sm font-extrabold text-[var(--tgpi-navy)]"
      >
        Open Documents OS
      </Link>
    </div>
  );
}

function DocumentPanel() {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.055] p-5">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/45">
        Evidence categories
      </p>
      <div className="mt-5 space-y-3">
        {documents.map(([label, status]) => (
          <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 p-4">
            <span className="text-sm font-bold text-white">{label}</span>
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] ${status === "Ready" ? "bg-emerald-400/10 text-emerald-200" : status === "Next" ? "bg-amber-400/10 text-amber-200" : "bg-white/10 text-white/60"}`}
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LearningPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-[1.08fr_.92fr]">
      <div className="rounded-[24px] border border-white/10 bg-white/[0.055] p-5">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/45">
          Capability path
        </p>
        <div className="mt-5 space-y-3">
          {learning.map(([label, status], index) => (
            <div key={label} className="grid grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border border-white/10 bg-black/10 p-4">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs font-extrabold text-[var(--tgpi-gold-light)]">
                0{index + 1}
              </span>
              <span>
                <span className="block text-sm font-extrabold text-white">{label}</span>
                <span className="mt-1 block text-xs text-white/45">{status}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[24px] border border-[var(--tgpi-gold)]/25 bg-[var(--tgpi-gold)]/10 p-5">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
          Connected learning
        </p>
        <p className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold text-white">
          Build the capability your decision reveals.
        </p>
        <p className="mt-4 text-sm leading-7 text-white/60">
          TGPI Learning turns readiness gaps into practical lessons, exercises and evidence of progress.
        </p>
        <Link
          href="/courses"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-5 text-sm font-extrabold text-[var(--tgpi-navy)]"
        >
          Explore Learning
        </Link>
      </div>
    </div>
  );
}

function NextActionPanel() {
  return (
    <Link
      href="/passport"
      className="group rounded-[24px] border border-white/10 bg-white/[0.055] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--tgpi-gold)]/55 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/45">Next layer</p>
          <p className="mt-2 text-lg font-extrabold text-white">Document preparation</p>
          <p className="mt-1 text-sm text-white/45">Evidence · Verification · Timeline</p>
        </div>
        <span className="text-2xl text-[var(--tgpi-gold-light)] transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}

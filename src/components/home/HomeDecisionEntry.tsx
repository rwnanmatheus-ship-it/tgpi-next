"use client";

import Link from "next/link";
import { useState } from "react";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import { COUNTRY_DECISION_PRESETS } from "@/data/country-page-system";

export default function HomeDecisionEntry() {
  const [intent, setIntent] = useState(COUNTRY_DECISION_PRESETS[0]);
  const goal = intent.goal ?? "live";

  return (
    <section id="start" className="border-b border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] px-4 py-14 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="decision-entry-title">
      <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
        <div className="max-w-xl lg:sticky lg:top-28">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">Start with your decision</p>
          <h2 id="decision-entry-title" className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.65rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.04em] text-[var(--tgpi-ink)]">What are you deciding right now?</h2>
          <p className="mt-5 text-base leading-8 text-[var(--tgpi-muted)]">Choose a lens. TGPI carries it into Country Fit so your first interaction already has direction.</p>
        </div>

        <div className="min-w-0">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="group" aria-label="Choose your global objective">
            {COUNTRY_DECISION_PRESETS.map((preset) => (
              <button key={preset.id} type="button" aria-pressed={intent.id === preset.id} onClick={() => setIntent(preset)} className="group flex min-h-16 min-w-0 items-center justify-between gap-2 rounded-2xl border border-[var(--tgpi-border)] bg-white px-3 py-3 text-left text-xs font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] aria-pressed:border-[var(--tgpi-navy)] aria-pressed:bg-[var(--tgpi-navy)] aria-pressed:text-white sm:px-4 sm:text-sm">
                <span>{preset.label}</span><span className="text-[var(--tgpi-gold-strong)] group-aria-pressed:text-[var(--tgpi-gold-light)]" aria-hidden="true">{intent.id === preset.id ? "↗" : "+"}</span>
              </button>
            ))}
          </div>

          <div className="tgpi-card-3d mt-4 overflow-hidden rounded-[28px] border border-[var(--tgpi-gold)]/40 bg-white" data-tgpi-depth="raised" data-tgpi-tone="gold">
            <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[1fr_auto] md:items-end">
              <div className="min-w-0">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">Your active exploration lens</p>
                <h3 className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold text-[var(--tgpi-navy)] sm:text-4xl">{intent.label}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--tgpi-muted)]">{intent.summary} This lens guides the research plan; it does not create an automatic country ranking.</p>
              </div>
              <Link href={`/country-fit?goal=${goal}`} className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-2xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
                Build my plan <NavigationIcon name="arrow" width={18} height={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  documentGoalPaths,
  type DocumentGoal,
} from "@/lib/documents-os";

export default function DocumentsPathfinder() {
  const [selectedGoal, setSelectedGoal] = useState<DocumentGoal>("travel");
  const selectedPath =
    documentGoalPaths.find((path) => path.goal === selectedGoal) ||
    documentGoalPaths[0];

  return (
    <section
      aria-labelledby="documents-pathfinder-title"
      className="mt-8 overflow-hidden rounded-[32px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] shadow-[var(--tgpi-shadow-premium)]"
    >
      <div className="border-b border-[var(--tgpi-border)] px-5 py-7 sm:px-8 lg:px-10">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
          Find your document path
        </p>
        <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <h2
            id="documents-pathfinder-title"
            className="font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[0.98] tracking-[-0.035em] text-[var(--tgpi-navy)] sm:text-5xl"
          >
            Start with the outcome. TGPI maps the evidence.
          </h2>
          <p className="text-sm leading-7 text-[var(--tgpi-muted)]">
            A document matters because of the decision it supports. Choose your
            objective to see how TGPI structures the research — without asking you
            to upload sensitive legal files.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-2 lg:grid-cols-4" role="group" aria-label="Choose a global objective">
          {documentGoalPaths.map((path) => {
            const selected = path.goal === selectedGoal;

            return (
              <button
                key={path.goal}
                type="button"
                aria-pressed={selected}
                onClick={() => setSelectedGoal(path.goal)}
                className={`min-h-12 rounded-2xl border px-4 text-sm font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tgpi-gold-strong)] ${
                  selected
                    ? "border-[var(--tgpi-navy)] bg-[var(--tgpi-navy)] text-white"
                    : "border-[var(--tgpi-border)] bg-white text-[var(--tgpi-navy)] hover:border-[var(--tgpi-gold)]"
                }`}
              >
                {path.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[.82fr_1.18fr]">
        <div className="bg-[var(--tgpi-navy)] p-6 text-white sm:p-8 lg:p-10">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold)]">
            {selectedPath.eyebrow}
          </p>
          <h3 className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-none tracking-[-0.035em]">
            {selectedPath.title}
          </h3>
          <p className="mt-5 text-sm leading-7 text-white/70">
            {selectedPath.description}
          </p>
          <div className="mt-8 rounded-2xl border border-white/12 bg-white/[0.06] p-5">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/50">
              Designed outcome
            </p>
            <p className="mt-2 text-base font-extrabold text-white">
              {selectedPath.outcome}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-muted)]">
            Your readiness layers
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {selectedPath.records.map((record, index) => (
              <article
                key={record}
                className="rounded-[22px] border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--tgpi-gold-soft)] text-xs font-black text-[var(--tgpi-gold-strong)]">
                    0{index + 1}
                  </span>
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-muted)]">
                    Research layer
                  </span>
                </div>
                <h4 className="mt-5 text-lg font-extrabold text-[var(--tgpi-navy)]">
                  {record}
                </h4>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-[var(--tgpi-gold)]/40 bg-[var(--tgpi-gold-soft)] p-5">
            <p className="max-w-lg text-sm leading-6 text-[#4A3B1B]">
              Create a private TGPI workspace to connect this path to countries,
              learning and verified achievements.
            </p>
            <Link
              href="/sign-up?redirect_url=/passport"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-5 text-sm font-extrabold text-white transition hover:-translate-y-0.5"
            >
              Build my document strategy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

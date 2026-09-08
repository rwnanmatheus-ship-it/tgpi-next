"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("TGPI route boundary", error);
  }, [error]);

  return (
    <main className="bg-[var(--tgpi-canvas)] px-4 py-20 sm:px-6" id="main-content">
      <section className="mx-auto max-w-xl rounded-[2rem] border border-[var(--tgpi-border)] bg-white p-7 text-center shadow-[var(--tgpi-shadow-premium)] sm:p-10">
        <span aria-hidden="true" className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[var(--tgpi-gold-soft)] text-2xl text-[var(--tgpi-navy)]">↻</span>
        <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-strong)]">Runtime recovery</p>
        <h1 className="mt-3 text-4xl text-[var(--tgpi-navy)]">This area did not load.</h1>
        <p className="mt-4 text-base leading-7 text-[var(--tgpi-muted)]">Your account and saved progress were not changed. Try the request again or return to the Workspace.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button className="min-h-12 rounded-xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold-strong)]" onClick={reset} type="button">Try again</button>
          <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--tgpi-border)] px-6 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)] hover:bg-[var(--tgpi-gold-soft)]" href="/profile">Open Workspace</Link>
        </div>
      </section>
    </main>
  );
}

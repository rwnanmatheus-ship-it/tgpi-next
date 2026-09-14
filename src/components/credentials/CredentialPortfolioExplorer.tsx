"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";

export type CredentialPortfolioItem = {
  assessmentScore: number;
  courseTitle: string;
  id: string;
  issuedAt: string;
  learningHours: number;
  skills: Array<{
    id: string;
    level: string;
    name: string;
  }>;
  status: "active" | "revoked";
};

type PortfolioFilter = "all" | "active" | "revoked";
type PortfolioSort = "newest" | "score" | "title";

const FILTERS: ReadonlyArray<{ label: string; value: PortfolioFilter }> = [
  { label: "All records", value: "all" },
  { label: "Active", value: "active" },
  { label: "Revoked", value: "revoked" },
];

const SORT_OPTIONS: ReadonlyArray<{ label: string; value: PortfolioSort }> = [
  { label: "Newest first", value: "newest" },
  { label: "Highest mastery", value: "score" },
  { label: "Course title", value: "title" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default function CredentialPortfolioExplorer({
  items,
}: {
  items: CredentialPortfolioItem[];
}) {
  const [filter, setFilter] = useState<PortfolioFilter>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<PortfolioSort>("newest");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const visibleItems = items
    .filter((item) => filter === "all" || item.status === filter)
    .filter((item) => {
      if (!deferredQuery) return true;
      return (
        item.courseTitle.toLowerCase().includes(deferredQuery) ||
        item.id.toLowerCase().includes(deferredQuery) ||
        item.skills.some((skill) =>
          skill.name.toLowerCase().includes(deferredQuery),
        )
      );
    })
    .sort((a, b) => {
      if (sort === "score") return b.assessmentScore - a.assessmentScore;
      if (sort === "title") return a.courseTitle.localeCompare(b.courseTitle);
      return b.issuedAt.localeCompare(a.issuedAt);
    });

  return (
    <section aria-labelledby="credential-portfolio-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
            Capability ledger
          </p>
          <h2
            id="credential-portfolio-title"
            className="mt-3 text-4xl font-semibold text-[var(--tgpi-navy)] sm:text-5xl"
          >
            Your verified achievements
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--tgpi-muted)]">
            Search, inspect and export every TGPI-issued evidence record,
            including its current lifecycle status.
          </p>
        </div>
        <p className="rounded-full border border-[var(--tgpi-border)] bg-white px-4 py-2 text-xs font-extrabold text-[var(--tgpi-muted)]">
          {items.length} total record{items.length === 1 ? "" : "s"}
        </p>
      </div>

      <div
        className="tgpi-card-3d mt-7 rounded-[26px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-4 sm:p-5"
        data-tgpi-depth="subtle"
        data-tgpi-tone="paper"
      >
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <label className="block">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-strong)]">
              Find evidence
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value.slice(0, 120))}
              placeholder="Search course, credential ID or skill"
              className="mt-2 min-h-12 w-full rounded-xl border border-[var(--tgpi-border)] bg-white px-4 text-sm font-semibold text-[var(--tgpi-navy)] outline-none placeholder:text-[#8B929D] focus:border-[var(--tgpi-gold)] focus:ring-4 focus:ring-[#C49536]/10"
            />
          </label>
          <label className="block">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-strong)]">
              Order
            </span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as PortfolioSort)}
              className="mt-2 min-h-12 w-full rounded-xl border border-[var(--tgpi-border)] bg-white px-4 text-sm font-extrabold text-[var(--tgpi-navy)] outline-none focus:border-[var(--tgpi-gold)] focus:ring-4 focus:ring-[#C49536]/10 lg:w-52"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div
          className="mt-4 flex flex-wrap gap-2 border-t border-[var(--tgpi-border-soft)] pt-4"
          aria-label="Filter credentials by status"
        >
          {FILTERS.map((option) => {
            const selected = filter === option.value;
            const count =
              option.value === "all"
                ? items.length
                : items.filter((item) => item.status === option.value).length;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(option.value)}
                className={
                  "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-xs font-extrabold transition " +
                  (selected
                    ? "border-[var(--tgpi-navy)] bg-[var(--tgpi-navy)] text-white"
                    : "border-[var(--tgpi-border)] bg-white text-[var(--tgpi-muted)] hover:border-[var(--tgpi-gold)] hover:text-[var(--tgpi-navy)]")
                }
              >
                {option.label}
                <span
                  className={
                    "rounded-full px-2 py-0.5 text-[9px] " +
                    (selected
                      ? "bg-white/12 text-[var(--tgpi-gold-light)]"
                      : "bg-[var(--tgpi-canvas)] text-[var(--tgpi-muted)]")
                  }
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {visibleItems.length ? (
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {visibleItems.map((credential) => {
            const active = credential.status === "active";
            return (
              <article
                key={credential.id}
                className="tgpi-card-3d group overflow-hidden rounded-[28px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)]"
                data-tgpi-depth="raised"
                data-tgpi-interactive="true"
                data-tgpi-tone="paper"
              >
                <div
                  className={
                    "h-1.5 " +
                    (active
                      ? "bg-gradient-to-r from-[var(--tgpi-navy)] via-[var(--tgpi-gold)] to-[var(--tgpi-blue)]"
                      : "bg-gradient-to-r from-[#5C2830] via-[#A85757] to-[#C98A65]")
                  }
                />
                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-strong)]">
                      TGPI Verified Learning
                    </span>
                    <span
                      className={
                        "rounded-full px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.08em] " +
                        (active
                          ? "bg-[#DDF1E7] text-[#175D41]"
                          : "bg-[#F4DEDE] text-[#7E2D2D]")
                      }
                    >
                      {active ? "Active · live status" : "Revoked · retained record"}
                    </span>
                  </div>

                  <h3 className="mt-5 text-3xl font-semibold leading-tight text-[var(--tgpi-navy)]">
                    {credential.courseTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--tgpi-muted)]">
                    {credential.assessmentScore}% mastery ·{" "}
                    {credential.learningHours} hours · issued{" "}
                    {formatDate(credential.issuedAt)}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {credential.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill.id}
                        className="rounded-full border border-[var(--tgpi-border-soft)] bg-white px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#4E5662]"
                      >
                        {skill.name}
                      </span>
                    ))}
                    {credential.skills.length > 4 ? (
                      <span className="rounded-full border border-[var(--tgpi-border-soft)] px-3 py-1.5 text-[9px] font-extrabold text-[var(--tgpi-muted)]">
                        +{credential.skills.length - 4} skills
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-6 rounded-2xl border border-[var(--tgpi-border-soft)] bg-white/80 p-4">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[var(--tgpi-muted)]">
                      Credential reference
                    </p>
                    <p className="mt-2 break-all font-mono text-[11px] font-bold text-[var(--tgpi-navy)]">
                      {credential.id}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3 border-t border-[var(--tgpi-border-soft)] pt-5 sm:grid-cols-3">
                    <Link
                      href={"/certificates/" + encodeURIComponent(credential.id)}
                      className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--tgpi-navy)] px-4 text-xs font-extrabold text-white transition hover:bg-[var(--tgpi-navy-soft)]"
                    >
                      Open credential
                    </Link>
                    <Link
                      href={"/verify/credentials/" + encodeURIComponent(credential.id)}
                      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--tgpi-border)] bg-white px-4 text-xs font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)]"
                    >
                      Verify live
                    </Link>
                    <a
                      href={
                        "/api/credentials/" +
                        encodeURIComponent(credential.id) +
                        "?download=1"
                      }
                      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--tgpi-border)] bg-white px-4 text-xs font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)]"
                    >
                      Export JSON
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-[26px] border border-dashed border-[var(--tgpi-border)] bg-white/55 p-9 text-center">
          <p className="text-lg font-extrabold text-[var(--tgpi-navy)]">
            No credential matches this view.
          </p>
          <p className="mt-2 text-sm text-[var(--tgpi-muted)]">
            Change the status filter or search term to inspect another record.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilter("all");
              setQuery("");
            }}
            className="mt-5 min-h-11 rounded-xl bg-[var(--tgpi-navy)] px-5 text-xs font-extrabold text-white"
          >
            Reset portfolio
          </button>
        </div>
      )}
    </section>
  );
}

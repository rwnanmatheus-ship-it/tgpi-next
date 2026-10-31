"use client";

import Link from "next/link";
import CertificateDownloadButton from "@/components/credentials/CertificateDownloadButton";
import { useDeferredValue, useState } from "react";
import { LocalizedText } from "@/components/localization/LocaleProvider";


export type CredentialPortfolioItem = {
  assessmentScore: number;
  courseTitle: string;
  id: string;
  issuedAt: string;
  learningHours: number;
  skills: Array<{ id: string; level: string; name: string }>;
  status: "active" | "revoked" | "replaced";
};

type PortfolioFilter = "all" | "active" | "revoked" | "replaced";
type PortfolioSort = "newest" | "score" | "title";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(date);
}

export default function CredentialPortfolioExplorer({
  items,
}: {
  items: CredentialPortfolioItem[];
}) {
  const [filter, setFilter] = useState<PortfolioFilter>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<PortfolioSort>("newest");
  const [message, setMessage] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const visible = items
    .filter((item) => filter === "all" || item.status === filter)
    .filter(
      (item) =>
        !deferredQuery ||
        [
          item.courseTitle,
          item.id,
          ...item.skills.map((skill) => skill.name),
        ].some((value) => value.toLowerCase().includes(deferredQuery)),
    )
    .sort((a, b) =>
      sort === "score"
        ? b.assessmentScore - a.assessmentScore
        : sort === "title"
          ? a.courseTitle.localeCompare(b.courseTitle)
          : b.issuedAt.localeCompare(a.issuedAt),
    );

  async function share(item: CredentialPortfolioItem) {
    const url = new URL(
      `/verify/credentials/${encodeURIComponent(item.id)}`,
      "https://www.theglobalpolymath.com",
    ).href;
    try {
      if (navigator.share)
        await navigator.share({
          title: `${item.courseTitle} — TGPI`,
          text: "My TGPI learning certificate. View the current verification record.",
          url,
        });
      else {
        await navigator.clipboard.writeText(url);
        setMessage("Verification link copied. You can now share it.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setMessage(
        "Sharing is unavailable. Open the certificate to copy its verification link.",
      );
    }
  }

  return (
    <section aria-labelledby="credential-portfolio-title">
      <div className="certificate-section-heading">
        <div>
          <p className="certificate-eyebrow">Your achievements</p>
          <h2 id="credential-portfolio-title">My certificates</h2>
        </div>
        <span className="certificate-count">
          {items.filter((item) => item.status === "active").length} earned
        </span>
      </div>
      {items.length > 0 ? (
        <>
          <div className="certificate-tools">
            <label>
              <span>Search certificates</span>
              <input
                type="search"
                value={query}
                maxLength={120}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Course, skill or certificate ID"
              />
            </label>
            <label>
              <span>Sort by</span>
              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value as PortfolioSort)
                }
              >
                <option value="newest">Newest first</option>
                <option value="score">Highest mastery</option>
                <option value="title">Course title</option>
              </select>
            </label>
          </div>
          <div aria-label="Filter certificates" className="certificate-filters">
            {(
              [
                { value: "all", label: "All records" },
                { value: "active", label: "Earned" },
                { value: "revoked", label: "Revoked" },
                { value: "replaced", label: "Replaced" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={filter === option.value}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
                <span>
                  {option.value === "all"
                    ? items.length
                    : items.filter((item) => item.status === option.value)
                        .length}
                </span>
              </button>
            ))}
          </div>
          <p role="status" aria-live="polite" className="certificate-feedback">
            {message}
          </p>
          <div className="certificate-earned-grid">
            {visible.map((item) => (
              <article className="certificate-earned" key={item.id}>
                <div className="certificate-earned-top">
                  <span>TGPI · Professional learning</span>
                  <span
                    className={`certificate-status${item.status === "revoked" ? " revoked" : ""}`}
                  >
                    {item.status === "active" ? "Earned" : item.status === "replaced" ? "Replaced" : "Revoked"}
                  </span>
                </div>
                <h3>{item.courseTitle}</h3>
                <p className="certificate-earned-meta">
                  {item.assessmentScore}% mastery · {item.learningHours} hours
                  <br /><LocalizedText text="Issued" />{" "}{formatDate(item.issuedAt)}
                </p>
                <div className="certificate-skills">
                  {item.skills.slice(0, 4).map((skill) => (
                    <span key={skill.id}>{skill.name}</span>
                  ))}
                </div>
                <div className="certificate-reference">
                  <span><LocalizedText text="Certificate ID" /></span>
                  <code>{item.id}</code>
                </div>
                <div className="certificate-earned-actions">
                  <Link
                    className="certificate-button"
                    href={`/certificates/${encodeURIComponent(item.id)}`}
                  >
                    Open certificate
                  </Link>
                  {item.status === "active" ? (
                    <>
                      <CertificateDownloadButton
                        credentialId={item.id}
                        className="certificate-button secondary"
                      />
                      <button
                        type="button"
                        className="certificate-button secondary"
                        onClick={() => void share(item)}
                      >
                        Share ↗
                      </button>
                    </>
                  ) : (
                    <Link
                      className="certificate-button secondary"
                      href={`/verify/credentials/${encodeURIComponent(item.id)}`}
                    >
                      View status
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
          {!visible.length && (
            <div className="certificate-empty">
              <h3>No certificates match your search.</h3>
              <button
                className="certificate-button secondary"
                type="button"
                onClick={() => {
                  setFilter("all");
                  setQuery("");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="certificate-empty">
          <span className="certificate-empty-symbol" aria-hidden="true">
            ✧
          </span>
          <div>
            <h3>Your first achievement starts here.</h3>
            <p>
              Issued certificates will appear here with download and sharing
              options. Explore your next certificate below.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

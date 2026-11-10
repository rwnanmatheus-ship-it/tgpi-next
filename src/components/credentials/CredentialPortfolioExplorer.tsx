"use client";


import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";
import { certificateVerificationUrl } from "@/lib/certificate-presentation";
import { LocalizedElement } from "@/components/localization/LocalizedElement";

import Link from "next/link";
import CertificateDownloadButton from "@/components/credentials/CertificateDownloadButton";
import { useDeferredValue, useState } from "react";


export type CredentialPortfolioItem = {
  assessmentScore: number;
  courseTitle: string;
  id: string;
  issuedAt: string;
  learningHours: number;
  skills: Array<{ id: string; level: string; name: string }>;
  status: "active" | "revoked" | "replaced";
  sharingAllowed?: boolean;
  automated?: boolean;
};

type PortfolioFilter = "all" | "active" | "revoked" | "replaced";
type PortfolioSort = "newest" | "score" | "title";

function formatDate(locale: import('@/lib/localization/config').Locale, value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : new Intl.DateTimeFormat(locale, {
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
  const { locale, t: localizeLabel } = useLocale();

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
    const url = certificateVerificationUrl(item.id);
    try {
      if (navigator.share)
        await navigator.share({
          title: `${item.courseTitle} — TGPI`,
          text: localizeLabel("My TGPI learning certificate. View the current verification record."),
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
          <p className="certificate-eyebrow"><LocalizedText text={"Your achievements"} /></p>
          <h2 id="credential-portfolio-title"><LocalizedText text={"My certificates"} /></h2>
        </div>
        <span className="certificate-count">
          {items.filter((item) => item.status === "active").length}{" "}<LocalizedText text={"earned"} /></span>
      </div>
      {items.length > 0 ? (
        <>
          <div className="certificate-tools">
            <label>
              <span><LocalizedText text={"Search certificates"} /></span>
              <LocalizedElement as="input"
                type="search"
                value={query}
                maxLength={120}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Course, skill or certificate ID"
              />
            </label>
            <label>
              <span><LocalizedText text={"Sort by"} /></span>
              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value as PortfolioSort)
                }
              >
                <option value="newest"><LocalizedText text={"Newest first"} /></option>
                <option value="score"><LocalizedText text={"Highest mastery"} /></option>
                <option value="title"><LocalizedText text={"Course title"} /></option>
              </select>
            </label>
          </div>
          <div aria-label={localizeLabel("Filter certificates")} className="certificate-filters">
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
                <LocalizedText text={option.label} />
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
            <LocalizedText text={message} />
          </p>
          <div className="certificate-earned-grid">
            {visible.map((item) => (
              <article className="certificate-earned" key={item.id}>
                <div className="certificate-earned-top">
                  <span><LocalizedText text={"TGPI · Professional learning"} /></span>
                  <span
                    className={`certificate-status${item.status === "revoked" ? " revoked" : ""}`}
                  >
                    {item.status === "active" ? <LocalizedText text={"Earned"} /> : item.status === "replaced" ? <LocalizedText text={"Replaced"} /> : <LocalizedText text={"Revoked"} />}
                  </span>
                </div>
                <h3>{item.courseTitle}</h3>
                <p className="certificate-earned-meta">
                  {item.assessmentScore}<LocalizedText text={"% mastery ·"} />{" "}{item.learningHours}{" "}<LocalizedText text="hours" />{" "}{item.automated && <LocalizedText text="estimated workload" />}<br /><LocalizedText text="Issued" />{" "}{formatDate(locale, item.issuedAt)}
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
                  ><LocalizedText text={"Open certificate"} /></Link>
                  {item.status === "active" ? (
                    <>
                      <CertificateDownloadButton
                        credentialId={item.id}
                        className="certificate-button secondary"
                      />
                      {item.sharingAllowed !== false && (
                        <button
                          type="button"
                          className="certificate-button secondary"
                          onClick={() => void share(item)}
                        ><LocalizedText text="Share ↗" /></button>
                      )}
                    </>
                  ) : item.sharingAllowed !== false && (
                    <Link
                      className="certificate-button secondary"
                      href={`/verify/credentials/${encodeURIComponent(item.id)}`}
                    ><LocalizedText text="View status" /></Link>
                  )}
                </div>
              </article>
            ))}
          </div>
          {!visible.length && (
            <div className="certificate-empty">
              <h3><LocalizedText text={"No certificates match your search."} /></h3>
              <button
                className="certificate-button secondary"
                type="button"
                onClick={() => {
                  setFilter("all");
                  setQuery("");
                }}
              ><LocalizedText text={"Clear filters"} /></button>
            </div>
          )}
        </>
      ) : (
        <div className="certificate-empty">
          <span className="certificate-empty-symbol" aria-hidden="true">
            ✧
          </span>
          <div>
            <h3><LocalizedText text={"Your first achievement starts here."} /></h3>
            <p><LocalizedText text={"Issued certificates will appear here with download and sharing options. Explore your next certificate below."} /></p>
          </div>
        </div>
      )}
    </section>
  );
}

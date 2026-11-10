"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";
import CertificateDownloadButton from "@/components/credentials/CertificateDownloadButton";
import { certificateDate, certificateVerificationUrl } from "@/lib/certificate-presentation";
import type { CredentialTrustState } from "@/lib/credential-standard";

export type CredentialPortfolioItem = {
  assessmentScore: number;
  courseTitle: string;
  id: string;
  issuedAt: string;
  learningHours: number;
  skills: Array<{ id: string; level: string; name: string }>;
  trustState: CredentialTrustState;
  sharingAllowed: boolean;
  automated: boolean;
};

const statusLabels = {
  active_verified: "Earned",
  revoked: "Revoked",
  replaced: "Replaced",
  integrity_review: "Integrity review required",
} as const satisfies Record<CredentialTrustState, string>;

const filters = [
  ["all", "All records"],
  ["active_verified", "Earned"],
  ["revoked", "Revoked"],
  ["replaced", "Replaced"],
  ["integrity_review", "Integrity review required"],
] as const;

const sortOptions = {
  newest: "Newest first",
  score: "Highest mastery",
  title: "Course title",
} as const;

function searchable(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

export default function CredentialPortfolioExplorer({ items }: { items: CredentialPortfolioItem[] }) {
  const { locale, t } = useLocale();
  const [filter, setFilter] = useState<(typeof filters)[number][0]>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<keyof typeof sortOptions>("newest");
  const [feedback, setFeedback] = useState<{ id: string; message: string }>();
  const deferredQuery = useDeferredValue(searchable(query.trim()));
  const visible = items
    .filter((item) => filter === "all" || item.trustState === filter)
    .filter((item) => !deferredQuery || [
      item.id,
      item.courseTitle,
      t(item.courseTitle),
      ...item.skills.flatMap((skill) => [skill.name, t(skill.name)]),
    ].some((value) => searchable(value).includes(deferredQuery)))
    .sort((a, b) =>
      sort === "score" ? b.assessmentScore - a.assessmentScore
        : sort === "title" ? t(a.courseTitle).localeCompare(t(b.courseTitle), locale)
          : b.issuedAt.localeCompare(a.issuedAt),
    );

  async function share(item: CredentialPortfolioItem) {
    const url = certificateVerificationUrl(item.id);
    const data = {
      title: item.courseTitle + " — TGPI",
      text: t("My TGPI learning certificate. View the current verification record."),
      url,
    };
    if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
      try {
        await navigator.share(data);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setFeedback({ id: item.id, message: "Verification link copied. You can now share it." });
    } catch {
      setFeedback({ id: item.id, message: "Sharing is unavailable. Open the certificate to copy its verification link." });
    }
  }

  return (
    <section aria-labelledby="credential-portfolio-title">
      <div className="certificate-section-heading">
        <div>
          <p className="credential-hub-kicker"><LocalizedText text="Your achievements" /></p>
          <h2 id="credential-portfolio-title"><LocalizedText text="Portfolio" /></h2>
        </div>
        <span className="certificate-count">{items.length} <LocalizedText text="All records" /></span>
      </div>
      {items.length > 0 ? (
        <>
          <div className="certificate-tools">
            <label>
              <span><LocalizedText text="Search certificates" /></span>
              <LocalizedElement as="input" type="search" value={query} maxLength={120}
                onChange={(event) => setQuery(event.target.value)} placeholder="Course, skill or certificate ID" />
            </label>
            <label>
              <span><LocalizedText text="Sort by" /></span>
              <select value={sort} onChange={(event) => setSort(event.target.value as keyof typeof sortOptions)}>
                {Object.entries(sortOptions).map(([value, label]) => <option key={value} value={value}>{t(label)}</option>)}
              </select>
            </label>
          </div>
          <div role="group" aria-label={t("Filter certificates")} className="certificate-filters">
            {filters.map(([value, label]) => {
              const count = value === "all" ? items.length : items.filter((item) => item.trustState === value).length;
              if (value === "integrity_review" && !count) return null;
              return (
                <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>
                  <LocalizedText text={label} /> <span>{count}</span>
                </button>
              );
            })}
          </div>
          <p role="status" className="sr-only"><LocalizedText text="{count} matching records" values={{ count: visible.length }} /></p>
          <div className="certificate-earned-grid">
            {visible.map((item) => (
              <article className="certificate-earned" key={item.id}>
                <div className="certificate-earned-top">
                  <span><LocalizedText text="TGPI · Professional learning" /></span>
                  <span className="certificate-status" data-state={item.trustState}><LocalizedText text={statusLabels[item.trustState]} /></span>
                </div>
                <h3>{item.courseTitle}</h3>
                <p className="certificate-earned-meta">
                  {item.assessmentScore}<LocalizedText text="% mastery ·" />{" "}{item.learningHours}{" "}<LocalizedText text="hours" />{" "}
                  {item.automated && <LocalizedText text="estimated workload" />}<br />
                  <LocalizedText text="Issued" />{" "}<LocalizedText text={certificateDate(item.issuedAt, locale)} />
                </p>
                <ul className="certificate-skills">
                  {item.skills.slice(0, 4).map((skill) => <li key={skill.id}>{skill.name}</li>)}
                </ul>
                <div className="certificate-reference">
                  <span><LocalizedText text="Certificate ID" /></span>
                  <code>{item.id}</code>
                </div>
                <div className="certificate-earned-actions">
                  <Link className="credential-hub-button" href={`/certificates/${encodeURIComponent(item.id)}`}>
                    <LocalizedText text="Open certificate" />
                  </Link>
                  {item.trustState === "active_verified" ? (
                    <>
                      <CertificateDownloadButton credentialId={item.id} className="credential-hub-button secondary" />
                      {item.sharingAllowed && (
                        <button type="button" className="credential-hub-button secondary" onClick={() => void share(item)}>
                          <LocalizedText text="Share ↗" />
                        </button>
                      )}
                    </>
                  ) : item.sharingAllowed && item.trustState !== "integrity_review" && (
                    <Link className="credential-hub-button secondary" href={`/verify/credentials/${encodeURIComponent(item.id)}`}>
                      <LocalizedText text="View status" />
                    </Link>
                  )}
                </div>
                <p role="status" className="certificate-feedback">
                  {feedback?.id === item.id && <LocalizedText text={feedback.message} />}
                </p>
              </article>
            ))}
          </div>
          {visible.length === 0 && (
            <div className="certificate-empty">
              <h3><LocalizedText text="No certificates match your search." /></h3>
              <button className="credential-hub-button secondary" type="button" onClick={() => { setFilter("all"); setQuery(""); }}>
                <LocalizedText text="Clear filters" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="certificate-empty">
          <span className="certificate-empty-symbol" aria-hidden="true">✧</span>
          <h3><LocalizedText text="Your first achievement starts here." /></h3>
          <p><LocalizedText text="Issued certificates will appear here with download and sharing options. Explore your next certificate below." /></p>
          <a href="#certificate-pathways" className="credential-hub-button secondary"><LocalizedText text="Learning paths" /> ↓</a>
        </div>
      )}
    </section>
  );
}

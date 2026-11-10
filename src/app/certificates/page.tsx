import type { Metadata } from "next";
import Link from "next/link";
import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import CredentialPortfolioExplorer from "@/components/credentials/CredentialPortfolioExplorer";
import CredentialSealStage from "@/components/credentials/CredentialSealStage";
import { coursesOverview } from "@/data/courses-overview";
import { requireUser } from "@/lib/auth/guards";
import { getCredentialTrustState } from "@/lib/credential-standard";
import { verifyLearningCredentialIntegrity } from "@/lib/credential-signing.server";
import { isLearningStorageConfigured } from "@/lib/firestore-admin-rest.server";
import { listUserLearningCredentials } from "@/lib/learning-records.server";
import { courseLearningPolicy } from "@/lib/learning/catalog-policy";
import { professionalCatalog } from "@/lib/learning/professional-catalog";
import { learningStatusLabels } from "@/lib/learning/unified-progress";
import { loadLearningSummary } from "@/lib/learning/unified-progress.server";
import { localizeMetadata } from "@/lib/localization/metadata.server";
import "@/components/credentials/credential-hub.css";
import "./certificates.css";

const sourceMetadata: Metadata = {
  title: "My certificates — TGPI",
  description: "Your achievements, next certificates and verified learning progress in one place.",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  const { userId } = await requireUser();
  const [records, learning] = await Promise.allSettled([
    listUserLearningCredentials(userId),
    loadLearningSummary(userId),
  ]);
  const recordsAvailable = isLearningStorageConfigured() && records.status === "fulfilled";
  const credentials = records.status === "fulfilled" ? records.value : [];
  const portfolio = credentials.map((item) => {
    const integrityVerified = verifyLearningCredentialIntegrity(item);
    return {
      assessmentScore: item.assessmentScore,
      courseTitle: item.courseTitle,
      id: item.id,
      issuedAt: item.issuedAt,
      learningHours: item.learningHours,
      skills: item.skills,
      trustState: getCredentialTrustState({ status: item.status, integrityVerified }),
      sharingAllowed: integrityVerified && (!item.professionalEvidence || item.professionalEvidence.sharing === true),
      automated: Boolean(item.automatedEvidence),
    };
  });
  const earned = portfolio.filter((item) => item.trustState === "active_verified");
  const skills = new Set(earned.flatMap((item) => item.skills.map((skill) => skill.id)));
  const workload = Math.round(earned.reduce((sum, item) => sum + item.learningHours, 0) * 10) / 10;
  const issuedCourseIds = new Set(credentials.filter((item) => item.status === "active").map((item) => item.courseId));
  const pathways = [...new Map(
    [...coursesOverview, ...professionalCatalog(process.env.VERCEL_ENV || process.env.NODE_ENV)]
      .map((item) => [item.id, item]),
  ).values()].filter((item) =>
    item.status === "available" && courseLearningPolicy(item).credentialStatus === "criteria_available" && !issuedCourseIds.has(item.id),
  );
  const pathwayIds = new Set(pathways.map((item) => item.id));
  const learningItems = learning.status === "fulfilled" ? learning.value.items : [];
  const progressUnavailable = learning.status === "rejected" || Boolean(learning.value.unavailable.length);
  const pendingPaths = learningItems.filter((item) => pathwayIds.has(item.courseId) && item.status !== "completed");
  const nextPath = pendingPaths.find((item) => item.status === "certificate_pending" || item.status === "approved")
    ?? pendingPaths[0];
  const otherPaths = pendingPaths.filter((item) => item.courseId !== nextPath?.courseId);
  const suggestedPaths = pathways.filter((item) => !pendingPaths.some((path) => path.courseId === item.id));

  return (
    <main className="credential-hub certificate-center">
      <div className="credential-hub-shell">
        <div className="credential-hub-bar">
          <p><span aria-hidden="true">✦</span> <LocalizedText text="The Global Polymath Institute" /></p>
          <Link href="/profile"><LocalizedText text="Workspace" /> <span aria-hidden="true">↗</span></Link>
        </div>
        <header className="credential-hub-hero">
          <div className="credential-hub-hero-copy">
            <p className="credential-hub-kicker"><span aria-hidden="true" /> <LocalizedText text="TGPI · Verified learning" /></p>
            <h1><LocalizedText text="My certificates" /></h1>
            <p className="credential-hub-lead"><LocalizedText text="Turn assessed learning into achievements you can show and verify." /></p>
            <div className="credential-hub-actions">
              {earned.length > 0
                ? <a className="credential-hub-button" href="#certificate-portfolio"><LocalizedText text="View my certificates" /> <span aria-hidden="true">↓</span></a>
                : <a className="credential-hub-button" href="#certificate-pathways"><LocalizedText text="Find my next certificate" /> <span aria-hidden="true">↓</span></a>}
              <Link href="/verify" className="credential-hub-button secondary"><LocalizedText text="Verify a certificate ↗" /></Link>
            </div>
          </div>
          <CredentialSealStage />
        </header>
        <dl className="certificate-stats">
          {([
            ["Certificates earned", earned.length],
            ["Verified skills", skills.size],
            ["Certified workload (hours)", workload],
          ] as const).map(([label, value], index) => (
            <div key={label}>
              <span aria-hidden="true">0{index + 1}</span>
              <dt><LocalizedText text={label} /></dt>
              <dd>{recordsAvailable ? value : "—"}</dd>
            </div>
          ))}
        </dl>
        <LocalizedElement as="nav" aria-label="Certificate sections" className="credential-hub-tabs">
          <a href="#certificate-portfolio"><span aria-hidden="true">▤</span> <LocalizedText text="Portfolio" /></a>
          <a href="#certificate-pathways"><span aria-hidden="true">◎</span> <LocalizedText text="Learning paths" /></a>
          <a href="#certificate-guide"><span aria-hidden="true">◇</span> <LocalizedText text="Certificate guide" /></a>
          <Link href="/verify"><span aria-hidden="true">↗</span> <LocalizedText text="Public verification" /></Link>
        </LocalizedElement>
        <div className="certificate-grid">
          <div id="certificate-portfolio" className="certificate-primary-column">
            {recordsAvailable ? (
              <CredentialPortfolioExplorer items={portfolio} />
            ) : (
              <section aria-labelledby="credential-portfolio-title">
                <div className="certificate-section-heading"><h2 id="credential-portfolio-title"><LocalizedText text="My certificates" /></h2></div>
                <p role="alert" className="certificate-notice"><LocalizedText text="Your certificates could not be loaded. Refresh this page to try again. Your learning records have not changed." /></p>
              </section>
            )}
          </div>
          <section id="certificate-pathways" className="certificate-pathway-panel" aria-labelledby="certificate-pathways-title">
            <div className="credential-hub-section-heading">
              <p className="credential-hub-kicker"><LocalizedText text="Your next milestone" /></p>
              <h2 id="certificate-pathways-title"><LocalizedText text="Learning paths" /></h2>
            </div>
            {nextPath ? (
              <article className="certificate-next">
                <span className="certificate-status"><LocalizedText text={learningStatusLabels[nextPath.status]} /></span>
                <h3><LocalizedText text={nextPath.title} /></h3>
                {nextPath.total > 0 && (
                  <div className="certificate-progress">
                    <p><LocalizedText text="Tracked learning steps" /> <strong>{nextPath.completed} / {nextPath.total}</strong></p>
                    <LocalizedElement as="progress" value={nextPath.completed} max={nextPath.total} aria-label="Tracked learning steps" />
                  </div>
                )}
                <Link href={nextPath.href} className="credential-hub-button"><LocalizedText text="Open learning path" /> <span aria-hidden="true">→</span></Link>
              </article>
            ) : (
              <p className="certificate-pathway-hint"><LocalizedText text={progressUnavailable ? "Some learning progress is temporarily unavailable." : "Choose a course with a certificate pathway to start your next achievement."} /></p>
            )}
            {(otherPaths.length > 0 || suggestedPaths.length > 0) && (
              <details className="certificate-pathways" open={!nextPath}>
                <summary><LocalizedText text="More certificates you can earn" /> <span>{otherPaths.length + suggestedPaths.length}</span></summary>
                <ul>
                  {otherPaths.map((item) => (
                    <li key={item.courseId}>
                      <Link href={item.href}>
                        <span><strong><LocalizedText text={item.title} /></strong><small><LocalizedText text={learningStatusLabels[item.status]} /></small></span>
                        <span aria-hidden="true">↗</span>
                      </Link>
                    </li>
                  ))}
                  {suggestedPaths.map((item) => (
                    <li key={item.id}>
                      <Link href={item.href}>
                        <span><strong><LocalizedText text={item.title} /></strong><small><LocalizedText text={item.category} /></small></span>
                        <span aria-hidden="true">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            )}
            <Link href="/courses" className="certificate-text-link"><LocalizedText text="Explore learning" /> <span aria-hidden="true">↗</span></Link>
          </section>
        </div>
        <section id="certificate-guide" className="certificate-guide" aria-labelledby="certificate-guide-title">
          <div className="credential-hub-section-heading">
            <p className="credential-hub-kicker"><LocalizedText text="TGPI · Verified learning" /></p>
            <h2 id="certificate-guide-title"><LocalizedText text="Certificate guide" /></h2>
          </div>
          <div>
            <details>
              <summary><LocalizedText text="How do I earn a certificate?" /></summary>
              <p><LocalizedText text="Open a learning path to see its completion, assessment and identity requirements." /></p>
            </details>
            <details>
              <summary><LocalizedText text="How do I share my certificate?" /></summary>
              <p><LocalizedText text="Download the latest PDF from an active record. If public sharing is enabled, you can also send the live verification link." /></p>
            </details>
            <details>
              <summary><LocalizedText text="What can someone verify?" /></summary>
              <p><LocalizedText text="The registry shows the status, learner, course and evidence of publicly shared certificates." /></p>
              <Link href="/verify" className="certificate-text-link"><LocalizedText text="Verify a certificate ↗" /></Link>
            </details>
          </div>
        </section>
        <footer className="credential-hub-footer">
          <Link href="/profile"><LocalizedText text="My workspace" /> ↗</Link>
          <Link href="/courses"><LocalizedText text="Learning" /> ↗</Link>
          <Link href="/global-key"><LocalizedText text="TGPI Global ID" /> ↗</Link>
          <Link href="/verify"><LocalizedText text="Public verification" /> ↗</Link>
        </footer>
      </div>
    </main>
  );
}

export async function generateMetadata() {
  return localizeMetadata(sourceMetadata);
}

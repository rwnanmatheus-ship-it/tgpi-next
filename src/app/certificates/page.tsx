import { localizeMetadata } from "@/lib/localization/metadata.server";

import { LocalizedElement } from "@/components/localization/LocalizedElement";
import type { Metadata } from "next";
import Image from "@/components/localization/LocalizedImage";
import CinematicImage from "@/components/ui/CinematicImage";
import Link from "next/link";
import { requireApiUser, requireUser } from "@/lib/auth/guards";
import {
  getLearningCertificationStatus,
  listUserLearningCredentials,
} from "@/lib/learning-records.server";
import { courses } from "@/data/courses";
import { coursesOverview } from "@/data/courses-overview";
import { courseLearningPolicy } from "@/lib/learning/catalog-policy";
import { professionalCatalog } from "@/lib/learning/professional-catalog";
import CertificateSeal from "@/components/credentials/CertificateSeal";
import CredentialPortfolioExplorer from "@/components/credentials/CredentialPortfolioExplorer";
import "./certificates.css";
import { LocalizedText } from "@/components/localization/LocaleProvider";


const sourceMetadata: Metadata = {
  title: "My certificates — TGPI",
  description:
    "Your achievements, next certificates and verified learning progress in one place.",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  await requireUser();
  const identity = await requireApiUser();
  const course = courses.find((item) => item.id === "global-english-2026");
  const [records, certification] = await Promise.allSettled([
    listUserLearningCredentials(identity.uid),
    getLearningCertificationStatus(identity, "global-english-2026"),
  ]);
  const credentials = records.status === "fulfilled" ? records.value : [];
  const status =
    certification.status === "fulfilled" ? certification.value : null;
  const active = credentials.filter((item) => item.status === "active");
  const skills = new Set(
    active.flatMap((item) => item.skills.map((skill) => skill.id)),
  );
  const issued = active.some((item) => item.courseId === course?.id);
  const earnedCourseIds = new Set(active.map((item) => item.courseId));
  const pathways = [
    ...new Map(
      [...coursesOverview, ...professionalCatalog(process.env.VERCEL_ENV || process.env.NODE_ENV)]
        .map((item) => [item.id, item]),
    ).values(),
  ].filter((item) =>
    item.id !== course?.id &&
    item.status === "available" &&
    courseLearningPolicy(item).credentialStatus === "criteria_available" &&
    !earnedCourseIds.has(item.id),
  );
  const eligibility = status?.eligibility;
  const progress = Math.min(
    100,
    Math.max(0, Math.round(eligibility?.checkpointCompletion || 0)),
  );

  return (
    <main className="certificate-center">
      <div className="certificate-shell">
        <LocalizedElement as="nav" aria-label="Breadcrumb" className="certificate-breadcrumb">
          <Link href="/profile"><LocalizedText text="Workspace" /></Link>
          <span aria-hidden="true">/</span>
          <span><LocalizedText text="Certificates" /></span>
        </LocalizedElement>
        <header className="certificate-header certificate-portfolio-hero">
          <div className="min-w-0">
            <p className="certificate-eyebrow"><LocalizedText text={"TGPI · Verified learning"} /></p>
            <h1><LocalizedText text={"Your learning. Recognized."} /></h1>
            <p><LocalizedText text={"See what you have earned, discover your next milestone and share your achievement."} /></p>
            <LocalizedElement as="nav" className="certificate-hero-actions" aria-label="Certificate sections">
              <a href="#certificate-portfolio" className="certificate-button"><LocalizedText text="My certificates" /></a>
              {pathways.length > 0 || (course && !issued) ? (
                <a href="#certificate-pathways" className="certificate-button secondary"><LocalizedText text="Learning paths" /></a>
              ) : (
                <Link href="/courses" className="certificate-button secondary"><LocalizedText text="Explore learning" /></Link>
              )}
            </LocalizedElement>
          </div>
          <div className="certificate-hero-art">
            <CertificateSeal
              className="certificate-hero-seal"
              sizes="(max-width: 650px) 160px, 280px"
              priority
            />
            <p><LocalizedText text="TGPI issuer quality seal" /></p>
          </div>
        </header>
        <div className="certificate-overview">
          <LocalizedElement as="section"
            className="certificate-identity"
            aria-label="Your certificate portfolio"
          >
            <Image
              src="/brand/tgpi-crest-metal-v3.webp"
              alt="TGPI"
              width={76}
              height={86}
              priority
            />
            <div className="min-w-0">
              <p className="certificate-eyebrow"><LocalizedText text={"Personal achievement portfolio"} /></p>
              <h2>{identity.publicName}</h2>
              <p><LocalizedText text={"Issued by The Global Polymath Institute"} /></p>
            </div>
          </LocalizedElement>
          <dl className="certificate-stats">
            <div>
              <dt><LocalizedText text={"Certificates earned"} /></dt>
              <dd>{records.status === "fulfilled" ? active.length : "—"}</dd>
            </div>
            <div>
              <dt><LocalizedText text={"Verified skills"} /></dt>
              <dd>{records.status === "fulfilled" ? skills.size : "—"}</dd>
            </div>
            <div>
              <dt><LocalizedText text={"Learning hours"} /></dt>
              <dd>
                {records.status === "fulfilled"
                  ? Math.round(
                      active.reduce(
                        (sum, item) => sum + item.learningHours,
                        0,
                      ) * 10,
                    ) / 10
                  : "—"}
              </dd>
            </div>
          </dl>
        </div>
        <div id="certificate-portfolio">
        {records.status === "rejected" && (
          <div role="alert" className="certificate-notice"><LocalizedText text={"Your certificates could not be loaded. Refresh this page to try again. Your learning records have not changed."} /></div>
        )}
        {status && !status.credentialConfigured && (
          <div className="certificate-notice" role="status"><LocalizedText text={"Certificate issuance is temporarily unavailable. You can continue learning; issuance requires TGPI server activation."} /></div>
        )}
        {records.status === "fulfilled" && (
          <CredentialPortfolioExplorer
            items={credentials.map((item) => ({
              assessmentScore: item.assessmentScore,
              courseTitle: item.courseTitle,
              id: item.id,
              issuedAt: item.issuedAt,
              learningHours: item.learningHours,
              skills: item.skills,
              status: item.status,
              sharingAllowed: item.professionalEvidence?.sharing !== false,
              automated: Boolean(item.automatedEvidence),
            }))}
          />
        )}
        </div>
        <div id="certificate-pathways">
        {course && !issued && (
          <section
            aria-labelledby="next-certificate-title"
            className="certificate-next-section"
          >
            <div className="certificate-section-heading">
              <div>
                <p className="certificate-eyebrow"><LocalizedText text={"Your next milestone"} /></p>
                <h2 id="next-certificate-title"><LocalizedText text={"Certificates you can earn"} /></h2>
              </div>
              <span className="certificate-count"><LocalizedText text={"1 available path"} /></span>
            </div>
            <article className="certificate-next">
              <div className="certificate-course-art" aria-hidden="true">
                <CinematicImage asset="learning-achievement" alt="" sizes="(max-width: 760px) 100vw, 360px" className="certificate-course-photo" />
                <Image
                  src="/brand/tgpi-crest-metal-v3.webp"
                  alt=""
                  width={90}
                  height={106}
                />
                <span><LocalizedText text={"PROFESSIONAL"} /><br /><LocalizedText text={"CERTIFICATE"} /></span>
                <p><LocalizedText text={"TGPI Verified Learning"} /></p>
              </div>
              <div className="certificate-course-content">
                <span className="certificate-status">
                  {!status
                    ? <LocalizedText text={"Progress unavailable"} />
                    : eligibility?.eligible
                      ? <LocalizedText text={"Ready for certification"} />
                      : progress
                        ? <LocalizedText text={"In progress"} />
                        : <LocalizedText text={"Available to earn"} />}
                </span>
                <h3><LocalizedText text={course.title} /></h3>
                <p><LocalizedText text={"Build practical English skills for life abroad. Complete your learning and required assessments to earn your certificate."} /></p>
                {status ? (
                  <>
                    <div className="certificate-progress-label">
                      <span><LocalizedText text={"Lessons completed"} /></span>
                      <strong>
                        {eligibility?.lessonsCompleted} /{" "}
                        {eligibility?.totalLessons}
                      </strong>
                    </div>
                    <LocalizedElement as="progress"
                      value={progress}
                      max={100}
                      aria-label="Course lesson completion"
                    >
                      {progress}%
                    </LocalizedElement>
                    <p className="certificate-progress-note">
                      {progress}<LocalizedText text={"% of lessons · Assessment and identity requirements are checked separately."} /></p>
                  </>
                ) : (
                  <p role="status"><LocalizedText text={"We could not confirm your progress. Open the certification path to retry."} /></p>
                )}
                <div className="certificate-course-actions">
                  <Link
                    href={`/courses/${course.id}${eligibility?.eligible || progress === 100 ? "/certification" : ""}`}
                    className="certificate-button"
                  >
                    {eligibility?.eligible
                      ? <LocalizedText text={"Review and issue certificate"} />
                      : progress === 100
                        ? <LocalizedText text={"Review certification requirements"} />
                        : progress
                          ? <LocalizedText text={"Continue learning"} />
                          : <LocalizedText text={"View course"} />}
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href={`/courses/${course.id}/certification`}
                    className="certificate-text-link"
                  ><LocalizedText text={"View requirements"} /></Link>
                </div>
              </div>
            </article>
          </section>
        )}
        {pathways.length > 0 && (
          <details className="certificate-pathways">
            <summary>
              <span><LocalizedText text="More certificates you can earn" /></span>
              <span className="certificate-count">{pathways.length}</span>
            </summary>
            <ul>
              {pathways.map((item) => (
                <li key={item.id}>
                  <Link href={item.href}>
                    <span>
                      <strong><LocalizedText text={item.title} /></strong>
                      <small><LocalizedText text={item.category} /></small>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        )}
        </div>
        <LocalizedElement as="section"
          className="certificate-help"
          aria-label="Certificate information"
        >
          <div>
            <h2><LocalizedText text={"Built to be shared. Easy to verify."} /></h2>
            <p><LocalizedText text={"Download your certificate as a PDF or share its public verification link. Only issued certificates appear as earned; revoked records remain clearly marked."} /></p>
          </div>
          <Link href="/verify" className="certificate-button secondary"><LocalizedText text={"Verify a certificate ↗"} /></Link>
        </LocalizedElement>
        <LocalizedElement as="nav"
          className="certificate-footer-links"
          aria-label="Connected workspace"
        >
          <Link href="/courses"><LocalizedText text="Learning" /></Link>
          <Link href="/global-key"><LocalizedText text={"Global Key"} /></Link>
          <Link href="/profile"><LocalizedText text="My workspace" /></Link>
        </LocalizedElement>
      </div>
    </main>
  );
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }

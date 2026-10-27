import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { requireApiUser, requireUser } from "@/lib/auth/guards";
import {
  getLearningCertificationStatus,
  listUserLearningCredentials,
} from "@/lib/learning-records.server";
import { courses } from "@/data/courses";
import CredentialPortfolioExplorer from "@/components/credentials/CredentialPortfolioExplorer";
import "./certificates.css";

export const metadata: Metadata = {
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
  const eligibility = status?.eligibility;
  const progress = Math.min(
    100,
    Math.max(0, Math.round(eligibility?.checkpointCompletion || 0)),
  );

  return (
    <main className="certificate-center">
      <div className="certificate-shell">
        <nav aria-label="Breadcrumb" className="certificate-breadcrumb">
          <Link href="/profile">Workspace</Link>
          <span aria-hidden="true">/</span>
          <span>Certificates</span>
        </nav>
        <header className="certificate-header">
          <div className="min-w-0">
            <p className="certificate-eyebrow">TGPI · Verified learning</p>
            <h1>Your learning. Recognized.</h1>
            <p>
              See what you have earned, discover your next milestone and share
              your achievement.
            </p>
          </div>
          <Link href="/courses" className="certificate-button secondary">
            Explore learning <span aria-hidden="true">↗</span>
          </Link>
        </header>
        <div className="certificate-overview">
          <section
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
              <p className="certificate-eyebrow">
                Personal achievement portfolio
              </p>
              <h2>{identity.publicName}</h2>
              <p>Issued by The Global Polymath Institute</p>
            </div>
          </section>
          <dl className="certificate-stats">
            <div>
              <dt>Certificates earned</dt>
              <dd>{records.status === "fulfilled" ? active.length : "—"}</dd>
            </div>
            <div>
              <dt>Verified skills</dt>
              <dd>{records.status === "fulfilled" ? skills.size : "—"}</dd>
            </div>
            <div>
              <dt>Learning hours</dt>
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
        {records.status === "rejected" && (
          <div role="alert" className="certificate-notice">
            Your certificates could not be loaded. Refresh this page to try
            again. Your learning records have not changed.
          </div>
        )}
        {status && !status.credentialConfigured && (
          <div className="certificate-notice" role="status">
            Certificate issuance is temporarily unavailable. You can continue
            learning; issuance requires TGPI server activation.
          </div>
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
            }))}
          />
        )}
        {course && !issued && (
          <section
            aria-labelledby="next-certificate-title"
            className="certificate-next-section"
          >
            <div className="certificate-section-heading">
              <div>
                <p className="certificate-eyebrow">Your next milestone</p>
                <h2 id="next-certificate-title">Certificates you can earn</h2>
              </div>
              <span className="certificate-count">1 available path</span>
            </div>
            <article className="certificate-next">
              <div className="certificate-course-art" aria-hidden="true">
                <Image
                  src="/brand/tgpi-crest-metal-v3.webp"
                  alt=""
                  width={90}
                  height={106}
                />
                <span>
                  PROFESSIONAL
                  <br />
                  CERTIFICATE
                </span>
                <p>TGPI Verified Learning</p>
              </div>
              <div className="certificate-course-content">
                <span className="certificate-status">
                  {!status
                    ? "Progress unavailable"
                    : eligibility?.eligible
                      ? "Ready for certification"
                      : progress
                        ? "In progress"
                        : "Available to earn"}
                </span>
                <h3>{course.title}</h3>
                <p>
                  Build practical English skills for life abroad. Complete your
                  learning and required assessments to earn your certificate.
                </p>
                {status ? (
                  <>
                    <div className="certificate-progress-label">
                      <span>Lessons completed</span>
                      <strong>
                        {eligibility?.lessonsCompleted} /{" "}
                        {eligibility?.totalLessons}
                      </strong>
                    </div>
                    <progress
                      value={progress}
                      max={100}
                      aria-label="Course lesson completion"
                    >
                      {progress}%
                    </progress>
                    <p className="certificate-progress-note">
                      {progress}% of lessons · Assessment and identity
                      requirements are checked separately.
                    </p>
                  </>
                ) : (
                  <p role="status">
                    We could not confirm your progress. Open the certification
                    path to retry.
                  </p>
                )}
                <div className="certificate-course-actions">
                  <Link
                    href={`/courses/${course.id}${eligibility?.eligible || progress === 100 ? "/certification" : ""}`}
                    className="certificate-button"
                  >
                    {eligibility?.eligible
                      ? "Review and issue certificate"
                      : progress === 100
                        ? "Review certification requirements"
                        : progress
                          ? "Continue learning"
                          : "View course"}
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href={`/courses/${course.id}/certification`}
                    className="certificate-text-link"
                  >
                    View requirements
                  </Link>
                </div>
              </div>
            </article>
          </section>
        )}
        <section
          className="certificate-help"
          aria-label="Certificate information"
        >
          <div>
            <h2>Built to be shared. Easy to verify.</h2>
            <p>
              Download your certificate as a PDF or share its public
              verification link. Only issued certificates appear as earned;
              revoked records remain clearly marked.
            </p>
          </div>
          <Link href="/verify" className="certificate-button secondary">
            Verify a certificate ↗
          </Link>
        </section>
        <nav
          className="certificate-footer-links"
          aria-label="Connected workspace"
        >
          <Link href="/courses">Learning</Link>
          <Link href="/global-key">Global Key</Link>
          <Link href="/profile">My workspace</Link>
        </nav>
        <section className="mt-8 rounded-3xl border border-[var(--tgpi-border)] bg-white p-5 sm:p-8" aria-labelledby="applied-certificate-routes">
          <h2 id="applied-certificate-routes" className="text-2xl font-semibold">Applied course certificates</h2>
          <p className="mt-3 text-sm leading-7">Each course has its own practical project and competency review. Complete its checkpoints and receive approval for every essential competency before issuing that course’s certificate. Review times vary; a pending submission is not an earned credential.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">{courses.filter(item => item.id !== "global-english-2026").map(item => <Link key={item.id} href={`/courses/${item.id}/project`} className="rounded-xl border p-4 text-sm font-bold leading-7 focus-visible:outline-2 focus-visible:outline-[var(--tgpi-gold)]">{item.title}<span className="mt-2 block text-xs font-normal">Open project and review status →</span></Link>)}</div>
        </section>
      </div>
    </main>
  );
}

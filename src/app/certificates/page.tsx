import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { requireUser } from "@/lib/auth/guards";
import { isLearningStorageConfigured } from "@/lib/firestore-admin-rest.server";
import { listUserLearningCredentials } from "@/lib/learning-records.server";

export const metadata: Metadata = {
  title: "Verified Learning Portfolio — TGPI",
  description:
    "Your private portfolio of TGPI learning credentials and evidence-backed capabilities.",
  robots: { follow: false, index: false },
};

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default async function CertificatesPage() {
  const session = await requireUser();
  const configured = isLearningStorageConfigured();
  const credentials = configured
    ? await listUserLearningCredentials(session.userId)
    : [];
  const activeCredentials = credentials.filter(
    (credential) => credential.status === "active",
  );
  const skills = new Set(
    activeCredentials.flatMap((credential) =>
      (credential.skills || []).map((skill) => skill.id),
    ),
  );
  const averageScore = activeCredentials.length
    ? Math.round(
        activeCredentials.reduce(
          (total, credential) => total + credential.assessmentScore,
          0,
        ) / activeCredentials.length,
      )
    : 0;

  return (
    <main className="min-h-screen bg-[#F3EFE6] px-4 py-8 text-[#0B1F3A] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-[1200px]">
        <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#07172D] text-white shadow-[0_32px_100px_rgba(11,31,58,.2)]">
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-[#C9A84D]/20" />
          <div className="relative grid lg:grid-cols-[1fr_330px]">
            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-4">
                <Image
                  src="/brand/tgpi-crest-v2.webp"
                  alt="TGPI crest"
                  width={70}
                  height={70}
                  className="h-14 w-14 object-contain sm:h-[70px] sm:w-[70px]"
                  priority
                />
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#E8CC7B]">
                    TGPI Verified Learning System
                  </p>
                  <p className="mt-1 text-xs font-bold text-white/55">
                    Private learner portfolio
                  </p>
                </div>
              </div>
              <h1 className="mt-8 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(3rem,7vw,6rem)] font-semibold leading-[.92] tracking-[-0.05em]">
                Evidence, not decoration.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#C8D1DE]">
                Every credential in this portfolio is connected to authenticated
                learning, protected scoring, a TGPI Global Key and a live public
                status record.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/courses/english-abroad/certification"
                  className="inline-flex min-h-12 items-center rounded-xl bg-[#E5BF5A] px-6 text-sm font-extrabold text-[#0B1F3A]"
                >
                  Open certification path →
                </Link>
                <Link
                  href="/verify"
                  className="inline-flex min-h-12 items-center rounded-xl border border-white/15 px-6 text-sm font-extrabold"
                >
                  Public verifier
                </Link>
              </div>
            </div>

            <aside className="border-t border-white/10 bg-white/[0.045] p-8 lg:border-l lg:border-t-0 sm:p-10">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E8CC7B]">
                Learning evidence passport
              </p>
              <dl className="mt-7 grid grid-cols-3 gap-3 lg:grid-cols-1">
                {[
                  ["Credentials", String(activeCredentials.length)],
                  ["Verified skills", String(skills.size)],
                  ["Average score", activeCredentials.length ? averageScore + "%" : "—"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <dt className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/45">
                      {label}
                    </dt>
                    <dd className="mt-2 text-2xl font-extrabold text-white">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        {!configured ? (
          <section className="mt-8 rounded-[26px] border border-[#D8B75D]/50 bg-[#FFF6D8] p-7">
            <p className="font-extrabold">Secure credential service awaiting activation.</p>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[#6F5719]">
              The verified-learning experience is installed, but TGPI will not
              create records until its server-only storage, signing key and
              Firestore deny rules are confirmed.
            </p>
          </section>
        ) : activeCredentials.length ? (
          <section className="mt-10" aria-labelledby="earned-credentials-title">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#956A13]">
                  Credential portfolio
                </p>
                <h2 id="earned-credentials-title" className="mt-3 text-4xl font-semibold">
                  Verified achievements
                </h2>
              </div>
              <p className="text-sm font-bold text-[#657082]">
                {activeCredentials.length} active record{activeCredentials.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {activeCredentials.map((credential) => (
                <Link
                  key={credential.id}
                  href={"/certificates/" + credential.id}
                  className="group overflow-hidden rounded-[28px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_20px_60px_rgba(11,31,58,.08)] transition hover:-translate-y-1 hover:border-[#C9A84D]"
                >
                  <div className="h-1.5 bg-gradient-to-r from-[#0B1F3A] via-[#C9A84D] to-[#275F9A]" />
                  <div className="p-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#956A13]">
                        TGPI Verified Learning
                      </span>
                      <span className="rounded-full bg-[#DDF1E7] px-3 py-1.5 text-[9px] font-extrabold uppercase text-[#175D41]">
                        Active · signature protected
                      </span>
                    </div>
                    <h3 className="mt-5 text-3xl font-semibold leading-tight">
                      {credential.courseTitle}
                    </h3>
                    <p className="mt-3 text-sm text-[#657082]">
                      {credential.assessmentScore}% mastery · {credential.learningHours} hours · issued {formatDate(credential.issuedAt)}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {(credential.skills || []).slice(0, 3).map((skill) => (
                        <span
                          key={skill.id}
                          className="rounded-full border border-[#DED7CA] bg-white px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#4E5662]"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                    <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#E7E1D5] pt-5">
                      <span className="break-all text-[10px] font-extrabold text-[#6A717C]">
                        {credential.id}
                      </span>
                      <span className="shrink-0 text-sm font-extrabold text-[#956A13] transition group-hover:translate-x-1">
                        Open →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="mt-9 overflow-hidden rounded-[30px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_24px_70px_rgba(11,31,58,.08)]">
            <div className="grid lg:grid-cols-[1fr_360px]">
              <div className="p-8 sm:p-10">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#956A13]">
                  First credential
                </p>
                <h2 className="mt-4 text-3xl font-semibold">
                  Build a record another person can inspect.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#657082]">
                  Complete 18 scenarios, pass six decision gates and the
                  integrated capstone, then connect the result to your verified
                  TGPI identity.
                </p>
                <Link
                  href="/courses/english-abroad/certification"
                  className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-[#0B1F3A] px-6 text-sm font-extrabold text-white"
                >
                  Start the evidence path →
                </Link>
              </div>
              <div className="bg-[#0B1F3A] p-8 text-white">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E8CC7B]">
                  Issuance gates
                </p>
                <ul className="mt-5 grid gap-4 text-sm font-bold leading-6 text-[#D5DDE7]">
                  <li>✓ Authenticated learner identity</li>
                  <li>✓ Server-scored assessment evidence</li>
                  <li>✓ 80% weighted mastery threshold</li>
                  <li>✓ Explicit public-name consent</li>
                  <li>✓ Revocable verification status</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        <section className="grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Learn", "Complete practical, scenario-based lessons."],
            ["02", "Prove", "Pass protected decision simulations."],
            ["03", "Issue", "Bind the result to your TGPI Global Key."],
            ["04", "Verify", "Share one live record with revocation status."],
          ].map(([number, title, description]) => (
            <article key={number} className="rounded-[22px] border border-[#D8D2C4] bg-white p-5">
              <p className="text-[10px] font-extrabold text-[#956A13]">{number}</p>
              <h2 className="mt-3 text-xl font-extrabold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#657082]">{description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

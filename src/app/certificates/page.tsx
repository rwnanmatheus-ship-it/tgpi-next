import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CredentialPortfolioExplorer, {
  type CredentialPortfolioItem,
} from "@/components/credentials/CredentialPortfolioExplorer";
import { requireUser } from "@/lib/auth/guards";
import { isLearningStorageConfigured } from "@/lib/firestore-admin-rest.server";
import { listUserLearningCredentials } from "@/lib/learning-records.server";
import CapabilitySystemRail from "@/components/capability/CapabilitySystemRail";

export const metadata: Metadata = {
  title: "Credential Intelligence Center — TGPI",
  description:
    "Your private TGPI capability ledger: inspect, verify, share and export evidence-backed learning credentials.",
  robots: { follow: false, index: false },
};

export const dynamic = "force-dynamic";

const EVIDENCE_PATH = [
  {
    detail: "Complete applied, scenario-based lessons.",
    href: "/courses",
    number: "01",
    title: "Build",
  },
  {
    detail: "Pass protected performance gates and capstones.",
    href: "/courses/english-abroad/certification",
    number: "02",
    title: "Prove",
  },
  {
    detail: "Bind achievement to a verified TGPI identity.",
    href: "/global-key",
    number: "03",
    title: "Issue",
  },
  {
    detail: "Share a live, revocable public evidence record.",
    href: "/verify",
    number: "04",
    title: "Verify",
  },
] as const;

const TRUST_LAYERS = [
  ["Identity", "Verified learner identity and Global Key binding"],
  ["Assessment", "Server-scored gates, capstone and transfer evidence"],
  ["Integrity", "Signed issuer record with a public fingerprint"],
  ["Lifecycle", "Live active or revoked status on every lookup"],
  ["Portability", "Privacy-safe JSON evidence for external inspection"],
] as const;

export default async function CertificatesPage() {
  const session = await requireUser();
  const configured = isLearningStorageConfigured();
  const credentials = configured
    ? await listUserLearningCredentials(session.userId)
    : [];
  const activeCredentials = credentials.filter(
    (credential) => credential.status === "active",
  );
  const revokedCount = credentials.length - activeCredentials.length;
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
  const learningHours = Math.round(
    activeCredentials.reduce(
      (total, credential) => total + credential.learningHours,
      0,
    ) * 10,
  ) / 10;
  const portfolioItems: CredentialPortfolioItem[] = credentials.map(
    (credential) => ({
      assessmentScore: credential.assessmentScore,
      courseTitle: credential.courseTitle,
      id: credential.id,
      issuedAt: credential.issuedAt,
      learningHours: credential.learningHours,
      skills: (credential.skills || []).map((skill) => ({
        id: skill.id,
        level: skill.level,
        name: skill.name,
      })),
      status: credential.status,
    }),
  );

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[var(--tgpi-canvas)] text-[var(--tgpi-navy)]"
    >
      <section className="relative overflow-hidden bg-[var(--tgpi-navy-deep)] px-4 pb-12 pt-7 text-white sm:px-6 sm:pb-16 sm:pt-10 lg:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(196,149,54,.2),transparent_27%),radial-gradient(circle_at_88%_14%,rgba(36,87,127,.38),transparent_30%),linear-gradient(rgba(255,255,255,.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.022)_1px,transparent_1px)] bg-[size:auto,auto,42px_42px,42px_42px]"
        />
        <div className="relative mx-auto max-w-[1240px]">
          <nav
            aria-label="Credential workspace"
            className="mb-7 flex flex-wrap items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/45"
          >
            <Link href="/profile" className="transition hover:text-white">
              Workspace
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--tgpi-gold-light)]">Credentials</span>
          </nav>

          <CapabilitySystemRail
            active="credentials"
            theme="dark"
            metric={{
              detail: "Signed learning evidence with a transparent lifecycle and public verifier.",
              label: "Active records",
              value: String(activeCredentials.length).padStart(2, "0"),
            }}
          />

          <div
            className="tgpi-card-3d mt-6 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] backdrop-blur-sm"
            data-tgpi-depth="hero"
            data-tgpi-tone="glass"
          >
            <div className="grid lg:grid-cols-[1fr_390px]">
              <div className="relative p-7 sm:p-11 lg:p-14">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-[var(--tgpi-gold)]/18"
                />
                <div className="relative flex items-center gap-4">
                  <Image
                    src="/brand/tgpi-crest-v2.webp"
                    alt="TGPI crest"
                    width={82}
                    height={82}
                    className="h-[70px] w-[70px] object-contain sm:h-[82px] sm:w-[82px]"
                    priority
                  />
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--tgpi-gold-light)]">
                      TGPI Credential Intelligence
                    </p>
                    <p className="mt-1 text-xs font-bold text-white/48">
                      Private capability ledger · live trust status
                    </p>
                  </div>
                </div>

                <h1 className="relative mt-9 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(3.4rem,7vw,7rem)] font-semibold leading-[0.86] tracking-[-0.055em]">
                  Prove what you can do.
                </h1>
                <p className="relative mt-7 max-w-2xl text-base leading-8 text-[#C9D4E2] sm:text-lg">
                  Turn completed learning into an inspectable capability record
                  connected to your TGPI identity, assessment evidence and a
                  live public verifier.
                </p>

                <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/courses/english-abroad/certification"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy-deep)] shadow-[0_14px_36px_rgba(196,149,54,.22)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)]"
                  >
                    Continue certification path →
                  </Link>
                  <Link
                    href="/verify"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/18 bg-white/[0.035] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-[var(--tgpi-gold-light)] hover:bg-white/[0.07]"
                  >
                    Open public verifier
                  </Link>
                </div>
              </div>

              <aside className="border-t border-white/10 bg-black/10 p-7 lg:border-l lg:border-t-0 sm:p-10">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                      Portfolio intelligence
                    </p>
                    <p className="mt-2 text-xs leading-6 text-white/48">
                      Active evidence only
                    </p>
                  </div>
                  <span className="rounded-full border border-[#6CC59A]/25 bg-[#174E3A]/70 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#A9E6C8]">
                    Live
                  </span>
                </div>
                <dl className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    ["Active records", String(activeCredentials.length)],
                    ["Verified skills", String(skills.size)],
                    ["Avg. mastery", activeCredentials.length ? averageScore + "%" : "—"],
                    ["Learning hours", activeCredentials.length ? String(learningHours) : "—"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"
                    >
                      <dt className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/40">
                        {label}
                      </dt>
                      <dd className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold text-white">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-center justify-between gap-4 text-xs">
                    <span className="font-bold text-white/52">
                      Lifecycle history
                    </span>
                    <span className="font-extrabold text-white">
                      {revokedCount} revoked
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] leading-5 text-white/38">
                    Revoked records remain visible to preserve an honest audit
                    trail and can never appear as active.
                  </p>
                </div>
              </aside>
            </div>
          </div>

          <nav
            aria-label="Evidence journey"
            className="tgpi-card-3d mt-5 grid overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035] sm:grid-cols-2 lg:grid-cols-4"
            data-tgpi-depth="subtle"
            data-tgpi-tone="glass"
          >
            {EVIDENCE_PATH.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative flex min-h-28 gap-4 border-b border-white/10 p-5 transition hover:bg-white/[0.06] sm:border-r lg:border-b-0 lg:last:border-r-0"
              >
                <span className="text-[10px] font-extrabold tracking-[0.18em] text-[var(--tgpi-gold-light)]">
                  {item.number}
                </span>
                <span>
                  <span className="block font-[var(--tgpi-font-display)] text-2xl font-semibold text-white">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-white/48">
                    {item.detail}
                  </span>
                </span>
                {index < EVIDENCE_PATH.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="ml-auto text-white/25 transition group-hover:translate-x-1 group-hover:text-[var(--tgpi-gold-light)]"
                  >
                    →
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        {!configured ? (
          <section
            className="tgpi-card-3d rounded-[28px] border border-[#D8B75D]/50 bg-[#FFF6D8] p-7 sm:p-9"
            data-tgpi-depth="raised"
            data-tgpi-tone="gold"
          >
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#7A5A14]">
              Protected activation gate
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Secure credential issuance is awaiting server activation.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6F5719]">
              The learner experience remains available, but TGPI will not issue
              records until server-only storage, the signing key and Firestore
              deny rules are confirmed.
            </p>
          </section>
        ) : credentials.length ? (
          <CredentialPortfolioExplorer items={portfolioItems} />
        ) : (
          <section
            className="tgpi-card-3d overflow-hidden rounded-[30px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)]"
            data-tgpi-depth="raised"
            data-tgpi-tone="paper"
          >
            <div className="grid lg:grid-cols-[1fr_390px]">
              <div className="p-8 sm:p-10">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
                  First verified credential
                </p>
                <h2 className="mt-4 max-w-2xl text-4xl font-semibold">
                  Build a capability record another person can inspect.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--tgpi-muted)]">
                  Complete 18 applied scenarios, pass six performance gates and
                  the integrated capstone, then bind the result to your verified
                  TGPI identity.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/courses/english-abroad/certification"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white"
                  >
                    Start the evidence path →
                  </Link>
                  <Link
                    href="/global-key"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--tgpi-border)] bg-white px-6 text-sm font-extrabold text-[var(--tgpi-navy)]"
                  >
                    Review identity readiness
                  </Link>
                </div>
              </div>
              <div className="bg-[var(--tgpi-navy)] p-8 text-white sm:p-10">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                  Issuance gates
                </p>
                <ul className="mt-5 grid gap-4 text-sm font-bold leading-6 text-[#D5DDE7]">
                  <li className="flex gap-3"><span className="text-[#6CC59A]">✓</span>Authenticated learner identity</li>
                  <li className="flex gap-3"><span className="text-[#6CC59A]">✓</span>Server-scored assessment evidence</li>
                  <li className="flex gap-3"><span className="text-[#6CC59A]">✓</span>80% weighted mastery threshold</li>
                  <li className="flex gap-3"><span className="text-[#6CC59A]">✓</span>Explicit public-name consent</li>
                  <li className="flex gap-3"><span className="text-[#6CC59A]">✓</span>Revocable verification status</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        <section
          aria-labelledby="trust-system-title"
          className="tgpi-card-3d mt-12 overflow-hidden rounded-[30px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] sm:mt-16"
          data-tgpi-depth="floating"
          data-tgpi-tone="paper"
        >
          <div className="grid lg:grid-cols-[.75fr_1.25fr]">
            <div className="bg-[var(--tgpi-navy)] p-8 text-white sm:p-10">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                Trust by design
              </p>
              <h2
                id="trust-system-title"
                className="mt-4 text-4xl font-semibold leading-[0.98] sm:text-5xl"
              >
                More than a completion PDF.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#C9D4E2]">
                A TGPI credential is a living evidence record. Its value comes
                from the learning, assessment, identity and verification chain
                behind the visual certificate.
              </p>
              <Link
                href="/verify"
                className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy-deep)]"
              >
                Inspect the public registry →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2">
              {TRUST_LAYERS.map(([title, description], index) => (
                <article
                  key={title}
                  className="border-b border-[var(--tgpi-border-soft)] p-6 last:border-b-0 sm:border-r sm:p-7 sm:[&:nth-child(even)]:border-r-0"
                >
                  <p className="text-[10px] font-extrabold tracking-[0.18em] text-[var(--tgpi-gold-strong)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-[var(--tgpi-navy)]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--tgpi-muted)]">
                    {description}
                  </p>
                </article>
              ))}
              <article className="flex items-center bg-[var(--tgpi-gold-soft)] p-6 sm:p-7">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-strong)]">
                    Standards direction
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-[var(--tgpi-navy)]">
                    Open Badges 3.0, W3C VC 2.0 and CLR 2.0 are implementation
                    alignment targets—not claims of external accreditation.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-4 sm:grid-cols-3 sm:mt-16">
          {[
            {
              detail: "Develop the next assessed global capability.",
              href: "/courses",
              label: "Learning",
              title: "Continue building",
            },
            {
              detail: "Strengthen the verified identity behind each record.",
              href: "/global-key",
              label: "Identity",
              title: "Open Global Key",
            },
            {
              detail: "Connect achievements to your private decision workspace.",
              href: "/profile",
              label: "System",
              title: "Return to workspace",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="tgpi-card-3d group rounded-[24px] border border-[var(--tgpi-border)] bg-white p-6"
              data-tgpi-depth="subtle"
              data-tgpi-interactive="true"
              data-tgpi-tone="white"
            >
              <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-strong)]">
                {item.label}
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--tgpi-muted)]">
                {item.detail}
              </p>
              <span className="mt-5 inline-flex text-sm font-extrabold text-[var(--tgpi-gold-strong)] transition group-hover:translate-x-1">
                Open →
              </span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

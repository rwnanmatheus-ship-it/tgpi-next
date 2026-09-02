import Link from "next/link";
import BrandCrest from "@/components/BrandCrest";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const footerGroups: ReadonlyArray<{
  title: string;
  links: ReadonlyArray<FooterLink>;
}> = [
  {
    title: "Decision intelligence",
    links: [
      { label: "Explore 195 countries", href: "/countries" },
      { label: "TGPI Compare", href: "/compare" },
      { label: "Country Fit & personal plan", href: "/country-fit" },
      { label: "Sources & methodology", href: "/intelligence" },
    ],
  },
  {
    title: "Capability",
    links: [
      { label: "TGPI Learning", href: "/courses" },
      { label: "Documents OS", href: "/passport" },
      { label: "Certificates", href: "/certificates" },
      { label: "Global Key", href: "/profile" },
    ],
  },
  {
    title: "Institute",
    links: [
      { label: "About TGPI", href: "/about" },
      { label: "Why TGPI", href: "/why" },
      { label: "Resources", href: "/resources" },
      { label: "Community", href: "/community" },
    ],
  },
  {
    title: "Access & trust",
    links: [
      { label: "Premium", href: "/pricing" },
      { label: "Sign in", href: "/sign-in" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Contact", href: "mailto:contact@theglobalpolymath.com" },
      {
        label: "Instagram ↗",
        href: "https://www.instagram.com/theglobalpolymath/",
        external: true,
      },
    ],
  },
];

const decisionPath = [
  { step: "01", title: "Explore", detail: "Understand the world", href: "/countries" },
  { step: "02", title: "Compare", detail: "Expose the trade-offs", href: "/compare" },
  { step: "03", title: "Prepare", detail: "Organize the evidence", href: "/passport" },
  { step: "04", title: "Learn", detail: "Build the capability", href: "/courses" },
  { step: "05", title: "Prove", detail: "Carry verified progress", href: "/certificates" },
] as const;

const systemMetrics = [
  ["195", "Country profiles"],
  ["05", "Decision lenses"],
  ["01", "Connected global system"],
] as const;

export default function GlobalFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[var(--tgpi-navy-deep)] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_15%,rgba(197,150,50,0.17),transparent_25%),radial-gradient(circle_at_88%_6%,rgba(30,74,118,0.3),transparent_28%),linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:auto,auto,42px_42px,42px_42px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-0 font-[var(--tgpi-font-display)] text-[22rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.018]"
      >
        TGPI
      </div>

      <div className="tgpi-container relative py-10 sm:py-14 lg:py-16">
        <section
          aria-labelledby="footer-system-title"
          className="overflow-hidden rounded-[28px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] shadow-[0_32px_90px_rgba(0,0,0,0.2)]"
        >
          <div className="grid lg:grid-cols-[1.35fr_.65fr]">
            <div className="p-6 sm:p-9 lg:p-11">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[var(--tgpi-gold-light)]">
                TGPI Global Decision System
              </p>
              <h2
                id="footer-system-title"
                className="mt-4 max-w-3xl font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl"
              >
                Turn a global ambition into a connected decision.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#C9D4E2] sm:text-base">
                Compare countries, organize evidence, develop practical capability and keep every next step connected to one global identity.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/sign-up"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--tgpi-gold)] px-6 py-3 text-sm font-extrabold text-[var(--tgpi-navy-deep)] shadow-[0_14px_35px_rgba(197,150,50,0.2)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)]"
                >
                  Create your Global Key
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/[0.035] px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-[var(--tgpi-gold-light)] hover:bg-white/[0.07]"
                >
                  Start with Compare →
                </Link>
              </div>
            </div>

            <dl className="grid grid-cols-3 border-t border-white/10 bg-black/10 lg:grid-cols-1 lg:border-l lg:border-t-0">
              {systemMetrics.map(([value, label]) => (
                <div
                  key={label}
                  className="flex flex-col justify-center border-r border-white/10 px-4 py-6 last:border-r-0 lg:border-b lg:border-r-0 lg:px-8 lg:last:border-b-0"
                >
                  <dt className="order-2 mt-1 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/45 sm:text-[10px]">
                    {label}
                  </dt>
                  <dd className="order-1 font-[var(--tgpi-font-display)] text-3xl font-semibold text-[var(--tgpi-gold-light)] sm:text-4xl">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <nav className="grid border-t border-white/10 sm:grid-cols-5" aria-label="TGPI connected decision path">
            {decisionPath.map(({ step, title, detail, href }, index) => (
              <Link
                key={title}
                href={href}
                className="group relative flex min-h-24 items-center gap-4 border-b border-white/10 px-5 py-5 transition hover:bg-white/[0.055] sm:min-h-32 sm:flex-col sm:items-start sm:justify-center sm:border-b-0 sm:border-r sm:px-5 sm:last:border-r-0"
              >
                <span className="text-[10px] font-extrabold tracking-[0.2em] text-[var(--tgpi-gold-light)]">{step}</span>
                <span>
                  <span className="block font-[var(--tgpi-font-display)] text-xl font-semibold text-white sm:text-2xl">{title}</span>
                  <span className="mt-1 block text-xs leading-5 text-white/48">{detail}</span>
                </span>
                {index < decisionPath.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="ml-auto text-[var(--tgpi-gold-light)]/45 transition group-hover:translate-x-1 sm:absolute sm:right-4 sm:top-5"
                  >
                    →
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
        </section>

        <div className="grid gap-12 py-14 lg:grid-cols-[1.1fr_2fr] lg:gap-16 lg:py-16">
          <div>
            <Link href="/" className="group inline-flex items-center gap-5" aria-label="TGPI home">
              <BrandCrest
                width={1041}
                height={1274}
                sizes="92px"
                className="h-[106px] w-auto drop-shadow-[0_16px_32px_rgba(0,0,0,0.34)] transition duration-300 group-hover:-translate-y-1"
              />
              <span>
                <span className="block font-[var(--tgpi-font-display)] text-4xl font-semibold tracking-[0.08em] text-white">
                  TGPI
                </span>
                <span className="mt-1 block max-w-[15rem] text-[9px] font-extrabold uppercase leading-5 tracking-[0.25em] text-[var(--tgpi-gold-light)]">
                  The Global Polymath Institute
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#C8D2E0] sm:text-base">
              An independent institute building decision intelligence, practical education and global adaptability into one connected platform.
            </p>

            <div className="mt-7 border-l border-[var(--tgpi-gold)]/60 pl-4">
              <p className="font-[var(--tgpi-font-display)] text-xl font-semibold text-white">
                Countries are not dreams. They are decisions.
              </p>
              <p className="mt-2 text-xs leading-6 text-white/45">Built in Brazil for people navigating the world.</p>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4" aria-label="TGPI footer navigation">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="font-[var(--tgpi-font-sans)] text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                  {group.title}
                </h2>
                <ul className="mt-5 space-y-1">
                  {group.links.map(({ label, href, external }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        className="inline-flex min-h-11 items-center text-sm font-semibold text-[#CCD6E3] transition hover:translate-x-0.5 hover:text-white focus-visible:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="grid gap-5 border-t border-white/10 pt-7 text-xs leading-6 text-[#94A5B9] lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p>© {new Date().getFullYear()} TGPI — The Global Polymath Institute. All rights reserved.</p>
            <p className="mt-1 max-w-3xl text-white/38">
              Educational decision intelligence does not replace official legal, financial, immigration or local professional guidance.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-bold text-[#BBC7D6] lg:justify-end">
            <Link href="/authority" className="transition hover:text-white">Methodology</Link>
            <Link href="/privacy" className="transition hover:text-white">Privacy</Link>
            <Link href="/terms" className="transition hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

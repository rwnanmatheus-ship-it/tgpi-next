import Image from "next/image";
import Link from "next/link";

const footerGroups = [
  {
    title: "Product",
    links: [
      ["Countries", "/countries"],
      ["Compare", "/compare"],
      ["Learn", "/courses"],
      ["Documents", "/passport"],
      ["Premium", "/pricing"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About TGPI", "/about"],
      ["Why TGPI", "/why"],
      ["Authority", "/authority"],
      ["Resources", "/resources"],
      ["Community", "/community"],
    ],
  },
  {
    title: "Account",
    links: [
      ["Dashboard", "/dashboard"],
      ["Profile", "/profile"],
      ["Passport", "/passport"],
      ["Certificates", "/certificates"],
      ["Sign in", "/login"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Contact", "mailto:contact@theglobalpolymath.com"],
      ["Instagram", "https://www.instagram.com/theglobalpolymath/"],
    ],
  },
] as const;

export default function GlobalFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--tgpi-navy-deep)] text-white">
      <div className="tgpi-container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-4" aria-label="TGPI home">
              <Image
                src="/brand/tgpi-crest.svg"
                alt="TGPI crest"
                width={58}
                height={66}
                className="h-[58px] w-auto"
              />
              <span>
                <span className="block font-[var(--tgpi-font-display)] text-3xl font-semibold tracking-[0.08em] text-white">
                  TGPI
                </span>
                <span className="mt-1 block text-[9px] font-extrabold uppercase tracking-[0.28em] text-[var(--tgpi-gold-light)]">
                  The Global Polymath Institute
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#C8D2E0] sm:text-base">
              A global decision system for comparing countries, preparing international moves and building a life abroad with evidence, clarity and strategy.
            </p>

            <div className="mt-7 flex flex-wrap gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]">
              <span className="rounded-full border border-white/15 px-3 py-2">Data</span>
              <span className="rounded-full border border-white/15 px-3 py-2">Education</span>
              <span className="rounded-full border border-white/15 px-3 py-2">Mobility</span>
              <span className="rounded-full border border-white/15 px-3 py-2">Decision</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="font-[var(--tgpi-font-sans)] text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                  {group.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="inline-flex min-h-11 items-center text-sm font-semibold text-[#D8E0EA] transition hover:text-white focus-visible:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-[#9EADBF] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TGPI — The Global Polymath Institute.</p>
          <p>Countries are not dreams. They are decisions.</p>
        </div>
      </div>
    </footer>
  );
}

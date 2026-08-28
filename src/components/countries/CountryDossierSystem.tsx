import Link from "next/link";

type CountryDossierNavigationProps = {
  countryName: string;
};

type CountrySystemPathProps = {
  countryName: string;
  countrySlug: string;
};

const DOSSIER_SECTIONS = [
  { href: "#overview", index: "01", label: "Brief" },
  { href: "#decision-signals", index: "02", label: "Signals" },
  { href: "#cost-of-living", index: "03", label: "Cost" },
  { href: "#strategic-fit", index: "04", label: "Fit" },
  { href: "#documents-to-verify", index: "05", label: "Prepare" },
  { href: "#next-step", index: "06", label: "Act" },
] as const;

export function CountryDossierNavigation({
  countryName,
}: CountryDossierNavigationProps) {
  return (
    <nav
      aria-label={`${countryName} intelligence dossier chapters`}
      className="sticky top-[72px] z-30 mt-5 rounded-2xl border border-[#D8D0C0]/90 bg-[rgba(255,253,248,0.92)] p-2 shadow-[0_16px_45px_rgba(7,26,50,0.1)] backdrop-blur-xl"
    >
      <div className="flex snap-x gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {DOSSIER_SECTIONS.map((section) => (
          <a
            key={section.href}
            href={section.href}
            className="group flex min-h-12 min-w-[118px] snap-start items-center gap-3 rounded-xl px-4 transition hover:bg-[#071A32] focus-visible:bg-[#071A32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59632] sm:min-w-0 sm:flex-1"
          >
            <span className="font-mono text-[9px] font-bold tracking-[0.18em] text-[#A07520] transition group-hover:text-[#F4D77D] group-focus-visible:text-[#F4D77D]">
              {section.index}
            </span>
            <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#1C3858] transition group-hover:text-white group-focus-visible:text-white">
              {section.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}

const SYSTEM_STEPS = [
  {
    index: "01",
    eyebrow: "Decision Intelligence",
    title: "Compare the trade-offs",
    description:
      "Place this destination beside two alternatives using the same transparent framework.",
    getHref: (slug: string) => `/compare?country=${slug}`,
  },
  {
    index: "02",
    eyebrow: "Documents OS",
    title: "Build the evidence layer",
    description:
      "Translate the destination into documents, validation gaps and a preparation sequence.",
    getHref: () => "/passport",
  },
  {
    index: "03",
    eyebrow: "TGPI Learning",
    title: "Develop country readiness",
    description:
      "Strengthen communication, cultural intelligence and practical international capability.",
    getHref: () => "/courses",
  },
  {
    index: "04",
    eyebrow: "Global Key",
    title: "Keep the decision connected",
    description:
      "Carry goals, saved evidence and learning progress inside one global identity.",
    getHref: () => "/profile",
  },
] as const;

export function CountrySystemPath({
  countryName,
  countrySlug,
}: CountrySystemPathProps) {
  return (
    <section
      id="next-step"
      className="mt-8 scroll-mt-36 overflow-hidden rounded-[2rem] border border-[#183753] bg-[#06172B] text-white shadow-[0_28px_80px_rgba(7,26,50,0.2)]"
    >
      <div className="grid gap-8 border-b border-white/10 px-6 py-8 md:grid-cols-[1.08fr_0.92fr] md:px-8 lg:px-10">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#E6C565]">
            TGPI Connected Decision Route
          </p>
          <h2 className="mt-3 max-w-2xl font-[var(--tgpi-font-display)] text-3xl font-semibold leading-tight md:text-5xl">
            Turn {countryName} from a profile into a prepared decision.
          </h2>
        </div>
        <p className="self-end text-sm leading-7 text-[#B7C4D4] md:text-base">
          Country Intelligence is the first layer. The TGPI system then connects
          comparison, evidence, capability and identity so research continues as
          action.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4">
        {SYSTEM_STEPS.map((step) => (
          <Link
            key={step.index}
            href={step.getHref(countrySlug)}
            className="group relative min-h-[250px] border-b border-white/10 p-6 transition hover:bg-[#0B2541] focus-visible:bg-[#0B2541] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E6C565] md:border-r xl:border-b-0"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#E6C565]">
                {step.index}/04
              </span>
              <span
                aria-hidden="true"
                className="text-lg text-[#E6C565] transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </div>
            <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.22em] text-[#91A9C2]">
              {step.eyebrow}
            </p>
            <h3 className="mt-3 text-xl font-extrabold text-white">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#B7C4D4]">
              {step.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { homeSearchTopics } from "@/data/home-system";

const editorialVisuals: ReadonlyArray<{
  image: string;
  accent: string;
  imageAlt: string;
  tone: string;
  line: string;
}> = [
  {
    image: "/images/home/tgpi-home-country-intelligence-banner-v2.webp",
    accent: "Country intelligence",
    imageAlt: "Global knowledge observatory connecting an atlas to international architecture",
    tone: "border-[#B8CBDC] bg-[#E8F0F6] text-[#174C73]",
    line: "bg-[var(--tgpi-blue)]",
  },
  {
    image: "/images/home/tgpi-home-compare-intelligence-banner-v2.webp",
    accent: "Compare",
    imageAlt: "Three international pathways compared through maps and a central compass",
    tone: "border-[#D8C187] bg-[#F6ECD2] text-[#6E4D16]",
    line: "bg-[var(--tgpi-gold)]",
  },
  {
    image: "/images/home/tgpi-home-documents-intelligence-banner-v2.webp",
    accent: "Documents OS",
    imageAlt: "Organized evidence archive with blank folios and international verification instruments",
    tone: "border-[#AFCBC7] bg-[#E5EFEC] text-[#285D5F]",
    line: "bg-[var(--tgpi-teal)]",
  },
  {
    image: "/images/home/tgpi-home-learning-intelligence-banner-v2.webp",
    accent: "TGPI Learning",
    imageAlt: "Global learning atelier with an atlas, practical workbook and capability cards",
    tone: "border-[#D3C8B9] bg-[#F4EFE6] text-[#51483D]",
    line: "bg-[#7B6951]",
  },
];

export default function HomeInstagramContinuity() {
  return (
    <section
      className="relative overflow-hidden border-y border-[var(--tgpi-border-soft)] bg-[var(--tgpi-surface-strong)] px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="home-intelligence-library-title"
    >
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_88%_0%,rgba(36,87,127,.08),transparent_28%),radial-gradient(circle_at_8%_100%,rgba(196,149,54,.08),transparent_24%)]" />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
                Organic intelligence network
              </p>
              <span className="h-px w-10 bg-[var(--tgpi-gold)]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-muted)]">
                Questions → evidence → action
              </span>
            </div>
            <h2
              id="home-intelligence-library-title"
              className="mt-5 max-w-[920px] font-[var(--tgpi-font-display)] text-[clamp(2.75rem,5vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-[var(--tgpi-ink)]"
            >
              Turn every global question into a deeper decision.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--tgpi-muted)] sm:text-lg">
              TGPI connects discoverable editorial questions to country profiles, comparison, preparation and learning—so useful content continues inside the product.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/resources"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
            >
              Explore resources
            </Link>
            <a
              href="https://www.instagram.com/theglobalpolymath/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[var(--tgpi-border)] bg-white px-6 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
            >
              Instagram ↗
            </a>
          </div>
        </div>

        <div
          className="-mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0"
          aria-label="TGPI global decision intelligence topics"
        >
          {homeSearchTopics.map((topic, index) => {
            const visual = editorialVisuals[index];

            return (
              <Link
                key={topic.title}
                href={topic.href}
                data-tgpi-editorial-topic={topic.eyebrow}
                className="group min-w-[88vw] snap-center overflow-hidden rounded-[30px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] shadow-[var(--tgpi-shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--tgpi-gold)]/60 hover:shadow-[var(--tgpi-shadow-premium)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] sm:min-w-[66vw] lg:min-w-0"
              >
                <article className="grid min-h-full md:grid-cols-[0.92fr_1.08fr]">
                  <div className="relative min-h-[230px] overflow-hidden md:min-h-[330px]">
                    <Image
                      src={visual.image}
                      alt={visual.imageAlt}
                      fill
                      quality={86}
                      sizes="(max-width: 767px) 88vw, (max-width: 1023px) 66vw, 300px"
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,20,38,.02),rgba(3,20,38,.12)_62%,rgba(3,20,38,.48))]" />
                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-[var(--tgpi-navy-deep)]/78 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      <span className={`h-1.5 w-1.5 rounded-full ${visual.line}`} />
                      {visual.accent}
                    </div>
                    <span className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-[var(--tgpi-navy-deep)]/80 text-[10px] font-extrabold text-[var(--tgpi-gold-light)] backdrop-blur-md">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="flex flex-col p-6 sm:p-7 lg:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <p className={`w-fit rounded-full border px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.17em] ${visual.tone}`}>
                      {topic.eyebrow}
                      </p>
                      <span className="text-lg text-[var(--tgpi-gold-strong)] transition group-hover:translate-x-1" aria-hidden="true">→</span>
                    </div>
                    <h3 className="mt-5 font-[var(--tgpi-font-display)] text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-[var(--tgpi-navy)]">
                      {topic.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--tgpi-muted)]">{topic.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 border-t border-[var(--tgpi-border-soft)] pt-6 text-xs font-extrabold text-[var(--tgpi-navy)]">
                      Continue inside TGPI
                      <span className="text-[var(--tgpi-gold-strong)] transition group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-[24px] border border-[var(--tgpi-border)] bg-[linear-gradient(90deg,var(--tgpi-blue-soft),var(--tgpi-gold-soft))] px-5 py-4 text-sm leading-7 text-[var(--tgpi-muted)] sm:flex sm:items-center sm:justify-between sm:gap-6">
          <p>
            Social discovery creates attention. TGPI turns that attention into structured research, learning and a next action.
          </p>
          <Link href="/why" className="mt-3 inline-flex shrink-0 font-extrabold text-[var(--tgpi-navy)] sm:mt-0">
            See the TGPI approach →
          </Link>
        </div>
      </div>
    </section>
  );
}

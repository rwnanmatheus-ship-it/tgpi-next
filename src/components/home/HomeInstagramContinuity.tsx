import Link from "next/link";
import TGPIEditorialVisual, { type TGPIVisualVariant } from "@/components/TGPIEditorialVisual";
import { homeSearchTopics } from "@/data/home-system";

const editorialVisuals: ReadonlyArray<{
  image: string;
  variant: TGPIVisualVariant;
  accent: string;
}> = [
  {
    image: "/images/home/tgpi-uk-education-story.webp",
    variant: "england",
    accent: "Country intelligence",
  },
  {
    image: "/images/home/tgpi-portugal-spain-story.webp",
    variant: "spain",
    accent: "Compare",
  },
  {
    image: "/images/home/tgpi-documents-story.webp",
    variant: "documents",
    accent: "Documents OS",
  },
  {
    image: "/images/home/tgpi-home-global-learning-atelier-v1.webp",
    variant: "learning",
    accent: "TGPI Learning",
  },
];

export default function HomeInstagramContinuity() {
  return (
    <section
      className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="home-intelligence-library-title"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
              Organic intelligence network
            </p>
            <h2
              id="home-intelligence-library-title"
              className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[0.95] text-[var(--tgpi-ink)]"
            >
              Turn every global question into a deeper decision.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--tgpi-muted)] sm:text-lg">
              TGPI connects discoverable editorial questions to country profiles, comparison, preparation and learning—so useful content continues inside the product.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
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
          className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0"
          aria-label="TGPI global decision intelligence topics"
        >
          {homeSearchTopics.map((topic, index) => {
            const visual = editorialVisuals[index];

            return (
              <Link
                key={topic.title}
                href={topic.href}
                data-tgpi-editorial-topic={topic.eyebrow}
                className="group relative min-w-[84vw] snap-center overflow-hidden rounded-[28px] border border-[var(--tgpi-border)] bg-white shadow-[var(--tgpi-shadow-soft)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--tgpi-shadow-premium)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] sm:min-w-[54vw] lg:min-w-0"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <TGPIEditorialVisual
                    variant={visual.variant}
                    id={`home-intelligence-topic-${index + 1}`}
                    ariaLabel={topic.title}
                    imageSrc={visual.image}
                    showContext={false}
                    className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,50,.02),rgba(7,26,50,.2)_38%,rgba(7,26,50,.97))]" />

                  <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/20 bg-[#071a32]/76 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-light)] backdrop-blur-xl">
                      {visual.accent}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-[#071a32]/76 text-xs font-extrabold text-white backdrop-blur-xl">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="absolute inset-x-4 bottom-4 rounded-[22px] border border-white/15 bg-[#071a32]/88 p-5 backdrop-blur-xl">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.19em] text-[var(--tgpi-gold-light)]">
                      {topic.eyebrow}
                    </p>
                    <h3 className="mt-3 font-[var(--tgpi-font-display)] text-[clamp(1.75rem,2.5vw,2.35rem)] font-semibold leading-[0.98] text-white">
                      {topic.title}
                    </h3>
                    <p className="mt-4 text-xs leading-6 text-white/62">{topic.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-white">
                      Continue inside TGPI
                      <span className="text-[var(--tgpi-gold-light)] transition group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-7 rounded-[24px] border border-[var(--tgpi-border)] bg-[#F1EADC] px-5 py-4 text-sm leading-7 text-[var(--tgpi-muted)] sm:flex sm:items-center sm:justify-between sm:gap-6">
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

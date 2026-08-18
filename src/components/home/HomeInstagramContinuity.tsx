import Link from "next/link";
import TGPIEditorialVisual, {
  type TGPIVisualVariant,
} from "@/components/TGPIEditorialVisual";

type Story = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  image: string;
  variant: TGPIVisualVariant;
  accent: string;
};

const stories: Story[] = [
  {
    eyebrow: "Country intelligence",
    title: "England is more than London.",
    description: "Evaluate cities, education, cost and opportunity beyond the capital.",
    href: "/countries/united-kingdom",
    image: "/images/home/tgpi-uk-education-story.webp",
    variant: "england",
    accent: "England",
  },
  {
    eyebrow: "Decision comparison",
    title: "Portugal or Spain?",
    description: "Compare language, lifestyle, cost and long-term mobility through one framework.",
    href: "/compare?country=portugal&country=spain",
    image: "/images/home/tgpi-portugal-spain-story.webp",
    variant: "spain",
    accent: "Comparison",
  },
  {
    eyebrow: "Global preparation",
    title: "Documents are part of the strategy.",
    description: "Turn passports, translations and deadlines into an executable checklist.",
    href: "/passport",
    image: "/images/home/tgpi-documents-story.webp",
    variant: "documents",
    accent: "Documents",
  },
];

export default function HomeInstagramContinuity() {
  return (
    <section
      className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="instagram-continuity-title"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
              From Instagram to intelligence
            </p>
            <h2
              id="instagram-continuity-title"
              className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[0.95] text-[var(--tgpi-ink)]"
            >
              Continue where Instagram stopped.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--tgpi-muted)] sm:text-lg">
              The ideas you discover in the feed become reports, comparisons and practical decisions inside TGPI.
            </p>
          </div>
          <a
            href="https://www.instagram.com/theglobalpolymath/"
            target="_blank"
            rel="noreferrer"
            className="hidden min-h-12 items-center justify-center rounded-2xl border border-[var(--tgpi-border)] bg-white px-6 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] lg:inline-flex"
          >
            Visit TGPI on Instagram
          </a>
        </div>

        <div
          className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0"
          aria-label="TGPI editorial intelligence stories"
        >
          {stories.map((story, index) => (
            <Link
              key={story.title}
              href={story.href}
              className="group relative min-w-[84vw] snap-center overflow-hidden rounded-[28px] border border-[var(--tgpi-border)] bg-white shadow-[var(--tgpi-shadow-soft)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--tgpi-shadow-premium)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] sm:min-w-[58vw] lg:min-w-0"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <TGPIEditorialVisual
                  variant={story.variant}
                  id={`instagram-continuity-${story.variant}`}
                  ariaLabel={story.title}
                  imageSrc={story.image}
                  showContext={false}
                  className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.045]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,50,.03),rgba(7,26,50,.25)_44%,rgba(7,26,50,.96))]" />

                <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-white/20 bg-[#071a32]/72 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)] backdrop-blur-xl">
                    {story.accent}
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-[#071a32]/72 text-xs font-extrabold text-white backdrop-blur-xl">
                    0{index + 1}
                  </span>
                </div>

                <div className="absolute inset-x-5 bottom-5 rounded-[22px] border border-white/15 bg-[#071a32]/88 p-5 backdrop-blur-xl">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                    {story.eyebrow}
                  </p>
                  <h3 className="mt-3 font-[var(--tgpi-font-display)] text-[clamp(2rem,4vw,3rem)] font-semibold leading-[0.98] text-white">
                    {story.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/65">{story.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-white">
                    Open intelligence
                    <span className="text-[var(--tgpi-gold-light)] transition group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <a
          href="https://www.instagram.com/theglobalpolymath/"
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-2xl border border-[var(--tgpi-border)] bg-white px-6 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] lg:hidden"
        >
          Visit TGPI on Instagram
        </a>
      </div>
    </section>
  );
}

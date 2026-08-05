import Link from "next/link";
import TGPIEditorialVisual, { type TGPIVisualVariant } from "@/components/TGPIEditorialVisual";

const stories: Array<{
  eyebrow: string;
  title: string;
  href: string;
  variant: TGPIVisualVariant;
}> = [
  { eyebrow: "Country intelligence", title: "England is more than London.", href: "/countries/united-kingdom", variant: "england" },
  { eyebrow: "Decision comparison", title: "Portugal or Spain?", href: "/compare?country=portugal&country=spain", variant: "spain" },
  { eyebrow: "Global preparation", title: "Documents are part of the strategy.", href: "/passport", variant: "documents" },
];

export default function HomeInstagramContinuity() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">From Instagram to intelligence</p>
          <h2 className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[0.95] text-[var(--tgpi-ink)]">Continue where Instagram stopped.</h2>
          <p className="mt-5 text-base leading-8 text-[var(--tgpi-muted)] sm:text-lg">The ideas you discover on Instagram become reports, comparisons and practical decisions inside TGPI.</p>
        </div>

        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {stories.map((story) => (
            <Link key={story.title} href={story.href} className="group relative min-w-[82vw] snap-center overflow-hidden rounded-[28px] border border-[var(--tgpi-border)] bg-white shadow-[var(--tgpi-shadow-soft)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--tgpi-shadow-premium)] sm:min-w-[58vw] lg:min-w-0">
              <div className="relative aspect-[4/5] overflow-hidden">
                <TGPIEditorialVisual variant={story.variant} id={`instagram-continuity-${story.variant}`} ariaLabel={story.title} className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.035]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,50,.04),rgba(7,26,50,.88))]" />
                <div className="absolute inset-x-5 bottom-5 rounded-[22px] border border-white/15 bg-[#071a32]/82 p-5 backdrop-blur-xl">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">{story.eyebrow}</p>
                  <h3 className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold leading-[1.02] text-white">{story.title}</h3>
                  <span className="mt-5 inline-flex text-sm font-extrabold text-white">Open intelligence →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

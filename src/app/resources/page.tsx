import TGPIPageShell from "@/components/TGPIPageShell";
import { tgpiImages } from "@/data/tgpi-images";

const resources = [
  ["How to develop a global mindset", "Article · 8 min read", "Explore the importance of global awareness.", tgpiImages.globe],
  ["The most valuable skills for the future", "Video · 11 min", "Discover essential skills for the next decade.", tgpiImages.technology],
  ["AI and the future of education", "Guide · 14 min", "Understand how AI can transform learning.", tgpiImages.ai],
];

export default function ResourcesPage() {
  return (
    <TGPIPageShell>
      <section>
        <p className="text-sm text-slate-500">Home › Resources</p>

        <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-tight">
          Resources to <span className="text-yellow-400">learn more</span>
        </h1>

        <p className="mt-4 text-slate-400">
          Articles, guides, videos, and strategic materials for your global journey.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        {resources.map(([title, meta, desc, image]) => (
          <article
            key={title}
            className="flex gap-5 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4"
          >
            <div
              className="h-28 w-40 shrink-0 rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />

            <div>
              <h2 className="font-bold">{title}</h2>
              <p className="mt-1 text-sm text-yellow-400">{meta}</p>
              <p className="mt-2 text-sm text-slate-400">{desc}</p>
            </div>
          </article>
        ))}
      </section>
    </TGPIPageShell>
  );
}
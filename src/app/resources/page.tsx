import TGPIPageShell from "@/components/TGPIPageShell";

const resources = [
  ["How to develop a global mindset", "Article · 8 min read", "Explore the importance of a global vision."],
  ["The most valuable skills for the future", "Video · 11 min", "Discover essential skills for the next decade."],
  ["Podcast: The world in transformation", "Podcast · 45 min", "A conversation about innovation and society."],
  ["Practical guide to study abroad", "E-book · 24 pages", "Everything you need to start planning."],
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
          Articles, videos, podcasts, and materials for your journey.
        </p>

        <input
          placeholder="Search resources..."
          className="mt-8 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none focus:border-yellow-500/40"
        />

        <div className="mt-5 flex flex-wrap gap-3">
          {["All", "Articles", "Videos", "Podcasts", "E-books"].map((filter) => (
            <button
              key={filter}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:border-yellow-500/40 hover:text-yellow-400"
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-4">
        {resources.map(([title, meta, desc]) => (
          <article
            key={title}
            className="flex gap-5 rounded-3xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex h-24 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500/20 to-blue-900/30 text-4xl">
              ◎
            </div>

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
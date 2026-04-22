export default function WhyTGPIIsDifferent() {
  const blocks = [
    {
      title: "Education + Strategy",
      text: "TGPI is not just a course platform. It helps users think, plan, and prepare globally.",
    },
    {
      title: "Intelligence Layer",
      text: "Signals, recommendations, readiness scoring, and dynamic progression create a smarter product.",
    },
    {
      title: "Premium Global Identity",
      text: "Design, structure, and product logic raise perceived value for users, partners, and investors.",
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-3">
      {blocks.map((block) => (
        <div
          key={block.title}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
        >
          <h3 className="text-xl font-bold text-yellow-400">{block.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{block.text}</p>
        </div>
      ))}
    </section>
  );
}
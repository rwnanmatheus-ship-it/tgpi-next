type ActivityHighlightsProps = {
  countriesExplored: number;
  certificatesEarned: number;
  lessonsCompleted: number;
  readinessScore: number;
};

export default function ActivityHighlights({
  countriesExplored,
  certificatesEarned,
  lessonsCompleted,
  readinessScore,
}: ActivityHighlightsProps) {
  const actions = [
    countriesExplored < 3
      ? "Explore more countries to expand your international map."
      : "Keep deepening country-specific readiness for stronger positioning.",
    certificatesEarned < 1
      ? "Complete your first course and unlock stronger proof of progress."
      : "Use your certificates as public proof of commitment and growth.",
    lessonsCompleted < 10
      ? "Finish more lessons to build momentum and unlock higher progression."
      : "Your learning momentum is strong. Sustain it for elite growth.",
    readinessScore < 50
      ? "Focus on profile completion, countries, and course completion to raise readiness."
      : "You are building meaningful global readiness. Keep stacking proof and consistency.",
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-yellow-400">
        Activity Highlights
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {actions.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
          >
            <p className="text-sm leading-7 text-slate-300">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
import { prettifyIntent } from "@/lib/identity";

type JourneyReasonsCardProps = {
  targetCountry?: string;
  travelIntent?: string;
  readinessScore: number;
  countriesExplored: number;
};

export default function JourneyReasonsCard({
  targetCountry,
  travelIntent,
  readinessScore,
  countriesExplored,
}: JourneyReasonsCardProps) {
  const reasons = [
    targetCountry
      ? `You are building a more intentional path toward ${targetCountry}.`
      : "You are still early in defining your destination, which makes now the perfect time to structure your path.",
    `Your current travel intent is ${prettifyIntent(
      travelIntent
    )}, which means TGPI can organize your learning and identity around a real objective.`,
    readinessScore >= 60
      ? "You already have enough momentum for your journey to feel real and visible."
      : "Your readiness is growing, and the next actions you take can rapidly strengthen your position.",
    countriesExplored >= 3
      ? "You are not just dreaming about the world — you are actively building international context."
      : "Every country you explore adds precision to your global decision-making.",
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-white">
      <h2 className="text-2xl font-bold text-yellow-400">
        Why TGPI Matters for Your Journey
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {reasons.map((reason) => (
          <div
            key={reason}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
          >
            <p className="text-sm leading-7 text-slate-300">{reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
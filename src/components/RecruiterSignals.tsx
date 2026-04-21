import { calculateReputation } from "@/lib/calculate-reputation";
import { prettifyIntent } from "@/lib/identity";

export default function RecruiterSignals({ user }: { user: any }) {
  const reputation = calculateReputation(user);
  const countries = Array.isArray(user?.countriesExplored)
    ? user.countriesExplored.length
    : Number(user?.countriesExplored || 0);

  const completedCourses = Array.isArray(user?.completedCourses)
    ? user.completedCourses.length
    : Number(user?.completedCourses || 0);

  const signals = [
    user?.isVerified ? "Verified TGPI identity layer" : "Standard TGPI identity layer",
    `${countries} countries explored`,
    `${completedCourses || user?.certificatesEarned || 0} completed learning signals`,
    `Travel intent: ${prettifyIntent(user?.travelIntent)}`,
    `Reputation score: ${reputation}/100`,
    user?.targetCountry ? `Target country: ${user.targetCountry}` : "Target country not defined",
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-yellow-400">
        Recruiter Signals
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {signals.map((signal) => (
          <div
            key={signal}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
          >
            <p className="text-sm leading-7 text-slate-300">✔ {signal}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
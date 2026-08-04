import type { UserData } from "@/types";

type SmartFeedProps = {
  user: Pick<UserData, "targetCountry" | "travelIntent">;
};

export default function SmartFeed({ user }: SmartFeedProps) {
  const feed = [
    `People are moving to ${user.targetCountry ?? "new destinations"}`,
    `Users with same goal: ${user.travelIntent ?? "not defined"}`,
    "Your readiness is evolving",
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="font-bold text-yellow-400">Your Global Feed</h2>

      <div className="mt-4 space-y-2">
        {feed.map((item) => (
          <p key={item} className="text-sm text-slate-300">
            • {item}
          </p>
        ))}
      </div>
    </section>
  );
}

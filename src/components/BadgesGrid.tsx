import type { Badge } from "@/lib/badges";

export default function BadgesGrid({ badges }: { badges: Badge[] }) {
  if (!badges.length) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-2xl font-bold text-yellow-400">Badges</h2>
        <p className="mt-3 text-slate-400">
          Start exploring countries and courses to unlock your first badge.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold text-yellow-400">Badges</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
          >
            <div className="text-3xl">{badge.icon}</div>
            <h3 className="mt-3 text-lg font-semibold text-white">
              {badge.title}
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              {badge.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
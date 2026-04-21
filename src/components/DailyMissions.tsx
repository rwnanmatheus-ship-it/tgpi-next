import MissionCard from "./MissionCard";

export default function DailyMissions() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">
        Daily Missions
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <MissionCard title="Visit a country page" xp={10} />
        <MissionCard title="Update your profile" xp={20} />
        <MissionCard title="Join a room" xp={15} />
      </div>
    </section>
  );
}
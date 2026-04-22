import Hero3D from "@/components/Hero3D";
import GlobalRoomsList from "@/components/GlobalRoomsList";
import SocialFeed from "@/components/SocialFeed";
import OnlineNow from "@/components/OnlineNow";

export default function HomePage() {
  return (
    <main className="bg-black text-white overflow-hidden">
      {/* HERO */}
      <Hero3D />

      {/* SOCIAL PROOF */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">
              Global Movement is Already Happening
            </h2>
            <p className="text-slate-400 mt-2">
              Thousands of users are preparing to move, study and work abroad.
            </p>
          </div>

          <OnlineNow />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          <StatCard title="Users" value="12,000+" />
          <StatCard title="Countries" value="195" />
          <StatCard title="Missions Completed" value="2,500+" />
          <StatCard title="Active Rooms" value="120+" />
        </div>
      </section>

      {/* ROOMS */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">
          Explore Global Rooms
        </h2>

        <GlobalRoomsList />
      </section>

      {/* FEED */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">
          Global Activity
        </h2>

        <SocialFeed />
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-white leading-tight">
          Your Global Life Starts Here
        </h2>

        <p className="text-slate-400 mt-4">
          Build your identity, connect with others and prepare for your next country.
        </p>

        <button className="mt-8 bg-yellow-500 text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
          Start Your Journey
        </button>
      </section>
    </main>
  );
}

/* COMPONENTE INTERNO */
function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-[#111827] to-[#090B10] p-6 text-center shadow-lg">
      <p className="text-yellow-400 text-2xl font-bold">{value}</p>
      <p className="text-sm text-slate-400 mt-2">{title}</p>
    </div>
  );
}
import Link from "next/link";

const rooms = [
  { slug: "canada", title: "Canada Room", subtitle: "Work, study, relocation and readiness" },
  { slug: "portugal", title: "Portugal Room", subtitle: "Live, work and integrate in Europe" },
  { slug: "usa", title: "United States Room", subtitle: "Study, career and mobility signals" },
  { slug: "germany", title: "Germany Room", subtitle: "Professional growth and relocation" },
];

export default function RoomsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-10">
          <h1 className="text-4xl font-bold text-yellow-400">
            Global Rooms
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            Join country-based rooms to talk with people preparing for the same
            destination. Rooms turn TGPI into a living global movement network.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {rooms.map((room) => (
            <Link
              key={room.slug}
              href={`/rooms/${room.slug}`}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-yellow-500"
            >
              <h2 className="text-xl font-bold text-yellow-400">
                {room.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {room.subtitle}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
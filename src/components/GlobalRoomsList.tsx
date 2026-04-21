import Link from "next/link";

const rooms = ["canada", "portugal", "usa", "germany", "japan"];

export default function GlobalRoomsList() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">
        Global Rooms
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {rooms.map((room) => (
          <Link
            key={room}
            href={`/rooms/${room}`}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4 hover:border-yellow-500"
          >
            <p className="text-white font-semibold capitalize">{room}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
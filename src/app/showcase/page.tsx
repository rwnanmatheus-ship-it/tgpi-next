import Link from "next/link";
import PublicProofWall from "@/components/PublicProofWall";

const showcaseUsers = [
  {
    username: "globalbuilder",
    name: "Global Builder",
    destination: "Canada",
    reason: "Building visible readiness and community presence",
  },
  {
    username: "portugalmove",
    name: "Portugal Move",
    destination: "Portugal",
    reason: "Turning relocation into a structured path",
  },
  {
    username: "futureoperator",
    name: "Future Operator",
    destination: "Germany",
    reason: "Growing international positioning through TGPI",
  },
];

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-10">
          <h1 className="text-4xl font-bold text-yellow-400">
            TGPI Showcase
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            This page highlights the type of public identity and visible global
            journey TGPI is designed to create.
          </p>
        </section>

        <PublicProofWall />

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {showcaseUsers.map((user) => (
            <div
              key={user.username}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
            >
              <h2 className="text-2xl font-bold text-yellow-400">{user.name}</h2>
              <p className="mt-2 text-sm text-slate-400">@{user.username}</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Destination: {user.destination}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                {user.reason}
              </p>

              <Link
                href={`/user/${user.username}`}
                className="mt-6 inline-block rounded-xl bg-yellow-500 px-5 py-3 text-sm font-bold text-black"
              >
                Open Public Profile
              </Link>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
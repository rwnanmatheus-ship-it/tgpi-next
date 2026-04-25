import Link from "next/link";

const items = [
  "Dashboard",
  "World Map",
  "Countries",
  "Courses",
  "Resources",
  "Compare",
  "Cost of Living",
  "Currencies",
  "AI Advisor",
  "Community",
  "Certificates",
  "Favorites",
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-white/10 bg-[#020617] p-5 lg:flex">
      <h1 className="mb-8 text-xl font-bold text-yellow-400">TGPI</h1>

      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item}
            href="#"
            className="block rounded-xl px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-yellow-400"
          >
            {item}
          </Link>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
        <p className="text-sm">Premium Plan</p>
        <button className="mt-3 w-full rounded-xl bg-yellow-500 py-2 text-black font-bold">
          Manage Plan
        </button>
      </div>
    </aside>
  );
}
"use client";

type TabKey = "overview" | "edit" | "goals" | "activity" | "settings";

const tabs: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "edit", label: "Edit Profile" },
  { key: "goals", label: "Goals" },
  { key: "activity", label: "Activity" },
  { key: "settings", label: "Settings" },
];

export default function ProfileTabs({
  activeTab,
  onChange,
}: {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 to-slate-900 p-3 shadow-[0_0_40px_rgba(255,215,0,0.04)]">
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => {
          const active = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-gradient-to-r from-yellow-500 to-amber-400 text-black shadow-[0_10px_30px_rgba(250,204,21,0.18)]"
                  : "border border-white/8 bg-white/[0.03] text-white hover:border-yellow-500/30 hover:text-yellow-300"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
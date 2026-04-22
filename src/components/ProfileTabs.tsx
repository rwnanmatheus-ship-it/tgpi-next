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
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3">
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => {
          const active = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-yellow-500 text-black"
                  : "border border-slate-800 bg-slate-900 text-white hover:border-yellow-500/40"
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
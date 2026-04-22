"use client";

type Props = {
  hasAvatar: boolean;
  hasDisplayName: boolean;
  hasUsername: boolean;
  hasBio: boolean;
  hasGoal: boolean;
  hasCurrency: boolean;
  hasTimezone: boolean;
};

type Item = {
  label: string;
  done: boolean;
};

export default function LaunchReadyChecklist({
  hasAvatar,
  hasDisplayName,
  hasUsername,
  hasBio,
  hasGoal,
  hasCurrency,
  hasTimezone,
}: Props) {
  const items: Item[] = [
    { label: "Profile photo added", done: hasAvatar },
    { label: "Display name defined", done: hasDisplayName },
    { label: "Username defined", done: hasUsername },
    { label: "Bio completed", done: hasBio },
    { label: "Main goal selected", done: hasGoal },
    { label: "Preferred currency selected", done: hasCurrency },
    { label: "Timezone configured", done: hasTimezone },
  ];

  return (
    <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6 shadow-[0_0_35px_rgba(250,204,21,0.03)]">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-yellow-400">Launch QA Checklist</h2>
        <p className="mt-2 text-sm text-slate-400">
          Final visual and functional checks before considering the page launch-ready.
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className={`rounded-2xl border p-4 ${
              item.done
                ? "border-emerald-500/20 bg-emerald-500/10"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold ${
                  item.done
                    ? "bg-emerald-500 text-black"
                    : "bg-slate-700 text-slate-300"
                }`}
              >
                {item.done ? "✓" : "•"}
              </div>
              <p className={item.done ? "text-emerald-200" : "text-slate-300"}>
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
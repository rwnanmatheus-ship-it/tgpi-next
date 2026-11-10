"use client";


import { useLocale as useFormattingLocale } from "@/components/localization/LocaleProvider";
import { useEffect, useState } from "react";
import { getUserMemory, UserActivityItem } from "@/lib/user-memory";
import { LocalizedText } from "@/components/localization/LocaleProvider";


function formatDate(locale: import('@/lib/localization/config').Locale, date: string) {
  try {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

export default function RecentActivityTimeline() {
  const { locale } = useFormattingLocale();
  const [activities, setActivities] = useState<UserActivityItem[]>([]);

  useEffect(() => {
    async function load() {
      const memory = await getUserMemory();
      setActivities(memory?.activity || []);
    }

    load();
  }, []);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-yellow-400"><LocalizedText text="Recent Activity" /></h2>

      {activities.length === 0 ? (
        <p className="text-sm text-slate-400"><LocalizedText text={"No recent activity yet."} /></p>
      ) : (
        <div className="space-y-3">
          {activities
            .slice()
            .reverse()
            .slice(0, 8)
            .map((item, index) => (
              <div
                key={`$<LocalizedText text={item.action} />-${item.date}-${index}`}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <p className="text-sm font-medium text-white"><LocalizedText text={item.action} /></p>
                <p className="mt-1 text-xs text-slate-400">
                  {formatDate(locale, item.date)}
                </p>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}
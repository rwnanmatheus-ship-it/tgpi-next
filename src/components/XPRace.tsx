"use client";


import { LocalizedText } from "@/components/localization/LocaleProvider";
import type { UserData } from "@/types";

type XPRaceUser = Pick<UserData, "uid" | "name" | "xp">;

type XPRaceProps = {
  users?: XPRaceUser[];
};

export default function XPRace({ users = [] }: XPRaceProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400"><LocalizedText text={"XP Race"} /></h2>

      <div className="mt-4 space-y-3">
        {users.slice(0, 5).map((user, index) => (
          <div
            key={user.uid ?? `${user.name ?? "user"}-${index}`}
            className="flex justify-between text-sm"
          >
            <span>{user.name || <LocalizedText text={"User"} />}</span>
            <span className="text-yellow-400">{user.xp || 0}{" "}<LocalizedText text={"XP"} /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

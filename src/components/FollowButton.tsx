"use client";


import { LocalizedText } from "@/components/localization/LocaleProvider";
import { useState } from "react";

export default function FollowButton() {
  const [following, setFollowing] = useState(false);

  return (
    <button
      onClick={() => setFollowing(!following)}
      className={`px-4 py-2 rounded-xl ${
        following ? "bg-slate-700" : "bg-yellow-500 text-black"
      }`}
    >
      {following ? <LocalizedText text={"Following"} /> : <LocalizedText text={"Follow"} />}
    </button>
  );
}
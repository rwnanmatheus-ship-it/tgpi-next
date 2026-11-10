"use client";


import { LocalizedText } from "@/components/localization/LocaleProvider";
export default function ShareProfile({ username }: { username: string }) {
  function share() {
    const url = `${window.location.origin}/p/${username}`;
    navigator.clipboard.writeText(url);
    alert("Profile link copied!");
  }

  return (
    <button
      onClick={share}
      className="bg-yellow-500 text-black px-4 py-2 rounded-xl"
    ><LocalizedText text={"Share Profile"} /></button>
  );
}
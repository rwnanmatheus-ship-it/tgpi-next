"use client";


import { LocalizedText } from "@/components/localization/LocaleProvider";
export default function AICard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="mb-4 text-lg font-bold"><LocalizedText text={"AI Advisor"} /></h2>

      <div className="space-y-2 text-sm">
        <button className="block w-full text-left hover:text-yellow-400"><LocalizedText text={"Which country matches my profile?"} /></button>

        <button className="block w-full text-left hover:text-yellow-400"><LocalizedText text={"How much does it cost to live in Japan?"} /></button>

        <button className="block w-full text-left hover:text-yellow-400"><LocalizedText text={"What is the best visa path for Europe?"} /></button>
      </div>
    </div>
  );
}
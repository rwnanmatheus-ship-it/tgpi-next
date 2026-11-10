"use client";


import { LocalizedText } from "@/components/localization/LocaleProvider";
import GlobalProfileForm from "./GlobalProfileForm";

export default function Onboarding() {
  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4"><LocalizedText text={"Start your global journey"} /></h2>
      <GlobalProfileForm />
    </div>
  );
}
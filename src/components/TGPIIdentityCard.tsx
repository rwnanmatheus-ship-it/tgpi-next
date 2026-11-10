"use client";

import Image from "@/components/localization/LocalizedImage";
import TGPIQrCode from "@/components/TGPIQrCode";
import type { UserData } from "@/types";
import { LocalizedText } from "@/components/localization/LocaleProvider";


type IdentityProfile = UserData & {
  country?: string;
  languagePreference?: string;
  goal?: string;
};

type TGPIIdentityCardProps = {
  profile: IdentityProfile | null;
};

export default function TGPIIdentityCard({ profile }: TGPIIdentityCardProps) {
  const tgpiId = profile?.tgpiId || "TGPI-ID";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-[#0b1d3a] to-black p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-yellow-400"><LocalizedText text={"TGPI GLOBAL IDENTITY"} /></h2>
        <div className="text-xs font-bold text-green-400"><LocalizedText text={"VERIFIED"} /></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3 text-sm">
          <p><strong><LocalizedText text={"Name:"} /></strong> {profile?.displayName || profile?.name || <LocalizedText text={"Not defined"} />}</p>
          <p><strong><LocalizedText text={"Username:"} /></strong> @{profile?.username || <LocalizedText text={"username"} />}</p>
          <p><strong><LocalizedText text={"ID:"} /></strong> {tgpiId}</p>
          <p><strong><LocalizedText text={"Country:"} /></strong> {profile?.country || profile?.currentCountry || <LocalizedText text={"Not defined"} />}</p>
          <p><strong><LocalizedText text="Languages:" /></strong> {profile?.languagePreference || <LocalizedText text={"Not defined"} />}</p>
          <p><strong><LocalizedText text="Goal:" /></strong> {profile?.goal || profile?.travelIntent || <LocalizedText text={"Not defined"} />}</p>
          <p className="mt-4 font-bold text-yellow-400"><LocalizedText text={"ELITE MEMBER"} /></p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-yellow-400">
            <Image
              src={profile?.photoURL || "/avatar.png"}
              alt="TGPI member avatar"
              fill
              unoptimized
              sizes="96px"
              className="object-cover"
            />
          </div>

          <TGPIQrCode tgpiId={tgpiId} />

          <div className="text-center text-xs text-slate-400"><LocalizedText text={"TGPI DIGITAL ID"} /><br /><LocalizedText text={"Global Recognition System"} /></div>
        </div>
      </div>

      <div className="mt-6 text-xs text-slate-500"><LocalizedText text={"theglobalpolymath.com/verify/"} />{tgpiId}
      </div>
    </div>
  );
}

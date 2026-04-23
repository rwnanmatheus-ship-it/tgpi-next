"use client";

export default function TGPIIdentityCard({ profile }: { profile: any }) {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-yellow-500/30 bg-gradient-to-br from-[#0b1d3a] to-black p-6 shadow-xl">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-yellow-400 font-bold text-lg">
          TGPI GLOBAL IDENTITY
        </h2>

        <div className="text-xs text-green-400 font-bold">
          ✔ VERIFIED
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT */}
        <div className="space-y-2 text-sm">

          <p><strong>Nome:</strong> {profile?.displayName}</p>
          <p><strong>ID:</strong> {profile?.tgpiId}</p>
          <p><strong>País:</strong> 🌎 {profile?.country}</p>
          <p><strong>Idiomas:</strong> 🌐 {profile?.languagePreference}</p>
          <p><strong>Objetivo:</strong> 🎯 {profile?.goal}</p>

          <p className="text-yellow-400 font-bold mt-3">
            ELITE MEMBER
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center justify-center">

          <div className="w-20 h-20 rounded-full border-2 border-yellow-400 overflow-hidden mb-3">
            <img
              src={profile?.photoURL || "/avatar.png"}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-xs text-slate-400 text-center">
            TGPI DIGITAL ID
            <br />
            Global Recognition System
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="mt-6 text-xs text-slate-500">
        theglobalpolymath.com/verify/{profile?.tgpiId}
      </div>

    </div>
  );
}
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function VerifyPage({ params }: any) {
  const id = params.id;

  const ref = doc(db, "users", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return <div className="p-10 text-white">ID inválido</div>;
  }

  const profile = snap.data();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="p-10 rounded-3xl border border-white/10 text-center">

        <h1 className="text-3xl text-green-400 font-bold mb-4">
          ✔ VERIFIED PROFILE
        </h1>

        <p>{profile.displayName}</p>
        <p className="text-slate-400">@{profile.username}</p>

        <p className="mt-4 text-yellow-400">
          TGPI ID: {profile.tgpiId}
        </p>

      </div>

    </div>
  );
}
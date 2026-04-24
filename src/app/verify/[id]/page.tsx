import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function VerifyPage({ params }: any) {
  const id = params.id;

  const usersRef = collection(db, "users");
  const snapshot = await getDocs(usersRef);

  let profile: any = null;

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.tgpiId === id) {
      profile = data;
    }
  });

  if (!profile) {
    return (
      <div className="p-10 text-white text-center">
        ❌ ID inválido
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="p-10 rounded-3xl border border-white/10 text-center">

        <h1 className="text-3xl text-green-400 font-bold mb-4">
          ✔ TGPI VERIFIED
        </h1>

        <p className="text-xl">{profile.displayName}</p>
        <p className="text-slate-400">@{profile.username}</p>

        <div className="mt-4 text-yellow-400 font-bold">
          {profile.tgpiId}
        </div>

        <p className="mt-4 text-sm text-slate-400">
          Global Identity Verified by TGPI
        </p>

      </div>

    </div>
  );
}
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default async function VerifyIdPage({ params }: any) {
  const usersRef = collection(db, "users");
  const snapshot = await getDocs(usersRef);

  let profile: any = null;

  snapshot.forEach((item) => {
    const data = item.data();
    if (data.tgpiId === params.id) {
      profile = data;
    }
  });

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <section className="max-w-xl rounded-3xl border border-red-500/20 bg-red-500/5 p-10 text-center">
          <h1 className="text-3xl font-bold text-red-300">ID não encontrado</h1>
          <p className="mt-4 text-slate-400">
            Nenhuma credencial TGPI foi localizada para este código.
          </p>
          <Link href="/verify" className="mt-6 inline-block rounded-xl border border-white/10 px-5 py-3">
            Tentar novamente
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <section className="mx-auto max-w-4xl rounded-3xl border border-green-500/20 bg-gradient-to-br from-[#07111f] to-black p-10">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-green-400">
          Verified TGPI Credential
        </p>

        <h1 className="text-4xl font-bold text-yellow-400">
          {profile.displayName || "TGPI Member"}
        </h1>

        <p className="mt-2 text-slate-400">@{profile.username}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">TGPI ID</p>
            <p className="mt-2 font-bold text-yellow-400">{profile.tgpiId}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Status</p>
            <p className="mt-2 font-bold text-green-400">Verified</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Country</p>
            <p className="mt-2">{profile.country || "Not defined"}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Goal</p>
            <p className="mt-2">{profile.goal || "Not defined"}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
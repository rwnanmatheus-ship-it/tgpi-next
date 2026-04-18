"use client";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold text-yellow-400">
          Your Profile
        </h1>

        <section className="rounded-2xl bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-yellow-300">
            Membership
          </h2>
          <p className="mt-2 text-slate-400">Premium Active</p>
        </section>

        <section className="rounded-2xl bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-yellow-300">
            Certificates
          </h2>
          <p className="mt-2 text-slate-400">
            English Abroad Certification
          </p>
        </section>
      </div>
    </main>
  );
}
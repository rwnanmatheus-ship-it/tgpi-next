"use client";

import PageContainer from "@/components/PageContainer";

export default function ProfilePage() {
  return (
    <PageContainer
      title="Your Profile"
      subtitle="Your global identity inside TGPI"
    >
      {/* MEMBERSHIP */}
      <section className="rounded-2xl bg-slate-900 p-6">
        <h2 className="text-xl font-bold text-yellow-300">
          Membership
        </h2>
        <p className="mt-2 text-slate-400">Premium Active</p>
      </section>

      {/* CERTIFICATES */}
      <section className="rounded-2xl bg-slate-900 p-6">
        <h2 className="text-xl font-bold text-yellow-300">
          Certificates
        </h2>

        <ul className="mt-2 text-slate-400 space-y-1">
          <li>English Abroad Certification</li>
        </ul>
      </section>

      {/* GLOBAL GOAL */}
      <section className="rounded-2xl bg-slate-900 p-6">
        <h2 className="text-xl font-bold text-yellow-300">
          Global Goal
        </h2>

        <p className="mt-2 text-slate-400">
          Live and work in Europe
        </p>
      </section>

    </PageContainer>
  );
}
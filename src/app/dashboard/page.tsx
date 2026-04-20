"use client";

import PageContainer from "@/components/PageContainer";
import ContinueJourney from "@/components/ContinueJourney";

export default function DashboardPage() {
  return (
    <PageContainer
      title="Your Global Dashboard 🌍"
      subtitle="Track your progress and build your international journey"
    >
      {/* CONTINUE */}
      <ContinueJourney />

      {/* STATS */}
      <section className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Countries explored</p>
          <p className="text-3xl font-bold text-yellow-400">5</p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Courses in progress</p>
          <p className="text-3xl font-bold text-yellow-400">2</p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Certificates</p>
          <p className="text-3xl font-bold text-yellow-400">1</p>
        </div>

      </section>

      {/* NEXT STEP */}
      <section className="rounded-2xl bg-slate-900 p-6">
        <h2 className="text-xl font-bold text-yellow-300">
          Next Step
        </h2>

        <p className="mt-2 text-slate-400">
          Explore new countries or continue your courses.
        </p>
      </section>

    </PageContainer>
  );
}
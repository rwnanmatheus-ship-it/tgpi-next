import TGPIContainer from "@/components/ui/TGPIContainer";
import TGPISidebar from "@/components/ui/TGPISidebar";
import TGPIHeader from "@/components/ui/TGPIHeader";

import DashboardStats from "@/modules/dashboard/DashboardStats";
import DashboardWorldMap from "@/modules/dashboard/DashboardWorldMap";
import DashboardAIAdvisor from "@/modules/dashboard/DashboardAIAdvisor";
import DashboardCourses from "@/modules/dashboard/DashboardCourses";
import DashboardIdentity from "@/modules/dashboard/DashboardIdentity";

export default function ProfilePage() {
  return (
    <TGPIContainer>
      <TGPISidebar />

      <main className="min-h-screen flex-1 bg-[#020617]">
        <TGPIHeader />

        <div className="space-y-6 p-6">
          <section>
            <h1 className="text-3xl font-bold text-white">
              Bem-vindo de volta 👋
            </h1>
            <p className="mt-1 text-slate-400">
              Continue sua jornada para se tornar um cidadão global do mundo.
            </p>
          </section>

          <DashboardStats />

          <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
            <div className="space-y-6">
              <DashboardWorldMap />
              <DashboardCourses />
            </div>

            <div className="space-y-6">
              <DashboardIdentity />
              <DashboardAIAdvisor />
            </div>
          </section>
        </div>
      </main>
    </TGPIContainer>
  );
}
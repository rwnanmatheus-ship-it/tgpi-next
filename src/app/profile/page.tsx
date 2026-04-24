import TGPIContainer from "@/components/ui/TGPIContainer";
import TGPISidebar from "@/components/ui/TGPISidebar";
import TGPIHeader from "@/components/ui/TGPIHeader";
import TGPIStatCard from "@/components/ui/TGPIStatCard";

import WorldMapCard from "@/components/WorldMapCard";
import AICard from "@/components/AICard";
import CoursesRow from "@/components/CoursesRow";
import GlobalIdentityCard from "@/components/GlobalIdentityCard";

export default function ProfilePage() {
  return (
    <TGPIContainer>
      <TGPISidebar />

      <main className="flex-1">
        <TGPIHeader />

        <div className="p-6 space-y-6">

          <div>
            <h1 className="text-2xl font-bold">
              Bem-vindo de volta 👋
            </h1>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <TGPIStatCard title="Países" value="24" />
            <TGPIStatCard title="Cursos" value="8" />
            <TGPIStatCard title="Horas" value="184h" />
            <TGPIStatCard title="Conquistas" value="17" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <WorldMapCard />
            </div>

            <div className="space-y-6">
              <GlobalIdentityCard />
              <AICard />
            </div>
          </div>

          <CoursesRow />

        </div>
      </main>
    </TGPIContainer>
  );
}
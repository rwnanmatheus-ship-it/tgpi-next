import TGPIContainer from "@/components/ui/TGPIContainer";
import TGPISidebar from "@/components/ui/TGPISidebar";
import TGPIHeader from "@/components/ui/TGPIHeader";
import TGPIStatCard from "@/components/ui/TGPIStatCard";

import WorldMapCard from "@/components/WorldMapCard";
import AICard from "@/components/AICard";
import CoursesRow from "@/components/CoursesRow";
import GlobalIdentityCard from "@/components/GlobalIdentityCard";
import UserCertificatesCard from "@/components/UserCertificatesCard";
import PremiumEngineCard from "@/components/PremiumEngineCard";

export default function ProfilePage() {
  return (
    <TGPIContainer>
      <TGPISidebar />

      <main className="flex-1">
        <TGPIHeader />

        <div className="space-y-6 p-6">
          <div>
            <h1 className="text-2xl font-bold">Bem-vindo de volta 👋</h1>
            <p className="text-slate-400">
              Seu painel TGPI agora centraliza identidade, cursos, IA, certificados e progresso global.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <TGPIStatCard title="Países" value="24" subtitle="explorados" />
            <TGPIStatCard title="Cursos" value="8" subtitle="em andamento" />
            <TGPIStatCard title="Horas" value="184h" subtitle="estudadas" />
            <TGPIStatCard title="Conquistas" value="17" subtitle="desbloqueadas" />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
            <div className="space-y-6">
              <WorldMapCard />
              <CoursesRow />
              <UserCertificatesCard />
            </div>

            <div className="space-y-6">
              <GlobalIdentityCard />
              <PremiumEngineCard />
              <AICard />
            </div>
          </div>
        </div>
      </main>
    </TGPIContainer>
  );
}
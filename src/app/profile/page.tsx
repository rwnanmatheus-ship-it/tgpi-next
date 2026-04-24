import TGPIContainer from "@/components/ui/TGPIContainer";
import TGPISidebar from "@/components/ui/TGPISidebar";
import TGPIHeader from "@/components/ui/TGPIHeader";
import TGPIStatCard from "@/components/ui/TGPIStatCard";
import TGPICard from "@/components/ui/TGPICard";

export default function ProfilePage() {
  return (
    <TGPIContainer>
      <TGPISidebar />

      <main className="flex-1">
        <TGPIHeader />

        <div className="p-6 space-y-6">

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-4">
            <TGPIStatCard title="Países" value="24" subtitle="explorados" />
            <TGPIStatCard title="Cursos" value="8" />
            <TGPIStatCard title="Horas" value="184h" />
            <TGPIStatCard title="Conquistas" value="17" />
          </div>

          {/* MAP / MAIN */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <TGPICard>
                <h2 className="text-lg font-bold mb-2">Mapa Global</h2>
                <div className="h-64 bg-black/50 rounded-xl flex items-center justify-center text-slate-500">
                  MAPA AQUI (futuro)
                </div>
              </TGPICard>
            </div>

            <TGPICard>
              <h2 className="text-lg font-bold mb-2">Missão Atual</h2>
              <p className="text-yellow-400">Morar no Canadá</p>
              <button className="mt-4 w-full bg-yellow-500 text-black py-2 rounded-xl">
                Ver plano
              </button>
            </TGPICard>
          </div>

          {/* IA */}
          <TGPICard>
            <h2 className="text-lg font-bold mb-4">IA Conselheira</h2>
            <div className="space-y-2 text-sm">
              <p>• Qual país combina comigo?</p>
              <p>• Custo de vida no Japão?</p>
              <p>• Melhor visto para Europa?</p>
            </div>
          </TGPICard>

        </div>
      </main>
    </TGPIContainer>
  );
}
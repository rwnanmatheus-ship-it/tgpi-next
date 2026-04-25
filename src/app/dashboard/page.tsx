import DashboardLayout from "@/modules/dashboard/DashboardLayout";
import Sidebar from "@/modules/dashboard/Sidebar";
import Topbar from "@/modules/dashboard/Topbar";
import StatsCards from "@/modules/dashboard/StatsCards";
import WorldMapCard from "@/modules/dashboard/WorldMapCard";
import RightPanel from "@/modules/dashboard/RightPanel";

export default function DashboardPage() {
  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      topbar={<Topbar />}
      right={<RightPanel />}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Welcome back, Renan 👋
        </h1>

        <StatsCards />
        <WorldMapCard />
      </div>
    </DashboardLayout>
  );
}
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import UserApplicationsList from "@/components/dashboard/UseApplicationList";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
        <DashboardHeader />
        <DashboardStats/>
        <UserApplicationsList/>
      </div>
    </main>
  )
}

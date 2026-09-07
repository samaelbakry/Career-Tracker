import DashboardHeader from "@/components/dashboard/JobSeeker/DashboardHeader";
import DashboardStats from "@/components/dashboard/JobSeeker/DashboardStats";
import InterviewsStatus from "@/components/dashboard/JobSeeker/InterviewsStatus";
import JobSeekerProfileOptimization from "@/components/dashboard/JobSeeker/JobSeekerProfileOptimization";
import UserApplicationsList from "@/components/dashboard/JobSeeker/UserApplicationList";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-50/50 pb-16 pt-6">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <DashboardHeader />

        <JobSeekerProfileOptimization />

        <section className="space-y-8">
          <DashboardStats />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="space-y-8 lg:col-span-7 xl:col-span-8">
              <UserApplicationsList />
            </div>

            <div className="space-y-8 lg:sticky lg:top-8 lg:col-span-5 xl:col-span-4">
              <InterviewsStatus />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

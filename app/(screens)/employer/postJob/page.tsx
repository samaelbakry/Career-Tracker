import JobListingsContent from "@/components/EmployerJobList/JobListingsContent";
import JobListingsHeader from "@/components/EmployerJobList/JobListingsHeader ";

export default function PostJob() {
  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
       <JobListingsHeader />
       <JobListingsContent/>
      </div>
    </main>
  );
}

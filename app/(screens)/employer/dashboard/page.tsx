import CandidateStatus from "@/components/dashboard/employer/CandidateStatus";
import EmployerCompanyHeader from "@/components/dashboard/employer/EmployerCompanyHeader";
import HiringAnalytics from "@/components/dashboard/employer/HiringAnalytics";
import JobStatus from "@/components/dashboard/employer/JobStatus";

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mt-5">
      <EmployerCompanyHeader />
      <JobStatus />
      <HiringAnalytics/>
      <CandidateStatus />
    </div>
  );
}

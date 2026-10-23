import CandidateStatus from "@/components/dashboard/employer/CandidateStatus";
import EmployerCompanyHeader from "@/components/dashboard/employer/EmployerCompanyHeader";
import HiringAnalytics from "@/components/dashboard/employer/HiringAnalytics";
import JobStatus from "@/components/dashboard/employer/JobStatus";

export default function Dashboard() {
  return (
    <div className="container">
      <EmployerCompanyHeader />
      <JobStatus />
      <HiringAnalytics/>
      <CandidateStatus />
    </div>
  );
}

import { supabase } from "@/lib/supabase";

export type HiringActivityStats = {
  newApplications: number;
  underReview: number;
  interviewStage: number;
  totalApplications: number;
  totalJobs: number;
};

export async function getEmployerHiringActivity(
  companyId: string,
): Promise<HiringActivityStats> {
  const [applicationsResult, jobsResult] = await Promise.all([
    supabase
      .from("applications")
      .select(`
        id,
        status,
        applied_at,
        jobs!inner (
          id,
          company_id
        )
      `)
      .eq("jobs.company_id", companyId),

    supabase
      .from("jobs")
      .select("id", { count: "exact", head: true })
      .eq("company_id", companyId),
  ]);

  if (applicationsResult.error) {
    throw new Error(applicationsResult.error.message);
  }

  if (jobsResult.error) {
    throw new Error(jobsResult.error.message);
  }

  const applications = applicationsResult.data ?? [];

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return {
    totalJobs: jobsResult.count ?? 0,
    totalApplications: applications.length,

    newApplications: applications.filter(
      (application) =>
        application.applied_at &&
        new Date(application.applied_at) >= sevenDaysAgo,
    ).length,

    underReview: applications.filter(
      (application) => application.status === "Reviewing",
    ).length,

    interviewStage: applications.filter(
      (application) => application.status === "Interview",
    ).length,
  };
}
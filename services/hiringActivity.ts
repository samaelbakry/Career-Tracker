import { supabase } from "@/lib/supabase";

export type HiringActivityStats = {
  newApplications: number;
  underReview: number;
  interviewStage: number;
  totalApplications: number;
};

export async function getEmployerHiringActivity(companyId: string): Promise<HiringActivityStats> {
  const { data, error } = await supabase
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
    .eq("jobs.company_id", companyId);

  if (error) {
    throw new Error(error.message);
  }

  const applications = data ?? [];

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return {
    totalApplications: applications.length,

    newApplications: applications.filter((application) => {
      return (
        application.applied_at &&
        new Date(application.applied_at) >= sevenDaysAgo
      );
    }).length,

    underReview: applications.filter(
      (application) => application.status === "Reviewing",
    ).length,

    interviewStage: applications.filter(
      (application) => application.status === "Interview",
    ).length,
  };
}
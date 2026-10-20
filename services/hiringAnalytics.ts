
import { supabase } from "@/lib/supabase";

export async function getHiringAnalytics(companyId: string) {
  const [
    { data: applications, error: applicationsError },
    { data: jobs, error: jobsError },
  ] = await Promise.all([
    supabase
      .from("applications")
      .select(`
        id,
        status,
        applied_at,
        job_id,
        jobs!inner (
          id,
          title,
          company_id
        )
      `)
      .eq("jobs.company_id", companyId),

    supabase
      .from("jobs")
      .select("id, title, status")
      .eq("company_id", companyId),
  ]);

  if (applicationsError) {
    throw new Error(applicationsError.message);
  }

  if (jobsError) {
    throw new Error(jobsError.message);
  }

  const allApplications = applications ?? [];
  const allJobs = jobs ?? [];

  const countStatus = (status: string) =>
    allApplications.filter(
      (application) => application.status === status
    ).length;

  const totalApplicants = allApplications.length;
  const applied = countStatus("Applied");
  const reviewing = countStatus("Reviewing");
  const interviews = countStatus("Interview");
  const offers = countStatus("Offer");
  const rejected = countStatus("Rejected");

  const interviewRate = totalApplicants
    ? Math.round((interviews / totalApplicants) * 100)
    : 0;

  const activeJobs = allJobs.filter(
    (job) => job.status === "open"
  ).length;

  const jobsMap = new Map<
    string,
    { jobId: string; title: string; applicants: number }
  >();

  for (const application of allApplications) {
    const job = Array.isArray(application.jobs)
      ? application.jobs[0]
      : application.jobs;

    if (!job?.id) continue;

    const current = jobsMap.get(job.id);

    jobsMap.set(job.id, {
      jobId: job.id,
      title: job.title,
      applicants: (current?.applicants ?? 0) + 1,
    });
  }

  const topJobs = Array.from(jobsMap.values())
    .sort((a, b) => b.applicants - a.applicants)
    .slice(0, 5);

  return {
    totalApplicants,
    applied,
    reviewing,
    interviews,
    offers,
    rejected,
    interviewRate,
    totalJobs: allJobs.length,
    activeJobs,
    topJobs,
  };
}

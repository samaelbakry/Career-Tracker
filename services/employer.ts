import { supabase } from "@/lib/supabase";
import { Application } from "@/types/applications";
import { Company } from "@/types/companies";

export type ApplicationStatus =
  | "Applied"
  | "Reviewing"
  | "Interview"
  | "Offer"
  | "Rejected";

export async function getEmployerJobs(companyId: string) {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data ?? [];
}

export async function getEmployerJobStats(companyId: string) {
  const { data, error } = await supabase
    .from("jobs")
    .select("id, status")
    .eq("company_id", companyId);

  if (error) throw new Error(error.message);

  const jobs = data ?? [];

  const totalJobs = jobs.length;

  const activeJobs = jobs.filter(
    (job) => job.status === "open",
  ).length;

  const closedJobs = jobs.filter(
    (job) => job.status === "closed",
  ).length;

  return {
    totalJobs,
    activeJobs,
    closedJobs,
  };
}


export async function getEmployerApplications(companyId: string) {

  const { data, error } = await supabase
    .from("applications")
     .select(`
      id,
      user_id,
      job_id,
      resume_url,
      cover_letter,
      status,
      applied_at,
      profiles!applications_user_id_fkey1 (
        id,
        full_name
      ),
      jobs!inner (
        id,
        title,
        company_id
      )
    `)
    .eq("jobs.company_id", companyId);


  if (error) {
    throw new Error(error.message);
  }

 return (data ?? []) as unknown as Application[];
}

export async function UpdateApplicationStatus(applicationId: string , status:ApplicationStatus) {
   const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", applicationId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data 
}

export async function getCompaniesByOwner(
  userId: string,
): Promise<Company[]> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getCompaniesByOwner:", error);
    throw error;
  }

  return (data ?? []) as Company[];
}
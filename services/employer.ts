import { supabase } from "@/lib/supabase";
import { Company } from "@/types/companies";

export type ApplicationStatus =
  | "Applied"
  | "Reviewing"
  | "Interview"
  | "Offer"
  | "Rejected";

export async function getEmployerJobs(ownerId: string) {
  const { data, error } = await supabase
    .from("jobs")
    .select(`
      *,
      company:companies(
        id,
        name,
        logo_url
      )
    `)
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

export async function getEmployerJobStats(ownerId: string){
  const { data, error } = await supabase
    .from("jobs")
    .select("id , status")
    .eq("owner_id", ownerId);
    
    if (error) throw new Error(error.message);

    const totalJobs = data?.length

    const activeJobs = data?.filter((job)=>job.status === "open").length
    const closedJobs = data?.filter((job)=>job.status === "close").length 

   return {totalJobs , activeJobs , closedJobs};
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

  return data ?? [];
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


export async function getCompanyByOwner(ownerId: string) {
   const {data , error } = await supabase
  .from("companies")
  .select("*")
  .eq("owner_id" , ownerId)
  .single()

  if (error) throw new Error(error.message);

  return data as Company
}



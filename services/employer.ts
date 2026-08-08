import { supabase } from "@/lib/supabase";
import { Company } from "@/types/companies";

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

export async function getCompanyByOwner(ownerId: string) {
   const {data , error } = await supabase
  .from("companies")
  .select("*")
  .eq("owner_id" , ownerId)
  .single()

  if (error) throw new Error(error.message);

  return data as Company
}

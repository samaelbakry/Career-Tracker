import { supabase } from "@/lib/supabase";
import { CreateJobT, Job } from "@/types/jobs";

export async function getAllJobs() {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
    *,
    company:companies(*)

        `,
    )
    .eq("status", "open")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data as Job[];
}

export async function getJobDetails(id:string):Promise <Job> {
  const { data , error } = await supabase
    .from("jobs")
    .select(
      `
    *,
    company:companies(*)
        `,
    )
    .eq("id",id)
    .single()

  if (error) throw new Error(error.message);

  return data as Job;
}

export async function searchForJob(query: string) {
  console.log("Query:", JSON.stringify(query));

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .ilike("title", `%${query.trim()}%`);

  if (error) throw new Error(error.message);

  return data;
}

export async function getJobsByCompany(companyId: string): Promise<Job[]> {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,
      company:companies(*)
    `
    )
    .eq("company_id", companyId);

  if (error) throw new Error(error.message);

  return data as Job[];
}

export async function createJob(values:CreateJobT , companyId:string , ownerId: string
) {
  const {data , error} = await supabase
  .from("jobs")
  .insert({
    ...values,
    company_id:companyId,
    owner_id: ownerId
  })
  .select()
  .single()

  if (error) throw new Error(error.message);

  return data as Job
}

export async function updateJob(id:string,values:Partial<CreateJobT>){
    const {data,error}=await supabase
    .from("jobs")
    .update(values)
    .eq("id",id)
    .select()
    .single();

    if(error) throw error;

    return data;
}

export async function deleteJob(id:string){
    const {error}=await supabase
    .from("jobs")
    .delete()
    .eq("id",id);

    if(error) throw error;
}
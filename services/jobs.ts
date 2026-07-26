import { supabase } from "@/lib/supabase";
import { Job } from "@/types/jobs";

export async function getAllJobs() {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
    *,
    company:companies(*)

        `,
    )
    .eq("status", "open");

  if (error) {
    throw new Error(error.message);
  }

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

  if (error) {
    throw new Error(error.message);
  }

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

  if (error) {
    throw new Error(error.message);
  }

  return data as Job[];
}

import { supabase } from "@/lib/supabase";

export async function saveJob(userId: string, jobId: string) {
  const { data, error } = await supabase
    .from("saved_jobs")
    .insert({
      user_id: userId,
      job_id: jobId,
    })
    .select()
    .single();

  if (error) {
    console.error("saveJob:", error);
    throw new Error(error.message);
  }

  return data;
}
export async function unsaveJob(userId: string, jobId: string) {
  const { error } = await supabase
    .from("saved_jobs")
    .delete()
    .eq("user_id", userId)
    .eq("job_id", jobId);

  if (error) {
    console.error("unsaveJob:", error);
    throw new Error(error.message);
  }
}

export async function getsavedJob(userId: string) {
  const { data, error } = await supabase
    .from("saved_jobs")
    .select(`
      id,
      created_at,

      job:jobs (
        id,
        title,
        description,
        location,
        employment_type,
        experience_level,
        salary_min,
        salary_max,
        status,

        company:companies (
          id,
          name,
          logo_url
        )
      )
    `)
    .eq("user_id" , userId)
    .order("created_at" , {ascending:false})

  if (error) {
    console.error("getsavedJob:", error);
    throw new Error(error.message);
  }

  return data;
}

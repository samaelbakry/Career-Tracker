import { supabase } from "@/lib/supabase";

type Props = {
  jobId: string;
  userId: string;
  resumeUrl: string;
  coverLetter: string;
} 

export async function applyForJob({jobId,userId,resumeUrl,coverLetter}: Props) {

  const { data: existingApplication, error: checkError } = await supabase
    .from("applications")
    .select("id")
    .eq("job_id", jobId)
    .eq("user_id", userId)
    .maybeSingle();

  if (checkError) {
    throw new Error(checkError.message);
  }

  if (existingApplication) {
    throw new Error("You have already applied for this job.");
  }

  const { data, error } = await supabase
    .from("applications")
    .insert({
      job_id: jobId,
      user_id: userId,
      resume_url: resumeUrl,
      cover_letter: coverLetter,
      status: "Applied",
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getDashboardStats(userId: string) {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", userId)

     if (error) {
    throw new Error(error.message);
  }

  return {
    applied: data.length ,
    pending : data.filter((app: { status: string }) => app.status === "pending").length,
    rejected : data.filter((app: { status: string }) => app.status === "rejected").length,
    accepted : data.filter((app: { status: string }) => app.status === "accepted").length,
    interviewed : data.filter((app: { status: string }) => app.status === "interviewed").length,
  }
}

export async function getUserApplications(userId: string) {
  const { data, error } = await supabase
    .from("applications")
    .select(`
      *,
      job:jobs(
        id,
        title,
        location,
        company:companies(
          id,
          name,
          logo_url
        )
      )
    `)
    .eq("user_id", userId)
    .order("applied_at", { ascending: false });

  if (error) throw error;

  return data;
}
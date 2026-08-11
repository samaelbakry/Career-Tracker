import { supabase } from "@/lib/supabase";

type Props = {
  jobId: string;
  resumeUrl: string;
  coverLetter: string;
};

export async function applyForJob({ jobId, resumeUrl, coverLetter }: Props) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User is not authenticated");
  }

  const { data: existingApplication, error: checkError } = await supabase
    .from("applications")
    .select("id")
    .eq("job_id", jobId)
    .eq("user_id", user.id)
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
      user_id: user.id,
      resume_url: resumeUrl,
      cover_letter: coverLetter,
      status: "Applied",
    })
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getDashboardStats(userId: string) {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return {
    applied: data.length,
    Reviewing: data.filter((app: { status: string }) => app.status === "Reviewing").length,
    rejected: data.filter((app: { status: string }) => app.status === "rejected").length,
    Offer: data.filter((app: { status: string }) => app.status === "Offer").length,
    Interview: data.filter((app: { status: string }) => app.status === "Interview").length,
  };
}

export async function getUserApplications(userId: string) {
  const { data, error } = await supabase
    .from("applications")
    .select(`
      id,
      status,
      applied_at,
      resume_url,
      cover_letter,

      job:jobs (
        id,
        title,
        location,

        company:companies (
          id,
          name,
          logo_url
        )
      ),

      interviews!interviews_application_id_fkey (
        id,
        application_id,
        scheduled_at,
        duration_minutes,
        interview_type,
        meeting_url,
        notes,
        status
      )
    `)
    .eq("user_id", userId)
    .order("applied_at", { ascending: false });

  if (error) {
    console.error("getUserApplications:", error);
    throw new Error(error.message);
  }

  return data;
}

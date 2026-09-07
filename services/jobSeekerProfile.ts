import { supabase } from "@/lib/supabase";
import { JobSeekerProfile } from "@/types/jobSeeker";

export async function updateUserProfile(name: string, avatarUrl: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated");
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: name,
      avatar_url: avatarUrl,
    })
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function uploadAvatar(file: File) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User is not authenticated");
  }

  const extension = file.name.split(".").pop()?.toLowerCase();

  if (!extension) {
    throw new Error("Could not determine file extension");
  }

  const filePath = `${user.id}/avatar.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    console.log("UPLOAD ERROR:", uploadError);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return publicUrl;
}


export async function getJobSeekerProfile( userId: string) {
  const { data, error } = await supabase
    .from("job_seeker_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as JobSeekerProfile | null;
}


export async function upsertJobSeekerProfile(
  profile: Partial<JobSeekerProfile> & {
    user_id: string;
  }
) {
  const { data, error } = await supabase
    .from("job_seeker_profiles")
    // inset if has no user_id, update if has user_id (profile)
    .upsert(profile, {
      onConflict: "user_id",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as JobSeekerProfile;
}
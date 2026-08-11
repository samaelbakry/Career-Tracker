import { supabase } from "@/lib/supabase";

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


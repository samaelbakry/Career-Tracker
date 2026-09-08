import { supabase } from "@/lib/supabase";
import { Certificate } from "@/types/profileOptimizing";

export async function getCertificates(userId: string) {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }

  return data as Certificate[] | [];
}

export async function createCertificate( userId: string, certificate: Omit<Certificate, "id" | "user_id">) {
  const { data, error } = await supabase
    .from("certificates")
    .insert({
      ...certificate,
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteCertificate(id: string) {
  const { data, error } = await supabase
    .from("certificates")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return data;
}

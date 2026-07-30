import { supabase } from "@/lib/supabase";
import { Company } from "@/types/jobs";

export async function getCompanies(): Promise<Company[]> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("name");

  if (error) throw new Error(error.message);

  return data as Company[];
}

export async function getCompaniesDetails(companyId: string): Promise<Company> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", companyId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function searchCompany(query: string) {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .ilike("name" , `%${query}%`)

  if (error) throw new Error(error.message);

  return data as Company[];
}

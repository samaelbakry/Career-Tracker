import { supabase } from "@/lib/supabase";
import { Company } from "@/types/companies";

export async function createCompany(values: Company, ownerId: string) {
  const { data, error } = await supabase
    .from("companies")
    .insert({
      ...values,
      owner_id: ownerId,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data as Company;
}

export async function getCompanies(): Promise<Company[]> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false });

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
    .ilike("name", `%${query}%`);

  if (error) throw new Error(error.message);

  return data as Company[];
}

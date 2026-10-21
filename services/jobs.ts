import { supabase } from "@/lib/supabase";
import { CreateJobT, Job, JobFilters, JobsResponse } from "@/types/jobs";

export async function getAllJobs(page = 1, limit = 6, filters: JobFilters = {}) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("jobs")
    .select("*, company:companies(*)", { count: "exact" })
    .eq("status", "open");

  const search = filters.search?.trim();

  if (search) {
    const searchPattern = `%${search.replace(/[%_,()]/g, " ")}%`;

    const { data: companies, error: companiesError } = await supabase
      .from("companies")
      .select("id")
      .ilike("name", searchPattern);

    if (companiesError) {
      throw new Error(companiesError.message);
    }

    const companyIds = (companies ?? []).map((company) => company.id);

    const searchConditions = [
      `title.ilike.${searchPattern}`,
      `description.ilike.${searchPattern}`,
    ];

    if (companyIds.length > 0) {
      searchConditions.push(`company_id.in.(${companyIds.join(",")})`);
    }

    query = query.or(searchConditions.join(","));
  }

  if (filters.employmentType) {
    query = query.eq("employment_type", filters.employmentType);
  }

  if (filters.experienceLevel) {
    query = query.eq("experience_level", filters.experienceLevel);
  }

  if (filters.location?.trim()) {
    query = query.ilike("location", `%${filters.location.trim()}%`);
  }

  switch (filters.sortBy) {
    case "salary_high":
      query = query.order("salary_max", {
        ascending: false,
        nullsFirst: false,
      });
      break;

    case "salary_low":
      query = query.order("salary_min", {
        ascending: true,
        nullsFirst: false,
      });
      break;

    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    jobs: (data ?? []) as Job[],
    total: count ?? 0,
  };
}

export async function getJobDetails(id: string): Promise<Job> {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
    *,
    company:companies(*)
        `,
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data as Job;
}

export async function searchForJob(
  query: string
): Promise<JobsResponse> {
  const { data, error, count } = await supabase
    .from("jobs")
    .select("*", { count: "exact" })
    .ilike("title", `%${query.trim()}%`);

  if (error) throw new Error(error.message);

  return {
    jobs: data as Job[],
    total: count ?? 0,
  };
}

export async function getJobsByCompany(companyId: string): Promise<Job[]> {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,
      company:companies(*)
    `,
    )
    .eq("company_id", companyId);

  if (error) throw new Error(error.message);

  return data as Job[];
}

export async function createJob(
  values: CreateJobT,
  companyId: string,
  ownerId: string,
) {
  const { data, error } = await supabase
    .from("jobs")
    .insert({
      ...values,
      company_id: companyId,
      owner_id: ownerId,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data as Job;
}

export async function updateJob(id: string, values: Partial<CreateJobT>) {
  const { data, error } = await supabase
    .from("jobs")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteJob(id: string) {
  const { error } = await supabase.from("jobs").delete().eq("id", id);

  if (error) throw error;
}

export async function filterJobs( filter: string): Promise<JobsResponse> {
  let query = supabase
    .from("jobs")
    .select(
      `
        *,
        company:companies(*)
      `,
      { count: "exact" }
    );

  switch (filter) {
    case "remote":
      query = query.eq("location", "Remote");
      break;

    case "react":
      query = query.or(
        "title.ilike.%React%,title.ilike.%Next.js%,description.ilike.%React%,description.ilike.%Next.js%"
      );
      break;

    case "full-time":
      query = query.eq("employment_type", "Full Time");
      break;

    case "senior":
      query = query.eq("experience_level", "Senior");
      break;
  }

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return {
    jobs: data as Job[],
    total: count ?? 0,
  };
}
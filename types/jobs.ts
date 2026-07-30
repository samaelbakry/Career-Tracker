export type Company = {
  id: string;
  name: string;
  logo_url: string | null;
  website: string | null;
  location: string | null;
  industry: string | null;
  description: string | null;
  founded_year: number | null;
  company_size: string | null;
  headquarters: string | null;
  careers_url: string | null;
  linkedin_url: string |null;
  rating: number | null;
  open_positions: number | null;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  employment_type: | "Full Time"| "Part Time"| "Internship" | "Contract"| "Remote";

  experience_level: "Junior" | "Mid" | "Senior";

  location: string;

  salary_min: number;
  salary_max: number;

  status: "open" | "closed";

  created_at: string;

  company: Company;
};

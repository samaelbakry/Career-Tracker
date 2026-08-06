import { Company } from "./companies";

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
  owner_id:string
};

export type CreateJobT = {
  title: string;
  description: string;
  employment_type: string;
  experience_level: string;
  location: string;
  salary_min: number;
  salary_max: number;
  status: "open" | "closed";
  company_id: string;
};
export type ExperienceLevel =
  | "Entry Level"
  | "Junior"
  | "Mid Level"
  | "Senior"
  | "Lead";

export type WorkMode =
  | "Remote"
  | "Hybrid"
  | "On-site";

export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship";

export type JobSeekerProfile = {
  user_id: string;

  target_job_title: string | null;

  experience_years: number | null;

  experience_level: ExperienceLevel | null;

  skills: string[];

  preferred_location: string | null;

  work_mode: WorkMode | null;

  employment_type: EmploymentType | null;

  bio: string | null;

  updated_at: string;
}

export type Certificate = {
  id: string;

  user_id: string;

  name: string;

  issuer: string | null;

  issue_date: string | null;

  credential_url: string | null;

  created_at: string;
}
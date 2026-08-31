import { Interview } from "./interviews";
import { Job } from "./jobs";
import { Profile } from "./profile";

export type Application = {
  id: string;
  applied_at: string;
  cover_letter?: string;
  job_id: string;
  job?: Job;
  profiles?: Profile;
  resume_url?: string;
  status: "Applied" | "Reviewing" | "Interview" | "offer" | "Rejected" | string;
  user_id: string;
}

export type ApplicationCompany = {
  id: string;
  name: string;
  logo_url: string | null;
};

export type ApplicationJob = {
  id: string;
  title: string;
  location: string;
  company: ApplicationCompany;
};

export type ApplicationWithDetails = {
  id: string;
  job_id: string;
  applied_at: string;
  cover_letter: string;
  resume_url: string;
  status: string;
  job: ApplicationJob;
  interviews: Interview[];
};

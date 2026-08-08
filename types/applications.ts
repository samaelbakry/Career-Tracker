import { Job } from "./jobs";
import { Profile } from "./profile";

export type Application = {
  id: string;
  applied_at: string;
  cover_letter?: string;
  job_id: string;
  jobs?: Job;
  profiles?: Profile;
  resume_url?: string;
  status: "Applied" | "Reviewing" | "Interviewed" | "Accepted" | "Rejected" | string;
  user_id: string;
}
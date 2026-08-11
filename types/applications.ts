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

export type ApplicationWithDetails = {
   id: string;
  status: string;
  applied_at: string;
  resume_url: string | null;
  cover_letter: string | null;

  job: {
    id: string;
    title: string;
    location: string | null;

    company: {
      id: string;
      name: string;
      logo_url: string | null;
    } | null;
  } | null;

  interviews: Interview[];
}
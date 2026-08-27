export type InterviewType = "video" | "phone" | "in_person";

export type InterviewStatus =
  | "scheduled"
  | "completed"
  | "cancelled";

export type Interview = {
  id: string;
  application_id: string;
  employer_id?: string;
  scheduled_at: string;
  duration_minutes: number;
  interview_type: InterviewType;
  meeting_url?: string | null;
  notes?: string | null;
  status: InterviewStatus;
  created_at?: string;
}
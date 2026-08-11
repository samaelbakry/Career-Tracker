import { supabase } from "@/lib/supabase";
import { InterviewType } from "@/types/interviews";

type ScheduleInterviewProps = {
  applicationId: string;
  employerId: string;
  scheduledAt: string;
  durationMinutes: number;
  interviewType: InterviewType;
  meetingUrl?: string;
  notes?: string;
};
export async function scheduleInterview({applicationId,employerId,scheduledAt,durationMinutes,interviewType,meetingUrl,notes,}: ScheduleInterviewProps) {
    const { data, error } = await supabase
    .from("interviews")
    .insert({
      application_id: applicationId,
      employer_id: employerId,
      scheduled_at: scheduledAt,
      duration_minutes: durationMinutes,
      interview_type: interviewType,
      meeting_url: meetingUrl || null,
      notes: notes || null,
    })
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

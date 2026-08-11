"use client";

import { useFetch } from "@/hooks/useFetch";
import { formattedDate } from "@/lib/helpers";
import { getUserApplications } from "@/services/application";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import {
  Calendar,
  Clock,
  FileText,
  Phone,
  Video,
  Briefcase,
} from "lucide-react";

export default function InterviewsStatus() {
  const userId = useAppSelector(selectedUser)?.id;

  const { data: applications, isLoading } = useFetch({
    queryKey: ["applications", userId],
    queryFn: () => getUserApplications(userId!),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="mt-3 space-y-2.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
          />
        ))}
      </div>
    );
  }

  const interviews =  applications?.flatMap((application) => application.interviews ?? []) ?? [];

  if (interviews.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Briefcase size={22} />
          </div>

          <h3 className="mt-3 text-sm font-semibold text-slate-900">
            No scheduled interviews
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Interviews will appear here once they are scheduled.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Scheduled Interviews
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Your upcoming interview schedule
          </p>
        </div>

        <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-white">
          {interviews.length}
        </span>
      </div>

      <div className="mt-3 space-y-2.5">
        {interviews.map((interview) => {
          const scheduledDate = new Date(interview.scheduled_at).toLocaleDateString();

          return (
            <div
              key={interview.id}
              className="rounded-xl border border-slate-200/50 bg-white p-3 shadow-xs transition-all hover:border-slate-300"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {interview.interview_type === "phone" ? (
                    <Phone className="h-3.5 w-3.5 text-slate-500" />
                  ) : (
                    <Video className="h-3.5 w-3.5 text-slate-500" />
                  )}

                  <span className="text-xs font-medium capitalize text-slate-800">
                    {interview.interview_type} Interview
                  </span>
                </div>

                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium capitalize text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                  {interview.status}
                </span>
              </div>

              <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />

                  <span>{formattedDate(interview.scheduled_at)}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />

                  <span>
                    {scheduledDate} ({interview.duration_minutes} mins)
                  </span>
                </div>
              </div>

              {interview.notes?.trim() && (
                <div className="flex items-start gap-1.5 rounded-lg border border-amber-200/50 bg-amber-50/70 p-2 text-xs text-amber-900">
                  <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />

                  <p className="leading-tight">
                    <span className="font-medium">Note:</span>{" "}
                    {interview.notes.trim()}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

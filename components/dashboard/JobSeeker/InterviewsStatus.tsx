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
import { useState } from "react";

export default function InterviewsStatus() {
  const userId = useAppSelector(selectedUser)?.id;
  const [currentTime] = useState(()=>Date.now())

  const { data: applications, isLoading } = useFetch({
    queryKey: ["applications", userId],
    queryFn: () => getUserApplications(userId!),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-27.5 animate-pulse rounded-2xl border border-slate-200/70 bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-32 rounded-md bg-slate-100" />
              <div className="h-6 w-16 rounded-full bg-slate-100" />
            </div>

            <div className="mt-4 flex gap-4">
              <div className="h-3 w-24 rounded bg-slate-100" />
              <div className="h-3 w-28 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const interviews = applications?.flatMap((application) => application.interviews ?? []) ?? [];

  if (interviews.length === 0) {
    return (
      <section className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_12px_40px_-25px_rgba(15,23,42,0.25)]">
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 ring-1 ring-slate-100">
            <Briefcase size={23} />
          </div>

          <h3 className="mt-4 text-sm font-bold text-slate-900">
            No scheduled interviews
          </h3>

          <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-slate-500">
            Interviews will appear here once they are scheduled.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_12px_40px_-25px_rgba(15,23,42,0.25)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 ring-1 ring-purple-100">
            <Video size={18} />
          </div>

          <div>
            <h2 className="text-base font-black tracking-tight text-slate-900 sm:text-lg">
              Scheduled Interviews
            </h2>

            <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">
              Your upcoming interview schedule
            </p>
          </div>
        </div>

        <div className="flex h-8 min-w-8 items-center justify-center rounded-full bg-slate-950 px-2.5 text-[11px] font-bold text-white shadow-sm">
          {interviews.length}
        </div>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        {interviews.map((interview) => {
          const scheduledDate = new Date(interview.scheduled_at).toLocaleDateString();
          const isPhone = interview.interview_type === "phone";
          const InterviewIcon = isPhone ? Phone : Video;
          const isPassed = new Date(interview.scheduled_at).getTime() < currentTime;

          return (
            <div
              key={interview.id}
              className={`group relative ${isPassed ? "opacity-60" : "opacity-100"}  overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-200 hover:bg-white hover:shadow-[0_12px_30px_-18px_rgba(15,23,42,0.3)]`}
            >
              <div
                className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-150 ${
                  isPhone ? "bg-blue-100/70" : "bg-purple-100/70"
                }`}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isPhone
                          ? "bg-blue-50 text-blue-600 ring-1 ring-blue-100"
                          : "bg-purple-50 text-purple-600 ring-1 ring-purple-100"
                      }`}
                    >
                      <InterviewIcon size={17} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-slate-900">
                        {interview.interview_type} Interview
                      </h3>

                      <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                        Interview meeting
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ring-1 ring-inset ${
                      isPassed
                        ? "bg-slate-100 text-slate-500 ring-slate-300"
                        : "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                    }`}
                  >
                    <span
                      className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                        isPassed ? "bg-slate-400" : "bg-emerald-500"
                      }`}
                    />

                    {isPassed ? "Passed" : interview.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm">
                    <Calendar size={12} className="text-slate-400" />
                    {formattedDate(interview.scheduled_at)}
                  </div>

                  <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm">
                    <Clock size={12} className="text-slate-400" />
                    {scheduledDate} · {interview.duration_minutes} mins
                  </div>
                </div>

                {interview.notes?.trim() && (
                  <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-200/60 bg-amber-50/70 p-3 text-xs text-amber-900">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                      <FileText size={13} />
                    </div>

                    <p className="pt-0.5 leading-relaxed">
                      <span className="font-bold">Note:</span>{" "}
                      {interview.notes.trim()}
                    </p>
                  </div>
                )}
              </div>

              <div
                className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-50 transition-all duration-300 group-hover:left-0 group-hover:right-0 group-hover:opacity-100 ${
                  isPhone ? "bg-blue-500" : "bg-purple-500"
                }`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

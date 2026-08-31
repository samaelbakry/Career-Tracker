"use client";

import { BriefcaseBusiness, CheckCircle2, Sparkles } from "lucide-react";
import DialogButtonTrigger from "../ui/DialogButtonTrigger";
import JobFormDialog from "../jobs/JobFormDialog";
import { selectedUser } from "@/store/slices/authSlice";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { useFetch } from "@/hooks/useFetch";
import { Job } from "@/types/jobs";
import { getEmployerJobs } from "@/services/employer";

export default function JobListingsHeader() {
  const userId = useAppSelector(selectedUser)?.id;

  const { data: employerJobs } = useFetch<Job[]>({
    queryKey: ["employerJobs", userId],
    queryFn: () => getEmployerJobs(userId!),
    enabled: !!userId,
  });

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-100/60 blur-3xl dark:bg-indigo-950/30" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-950/20" />

        <div className="relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-300">
                <Sparkles className="h-3.5 w-3.5" />
                Hiring Portal
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                  Manage your{" "}
                  <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    job listings
                  </span>
                </h1>

                <p className="max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
                  Create, manage, and keep track of the opportunities your
                  company is offering to talented candidates.
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <DialogButtonTrigger
                Component={JobFormDialog}
                componentProps={{ mode: "create" as const }}
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-slate-100 pt-6 dark:border-slate-800 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Total Listings
                </p>
                <p className="mt-0.5 text-xl font-bold text-slate-900 dark:text-white">
                  {employerJobs?.length ?? 0}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Active Opportunities
                </p>
                <p className="mt-0.5 text-xl font-bold text-slate-900 dark:text-white">
                  {employerJobs?.length ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

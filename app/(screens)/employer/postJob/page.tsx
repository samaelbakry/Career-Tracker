"use client";

import CardSkeleton from "@/components/skeletons/CardSkeleton";
import JobCard from "@/components/jobs/JobCard";
import JobFormDialog from "@/components/jobs/JobFormDialog";
import DialogButtonTrigger from "@/components/ui/DialogButtonTrigger";
import { useFetch } from "@/hooks/useFetch";
import { getEmployerJobs } from "@/services/employer";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import { Job } from "@/types/jobs";
import {
  AlertCircle,
  BriefcaseBusiness,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function PostJob() {
  const userId = useAppSelector(selectedUser)?.id;

  const {
    data: employerJobs,
    isLoading,
    isError,
    error,
  } = useFetch<Job[]>({
    queryKey: ["employerJobs", userId],
    queryFn: () => getEmployerJobs(userId!),
    enabled: !!userId,
  });

  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
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

        {isError && (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-950">
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>

            <div className="pt-1">
              <p className="font-semibold">Unable to load your jobs</p>
              <p className="mt-0.5 text-red-600/80 dark:text-red-400/80">
                {(error as Error)?.message || "Something went wrong."}
              </p>
            </div>
          </div>
        )}

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Your Job Listings
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Manage the opportunities you currently have posted.
              </p>
            </div>

            {!isLoading && employerJobs && employerJobs.length > 0 && (
              <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300 sm:block">
                {employerJobs.length}{" "}
                {employerJobs.length === 1 ? "listing" : "listings"}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
            </div>
          ) : employerJobs && employerJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {employerJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            !isError && (
              <div className="relative overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
                <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-indigo-100/50 blur-3xl dark:bg-indigo-950/20" />

                <div className="relative mx-auto flex max-w-md flex-col items-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-400">
                    <BriefcaseBusiness className="h-7 w-7" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    No job openings yet
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    You haven&apos;t posted any jobs yet. Create your first
                    listing and start connecting with qualified candidates.
                  </p>

                  <div className="mt-6">
                    <DialogButtonTrigger
                      Component={JobFormDialog}
                      componentProps={{ mode: "create" as const }}
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </section>
      </div>
    </main>
  );
}
